import Link from "next/link";
import { ArrowUpRight, Flame, Newspaper, Radio, MapPin } from "lucide-react";
import { getRepository } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnnouncementTicker } from "@/components/motion/BackToTop";
import { HeroSlider } from "@/components/news/HeroSlider";
import { NewsCard } from "@/components/news/NewsCard";
import { StatsStrip } from "@/components/home/StatsStrip";
import { CategoryRail } from "@/components/home/CategoryRail";
import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { AnnouncementList, AgendaPanel } from "@/components/home/AgendaPanel";
import { NewsletterBox } from "@/components/layout/NewsletterBox";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const repo = await getRepository();

  const [headlinePage, latestPage, popularPage, catCounts, announcements, agendas, stats] =
    await Promise.all([
      repo.listPosts({ limit: 4 }),
      repo.listPosts({ limit: 9 }),
      repo.popularPosts(5),
      repo.listCategories(),
      repo.listAnnouncements(),
      repo.listAgendas(),
      repo.stats(),
    ]);

  const headlines = headlinePage.posts.slice(0, 4);
  const headlineIds = new Set(headlines.map((p) => p.id));
  const latest = latestPage.posts.filter((p) => !headlineIds.has(p.id)).slice(0, 6);
  const popular = popularPage.slice(0, 5);
  const editorial = await repo.listPosts({ limit: 3, category: "pembangunan" });
  const editorialPosts = editorial.posts.filter((p) => !headlineIds.has(p.id));

  return (
    <>
      <AnnouncementTicker items={announcements.map((a) => ({ title: a.title, level: a.level }))} />
      <SiteHeader />

      <main>
        <HeroSlider posts={headlines} />
        <StatsStrip stats={stats} />

        {/* ── Berita terkini + sidebar ─────────────────────────────── */}
        <section className="container-page py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
            <div>
              <SectionHeader
                eyebrow="Kabar terbaru"
                title="Peristiwa & kegiatan kelurahan"
                description="Liputan terbaru dari 8 kecamatan dan 43 kelurahan Kota Cilegon."
                href="/berita"
                linkLabel="Indeks berita"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {latest.map((post, i) => (
                  <NewsCard key={post.id} post={post} index={i} priority={i < 2} />
                ))}
              </div>

              {latest.length === 1 && (
                <div className="mt-4">
                  {editorialPosts.map((post, i) => (
                    <NewsCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/berita"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-flame-600"
                >
                  Muat semua berita
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
              <Reveal direction="left" distance={24}>
                <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                  <div className="flex items-center gap-2 border-b border-ink-100 bg-paper-warm/60 px-4 py-3">
                    <Flame className="h-4 w-4 text-flame-500" />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-ink-900">
                      Paling dibaca
                    </h3>
                  </div>
                  <ol className="divide-y divide-ink-50 p-2">
                    {popular.map((post, i) => (
                      <li key={post.id}>
                        <Link
                          href={`/berita/${post.slug}`}
                          className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-paper-warm"
                        >
                          <span className="mt-0.5 text-lg font-extrabold leading-none text-ink-200 transition group-hover:text-flame-500">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 block text-[12.5px] font-bold leading-snug text-ink-800 transition group-hover:text-flame-700">
                              {post.title}
                            </span>
                            <span className="mt-0.5 block text-[10px] text-ink-400">
                              {new Intl.NumberFormat("id-ID").format(post.views)} pembaca
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal direction="left" distance={24} delay={0.08}>
                <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                  <div className="flex items-center gap-2 border-b border-ink-100 bg-paper-warm/60 px-4 py-3">
                    <Radio className="h-4 w-4 text-sea-500" />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-ink-900">
                      Pengumuman
                    </h3>
                  </div>
                  <div className="p-2.5">
                    <AnnouncementList items={announcements.slice(0, 3)} />
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" distance={24} delay={0.12}>
                <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                  <div className="flex items-center gap-2 border-b border-ink-100 bg-paper-warm/60 px-4 py-3">
                    <MapPin className="h-4 w-4 text-flame-500" />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-ink-900">
                      Agenda
                    </h3>
                  </div>
                  <div className="p-2">
                    <AgendaPanel agendas={agendas} />
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* ── Rubrik ───────────────────────────────────────────────── */}
        <section className="border-y border-ink-900/6 bg-paper-warm/50 py-10 sm:py-14">
          <div className="container-page">
            <SectionHeader
              eyebrow="Jelajahi rubrik"
              title="Berita sesuai kebutuhan Anda"
              description="Tujuh rubrik utama yang memetakan denyut kehidupan kelurahan."
              href="/kategori"
              linkLabel="Semua rubrik"
            />
            <CategoryRail counts={catCounts} />
          </div>
        </section>

        {/* ── Peta wilayah ────────────────────────────────────────── */}
        <section className="container-page py-10 sm:py-14">
          <SectionHeader
            eyebrow="Peta kelurahan"
            title="8 kecamatan, 43 kelurahan"
            description={`Total ${DISTRICTS.reduce((s, d) => s + d.area_km2, 0).toFixed(2)} km² wilayah Kota Cilegon. Pilih kecamatan untuk melihat profil kelurahannya.`}
            href="/wilayah"
            linkLabel="Buka peta wilayah"
          />
          <DistrictExplorer />
        </section>

        {/* ── Sorotan + populer ───────────────────────────────────── */}
        <section className="container-page pb-10 sm:pb-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="Sorotan"
                title="Cerita dari balai kelurahan"
                href="/berita"
                compact
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {(editorialPosts.length > 0 ? editorialPosts : latest.slice(0, 2)).map((post, i) => (
                  <NewsCard key={post.id} post={post} variant="overlay" index={i} />
                ))}
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Terpopuler" title="Paling banyak dibaca" compact />
              <div className="space-y-3.5 rounded-2xl border border-ink-900/8 bg-white p-3.5">
                {popular.map((post, i) => (
                  <NewsCard key={post.id} post={post} variant="horizontal" index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Jelajah kategori cepat ──────────────────────────────── */}
        <section className="container-page pb-10">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ink-900/8 bg-white p-3">
            <span className="flex items-center gap-1.5 pr-1 text-[11px] font-extrabold uppercase tracking-wider text-ink-400">
              <Newspaper className="h-3.5 w-3.5" /> Topik cepat
            </span>
            {CATEGORIES.map((cat) => (
              <Chip key={cat.slug} href={`/kategori/${cat.slug}`} color={cat.color}>
                {cat.name}
              </Chip>
            ))}
            {VILLAGES.slice(0, 3).map((v) => (
              <Chip key={v.slug} href={`/wilayah/kelurahan/${v.slug}`}>
                Kel. {v.name}
              </Chip>
            ))}
          </div>
        </section>

        {/* ── Buletin ─────────────────────────────────────────────── */}
        <section className="container-page pb-4">
          <NewsletterBox />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
