"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { compactNumberID, formatNumberID } from "@/lib/utils";

interface CountUpProps {
  value: number;
  duration?: number;
  compact?: boolean;
  className?: string;
  suffix?: string;
}

/** Angka berhitung naik saat masuk viewport. */
export function CountUp({
  value,
  duration = 1600,
  compact = false,
  className,
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  // Nilai akhir dipakai saat SSR agar HTML server tidak menampilkan angka 0.
  const [display, setDisplay] = useState(value);
  const started = useRef(false);
  const from = useRef(0);
  const measured = useRef(false);

  // Saat angka sudah terlihat (mis. di layar kecil), mulai hitung dari 0
  // lalu naik ke nilai akhir. Bila sudah tampil sebelum masuk viewport,
  // tidak ada animasi agar angka tidak terlihat mundur.
  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el || measured.current) return;
    measured.current = true;
    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    // Bila sudah terlihat, mulai dari 0. Bila belum, animasi dimulai saat
    // masuk viewport (lihat efek kedua).
    from.current = visible ? 0 : value;
    if (visible) setDisplay(0);
  }, [reduce, value]);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView || started.current) return;
    // Belum diukur (mis. efek pertama belum jalan) → biarkan efek ini menunggu.
    if (!measured.current) return;
    // Sudah terlihat sejak awal dan tidak perlu animasi.
    if (from.current === value) return;
    started.current = true;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(from.current + (value - from.current) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduce]);

  const formatted = compact ? compactNumberID(display) : formatNumberID(display);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
