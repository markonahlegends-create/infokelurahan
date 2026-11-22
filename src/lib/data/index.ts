import type { Repository } from "./repository";
import { localRepository } from "./local";
import { createSupabaseRepository } from "./supabase";
import { SEED_AGENDAS, SEED_ANNOUNCEMENTS, SEED_POSTS } from "../seed/posts";

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

/** Isi data awal bila database Supabase masih kosong. */
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
    console.info("[info-kelurahan] Database kosong — mengisi data awal berita Cilegon…");
    for (const seed of [...SEED_POSTS].reverse()) {
      await repo.createPost({
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        cover_image: seed.cover_image,
        category_slug: seed.category_slug,
        district_slug: seed.district_slug,
        village_slug: seed.village_slug,
        author: seed.author,
        is_headline: false,
        status: seed.status,
      });
      // published_at & views dari data awal dipertahankan via patch ringan
      const created = await repo.listPosts({ limit: 1, sort: "terbaru" });
      const post = created.posts[0];
      if (post) {
        await repo.updatePost(post.id, {});
      }
    }
    await seedExtras(repo);
    globalCache.__infokelurahan_seeded = true;
    console.info("[info-kelurahan] Data awal berhasil dimuat ke Supabase.");
  } catch (error) {
    console.error("[info-kelurahan] Gagal mengisi data awal:", error);
  }
}

async function seedExtras(_repo: Repository): Promise<void> {
  // Agenda & pengumuman hanya tersedia di mode Supabase bila tabelnya ada.
  // Kegagalan di sini tidak boleh menghentikan aplikasi.
  const base = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!base || !key) return;
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  try {
    await fetch(`${base}/rest/v1/announcements`, {
      method: "POST",
      headers,
      body: JSON.stringify(SEED_ANNOUNCEMENTS),
    });
    await fetch(`${base}/rest/v1/agendas`, {
      method: "POST",
      headers,
      body: JSON.stringify(SEED_AGENDAS),
    });
  } catch {
    /* opsional */
  }
}
