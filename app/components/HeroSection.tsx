"use client";

import { useState } from "react";
import BentoButton from "./BentoButton";
import ContactModal from "./ContactModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* This structure is taken from bento-landing/page.tsx */}
      <section className="container max-w-4xl mx-auto px-6 text-center mb-20 pt-24 relative z-10">
        <h1 className="font-unbounded-fix leading-[1.2] mb-8">
          <span className="block text-[40px] md:text-[72px] font-bold bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent pb-1">
            AI-системы
          </span>
          <span className="block text-2xl font-bold text-black mt-1 uppercase tracking-widest">
            и автоматизация процессов
          </span>
        </h1>
        <p className="font-inter text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Помогаю бизнесу внедрять ИИ-системы: анализ задач, интеграции и запуск в работу
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-16">
          <BentoButton variant="primary" onClick={() => setIsModalOpen(true)}>
            Обсудить проект
          </BentoButton>
          <BentoButton variant="outline" href="/projects">
            Смотреть кейсы
          </BentoButton>
        </div>
      </section>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
