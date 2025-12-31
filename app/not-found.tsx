import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Страница не найдена
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          Извините, но страница, которую вы ищете, не существует или была
          перемещена.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg font-unbounded-fix font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer px-6 py-3 text-sm bg-gradient-to-r from-[#9137df] to-[#7a68ee] text-white hover:opacity-90"
          >
            На главную
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg font-unbounded-fix font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer px-6 py-3 text-sm border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            Проекты
          </Link>
        </div>

        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-4">Или посмотрите:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
            <Link
              href="/projects/document-converter"
              className="text-[#7a68ee] hover:text-[#9137df] transition-colors"
            >
              → Конвертер документов
            </Link>
            <Link
              href="/services"
              className="text-[#7a68ee] hover:text-[#9137df] transition-colors"
            >
              → Услуги
            </Link>
            <Link
              href="/blog"
              className="text-[#7a68ee] hover:text-[#9137df] transition-colors"
            >
              → Блог
            </Link>
            <Link
              href="/about"
              className="text-[#7a68ee] hover:text-[#9137df] transition-colors"
            >
              → Обо мне
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
