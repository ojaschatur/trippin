import { Share2, CheckCircle2, Copy, Sparkles, MapPin, Clock, Check, Ship, Home, Wallet, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareableStatusCard() {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Consensus Generated
      </p>
      <p className="mt-1 text-xs text-zinc-500">Recommended:</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div>
          <h4 className="text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[1.8rem]">
            Alibaug Beach Villa
          </h4>
          <p className="text-base font-medium text-emerald-400">
            92% Match
          </p>
        </div>
        <p className="text-[11px] text-zinc-500">
          Highest compatibility option
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: Ship, label: "M2M Ferry" },
          { icon: Home, label: "Beachside Villa" },
          { icon: Wallet, label: "₹4700/person" },
        ].map((tag) => (
          <span
            key={tag.label}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-zinc-400"
          >
            <tag.icon className="h-3 w-3" />
            {tag.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <Button className="flex-1 gap-2 bg-white text-black hover:bg-zinc-200 h-9 text-xs font-medium rounded-lg">
          <Copy className="h-3.5 w-3.5" /> Copy Link
        </Button>
        <Button variant="outline" className="flex-1 gap-2 border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-white h-9 text-xs font-medium rounded-lg">
          <Share2 className="h-3.5 w-3.5" /> Share
        </Button>
      </div>
    </div>
  );
}

export function TripReadinessScore() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Trip Readiness
        </p>
        <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Ready To Finalize</span>
      </div>

      <div className="flex items-center gap-5 mb-6">
        <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle className="text-white/[0.05] stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
            <circle className="text-emerald-400 stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="40.192"></circle>
          </svg>
          <span className="absolute text-lg font-bold text-white">84%</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Votes Received</span>
               <span className="font-medium text-white">80%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full w-[80%]"></div>
             </div>
          </div>
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Budget Alignment</span>
               <span className="font-medium text-white">95%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full w-[95%]"></div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 pt-3 border-t border-white/[0.06]">
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Destination Agreement</span>
               <span className="font-medium text-white">92%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full w-[92%]"></div>
             </div>
          </div>
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Logistics Ready</span>
               <span className="font-medium text-white">70%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400/60 rounded-full w-[70%]"></div>
             </div>
          </div>
      </div>
    </div>
  );
}

export function WhyThisRecommendation() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          AI Analysis
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          Why Alibaug?
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Based on group preferences and constraints.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-300">
            AI Analysis
          </span>
          <span className="ml-auto text-[10px] font-medium text-emerald-400 uppercase tracking-wider">92% Compatible</span>
        </div>
        
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Fits everyone's budget (under ₹5k/pp)",
            "Average travel time under 2 hours",
            "Beach vibe selected by 4/5 participants",
            "Highest accommodation rating",
          ].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 text-[11px] text-zinc-500"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/90 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AlternativeOptions() {
  const alternatives = [
    { name: "Lonavala Resort", match: 89, cost: "₹3,500", time: "1.5h" },
    { name: "Kashid Beach Stay", match: 84, cost: "₹4,200", time: "3h" },
    { name: "Goa Weekend", match: 72, cost: "₹8,500", time: "4h (Flight)" },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-3">
        Other Strong Matches
      </p>

      <div className="space-y-2">
        {alternatives.map((alt, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.04] transition-colors cursor-default">
            <div>
              <div className="text-xs font-medium text-white">{alt.name}</div>
              <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-0.5">
                <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {alt.cost}</span>
                <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {alt.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-emerald-400">
                {alt.match}%
              </span>
              <ChevronRight className="h-3 w-3 text-zinc-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
