import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectData {
  slug: string;
  title?: string;
  projectIcon?: string;
  shortDescriptionHomepage?: string;
  link?: string;
}

interface ProjectCardSimpleProps {
  project: ProjectData;
}

function ProjectCardSimple({ project }: ProjectCardSimpleProps) {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-6 text-left shadow-card hover:shadow-card-hover hover:-translate-y-[5px] transition-card duration-300 gradient-border-card flex flex-col h-full">
      <div className="flex-grow">
        <Link href={project.link || `/projects/${project.slug}`}>
          {project.projectIcon && (
            <Image
              src={project.projectIcon}
              alt={project.title || "Project icon"}
              width={50}
              height={50}
              sizes="50px"
              className="rounded-lg mb-[15px]"
            />
          )}
        </Link>
        <h3 className="text-xl font-semibold text-[#333333] mb-2 text-left">
          {project.title || "Без названия"}
        </h3>
        {project.shortDescriptionHomepage && (
          <p className="text-[15px] text-[#555] mb-4 text-left">
            {project.shortDescriptionHomepage}
          </p>
        )}
      </div>
      <div className="flex justify-start items-baseline mt-auto">
        <Link
          href={project.link || `/projects/${project.slug}`}
          className="gradient-link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default memo(ProjectCardSimple);
