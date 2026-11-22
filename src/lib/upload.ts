import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

/**
 * Penyimpanan berkas gambar unggahan.
 *
 * Urutan strategi:
 * 1. **Vercel Blob** bila `BLOB_READ_WRITE_TOKEN` tersedia (produksi).
 * 2. **Folder lokal** `.data/uploads`, disajikan lewat `/api/media/<berkas>`
 *    (pengembangan & self-host).
 * 3. **Supabase Storage** bila bucket `media` sudah dibuat.
 *
 * Dengan begitu unggahan selalu berfungsi tanpa memaksa satu layanan berbayar.
 */

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;

const SUPABASE_BUCKET = "media";

export interface SavedImage {
  url: string;
  storage: "vercel-blob" | "local" | "supabase";
}

/** Apakah MIME termasuk gambar yang didukung? */
export function isAllowedImageType(type: string): boolean {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type.toLowerCase());
}

/** Nama berkas unik dan aman: slug waktu + UUID + ekstensi. */
export function buildImageName(originalName: string, mime: string): string {
  const extFromName = /\.(jpe?g|png|webp|avif|gif)$/i.exec(originalName)?.[0]?.toLowerCase();
  const extFromMime: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
  };
  const ext = extFromName ?? extFromMime[mime.toLowerCase()] ?? ".img";
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${stamp}-${randomUUID().slice(0, 12)}${ext}`;
}

/** Folder penyimpanan lokal (di luar `public/` agar disajikan via route). */
export function localUploadDir(): string {
  const path = require("node:path") as typeof import("node:path");
  return path.join(process.cwd(), ".data", "uploads");
}

function supabaseConfig() {
  const base = (process.env.SUPABASE_URL ?? "").trim().replace(/\/$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  return base && key ? { base, key } : null;
}

/**
 * Simpan buffer gambar dan kembalikan URL publiknya.
 * Melempar error dengan pesan Bahasa Indonesia bila semua strategi gagal.
 */
export async function saveImage(
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<SavedImage> {
  const errors: string[] = [];

  // 1) Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`berita/${filename}`, buffer, {
        access: "public",
        contentType,
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return { url: blob.url, storage: "vercel-blob" };
    } catch (error) {
      errors.push(`blob: ${error instanceof Error ? error.message : "gagal"}`);
    }
  }

  // 2) Folder lokal (pengembangan / self-host)
  try {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = localUploadDir();
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);
    return { url: `/api/media/${filename}`, storage: "local" };
  } catch (error) {
    errors.push(`lokal: ${error instanceof Error ? error.message : "gagal"}`);
  }

  // 3) Supabase Storage
  const cfg = supabaseConfig();
  if (cfg) {
    try {
      const res = await fetch(
        `${cfg.base}/storage/v1/object/${SUPABASE_BUCKET}/${encodeURIComponent(filename)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cfg.key}`,
            apikey: cfg.key,
            "Content-Type": contentType,
            "x-upsert": "true",
          },
          body: new Uint8Array(buffer),
        },
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${res.status} ${text.slice(0, 120)}`);
      }
      return {
        url: `${cfg.base}/storage/v1/object/public/${SUPABASE_BUCKET}/${encodeURIComponent(filename)}`,
        storage: "supabase",
      };
    } catch (error) {
      errors.push(`supabase: ${error instanceof Error ? error.message : "gagal"}`);
    }
  }

  throw new Error(`Gagal menyimpan gambar. ${errors.join(" | ")}`);
}
