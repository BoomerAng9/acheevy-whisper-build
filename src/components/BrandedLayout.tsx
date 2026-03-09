import React from 'react';

interface BrandedLayoutProps {
  children: React.ReactNode;
}

const BrandedLayout = ({ children }: BrandedLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_45%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BrandedLayout;
