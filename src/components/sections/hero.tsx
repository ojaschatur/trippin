"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, Wallet } from "lucide-react";
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
      className="relative overflow-hidden pb-8 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        
        {/* Full-screen container for text and button */}
        <div className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12">
          
          {/* Floating Element 1 - Top Left */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden lg:flex absolute left-0 top-[25%] -rotate-6 flex-col items-start rounded-xl border border-white/[0.08] bg-black/40 p-4 shadow-2xl backdrop-blur-md"
          >
            <div className="text-xs font-medium text-emerald-400 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> Destination Matched
            </div>
            <div className="text-lg font-bold text-white">Alibaug Villa</div>
            <div className="text-[10px] text-zinc-400 mt-1">100% Group Consensus</div>
          </motion.div>

          {/* Floating Element 2 - Bottom Right */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden lg:flex absolute right-0 bottom-[30%] rotate-3 flex-col rounded-xl border border-white/[0.08] bg-black/40 p-4 shadow-2xl backdrop-blur-md w-48"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-300">Dates Locked</div>
                <div className="text-sm font-bold text-white">Aug 15 - 18</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 w-full" />
            </div>
            <div className="text-[10px] text-zinc-500 mt-1 text-right">6/6 Available</div>
          </motion.div>

          {/* Floating Element 3 - Top Right */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden lg:flex absolute right-[10%] top-[20%] rotate-6 flex-col rounded-xl border border-white/[0.08] bg-black/40 p-3 shadow-2xl backdrop-blur-md"
          >
             <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5"><Wallet className="h-3 w-3" /> Budget Split</div>
             <div className="text-lg font-bold text-emerald-400">₹4,500<span className="text-xs text-zinc-500 font-normal">/person</span></div>
          </motion.div>

          {/* Centered editorial headline — Fermeon style */}
          <div className="mx-auto max-w-5xl text-center flex flex-col items-center z-10">
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
            className="mt-5 font-semibold leading-[1.15] tracking-[-0.03em] w-full"
          >
            <span className="text-xl sm:text-3xl lg:text-4xl text-zinc-400 font-medium sm:whitespace-nowrap">Your group already knows what it wants.</span>
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl text-white mt-2 block sm:whitespace-nowrap">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Trippin</span> finds the option everyone agrees on.
            </span>
          </motion.h1>

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
          </motion.div>
        </div>
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
