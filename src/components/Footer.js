'use client';

import Link from 'next/link';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070B] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">LeadDesk Mini</span>
              <span className="block text-xs text-slate-400">Enterprise Digital Agency Infrastructure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="transition-colors hover:text-white">Capabilities</a>
            <a href="#capture-lead" className="transition-colors hover:text-white">Submit Lead</a>
            <Link href="/login" className="transition-colors hover:text-white">Admin Portal</Link>
          </div>

        </div>

        {/* Bottom Credits & Mandatory Task Credit Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </div>

          {/* MANDATORY CREDIT LINK FOR DIGITAL HEROES TASK */}
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span>Built for</span>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-semibold transition-colors"
            >
              Digital Heroes Training Task
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
