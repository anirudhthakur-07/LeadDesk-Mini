'use client';

import { Users, AlertCircle, PhoneCall, CheckCircle } from 'lucide-react';

export default function MetricsBar({ metrics }) {
  const cards = [
    {
      label: 'Total Leads',
      value: metrics?.total || 0,
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      label: 'New Leads',
      value: metrics?.newLeads || 0,
      icon: AlertCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Contacted',
      value: metrics?.contacted || 0,
      icon: PhoneCall,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'Closed Deals',
      value: metrics?.closed || 0,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`glass-panel p-5 rounded-2xl border ${card.borderColor} flex items-center justify-between shadow-md`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {card.label}
              </p>
              <h3 className="text-3xl font-extrabold text-white">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
