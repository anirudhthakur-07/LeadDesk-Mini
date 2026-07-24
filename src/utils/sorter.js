/**
 * Enterprise Sorting Engine for LeadDesk Mini
 * Provides multi-criteria sorting rules for status priority, budget range ranks,
 * timestamps, and locale-sensitive string comparisons.
 */

export const SORT_OPTIONS = [
  { id: 'NEWEST', label: 'Newest First', category: 'Date' },
  { id: 'OLDEST', label: 'Oldest First', category: 'Date' },
  { id: 'NAME_ASC', label: 'Name (A → Z)', category: 'Name' },
  { id: 'NAME_DESC', label: 'Name (Z → A)', category: 'Name' },
  { id: 'STATUS_PRIORITY', label: 'Status Priority (New → Closed)', category: 'Status' },
  { id: 'BUDGET_LOW_HIGH', label: 'Budget (Low → High)', category: 'Budget' },
  { id: 'BUDGET_HIGH_LOW', label: 'Budget (High → Low)', category: 'Budget' },
];

// Business Priority Weights for Statuses
const STATUS_WEIGHTS = {
  New: 1,
  Contacted: 2,
  Closed: 3,
};

// Numeric Rank Weights for Budget Enums
const BUDGET_WEIGHTS = {
  '$1,000 - $5,000': 1,
  '$5,000 - $10,000': 2,
  '$10,000+': 3,
};

/**
 * Helper to extract numeric rank from budget string string safely
 */
function getBudgetWeight(rangeStr) {
  if (!rangeStr) return 0;
  if (BUDGET_WEIGHTS[rangeStr]) return BUDGET_WEIGHTS[rangeStr];
  
  // Dynamic parsing fallback for custom ranges (e.g. "$2,000")
  const match = rangeStr.match(/\d+/g);
  if (match && match.length > 0) {
    return parseInt(match[0].replace(/,/g, ''), 10);
  }
  return 0;
}

/**
 * Sorts an array of leads using the specified sortOption ID
 */
export function sortLeads(leads, sortOption = 'NEWEST') {
  if (!Array.isArray(leads) || leads.length <= 1) return leads;

  // Shallow copy to prevent mutating original array state
  return [...leads].sort((a, b) => {
    switch (sortOption) {
      case 'NEWEST': {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      }

      case 'OLDEST': {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeA - timeB;
      }

      case 'NAME_ASC': {
        const nameA = (a.fullName || '').trim();
        const nameB = (b.fullName || '').trim();
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base', numeric: true });
      }

      case 'NAME_DESC': {
        const nameA = (a.fullName || '').trim();
        const nameB = (b.fullName || '').trim();
        return nameB.localeCompare(nameA, undefined, { sensitivity: 'base', numeric: true });
      }

      case 'STATUS_PRIORITY': {
        const weightA = STATUS_WEIGHTS[a.status] || 99;
        const weightB = STATUS_WEIGHTS[b.status] || 99;
        if (weightA !== weightB) return weightA - weightB;
        // Tie-breaker: Newest date first
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }

      case 'BUDGET_LOW_HIGH': {
        const rankA = getBudgetWeight(a.budgetRange);
        const rankB = getBudgetWeight(b.budgetRange);
        if (rankA !== rankB) return rankA - rankB;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }

      case 'BUDGET_HIGH_LOW': {
        const rankA = getBudgetWeight(a.budgetRange);
        const rankB = getBudgetWeight(b.budgetRange);
        if (rankA !== rankB) return rankB - rankA;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }

      default:
        return 0;
    }
  });
}
