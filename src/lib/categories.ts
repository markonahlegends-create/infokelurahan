import type { Category, CategorySlug } from "./types";

/**
 * Master kategori editorial.
 * Warna dipakai langsung sebagai variabel CSS di seluruh UI sehingga
 * setiap kategori punya identitas visual yang konsisten.
 */
export const CATEGORIES: Category[] = [
  {
    id: 1,
    slug: "pemerintahan",
    name: "Pemerintahan",
    description: "Kebijakan, program, dan kegiatan pemerintahan Kota Cilegon hingga tingkat kelurahan.",
    color: "#f85e16",
    icon: "Landmark",
  },
  {
    id: 2,
    slug: "pembangunan",
    name: "Pembangunan",
    description: "Infrastruktur, tata ruang, dan proyek pembangunan yang menyentuh warga kelurahan.",
    color: "#e9440c",
    icon: "Construction",
  },
  {
    id: 3,
    slug: "pendidikan",
    name: "Pendidikan",
    description: "Beasiswa, sekolah, dan program peningkatan sumber daya manusia di Kota Cilegon.",
    color: "#4f46e5",
    icon: "GraduationCap",
  },
  {
    id: 4,
    slug: "kesehatan",
    name: "Kesehatan",
    description: "Layanan kesehatan, rumah sakit, dan kampanye hidup sehat untuk masyarakat.",
    color: "#0d9488",
    icon: "HeartPulse",
  },
  {
    id: 5,
    slug: "olahraga",
    name: "Olahraga",
    description: "Prestasi atlet dan geliat olahraga warga Kota Cilegon di berbagai ajang.",
    color: "#0891b2",
    icon: "Trophy",
  },
  {
    id: 6,
    slug: "ekonomi",
    name: "Ekonomi",
    description: "UMKM, industri, tenaga kerja, dan denyut ekonomi kelurahan.",
    color: "#ca8a04",
    icon: "TrendingUp",
  },
  {
    id: 7,
    slug: "sosial",
    name: "Sosial",
    description: "Kegiatan masyarakat, gotong royong, bantuan sosial, dan kehidupan bertetangga.",
    color: "#db2777",
    icon: "Users",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export function getCategory(slug: string | null | undefined): Category | undefined {
  if (!slug) return undefined;
  return CATEGORY_MAP[slug];
}

export function categoryColor(slug: string | null | undefined): string {
  return getCategory(slug)?.color ?? "#f85e16";
}

export function categoryName(slug: string | null | undefined): string {
  return getCategory(slug)?.name ?? "Berita";
}

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as CategorySlug[];

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as string[]).includes(value);
}
