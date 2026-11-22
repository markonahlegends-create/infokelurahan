"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

/** Formulir kontak demo — menyimpan draf pesan di peramban pengguna. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Rilis berita");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 3) next.name = "Nama minimal 3 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Email tidak valid.";
    if (message.trim().length < 20) next.message = "Pesan minimal 20 karakter.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      const key = "ik_messages";
      const stored = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
      stored.push({ name, email, topic, message, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(stored.slice(-20)));
    } catch {
      /* opsional */
    }
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-sea-500/30 bg-sea-500/8 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-sea-600" />
        <h3 className="mt-3 text-lg font-extrabold text-ink-950">Pesan tersimpan</h3>
        <p className="mx-auto mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-ink-500">
          Terima kasih, {name.split(" ")[0]}. Dalam mode demo ini pesan disimpan di peramban Anda.
          Untuk produksi, hubungkan formulir ini ke layanan email favorit Anda.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setMessage("");
          }}
          className="mt-4 rounded-full bg-ink-950 px-4 py-2 text-[12px] font-bold text-white"
        >
          Tulis pesan lain
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3.5 rounded-2xl border border-ink-900/8 bg-white p-5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-500">
            Nama lengkap
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            className="w-full rounded-xl border border-ink-200 bg-paper-warm/50 px-3 py-2.5 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-flame-400 focus:bg-white focus:outline-none"
          />
          {errors.name && <span className="mt-1 block text-[10.5px] font-semibold text-flame-600">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-500">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full rounded-xl border border-ink-200 bg-paper-warm/50 px-3 py-2.5 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-flame-400 focus:bg-white focus:outline-none"
          />
          {errors.email && <span className="mt-1 block text-[10.5px] font-semibold text-flame-600">{errors.email}</span>}
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-500">
          Topik
        </span>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-paper-warm/50 px-3 py-2.5 text-[13px] text-ink-900 focus:border-flame-400 focus:bg-white focus:outline-none"
        >
          {["Rilis berita", "Usulan agenda", "Koreksi berita", "Kerja sama", "Lainnya"].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-500">
          Pesan
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tuliskan detail informasi, waktu, dan lokasi kegiatan…"
          className="w-full resize-y rounded-xl border border-ink-200 bg-paper-warm/50 px-3 py-2.5 text-[13px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-flame-400 focus:bg-white focus:outline-none"
        />
        {errors.message && <span className="mt-1 block text-[10.5px] font-semibold text-flame-600">{errors.message}</span>}
      </label>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-flame-500 py-3 text-[13px] font-bold text-white transition hover:bg-flame-600"
      >
        <Send className="h-4 w-4" /> Kirim pesan
      </button>
      <p className="text-center text-[10px] text-ink-400">
        Formulir demo — pesan tidak dikirim ke server.
      </p>
    </form>
  );
}
