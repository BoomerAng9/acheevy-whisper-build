import BrandedLayout from '@/components/BrandedLayout';
import Header from '@/components/Header';

export default function Account() {
  return (
    <BrandedLayout>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">User Account & Security</h2>
        <ul className="mt-4 list-disc space-y-2 rounded-xl border border-slate-200 bg-white p-5 pl-10 text-sm text-slate-700 shadow-sm">
          <li>Supabase Auth with SSO and MFA.</li>
          <li>RBAC for customer/operator/admin roles.</li>
          <li>Session revocation and suspicious activity lockout.</li>
          <li>Audit trails for Circuit Box key changes and breaker toggles.</li>
        </ul>
      </main>
    </BrandedLayout>
  );
}
