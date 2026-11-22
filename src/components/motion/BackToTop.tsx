"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ArrowUp, X } from "lucide-react";

/** Tombol kembali ke atas + indikator kemajuan baca melingkar. */
export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setProgress(max > 0 ? Math.min(latest / max, 1) : 0);
    });
  });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const circumference = 2 * Math.PI * 20;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Kembali ke atas"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed bottom-5 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-ink-950 text-white shadow-xl shadow-ink-950/30 ring-1 ring-white/15 sm:bottom-8 sm:right-8"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb7f3c" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="relative h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Bilah pengumuman berjalan di atas header. */
export function AnnouncementTicker({ items }: { items: { title: string; level: string }[] }) {
  const [closed, setClosed] = useState(false);
  if (closed || items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className="relative z-40 overflow-hidden bg-ink-950 text-white">
      <div className="container-page flex items-center gap-3 py-2">
        <span className="relative hidden shrink-0 items-center gap-1.5 rounded-full bg-flame-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping-slow rounded-full bg-white" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Info Terkini
        </span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
            {loop.map((item, i) => (
              <Link
                key={`${item.title}-${i}`}
                href="#pengumuman"
                className="flex shrink-0 items-center gap-2 text-xs font-medium text-ink-100 transition hover:text-white sm:text-[13px]"
              >
                <span className="h-1 w-1 rounded-full bg-flame-400" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Tutup pengumuman"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink-300 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
