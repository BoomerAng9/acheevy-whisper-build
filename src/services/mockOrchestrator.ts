
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

const agentResponses = [
  {
    agent: "ACHEEVY Orchestrator",
    message: "Analyzing your request and identifying the best approach...",
    status: 'thinking' as const,
    delay: 1000
  },
  {
    agent: "ACHEEVY Orchestrator", 
    message: "Breaking down requirements and assembling specialist agents...",
    status: 'working' as const,
    delay: 2000
  },
  {
    agent: "Architecture Agent",
    message: "Reviewing technical specifications and design patterns...",
    status: 'thinking' as const,
    delay: 1500
  },
  {
    agent: "Code Generator",
    message: "Generating initial project structure and core components...",
    status: 'working' as const,
    delay: 3000
  },
  {
    agent: "QA Specialist",
    message: "Running quality checks and optimization analysis...",
    status: 'working' as const,
    delay: 2000
  },
  {
    agent: "ACHEEVY Orchestrator",
    message: "Coordination complete. Ready to deliver your solution!",
    status: 'complete' as const,
    delay: 1000
  }
];

const sampleOutputs: OutputItem[] = [
  {
    id: 'output_1',
    type: 'preview',
    title: 'Live Preview',
    description: 'Interactive preview of your application',
    url: '#',
    status: 'ready'
  },
  {
    id: 'output_2',
    type: 'download',
    title: 'Project Files',
    description: 'Complete source code package',
    url: '#',
    status: 'ready'
  },
  {
    id: 'output_3',
    type: 'code',
    title: 'Key Components',
    description: 'Main application components',
    content: 'export const App = () => {\n  return <div>Your app here</div>;\n};',
    status: 'ready'
  }
];

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

    // Simulate agent orchestration with realistic delays
    for (const response of agentResponses) {
      await this.delay(response.delay);
      
      const logEntry: LogEntry = {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        agent: response.agent,
        message: response.message,
        status: response.status
      };

      this.logCallback(logEntry);
    }

    // Add outputs after processing
    await this.delay(1000);
    sampleOutputs.forEach(output => {
      this.outputCallback(output);
    });

    this.completeCallback();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
