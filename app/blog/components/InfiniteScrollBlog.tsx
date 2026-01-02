"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";
import { PAGINATION, INTERSECTION_OBSERVER } from "@/lib/constants";

interface BlogPost {
  slug: string;
  title?: string;
  creationDate?: string;
  date?: string;
  shortDescription?: string;
  description?: string;
  tags?: string[];
  [key: string]: unknown;
}

interface InfiniteScrollBlogProps {
  initialPosts: BlogPost[];
  totalPosts: number;
  allTags: string[];
  activeTag?: string;
}

export default function InfiniteScrollBlog({
  initialPosts,
  totalPosts,
  allTags,
  activeTag,
}: InfiniteScrollBlogProps) {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalPosts);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Effect to reset state when the initial posts change (e.g., due to tag filter)
  useEffect(() => {
    setVisiblePosts(initialPosts);
    setPage(1);
    setHasMore(initialPosts.length < totalPosts);
  }, [initialPosts, totalPosts]);

  const loadMorePosts = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const tagQuery = activeTag ? `&tag=${activeTag}` : "";
        const response = await fetch(
          `/api/content/blog?page=${pageNum}&limit=${PAGINATION.BLOG_POSTS_PER_PAGE}${tagQuery}`,
        );
        const data = await response.json();

        if (data.posts && data.posts.length > 0) {
          setVisiblePosts((prev) => [...prev, ...data.posts]);
          setPage(pageNum);
          setHasMore(data.pagination.hasNextPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error loading more posts:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, activeTag],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMore) {
          const nextPage = page + 1;
          loadMorePosts(nextPage);
        }
      },
      {
        rootMargin: INTERSECTION_OBSERVER.ROOT_MARGIN,
        threshold: INTERSECTION_OBSERVER.THRESHOLD,
      },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, loading, hasMore, loadMorePosts]);

  const getTagClass = (tag: string) => {
    const baseClass =
      "inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200";
    if (tag === activeTag) {
      return `${baseClass} bg-gradient-to-r from-[#9137DF] to-[#7A68EE] text-white`;
    }
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <>
      {/* Tag Filter UI */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <Link
          href="/blog"
          className={getTagClass(activeTag === undefined ? "Все" : "")}
        >
          Все
        </Link>
        {allTags.map((tag) => (
          <Link
            href={`/blog?tag=${tag}`}
            key={tag}
            className={getTagClass(tag)}
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8">
          {visiblePosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="w-full h-20 flex items-center justify-center mt-8"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Загрузка статей...</p>
            </div>
          ) : (
            <p className="text-gray-500">Прокрутите вниз для загрузки</p>
          )}
        </div>
      )}

      {!hasMore && visiblePosts.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500 text-lg">
            Статей с тегом "{activeTag}" не найдено.
          </p>
        </div>
      )}
    </>
  );
}
