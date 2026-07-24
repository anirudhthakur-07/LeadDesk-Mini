'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, DollarSign, User, Mail, MessageSquare } from 'lucide-react';

const BUDGET_OPTIONS = [
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+'
];

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    budgetRange: '$5,000 - $10,000',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'fullName') {
      if (!value.trim()) errorMsg = 'Full name is required';
      else if (value.trim().length < 2) errorMsg = 'Full name must be at least 2 characters';
    } else if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) errorMsg = 'Email address is required';
      else if (!emailRegex.test(value.trim())) errorMsg = 'Please enter a valid email address';
    } else if (name === 'message') {
      if (!value.trim()) errorMsg = 'Project message is required';
      else if (value.trim().length < 10) errorMsg = 'Message must be at least 10 characters';
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time field validation update
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerStatus(null);

    // Validate all fields
    const fullNameErr = validateField('fullName', formData.fullName);
    const emailErr = validateField('email', formData.email);
    const messageErr = validateField('message', formData.message);

    if (fullNameErr || emailErr || messageErr) {
      setErrors({
        fullName: fullNameErr,
        email: emailErr,
        message: messageErr,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerStatus({
          type: 'error',
          message: data.error || 'Failed to submit lead. Please try again.',
        });
      } else {
        setServerStatus({
          type: 'success',
          message: data.message || 'Thank you! Your project details have been received.',
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          budgetRange: '$5,000 - $10,000',
          message: '',
        });
        setErrors({});
      }
    } catch (err) {
      setServerStatus({
        type: 'error',
        message: 'A network error occurred. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="capture-lead" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4">
        {/* Card Container */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-dark-border shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
              Start Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Fill out the form below to connect with our senior strategy & engineering team.
            </p>
          </div>

          {/* Toast / Status Alert */}
          {serverStatus && (
            <div
              className={`mb-8 p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                serverStatus.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
              }`}
            >
              {serverStatus.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">
                  {serverStatus.type === 'success' ? 'Request Submitted!' : 'Submission Error'}
                </p>
                <p className="opacity-90">{serverStatus.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm ${
                      errors.fullName ? 'border-rose-500/80 focus:border-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@company.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Budget Range Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Estimated Budget Range <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm appearance-none bg-dark-bg cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-slate-900 text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Message Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Project Message <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project goals, timelines, and technical requirements..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm resize-none ${
                    errors.message ? 'border-rose-500/80 focus:border-rose-500' : ''
                  }`}
                />
              </div>
              {errors.message && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-base shadow-glow flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Details...</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
