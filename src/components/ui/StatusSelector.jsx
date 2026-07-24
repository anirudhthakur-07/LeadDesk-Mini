'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { STATUS_CONFIG, getStatusConfig } from '@/constants/statusConfig';

const SELECTABLE_STATUSES = ['New', 'Contacted', 'Closed'];

export default function StatusSelector({ status, onChange, isUpdating = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentConfig = getStatusConfig(status);
  const CurrentIcon = currentConfig.icon;

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

  const handleSelect = (newStatus) => {
    if (newStatus !== status) {
      onChange(newStatus);
    }
    setIsOpen(false);
  };

  if (isUpdating) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-400">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Updating...</span>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change lead status from ${status}`}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${currentConfig.badgeBg} ${currentConfig.badgeText} ${currentConfig.badgeBorder} ${currentConfig.hoverBg}`}
      >
        <CurrentIcon className="w-3.5 h-3.5 shrink-0" />
        <span>{currentConfig.shortLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Glassmorphic Dropdown Panel */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 mt-2 w-48 rounded-2xl border border-white/15 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-white/10 mb-1">
            Update Lead Status
          </div>

          <div className="space-y-0.5">
            {SELECTABLE_STATUSES.map((statusKey) => {
              const config = STATUS_CONFIG[statusKey];
              const OptionIcon = config.icon;
              const isSelected = statusKey === status;

              return (
                <button
                  key={statusKey}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(statusKey)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? `${config.badgeBg} ${config.badgeText} font-bold border ${config.badgeBorder}`
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <OptionIcon className={`w-3.5 h-3.5 ${config.badgeText}`} />
                    <span>{config.label}</span>
                  </div>
                  {isSelected && <Check className={`w-3.5 h-3.5 ${config.badgeText}`} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
