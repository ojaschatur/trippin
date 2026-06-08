"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepContainerProps {
  stepKey: string | number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function StepContainer({ stepKey, title, subtitle, children, className }: StepContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn("w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center", className)}
      >
        {(title || subtitle) && (
          <div className="mb-10 space-y-3">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base text-zinc-400 max-w-md mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        <div className="w-full">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
