'use client';

import { ArrowRight, CheckCircle2, ShieldAlert, Zap, TrendingUp, Users, Lock, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-mesh-radial">
      {/* Subtle Background Glowing Ambient Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[120px] animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Asymmetric Value Proposition & CTAs */}
          <div className="lg:col-span-6 text-left space-y-6">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
              <span>Built for High-Growth Digital Agencies</span>
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              <span className="text-slate-300 font-normal">v1.0 Production</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              Capture High-Value Leads With <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Zero Friction.</span>
            </h1>

            {/* Subheadline Paragraph */}
            <p className="max-w-xl text-base text-slate-300 sm:text-lg leading-relaxed">
              Elevate your agency&apos;s pipeline. LeadDesk Mini validates inquiries in real-time, isolates data with enterprise-grade encryption, and delivers live analytics to your admin dashboard.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-4 py-2 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Real-Time Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>JWT Cookie Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span>Soft Delete Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span>1-Click CSV Export</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#capture-lead"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                <span>Submit Lead Inquiry</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-slate-800/80 hover:text-white"
              >
                <Lock className="h-4 w-4 text-slate-400" />
                <span>Live Admin Portal</span>
              </a>
            </div>

            {/* Mini Trust Metrics */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              <div>
                <span className="block text-lg font-bold text-white">99.9%</span>
                <span>Uptime SLA</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block text-lg font-bold text-white">&lt; 100ms</span>
                <span>API Latency</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block text-lg font-bold text-white">100%</span>
                <span>Data Isolation</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Memorable Visual Element — Interactive CRM Browser Window Preview */}
          <div className="lg:col-span-6 relative">
            
            {/* Background Glow Box */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl transition duration-500 group-hover:opacity-40" />

            {/* Mock Browser Container */}
            <div className="relative rounded-2xl border border-white/15 bg-slate-950/90 shadow-2xl shadow-blue-950/50 backdrop-blur-2xl overflow-hidden animate-float">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">https://leaddesk.agency/admin</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE CONNECTED</span>
                </div>
              </div>

              {/* Browser Interior Dashboard Content */}
              <div className="p-5 space-y-4">
                
                {/* Mock Metric Badges Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <span className="text-[11px] text-slate-400 font-medium block">Total Leads</span>
                    <span className="text-lg font-bold text-white">48</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3" /> +14% vs last week
                    </span>
                  </div>

                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                    <span className="text-[11px] text-blue-300 font-medium block">Active New</span>
                    <span className="text-lg font-bold text-blue-400">12</span>
                    <span className="text-[10px] text-blue-300 mt-0.5 block">Requires Review</span>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                    <span className="text-[11px] text-emerald-300 font-medium block">Closed Pipeline</span>
                    <span className="text-lg font-bold text-emerald-400">$185k</span>
                    <span className="text-[10px] text-emerald-300 mt-0.5 block">Converted Value</span>
                  </div>
                </div>

                {/* Mock Live Lead Stream */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Recent Incoming Inquiries</span>
                    <span className="text-blue-400 hover:underline cursor-pointer">Export CSV</span>
                  </div>

                  {/* Mock Lead Item 1 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 p-3 transition-all hover:border-blue-500/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">
                        SJ
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white">Sarah Jenkins</span>
                        <span className="block text-[11px] text-slate-400">sarah@company.com</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/30">
                        New Inquiry
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">$5,000 - $10,000</span>
                    </div>
                  </div>

                  {/* Mock Lead Item 2 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 p-3 transition-all hover:border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs">
                        MR
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white">Marcus Vance</span>
                        <span className="block text-[11px] text-slate-400">marcus@techcorp.io</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                        Contacted
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">$10,000+</span>
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
