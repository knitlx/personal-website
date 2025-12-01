import Link from "next/link";

// Icons
const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8.25V5.25A2.25 2.25 0 0 1 9.25 3h5.5A2.25 2.25 0 0 1 17 5.25V8.25M12 21.75c-3.792 0-6.75-2.457-6.75-5.419 0-1.896.76-3.791 2.238-5.32 1.478-1.53 3.513-2.618 5.495-2.618 1.982 0 4.017 1.088 5.495 2.618 1.478 1.529 2.238 3.424 2.238 5.32 0 2.962-2.958 5.419-6.75 5.419Z" />
  </svg>
);

const ConverterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-600 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.181m0-4.993L2.985 19.644M9.348 19.644H4.356m0 0l3.181-3.181m0 4.993L4.356 19.644" />
  </svg>
);

const N8nCaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-purple-600 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5M18 12a1.5 1.5 0 0 0-1.5-1.5H15a1.5 1.5 0 0 0-1.5 1.5v3.75m-4.5-4.5H9.75a1.5 1.5 0 0 0-1.5 1.5v2.25m-2.25-4.5H3.75a1.5 1.5 0 0 0-1.5 1.5v2.25m18-4.5H16.5a1.5 1.5 0 0 0-1.5 1.5v3.75m-4.5-4.5H9.75a1.5 1.5 0 0 0-1.5 1.5v2.25m-2.25-4.5H3.75a1.5 1.5 0 0 0-1.5 1.5v2.25" />
  </svg>
);


export default function LabPage() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-12">Лаборатория Прототипов</h1>

        {/* Секция Финансовый Telegram-бот */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Прототип: Личный Финансовый Ассистент (n8n + Telegram)
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 text-lg text-gray-700">
              <p className="mb-4">
                Этот бот создан на n8n для быстрой фиксации доходов/расходов и выгрузки данных в таблицы.
                Он демонстрирует возможности n8n в интеграции мессенджеров и хранилищ данных.
              </p>
              <p className="mb-6">
                P.S. Функции Gemini CLI пока нет, но это следующий этап.
              </p>
              <div className="flex justify-center md:justify-start">
                <a href="https://t.me/your_telegram_bot_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600">
                  <TelegramIcon />
                  Перейти в Telegram-бот
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              {/* Заглушка для видео/гифки */}
              <div className="w-full max-w-sm h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Место для видео/гифки работы бота
              </div>
            </div>
          </div>
          <div className="mt-10 text-center bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Вам нужна такая же автоматизация для лидогенерации, отчетов или HR?
            </h3>
            <Link href="/services" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
              Заказать настройку n8n
            </Link>
          </div>
        </section>

        {/* Секция Конвертеры HTML -> PDF/PPTX */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Конвертеры HTML &rarr; PDF/PPTX (Vibe-Coding)
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 text-lg text-gray-700">
              <p className="mb-4">
                Простые, рабочие инструменты, созданные на чистом коде (HTML/JS/Python-бэкенд),
                чтобы решать точечные, но частые задачи.
              </p>
              <p className="mb-6">
                Пользуйтесь на здоровье! Это демонстрирует мои навыки в разработке веб-инструментов.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/lab/converters" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
                  <ConverterIcon />
                  Перейти к конвертерам
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              {/* Заглушка для изображения или другого визуала */}
              <div className="w-full max-w-sm h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Место для скриншота/визуала конвертеров
              </div>
            </div>
          </div>
        </section>

        {/* Секция Кейсы и Схемы n8n/Систематизации */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Кейсы и Схемы n8n/Систематизации
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Кейс 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm text-center">
              <N8nCaseIcon />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Автоматизация Контента</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Проблема: Ручной сбор и публикация данных из различных источников.
                <br/>Прототип: n8n-воркфлоу для автоматического парсинга, обработки и публикации контента.
                <br/>Результат: Сокращение ручных операций на 30%, ускорение цикла контент-менеджмента.
              </p>
              <Link href="/services" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md">
                Подробнее о внедрении
              </Link>
            </div>

            {/* Кейс 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm text-center">
              <N8nCaseIcon />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">База Знаний</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Проблема: Раздробленная и неструктурированная информация.
                <br/>Прототип: Разработка централизованной базы знаний с регламентами и удобной навигацией.
                <br/>Результат: Улучшение доступа к информации, сокращение времени на поиск данных.
              </p>
              <Link href="/services" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md">
                Подробнее о внедрении
              </Link>
            </div>

            {/* Кейс 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm text-center">
              <N8nCaseIcon />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">HR-Автоматизация</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Проблема: Рутинные операции в процессе найма и онбординга.
                <br/>Прототип: Автоматизация этапов (поиск кандидатов, рассылка приглашений, сбор обратной связи).
                <br/>Результат: Ускорение процесса найма, снижение нагрузки на HR-отдел.
              </p>
              <Link href="/services" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md">
                Подробнее о внедрении
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
