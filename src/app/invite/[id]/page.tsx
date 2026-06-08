"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import { StepContainer } from "@/components/create-flow/step-container";
import { PillSelector } from "@/components/create-flow/pill-selector";
import { createClient } from "@/utils/supabase/client";

// --- Types ---
type GuestData = {
  name: string;
  email: string;
  maxBudget: string;
  vibes: string[];
  availability: string;
};

// --- Main Component ---
export default function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const tripId = unwrappedParams.id;
  const supabase = createClient();

  const [step, setStep] = useState(0); // 0 = Landing
  const [tripInfo, setTripInfo] = useState<any>(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<GuestData>({
    name: "",
    email: "",
    maxBudget: "",
    vibes: [],
    availability: "",
  });

  // Fetch basic trip info on mount
  useEffect(() => {
    const fetchTrip = async () => {
      const { data: trip, error } = await supabase
        .from("trips")
        .select("type, origin, target_size, budget, vibes, dates")
        .eq("id", tripId)
        .single();

      if (error || !trip) {
        setError("Trip not found or link is invalid.");
      } else {
        setTripInfo(trip);
      }
      setLoadingTrip(false);
    };

    fetchTrip();
  }, [tripId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (key: keyof GuestData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  const toggleVibe = (vibeId: string) => {
    setData((prev) => {
      const current = prev.vibes;
      if (current.includes(vibeId)) {
        return { ...prev, vibes: current.filter((v) => v !== vibeId) };
      } else {
        return { ...prev, vibes: [...current, vibeId] };
      }
    });
  };

  const submitPreferences = async () => {
    setSubmitting(true);
    setStep(5); // Loading screen

    try {
      const response = await fetch(`/api/trips/${tripId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit preferences");
      }

      // Redirect to the main dashboard
      setTimeout(() => {
        router.push(`/dashboard/trips/${tripId}`);
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStep(4); // Go back to last question
      setSubmitting(false);
    }
  };

  if (loadingTrip) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (error && !tripInfo) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
        <p className="text-zinc-400">{error}</p>
      </div>
    );
  }

  // Derive options based on the trip's overall constraints
  const tripVibes = tripInfo?.vibes || ["Relaxed", "Party", "Nature", "Adventure", "Food", "Culture"];
  const VIBES_OPTIONS = tripVibes.map((v: string) => ({ id: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));
  
  // Create some budget options based on a baseline
  const BUDGET_OPTIONS = [
    "Under ₹2000",
    "₹2000 - ₹5000",
    "₹5000 - ₹10000",
    "No strict limit"
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-fuchsia-500/5 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">

        {/* Step 0: Landing / Welcome */}
        {step === 0 && (
          <StepContainer stepKey="step0">
            <div className="text-center space-y-6">
               <div className="mx-auto h-20 w-20 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-2xl mb-8">
                  <span className="font-bold text-white text-xl tracking-tight">Tr</span>
               </div>
               
               <h1 className="text-3xl sm:text-4xl font-bold text-white">
                 You've been invited.
               </h1>
               
               <div className="max-w-sm mx-auto bg-[#111113] border border-white/[0.08] rounded-2xl p-5 text-left mt-8">
                  <div className="text-sm font-semibold text-white mb-4">
                    {tripInfo.type.charAt(0).toUpperCase() + tripInfo.type.slice(1).replace('_', ' ')}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <MapPin className="h-4 w-4" /> 
                      <span>{tripInfo.origin || "Location TBD"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <Users className="h-4 w-4" /> 
                      <span>{tripInfo.target_size} people</span>
                    </div>
                  </div>
               </div>

               <div className="pt-8">
                 <Button 
                    onClick={() => setStep(1)}
                    className="bg-white text-black hover:bg-zinc-200 h-12 px-10 rounded-full font-medium text-sm gap-2"
                 >
                    Join & Vote <ArrowRight className="h-4 w-4" />
                 </Button>
               </div>
            </div>
          </StepContainer>
        )}

        {/* Step 1: Identity */}
        {step === 1 && (
          <StepContainer stepKey="step1" title="Who are you?">
            <div className="max-w-sm mx-auto w-full mt-8 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full bg-[#111113] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && data.name.trim()) setStep(2);
                }}
                className="w-full bg-[#111113] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <Button 
                onClick={() => setStep(2)}
                disabled={!data.name.trim()}
                className="w-full bg-white text-black hover:bg-zinc-200 h-11 rounded-xl font-medium text-sm mt-4"
              >
                Continue
              </Button>
            </div>
          </StepContainer>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <StepContainer stepKey="step2" title="What's your maximum budget?">
            <div className="flex flex-col items-center gap-3 mt-8 max-w-sm mx-auto">
              {BUDGET_OPTIONS.map((budget, i) => (
                <div key={budget} className="w-full">
                  <PillSelector
                    label={budget}
                    index={i}
                    selected={data.maxBudget === budget}
                    onClick={() => handleSelect("maxBudget", budget)}
                  />
                </div>
              ))}
            </div>
          </StepContainer>
        )}

        {/* Step 3: Vibes */}
        {step === 3 && (
          <StepContainer stepKey="step3" title="What kind of vibe do you want?">
            <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-lg mx-auto">
              {VIBES_OPTIONS.map((v: { id: string, label: string }, i: number) => (
                <PillSelector
                  key={v.id}
                  label={v.label}
                  index={i}
                  selected={data.vibes.includes(v.id)}
                  onClick={() => toggleVibe(v.id)}
                />
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: data.vibes.length > 0 ? 1 : 0.5, y: 0 }}
              className="mt-10 flex justify-center"
            >
              <Button 
                onClick={() => setStep(4)}
                disabled={data.vibes.length === 0}
                className="bg-white text-black hover:bg-zinc-200 h-11 px-8 rounded-full font-medium text-sm"
              >
                Continue <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </StepContainer>
        )}

        {/* Step 4: Availability */}
        {step === 4 && (
          <StepContainer stepKey="step4" title="Any constraints on dates?">
             <div className="max-w-md mx-auto w-full mt-8 space-y-6">
                <div className="bg-[#111113] border border-white/[0.08] rounded-2xl p-4">
                  <p className="text-xs text-zinc-500 mb-2">The group is planning for:</p>
                  <p className="text-sm font-medium text-white">{tripInfo.dates}</p>
                </div>

                <input
                  type="text"
                  placeholder="e.g. Can't do Friday night, Only after 5 PM"
                  value={data.availability}
                  onChange={(e) => setData({ ...data, availability: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitPreferences();
                  }}
                  className="w-full bg-[#111113] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                />

                <div className="flex gap-3 pt-4">
                   <Button 
                      onClick={() => {
                        setData({ ...data, availability: "I'm flexible" });
                        submitPreferences();
                      }}
                      variant="outline"
                      className="flex-1 border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:text-white"
                   >
                     I'm flexible
                   </Button>
                   <Button 
                      onClick={submitPreferences}
                      className="flex-1 bg-white text-black hover:bg-zinc-200"
                   >
                     Submit Votes
                   </Button>
                </div>
             </div>
          </StepContainer>
        )}

        {/* Step 5: Loading / Success */}
        {step === 5 && (
          <StepContainer stepKey="step5">
            <div className="flex flex-col items-center justify-center space-y-6 min-h-[300px]">
              <div className="relative">
                <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-white">Saving your preferences...</h3>
              <p className="text-sm text-zinc-400">Taking you to the Consensus Engine</p>
            </div>
          </StepContainer>
        )}

      </div>
    </div>
  );
}
