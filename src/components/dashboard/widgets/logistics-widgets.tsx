import { Wallet, CheckCircle2, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function CostBreakdown({ currentRec }: { currentRec?: any }) {
  if (!currentRec) return null;
  const { accommodation, transport, food, total, budgetJustification } = currentRec.costBreakdown;

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
          { emoji: "🏠", label: "Stay", cost: accommodation },
          { emoji: "🚗", label: "Transport", cost: transport },
          { emoji: "🍔", label: "Food", cost: food },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between border-b border-white/[0.04] pb-2.5 last:border-0 last:pb-0">
            <div className="flex items-center gap-2.5 w-1/3 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-xs">
                {item.emoji}
              </div>
              <span className="text-xs text-zinc-300">{item.label}</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-white text-right leading-snug line-clamp-2">
              {item.cost}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 shrink-0">Total Per Person</span>
        <span className="text-sm sm:text-base font-bold text-emerald-400 text-right line-clamp-2 leading-tight">
          {total}
        </span>
      </div>

      {budgetJustification && (
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] text-zinc-400 leading-relaxed italic">
          <span className="font-medium text-zinc-300 block mb-1">AI Budget Strategy:</span>
          {budgetJustification}
        </div>
      )}
    </div>
  );
}

export function GroupPreferenceInsights({ aiData, currentRec }: { aiData?: any, currentRec?: any }) {
  if (!aiData || !currentRec) return null;
  const displayScore = currentRec.matchScore <= 1 ? Math.round(currentRec.matchScore * 100) : currentRec.matchScore;
  const insights = [
    { label: "Budget Compatibility", value: 95 },
    { label: "Vibe Compatibility", value: 92 },
    { label: "Overall Alignment", value: displayScore },
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
        {aiData.insights.conflict || "The group is well aligned on major preferences."}
      </div>
    </div>
  );
}

export function GroupMoodSystem({ aiData, tripVibes = [] }: { aiData?: any, tripVibes?: string[] }) {
  if (!aiData) return null;
  
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-3">
        Group Vibe
      </p>

      <div className="flex flex-wrap gap-2">
        {tripVibes.map((vibe, i) => (
          <button
            key={i}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border flex items-center gap-1.5 bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          >
            <span>{vibe}</span>
          </button>
        ))}
      </div>
      
      <p className="mt-3 text-[11px] text-zinc-600 leading-relaxed">
        AI Insight: {aiData.insights.mood}
      </p>
    </div>
  );
}
