'use client';

import { useState } from 'react';
import { Calendar, Mail, DollarSign, MessageSquare, Trash2, Search, RefreshCw, XCircle } from 'lucide-react';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import StatusSelector from '@/components/ui/StatusSelector';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import EmptyState from '@/components/empty/EmptyState';
import LeadCard from '@/components/dashboard/LeadCard';

export default function LeadsTable({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  loading,
  searchQuery,
  onClearSearch,
}) {
  const [updatingId, setUpdatingId] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    await onUpdateLeadStatus(id, newStatus);
    setUpdatingId(null);
  };

  // Open enterprise delete confirmation modal
  const handleOpenDeleteModal = (lead) => {
    setLeadToDelete(lead);
    setDeleteError(null);
  };

  // Execute soft delete API call
  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await onDeleteLead(leadToDelete._id);
      setLeadToDelete(null);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete lead. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Enterprise Table Skeleton Loading State
  if (loading) {
    return <TableSkeleton rows={5} />;
  }

  // Enterprise Empty State 1: Search Query returns 0 matches
  if (searchQuery && (!leads || leads.length === 0)) {
    return (
      <EmptyState
        icon={Search}
        title={`No matching leads found for "${searchQuery}"`}
        description="We searched across full names, work email addresses, lead statuses, budget ranges, and project messages. Try refining your keywords."
        actionLabel="Clear Search Filter"
        onAction={onClearSearch}
      />
    );
  }

  // Enterprise Empty State 2: Database zero lead state
  if (!leads || leads.length === 0) {
    return (
      <EmptyState
        icon={XCircle}
        title="No Lead Inquiries Available"
        description="Your agency lead pipeline is currently empty. New project submissions from your public landing page will automatically populate here in real-time."
        actionLabel="Go to Landing Page Form"
        onAction={() => (window.location.href = '/#capture-lead')}
      />
    );
  }

  return (
    <>
      {/* MOBILE VIEW (< md / < 768px): Touch-Friendly Cards Layout */}
      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <LeadCard
            key={lead._id}
            lead={lead}
            onUpdateStatus={handleStatusChange}
            onOpenDeleteModal={handleOpenDeleteModal}
            updatingId={updatingId}
          />
        ))}
      </div>

      {/* DESKTOP / TABLET VIEW (>= md / >= 768px): Full 7-Column Data Table */}
      <div className="hidden md:block glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all">
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

                  {/* Custom Enterprise Status Selector */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <StatusSelector
                      status={lead.status}
                      onChange={(newStatus) => handleStatusChange(lead._id, newStatus)}
                      isUpdating={updatingId === lead._id}
                    />
                  </td>

                  {/* Action Delete Trigger */}
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleOpenDeleteModal(lead)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ml-auto"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(leadToDelete)}
        lead={leadToDelete}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        error={deleteError}
      />
    </>
  );
}
