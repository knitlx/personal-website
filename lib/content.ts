import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unstable_noStore as noStore } from 'next/cache' // Use unstable_noStore

// Define a more comprehensive ContentItem interface
interface ContentItem {
  slug: string;
  title: string;
  description?: string; // Optional description
  articleBody?: string; // Optional for blog posts
  creationDate?: string; // Explicitly add creationDate
  updateDate?: string;   // Explicitly add updateDate
  [key: string]: any; // Allow other properties from gray-matter
}

// Define options interface for getAllContent
interface GetAllContentOptions {
  page?: number;
  limit?: number;
  search?: string;
  filterBy?: string; // e.g., "title", "description", "category"
  filterValue?: string; // value to filter by
}

const contentDirectory = path.join(process.cwd(), "content")

export function getSlugs(collection: string) {
  const collectionPath = path.join(contentDirectory, collection)
  // Check if the directory exists
  if (!fs.existsSync(collectionPath)) {
    return []
  }
  const files = fs.readdirSync(collectionPath)
  return files.map((file) => file.replace(/\.md$/, ""))
}

export function getMarkdownFile(collection: string, slug: string) {
  const fullPath = path.join(contentDirectory, collection, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  return { data, content, slug }
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
  options?: GetAllContentOptions
) {
  noStore();

  const slugs = getSlugs(collection);
  let allContent: ContentItem[] = slugs.map((slug) => {
    const file = getMarkdownFile(collection, slug);
    if (file) {
      // Ensure content and description are included for searching
      return { ...file.data, slug, content: file.content, description: file.data.description };
    }
    return null;
  }).filter(Boolean) as ContentItem[]; // Filter out any nulls and assert type

  // Apply search
  if (options?.search && options.search.trim() !== '') {
    const searchTerm = options.search.toLowerCase();
    allContent = allContent.filter(item =>
      (item.title && item.title.toLowerCase().includes(searchTerm)) ||
      (item.description && item.description.toLowerCase().includes(searchTerm)) ||
      (item.content && item.content.toLowerCase().includes(searchTerm)) // Search in full content
    );
  }

  // Apply filtering (more generic, could be extended)
  if (options?.filterBy && options.filterValue) {
    const filterBy = options.filterBy as keyof ContentItem;
    const filterValue = options.filterValue.toLowerCase();
    allContent = allContent.filter(item => {
      const itemValue = String(item[filterBy]).toLowerCase();
      return itemValue.includes(filterValue);
    });
  }

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
