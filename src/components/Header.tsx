import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white">
            <img src="/lovable-uploads/45b93867-2940-4907-b3ea-3e7fffb111e5.png" alt="Grammar by ACHEEVY" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-slate-900">Grammar</h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">by ACHEEVY · Agent Delegation System</p>
          </div>
        </div>

        <nav className="flex gap-2 text-xs text-slate-600">
          <Link to="/" className="rounded border border-slate-200 bg-white px-2 py-1 hover:bg-slate-100">Landing</Link>
          <Link to="/needs-analysis" className="rounded border border-slate-200 bg-white px-2 py-1 hover:bg-slate-100">Needs Analysis</Link>
          <Link to="/checkout" className="rounded border border-slate-200 bg-white px-2 py-1 hover:bg-slate-100">Checkout</Link>
          <Link to="/operations" className="rounded border border-slate-200 bg-white px-2 py-1 hover:bg-slate-100">Operations</Link>
          <Link to="/circuit-box" className="rounded border border-blue-300 bg-blue-50 px-2 py-1 hover:bg-blue-100">Circuit Box</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
