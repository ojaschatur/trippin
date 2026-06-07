"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Wallet,
  Brain,
  CheckCircle2,
  Ship,
  Home,
  Loader2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingStats } from "@/components/visuals/floating-stats";

const analyzingItems = [
  "Budget constraints",
  "Travel preferences",
  "Activities",
  "Group availability",
];

export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <FloatingStats />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassCard glow className="overflow-hidden p-1">
          <div className="rounded-xl bg-[#0a0a0f]/90 p-5 sm:p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-medium text-zinc-500">
                Trippin AI Engine
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>

            {/* Trip meta */}
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
                Trip
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                Weekend Escape
              </h3>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { icon: MapPin, label: "Origin", value: "Mumbai" },
                { icon: Users, label: "People", value: "6 Friends" },
                { icon: Wallet, label: "Budget", value: "₹5000" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <item.icon className="mb-1.5 h-3.5 w-3.5 text-zinc-500" />
                  <p className="text-[10px] text-zinc-500">{item.label}</p>
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* AI Analyzing */}
            <div className="mb-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">
                  AI analyzing
                </span>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
              </div>
              <div className="space-y-2">
                {analyzingItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </motion.div>
                    <span className="text-xs text-zinc-400">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                    Result
                  </p>
                  <h4 className="mt-1 text-2xl font-bold text-white">Alibaug</h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400">92%</p>
                  <p className="text-[10px] text-zinc-500">Compatibility</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                <Wallet className="h-3.5 w-3.5 text-zinc-500" />
                <span>₹4700/person</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { icon: Ship, label: "M2M Ferry" },
                  { icon: Home, label: "Beachside Villa" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    <tag.icon className="h-3 w-3" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Mobile floating stats row */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:hidden">
        {[
          { label: "Budget Match", value: "94%" },
          { label: "AI Consensus", value: "92%" },
          { label: "Decision", value: "4 min" },
          { label: "Score", value: "A+" },
        ].map((stat) => (
          <GlassCard
            key={stat.label}
            className="shrink-0 px-3 py-2"
          >
            <p className="text-[9px] uppercase tracking-wider text-zinc-500">
              {stat.label}
            </p>
            <p className="text-xs font-semibold text-white">{stat.value}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
