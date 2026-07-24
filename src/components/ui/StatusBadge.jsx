'use client';

import { getStatusConfig } from '@/constants/statusConfig';

export default function StatusBadge({ status, showFullLabel = false, className = '' }) {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{showFullLabel ? config.label : config.shortLabel}</span>
    </span>
  );
}
