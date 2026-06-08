"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, MessageCircle, Hash, ArrowRight, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { StepContainer } from "@/components/create-flow/step-container";
import { OptionCard } from "@/components/create-flow/option-card";
import { PillSelector } from "@/components/create-flow/pill-selector";

// --- Types ---
type TripData = {
  type: string;
  audience: string;
  origin: string;
  groupSize: string;
  budget: string;
  vibes: string[];
  dates: string;
};

// --- Mock Data ---
const EVENT_TYPES = [
  { id: "weekend", label: "Weekend Trip", icon: "🏖" },
  { id: "dinner", label: "Dinner / Restaurant", icon: "🍽" },
  { id: "movie", label: "Movie Night", icon: "🎬" },
  { id: "birthday", label: "Birthday Celebration", icon: "🎉" },
  { id: "team", label: "Team Outing", icon: "🏢" },
  { id: "vacation", label: "Vacation", icon: "✈️" },
  { id: "surprise", label: "Surprise Me", icon: "🎲" },
];

const AUDIENCES = [
  { id: "friends", label: "Friends", emoji: "👥" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "coworkers", label: "Coworkers", emoji: "🏢" },
  { id: "mixed", label: "Mixed Group", emoji: "🌎" },
];

const ORIGIN_SUGGESTIONS = ["Mumbai", "Pune", "Bangalore", "Delhi"];

const SIZES = ["2–4", "5–8", "9–15", "15+"];

const BUDGETS = ["₹1000–3000", "₹3000–5000", "₹5000–10000", "₹10000+"];

const VIBES = [
  { id: "relaxed", label: "Relaxed", emoji: "🏖" },
  { id: "party", label: "Party", emoji: "🎉" },
  { id: "nature", label: "Nature", emoji: "🌲" },
  { id: "adventure", label: "Adventure", emoji: "🥾" },
  { id: "food", label: "Food", emoji: "🍽" },
  { id: "culture", label: "Culture", emoji: "🏛" },
  { id: "mix", label: "Mix Of Everything", emoji: "✨" },
];

const DATE_PRESETS = ["This Weekend", "Next Weekend", "This Month", "Choose Dates"];

// --- Main Component ---
export default function CreateTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<TripData>({
    type: "",
    audience: "",
    origin: "",
    groupSize: "",
    budget: "",
    vibes: [],
    dates: "",
  });

  const [customOrigin, setCustomOrigin] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [createdTripId, setCreatedTripId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle auto-advance for single select
  const handleSelect = (key: keyof TripData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  // Handle multi-select for Vibes
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

  // Copy invite link to clipboard
  const copyInviteLink = async () => {
    const link = `${window.location.origin}/invite/${createdTripId}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const link = `${window.location.origin}/invite/${createdTripId}`;
    const text = encodeURIComponent(`Join my trip on Trippin! Vote on where we should go: ${link}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Share via Discord (copies a formatted message)
  const shareDiscord = async () => {
    const link = `${window.location.origin}/invite/${createdTripId}`;
    const text = `Join my trip on Trippin!\nVote on where we should go: ${link}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  };

  // Create trip via API
  useEffect(() => {
    let isCancelled = false;

    if (step === 8) {
      const createTrip = async () => {
        try {
          setTimeout(() => { if (!isCancelled) setLoadingStep(1) }, 500);
          setTimeout(() => { if (!isCancelled) setLoadingStep(2) }, 1200);
          setTimeout(() => { if (!isCancelled) setLoadingStep(3) }, 2000);
          setTimeout(() => { if (!isCancelled) setLoadingStep(4) }, 2800);

          const response = await fetch("/api/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error("Failed to create trip");

          const result = await response.json();
          
          if (!isCancelled) {
            setCreatedTripId(result.tripId);
            setTimeout(() => {
              if (!isCancelled) setStep(9);
            }, 3500);
          }
        } catch (error) {
          console.error("Error creating trip:", error);
        }
      };

      createTrip();
    }

    return () => { isCancelled = true; };
  }, [step, data]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Step 1: Event Type */}
        {step === 1 && (
          <StepContainer 
            stepKey="step1" 
            title="Let's plan something." 
            subtitle="Tell me what you're organizing and I'll coordinate the rest."
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {EVENT_TYPES.map((t, i) => (
                <OptionCard
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  index={i}
                  selected={data.type === t.id}
                  onClick={() => handleSelect("type", t.id)}
                />
              ))}
            </div>
          </StepContainer>
        )}

        {/* Step 2: Audience */}
        {step === 2 && (
          <StepContainer stepKey="step2" title="Who is this trip for?">
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {AUDIENCES.map((a, i) => (
                <PillSelector
                  key={a.id}
                  label={a.label}
                  emoji={a.emoji}
                  index={i}
                  selected={data.audience === a.id}
                  onClick={() => handleSelect("audience", a.id)}
                />
              ))}
            </div>
          </StepContainer>
        )}

        {/* Step 3: Origin */}
        {step === 3 && (
          <StepContainer stepKey="step3" title="Where are you starting from?">
            <div className="max-w-md mx-auto w-full mt-8 space-y-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Type any city..."
                  value={customOrigin}
                  onChange={(e) => setCustomOrigin(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customOrigin.trim()) {
                      handleSelect("origin", customOrigin);
                    }
                  }}
                  className="w-full bg-[#111113] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white text-lg focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
                />
              </div>
              
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Popular Cities</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {ORIGIN_SUGGESTIONS.map((city, i) => (
                    <PillSelector
                      key={city}
                      label={city}
                      index={i}
                      selected={data.origin === city}
                      onClick={() => handleSelect("origin", city)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        )}

        {/* Step 4: Group Size */}
        {step === 4 && (
          <StepContainer stepKey="step4" title="How many people are joining?">
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {SIZES.map((size, i) => (
                <PillSelector
                  key={size}
                  label={size}
                  emoji="👥"
                  index={i}
                  selected={data.groupSize === size}
                  onClick={() => handleSelect("groupSize", size)}
                />
              ))}
            </div>
          </StepContainer>
        )}

        {/* Step 5: Budget */}
        {step === 5 && (
          <StepContainer stepKey="step5" title="What's the budget per person?">
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {BUDGETS.map((budget, i) => (
                <PillSelector
                  key={budget}
                  label={budget}
                  index={i}
                  selected={data.budget === budget}
                  onClick={() => handleSelect("budget", budget)}
                />
              ))}
            </div>
          </StepContainer>
        )}

        {/* Step 6: Vibe (Multi-select) */}
        {step === 6 && (
          <StepContainer stepKey="step6" title="What's the vibe?">
            <div className="flex flex-wrap justify-center gap-4 mt-8 max-w-2xl mx-auto">
              {VIBES.map((v, i) => (
                <PillSelector
                  key={v.id}
                  label={v.label}
                  emoji={v.emoji}
                  index={i}
                  selected={data.vibes.includes(v.id)}
                  onClick={() => toggleVibe(v.id)}
                />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: data.vibes.length > 0 ? 1 : 0.5, y: 0 }}
              className="mt-12 flex justify-center"
            >
              <Button 
                onClick={() => setStep(7)}
                disabled={data.vibes.length === 0}
                className="bg-white text-black hover:bg-zinc-200 h-12 px-8 rounded-full font-medium text-sm flex items-center gap-2"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </StepContainer>
        )}

        {/* Step 7: Dates */}
        {step === 7 && (
          <StepContainer stepKey="step7" title="When are you planning to go?">
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {DATE_PRESETS.map((date, i) => (
                <PillSelector
                  key={date}
                  label={date}
                  index={i}
                  selected={data.dates === date || (date === "Choose Dates" && showDatePicker)}
                  onClick={() => {
                    if (date === "Choose Dates") {
                      setShowDatePicker(true);
                    } else {
                      setShowDatePicker(false);
                      setData((prev) => ({ ...prev, dates: date }));
                      setTimeout(() => setStep(8), 300);
                    }
                  }}
                />
              ))}
            </div>
            
            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-w-sm mx-auto space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Start Date</label>
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-[#111113] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">End Date</label>
                        <input 
                          type="date"
                          value={endDate}
                          min={startDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-[#111113] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        if (startDate && endDate) {
                          const formatted = `${startDate} to ${endDate}`;
                          setData((prev) => ({ ...prev, dates: formatted }));
                          setStep(8);
                        }
                      }}
                      disabled={!startDate || !endDate}
                      className="w-full bg-white text-black hover:bg-zinc-200 h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StepContainer>
        )}

        {/* Step 8: AI Loading State */}
        {step === 8 && (
          <StepContainer stepKey="step8">
            <div className="flex flex-col items-center justify-center space-y-8 min-h-[300px]">
              <div className="relative">
                <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-medium text-white">Analyzing trip requirements...</h3>
              
              <div className="space-y-3 text-left w-48">
                {["Location", "Budget", "Group Size", "Preferences"].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: loadingStep > i ? 1 : 0, x: loadingStep > i ? 0 : -10 }}
                    className="flex items-center gap-3 text-sm text-zinc-400"
                  >
                    <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    {item}
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingStep >= 4 ? 1 : 0 }}
                className="text-sm text-emerald-400 font-medium pt-4"
              >
                Building your trip...
              </motion.p>
            </div>
          </StepContainer>
        )}

        {/* Step 9: Success & Invite */}
        {step === 9 && (
          <StepContainer stepKey="step9" title="Your trip is ready.">
            <div className="max-w-md mx-auto w-full space-y-6 mt-6">
              
              {/* Summary Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#111113] p-6 text-left">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                  {EVENT_TYPES.find(t => t.id === data.type)?.label || "Trip"}
                  <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Collecting Preferences
                  </span>
                </h4>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1">Origin</p>
                    <p className="text-zinc-300 font-medium">{data.origin || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1">People</p>
                    <p className="text-zinc-300 font-medium">{data.groupSize || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1">Budget</p>
                    <p className="text-zinc-300 font-medium">{data.budget || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1">Vibe</p>
                    <p className="text-zinc-300 font-medium capitalize">{data.vibes.join(", ") || "Not specified"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1">Dates</p>
                    <p className="text-zinc-300 font-medium">{data.dates || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {/* Coordinator Message */}
              <div className="flex gap-3 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-emerald-400">Tr</span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <span className="text-[10px] font-medium text-zinc-500">Trippin Coordinator</span>
                  <div className="text-sm text-zinc-300 leading-relaxed bg-white/[0.04] border border-white/[0.06] p-4 rounded-2xl rounded-tl-none">
                    I've created your trip. Next I'll collect everyone's preferences and find the option with the highest compatibility score. 
                    <br/><br/>
                    Invite your friends using the link below. Once enough people vote, I'll generate the best recommendation automatically.
                  </div>
                </div>
              </div>

              {/* Invite Links */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-xl border border-white/[0.08] bg-black">
                  <div className="text-sm text-zinc-400 font-mono truncate flex-1">
                    {typeof window !== "undefined" ? `${window.location.origin}/invite/${createdTripId}` : `trippin.app/invite/${createdTripId}`}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 hover:bg-white/10 text-white gap-2 shrink-0"
                    onClick={copyInviteLink}
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white h-10 gap-2 font-medium"
                    onClick={shareWhatsApp}
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                  <Button 
                    className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white h-10 gap-2 font-medium"
                    onClick={shareDiscord}
                  >
                    <Hash className="h-4 w-4" /> Discord
                  </Button>
                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  onClick={() => router.push(`/dashboard/trips/${createdTripId}`)}
                  variant="ghost" 
                  className="w-full text-zinc-400 hover:text-white"
                >
                  Go to Trip Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

            </div>
          </StepContainer>
        )}

      </div>
    </div>
  );
}
