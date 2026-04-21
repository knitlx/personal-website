import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | NoChaos",
  description:
    "Политика конфиденциальности NoChaos: как мы собираем, используем и защищаем данные пользователей. Аналитика, cookie и ваши права.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  const siteUrl = SITE_URL;

  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold font-unbounded-fix mb-8 text-gray-900">
          Политика конфиденциальности
        </h1>

        <div className="prose max-w-none text-gray-700 space-y-6">
          <p>
            Настоящая политика конфиденциальности описывает, как сайт <strong>NoChaos</strong> (
            {siteUrl}) собирает и использует данные посетителей.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Какие данные мы собираем</h2>
          <p>
            Сайт не собирает персональные данные напрямую. При использовании контактной формы вы
            добровольно предоставляете имя и email для обратной связи. Эти данные используются
            исключительно для ответа на ваше обращение и не передаются третьим лицам.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Аналитика</h2>
          <p>
            Сайт использует <strong>Яндекс.Метрику</strong> и <strong>Google Analytics</strong> для
            анализа трафика и поведения пользователей. Эти сервисы могут использовать файлы cookie и
            собирать обезличенные данные о визитах (страницы, время на сайте, источник перехода).
            Данные обрабатываются в соответствии с политиками конфиденциальности Яндекс и Google.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Файлы cookie</h2>
          <p>
            Сайт использует технические cookie, необходимые для работы аутентификации и сессий.
            Аналитические сервисы могут устанавливать собственные cookie для отслеживания
            статистики.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Хранение данных</h2>
          <p>
            Данные, переданные через контактную форму, хранятся только для целей обработки
            обращения. Мы не храним персональные данные дольше, чем это необходимо.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Ваши права</h2>
          <p>
            Вы можете запросить удаление своих данных, направив сообщение через контактную форму на
            сайте.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Контакты</h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами
            через контактную форму на сайте.
          </p>

          <p className="text-sm text-gray-500 mt-10">Последнее обновление: апрель 2026 г.</p>
        </div>
      </div>
    </main>
  );
}
