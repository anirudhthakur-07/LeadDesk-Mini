'use client';

import { Code2, BarChart3, Cpu, Rocket } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Web Engineering',
    description:
      'Full-stack Next.js web applications, headless platforms, and custom software tailored for performance and scale.',
  },
  {
    icon: BarChart3,
    title: 'Digital Marketing & Growth',
    description:
      'Omnichannel performance acquisition, conversion rate optimization (CRO), and targeted growth campaigns.',
  },
  {
    icon: Cpu,
    title: 'Automated CRM & Lead Systems',
    description:
      'Streamlined customer pipeline workflows, API integrations, and instant response lead management.',
  },
  {
    icon: Rocket,
    title: 'Product Scaling & Audits',
    description:
      'Technical architecture reviews, speed optimization, security hardening, and infrastructure monitoring.',
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Engineered for High-Impact Results
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We combine high-end design, clean code architecture, and strategic growth engines to elevate your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-panel p-6 rounded-2xl border border-dark-border hover:border-brand-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-6 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
