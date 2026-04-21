# Архитектура

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 16 (App Router) |
| Язык | TypeScript (strict mode) |
| Стили | Tailwind CSS v4 |
| Контент | Markdown + gray-matter |
| Аутентификация | NextAuth.js (GitHub OAuth) |
| Email | Nodemailer (Gmail SMTP) |
| Изображения | sharp (оптимизация при загрузке) |
| Тесты | Jest + React Testing Library |
| Деплой | PM2 на VPS (Ubuntu) |

---

## Структура директорий

```
app/                  — Next.js App Router
  page.tsx            — Главная страница
  layout.tsx          — Корневой layout (шрифты, метаданные, JSON-LD)
  globals.css         — Глобальные стили, prose-типографика
  about/              — Страница «Обо мне»
  blog/               — Список статей + /[slug]
  projects/           — Список проектов + /[slug]
  services/           — Страница услуг
  privacy/            — Политика конфиденциальности
  admin/              — Защищённая админ-панель
  api/                — API routes
  components/         — Shared UI компоненты
  data/               — Статические данные (homePageData.ts)
  robots.txt/         — Генерация robots.txt
  sitemap.xml/        — Генерация sitemap
  rss.xml/            — Генерация RSS

content/              — Markdown-файлы контента
  blog/               — Статьи блога
  projects/           — Описания проектов

lib/                  — Утилиты и хелперы
hooks/                — Кастомные React хуки
contexts/             — React контексты
types/                — TypeScript типы
scripts/              — Скрипты сборки
public/               — Статика (иконки, загруженные изображения)
docs/                 — Эта документация
```

---

## Роутинг и рендеринг

### Статические страницы (SSG)
`/blog/[slug]` и `/projects/[slug]` генерируются на этапе сборки через `generateStaticParams`. При обновлении контента через админку вызывается `revalidatePath()` для инвалидации кеша.

```ts
// app/blog/[slug]/page.tsx
export const dynamic = "force-static";

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}
```

### Динамические страницы
- `/blog` — фильтрация по тегам через `searchParams`
- `/projects` — список всех проектов
- `/admin/*` — всё за авторизацией, `force-dynamic`

### API routes
Все в `app/api/`. Подробнее → [api.md](./api.md).

---

## Кеш контента

Markdown-файлы читаются один раз при старте и кешируются в памяти (`lib/content.ts`). При сборке генерируется `public/content-cache.json` через `scripts/generate-content-cache.ts`.

При сохранении через админку — `regenerateCache()` обновляет in-memory кеш без перезапуска.

Подробнее → [content.md](./content.md).

---

## Константы и URL

Базовый URL сайта — `SITE_URL` из `lib/constants.ts`:

```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
```

Используется везде: метаданные страниц, JSON-LD, sitemap, RSS, robots.txt.
