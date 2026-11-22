import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Ruler, Building2 } from "lucide-react";
import { getRepository } from "@/lib/data";
import { DISTRICTS, VILLAGES, getDistrict } from "@/lib/wilayah";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (!district) return { title: "Kecamatan tidak ditemukan" };
  return {
    title: `Kecamatan ${district.name}`,
    description: district.description,
    alternates: { canonical: `/wilayah/${district.slug}` },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (!district) notFound();

  const villages = VILLAGES.filter((v) => v.district_slug === district.slug);
  const repo = await getRepository();
  const [page, popular] = await Promise.all([
    repo.listPosts({ district: district.slug, limit: 6 }),
    repo.popularPosts(3),
  ]);

  const neighbours = DISTRICTS.filter((d) => d.slug !== district.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={`Kecamatan · ${district.code}`}
          title={`Kecamatan ${district.name}`}
          description={district.description}
          accent={district.accent}
          breadcrumb={[{ label: "Wilayah", href: "/wilayah" }, { label: district.name }]}
        >
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold">
              <Building2 className="h-3.5 w-3.5" style={{ color: district.accent }} />
              {district.kelurahan_count} kelurahan
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold">
              <Ruler className="h-3.5 w-3.5" style={{ color: district.accent }} />
              {district.area_km2} km²
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold">
              <MapPin className="h-3.5 w-3.5" style={{ color: district.accent }} />
              Kota Cilegon, Banten
            </span>
          </div>
        </PageHero>

        <section className="container-page py-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <SectionHeader
                eyebrow="Kelurahan"
                title={`Wilayah di Kecamatan ${district.name}`}
                description={`${villages.length} kelurahan dengan kantor pelayanan masing-masing.`}
                compact
              />
              <div className="grid gap-2.5 sm:grid-cols-2">
                {villages.map((village, i) => (
                  <Reveal key={village.slug} delay={i * 0.04} distance={18}>
                    <Link
                      href={`/wilayah/kelurahan/${village.slug}`}
                      className="group flex h-full items-start gap-3 rounded-xl border border-ink-900/8 bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span
                        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold text-white"
                        style={{ backgroundColor: district.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[13.5px] font-extrabold text-ink-900 group-hover:text-flame-700">
                            Kel. {village.name}
                          </span>
                          <span className="rounded bg-paper-warm px-1.5 py-0.5 text-[9px] font-bold text-ink-500">
                            {village.postal_code}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[11px] leading-relaxed text-ink-500">
                          {village.profile}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-flame-500" />
                    </Link>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10">
                <SectionHeader
                  eyebrow="Berita"
                  title={`Kabar dari Kecamatan ${district.name}`}
                  href={`/cari?q=${encodeURIComponent(district.name)}`}
                  linkLabel="Cari lebih banyak"
                  accent={district.accent}
                  compact
                />
                {page.posts.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {page.posts.map((post, i) => (
                      <NewsCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-12 text-center">
                    <p className="text-[13px] font-bold text-ink-700">
                      Belum ada berita khusus dari kecamatan ini.
                    </p>
                    <Link
                      href="/berita"
                      className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold text-flame-600"
                    >
                      Lihat semua berita <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-3 text-[11.5px] font-extrabold uppercase tracking-wider text-ink-900">
                  Data kecamatan
                </h3>
                <dl className="space-y-2.5 text-[11.5px]">
                  {[
                    ["Kode Kemendagri", district.code],
                    ["Luas wilayah", `${district.area_km2} km²`],
                    ["Jumlah kelurahan", String(district.kelurahan_count)],
                    ["Kota", "Cilegon"],
                    ["Provinsi", "Banten"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 border-b border-ink-50 pb-2 last:border-none last:pb-0">
                      <dt className="text-ink-500">{label}</dt>
                      <dd className="font-bold text-ink-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-2.5 text-[11.5px] font-extrabold uppercase tracking-wider text-ink-900">
                  Paling dibaca
                </h3>
                <div className="space-y-3">
                  {popular.map((post, i) => (
                    <NewsCard key={post.id} post={post} variant="horizontal" index={i} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-2.5 text-[11.5px] font-extrabold uppercase tracking-wider text-ink-900">
                  Kecamatan lain
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {neighbours.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/wilayah/${d.slug}`}
                      className="flex items-center gap-1.5 rounded-full bg-paper-warm px-2.5 py-1.5 text-[11px] font-bold text-ink-600 transition hover:bg-ink-950 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.accent }} />
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
