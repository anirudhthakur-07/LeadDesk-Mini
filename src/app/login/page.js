'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { Shield, Mail, Lock, LogIn, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      addToast('Please enter both email and password.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error || 'Authentication failed. Please check your credentials.';
        setError(errMsg);
        addToast(errMsg, 'error', 5000);
      } else {
        addToast(`Successfully authenticated as ${email}`, 'success', 4000);
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      const errMsg = 'An unexpected network error occurred. Please try again.';
      setError(errMsg);
      addToast(errMsg, 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] bg-ambient-top flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        {/* Architectural Login Card */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center mx-auto mb-3 text-white">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Admin Authentication</h1>
            <p className="text-xs text-zinc-400 mt-1 font-normal">Sign in to manage lead pipelines</p>
          </div>

          {/* Seed Notice */}
          <div className="mb-6 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
            <p className="font-medium text-zinc-300 mb-0.5">Default Admin Credentials:</p>
            <p className="opacity-90 font-mono text-[11px] text-zinc-400">admin@leaddesk.com / AdminPassword123!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@leaddesk.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-[#0D0E11] text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-[#0D0E11] text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20"
                  required
                />
              </div>
            </div>

            {/* Primary Action Button: Solid Crisp White */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-sm shadow-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate</span>
                  <LogIn className="w-4 h-4 text-zinc-950" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
