
import React from 'react';
import { Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Deploy</h1>
            <p className="text-xs text-amber-400">by: ACHIEVEMOR</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-300">Walking Skeleton v1.0</p>
          <p className="text-xs text-slate-400">Start Small, Scale Smart</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
