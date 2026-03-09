import React, { useCallback, useState } from 'react';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';
import AgentLog from '@/components/AgentLog';
import OutputPanel from '@/components/OutputPanel';
import BrandedLayout from '@/components/BrandedLayout';
import EmptyState from '@/components/EmptyState';
import { useSession } from '@/hooks/useSession';
import { MockOrchestrator } from '@/services/mockOrchestrator';
import { AgentLogEntry, AgentState, OutputItem, RoutedTask } from '@/types/agent';
import WorkspaceMonitor from '@/components/WorkspaceMonitor';
import ProjectBoard from '@/components/ProjectBoard';
import TechnicalKnowledgeIndex from '@/components/TechnicalKnowledgeIndex';
import BoomerangBullpen from '@/components/BoomerangBullpen';

const Index = () => {
  const { session, addPrompt } = useSession();
  const [logs, setLogs] = useState<AgentLogEntry[]>([]);
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [agents, setAgents] = useState<AgentState[]>([]);
  const [boardTasks, setBoardTasks] = useState<RoutedTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = useCallback((log: AgentLogEntry) => setLogs((prev) => [...prev, log]), []);
  const addOutput = useCallback((output: OutputItem) => setOutputs((prev) => [...prev, output]), []);

  const handlePromptSubmit = async (prompt: string) => {
    addPrompt(prompt);
    setIsProcessing(true);
    setOutputs([]);
    setLogs([]);

    const orchestrator = new MockOrchestrator({
      onLog: addLog,
      onOutput: addOutput,
      onComplete: () => setIsProcessing(false),
      onAgentsUpdate: setAgents,
      onBoardUpdate: setBoardTasks,
    });

    await orchestrator.processPrompt(prompt);
  };

  const latestNarration = [...outputs].reverse().find((output) => output.content)?.content;
  const showEmptyState = logs.length === 0 && outputs.length === 0 && !isProcessing;

  return (
    <BrandedLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <PromptInput onSubmit={handlePromptSubmit} isProcessing={isProcessing} latestNarration={latestNarration} />

        {showEmptyState ? (
          <div className="flex-1 flex items-center justify-center"><EmptyState /></div>
        ) : (
          <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 pt-5 lg:grid-cols-2">
            <WorkspaceMonitor agents={agents} />
            <ProjectBoard tasks={boardTasks} />
            <TechnicalKnowledgeIndex />
            <BoomerangBullpen agents={agents} logs={logs} />
          </div>
        )}

        {!showEmptyState ? <AgentLog logs={logs} isActive={isProcessing} /> : null}
        {!showEmptyState ? <OutputPanel outputs={outputs} sessionId={session?.id || 'loading...'} /> : null}
      </div>
    </BrandedLayout>
  );
};

export default Index;
