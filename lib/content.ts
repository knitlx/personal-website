import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Cache file structure
interface CacheItem {
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

interface ContentCache {
  blogs: CacheItem[];
  projects: CacheItem[];
  generatedAt: string;
}

// In-memory cache to avoid reading JSON file on every request
let memoryCache: ContentCache | null = null;

// Define a more comprehensive ContentItem interface
export interface ContentItem {
  slug: string;
  title?: string;
  description?: string; // Optional description
  articleBody?: string; // Optional for blog posts
  content?: string; // Content field (for some pages)
  creationDate?: string; // Explicitly add creationDate
  updateDate?: string; // Explicitly add updateDate
  // Common project fields
  projectIcon?: string;
  icon?: string;
  shortDescriptionHomepage?: string;
  shortDescriptionProjectsPage?: string;
  pageDescription?: string; // Legacy field name
  trylink?: string;
  introDescription?: string;
  fullDescription?: string;
  // Common blog fields
  date?: string;
  shortDescription?: string;
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoTags?: string;
  canonicalUrl?: string;
  openGraphImage?: string;
  [key: string]: unknown; // Allow additional properties from frontmatter
}

// Define options interface for getAllContent
interface GetAllContentOptions {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  filterBy?: string; // e.g., "title", "description", "category"
  filterValue?: string; // value to filter by
}

const contentDirectory = path.join(process.cwd(), "content");

// Load cache from JSON file (with in-memory caching)
function loadCache(): ContentCache {
  // Return in-memory cache if available
  if (memoryCache) {
    return memoryCache;
  }

  const cachePath = path.join(process.cwd(), "public", "content-cache.json");

  if (!fs.existsSync(cachePath)) {
    console.warn(
      "Content cache file not found. Generate it with: npm run cache:generate",
    );
    return { blogs: [], projects: [], generatedAt: new Date().toISOString() };
  }

  try {
    const cacheContent = fs.readFileSync(cachePath, "utf-8");
    memoryCache = JSON.parse(cacheContent) as ContentCache;
    return memoryCache!;
  } catch (error) {
    console.error("Error loading content cache:", error);
    return { blogs: [], projects: [], generatedAt: new Date().toISOString() };
  }
}

// Get all unique tags from blog posts
export function getAllTags(): string[] {
  const cache = loadCache();
  const allTags = cache.blogs.flatMap(
    (post) => (post.tags as string[]) ?? [],
  );
  return [...new Set(allTags)];
}

// Get cached metadata for a collection
export function getCachedMetadata(
  collection: "blog" | "projects",
): CacheItem[] {
  const cache = loadCache();
  return collection === "blog" ? cache.blogs : cache.projects;
}

export function getSlugs(collection: string) {
  const cache = loadCache();
  const items = collection === "blog" ? cache.blogs : cache.projects;
  return items.map((item) => item.slug);
}

export function getMarkdownFile(collection: string, slug: string) {
  const fullPath = path.join(contentDirectory, collection, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content, slug };
}

// Lightweight function to get only metadata (no content) for sitemap
export interface ContentMetadata {
  slug: string;
  creationDate?: string;
  updateDate?: string;
}

export function getContentMetadata(collection: string): ContentMetadata[] {
  const cache = loadCache();
  const items = collection === "blog" ? cache.blogs : cache.projects;

  return items.map((item) => ({
    slug: item.slug,
    creationDate: item.creationDate,
    updateDate: item.updateDate,
  }));
}

// Define the shape of the return object for getAllContent
export interface GetAllContentResult {
  data: ContentItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export function getAllContent(
  collection: string,
  options?: GetAllContentOptions,
) {
  // Get metadata from cache (much faster than reading all files)
  const cachedItems = getCachedMetadata(collection as "blog" | "projects");
  let allContent: ContentItem[] = [...cachedItems] as ContentItem[];

  // Apply search (only searches metadata, not full content)
  if (options?.search && options.search.trim() !== "") {
    const searchTerm = options.search.toLowerCase();
    allContent = allContent.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm) ??
        item.description?.toLowerCase().includes(searchTerm) ??
        item.shortDescription?.toLowerCase().includes(searchTerm) ??
        false,
    );
  }

  // Filter by tag
  if (collection === "blog" && options?.tag) {
    allContent = allContent.filter((item) =>
      (item.tags as string[])?.includes(options.tag!),
    );
  }

  // Apply filtering (more generic, could be extended)
  if (options?.filterBy && options.filterValue) {
    const filterBy = options.filterBy as keyof ContentItem;
    const filterValue = options.filterValue.toLowerCase();
    allContent = allContent.filter((item) => {
      const itemValue = String(item[filterBy] ?? "").toLowerCase();
      return itemValue.includes(filterValue);
    });
  }

  // Sort by sortOrder before pagination
  allContent.sort((a, b) => {
    const orderA: number = (a.sortOrder as number | undefined) ?? Infinity;
    const orderB: number = (b.sortOrder as number | undefined) ?? Infinity;
    return orderA - orderB;
  });

  // Apply pagination
  const page = options?.page ? Number(options.page) : 1;
  const limit = options?.limit ? Number(options.limit) : 10; // Default limit
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedContent = allContent.slice(startIndex, endIndex);

  return {
    data: paginatedContent,
    totalItems: allContent.length,
    totalPages: Math.ceil(allContent.length / limit),
    currentPage: page,
    limit: limit,
  };
}

// Get full content for a single item (includes body content)
export function getFullContent(
  collection: string,
  slug: string,
): ContentItem | null {
  const file = getMarkdownFile(collection, slug);
  if (!file) {
    return null;
  }

  return {
    ...file.data,
    slug,
    content: file.content,
    description: file.data.description,
  } as ContentItem;
}
