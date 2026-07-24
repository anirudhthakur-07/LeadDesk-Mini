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
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm space-y-3">
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
      className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/40"
    >
      {/* Header: Title & Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Metric Display */}
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-3xl font-semibold tracking-tight text-white">
          {value}
        </h3>

        {badgeText && (
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${getBadgeStyle(
              badgeVariant
            )}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Subtitle / Context */}
      {subtitle && (
        <p className="mt-2 text-xs font-normal text-zinc-400 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
