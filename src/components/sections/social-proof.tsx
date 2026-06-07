"use client";

import { motion } from "framer-motion";
import { ProductPanel } from "@/components/ui/product-panel";

const statements = [
  "Designed around real planning frustrations",
  "Launching soon",
  "Join the first 100 testers",
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {statements.map((statement, i) => (
            <motion.div
              key={statement}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="h-full"
            >
              <ProductPanel className="h-full p-5 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {i === 0
                    ? "Built For Real Friend Groups"
                    : i === 1
                      ? "Launching Soon"
                      : "Join The First 100 Testers"}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                  {statement}
                </p>
              </ProductPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
