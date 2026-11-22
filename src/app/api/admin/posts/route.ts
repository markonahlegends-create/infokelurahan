import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import { isCategorySlug } from "@/lib/categories";
import type { NewPostInput } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/admin/posts — daftar berita termasuk draf (khusus admin). */
export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Tidak terautentikasi" }, { status: 401 });
  }

  const url = new URL(request.url);
  const repo = await getRepository();
  const page = await repo.listPosts({
    q: url.searchParams.get("q") ?? undefined,
    limit: 60,
    offset: 0,
    includeDrafts: true,
    sort: "terbaru",
  });

  return NextResponse.json({ ok: true, posts: page.posts, driver: repo.driver });
}

/** POST /api/admin/posts — buat berita baru. */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Tidak terautentikasi" }, { status: 401 });
  }

  let body: Partial<NewPostInput>;
  try {
    body = (await request.json()) as Partial<NewPostInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "Format tidak valid." }, { status: 400 });
  }

  const error = validate(body);
  if (error) return NextResponse.json({ ok: false, error }, { status: 422 });

  try {
    const repo = await getRepository();
    const post = await repo.createPost({
      title: body.title!.trim(),
      excerpt: body.excerpt,
      content: body.content!,
      cover_image: body.cover_image,
      category_slug: body.category_slug!,
      district_slug: body.district_slug ?? null,
      village_slug: body.village_slug ?? null,
      author: body.author,
      is_headline: body.is_headline,
      status: body.status === "draft" ? "draft" : "published",
    });
    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (err) {
    console.error("[admin] gagal membuat berita", err);
    return NextResponse.json({ ok: false, error: "Gagal menyimpan berita." }, { status: 500 });
  }
}

function validate(body: Partial<NewPostInput>): string | null {
  if (!body.title || body.title.trim().length < 6) {
    return "Judul minimal 6 karakter.";
  }
  if (!body.content) return "Isi berita wajib diisi.";
  const paragraphs = Array.isArray(body.content) ? body.content : [body.content];
  const filled = paragraphs.filter((p) => String(p ?? "").trim().length > 0);
  if (filled.length === 0) return "Isi berita wajib diisi.";
  if (!body.category_slug || !isCategorySlug(body.category_slug)) {
    return "Kategori tidak valid.";
  }
  return null;
}
