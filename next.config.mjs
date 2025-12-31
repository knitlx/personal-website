/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },

  // Security headers
  async headers() {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Stricter CSP for production, more lenient for development
    const cspDirectives = [
      "default-src 'self';",
      // script-src: removed 'unsafe-eval', kept 'unsafe-inline' only for dev
      isDevelopment
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
        : "script-src 'self' 'unsafe-inline' https://ui-avatars.com https://cdn-icons-png.flaticon.com;",
      // style-src: 'unsafe-inline' needed for Tailwind CSS and styled-jsx
      "style-src 'self' 'unsafe-inline';",
      // Added specific domains for better control
      "img-src 'self' data: https: blob: https://ui-avatars.com https://cdn-icons-png.flaticon.com;",
      "font-src 'self' data: https://fonts.gstatic.com;",
      // Expanded connect-src for external APIs
      "connect-src 'self' https://ui-avatars.com https://cdn-icons-png.flaticon.com;",
      "frame-src 'none';",
      "object-src 'none';",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'none';",
      "upgrade-insecure-requests;",
      // Additional security directives
      "block-all-mixed-content;",
    ].join(" ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
