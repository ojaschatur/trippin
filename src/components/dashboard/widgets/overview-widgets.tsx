import { useState } from "react";
import { Share2, CheckCircle2, Copy, Sparkles, MapPin, Clock, Check, Ship, Home, Wallet, Brain, ChevronRight, Utensils, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareableStatusCard({ aiData, currentRec, tripId }: { aiData?: any, currentRec?: any, tripId?: string }) {
  const [copied, setCopied] = useState(false);

  if (!aiData || !currentRec) return null;
  const { title, matchScore } = currentRec;
  const displayScore = matchScore <= 1 ? Math.round(matchScore * 100) : matchScore;

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
            {displayScore}% Match
          </p>
        </div>
        <p className="text-[11px] text-zinc-500">
          Highest compatibility option
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: Sparkles, label: aiData.insights.vibe },
          { icon: Wallet, label: currentRec.costBreakdown.total },
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
  const displayScore = matchScore <= 1 ? Math.round(matchScore * 100) : matchScore;
  const dashoffset = 251.2 - (251.2 * displayScore) / 100;
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
          <span className="absolute text-lg font-bold text-white">{displayScore}%</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
             <div className="flex justify-between text-[11px]">
               <span className="text-zinc-500">Budget Alignment</span>
               <span className="font-medium text-white">{displayScore}%</span>
             </div>
             <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${displayScore}%` }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyThisRecommendation({ currentRec }: { currentRec?: any }) {
  if (!currentRec) return null;
  const { title, whyItFits, matchScore } = currentRec;
  const displayScore = matchScore <= 1 ? Math.round(matchScore * 100) : matchScore;

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
          <span className="ml-auto text-[10px] font-medium text-emerald-400 uppercase tracking-wider">{displayScore}% Match</span>
        </div>
      </div>
    </div>
  );
}

export function TopPlacesList({ currentRec }: { currentRec?: any }) {
  if (!currentRec || !currentRec.places) return null;
  const places = currentRec.places;

  const getIconForType = (type: string) => {
    switch (type) {
      case "stay": return <Home className="h-4 w-4 text-indigo-400" />;
      case "restaurant": return <Utensils className="h-4 w-4 text-orange-400" />;
      case "activity": return <MapPin className="h-4 w-4 text-emerald-400" />;
      default: return <MapPin className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Curated Itinerary
        </p>
      </div>

      <div className="space-y-4">
        {places.map((place: any, i: number) => (
          <div key={i} className="flex gap-4 items-start group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] shadow-sm">
              {getIconForType(place.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{place.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{place.type}</p>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${place.googleMapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] transition-colors shrink-0 text-xs text-zinc-300 font-medium group-hover:border-zinc-500/30"
                >
                  <MapPin className="h-3 w-3" /> Map
                </a>
              </div>
              
              <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                {place.description}
              </p>
              
              {/* Quick Action Links */}
              <div className="mt-3 flex flex-wrap gap-2">
                {place.type === "stay" && (
                  <a
                    href={`https://www.airbnb.com/s/${encodeURIComponent(place.locationName)}/homes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#ff5a5f]/20 bg-[#ff5a5f]/10 hover:bg-[#ff5a5f]/20 transition-colors text-[10px] text-[#ff5a5f] font-medium"
                  >
                    <ExternalLink className="h-3 w-3" /> Airbnb
                  </a>
                )}
                
                {place.type === "restaurant" && (
                  <>
                    <a
                      href={`https://www.zomato.com/search?q=${encodeURIComponent(place.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#e23744]/20 bg-[#e23744]/10 hover:bg-[#e23744]/20 transition-colors text-[10px] text-[#e23744] font-medium"
                    >
                      <ExternalLink className="h-3 w-3" /> Zomato
                    </a>
                    <a
                      href="https://www.swiggy.com/restaurants-near-me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#fc8019]/20 bg-[#fc8019]/10 hover:bg-[#fc8019]/20 transition-colors text-[10px] text-[#fc8019] font-medium"
                    >
                      <ExternalLink className="h-3 w-3" /> Swiggy Dineout
                    </a>
                  </>
                )}

                {place.type === "activity" && (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(place.name + " " + currentRec.destinationCity)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 rounded border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-[10px] text-blue-400 font-medium"
                  >
                    <ExternalLink className="h-3 w-3" /> Search
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
