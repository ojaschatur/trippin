"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Brain,
  Clock,
  Star,
  Ship,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  { icon: Wallet, label: "Budget Match", value: "94%", delay: 0 },
  { icon: Brain, label: "AI Consensus", value: "92%", delay: 0.15 },
  { icon: Clock, label: "Decision Time", value: "4 min", delay: 0.3 },
  { icon: Star, label: "Trip Score", value: "A+", delay: 0.45 },
  { icon: Ship, label: "Ferry Preferred", value: "6/6", delay: 0.6 },
];

const positions = [
  "top-[8%] -left-[5%] sm:-left-[8%]",
  "top-[5%] -right-[3%] sm:-right-[6%]",
  "bottom-[28%] -left-[8%] sm:-left-[12%]",
  "bottom-[12%] -right-[5%] sm:-right-[10%]",
  "bottom-[45%] right-[2%] sm:right-[-4%]",
];

export function FloatingStats() {
  return (
    <>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={`absolute z-20 hidden sm:block ${positions[i]}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.8 + stat.delay,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GlassCard className="flex items-center gap-2.5 px-3.5 py-2.5" glow>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20">
                <stat.icon className="h-3.5 w-3.5 text-violet-300" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
                <p className="text-sm font-semibold text-white">{stat.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
