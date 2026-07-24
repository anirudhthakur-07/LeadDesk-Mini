'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import AdminHeader from '@/components/AdminHeader';
import MetricsBar from '@/components/MetricsBar';
import SearchFilterBar from '@/components/SearchFilterBar';
import LeadsTable from '@/components/LeadsTable';
import DashboardToolbar from '@/components/dashboard/DashboardToolbar';
import { sortLeads } from '@/utils/sorter';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { addToast } = useToast();
  const [admin, setAdmin] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, newLeads: 0, contacted: 0, closed: 0 });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [currentSort, setCurrentSort] = useState('NEWEST');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

  // Strict Client-Side Session Verification (Eliminates Flash of Protected Content FOPC)
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Cache-Control': 'no-cache, no-store' },
        });

        if (!res.ok) {
          if (isMounted) {
            router.replace('/login');
          }
          return;
        }

        const data = await res.json();
        if (data.success && data.admin) {
          if (isMounted) {
            setAdmin(data.admin);
            setAuthChecking(false);
          }
        } else {
          if (isMounted) {
            router.replace('/login');
          }
        }
      } catch (err) {
        if (isMounted) {
          router.replace('/login');
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Fetch active leads and summary metrics from backend ONLY after auth is verified
  const fetchLeads = useCallback(async (isManualSync = false) => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/leads', {
        headers: { 'Cache-Control': 'no-cache, no-store' },
      });

      if (res.status === 401) {
        router.replace('/login');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        setMetrics(data.metrics || { total: 0, newLeads: 0, contacted: 0, closed: 0 });
        setLastUpdatedTime(new Date().toISOString());
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

  // Execute fetchLeads strictly AFTER admin state is non-null and verified
  useEffect(() => {
    if (admin && !authChecking) {
      fetchLeads();
    }
  }, [admin, authChecking, fetchLeads]);

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

  // Reply to lead inquiry with admin note
  const handleReplyToLead = async (id, replyText) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminReply: replyText }),
      });

      if (res.ok) {
        addToast('Reply sent successfully', 'success', 3500);
        fetchLeads();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send reply.');
      }
    } catch (err) {
      addToast(err.message || 'Error sending reply', 'error', 4000);
    }
  };

  // ZERO-FOPC GUARD: Render secure full-screen loading screen while verifying session
  if (authChecking || !admin) {
    return (
      <div className="min-h-screen bg-[#09090B] bg-ambient-top flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shadow-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 font-mono">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Verifying Admin Authentication...</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xs font-normal">
            Encrypted session token verification in progress.
          </p>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard ONLY after authentication is 100% verified
  return (
    <div className="min-h-screen bg-[#09090B] bg-ambient-top text-zinc-100 flex flex-col">
      <AdminHeader adminEmail={admin?.email} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title & Operational Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center gap-3">
              <span>Leads Management</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 text-zinc-400 uppercase tracking-wider">
                Enterprise Pipeline Active
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 font-normal">
              Real-time pipeline control center with instant search, multi-criteria sorting, and export tools.
            </p>
          </div>
        </div>

        {/* Enterprise CRM Analytics Dashboard Grid */}
        <MetricsBar metrics={metrics} leads={leads} loading={loading} />

        {/* Enterprise Quick Actions Toolbar */}
        <DashboardToolbar
          search={search}
          onClearSearch={() => setSearch('')}
          activeTab={activeTab}
          onResetFilters={() => setActiveTab('All')}
          currentSort={currentSort}
          leads={processedLeads}
          totalFilteredCount={processedLeads.length}
          onRefresh={() => fetchLeads(true)}
          refreshing={refreshing}
          lastUpdatedTime={lastUpdatedTime}
        />

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
          onReplyToLead={handleReplyToLead}
          loading={loading}
          searchQuery={search}
          onClearSearch={() => setSearch('')}
        />
      </main>
    </div>
  );
}
