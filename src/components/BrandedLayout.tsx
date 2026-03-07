import React from 'react';

interface BrandedLayoutProps {
  children: React.ReactNode;
}

const BrandedLayout = ({ children }: BrandedLayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
        <div className="agent-grid-overlay" />
        <div className="agent-scanline" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BrandedLayout;
