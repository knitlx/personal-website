"use client";

import GradientBorderButton from "./GradientBorderButton";
import { useState } from "react";

export default function CtaSection() {
  const [hoveredButton, setHoveredButton] = useState<'none' | 'contact' | 'cases'>('none');

  return (
    <section className="bg-transparent py-8 text-center backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
        <div className="container">
            <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">Есть задача или идея?</h2>
            <p className="text-[18px] text-[#555] max-w-[650px] mx-auto mb-10 leading-normal">Давайте разберёмся вместе и найдём рабочее решение.</p>
            <div
              className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto"
              onMouseLeave={() => setHoveredButton('none')}
            >
                <GradientBorderButton
                  href="/contact"
                  className="w-full"
                  variant={hoveredButton === 'none' || hoveredButton === 'contact' ? 'gradient' : 'border'}
                  externalHoveredState={hoveredButton === 'contact'} // Use externalHoveredState
                  onMouseEnter={() => setHoveredButton('contact')}
                >
                    Написать мне
                </GradientBorderButton>
                <GradientBorderButton
                  href="/lab"
                  className="w-full"
                  variant={hoveredButton === 'none' || hoveredButton === 'contact' ? 'border' : 'gradient'}
                  isActualHovered={hoveredButton === 'cases'}
                  onMouseEnter={() => setHoveredButton('cases')}
                >
                    Смотреть кейсы
                </GradientBorderButton>
            </div>
        </div>
    </section>
  );
}