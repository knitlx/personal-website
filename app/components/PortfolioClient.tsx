"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCardSimple from "./ProjectCardSimple";
import { PAGINATION } from "@/lib/constants";

interface ProjectData {
  slug: string;
  title?: string;
  projectIcon?: string;
  shortDescriptionHomepage?: string;
  link?: string;
}

interface PortfolioClientProps {
  projects: ProjectData[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [visibleCount, setVisibleCount] = useState<number>(
    PAGINATION.PROJECTS_PER_PAGE,
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + PAGINATION.PROJECTS_PER_PAGE);
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-4 lg:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
        {visibleProjects.map((project) => (
          <ProjectCardSimple key={project.slug} project={project} />
        ))}
      </div>
      <div
        className="container text-center flex justify-center items-center gap-4"
        style={{ marginTop: "80px" }}
      >
        {visibleCount < projects.length && (
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center justify-center rounded-lg font-unbounded-fix font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer px-6 py-3 text-xs md:text-sm bg-gradient-to-r from-[#9137df] to-[#7a68ee] text-white hover:opacity-90"
          >
            Смотреть еще
          </button>
        )}
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-lg font-unbounded-fix font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer px-6 py-3 text-xs md:text-sm border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
        >
          Все проекты
        </Link>
      </div>
    </>
  );
}
