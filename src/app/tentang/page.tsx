import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  Github,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Tentang Info Kelurahan",
  description:
    "Info Kelurahan adalah portal berita dan informasi kelurahan Kota Cilegon yang dibangun dengan teknologi terbuka dan gratis.",
  alternates: { canonical: "/tentang" },
};

const STACK = [
  { icon: Layers, name: "Next.js 16", desc: "Framework React dengan App Router, server components, dan optimasi performa." },
  { icon: Sparkles, name: "Tailwind CSS 4", desc: "Design system dengan token warna dan utilitas kustom yang konsisten." },
  { icon: Zap, name: "Framer Motion", desc: "Animasi deklaratif: transisi halaman, parallax, dan mikrointeraksi." },
  { icon: Database, name: "Supabase", desc: "Postgres gratis dengan REST API untuk penyimpanan berita, agenda, dan pengumuman." },
  { icon: ShieldCheck, name: "Admin ber-HMAC", desc: "Sesi redaksi ditandatangani HMAC-SHA256 tanpa layanan autentikasi berbayar." },
  { icon: Github, name: "Open source", desc: "Seluruh kode dapat dijalankan ulang, dimodifikasi, dan di-host di Vercel secara gratis." },
];

export default function TentangPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Tentang"
          title="Kabar warga, dari kelurahan untuk kelurahan"
          description="Info Kelurahan adalah portal berita independen yang menyajikan informasi seputar pemerintahan, pembangunan, dan kehidupan warga di 43 kelurahan Kota Cilegon."
          breadcrumb={[{ label: "Tentang" }]}
        />

        <section className="container-page py-9 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_1fr]">
            <div className="space-y-4">
              <Reveal>
                <article className="rounded-2xl border border-ink-900/8 bg-white p-5 sm:p-6">
                  <h2 className="text-xl font-extrabold text-ink-950">Visi kami</h2>
                  <div className="mt-2 space-y-3 text-[13px] leading-relaxed text-ink-600">
                    <p>
                      Selama ini informasi pembangunan dan kegiatan pemerintahan sering berhenti di
                      tingkat kota. Warga kelurahan kerap baru mengetahui program setelah
                      selesai — atau tidak tahu sama sekali. Info Kelurahan hadir untuk mempersempit
                      jarak itu: menyajikan kabar yang dekat, cepat, dan mudah dipahami.
                    </p>
                    <p>
                      Setiap berita dikelompokkan berdasarkan rubrik dan wilayah sehingga warga bisa
                      langsung mencari informasi yang relevan dengan kelurahannya sendiri — dari
                      pengumuman layanan administrasi hingga agenda Posyandu.
                    </p>
                    <p>
                      Kami percaya informasi publik seharusnya terbuka. Karena itu, portal ini
                      dibangun sepenuhnya dengan perkakas gratis dan open source, serta dapat
                      dijalankan ulang oleh siapa pun yang ingin menghadirkan portal serupa di
                      daerahnya.
                    </p>
                  </div>
                </article>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Kecamatan", value: DISTRICTS.length },
                  { label: "Kelurahan", value: VILLAGES.length },
                  { label: "Rubrik", value: CATEGORIES.length },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.05} distance={16}>
                    <div className="rounded-xl border border-ink-900/8 bg-white p-4 text-center">
                      <p className="text-2xl font-extrabold text-flame-600">{item.value}</p>
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400">
                        {item.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <article className="rounded-2xl border border-ink-900/8 bg-white p-5 sm:p-6">
                  <h2 className="text-xl font-extrabold text-ink-950">Pedoman pemberitaan</h2>
                  <ul className="mt-3 space-y-2.5 text-[12.5px] leading-relaxed text-ink-600">
                    {[
                      "Setiap berita mencantumkan sumber dan tautan asli bila berasal dari rilis resmi.",
                      "Foto dari pihak ketiga ditampilkan dengan kredit kepada sumber aslinya.",
                      "Konten editorial (non-rilis) ditandai jelas pada halaman berita.",
                      "Koreksi dan hak jawab dapat dikirimkan melalui kanal kontak redaksi.",
                      "Data kontak kelurahan pada direktori bersifat contoh hingga diperbarui admin.",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>

            <div>
              <SectionHeader eyebrow="Teknologi" title="Dibangun dengan perkakas terbuka" compact />
              <div className="space-y-2.5">
                {STACK.map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.04} distance={16} direction="left">
                    <div className="flex items-start gap-3 rounded-xl border border-ink-900/8 bg-white p-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-950 text-white">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-extrabold text-ink-900">{item.name}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-ink-950 p-5 text-white">
                <h3 className="text-lg font-extrabold">Ingin berkontribusi?</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-300">
                  Warga, jurnalis warga, atau pengurus kelurahan dapat mengirimkan rilis, foto
                  kegiatan, dan usulan agenda.
                </p>
                <Link
                  href="/kontak"
                  className="mt-3 flex items-center justify-center rounded-xl bg-flame-500 py-2.5 text-[12px] font-bold text-white transition hover:bg-flame-600"
                >
                  Hubungi redaksi
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
