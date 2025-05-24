
import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/45b93867-2940-4907-b3ea-3e7fffb111e5.png" 
              alt="Deploy by: ACHIEVEMOR"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Deploy
            </h1>
            <p className="text-xs text-amber-400 font-medium">by: ACHIEVEMOR</p>
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
