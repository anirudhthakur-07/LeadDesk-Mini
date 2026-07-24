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
    <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl mb-6 shadow-md">
      
      {/* 0ms Instant Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Instant search by name, email, budget, status, or message..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-12 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />

        {/* Action Shortcut Badge / Clear Button */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {search ? (
            <button
              onClick={() => setSearch('')}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Clear search (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded select-none">
              <Command className="w-3 h-3 inline" />K
            </kbd>
          )}
        </div>
      </div>

      {/* Segmented Filter Pills Group */}
      <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'px-3 py-1 text-xs font-semibold text-white bg-zinc-800 border border-zinc-700/80 rounded-md shadow-sm'
                  : 'px-3 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 rounded-md transition-all cursor-pointer'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Multi-Criteria Dropdown Sorter */}
      <SortControl currentSort={currentSort} onSortChange={setCurrentSort} />

    </div>
  );
}
