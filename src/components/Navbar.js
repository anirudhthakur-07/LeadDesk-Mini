'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090B]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        
        {/* Brand Logo & Tag */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-900 text-white shadow-sm transition-all group-hover:border-zinc-500">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              LeadDesk <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 text-zinc-400">MINI</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">Digital Agency Engine</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#capture-lead" className="hover:text-white transition-colors">
            Lead Capture
          </a>
          <Link href="/admin" className="hover:text-white transition-colors">
            Admin Portal
          </Link>
        </nav>

        {/* CTA Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors px-2.5 py-1.5"
          >
            Sign In
          </Link>

          <a
            href="#capture-lead"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-medium text-zinc-950 shadow-sm transition-all hover:bg-zinc-200 active:scale-[0.99]"
          >
            <span>Start Project</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-950" />
          </a>
        </div>

      </div>
    </header>
  );
}
