'use client';

import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_THEMES = {
  success: {
    icon: CheckCircle2,
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-950/90',
    textColor: 'text-emerald-300',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/10',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-950/90',
    textColor: 'text-rose-300',
    iconColor: 'text-rose-400',
    glowColor: 'shadow-rose-500/10',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-950/90',
    textColor: 'text-amber-300',
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/10',
  },
  info: {
    icon: Info,
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-950/90',
    textColor: 'text-blue-300',
    iconColor: 'text-blue-400',
    glowColor: 'shadow-blue-500/10',
  },
};

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-5 right-5 sm:right-6 z-50 flex max-w-sm w-full flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
        const Icon = theme.icon;

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start justify-between gap-3 rounded-2xl border ${theme.borderColor} ${theme.bgColor} p-4 shadow-xl backdrop-blur-2xl transition-all duration-300 animate-in slide-in-from-top-5 fade-in ${theme.glowColor}`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${theme.iconColor}`} />
              <div className="space-y-0.5">
                <p className={`text-xs font-semibold ${theme.textColor}`}>
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
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
