'use client';

import { Calendar, Mail, DollarSign, MessageSquare, Trash2 } from 'lucide-react';
import StatusSelector from '@/components/ui/StatusSelector';

export default function LeadCard({
  lead,
  onUpdateStatus,
  onOpenDeleteModal,
  updatingId,
}) {
  return (
    <div
      role="article"
      aria-label={`Lead details for ${lead.fullName}`}
      className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm transition-all hover:border-zinc-700 space-y-4 min-w-0"
    >
      {/* Top Header: Lead Avatar + Name & Status Selector */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-800/60 pb-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs shrink-0">
            {lead.fullName ? lead.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white leading-snug truncate">{lead.fullName}</h4>
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors mt-0.5 min-w-0"
            >
              <Mail className="h-3 w-3 shrink-0 text-zinc-500" />
              <span className="truncate">{lead.email}</span>
            </a>
          </div>
        </div>

        {/* Custom Status Selector */}
        <div className="shrink-0">
          <StatusSelector
            status={lead.status}
            onChange={(newStatus) => onUpdateStatus(lead._id, newStatus)}
            isUpdating={updatingId === lead._id}
          />
        </div>
      </div>

      {/* Details Row: Budget Badge & Date */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-zinc-500 font-medium shrink-0">Budget:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0D0E11] border border-zinc-800 text-xs font-mono tabular-nums text-zinc-300 truncate">
            <DollarSign className="w-3 h-3 text-emerald-400 shrink-0" />
            {lead.budgetRange}
          </span>
        </div>

        <div className="flex items-center gap-1 text-zinc-400 shrink-0 font-mono tabular-nums">
          <Calendar className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
          <span>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Project Message Preview */}
      {lead.message && (
        <div className="rounded-lg bg-[#0D0E11] border border-zinc-800/80 p-3 text-xs text-zinc-300 min-w-0">
          <div className="flex items-start gap-1.5 min-w-0">
            <MessageSquare className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed text-zinc-400 font-normal break-words">{lead.message}</p>
          </div>
        </div>
      )}

      {/* Action Footer: Delete Button with Touch Target */}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={() => onOpenDeleteModal(lead)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-rose-400 bg-zinc-900 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/20 transition-all min-h-[44px] min-w-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          title="Delete lead record"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Lead</span>
        </button>
      </div>
    </div>
  );
}
