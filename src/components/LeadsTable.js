'use client';

import { useState } from 'react';
import { Calendar, Mail, DollarSign, MessageSquare, Trash2, Search, XCircle, Reply, Send, CheckCircle2, Loader2 } from 'lucide-react';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import StatusSelector from '@/components/ui/StatusSelector';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import EmptyState from '@/components/empty/EmptyState';
import LeadCard from '@/components/dashboard/LeadCard';

export default function LeadsTable({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onReplyToLead,
  loading,
  searchQuery,
  onClearSearch,
}) {
  const [updatingId, setUpdatingId] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

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

  // Open reply box for a lead
  const handleOpenReply = (lead) => {
    setReplyingToId(lead._id);
    setReplyText(lead.adminReply || '');
  };

  // Send admin reply
  const handleSendReply = async () => {
    if (!replyingToId || !replyText.trim()) return;
    try {
      setSendingReply(true);
      await onReplyToLead(replyingToId, replyText.trim());
      setReplyingToId(null);
      setReplyText('');
    } catch (err) {
      // Error handled by parent toast
    } finally {
      setSendingReply(false);
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
          <div key={lead._id} className="space-y-0">
            <LeadCard
              key={lead._id}
              lead={lead}
              onUpdateStatus={handleStatusChange}
              onOpenDeleteModal={handleOpenDeleteModal}
              updatingId={updatingId}
            />
            {/* Mobile Reply Button & Box */}
            <div className="px-4 pb-3">
              {lead.adminReply ? (
                <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">Admin Reply</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{lead.adminReply}</p>
                  </div>
                </div>
              ) : null}
              {replyingToId === lead._id ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    maxLength={500}
                    rows={2}
                    placeholder="Type your reply note..."
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500">{replyText.length}/500</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setReplyingToId(null); setReplyText(''); }} className="text-[10px] text-zinc-400 hover:text-white transition-colors px-2 py-1">Cancel</button>
                      <button onClick={handleSendReply} disabled={sendingReply || !replyText.trim()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        {sendingReply ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => handleOpenReply(lead)} className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 hover:text-indigo-400 transition-colors">
                  <Reply className="w-3 h-3" />
                  {lead.adminReply ? 'Edit Reply' : 'Reply'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP / TABLET VIEW (>= md / >= 768px): Refined Architectural Data Table */}
      <div className="hidden md:block rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden shadow-sm backdrop-blur-md transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0D0E11] border-b border-zinc-800/80 uppercase tracking-wider text-xs font-semibold text-zinc-400">
              <tr>
                <th className="py-3.5 px-5">Lead Name</th>
                <th className="py-3.5 px-5">Email Address</th>
                <th className="py-3.5 px-5">Budget Range</th>
                <th className="py-3.5 px-5 max-w-xs">Project Message</th>
                <th className="py-3.5 px-5">Date Submitted</th>
                <th className="py-3.5 px-5">Status & Action</th>
                <th className="py-3.5 px-5">Reply</th>
                <th className="py-3.5 px-5 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {leads.map((lead) => (
                <>
                  <tr key={lead._id} className="hover:bg-zinc-800/40 transition-colors duration-150">
                    {/* Name */}
                    <td className="py-3.5 px-5 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 font-medium text-xs">
                          {lead.fullName ? lead.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{lead.fullName}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-5">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{lead.email}</span>
                      </a>
                    </td>

                    {/* Budget Range */}
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0D0E11] border border-zinc-800 text-xs font-mono text-zinc-300">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        {lead.budgetRange}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="py-3.5 px-5 max-w-xs">
                      <div className="flex items-start gap-1.5 text-xs text-zinc-400 line-clamp-2 font-normal" title={lead.message}>
                        <MessageSquare className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{lead.message}</span>
                      </div>
                    </td>

                    {/* Date Submitted */}
                    <td className="py-3.5 px-5 whitespace-nowrap text-xs text-zinc-400 font-normal">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </td>

                    {/* Custom Enterprise Status Selector */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <StatusSelector
                        status={lead.status}
                        onChange={(newStatus) => handleStatusChange(lead._id, newStatus)}
                        isUpdating={updatingId === lead._id}
                      />
                    </td>

                    {/* Reply Action */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {lead.adminReply ? (
                        <button
                          onClick={() => handleOpenReply(lead)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Replied
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenReply(lead)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-[10px] font-medium text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                        >
                          <Reply className="w-3 h-3" />
                          Reply
                        </button>
                      )}
                    </td>

                    {/* Action Delete Trigger */}
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleOpenDeleteModal(lead)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ml-auto"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* Inline Reply Box (expands below the row) */}
                  {replyingToId === lead._id && (
                    <tr key={`reply-${lead._id}`} className="bg-zinc-900/80">
                      <td colSpan={8} className="px-5 py-4">
                        <div className="max-w-2xl space-y-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Reply className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-xs font-semibold text-zinc-200">
                              Reply to {lead.fullName}
                            </span>
                            {lead.adminReply && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Editing</span>
                            )}
                          </div>

                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            maxLength={500}
                            rows={3}
                            placeholder="Type a short reply note for this inquiry..."
                            autoFocus
                            className="w-full rounded-lg bg-[#09090B] border border-zinc-700/60 text-sm text-zinc-200 placeholder-zinc-500 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all"
                          />

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-500">
                              {replyText.length}/500 characters
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { setReplyingToId(null); setReplyText(''); }}
                                className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSendReply}
                                disabled={sendingReply || !replyText.trim()}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                              >
                                {sendingReply ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Send className="w-3.5 h-3.5" />
                                )}
                                {lead.adminReply ? 'Update Reply' : 'Send Reply'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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
