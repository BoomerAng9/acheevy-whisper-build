import { Zap, Sparkles, Cpu } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="relative mb-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500"><Zap className="h-10 w-10 text-white" /></div>
          <div className="absolute right-24 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400"><Sparkles className="h-4 w-4 text-white" /></div>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-900">Grammar is Ready</h3>
        <p className="mb-6 text-slate-600">Your boomerang team is waiting for mission brief.</p>
        <div className="mb-6 grid grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><Cpu className="mx-auto mb-1 h-5 w-5 text-blue-600" />Architecture</div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><Zap className="mx-auto mb-1 h-5 w-5 text-indigo-600" />Execution</div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><Sparkles className="mx-auto mb-1 h-5 w-5 text-amber-500" />Optimization</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
