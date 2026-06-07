"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  large?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
  large = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        large ? "max-w-4xl" : "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <p className="mb-4 text-[13px] font-medium tracking-wide text-zinc-500">
          {label}
        </p>
      )}
      <h2
        className={cn(
          "font-semibold tracking-[-0.02em] text-white",
          large
            ? "text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.1]"
            : "text-2xl sm:text-3xl lg:text-4xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-500 sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
