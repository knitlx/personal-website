import Image from "next/image";
import Link from "next/link";
import styles from "./projects.module.css";

import { projectsData } from "../data/projectsData";
import GradientBorderButton from "../components/GradientBorderButton";

export default function ProjectsPage() {
  return (
    <main className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix">
          Проекты
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 mr-auto">
          {projectsData.map((project: { title: string; icon: string; description: string; link: string; tryLink?: string, pageDescription?: string }) => (
            <div key={project.title} className={`${styles.projectCard} flex flex-col`}>
              <div className="flex items-center mb-4">
                <Image
                  src={project.icon}
                  alt={project.title}
                  width={40}
                  height={40}
                  className="rounded-lg mr-4"
                />
                <h2 className="text-2xl font-semibold">{project.title}</h2>
              </div>
              <p className="text-gray-600 mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: project.pageDescription || project.description }}></p>
              <div className="flex justify-between items-baseline mt-auto">
                <Link href={project.link} className={`${styles.projectLink} py-2 text-base`}>
                  Подробнее →
                </Link>
                {project.tryLink && (
                  <GradientBorderButton href={project.tryLink} variant="gradient" size="small">
                    Попробовать
                  </GradientBorderButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}