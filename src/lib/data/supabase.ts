import type {
  Agenda,
  Announcement,
  CategorySlug,
  NewPostInput,
  Post,
  PostListQuery,
  PostPage,
  SiteStats,
} from "../types";
import { CATEGORIES } from "../categories";
import { VILLAGES } from "../wilayah";
import {
  deriveExcerpt,
  normalizeContent,
  slugify,
  type Repository,
} from "./repository";

/**
 * Driver Supabase — Postgres gratis.
 *
 * Memakai REST API Supabase lewat fetch biasa (tanpa SDK) agar ringan dan
 * aman dijalankan di server maupun edge runtime. Skema tabel ada di
 * `supabase/schema.sql`.
 */

const TABLE_POSTS = "posts";

interface SupabasePostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[] | string;
  cover_image: string | null;
  category_slug: string;
  district_slug: string | null;
  village_slug: string | null;
  author: string;
  editor: string | null;
  source: string | null;
  source_url: string | null;
  published_at: string;
  views: number;
  is_headline: boolean;
  status: string;
}

function toPost(row: SupabasePostRow): Post {
  const content = Array.isArray(row.content)
    ? row.content
    : String(row.content ?? "")
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content,
    cover_image: row.cover_image ?? "",
    category_slug: row.category_slug as CategorySlug,
    district_slug: row.district_slug,
    village_slug: row.village_slug,
    author: row.author ?? "Redaksi",
    editor: row.editor,
    source: row.source ?? "Info Kelurahan",
    source_url: row.source_url ?? "",
    published_at: row.published_at,
    views: Number(row.views ?? 0),
    is_headline: Boolean(row.is_headline),
    status: row.status === "draft" ? "draft" : "published",
  };
}

class SupabaseRepository implements Repository {
  readonly driver = "supabase" as const;
  private base: string;
  private key: string;

  constructor(base: string, key: string) {
    this.base = base.replace(/\/$/, "");
    this.key = key;
  }

  private headers(extra: Record<string, string> = {}) {
    return {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
      ...extra,
    };
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
  ): Promise<{ data: T | null; total: number | null; error: string | null }> {
    try {
      const res = await fetch(`${this.base}/rest/v1/${path}`, {
        ...init,
        headers: this.headers(init.headers as Record<string, string>),
        cache: "no-store",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        return { data: null, total: null, error: `${res.status} ${text.slice(0, 200)}` };
      }
      const range = res.headers.get("content-range");
      const total = range ? Number(range.split("/")[1]) : null;
      if (res.status === 204) return { data: null, total, error: null };
      const data = (await res.json()) as T;
      return { data, total: Number.isFinite(total) ? total : null, error: null };
    } catch (error) {
      return {
        data: null,
        total: null,
        error: error instanceof Error ? error.message : "network error",
      };
    }
  }

  async isReady(): Promise<boolean> {
    const { error } = await this.request<unknown[]>(`${TABLE_POSTS}?select=id&limit=1`);
    return error === null;
  }

  private buildFilter(query: PostListQuery): string {
    const params: string[] = [];
    if (!query.includeDrafts) params.push("status=eq.published");
    if (query.category) params.push(`category_slug=eq.${encodeURIComponent(query.category)}`);
    if (query.district) params.push(`district_slug=eq.${encodeURIComponent(query.district)}`);
    if (query.village) params.push(`village_slug=eq.${encodeURIComponent(query.village)}`);
    if (query.exclude) params.push(`id=neq.${query.exclude}`);
    if (query.q?.trim()) {
      const term = query.q.trim().replace(/[*,()]/g, " ").trim();
      if (term) {
        params.push(`or=(title.ilike.*${encodeURIComponent(term)}*,excerpt.ilike.*${encodeURIComponent(term)}*)`);
      }
    }
    return params.join("&");
  }

  async listPosts(query: PostListQuery = {}): Promise<PostPage> {
    const limit = Math.max(1, Math.min(query.limit ?? 12, 60));
    const offset = Math.max(0, query.offset ?? 0);
    const order = query.sort === "populer" ? "views.desc" : "published_at.desc";
    const filter = this.buildFilter(query);

    const path = `${TABLE_POSTS}?select=*${filter ? `&${filter}` : ""}&order=${order}&limit=${limit}&offset=${offset}`;
    const { data, total, error } = await this.request<SupabasePostRow[]>(path, {
      headers: { Prefer: "count=exact" },
    });

    if (error || !data) {
      return { posts: [], total: 0, limit, offset, has_more: false };
    }

    const count = total ?? data.length;
    return {
      posts: data.map(toPost),
      total: count,
      limit,
      offset,
      has_more: offset + data.length < count,
    };
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data } = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    );
    return data && data.length > 0 ? toPost(data[0]) : null;
  }

  async getPostById(id: number): Promise<Post | null> {
    const { data } = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?select=*&id=eq.${id}&limit=1`,
    );
    return data && data.length > 0 ? toPost(data[0]) : null;
  }

  async relatedPosts(post: Post, limit = 3): Promise<Post[]> {
    const sameCategory = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?select=*&status=eq.published&id=neq.${post.id}&category_slug=eq.${encodeURIComponent(post.category_slug)}&order=published_at.desc&limit=${limit}`,
    );
    const posts = (sameCategory.data ?? []).map(toPost);
    if (posts.length >= limit) return posts;

    const fill = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?select=*&status=eq.published&id=neq.${post.id}&order=published_at.desc&limit=${limit + posts.length}`,
    );
    const merged = [...posts];
    for (const row of (fill.data ?? []).map(toPost)) {
      if (merged.length >= limit) break;
      if (!merged.some((p) => p.id === row.id)) merged.push(row);
    }
    return merged.slice(0, limit);
  }

  async popularPosts(limit = 5): Promise<Post[]> {
    const { data } = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?select=*&status=eq.published&order=views.desc&limit=${limit}`,
    );
    return (data ?? []).map(toPost);
  }

  async listCategories() {
    const { data } = await this.request<{ category_slug: string }[]>(
      `${TABLE_POSTS}?select=category_slug&status=eq.published&limit=1000`,
    );
    const counts = new Map<string, number>();
    for (const row of data ?? []) {
      counts.set(row.category_slug, (counts.get(row.category_slug) ?? 0) + 1);
    }
    return CATEGORIES.map((c) => ({
      slug: c.slug,
      post_count: counts.get(c.slug) ?? 0,
    }));
  }

  async listAnnouncements(): Promise<Announcement[]> {
    const { data } = await this.request<Announcement[]>(
      `announcements?select=*&is_active=eq.true&order=published_at.desc&limit=20`,
    );
    return data ?? [];
  }

  async listAgendas(): Promise<Agenda[]> {
    const { data } = await this.request<Agenda[]>(
      `agendas?select=*&order=starts_at.asc&limit=20`,
    );
    return data ?? [];
  }

  async stats(): Promise<SiteStats> {
    const { data, total } = await this.request<{ views: number; published_at: string }[]>(
      `${TABLE_POSTS}?select=views,published_at&status=eq.published&order=published_at.desc&limit=1000`,
      { headers: { Prefer: "count=exact" } },
    );
    const list = data ?? [];
    return {
      total_posts: total ?? list.length,
      total_views: list.reduce((sum, row) => sum + Number(row.views ?? 0), 0),
      total_villages: VILLAGES.length,
      total_districts: 8,
      total_categories: CATEGORIES.length,
      latest_post_at: list[0]?.published_at ?? null,
    };
  }

  async createPost(input: NewPostInput): Promise<Post> {
    const content = normalizeContent(input.content);
    const baseSlug = slugify(input.title);
    let slug = baseSlug;
    let attempt = 0;
    while (await this.getPostBySlug(slug)) {
      slug = `${baseSlug}-${++attempt + 1}`;
    }

    const payload: Record<string, unknown> = {
      slug,
      title: input.title.trim(),
      excerpt: (input.excerpt?.trim() || deriveExcerpt(content)).slice(0, 320),
      content,
      cover_image: input.cover_image?.trim() || "",
      category_slug: input.category_slug,
      district_slug: input.district_slug || null,
      village_slug: input.village_slug || null,
      author: input.author?.trim() || "Redaksi Info Kelurahan",
      source: "Info Kelurahan",
      source_url: "",
      published_at: new Date().toISOString(),
      views: 0,
      is_headline: Boolean(input.is_headline),
      status: input.status ?? "published",
    };

    if (input.is_headline) {
      await this.request<unknown>(`${TABLE_POSTS}?is_headline=eq.true`, {
        method: "PATCH",
        body: JSON.stringify({ is_headline: false }),
      });
    }

    const { data } = await this.request<SupabasePostRow[]>(TABLE_POSTS, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });

    if (!data || data.length === 0) {
      throw new Error("Gagal menyimpan berita ke Supabase");
    }
    return toPost(data[0]);
  }

  async updatePost(
    id: number,
    patch: Partial<NewPostInput>,
  ): Promise<Post | null> {
    const payload: Record<string, unknown> = {};
    if (patch.title !== undefined && patch.title.trim()) payload.title = patch.title.trim();
    if (patch.content !== undefined) {
      const content = normalizeContent(patch.content);
      payload.content = content;
      if (!patch.excerpt) payload.excerpt = deriveExcerpt(content);
    }
    if (patch.excerpt !== undefined) payload.excerpt = patch.excerpt.trim().slice(0, 320);
    if (patch.cover_image !== undefined) payload.cover_image = patch.cover_image.trim();
    if (patch.category_slug !== undefined) payload.category_slug = patch.category_slug;
    if (patch.district_slug !== undefined) payload.district_slug = patch.district_slug || null;
    if (patch.village_slug !== undefined) payload.village_slug = patch.village_slug || null;
    if (patch.author !== undefined && patch.author.trim()) payload.author = patch.author.trim();
    if (patch.status !== undefined) payload.status = patch.status;
    if (patch.is_headline !== undefined) payload.is_headline = patch.is_headline;

    if (payload.is_headline === true) {
      await this.request<unknown>(`${TABLE_POSTS}?is_headline=eq.true&id=neq.${id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_headline: false }),
      });
    }

    const { data } = await this.request<SupabasePostRow[]>(
      `${TABLE_POSTS}?id=eq.${id}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(payload),
      },
    );
    return data && data.length > 0 ? toPost(data[0]) : null;
  }

  async deletePost(id: number): Promise<boolean> {
    const { error } = await this.request<unknown>(`${TABLE_POSTS}?id=eq.${id}`, {
      method: "DELETE",
    });
    return error === null;
  }

  async incrementViews(id: number): Promise<void> {
    const post = await this.getPostById(id);
    if (!post) return;
    await this.request<unknown>(`${TABLE_POSTS}?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify({ views: post.views + 1 }),
    });
  }
}

export function createSupabaseRepository(base: string, key: string) {
  return new SupabaseRepository(base, key);
}
