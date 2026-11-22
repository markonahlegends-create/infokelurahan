/** Utilitas tampilan yang dipakai lintas komponen. */

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/**
 * Waktu di situs selalu disajikan dalam zona WIB (UTC+7) agar hasil sama
 * di server (UTC) maupun di peramban pengguna, dan agar jam agenda tidak
 * bergeser 7 jam.
 */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

/** Geser waktu ke WIB lalu baca komponennya dengan getter UTC. */
function wibParts(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const shifted = new Date(date.getTime() + WIB_OFFSET_MS);
  return {
    day: shifted.getUTCDate(),
    month: shifted.getUTCMonth(),
    year: shifted.getUTCFullYear(),
    weekday: shifted.getUTCDay(),
    hours: shifted.getUTCHours(),
    minutes: shifted.getUTCMinutes(),
  };
}

/** 9 November 2026 */
export function formatDateID(iso: string): string {
  const p = wibParts(iso);
  if (!p) return "-";
  return `${p.day} ${MONTHS[p.month]} ${p.year}`;
}

/** Senin, 9 November 2026 */
export function formatLongDateID(iso: string): string {
  const p = wibParts(iso);
  if (!p) return "-";
  return `${DAYS[p.weekday]}, ${p.day} ${MONTHS[p.month]} ${p.year}`;
}

/** 09 Nov 2026 */
export function formatShortDateID(iso: string): string {
  const p = wibParts(iso);
  if (!p) return "-";
  return `${String(p.day).padStart(2, "0")} ${MONTHS[p.month].slice(0, 3)} ${p.year}`;
}

/** 14:11 WIB */
export function formatTimeID(iso: string): string {
  const p = wibParts(iso);
  if (!p) return "-";
  return `${String(p.hours).padStart(2, "0")}:${String(p.minutes).padStart(2, "0")} WIB`;
}

/** 25 (untuk kotak tanggal di kartu agenda) */
export function wibDayNumber(iso: string): string {
  const p = wibParts(iso);
  return p ? String(p.day).padStart(2, "0") : "-";
}

/** Nov (untuk kotak tanggal di kartu agenda) */
export function wibMonthShort(iso: string): string {
  const p = wibParts(iso);
  return p ? MONTHS[p.month].slice(0, 3) : "-";
}

/** "3 jam lalu", "2 hari lalu" */
export function timeAgoID(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "-";
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  if (days < 30) return `${Math.floor(days / 7)} minggu lalu`;
  if (days < 365) return `${Math.floor(days / 30)} bulan lalu`;
  return formatDateID(iso);
}

/** 4.821 */
export function formatNumberID(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value ?? 0);
}

/** 4,8 rb / 1,2 jt */
export function compactNumberID(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0).replace(".", ",")} rb`;
  return `${(value / 1_000_000).toFixed(1).replace(".", ",")} jt`;
}

export function readingTime(content: string[]): number {
  const words = content.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Escape teks agar aman disisipkan di HTML (untuk JSON-LD & RSS). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
