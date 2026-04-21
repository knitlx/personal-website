# Админ-панель

Все файлы — `app/admin/`. Доступна по `/admin`.

---

## Авторизация

`lib/auth.ts` — конфигурация NextAuth.

- Провайдер: GitHub OAuth
- Доступ разрешён только email-адресам из `ALLOWED_GITHUB_EMAILS` (через запятую)
- В production обязателен `NEXTAUTH_SECRET`
- Кастомная страница входа: `/admin/login`

Переменные: `GITHUB_ID`, `GITHUB_SECRET`, `ALLOWED_GITHUB_EMAILS`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.

Конфигурация PM2 (`ecosystem.config.js` на VPS) задаёт все переменные напрямую в `env`.

---

## Страницы

### `/admin/login`
Файл: `app/admin/login/page.tsx`. Кнопка входа через GitHub.

### `/admin/dashboard`
Файл: `app/admin/dashboard/page.tsx` + `dashboard/components/DashboardClient.tsx`.

- Редирект на `/admin/login` без сессии
- Показывает список статей и проектов с пагинацией и поиском
- Кнопки создать / редактировать / удалить

### `/admin/blog/edit/[slug]`
Файл: `app/admin/blog/edit/[slug]/page.tsx`.
`slug = "new"` — создание новой статьи. Любой другой slug — редактирование существующей.
Рендерит `BlogForm`.

### `/admin/projects/edit/[slug]`
Файл: `app/admin/projects/edit/[slug]/page.tsx`. Аналогично для проектов. Рендерит `ProjectForm`.

---

## Компоненты форм

Файлы — `app/admin/components/`.

### `BlogForm.tsx`
Форма создания/редактирования статьи блога. Поля:
- `title`, `slug` (автогенерация из title через `generateSlug`, останавливается при ручном редактировании)
- `date`, `description`, `tags` (через запятую)
- `articleBody` — редактор markdown (`@uiw/react-md-editor`, динамический импорт без SSR)
- SEO-поля: `seoTitle`, `seoDescription`, `canonicalUrl`, `openGraphImage`
- Превью OG через `SeoPreview`

### `ProjectForm.tsx`
Форма проекта. Поля:
- `title`, `slug`, `projectIcon` (загрузка через `useImageUpload`)
- `shortDescriptionHomepage`, `shortDescriptionProjectsPage`
- `introDescription`, `fullDescription` — оба markdown-редакторы
- `trylink` — ссылка «Попробовать»
- SEO-поля аналогично BlogForm

### `DashboardClient.tsx`
Client-компонент дашборда. Таблицы статей и проектов, поиск, пагинация, кнопки действий.

---

## Git-интеграция

При каждом сохранении через форму:
1. Файл пишется на диск
2. `commitAndPush()` из `lib/git.ts` делает `git add/rm`, `commit`, `push`
3. Кеш инвалидируется через `revalidatePath()` и `regenerateCache()`

Для работы нужны переменные: `GITHUB_PAT`, `GITHUB_USERNAME`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_SLUG`.

Подробнее про git-операции → [lib.md](./lib.md#gitts).
