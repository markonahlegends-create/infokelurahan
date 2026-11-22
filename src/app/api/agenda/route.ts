import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

/** GET /api/agenda — agenda kegiatan kelurahan mendatang. */
export async function GET() {
  const repo = await getRepository();
  const agendas = await repo.listAgendas();
  return NextResponse.json({ agendas }, {
    headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" },
  });
}
