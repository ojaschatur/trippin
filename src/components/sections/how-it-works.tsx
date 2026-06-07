"use client";

import { motion } from "framer-motion";
import { Plus, UserPlus, Vote, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeaturePills } from "@/components/ui/feature-pills";

const steps = [
  {
    icon: Plus,
    title: "Create Trip",
    description:
      "Set destination range, budget, dates, and group size. Takes 60 seconds.",
  },
  {
    icon: UserPlus,
    title: "Invite Friends",
    description:
      "Share a link. Everyone submits preferences — no app download needed.",
  },
  {
    icon: Vote,
    title: "Everyone Votes",
    description:
      "Friends rank options and set deal-breakers. Trippin captures what matters.",
  },
  {
    icon: Sparkles,
    title: "AI Finds Best Plan",
    description:
      "The consensus engine weighs every preference and delivers a plan everyone loves.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="How It Works"
          title={
            <>
              <span className="text-zinc-500">From chaos to consensus</span>
              <br />
              <span className="text-white">in four steps.</span>
            </>
          }
          large
        />

        {/* Fermeon-style feature trio grid — expanded to 4 */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] lg:mx-0">
                <step.icon className="h-4 w-4 text-zinc-400" />
              </div>
              <h3 className="text-[15px] font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <FeaturePills
          className="mt-14"
          items={[
            "No group admin",
            "No decision fatigue",
            "Works in the browser",
          ]}
        />
      </div>
    </section>
  );
}
