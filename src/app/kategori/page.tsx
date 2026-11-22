import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Construction,
  GraduationCap,
  HeartPulse,
  Landmark,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { getRepository } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rubrik Berita",
  description:
    "Tujuh rubrik berita Info Kelurahan: pemerintahan, pembangunan, pendidikan, kesehatan, olahraga, ekonomi, dan sosial.",
  alternates: { canonical: "/kategori" },
};

const ICONS = {
  Landmark,
  Construction,
  GraduationCap,
  HeartPulse,
  Trophy,
  TrendingUp,
  Users,
} as const;

export default async function KategoriPage() {
  const repo = await getRepository();
  const counts = await repo.listCategories();
  const countOf = (slug: string) => counts.find((c) => c.slug === slug)?.post_count ?? 0;

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Rubrik"
          title="Berita sesuai kebutuhan Anda"
          description="Setiap rubrik mengumpulkan kabar dari kelurahan dengan fokus yang berbeda — dari kebijakan pemerintahan hingga prestasi olahraga warga."
          breadcrumb={[{ label: "Rubrik" }]}
        />

        <section className="container-page py-8 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const Icon = ICONS[cat.icon as keyof typeof ICONS] ?? Landmark;
              return (
                <Reveal key={cat.slug} delay={i * 0.05} distance={26}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.07] transition-transform duration-700 group-hover:scale-150"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="flex items-start justify-between">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg transition-transform duration-500 group-hover:rotate-6"
                        style={{
                          backgroundColor: cat.color,
                          boxShadow: `0 12px 26px -14px ${cat.color}`,
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-paper-warm px-2.5 py-1 text-[10.5px] font-extrabold text-ink-500">
                        {countOf(cat.slug)} berita
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-extrabold text-ink-950">{cat.name}</h2>
                    <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink-500">
                      {cat.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold" style={{ color: cat.color }}>
                      Buka rubrik
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
