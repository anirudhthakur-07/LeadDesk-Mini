import { Sparkles, MessageSquare, Award, CheckCircle2, Archive, HelpCircle } from 'lucide-react';

/**
 * Enterprise Status Configuration Registry for LeadDesk Mini
 * Refined Monochromatic / Muted Indicator Palette (Linear / Raycast Aesthetic)
 */

export const STATUS_CONFIG = {
  New: {
    label: 'New Inquiry',
    shortLabel: 'New',
    icon: Sparkles,
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-300',
    badgeBorder: 'border-teal-500/20',
    hoverBg: 'hover:bg-teal-500/20',
    glowColor: 'shadow-teal-500/5',
    weight: 1,
  },
  Contacted: {
    label: 'In Communication',
    shortLabel: 'Contacted',
    icon: MessageSquare,
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/20',
    hoverBg: 'hover:bg-amber-500/20',
    glowColor: 'shadow-amber-500/5',
    weight: 2,
  },
  Qualified: {
    label: 'Qualified Lead',
    shortLabel: 'Qualified',
    icon: Award,
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-300',
    badgeBorder: 'border-indigo-500/20',
    hoverBg: 'hover:bg-indigo-500/20',
    glowColor: 'shadow-indigo-500/5',
    weight: 3,
  },
  Closed: {
    label: 'Closed Converted',
    shortLabel: 'Closed',
    icon: CheckCircle2,
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/20',
    hoverBg: 'hover:bg-emerald-500/20',
    glowColor: 'shadow-emerald-500/5',
    weight: 4,
  },
  Archived: {
    label: 'Archived Lead',
    shortLabel: 'Archived',
    icon: Archive,
    badgeBg: 'bg-zinc-800/60',
    badgeText: 'text-zinc-400',
    badgeBorder: 'border-zinc-700/50',
    hoverBg: 'hover:bg-zinc-800',
    glowColor: 'shadow-zinc-800/5',
    weight: 5,
  },
};

// Fallback configuration for unknown or custom statuses
export const DEFAULT_STATUS_CONFIG = {
  label: 'Unknown',
  shortLabel: 'Unknown',
  icon: HelpCircle,
  badgeBg: 'bg-zinc-800/60',
  badgeText: 'text-zinc-400',
  badgeBorder: 'border-zinc-700/50',
  hoverBg: 'hover:bg-zinc-800',
  glowColor: 'shadow-zinc-800/5',
  weight: 99,
};

export function getStatusConfig(statusKey) {
  return STATUS_CONFIG[statusKey] || DEFAULT_STATUS_CONFIG;
}
