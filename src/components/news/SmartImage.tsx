"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "/images/placeholder-news.svg";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Gambar dengan fallback otomatis.
 * Foto berita berasal dari CDN sumber; bila gagal dimuat (offline, blokir,
 * atau URL berubah) tampil placeholder bermerek agar tata letak tetap rapi.
 */
export function SmartImage({ src, alt, className, sizes, priority }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const finalSrc = !src || failed ? PLACEHOLDER : src;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
      unoptimized
    />
  );
}
