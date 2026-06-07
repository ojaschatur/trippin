"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductPanelProps extends HTMLMotionProps<"div"> {
  elevated?: boolean;
  hover?: boolean;
}

export function ProductPanel({
  className,
  elevated = false,
  hover = false,
  children,
  ...props
}: ProductPanelProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-[#111113]",
        elevated && "shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)]",
        hover && "transition-colors duration-200 hover:border-white/[0.12]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
