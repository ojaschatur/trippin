"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeaturePillsProps {
  items: string[];
  className?: string;
}

export function FeaturePills({ items, className }: FeaturePillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        className
      )}
    >
      {items.map((item, i) => (
        <span
          key={item}
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-400 sm:text-sm"
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
}
