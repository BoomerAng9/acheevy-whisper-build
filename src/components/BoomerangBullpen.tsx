import { AgentLogEntry, AgentState } from '@/types/agent';

interface BoomerangBullpenProps {
  agents: AgentState[];
  logs: AgentLogEntry[];
}

export default function BoomerangBullpen({ agents, logs }: BoomerangBullpenProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Boomerang Bullpen</h3>
      <p className="text-xs text-slate-500">Live side-window style conversation + roster markers.</p>

      <div className="mt-3 grid gap-2">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-md border border-slate-200 bg-slate-50 p-2">
            <p className="text-xs font-semibold text-slate-800">{agent.marker} · {agent.name}</p>
            <p className="text-[11px] text-slate-600">Mission: {agent.mission}</p>
            <p className="text-[11px] text-slate-600">Objective: {agent.objective}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 max-h-48 space-y-2 overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
        {logs.slice(-8).map((log) => (
          <p key={log.id} className="text-xs text-slate-700"><strong>{log.agent}:</strong> {log.message}</p>
        ))}
      </div>
    </section>
  );
}
