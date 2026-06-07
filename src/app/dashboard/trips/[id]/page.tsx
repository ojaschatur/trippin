"use client";

import { useState } from "react";
import { Send, Bot, User, MessageCircle, Hash, Sparkles, Building2, Utensils, Navigation, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Import new Widgets
import { 
  ShareableStatusCard, 
  TripReadinessScore, 
  WhyThisRecommendation, 
  AlternativeOptions 
} from "@/components/dashboard/widgets/overview-widgets";
import { 
  CostBreakdown, 
  GroupPreferenceInsights, 
  GroupMoodSystem 
} from "@/components/dashboard/widgets/logistics-widgets";
import { 
  FriendParticipationStatus, 
  ConsensusTimeline 
} from "@/components/dashboard/widgets/activity-widgets";

export default function TripPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "logistics" | "activity">("overview");
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      
      {/* LEFT PANEL: AI Chat Interface (50%) */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/[0.06] relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/[0.06] flex items-center px-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-zinc-300" />
            <h2 className="text-sm font-medium text-white">Trippin Coordinator</h2>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-black/20">
          
          {/* Proactive AI Message */}
          <div className="flex gap-3 max-w-[90%]">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
              <Bot className="h-4 w-4 text-zinc-300" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[10px] font-medium text-zinc-500">Trippin</span>
              <div className="text-sm text-zinc-300 leading-relaxed">
                I've analyzed the group's preferences. It looks like Rahul prefers a relaxed nature vibe, while Ojas wants to stay strictly under the ₹5k budget. 
                <br/><br/>
                Karan hasn't voted yet, but based on the 2 votes, I found 3 beachfront villas in Alibaug that fit perfectly. What should we do next?
              </div>
              
              {/* Smart AI Action Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="flex items-center gap-1.5 text-[11px] font-medium bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] px-2.5 py-1.5 rounded-lg transition-colors text-zinc-400">
                  <Building2 className="h-3 w-3 text-zinc-500" /> Compare Villas
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-medium bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] px-2.5 py-1.5 rounded-lg transition-colors text-zinc-400">
                  <Utensils className="h-3 w-3 text-zinc-500" /> Find Restaurants
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-medium bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] px-2.5 py-1.5 rounded-lg transition-colors text-zinc-400">
                  <Sparkles className="h-3 w-3 text-zinc-500" /> Find Activities
                </button>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
              <User className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[10px] font-medium text-zinc-500">You</span>
              <div className="text-sm text-white bg-white/[0.06] rounded-2xl rounded-tr-none px-4 py-2 leading-relaxed">
                Let's compare the villas first. Also, warn Karan to vote by tonight.
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3 max-w-[90%]">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
              <Bot className="h-4 w-4 text-zinc-300" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[10px] font-medium text-zinc-500">Trippin</span>
              <div className="text-sm text-zinc-300 leading-relaxed">
                I've sent a WhatsApp reminder to Karan. Here is the comparison of the top 3 villas. The "Sea Breeze" option has the highest rating, but "Palm Retreat" is closer to the restaurants.
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                 <button className="flex items-center gap-1.5 text-[11px] font-medium bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-lg transition-colors">
                  <Navigation className="h-3 w-3" /> Generate Final Plan
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0a0a0a] shrink-0 border-t border-white/[0.06]">
          <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20 transition-all">
            <textarea 
              rows={1}
              placeholder="Tell the AI what to do..."
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 resize-none py-3.5 pl-4 pr-12 focus:outline-none"
            />
            <button className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="text-[10px] text-zinc-600 text-center mt-2">
            Trippin is an active coordinator. Always verify important bookings.
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Dashboard & Widgets (50%) */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full bg-[#0a0a0a] overflow-y-auto">
        <div className="p-5 max-w-2xl mx-auto w-full space-y-5">
          
          {/* Header & Tabs */}
          <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl pt-2 pb-4 -mx-5 px-5 border-b border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h1 className="text-lg font-semibold tracking-tight text-white">Consensus Engine</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111113] px-3 py-1">
                  <Clock className="h-3 w-3 text-zinc-500" />
                  <span className="text-[11px] text-zinc-400">
                    Consensus in <span className="font-medium text-white">4 min</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-5 text-xs font-medium">
              <button 
                onClick={() => setActiveTab("overview")}
                className={cn("pb-2.5 border-b-2 transition-colors", activeTab === "overview" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300")}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("logistics")}
                className={cn("pb-2.5 border-b-2 transition-colors", activeTab === "logistics" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300")}
              >
                Logistics & Insights
              </button>
              <button 
                onClick={() => setActiveTab("activity")}
                className={cn("pb-2.5 border-b-2 transition-colors", activeTab === "activity" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300")}
              >
                Participants
              </button>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="space-y-5">
            {activeTab === "overview" && (
              <div className="space-y-5">
                <ShareableStatusCard />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WhyThisRecommendation />
                  <div className="space-y-4">
                    <TripReadinessScore />
                    <AlternativeOptions />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "logistics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <CostBreakdown />
                  <GroupMoodSystem />
                </div>
                <GroupPreferenceInsights />
              </div>
            )}

            {activeTab === "activity" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FriendParticipationStatus />
                <ConsensusTimeline />
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
