import { NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { localUploadDir } from "@/lib/upload";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

/**
 * GET /api/media/<berkas> — menyajikan gambar unggahan lokal.
 * Dipakai saat situs berjalan tanpa Vercel Blob / Supabase Storage.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  // Tolak path traversal & nama berkas aneh.
  const safe = path.basename(decodeURIComponent(file));
  if (!/^[a-zA-Z0-9._-]+$/.test(safe) || safe.startsWith(".")) {
    return new NextResponse("Berkas tidak valid", { status: 400 });
  }

  const full = path.join(localUploadDir(), safe);
  try {
    const info = await stat(full);
    if (!info.isFile()) throw new Error("bukan berkas");

    const stream = Readable.toWeb(createReadStream(full)) as ReadableStream;
    return new NextResponse(stream, {
      headers: {
        "Content-Type": MIME[path.extname(safe).toLowerCase()] ?? "application/octet-stream",
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Gambar tidak ditemukan", { status: 404 });
  }
}
