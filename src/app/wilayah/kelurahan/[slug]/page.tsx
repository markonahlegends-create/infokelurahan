import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getRepository } from "@/lib/data";
import { VILLAGES, getDistrict, getVillage } from "@/lib/wilayah";
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
  const village = getVillage(slug);
  if (!village) return { title: "Kelurahan tidak ditemukan" };
  const district = getDistrict(village.district_slug);
  return {
    title: `Kelurahan ${village.name}, Kecamatan ${district?.name}`,
    description: `${village.profile} Profil resmi dan berita Kelurahan ${village.name}, Kecamatan ${district?.name}, Kota Cilegon.`,
    alternates: { canonical: `/wilayah/kelurahan/${village.slug}` },
  };
}

const SERVICES = [
  { icon: ShieldCheck, title: "Surat Keterangan Domisili", desc: "Untuk keperluan sekolah, pekerjaan, dan administrasi bank." },
  { icon: Users, title: "Kartu Keluarga & KTP-el", desc: "Pengantar pencatatan dan perubahan data kependudukan." },
  { icon: Sparkles, title: "Izin Usaha Mikro", desc: "Pendaftaran dan legalisasi usaha skala rumahan." },
  { icon: Clock, title: "Legalisasi Dokumen", desc: "Pengesahan fotokopi dokumen kependudukan." },
];

export default async function VillagePage({ params }: Props) {
  const { slug } = await params;
  const village = getVillage(slug);
  if (!village) notFound();

  const district = getDistrict(village.district_slug)!;
  const siblingVillages = VILLAGES.filter(
    (v) => v.district_slug === district.slug && v.slug !== village.slug,
  );

  const repo = await getRepository();
  const [page, announcements] = await Promise.all([
    repo.listPosts({ village: village.slug, limit: 6 }),
    repo.listAnnouncements(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={`Kelurahan · ${village.postal_code}`}
          title={`Kelurahan ${village.name}`}
          description={village.profile}
          accent={district.accent}
          breadcrumb={[
            { label: "Wilayah", href: "/wilayah" },
            { label: district.name, href: `/wilayah/${district.slug}` },
            { label: village.name },
          ]}
        >
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold">
              <MapPin className="h-3.5 w-3.5" style={{ color: district.accent }} />
              Kec. {district.name}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold">
              <Users className="h-3.5 w-3.5" style={{ color: district.accent }} />
              Bagian dari 43 kelurahan Kota Cilegon
            </span>
            <Link
              href={`/cari?q=${encodeURIComponent(village.name)}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-flame-500 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-flame-600"
            >
              Berita kelurahan ini <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </PageHero>

        <section className="container-page py-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Kecamatan", value: district.name },
                  { label: "Kode pos", value: village.postal_code },
                  { label: "Luas kecamatan", value: `${district.area_km2} km²` },
                ].map((item) => (
                  <Reveal key={item.label} distance={16}>
                    <div className="rounded-xl border border-ink-900/8 bg-white p-3.5">
                      <p className="text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[15px] font-extrabold text-ink-950">{item.value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-ink-900/8 bg-white p-4">
                <h2 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-ink-900">
                  <span className="h-3 w-1 rounded-full" style={{ backgroundColor: district.accent }} />
                  Tentang kelurahan
                </h2>
                <p className="text-[12.5px] leading-relaxed text-ink-600">
                  Kelurahan {village.name} merupakan bagian dari Kecamatan {district.name}, Kota
                  Cilegon, Provinsi Banten. {village.profile} Kantor kelurahan melayani warga pada
                  hari kerja pukul 08.00–15.30 WIB dan menjadi pusat informasi kegiatan
                  kemasyarakatan di wilayah ini.
                </p>
              </div>

              <div className="mt-4">
                <SectionHeader
                  eyebrow="Pelayanan"
                  title="Layanan kantor kelurahan"
                  accent={district.accent}
                  compact
                />
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {SERVICES.map((service, i) => (
                    <Reveal key={service.title} delay={i * 0.05} distance={18}>
                      <div className="group flex h-full items-start gap-3 rounded-xl border border-ink-900/8 bg-white p-3.5 transition hover:-translate-y-0.5 hover:shadow-md">
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white"
                          style={{ backgroundColor: district.accent }}
                        >
                          <service.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[12.5px] font-extrabold text-ink-900">{service.title}</p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">{service.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <SectionHeader
                  eyebrow="Berita kelurahan"
                  title={`Kabar terbaru dari Kel. ${village.name}`}
                  href={`/cari?q=${encodeURIComponent(village.name)}`}
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
                      Belum ada berita khusus dari kelurahan ini.
                    </p>
                    <p className="mx-auto mt-1 max-w-md text-[11.5px] leading-relaxed text-ink-400">
                      Redaksi terus memantau kegiatan warga. Kirimkan informasi kegiatan kelurahan
                      Anda melalui formulir kontak redaksi.
                    </p>
                    <Link
                      href="/kontak"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[11.5px] font-bold text-white transition hover:bg-flame-600"
                    >
                      Kirim informasi <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                <div
                  className="px-4 py-3 text-white"
                  style={{ background: `linear-gradient(120deg, ${district.accent}, ${district.accent}bb)` }}
                >
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] opacity-80">
                    Kontak
                  </p>
                  <p className="text-[15px] font-extrabold">Kantor Kelurahan {village.name}</p>
                </div>
                <ul className="space-y-3 p-4 text-[11.5px]">
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: district.accent }} />
                    <span className="text-ink-600">{village.address}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: district.accent }} />
                    <span className="text-ink-600">{village.phone}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: district.accent }} />
                    <span className="break-all text-ink-600">{village.email}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: district.accent }} />
                    <span className="text-ink-600">Senin–Jumat, 08.00–15.30 WIB</span>
                  </li>
                </ul>
                <p className="border-t border-ink-100 px-4 py-2.5 text-[9.5px] leading-relaxed text-ink-400">
                  Data kontak bersifat contoh. Perbarui melalui dashboard admin agar sesuai data
                  resmi kelurahan.
                </p>
              </div>

              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-2 text-[11.5px] font-extrabold uppercase tracking-wider text-ink-900">
                  Pengumuman terbaru
                </h3>
                <ul className="space-y-2.5">
                  {announcements.slice(0, 3).map((item) => (
                    <li key={item.id} className="border-b border-ink-50 pb-2.5 last:border-none last:pb-0">
                      <p className="line-clamp-2 text-[11.5px] font-bold leading-snug text-ink-800">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-ink-400">
                        {item.level}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-ink-900/8 bg-white p-4">
                <h3 className="mb-2.5 text-[11.5px] font-extrabold uppercase tracking-wider text-ink-900">
                  Kelurahan lain di Kec. {district.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {siblingVillages.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/wilayah/kelurahan/${v.slug}`}
                      className="rounded-full bg-paper-warm px-2.5 py-1.5 text-[10.5px] font-bold text-ink-600 transition hover:bg-ink-950 hover:text-white"
                    >
                      {v.name}
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
