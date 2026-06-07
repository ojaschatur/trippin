import { Clock, CheckCircle2, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FriendParticipationStatus() {
  const votes = [
    { name: "Ojas", budget: "₹5000", voted: true },
    { name: "Rahul", budget: "₹7000", voted: true },
    { name: "Karan", budget: "₹3500", voted: false },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Voting Status
        </p>
        <div className="flex gap-2">
          <span className="text-[10px] font-medium text-zinc-900 bg-white px-2 py-0.5 rounded">67% Rate</span>
          <span className="text-[10px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" /> 8 min
          </span>
        </div>
      </div>

      <div className="space-y-0">
        {votes.map((v) => (
          <div
            key={v.name}
            className={cn(
              "flex items-center justify-between border-b border-white/[0.04] py-2.5 last:border-0",
              !v.voted && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                {v.name[0]}
              </div>
              <span className="text-xs text-zinc-300">{v.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-500">{v.budget}</span>
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

      <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
        <ThumbsUp className="h-3 w-3" />
        4/6 voted Alibaug
      </div>
    </div>
  );
}

export function ConsensusTimeline() {
  const events = [
    { time: "10:02 AM", title: "Ojas created trip", desc: "Added 2 participants", highlight: false, done: true },
    { time: "10:05 AM", title: "Rahul submitted preferences", desc: "Budget max: ₹6k", highlight: false, done: true },
    { time: "10:08 AM", title: "AI generated recommendation", desc: "Found Alibaug Beach Villa", highlight: true, done: true },
    { time: "10:12 AM", title: "Karan invited", desc: "Invitation sent via WhatsApp", highlight: false, done: true },
    { time: "10:15 AM", title: "Waiting for additional votes", desc: "Needs 1 more vote to finalize", highlight: false, done: false },
  ];

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
