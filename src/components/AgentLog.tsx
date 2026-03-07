import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Clock3, Cpu, CircleDashed } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  message: string;
  status: 'thinking' | 'working' | 'complete' | 'waiting';
}

interface AgentLogProps {
  logs: LogEntry[];
  isActive: boolean;
}

const AgentLog = ({ logs, isActive }: AgentLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'thinking':
        return <Clock3 className="h-4 w-4 text-neutral-300" />;
      case 'working':
        return <Cpu className="h-4 w-4 text-neutral-200" />;
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-neutral-100" />;
      case 'waiting':
        return <CircleDashed className="h-4 w-4 text-neutral-400" />;
      default:
        return <Clock3 className="h-4 w-4 text-neutral-400" />;
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-5">
      <section className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="border-b border-white/10 px-5 py-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-200">
            <span className={`h-2 w-2 rounded-full ${isActive ? 'animate-pulse bg-white' : 'bg-neutral-500'}`} />
            Agent activity
          </h3>
          <p className="mt-1 text-xs text-neutral-500">Live orchestration log</p>
        </div>

        <div ref={scrollRef} className="max-h-96 flex-1 space-y-3 overflow-y-auto p-4">
          {logs.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm font-medium text-neutral-300">System idle</p>
              <p className="mt-1 text-xs text-neutral-500">Submit a prompt to start agent routing.</p>
            </div>
          ) : (
            logs.map((log) => (
              <article
                key={log.id}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors duration-200 hover:bg-white/[0.05]"
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(log.status)}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-neutral-300">{log.agent}</span>
                      <span className="text-[10px] text-neutral-500">{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-300">{log.message}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AgentLog;
