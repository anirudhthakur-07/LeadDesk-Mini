'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '@/utils/sorter';

export default function SortControl({ currentSort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  // Close dropdown on click outside or Esc key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (optionId) => {
    onSortChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort leads by criteria"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/40 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 whitespace-nowrap"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-slate-400">Sort:</span>
        <span className="text-white font-bold">{activeOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
      </button>

      {/* Animated Dropdown Panel */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-white/10 mb-1">
            Sort Leads By
          </div>

          <div className="space-y-0.5 max-h-72 overflow-y-auto">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === currentSort;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                    isSelected
                      ? 'bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
