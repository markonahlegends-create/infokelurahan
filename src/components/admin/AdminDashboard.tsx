"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { BrandMark } from "@/components/ui/BrandLogo";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Database,
  Eye,
  Heart,
  LogOut,
  Newspaper,
  Pencil,
  Plus,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import type { Post, SiteStats } from "@/lib/types";
import { categoryColor, categoryName } from "@/lib/categories";
import { formatShortDateID, compactNumberID } from "@/lib/utils";
import { PostEditor } from "./PostEditor";

interface AdminDashboardProps {
  initialPosts: Post[];
  stats: SiteStats;
  driver: "local" | "supabase";
  adminHealthy: boolean;
}

export function AdminDashboard({ initialPosts, stats, driver, adminHealthy }: AdminDashboardProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"semua" | "published" | "draft">("semua");
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tab !== "semua" && p.status !== tab) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category_slug.includes(q) ||
        (p.district_slug ?? "").includes(q)
      );
    });
  }, [posts, query, tab]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const cards = [
    { label: "Berita terbit", value: posts.filter((p) => p.status === "published").length, icon: Newspaper, tone: "#f85e16" },
    { label: "Total pembaca", value: compactNumberID(stats.total_views), icon: Eye, tone: "#0891b2" },
    { label: "Draf tersimpan", value: posts.filter((p) => p.status === "draft").length, icon: Database, tone: "#4f46e5" },
    { label: "Headline aktif", value: posts.filter((p) => p.is_headline).length, icon: Star, tone: "#ca8a04" },
  ];

  return (
    <div className="min-h-dvh bg-paper-warm/60">
      {/* Topbar admin */}
      <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-white/85 backdrop-blur-xl">
        <div className="container-page flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BrandMark size={32} className="rounded-lg" />
            <div className="leading-none">
              <p className="text-[13px] font-extrabold text-ink-950">Dashboard Redaksi</p>
              <p className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Info Kelurahan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider sm:flex ${
                driver === "supabase"
                  ? "bg-sea-500/10 text-sea-700"
                  : "bg-ink-100 text-ink-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${driver === "supabase" ? "bg-sea-500" : "bg-ink-400"}`}
              />
              {driver === "supabase" ? "Supabase aktif" : "Mode demo lokal"}
            </span>
            <Link
              href="/"
              className="rounded-full border border-ink-200 px-3 py-1.5 text-[11px] font-bold text-ink-600 transition hover:bg-paper-warm"
            >
              Lihat situs
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-flame-600"
            >
              <LogOut className="h-3.5 w-3.5" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="container-page py-6">
        {!adminHealthy && (
          <div className="mb-4 rounded-xl border border-flame-200 bg-flame-50 px-4 py-3 text-[11.5px] font-semibold text-flame-700">
            Mode demo: perubahan tersimpan di memori server dan kembali ke data awal saat server
            dimulai ulang. Hubungkan Supabase untuk penyimpanan permanen.
          </div>
        )}

        {/* Stat cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-4"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-[0.08]"
                style={{ backgroundColor: card.tone }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: card.tone }}
                >
                  <card.icon className="h-4 w-4" />
                </span>
                <TrendingUp className="h-3.5 w-3.5 text-sea-500" />
              </div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink-950">{card.value}</p>
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editor */}
        <AnimatePresence>
          {(creating || editing) && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 overflow-hidden"
            >
              <PostEditor
                post={editing ?? undefined}
                onClose={() => {
                  setEditing(null);
                  setCreating(false);
                  fetch("/api/admin/posts", { cache: "no-store" })
                    .then((res) => (res.ok ? res.json() : null))
                    .then((data: { posts?: Post[] } | null) => {
                      if (data?.posts) setPosts(data.posts);
                    })
                    .catch(() => undefined);
                }}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Daftar berita */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
          <div className="flex flex-col gap-3 border-b border-ink-100 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1">
              {(["semua", "published", "draft"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={`rounded-full px-3 py-1.5 text-[11.5px] font-bold capitalize transition ${
                    tab === value
                      ? "bg-ink-950 text-white"
                      : "text-ink-500 hover:bg-paper-warm hover:text-ink-900"
                  }`}
                >
                  {value === "semua" ? "Semua" : value === "published" ? "Terbit" : "Draf"}
                  <span className="ml-1 opacity-60">
                    {value === "semua"
                      ? posts.length
                      : posts.filter((p) => p.status === value).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari berita…"
                  className="w-40 rounded-full border border-ink-200 bg-paper-warm/50 py-1.5 pl-8 pr-3 text-[11.5px] text-ink-800 placeholder:text-ink-400 focus:border-flame-400 focus:bg-white focus:outline-none sm:w-52"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setCreating(true);
                  setEditing(null);
                }}
                className="flex items-center gap-1.5 rounded-full bg-flame-500 px-3.5 py-1.5 text-[11.5px] font-bold text-white transition hover:bg-flame-600"
              >
                <Plus className="h-3.5 w-3.5" /> Berita baru
              </button>
            </div>
          </div>

          <div className="divide-y divide-ink-50">
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                layout
                className="flex items-center gap-3 p-3 transition hover:bg-paper-warm/60"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                  {post.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-ink-950">
                      <NextImage src="/images/icon-512.png" alt="" width={24} height={24} className="h-6 w-6 opacity-80" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                      style={{ backgroundColor: categoryColor(post.category_slug) }}
                    >
                      {categoryName(post.category_slug)}
                    </span>
                    {post.is_headline && (
                      <span className="flex items-center gap-0.5 rounded bg-flame-50 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-flame-700">
                        <Star className="h-2.5 w-2.5" /> Headline
                      </span>
                    )}
                    {post.status === "draft" && (
                      <span className="rounded bg-ink-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-ink-500">
                        Draf
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[12.5px] font-bold text-ink-900">{post.title}</p>
                  <p className="flex items-center gap-2 text-[10px] text-ink-400">
                    <span>{formatShortDateID(post.published_at)}</span>
                    <span className="inline-flex items-center gap-0.5">
                      <Eye className="h-2.5 w-2.5" /> {compactNumberID(post.views)}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Heart className="h-2.5 w-2.5" /> {post.author.split(" ")[0]}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/berita/${post.slug}`}
                    target="_blank"
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-800"
                    aria-label="Lihat berita"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(post);
                      setCreating(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-flame-50 hover:text-flame-700"
                    aria-label="Ubah berita"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="py-14 text-center">
                <p className="text-[13px] font-bold text-ink-700">Tidak ada berita pada filter ini.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCreating(true);
                    setTab("semua");
                    setQuery("");
                  }}
                  className="mt-2 text-[11.5px] font-bold text-flame-600"
                >
                  + Tulis berita baru
                </button>
              </div>
            )}
          </div>
        </section>

        <p className="mt-4 text-center text-[10px] text-ink-400">
          Info Kelurahan · Dashboard Redaksi · Data tersimpan{" "}
          {driver === "supabase" ? "di Supabase Postgres" : "di memori server (mode demo)"}
        </p>
      </main>
    </div>
  );
}
