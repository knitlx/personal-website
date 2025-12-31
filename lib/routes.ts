// API routes constants
export const API_ROUTES = {
  // Admin
  ADMIN_BLOG: "/api/admin/blog",
  ADMIN_PROJECTS: "/api/admin/projects",
  ADMIN_GALLERY: "/api/admin/gallery",
  ADMIN_UPLOAD_IMAGE: "/api/admin/upload-image",

  // Auth
  AUTH: "/api/auth/[...nextauth]",

  // Public
  CONTACT: "/api/contact",
  DOWNLOADABLE_FILES: "/api/downloadable-files",

  // Converters
  CONVERT_HTML_TO_PDF: "/api/convert-html-to-pdf",
  CONVERT_TO_PPTX: "/api/convert-to-pptx",
  PREVIEW_PPTX: "/api/preview-pptx",

  // Feeds
  RSS: "/rss.xml",
  SITEMAP: "/sitemap.xml",
} as const;

// Page routes
export const PAGE_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  PROJECTS: "/projects",
  SERVICES: "/services",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_LOGIN: "/admin/login",
} as const;

// Dynamic routes patterns
export const DYNAMIC_ROUTES = {
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  PROJECT: (slug: string) => `/projects/${slug}`,
  PROJECT_CONVERTER: "/projects/document-converter",
  ADMIN_EDIT_BLOG: (slug: string) => `/admin/blog/edit/${slug}`,
  ADMIN_EDIT_PROJECT: (slug: string) => `/admin/projects/edit/${slug}`,
  ADMIN_NEW_BLOG: "/admin/blog/new",
  ADMIN_NEW_PROJECT: "/admin/projects/new",
} as const;
