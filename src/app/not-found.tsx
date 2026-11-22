import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-ink-950 px-4 py-16 text-white">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(circle_at_20%_15%,rgba(248,94,22,.3),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(20,184,166,.24),transparent_45%)]"
      />
      <div className="relative w-full max-w-lg text-center">
        <p className="text-[92px] font-extrabold leading-none tracking-tighter text-white/10 sm:text-[130px]">
          404
        </p>
        <div className="-mt-8 sm:-mt-12">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700">
            <Compass className="h-7 w-7" />
          </span>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Halaman tidak ditemukan</h1>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-300">
            Alamat yang Anda tuju mungkin sudah berpindah atau tidak pernah ada. Coba kembali ke
            beranda atau telusuri rubrik di bawah.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-flame-500 px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-flame-600"
            >
              <ArrowLeft className="h-4 w-4" /> Ke beranda
            </Link>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-white/10"
            >
              <Search className="h-4 w-4" /> Indeks berita
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="rounded-full border border-white/12 px-2.5 py-1 text-[10.5px] font-semibold text-ink-300 transition hover:bg-white/10 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
