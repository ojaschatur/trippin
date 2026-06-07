"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductPanel } from "@/components/ui/product-panel";
import { WhatsAppChat } from "@/components/visuals/whatsapp-chat";

const solutionSteps = [
  "Create Trip",
  "Friends Vote",
  "AI Decides",
  "Trip Confirmed",
];

export function ProblemSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Fermeon-style dramatic headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="problem-heading"
            className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            <span className="text-zinc-500">Your group can&apos;t agree.</span>
            <br />
            <span className="text-white">Every. Single. Time.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-zinc-500">
            Close a chat, lose momentum — plans vanish the second someone says
            &ldquo;maybe later.&rdquo;
          </p>
        </motion.div>

        {/* Side-by-side product panels */}
        <div className="mt-16 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-wider text-zinc-600 lg:text-left">
              Without Trippin
            </p>
            <WhatsAppChat />
            <ProductPanel className="mt-4 p-4 text-center lg:text-left">
              <p className="text-xl font-semibold text-white sm:text-2xl">
                327 Messages Later
              </p>
              <p className="mt-1 text-sm text-zinc-500">No trip planned.</p>
            </ProductPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-wider text-zinc-600 lg:text-left">
              With Trippin
            </p>
            <ProductPanel elevated className="p-6">
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Weekend Escape · Mumbai · 6 friends
              </p>
              <h3 className="mt-3 text-3xl font-bold text-white">Alibaug</h3>
              <p className="mt-1 text-lg font-medium text-emerald-400">
                92% group match
              </p>
              <p className="mt-4 text-sm text-zinc-500">
                ₹4700/person · M2M Ferry · Beachside Villa
              </p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
              <p className="mt-3 text-xs text-zinc-600">
                Decision reached in 4 minutes
              </p>
            </ProductPanel>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {solutionSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300">
                    {step}
                  </span>
                  {i < solutionSteps.length - 1 && (
                    <ArrowRight className="hidden h-3 w-3 text-zinc-700 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
