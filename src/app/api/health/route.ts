import { NextResponse } from "next/server";
import { dataMode, getRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * GET /api/health — status lapisan data.
 * Dipakai untuk memastikan situs terhubung ke Supabase (atau jatuh ke mode demo).
 */
export async function GET() {
  const started = Date.now();
  const repo = await getRepository();
  const [stats, probe] = await Promise.all([
    repo.stats(),
    repo.listPosts({ limit: 1 }),
  ]);

  return NextResponse.json({
    ok: probe.posts.length > 0,
    driver: repo.driver,
    configured: dataMode(),
    posts: stats.total_posts,
    views: stats.total_views,
    latest_post_at: stats.latest_post_at,
    latency_ms: Date.now() - started,
    timestamp: new Date().toISOString(),
  });
}
