"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PillSelectorProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
  index?: number;
}

export function PillSelector({ label, emoji, selected, onClick, index = 0 }: PillSelectorProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 + 0.1 }}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all duration-200",
        selected
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
          : "bg-white/[0.02] border-white/[0.08] text-zinc-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
      )}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-1"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.div>
      )}
    </motion.button>
  );
}
