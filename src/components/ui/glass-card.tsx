"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({
  className,
  glow = false,
  hover = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
        glow && "shadow-[0_0_40px_-12px_rgba(139,92,246,0.3)]",
        hover &&
          "transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
