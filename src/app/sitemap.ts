import type { MetadataRoute } from "next";
import { getRepository } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repo = await getRepository();
  const all = await repo.listPosts({ limit: 60 });

  const staticRoutes: MetadataRoute.Sitemap = [
    "", "/berita", "/kategori", "/wilayah", "/agenda", "/tentang", "/kontak",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "hourly" : "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${base}/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const districts: MetadataRoute.Sitemap = DISTRICTS.map((district) => ({
    url: `${base}/wilayah/${district.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const villages: MetadataRoute.Sitemap = VILLAGES.map((village) => ({
    url: `${base}/wilayah/kelurahan/${village.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const posts: MetadataRoute.Sitemap = all.posts.map((post) => ({
    url: `${base}/berita/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "weekly",
    priority: post.is_headline ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...categories, ...districts, ...villages, ...posts];
}
