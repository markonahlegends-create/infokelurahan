"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Search, X } from "lucide-react";
import { categoryColor } from "@/lib/categories";

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  category_slug: string;
  date: string;
  cover_image: string;
}

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const runSearch = useCallback(async (value: string) => {
    abortRef.current?.abort();
    if (value.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
        signal: controller.signal,
      });
      const data = (await res.json()) as { results: SearchResult[] };
      setResults(data.results ?? []);
    } catch {
      /* dibatalkan */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTouched(false);
      return;
    }
    setTouched(true);
    const timer = setTimeout(() => runSearch(query), 280);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.button
            type="button"
            aria-label="Tutup pencarian"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/65 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pencarian berita"
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-ink-950/40 ring-1 ring-ink-900/10"
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-ink-100 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-flame-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berita, kelurahan, atau topik…"
                className="w-full bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400"
                aria-label="Kata kunci pencarian"
              />
              {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50 hover:text-ink-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </form>

            <div className="max-h-[52vh] overflow-y-auto">
              {!touched && (
                <div className="px-5 py-5">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
                    Topik populer
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["MTQ", "Porprov", "Beasiswa", "CCTV", "Posyandu", "UMKM", "Kelurahan"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setQuery(tag)}
                        className="rounded-full border border-ink-200 px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-flame-400 hover:bg-flame-50 hover:text-flame-700"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {touched && results.length === 0 && !loading && (
                <p className="px-5 py-8 text-center text-sm text-ink-500">
                  Tidak ada berita yang cocok dengan “{query}”.
                </p>
              )}

              {results.length > 0 && (
                <ul className="divide-y divide-ink-50">
                  {results.map((item, index) => (
                    <motion.li
                      key={item.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.045 }}
                    >
                      <Link
                        href={`/berita/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 px-4 py-3 transition hover:bg-flame-50/60"
                      >
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                          {item.cover_image && (
                            <Image
                              src={item.cover_image}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover transition duration-500 group-hover:scale-105"
                              unoptimized
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: categoryColor(item.category_slug) }}
                          >
                            {item.category}
                          </span>
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink-900 group-hover:text-flame-700">
                            {item.title}
                          </p>
                          <span className="text-[11px] text-ink-400">{item.date}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-flame-500" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {query.trim() && (
              <button
                type="button"
                onClick={submit}
                className="flex w-full items-center justify-between border-t border-ink-100 px-5 py-3 text-xs font-semibold text-ink-500 transition hover:bg-ink-50 hover:text-ink-900"
              >
                Lihat semua hasil untuk “{query}”
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
