// Simple in-memory rate limiter for development
// For production, consider using Redis or Upstash Redis

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

export interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per interval
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions,
): { success: boolean; resetTime?: number } {
  const now = Date.now();
  const record = store.get(identifier);

  // Clean up expired records
  if (record && now > record.resetTime) {
    store.delete(identifier);
  }

  const currentRecord = store.get(identifier);

  if (!currentRecord) {
    // First request
    store.set(identifier, {
      count: 1,
      resetTime: now + options.interval,
    });
    return { success: true };
  }

  if (currentRecord.count >= options.limit) {
    // Rate limit exceeded
    return {
      success: false,
      resetTime: currentRecord.resetTime,
    };
  }

  // Increment count
  currentRecord.count++;
  return { success: true };
}

export function getRateLimitHeaders(options: RateLimitOptions): {
  "RateLimit-Limit": string;
  "RateLimit-Remaining": string;
  "RateLimit-Reset": string;
} {
  const resetTime = Date.now() + options.interval;
  return {
    "RateLimit-Limit": options.limit.toString(),
    "RateLimit-Remaining": (options.limit - 1).toString(),
    "RateLimit-Reset": new Date(resetTime).toISOString(),
  };
}

// Cleanup function to prevent memory leaks
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key);
    }
  }
}

// Run cleanup every hour
if (typeof window === "undefined") {
  setInterval(cleanupRateLimit, 60 * 60 * 1000);
}
