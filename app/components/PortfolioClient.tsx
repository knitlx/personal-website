'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./PortfolioSection.module.css";
import { useState } from "react";

interface ProjectData {
  slug: string;
  title: string;
  projectIcon: string;
  shortDescriptionHomepage: string;
  link: string; // The full path like /projects/slug
}

interface PortfolioClientProps {
  projects: ProjectData[];
}

const PROJECTS_PER_PAGE = 3;

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + PROJECTS_PER_PAGE);
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {visibleProjects.map((project) => (
          <div key={project.slug} className={`${styles.portfolioCard} flex flex-col`}>
            <div className="flex-grow">
              <Link href={project.link}>
                <Image
                  src={project.projectIcon}
                  alt={project.title}
                  width={50}
                  height={50}
                  className="rounded-lg mb-[15px]"
                />
              </Link>
              <h3 className="text-xl font-semibold text-[#333333] mb-2 text-left">{project.title}</h3>
              <p className="text-[15px] text-[#555] mb-4 text-left">{project.shortDescriptionHomepage}</p>
            </div>
            <div className="flex justify-start items-baseline mt-auto">
              <Link href={project.link} className={styles.portfolioLink}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="container text-center flex justify-center items-center gap-4" style={{ marginTop: '80px' }}>
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
