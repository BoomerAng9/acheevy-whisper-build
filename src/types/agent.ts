export type AgentStatus = 'idle' | 'thinking' | 'working' | 'waiting' | 'blocked' | 'complete';

export type AgentZone = 'work' | 'meeting' | 'rest';

export type AgentRole = 'coordinator' | 'planner' | 'data-scientist' | 'qa' | 'devops' | 'security';

export interface AgentState {
  id: AgentRole;
  marker: string;
  name: string;
  role: string;
  mission: string;
  objective: string;
  status: AgentStatus;
  zone: AgentZone;
  taskId?: string;
  taskTitle?: string;
  updatedAt: Date;
}

export interface RoutedTask {
  id: string;
  title: string;
  type: 'feature-definition' | 'deployment' | 'qa-check' | 'security-validation' | 'data-analysis' | 'general';
  description: string;
  assignees: AgentRole[];
  status: 'todo' | 'in-progress' | 'done';
}

export interface AgentLogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  message: string;
  status: AgentStatus;
}

export interface OutputItem {
  id: string;
  type: 'preview' | 'download' | 'link' | 'code';
  title: string;
  description: string;
  url?: string;
  content?: string;
  status: 'ready' | 'processing' | 'error';
}

export interface KnowledgeIndexItem {
  id: string;
  term: string;
  laymanMeaning: string;
  technicalTranslation: string;
  category: 'payments' | 'security' | 'agents' | 'voice-vision' | 'infrastructure';
}
