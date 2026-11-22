"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search, X } from "lucide-react";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";

/** Direktori 43 kelurahan dengan pencarian cepat dan filter kecamatan. */
export function WilayahExplorer() {
  const [district, setDistrict] = useState<string>("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VILLAGES.filter((v) => {
      if (district && v.district_slug !== district) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.postal_code.includes(q) ||
        v.district_slug.includes(q)
      );
    });
  }, [district, query]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-ink-900/8 bg-white p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            type="button"
            onClick={() => setDistrict("")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
              district === ""
                ? "bg-ink-950 text-white"
                : "border border-ink-200 text-ink-600 hover:border-flame-300 hover:text-flame-700"
            }`}
          >
            Semua ({VILLAGES.length})
          </button>
          {DISTRICTS.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => setDistrict(d.slug)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
                district === d.slug
                  ? "text-white"
                  : "border border-ink-200 text-ink-600 hover:border-flame-300 hover:text-flame-700"
              }`}
              style={district === d.slug ? { backgroundColor: d.accent } : undefined}
            >
              {d.name}
            </button>
          ))}
        </div>

        <label className="relative block shrink-0 lg:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kelurahan atau kode pos…"
            className="w-full rounded-full border border-ink-200 bg-paper-warm/60 py-2 pl-9 pr-8 text-[12px] font-semibold text-ink-800 placeholder:font-normal placeholder:text-ink-400 focus:border-flame-400 focus:bg-white focus:outline-none"
            aria-label="Cari kelurahan"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full bg-ink-200 text-ink-600"
              aria-label="Bersihkan pencarian"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          )}
        </label>
      </div>

      <p className="mb-3 text-[11.5px] font-semibold text-ink-400">
        Menampilkan {filtered.length} kelurahan
      </p>

      <motion.div layout className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence initial={false}>
          {filtered.map((village, i) => {
            const parent = DISTRICTS.find((d) => d.slug === village.district_slug);
            return (
              <motion.div
                key={village.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min((i % 12) * 0.03, 0.25) }}
              >
                <Link
                  href={`/wilayah/kelurahan/${village.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-ink-900/8 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: parent?.accent }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0" style={{ color: parent?.accent }} />
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-ink-400">
                        Kec. {parent?.name}
                      </span>
                    </div>
                    <h3 className="mt-1 text-[13.5px] font-extrabold leading-tight text-ink-900 transition group-hover:text-flame-700">
                      {village.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-[10px] font-semibold text-ink-400">
                    Kode pos {village.postal_code}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
          <p className="text-sm font-bold text-ink-700">Kelurahan tidak ditemukan.</p>
          <p className="mt-1 text-[12px] text-ink-400">
            Coba kata kunci lain atau pilih kecamatan yang berbeda.
          </p>
        </div>
      )}
    </div>
  );
}
