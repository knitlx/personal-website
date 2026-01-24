import { memo } from "react";
import { aiFeatures } from "../data/homePageData";
import styles from "./AiCreatedSiteSection.module.css";
import Image from "next/image";

function AiCreatedSiteSection() {
  return (
    <section className="bg-[#F9FAFB] py-16 text-center mb-[50px]">
      <div className="container">
        <h2 className="font-unbounded-fix text-[32px] font-medium leading-tight text-[#333333] mb-[15px]">
          Этот сайт — пример того, как я использую AI
        </h2>
        <p className="text-[18px] text-[#666] max-w-[800px] mx-auto mb-[50px]">
          ИИ использован на всех этапах разработки: от структуры и текстов до дизайна и кода
        </p>

        <div className="flex flex-wrap items-stretch justify-center gap-6 mt-[40px]">
          {aiFeatures.map((feature) => (
            <div
              key={feature.title}
              className={`${styles.aiFeatureItem} bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between w-full sm:w-[calc(33.333%-16px)]`}
            >
              <Image
                src={feature.icon}
                alt={feature.alt}
                width={70}
                height={70}
                sizes="70px"
                className="ai-feature-icon w-[70px] h-[70px] flex items-center justify-center mx-auto mb-[15px] relative"
              />
              <h3 className="text-[18px] font-semibold text-[#333333] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#888] leading-tight mt-auto">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(AiCreatedSiteSection);
