import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import { isCategorySlug } from "@/lib/categories";
import type { NewPostInput } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

/** PATCH /api/admin/posts/:id — ubah berita. */
export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Tidak terautentikasi" }, { status: 401 });
  }

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "ID tidak valid." }, { status: 400 });
  }

  let body: Partial<NewPostInput>;
  try {
    body = (await request.json()) as Partial<NewPostInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "Format tidak valid." }, { status: 400 });
  }

  if (body.category_slug && !isCategorySlug(body.category_slug)) {
    return NextResponse.json({ ok: false, error: "Kategori tidak valid." }, { status: 422 });
  }

  const repo = await getRepository();
  const post = await repo.updatePost(id, body);
  if (!post) {
    return NextResponse.json({ ok: false, error: "Berita tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, post });
}

/** DELETE /api/admin/posts/:id — hapus berita. */
export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Tidak terautentikasi" }, { status: 401 });
  }

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "ID tidak valid." }, { status: 400 });
  }

  const repo = await getRepository();
  const deleted = await repo.deletePost(id);
  return NextResponse.json({ ok: deleted }, { status: deleted ? 200 : 404 });
}
