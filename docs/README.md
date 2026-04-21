# NoChaos — документация проекта

Персональный сайт [nochaos.space](https://nochaos.space). Next.js 16, TypeScript, Tailwind CSS v4, PM2 на VPS.

---

## Навигация по документам

| Файл | Что внутри |
|------|-----------|
| [architecture.md](./architecture.md) | Стек, структура директорий, роутинг, SSG/SSR, кеш контента |
| [components.md](./components.md) | Все UI-компоненты: назначение, пропсы, связи |
| [api.md](./api.md) | API routes: контакт, чат, admin CRUD, загрузка картинок |
| [admin.md](./admin.md) | Админ-панель: авторизация, дашборд, формы блога и проектов |
| [content.md](./content.md) | Контент-система: markdown, фронтматтер, кеш, `generateStaticParams` |
| [lib.md](./lib.md) | Утилиты и хелперы: constants, utils, git, rate-limit, validations |
| [deploy.md](./deploy.md) | Деплой на VPS: PM2, nginx, скрипт деплоя, переменные окружения |

---

## Быстрый старт

```bash
npm run dev          # Дев-сервер
npm run build        # Продакшн-сборка (запускает cache:generate)
npm run cache:generate  # Регенерировать кеш контента вручную
npm run lint         # ESLint
npm test             # Jest
```

Переменные окружения — см. `.env.example` в корне.
