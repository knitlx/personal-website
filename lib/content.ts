import fs from "fs"
import path from "path"
import matter from "gray-matter"

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

export function getAllContent(collection: string) {
  const slugs = getSlugs(collection)
  const allContent = slugs.map((slug) => {
    const file = getMarkdownFile(collection, slug)
    if (file) {
      return { ...file.data, slug, content: file.content }
    }
    return null
  }).filter(Boolean) // Filter out any nulls if getMarkdownFile returned null

  return allContent
}

