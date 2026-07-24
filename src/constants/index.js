export const ALLOWED_BUDGETS = [
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+'
];

export const ALLOWED_STATUSES = ['New', 'Contacted', 'Closed'];

export const COOKIE_NAME = 'leaddesk_token';

export const RATE_LIMIT_CONFIG = {
  LEAD_SUBMISSION: { limit: 5, windowMs: 15 * 60 * 1000 },
  ADMIN_LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
};
