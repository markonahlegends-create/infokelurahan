import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

/** POST /api/views { id } — menambah penghitung pembaca (fire and forget). */
export async function POST(request: Request) {
  try {
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
