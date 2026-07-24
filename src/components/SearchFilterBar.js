'use client';

import { useRef, useEffect } from 'react';
import { Search, Filter, Download, X, Command } from 'lucide-react';
import { exportLeadsToCSV } from '@/utils/csvExporter';

const STATUS_TABS = ['All', 'New', 'Contacted', 'Closed'];

export default function SearchFilterBar({
  search,
  setSearch,
  activeTab,
  setActiveTab,
  leads,
  totalFilteredCount,
}) {
  const inputRef = useRef(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K to focus search input, Esc to clear
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && search) {
        setSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [search, setSearch]);

  const handleExport = () => {
    exportLeadsToCSV(leads, `leaddesk_leads_${activeTab.toLowerCase()}_${Date.now()}.csv`);
  };

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4 transition-all">
      
      {/* Premium Instant Search Input */}
      <div className="relative w-full lg:w-96 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
        
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Instant search by name, email, status, budget..."
          aria-label="Instant search leads"
          className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-white/10 bg-slate-950/70 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        {/* Action Controls inside Search Bar */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {search ? (
            <button
              onClick={handleClear}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Clear search (Esc)"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-400 bg-slate-900 border border-white/10">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          )}
        </div>
      </div>

      {/* Right Side: Status Tabs + Matching Count + Export Button */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end overflow-x-auto pb-2 lg:pb-0">
        
        {/* Status Filtering Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Live Filtered Result Counter */}
        {search && (
          <span className="hidden xl:inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium whitespace-nowrap">
            {totalFilteredCount} match{totalFilteredCount === 1 ? '' : 'es'}
          </span>
        )}

        {/* Export CSV Button */}
        <button
          onClick={handleExport}
          disabled={!leads || leads.length === 0}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          title="Export current leads view to CSV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

    </div>
  );
}
