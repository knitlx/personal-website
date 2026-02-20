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

- Use absolute imports with `@/` prefix for project files
- Group imports in order: 1) React/Next.js, 2) External libraries, 3) Internal utilities, 4) Relative imports
- Prefer named exports, default exports only for components/pages
- Always import React explicitly in `.tsx` files when using JSX

### Components

- Client components must start with `"use client";` directive
- Use `export default function ComponentName() {}` pattern
- Props interfaces defined above component
- Use `useCallback` for event handlers passed to children
- Use functional components with hooks
- Wrap components in `memo()` for performance optimization
- Extract reusable logic into custom hooks

```typescript
"use client";

import { memo, useCallback } from "react";

function MyComponent({ data, onUpdate }: Props) {
  const handleClick = useCallback(() => {
    // Handler logic
  }, [onUpdate]);

  return <div>...</div>;
}

export default memo(MyComponent);
```

### TypeScript

- Strict mode enabled in tsconfig.json
- Use interfaces for object shapes, types for unions/primitives
- Prefer generic types: `UseFormStateOptions<T extends object>`
- Use `unknown` instead of `any` for truly unknown data
- Unused variables prefixed with `_` (ignored by ESLint)
- Define interfaces for all component props and data structures
- Prefer `unknown` over `any` for untyped data

```typescript
interface ProjectCardProps {
  project: {
    title?: string;
    slug: string;
    projectIcon?: string;
  };
  onOrderClick: (title: string | null) => void;
}

function ProjectCard({ project, onOrderClick }: ProjectCardProps) {
  // Component implementation
}
```

### Naming Conventions

- **Components**: PascalCase (ProjectForm, HeroSection)
- **Hooks**: camelCase with use prefix (useFormState, useModal)
- **Types/Interfaces**: PascalCase (ProjectFormData, ApiResponse)
- **Constants**: UPPER_SNAKE_CASE (API_ROUTES, MD_EDITOR_HEIGHT)
- **Functions**: camelCase (generateSlug, handleSubmit)
- **Files**: ComponentName.tsx, hookName.ts, typeName.ts
- **Utilities**: `camelCase.ts` (e.g., `content.ts`)
- **Pages**: `page.tsx` (App Router) or `index.tsx` (Pages Router)
- **Test files**: `ComponentName.test.tsx` alongside component
- **Types**: Keep interfaces in dedicated `types/` directory or component files

### Error Handling

- Use Zod schemas for API input validation (lib/validations/)
- Wrap async operations in try/catch with toast notifications
- Return structured errors: `{ message: string; errors?: Array<{field, message}> }`
- Clear field errors when user starts typing
- Implement proper error boundaries for client components
- Provide meaningful error messages and fallback UIs

```typescript
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
});

// Usage
try {
  const validatedData = ProjectSchema.parse(rawData);
} catch (error) {
  console.error("Validation failed:", error);
}
```

### Styling

- Tailwind CSS v4 for all styling
- Custom colors: primary (#7B68EE), accent (#9137DF)
- Component styling inline with className prop
- For complex component-specific styles, use CSS Modules (ComponentName.module.css)
- Follow mobile-first responsive design
- Use CSS variables for theme colors (`--accent-color`, `--primary-color`)
- Apply consistent spacing and layout patterns

```typescript
<div className="bg-white border border-black/5 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-card duration-300">
  <h2 className="text-2xl font-semibold text-gray-900">
    {title}
  </h2>
</div>
```

---

## Testing Guidelines

- Jest + React Testing Library
- Test files: ComponentName.test.tsx
- Mock external dependencies (next/navigation, @uiw/react-md-editor)
- Use `renderWithProviders` wrapper for components needing context
- Mock `global.fetch` for API tests
- Setup in jest.setup.js
- Write tests for all components and utilities
- Test user interactions and component behavior
- Follow the Arrange-Act-Assert pattern

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "./ProjectForm";

describe("ProjectCard", () => {
  it("should render project title correctly", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });
});
```

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
- Cache file is stored at `public/content-cache.json`
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

## Common Patterns

### API Data Fetching
```typescript
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
```

### Context Usage
```typescript
// Create context with proper TypeScript typing
const MyContext = createContext<MyContextValue | undefined>(undefined);

// Create custom hook for safer usage
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return context;
}
```

### Path Aliases

- `@/*` maps to root directory (configured in tsconfig.json)
- Use for all internal imports: `@/lib/slug`, `@/hooks/useFormState`

---

## ESLint Rules (Key Ones)

- `@typescript-eslint/no-unused-vars` - unused vars allowed if prefixed with `_`
- `@typescript-eslint/no-explicit-any` - warns, use `unknown` instead
- `react/jsx-boolean-value` - always use shorthand: `value={true}` → `value`
- `react/jsx-curly-brace-presence` - never use curly braces for string props
- `react/self-closing-comp` - self-close empty tags: `<Component />`
- `prettier/prettier` - enforced via eslint-plugin-prettier

---

Remember to always run `npm run lint` and `npm run test` before submitting changes to ensure code quality and consistency.
