/**
 * Simple in-memory sliding window rate limiter
 */
const rateLimitMap = new Map();

export function rateLimit(ip, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + windowMs;
  } else {
    userData.count += 1;
  }

  rateLimitMap.set(ip, userData);

  // Periodically cleanup expired entries
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  const isRateLimited = userData.count > limit;
  const timeRemainingSeconds = Math.ceil((userData.resetTime - now) / 1000);

  return {
    isRateLimited,
    currentCount: userData.count,
    timeRemainingSeconds,
  };
}
