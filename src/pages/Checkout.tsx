import { useState } from 'react';
import BrandedLayout from '@/components/BrandedLayout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('starter');
  const [message, setMessage] = useState('');

  const handleCheckout = () => {
    setMessage('Stripe checkout endpoint is next: POST /api/billing/checkout-session with signed webhook handling.');
    localStorage.setItem('grammar-checkout', JSON.stringify({ email, plan, status: 'initiated' }));
  };

  return (
    <BrandedLayout>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">Checkout & Paywall</h2>
        <p className="mt-2 text-sm text-slate-600">Cloud-ready billing scaffold with Stripe integration path.</p>
        <div className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <Input placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm text-slate-700" value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="starter">Starter - $49</option>
            <option value="growth">Growth - $199</option>
            <option value="enterprise">Enterprise - Contact sales</option>
          </select>
          <Button onClick={handleCheckout}>Proceed to Secure Checkout</Button>
          {message ? <p className="text-xs text-blue-700">{message}</p> : null}
        </div>
      </main>
    </BrandedLayout>
  );
}
