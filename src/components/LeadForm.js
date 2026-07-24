'use client';

import { useState } from 'react';
import { BUDGET_RANGES } from '@/constants';
import { useToast } from '@/context/ToastContext';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

export default function LeadForm() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    budgetRange: BUDGET_RANGES[0],
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (range) => {
    setFormData((prev) => ({ ...prev, budgetRange: range }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit lead inquiry.');
      }

      addToast('Thank you! Your project inquiry has been received. Our agency team will reach out within 24 hours.', 'success', 5000);

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        budgetRange: BUDGET_RANGES[0],
        message: '',
      });
    } catch (err) {
      addToast(err.message || 'An unexpected error occurred. Please try again.', 'error', 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="capture-lead" className="relative py-20 bg-mesh-radial">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Form Intro & Agency Promise */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Start Your Project</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
              Ready To Scale Your Digital Infrastructure?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Submit your inquiry details below. Our technical team evaluates project requirements and responds with a strategic roadmap within one business day.
            </p>

            <div className="space-y-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-3.5">
                <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Strict Data Privacy</span>
                  <span className="text-slate-400">Encrypted in transit and at rest with zero data sharing.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-3.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Guaranteed SLA Response</span>
                  <span className="text-slate-400">Direct evaluation by senior full-stack architects.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Split Glass Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/15 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Email Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-200">
                      Full Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-200">
                      Work Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="sarah@company.com"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Custom Budget Selection Cards */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Estimated Project Budget <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => handleBudgetSelect(range)}
                        className={`rounded-xl border p-3 text-center transition-all ${
                          formData.budgetRange === range
                            ? 'border-blue-500 bg-blue-500/15 text-blue-300 font-semibold shadow-lg shadow-blue-500/10'
                            : 'border-white/10 bg-slate-950/60 text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs">{range}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Project Details & Goals <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your web engineering, agency audit, or custom SaaS development goals..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.01] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      <span>Submit Inquiry to Agency</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
