"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLockup } from "@/components/ui/BrandLogo";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ChevronDown,
  Home,
  LayoutGrid,
  MapPin,
  Menu,
  Search,
  X,
} from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { DISTRICTS } from "@/lib/wilayah";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./SearchDialog";

const NAV = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/kategori", label: "Kategori", icon: LayoutGrid },
  { href: "/wilayah", label: "Wilayah", icon: MapPin },
  { href: "/tentang", label: "Tentang" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [rubrikOpen, setRubrikOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    setMenuOpen(false);
    setRubrikOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink-900/8 bg-paper/85 shadow-[0_8px_30px_-18px_rgba(10,17,34,0.4)] backdrop-blur-xl"
            : "bg-paper",
        )}
      >
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-[70px]">
            {/* Logo */}
            <BrandLockup size={40} />

            {/* Nav desktop */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
              {NAV.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                      active ? "text-flame-700" : "text-ink-700 hover:text-ink-950",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-flame-50 ring-1 ring-flame-200"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setRubrikOpen(true)}
                onMouseLeave={() => setRubrikOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setRubrikOpen((v) => !v)}
                  aria-expanded={rubrikOpen}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-950"
                >
                  Rubrik
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", rubrikOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {rubrikOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-3 shadow-2xl shadow-ink-950/15">
                        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">
                          Kategori berita
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/kategori/${cat.slug}`}
                              className="group flex items-start gap-2.5 rounded-xl p-2.5 transition hover:bg-paper-warm"
                            >
                              <span
                                className="mt-1 h-2 w-2 shrink-0 rounded-full ring-4 ring-transparent transition group-hover:ring-current/10"
                                style={{ backgroundColor: cat.color, color: cat.color }}
                              />
                              <span>
                                <span className="block text-[13px] font-bold text-ink-900">{cat.name}</span>
                                <span className="line-clamp-1 text-[11px] leading-snug text-ink-400">
                                  {cat.description}
                                </span>
                              </span>
                            </Link>
                          ))}
                          <Link
                            href="/wilayah"
                            className="flex items-center gap-2 rounded-xl bg-ink-950 p-2.5 text-white transition hover:bg-ink-900"
                          >
                            <MapPin className="h-4 w-4 text-flame-400" />
                            <span className="text-[13px] font-bold">Jelajahi 43 kelurahan</span>
                          </Link>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1 border-t border-ink-100 pt-2">
                          {DISTRICTS.slice(0, 8).map((d) => (
                            <Link
                              key={d.slug}
                              href={`/wilayah/${d.slug}`}
                              className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-ink-500 transition hover:bg-flame-50 hover:text-flame-700"
                            >
                              {d.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Aksi */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 py-1.5 pl-3 pr-1.5 text-ink-500 transition hover:border-flame-300 hover:text-flame-600 sm:pl-3.5"
                aria-label="Buka pencarian"
              >
                <Search className="h-4 w-4" />
                <span className="hidden text-xs font-semibold sm:inline">Cari berita</span>
                <kbd className="hidden rounded-md border border-ink-200 bg-paper-warm px-1.5 py-0.5 font-sans text-[10px] font-bold text-ink-400 sm:inline">
                  ⌘K
                </kbd>
              </button>
              <Link
                href="/admin"
                className="hidden rounded-full bg-ink-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-flame-600 md:inline-block"
              >
                Redaksi
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-white lg:hidden"
                aria-label="Buka menu"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Baris kategori cepat (desktop) */}
        <div className="hidden border-t border-ink-900/6 lg:block">
          <div className="container-page flex items-center gap-1 overflow-x-auto py-1.5">
            <span className="mr-1 shrink-0 rounded-full bg-flame-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              Rubrik
            </span>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold text-ink-600 transition hover:bg-paper-warm hover:text-ink-950"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition group-hover:scale-150"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
              </Link>
            ))}
            <Link
              href="/agenda"
              className="ml-auto shrink-0 text-[12px] font-bold text-flame-600 transition hover:text-flame-700"
            >
              Agenda Kelurahan →
            </Link>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Tutup menu"
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ink-950 text-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-sm font-extrabold tracking-tight">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10"
                  aria-label="Tutup menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-bold text-ink-100 transition hover:bg-white/10"
                    >
                      {item.icon && <item.icon className="h-4 w-4 text-flame-400" />}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <p className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                  Rubrik
                </p>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {CATEGORIES.map((cat, i) => (
                    <motion.div
                      key={cat.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.035 }}
                    >
                      <Link
                        href={`/kategori/${cat.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5 text-[12.5px] font-semibold text-ink-100 transition hover:bg-white/12"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <p className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                  Kecamatan
                </p>
                <div className="flex flex-wrap gap-1.5 px-1">
                  {DISTRICTS.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/wilayah/${d.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full border border-white/12 px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-200"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="space-y-2 border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-bold text-white"
                >
                  <Search className="h-4 w-4" /> Cari berita
                </button>
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-flame-500 py-2.5 text-sm font-bold text-white"
                >
                  Masuk Dashboard Redaksi
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
