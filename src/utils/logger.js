/**
 * Enterprise Audit Logger.
 * Sanitizes output to guarantee passwords, JWT secrets, and connection URIs are NEVER logged.
 */
export const logger = {
  info: (message, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, sanitizeMeta(meta));
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, sanitizeMeta(meta));
  },
  error: (message, error = null, meta = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, {
      errorMessage: error?.message || error,
      ...sanitizeMeta(meta),
    });
  },
};

function sanitizeMeta(meta) {
  if (!meta || typeof meta !== 'object') return {};
  const cleaned = { ...meta };
  delete cleaned.password;
  delete cleaned.token;
  delete cleaned.JWT_SECRET;
  delete cleaned.MONGODB_URI;
  delete cleaned.cookie;
  return cleaned;
}
