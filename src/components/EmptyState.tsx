
import React from 'react';
import { Zap, Sparkles, Cpu } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
          ACHEEVY is Ready
        </h3>
        
        <p className="text-slate-300 text-lg mb-6">
          Your AI development team is standing by
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
            <Cpu className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Architecture</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
            <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Development</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
            <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Deployment</p>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm">
          Describe your project above and watch the magic happen
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
