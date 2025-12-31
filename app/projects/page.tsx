import { getAllContent } from "@/lib/content";
import InfiniteScrollProjects from "./components/InfiniteScrollProjects";

export default async function ProjectsPage() {
  const { data: allProjects, totalItems } = getAllContent("projects");

  const projects = allProjects.map((project) => ({
    ...project,
    projectIcon: project.projectIcon || project.icon,
    shortDescriptionHomepage:
      project.shortDescriptionHomepage || project.description,
    shortDescriptionProjectsPage:
      project.shortDescriptionProjectsPage || project.pageDescription,
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
