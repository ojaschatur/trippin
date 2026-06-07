"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitWaitlist } from "@/actions/waitlist";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" className="shrink-0" disabled={pending}>
      {pending ? "Joining..." : "Get Early Access"}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
}

export function FinalCTASection() {
  const [state, formAction] = useActionState(submitWaitlist, null);

  return (
    <section
      id="waitlist"
      className="relative border-t border-white/[0.06] py-20 sm:py-24"
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
            <span className="text-white">Stop planning.</span>
            <br />
            <span className="text-zinc-500">Start going.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-zinc-500">
            Your group already knows what it wants.
            <br />
            Trippin finds the option everyone agrees on.
          </p>

          <form
            action={formAction}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row relative"
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="h-11 flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
                />
                <SubmitButton />
              </div>
              
              {/* Status Messages */}
              {state?.error && (
                <p className="text-sm text-red-400 text-left px-2">{state.error}</p>
              )}
              {state?.success && (
                <p className="text-sm text-emerald-400 text-left px-2">{state.message}</p>
              )}
            </div>
          </form>

          <p className="mt-4 text-[12px] text-zinc-600">
            No spam. No credit card. Just early access.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] text-zinc-400">
            {[
              { icon: ShieldCheck, label: "No Spam" },
              { icon: Users, label: "Early Access Only" },
              { icon: Zap, label: "Built For Groups" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5"
              >
                <item.icon className="h-3.5 w-3.5 text-zinc-300" />
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
