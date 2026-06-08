"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, Plus, Menu, X, MessageSquare, PanelLeftClose, PanelLeft, Settings } from "lucide-react";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

type SidebarTrip = {
  id: string;
  type: string;
  origin: string;
  status: string;
  created_at: string;
};

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [trips, setTrips] = useState<SidebarTrip[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const fetchTrips = async () => {
      const { data } = await supabase
        .from("trips")
        .select("id, type, origin, status, created_at")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setTrips(data);
    };
    fetchTrips();
  }, [pathname]);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Top Header (Visible only on small screens) */}
      <div className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#0a0a0a] px-4">
        <Link href="/dashboard" className="flex items-center text-white">
          <span className="font-semibold tracking-tight">Trippin</span>
        </Link>
        <button onClick={toggleMobileSidebar} className="text-zinc-400 hover:text-white">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0a0a0a] transition-all duration-300 ease-in-out md:static shrink-0",
          mobileOpen ? "translate-x-0 w-72 border-r border-white/[0.08]" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "md:w-[68px] border-r-0" : "md:w-72 md:border-r md:border-white/[0.08]"
        )}
      >
        <div className={cn(
          "flex flex-col h-full overflow-hidden transition-all duration-300",
          isCollapsed ? "w-[68px]" : "w-72"
        )}>
          {/* Top: Logo & Toggle */}
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between min-h-[73px]">
            {isCollapsed ? (
              <div className="flex flex-col items-center w-full gap-6 mt-1">
                <Link href="/dashboard" className="flex justify-center" title="Dashboard">
                  <span className="font-bold text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">T</span>
                </Link>
                <button onClick={toggleCollapse} className="text-zinc-400 hover:text-white transition-colors" title="Open Sidebar">
                  <PanelLeft className="h-5 w-5" />
                </button>
                <Link href="/dashboard/create" className="text-zinc-400 hover:text-white transition-colors" title="Start New Trip">
                  <Plus className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <Link href="/dashboard" className="text-white">
                    <span className="font-semibold tracking-tight text-lg">Trippin</span>
                  </Link>
                  <button onClick={toggleCollapse} className="text-zinc-400 hover:text-white transition-colors" title="Close Sidebar">
                    <PanelLeftClose className="h-5 w-5" />
                  </button>
                </div>
                <Button 
                  className="w-full justify-start gap-2 h-11 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.08]"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard/create">
                    <Plus className="h-4 w-4" />
                    Start New Trip
                  </Link>
                </Button>
              </div>
            )}
          </div>

           {/* Middle: Trip List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            {!isCollapsed ? (
              <>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
                  Your Trips
                </div>
                <div className="flex flex-col gap-1">
                  {trips.map((trip) => {
                    const isActive = pathname === `/dashboard/trips/${trip.id}`;
                    const typeLabel = trip.type.charAt(0).toUpperCase() + trip.type.slice(1).replace(/_/g, " ");
                    const tripName = trip.origin ? `${typeLabel} · ${trip.origin}` : typeLabel;
                    return (
                      <Link
                        key={trip.id}
                        href={`/dashboard/trips/${trip.id}`}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                          isActive 
                            ? "bg-white/[0.08] text-white" 
                            : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <div className="truncate">{tripName}</div>
                        </div>
                        {trip.status === "collecting_preferences" && (
                          <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" title="Collecting votes"></div>
                        )}
                      </Link>
                    );
                  })}
                  {trips.length === 0 && (
                    <p className="text-xs text-zinc-600 px-2 py-4">No trips yet. Start one!</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-2">
                 {trips.map((trip) => {
                    const isActive = pathname === `/dashboard/trips/${trip.id}`;
                    const typeLabel = trip.type.charAt(0).toUpperCase() + trip.type.slice(1).replace(/_/g, " ");
                    const tripName = trip.origin ? `${typeLabel} · ${trip.origin}` : typeLabel;
                    return (
                      <Link
                        key={trip.id}
                        href={`/dashboard/trips/${trip.id}`}
                        className={cn(
                          "relative p-2 rounded-lg transition-colors flex items-center justify-center",
                          isActive 
                            ? "bg-white/[0.08] text-white" 
                            : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                        )}
                        title={tripName}
                      >
                        <MessageSquare className="h-5 w-5 shrink-0" />
                        {trip.status === "collecting_preferences" && (
                          <div className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-[#0a0a0a]" title="Collecting votes"></div>
                        )}
                      </Link>
                    );
                 })}
              </div>
            )}
          </div>

          {/* Bottom: Settings & Sign Out */}
          <div className="p-4 border-t border-white/[0.08] flex flex-col gap-2">
            {isCollapsed ? (
              <>
                <Link href="/dashboard/settings" className={cn("flex w-full items-center justify-center p-2 rounded-lg transition-colors", pathname === '/dashboard/settings' ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white')} title="Settings">
                  <Settings className="h-5 w-5" />
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center p-2 rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/dashboard/settings" className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", pathname === '/dashboard/settings' ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white')}>
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
