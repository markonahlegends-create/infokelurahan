"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";

/** Peta wilayah interaktif: sorot kecamatan untuk melihat kelurahannya. */
export function DistrictExplorer() {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {DISTRICTS.map((district, i) => {
        const villages = VILLAGES.filter((v) => v.district_slug === district.slug);
        return (
          <motion.div
            key={district.slug}
            initial={reduce ? undefined : { opacity: 0, y: 26, rotateX: -6 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/wilayah/${district.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${district.accent}, ${district.accent}55)` }}
              />
              <span
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: district.accent }}
              />

              <div className="flex items-start justify-between">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: district.accent }}
                >
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="rounded-full bg-paper-warm px-2 py-1 text-[10px] font-bold text-ink-500">
                  {district.kelurahan_count} kelurahan
                </span>
              </div>

              <h3 className="mt-3 text-[17px] font-extrabold text-ink-950">
                Kec. {district.name}
              </h3>
              <p className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
                {district.area_km2} km² · Kode {district.code}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1">
                {villages.slice(0, 3).map((v) => (
                  <span
                    key={v.slug}
                    className="rounded-md bg-paper-warm px-1.5 py-0.5 text-[9.5px] font-semibold text-ink-500"
                  >
                    {v.name}
                  </span>
                ))}
                {villages.length > 3 && (
                  <span className="rounded-md bg-paper-warm px-1.5 py-0.5 text-[9.5px] font-bold text-ink-400">
                    +{villages.length - 3}
                  </span>
                )}
              </div>

              <span className="mt-3 flex items-center gap-1 text-[11px] font-bold text-flame-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Lihat kelurahan <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
