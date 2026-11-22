import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  ExternalLink,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react";
import { getRepository } from "@/lib/data";
import { categoryColor, categoryName, getCategory } from "@/lib/categories";
import { getDistrict, getVillage } from "@/lib/wilayah";
import { formatLongDateID, readingTime, safeJsonLd } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArticleTools } from "@/components/news/ArticleTools";
import { RichParagraph } from "@/components/news/RichParagraph";
import { SmartImage } from "@/components/news/SmartImage";
import { NewsCard } from "@/components/news/NewsCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = await getRepository();
  const post = await repo.getPostBySlug(slug);
  if (!post) return { title: "Berita tidak ditemukan" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/berita/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const repo = await getRepository();
  const post = await repo.getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const [related, popular] = await Promise.all([
    repo.relatedPosts(post, 3),
    repo.popularPosts(4),
  ]);

  const category = getCategory(post.category_slug);
  const district = getDistrict(post.district_slug);
  const village = getVillage(post.village_slug);
  const color = categoryColor(post.category_slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: [{ "@type": "Person", name: post.author }],
    publisher: {
      "@type": "Organization",
      name: "Info Kelurahan",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    },
    articleSection: category?.name,
    keywords: [category?.name, district?.name, village?.name, "Cilegon"].filter(Boolean).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SiteHeader />

      <main>
        {/* Progress tipis khusus halaman artikel */}
        <div className="container-page pt-4">
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-flame-600">
              Beranda
            </Link>
            <span>/</span>
            <Link href={`/kategori/${post.category_slug}`} className="transition hover:text-flame-600">
              {categoryName(post.category_slug)}
            </Link>
            {district && (
              <>
                <span>/</span>
                <Link href={`/wilayah/${district.slug}`} className="transition hover:text-flame-600">
                  {district.name}
                </Link>
              </>
            )}
          </nav>
        </div>

        <article className="container-page pt-4 pb-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
            <div className="min-w-0">
              {/* Kepala artikel */}
              <header className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/kategori/${post.category_slug}`}
                    className="rounded-full px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90"
                    style={{ backgroundColor: color }}
                  >
                    {categoryName(post.category_slug)}
                  </Link>
                  {village && (
                    <Link
                      href={`/wilayah/kelurahan/${village.slug}`}
                      className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[10.5px] font-bold text-ink-600 transition hover:border-flame-300 hover:text-flame-700"
                    >
                      <MapPin className="h-3 w-3" /> Kel. {village.name}
                    </Link>
                  )}
                  {post.is_headline && (
                    <span className="rounded-full bg-flame-50 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-flame-700 ring-1 ring-flame-200">
                      Headline
                    </span>
                  )}
                </div>

                <h1 className="text-balance text-[27px] font-extrabold leading-[1.15] tracking-tight text-ink-950 sm:text-[34px] lg:text-[40px]">
                  {post.title}
                </h1>

                <p className="mt-3 text-[14px] leading-relaxed text-ink-600 sm:text-[15.5px]">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5 border-y border-ink-900/6 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-flame-700 text-[11px] font-extrabold text-white">
                      IK
                    </span>
                    <div className="leading-tight">
                      <p className="flex items-center gap-1 text-[12.5px] font-bold text-ink-900">
                        <UserRound className="h-3.5 w-3.5 text-ink-400" />
                        {post.author}
                      </p>
                      <p className="text-[10.5px] text-ink-400">
                        {post.editor ? `Editor: ${post.editor}` : "Redaksi Info Kelurahan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-ink-500">
                    <span>{formatLongDateID(post.published_at)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5 text-flame-500" />
                      {readingTime(post.content)} menit baca
                    </span>
                  </div>
                </div>
              </header>

              {/* Foto utama dengan efek paralaks ringan */}
              <Reveal className="mt-5" distance={20}>
                <figure>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-100 shadow-lg shadow-ink-950/10">
                    <SmartImage
                      src={post.cover_image}
                      alt={post.title}
                      priority
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                  <figcaption className="mt-2 text-[11px] leading-relaxed text-ink-400">
                    {post.title} — <span className="font-semibold">Dok. {post.source}</span>
                  </figcaption>
                </figure>
              </Reveal>

              <div className="mt-5">
                <ArticleTools
                  id={post.id}
                  slug={post.slug}
                  title={post.title}
                  views={post.views}
                />
              </div>

              {/* Isi berita */}
              <div id="article-body" className="article-prose mt-6 max-w-3xl">
                {post.content.map((paragraph, i) => (
                  <RichParagraph key={i} text={paragraph} />
                ))}

                {post.source_url && (
                  <div className="not-prose mt-6 rounded-xl border border-ink-900/8 bg-paper-warm/70 p-4">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">
                      Sumber
                    </p>
                    <a
                      href={post.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-flame-700 underline decoration-flame-300 underline-offset-2 hover:text-flame-800"
                    >
                      {post.source} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Tag */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink-900/6 pt-4">
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  <Tag className="h-3.5 w-3.5" /> Tag
                </span>
                {[category?.name, district?.name, village?.name, "Cilegon", "Banten"]
                  .filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i)
                  .map((tag) => (
                    <Link
                      key={tag}
                      href={`/cari?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-600 ring-1 ring-ink-200 transition hover:bg-flame-50 hover:text-flame-700 hover:ring-flame-200"
                    >
                      #{tag}
                    </Link>
                  ))}
              </div>

              {/* Navigasi kembali */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-950 p-4 text-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-flame-400">
                    Telusuri lebih jauh
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink-200">
                    Baca berita lain dari {district?.name ?? "Kota Cilegon"}
                  </p>
                </div>
                <Link
                  href={district ? `/wilayah/${district.slug}` : "/berita"}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-ink-950 transition hover:bg-flame-500 hover:text-white"
                >
                  Jelajahi wilayah <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Berita terkait */}
              <section className="mt-10">
                <SectionHeader eyebrow="Baca juga" title="Berita terkait" compact />
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((item, i) => (
                    <NewsCard key={item.id} post={item} index={i} />
                  ))}
                </div>
              </section>

              <div className="mt-6">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink-500 transition hover:text-flame-700"
                >
                  <ArrowLeft className="h-4 w-4" /> Kembali ke indeks berita
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-36 lg:self-start">
              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wider text-ink-900">
                  <span className="h-3 w-1 rounded-full bg-flame-500" />
                  Paling dibaca
                </h3>
                <div className="space-y-3">
                  {popular.map((item, i) => (
                    <NewsCard key={item.id} post={item} variant="horizontal" index={i} />
                  ))}
                </div>
              </div>

              {district && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                  <div
                    className="px-4 py-3 text-white"
                    style={{ background: `linear-gradient(120deg, ${district.accent}, ${district.accent}bb)` }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
                      Kecamatan
                    </p>
                    <p className="text-lg font-extrabold">{district.name}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[11.5px] leading-relaxed text-ink-500">{district.description}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                      <div className="rounded-lg bg-paper-warm px-2 py-2">
                        <p className="text-sm font-extrabold text-ink-900">{district.kelurahan_count}</p>
                        <p className="text-[9.5px] font-semibold uppercase tracking-wider text-ink-400">Kelurahan</p>
                      </div>
                      <div className="rounded-lg bg-paper-warm px-2 py-2">
                        <p className="text-sm font-extrabold text-ink-900">{district.area_km2}</p>
                        <p className="text-[9.5px] font-semibold uppercase tracking-wider text-ink-400">km²</p>
                      </div>
                    </div>
                    <Link
                      href={`/wilayah/${district.slug}`}
                      className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-ink-950 py-2 text-[11.5px] font-bold text-white transition hover:bg-flame-600"
                    >
                      Profil kecamatan <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
