import { getServerSideUrl } from "@/lib/utils";

export async function GET() {
  const baseUrl = getServerSideUrl();

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
