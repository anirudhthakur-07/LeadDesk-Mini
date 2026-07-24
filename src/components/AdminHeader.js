'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, LogOut, UserCheck } from 'lucide-react';

export default function AdminHeader({ adminEmail }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              LeadDesk Admin
            </span>
            <span className="text-xs font-semibold text-brand-500 block -mt-1 tracking-wider uppercase">
              Management Suite
            </span>
          </div>
        </Link>

        {/* Right Section: Admin Badge & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{adminEmail || 'admin@leaddesk.com'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-rose-500/20 border border-dark-border hover:border-rose-500/40 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
