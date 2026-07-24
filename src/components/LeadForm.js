'use client';

import { useState } from 'react';
import { BUDGET_RANGES } from '@/constants';
import { useToast } from '@/context/ToastContext';
import { Send, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

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
    <section id="capture-lead" className="py-20 border-b border-zinc-800/60 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Form Intro & Agency Promise */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1 text-xs font-medium text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
              <span>Start Your Project</span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl leading-tight">
              Ready To Scale Your Digital Infrastructure?
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Submit your inquiry details below. Our technical team evaluates project requirements and responds with a strategic roadmap within one business day.
            </p>

            <div className="space-y-3 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5">
                <ShieldCheck className="h-5 w-5 text-zinc-300 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Strict Data Privacy</span>
                  <span className="text-zinc-500">Encrypted in transit and at rest with zero data sharing.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Guaranteed SLA Response</span>
                  <span className="text-zinc-500">Direct evaluation by senior full-stack architects.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-md">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Email Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 block">
                      Full Name <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-lg border border-zinc-800 bg-[#0D0E11] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 block">
                      Work Email <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="sarah@company.com"
                      className="w-full rounded-lg border border-zinc-800 bg-[#0D0E11] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/20"
                    />
                  </div>
                </div>

                {/* Interactive Budget Pill Buttons */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Estimated Project Budget <span className="text-zinc-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {BUDGET_RANGES.map((range) => {
                      const isSelected = formData.budgetRange === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => handleBudgetSelect(range)}
                          className={`rounded-lg border p-3 text-center transition-all ${
                            isSelected
                              ? 'bg-zinc-800 border-zinc-600 text-white font-medium shadow-inner'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <span className="block text-xs font-mono">{range}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 block">
                    Project Details & Goals <span className="text-zinc-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your web engineering, agency audit, or custom SaaS development goals..."
                    className="w-full rounded-lg border border-zinc-800 bg-[#0D0E11] p-3.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/20"
                  />
                </div>

                {/* Primary Submit Button: Solid Crisp White */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-zinc-950 shadow-sm transition-all hover:bg-zinc-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
                      <span>Processing Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-zinc-950" />
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
