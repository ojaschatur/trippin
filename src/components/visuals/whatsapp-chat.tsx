"use client";

import { motion } from "framer-motion";
import { ProductPanel } from "@/components/ui/product-panel";

const messages = [
  { text: "Where should we go?", side: "left" as const, delay: 0 },
  { text: "Alibaug?", side: "right" as const, delay: 0.3 },
  { text: "Too expensive.", side: "left" as const, delay: 0.6 },
  { text: "Lonavala?", side: "right" as const, delay: 0.9 },
  { text: "Already went.", side: "left" as const, delay: 1.2 },
  { text: "What's the budget?", side: "right" as const, delay: 1.5 },
  { text: "Can everyone come?", side: "left" as const, delay: 1.8 },
];

export function WhatsAppChat() {
  return (
    <ProductPanel className="overflow-hidden">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <p className="text-sm font-medium text-white">Weekend Trip</p>
        <p className="text-[11px] text-zinc-600">Ojas, Rahul, Karan, +3</p>
      </div>

      <div className="space-y-2.5 p-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.text}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: msg.delay,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-[13px] ${
                msg.side === "right"
                  ? "bg-white/[0.08] text-zinc-300"
                  : "bg-white/[0.04] text-zinc-400"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </ProductPanel>
  );
}
