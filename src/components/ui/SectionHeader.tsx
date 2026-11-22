import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  accent?: string;
  className?: string;
  compact?: boolean;
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  href,
  linkLabel = "Lihat semua",
  accent = "#f85e16",
  className,
  compact = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4 sm:mb-5", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className="h-[3px] w-7 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span
              className="text-[10.5px] font-extrabold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          </div>
        )}
        <h2
          className={cn(
            "font-extrabold tracking-tight text-ink-950",
            compact ? "text-[19px] sm:text-xl" : "text-[22px] sm:text-[26px]",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-ink-500">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-[11.5px] font-bold text-ink-700 transition hover:border-flame-300 hover:bg-flame-50 hover:text-flame-700 sm:flex"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
