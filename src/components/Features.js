'use client';

import { ShieldCheck, Zap, Database, Download, Lock, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    iconBg: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    title: 'Dual Validation Engine',
    description: 'Instant client-side feedback coupled with server-side XSS and NoSQL injection sanitization. Preserves dollar values for custom budget ranges.',
    badge: 'Zero Vulnerabilities',
  },
  {
    icon: Lock,
    iconBg: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    title: 'Enterprise Auth & JWT',
    description: 'HttpOnly SameSite=Strict cookie hygiene backed by 12 bcrypt salt rounds. Protects administrative routes and API mutations.',
    badge: 'Fail-Secure Guard',
  },
  {
    icon: Database,
    iconBg: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    title: 'Soft-Delete Data Model',
    description: 'Mongoose schema architecture preserving historical audit records with `isDeleted: true` while keeping active dashboards clutter-free.',
    badge: 'Data Audit Protection',
  },
  {
    icon: Download,
    iconBg: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    title: '1-Click CSV CRM Export',
    description: 'Export filtered lead pipelines into formatted `.csv` files for direct import into HubSpot, Salesforce, or agency CRM suites.',
    badge: 'Instant Portability',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-slate-950/60 border-t border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-400">
            <Zap className="h-3.5 w-3.5" />
            <span>Engineered for Production Performance</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Architected For Security & Digital Agency Scale
          </h2>
          <p className="text-base text-slate-400">
            Every layer is built following Clean Architecture principles, strict separation of concerns, and industry security standards.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Icon Badge */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr border ${feature.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Sub-badge */}
                <span className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300 border border-white/10 mb-3">
                  {feature.badge}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
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
