import crypto from 'crypto';

/**
 * Utility for CSRF defense and SameSite cookie verification.
 */
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(headerToken, cookieToken) {
  if (!headerToken || !cookieToken) return false;
  return crypto.timingSafeEqual(Buffer.from(headerToken), Buffer.from(cookieToken));
}
