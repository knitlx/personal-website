'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import GradientBorderButton from "../components/GradientBorderButton";
import ContactModal from '../components/ContactModal';


// --- Icon Components ---

const PhilosophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#AB5EED]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const HowIWorkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#619BEC]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.746 3.746 0 0 1-5.714 0m-9.386 0A3.746 3.746 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 5.714 0m-9.386 0C1.63 9.61 0 10.732 0 12s1.63 2.39 4.407 3.068" />
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#AB5EED]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.205-.796l.78-2.09a.75.75 0 0 0-1.226-1.226l-2.09.78c-.132.05-.255.118-.369.2a2.652 2.652 0 0 0-3.03 2.496L11.42 15.17Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5v.01m0 3v.01m0 3v.01m3-6v.01m0 3v.01m0 3v.01m3-6v.01m0 3v.01m0 3v.01" />
  </svg>
);

const WhoAmIForIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#619BEC]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.512 2.72a3 3 0 0 1-4.682-2.72 9.094 9.094 0 0 1 3.741-.479m7.512 2.72a8.97 8.97 0 0 1-7.512 0m7.512 0a8.97 8.97 0 0 0-7.512 0m-3.755-4.48a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm12 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
  </svg>
);

const PersonalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#AB5EED]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);


export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Subtle Background Shapes */}
        <div className="absolute top-10 left-0 w-80 h-80 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-200 to-red-200 rounded-full opacity-20 filter blur-3xl z-0 animate-blob animation-delay-4000 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto w-full">
          <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/new_profile_image.png"
                  alt="Воронова Александра"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 font-unbounded-fix text-left">Воронова Александра</h1>
              </div>
              <div className="text-base text-gray-700 space-y-2 text-left">
                <p>Я помогаю бизнесу разбираться в цифровых задачах, наводить порядок и создавать AI-инструменты и автоматизации, которые действительно приносят пользу.</p>
                <p>Работаю на стыке системного мышления и технологий: упрощаю процессы, проектирую и внедряю автоматизации, которые снимают ручную рутину и делают работу удобнее каждый день.</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PhilosophyIcon />
                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">Философия работы</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Я начинаю с понимания сути: разбираю задачу, выделяю главное и убираю лишнее — и только потом создаю инструмент или автоматизацию под конкретный рабочий процесс.</p>
                <p>AI для меня — не магия, а партнёр. Я использую его в проектах и в жизни: чтобы искать идеи, проверять гипотезы, ускорять рутинные действия и находить более простые способы решения задач. Он помогает смотреть шире и получать работающий результат.</p>
                <p>Для меня важно, чтобы инструменты и автоматизации были понятными — такими, которыми легко пользоваться каждый день.</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <HowIWorkIcon />
                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">Как я работаю</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <ul className="custom-list space-y-1">
                  <li>Вникаю в контекст. Собираю данные, уточняю вводные и нахожу главное.</li>
                  <li>Строю логику. Анализирую процессы и определяю, какие шаги можно упростить или автоматизировать, чтобы убрать ручную работу.</li>
                  <li>Предлагаю варианты. От быстрых автоматизаций до более глубоких решений — в зависимости от задачи и ресурсов.</li>
                  <li>Реализую. Собираю автоматизацию, прототип или структуру и адаптирую под реальные условия работы.</li>
                  <li>Довожу до удобства. Убираю лишнее и проверяю, чтобы автоматизация действительно помогала, а не усложняла процесс.</li>
                </ul>
                <p>В результате вы получаете не идею «на бумаге», а рабочую автоматизацию или инструмент, встроенный в реальные процессы.</p>
              </div>
            </section>
          </div>

          <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
              <SkillsIcon />
              <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">Технические навыки и инструменты</h2>
            </div>
            <div className="text-base text-gray-700">
              <p className="mb-4">Я сочетаю системное мышление, технологии и AI, чтобы проектировать и внедрять автоматизации под задачи бизнеса.</p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6">
              {(() => {
                const skills = {
                  "AI и автоматизации": [
                    "проектирование и разработка автоматизаций под рабочие процессы",
                    "n8n: сценарии, логика, интеграции, обработка данных",
                    "API и webhooks, связка внешних сервисов",
                    "генеративные AI-модели и промт-инжиниринг",
                    "лёгкие веб-интерфейсы для автоматизаций и внутренних инструментов"
                  ],
                  "Структура и данные": [
                    "систематизация информации и процессов",
                    "анализ и синтез данных для принятия решений",
                    "документация и описание процессов",
                    "базы знаний для команд"
                  ],
                  "Рабочие процессы": [
                    "уточнение размытых задач",
                    "ресёрч и анализ",
                    "формирование требований",
                    "приоритизация задач",
                    "взаимодействие с командами и подрядчиками"
                  ]
                };
                return Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}:</h3>
                    <ul className="custom-list space-y-1">
                      {items.map((skill) => (
                        <li key={skill} className="text-base text-gray-700">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              })()}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <WhoAmIForIcon />
                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">Кому я подхожу</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Я полезна там, где много задач, мало ясности и нужно навести цифровой порядок и снять ручную рутину.</p>
                <p>Чаще всего со мной работают малый бизнес, небольшие команды и предприниматели, которым важны простые автоматизации и спокойный, понятный подход.</p>
                <p>Помогаю в проектах, где нужно разобрать хаотичные процессы, выстроить логику работы и внедрить автоматизации или AI-инструменты под реальные задачи.</p>
                <p>Если вам нужен универсал, который разберётся в процессах, предложит понятные варианты автоматизации и доведёт всё до рабочего результата — я подойду.</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PersonalIcon />
                <h2 className="text-3xl font-medium text-gray-900 font-unbounded-fix">Немного личного</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Мне близка системность: я лучше работаю, когда информация, задачи и процессы организованы.</p>
                <p>AI — часть моей повседневной работы и жизни. Я обращаюсь к нему за идеями, планированием, обучением и бытовыми задачами — он помогает быстрее находить рабочие варианты и принимать решения.</p>
                <p>По характеру я спокойная и внимательная. Предпочитаю не торопиться без смысла, а продумывать решения так, чтобы ими было удобно пользоваться каждый день.</p>
              </div>
            </section>
          </div>

          {/* Reusing the CTA structure */}
          <section className="bg-transparent py-8 text-center backdrop-blur-sm border-b border-b-[#eee] shadow-[0_0_50px_rgba(123,104,238,0.1)]">
            <div className="container">
                <h2 className="font-unbounded-fix text-[38px] font-medium text-[#333333] mb-[15px]">Есть задача или идея?</h2>
                <p className="text-[18px] text-[#555] max-w-[650px] mx-auto mb-10 leading-normal">Давайте разберёмся вместе и найдём рабочее решение.</p>
                <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-[15px] max-w-md mx-auto">
                    <GradientBorderButton onClick={() => setIsModalOpen(true)}>
                        Написать мне
                    </GradientBorderButton>
                </div>
            </div>
          </section>

        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
