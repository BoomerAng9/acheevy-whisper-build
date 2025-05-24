import React, { useEffect, useRef } from 'react';
import { CheckCircle, Clock, Zap, AlertCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  message: string;
  status: 'thinking' | 'working' | 'complete' | 'waiting';
}

interface AgentLogProps {
  logs: LogEntry[];
  isActive: boolean;
}

const AgentLog = ({ logs, isActive }: AgentLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'thinking':
        return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />;
      case 'working':
        return <Zap className="w-4 h-4 text-blue-400 animate-bounce" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'waiting':
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm flex-1 flex flex-col border-t border-slate-700/50">
      <div className="bg-slate-800/80 backdrop-blur-sm px-6 py-3 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-3 animate-pulse"></div>
          ACHEEVY Agent Activity
        </h3>
        <p className="text-sm text-slate-400">Live orchestration and communication log</p>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96"
      >
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-400 text-lg">Ready to assist</p>
            <p className="text-slate-500 text-sm">Submit a prompt to begin orchestration</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(log.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-amber-400">{log.agent}</span>
                    <span className="text-xs text-slate-500">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{log.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentLog;
