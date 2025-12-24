"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./projects.module.css";

import { projectsData } from "../data/projectsData";
import BentoButton from "../components/BentoButton";
import ContactModal from "../components/ContactModal";

export default function ProjectsPage() {
  const [modalContext, setModalContext] = useState<{ isOpen: boolean; projectTitle: string | null }>({
    isOpen: false,
    projectTitle: null,
  });

  return (
    <>
      <main className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix">
            Проекты
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 mr-auto">
            {projectsData.map((project: { title: string; icon: string; description: string; link: string; tryLink?: string, pageDescription?: string }) => (
              <div key={project.title} className={`${styles.projectCard} flex flex-col`}>
                <Link href={project.link} className="flex items-center mb-4 group">
                  <Image
                    src={project.icon}
                    alt={project.title}
                    width={40}
                    height={40}
                    className="rounded-lg mr-4"
                  />
                  <h2 className="text-2xl font-semibold group-hover:text-primary-color transition-colors">{project.title}</h2>
                </Link>
                <p className="text-gray-600 mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: project.pageDescription || project.description }}></p>
                <div className="flex justify-start items-baseline mt-auto">
                  {project.tryLink ? (
                    <BentoButton href={project.tryLink} variant="primary" size="small">
                      Попробовать
                    </BentoButton>
                  ) : (
                    <BentoButton onClick={() => setModalContext({ isOpen: true, projectTitle: project.title })} variant="primary" size="small">
                      Заказать настройку
                    </BentoButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ContactModal
        isOpen={modalContext.isOpen}
        onClose={() => setModalContext({ isOpen: false, projectTitle: null })}
        projectTitle={modalContext.projectTitle}
      />
    </>
  );
}
