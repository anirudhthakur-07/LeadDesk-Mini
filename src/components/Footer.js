'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090B] py-12 text-xs text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Identity with Logo Component */}
        <div className="space-y-2 text-center md:text-left">
          <Logo href="/" />
          <p className="text-zinc-500 font-normal max-w-sm">
            Enterprise lead capture infrastructure & administrative CRM pipeline management.
          </p>
        </div>

        {/* Center: Audited Navigation Links */}
        <div className="flex items-center gap-6 text-zinc-400">
          <a href="/#features" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="/#capture-lead" className="hover:text-white transition-colors">
            Lead Capture
          </a>
          <Link href="/admin" className="hover:text-white transition-colors">
            Admin Portal
          </Link>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-zinc-400"
          >
            Digital Heroes Co.
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-zinc-500 text-center md:text-right font-normal font-mono">
          © {new Date().getFullYear()} LeadDesk PRO. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
