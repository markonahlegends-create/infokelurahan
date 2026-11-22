import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { Agenda, Announcement } from "@/lib/types";
import { formatShortDateID, formatTimeID } from "@/lib/utils";

const LEVEL_STYLE = {
  penting: { label: "Penting", className: "bg-flame-500 text-white" },
  layanan: { label: "Layanan", className: "bg-sea-500 text-white" },
  info: { label: "Info", className: "bg-ink-700 text-white" },
} as const;

export function AnnouncementList({ items }: { items: Announcement[] }) {
  if (items.length === 0) return null;
  return (
    <div id="pengumuman" className="space-y-2.5">
      {items.map((item) => {
        const style = LEVEL_STYLE[item.level] ?? LEVEL_STYLE.info;
        return (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-ink-900/8 bg-white p-3.5 transition hover:border-flame-200 hover:shadow-sm"
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${style.className}`}>
                {style.label}
              </span>
              <span className="text-[10px] text-ink-400">{formatShortDateID(item.published_at)}</span>
            </div>
            <h4 className="text-[13px] font-bold leading-snug text-ink-900">{item.title}</h4>
            <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink-500">{item.body}</p>
          </article>
        );
      })}
    </div>
  );
}

export function AgendaPanel({ agendas }: { agendas: Agenda[] }) {
  if (agendas.length === 0) return null;
  return (
    <div className="space-y-1">
      {agendas.slice(0, 4).map((agenda) => {
        const date = new Date(agenda.starts_at);
        const day = Number.isNaN(date.getTime()) ? "—" : String(date.getDate()).padStart(2, "0");
        const month = Number.isNaN(date.getTime())
          ? "—"
          : ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"][date.getMonth()];
        return (
          <div
            key={agenda.id}
            className="group flex gap-3 rounded-xl p-2.5 transition hover:bg-paper-warm"
          >
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-ink-950 text-white transition group-hover:bg-flame-600">
              <span className="text-[15px] font-extrabold leading-none">{day}</span>
              <span className="text-[8.5px] font-bold tracking-wider opacity-80">{month}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-[12.5px] font-bold leading-snug text-ink-900">
                {agenda.title}
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-ink-400">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" /> {formatTimeID(agenda.starts_at)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" /> {agenda.location}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <Link
        href="/agenda"
        className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink-200 py-2 text-[11.5px] font-bold text-ink-500 transition hover:border-flame-300 hover:text-flame-600"
      >
        <CalendarDays className="h-3.5 w-3.5" /> Semua agenda kelurahan
      </Link>
    </div>
  );
}
