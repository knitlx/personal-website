import styles from "./PortfolioPreviewSection.module.css";
import Link from "next/link";
import BentoButton from "./BentoButton"; // Use BentoButton
import Image from "next/image";

export default function PortfolioPreviewSection() {
  return (
    <section className="py-12 text-center mb-[50px]">
      <div className="container">
        <h2 className="font-unbounded-fix text-[40px] font-medium leading-tight text-[#333333] mb-[15px]">
          Мои проекты
        </h2>
        <p className="text-[18px] text-[#666] max-w-[700px] mx-auto mb-[50px]">
          Примеры проектов, которые я собрала с помощью AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[40px]">
          <div
            className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
          >
            <Image
              src="/icons/finance.png"
              alt="Telegram Bot Icon"
              width={50}
              height={50}
              className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]"
            />
            <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">
              Финансовый Telegram-бот
            </h3>
            <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">
              автоматизация на n8n + изуальный интерфейс в mini-app
            </p>{" "}
            <Link
              href="/projects"
              className={`${styles.portfolioItemLink} relative z-10`}
            >
              Попробовать{" "}
            </Link>
          </div>
          <div
            className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
          >
            <Image
              src="/icons/pdf-new.png"
              alt="PDF Converter Icon"
              width={50}
              height={50}
              className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]"
            />
            <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">
              HTML → PDF конвертер
            </h3>
            <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">
              Превращение HTML-страниц в PDF.
            </p>
            <Link
              href="/projects/converters"
              className={`${styles.portfolioItemLink} relative z-10`}
            >
              Попробовать{" "}
            </Link>
          </div>
          <div
            className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
          >
            <Image
              src="/icons/pptx.png"
              alt="PPTX Converter Icon"
              width={50}
              height={50}
              className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]"
            />
            <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">
              HTML → PPTX конвертер
            </h3>
            <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">
              Генерация презентаций из HTML-шаблонов.
            </p>
            <Link
              href="/projects/converters"
              className={`${styles.portfolioItemLink} relative z-10`}
            >
              Попробовать{" "}
            </Link>
          </div>
        </div>
        <div className="mt-[50px]">
          <BentoButton href="/projects" variant="primary">
            Смотреть все кейсы
          </BentoButton>
        </div>
      </div>
    </section>
  );
}
