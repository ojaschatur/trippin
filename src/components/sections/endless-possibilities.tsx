"use client";

import { motion } from "framer-motion";
import { Briefcase, Cake, Film, Palmtree, PlaneTakeoff, UtensilsCrossed } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductPanel } from "@/components/ui/product-panel";

const possibilities = [
  {
    icon: UtensilsCrossed,
    title: "Dinner Plans",
    description: "Find the restaurant everyone agrees on.",
  },
  {
    icon: Film,
    title: "Movie Night",
    description: "Choose the perfect movie for the group.",
  },
  {
    icon: Cake,
    title: "Birthday Celebrations",
    description: "Find venues and activities everyone enjoys.",
  },
  {
    icon: Briefcase,
    title: "Team Outings",
    description: "Plan stress-free corporate events.",
  },
  {
    icon: PlaneTakeoff,
    title: "Group Travel",
    description: "Coordinate budgets, preferences and logistics.",
  },
  {
    icon: Palmtree,
    title: "Weekend Escapes",
    description: "Plan trips without endless discussions.",
  },
];

export function EndlessPossibilitiesSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
      aria-labelledby="possibilities-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="Future Vision"
          title={
            <>
              <span className="text-white">One Decision Engine.</span>
              <br />
              <span className="text-zinc-500">Endless Possibilities.</span>
            </>
          }
          description="Trips are only the beginning. Trippin is built to help groups decide faster anywhere they need consensus."
          large
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {possibilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <ProductPanel
                hover
                className="group h-full overflow-hidden p-5 transition-colors hover:border-transparent"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_70%)] blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    <item.icon className="h-5 w-5 text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.18)]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ProductPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
