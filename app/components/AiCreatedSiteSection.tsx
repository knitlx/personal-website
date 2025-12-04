import { aiFeatures } from "../data/homePageData";
import styles from './AiCreatedSiteSection.module.css';

export default function AiCreatedSiteSection() {
  return (
    <section className="py-16 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
        <div className="container">
            <h2 className="font-unbounded-fix text-[40px] font-bold leading-tight text-[#333333] mb-[15px]">Этот сайт создан с помощью AI — от структуры до кода</h2>
            <p className="text-[18px] text-[#666] max-w-[800px] mx-auto mb-[50px]">
                AI использован на каждом этапе разработки: структура, тексты, визуал и весь код.
                Это рабочий пример того, как я применяю промт-инженерию в практических задачах.
            </p>
            
            <div className="flex flex-wrap items-stretch justify-center gap-6 mt-[40px]">
                {aiFeatures.map((feature) => (
                    <div key={feature.title} className={`${styles.aiFeatureItem} bg-white rounded-xl px-5 py-[30px] transition-all duration-300 ease-in-out text-center min-h-[200px] flex flex-col justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]`}>
                        <img src={feature.icon} alt={feature.alt} className="ai-feature-icon w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-[15px] relative" />
                        <h3 className="text-[18px] font-semibold text-[#333333] mb-2">{feature.title}</h3>
                        <p className="text-sm text-[#888] leading-tight mt-auto">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}