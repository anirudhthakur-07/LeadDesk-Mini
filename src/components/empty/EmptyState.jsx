'use client';

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
      className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-12 sm:p-16 text-center flex flex-col items-center justify-center space-y-5 animate-in fade-in zoom-in-95 duration-200 shadow-sm backdrop-blur-md"
    >
      {/* Visual Illustration or Icon Badge */}
      {illustration ? (
        <div className="mb-1">{illustration}</div>
      ) : Icon ? (
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}

      {/* Typography & Guidance Copy */}
      <div className="max-w-md space-y-1.5">
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-normal">{description}</p>
      </div>

      {/* Action CTA Buttons */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-zinc-950 shadow-sm transition-all hover:bg-zinc-200 active:scale-[0.99]"
            >
              <span>{actionLabel}</span>
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
