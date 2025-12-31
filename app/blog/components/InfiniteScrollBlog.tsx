"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import BlogPostCard from "./BlogPostCard";
import { PAGINATION, INTERSECTION_OBSERVER } from "@/lib/constants";

interface BlogPost {
  slug: string;
  title?: string;
  creationDate?: string;
  date?: string;
  shortDescription?: string;
  description?: string;
  [key: string]: unknown;
}

interface InfiniteScrollBlogProps {
  initialPosts: BlogPost[];
  totalPosts: number;
}

export default function InfiniteScrollBlog({
  initialPosts,
  totalPosts,
}: InfiniteScrollBlogProps) {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalPosts);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/content/blog?page=${pageNum}&limit=${PAGINATION.BLOG_POSTS_PER_PAGE}`,
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
    [loading, hasMore],
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

  return (
    <>
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
    </>
  );
}
