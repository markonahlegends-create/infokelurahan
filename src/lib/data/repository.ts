import type {
  Agenda,
  Announcement,
  NewPostInput,
  Post,
  PostListQuery,
  PostPage,
  SiteStats,
} from "../types";

/**
 * Kontrak tunggal antara UI dan penyimpanan data.
 * Dua implementasi tersedia:
 *  - LocalRepository  : data awal bawaan (demo/preview, tanpa layanan eksternal)
 *  - SupabaseRepository: Postgres gratis via Supabase REST
 */
export interface Repository {
  readonly driver: "local" | "supabase";

  listPosts(query?: PostListQuery): Promise<PostPage>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getPostById(id: number): Promise<Post | null>;
  relatedPosts(post: Post, limit?: number): Promise<Post[]>;
  popularPosts(limit?: number): Promise<Post[]>;

  listCategories(): Promise<{ slug: string; post_count: number }[]>;
  listAnnouncements(): Promise<Announcement[]>;
  listAgendas(): Promise<Agenda[]>;
  stats(): Promise<SiteStats>;

  createPost(input: NewPostInput): Promise<Post>;
  updatePost(id: number, patch: Partial<NewPostInput>): Promise<Post | null>;
  deletePost(id: number): Promise<boolean>;
  incrementViews(id: number): Promise<void>;
  isReady(): Promise<boolean>;
}

/* ── Utilitas bersama ──────────────────────────────────────────────── */

export function slugify(input: string, maxLength = 90): string {
  const base = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/g, "");
  return base || `berita-${Date.now().toString(36)}`;
}

export function normalizeContent(content: NewPostInput["content"]): string[] {
  if (Array.isArray(content)) {
    return content.map((p) => p.trim()).filter(Boolean);
  }
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function deriveExcerpt(content: string[], limit = 190): string {
  const text = content
    .join(" ")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/[#*_>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : limit)}…`;
}

export const PLACEHOLDER_IMAGE = "/images/placeholder-news.svg";

export function coverFallback(cover: string | null | undefined): string {
  return cover && cover.trim().length > 0 ? cover : PLACEHOLDER_IMAGE;
}
