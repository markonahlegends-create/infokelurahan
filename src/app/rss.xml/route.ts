import { getRepository } from "@/lib/data";
import { escapeHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Feed RSS 2.0 — kanal berita kelurahan untuk pembaca dan agregator. */
export async function GET() {
  const repo = await getRepository();
  const { posts } = await repo.listPosts({ limit: 30 });

  const items = posts
    .map((post) => {
      const url = `${base}/berita/${post.slug}`;
      return `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${escapeHtml(url)}</link>
      <guid isPermaLink="true">${escapeHtml(url)}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <category>${escapeHtml(post.category_slug)}</category>
      <dc:creator>${escapeHtml(post.author)}</dc:creator>
      <description>${escapeHtml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content
        .map((p) => `<p>${escapeHtml(p.replace(/\*\*/g, ""))}</p>`)
        .join("")}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Info Kelurahan — Portal Berita Kota Cilegon</title>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Berita dan informasi kelurahan Kota Cilegon: pemerintahan, pembangunan, pendidikan, kesehatan, olahraga, dan kegiatan warga.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
    },
  });
}
