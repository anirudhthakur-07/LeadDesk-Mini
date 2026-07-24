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
      {/* Backdrop Overlay */}
      <div
        onClick={() => {
          if (!isDeleting) onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-800 bg-[#121215] p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40"
          aria-label="Close delete modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Warning Badge */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Header Title & Description */}
        <div className="text-center space-y-1.5 mb-5">
          <h2 id="delete-dialog-title" className="text-lg font-semibold tracking-tight text-white">
            Delete Lead Inquiry?
          </h2>
          <p id="delete-dialog-description" className="text-xs text-zinc-400 leading-relaxed font-normal">
            You are about to soft-delete this lead record. It will be removed from active views while preserving historical audit logs.
          </p>
        </div>

        {/* Targeted Lead Callout */}
        <div className="mb-6 rounded-lg border border-zinc-800 bg-[#0D0E11] p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <User className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{lead.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Mail className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
        </div>

        {/* Error Alert Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            ref={deleteButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-500 py-2.5 text-xs font-medium text-white shadow-sm transition-all disabled:opacity-50"
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
