"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductPanel } from "@/components/ui/product-panel";

const possibilities = [
  {
    icon: "🍽",
    title: "Dinner Plans",
    description: "Find the restaurant everyone agrees on.",
  },
  {
    icon: "🎬",
    title: "Movie Night",
    description: "Choose the perfect movie for the group.",
  },
  {
    icon: "🎉",
    title: "Birthday Celebrations",
    description: "Find venues and activities everyone enjoys.",
  },
  {
    icon: "🏢",
    title: "Team Outings",
    description: "Plan stress-free corporate events.",
  },
  {
    icon: "✈️",
    title: "Group Travel",
    description: "Coordinate budgets, preferences and logistics.",
  },
  {
    icon: "🏖",
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
            >
              <ProductPanel
                hover
                className="h-full p-5 transition-colors hover:border-white/[0.12]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-lg">
                    {item.icon}
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
