import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Radio } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS } from "@/lib/wilayah";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden bg-ink-950 text-ink-200">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_12%_0%,rgba(248,94,22,.35),transparent_45%),radial-gradient(circle_at_88%_100%,rgba(20,184,166,.28),transparent_45%)]"
      />
      <div className="relative">
        {/* CTA strip */}
        <div className="container-page pt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.03] p-6 sm:p-9">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-flame-500/25 blur-3xl" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-flame-400">
                  <Radio className="h-3.5 w-3.5" /> Suara Warga Kelurahan
                </p>
                <h2 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-[28px]">
                  Punya informasi, kegiatan, atau keluhan dari kelurahan Anda?
                </h2>
                <p className="mt-2 max-w-lg text-sm text-ink-300">
                  Kirimkan rilis, foto kegiatan, atau usulan berita ke redaksi. Warga juga bisa
                  mengusulkan agenda kelurahan untuk ditampilkan di portal ini.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <a
                  href="mailto:redaksi@infokelurahan.id"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-flame-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-600"
                >
                  <Mail className="h-4 w-4" /> Kirim Rilis
                </a>
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Kontak Redaksi <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700 text-[15px] font-extrabold text-white">
                IK
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Info<span className="text-flame-400">Kelurahan</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              Portal berita dan informasi kelurahan Kota Cilegon. Menyajikan kabar pemerintahan,
              pembangunan, pendidikan, kesehatan, olahraga, dan kehidupan warga dari 8 kecamatan
              serta 43 kelurahan.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping-slow rounded-full bg-sea-400" />
                <span className="relative h-2 w-2 rounded-full bg-sea-400" />
              </span>
              <span className="text-xs font-semibold text-sea-400">Redaksi aktif memantau kelurahan</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">Rubrik</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="group flex items-center gap-2 text-[13.5px] text-ink-300 transition hover:text-white"
                  >
                    <span
                      className="h-1 w-1 rounded-full opacity-70 transition group-hover:opacity-100"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">Kecamatan</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {DISTRICTS.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/wilayah/${d.slug}`}
                    className="flex items-center justify-between text-[13.5px] text-ink-300 transition hover:text-white"
                  >
                    {d.name}
                    <span className="text-[10px] text-ink-500">{d.kelurahan_count} kel.</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">Redaksi</h3>
            <ul className="space-y-3.5 text-[13.5px] text-ink-300">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                <span>
                  Sekretariat Redaksi
                  <br />
                  Kota Cilegon, Banten 42411
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                <span>(0254) 391-112</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                <span>redaksi@infokelurahan.id</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/tentang" className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-ink-200 transition hover:bg-white/10">
                Tentang Kami
              </Link>
              <Link href="/agenda" className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-ink-200 transition hover:bg-white/10">
                Agenda
              </Link>
              <a href="/rss.xml" className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-ink-200 transition hover:bg-white/10">
                RSS
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-[11.5px] text-ink-400 sm:flex-row">
            <p>© {year} Info Kelurahan. Dibangun untuk warga Kota Cilegon.</p>
            <p className="text-center sm:text-right">
              Sumber berita awal:{" "}
              <a
                href="https://berita.cilegon.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-200 underline decoration-flame-500/60 underline-offset-2 hover:text-white"
              >
                Diskominfo Kota Cilegon
              </a>
              . Foto hak milik sumber aslinya.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
