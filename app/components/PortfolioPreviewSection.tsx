import styles from './PortfolioPreviewSection.module.css';
import Link from "next/link";
import GradientBorderButton from "./GradientBorderButton";
import Image from 'next/image'; // Added Image import

export default function PortfolioPreviewSection() {
  return (
    <section className="py-12 text-center bg-transparent backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)] mb-[50px]">
        <div className="container">
            <h2 className="font-unbounded-fix text-[40px] font-bold leading-tight text-[#333333] mb-[15px]">Мои проекты</h2>
            <p className="text-[18px] text-[#666] max-w-[700px] mx-auto mb-[50px]">Примеры проектов, которые я собрала с помощью AI.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[40px]">
                <div className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}>
                    <Image 
                        src="/icons/icon-telegram-bot.png" 
                        alt="Telegram Bot Icon" 
                        width={50} 
                        height={50} 
                        className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" 
                    />
                    <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">Финансовый Telegram-бот</h3>
                    <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Учёт доходов и расходов, визуальный интерфейс в mini-app.</p>
                    <Link href="/projects" className={`${styles.portfolioItemLink} relative z-10`}>Попробовать </Link>
                </div>
                <div className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}>
                    <Image 
                        src="/icons/icon-pdf.png" 
                        alt="PDF Converter Icon" 
                        width={50} 
                        height={50} 
                        className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" 
                    />
                    <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">HTML → PDF конвертер</h3>
                    <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Превращение HTML-страниц в PDF.</p>
                    <Link href="/projects/converters" className={`${styles.portfolioItemLink} relative z-10`}>Попробовать </Link>
                </div>
                <div className={`${styles.portfolioItem} bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}>
                    <Image 
                        src="/icons/icon-pptx.png" 
                        alt="PPTX Converter Icon" 
                        width={50} 
                        height={50} 
                        className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]" 
                    />
                    <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">HTML → PPTX конвертер</h3>
                    <p className="text-[15px] text-[#888] leading-snug mb-[15px] min-h-[45px]">Генерация презентаций из HTML-шаблонов.</p>
                    <Link href="/projects/converters" className={`${styles.portfolioItemLink} relative z-10`}>Попробовать </Link>
                </div>
            </div>
                            <div className="mt-[50px]">
                                <GradientBorderButton href="/projects">
                                    Смотреть все кейсы
                                </GradientBorderButton>                </div>
        </div>
    </section>
  );
}
