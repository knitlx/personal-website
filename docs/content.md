# Контент-система

## Хранение

Контент — markdown-файлы в `content/`:
- `content/blog/` — статьи блога
- `content/projects/` — описания проектов

Имя файла = slug страницы. Например, `content/blog/moya-statya.md` → `/blog/moya-statya`.

---

## Фронтматтер

### Статья блога

```yaml
---
title: "Заголовок статьи"
slug: moya-statya
date: "2024-01-15"
description: "Краткое описание для превью и SEO"
tags: автоматизация, n8n, ai
creationDate: "2024-01-15"
updateDate: "2024-01-20"        # опционально
seoTitle: "SEO заголовок"       # если отличается от title
seoDescription: "SEO описание"  # если отличается от description
canonicalUrl: "/blog/moya-statya"  # опционально
openGraphImage: "/uploads/image.webp"  # опционально
---

Тело статьи в markdown...
```

### Проект

```yaml
---
title: "Название проекта"
slug: moy-proekt
projectIcon: "/uploads/icon.webp"
shortDescriptionHomepage: "Короткое для главной"
shortDescriptionProjectsPage: "Для страницы проектов"
introDescription: "Вводное описание (markdown, рендерится первым)"
trylink: "https://example.com"  # если есть — показывается кнопка «Попробовать»
creationDate: "2024-01-15"
updateDate: "2024-01-20"
seoTitle: "..."
seoDescription: "..."
openGraphImage: "/uploads/og.webp"
---

Основное описание проекта (fullDescription)...
```

---

## Кеш

### Как работает

`lib/content.ts` — вся логика чтения и кеширования.

1. **Build time**: `scripts/generate-content-cache.ts` читает все `.md` файлы и пишет `public/content-cache.json`
2. **Runtime**: первый вызов `getAllContent()` загружает кеш в память (`Map`)
3. **После сохранения через админку**: `regenerateCache()` перечитывает файлы и обновляет in-memory кеш

```bash
npm run cache:generate  # запустить вручную
```

### Основные функции `lib/content.ts`

| Функция | Описание |
|---------|----------|
| `getAllContent(type, options)` | Список с пагинацией, поиском, фильтром по тегу |
| `getMarkdownFile(type, slug)` | Один файл по slug (данные + тело) |
| `getSlugs(type)` | Только slugs — для `generateStaticParams` |
| `getContentMetadata(type)` | Только метаданные — для sitemap |
| `getAllTags(type)` | Все теги с подсчётом |
| `regenerateCache()` | Перечитать файлы, обновить in-memory кеш |

---

## Рендеринг markdown

На страницах `/blog/[slug]` и `/projects/[slug]` используется `ReactMarkdown` с плагинами:
- `remark-gfm` — таблицы, чекбоксы, зачёркнутый текст
- `rehype-raw` — HTML внутри markdown

Кастомные компоненты:
- `img` → `MarkdownImage` (оптимизация + лайтбокс)
- `code` → `PromptBlock` (для блоков промптов)

Стили для `.prose` — `app/globals.css`.

---

## generateStaticParams

Страницы блога и проектов генерируются статически при сборке:

```ts
export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}
```

При обновлении контента через админку вызывается `revalidatePath("/blog/[slug]")` для инвалидации конкретной страницы без перебилда.
