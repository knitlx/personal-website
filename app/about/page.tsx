"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BentoButton from "../components/BentoButton";
import ContactModal from "../components/ContactModal";
import whatIDoStyles from "../components/WhatIDoSection.module.css";

// --- Icon Components ---

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
            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <Image
                  src="/icons/philosophy.png"
                  alt="Философия работы"
                  width={40}
                  height={40}
                />

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

            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <Image
                  src="/icons/how-i-work.png"
                  alt="Как я работаю"
                  width={40}
                  height={40}
                />

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
            <div className="flex justify-center items-center gap-4 mb-8">
              <Image
                src="/icons/about-tools.png"
                alt="Инструменты и технологии"
                width={40}
                height={40}
              />

              <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                Инструменты и технологии
              </h2>
            </div>

            <div className="text-base text-gray-700 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-fit mx-auto">
                <div
                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/automatisation-tools.png"
                      alt="Автоматизация и интеграции"
                      width={24}
                      height={24}
                    />

                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                      Автоматизация и интеграции
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        n8n
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        API
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        webhooks
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Email / SMTP
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/web-infra.png"
                      alt="Веб и инфраструктура"
                      width={24}
                      height={24}
                    />

                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent mt-[-1px]">
                      Веб и инфраструктура
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        React
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Next.js
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        HTML / CSS
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        JavaScript
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Tailwind CSS
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Vercel
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Railway
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Git / GitHub
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/data-workspace.png"
                      alt="Данные и рабочая среда"
                      width={24}
                      height={24}
                    />

                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                      Данные и рабочая среда
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Google Workspace
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Airtable
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Supabase
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        PostgreSQL
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`${whatIDoStyles.whatIDoItem} bg-[#f7f9fc] rounded-xl p-[25px] text-left transition-all duration-300 ease-in-out flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/management-docs.png"
                      alt="Управление и документация"
                      width={24}
                      height={24}
                    />

                    <h3 className="text-xl font-semibold gradient-hero-desc bg-clip-text text-transparent">
                      Управление и документация
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Notion
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Jira
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Trello
                      </span>
                    </span>
                    <span className="tag-gradient-background inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="gradient-hero-desc bg-clip-text text-transparent text-sm font-medium">
                        Figma
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <Image
                  src="/icons/who-i-am-for.png"
                  alt="Кому я подхожу"
                  width={40}
                  height={40}
                />

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

            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <Image
                  src="/icons/personal.png"
                  alt="Немного личного"
                  width={40}
                  height={40}
                />

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

          {/* CTA Section adapted from CtaSection.tsx for design consistency */}
          <section className="py-8">
            <div className="mx-auto bg-transparent text-center backdrop-blur-sm border border-gray-200 shadow-[0_0_50px_rgba(123,104,238,0.1)] rounded-2xl p-8">
              <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">
                Есть задача или идея?
              </h2>
              <p className="text-[18px] text-[#555] max-w-2xl mx-auto mb-10 leading-normal">
                Давайте разберёмся вместе и найдём рабочее решение.
              </p>
              <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
                <BentoButton
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                >
                  Написать мне
                </BentoButton>
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
