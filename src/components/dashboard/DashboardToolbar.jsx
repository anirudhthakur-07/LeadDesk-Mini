'use client';

import { RefreshCw, RotateCcw, X, Filter, Download, Sparkles } from 'lucide-react';
import LastUpdated from './LastUpdated';
import { exportLeadsToCSV } from '@/utils/csvExporter';

export default function DashboardToolbar({
  search,
  onClearSearch,
  activeTab,
  onResetFilters,
  currentSort,
  leads,
  totalFilteredCount,
  onRefresh,
  refreshing = false,
  lastUpdatedTime,
}) {
  const isSearchActive = Boolean(search);
  const isFilterActive = activeTab !== 'All';
  const hasActiveControls = isSearchActive || isFilterActive;

  const handleExport = () => {
    exportLeadsToCSV(leads, `leaddesk_leads_${activeTab.toLowerCase()}_${Date.now()}.csv`);
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xl">
      
      {/* Left Group: Action Buttons & Last Updated Indicator */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Sync / Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 min-h-[38px]"
          title="Refresh database records"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Sync DB</span>
        </button>

        {/* Clear Search Button (Visible when searching) */}
        {isSearchActive && (
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all min-h-[38px]"
            title="Clear active search filter"
          >
            <X className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear Search</span>
          </button>
        )}

        {/* Reset Filters Button (Visible when status tab active) */}
        {isFilterActive && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all min-h-[38px]"
            title="Reset status filter to All"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Filter</span>
          </button>
        )}

        {/* Export CSV Button */}
        <button
          onClick={handleExport}
          disabled={!leads || leads.length === 0}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40 min-h-[38px]"
          title="Export current leads view to CSV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>

        {/* Live Last Updated Time Tracker */}
        <LastUpdated lastUpdatedTime={lastUpdatedTime} />
      </div>

      {/* Right Group: Active State Indicators */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {isSearchActive && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
            Search: &quot;{search}&quot;
          </span>
        )}

        {isFilterActive && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
            Status: {activeTab}
          </span>
        )}

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-400 font-medium">
          Sort: {currentSort}
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold">
          {totalFilteredCount} Result{totalFilteredCount === 1 ? '' : 's'}
        </span>
      </div>

    </div>
  );
}
