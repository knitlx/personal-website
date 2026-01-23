import Image from "next/image";
import LazySection from "../components/LazySection";
import ContactModalWrapper from "../components/ContactModalWrapper";
import BentoButton from "../components/BentoButton";
import CheckIcon from "../components/icons/CheckIcon";
import whatIDoStyles from "../components/WhatIDoSection.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Воронова Александра — автоматизация процессов и ИИ-инструменты | NoChaos",
  description:
    "Помогаю бизнесу разбираться в цифровых задачах, наводить порядок и создавать AI-инструменты и автоматизации под реальные процессы",
  keywords:
    "автоматизация процессов, ai инструменты, ии инструменты, системное мышление, цифровые задачи бизнеса, разработка автоматизаций",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Shapes */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob mix-blend-multiply" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-2000 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-200 to-red-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-4000 mix-blend-multiply" />

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
                  процессы, проектирую и внедряю автоматизации, которые снимают
                  ручную рутину и делают работу удобнее каждый день.
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
                sizes="(max-width: 768px) 100vw, 256px"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        <LazySection rootMargin="200px">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <Image
                  src="/icons/philosophy.png"
                  alt="Философия работы"
                  width={40}
                  height={40}
                  sizes="40px"
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
                  sizes="40px"
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
                sizes="40px"
              />
              <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">
                Инструменты и технологии
              </h2>
            </div>

            <div className="text-base text-gray-700 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-fit mx-auto">
                <div className={whatIDoStyles.whatIDoItem}>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/automatisation-tools.png"
                      alt="Автоматизация и интеграции"
                      width={24}
                      height={24}
                      sizes="24px"
                    />
                    <h3 className="text-xl font-semibold bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent">
                      Автоматизация и интеграции
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        n8n
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        API
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        webhooks
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Email / SMTP
                      </span>
                    </span>
                  </div>
                </div>

                <div className={whatIDoStyles.whatIDoItem}>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/web-infra.png"
                      alt="Веб и инфраструктура"
                      width={24}
                      height={24}
                      sizes="24px"
                    />
                    <h3 className="text-xl font-semibold bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent mt-[-1px]">
                      Веб и инфраструктура
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        React
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Next.js
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        HTML / CSS
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        JavaScript
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Tailwind CSS
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Vercel
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Railway
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Git / GitHub
                      </span>
                    </span>
                  </div>
                </div>

                <div className={whatIDoStyles.whatIDoItem}>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/data-workspace.png"
                      alt="Данные и рабочая среда"
                      width={24}
                      height={24}
                      sizes="24px"
                    />
                    <h3 className="text-xl font-semibold bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent">
                      Данные и рабочая среда
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Google Workspace
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Airtable
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Supabase
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        PostgreSQL
                      </span>
                    </span>
                  </div>
                </div>

                <div className={whatIDoStyles.whatIDoItem}>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/icons/management-docs.png"
                      alt="Управление и документация"
                      width={24}
                      height={24}
                      sizes="24px"
                    />
                    <h3 className="text-xl font-semibold bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent">
                      Управление и документация
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Notion
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Jira
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
                        Trello
                      </span>
                    </span>
                    <span className="bg-[linear-gradient(90deg,rgba(145,55,223,0.1)_0%,rgba(123,104,238,0.1)_100%)] inline-block rounded-full border border-gray-200 px-3 py-1">
                      <span className="bg-[linear-gradient(90deg,#9137DF_0%,#7B68EE_100%)] bg-clip-text text-transparent text-sm font-medium">
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
                  sizes="40px"
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
                  sizes="40px"
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
        </LazySection>

        {/* CTA Section adapted from CtaSection.tsx for design consistency */}
        <section className="py-8">
          <div className="mx-auto bg-transparent text-center backdrop-blur-sm border border-gray-200 shadow-[0_0_50px_rgba(123,104,238,0.1)] rounded-2xl p-8">
            <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">
              Есть задача или идея?
            </h2>
            <p className="text-[18px] text-[#555] max-w-2xl mx-auto mb-10 leading-normal">
              Давайте разберёмся вместе и найдём рабочее решение
            </p>
            <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
              <ContactModalWrapper
                button={
                  <BentoButton variant="primary">Написать мне</BentoButton>
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
