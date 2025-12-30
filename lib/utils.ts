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
