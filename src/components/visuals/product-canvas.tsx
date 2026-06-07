"use client";

import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  Wallet,
  Brain,
  CheckCircle,
  Sparkles,
  Ship,
  Home,
  ThumbsUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import { ProductPanel } from "@/components/ui/product-panel";

const trips = [
  { name: "Weekend Escape", active: true, match: "92%" },
  { name: "Goa Trip", active: false, match: "—" },
  { name: "Hill Station", active: false, match: "—" },
];

const votes = [
  { name: "Ojas", vote: "Alibaug", budget: "₹5000" },
  { name: "Rahul", vote: "Alibaug", budget: "₹7000" },
  { name: "Karan", vote: "Lonavala", budget: "₹3500" },
];

export function ProductCanvas() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Ambient glow behind canvas */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 scale-90 opacity-40 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Main app shell — Fermeon-style sidebar + detail */}
        <ProductPanel elevated className="overflow-hidden">
          <div className="flex min-h-[420px] flex-col sm:min-h-[480px] sm:flex-row">
            {/* Sidebar */}
            <div className="w-full border-b border-white/[0.06] sm:w-56 sm:border-b-0 sm:border-r">
              <div className="border-b border-white/[0.06] p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-500">Connected</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">Trippin</p>
              </div>

              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 pl-8 pr-3 text-xs text-zinc-600">
                    Search trips...
                  </div>
                </div>
              </div>

              <div className="px-3 pb-2">
                <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  Active Trips
                </p>
                {trips.map((trip, i) => (
                  <motion.div
                    key={trip.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className={`flex cursor-default items-center justify-between rounded-lg px-2 py-2.5 text-xs ${
                      trip.active
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-500"
                    }`}
                  >
                    <span className="font-medium">{trip.name}</span>
                    {trip.active && (
                      <span className="text-emerald-400">{trip.match}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main detail panel */}
            <div className="flex-1 p-5 sm:p-6">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    AI Analysis
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    How the group decides
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Evaluating what the group can actually agree on.
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    Consensus Generated
                  </div>
                  <p className="mt-1 text-lg font-bold text-emerald-400">
                    92% Match
                  </p>
                </div>
              </div>

              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 sm:col-span-2">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-xs font-medium text-zinc-300">
                      AI Analysis
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      "Budget Compatibility",
                      "Travel Time",
                      "Activity Preferences",
                      "Group Availability",
                      "Consensus Confidence",
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.08 }}
                        className="flex items-center gap-2 text-[11px] text-zinc-500"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400/90" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-4 sm:col-span-2">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Consensus Generated
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">Recommended:</p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <div>
                      <h4 className="text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[1.8rem]">
                        Alibaug
                      </h4>
                      <p className="text-base font-medium text-emerald-400">
                        92% Match
                      </p>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Highest compatibility option
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:col-span-2">
                  {[
                    { icon: Ship, label: "M2M Ferry" },
                    { icon: Home, label: "Beachside Villa" },
                    { icon: Wallet, label: "₹4700/person" },
                  ].map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-zinc-400"
                    >
                      <tag.icon className="h-3 w-3" />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ProductPanel>

        {/* Floating vote panel — ClawIn style */}
        <motion.div
          initial={{ opacity: 0, x: -24, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute -left-2 top-[18%] z-10 hidden w-52 lg:block xl:-left-16 xl:w-56"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ProductPanel elevated className="p-3.5">
              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Friend Votes
              </p>
              {votes.map((v) => (
                <div
                  key={v.name}
                  className="flex items-center justify-between border-b border-white/[0.04] py-2 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                      {v.name[0]}
                    </div>
                    <span className="text-xs text-zinc-300">{v.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">{v.budget}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
                <ThumbsUp className="h-3 w-3" />
                4/6 voted Alibaug
              </div>
            </ProductPanel>
          </motion.div>
        </motion.div>

        {/* Floating result card — right */}
        <motion.div
          initial={{ opacity: 0, x: 24, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute -right-2 top-[12%] z-10 hidden w-48 lg:block xl:-right-14 xl:w-52"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ProductPanel elevated className="p-3.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Decision Time
              </p>
              <p className="mt-1 text-2xl font-bold text-white">4 min</p>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Budget Match", value: "94%" },
                  { label: "Trip Score", value: "A+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="text-zinc-500">{s.label}</span>
                    <span className="font-medium text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </ProductPanel>
          </motion.div>
        </motion.div>

        {/* Floating confirm card — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="absolute -right-4 bottom-[8%] z-10 hidden w-56 lg:block xl:-right-12"
        >
          <ProductPanel elevated className="p-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">Trip Confirmed</p>
                <p className="text-[10px] text-zinc-500">6 friends agreed</p>
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-white py-2 text-xs font-medium text-black">
              View Plan
              <ChevronRight className="h-3 w-3" />
            </button>
          </ProductPanel>
        </motion.div>

        {/* Floating time indicator — top */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -top-4 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111113] px-4 py-1.5 shadow-xl">
            <Clock className="h-3 w-3 text-zinc-500" />
            <span className="text-[11px] text-zinc-400">
              Consensus reached in{" "}
              <span className="font-medium text-white">4 minutes</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
