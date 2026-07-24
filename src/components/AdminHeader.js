'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Shield, User } from 'lucide-react';

export default function AdminHeader({ adminEmail }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Portal Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">
              LeadDesk <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 text-zinc-400">ADMIN</span>
            </span>
          </Link>
          <span className="text-zinc-700 font-mono">/</span>
          <span className="text-xs font-medium text-zinc-400">CRM Pipeline Control</span>
        </div>

        {/* User Info & Logout CTA */}
        <div className="flex items-center gap-4">
          {adminEmail && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
            title="Sign out of admin session"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-400" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
