import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getRepository } from "@/lib/data";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { PostExplorer } from "@/components/news/PostExplorer";
import { NewsCard } from "@/components/news/NewsCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Rubrik tidak ditemukan" };
  return {
    title: `Rubrik ${category.name}`,
    description: category.description,
    alternates: { canonical: `/kategori/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const repo = await getRepository();
  const [page, popular] = await Promise.all([
    repo.listPosts({ category: category.slug, limit: 9 }),
    repo.popularPosts(4),
  ]);

  const others = CATEGORIES.filter((c) => c.slug !== category.slug);
  const featured = page.posts[0];
  const rest = page.posts.slice(1);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={`Rubrik · ${category.name}`}
          title={category.name}
          description={category.description}
          accent={category.color}
          breadcrumb={[{ label: "Rubrik", href: "/kategori" }, { label: category.name }]}
        />

        <div className="border-b border-ink-900/6 bg-white">
          <div className="container-page flex items-center gap-1.5 overflow-x-auto py-2.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
                  cat.slug === category.slug
                    ? "text-white"
                    : "text-ink-600 hover:bg-paper-warm hover:text-ink-900"
                }`}
                style={cat.slug === category.slug ? { backgroundColor: cat.color } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: cat.slug === category.slug ? "#fff" : cat.color }}
                />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <section className="container-page py-8 sm:py-10">
          {page.total === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-20 text-center">
              <p className="text-sm font-bold text-ink-700">Belum ada berita pada rubrik ini.</p>
              <Link
                href="/berita"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-flame-600"
              >
                Lihat semua berita <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                {featured && (
                  <div className="mb-6 grid gap-4 sm:grid-cols-[1.35fr_1fr]">
                    <NewsCard post={featured} variant="overlay" priority />
                    <div className="flex flex-col gap-3.5 rounded-2xl border border-ink-900/8 bg-white p-3.5">
                      {rest.slice(0, 4).map((post, i) => (
                        <NewsCard key={post.id} post={post} variant="horizontal" index={i} />
                      ))}
                    </div>
                  </div>
                )}
                <PostExplorer
                  initialPosts={page.posts}
                  initialTotal={page.total}
                  query={{ category: category.slug }}
                  showCategoryFilter={false}
                />
              </div>

              <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
                <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                  <h3 className="mb-3 text-[12px] font-extrabold uppercase tracking-wider text-ink-900">
                    Paling dibaca
                  </h3>
                  <div className="space-y-3">
                    {popular.map((post, i) => (
                      <NewsCard key={post.id} post={post} variant="horizontal" index={i} />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                  <h3 className="mb-2.5 text-[12px] font-extrabold uppercase tracking-wider text-ink-900">
                    Rubrik lain
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {others.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/kategori/${cat.slug}`}
                        className="flex items-center gap-1.5 rounded-full bg-paper-warm px-2.5 py-1.5 text-[11px] font-bold text-ink-600 transition hover:bg-ink-950 hover:text-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/kategori"
                  className="flex items-center justify-between rounded-2xl bg-ink-950 p-4 text-white transition hover:bg-flame-600"
                >
                  <span className="text-[12.5px] font-bold">Semua rubrik berita</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/berita"
                  className="inline-flex items-center gap-1.5 px-1 text-[11.5px] font-bold text-ink-500 transition hover:text-flame-700"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke indeks berita
                </Link>
              </aside>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
