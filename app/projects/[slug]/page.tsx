"use client";

import { useState, useEffect, useRef } from 'react';
import { projectsData } from "../../data/projectsData";
import Image from "next/image";
import { useParams } from "next/navigation";
import ImageModal from '../../components/ImageModal';

// This function can be used by Next.js to generate static pages for each project at build time.
// Since we are now using "use client", we cannot use generateStaticParams in this file.
// This needs to be handled differently if static generation is required for these pages.
// For now, we will fetch data on the client side based on params.

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData.find((p) => p.slug === slug);

  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    // This will not work in a client component as expected.
    // notFound() is a server-side utility.
    // A proper solution would involve checking for the project existence before rendering the page,
    // possibly in a parent server component or using getStaticProps/getServerSideProps in a pages directory structure.
    return <div>Project not found</div>;
  }

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
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
          className="prose lg:prose-xl max-w-none" 
          dangerouslySetInnerHTML={{ __html: project.fullDescription || '' }} 
        />
      </div>
      {modalImageUrl && (
        <ImageModal imageUrl={modalImageUrl} onClose={closeModal} />
      )}
    </main>
  );
}


