import type { Repository } from "./repository";
import { localRepository } from "./local";
import { createSupabaseRepository } from "./supabase";
import { SEED_AGENDAS, SEED_ANNOUNCEMENTS, SEED_DRAFTS, SEED_POSTS } from "../seed/posts";

export * from "./repository";
export { localRepository } from "./local";

const globalCache = globalThis as unknown as {
  __infokelurahan_repo?: Repository;
  __infokelurahan_seeded?: boolean;
  __infokelurahan_repo_mode?: string;
};

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

export function dataMode(): "supabase" | "local" {
  return env("SUPABASE_URL") && env("SUPABASE_SERVICE_ROLE_KEY")
    ? "supabase"
    : "local";
}

/**
 * Mengembalikan repository aktif.
 * Supabase dipakai bila kredensial tersedia & dapat dijangkau; jika tidak,
 * otomatis jatuh ke driver demo lokal agar situs tidak pernah kosong.
 */
export async function getRepository(): Promise<Repository> {
  if (globalCache.__infokelurahan_repo) return globalCache.__infokelurahan_repo;

  if (dataMode() === "supabase") {
    const repo = createSupabaseRepository(
      env("SUPABASE_URL"),
      env("SUPABASE_SERVICE_ROLE_KEY"),
    );
    const ready = await repo.isReady();
    if (ready) {
      await ensureSeed(repo);
      globalCache.__infokelurahan_repo = repo;
      globalCache.__infokelurahan_repo_mode = "supabase";
      return repo;
    }
    console.warn(
      "[info-kelurahan] Supabase tidak dapat dijangkau / skema belum siap. Beralih ke mode demo lokal.",
    );
  }

  globalCache.__infokelurahan_repo = localRepository;
  globalCache.__infokelurahan_repo_mode = "local";
  return localRepository;
}

/**
 * Isi data awal bila database Supabase masih kosong.
 *
 * Seluruh proses bersifat best-effort: kegagalan apa pun (jaringan,
 * RLS, skema belum siap) hanya dicatat dan aplikasi tetap berjalan.
 */
async function ensureSeed(repo: Repository): Promise<void> {
  if (globalCache.__infokelurahan_seeded) return;
  if (env("AUTO_SEED").toLowerCase() === "false") {
    globalCache.__infokelurahan_seeded = true;
    return;
  }

  try {
    const { total } = await repo.listPosts({ limit: 1, includeDrafts: true });
    if (total > 0) {
      globalCache.__infokelurahan_seeded = true;
      return;
    }
  } catch (error) {
    console.warn("[info-kelurahan] tidak dapat memeriksa isi database:", error);
    globalCache.__infokelurahan_seeded = true;
    return;
  }

  console.info("[info-kelurahan] Database kosong — mengisi data awal berita Cilegon…");

  // Urutkan dari yang paling lama agar urutan tampil sesuai kronologi.
  const ordered = [...SEED_POSTS].sort(
    (a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime(),
  );

  let inserted = 0;
  for (const seed of ordered) {
    try {
      const post = await repo.createPost({
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        cover_image: seed.cover_image,
        category_slug: seed.category_slug,
        district_slug: seed.district_slug,
        village_slug: seed.village_slug,
        author: seed.author,
        is_headline: false,
        status: "published",
      });
      // Kembalikan tanggal terbit & jumlah pembaca asli dari data awal.
      await patchSeedMeta(post.id, seed.published_at, seed.views);
      if (seed.is_headline) {
        await repo.updatePost(post.id, { is_headline: true });
      }
      inserted += 1;
    } catch (error) {
      console.warn(`[info-kelurahan] gagal menyisipkan "${seed.slug}":`, error);
      break;
    }
  }

  // Draf contoh agar dashboard memiliki variasi status.
  try {
    const draft = SEED_DRAFTS[0];
    if (draft) {
      await repo.createPost({ ...draft, status: "draft" });
    }
  } catch {
    /* opsional */
  }

  await seedExtras();
  globalCache.__infokelurahan_seeded = true;
  console.info(`[info-kelurahan] ${inserted} berita awal dimuat ke Supabase.`);
}

/** Ubah published_at & views untuk baris yang baru disisipkan. */
async function patchSeedMeta(id: number, publishedAt: string, views: number): Promise<void> {
  const base = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!base || !key) return;
  await fetch(`${base}/rest/v1/posts?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ published_at: publishedAt, views }),
  });
}

/** Agenda & pengumuman hanya tersedia bila tabelnya sudah dibuat. */
async function seedExtras(): Promise<void> {
  const base = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!base || !key) return;

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  const insert = async (table: string, rows: unknown[]) => {
    try {
      const probe = await fetch(`${base}/rest/v1/${table}?select=id&limit=1`, { headers });
      if (!probe.ok) return;
      const existing = (await probe.json()) as unknown[];
      if (existing.length > 0) return;
      await fetch(`${base}/rest/v1/${table}`, {
        method: "POST",
        headers,
        body: JSON.stringify(rows),
      });
    } catch {
      /* opsional */
    }
  };

  await insert("announcements", SEED_ANNOUNCEMENTS);
  await insert("agendas", SEED_AGENDAS);
}

/** Ekspor untuk pengujian/manual seeding. */
export { ensureSeed as seedSupabase };
