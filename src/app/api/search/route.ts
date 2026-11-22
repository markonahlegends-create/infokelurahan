import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { getCategory } from "@/lib/categories";
import { formatDateID } from "@/lib/utils";

export const dynamic = "force-dynamic";

/** GET /api/search?q=... — pencarian ringkas untuk kotak pencarian live. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json({ query: q, results: [] });
  }

  const repo = await getRepository();
  const page = await repo.listPosts({ q, limit: 6 });

  return NextResponse.json({
    query: q,
    results: page.posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      category: getCategory(post.category_slug)?.name ?? "Berita",
      category_slug: post.category_slug,
      date: formatDateID(post.published_at),
      cover_image: post.cover_image,
    })),
    total: page.total,
  });
}
