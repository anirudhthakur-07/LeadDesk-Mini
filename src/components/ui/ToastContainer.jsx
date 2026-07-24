'use client';

import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_THEMES = {
  success: {
    icon: CheckCircle2,
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-[#121215]/95',
    textColor: 'text-emerald-300',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-[#121215]/95',
    textColor: 'text-rose-300',
    iconColor: 'text-rose-400',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-[#121215]/95',
    textColor: 'text-amber-300',
    iconColor: 'text-amber-400',
  },
  info: {
    icon: Info,
    borderColor: 'border-teal-500/30',
    bgColor: 'bg-[#121215]/95',
    textColor: 'text-teal-300',
    iconColor: 'text-teal-400',
  },
};

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-5 right-5 sm:right-6 z-60 flex max-w-sm w-full flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
        const Icon = theme.icon;

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start justify-between gap-3 rounded-xl border ${theme.borderColor} ${theme.bgColor} p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-5 fade-in`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${theme.iconColor}`} />
              <div className="space-y-0.5 min-w-0">
                <p className={`text-xs font-medium ${theme.textColor} break-words`}>
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
