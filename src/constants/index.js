export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
];

export const BUDGET_RANGES_BY_CURRENCY = {
  USD: ['< $2.5k', '$2.5k - $5k', '$5k - $15k', '$15k - $50k', '$50k+'],
  EUR: ['< €2.5k', '€2.5k - €5k', '€5k - €15k', '€15k - €50k', '€50k+'],
  GBP: ['< £2k', '£2k - £5k', '£5k - £15k', '£15k - £40k', '£40k+'],
  INR: ['< ₹2L', '₹2L - ₹5L', '₹5L - ₹15L', '₹15L - ₹50L', '₹50L+'],
};

// Legacy fallback budget ranges + new multi-currency ranges
export const ALLOWED_BUDGETS = [
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  ...Object.values(BUDGET_RANGES_BY_CURRENCY).flat(),
];

export const BUDGET_RANGES = BUDGET_RANGES_BY_CURRENCY.USD;

export const ALLOWED_STATUSES = ['New', 'Contacted', 'Closed'];

export const COOKIE_NAME = 'leaddesk_token';

export const RATE_LIMIT_CONFIG = {
  LEAD_SUBMISSION: { limit: 5, windowMs: 15 * 60 * 1000 },
  ADMIN_LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
};
