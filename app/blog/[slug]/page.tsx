import { getMarkdownFile } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Import rehypeRaw
import MarkdownImage from "../../components/MarkdownImage"; // Import MarkdownImage
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postFile = getMarkdownFile("blog", slug);

  if (!postFile) {
    return {
      title: "Пост не найден",
    };
  }

  const post = postFile.data;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = post.canonicalUrl || `${baseUrl}/blog/${slug}`;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;

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

  const post = {
    ...postFile.data,
    slug: postFile.slug,
    articleBody: postFile.data.articleBody || "", // Ensure articleBody is available
  };

  return (
    <>
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-unbounded-fix mb-4">
            {postFile.data.title}
          </h1>
          <p className="text-gray-500 mb-8">{postFile.data.date}</p>

          <article className="prose lg:prose-xl max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]} // Add rehypeRaw to handle raw HTML
              components={{
                img: ({ ...props }) => <MarkdownImage {...props} />,
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
