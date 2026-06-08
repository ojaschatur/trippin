"use client";

import { useState, useEffect, use, useRef } from "react";
import { Send, Bot, User, Sparkles, Building2, Utensils, Navigation, Clock, Loader2, Copy, Check, Share2, Users, MapPin, Calendar, Wallet, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

// Import Widgets
import { 
  ShareableStatusCard, 
  TripReadinessScore, 
  WhyThisRecommendation,
  TopPlacesList
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
import { MapWidget } from "@/components/dashboard/widgets/map-widget";

// --- Types ---
type Trip = {
  id: string;
  type: string;
  audience: string;
  origin: string;
  target_size: string;
  budget: string;
  vibes: string[];
  dates: string;
  status: string;
  created_at: string;
};

type Participant = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

type TripMessage = {
  id: string;
  sender_name: string;
  role: string;
  content: string;
  created_at: string;
};

export default function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<"overview" | "logistics" | "activity" | "map">("overview");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [preferences, setPreferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // AI State
  const [aiData, setAiData] = useState<any>(null);
  const [selectedRecIndex, setSelectedRecIndex] = useState(0);
  const [generatingConsensus, setGeneratingConsensus] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<TripMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [channel, setChannel] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const userName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || "User";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers, isChatting]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) setCurrentUser(data.user);
      });

      const [tripRes, participantsRes, prefRes, msgRes] = await Promise.all([
        supabase.from("trips").select("*").eq("id", id).single(),
        supabase.from("participants").select("*").eq("trip_id", id).order("created_at", { ascending: true }),
        supabase.from("preferences").select("*").eq("trip_id", id),
        supabase.from("trip_messages").select("*").eq("trip_id", id).order("created_at", { ascending: true })
      ]);

      if (tripRes.data) {
        setTrip(tripRes.data);
        if (tripRes.data.ai_recommendation) {
          setAiData(tripRes.data.ai_recommendation);
        }
      }
      if (participantsRes.data) setParticipants(participantsRes.data);
      if (prefRes.data) setPreferences(prefRes.data);
      if (msgRes.data) setMessages(msgRes.data);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Real-time subscriptions
  useEffect(() => {
    // 1. Messages Channel
    const msgChannel = supabase
      .channel(`messages-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'trip_messages' },
        (payload) => {
          const newMsg = payload.new as TripMessage;
          if (newMsg.trip_id !== id) return; // Client-side filter fallback
          
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setIsChatting(false); // Clear typing indicator
        }
      )
      .subscribe();

    // 2. Participants Channel
    const partChannel = supabase
      .channel(`participants-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'participants', filter: `trip_id=eq.${id}` },
        (payload) => {
          supabase.from("participants").select("*").eq("trip_id", id).order("created_at", { ascending: true })
            .then(res => { if (res.data) setParticipants(res.data) });
        }
      )
      .subscribe();

    // 3. Trips Channel
    const tripChannel = supabase
      .channel(`trips-${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'trips', filter: `id=eq.${id}` },
        (payload) => {
          if (payload.new.ai_recommendation) {
            setAiData(payload.new.ai_recommendation);
          }
        }
      )
      .subscribe();

    // 4. Broadcast Channel (Typing)
    const broadcastChannel = supabase
      .channel(`trip-${id}`) // Keep this name identical to where we send typing events
      .on(
        'broadcast',
        { event: 'typing' },
        (payload) => {
          if (payload.payload?.user) {
            setTypingUsers(prev => {
              const newSet = new Set(prev);
              newSet.add(payload.payload.user);
              return newSet;
            });
            setTimeout(() => {
              setTypingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(payload.payload.user);
                return newSet;
              });
            }, 3000);
          }
        }
      )
      .subscribe();

    setChannel(broadcastChannel);

    return () => {
      supabase.removeChannel(msgChannel);
      supabase.removeChannel(partChannel);
      supabase.removeChannel(tripChannel);
      supabase.removeChannel(broadcastChannel);
    };
  }, [id, supabase]);

  // Fallback Polling (Guarantees sync if Realtime packets are dropped)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!id || isChatting) return; // Don't interrupt while actively sending/receiving
      const { data } = await supabase.from("trip_messages").select("*").eq("trip_id", id).order("created_at", { ascending: true });
      if (data && data.length > 0) {
        setMessages(prev => {
          if (prev.length === data.length) return prev; // Avoid unnecessary re-renders
          return data;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [id, supabase, isChatting]);

  const copyInviteLink = async () => {
    const link = `${window.location.origin}/invite/${id}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateConsensus = async (force: boolean = false) => {
    setGeneratingConsensus(true);
    try {
      const res = await fetch(`/api/trips/${id}/consensus${force ? '?force=true' : ''}`, { method: "POST" });
      const json = await res.json();
      if (json.success && json.data) {
        setAiData(json.data);
        // The AI backend could also emit a message. We'll let it happen or emit one from here later.
      }
    } catch (e) {
      console.error(e);
    }
    setGeneratingConsensus(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
    if (channel && e.target.value.length > 0) {
      channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user: userName } // Send the actual user's name
      });
    }
  };

  const sendChatMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput("");
    setIsChatting(true);

    // Optimistic UI Update (WhatsApp style)
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg: TripMessage = {
      id: tempId as any,
      trip_id: id,
      sender_name: userName,
      role: "user",
      content: userMessage,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      // Pass the recent message history to the AI for context
      const historyForApi = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetch(`/api/trips/${id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historyForApi, senderName: userName })
      });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => {
          // Remove the optimistic message since we're getting the real one from DB
          const updated = prev.filter(m => m.id !== tempId);
          if (json.userMessage && !updated.some(m => m.id === json.userMessage.id)) {
            updated.push(json.userMessage);
          }
          if (json.aiMessage && !updated.some(m => m.id === json.aiMessage.id)) {
            updated.push(json.aiMessage);
          }
          return updated;
        });
        setIsChatting(false);
      } else {
        console.error("Chat error:", json.error);
        setIsChatting(false);
      }
    } catch (e) {
      console.error(e);
      setIsChatting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold text-white mb-2">Trip not found</h2>
        <p className="text-zinc-400">This trip may have been deleted or the link is invalid.</p>
      </div>
    );
  }

  const coordinator = participants.find(p => p.role === "coordinator");
  const members = participants.filter(p => p.role === "member");
  const totalVotes = members.length;
  const tripLabel = trip.type.charAt(0).toUpperCase() + trip.type.slice(1).replace(/_/g, " ");

  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      
      {/* LEFT PANEL: Trip Overview + AI Chat */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/[0.06] relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/[0.06] flex items-center px-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-zinc-300" />
            <h2 className="text-sm font-medium text-white">Trippin Coordinator</h2>
          </div>
        </div>

        {/* Chat Messages — Real data mixed with AI context */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-black/20">
          
          {/* Trip Created Message */}
          <div className="flex gap-3 max-w-[90%]">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
              <span className="text-[10px] font-bold text-emerald-400">Tr</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[10px] font-medium text-zinc-500">Trippin</span>
              <div className="text-sm text-zinc-300 leading-relaxed">
                I've set up your <span className="font-medium text-white">{tripLabel}</span> from <span className="font-medium text-white">{trip.origin || "your city"}</span>.
                <br/><br/>
                {totalVotes > 0 ? (
                  <>
                    <span className="font-medium text-emerald-400">{totalVotes} {totalVotes === 1 ? "person has" : "people have"}</span> joined and submitted preferences so far.
                    {totalVotes >= 3 ? " I have enough data to start generating consensus recommendations." : ` Share the invite link to get more votes — I need at least 3 to generate a strong consensus.`}
                  </>
                ) : (
                  <>No one has joined yet. Share the invite link below to start collecting votes from your group.</>
                )}
              </div>
              
              {/* Invite Link Chip */}
              <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] max-w-xs">
                <div className="text-[11px] text-zinc-400 font-mono truncate flex-1">
                  {window.location.origin}/invite/{id}
                </div>
                <button 
                  onClick={copyInviteLink}
                  className="text-[10px] font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Show participant join messages */}
          {members.map((member) => (
            <div key={member.id} className="flex gap-3 max-w-[90%]">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-[10px] font-bold text-zinc-300">{member.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-medium text-zinc-500">{member.name} joined</span>
                <div className="text-sm text-zinc-400 leading-relaxed">
                  Submitted their preferences and is ready to go.
                </div>
              </div>
            </div>
          ))}

          {/* AI analysis prompt if enough votes */}
          {totalVotes >= 1 && !aiData && (
            <div className="flex gap-3 max-w-[90%]">
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-[10px] font-bold text-emerald-400">Tr</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[10px] font-medium text-zinc-500">Trippin</span>
                <div className="text-sm text-zinc-300 leading-relaxed">
                  I can see overlapping preferences in the group. The vibes <span className="font-medium text-white">{trip.vibes.join(", ")}</span> seem popular. 
                  Budget range is <span className="font-medium text-white">{trip.budget}</span> per person.
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <button 
                    onClick={generateConsensus}
                    disabled={generatingConsensus}
                    className="flex items-center gap-1.5 text-[11px] font-medium bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {generatingConsensus ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />} 
                    {generatingConsensus ? "Generating Consensus..." : "Generate Final Plan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Chat History from Database */}
          {messages.map((msg) => {
            const isMe = msg.sender_name === userName;
            return (
            <div key={msg.id} className={cn("flex gap-3 max-w-[90%]", isMe ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                isMe ? "bg-white/10" : msg.role === "assistant" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-blue-500/10 border border-blue-500/20"
              )}>
                <span className={cn("text-[10px] font-bold", isMe ? "text-white" : msg.role === "assistant" ? "text-emerald-400" : "text-blue-400")}>
                  {msg.role === "assistant" ? "Tr" : msg.sender_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={cn("flex flex-col gap-1 w-full", isMe ? "items-end" : "items-start")}>
                <span className="text-[10px] font-medium text-zinc-500">{isMe ? "You" : msg.sender_name}</span>
                <div className={cn(
                  "text-sm leading-relaxed p-3 rounded-xl",
                  isMe ? "bg-white/10 text-white rounded-tr-none" : msg.role === "assistant" ? "bg-transparent text-zinc-300" : "bg-zinc-800 text-zinc-200 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </div>
            </div>
          )})}

          {Array.from(typingUsers).length > 0 && (
             <div className="flex gap-3 max-w-[90%]">
             <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
               <span className="text-[10px] font-bold text-zinc-300">...</span>
             </div>
             <div className="flex flex-col gap-1 w-full pt-2">
               <span className="text-xs text-zinc-500 italic">{Array.from(typingUsers).join(", ")} is typing...</span>
             </div>
           </div>
          )}

          {isChatting && (
             <div className="flex gap-3 max-w-[90%]">
             <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
               <span className="text-[10px] font-bold text-emerald-400">Tr</span>
             </div>
             <div className="flex flex-col gap-1 w-full pt-2">
               <span className="text-xs text-zinc-500 italic">Trippin is typing...</span>
             </div>
           </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0a0a0a] shrink-0 border-t border-white/[0.06]">
          <form onSubmit={sendChatMessage} className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20 transition-all">
            <textarea 
              rows={1}
              value={chatInput}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendChatMessage();
                }
              }}
              placeholder="Message group... (mention @ai to ask the coordinator)"
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 resize-none py-3.5 pl-4 pr-12 focus:outline-none"
            />
            <button type="submit" disabled={!chatInput.trim() || isChatting} className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="text-[10px] text-zinc-600 text-center mt-2">
            Trippin is an active coordinator. Always verify important bookings.
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Dashboard & Widgets */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full bg-[#0a0a0a] overflow-y-auto">
        <div className="p-5 max-w-2xl mx-auto w-full space-y-5 flex-1 flex flex-col">
          
          {/* Trip Summary Header */}
          <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl pt-2 pb-4 -mx-5 px-5 border-b border-white/[0.06] shrink-0">
            
            {/* Trip Info */}
            <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-semibold text-white">{tripLabel}</h1>
                <span className={cn(
                  "text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border",
                  aiData ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                )}>
                  {aiData ? "Consensus Ready" : "Collecting Votes"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{trip.origin || "TBD"}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{trip.target_size} people</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wallet className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{trip.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{trip.dates}</span>
                </div>
              </div>
            </div>

            {/* Participants Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {participants.slice(0, 5).map((p) => (
                    <div 
                      key={p.id} 
                      className="h-7 w-7 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center"
                      title={p.name}
                    >
                      <span className="text-[9px] font-bold text-zinc-300">{p.name.charAt(0).toUpperCase()}</span>
                    </div>
                  ))}
                  {participants.length > 5 && (
                    <div className="h-7 w-7 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center">
                      <span className="text-[9px] font-medium text-zinc-400">+{participants.length - 5}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-zinc-500">{participants.length} joined</span>
              </div>
              <div className="flex items-center gap-2">
                {aiData && (
                  <button 
                    onClick={() => generateConsensus(true)}
                    disabled={generatingConsensus}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {generatingConsensus ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    Regenerate
                  </button>
                )}
                <button 
                  onClick={copyInviteLink}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Share2 className="h-3 w-3" /> Invite
                </button>
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
              <button 
                onClick={() => setActiveTab("map")}
                className={cn("pb-2.5 border-b-2 transition-colors", activeTab === "map" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300")}
              >
                Map
              </button>
            </div>
            
            {/* Recommendation Selector (If AI Data exists) */}
            {aiData && aiData.recommendations && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 pt-4 scrollbar-hide border-t border-white/[0.04] mt-3 -mx-5 px-5">
                {aiData.recommendations.map((rec: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedRecIndex(idx)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs whitespace-nowrap border transition-all flex items-center gap-2", 
                      selectedRecIndex === idx 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                        : "bg-[#111113] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.1]"
                    )}
                  >
                    <span className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                      selectedRecIndex === idx ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.05] text-zinc-500"
                    )}>
                      {idx + 1}
                    </span>
                    <span className="font-medium">{rec.destinationCity}</span>
                    <span className={cn(
                      "text-[10px] ml-1 px-1.5 py-0.5 rounded-md",
                      selectedRecIndex === idx ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.05] text-zinc-500"
                    )}>
                      {rec.matchScore}%
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TAB CONTENT */}
          <div className="flex-1 pb-10">
            {activeTab === "overview" && (
              <div className="space-y-5">
                {aiData ? (
                  (() => {
                    const currentRec = aiData.recommendations?.[selectedRecIndex];
                    if (!currentRec) return null;
                    return (
                      <>
                        <ShareableStatusCard aiData={aiData} currentRec={currentRec} tripId={id} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <WhyThisRecommendation currentRec={currentRec} />
                          </div>
                          <div className="space-y-4">
                            <TripReadinessScore matchScore={currentRec.matchScore} />
                            <TopPlacesList currentRec={currentRec} />
                          </div>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <div className="rounded-xl border border-dashed border-white/[0.1] p-12 flex flex-col items-center justify-center text-center">
                    <Sparkles className="h-8 w-8 text-zinc-500 mb-4 opacity-50" />
                    <h3 className="text-sm font-medium text-white mb-2">Waiting for Consensus</h3>
                    <p className="text-xs text-zinc-500 max-w-[250px]">
                      Once enough friends vote, the AI will generate the perfect trip recommendation here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "logistics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiData ? (
                  (() => {
                    const currentRec = aiData.recommendations?.[selectedRecIndex];
                    if (!currentRec) return null;
                    return (
                      <>
                        <div className="space-y-4">
                          <CostBreakdown currentRec={currentRec} />
                          <GroupMoodSystem aiData={aiData} tripVibes={trip.vibes} />
                        </div>
                        <GroupPreferenceInsights aiData={aiData} currentRec={currentRec} />
                      </>
                    );
                  })()
                ) : (
                  <div className="col-span-full rounded-xl border border-dashed border-white/[0.1] p-12 flex flex-col items-center justify-center text-center">
                    <Brain className="h-8 w-8 text-zinc-500 mb-4 opacity-50" />
                    <h3 className="text-sm font-medium text-white mb-2">Analyzing Data</h3>
                    <p className="text-xs text-zinc-500 max-w-[250px]">
                      Logistics and insights will be available once the AI generates a recommendation.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FriendParticipationStatus participants={participants} preferences={preferences} />
                <ConsensusTimeline participants={participants} trip={trip} aiData={aiData} />
              </div>
            )}

            {activeTab === "map" && (
              <div className="h-full min-h-[400px]">
                {aiData ? (
                  (() => {
                    const currentRec = aiData.recommendations?.[selectedRecIndex];
                    if (!currentRec) return null;
                    return (
                      <MapWidget 
                        locationName={currentRec.destinationCity || currentRec.title.split(" ")[0]} 
                        places={currentRec.places}
                      />
                    );
                  })()
                ) : (
                  <div className="h-full rounded-xl border border-dashed border-white/[0.1] p-12 flex flex-col items-center justify-center text-center">
                    <MapPin className="h-8 w-8 text-zinc-500 mb-4 opacity-50" />
                    <h3 className="text-sm font-medium text-white mb-2">Map Unavailable</h3>
                    <p className="text-xs text-zinc-500 max-w-[250px]">
                      The map will become available once the destination is decided.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}


