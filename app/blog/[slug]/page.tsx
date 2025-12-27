import { getMarkdownFile } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Import rehypeRaw
import MarkdownImage from "../../components/MarkdownImage"; // Import MarkdownImage

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const postFile = getMarkdownFile("blog", slug);

  if (!postFile) {
    notFound();
  }

  const post = {
    ...postFile.data,
    slug: postFile.slug,
    articleBody: postFile.data.articleBody || "" // Ensure articleBody is available
  };

  return (
    <>
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-unbounded-fix mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500 mb-8">{post.date}</p>
          
          <article className="prose lg:prose-xl max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]} // Add rehypeRaw to handle raw HTML
              components={{
                img: ({ node, ...props }) => (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <MarkdownImage {...props} />
                ),
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
