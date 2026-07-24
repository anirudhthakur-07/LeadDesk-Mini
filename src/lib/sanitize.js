/**
 * Sanitize input strings to protect against XSS and NoSQL injection attacks.
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  // Strip HTML tags and NoSQL object curly braces while preserving currency signs ($)
  return str
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[\{\}]/g, '')    // Remove object curly braces
    .trim();
}

export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

export function sanitizePayload(payload) {
  if (!payload || typeof payload !== 'object') return {};
  
  const sanitized = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
    // Object/Array values are discarded to prevent NoSQL operator injection (e.g. { $gt: "" })
  }
  return sanitized;
}
