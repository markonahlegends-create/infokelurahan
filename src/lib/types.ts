/**
 * Tipe data inti Info Kelurahan.
 * Satu sumber kebenaran yang dipakai bersama oleh lapisan data,
 * API, dan komponen UI.
 */

export type CategorySlug =
  | "pemerintahan"
  | "pembangunan"
  | "pendidikan"
  | "kesehatan"
  | "olahraga"
  | "ekonomi"
  | "sosial";

export type PostStatus = "published" | "draft";

export interface Category {
  id: number;
  slug: CategorySlug;
  name: string;
  description: string;
  color: string;
  icon: string;
  post_count?: number;
}

export interface District {
  id: number;
  slug: string;
  name: string;
  code: string;
  description: string;
  area_km2: number;
  kelurahan_count: number;
  accent: string;
}

export interface Village {
  id: number;
  slug: string;
  name: string;
  district_slug: string;
  postal_code: string;
  address: string;
  phone: string;
  email: string;
  profile: string;
  latitude: number;
  longitude: number;
  head_name: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  cover_image: string;
  category_slug: CategorySlug;
  district_slug: string | null;
  village_slug: string | null;
  author: string;
  editor: string | null;
  source: string;
  source_url: string;
  published_at: string;
  views: number;
  is_headline: boolean;
  status: PostStatus;
  /** Diisi saat runtime untuk tampilan kartu */
  category?: Category;
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  level: "info" | "penting" | "layanan";
  published_at: string;
  expires_at: string | null;
  is_active: boolean;
}

export interface Agenda {
  id: number;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  organizer: string;
  district_slug: string | null;
}

export interface PostListQuery {
  category?: string;
  district?: string;
  village?: string;
  q?: string;
  sort?: "terbaru" | "populer";
  limit?: number;
  offset?: number;
  exclude?: number;
  includeDrafts?: boolean;
}

export interface PostPage {
  posts: Post[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface SiteStats {
  total_posts: number;
  total_views: number;
  total_villages: number;
  total_districts: number;
  total_categories: number;
  latest_post_at: string | null;
}

export interface NewPostInput {
  title: string;
  excerpt?: string;
  content: string[] | string;
  cover_image?: string;
  category_slug: CategorySlug;
  district_slug?: string | null;
  village_slug?: string | null;
  author?: string;
  is_headline?: boolean;
  status?: PostStatus;
}
