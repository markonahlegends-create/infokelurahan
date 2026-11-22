import type { MetadataRoute } from "next";

/** Manifest PWA: ikon, warna tema, dan nama singkat saat dipasang di HP. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Info Kelurahan — Portal Berita Kota Cilegon",
    short_name: "Info Kelurahan",
    description:
      "Berita, agenda, dan informasi 8 kecamatan serta 43 kelurahan Kota Cilegon.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#0a1122",
    lang: "id",
    categories: ["news", "government"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
