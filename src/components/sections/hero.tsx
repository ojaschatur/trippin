"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturePills } from "@/components/ui/feature-pills";
import { ProductCanvas } from "@/components/visuals/product-canvas";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section
      id="product"
      className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Centered editorial headline — Fermeon style */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[13px] font-medium tracking-wide text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
          >
            The AI that gets your group to agree
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            <span className="headline-muted">Plan trips in minutes.</span>
            <br />
            <span className="headline-accent">Not 327 messages.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] sm:text-base"
          >
            Your group already knows what it wants.
            <br />
            Trippin finds the option everyone agrees on.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <a href="#waitlist">
                Get Early Access
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#how-it-works">Watch Demo</a>
            </Button>
          </motion.div>
        </div>

        {/* Product canvas — ClawIn multi-panel style */}
        <div className="relative mt-14 sm:mt-18 lg:mt-20">
          <ProductCanvas />
        </div>

        <FeaturePills
          className="mt-8 sm:mt-10"
          items={[
            "Group Voting",
            "AI Consensus",
            "Budget Matching",
            "4-Min Decisions",
          ]}
        />
      </div>
    </section>
  );
}
