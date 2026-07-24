import { Sparkles, MessageSquare, Award, CheckCircle2, Archive, HelpCircle } from 'lucide-react';

/**
 * Enterprise Status Configuration Registry for LeadDesk Mini
 * Defines color palettes, icon mappings, badges, and priority weights.
 */

export const STATUS_CONFIG = {
  New: {
    label: 'New Inquiry',
    shortLabel: 'New',
    icon: Sparkles,
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    badgeBorder: 'border-blue-500/30',
    hoverBg: 'hover:bg-blue-500/20',
    glowColor: 'shadow-blue-500/20',
    weight: 1,
  },
  Contacted: {
    label: 'In Communication',
    shortLabel: 'Contacted',
    icon: MessageSquare,
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    hoverBg: 'hover:bg-amber-500/20',
    glowColor: 'shadow-amber-500/20',
    weight: 2,
  },
  Qualified: {
    label: 'Qualified Lead',
    shortLabel: 'Qualified',
    icon: Award,
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    badgeBorder: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
    glowColor: 'shadow-purple-500/20',
    weight: 3,
  },
  Closed: {
    label: 'Closed Converted',
    shortLabel: 'Closed',
    icon: CheckCircle2,
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    hoverBg: 'hover:bg-emerald-500/20',
    glowColor: 'shadow-emerald-500/20',
    weight: 4,
  },
  Archived: {
    label: 'Archived Lead',
    shortLabel: 'Archived',
    icon: Archive,
    badgeBg: 'bg-slate-500/10',
    badgeText: 'text-slate-400',
    badgeBorder: 'border-slate-500/30',
    hoverBg: 'hover:bg-slate-500/20',
    glowColor: 'shadow-slate-500/20',
    weight: 5,
  },
};

// Fallback configuration for unknown or custom statuses
export const DEFAULT_STATUS_CONFIG = {
  label: 'Unknown',
  shortLabel: 'Unknown',
  icon: HelpCircle,
  badgeBg: 'bg-slate-500/10',
  badgeText: 'text-slate-400',
  badgeBorder: 'border-slate-500/30',
  hoverBg: 'hover:bg-slate-500/20',
  glowColor: 'shadow-slate-500/20',
  weight: 99,
};

export function getStatusConfig(statusKey) {
  return STATUS_CONFIG[statusKey] || DEFAULT_STATUS_CONFIG;
}
