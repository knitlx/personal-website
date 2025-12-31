import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const contentDirectory = path.join(process.cwd(), "content");

function generateCacheForCollection(collection: string): CacheItem[] {
  const collectionPath = path.join(contentDirectory, collection);

  if (!fs.existsSync(collectionPath)) {
    console.warn(`Collection directory does not exist: ${collectionPath}`);
    return [];
  }

  const files = fs.readdirSync(collectionPath);
  const cacheItems: CacheItem[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = path.join(collectionPath, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    cacheItems.push({
      slug: file.replace(/\.md$/, ""),
      ...data,
    });
  }

  console.log(`✓ Cached ${cacheItems.length} items from ${collection}`);
  return cacheItems;
}

function generateCache() {
  console.log("🚀 Generating content cache...\n");

  const cache: ContentCache = {
    blogs: generateCacheForCollection("blog"),
    projects: generateCacheForCollection("projects"),
    generatedAt: new Date().toISOString(),
  };

  const cachePath = path.join(process.cwd(), "public", "content-cache.json");
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));

  console.log(`\n✅ Cache generated successfully!`);
  console.log(`📁 Location: ${cachePath}`);
  console.log(`📊 Total items: ${cache.blogs.length + cache.projects.length}`);
  console.log(`   - Blog posts: ${cache.blogs.length}`);
  console.log(`   - Projects: ${cache.projects.length}`);
}

generateCache();
