"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GradientBorderButton from "../components/GradientBorderButton";
import ContactModal from "../components/ContactModal";
import whatIDoStyles from "../components/WhatIDoSection.module.css";

// --- Icon Components ---

const PhilosophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#AB5EED]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    />
  </svg>
);

const HowIWorkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#619BEC]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.746 3.746 0 0 1-5.714 0m-9.386 0A3.746 3.746 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 5.714 0m-9.386 0C1.63 9.61 0 10.732 0 12s1.63 2.39 4.407 3.068"
    />
  </svg>
);

const SkillsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#AB5EED]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.205-.796l.78-2.09a.75.75 0 0 0-1.226-1.226l-2.09.78c-.132.05-.255.118-.369.2a2.652 2.652 0 0 0-3.03 2.496L11.42 15.17Z"
    />

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 4.5v.01m0 3v.01m0 3v.01m3-6v.01m0 3v.01m0 3v.01m3-6v.01m0 3v.01m0 3v.01"
    />
  </svg>
);

// --- Icons for Skills Section ---

const AiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-purple-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 5.25v-1.5m0 15v1.5m3.75-18v1.5m0 15v1.5M12 12.75a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z"
    />

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 12a8.25 8.25 0 1 0 16.5 0 8.25 8.25 0 0 0-16.5 0z"
    />
  </svg>
);

const StructureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-purple-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m0-3.75h.008v.008H12v-.008h-.008v.008H3.75v-.008Zm0 3.75h.008v.008H12v-.008h-.008v.008H3.75v-.008Z"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-purple-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-4.5 16.5"
    />
  </svg>
);

const ProcessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-purple-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
    />
  </svg>
);

const WhoAmIForIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#619BEC]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.512 2.72a3 3 0 0 1-4.682-2.72 9.094 9.094 0 0 1 3.741-.479m7.512 2.72a8.97 8.97 0 0 1-7.512 0m7.512 0a8.97 8.97 0 0 0-7.512 0m-3.755-4.48a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm12 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="url(#checkGradient)"
    className="w-7 h-7 flex-shrink-0 mr-3"
  >
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#9137DF", stopOpacity: 1 }} />

        <stop offset="100%" style={{ stopColor: "#7A68EE", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const PersonalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-[#AB5EED]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
    />
  </svg>
);

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-white">
        {/* Subtle Background Shapes */}

        <div className="absolute top-10 left-0 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob mix-blend-multiply"></div>

        <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-2000 mix-blend-multiply"></div>

        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-200 to-red-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-4000 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto w-full">
          <section className="p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              {/* Left Column (Text) - takes 2/3 of the width */}

              <div className="md:col-span-2">
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 font-unbounded-fix text-left mb-4">
                  Воронова Александра
                </h1>

                <div className="text-base text-gray-700 space-y-2 text-left">
                  <p>
                    Я помогаю бизнесу разбираться в цифровых задачах, наводить
                    порядок и создавать AI-инструменты и автоматизации, которые
                    действительно приносят пользу.
                  </p>

                  <p>
                    Работаю на стыке системного мышления и технологий: упрощаю
                    процессы, проектирую и внедряю автоматизации, которые
                    снимают ручную рутину и делают работу удобнее каждый день.
                  </p>
                </div>
              </div>

              {/* Right Column (Image) - takes 1/3 of the width */}

              <div className="flex justify-center">
                <Image
                  src="/profile.png"
                  alt="Воронова Александра"
                  width={256}
                  height={256}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PhilosophyIcon />

                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                  Философия работы
                </h2>
              </div>

              <div className="text-base text-gray-700 space-y-2">
                <p>
                  Я начинаю с понимания сути: разбираю задачу, выделяю главное и
                  убираю лишнее — и только потом создаю инструмент или
                  автоматизацию под конкретный рабочий процесс.
                </p>

                <p>
                  AI для меня — не магия, а партнёр. Я использую его в проектах
                  и в жизни: чтобы искать идеи, проверять гипотезы, ускорять
                  рутинные действия и находить более простые способы решения
                  задач. Он помогает смотреть шире и получать работающий
                  результат.
                </p>

                <p>
                  Для меня важно, чтобы инструменты и автоматизации были
                  понятными — такими, которыми легко пользоваться каждый день.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <HowIWorkIcon />

                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                  Как я работаю
                </h2>
              </div>

              <div className="text-base text-gray-700 space-y-2">
                <ul className="custom-list space-y-1">
                  <li>
                    Вникаю в контекст. Собираю данные, уточняю вводные и нахожу
                    главное.
                  </li>

                  <li>
                    Строю логику. Анализирую процессы и определяю, какие шаги
                    можно упростить или автоматизировать, чтобы убрать ручную
                    работу.
                  </li>

                  <li>
                    Предлагаю варианты. От быстрых автоматизаций до более
                    глубоких решений — в зависимости от задачи и ресурсов.
                  </li>

                  <li>
                    Реализую. Собираю автоматизацию, прототип или структуру и
                    адаптирую под реальные условия работы.
                  </li>

                  <li>
                    Довожу до удобства. Убираю лишнее и проверяю, чтобы
                    автоматизация действительно помогала, а не усложняла
                    процесс.
                  </li>
                </ul>

                <p>
                  В результате вы получаете не идею «на бумаге», а рабочую
                  автоматизацию или инструмент, встроенный в реальные процессы.
                </p>
              </div>
            </section>
          </div>

          <section className="p-8 md:p-12 mb-16">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
              <SkillsIcon />

              <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                Инструменты и технологии
              </h2>
            </div>

            <div className="text-base text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div
                                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <AiIcon />
                
                                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                                      Автоматизация и интеграции
                                    </h3>
                                  </div>
                
                                                    <div className="flex flex-wrap gap-2">
                
                                                      <span
                
                                                        className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                
                                                      >
                
                                                        n8n
                
                                                      </span>
                
                                  
                
                                                      <span
                
                                                        className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                
                                                      >
                
                                                        API
                
                                                      </span>
                
                                  
                
                                                      <span
                
                                                        className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                
                                                      >
                
                                                        webhooks
                
                                                      </span>
                
                                  
                
                                                      <span
                
                                                        className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                
                                                      >
                
                                                        Email / SMTP
                
                                                      </span>
                
                                                    </div>
                                </div>
                
                                <div
                                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <CodeIcon />
                
                                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                                      Веб и инфраструктура
                                    </h3>
                                  </div>
                
                                  <div className="flex flex-wrap gap-2">
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      React
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Next.js
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      HTML / CSS
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      JavaScript
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Tailwind CSS
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Vercel
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Railway
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Git / GitHub
                                    </span>
                                  </div>
                                </div>
                
                                <div
                                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                                >
                                  <div className="flex items-center gap-3 mb-4">
                                    <StructureIcon />
                
                                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                                      Данные и рабочая среда
                                    </h3>
                                  </div>
                
                                  <div className="flex flex-wrap gap-2">
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Google Workspace
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Airtable
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      Supabase
                                    </span>
                
                                    <span
                                      className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200"
                                    >
                                      PostgreSQL
                                    </span>
                                  </div>
                                </div>

                <div
                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <ProcessIcon />

                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                      Управление и документация
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                      Notion
                    </span>
                    <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                      Jira
                    </span>
                    <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                      Trello
                    </span>
                    <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                      Figma
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <WhoAmIForIcon />

                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                  Кому я подхожу
                </h2>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckIcon />

                  <span className="text-base text-gray-700 leading-relaxed">
                    У вас <strong>много задач, но мало ясности.</strong> Нужно
                    навести цифровой порядок и снять с команды ручную рутину.
                  </span>
                </li>

                <li className="flex items-start">
                  <CheckIcon />

                  <span className="text-base text-gray-700 leading-relaxed">
                    Вы — <strong>малый бизнес или небольшая команда.</strong>{" "}
                    Вам важны простые, работающие автоматизации без сложного
                    Enterprise-подхода.
                  </span>
                </li>

                <li className="flex items-start">
                  <CheckIcon />

                  <span className="text-base text-gray-700 leading-relaxed">
                    Нужно <strong>разобрать хаос.</strong> Выстроить логику, где
                    сейчас всё держится на «честном слове», и внедрить AI под
                    реальные задачи.
                  </span>
                </li>

                <li className="flex items-start">
                  <CheckIcon />

                  <span className="text-base text-gray-700 leading-relaxed">
                    Вам нужен <strong>универсал.</strong> Специалист, который
                    сам разберётся в процессах, предложит решение и своими
                    руками доведёт его до результата.
                  </span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PersonalIcon />

                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                  Немного личного
                </h2>
              </div>

              <div className="text-base text-gray-700 space-y-2">
                <p>
                  Мне близка системность: я лучше работаю, когда информация,
                  задачи и процессы организованы.
                </p>

                <p>
                  AI — часть моей повседневной работы и жизни. Я обращаюсь к
                  нему за идеями, планированием, обучением и бытовыми задачами —
                  он помогает быстрее находить рабочие варианты и принимать
                  решения.
                </p>

                <p>
                  По характеру я спокойная и внимательная. Предпочитаю не
                  торопиться без смысла, а продумывать решения так, чтобы ими
                  было удобно пользоваться каждый день.
                </p>
              </div>
            </section>
          </div>

          {/* Reusing the CTA structure */}

          <section className="bg-transparent py-8 text-center backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
            <div className="container">
              <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">
                Есть задача или идея?
              </h2>

              <p className="text-[18px] text-[#555] max-w-[650px] mx-auto mb-10 leading-normal">
                Давайте разберёмся вместе и найдём рабочее решение.
              </p>

              <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
                <GradientBorderButton onClick={() => setIsModalOpen(true)} variant="gradient">
                  Написать мне
                </GradientBorderButton>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
