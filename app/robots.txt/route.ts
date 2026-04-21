import { SITE_URL } from "@/lib/constants";

export async function GET() {
  const baseUrl = SITE_URL;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
