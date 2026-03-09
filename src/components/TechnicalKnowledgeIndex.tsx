import { useMemo, useState } from 'react';
import { KnowledgeIndexItem } from '@/types/agent';

const seedItems: KnowledgeIndexItem[] = [
  { id: 'k1', term: 'Paywall', laymanMeaning: 'Gate premium features behind payment', technicalTranslation: 'Enforce feature access via subscription entitlements from Stripe webhooks.', category: 'payments' },
  { id: 'k2', term: 'Container Sandbox', laymanMeaning: 'Each task runs isolated in its own safe box', technicalTranslation: 'Provision ephemeral OCI containers per session with network policies and short-lived credentials.', category: 'infrastructure' },
  { id: 'k3', term: 'RLS', laymanMeaning: 'Users can only see their own data', technicalTranslation: 'Apply Supabase/Postgres row-level security policies by tenant and role claims.', category: 'security' },
  { id: 'k4', term: 'Vision Iteration', laymanMeaning: 'Agents can look at images and improve output', technicalTranslation: 'Multimodal inference loop with image embeddings, critique prompts, and stepwise refinement.', category: 'voice-vision' },
  { id: 'k5', term: 'Bullpen', laymanMeaning: 'Pool of available AI workers', technicalTranslation: 'Elastic worker registry with autoscale spawn/retire and capability tags.', category: 'agents' },
];

export default function TechnicalKnowledgeIndex() {
  const [query, setQuery] = useState('');
  const [items] = useState(seedItems);

  const filtered = useMemo(() => items.filter((item) => `${item.term} ${item.laymanMeaning} ${item.technicalTranslation}`.toLowerCase().includes(query.toLowerCase())), [items, query]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Technical Knowledge Index · Grammar Core</h3>
      <p className="mt-1 text-xs text-slate-500">Layman-to-technical converter center for natural-language understanding.</p>
      <input
        className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        placeholder="Search plain-language concepts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-3 space-y-2">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">{item.term}</p>
            <p className="text-xs text-slate-600"><strong>Layman:</strong> {item.laymanMeaning}</p>
            <p className="text-xs text-slate-700"><strong>Technical:</strong> {item.technicalTranslation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
