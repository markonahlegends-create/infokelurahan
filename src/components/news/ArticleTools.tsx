"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Check,
  Copy,
  Eye,
  Link2,
  MessageCircle,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { compactNumberID } from "@/lib/utils";

interface ArticleToolsProps {
  id: number;
  slug: string;
  title: string;
  views: number;
}

/** Pencatat pembaca + perkakas berbagi & kenyamanan baca. */
export function ArticleTools({ id, slug, title, views }: ArticleToolsProps) {
  const [count, setCount] = useState(views);
  const [copied, setCopied] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    const key = `ik_viewed_${id}`;
    try {
      const last = Number(localStorage.getItem(key) ?? 0);
      if (Date.now() - last < 1000 * 60 * 30) return;
      localStorage.setItem(key, String(Date.now()));
    } catch {
      /* lanjut saja */
    }
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => (res.ok ? setCount((c) => c + 1) : null))
      .catch(() => undefined);
  }, [id]);

  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) return;
    article.style.fontSize = `${fontScale}rem`;
    article.style.setProperty("--article-scale", String(fontScale));
    article.querySelectorAll<HTMLElement>(".article-prose").forEach((el) => {
      el.style.fontSize = `${1.0625 * fontScale}rem`;
    });
    return () => {
      article.querySelectorAll<HTMLElement>(".article-prose").forEach((el) => {
        el.style.fontSize = "";
      });
    };
  }, [fontScale]);

  const url = typeof window !== "undefined" ? window.location.href : `https://infokelurahan.vercel.app/berita/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* dibatalkan */
      }
    }
    void copyLink();
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="sticky top-[76px] z-30 -mx-4 border-y border-ink-900/6 bg-paper/92 px-4 py-2 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-ink-500 ring-1 ring-ink-200">
            <Eye className="h-3.5 w-3.5 text-flame-500" />
            {compactNumberID(count)} pembaca
          </span>
          <span className="hidden items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold text-ink-500 ring-1 ring-ink-200 sm:flex">
            <BookOpen className="h-3.5 w-3.5 text-sea-500" />
            Mode baca
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="mr-1 hidden items-center overflow-hidden rounded-full ring-1 ring-ink-200 sm:flex">
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.max(0.88, Number((s - 0.06).toFixed(2))))}
              className="grid h-7 w-7 place-items-center bg-white text-ink-600 transition hover:bg-paper-warm disabled:opacity-40"
              aria-label="Perkecil ukuran teks"
              disabled={fontScale <= 0.88}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-1.5 text-[10px] font-extrabold text-ink-500">
              {Math.round(fontScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setFontScale((s) => Math.min(1.3, Number((s + 0.06).toFixed(2))))}
              className="grid h-7 w-7 place-items-center bg-white text-ink-600 transition hover:bg-paper-warm disabled:opacity-40"
              aria-label="Perbesar ukuran teks"
              disabled={fontScale >= 1.3}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-500 transition hover:bg-sea-500/10 hover:text-sea-600"
            aria-label="Bagikan ke WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={copyLink}
            className="relative grid h-8 w-8 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-900"
            aria-label="Salin tautan artikel"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Check className="h-4 w-4 text-sea-600" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={share}
            className="flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-flame-600"
          >
            <Share2 className="h-3.5 w-3.5" /> Bagikan
          </button>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-8 right-2 flex items-center gap-1 rounded-lg bg-ink-950 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-lg"
          >
            <Link2 className="h-3 w-3" /> Tautan disalin
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
