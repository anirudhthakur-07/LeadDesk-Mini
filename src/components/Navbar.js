'use client';

import Link from 'next/link';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              LeadDesk
            </span>
            <span className="text-xs font-semibold text-brand-500 block -mt-1 tracking-wider uppercase">
              Digital Agency
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-dark-hover transition-colors"
          >
            <Shield className="w-4 h-4 text-brand-500" />
            <span>Admin Login</span>
          </Link>

          <a
            href="#capture-lead"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
