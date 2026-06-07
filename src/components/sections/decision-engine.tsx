"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Ship,
  Palmtree,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductPanel } from "@/components/ui/product-panel";

const friends = [
  { name: "Ojas", budget: "₹5000" },
  { name: "Rahul", budget: "₹7000" },
  { name: "Karan", budget: "₹3500" },
];

const history = [
  { name: "Weekend Escape", source: "Active", time: "2 min ago", match: "92%" },
  { name: "Goa Trip", source: "Draft", time: "1 hour ago", match: "—" },
  { name: "Hill Station", source: "Draft", time: "Yesterday", match: "—" },
];

export function DecisionEngineSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
      aria-labelledby="decision-engine-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="Decision Engine"
          title={
            <>
              <span className="text-zinc-500">The Always-On Consensus Engine</span>
              <br />
              <span className="text-white">Trippin doesn&apos;t optimize for one person.</span>
            </>
          }
          description="It optimizes for the group."
          large
        />

        {/* Fermeon Spotlight-style product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <ProductPanel elevated className="overflow-hidden">
            <div className="flex min-h-[400px] flex-col lg:flex-row">
              {/* Sidebar — trip history */}
              <div className="w-full border-b border-white/[0.06] lg:w-64 lg:border-b-0 lg:border-r">
                <div className="border-b border-white/[0.06] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Trippin
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 pl-8 pr-3 text-xs text-zinc-600">
                      Search trips...
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-4">
                  <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                    History
                  </p>
                  {history.map((item) => (
                    <div
                      key={item.name}
                      className={`rounded-lg px-2 py-2.5 ${
                        item.match === "92%" ? "bg-white/[0.06]" : ""
                      }`}
                    >
                      <p className="text-xs font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-zinc-600">
                        {item.source} · {item.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail — decision engine in action */}
              <div className="flex-1 p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Weekend Escape
                </p>
                <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Group Preferences
                </h3>

                <div className="mt-5 space-y-2">
                  {friends.map((friend, i) => (
                    <motion.div
                      key={friend.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
                          {friend.name[0]}
                        </div>
                        <span className="text-sm text-zinc-300">
                          {friend.name}
                        </span>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {friend.budget}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { icon: Ship, label: "Transport", value: "Ferry" },
                    { icon: Palmtree, label: "Activities", value: "Beach" },
                  ].map((pref) => (
                    <div
                      key={pref.label}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                    >
                      <pref.icon className="mb-1 h-3.5 w-3.5 text-zinc-600" />
                      <p className="text-[10px] text-zinc-600">{pref.label}</p>
                      <p className="text-sm font-medium text-white">
                        {pref.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <Brain className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500">AI processing...</p>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1.2 }}
                        className="h-full rounded-full bg-white/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          Alibaug
                        </h4>
                        <p className="text-sm font-medium text-emerald-400">
                          92% Match
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="h-3 w-3" />
                      4 min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ProductPanel>
        </motion.div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Our AI evaluates:
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Budget Compatibility",
              "Travel Distance",
              "Activity Preferences",
              "Group Availability",
              "Consensus Confidence",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            and recommends the highest compatibility option.
          </p>
        </div>
      </div>
    </section>
  );
}
