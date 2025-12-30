"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../projects.module.css"; // Note: relative import adjusted
import BentoButton from "../../components/BentoButton"; // Note: relative import adjusted
import ContactModal from "../../components/ContactModal"; // Note: relative import adjusted

interface Project {
  title?: string;
  slug: string;
  projectIcon?: string; // Corresponds to 'icon' in old data
  shortDescriptionHomepage?: string; // Corresponds to 'description'
  shortDescriptionProjectsPage?: string; // Corresponds to 'pageDescription'
  trylink?: string;
  // Other fields from frontmatter will also be present
}

interface ProjectsClientPageProps {
  projects: Project[];
}

export default function ProjectsClientPage({
  projects,
}: ProjectsClientPageProps) {
  const [modalContext, setModalContext] = useState<{
    isOpen: boolean;
    projectTitle: string | null;
  }>({
    isOpen: false,
    projectTitle: null,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 mr-auto">
        {projects.map((project) => (
          <div
            key={project.slug}
            className={`${styles.projectCard} flex flex-col`}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center mb-4 group"
            >
              {project.projectIcon && (
                <Image
                  src={project.projectIcon}
                  alt={project.title || "Project icon"}
                  width={40}
                  height={40}
                  className="rounded-lg mr-4"
                />
              )}
              <h2 className="text-2xl font-semibold group-hover:bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                {project.title || "Без названия"}
              </h2>
            </Link>
            {(project.shortDescriptionProjectsPage ||
              project.shortDescriptionHomepage) && (
              <div className="text-gray-600 mb-6 flex-grow prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {project.shortDescriptionProjectsPage ||
                    project.shortDescriptionHomepage ||
                    ""}
                </ReactMarkdown>
              </div>
            )}
            <div className="flex justify-start items-baseline mt-auto">
              {project.trylink ? (
                <BentoButton
                  href={project.trylink}
                  variant="primary"
                  size="small"
                >
                  Попробовать
                </BentoButton>
              ) : (
                <BentoButton
                  onClick={() =>
                    setModalContext({
                      isOpen: true,
                      projectTitle: project.title || null,
                    })
                  }
                  variant="primary"
                  size="small"
                >
                  Заказать настройку
                </BentoButton>
              )}
            </div>
          </div>
        ))}
      </div>
      <ContactModal
        isOpen={modalContext.isOpen}
        onClose={() => setModalContext({ isOpen: false, projectTitle: null })}
        projectTitle={modalContext.projectTitle}
      />
    </>
  );
}
