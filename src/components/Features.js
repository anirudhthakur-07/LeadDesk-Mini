'use client';

import { Zap, ShieldCheck, Database, FileSpreadsheet, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const BENTO_FEATURES = [
  {
    badgeText: 'VALIDATION ENGINE',
    badgeStyle: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
    iconBoxStyle: 'border border-zinc-700/50 bg-zinc-900/80 text-zinc-200',
    icon: Zap,
    title: 'Dual-Layer Validation',
    description: 'Validates lead payloads on both client inputs and server endpoints to guarantee strict data integrity.',
  },
  {
    badgeText: 'ENTERPRISE AUTH',
    badgeStyle: 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/20',
    iconBoxStyle: 'border border-indigo-500/30 bg-indigo-950/30 text-indigo-300',
    icon: ShieldCheck,
    title: 'JWT Cookie Security',
    description: 'Protected admin sessions backed by HttpOnly, SameSite strict session tokens and 12-round bcrypt hashing.',
  },
  {
    badgeText: 'DATA RETENTION',
    badgeStyle: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20',
    iconBoxStyle: 'border border-emerald-500/30 bg-emerald-950/30 text-emerald-300',
    icon: Database,
    title: 'Soft-Delete Data Model',
    description: 'Deletions apply soft flags (`isDeleted: true`) in MongoDB Atlas to protect conversion history and audit logs.',
  },
  {
    badgeText: 'CRM INTEGRATION',
    badgeStyle: 'bg-amber-950/40 text-amber-300 border border-amber-500/20',
    iconBoxStyle: 'border border-amber-500/30 bg-amber-950/30 text-amber-300',
    icon: FileSpreadsheet,
    title: '1-Click CSV Export',
    description: 'Export active lead lists directly into formatted `.csv` files for offline reporting and CRM sync.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Announcement Pill */}
        <div className="text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 shadow-inner">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span>Engineered for Production Performance</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center text-white mt-4 max-w-2xl mx-auto">
              <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Engineered For Scaling Digital Agencies
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <p className="text-zinc-400 text-base max-w-xl text-center mx-auto mt-3 font-normal leading-relaxed">
              LeadDesk Mini provides the security, speed, and real-time clarity required to manage client acquisition infrastructure.
            </p>
          </ScrollReveal>
        </div>

        {/* Technical 4-Column Bento Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12">
          {BENTO_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md p-6 overflow-hidden transition-all duration-200 ease-out hover:bg-zinc-900/90 hover:border-zinc-700/80 hover:-translate-y-0.5 shadow-xl shadow-black/40 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-zinc-700/50 before:to-transparent opacity-100 h-full">
                  {/* Top Micro Feature Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium tracking-wide ${feature.badgeStyle}`}>
                      {feature.badgeText}
                    </span>
                  </div>

                  {/* Architectural Micro Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${feature.iconBoxStyle}`}>
                    <Icon className="w-5 h-5 stroke-[1.75px]" />
                  </div>

                  {/* Card Title + Hover Arrow */}
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white mb-2 transition-colors duration-150 tracking-tight flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 shrink-0" />
                  </h3>

                  {/* Card Body Copy */}
                  <p className="text-sm text-zinc-400 font-normal leading-relaxed text-left">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
