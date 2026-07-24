'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '@/utils/sorter';

export default function SortControl({ currentSort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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

  const currentOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  const handleSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort leads"
        className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between gap-2 cursor-pointer min-w-[160px]"
      >
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sort: {currentOption.shortLabel}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1.5 w-56 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="px-2 py-1 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/80 mb-1">
            Sort Pipeline By
          </div>

          <div className="space-y-0.5">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === currentSort;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-zinc-800/80 text-white font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span>{option.label}</span>
                    <span className="text-[10px] text-zinc-500 font-normal">{option.description}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
