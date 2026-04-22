# AGENTS.md

This file contains guidelines and commands for agentic coding agents working on this Next.js 16 + TypeScript project.

---

## Build & Test Commands

### Development

```bash
npm run dev              # Start Next.js dev server
npm run dev:turbo        # Start dev server with Turbo mode
npm run build            # Build for production (runs prebuild: cache:generate)
npm run start            # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm test                 # Run all Jest tests
npm test -- <file>       # Run single test file (e.g., npm test -- lib/slug.test.ts)
npm test -- -t <name>    # Run tests matching pattern (e.g., npm test -- -t "generateSlug")
```

### Content

```bash
npm run cache:generate   # Generate content cache from markdown files
```

---

## Project Overview

This is a Next.js 16 personal website with TypeScript, featuring:

**IMPORTANT: This project is deployed on a VPS (Virtual Private Server), NOT on Vercel.**
- The app runs as a persistent Node.js process (`next start`)
- In-memory rate limiting in `lib/rate-limit.ts` works correctly because the process persists
- File system operations (content cache, uploads) persist across requests
- Server runs continuously and handles multiple requests in the same process

**Deployment Stack:**
- Static site generation with content caching
- Project portfolio and blog functionality
- Admin dashboard for content management
- Tailwind CSS styling
- Jest + React Testing Library for testing

---

## Project Structure

- `app/` - Next.js 16 App Router pages and components
  - `api/` - API route handlers (auth, admin, content)
  - `components/` - Shared UI components
  - `admin/` - Admin dashboard pages
- `content/` - Markdown files for projects/blog posts
- `hooks/` - Custom React hooks
- `contexts/` - React Context providers
- `lib/` - Utilities, constants, and helper functions
- `types/` - Shared TypeScript type definitions
- `scripts/` - Build scripts (run with tsx)

---

## Code Style Guidelines

### Code Style Quick Reference

| Category | Rule |
|----------|------|
| **Imports** | Group: 1) React/Next.js, 2) External, 3) Internal (`@/` alias), 4) Relative |
| **Components** | `"use client"` at top, `export default function Name() {}`, use `memo()` |
| **Hooks** | Prefix `use`, extract reusable logic |
| **Types** | Interfaces for objects, types for unions, prefer `unknown` over `any` |
| **Naming** | PascalCase (components), camelCase (hooks/functions), UPPER_SNAKE_CASE (constants) |
| **Files** | `ComponentName.tsx`, `hookName.ts`, `page.tsx` |
| **Validation** | Zod schemas in `lib/validations/`, return structured errors |
| **Styling** | Tailwind v4, custom colors: #7B68EE (primary), #9137DF (accent), CSS Modules for complex cases |

---

## Testing Guidelines

- Jest + React Testing Library
- Test files: `ComponentName.test.tsx` alongside component
- Mock: `next/navigation`, `@uiw/react-md-editor`, `global.fetch`
- Use `renderWithProviders` wrapper for context-dependent components
- Setup in `jest.setup.js`
- Pattern: Arrange-Act-Assert

---

## API Routes

- File-based routing in app/api/
- Use `NextRequest` and `NextResponse` from next/server
- Authenticate with `getServerSession(authOptions)`
- Validate with Zod schemas
- Revalidate paths after content changes: `revalidatePath("/path")`
- Git operations via execa (commitAndPush in lib/git.ts)

---

## Forms

- Use custom `useFormState` hook for form logic
- Auto-generate slugs from titles with `generateSlug` from lib/slug
- Stop auto-generation when slug manually edited
- Upload images via `useImageUpload` hook
- Rich text with @uiw/react-md-editor (dynamic import, no SSR)

---

## Content Management

- Content stored as markdown files in content/ directory
- Frontmatter parsed with gray-matter
- Schema validation with Zod
- Git commits for content changes (automatic push)
- Support both blog posts and projects with different field structures
- Cache file is stored at `.content-cache.json` (project root, gitignored)
- Memory caching avoids repeated file reads
- Run `npm run cache:generate` after content changes

---

## Important Configuration Files

- `eslint.config.mjs` - Comprehensive ESLint setup with TypeScript, React, and Next.js rules
- `tsconfig.json` - Strict TypeScript configuration with Next.js optimizations
- `jest.config.mjs` - Jest configuration for Next.js projects
- `next.config.mjs` - Next.js config with security headers and image optimization

---

## Security Considerations

- Content Security Policy headers configured in `next.config.mjs`
- Environment variables for sensitive data
- Input validation with Zod schemas
- Image optimization with Next.js Image component

---

## Performance Optimization

- Use Next.js Image component for all images
- Implement lazy loading with `loading="lazy"`
- Use React.memo() for expensive components
- Implement pagination for content listings
- Generate static pages where possible

---

## Git Workflow

- Feature branches for new functionality
- Run lint and tests before commits
- Write descriptive commit messages
- Use semantic versioning for releases

---

### Path Aliases & Quick Tips

- `@/*` maps to root (tsconfig.json)
- **ESLint key rules**: `no-unused-vars` (prefix `_` to ignore), `no-explicit-any` (use `unknown`), `jsx-boolean-value` (shorthand), `self-closing-comp`
- **Always run**: `npm run lint` && `npm run test` before committing
