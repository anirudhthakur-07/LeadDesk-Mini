'use client';

import { useState } from 'react';
import { Calendar, Mail, User, DollarSign, MessageSquare, Trash2, Loader2, CheckCircle2 } from 'lucide-react';

export default function LeadsTable({ leads, onUpdateLeadStatus, onDeleteLead, loading }) {
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

  if (loading) {
    return (
      <div className="glass-panel p-12 rounded-2xl border border-dark-border flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading leads data...</p>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-2xl border border-dark-border text-center">
        <p className="text-slate-400 text-base font-medium">No leads match your current search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl border border-dark-border overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 border-b border-dark-border uppercase tracking-wider text-xs font-semibold text-slate-400">
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
          <tbody className="divide-y divide-dark-border text-slate-200">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-dark-hover transition-colors">
                {/* Name */}
                <td className="py-4 px-5 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{lead.fullName}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-5">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-brand-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lead.email}</span>
                  </a>
                </td>

                {/* Budget Range */}
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-300">
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
                      <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                    ) : (
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider cursor-pointer bg-dark-bg ${getStatusBadgeClass(
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
