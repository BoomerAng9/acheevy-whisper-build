import { Link } from 'react-router-dom';
import BrandedLayout from '@/components/BrandedLayout';
import Header from '@/components/Header';

export default function Landing() {
  return (
    <BrandedLayout>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-4xl font-bold text-slate-900">Grammar · AI Delegation OS</h2>
        <p className="mt-3 max-w-3xl text-slate-600">Customer lands, submits needs, pays securely, and launches boomerangs with voice/vision capabilities.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[['1', 'Discovery', 'Landing + inquiry capture'], ['2', 'Needs Analysis', 'Natural language to technical converter'], ['3', 'Checkout + Launch', 'Stripe checkout then operations handoff']].map(([step, title, desc]) => (
            <article key={step} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs uppercase tracking-widest text-blue-600">Step {step}</p><h3 className="mt-1 text-lg text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-600">{desc}</p></article>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/needs-analysis" className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Start Needs Analysis</Link>
          <Link to="/circuit-box" className="rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">Open Circuit Box</Link>
        </div>
      </main>
    </BrandedLayout>
  );
}
