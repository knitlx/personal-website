import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CacheItem, ContentCache } from "../types/content";

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

  const cachePath = path.join(process.cwd(), ".content-cache.json");
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));

  console.log(`\n✅ Cache generated successfully!`);
  console.log(`📁 Location: ${cachePath}`);
  console.log(`📊 Total items: ${cache.blogs.length + cache.projects.length}`);
  console.log(`   - Blog posts: ${cache.blogs.length}`);
  console.log(`   - Projects: ${cache.projects.length}`);
}

// Export for use in other modules
export { generateCache };

// Run only when called directly (not when imported)
const isDirectRun =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].includes("generate-content-cache");

if (isDirectRun) {
  generateCache();
}
