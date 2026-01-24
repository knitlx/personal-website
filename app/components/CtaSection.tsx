"use client";

import BentoButton from "./BentoButton"; // Импортируем новую кнопку
import { useContactModal } from "@/contexts/ModalContext";

export default function CtaSection() {
  const { openContactModal } = useContactModal();

  return (
    <section className="py-8">
      <div className="container">
        <div className="max-w-[910px] mx-auto bg-transparent text-center backdrop-blur-sm border border-gray-200 shadow-[0_0_50px_rgba(123,104,238,0.1)] rounded-2xl p-8">
          <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">
            Есть задача или идея?
          </h2>
          <p className="text-[18px] text-[#555] max-w-2xl mx-auto mb-10 leading-normal">
            Давайте разберёмся вместе и найдём рабочее решение
          </p>
          <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
            {/* Используем новые кнопки */}
            <BentoButton onClick={() => openContactModal()} variant="primary">
              Написать мне
            </BentoButton>
            <BentoButton href="/projects" variant="outline">
              Смотреть кейсы
            </BentoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
