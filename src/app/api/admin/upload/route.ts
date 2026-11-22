import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  buildImageName,
  isAllowedImageType,
  saveImage,
} from "@/lib/upload";

export const dynamic = "force-dynamic";
// Buffer berkas butuh Node.js runtime (bukan edge).
export const runtime = "nodejs";

/**
 * POST /api/admin/upload — unggah foto sampul berita (khusus admin).
 * Menerima `multipart/form-data` dengan field `file`.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Tidak terautentikasi" },
      { status: 401 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Format unggahan tidak valid." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Pilih berkas gambar terlebih dahulu." },
      { status: 400 },
    );
  }

  if (!isAllowedImageType(file.type)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Berkas harus berupa gambar JPG, PNG, WEBP, AVIF, atau GIF.",
      },
      { status: 415 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Berkas gambar kosong." },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_BYTES) {
    const mb = Math.round((MAX_IMAGE_BYTES / 1024 / 1024) * 10) / 10;
    return NextResponse.json(
      { ok: false, error: `Ukuran gambar maksimal ${mb} MB.` },
      { status: 413 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    // Tolak berkas yang bukan gambar meski MIME-nya dipalsukan.
    if (!looksLikeImage(buffer)) {
      return NextResponse.json(
        { ok: false, error: "Isi berkas bukan gambar yang sah." },
        { status: 415 },
      );
    }

    const filename = buildImageName(file.name || "gambar", file.type);
    const saved = await saveImage(buffer, filename, file.type);

    return NextResponse.json({
      ok: true,
      url: saved.url,
      storage: saved.storage,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("[upload] gagal menyimpan gambar", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Gagal menyimpan gambar. Pastikan penyimpanan (Vercel Blob / Supabase Storage) sudah dikonfigurasi.",
      },
      { status: 500 },
    );
  }
}

/** Cek signature berkas: JPEG, PNG, WEBP, GIF, AVIF. */
function looksLikeImage(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;
  const hex = buffer.subarray(0, 12).toString("hex").toLowerCase();
  if (hex.startsWith("ffd8ff")) return true; // JPEG
  if (hex.startsWith("89504e47")) return true; // PNG
  if (hex.startsWith("47494638")) return true; // GIF
  if (hex.startsWith("52494646") && buffer.subarray(8, 12).toString("ascii") === "WEBP")
    return true; // RIFF….WEBP
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp") return true; // AVIF/HEIF
  return false;
}

/** GET — info batas unggahan untuk panel admin. */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    max_bytes: MAX_IMAGE_BYTES,
    types: ALLOWED_IMAGE_TYPES,
  });
}
