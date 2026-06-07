import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plane, Compass, Sparkles, Map } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Double-check session on the server component level
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="mx-auto h-20 w-20 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-2xl">
          <span className="font-bold text-white text-xl tracking-tight">Tr</span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Where to next?
          </h1>
          <p className="text-zinc-400 text-lg">
            Start a new trip to invite your friends and let the AI find the perfect plan.
          </p>
        </div>

        {/* Suggestion Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8">
          <div className="flex flex-col items-start p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer text-left">
            <Compass className="h-5 w-5 text-emerald-400 mb-3" />
            <div className="text-sm font-medium text-white mb-1">Weekend Getaway</div>
            <div className="text-xs text-zinc-500">Quick 2-day trips nearby</div>
          </div>
          <div className="flex flex-col items-start p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer text-left">
            <Map className="h-5 w-5 text-violet-400 mb-3" />
            <div className="text-sm font-medium text-white mb-1">International Trip</div>
            <div className="text-xs text-zinc-500">Coordinate flights & visas</div>
          </div>
          <div className="flex flex-col items-start p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer text-left">
            <Sparkles className="h-5 w-5 text-fuchsia-400 mb-3" />
            <div className="text-sm font-medium text-white mb-1">Surprise Me</div>
            <div className="text-xs text-zinc-500">Let the AI decide completely</div>
          </div>
        </div>
      </div>
    </div>
  );
}
