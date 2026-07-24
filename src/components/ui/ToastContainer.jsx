'use client';

import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_THEMES = {
  success: {
    icon: CheckCircle2,
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-[#0D0E11]/95',
    textColor: 'text-zinc-100',
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-rose-500/40',
    bgColor: 'bg-[#0D0E11]/95',
    textColor: 'text-zinc-100',
    iconColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-[#0D0E11]/95',
    textColor: 'text-zinc-100',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  info: {
    icon: Info,
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-[#0D0E11]/95',
    textColor: 'text-zinc-100',
    iconColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
};

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex w-full max-w-md flex-col gap-2.5 px-4 pointer-events-none items-center"
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
        const Icon = theme.icon;

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 w-full rounded-xl border ${theme.borderColor} ${theme.bgColor} px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-top-4 fade-in`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${theme.badgeBg} shrink-0`}>
                <Icon className={`h-4 w-4 ${theme.iconColor}`} />
              </div>
              <p className={`text-xs font-medium ${theme.textColor} leading-normal break-words`}>
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
