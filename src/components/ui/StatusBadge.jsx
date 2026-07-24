'use client';

import { getStatusConfig } from '@/constants/statusConfig';

export default function StatusBadge({ status, showFullLabel = false, className = '' }) {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border backdrop-blur-md transition-all ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${className}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{showFullLabel ? config.label : config.shortLabel}</span>
    </span>
  );
}
