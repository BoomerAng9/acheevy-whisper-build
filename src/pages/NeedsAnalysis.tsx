import { useState } from 'react';
import BrandedLayout from '@/components/BrandedLayout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function NeedsAnalysis() {
  const [answers, setAnswers] = useState({ goal: '', audience: '', budget: '', urgency: '', visionNotes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    localStorage.setItem('grammar-needs-analysis', JSON.stringify({ ...answers, submittedAt: new Date().toISOString() }));
    setSubmitted(true);
  };

  return (
    <BrandedLayout>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">Customer Needs Analysis</h2>
        <p className="mt-2 text-sm text-slate-600">Layman input is translated by the Grammar index into technical requirements.</p>
        <div className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <Textarea placeholder="What do you need built?" value={answers.goal} onChange={(e) => setAnswers((v) => ({ ...v, goal: e.target.value }))} />
          <Textarea placeholder="Who are your users?" value={answers.audience} onChange={(e) => setAnswers((v) => ({ ...v, audience: e.target.value }))} />
          <Textarea placeholder="Budget" value={answers.budget} onChange={(e) => setAnswers((v) => ({ ...v, budget: e.target.value }))} />
          <Textarea placeholder="Urgency" value={answers.urgency} onChange={(e) => setAnswers((v) => ({ ...v, urgency: e.target.value }))} />
          <Textarea placeholder="Vision references (images/video goals)" value={answers.visionNotes} onChange={(e) => setAnswers((v) => ({ ...v, visionNotes: e.target.value }))} />
          <Button onClick={handleSubmit}>Save Needs Analysis</Button>
          {submitted ? <p className="text-sm text-emerald-600">Saved. Continue to checkout or operations.</p> : null}
        </div>
      </main>
    </BrandedLayout>
  );
}
