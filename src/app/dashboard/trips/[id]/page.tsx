import { 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  Calendar, 
  Wallet, 
  Share2, 
  MessageCircle, 
  Hash, 
  MapPin,
  Clock
} from "lucide-react";

export default async function TripPage({ params }: { params: { id: string } }) {
  // In the future, we will fetch trip data based on params.id here.
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      
      {/* LEFT PANEL: AI Chat Interface (50%) */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/[0.08] flex items-center px-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-violet-400" />
            <h2 className="text-sm font-medium text-white">Trippin Assistant</h2>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-black/20">
          
          {/* AI Message */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-400">Trippin</span>
              <div className="text-sm text-zinc-300 leading-relaxed">
                Welcome! I see you want to plan a trip to Goa or Alibaug. I've sent the voting links to Ojas and Rahul. What kind of vibe are we going for? Relaxing beach or party?
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
              <User className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-xs font-medium text-zinc-400">You</span>
              <div className="text-sm text-white bg-white/[0.08] rounded-2xl rounded-tr-none px-4 py-2 leading-relaxed">
                Definitely a relaxing beach vibe. Budget is around 5k per person.
              </div>
            </div>
          </div>

          {/* AI Message with Tool execution visual */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xs font-medium text-zinc-400">Trippin</span>
              <div className="text-sm text-zinc-300 leading-relaxed">
                Perfect. I'm updating the group preferences. I found 3 great beachfront villas in Alibaug that fit the 5k budget.
              </div>
              {/* Tool Execution Card inside chat */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex items-start gap-3 mt-1">
                 <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                 <div>
                   <div className="text-sm font-medium text-white">Searched Airbnb & Booking.com</div>
                   <div className="text-xs text-zinc-500">Found 12 matches for "Beachfront", filtered by ₹5k/person.</div>
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#0a0a0a] shrink-0">
          <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.02] shadow-sm focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20 transition-all">
            <textarea 
              rows={1}
              placeholder="Ask the group or tell the AI what to do..."
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 resize-none py-3.5 pl-4 pr-12 focus:outline-none"
            />
            <button className="absolute right-2 bottom-2 p-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="text-[10px] text-zinc-500 text-center mt-2">
            Trippin AI can make mistakes. Check important details.
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Dashboard & Widgets (50%) */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full bg-black overflow-y-auto">
        <div className="p-6 max-w-3xl mx-auto w-full space-y-6">
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Trip Dashboard</h1>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 text-xs font-medium bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 px-3 py-1.5 rounded-full transition-colors border border-[#25D366]/20">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
              <button className="flex items-center gap-2 text-xs font-medium bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2]/20 px-3 py-1.5 rounded-full transition-colors border border-[#5865F2]/20">
                <Hash className="h-3.5 w-3.5" /> Discord
              </button>
            </div>
          </div>

          {/* Share Links Widget */}
          <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Invite Friends</div>
              <div className="text-xs text-zinc-400 mt-0.5">Share this link to let others vote and chat.</div>
            </div>
            <button className="flex items-center gap-2 text-xs font-medium bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-lg transition-colors">
              <Share2 className="h-3.5 w-3.5" /> Copy Link
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Consensus Widget */}
            <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Current Consensus
                </div>
                <div className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                  92% Match
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Alibaug Beach Villa</div>
              <div className="text-sm text-zinc-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Aug 15-18</span>
                <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> ₹4,500/pp</span>
              </div>
            </div>

            {/* Voting Status Widget */}
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div className="text-sm font-medium text-white mb-4">Voting Status (2/4)</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">O</div>
                    <span className="text-sm text-zinc-300">Ojas</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">R</div>
                    <span className="text-sm text-zinc-300">Rahul</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">K</div>
                    <span className="text-sm text-zinc-500">Karan</span>
                  </div>
                  <Clock className="h-4 w-4 text-zinc-600" />
                </div>
              </div>
            </div>

            {/* Analytics & Budget Widget */}
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] col-span-1 md:col-span-2">
               <div className="text-sm font-medium text-white mb-4">Budget Analytics</div>
               
               <div className="flex items-end gap-2 h-32 w-full pt-4 border-b border-white/[0.08] pb-2 px-2 relative">
                 {/* Y-axis labels */}
                 <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-zinc-500 py-2">
                   <span>8k</span>
                   <span>4k</span>
                   <span>0</span>
                 </div>
                 
                 {/* Bars */}
                 <div className="flex-1 flex items-end justify-around pl-6 h-full">
                   <div className="group relative flex flex-col items-center w-12 h-full justify-end">
                     <div className="w-full bg-violet-500/80 hover:bg-violet-400 rounded-t-sm transition-all" style={{ height: "45%" }}></div>
                     <span className="text-[10px] text-zinc-400 mt-2">Flight</span>
                     {/* Tooltip */}
                     <div className="absolute -top-8 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">₹3.5k</div>
                   </div>
                   <div className="group relative flex flex-col items-center w-12 h-full justify-end">
                     <div className="w-full bg-emerald-500/80 hover:bg-emerald-400 rounded-t-sm transition-all" style={{ height: "65%" }}></div>
                     <span className="text-[10px] text-zinc-400 mt-2">Stay</span>
                     <div className="absolute -top-8 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">₹5k</div>
                   </div>
                   <div className="group relative flex flex-col items-center w-12 h-full justify-end">
                     <div className="w-full bg-blue-500/80 hover:bg-blue-400 rounded-t-sm transition-all" style={{ height: "30%" }}></div>
                     <span className="text-[10px] text-zinc-400 mt-2">Food</span>
                     <div className="absolute -top-8 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">₹2.5k</div>
                   </div>
                   <div className="group relative flex flex-col items-center w-12 h-full justify-end">
                     <div className="w-full bg-fuchsia-500/80 hover:bg-fuchsia-400 rounded-t-sm transition-all" style={{ height: "20%" }}></div>
                     <span className="text-[10px] text-zinc-400 mt-2">Misc</span>
                     <div className="absolute -top-8 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">₹1.5k</div>
                   </div>
                 </div>
               </div>

               <div className="flex justify-between items-center mt-4 pt-2">
                 <div className="text-xs text-zinc-400">
                   Total Est: <span className="text-white font-medium">₹12,500</span> / pp
                 </div>
                 <div className="text-[10px] text-zinc-500 bg-white/5 px-2 py-1 rounded-md">
                   Based on Alibaug consensus
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
