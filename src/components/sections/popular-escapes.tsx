"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductPanel } from "@/components/ui/product-panel";

const escapes = [
  {
    name: "Alibaug",
    tagline: "Beach & ferry escape",
    match: "92%",
    gradient:
      "linear-gradient(160deg, #0c2d48 0%, #1a3a5f 40%, #0a0a0a 100%)",
  },
  {
    name: "Lonavala",
    tagline: "Hill station retreat",
    match: "88%",
    gradient:
      "linear-gradient(160deg, #0d3320 0%, #1a3d2a 40%, #0a0a0a 100%)",
  },
  {
    name: "Matheran",
    tagline: "Toy train adventure",
    match: "85%",
    gradient:
      "linear-gradient(160deg, #2d1b4e 0%, #3d2a6b 40%, #0a0a0a 100%)",
  },
];

export function PopularEscapesSection() {
  return (
    <section
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
      aria-labelledby="escapes-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="Popular Escapes"
          title="Where groups are planning next"
          description="Weekend getaways from Mumbai — but Trippin works for any group decision."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {escapes.map((escape, i) => (
            <motion.div
              key={escape.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <ProductPanel
                hover
                className="group overflow-hidden transition-colors hover:border-white/[0.12]"
              >
                <div
                  className="relative h-40 overflow-hidden"
                  style={{ background: escape.gradient }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-emerald-400 backdrop-blur-sm">
                      {escape.match} match
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-zinc-600" />
                    <h3 className="text-[15px] font-semibold text-white">
                      {escape.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-[13px] text-zinc-500">
                    {escape.tagline}
                  </p>
                </div>
              </ProductPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
