'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import AdminHeader from '@/components/AdminHeader';
import MetricsBar from '@/components/MetricsBar';
import SearchFilterBar from '@/components/SearchFilterBar';
import LeadsTable from '@/components/LeadsTable';
import { RefreshCw } from 'lucide-react';
import { sortLeads } from '@/utils/sorter';

export default function AdminDashboard() {
  const router = useRouter();
  const { addToast } = useToast();
  const [admin, setAdmin] = useState(null);
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, newLeads: 0, contacted: 0, closed: 0 });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [currentSort, setCurrentSort] = useState('NEWEST');
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

  // Fetch active leads and summary metrics from backend
  const fetchLeads = useCallback(async (isManualSync = false) => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/leads');
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        setMetrics(data.metrics || { total: 0, newLeads: 0, contacted: 0, closed: 0 });
        if (isManualSync) {
          addToast('Pipeline synchronized with MongoDB Atlas', 'info', 3000);
        }
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
      addToast('Failed to fetch lead pipeline data.', 'error', 4000);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router, addToast]);

  useEffect(() => {
    if (admin) {
      fetchLeads();
    }
  }, [admin, fetchLeads]);

  // Combined Pipeline: Filter by Tab ➔ Filter by Search ➔ Sort by Multi-Criteria Engine
  const processedLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    // 1. Filter Stage
    const filtered = leads.filter((lead) => {
      // Status Tab Filter
      if (activeTab !== 'All' && lead.status !== activeTab) {
        return false;
      }

      // Empty search term matches all leads in active tab
      if (!query) return true;

      // Multi-Field Search Matching: Name, Email, Status, Budget, Message
      const nameMatch = lead.fullName ? lead.fullName.toLowerCase().includes(query) : false;
      const emailMatch = lead.email ? lead.email.toLowerCase().includes(query) : false;
      const statusMatch = lead.status ? lead.status.toLowerCase().includes(query) : false;
      const budgetMatch = lead.budgetRange ? lead.budgetRange.toLowerCase().includes(query) : false;
      const messageMatch = lead.message ? lead.message.toLowerCase().includes(query) : false;

      return nameMatch || emailMatch || statusMatch || budgetMatch || messageMatch;
    });

    // 2. Sort Stage using Enterprise Sorter Utility
    return sortLeads(filtered, currentSort);
  }, [leads, search, activeTab, currentSort]);

  // Update lead status live
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        addToast(`Lead status updated to ${newStatus}`, 'success', 3500);
        fetchLeads();
      } else {
        throw new Error('Failed to update status.');
      }
    } catch (err) {
      addToast(err.message || 'Error updating lead status', 'error', 4000);
    }
  };

  // Delete lead record (Soft delete)
  const handleDeleteLead = async (id) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        addToast('Lead inquiry soft-deleted successfully', 'info', 3500);
        fetchLeads();
      } else {
        throw new Error('Failed to delete lead.');
      }
    } catch (err) {
      addToast(err.message || 'Error deleting lead', 'error', 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col">
      <AdminHeader adminEmail={admin?.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title & Sync Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Leads Management</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                Toast System Active
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Enterprise pipeline analytics, instant search, multi-criteria sorting, and toast notifications.
            </p>
          </div>

          <button
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-slate-900/60 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/40 transition-all duration-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-400' : ''}`} />
            <span>Sync DB</span>
          </button>
        </div>

        {/* Enterprise CRM Analytics Dashboard Grid */}
        <MetricsBar metrics={metrics} leads={leads} loading={loading} />

        {/* Instant Search, Multi-Criteria Sort & Filter Bar */}
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
          leads={processedLeads}
          totalFilteredCount={processedLeads.length}
        />

        {/* Leads Table with Processed (Filtered & Sorted) Leads */}
        <LeadsTable
          leads={processedLeads}
          onUpdateLeadStatus={handleUpdateStatus}
          onDeleteLead={handleDeleteLead}
          loading={loading}
          searchQuery={search}
          onClearSearch={() => setSearch('')}
        />
      </main>
    </div>
  );
}
