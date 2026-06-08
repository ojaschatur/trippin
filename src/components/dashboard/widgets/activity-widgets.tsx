import { Clock, CheckCircle2, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FriendParticipationStatus({ participants = [], preferences = [] }: { participants?: any[], preferences?: any[] }) {
  const votes = participants.map((p) => {
    const pref = preferences.find(pr => pr.participant_id === p.id);
    return {
      name: p.name,
      budget: pref?.max_budget ? `₹${pref.max_budget}` : "Pending",
      voted: !!pref,
      role: p.role
    };
  });

  const totalMembers = participants.length;
  const votedCount = votes.filter(v => v.voted).length;
  const rate = totalMembers > 0 ? Math.round((votedCount / totalMembers) * 100) : 0;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Voting Status
        </p>
        <div className="flex gap-2">
          <span className="text-[10px] font-medium text-zinc-900 bg-white px-2 py-0.5 rounded">{rate}% Rate</span>
        </div>
      </div>

      <div className="space-y-0">
        {votes.map((v, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between border-b border-white/[0.04] py-2.5 last:border-0",
              !v.voted && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white uppercase">
                {v.name[0]}
              </div>
              <span className="text-xs text-zinc-300">{v.name} {v.role === 'coordinator' && <span className="text-[9px] text-zinc-500 ml-1">(Host)</span>}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500">{v.budget !== "Pending" ? v.budget : ""}</span>
              {v.voted ? (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Voted
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                  <Clock className="h-3 w-3" /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {votedCount > 0 && (
        <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
          <ThumbsUp className="h-3 w-3" />
          {votedCount}/{totalMembers} voted
        </div>
      )}
    </div>
  );
}

export function ConsensusTimeline({ participants = [], trip, aiData }: { participants?: any[], trip?: any, aiData?: any }) {
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const coordinator = participants.find(p => p.role === "coordinator");
  const members = participants.filter(p => p.role === "member");

  const events = [];

  // 1. Trip Created
  if (trip) {
    events.push({
      time: formatDate(trip.created_at),
      title: `${coordinator ? coordinator.name : "Coordinator"} created trip`,
      desc: `Targeting ${trip.target_size} people`,
      highlight: false,
      done: true
    });
  }

  // 2. Members Joined
  members.forEach(m => {
    events.push({
      time: formatDate(m.created_at),
      title: `${m.name} submitted preferences`,
      desc: "Joined via invite link",
      highlight: false,
      done: true
    });
  });

  // 3. AI Consensus
  if (aiData) {
    events.push({
      time: aiData.generated_at ? formatDate(aiData.generated_at) : "Just now",
      title: "AI generated recommendations",
      desc: `Found ${aiData.recommendations?.[0]?.title || "5 top options"}`,
      highlight: true,
      done: true
    });
  } else {
    events.push({
      time: "--:--",
      title: "Waiting for consensus",
      desc: "Needs more votes or coordinator action",
      highlight: false,
      done: false
    });
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-4">
        Trip Activity
      </p>

      <div className="relative pl-5 space-y-5">
        {/* Vertical line connecting events */}
        <div className="absolute left-[7px] top-1.5 bottom-3 w-px bg-white/[0.06]"></div>
        
        {events.map((event, i) => (
          <div key={i} className={cn("relative", !event.done && "opacity-50")}>
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-[17px] top-1.5 h-2.5 w-2.5 rounded-full border-2 z-10",
              event.highlight 
                ? "bg-emerald-400 border-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.3)]" 
                : event.done 
                  ? "bg-zinc-500 border-[#111113]" 
                  : "bg-transparent border-zinc-600"
            )}></div>
            
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600">{event.time}</span>
                <span className={cn("text-[11px] font-medium", event.done ? "text-zinc-300" : "text-zinc-500")}>
                  {event.title}
                </span>
              </div>
              <div className="text-[10px] text-zinc-600">{event.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
