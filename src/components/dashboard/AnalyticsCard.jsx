'use client';

import Skeleton from '@/components/skeleton/Skeleton';

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  badgeText,
  badgeVariant = 'neutral',
  icon: Icon,
  loading = false,
  borderTrimColor = 'border-l-zinc-500',
}) {
  const getBadgeStyle = (variant) => {
    switch (variant) {
      case 'info':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      default:
        return 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50';
    }
  };

  if (loading) {
    return (
      <div className={`rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 shadow-sm space-y-3 ${borderTrimColor}`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 bg-zinc-800" />
          <Skeleton className="h-7 w-7 rounded-lg bg-zinc-800" />
        </div>
        <Skeleton className="h-8 w-16 bg-zinc-800" />
        <Skeleton className="h-3 w-32 bg-zinc-800" />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${title} Analytics Card`}
      className={`group relative rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 shadow-sm backdrop-blur-md transition-all duration-150 hover:border-zinc-700/80 hover:bg-zinc-900/80 ${borderTrimColor}`}
    >
      {/* Top Bar: Label & Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-zinc-800/60 text-zinc-300 flex items-center justify-center border border-zinc-700/50">
            <Icon className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* Metric Value Display */}
      <div className="flex items-baseline justify-between gap-2 mt-3 mb-1">
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
          {value}
        </h3>

        {badgeText && (
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium ${getBadgeStyle(
              badgeVariant
            )}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Bottom Sub-label / Trend */}
      {subtitle && (
        <p className="text-[11px] font-mono text-zinc-500 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
