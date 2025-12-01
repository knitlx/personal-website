import Link from "next/link";

// Icons
const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600 mb-4 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10.5 18a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM10.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15 18a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5v-1.5c0-1.24.7-2.347 1.882-2.923C10.618 5.277 11.666 5.564 12 6.3c.334-.736 1.382-1.023 2.118-.653 1.18.576 1.882 1.683 1.882 2.923v1.5a1.5 1.5 0 0 0 0 3v1.5c0 1.24-.7 2.347-1.882 2.923C13.382 18.723 12.334 18.436 12 17.7c-.334.736-1.382 1.023-2.118-.653C8.937 17.58 8.25 16.473 8.25 15v-1.5a1.5 1.5 0 0 0 0-3Z" />
  </svg>
);

const AiAutomationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-600 mb-4 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5M18 12a1.5 1.5 0 0 0-1.5-1.5H15a1.5 1.5 0 0 0-1.5 1.5v3.75m-4.5-4.5H9.75a1.5 1.5 0 0 0-1.5 1.5v2.25m-2.25-4.5H3.75a1.5 1.5 0 0 0-1.5 1.5v2.25m18-4.5H16.5a1.5 1.5 0 0 0-1.5 1.5v3.75m-4.5-4.5H9.75a1.5 1.5 0 0 0-1.5 1.5v2.25m-2.25-4.5H3.75a1.5 1.5 0 0 0-1.5 1.5v2.25" />
  </svg>
);


export default function ServicesPage() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-12">Наши Услуги</h1>

        {/* Блок: Системный Бизнес-Ассистент */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <div className="flex flex-col items-center mb-6">
            <SystemIcon />
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-4">Системный Бизнес-Ассистент</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Систематизация и управление информацией</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Разработка регламентов, оптимизация процессов.</li>
                <li>Создание и структурирование баз знаний.</li>
                <li>Анализ и выбор оптимальных сервисов и подрядчиков.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Планирование и приоритеты</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Помощь в стратегическом и оперативном планировании.</li>
                <li>Настройка систем делегирования задач.</li>
                <li>Фокусировка на ключевых целях и устранение отвлекающих факторов.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Блок: Специалист по автоматизации и AI */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-16">
          <div className="flex flex-col items-center mb-6">
            <AiAutomationIcon />
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-4">Специалист по автоматизации и AI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Автоматизация процессов (n8n/make.com)</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Настройка рабочих процессов для сбора и обработки данных.</li>
                <li>Автоматизация контент-менеджмента и дистрибуции.</li>
                <li>Интеграция различных сервисов через API.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Внедрение AI-инструментов</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Использование нейросетей для генерации контента (текст, видео, графика).</li>
                <li>Разработка и внедрение чат-ботов для поддержки и лидогенерации.</li>
                <li>Автоматический анализ текстов и данных с помощью AI.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA has been moved to the header */}
        <section className="text-center py-16 p-8 rounded-lg">
        </section>

      </div>
    </div>
  );
}
