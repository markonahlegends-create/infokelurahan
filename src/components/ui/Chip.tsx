import Link from "next/link";
import { cn } from "@/lib/utils";

export function Chip({
  href,
  children,
  active,
  color,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  active?: boolean;
  color?: string;
  className?: string;
}) {
  const base = cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition",
    active
      ? "bg-ink-950 text-white"
      : "border border-ink-200 bg-white text-ink-600 hover:border-flame-300 hover:text-flame-700",
    className,
  );

  const content = (
    <>
      {color && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: active ? "#fff" : color }}
        />
      )}
      {children}
    </>
  );

  if (!href) return <span className={base}>{content}</span>;
  return (
    <Link href={href} className={base}>
      {content}
    </Link>
  );
}
