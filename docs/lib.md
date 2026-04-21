# Утилиты и хелперы

Все файлы — `lib/`.

---

## `constants.ts`

Централизованные константы проекта.

| Константа | Значение | Где используется |
|-----------|----------|-----------------|
| `SITE_URL` | `NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"` | Метаданные, sitemap, RSS, robots.txt |
| `PAGINATION.BLOG_POSTS_PER_PAGE` | `5` | Список блога |
| `PAGINATION.PROJECTS_PER_PAGE` | `6` | Список проектов |
| `FILE_SIZE_LIMITS.MAX_IMAGE_SIZE` | `5MB` | Вложения в контактной форме |
| `FILE_SIZE_LIMITS.MAX_FILE_SIZE` | `10MB` | Вложения в контактной форме |
| `MD_EDITOR_HEIGHT` | `400` | Высота markdown-редактора в админке |

---

## `utils.ts`

| Функция | Описание |
|---------|----------|
| `formatDate(dateString, locale?)` | Форматирование даты в локализованную строку |
| `truncate(text, maxLength)` | Обрезка текста с `...` |
| `isValidUrl(url)` | Проверка валидности URL (относительные `/` тоже валидны) |
| `sleep(ms)` | Promise-пауза |
| `getServerSideUrl()` | Legacy — больше не используется, заменён на `SITE_URL` |

---

## `git.ts`

Git-операции для сохранения контента через админку.

```ts
commitAndPush({ filePath, commitMessage, operation: "add" | "rm" })
```

Флоу:
1. Настраивает git user через `GIT_USER_NAME` / `GIT_USER_EMAIL`
2. `git add <filePath>` или `git rm -f <filePath>`
3. `git commit -m <commitMessage>`
4. `git push https://USERNAME:PAT@github.com/owner/repo.git main`

Защита от path traversal — `validateFilePath()` разрешает только:
- `content/blog/*.md`
- `content/projects/*.md`
- `public/uploads/*.{jpg,png,gif,webp,svg}`

Переменные: `GITHUB_PAT`, `GITHUB_USERNAME`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_SLUG`.

---

## `rate-limit.ts`

In-memory rate limiter (Map). Работает только в persistent-процессе (VPS + PM2). **Не работает в serverless** (Vercel, Lambda).

```ts
rateLimit(identifier: string, { interval: number, limit: number })
// → { success: boolean, resetTime?: number }
```

Автоматическая очистка просроченных записей каждые 100 вызовов.

Используется в `/api/contact`: 3 запроса за 10 минут с одного IP.

---

## `auth.ts`

NextAuth конфигурация. Подробнее → [admin.md](./admin.md#авторизация).

---

## `content.ts`

Контент-система. Подробнее → [content.md](./content.md).

---

## `file-validation.ts`

```ts
ALLOWED_EXTENSIONS        // все допустимые расширения (изображения + документы + архивы)
ALLOWED_IMAGE_EXTENSIONS  // только изображения
isAllowedExtension(filename) → boolean
isValidFileSize(size, maxSize?) → boolean
```

Используется в `ContactModal` для валидации вложений на клиенте.

---

## `slug.ts`

```ts
generateSlug(title: string) → string
```

Транслитерация + lowercase + замена пробелов на `-`. Используется в формах админки для автогенерации slug из заголовка.

---

## Validations (`lib/validations/`)

Zod-схемы для валидации входящих данных.

| Файл | Схема | Используется |
|------|-------|-------------|
| `contact.ts` | `contactFormSchema` | `POST /api/contact` |
| `blog.ts` | `blogPostSchema` | `POST /api/admin/blog` |
| `project.ts` | `projectSchema` | `POST /api/admin/projects` |
| `common.ts` | `deleteSchema` | `DELETE /api/admin/*` |
| `chat.ts` | схема чата | `POST /api/chat` |

`contact.ts` — поле `contact` принимает Telegram username (`@username`) или международный номер телефона.

---

## Hooks (`hooks/`)

| Хук | Описание |
|-----|----------|
| `useCookieConsent.ts` | Реактивное чтение `localStorage` (`cookie_consent`). Возвращает `boolean`. |
| `useFormState.ts` | Управление состоянием форм: данные, ошибки, загрузка, сброс. |
| `useImageUpload.ts` | Загрузка изображений через `POST /api/admin/upload-image`. |

## Contexts (`contexts/`)

### `ModalContext.tsx`

```ts
useContactModal() → { openContactModal(projectTitle?: string), closeContactModal }
```

Глобальное состояние открытия `ContactModal`. `openContactModal` принимает необязательный заголовок проекта — подставляется в сообщение формы.
