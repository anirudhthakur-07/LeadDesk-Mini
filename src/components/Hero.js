'use client';

import { ArrowRight, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-500/30 text-brand-500 text-xs md:text-sm font-medium mb-8 shadow-glow">
          <Zap className="w-4 h-4" />
          <span>High-Performance Digital & Web Engineering</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Scale Your Brand with <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-brand-500 to-purple-400">
            Precision Engineering
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 mb-10 leading-relaxed">
          LeadDesk Digital partners with ambitious founders and fast-scaling teams to build custom web applications, revenue systems, and growth platforms.
        </p>

        {/* Value Prop Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>Modern Stack Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            <span>High-Converting UX/UI</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span>Data-Driven Scaling</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#capture-lead"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-glow transition-all duration-300 hover:scale-[1.03] text-base"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
