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
      className="glass-panel rounded-2xl border border-white/10 p-5 shadow-xl transition-all hover:border-blue-500/30 space-y-4"
    >
      {/* Top Header: Lead Avatar + Name & Status Selector */}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
            {lead.fullName ? lead.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-snug">{lead.fullName}</h4>
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors mt-0.5"
            >
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[180px]">{lead.email}</span>
            </a>
          </div>
        </div>

        {/* Custom Status Selector */}
        <StatusSelector
          status={lead.status}
          onChange={(newStatus) => onUpdateStatus(lead._id, newStatus)}
          isUpdating={updatingId === lead._id}
        />
      </div>

      {/* Details Row: Budget Badge & Date */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Budget:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200">
            <DollarSign className="w-3 h-3 text-emerald-400" />
            {lead.budgetRange}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          <span>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Project Message Preview */}
      {lead.message && (
        <div className="rounded-xl bg-slate-950/60 border border-white/5 p-3 text-xs text-slate-300">
          <div className="flex items-start gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">{lead.message}</p>
          </div>
        </div>
      )}

      {/* Action Footer: Delete Button */}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={() => onOpenDeleteModal(lead)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all min-h-[44px]"
          title="Delete lead record"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete Lead</span>
        </button>
      </div>
    </div>
  );
}
