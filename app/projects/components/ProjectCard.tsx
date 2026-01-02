import { memo } from "react";
import Link from "next/link";
import Image from "next/image"; // Add this import
import BentoButton from "../../components/BentoButton";
import { getImageUrl } from "@/lib/image";

interface ProjectCardProps {
  project: {
    title?: string;
    slug: string;
    projectIcon?: string;
    shortDescriptionHomepage?: string;
    shortDescriptionProjectsPage?: string;
    trylink?: string;
  };
  onOrderClick: (title: string | null) => void;
}

function ProjectCard({ project, onOrderClick }: ProjectCardProps) {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-6 text-left shadow-card hover:shadow-card-hover hover:-translate-y-[5px] transition-card duration-300 gradient-border-card flex flex-col h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex items-center mb-4 group"
      >
        {project.projectIcon && (
          <Image // Changed from img to Image
            src={getImageUrl(project.projectIcon)}
            alt={project.title ?? "Project icon"}
            width={40}
            height={40}
            className="rounded-lg mr-4"
          />
        )}
        <h2 className="text-2xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[var(--accent-color)] group-hover:to-[var(--primary-color)] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {project.title ?? "Без названия"}
        </h2>
      </Link>
      {(project.shortDescriptionProjectsPage ??
        project.shortDescriptionHomepage) && (
        <div className="text-gray-600 mb-6 flex-grow prose prose-sm max-w-none">
          {project.shortDescriptionProjectsPage ??
            project.shortDescriptionHomepage ??
            ""}
        </div>
      )}
      <div className="flex justify-start items-baseline mt-auto">
        {project.trylink ? (
          <BentoButton href={project.trylink} variant="primary" size="small">
            Попробовать
          </BentoButton>
        ) : (
          <BentoButton
            onClick={() => onOrderClick(project.title ?? null)}
            variant="primary"
            size="small"
          >
            Заказать настройку
          </BentoButton>
        )}
      </div>
    </div>
  );
}

export default memo(ProjectCard);
