import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Megaphone, UserRound } from "lucide-react";
import { getRepository } from "@/lib/data";
import { getDistrict } from "@/lib/wilayah";
import { formatLongDateID, formatTimeID, wibDayNumber, wibMonthShort } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda & Pengumuman Kelurahan",
  description:
    "Jadwal kegiatan kelurahan, musyawarah, posyandu, festival UMKM, dan pengumuman resmi dari kelurahan Kota Cilegon.",
  alternates: { canonical: "/agenda" },
};

const LEVEL_STYLE = {
  penting: "bg-flame-500 text-white",
  layanan: "bg-sea-500 text-white",
  info: "bg-ink-700 text-white",
} as const;

export default async function AgendaPage() {
  const repo = await getRepository();
  const [agendas, announcements] = await Promise.all([
    repo.listAgendas(),
    repo.listAnnouncements(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Agenda & pengumuman"
          title="Jadwal kegiatan dan pengumuman resmi"
          description="Ikuti musyawarah kelurahan, pelayanan Posyandu, festival UMKM, dan pengumuman penting lainnya."
          breadcrumb={[{ label: "Agenda" }]}
        />

        <section className="container-page py-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <SectionHeader
                eyebrow="Kalender"
                title="Agenda mendatang"
                description="Kegiatan yang terbuka untuk warga, diurutkan dari yang paling dekat."
                compact
              />
              <div className="space-y-3">
                {agendas.map((agenda, i) => {
                  const day = wibDayNumber(agenda.starts_at);
                  const month = wibMonthShort(agenda.starts_at);
                  const district = getDistrict(agenda.district_slug);
                  return (
                    <Reveal key={agenda.id} delay={i * 0.05} distance={20}>
                      <article className="group flex gap-3.5 rounded-2xl border border-ink-900/8 bg-white p-3.5 transition hover:shadow-md sm:gap-4 sm:p-4">
                        <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-ink-950 text-white transition group-hover:bg-flame-600 sm:h-[70px] sm:w-16">
                          <span className="text-xl font-extrabold leading-none">{day}</span>
                          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider opacity-80">
                            {month}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded-md bg-paper-warm px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-ink-500">
                              {district ? `Kec. ${district.name}` : "Kota Cilegon"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-ink-400">
                              <CalendarDays className="h-2.5 w-2.5" />
                              {formatLongDateID(agenda.starts_at)}
                            </span>
                          </div>
                          <h3 className="mt-1 text-[14.5px] font-extrabold leading-snug text-ink-950">
                            {agenda.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink-500">
                            {agenda.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold text-ink-400">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {formatTimeID(agenda.starts_at)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {agenda.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <UserRound className="h-3 w-3" /> {agenda.organizer}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}

                {agendas.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
                    <p className="text-sm font-bold text-ink-700">Belum ada agenda terjadwal.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wider text-ink-900">
                  <Megaphone className="h-4 w-4 text-flame-500" /> Pengumuman resmi
                </h3>
                <div className="space-y-3">
                  {announcements.map((item) => (
                    <article key={item.id} className="border-b border-ink-50 pb-3 last:border-none last:pb-0">
                      <span
                        className={`mb-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                          LEVEL_STYLE[item.level] ?? LEVEL_STYLE.info
                        }`}
                      >
                        {item.level}
                      </span>
                      <h4 className="text-[12.5px] font-bold leading-snug text-ink-900">{item.title}</h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink-500">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-ink-950 p-4 text-white">
                <h3 className="text-[13px] font-extrabold">Usulkan agenda kelurahan</h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-300">
                  Punya kegiatan warga yang layak dipublikasikan? Kirim detail acara ke redaksi
                  untuk ditampilkan di kalender ini.
                </p>
                <Link
                  href="/kontak"
                  className="mt-3 flex items-center justify-center rounded-lg bg-flame-500 py-2.5 text-[11.5px] font-bold text-white transition hover:bg-flame-600"
                >
                  Hubungi redaksi
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
