// lib/utils.ts
export function getServerSideUrl() {
  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV;

  if (env === "development") {
    return `http://localhost:${port}`;
  } else if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  } else if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    // Fallback for other environments or unknown hosting
    return `http://localhost:${port}`;
  }
}

/**
 * Format date to locale string
 */
export function formatDate(
  dateString: string,
  locale: string = "ru-RU",
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    });
  } catch {
    return dateString;
  }
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  if (url.startsWith("/")) return true;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sleep utility for testing/delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
