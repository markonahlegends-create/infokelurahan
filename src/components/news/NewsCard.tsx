"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Timer } from "lucide-react";
import type { Post } from "@/lib/types";
import { categoryColor, categoryName } from "@/lib/categories";
import { compactNumberID, formatDateID, readingTime } from "@/lib/utils";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  post: Post;
  variant?: "default" | "compact" | "horizontal" | "overlay";
  index?: number;
  priority?: boolean;
}

export function NewsCard({ post, variant = "default", index = 0, priority }: NewsCardProps) {
  const reduce = useReducedMotion();
  const color = categoryColor(post.category_slug);

  const wrapperMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] as const },
      };

  if (variant === "horizontal") {
    return (
      <motion.article {...wrapperMotion} className="group">
        <Link
          href={`/berita/${post.slug}`}
          className="flex items-stretch gap-3 rounded-2xl p-1.5 transition-colors hover:bg-paper-warm sm:gap-4"
        >
          <div className="relative h-[74px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-ink-100 sm:h-[84px] sm:w-[124px]">
            <SmartImage
              src={post.cover_image}
              alt={post.title}
              sizes="124px"
              className="transition duration-700 group-hover:scale-110"
            />
            <span
              className="absolute left-0 top-0 h-1 w-8 rounded-br-md"
              style={{ backgroundColor: color }}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <span
              className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.12em]"
              style={{ color }}
            >
              {categoryName(post.category_slug)}
            </span>
            <h3 className="line-clamp-2 text-[13.5px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-flame-700 sm:text-sm">
              {post.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2 text-[10.5px] text-ink-400">
              <span>{formatDateID(post.published_at)}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {compactNumberID(post.views)}
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "overlay") {
    return (
      <motion.article {...wrapperMotion} className="group relative">
        <Link href={`/berita/${post.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 sm:aspect-[16/11]">
            <SmartImage
              src={post.cover_image}
              alt={post.title}
              priority={priority}
              className="transition duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg backdrop-blur"
              style={{ backgroundColor: color }}
            >
              {categoryName(post.category_slug)}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-white drop-shadow-sm sm:text-lg">
                {post.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-[10.5px] font-medium text-white/70">
                <span>{formatDateID(post.published_at)}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-white/50" />
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-3 w-3" /> {readingTime(post.content)} mnt
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article {...wrapperMotion} className="group border-b border-ink-100 pb-4 last:border-none last:pb-0">
        <Link href={`/berita/${post.slug}`} className="flex gap-3">
          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[13.5px] font-bold leading-snug text-ink-900 transition group-hover:text-flame-700">
              {post.title}
            </h3>
            <p className="mt-1 text-[11px] text-ink-400">{formatDateID(post.published_at)}</p>
          </div>
        </Link>
      </motion.article>
    );
  }

  // default
  return (
    <motion.article {...wrapperMotion} className="group h-full">
      <Link
        href={`/berita/${post.slug}`}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/7 bg-white shadow-sm",
          "transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900/10 hover:shadow-[0_22px_46px_-26px_rgba(10,17,34,0.4)]",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
          <SmartImage
            src={post.cover_image}
            alt={post.title}
            priority={priority}
            className="transition duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md"
            style={{ backgroundColor: color }}
          >
            {categoryName(post.category_slug)}
          </span>
          {post.is_headline && (
            <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-flame-700 shadow">
              Headline
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink-900 transition-colors group-hover:text-flame-700">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-ink-500">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5 text-[10.5px] text-ink-400">
            <span className="font-medium">{formatDateID(post.published_at)}</span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {compactNumberID(post.views)} pembaca
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
