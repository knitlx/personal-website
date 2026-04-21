# UI Компоненты

Все компоненты — `app/components/`.

---

## Layout

### `Header.tsx`
Шапка сайта. Навигация, логотип, кнопка «Написать мне» (открывает ContactModal), мобильное меню.

### `Footer.tsx`
Подвал. Навигационные ссылки и соцсети вынесены в константы `NAV_LINKS` / `SOCIAL_LINKS` вверху файла — менять ссылки там.

### `Providers.tsx`
Обёртка `SessionProvider` (NextAuth). Подключается в `layout.tsx`.

### `ModalManager.tsx`
Рендерит `ContactModal`. Подключается в `layout.tsx`. Сама модалка управляется через `ModalContext`.

---

## Интерактивные

### `ContactModal.tsx`
Модальное окно связи. Три вида: главный экран → форма → успех.
- Backdrop: `bg-black/50 backdrop-blur-sm`
- Форма отправляется на `/api/contact`
- Поддержка файловых вложений (валидация через `file-validation.ts`)
- Управление: `useContactModal()` из `contexts/ModalContext.tsx`

### `ChatWidget.tsx`
Чат-виджет в правом нижнем углу.
- ID чата и история сохраняются в `localStorage`
- Сообщения отправляются на `/api/chat`
- Динамически загружается через `ChatWidgetDynamic.tsx` (no SSR)

### `CookieConsent.tsx`
Баннер согласия с cookies. Состояние — `localStorage` (`cookie_consent: accepted/declined`). Используется `useSyncExternalStore` для реактивности. Хук — `hooks/useCookieConsent.ts`.

---

## Секции главной страницы

| Компонент | Секция |
|-----------|--------|
| `HeroSection.tsx` | Заголовок + CTA кнопки |
| `WhatIDoSection.tsx` | Что делаю (4 карточки, данные из `app/data/homePageData.ts`) |
| `PortfolioSection.tsx` / `PortfolioClient.tsx` | Превью проектов |
| `AiCreatedSiteSection.tsx` | Секция «Сайт создан с AI» |
| `CtaSection.tsx` | Призыв к действию внизу |

Секции на главной подгружаются лениво через `LazySection`.

---

## Утилитарные

### `LazySection.tsx`
Обёртка для ленивой загрузки секций через `IntersectionObserver`. Пропсы: `rootMargin` (дефолт `200px`), `threshold`, `fallback`.

### `BentoButton.tsx`
Основная кнопка. Варианты: `primary` / `secondary`. Размеры: `default` / `sm`. Поддерживает `href` (рендерится как `<a>`) или `onClick` (рендерится как `<button>`).

### `MarkdownImage.tsx`
Замена `<img>` внутри `ReactMarkdown`. Использует `next/image`. Поддерживает:
- Size hints в `title`: `w=800`, `h=400`, `eager=1`
- Клик для открытия в `ImageModal`

### `ImageModal.tsx`
Лайтбокс для просмотра изображений. Открывается по клику на `MarkdownImage`.

### `PromptBlock.tsx`
Кастомный рендер блоков кода в markdown — для отображения промптов.

### `ErrorBoundary.tsx`
Class-компонент. Ловит ошибки рендера. В dev-режиме показывает стектрейс. Подключён в `layout.tsx`.

---

## Аналитика

### `GoogleAnalytics.tsx`
Google Analytics (gtag). Загружается только при `cookie_consent = accepted` и не на `/admin/*`.

### `YandexMetrika.tsx`
Яндекс Метрика. Те же условия. ID берётся из `NEXT_PUBLIC_YANDEX_METRIKA_ID`.

---

## Проекты

### `ProjectCardSimple.tsx`
Карточка проекта для списка на `/projects`.

### `SeoPreview.tsx`
Превью OG-данных в форме редактирования (только в админке).

### `ServicesCtaButton.tsx`
Кнопка CTA на странице услуг (client component, открывает ContactModal).
