"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Sparkles } from "lucide-react";

/** Formulir langganan ringan — menyimpan preferensi di peramban pengguna. */
export function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Masukkan alamat email yang valid.");
      return;
    }
    setError("");
    try {
      const key = "ik_newsletter";
      const stored = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      if (!stored.includes(email.trim())) stored.push(email.trim());
      localStorage.setItem(key, JSON.stringify(stored.slice(-50)));
    } catch {
      /* penyimpanan opsional */
    }
    setDone(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-6 text-white sm:p-8">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-flame-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-sea-500/25 blur-3xl"
      />
      <div className="relative">
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em]">
          <Sparkles className="h-3 w-3 text-flame-400" /> Buletin Kelurahan
        </p>
        <h3 className="text-2xl font-extrabold leading-tight">
          Ringkasan berita kelurahan, tiap Jumat pagi.
        </h3>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-300">
          Agenda kegiatan, pengumuman layanan, dan kabar penting dari 43 kelurahan — langsung ke
          kotak masuk Anda. Tanpa biaya, bisa berhenti kapan saja.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex items-center gap-2 rounded-xl bg-sea-500/15 px-4 py-3 text-[13px] font-semibold text-sea-400 ring-1 ring-sea-500/30"
          >
            <CheckCircle2 className="h-4 w-4" />
            Terima kasih! Preferensi buletin tersimpan di peramban ini.
          </motion.div>
        ) : (
          <form onSubmit={submit} className="mt-5">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  aria-label="Alamat email"
                  className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-3 text-sm text-white placeholder:text-ink-400 focus:border-flame-400 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-flame-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-flame-600"
              >
                Berlangganan
              </button>
            </div>
            {error && <p className="mt-2 text-[11.5px] font-semibold text-flame-400">{error}</p>}
            <p className="mt-2 text-[10.5px] text-ink-400">
              Demo: email hanya disimpan di peramban Anda, tidak dikirim ke server.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
