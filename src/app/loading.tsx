export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-ink-200 border-t-flame-500" />
          <span className="absolute inset-[7px] grid place-items-center rounded-full bg-ink-950 text-[9px] font-extrabold text-white">
            IK
          </span>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
          Memuat Info Kelurahan
        </p>
      </div>
    </div>
  );
}
