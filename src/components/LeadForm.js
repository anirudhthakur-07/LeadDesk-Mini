'use client';

import { useState } from 'react';
import { CURRENCIES, BUDGET_RANGES_BY_CURRENCY } from '@/constants';
import { useToast } from '@/context/ToastContext';
import { Send, CheckCircle2, Loader2, Sparkles, ShieldCheck, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function LeadForm() {
  const { addToast } = useToast();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    budgetRange: BUDGET_RANGES_BY_CURRENCY.USD[0],
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    const newRanges = BUDGET_RANGES_BY_CURRENCY[currencyCode];
    if (newRanges && newRanges.length > 0) {
      setFormData((prev) => ({ ...prev, budgetRange: newRanges[0] }));
    }
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
        budgetRange: BUDGET_RANGES_BY_CURRENCY[selectedCurrency][0],
        message: '',
      });
    } catch (err) {
      addToast(err.message || 'An unexpected error occurred. Please try again.', 'error', 6000);
    } finally {
      setLoading(false);
    }
  };

  const activeRanges = BUDGET_RANGES_BY_CURRENCY[selectedCurrency] || BUDGET_RANGES_BY_CURRENCY.USD;

  return (
    <section id="capture-lead" className="py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column (5 Cols): Value Proposition */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6 shadow-sm">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Start Your Project</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Ready To Scale Your Digital Infrastructure?
                </span>
              </h2>

              <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-8">
                Submit your inquiry details below. Our technical team evaluates project requirements and responds with a strategic roadmap within one business day.
              </p>

              {/* Value Props List */}
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-3 transition-colors hover:bg-zinc-900/80">
                  <div className="p-2 rounded-md bg-zinc-800/60 text-emerald-400 border border-zinc-700/50 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">Strict Data Privacy</span>
                    <span className="text-xs text-zinc-400 font-normal block mt-0.5">
                      Encrypted in transit and at rest with zero third-party data sharing.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-3 transition-colors hover:bg-zinc-900/80">
                  <div className="p-2 rounded-md bg-zinc-800/60 text-emerald-400 border border-zinc-700/50 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">Guaranteed SLA Response</span>
                    <span className="text-xs text-zinc-400 font-normal block mt-0.5">
                      Direct technical evaluation by senior full-stack software architects.
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (7 Cols): Architectural Lead Form Card */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={150}>
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                
                <form onSubmit={handleSubmit}>
                  
                  {/* 2-Column Desktop Inputs: Full Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5 font-mono tracking-wide">
                        Full Name <span className="text-indigo-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:bg-zinc-950 transition-all duration-150"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5 font-mono tracking-wide">
                        Work Email <span className="text-indigo-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="sarah@company.com"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:bg-zinc-950 transition-all duration-150"
                      />
                    </div>
                  </div>

                  {/* Multi-Currency & Budget Range Selection */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-zinc-300 font-mono tracking-wide">
                        Estimated Project Budget <span className="text-indigo-400 ml-0.5">*</span>
                      </label>
                      
                      {/* Currency Selector Tabs */}
                      <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                        <Globe className="w-3 h-3 text-zinc-500 ml-1 mr-0.5" />
                        {CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleCurrencyChange(c.code)}
                            className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded transition-all ${
                              selectedCurrency === c.code
                                ? 'bg-zinc-800 text-white font-semibold border border-zinc-700/80 shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {c.code}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic 5-Range Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {activeRanges.map((range) => {
                        const isSelected = formData.budgetRange === range;
                        return (
                          <button
                            key={range}
                            type="button"
                            onClick={() => handleBudgetSelect(range)}
                            className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-all duration-150 cursor-pointer select-none ${
                              isSelected
                                ? 'bg-zinc-800 border-indigo-500/80 text-white shadow-inner ring-1 ring-indigo-500/30 font-semibold'
                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/80'
                            }`}
                          >
                            <span className="block font-mono text-[11px] whitespace-nowrap">{range}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details Textarea */}
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 font-mono tracking-wide">
                      Project Details & Goals <span className="text-indigo-400 ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your web engineering, agency audit, or custom SaaS development goals..."
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-150 resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Primary Submit Button: Crisp Solid White */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-white hover:bg-zinc-200 text-zinc-950 shadow-md transition-all duration-150 ease-out active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed border disabled:border-zinc-700/50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        <span>Processing Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
                        <span>Submit Inquiry to Agency</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
