import { RoutedTask } from '@/types/agent';

interface ProjectBoardProps { tasks: RoutedTask[]; }

const tone = { todo: 'bg-slate-100 text-slate-700', 'in-progress': 'bg-amber-100 text-amber-700', done: 'bg-emerald-100 text-emerald-700' };

export default function ProjectBoard({ tasks }: ProjectBoardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Project Board</h3>
      <p className="mb-3 text-xs text-slate-500">Tasks generated from natural language and routed to boomerangs.</p>
      <div className="space-y-2">
        {tasks.map((task) => (
          <article key={task.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between"><p className="text-sm text-slate-900">{task.id}: {task.title}</p><span className={`rounded px-2 py-0.5 text-[10px] uppercase ${tone[task.status]}`}>{task.status}</span></div>
            <p className="mt-1 text-xs text-slate-500">{task.assignees.join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
