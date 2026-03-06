interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  message: string;
  status: 'thinking' | 'working' | 'complete' | 'waiting';
}

interface OutputItem {
  id: string;
  type: 'preview' | 'download' | 'link' | 'code';
  title: string;
  description: string;
  url?: string;
  content?: string;
  status: 'ready' | 'processing' | 'error';
}

interface AgentResponse {
  agent: string;
  message: string;
  status: LogEntry['status'];
  delay: number;
}

interface PromptAnalysis {
  domain: string;
  audience: string;
  features: string[];
  recommendedStack: string[];
  inferredConstraints: string[];
  technicalPrompt: string;
}

const stackKeywords: Record<string, string> = {
  mobile: 'Responsive React + PWA support',
  dashboard: 'React + charts + analytics pipeline',
  ecommerce: 'Stripe checkout + product catalog + order management',
  auth: 'Supabase Auth + row-level security',
  ai: 'LLM orchestration + prompt templates + guardrails',
  realtime: 'WebSocket or Supabase realtime subscriptions',
  upload: 'Object storage + signed URLs + file validation',
  booking: 'Calendar scheduling + transactional locking',
  payments: 'Payment processor integration + webhook handling',
};

const featureHints = [
  'authentication',
  'payments',
  'analytics dashboard',
  'file uploads',
  'notifications',
  'admin controls',
  'search and filtering',
  'mobile responsive interface',
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const inferDomain = (prompt: string): string => {
  const lower = prompt.toLowerCase();
  if (lower.includes('health')) return 'HealthTech';
  if (lower.includes('school') || lower.includes('education') || lower.includes('course')) return 'EdTech';
  if (lower.includes('store') || lower.includes('shop') || lower.includes('ecommerce')) return 'Commerce';
  if (lower.includes('finance') || lower.includes('fintech') || lower.includes('invoice')) return 'FinTech';
  return 'General SaaS';
};

const inferAudience = (prompt: string): string => {
  const lower = prompt.toLowerCase();
  if (lower.includes('small business')) return 'Small business owners';
  if (lower.includes('students')) return 'Students and educators';
  if (lower.includes('creator')) return 'Digital creators';
  if (lower.includes('team')) return 'Internal operational teams';
  return 'End users with mixed technical experience';
};

const inferStack = (prompt: string): string[] => {
  const lower = prompt.toLowerCase();
  const picks = Object.entries(stackKeywords)
    .filter(([keyword]) => lower.includes(keyword))
    .map(([, recommendation]) => recommendation);

  const baseline = ['TypeScript React frontend', 'Supabase data + auth backend', 'Role-based access control'];

  return [...baseline, ...picks].slice(0, 6);
};

const inferFeatures = (prompt: string): string[] => {
  const lower = prompt.toLowerCase();
  const matched = featureHints.filter(feature => {
    const token = feature.split(' ')[0];
    return lower.includes(token);
  });

  if (matched.length > 0) {
    return matched;
  }

  return [
    'guided onboarding flow',
    'core workflow automation',
    'reporting and insight panel',
    'settings and account management',
  ];
};

const inferConstraints = (prompt: string): string[] => {
  const lower = prompt.toLowerCase();
  const constraints: string[] = [];

  if (lower.includes('fast') || lower.includes('quick')) {
    constraints.push('Prioritize rapid MVP delivery (1-2 sprint plan).');
  }

  if (lower.includes('secure') || lower.includes('privacy')) {
    constraints.push('Enforce secure-by-default data handling and access policies.');
  }

  if (lower.includes('no code') || lower.includes('non technical')) {
    constraints.push('Use plain-language admin tools and no-code operational controls.');
  }

  if (constraints.length === 0) {
    constraints.push('Balance implementation speed with maintainable architecture.');
  }

  return constraints;
};

const buildTechnicalPrompt = (originalPrompt: string, analysis: Omit<PromptAnalysis, 'technicalPrompt'>): string => {
  const { domain, audience, features, recommendedStack, inferredConstraints } = analysis;

  return [
    'SYSTEM ROLE: Subject Matter Expert + Technical Product Architect',
    '',
    'GOAL:',
    `Convert the user intent into an implementation-ready plan for a ${domain} web plug on Deploy by: ACHIEVEMOR.`,
    '',
    'USER INTENT (raw):',
    originalPrompt,
    '',
    'TECHNICAL INTERPRETATION:',
    `- Target audience: ${audience}`,
    `- Core feature scope: ${features.join(', ')}`,
    `- Recommended stack: ${recommendedStack.join(' | ')}`,
    `- Constraints: ${inferredConstraints.join(' ')}`,
    '',
    'DELIVERY REQUIREMENTS:',
    '- Produce a phased build plan (MVP -> V1 -> V2).',
    '- Define data models, APIs, and permissions.',
    '- Include UX flow with edge-case handling.',
    '- Generate implementation prompts for specialized agents (frontend, backend, QA).',
  ].join('\n');
};

const buildAsciiIterationTemplate = (prompt: string, analysis: Omit<PromptAnalysis, 'technicalPrompt'>): string => {
  const today = new Date().toISOString().slice(0, 10);

  return [
    '+----------------------------------------------------------------------------------+',
    '| X-Project Name: ____________________________ | X-Draft: ________________________ |',
    '| X-Project Owner: ___________________________ | X-Date: _________________________ |',
    '+----------------------------------------------------------------------------------+',
    '| ITERATION PHASE 0 - ASCII BLUEPRINT (PLAN BEFORE CODE)                          |',
    '+----------------------------------------------------------------------------------+',
    '| USER INTENT (PLAIN LANGUAGE)                                                     |',
    '|----------------------------------------------------------------------------------|',
    `| ${prompt.slice(0, 80).padEnd(80, ' ')} |`,
    '+----------------------------------------------------------------------------------+',
    '| SME INTERPRETATION                                                               |',
    '|----------------------------------------------------------------------------------|',
    `| Domain: ${analysis.domain.padEnd(72, ' ')} |`,
    `| Audience: ${analysis.audience.slice(0, 70).padEnd(70, ' ')} |`,
    `| Features: ${analysis.features.join(', ').slice(0, 70).padEnd(70, ' ')} |`,
    '+----------------------------------------------------------------------------------+',
    '| ASCII WIREFRAME SPEC                                                             |',
    '|----------------------------------------------------------------------------------|',
    '| [NAVBAR: Logo | Primary Nav | CTA ]                                             |',
    '|----------------------------------------------------------------------------------|',
    '| [SIDEBAR]      [KPI CARD] [KPI CARD] [KPI CARD]                                 |',
    '| [Menu]         --------------------------------------------------                |',
    '| [Menu]         [Main Chart / Core Workflow Visualization]                       |',
    '| [Menu]         --------------------------------------------------                |',
    '| [Menu]         [Secondary Panel: Activity | Notifications | Status]             |',
    '|----------------------------------------------------------------------------------|',
    '| [DATA TABLE / TASK LIST / AUDIT TRAIL]                                          |',
    '|----------------------------------------------------------------------------------|',
    '| [FOOTER: links | compliance | support ]                                         |',
    '+----------------------------------------------------------------------------------+',
    '| ITERATION INSTRUCTIONS                                                           |',
    '|----------------------------------------------------------------------------------|',
    '| 1) Redraw with 2 layout changes only.                                            |',
    '| 2) Keep structure stable, revise proportions and labels.                         |',
    '| 3) After approval, convert to React + Tailwind + Supabase tasks.                 |',
    '+----------------------------------------------------------------------------------+',
    `| Generated: ${today.padEnd(76, ' ')} |`,
    '+----------------------------------------------------------------------------------+',
  ].join('\n');
};

const buildAsciiPromptTemplate = (): string => {
  return [
    'PROMPT TEMPLATE: ASCII-FIRST APP ITERATION',
    '',
    'Before writing any code, create a complete ASCII wireframe and blueprint using this metadata:',
    '- X-Project Name: <name>',
    '- X-Draft: <draft number or label>',
    '- X-Project Owner: <owner>',
    '- X-Date: <YYYY-MM-DD>',
    '',
    'Then do exactly this:',
    '1) Convert the user idea to a technical interpretation.',
    '2) Draw the full layout in ASCII (navbar, sidebar, cards, charts/content, table, footer).',
    '3) Add one API/data flow diagram in ASCII.',
    '4) Ask for exactly 2 revision changes and redraw.',
    '5) Only after approval, generate implementation tickets for frontend, backend, and QA.',
  ].join('\n');
};

const analyzePrompt = (prompt: string): PromptAnalysis => {
  const base = {
    domain: inferDomain(prompt),
    audience: inferAudience(prompt),
    features: inferFeatures(prompt),
    recommendedStack: inferStack(prompt),
    inferredConstraints: inferConstraints(prompt),
  };

  return {
    ...base,
    technicalPrompt: buildTechnicalPrompt(prompt, base),
  };
};

export class MockOrchestrator {
  private logCallback: (log: LogEntry) => void;
  private outputCallback: (output: OutputItem) => void;
  private completeCallback: () => void;

  constructor(
    logCallback: (log: LogEntry) => void,
    outputCallback: (output: OutputItem) => void,
    completeCallback: () => void
  ) {
    this.logCallback = logCallback;
    this.outputCallback = outputCallback;
    this.completeCallback = completeCallback;
  }

  async processPrompt(prompt: string): Promise<void> {
    console.log('ACHEEVY processing prompt:', prompt);

    const analysis = analyzePrompt(prompt);
    const asciiBlueprint = buildAsciiIterationTemplate(prompt, analysis);

    const agentResponses: AgentResponse[] = [
      {
        agent: 'ACHEEVY Orchestrator',
        message: 'Analyzing your request and identifying the best approach...',
        status: 'thinking',
        delay: 700,
      },
      {
        agent: 'Subject Matter Expert Agent',
        message: `Translating your intent into technical language for a ${analysis.domain} implementation...`,
        status: 'working',
        delay: 1100,
      },
      {
        agent: 'ASCII Blueprint Agent',
        message: 'Drafting an ASCII-first schematic so iteration happens before code generation...',
        status: 'working',
        delay: 1200,
      },
      {
        agent: 'Prompt Engineering Agent',
        message: 'Producing structured prompts for frontend, backend, and QA specialists...',
        status: 'working',
        delay: 1000,
      },
      {
        agent: 'ACHEEVY Orchestrator',
        message: 'Technical conversion complete. Iteration-ready blueprint + prompt package delivered.',
        status: 'complete',
        delay: 600,
      },
    ];

    for (const response of agentResponses) {
      await wait(response.delay);
      this.logCallback({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        timestamp: new Date(),
        agent: response.agent,
        message: response.message,
        status: response.status,
      });
    }

    const generatedOutputs: OutputItem[] = [
      {
        id: 'output_ascii_template',
        type: 'code',
        title: 'ASCII Iteration Blueprint',
        description: 'First-step wireframe prototype using X-Project metadata placeholders',
        content: asciiBlueprint,
        status: 'ready',
      },
      {
        id: 'output_ascii_prompt',
        type: 'code',
        title: 'ASCII Prompt Template',
        description: 'Reusable prompt to force plan-first iteration before code generation',
        content: buildAsciiPromptTemplate(),
        status: 'ready',
      },
      {
        id: 'output_sme_brief',
        type: 'code',
        title: 'SME Technical Brief',
        description: 'Converted natural-language request into technical implementation context',
        content: analysis.technicalPrompt,
        status: 'ready',
      },
      {
        id: 'output_agent_prompt',
        type: 'code',
        title: 'Specialist Agent Prompt',
        description: 'Prompt package ready for orchestration across technical sub-agents',
        content: [
          `PROJECT_DOMAIN=${analysis.domain}`,
          `TARGET_AUDIENCE=${analysis.audience}`,
          `FEATURE_SET=${analysis.features.join('; ')}`,
          `STACK=${analysis.recommendedStack.join('; ')}`,
          `CONSTRAINTS=${analysis.inferredConstraints.join('; ')}`,
          'NEXT_ACTION=Iterate on ASCII spec, then generate implementation tickets and execution prompts.',
        ].join('\n'),
        status: 'ready',
      },
    ];

    await wait(600);
    generatedOutputs.forEach(output => this.outputCallback(output));

    this.completeCallback();
  }
}
