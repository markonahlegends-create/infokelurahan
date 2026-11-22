import type { Metadata } from "next";
import { getRepository } from "@/lib/data";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/layout/PageHero";
import { PostExplorer } from "@/components/news/PostExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Indeks Berita",
  description:
    "Semua berita dan informasi kelurahan Kota Cilegon — pemerintahan, pembangunan, pendidikan, kesehatan, olahraga, ekonomi, dan sosial.",
  alternates: { canonical: "/berita" },
};

export default async function BeritaIndexPage() {
  const repo = await getRepository();
  const page = await repo.listPosts({ limit: 9 });

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Indeks berita"
          title="Semua kabar dari kelurahan Kota Cilegon"
          description="Telusuri liputan lengkap dari 8 kecamatan dan 43 kelurahan. Gunakan filter rubrik untuk menemukan berita yang Anda butuhkan."
          breadcrumb={[{ label: "Berita" }]}
        />

        <section className="container-page py-8 sm:py-10">
          <PostExplorer initialPosts={page.posts} initialTotal={page.total} query={{}} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
