import { getServerSideUrl } from "@/lib/utils";
import { getAllContent } from "@/lib/content";

export async function GET() {
  const baseUrl = getServerSideUrl(); // Helper function to get base URL
  const allProjects = (await getAllContent("projects")).data;
  const allBlogPosts = (await getAllContent("blog")).data;

  const staticPages = [
    "", // Homepage
    "/about",
    "/services",
    "/projects",
    "/blog",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  `;
    })
    .join("")}
  ${allProjects
    .map((project) => {
      return `
    <url>
      <loc>${baseUrl}/projects/${project.slug}</loc>
      <lastmod>${new Date(project.updateDate || project.creationDate || Date.now()).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `;
    })
    .join("")}
  ${allBlogPosts
    .map((post) => {
      return `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.updateDate || post.creationDate || Date.now()).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
