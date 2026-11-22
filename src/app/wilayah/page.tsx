import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DISTRICTS, VILLAGES, WILAYAH_STATS } from "@/lib/wilayah";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { WilayahExplorer } from "@/components/wilayah/WilayahExplorer";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/motion/CountUp";

export const metadata: Metadata = {
  title: "Wilayah — 8 Kecamatan & 43 Kelurahan",
  description:
    "Direktori lengkap 8 kecamatan dan 43 kelurahan di Kota Cilegon, Banten, beserta profil dan informasi layanan masing-masing kelurahan.",
  alternates: { canonical: "/wilayah" },
};

export default function WilayahPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Peta wilayah"
          title="8 kecamatan, 43 kelurahan di Kota Cilegon"
          description={`Kota Cilegon terbentang seluas ${WILAYAH_STATS.area.toFixed(2)} km² dari pesisir Selat Sunda hingga kawasan industri selatan. Jelajahi profil setiap kelurahan di sini.`}
          breadcrumb={[{ label: "Wilayah" }]}
        >
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Kecamatan", value: WILAYAH_STATS.districts },
              { label: "Kelurahan", value: WILAYAH_STATS.villages },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-baseline gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5"
              >
                <CountUp value={item.value} className="text-base font-extrabold text-white" />
                <span className="text-[11px] font-semibold text-ink-300">{item.label}</span>
              </div>
            ))}
            <div className="flex items-baseline gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
              <span className="text-base font-extrabold text-white">{WILAYAH_STATS.area.toFixed(2)}</span>
              <span className="text-[11px] font-semibold text-ink-300">km²</span>
            </div>
          </div>
        </PageHero>

        <section className="container-page py-8 sm:py-10">
          <SectionHeader
            eyebrow="Kecamatan"
            title="Pilih kecamatan"
            description="Setiap kecamatan memiliki karakter wilayah dan jumlah kelurahan yang berbeda."
            compact
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DISTRICTS.map((district, i) => {
              const count = VILLAGES.filter((v) => v.district_slug === district.slug).length;
              return (
                <Reveal key={district.slug} delay={i * 0.04} distance={22}>
                  <Link
                    href={`/wilayah/${district.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-4 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: district.accent }}
                    />
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-extrabold text-ink-950">{district.name}</h3>
                      <ArrowUpRight className="h-4 w-4 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-800" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink-500">
                      {district.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-[10.5px] font-bold text-ink-400">
                      <span
                        className="rounded-md px-1.5 py-0.5 text-white"
                        style={{ backgroundColor: district.accent }}
                      >
                        {count} kelurahan
                      </span>
                      <span>{district.area_km2} km²</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="container-page pb-12">
          <SectionHeader
            eyebrow="Direktori kelurahan"
            title="Semua kelurahan A–Z"
            description="Gunakan pencarian atau filter kecamatan untuk menemukan kelurahan Anda."
            compact
          />
          <WilayahExplorer />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
