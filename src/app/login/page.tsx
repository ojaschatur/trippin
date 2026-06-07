"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginWithOtp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-11" disabled={pending}>
      {pending ? "Sending Link..." : "Send Magic Link"}
      {!pending && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginWithOtp, null);

  return (
    <>
      <Navbar simple />
      <main className="flex flex-1 flex-col items-center justify-center relative overflow-hidden py-32 px-4">
        <div className="relative w-full max-w-md z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome back</h1>
            <p className="text-zinc-400 text-sm">Sign in to your account or create a new one instantly.</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 shadow-2xl">
            {state?.success ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
                <p className="text-sm text-zinc-400">
                  We sent a magic link to your email address. Click it to sign in.
                </p>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-11 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
                  />
                </div>

                {state?.error && (
                  <p className="text-sm text-red-400">{state.error}</p>
                )}

                <SubmitButton />
              </form>
            )}
          </div>
          
          <p className="mt-6 text-center text-xs text-zinc-500">
            By continuing, you agree to Trippin's Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
