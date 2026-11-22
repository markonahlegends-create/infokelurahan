"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Garis kemajuan baca di bagian paling atas halaman. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-flame-500 via-flame-400 to-sea-400"
      style={{ scaleX }}
    />
  );
}
