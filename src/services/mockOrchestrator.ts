import { AgentLogEntry, AgentRole, AgentState, OutputItem, RoutedTask } from '@/types/agent';

interface OrchestratorCallbacks {
  onLog: (log: AgentLogEntry) => void;
  onOutput: (output: OutputItem) => void;
  onComplete: () => void;
  onAgentsUpdate: (agents: AgentState[]) => void;
  onBoardUpdate: (tasks: RoutedTask[]) => void;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const baseAgents: AgentState[] = [
  { id: 'coordinator', marker: 'BOOMER_ANG_01', name: 'NOVA', role: 'Main Coordinator', mission: 'Coordinate boomerangs', objective: 'Deliver complete orchestration trace', status: 'idle', zone: 'meeting', updatedAt: new Date() },
  { id: 'planner', marker: 'BOOMER_ANG_02', name: 'Atlas', role: 'Planner', mission: 'Plan milestone scope', objective: 'Convert intent into tasks', status: 'idle', zone: 'work', updatedAt: new Date() },
  { id: 'data-scientist', marker: 'BOOMER_ANG_03', name: 'Pencil', role: 'Data Scientist', mission: 'Vision-first iteration', objective: 'Translate visual+nl intent to technical specs', status: 'idle', zone: 'work', updatedAt: new Date() },
  { id: 'qa', marker: 'BOOMER_ANG_04', name: 'Pulse', role: 'Quality Assurance', mission: 'Validate outcomes', objective: 'Protect reliability and acceptance quality', status: 'idle', zone: 'rest', updatedAt: new Date() },
  { id: 'devops', marker: 'BOOMER_ANG_05', name: 'Forge', role: 'DevOps', mission: 'Secure deployments', objective: 'Containerized and cloud-safe runtime', status: 'idle', zone: 'rest', updatedAt: new Date() },
  { id: 'security', marker: 'BOOMER_ANG_06', name: 'Shield', role: 'Security', mission: 'Enforce guardrails', objective: 'Prevent leakage and policy violations', status: 'idle', zone: 'rest', updatedAt: new Date() },
];

const getTaskType = (prompt: string): RoutedTask['type'][] => {
  const lower = prompt.toLowerCase();
  const types: RoutedTask['type'][] = ['feature-definition'];
  if (lower.includes('deploy') || lower.includes('infrastructure') || lower.includes('production') || lower.includes('sandbox')) types.push('deployment');
  if (lower.includes('qa') || lower.includes('test')) types.push('qa-check');
  if (lower.includes('secure') || lower.includes('compliance') || lower.includes('privacy')) types.push('security-validation');
  if (lower.includes('data') || lower.includes('vision') || lower.includes('analytics') || lower.includes('index')) types.push('data-analysis');
  return [...new Set(types)];
};

const assigneesForType: Record<RoutedTask['type'], AgentRole[]> = {
  'feature-definition': ['planner', 'data-scientist'],
  deployment: ['planner', 'devops'],
  'qa-check': ['qa', 'coordinator'],
  'security-validation': ['security', 'coordinator'],
  'data-analysis': ['data-scientist', 'planner'],
  general: ['coordinator'],
};

export class MockOrchestrator {
  constructor(private readonly callbacks: OrchestratorCallbacks) {}

  async processPrompt(prompt: string): Promise<void> {
    const types = getTaskType(prompt);
    const tasks: RoutedTask[] = types.map((type, index) => ({
      id: `TASK-${index + 1}`,
      title: type.replace('-', ' ').toUpperCase(),
      type,
      description: `Generated from user intent: ${prompt.slice(0, 120)}`,
      assignees: assigneesForType[type],
      status: 'todo',
    }));

    let agents = [...baseAgents];
    this.callbacks.onAgentsUpdate(agents);
    this.callbacks.onBoardUpdate(tasks);

    await this.log('NOVA', 'Mission briefing: ACHEEVY requested a new objective. Routing boomerangs now.', 'thinking');

    for (const task of tasks) {
      this.callbacks.onBoardUpdate(tasks.map((t) => (t.id === task.id ? { ...t, status: 'in-progress' } : t)));
      agents = this.currentAgents(agents, task.assignees, 'working', 'work', task);
      await this.log('NOVA', `${task.id} started. Mission=${task.title}. Objective=${task.description}`, 'working');

      for (const role of task.assignees) {
        const actor = agents.find((a) => a.id === role);
        if (actor) {
          await this.log(`${actor.name} (${actor.marker})`, `${actor.mission} | ${actor.objective}`, 'working');
        }
      }

      agents = this.currentAgents(agents, task.assignees, 'waiting', 'meeting', task);
      await this.log('NOVA', `${task.id} collaboration review in meeting zone.`, 'waiting');
      await wait(300);

      agents = this.currentAgents(agents, task.assignees, 'complete', 'rest', task);
      await this.log('NOVA', `${task.id} complete. Efficiency trace captured for bullpen decisioning.`, 'complete');
      this.callbacks.onBoardUpdate(tasks.map((t) => (t.id === task.id ? { ...t, status: 'done' } : t)));
    }

    this.callbacks.onOutput({
      id: 'boomerang-conversation',
      type: 'code',
      title: 'Boomerang mission transcript',
      description: 'Mission statements and objectives per task for audit/review.',
      status: 'ready',
      content: agents.map((a) => `${a.marker} ${a.name}: ${a.mission} -> ${a.objective}`).join('\n'),
    });

    this.callbacks.onComplete();
  }

  private currentAgents(agents: AgentState[], roles: AgentRole[], status: AgentState['status'], zone: AgentState['zone'], task: RoutedTask): AgentState[] {
    const updated = agents.map((agent) => roles.includes(agent.id) ? ({ ...agent, status, zone, taskId: task.id, taskTitle: task.title, updatedAt: new Date() }) : agent);
    this.callbacks.onAgentsUpdate(updated);
    return updated;
  }

  private async log(agent: string, message: string, status: AgentLogEntry['status']) {
    this.callbacks.onLog({ id: crypto.randomUUID(), timestamp: new Date(), agent, message, status });
    await wait(220);
  }
}
