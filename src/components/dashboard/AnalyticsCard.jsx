'use client';

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  iconColor = 'text-blue-400',
  iconBg = 'bg-blue-500/10 border-blue-500/20',
  borderColor = 'border-white/10 hover:border-blue-500/30',
  loading = false,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-slate-800" />
          <div className="h-10 w-10 rounded-xl bg-slate-800" />
        </div>
        <div className="h-8 w-16 rounded bg-slate-800" />
        <div className="h-3 w-32 rounded bg-slate-800" />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${title} Analytics Card`}
      className={`group relative rounded-2xl border bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderColor}`}
    >
      {/* Card Header: Title & Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
          {title}
        </span>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      </div>

      {/* Large Metric Display */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      {/* Subtitle & Badge Row */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
        <p className="text-xs text-slate-400 line-clamp-1">
          {subtitle}
        </p>
        {badgeText && (
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold border ${badgeColor} shrink-0`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
