import { ALLOWED_BUDGETS, ALLOWED_STATUSES } from '@/constants';
import { sanitizeString, validateEmail, isValidObjectId } from '@/utils/sanitize';

export function validateCreateLeadPayload(body) {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid payload body', status: 400 };
  }

  const fullName = sanitizeString(body.fullName);
  const email = sanitizeString(body.email);
  const budgetRange = sanitizeString(body.budgetRange);
  const message = sanitizeString(body.message);

  if (!fullName || fullName.length < 2 || fullName.length > 100) {
    return { isValid: false, error: 'Full Name must be between 2 and 100 characters', status: 422 };
  }

  if (!email || !validateEmail(email)) {
    return { isValid: false, error: 'Please provide a valid email address', status: 422 };
  }

  if (!budgetRange || budgetRange.length < 2 || budgetRange.length > 50) {
    return { isValid: false, error: 'Invalid budget range selected', status: 422 };
  }

  if (!message || message.length < 10 || message.length > 1000) {
    return { isValid: false, error: 'Project Message must be between 10 and 1000 characters', status: 422 };
  }

  return {
    isValid: true,
    data: {
      fullName,
      email: email.toLowerCase(),
      budgetRange,
      message,
    },
  };
}

export function validateUpdateLeadStatusPayload(id, body) {
  if (!id || !isValidObjectId(id)) {
    return { isValid: false, error: 'Invalid lead ID format', status: 400 };
  }

  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid update payload body', status: 400 };
  }

  const status = sanitizeString(body.status);
  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return { isValid: false, error: 'Invalid status. Must be New, Contacted, or Closed.', status: 422 };
  }

  return { isValid: true, id, status };
}

export function validateAdminReplyPayload(id, body) {
  if (!id || !isValidObjectId(id)) {
    return { isValid: false, error: 'Invalid lead ID format', status: 400 };
  }

  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid reply payload body', status: 400 };
  }

  const adminReply = sanitizeString(body.adminReply);
  if (!adminReply || adminReply.length < 1 || adminReply.length > 500) {
    return { isValid: false, error: 'Reply must be between 1 and 500 characters', status: 422 };
  }

  return { isValid: true, id, adminReply };
}
