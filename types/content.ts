// Shared cache types used by both content.ts and generate-content-cache.ts
export interface CacheItem {
  slug: string;
  title?: string;
  description?: string;
  creationDate?: string;
  updateDate?: string;
  projectIcon?: string;
  icon?: string;
  shortDescriptionHomepage?: string;
  shortDescriptionProjectsPage?: string;
  shortDescription?: string;
  pageDescription?: string;
  trylink?: string;
  introDescription?: string;
  fullDescription?: string;
  date?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoTags?: string;
  canonicalUrl?: string;
  openGraphImage?: string;
  [key: string]: unknown;
}

export interface ContentCache {
  blogs: CacheItem[];
  projects: CacheItem[];
  generatedAt: string;
}
