# API Routes

Все роуты — `app/api/`.

---

## Публичные

### `POST /api/contact`
Отправка контактной формы. Файл: `app/api/contact/route.ts`.

- Rate limiting по IP: 3 запроса за 10 минут (in-memory, `lib/rate-limit.ts`)
- Валидация: `lib/validations/contact.ts` (Zod)
- Вложения: до 5 файлов, изображения до 5MB, остальные до 10MB
- Отправка через Nodemailer (Gmail SMTP)
- HTML в теле письма экранируется

Переменные окружения: `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_TO`.

---

### `POST /api/chat`
Чат-виджет. Файл: `app/api/chat/route.ts`.

- Принимает `{ message, chatId }`
- Валидация: `lib/validations/chat.ts`
- Проксирует запрос на `CHAT_WEBHOOK_URL` (n8n)
- Возвращает ответ бота

Переменная окружения: `CHAT_WEBHOOK_URL`.

---

## Контент (публичный кеш)

### `GET /api/content/blog`
### `GET /api/content/projects`
Файлы: `app/api/content/blog/route.ts`, `app/api/content/projects/route.ts`.

Возвращают закешированный список контента. Используются клиентскими компонентами при бесконечном скролле (`InfiniteScrollBlog`, `InfiniteScrollProjects`).

Параметры: `?page=1&limit=5&tag=тег&search=запрос`.

---

### `GET /api/downloadable-files`
Файл: `app/api/downloadable-files/route.ts`.
Список файлов из `public/uploads/` для использования в формах.

---

## Admin (требуют авторизации)

Все проверяют `getServerSession(authOptions)` — возвращают `401` без сессии.

### `POST /api/admin/blog` — создать/обновить статью
### `DELETE /api/admin/blog` — удалить статью
Файл: `app/api/admin/blog/route.ts`.

Флоу POST:
1. Валидация через `blogPostSchema` (Zod)
2. Запись `.md` файла в `content/blog/`
3. Git commit + push через `lib/git.ts`
4. `revalidatePath` для `/blog`, `/blog/[slug]`, `/admin/dashboard`
5. `regenerateCache()` — обновление in-memory кеша

### `POST /api/admin/projects` — создать/обновить проект
### `DELETE /api/admin/projects` — удалить проект
Файл: `app/api/admin/projects/route.ts`. Логика аналогична blog.

### `POST /api/admin/upload-image`
Файл: `app/api/admin/upload-image/route.ts`.

- Принимает `multipart/form-data` с полем `file`
- Допустимые типы: jpeg, png, gif, webp (до 10MB)
- Оптимизация через `sharp`: resize до 1200px, конвертация в WebP (80% quality)
- Сохранение в `public/uploads/`
- Git commit + push
- Возвращает `{ url: "/uploads/filename.webp" }`

---

## XML / текстовые роуты

| Роут | Файл | Описание |
|------|------|----------|
| `GET /sitemap.xml` | `app/sitemap.xml/route.ts` | XML sitemap со всеми страницами |
| `GET /rss.xml` | `app/rss.xml/route.ts` | RSS лента (10 последних постов) |
| `GET /robots.txt` | `app/robots.txt/route.ts` | robots.txt со ссылкой на sitemap |

Все три используют `SITE_URL` из `lib/constants.ts`. В sitemap и RSS применяется `escapeXml()` для безопасного XML.
