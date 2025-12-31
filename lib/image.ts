/**
 * Convert image URL to correct format for Next.js Image or regular img tag
 * Handles both absolute URLs and relative paths
 */
export function getImageUrl(src: string | undefined): string {
  if (!src) return "";
  // If it's already an absolute URL, return as is
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  // Relative path - return as is, browsers will handle it
  return src;
}
