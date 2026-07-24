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
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-sm backdrop-blur-md">
      
      {/* Left Group: Action Buttons & Last Updated Indicator */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Sync / Refresh Button: Solid White Accent */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-medium shadow-sm transition-all disabled:opacity-50 min-h-[36px]"
          title="Refresh database records"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-zinc-950 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Sync DB</span>
        </button>

        {/* Clear Search Button (Visible when searching) */}
        {isSearchActive && (
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all min-h-[36px]"
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
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all min-h-[36px]"
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
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-all disabled:opacity-40 min-h-[36px]"
          title="Export current leads view to CSV"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export CSV</span>
        </button>

        {/* Live Last Updated Time Tracker */}
        <LastUpdated lastUpdatedTime={lastUpdatedTime} />
      </div>

      {/* Right Group: Active State Indicators */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {isSearchActive && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium">
            Search: &quot;{search}&quot;
          </span>
        )}

        {isFilterActive && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
            Status: {activeTab}
          </span>
        )}

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium">
          Sort: {currentSort}
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/60 text-white font-semibold">
          {totalFilteredCount} Result{totalFilteredCount === 1 ? '' : 's'}
        </span>
      </div>

    </div>
  );
}
