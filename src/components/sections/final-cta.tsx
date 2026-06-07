"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section
      id="waitlist"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="cta-heading"
            className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            <span className="text-zinc-500">
              The fastest way to plan trips
            </span>
            <br />
            <span className="text-white">with friends.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-[15px] text-zinc-500">
            Join the waitlist. Early access invites rolling out weekly.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
              className="h-11 flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
            />
            <Button size="lg" type="submit" className="shrink-0">
              Get Early Access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
