"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Pause, Play } from "lucide-react";
import type { Post } from "@/lib/types";
import { categoryName } from "@/lib/categories";
import { formatDateID, readingTime } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function HeroSlider({ posts }: { posts: Post[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = posts.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || reduce || total <= 1) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduce, go, total, index]);

  if (total === 0) return null;
  const post = posts[index];

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-950 text-white"
      aria-roledescription="carousel"
      aria-label="Berita utama"
    >
      {/* Latar */}
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: bgY }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={post.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={post.cover_image || "/images/placeholder-news.svg"}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
        {/* Lapisan gelap bertingkat: teks selalu terbaca di semua foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/82 to-ink-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/72 to-transparent" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_85%_18%,rgba(248,94,22,.28),transparent_48%)]" />
      </motion.div>

      <div className="container-page relative flex min-h-[540px] flex-col justify-end pb-10 pt-16 sm:min-h-[600px] sm:pb-14 lg:min-h-[660px] lg:pb-16">
        <motion.div style={reduce ? undefined : { y: textY }} className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-flame-500 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-white shadow-lg shadow-flame-900/40">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping-slow rounded-full bg-white" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Berita Utama
            </span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {categoryName(post.category_slug)}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: direction * 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/berita/${post.slug}`} className="group block">
                <h1 className="text-balance text-[28px] font-extrabold leading-[1.12] tracking-tight drop-shadow-sm sm:text-[38px] lg:text-[50px]">
                  {post.title}
                </h1>
                <p className="mt-3 line-clamp-3 max-w-2xl text-[13.5px] leading-relaxed text-ink-200 sm:text-[15px]">
                  {post.excerpt}
                </p>
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] font-medium text-ink-300">
                <span className="flex items-center gap-1.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-600 text-[10px] font-extrabold text-white">
                    IK
                  </span>
                  {post.author}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span>{formatDateID(post.published_at)}</span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" /> {readingTime(post.content)} menit baca
                </span>
              </div>

              <Link
                href={`/berita/${post.slug}`}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-ink-950 transition hover:bg-flame-500 hover:text-white"
              >
                Baca selengkapnya
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Kontrol */}
        <div className="mt-9 flex items-center justify-between gap-4 border-t border-white/12 pt-4">
          <div className="flex flex-1 items-center gap-2 sm:gap-3">
            {posts.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Berita ${i + 1}: ${item.title}`}
                aria-current={i === index}
                className="group relative flex-1 max-w-[92px] text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/20">
                  <motion.span
                    className="block h-full rounded-full bg-flame-400"
                    initial={false}
                    animate={{
                      width: i === index ? "100%" : "0%",
                    }}
                    transition={{
                      duration: i === index && !paused && !reduce ? AUTOPLAY_MS / 1000 : 0.3,
                      ease: "linear",
                    }}
                  />
                </span>
                <span className="mt-1.5 hidden truncate text-[10px] font-semibold text-white/50 transition group-hover:text-white/90 sm:block">
                  {String(i + 1).padStart(2, "0")} · {categoryName(item.category_slug)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label={paused ? "Lanjutkan tayangan" : "Jeda tayangan"}
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Berita sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Berita berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sorotan miring di bawah */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper to-transparent" />
    </section>
  );
}
