"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: string | React.ReactNode;
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  index?: number;
}

export function OptionCard({ icon, label, description, selected, onClick, index = 0 }: OptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border text-center transition-all duration-300 w-full h-full min-h-[140px]",
        selected
          ? "bg-emerald-500/10 border-emerald-500/30 text-white shadow-[0_0_30px_rgba(52,211,153,0.1)]"
          : "bg-[#111113] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 hover:border-white/[0.15]"
      )}
    >
      <div className={cn(
        "text-3xl sm:text-4xl mb-3 transition-transform duration-300",
        selected ? "scale-110" : "group-hover:scale-110"
      )}>
        {icon}
      </div>
      <div className={cn(
        "text-sm sm:text-base font-medium",
        selected ? "text-emerald-400" : "text-zinc-300"
      )}>
        {label}
      </div>
      {description && (
        <div className="mt-2 text-[11px] text-zinc-500 max-w-[180px]">
          {description}
        </div>
      )}
    </motion.button>
  );
}
