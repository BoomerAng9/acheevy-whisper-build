export interface IntegrationConnector {
  id: string;
  label: string;
  category: 'payments' | 'models' | 'voice' | 'vision' | 'orchestration' | 'security' | 'data' | 'sandbox';
  enabled: boolean;
  key: string;
  notes: string;
}

const storageKey = 'grammar-circuit-box';

const defaults: IntegrationConnector[] = [
  { id: 'stripe', label: 'Stripe', category: 'payments', enabled: false, key: '', notes: 'Checkout + billing webhooks' },
  { id: 'openrouter', label: 'OpenRouter', category: 'models', enabled: false, key: '', notes: 'Access multi-LLM routing' },
  { id: 'openai', label: 'OpenAI', category: 'models', enabled: false, key: '', notes: 'Primary reasoning + embeddings' },
  { id: 'claude', label: 'Claude', category: 'models', enabled: false, key: '', notes: 'Long-context specialist' },
  { id: 'personaplex', label: 'NVIDIA PersonaPlex', category: 'orchestration', enabled: false, key: '', notes: 'Persona graph runtime adapter' },
  { id: 'langgraph', label: 'LangGraph', category: 'orchestration', enabled: true, key: 'managed-internal', notes: 'Workflow orchestration' },
  { id: 'opensandbox', label: 'Alibaba OpenSandbox', category: 'sandbox', enabled: false, key: '', notes: 'Session-level isolated container runtime' },
  { id: 'virtual-computer', label: 'Virtual Computer Pool', category: 'sandbox', enabled: false, key: '', notes: 'Ephemeral browser/desktop agents in cloud' },
  { id: 'deepgram', label: 'Deepgram STT', category: 'voice', enabled: false, key: '', notes: 'Speech-to-text stream' },
  { id: 'elevenlabs', label: 'ElevenLabs TTS', category: 'voice', enabled: false, key: '', notes: 'Voice output synthesis' },
  { id: 'vision', label: 'Vision Inference API', category: 'vision', enabled: false, key: '', notes: 'Image/video analysis' },
  { id: 'supabase', label: 'Supabase', category: 'data', enabled: true, key: 'project-configured', notes: 'Auth + DB + RLS' },
  { id: 'vault', label: 'Secrets Vault', category: 'security', enabled: false, key: '', notes: 'KMS-backed secret storage' },
];

export const loadConnectors = (): IntegrationConnector[] => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return defaults;
  try { return JSON.parse(raw) as IntegrationConnector[]; } catch { return defaults; }
};

export const saveConnectors = (connectors: IntegrationConnector[]) => {
  localStorage.setItem(storageKey, JSON.stringify(connectors));
};
