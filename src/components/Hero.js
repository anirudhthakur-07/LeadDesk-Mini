'use client';

import Link from 'next/link';
import { ArrowRight, Lock, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 border-b border-zinc-800/60 bg-[#09090B]">
      
      {/* Top-Center Ambient Light Beam */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), rgba(255, 255, 255, 0))',
        }}
      />

      {/* Fine Radial Dot Grid Background Pattern */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        
        {/* Asymmetrical 12-Column Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column (7 Cols): Announcement, Headline, CTAs, SLA Metrics */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Announcement Micro Pill Badge */}
            <ScrollReveal direction="down" delay={100}>
              <a
                href="/#features"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-all duration-150 cursor-pointer shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>v1.0 Production Release</span>
                <span className="text-zinc-500 font-normal">→</span>
              </a>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-left leading-[1.1] text-white">
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent block">
                  Capture High-Value Leads
                </span>
                <span className="block mt-1">
                  With{' '}
                  <span className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                    Zero Friction.
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle Copy */}
            <ScrollReveal direction="up" delay={300}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed mt-4 mb-8">
                Elevate your agency pipeline. LeadDesk Mini validates inquiries in real-time, isolates data with enterprise-grade encryption, and delivers live analytics to your admin dashboard.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="/#capture-lead"
                  className="bg-white text-zinc-950 font-semibold hover:bg-zinc-200 px-5 py-2.5 rounded-lg text-sm shadow-md shadow-[0_1px_10px_rgba(255,255,255,0.2)] transition-all duration-150 ease-out active:scale-[0.98] flex items-center gap-2"
                >
                  <span>Submit Lead Inquiry</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </a>

                <Link
                  href="/admin"
                  className="bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80 px-5 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-zinc-400" />
                  <span>Live Admin Portal</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* SLA Trust Micro-Metrics Bar */}
            <ScrollReveal direction="up" delay={500}>
              <div className="mt-10 pt-6 border-t border-zinc-800/60 flex items-center gap-8 text-xs text-zinc-400">
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">99.9%</span>
                  <span className="text-zinc-500 font-normal text-xs block">Uptime SLA</span>
                </div>
                <div className="h-8 w-px bg-zinc-800/80" />
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">&lt; 100ms</span>
                  <span className="text-zinc-500 font-normal text-xs block">API Latency</span>
                </div>
                <div className="h-8 w-px bg-zinc-800/80" />
                <div>
                  <span className="text-zinc-100 font-semibold text-sm block">100%</span>
                  <span className="text-zinc-500 font-normal text-xs block">Data Isolation</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column (5 Cols): Live Interactive CRM Preview Window */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={300}>
              <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
                
                {/* Window Titlebar Header */}
                <div className="h-10 px-4 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
                  </div>

                  <Link
                    href="/admin"
                    className="px-3 py-0.5 rounded-md bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-500 hover:text-zinc-300 font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3 h-3 text-zinc-500" />
                    <span>https://leaddesk.agency/admin</span>
                  </Link>

                  <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Pipeline</span>
                  </div>
                </div>

                {/* Card Body & Preview Analytics Grid */}
                <div className="p-4 space-y-4 bg-zinc-950/60">
                  
                  {/* 3 Grid Metric Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Total Leads</span>
                      <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block">48</span>
                      <span className="text-[10px] text-teal-400 font-medium block mt-0.5">↑ +14% week</span>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Active New</span>
                      <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block">12</span>
                      <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">Action Needed</span>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                      <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Pipeline Value</span>
                      <span className="text-lg font-semibold text-zinc-100 tracking-tight mt-0.5 block">$185k</span>
                      <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">Converted Value</span>
                    </div>
                  </div>

                  {/* Live Recent Inquiries Feed List */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 px-1 uppercase tracking-wider">
                      <span>Recent Incoming Inquiries</span>
                      <span className="text-zinc-400 font-mono">Export CSV</span>
                    </div>

                    {/* Feed Item 1 */}
                    <div className="flex items-center justify-between p-2.5 rounded-md border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs">
                          SJ
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">Sarah Jenkins</span>
                          <span className="text-[11px] text-zinc-400 block font-mono">sarah@company.com</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center rounded-md bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 text-[10px] font-medium text-teal-300">
                          New Inquiry
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5 font-mono">$5,000 - $10,000</span>
                      </div>
                    </div>

                    {/* Feed Item 2 */}
                    <div className="flex items-center justify-between p-2.5 rounded-md border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs">
                          MV
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">Marcus Vance</span>
                          <span className="text-[11px] text-zinc-400 block font-mono">marcus@techcorp.io</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                          Contacted
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5 font-mono">$10,000+</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
