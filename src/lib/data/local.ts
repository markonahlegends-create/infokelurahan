import type {
  Agenda,
  Announcement,
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
import {
  SEED_AGENDAS,
  SEED_ANNOUNCEMENTS,
  SEED_POSTS,
} from "../seed/posts";

/**
 * Driver DEMO.
 *
 * Menyimpan data di memori proses dari data awal bawaan. Tidak butuh
 * layanan eksternal sehingga pratinjau dan pengembangan lokal selalu
 * berjalan. Perubahan dari dashboard admin bertahan selama proses
 * server hidup; gunakan Supabase untuk penyimpanan permanen.
 */

interface Row extends Post {}

function buildInitialRows(): Row[] {
  return SEED_POSTS.map((seed, index) => ({
    ...seed,
    id: index + 1,
  }));
}

// Simpan di globalThis agar tidak ter-reset oleh hot reload Next.js.
const globalStore = globalThis as unknown as {
  __infokelurahan_rows?: Row[];
  __infokelurahan_agendas?: Agenda[];
  __infokelurahan_announcements?: Announcement[];
};

function rows(): Row[] {
  if (!globalStore.__infokelurahan_rows) {
    globalStore.__infokelurahan_rows = buildInitialRows();
  }
  return globalStore.__infokelurahan_rows;
}

function agendas(): Agenda[] {
  if (!globalStore.__infokelurahan_agendas) {
    globalStore.__infokelurahan_agendas = SEED_AGENDAS.map((a, i) => ({
      ...a,
      id: i + 1,
    }));
  }
  return globalStore.__infokelurahan_agendas;
}

function announcements(): Announcement[] {
  if (!globalStore.__infokelurahan_announcements) {
    globalStore.__infokelurahan_announcements = SEED_ANNOUNCEMENTS.map((a, i) => ({
      ...a,
      id: i + 1,
    }));
  }
  return globalStore.__infokelurahan_announcements;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matches(post: Post, needle: string): boolean {
  const haystack = normalizeText(
    [post.title, post.excerpt, post.category_slug, post.district_slug ?? "", post.village_slug ?? "", post.author, ...post.content].join(" "),
  );
  return needle
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(normalizeText(token)));
}

const byDateDesc = (a: Post, b: Post) =>
  new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

class LocalRepository implements Repository {
  readonly driver = "local" as const;

  async isReady() {
    return true;
  }

  async listPosts(query: PostListQuery = {}): Promise<PostPage> {
    const {
      category,
      district,
      village,
      q,
      sort = "terbaru",
      limit = 12,
      offset = 0,
      exclude,
      includeDrafts = false,
    } = query;

    let list = rows().filter((p) => includeDrafts || p.status === "published");

    if (category) list = list.filter((p) => p.category_slug === category);
    if (district) list = list.filter((p) => p.district_slug === district);
    if (village) list = list.filter((p) => p.village_slug === village);
    if (q && q.trim()) list = list.filter((p) => matches(p, q.trim()));
    if (exclude) list = list.filter((p) => p.id !== exclude);

    list = [...list].sort(
      sort === "populer" ? (a, b) => b.views - a.views : byDateDesc,
    );

    const total = list.length;
    const safeLimit = Math.max(1, Math.min(limit, 60));
    const page = list.slice(offset, offset + safeLimit);

    return {
      posts: page,
      total,
      limit: safeLimit,
      offset,
      has_more: offset + safeLimit < total,
    };
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return rows().find((p) => p.slug === slug) ?? null;
  }

  async getPostById(id: number): Promise<Post | null> {
    return rows().find((p) => p.id === id) ?? null;
  }

  async relatedPosts(post: Post, limit = 3): Promise<Post[]> {
    const pool = rows().filter(
      (p) => p.id !== post.id && p.status === "published",
    );
    const scored = pool
      .map((p) => {
        let score = 0;
        if (p.category_slug === post.category_slug) score += 3;
        if (post.district_slug && p.district_slug === post.district_slug) score += 2;
        if (post.village_slug && p.village_slug === post.village_slug) score += 2;
        return { p, score };
      })
      .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p));
    return scored.slice(0, limit).map((s) => s.p);
  }

  async popularPosts(limit = 5): Promise<Post[]> {
    return rows()
      .filter((p) => p.status === "published")
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  async listCategories() {
    const counts = new Map<string, number>();
    for (const p of rows()) {
      if (p.status !== "published") continue;
      counts.set(p.category_slug, (counts.get(p.category_slug) ?? 0) + 1);
    }
    return CATEGORIES.map((c) => ({
      slug: c.slug,
      post_count: counts.get(c.slug) ?? 0,
    }));
  }

  async listAnnouncements(): Promise<Announcement[]> {
    return [...announcements()]
      .filter((a) => a.is_active)
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
      );
  }

  async listAgendas(): Promise<Agenda[]> {
    return [...agendas()].sort(
      (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
    );
  }

  async stats(): Promise<SiteStats> {
    const published = rows().filter((p) => p.status === "published");
    return {
      total_posts: published.length,
      total_views: published.reduce((sum, p) => sum + p.views, 0),
      total_villages: VILLAGES.length,
      total_districts: 8,
      total_categories: CATEGORIES.length,
      latest_post_at:
        published.map((p) => p.published_at).sort().at(-1) ?? null,
    };
  }

  async createPost(input: NewPostInput): Promise<Post> {
    const content = normalizeContent(input.content);
    const nextId = rows().reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const baseSlug = slugify(input.title);
    let slug = baseSlug;
    let n = 1;
    while (rows().some((p) => p.slug === slug)) {
      slug = `${baseSlug}-${++n}`;
    }

    const post: Post = {
      id: nextId,
      slug,
      title: input.title.trim(),
      excerpt: (input.excerpt?.trim() || deriveExcerpt(content)).slice(0, 320),
      content,
      cover_image: input.cover_image?.trim() || "",
      category_slug: input.category_slug,
      district_slug: input.district_slug || null,
      village_slug: input.village_slug || null,
      author: input.author?.trim() || "Redaksi Info Kelurahan",
      editor: null,
      source: "Info Kelurahan",
      source_url: "",
      published_at: new Date().toISOString(),
      views: 0,
      is_headline: Boolean(input.is_headline),
      status: input.status ?? "published",
    };

    if (post.is_headline) {
      rows().forEach((p) => {
        p.is_headline = false;
      });
    }

    rows().unshift(post);
    return post;
  }

  async updatePost(
    id: number,
    patch: Partial<NewPostInput>,
  ): Promise<Post | null> {
    const post = rows().find((p) => p.id === id);
    if (!post) return null;

    if (patch.title !== undefined && patch.title.trim()) {
      post.title = patch.title.trim();
    }
    if (patch.content !== undefined) {
      post.content = normalizeContent(patch.content);
      if (!patch.excerpt) post.excerpt = deriveExcerpt(post.content);
    }
    if (patch.excerpt !== undefined) {
      post.excerpt = patch.excerpt.trim().slice(0, 320);
    }
    if (patch.cover_image !== undefined) post.cover_image = patch.cover_image.trim();
    if (patch.category_slug !== undefined) post.category_slug = patch.category_slug;
    if (patch.district_slug !== undefined) {
      post.district_slug = patch.district_slug || null;
    }
    if (patch.village_slug !== undefined) post.village_slug = patch.village_slug || null;
    if (patch.author !== undefined && patch.author.trim()) post.author = patch.author.trim();
    if (patch.status !== undefined) post.status = patch.status;
    if (patch.is_headline !== undefined) {
      post.is_headline = patch.is_headline;
      if (post.is_headline) {
        rows().forEach((p) => {
          if (p.id !== post.id) p.is_headline = false;
        });
      }
    }
    return post;
  }

  async deletePost(id: number): Promise<boolean> {
    const store = rows();
    const index = store.findIndex((p) => p.id === id);
    if (index === -1) return false;
    store.splice(index, 1);
    return true;
  }

  async incrementViews(id: number): Promise<void> {
    const post = rows().find((p) => p.id === id);
    if (post) post.views += 1;
  }
}

export const localRepository = new LocalRepository();
