# Деплой

## VPS

| Параметр | Значение |
|----------|----------|
| IP | `45.144.235.234` |
| SSH | `ssh planer-vps` |
| Node | v24.12.0 (nvm) |
| PM2 app | `website` |
| Путь | `/home/knitlx/personal-website/` |
| URL | https://nochaos.space |

---

## Деплой одной командой

```bash
ssh planer-vps "~/personal-website/scripts/deploy-vps.sh"
```

Скрипт (`scripts/deploy-vps.sh`):
1. `git pull origin main`
2. `npm ci --prefer-offline`
3. `npm run build` (включает `cache:generate`)
4. `pm2 restart website`

---

## PM2

Конфигурация: `ecosystem.config.js` на VPS (не в git — содержит секреты).

```bash
# Подключиться к серверу
ssh planer-vps

# Нужен PATH для nvm
export PATH="$HOME/.nvm/versions/node/v24.12.0/bin:$PATH"

pm2 list                    # статус всех приложений
pm2 restart website         # перезапустить сайт
pm2 logs website --lines 50 # последние логи
pm2 logs website            # следить в реальном времени
```

Логи PM2: `/home/knitlx/personal-website/logs/pm2-out.log` и `pm2-error.log`.

---

## Переменные окружения

Задаются в `ecosystem.config.js` на VPS в секции `env`. Локально — `.env.local` (по образцу `.env.example`).

| Переменная | Описание |
|-----------|----------|
| `NEXTAUTH_URL` | Полный URL сайта (`https://nochaos.space`) |
| `NEXTAUTH_SECRET` | Секрет NextAuth (мин. 32 символа) |
| `GITHUB_ID` | GitHub OAuth App Client ID |
| `GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `ALLOWED_GITHUB_EMAILS` | Email-адреса, которым разрешён вход в админку |
| `GITHUB_PAT` | Personal Access Token для git push из админки |
| `GITHUB_USERNAME` | GitHub username для git push |
| `GITHUB_REPO_OWNER` | Владелец репозитория |
| `GITHUB_REPO_SLUG` | Имя репозитория |
| `EMAIL_SERVER_USER` | Gmail адрес для отправки писем |
| `EMAIL_SERVER_PASSWORD` | Gmail App Password |
| `EMAIL_TO` | Куда приходят письма из контактной формы |
| `NEXT_PUBLIC_SITE_URL` | Базовый URL (`https://nochaos.space`) |
| `CHAT_WEBHOOK_URL` | URL n8n вебхука для чат-виджета |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID счётчика Яндекс.Метрики |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID |

---

## Nginx

Конфиг обратного прокси: `~/nginx-website.conf` на VPS.
Проксирует `nochaos.space` → `localhost:3000`.

---

## Первый деплой на новый VPS

```bash
# На VPS
git clone https://github.com/knitlx/personal-website.git
cd personal-website
export PATH="$HOME/.nvm/versions/node/v24.12.0/bin:$PATH"
npm ci
npm run build
# Создать ecosystem.config.js с переменными окружения
pm2 start ecosystem.config.js
pm2 save
```
