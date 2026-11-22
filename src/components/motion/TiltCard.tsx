"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: string;
}

/** Kartu 3D yang miring mengikuti kursor dengan sorotan cahaya. */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
  glow = "rgba(248,94,22,0.16)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useTransform(py, [0, 1], [maxTilt, -maxTilt]);
  const ry = useTransform(px, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useSpring(rx, { stiffness: 170, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 170, damping: 22 });

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, ${glow}, transparent 72%)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("group/tilt relative [perspective:1100px]", className)}
      onPointerMove={(event) => {
        const el = ref.current;
        if (!el || event.pointerType === "touch") return;
        const rect = el.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background }}
        />
      </motion.div>
    </motion.div>
  );
}
