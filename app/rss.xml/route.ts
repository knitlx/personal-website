import { getServerSideUrl } from "@/lib/utils";
import { getAllContent } from "@/lib/content";

export async function GET() {
  const baseUrl = getServerSideUrl();
  const allBlogPosts = (await getAllContent("blog", { limit: 10 })).data; // Limit to 10 for RSS feed

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Александра | AI-универсал и промт-инженер - Блог</title>
    <link>${baseUrl}/blog</link>
    <description>Статьи об автоматизациях, AI-инструментах и систематизации процессов</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${allBlogPosts
      .map((post) => {
        const pubDate = post.date
          ? new Date(post.date).toUTCString()
          : new Date(post.creationDate || "").toUTCString();
        const description =
          post.description ||
          post.articleBody?.substring(0, 200) + "..." ||
          "Нет описания"; // Use description or a snippet of articleBody

        return `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>
  `;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
