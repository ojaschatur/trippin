"use client";

import { motion } from "framer-motion";
import { Plus, UserPlus, Vote, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeaturePills } from "@/components/ui/feature-pills";

const steps = [
  {
    icon: Plus,
    title: "Create Trip",
    description: "Start with a destination, outing or idea.",
  },
  {
    icon: UserPlus,
    title: "Invite Friends",
    description: "Share a link and collect everyone\'s preferences.",
  },
  {
    icon: Vote,
    title: "Everyone Votes",
    description: "Budget, activities, transport and timing.",
  },
  {
    icon: Sparkles,
    title: "AI Finds The Best Plan",
    description:
      "The consensus engine identifies the option that works best for the entire group.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group text-center lg:text-left"
            >
              <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105 lg:mx-0">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_70%)] blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <step.icon className="h-5 w-5 text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.18)]" />
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
