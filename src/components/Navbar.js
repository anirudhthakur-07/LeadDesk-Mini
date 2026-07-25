'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { ArrowRight, MessageCircle } from 'lucide-react';
import CheckResponseModal from '@/components/CheckResponseModal';

export default function Navbar() {
  const [responseModalOpen, setResponseModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#09090B]/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          
          {/* Brand Logo Component */}
          <Logo href="/" />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
            <a href="/#features" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="/#capture-lead" className="hover:text-white transition-colors">
              Lead Capture
            </a>
            <button
              onClick={() => setResponseModalOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Check Response
            </button>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </nav>

          {/* CTA Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile Check Response Button */}
            <button
              onClick={() => setResponseModalOpen(true)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Check Response"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <Link
              href="/login"
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors px-2.5 py-1.5"
            >
              Sign In
            </Link>

            <a
              href="/#capture-lead"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-zinc-950 shadow-sm transition-all hover:bg-zinc-200 active:scale-[0.99]"
            >
              <span>Start Project</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-950" />
            </a>
          </div>

        </div>
      </header>

      {/* Check Response Modal */}
      <CheckResponseModal
        isOpen={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
      />
    </>
  );
}
