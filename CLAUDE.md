# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with Next.js 16 (App Router), TypeScript, React 19, and Tailwind CSS 4. The site includes a blog, projects showcase, admin panel, and contact form. Content is managed through Markdown files with frontmatter metadata.

## Development Commands

```bash
npm run dev              # Start development server (http://localhost:3000)
npm run dev:turbo        # Start development server with Turbo mode
npm run build            # Build for production (runs prebuild script first)
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run cache:generate   # Generate content cache from Markdown files
```

## Architecture

### Content Management

- **Markdown-based content**: Blog posts and projects are stored as `.md` files in `content/blog/` and `content/projects/`
- **Frontmatter**: Uses `gray-matter` for metadata parsing (title, description, dates, SEO fields, etc.)
- **Content cache**: `scripts/generate-content-cache.ts` pre-processes Markdown files and outputs `public/content-cache.json`
- **Build pipeline**: The `prebuild` script automatically generates the content cache before every build

### App Structure (Next.js App Router)

- `app/` - Next.js App Router pages and components
  - `components/` - Reusable section components (Hero, Portfolio, Services, etc.)
  - `api/` - API routes (admin, auth, contact, content)
  - `blog/`, `projects/`, `services/`, `about/` - Route pages
  - `layout.tsx` - Root layout
  - `page.tsx` - Homepage composition
- `content/` - Markdown source files
- `lib/` - Utility libraries
- `hooks/` - Custom React hooks
- `contexts/` - React contexts
- `types/` - TypeScript type definitions

### Styling Conventions

**Critical**: To avoid server restart/caching issues with Tailwind CSS 4:
- Complex styles (gradients, custom shadows) are defined as utility classes in `app/globals.css` using `@apply`
- Example classes: `.gradient-hero-ai`, `.shadow-button-cta`
- JSX/TSX files use these stable utility classes, NOT arbitrary `[...]` values
- Do not add complex styles directly in `tailwind.config.mjs`

Key component: `app/components/GradientBorderButton.tsx` for gradient border buttons with hover effects.

### Key Features

- **Authentication**: NextAuth.js with GitHub OAuth
- **Contact**: Nodemailer for email contact form
- **Analytics**: Google Analytics and Yandex Metrika integration
- **Admin**: Content management interface at `/admin`
- **Deployment**: Managed via PM2 (`ecosystem.config.js`)

### Security Configuration

`next.config.mjs` contains strict Content Security Policy (CSP) headers with environment-specific rules (development vs production). External image domains must be added to `images.remotePatterns`.

## Environment Variables

Key variables (see `.env`):
- `NEXTAUTH_URL` - Authentication URL
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `GITHUB_ID`/`GITHUB_SECRET` - GitHub OAuth credentials
- `EMAIL_SERVER_*` - Email configuration for contact form

## Testing

- Jest with React Testing Library
- Test files should be co-located with components
- Configuration in `jest.config.js`
