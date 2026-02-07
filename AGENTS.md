# AGENTS.md

This file contains guidelines and commands for agentic coding agents working on this Next.js 16 + TypeScript project.

---

## Build & Test Commands

### Development

```bash
npm run dev              # Start Next.js dev server
npm run dev:turbo        # Start dev server with Turbo mode
npm run build            # Build for production (runs prebuild: cache:generate)
npm run start           # Start production server
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

### Imports

```typescript
"use client"; // Place at top for client components

// 1. React/Next.js
import React from "react";
import { useRouter } from "next/navigation";

// 2. External packages
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

// 3. Internal imports (use @/ alias)
import { generateSlug } from "@/lib/slug";
import { useFormState } from "@/hooks/useFormState";
```

### Components

- Client components must start with `"use client";` directive
- Use `export default function ComponentName() {}` pattern
- Props interfaces defined above component
- Use `useCallback` for event handlers passed to children

### TypeScript

- Strict mode enabled in tsconfig.json
- Use interfaces for object shapes, types for unions/primitives
- Prefer generic types: `UseFormStateOptions<T extends object>`
- Use `unknown` instead of `any` for truly unknown data
- Unused variables prefixed with `_` (ignored by ESLint)

### Naming Conventions

- **Components**: PascalCase (ProjectForm, HeroSection)
- **Hooks**: camelCase with use prefix (useFormState, useModal)
- **Types/Interfaces**: PascalCase (ProjectFormData, ApiResponse)
- **Constants**: UPPER_SNAKE_CASE (API_ROUTES, MD_EDITOR_HEIGHT)
- **Functions**: camelCase (generateSlug, handleSubmit)
- **Files**: ComponentName.tsx, hookName.ts, typeName.ts

### Error Handling

- Use Zod schemas for API input validation (lib/validations/)
- Wrap async operations in try/catch with toast notifications
- Return structured errors: `{ message: string; errors?: Array<{field, message}> }`
- Clear field errors when user starts typing

### Styling

- Tailwind CSS v4 for all styling
- Custom colors: primary (#7B68EE), accent (#9137DF)
- Component styling inline with className prop
- For complex component-specific styles, use CSS Modules (ComponentName.module.css)

### Testing

- Jest + React Testing Library
- Test files: ComponentName.test.tsx
- Mock external dependencies (next/navigation, @uiw/react-md-editor)
- Use `renderWithProviders` wrapper for components needing context
- Mock `global.fetch` for API tests
- Setup in jest.setup.js

### API Routes

- File-based routing in app/api/
- Use `NextRequest` and `NextResponse` from next/server
- Authenticate with `getServerSession(authOptions)`
- Validate with Zod schemas
- Revalidate paths after content changes: `revalidatePath("/path")`
- Git operations via execa (commitAndPush in lib/git.ts)

### Forms

- Use custom `useFormState` hook for form logic
- Auto-generate slugs from titles with `generateSlug` from lib/slug
- Stop auto-generation when slug manually edited
- Upload images via `useImageUpload` hook
- Rich text with @uiw/react-md-editor (dynamic import, no SSR)

### Content Management

- Content stored as markdown files in content/ directory
- Frontmatter parsed with gray-matter
- Schema validation with Zod
- Git commits for content changes (automatic push)

### ESLint Rules (Key Ones)

- `@typescript-eslint/no-unused-vars` - unused vars allowed if prefixed with `_`
- `@typescript-eslint/no-explicit-any` - warns, use `unknown` instead
- `react/jsx-boolean-value` - always use shorthand: `value={true}` → `value`
- `react/jsx-curly-brace-presence` - never use curly braces for string props
- `react/self-closing-comp` - self-close empty tags: `<Component />`
- `prettier/prettier` - enforced via eslint-plugin-prettier

### Path Aliases

- `@/*` maps to root directory (configured in tsconfig.json)
- Use for all internal imports: `@/lib/slug`, `@/hooks/useFormState`
