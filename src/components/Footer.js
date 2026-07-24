'use client';

import Link from 'next/link';
import { Sparkles, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-dark-border py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-300">
            &copy; {new Date().getFullYear()} LeadDesk Digital Agency. All rights reserved.
          </span>
        </div>

        {/* Mandatory Task Credit Line (CRITICAL) */}
        <div className="text-sm text-slate-400 font-medium">
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 underline underline-offset-4 font-semibold transition-colors"
          >
            Digital Heroes Training Task
          </a>
        </div>

        {/* Quick Admin Link */}
        <div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-brand-500" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
