import Link from "next/link";
import { getMarkdownFile, getSlugs, ContentItem } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownImage from "../../components/MarkdownImage";
import PromptBlock from "../../components/PromptBlock";
import { Metadata } from "next";

export const dynamic = "force-static";

export function generateStaticParams() {
  const slugs = getSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postFile = getMarkdownFile("blog", slug);

  if (!postFile) {
    return {
      title: "Пост не найден",
    };
  }

  const post = postFile.data;

  const baseUrl = SITE_URL;
  const canonicalUrl = post.canonicalUrl ?? `${baseUrl}/blog/${slug}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.description;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blog/${slug}`,
      siteName: "Личный сайт",
      locale: "ru_RU",
      type: "article",
      publishedTime: post.creationDate,
      modifiedTime: post.updateDate,
      images: post.openGraphImage ? [{ url: post.openGraphImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.openGraphImage ? [post.openGraphImage] : undefined,
    },
    keywords: post.seoTags,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postFile = getMarkdownFile("blog", slug);

  if (!postFile) {
    notFound();
  }

  const post: ContentItem = {
    ...postFile.data,
    slug: postFile.slug,
    articleBody: postFile.content ?? postFile.data.articleBody ?? "", // Use content (markdown body) first
  };

  const baseUrl = SITE_URL;
  const imageUrl = post.openGraphImage
    ? `${baseUrl}${post.openGraphImage}`
    : `${baseUrl}/profile.png`; // Fallback image

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    headline: post.title,
    description: post.description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: "Александра",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "NoChaos",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/profile.png`,
      },
    },
    datePublished: post.creationDate,
    dateModified: post.updateDate ?? post.creationDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-unbounded-fix mb-4">
            {postFile.data.title}
          </h1>
          <p className="text-gray-500 mb-4">{postFile.data.date}</p>

          {/* Tags Section */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <Link
                  href={`/blog?tag=${tag}`}
                  key={tag}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <article className="prose lg:prose-xl max-w-4xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ ...props }) => <MarkdownImage {...props} />,
                code: (props: React.HTMLAttributes<HTMLElement>) => {
                  const className = props.className ?? "";
                  const isInline = !className;

                  if (className.includes("language-prompt") && !isInline) {
                    return <PromptBlock>{props.children}</PromptBlock>;
                  }

                  return (
                    <code className={className} {...props}>
                      {props.children}
                    </code>
                  );
                },
              }}
            >
              {post.articleBody}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </>
  );
}
