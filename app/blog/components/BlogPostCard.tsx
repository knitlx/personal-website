import { memo } from "react";
import Link from "next/link";

interface BlogPostCardProps {
  post: {
    slug: string;
    title?: string;
    creationDate?: string;
    date?: string;
    shortDescription?: string;
    description?: string;
  };
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-[#333333]">
            {post.title || "Без названия"}
          </h2>
          {(post.creationDate || post.date) && (
            <p className="text-sm text-gray-500 mb-4">
              {formatDate(post.creationDate || post.date || "")}
            </p>
          )}
          <p className="text-gray-700 line-clamp-3">
            {post.shortDescription || post.description || ""}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default memo(BlogPostCard);
