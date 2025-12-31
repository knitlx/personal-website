"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ContactModal from "../../components/ContactModal";
import ProjectCard from "./ProjectCard";
import { PAGINATION, INTERSECTION_OBSERVER } from "@/lib/constants";

interface Project {
  title?: string;
  slug: string;
  projectIcon?: string;
  shortDescriptionHomepage?: string;
  shortDescriptionProjectsPage?: string;
  trylink?: string;
  [key: string]: unknown;
}

interface InfiniteScrollProjectsProps {
  initialProjects: Project[];
  totalProjects: number;
}

export default function InfiniteScrollProjects({
  initialProjects,
  totalProjects,
}: InfiniteScrollProjectsProps) {
  const [visibleProjects, setVisibleProjects] =
    useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialProjects.length < totalProjects,
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [modalContext, setModalContext] = useState<{
    isOpen: boolean;
    projectTitle: string | null;
  }>({
    isOpen: false,
    projectTitle: null,
  });

  const loadMoreProjects = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/content/projects?page=${pageNum}&limit=${PAGINATION.PROJECTS_GRID_PER_PAGE}`,
        );
        const data = await response.json();

        if (data.projects && data.projects.length > 0) {
          setVisibleProjects((prev) => [...prev, ...data.projects]);
          setPage(pageNum);
          setHasMore(data.pagination.hasNextPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error loading more projects:", error);
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
          loadMoreProjects(nextPage);
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
  }, [page, loading, hasMore, loadMoreProjects]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 mr-auto">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOrderClick={(title) =>
              setModalContext({ isOpen: true, projectTitle: title })
            }
          />
        ))}
      </div>

      {/* Триггер для подгрузки */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="w-full h-20 flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Загрузка проектов...</p>
            </div>
          ) : (
            <p className="text-gray-500">Прокрутите вниз для загрузки</p>
          )}
        </div>
      )}

      <ContactModal
        isOpen={modalContext.isOpen}
        onClose={() => setModalContext({ isOpen: false, projectTitle: null })}
        projectTitle={modalContext.projectTitle}
      />
    </>
  );
}
