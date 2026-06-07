"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 50, suffix: "+", label: "Beta Testers" },
  { value: 500, suffix: "+", label: "Trips Planned" },
  { value: 92, suffix: "%", label: "Decision Accuracy" },
];

export function SocialProofSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
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
          Built for real groups, tested by real friends
        </motion.h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[13px] text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
