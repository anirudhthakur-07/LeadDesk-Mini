'use client';

import { Shield, Zap, Lock, Database, FileSpreadsheet, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-Time Inquiry Pipeline',
    description: 'Lead form submissions stream directly to your database with live conversion indicators.',
  },
  {
    icon: Lock,
    title: 'JWT Cookie Security',
    description: 'Protected admin portal backed by HttpOnly, SameSite strict session token authentication.',
  },
  {
    icon: Database,
    title: 'Soft-Delete Data Retention',
    description: 'Lead deletions set soft flags to protect historical conversion metrics and audit history.',
  },
  {
    icon: Shield,
    title: 'MongoDB Isolated Layer',
    description: 'MongoDB Atlas integration with isolated schemas and ISP fallback DNS resolvers.',
  },
  {
    icon: FileSpreadsheet,
    title: '1-Click CSV Export',
    description: 'Export leads data view directly into CSV for CRM synchronization and offline reporting.',
  },
  {
    icon: Sparkles,
    title: '0ms Instant Multi-Search',
    description: 'Instant client-side search across names, emails, budget ranges, and statuses with Ctrl+K shortcuts.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 border-b border-zinc-800/60 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
            <span>Core Architecture</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Engineered For High-Growth Digital Agencies
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed font-normal">
            LeadDesk Mini provides the security, speed, and real-time clarity required to scale client acquisition infrastructure.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/40"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors group-hover:border-zinc-700 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
