import { useState } from "react";
import { Share2, CheckCircle2, Copy, Sparkles, MapPin, Clock, Check, Ship, Home, Wallet, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareableStatusCard({ aiData, tripId }: { aiData?: any, tripId?: string }) {
  const [copied, setCopied] = useState(false);

  if (!aiData) return null;
  const { title, matchScore } = aiData.recommendation;

  const handleCopyLink = async () => {
    if (!tripId) return;
    const link = `${window.location.origin}/invite/${tripId}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!tripId) return;
    const link = `${window.location.origin}/invite/${tripId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trippin Plan: ${title}`,
          text: `Check out our AI-generated trip plan for ${title}!`,
          url: link,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Consensus Generated
      </p>
      <p className="mt-1 text-xs text-zinc-500">Recommended:</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div>
          <h4 className="text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[1.8rem] line-clamp-2">
            {title}
          </h4>
          <p className="text-base font-medium text-emerald-400">
            {matchScore}% Match
          </p>
        </div>
        <p className="text-[11px] text-zinc-500">
          Highest compatibility option
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: Sparkles, label: aiData.insights.vibe },
          { icon: Wallet, label: aiData.costBreakdown.total },
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
        <Button onClick={handleCopyLink} className="flex-1 gap-2 bg-white text-black hover:bg-zinc-200 h-9 text-xs font-medium rounded-lg transition-all">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1 gap-2 border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-white h-9 text-xs font-medium rounded-lg transition-all">
          <Share2 className="h-3.5 w-3.5" /> Share
        </Button>
      </div>
    </div>
  );
}

export function TripReadinessScore({ matchScore = 84 }: { matchScore?: number }) {
  const dashoffset = 251.2 - (251.2 * matchScore) / 100;
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
            <circle className="text-emerald-400 stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={dashoffset}></circle>
          </svg>
          <span className="absolute text-lg font-bold text-white">{matchScore}%</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Budget Alignment</span>
               <span className="font-medium text-white">{matchScore}%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${matchScore}%` }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyThisRecommendation({ aiData }: { aiData?: any }) {
  if (!aiData) return null;
  const { title, whyItFits, matchScore } = aiData.recommendation;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          AI Analysis
        </p>
        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl line-clamp-2">
          Why {title}?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {whyItFits}
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
        <div className="flex items-center gap-2">
          <Brain className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-300">
            Group Compatibility
          </span>
          <span className="ml-auto text-[10px] font-medium text-emerald-400 uppercase tracking-wider">{matchScore}% Match</span>
        </div>
      </div>
    </div>
  );
}

export function AlternativeOptions({ aiData }: { aiData?: any }) {
  if (!aiData || !aiData.alternatives) return null;
  const alternatives = aiData.alternatives;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-3">
        Other Strong Matches
      </p>

      <div className="space-y-2">
        {alternatives.map((alt: any, i: number) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.04] transition-colors cursor-default">
            <div>
              <div className="text-xs font-medium text-white">{alt.title}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{alt.description}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              <span className="text-[11px] font-medium text-emerald-400">
                {alt.matchScore}%
              </span>
              <ChevronRight className="h-3 w-3 text-zinc-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
