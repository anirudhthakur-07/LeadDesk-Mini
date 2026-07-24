import mongoose from 'mongoose';

/**
 * Sanitize input strings to protect against XSS and NoSQL injection attacks.
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[\{\}]/g, '')    // Remove object curly braces to prevent NoSQL operator injection
    .replace(/\0/g, '')        // Strip null bytes
    .trim();
}

export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
