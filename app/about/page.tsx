import Link from "next/link";

// Icons
const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600 mb-4 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-600 mb-4 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.586v-4.131a4.34 4.34 0 0 0-4.34-4.34H12L9.172 2.759a4.93 4.93 0 0 0-3.518-1.424H4.54C2.647 1.335 1 2.982 1 4.909v12.182A3.92 3.92 0 0 0 4.92 21H16.08a3.92 3.92 0 0 0 3.92-3.92V14.586h.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 6.75h4.5m-4.5 3h4.5m-4.5 3h4.5m-4.5 3h4.5M19.5 3.75l2.25 2.25-2.25 2.25m0 4.5l2.25 2.25-2.25 2.25" />
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600 mb-4 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" />
  </svg>
);


export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-12">Обо мне</h1>

        {/* Секция: Мой путь к автоматизации */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <div className="flex flex-col items-center mb-6">
            <HistoryIcon />
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-4">Мой путь к автоматизации</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Я пришла к автоматизации, потому что искренне верю, что рутинные задачи не должны отнимать
              драгоценное время и энергию. Моя цель — превращать хаос в понятный алгоритм,
              выстраивая эффективные и предсказуемые процессы для бизнеса.
            </p>
            <p>
              Мой подход основан на системности, порядке и глубоком понимании того, как технологии
              могут служить людям. Я училась в МФПУ и Skillbox, где получила фундаментальные знания
              и практические навыки в области управления проектами, аналитики и цифровых решений.
            </p>
            <p>
              Каждый проект для меня — это возможность создать нечто большее, чем просто инструмент.
              Это возможность построить систему, которая будет работать на вас, а не вы на нее.
            </p>
          </div>
        </section>

        {/* Секция: Опыт работы */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <div className="flex flex-col items-center mb-6">
            <ExperienceIcon />
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-4">Опыт работы</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-4">
            <ul className="list-disc list-inside">
              <li>**Системный аналитик** — Разработка и внедрение автоматизированных систем отчетности.</li>
              <li>**Менеджер проектов** — Руководство командами по оптимизации бизнес-процессов.</li>
              <li>**Специалист по данным** — Построение аналитических дашбордов и баз данных.</li>
            </ul>
          </div>
        </section>

        {/* Секция: Навыки */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <div className="flex flex-col items-center mb-6">
            <SkillsIcon />
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-4">Мои Навыки</h2>
          </div>
          <div className="text-lg text-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ul className="list-disc list-inside space-y-2">
              <li className="font-semibold">Автоматизация:</li>
              <ul className="list-disc list-inside ml-4">
                <li>n8n, make.com</li>
                <li>API-интеграции</li>
                <li>Разработка чат-ботов</li>
              </ul>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li className="font-semibold">AI & Контент:</li>
              <ul className="list-disc list-inside ml-4">
                <li>Промпт-инженерия</li>
                <li>Генерация текста, видео, графики</li>
                <li>AI-анализ данных</li>
              </ul>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li className="font-semibold">Технические:</li>
              <ul className="list-disc list-inside ml-4">
                <li>HTML/CSS</li>
                <li>Основы JavaScript/Python</li>
                <li>Работа с базами данных</li>
                <li>Графика и дизайн</li>
              </ul>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li className="font-semibold">Систематизация:</li>
              <ul className="list-disc list-inside ml-4">
                <li>Разработка регламентов</li>
                <li>Базы знаний (Notion, Confluence)</li>
                <li>Анализ и оптимизация процессов</li>
              </ul>
            </ul>
          </div>
        </section>

        {/* CTA for About page */}
        <section className="text-center py-16 bg-blue-500 text-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6">
            Хотите узнать, как я могу помочь вашему бизнесу?
          </h3>
          <p className="text-lg mb-8">
            Свяжитесь со мной для бесплатной консультации.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800">
            Написать мне
          </Link>
        </section>

      </div>
    </div>
  );
}
