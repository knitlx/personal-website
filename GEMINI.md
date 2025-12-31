### **Project: Personal Website**

A personal website built with Next.js.

---

### **Tech Stack**

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Linting:** ESLint

---

### **Key Files & Folders**

- `app/page.tsx`: The main entry point for the homepage.
- `public/`: Static assets (images, fonts, etc.).
- `next.config.ts`: Next.js configuration.
- `package.json`: Project dependencies and scripts.

---

### **Common Commands**

- **Run development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Lint the code:** `npm run lint`

---

### **Architecture & Styling Philosophy (Post-Refactor)**

This is a Next.js (App Router) project styled with Tailwind CSS. The main page (`app/page.tsx`) has been refactored for clarity and maintainability.

- **Component-Based Structure:** `app/page.tsx` is broken down into smaller, self-contained section components located in `app/components/` (e.g., `HeroSection.tsx`, `PortfolioPreviewSection.tsx`).
- **Styling Strategy:**
  - To avoid server restart/caching issues, complex and repeated styles (gradients, custom shadows) are **not** defined in `tailwind.config.ts`.
  - Instead, they are defined as utility classes in `app/globals.css` using `@apply` (e.g., `.gradient-hero-ai`, `.shadow-button-cta`).
  - JSX/TSX files use these stable utility classes, not arbitrary `[...]` values.
- **Key Reusable Component:** `app/components/GradientBorderButton.tsx` is a crucial component for handling buttons with a gradient border and hover effects.
- **Key Files (Post-Refactor):**
  - `app/page.tsx`: Entry point, composes the page from section components.
  - `app/components/`: Contains all section and reusable components.
  - `app/globals.css`: Defines global styles and custom `@apply` utilities.
