import Link from "next/link";
import BentoButton from "./components/BentoButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold gradient-text-diagonal mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Страница не найдена</h2>

        <p className="text-gray-600 mb-8 text-lg">
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <BentoButton href="/" variant="primary">
            На главную
          </BentoButton>
          <BentoButton href="/projects" variant="outline">
            Проекты
          </BentoButton>
        </div>

        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-4">Или посмотрите:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
            <Link href="/services" className="text-primary hover:text-accent transition-colors">
              → Услуги
            </Link>
            <Link href="/blog" className="text-primary hover:text-accent transition-colors">
              → Блог
            </Link>
            <Link href="/about" className="text-primary hover:text-accent transition-colors">
              → Обо мне
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
