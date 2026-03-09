import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Clock3, Cpu, CircleDashed, AlertTriangle } from 'lucide-react';
import { AgentLogEntry } from '@/types/agent';

interface AgentLogProps { logs: AgentLogEntry[]; isActive: boolean; }

const AgentLog = ({ logs, isActive }: AgentLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [logs]);

  const getStatusIcon = (status: AgentLogEntry['status']) => {
    switch (status) {
      case 'thinking': return <Clock3 className="h-4 w-4 text-blue-500" />;
      case 'working': return <Cpu className="h-4 w-4 text-amber-500" />;
      case 'complete': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <CircleDashed className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-5">
      <section className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3"><h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700"><span className={`h-2 w-2 rounded-full ${isActive ? 'animate-pulse bg-blue-500' : 'bg-slate-400'}`} />Boomerang Activity Log</h3></div>
        <div ref={scrollRef} className="max-h-96 flex-1 space-y-3 overflow-y-auto p-4">
          {logs.map((log) => (
            <article key={log.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-start gap-3">{getStatusIcon(log.status)}<div className="min-w-0 flex-1"><div className="mb-1 flex items-center justify-between gap-2"><span className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">{log.agent}</span><span className="text-[10px] text-slate-500">{log.timestamp.toLocaleTimeString()}</span></div><p className="text-sm leading-relaxed text-slate-700">{log.message}</p></div></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgentLog;
