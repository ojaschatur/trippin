"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Terminal, Database, Brain, Clock, ChevronDown, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type SystemLog = {
  id: string;
  trip_id: string;
  type: string;
  payload: any;
  created_at: string;
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const supabase = createClient();

  const fetchLogs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("system_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    
    if (data) setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();

    // Subscribe to new logs
    const channel = supabase
      .channel('admin-logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'system_logs' },
        (payload) => {
          setLogs(prev => [payload.new as SystemLog, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedLogs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "ai_consensus": return <Brain className="h-4 w-4 text-fuchsia-400" />;
      case "ai_chat": return <Brain className="h-4 w-4 text-emerald-400" />;
      default: return <Database className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-white/[0.08] flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-zinc-400" />
          <h1 className="text-lg font-semibold text-white">System Logs</h1>
          <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider text-red-400 ml-2">
            Admin Only
          </span>
        </div>
        <button 
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg text-xs font-medium text-white transition-colors"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {logs.length === 0 && !loading && (
          <div className="text-center py-20 text-zinc-500 text-sm">
            No system logs found.
          </div>
        )}

        {logs.map((log) => {
          const isExpanded = expandedLogs.has(log.id);
          const date = new Date(log.created_at);
          
          return (
            <div key={log.id} className="rounded-xl border border-white/[0.08] bg-[#111113] overflow-hidden font-mono text-sm">
              {/* Log Header Row */}
              <div 
                className="flex items-center gap-4 p-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
                onClick={() => toggleExpand(log.id)}
              >
                <button className="text-zinc-500 hover:text-white shrink-0">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                <div className="shrink-0">
                  {getLogIcon(log.type)}
                </div>
                <div className="w-32 shrink-0 text-zinc-300 font-medium truncate">
                  {log.type}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs shrink-0 w-32">
                  <Clock className="h-3 w-3" />
                  {date.toLocaleTimeString()}
                </div>
                <div className="text-zinc-500 text-xs truncate flex-1">
                  Trip ID: {log.trip_id}
                </div>
              </div>

              {/* Expanded JSON Payload */}
              {isExpanded && (
                <div className="p-4 border-t border-white/[0.08] bg-black/50 overflow-x-auto">
                  <pre className="text-xs text-zinc-300">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
