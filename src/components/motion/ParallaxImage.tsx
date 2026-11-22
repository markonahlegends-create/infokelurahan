"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
}

/** Gambar dengan pergeseran paralaks halus saat halaman digulir. */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  strength = 60,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.06, 1.14]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          unoptimized
        />
      </motion.div>
    </div>
  );
}
