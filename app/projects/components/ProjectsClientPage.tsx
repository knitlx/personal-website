"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import BentoButton from "../../components/BentoButton";
import ContactModal from "../../components/ContactModal";

// Dynamic import for ReactMarkdown with code-splitting
const ReactMarkdownComp = dynamic(() => import("react-markdown"), {
  ssr: true,
  loading: () => <p className="text-gray-600">Loading...</p>,
});

// Import remark-gfm normally (it's small)
import remarkGfm from "remark-gfm";

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
            className="bg-white border border-black/5 rounded-xl p-6 text-left shadow-card hover:shadow-card-hover hover:-translate-y-[5px] transition-card duration-300 gradient-border-card flex flex-col h-full"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center mb-4 group"
            >
              {project.projectIcon && (
                <Image
                  src={project.projectIcon}
                  alt={project.title ?? "Project icon"}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="rounded-lg mr-4"
                />
              )}
              <h2 className="text-2xl font-semibold group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                {project.title ?? "Без названия"}
              </h2>
            </Link>
            {(project.shortDescriptionProjectsPage ??
              project.shortDescriptionHomepage) && (
              <div className="text-gray-600 mb-6 flex-grow prose prose-sm max-w-none">
                <ReactMarkdownComp remarkPlugins={[remarkGfm]}>
                  {project.shortDescriptionProjectsPage ??
                    project.shortDescriptionHomepage ??
                    ""}
                </ReactMarkdownComp>
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
                      projectTitle: project.title ?? null,
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
