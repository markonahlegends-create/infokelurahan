import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { BackToTop } from "@/components/motion/BackToTop";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Info Kelurahan — Portal Berita Kota Cilegon",
    template: "%s | Info Kelurahan",
  },
  description:
    "Portal berita dan informasi kelurahan Kota Cilegon: pemerintahan, pembangunan, pendidikan, kesehatan, olahraga, dan kegiatan warga di 8 kecamatan serta 43 kelurahan.",
  keywords: [
    "info kelurahan",
    "berita cilegon",
    "kelurahan cilegon",
    "kecamatan cilegon",
    "pemerintah kota cilegon",
    "berita banten",
  ],
  authors: [{ name: "Redaksi Info Kelurahan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Info Kelurahan",
    title: "Info Kelurahan — Portal Berita Kota Cilegon",
    description:
      "Informasi kelurahan Kota Cilegon: pemerintahan, pembangunan, pendidikan, kesehatan, olahraga, dan kegiatan warga.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Info Kelurahan — Portal Berita Kota Cilegon",
    description:
      "Informasi kelurahan Kota Cilegon di 8 kecamatan dan 43 kelurahan.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1122" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-dvh bg-paper antialiased">
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
