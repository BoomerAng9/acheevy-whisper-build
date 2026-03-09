import { useEffect, useMemo, useState } from 'react';
import BrandedLayout from '@/components/BrandedLayout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IntegrationConnector, loadConnectors, saveConnectors } from '@/services/circuitBoxStore';

export default function CircuitBox() {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>([]);

  useEffect(() => { setConnectors(loadConnectors()); }, []);
  const enabledCount = useMemo(() => connectors.filter((connector) => connector.enabled).length, [connectors]);

  const updateConnector = (id: string, patch: Partial<IntegrationConnector>) => {
    setConnectors((prev) => {
      const next = prev.map((connector) => (connector.id === id ? { ...connector, ...patch } : connector));
      saveConnectors(next);
      return next;
    });
  };

  return (
    <BrandedLayout>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">Circuit Box</h2>
        <p className="mt-2 text-sm text-slate-600">Electrician-style command center for API connectors, OpenSandbox, and cloud virtual computer controls.</p>
        <p className="mt-1 text-xs text-blue-700">{enabledCount}/{connectors.length} circuits energized</p>

        <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
          <p className="font-semibold">Cloud recommendation for sandboxed sessions</p>
          <p className="mt-1">Use Alibaba OpenSandbox (or equivalent Firecracker container layer) per session, attach short-lived credentials, route all egress through policy gateway, and spin virtual-browser workers for vision coding traces.</p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {connectors.map((connector) => (
            <article key={connector.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{connector.label}</h3>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{connector.category}</p>
                </div>
                <Button variant={connector.enabled ? 'default' : 'outline'} onClick={() => updateConnector(connector.id, { enabled: !connector.enabled })}>
                  {connector.enabled ? 'Breaker ON' : 'Breaker OFF'}
                </Button>
              </div>
              <p className="mt-2 text-xs text-slate-600">{connector.notes}</p>
              <div className="mt-3"><Input placeholder="Paste API key" value={connector.key} onChange={(e) => updateConnector(connector.id, { key: e.target.value })} /></div>
            </article>
          ))}
        </div>
      </main>
    </BrandedLayout>
  );
}
