'use client';

import { useState } from 'react';
import { X, Mail, Search, Loader2, CheckCircle2, Clock, MessageSquare, ArrowRight } from 'lucide-react';

export default function CheckResponseModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setError('');
      setResults(null);

      const res = await fetch('/api/leads/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to lookup responses');
        return;
      }

      setResults(data.data);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setResults(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D0E11] border border-zinc-800/80 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Check Response</h2>
              <p className="text-[10px] text-zinc-500">View admin replies to your inquiries</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleLookup} className="px-6 py-4">
          <label className="block text-xs font-medium text-zinc-400 mb-2">
            Enter the email you used when submitting your inquiry
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700/60 text-sm text-zinc-200 placeholder-zinc-500 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              Lookup
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-rose-400">{error}</p>
          )}
        </form>

        {/* Results */}
        {results !== null && (
          <div className="px-6 pb-5 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-5 h-5 text-zinc-500" />
                </div>
                <p className="text-sm font-medium text-zinc-300">No inquiries found</p>
                <p className="text-xs text-zinc-500 mt-1">
                  No submissions found for this email address.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {results.length} {results.length === 1 ? 'Inquiry' : 'Inquiries'} Found
                </p>

                {results.map((lead, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-4 space-y-3"
                  >
                    {/* Inquiry Info */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-200 truncate">
                          {lead.budgetRange} — {lead.status}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          Submitted {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        lead.status === 'New'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    {/* Original Message */}
                    <div className="flex items-start gap-2 text-xs text-zinc-400">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      <p className="line-clamp-2">{lead.message}</p>
                    </div>

                    {/* Admin Reply */}
                    {lead.adminReply ? (
                      <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Admin Response</span>
                          {lead.repliedAt && (
                            <span className="text-[10px] text-zinc-500 ml-auto">
                              {new Date(lead.repliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed">{lead.adminReply}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Response pending — the team will get back to you soon.</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
