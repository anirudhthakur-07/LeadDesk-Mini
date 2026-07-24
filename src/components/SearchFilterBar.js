'use client';

import { Search, Filter, Download } from 'lucide-react';
import { exportLeadsToCSV } from '@/utils/csvExporter';

const STATUS_TABS = ['All', 'New', 'Contacted', 'Closed'];

export default function SearchFilterBar({ search, setSearch, activeTab, setActiveTab, leads }) {
  const handleExport = () => {
    exportLeadsToCSV(leads, `leaddesk_leads_${activeTab.toLowerCase()}_${Date.now()}.csv`);
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-dark-border mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Live Search Input */}
      <div className="relative w-full lg:w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lead name or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
        />
      </div>

      {/* Right Side: Status Tabs + Export Button */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end overflow-x-auto pb-2 lg:pb-0">
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
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

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
