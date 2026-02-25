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

Personal landing page built with React 19, TypeScript, Vite 7, Tailwind CSS 4, and shadcn/ui. Originally scaffolded with Lovable.

### Key patterns

- **Single-page app**: No routing — `src/App.tsx` composes section components in order: Header, HeroSection, StatsBar, AboutSection, SkillsSection, ContactSection, Footer, ScrollToTop.
- **Centralized content**: All site copy, nav links, skills, stats, and business info live in `src/data/siteData.ts`. Section components read from this object — edit content there, not in components.
- **Path alias**: `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts).
- **UI components**: `src/components/ui/` contains shadcn/ui primitives (do not edit manually — use `npx shadcn-ui@latest add <component>`). Custom page sections live in `src/components/`.
- **Animations**: Motion (v12, import from `motion/react`) for entrance animations. Custom Tailwind keyframes (`fade-in-up`, `bounce-subtle`) defined in `src/index.css` `@theme` block.
- **Styling**: Dark theme only. Tailwind CSS 4 with CSS-first config — all theme tokens in `src/index.css` `@theme` block (no `tailwind.config.ts`). Colors use HSL CSS variables. Custom utility classes defined with `@utility`: `.text-gradient`, `.glow-accent`, `.badge-glow`, `.section-alt`, `.section-deep`, `.accent-underline`.
- **Fonts**: Inter (sans) and JetBrains Mono (mono), loaded via Google Fonts in `src/index.css`.

### Testing

Vitest with jsdom environment and `@testing-library/react`. Test setup in `src/test/setup.ts`. Tests go in `src/**/*.{test,spec}.{ts,tsx}`.

### TypeScript

Strict mode is off. `noImplicitAny` and `strictNullChecks` are disabled.

# Commits
- Do not add Co-Authored-By or any AI footer to commit messages

# Other notes
Because I'm a developer who has been learning this stack and doesn't have experience with building frontend applications, you should act according to these rules:

- When I ask you a question about your code, follow these rules:
    1. Intuition First: When explaining concepts, make sure they're understandable to someone who's just learning.
    2. Concrete and Practical: Support any complex, abstract concepts (formulas, architecture) with a simple, concrete example or scenario.
    3. "Why": Don't just explain how it works; explain why we chose this approach, the trade-offs involved, and potential errors/pitfalls.
    4. Broader Perspective: Compare the concepts discussed with other technologies, languages (especially in Java as I'm Java developer), and frameworks that approach similar problems differently, so I can explore alternative approaches to architecture and patterns.
    5. Active Learning Principle: Never end an answer with just a period. ALWAYS end with a specific question, a "what if" scenario, or a small problem to solve to test my understanding. Don't continue until I get the answer right — if I get it wrong, explain why and ask again in a different way.

- Goal: Building intuition and active understanding, not just passive knowledge.
