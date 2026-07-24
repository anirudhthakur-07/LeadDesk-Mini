'use client';

import { RefreshCw, RotateCcw, X, Download } from 'lucide-react';
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

  const handleExport = () => {
    exportLeadsToCSV(leads, `leaddesk_leads_${activeTab.toLowerCase()}_${Date.now()}.csv`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl mb-4 backdrop-blur-md">
      
      {/* Left Actions Group: Sync, Clear, Export, Time Tracker */}
      <div className="flex flex-wrap items-center gap-2">
        
        {/* Sync DB Control */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/80 text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 shadow-sm disabled:opacity-50"
          title="Refresh database records"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-zinc-300 ${refreshing ? 'animate-spin duration-700' : ''}`} />
          <span>Sync DB</span>
        </button>

        {/* Clear Search Button (Visible when searching) */}
        {isSearchActive && (
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all"
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all"
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-all disabled:opacity-40"
          title="Export current leads view to CSV"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export CSV</span>
        </button>

        {/* Live Last Updated Time Tracker */}
        <LastUpdated lastUpdatedTime={lastUpdatedTime} />
      </div>

      {/* Right Status Indicators */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
        {isSearchActive && (
          <span className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-800 text-teal-300">
            Search: &quot;{search}&quot;
          </span>
        )}

        {isFilterActive && (
          <span className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-800 text-amber-300">
            Status: {activeTab}
          </span>
        )}

        <span className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-800">
          Sort: {currentSort}
        </span>

        <span className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/60 text-white font-semibold">
          {totalFilteredCount} Result{totalFilteredCount === 1 ? '' : 's'}
        </span>
      </div>

    </div>
  );
}
