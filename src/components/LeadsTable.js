'use client';

import { useState } from 'react';
import { Calendar, Mail, User, DollarSign, MessageSquare, Trash2, Loader2, Search, RefreshCw, XCircle } from 'lucide-react';

export default function LeadsTable({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  loading,
  searchQuery,
  onClearSearch,
}) {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'Contacted':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Closed':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    await onUpdateLeadStatus(id, newStatus);
    setUpdatingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setDeletingId(id);
      await onDeleteLead(id);
      setDeletingId(null);
    }
  };

  // Loading Skeleton / Spinner State
  if (loading) {
    return (
      <div className="glass-panel p-16 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Fetching Live Pipeline Data</p>
          <p className="text-xs text-slate-400 mt-1">Connecting to isolated MongoDB lead repository...</p>
        </div>
      </div>
    );
  }

  // Elegant No Results Empty State
  if (!leads || leads.length === 0) {
    return (
      <div className="glass-panel p-16 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center space-y-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 text-slate-400 shadow-inner">
          {searchQuery ? <Search className="w-7 h-7 text-blue-400" /> : <XCircle className="w-7 h-7 text-slate-500" />}
        </div>

        <div className="max-w-md space-y-1">
          <h3 className="text-lg font-bold text-white">
            {searchQuery ? `No matching leads for "${searchQuery}"` : 'No lead records available'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {searchQuery
              ? 'We searched across full names, email addresses, lead statuses, budget ranges, and project messages.'
              : 'New inquiry submissions will automatically populate here in real-time.'}
          </p>
        </div>

        {searchQuery && onClearSearch && (
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Search Filter</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/80 border-b border-white/10 uppercase tracking-wider text-xs font-semibold text-slate-400">
            <tr>
              <th className="py-4 px-5">Lead Name</th>
              <th className="py-4 px-5">Email Address</th>
              <th className="py-4 px-5">Budget Range</th>
              <th className="py-4 px-5 max-w-xs">Project Message</th>
              <th className="py-4 px-5">Date Submitted</th>
              <th className="py-4 px-5">Status & Action</th>
              <th className="py-4 px-5 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-900/60 transition-colors">
                {/* Name */}
                <td className="py-4 px-5 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs">
                      {lead.fullName ? lead.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>{lead.fullName}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-5">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lead.email}</span>
                  </a>
                </td>

                {/* Budget Range */}
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    {lead.budgetRange}
                  </span>
                </td>

                {/* Message */}
                <td className="py-4 px-5 max-w-xs">
                  <div className="flex items-start gap-1.5 text-xs text-slate-300 line-clamp-2" title={lead.message}>
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{lead.message}</span>
                  </div>
                </td>

                {/* Date Submitted */}
                <td className="py-4 px-5 whitespace-nowrap text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </td>

                {/* Status Dropdown */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {updatingId === lead._id ? (
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    ) : (
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold uppercase tracking-wider cursor-pointer bg-slate-950 ${getStatusBadgeClass(
                          lead.status
                        )}`}
                      >
                        <option value="New" className="bg-slate-900 text-blue-400">
                          New
                        </option>
                        <option value="Contacted" className="bg-slate-900 text-amber-400">
                          Contacted
                        </option>
                        <option value="Closed" className="bg-slate-900 text-emerald-400">
                          Closed
                        </option>
                      </select>
                    )}
                  </div>
                </td>

                {/* Action Delete */}
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => handleDelete(lead._id)}
                    disabled={deletingId === lead._id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-40"
                    title="Delete lead"
                  >
                    {deletingId === lead._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
