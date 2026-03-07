import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.03]">
            <img
              src="/lovable-uploads/45b93867-2940-4907-b3ea-3e7fffb111e5.png"
              alt="Deploy by: ACHIEVEMOR"
              className="h-7 w-7 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-neutral-100">Deploy</h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">by ACHIEVEMOR</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-neutral-200">Walking Skeleton v1.0</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Start Small · Scale Smart</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
