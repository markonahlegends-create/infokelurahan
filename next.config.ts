import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Gambar sampul berasal dari CDN eksternal (berita.cilegon.go.id).
  // Mode unoptimized menjaga kompatibilitas di semua hosting gratis.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "berita.cilegon.go.id" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
