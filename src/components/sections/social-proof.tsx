"use client";

import { motion } from "framer-motion";
import { ProductPanel } from "@/components/ui/product-panel";
import { Users, Vote, Wallet, Sparkles, PlaneTakeoff, Brain } from "lucide-react";

const cards = [
  {
    title: "Friend Groups",
    icon: Users,
    description: "Built around real group planning frustrations.",
  },
  {
    title: "Shared Decisions",
    icon: Vote,
    description: "Everyone gets a voice before a decision is made.",
  },
  {
    title: "Budget Aware",
    icon: Wallet,
    description: "Recommendations respect everyone's budget.",
  },
  {
    title: "Fast Consensus",
    icon: Sparkles,
    description: "Reach agreement in minutes, not hours.",
  },
  {
    title: "Weekend Ready",
    icon: PlaneTakeoff,
    description: "Perfect for outings, trips and spontaneous plans.",
  },
  {
    title: "AI Powered",
    icon: Brain,
    description: "AI evaluates preferences and finds the best match.",
  },
];

export function SocialProofSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.h2
          id="social-proof-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
        >
          Built For Real Friend Groups
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-zinc-500 sm:text-base">
          Designed to remove the friction that makes group planning feel harder
          than it should.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="h-full"
            >
              <ProductPanel
                hover
                className="group h-full overflow-hidden p-5 transition-colors hover:border-transparent"
              >
                <div className="relative">
                  <div className="absolute -left-2 top-[-6px] h-14 w-14 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.28),transparent_70%)] blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105">
                    <card.icon className="h-6 w-6 text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                </div>
              </ProductPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
