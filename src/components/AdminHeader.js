'use client';

import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { LogOut, User } from 'lucide-react';

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
        
        {/* Brand Logo & Portal Title */}
        <div className="flex items-center gap-3">
          <Logo href="/" />
          <span className="text-zinc-700 font-mono">/</span>
          <span className="text-xs font-medium text-zinc-400 font-mono">CRM Pipeline Control</span>
        </div>

        {/* User Info Tag & Logout CTA */}
        <div className="flex items-center gap-3">
          {adminEmail && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md">
              <User className="w-3.5 h-3.5 text-zinc-500" />
              <span>{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-xs text-zinc-400 hover:text-red-400 transition-colors px-2 py-1.5 font-medium flex items-center gap-1.5 cursor-pointer"
            title="Sign out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
