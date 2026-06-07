import { Wallet, CheckCircle2, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function CostBreakdown() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Cost Breakdown
        </p>
        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
          <CheckCircle2 className="h-3 w-3" /> Within Budget
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { emoji: "🏠", label: "Stay", cost: "₹2,500" },
          { emoji: "🚗", label: "Transport", cost: "₹1,200" },
          { emoji: "🍔", label: "Food", cost: "₹600" },
          { emoji: "🏄‍♂️", label: "Activities", cost: "₹200" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between border-b border-white/[0.04] pb-2.5 last:border-0 last:pb-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-xs">
                {item.emoji}
              </div>
              <span className="text-xs text-zinc-300">{item.label}</span>
            </div>
            <span className="text-[11px] font-medium text-white">{item.cost}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Total Per Person</span>
        <span className="text-xl font-bold text-white">₹4,500</span>
      </div>
    </div>
  );
}

export function GroupPreferenceInsights() {
  const insights = [
    { label: "Budget Compatibility", value: 95 },
    { label: "Travel Compatibility", value: 88 },
    { label: "Activity Compatibility", value: 91 },
    { label: "Food Compatibility", value: 89 },
    { label: "Stay Preference", value: 93 },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-4">
        Group Insights
      </p>

      <div className="space-y-4">
        {insights.map((item, i) => (
          <div key={i} className="space-y-1.5">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">{item.label}</span>
               <span className="font-medium text-white">{item.value}%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${item.value}%` }}></div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] text-zinc-500 leading-relaxed">
        The group is highly aligned on Budget and Stay preferences. Minor compromises were made on Travel Time to secure a beachfront property.
      </div>
    </div>
  );
}

export function GroupMoodSystem() {
  const moods = [
    { emoji: "🏖", label: "Relaxed Beach", active: true },
    { emoji: "🎉", label: "Party", active: false },
    { emoji: "🌲", label: "Nature", active: false },
    { emoji: "🥾", label: "Adventure", active: false },
    { emoji: "🍽", label: "Food Trip", active: false },
    { emoji: "🍻", label: "Nightlife", active: false },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-3">
        Group Vibe
      </p>

      <div className="flex flex-wrap gap-2">
        {moods.map((mood, i) => (
          <button
            key={i}
            className={cn(
              "px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border flex items-center gap-1.5",
              mood.active 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            )}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
      
      <p className="mt-3 text-[11px] text-zinc-600 leading-relaxed">
        AI is filtering for relaxation, beachfront, and spa availability.
      </p>
    </div>
  );
}
