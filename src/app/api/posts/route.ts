import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import type { PostListQuery } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/posts — daftar berita dengan filter, pencarian, dan paginasi. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  const query: PostListQuery = {
    category: params.get("category") ?? undefined,
    district: params.get("district") ?? undefined,
    village: params.get("village") ?? undefined,
    q: params.get("q") ?? undefined,
    sort: params.get("sort") === "populer" ? "populer" : "terbaru",
    limit: clamp(Number(params.get("limit") ?? 12), 1, 60),
    offset: clamp(Number(params.get("offset") ?? 0), 0, 5000),
    exclude: params.get("exclude") ? Number(params.get("exclude")) : undefined,
  };

  const repo = await getRepository();
  const page = await repo.listPosts(query);

  return NextResponse.json(
    { ...page, driver: repo.driver },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } },
  );
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}
