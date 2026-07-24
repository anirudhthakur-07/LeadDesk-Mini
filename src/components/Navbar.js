'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07090E]/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">LeadDesk</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">MINI</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Digital Agency Engine</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Agency Capabilities
          </a>
          <a href="#capture-lead" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Lead Capture
          </a>
          <Link href="/login" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Admin Portal
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:text-white sm:block"
          >
            Sign In
          </Link>
          <a
            href="#capture-lead"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-200 animate-pulse" />
            <span>Start Project</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </header>
  );
}
