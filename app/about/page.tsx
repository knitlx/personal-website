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
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <Image
                  src="/profile.png"
                  alt="Воронова Александра"
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="md:pt-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-10 font-unbounded-fix text-center md:text-center">Воронова Александра</h1>
                <div className="text-base text-gray-700 space-y-2 text-center md:text-left">
                  <p>Я помогаю бизнесу разбираться в цифровых задачах, наводить порядок и создавать AI-инструменты, которые действительно приносят пользу.</p>
                  <p>Работаю на стыке системного мышления и технологий: упрощаю процессы, автоматизирую рутину и делаю решения удобными в ежедневной работе.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PhilosophyIcon />
                <h2 className="text-3xl font-bold text-gray-900 font-unbounded-fix">Философия работы</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Я начинаю с понимания сути: разбираю задачу, выделяю главное и убираю лишнее — и только потом создаю инструмент или автоматизацию.</p>
                <blockquote className="pl-4 italic border-l-4 border-[#AB5EED] text-gray-600">
                  "AI для меня — не магия, а партнёр. Я использую его в проектах и в жизни: чтобы искать идеи, проверять гипотезы и ускорять рутинные задачи. Он помогает смотреть шире и приходить к рабочим решениям."
                </blockquote>
                <p>Для меня важно, чтобы решением было легко пользоваться каждый день.</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <HowIWorkIcon />
                <h2 className="text-3xl font-bold text-gray-900 font-unbounded-fix">Как я работаю</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Вникаю в контекст. Собираю данные, уточняю вводные и нахожу главное.</li>
                  <li>Строю логику. Анализирую процессы, определяю, что можно упростить и что стоит автоматизировать.</li>
                  <li>Предлагаю варианты. От быстрых решений до вариантов, которые закрывают задачу глубже.</li>
                  <li>Реализую. Прототип, автоматизация или структура — адаптированная под реальные условия.</li>
                  <li>Довожу до удобства. Убираю лишнее и проверяю, насколько решением удобно пользоваться в работе.</li>
                </ul>
                <p>Так вы получаете не только идею, но и <span className="font-semibold text-[#619BEC]">рабочий, надёжный результат</span>.</p>
              </div>
            </section>
          </div>

          <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
            <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
              <SkillsIcon />
              <h2 className="text-3xl font-bold text-gray-900 font-unbounded-fix">Технические навыки и инструменты</h2>
            </div>
            <div className="text-base text-gray-700 space-y-4">
              <p className="text-center">Я сочетаю системное мышление, технологии и AI — подбираю инструменты под задачу, а не наоборот.</p>
              {(() => {
                const skills = {
                  "AI и технологии": ["промт-инжиниринг", "генеративные модели", "понимание логики кода", "API и интеграции", "автоматизации", "лёгкая веб-разработка"],
                  "Структура и данные": ["систематизация информации", "анализ и синтез данных", "документация", "базы знаний"],
                  "AI-контент и медиа": ["генерация изображений и видео", "базовая работа с графикой и монтажом", "подготовка текстов"],
                  "Рабочие процессы": ["уточнение размытых задач", "ресёрч", "формирование требований", "приоритизация", "взаимодействие с командами"],
                };
                return Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}:</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span key={skill} className="bg-[#ECF2FD] text-[#619BEC] text-sm font-medium px-4 py-2 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              })()}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <WhoAmIForIcon />
                <h2 className="text-3xl font-bold text-gray-900 font-unbounded-fix">Кому я подхожу</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Я полезна там, где много задач, мало ясности и нужно навести цифровой порядок.</p>
                <p>Со мной чаще всего работают малый бизнес, небольшие команды и предприниматели — тем, кому важны <span className="font-semibold text-[#AB5EED]">простые решения и спокойный, понятный подход</span>.</p>
                <p>Помогаю в проектах, где нужно разобраться в хаосе, выстроить логику процессов или подобрать подходящие AI-инструменты.</p>
                <p>Если вам нужен универсал, который аккуратно разбирается в задаче, упрощает её и доводит до рабочего результата — я подойду.</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-8">
                <PersonalIcon />
                <h2 className="text-3xl font-bold text-gray-900 font-unbounded-fix">Немного личного</h2>
              </div>
              <div className="text-base text-gray-700 space-y-2">
                <p>Мне близка системность: я лучше работаю, когда информация и задачи организованы.</p>
                <p>AI — часть моей повседневной работы и жизни. Я обращаюсь к нему за идеями, планированием, обучением и бытовыми решениями — он помогает быстрее находить рабочие варианты.</p>
                <p>По характеру я спокойная и внимательная: предпочитаю продуманность скорости и довожу задачи до результата, которым можно пользоваться каждый день.</p>
              </div>
            </section>
          </div>

          {/* Reusing the CTA structure */}
          <section className="text-center py-16 bg-blue-500 text-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Хотите узнать, как я могу помочь вашему бизнесу?</h3>
            <p className="text-base mb-8">Свяжитесь со мной для бесплатной консультации.</p>
            <GradientBorderButton onClick={() => setIsModalOpen(true)}>Написать мне</GradientBorderButton>
          </section>

        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
