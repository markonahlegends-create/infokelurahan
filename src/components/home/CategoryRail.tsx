"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Landmark,
  Construction,
  GraduationCap,
  HeartPulse,
  Trophy,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const ICONS = {
  Landmark,
  Construction,
  GraduationCap,
  HeartPulse,
  Trophy,
  TrendingUp,
  Users,
} as const;

export function CategoryRail({
  counts,
}: {
  counts: { slug: string; post_count: number }[];
}) {
  const reduce = useReducedMotion();
  const countOf = (slug: string) => counts.find((c) => c.slug === slug)?.post_count ?? 0;

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORIES.map((cat, i) => {
        const Icon = ICONS[cat.icon as keyof typeof ICONS] ?? Landmark;
        return (
          <motion.div
            key={cat.slug}
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:last:col-span-2"
          >
            <Link
              href={`/kategori/${cat.slug}`}
              className="group relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-3.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-4"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: cat.color }}
              />
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
                style={{ backgroundColor: cat.color }}
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-extrabold text-ink-900">
                  {cat.name}
                </span>
                <span className="text-[11px] font-semibold text-ink-400">
                  {countOf(cat.slug)} berita
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-800" />
            </Link>
          </motion.div>
        );
      })}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 22 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <Link
          href="/kategori"
          className="group flex h-full items-center gap-3 rounded-2xl bg-ink-950 p-3.5 text-white transition hover:bg-flame-600 sm:p-4"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="text-[13.5px] font-extrabold leading-tight">
            Semua
            <br />
            rubrik
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
