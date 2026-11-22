import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * Batas sederhana per instance untuk mencegah satu klien membanjiri
 * penghitung pembaca. Bukan pengganti analitik, hanya rem darurat.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const recent = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]!.trim() || "unknown";
}

function allow(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(key, hits);
    return false;
  }
  hits.push(now);
  recent.set(key, hits);
  // Jaga ukuran map agar tidak tumbuh tanpa batas.
  if (recent.size > 5_000) recent.clear();
  return true;
}

/** POST /api/views { id } — menambah penghitung pembaca (fire and forget). */
export async function POST(request: Request) {
  try {
    if (!allow(clientKey(request))) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const body = (await request.json()) as { id?: number };
    const id = Number(body?.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const repo = await getRepository();
    await repo.incrementViews(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
