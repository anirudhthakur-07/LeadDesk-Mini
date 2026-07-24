'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import MetricsBar from '@/components/MetricsBar';
import SearchFilterBar from '@/components/SearchFilterBar';
import LeadsTable from '@/components/LeadsTable';
import { RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, newLeads: 0, contacted: 0, closed: 0 });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch session & current admin info
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setAdmin(data.admin);
      } catch (err) {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  // Fetch leads and summary metrics
  const fetchLeads = useCallback(async () => {
    try {
      setRefreshing(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (activeTab && activeTab !== 'All') params.set('status', activeTab);

      const res = await fetch(`/api/leads?${params.toString()}`);
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        setMetrics(data.metrics || { total: 0, newLeads: 0, contacted: 0, closed: 0 });
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, activeTab, router]);

  useEffect(() => {
    if (admin) {
      fetchLeads();
    }
  }, [admin, fetchLeads]);

  // Update lead status live
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  // Delete lead record (Soft delete)
  const handleDeleteLead = async (id) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col">
      <AdminHeader adminEmail={admin?.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title & Refresh */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Leads Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time lead capture management, live search, and pipeline updates.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-slate-300 hover:text-white hover:border-brand-500/40 transition-all duration-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-brand-500' : ''}`} />
            <span>Sync Live</span>
          </button>
        </div>

        {/* Metrics Summary Bar */}
        <MetricsBar metrics={metrics} />

        {/* Search & Filter Bar with Export */}
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          leads={leads}
        />

        {/* Leads Table */}
        <LeadsTable
          leads={leads}
          onUpdateLeadStatus={handleUpdateStatus}
          onDeleteLead={handleDeleteLead}
          loading={loading}
        />
      </main>
    </div>
  );
}
