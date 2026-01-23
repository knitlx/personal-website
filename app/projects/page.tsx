import { getAllContent } from "@/lib/content";
import InfiniteScrollProjects from "./components/InfiniteScrollProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты и кейсы автоматизации и AI-решений | NoChaos",
  description:
    "Примеры проектов и кейсов по автоматизации процессов и внедрению ИИ: боты, AI-инструменты, обработка данных и рабочие решения",
  keywords:
    "внедрение ии, автоматизация процессов, автоматизация бизнес процессов, ии для бизнеса, ии автоматизация, ai системы, автоматизация задач, интеграция ии, внедрение ai, ai автоматизация, автоматизация бизнеса, интеграция ai, telegram боты, n8n автоматизация",
};

export default async function ProjectsPage() {
  const { data: allProjects, totalItems } = getAllContent("projects");

  const projects = allProjects.map((project) => ({
    ...project,
    projectIcon: project.projectIcon ?? project.icon,
    shortDescriptionHomepage:
      project.shortDescriptionHomepage ?? project.description,
    shortDescriptionProjectsPage:
      project.shortDescriptionProjectsPage ?? project.pageDescription,
    slug: String(project.slug),
  }));

  // Показываем первые 6 проектов изначально
  const initialProjects = projects.slice(0, 6);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix">
          Проекты
        </h1>
        <InfiniteScrollProjects
          initialProjects={initialProjects}
          totalProjects={totalItems}
        />
      </div>
    </main>
  );
}
