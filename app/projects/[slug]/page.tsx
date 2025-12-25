"use client";

import { useState, useEffect, useRef } from 'react';
import { projectsData } from "../../data/projectsData";
import Image from "next/image";
import { useParams } from "next/navigation";
import ImageModal from '../../components/ImageModal';
import ContactModal from '../../components/ContactModal';
import BentoButton from '../../components/BentoButton';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData.find((p) => p.slug === slug);

  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; projectTitle: string | null }>({
    isOpen: false,
    projectTitle: null,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect runs on the parent `prose` container and will find all images within it.
    if (contentRef.current) {
      const images = contentRef.current.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          setModalImageUrl(img.src);
        });
      }
    }
  }, [project, modalImageUrl]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <>
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <Image
              src={project.icon}
              alt={project.title}
              width={60}
              height={60}
              className="rounded-xl mr-6"
            />
            <h1 className="text-5xl font-bold font-unbounded-fix">
              {project.title}
            </h1>
          </div>
          <div
            ref={contentRef}
            className="prose lg:prose-xl prose-constrained-width"
          >
            {/* Render the intro description from the new data structure */}
            <div dangerouslySetInnerHTML={{ __html: project.introDescription || '' }} />

            {/* --- In-content button inserted after the intro --- */}
            {!project.tryLink && (
              <div className="my-8 flex justify-start">
                <BentoButton
                  onClick={() => setContactModal({ isOpen: true, projectTitle: project.title })}
                  variant="primary" size="default"
                >
                  Заказать настройку
                </BentoButton>
              </div>
            )}

            {/* Render the rest of the description from the new data structure */}
            <div dangerouslySetInnerHTML={{ __html: project.fullDescription || '' }} />
          </div>

          {/* --- Button at the end of the content --- */}
          <div className="mt-12 flex justify-start">
            {project.tryLink ? (
              <BentoButton href={project.tryLink} variant="primary" size="default">
                Попробовать
              </BentoButton>
            ) : (
              <BentoButton
                onClick={() => setContactModal({ isOpen: true, projectTitle: project.title })}
                variant="primary" size="default"
              >
                Заказать настройку
              </BentoButton>
            )}
          </div>
        </div>
        
        {modalImageUrl && (
          <ImageModal imageUrl={modalImageUrl} onClose={closeModal} />
        )}
      </main>
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, projectTitle: null })}
        projectTitle={contactModal.projectTitle}
      />
    </>
  );
}


