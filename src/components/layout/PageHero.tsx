import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  accent?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  accent = "#f85e16",
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-90"
        style={{
          backgroundImage: `radial-gradient(circle at 8% 10%, ${accent}44, transparent 45%), radial-gradient(circle at 92% 90%, rgba(20,184,166,.24), transparent 42%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-page py-9 sm:py-12">
        {breadcrumb && (
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-[11px] font-semibold text-ink-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">
              Beranda
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-ink-600" />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink-200">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p
            className="mb-2 flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            <span className="h-[3px] w-6 rounded-full" style={{ backgroundColor: accent }} />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance text-[26px] font-extrabold leading-tight tracking-tight sm:text-[34px] lg:text-[40px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-ink-300 sm:text-sm">
            {description}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}
