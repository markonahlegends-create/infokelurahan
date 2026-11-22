"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Newspaper, MapPinned, Landmark, Users } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import type { SiteStats } from "@/lib/types";

export function StatsStrip({ stats }: { stats: SiteStats }) {
  const reduce = useReducedMotion();

  const items = [
    { icon: Newspaper, value: stats.total_posts, label: "Berita terbit", compact: false },
    { icon: MapPinned, value: stats.total_villages, label: "Kelurahan", compact: false },
    { icon: Landmark, value: stats.total_districts, label: "Kecamatan", compact: false },
    { icon: Users, value: 420_000, label: "Jiwa penduduk", compact: true },
  ];

  return (
    <section className="relative z-10 -mt-1">
      <div className="container-page">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-1 shadow-[0_18px_40px_-30px_rgba(10,17,34,0.5)] sm:rounded-3xl"
        >
          <div className="grid grid-cols-2 divide-ink-100 sm:grid-cols-4 sm:divide-x">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-4 sm:px-5 sm:py-5 ${
                  i < 2 ? "border-b border-ink-100 sm:border-b-0" : ""
                } ${i % 2 === 0 ? "border-r border-ink-100 sm:border-r-0" : ""}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-flame-50 text-flame-600 ring-1 ring-flame-100 sm:h-11 sm:w-11">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <CountUp
                    value={item.value}
                    compact={item.compact}
                    className="block text-lg font-extrabold leading-none tracking-tight text-ink-950 sm:text-[22px]"
                  />
                  <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 sm:text-[11px]">
                    {item.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
