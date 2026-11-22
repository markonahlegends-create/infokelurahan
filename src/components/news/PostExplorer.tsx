"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Loader2, SlidersHorizontal } from "lucide-react";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { NewsCard } from "./NewsCard";
import { Chip } from "@/components/ui/Chip";

interface PostExplorerProps {
  initialPosts: Post[];
  initialTotal: number;
  query: {
    category?: string;
    district?: string;
    village?: string;
    q?: string;
  };
  showCategoryFilter?: boolean;
  pageSize?: number;
}

type Sort = "terbaru" | "populer";

export function PostExplorer({
  initialPosts,
  initialTotal,
  query,
  showCategoryFilter = true,
  pageSize = 9,
}: PostExplorerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [category, setCategory] = useState(query.category ?? "");
  const [sort, setSort] = useState<Sort>("terbaru");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const requestId = useRef(0);

  const fetchPage = useCallback(
    async (offset: number, nextCategory: string, nextSort: Sort) => {
      const id = ++requestId.current;
      const params = new URLSearchParams();
      if (nextCategory) params.set("category", nextCategory);
      if (query.district) params.set("district", query.district);
      if (query.village) params.set("village", query.village);
      if (query.q) params.set("q", query.q);
      params.set("sort", nextSort);
      params.set("limit", String(pageSize));
      params.set("offset", String(offset));

      setLoading(true);
      try {
        const res = await fetch(`/api/posts?${params.toString()}`);
        const data = (await res.json()) as { posts: Post[]; total: number };
        if (id !== requestId.current) return;
        setPosts((prev) => (offset === 0 ? data.posts : [...prev, ...data.posts]));
        setTotal(data.total);
      } catch {
        /* biarkan data lama */
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setInitialLoad(false);
        }
      }
    },
    [pageSize, query.district, query.village, query.q],
  );

  // Muat ulang ketika filter berubah (lewati render pertama).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      setInitialLoad(false);
      return;
    }
    void fetchPage(0, category, sort);
  }, [category, sort, fetchPage]);

  const loadMore = () => fetchPage(posts.length, category, sort);
  const hasMore = posts.length < total;

  return (
    <div>
      {/* Kontrol filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-ink-900/8 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="flex shrink-0 items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-wider text-ink-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {showCategoryFilter ? "Rubrik" : "Urutkan"}
          </span>
          {showCategoryFilter && (
            <>
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
                  category === ""
                    ? "bg-ink-950 text-white"
                    : "border border-ink-200 text-ink-600 hover:border-flame-300 hover:text-flame-700"
                }`}
              >
                Semua
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setCategory(cat.slug)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
                    category === cat.slug
                      ? "text-white"
                      : "border border-ink-200 text-ink-600 hover:border-flame-300 hover:text-flame-700"
                  }`}
                  style={category === cat.slug ? { backgroundColor: cat.color } : undefined}
                >
                  {cat.name}
                </button>
              ))}
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {(["terbaru", "populer"] as Sort[]).map((value) => (
            <Chip key={value} active={sort === value} className="cursor-pointer">
              <button type="button" onClick={() => setSort(value)}>
                {value === "terbaru" ? "Terbaru" : "Terpopuler"}
              </button>
            </Chip>
          ))}
        </div>
      </div>

      <p className="mb-3 text-[11.5px] font-semibold text-ink-400">
        {loading && initialLoad ? "Memuat…" : `${posts.length} dari ${total} berita`}
      </p>

      {posts.length === 0 && !loading ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-16 text-center">
          <p className="text-sm font-bold text-ink-700">Belum ada berita di rubrik ini.</p>
          <p className="mt-1 text-[12px] text-ink-400">
            Coba pilih rubrik lain atau kembali ke semua berita.
          </p>
        </div>
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, delay: Math.min((i % pageSize) * 0.04, 0.3) }}
              >
                <NewsCard post={post} index={0} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {hasMore && (
        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-[12.5px] font-bold text-white transition hover:bg-flame-600 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Memuat berita…
              </>
            ) : (
              <>
                Muat lebih banyak
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
