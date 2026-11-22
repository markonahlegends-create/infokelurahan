import type { Metadata } from "next";
import Link from "next/link";
import { Search, Hash } from "lucide-react";
import { getRepository } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { PostExplorer } from "@/components/news/PostExplorer";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Hasil pencarian “${q}”` : "Pencarian",
    description: q
      ? `Berita kelurahan Kota Cilegon yang cocok dengan kata kunci ${q}.`
      : "Cari berita dan informasi kelurahan Kota Cilegon.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const repo = await getRepository();
  const page = await repo.listPosts({ q: query || undefined, limit: 9 });

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Pencarian"
          title={query ? `Hasil untuk “${query}”` : "Cari berita kelurahan"}
          description={
            query
              ? `${page.total} berita ditemukan. Gunakan kata kunci lain bila belum sesuai.`
              : "Masukkan kata kunci pada kotak pencarian, misalnya nama kelurahan, kegiatan, atau pejabat."
          }
          breadcrumb={[{ label: "Pencarian" }]}
        >
          <form action="/cari" className="flex max-w-xl items-center gap-2">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Cari berita, kelurahan, atau topik…"
                className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-ink-400 focus:border-flame-400 focus:outline-none"
                aria-label="Kata kunci"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-flame-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-600"
            >
              Cari
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 pr-1 text-[10px] font-bold uppercase tracking-wider text-ink-400">
              <Hash className="h-3 w-3" /> Populer
            </span>
            {["MTQ", "Porprov", "Beasiswa", "CCTV", "Posyandu", "UMKM", "Kelurahan Cibeber"].map(
              (tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-ink-200 transition hover:bg-white/15 hover:text-white"
                >
                  {tag}
                </Link>
              ),
            )}
          </div>
        </PageHero>

        <section className="container-page py-8 sm:py-10">
          {query && page.total > 0 && (
            <PostExplorer
              initialPosts={page.posts}
              initialTotal={page.total}
              query={{ q: query }}
            />
          )}

          {query && page.total === 0 && (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
              <p className="text-sm font-bold text-ink-800">
                Tidak ada berita yang cocok dengan “{query}”.
              </p>
              <p className="mx-auto mt-1 max-w-md text-[12px] leading-relaxed text-ink-400">
                Coba kata kunci yang lebih umum, periksa ejaan, atau jelajahi rubrik berikut.
              </p>
              <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-1.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/kategori/${cat.slug}`}
                    className="rounded-full px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!query && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategori/${cat.slug}`}
                  className="group rounded-2xl border border-ink-900/8 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className="mb-2 block h-1 w-8 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <p className="text-[14px] font-extrabold text-ink-900">{cat.name}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-ink-400">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
