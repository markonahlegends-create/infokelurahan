import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  /** Ukuran sisi badge dalam piksel. */
  size?: number;
  className?: string;
}

/**
 * Tanda (badge) Info Kelurahan saja — pin info dengan ombak pesisir.
 * Dipakai di header, footer, dashboard, dan kartu berbagi.
 */
export function BrandMark({ size = 40, className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-xl shadow-lg shadow-ink-950/20 transition duration-500 group-hover:scale-105",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/icon-512.png"
        alt=""
        width={size}
        height={size}
        priority
        className="h-full w-full object-contain"
      />
    </span>
  );
}

interface BrandLockupProps {
  href?: string;
  className?: string;
  /** Ukuran badge; teks mengikuti proporsi yang sama. */
  size?: number;
  /** Sembunyikan subjudul "Kota Cilegon · Banten". */
  compact?: boolean;
  /** Warna teks untuk latar gelap. */
  tone?: "light" | "dark";
  ariaLabel?: string;
}

/**
 * Logo lengkap: badge + tulisan "InfoKelurahan" + subjudul wilayah.
 * Dipakai sebagai identitas utama situs.
 */
export function BrandLockup({
  href = "/",
  className,
  size = 40,
  compact = false,
  tone = "light",
  ariaLabel = "Info Kelurahan — Beranda",
}: BrandLockupProps) {
  const content = (
    <>
      <BrandMark size={size} />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "text-[17px] font-extrabold tracking-tight sm:text-lg",
            tone === "dark" ? "text-white" : "text-ink-950",
          )}
        >
          Info
          <span className={tone === "dark" ? "text-flame-400" : "text-flame-600"}>
            Kelurahan
          </span>
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[9.5px] font-semibold uppercase tracking-[0.19em]",
              tone === "dark" ? "text-ink-400" : "text-ink-400",
            )}
          >
            Kota Cilegon · Banten
          </span>
        )}
      </span>
    </>
  );

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
    >
      {content}
    </Link>
  );
}
