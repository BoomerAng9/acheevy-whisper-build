import { AgentState, AgentStatus, AgentZone } from '@/types/agent';

interface WorkspaceMonitorProps { agents: AgentState[]; }

const zoneOrder: AgentZone[] = ['work', 'meeting', 'rest'];
const statusTone: Record<AgentStatus, string> = {
  idle: 'bg-slate-100 text-slate-700', thinking: 'bg-blue-100 text-blue-700', working: 'bg-amber-100 text-amber-700', waiting: 'bg-violet-100 text-violet-700', blocked: 'bg-red-100 text-red-700', complete: 'bg-emerald-100 text-emerald-700',
};

export default function WorkspaceMonitor({ agents }: WorkspaceMonitorProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Vision Workspace Monitor</h3>
      <p className="mb-3 text-xs text-slate-500">Observe boomerang status, zone movement, and mission/objective traces.</p>
      <div className="grid gap-3 md:grid-cols-3">
        {zoneOrder.map((zone) => (
          <div key={zone} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{zone} area</p>
            <div className="space-y-2">
              {agents.filter((agent) => agent.zone === zone).map((agent) => (
                <article key={agent.id} className="rounded-md border border-slate-200 bg-white p-2">
                  <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-900">{agent.name}</p><span className={`rounded px-2 py-0.5 text-[10px] uppercase ${statusTone[agent.status]}`}>{agent.status}</span></div>
                  <p className="text-[11px] text-slate-500">{agent.marker} · {agent.role}</p>
                  <p className="text-[11px] text-slate-600">Mission: {agent.mission}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
