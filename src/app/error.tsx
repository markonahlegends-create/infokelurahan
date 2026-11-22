"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCw, TriangleAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[info-kelurahan] kesalahan halaman:", error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-ink-900/8 bg-white p-6 text-center shadow-xl shadow-ink-950/5 sm:p-8">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-flame-50 text-flame-600 ring-1 ring-flame-100">
          <TriangleAlert className="h-7 w-7" />
        </span>
        <h1 className="text-xl font-extrabold text-ink-950">Ada kendala saat memuat halaman</h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
          Silakan coba muat ulang. Bila masalah berlanjut, redaksi dapat memeriksa koneksi data
          (Supabase) atau log server.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full bg-flame-500 px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-flame-600"
          >
            <RotateCw className="h-3.5 w-3.5" /> Coba lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2.5 text-[12px] font-bold text-ink-700 transition hover:bg-paper-warm"
          >
            <Home className="h-3.5 w-3.5" /> Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
