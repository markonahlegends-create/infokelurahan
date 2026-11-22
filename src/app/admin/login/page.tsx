"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Gagal masuk.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Tidak dapat menghubungi server.");
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-ink-950 px-4 py-10">
      <div aria-hidden className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_18%_12%,rgba(248,94,22,.32),transparent_45%),radial-gradient(circle_at_82%_88%,rgba(20,184,166,.26),transparent_45%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:54px_54px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-400 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke situs
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700 text-[14px] font-extrabold text-white">
              IK
            </span>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white">Dashboard Redaksi</h1>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                Info Kelurahan
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink-300">
                Kata sandi admin
              </span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-11 text-sm text-white placeholder:text-ink-500 focus:border-flame-400 focus:outline-none"
                  aria-label="Kata sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-ink-400 transition hover:bg-white/10 hover:text-white"
                  aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg bg-flame-500/15 px-3 py-2 text-[11.5px] font-semibold text-flame-300 ring-1 ring-flame-500/20"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || password.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-flame-500 py-3 text-[13px] font-bold text-white transition hover:bg-flame-600 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? "Memeriksa…" : "Masuk ke dashboard"}
            </button>
          </form>

          <p className="mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] leading-relaxed text-ink-400">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Area terbatas untuk redaksi. Sesi berakhir otomatis setelah 8 jam, dan
              percobaan masuk dibatasi 6 kali per 10 menit.
            </span>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
