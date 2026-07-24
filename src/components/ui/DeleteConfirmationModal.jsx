'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, Trash2, X, Loader2, Mail, User } from 'lucide-react';

export default function DeleteConfirmationModal({
  isOpen,
  lead,
  onClose,
  onConfirm,
  isDeleting = false,
  error = null,
}) {
  const modalRef = useRef(null);
  const deleteButtonRef = useRef(null);

  // Keyboard accessibility: ESC to close, focus trapping
  useEffect(() => {
    if (!isOpen) return;

    // Focus the cancel or delete button when opened
    deleteButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen || !lead) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop with Smooth Blur */}
      <div
        onClick={() => {
          if (!isDeleting) onClose();
        }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-rose-500/20 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl transition-all animate-in zoom-in-95 duration-200 z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
          aria-label="Close delete modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-lg shadow-rose-500/10">
          <AlertTriangle className="h-7 w-7 animate-pulse" />
        </div>

        {/* Header Title & Description */}
        <div className="text-center space-y-2 mb-5">
          <h2 id="delete-dialog-title" className="text-xl font-bold tracking-tight text-white">
            Delete Lead Inquiry?
          </h2>
          <p id="delete-dialog-description" className="text-xs text-slate-400 leading-relaxed">
            You are about to soft-delete this lead record. It will be removed from your active pipeline view while preserving historical data audit logs.
          </p>
        </div>

        {/* Targeted Lead Information Callout */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <User className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{lead.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
        </div>

        {/* Error Alert Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-white/10 bg-slate-950/60 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            ref={deleteButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 py-3 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:shadow-rose-500/40 hover:scale-[1.02] disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Lead</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
