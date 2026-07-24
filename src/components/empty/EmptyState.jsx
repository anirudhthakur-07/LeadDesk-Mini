'use client';

import { ReactNode } from 'react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  illustration,
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className="glass-panel rounded-3xl border border-white/10 p-12 sm:p-16 text-center flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
    >
      {/* Visual Illustration or Icon Badge */}
      {illustration ? (
        <div className="mb-2">{illustration}</div>
      ) : Icon ? (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10">
          <Icon className="h-8 w-8" />
        </div>
      ) : null}

      {/* Typography & Guidance Copy */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      {/* Action CTA Buttons */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{actionLabel}</span>
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
            >
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
