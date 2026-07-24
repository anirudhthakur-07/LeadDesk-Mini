'use client';

import { useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import SortControl from './SortControl';

const TABS = ['All', 'New', 'Contacted', 'Closed'];

export default function SearchFilterBar({
  search,
  setSearch,
  activeTab,
  setActiveTab,
  currentSort,
  setCurrentSort,
  leads,
  totalFilteredCount,
}) {
  const inputRef = useRef(null);

  // Global ⌘K / Ctrl+K keyboard shortcut focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 mb-6 space-y-4 shadow-sm backdrop-blur-md">
      
      {/* Top Controls Row: Instant Search Box & Multi-Criteria Sort Picker */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Instant Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Instant search by name, email, budget, status, or message..."
            className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-zinc-800 bg-[#0D0E11] text-sm text-white placeholder-zinc-500 transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20"
          />

          {/* Action Shortcut Badge / Clear Button */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {search ? (
              <button
                onClick={() => setSearch('')}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Clear search (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 text-[10px] font-mono text-zinc-400">
                <Command className="w-3 h-3" />K
              </kbd>
            )}
          </div>
        </div>

        {/* Enterprise Multi-Criteria Sort Dropdown Control */}
        <SortControl currentSort={currentSort} onSortChange={setCurrentSort} />
      </div>

      {/* Bottom Row: Status Filter Tabs & Result Count Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-zinc-800/60">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Results Counter Summary */}
        <div className="text-xs text-zinc-400 font-normal">
          Showing <span className="font-semibold text-white">{totalFilteredCount}</span> active inquiry record{totalFilteredCount === 1 ? '' : 's'}
        </div>
      </div>

    </div>
  );
}
