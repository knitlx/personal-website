"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./PortfolioPreviewSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioSlider() {
  return (
    <Swiper
      className=""
      // Удаляем padding и margin с компонента Swiper, будем добавлять к самим карточкам
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      <SwiperSlide>
        <div
          className={`${styles.portfolioItem} w-[320px] h-[300px] flex flex-col bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
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
          <p className="text-[15px] text-[#888] leading-snug mb-[15px]">
            автоматизация на n8n + изуальный интерфейс в mini-app
          </p>{" "}
          <Link
            href="/projects"
            className={`${styles.portfolioItemLink} relative z-10`}
          >
            Попробовать
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={`${styles.portfolioItem} w-[320px] h-[300px] flex flex-col bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
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
          <p className="text-[15px] text-[#888] leading-snug mb-[15px]">
            Превращение HTML-страниц в PDF.
          </p>
          <Link
            href="/projects/converters"
            className={`${styles.portfolioItemLink} relative z-10`}
          >
            Попробовать
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={`${styles.portfolioItem} w-[320px] h-[300px] flex flex-col bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
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
          <p className="text-[15px] text-[#888] leading-snug mb-[15px]">
            Генерация презентаций из HTML-шаблонов.
          </p>
          <Link
            href="/projects/converters"
            className={`${styles.portfolioItemLink} relative z-10`}
          >
            Попробовать
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={`${styles.portfolioItem} w-[320px] h-[300px] flex flex-col bg-[#f7f9fc] rounded-xl px-[25px] py-[30px] text-left transition-all duration-300 ease-in-out`}
        >
          <Image
            src="/icons/sistem.png" // Временная заглушка
            alt="AI Processing Icon"
            width={50}
            height={50}
            className="portfolio-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center mb-[15px] text-[28px]"
          />
          <h3 className="text-[22px] font-semibold text-[#333333] mb-[10px]">
            AI-обработка обращений
          </h3>
          <p className="text-[15px] text-[#888] leading-snug mb-[15px]">
            AI анализирует обращения из разных источников, структурирует данные
            и создаёт тикеты с приоритетами.
          </p>
          <Link
            href="/projects" // Здесь может быть ссылка на этот проект
            className={`${styles.portfolioItemLink} relative z-10`}
          >
            Попробовать
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
