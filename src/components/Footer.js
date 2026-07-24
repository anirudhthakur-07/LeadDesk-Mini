import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090B] py-12 text-xs text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Identity */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-semibold text-white tracking-tight">LeadDesk Mini — Digital Agency Engine</p>
          <p className="text-zinc-500 font-normal">
            Enterprise lead capture infrastructure & administrative CRM pipeline.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-6 text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#capture-lead" className="hover:text-white transition-colors">
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
        <div className="text-zinc-500 text-center md:text-right font-normal">
          © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
