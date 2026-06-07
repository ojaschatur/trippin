"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Waitlist", href: "#waitlist" },
];

export function Navbar({ simple }: { simple?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled && "border-b border-white/[0.06] bg-[#0a0a0a]/40 backdrop-blur-md"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 py-5 transition-all duration-300 sm:px-8",
          scrolled && "py-4"
        )}
        aria-label="Main navigation"
      >
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-white">
          Trippin
        </Link>

        {simple ? (
          <Button variant="ghost" size="sm" asChild className="text-zinc-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        ) : (
          <>
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-zinc-300/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <Button size="sm" asChild>
                <a href="#waitlist">Join Waitlist</a>
              </Button>
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </>
        )}
      </nav>

      {!simple && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-b border-white/[0.06] bg-[#0a0a0a] px-5 py-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="mt-3 w-full" size="sm" asChild>
                  <a href="#waitlist" onClick={() => setMobileOpen(false)}>
                    Join Waitlist
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
