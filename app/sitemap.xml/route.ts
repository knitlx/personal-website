import { SITE_URL } from "@/lib/constants";
import { getContentMetadata } from "@/lib/content";
import fs from "fs";
import path from "path";

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Helper function to get file modification date
function getFileModDate(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return new Date();
  }
}

export async function GET() {
  const baseUrl = SITE_URL;

  // Use lightweight metadata function instead of getAllContent
  const allProjects = getContentMetadata("projects");
  const allBlogPosts = getContentMetadata("blog");

  // Static pages with correct priorities and real file modification dates
  const staticPages = [
    {
      url: "",
      priority: "1.0",
      changefreq: "daily",
      file: "app/page.tsx",
    },
    {
      url: "/projects",
      priority: "0.9",
      changefreq: "weekly",
      file: "app/projects/page.tsx",
    },
    {
      url: "/blog",
      priority: "0.9",
      changefreq: "weekly",
      file: "app/blog/page.tsx",
    },
    {
      url: "/about",
      priority: "0.8",
      changefreq: "monthly",
      file: "app/about/page.tsx",
    },
    {
      url: "/services",
      priority: "0.8",
      changefreq: "monthly",
      file: "app/services/page.tsx",
    },
    {
      url: "/privacy",
      priority: "0.3",
      changefreq: "yearly",
      file: "app/privacy/page.tsx",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      const modDate = getFileModDate(path.join(process.cwd(), page.file));
      return `
    <url>
      <loc>${escapeXml(baseUrl + page.url)}</loc>
      <lastmod>${modDate.toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `;
    })
    .join("")}
  ${allProjects
    .map((project) => {
      const date = project.updateDate ?? project.creationDate;
      const lastmod = date ? new Date(date).toISOString() : new Date().toISOString();
      return `
    <url>
      <loc>${escapeXml(`${baseUrl}/projects/${project.slug}`)}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `;
    })
    .join("")}
  ${allBlogPosts
    .map((post) => {
      const date = post.updateDate ?? post.creationDate;
      const lastmod = date ? new Date(date).toISOString() : new Date().toISOString();
      return `
    <url>
      <loc>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
    },
  });
}
