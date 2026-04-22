# NoChaos — personal website

Site: [nochaos.space](https://nochaos.space)  
Personal website about AI implementation and business process automation. Portfolio, blog, admin panel.

**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + PM2 on VPS

---

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build & test before commit:
```bash
npm run build        # includes cache:generate
npm run lint
npm test
```

---

## Documentation

All technical details are in [`docs/`](./docs/):

| File | Content |
|------|---------|
| [docs/README.md](./docs/README.md) | Docs navigation, quick commands |
| [docs/deploy.md](./docs/deploy.md) | **VPS deploy**: PM2, nginx, environment variables |
| [docs/architecture.md](./docs/architecture.md) | Stack, structure, routing, content cache |
| [docs/admin.md](./docs/admin.md) | Admin panel: auth, forms, CRUD |
| [docs/api.md](./docs/api.md) | API routes: contact, chat, uploads |
| [docs/content.md](./docs/content.md) | Markdown, frontmatter, static generation |
| [docs/components.md](./docs/components.md) | UI components reference |
| [docs/lib.md](./docs/lib.md) | Utils, hooks, validations |

---

## Deploy

VPS deploy one-liner:
```bash
ssh planer-vps "~/personal-website/scripts/deploy-vps.sh"
```

See [docs/deploy.md](./docs/deploy.md) for full setup.
