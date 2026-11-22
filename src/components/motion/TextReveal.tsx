"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

/** Judul yang muncul kata demi kata dengan efek naik. */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0.05,
  stagger = 0.055,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "115%", opacity: 0, rotate: 3 }}
            animate={{ y: "0%", opacity: 1, rotate: 0 }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
