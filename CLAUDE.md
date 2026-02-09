# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run test         # Run tests once (vitest)
npm run test:watch   # Run tests in watch mode
```

## PRD & Design Docs

- **`thedariusz-landing-page-prd.md`** — The main PRD. Defines product vision, phased roadmap (Phase 0 MVP → Phase 1 Astro rebuild → Phase 2 blog), brand identity, section specs, non-functional requirements (Lighthouse 90+, accessibility, SEO), contact form architecture (n8n webhook on Hetzner), hosting strategy, and success metrics. Consult this before making any feature or structural decisions.
- **`lovable-prompt.md`** — The original Lovable.dev prompt used to scaffold the initial version. Contains detailed visual/design specs: color values (`#0f172a` / `#1e293b` alternating backgrounds, `#e11d48` red accent), typography rules, per-section layout details, animation expectations, and responsive behavior. Useful as a visual reference.

## Architecture

Personal landing page built with React 18, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Originally scaffolded with Lovable.

### Key patterns

- **Single-page app**: One main route (`/`) defined in `src/App.tsx` with react-router-dom. The Index page composes section components in order: Header, HeroSection, StatsBar, AboutSection, SkillsSection, ContactSection, Footer, ScrollToTop.
- **Centralized content**: All site copy, nav links, skills, stats, and business info live in `src/data/siteData.ts`. Section components read from this object — edit content there, not in components.
- **Path alias**: `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts).
- **UI components**: `src/components/ui/` contains shadcn/ui primitives (do not edit manually — use `npx shadcn-ui@latest add <component>`). Custom page sections live in `src/components/`.
- **Animations**: Framer Motion for entrance animations. Custom Tailwind keyframes (`fade-in-up`, `bounce-subtle`) defined in `tailwind.config.ts`.
- **Styling**: Dark theme only. Colors use HSL CSS variables defined in `src/index.css`. Custom utility classes: `.text-gradient`, `.glow-accent`, `.badge-glow`, `.section-alt`, `.section-deep`, `.accent-underline`.
- **Fonts**: Inter (sans) and JetBrains Mono (mono), loaded via Google Fonts in `src/index.css`.

### Testing

Vitest with jsdom environment and `@testing-library/react`. Test setup in `src/test/setup.ts`. Tests go in `src/**/*.{test,spec}.{ts,tsx}`.

### TypeScript

Strict mode is off. `noImplicitAny` and `strictNullChecks` are disabled.


# Other notes
Developer doesn't have experience with required stack and general with frontend applications so AI should be more explainable and should act as a teacher
