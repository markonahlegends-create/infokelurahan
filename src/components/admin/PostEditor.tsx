"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bold,
  Check,
  Eye,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS, VILLAGES } from "@/lib/wilayah";
import type { CategorySlug, Post } from "@/lib/types";

interface PostEditorProps {
  post?: Post;
  onClose?: () => void;
}

function toParagraphs(content: string[] | string): string {
  return Array.isArray(content) ? content.join("\n\n") : content;
}

export function PostEditor({ post, onClose }: PostEditorProps) {
  const router = useRouter();
  const editing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(toParagraphs(post?.content ?? ""));
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [category, setCategory] = useState<CategorySlug>(post?.category_slug ?? "pemerintahan");
  const [district, setDistrict] = useState(post?.district_slug ?? "");
  const [village, setVillage] = useState(post?.village_slug ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Redaksi Info Kelurahan");
  const [isHeadline, setIsHeadline] = useState(post?.is_headline ?? false);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [preview, setPreview] = useState(true);

  const villages = useMemo(
    () => (district ? VILLAGES.filter((v) => v.district_slug === district) : VILLAGES),
    [district],
  );

  const paragraphs = useMemo(
    () => content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    [content],
  );

  const insertBold = () => {
    const textarea = document.getElementById("editor-content") as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || "teks tebal";
    const next = `${content.slice(0, start)}**${selected}**${content.slice(end)}`;
    setContent(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2 + selected.length);
    });
  };

  const submit = async (status: "draft" | "publish") => {
    if (title.trim().length < 6) {
      setMessage({ type: "err", text: "Judul minimal 6 karakter." });
      return;
    }
    if (paragraphs.length === 0) {
      setMessage({ type: "err", text: "Isi berita wajib diisi." });
      return;
    }

    setSaving(status === "draft" ? "draft" : "publish");
    setMessage(null);

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: paragraphs,
      cover_image: cover.trim(),
      category_slug: category,
      district_slug: district || null,
      village_slug: village || null,
      author: author.trim(),
      is_headline: isHeadline,
      status,
    };

    try {
      const res = await fetch(editing ? `/api/admin/posts/${post!.id}` : "/api/admin/posts", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; post?: Post };
      if (!res.ok || !data.ok) {
        setMessage({ type: "err", text: data.error ?? "Gagal menyimpan berita." });
        return;
      }
      setMessage({
        type: "ok",
        text: status === "draft" ? "Draf tersimpan." : "Berita berhasil diterbitkan.",
      });
      router.refresh();
      setTimeout(() => {
        onClose?.();
        router.refresh();
      }, 700);
    } catch {
      setMessage({ type: "err", text: "Tidak dapat menghubungi server." });
    } finally {
      setSaving(null);
    }
  };

  const remove = async () => {
    if (!editing) return;
    if (!window.confirm("Hapus berita ini secara permanen?")) return;
    setSaving("draft");
    try {
      const res = await fetch(`/api/admin/posts/${post!.id}`, { method: "DELETE" });
      if (res.ok) {
        onClose?.();
        router.refresh();
      } else {
        setMessage({ type: "err", text: "Gagal menghapus berita." });
      }
    } finally {
      setSaving(null);
    }
  };

  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-flame-400 focus:outline-none";
  const label = "mb-1 block text-[10.5px] font-extrabold uppercase tracking-wider text-ink-500";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* Form */}
      <div className="space-y-3.5 rounded-2xl border border-ink-900/8 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink-950">
            <Sparkles className="h-4 w-4 text-flame-500" />
            {editing ? "Ubah berita" : "Tulis berita baru"}
          </h2>
          <button
            type="button"
            onClick={() => (onClose ? onClose() : setPreview((v) => !v))}
            className="grid h-7 w-7 place-items-center rounded-full text-ink-400 transition hover:bg-ink-50 hover:text-ink-800"
            aria-label="Tutup editor"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="block">
          <span className={label}>Judul berita</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Warga Kelurahan Cibeber Gotong Royong Bersihkan Drainase"
            className={field}
          />
          <span className="mt-1 block text-right text-[10px] text-ink-400">{title.length}/180</span>
        </label>

        <label className="block">
          <span className={label}>Ringkasan (opsional)</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Ringkasan singkat yang tampil di kartu berita. Kosongkan untuk dibuat otomatis."
            className={`${field} resize-y`}
          />
        </label>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className={`${label} mb-0`}>Isi berita</span>
            <button
              type="button"
              onClick={insertBold}
              className="flex items-center gap-1 rounded-md border border-ink-200 px-2 py-1 text-[10px] font-bold text-ink-600 transition hover:border-flame-300 hover:text-flame-700"
            >
              <Bold className="h-3 w-3" /> Tebal
            </button>
          </div>
          <textarea
            id="editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="Tulis isi berita. Pisahkan paragraf dengan satu baris kosong. Gunakan **teks** untuk menebalkan."
            className={`${field} resize-y font-[inherit] leading-relaxed`}
          />
          <p className="mt-1 text-[10px] text-ink-400">
            {paragraphs.length} paragraf ·{" "}
            {content.split(/\s+/).filter(Boolean).length} kata
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Rubrik</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug)}
              className={field}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Penulis</span>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} className={field} />
          </label>
          <label className="block">
            <span className={label}>Kecamatan</span>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setVillage("");
              }}
              className={field}
            >
              <option value="">Semua / kota</option>
              {DISTRICTS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Kelurahan</span>
            <select value={village} onChange={(e) => setVillage(e.target.value)} className={field}>
              <option value="">—</option>
              {villages.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className={label}>URL foto sampul</span>
          <div className="relative">
            <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="https://…/foto.jpg atau /images/foto.jpg"
              className={`${field} pl-9`}
            />
          </div>
          <span className="mt-1 block text-[10px] text-ink-400">
            Kosongkan untuk memakai gambar placeholder bermerek.
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-ink-200 bg-paper-warm/50 px-3 py-2.5">
          <input
            type="checkbox"
            checked={isHeadline}
            onChange={(e) => setIsHeadline(e.target.checked)}
            className="h-4 w-4 accent-flame-500"
          />
          <span className="text-[12px] font-semibold text-ink-700">
            Jadikan headline utama (menggantikan headline sebelumnya)
          </span>
        </label>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11.5px] font-semibold ${
              message.type === "ok"
                ? "bg-sea-500/10 text-sea-700 ring-1 ring-sea-500/20"
                : "bg-flame-50 text-flame-700 ring-1 ring-flame-200"
            }`}
          >
            {message.type === "ok" && <Check className="h-3.5 w-3.5" />}
            {message.text}
          </motion.p>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-ink-100 pt-3">
          <button
            type="button"
            onClick={() => submit("publish")}
            disabled={saving !== null}
            className="flex items-center gap-1.5 rounded-xl bg-flame-500 px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-flame-600 disabled:opacity-60"
          >
            {saving === "publish" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            {editing ? "Simpan & terbitkan" : "Terbitkan"}
          </button>
          <button
            type="button"
            onClick={() => submit("draft")}
            disabled={saving !== null}
            className="flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2.5 text-[12px] font-bold text-ink-700 transition hover:bg-paper-warm disabled:opacity-60"
          >
            {saving === "draft" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Simpan draf
          </button>
          {editing && (
            <button
              type="button"
              onClick={remove}
              className="ml-auto flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[12px] font-bold text-flame-600 transition hover:bg-flame-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Hapus
            </button>
          )}
        </div>
      </div>

      {/* Pratinjau */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-ink-500">
            <Eye className="h-3.5 w-3.5" /> Pratinjau langsung
          </h3>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="text-[10.5px] font-bold text-flame-600 lg:hidden"
          >
            {preview ? "Sembunyikan" : "Tampilkan"}
          </button>
        </div>

        {preview && (
          <article className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-sm">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-ink-800 to-ink-950">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 text-ink-500">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-[10px] font-semibold">Gambar sampul</span>
                </div>
              )}
              <span
                className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                style={{ backgroundColor: CATEGORIES.find((c) => c.slug === category)?.color }}
              >
                {CATEGORIES.find((c) => c.slug === category)?.name}
              </span>
            </div>
            <div className="p-3.5">
              <h4 className="line-clamp-3 text-[15px] font-extrabold leading-snug text-ink-950">
                {title || "Judul berita akan tampil di sini"}
              </h4>
              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-ink-500">
                {excerpt ||
                  paragraphs[0]?.replace(/\*\*/g, "").slice(0, 160) ||
                  "Ringkasan berita akan dibuat otomatis dari paragraf pertama."}
              </p>
              <div className="mt-2.5 flex items-center gap-2 border-t border-ink-100 pt-2 text-[10px] text-ink-400">
                <span className="font-semibold text-ink-600">{author || "Redaksi"}</span>
                <span>·</span>
                <span>{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              {paragraphs.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-ink-100 pt-3">
                  {paragraphs.slice(0, 3).map((paragraph, i) => (
                    <p key={i} className="line-clamp-3 text-[11px] leading-relaxed text-ink-600">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>
        )}

        <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-950 px-3.5 py-2.5 text-white">
          <span className="text-[10.5px] font-semibold text-ink-300">Pratinjau ala portal</span>
          <Link
            href={post ? `/berita/${post.slug}` : "/berita"}
            target="_blank"
            className="text-[10.5px] font-bold text-flame-400"
          >
            Buka di situs →
          </Link>
        </div>
      </div>
    </div>
  );
}
