import { sanitizeString, validateEmail } from '@/utils/sanitize';

export function validateLoginPayload(body) {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid authentication request', status: 400 };
  }

  const email = sanitizeString(body.email);
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return { isValid: false, error: 'Email and password are required', status: 400 };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: 'Invalid email address format', status: 400 };
  }

  return {
    isValid: true,
    data: {
      email: email.toLowerCase(),
      password,
    },
  };
}
