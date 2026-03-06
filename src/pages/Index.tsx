
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import PromptInput from '@/components/PromptInput';
import AgentLog from '@/components/AgentLog';
import OutputPanel from '@/components/OutputPanel';
import BrandedLayout from '@/components/BrandedLayout';
import EmptyState from '@/components/EmptyState';
import { useSession } from '@/hooks/useSession';
import { MockOrchestrator } from '@/services/mockOrchestrator';

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

const Index = () => {
  const { session, addPrompt } = useSession();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = useCallback((log: LogEntry) => {
    setLogs(prev => [...prev, log]);
  }, []);

  const addOutput = useCallback((output: OutputItem) => {
    setOutputs(prev => [...prev, output]);
  }, []);

  const onComplete = useCallback(() => {
    setIsProcessing(false);
  }, []);

  const handlePromptSubmit = async (prompt: string) => {
    console.log('User submitted prompt:', prompt);
    addPrompt(prompt);
    setIsProcessing(true);
    
    // Clear previous outputs for new session
    setOutputs([]);
    
    // Create orchestrator instance
    const orchestrator = new MockOrchestrator(addLog, addOutput, onComplete);
    
    // Process the prompt
    await orchestrator.processPrompt(prompt);
  };

  const latestNarration = [...outputs].reverse().find(output => output.content)?.content;

  const showEmptyState = logs.length === 0 && outputs.length === 0 && !isProcessing;

  return (
    <BrandedLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <PromptInput 
          onSubmit={handlePromptSubmit}
          isProcessing={isProcessing}
          latestNarration={latestNarration}
        />
        
        {showEmptyState ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <AgentLog 
              logs={logs}
              isActive={isProcessing}
            />
            
            <OutputPanel 
              outputs={outputs}
              sessionId={session?.id || 'loading...'}
            />
          </div>
        )}
      </div>
    </BrandedLayout>
  );
};

export default Index;
