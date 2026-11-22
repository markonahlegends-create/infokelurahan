import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Kontak Redaksi",
  description:
    "Hubungi redaksi Info Kelurahan untuk mengirim rilis berita, usulan agenda, koreksi, atau kerja sama.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Kontak"
          title="Hubungi redaksi Info Kelurahan"
          description="Kirimkan rilis, foto kegiatan, usulan agenda, atau koreksi berita. Kami membaca setiap pesan yang masuk."
          breadcrumb={[{ label: "Kontak" }]}
        />

        <section className="container-page py-8 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.1fr)]">
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: "redaksi@infokelurahan.id" },
                { icon: Phone, label: "Telepon", value: "(0254) 391-112" },
                { icon: MapPin, label: "Sekretariat", value: "Kota Cilegon, Banten 42411" },
                { icon: Clock, label: "Jam kerja", value: "Senin–Jumat, 08.00–16.00 WIB" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.05} distance={18} direction="right">
                  <div className="flex items-start gap-3 rounded-xl border border-ink-900/8 bg-white p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-flame-50 text-flame-600 ring-1 ring-flame-100">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[13px] font-bold text-ink-900">{item.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <div className="rounded-2xl bg-ink-950 p-5 text-white">
                <h3 className="text-[15px] font-extrabold">Panduan kirim rilis</h3>
                <ul className="mt-2.5 space-y-2 text-[11.5px] leading-relaxed text-ink-300">
                  {[
                    "Sertakan nama kegiatan, waktu, dan lokasi secara jelas.",
                    "Lampirkan foto beresolusi tinggi bila ada (min. 1200 px).",
                    "Cantumkan narahubung yang dapat dihubungi untuk verifikasi.",
                    "Rilis akan ditinjau redaksi sebelum diterbitkan.",
                  ].map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flame-400" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
