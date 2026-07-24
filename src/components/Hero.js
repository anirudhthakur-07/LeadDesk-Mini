'use client';

import Link from 'next/link';
import { ArrowRight, Lock, CheckCircle, Database, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 border-b border-zinc-800/60 bg-ambient-top">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Asymmetrical Split Layout: Left Content & Right Live Preview */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Refined Typography & Headline */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Monochromatic Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Enterprise Lead Infrastructure</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">v1.0 Production</span>
            </div>

            {/* Refined Rich Linear Gradient Title */}
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
              Capture High-Value Leads With{' '}
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Zero Friction.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-normal">
              Elevate your agency pipeline. LeadDesk Mini validates inquiries in real-time, isolates data with enterprise-grade encryption, and delivers live analytics to your admin dashboard.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-zinc-300" />
                <span>Real-Time Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-zinc-300" />
                <span>JWT Cookie Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-zinc-300" />
                <span>Soft Delete Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-zinc-300" />
                <span>1-Click CSV Export</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <a
                href="#capture-lead"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-zinc-950 shadow-sm transition-all hover:bg-zinc-200 active:scale-[0.99]"
              >
                <span>Submit Lead Inquiry</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-5 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
              >
                <Lock className="h-4 w-4 text-zinc-400" />
                <span>Live Admin Portal</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex items-center gap-8 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
              <div>
                <span className="block text-base font-semibold text-white tracking-tight">99.9%</span>
                <span className="text-[11px] text-zinc-500 font-normal">Uptime SLA</span>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div>
                <span className="block text-base font-semibold text-white tracking-tight">&lt; 100ms</span>
                <span className="text-[11px] text-zinc-500 font-normal">API Latency</span>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div>
                <span className="block text-base font-semibold text-white tracking-tight">100%</span>
                <span className="text-[11px] text-zinc-500 font-normal">Data Isolation</span>
              </div>
            </div>

          </div>

          {/* Right Column: Refined Architectural Live CRM Preview Window */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1 shadow-2xl backdrop-blur-md">
              
              {/* Window Bar Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5 bg-zinc-900/90 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-[11px] font-mono text-zinc-500">https://leaddesk.agency/admin</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-400"></span>
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Live Pipeline</span>
                </div>
              </div>

              {/* Window Body: Clean CRM Analytics & Feed Mock */}
              <div className="p-5 space-y-4 bg-[#0D0E11]/90">
                
                {/* Metric Cards Mock */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Total Leads</span>
                    <span className="text-xl font-semibold text-white tracking-tight mt-0.5 block">48</span>
                    <span className="text-[10px] text-teal-400 font-medium">↑ +14% this week</span>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Active New</span>
                    <span className="text-xl font-semibold text-white tracking-tight mt-0.5 block">12</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Requires Action</span>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Closed Pipeline</span>
                    <span className="text-xl font-semibold text-white tracking-tight mt-0.5 block">$185k</span>
                    <span className="text-[10px] text-emerald-400 font-medium">Converted Value</span>
                  </div>
                </div>

                {/* Incoming Feed Rows Mock */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 px-1 uppercase tracking-wider">
                    <span>Recent Incoming Inquiries</span>
                    <span>Export CSV</span>
                  </div>

                  {/* Feed Item 1 */}
                  <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-800/40">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs">
                        SJ
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Sarah Jenkins</span>
                        <span className="text-[11px] text-zinc-400 block">sarah@company.com</span>
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
                  <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-800/40">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs">
                        MV
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Marcus Vance</span>
                        <span className="text-[11px] text-zinc-400 block">marcus@techcorp.io</span>
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
          </div>

        </div>

      </div>
    </section>
  );
}
