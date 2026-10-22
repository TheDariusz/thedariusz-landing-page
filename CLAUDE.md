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
npm run typecheck    # TypeScript type check (tsc --build)
```

## PRD & Design Docs

- **`thedariusz-landing-page-prd.md`** — The main PRD. Defines product vision, phased roadmap (Phase 0 MVP → Phase 1 Astro rebuild → Phase 2 blog), brand identity, section specs, non-functional requirements (Lighthouse 90+, accessibility, SEO), contact form architecture (n8n webhook on Hetzner), hosting strategy, and success metrics. Consult this before making any feature or structural decisions.
- **`lovable-prompt.md`** — The original Lovable.dev prompt used to scaffold the initial version. Contains detailed visual/design specs: color values (`#0f172a` / `#1e293b` alternating backgrounds, `#e11d48` red accent), typography rules, per-section layout details, animation expectations, and responsive behavior. Historical reference only: its navy palette was superseded by the portfolio redesign (see `context/changes/portfolio-redesign/`).

## Architecture

Personal landing page built with React 19, TypeScript, Vite 7, Tailwind CSS 4, and shadcn/ui. Originally scaffolded with Lovable.

### Key patterns

- **Single-page app**: No routing — `src/pages/Index.tsx` composes section components in order: Header, HeroSection, StatsBar, PortfolioSection, AboutSection, SkillsSection, ContactSection, Footer, ScrollToTop.
- **Centralized content**: All site copy, nav links, skills, stats, and business info live in `src/data/siteData.ts`. Section components read from this object — edit content there, not in components.
- **Path alias**: `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts).
- **UI components**: `src/components/ui/` contains shadcn/ui primitives (do not edit manually — use `npx shadcn-ui@latest add <component>`). Custom page sections live in `src/components/`.
- **Animations**: Motion (v12, import from `motion/react`) for entrance animations; `src/App.tsx` wraps the tree in `<MotionConfig reducedMotion="user">`. CSS hover motion (`scale-*`, `translate-*`) must use the `motion-safe:` variant: in Tailwind 4 these set the separate `scale`/`translate` properties, so `motion-reduce:transform-none` does not cancel them. Custom keyframe `fade-in-up` defined in `src/index.css` `@theme` block.
- **Styling**: Dark theme only. Tailwind CSS 4 with CSS-first config — all theme tokens in `src/index.css` `@theme` block (no `tailwind.config.ts`). Colors use HSL CSS variables: charcoal canvas (`--background`, `#131316`), `--card` surfaces (`#1c1c20`), hairline `--border` (`#2a2a2f`), `--subtle` grey for mono labels, and red (`#e11d48`, `--primary`/`--ring`) used only for primary CTAs, focus rings, the single hero glow and the header logo dot. No custom `@utility` classes; sections share inline classes (`py-24 md:py-32 lg:py-40 border-t border-border`, a mono uppercase `text-subtle` eyebrow above a tight-tracked `h2`). `--radius-media` (24px) is for screenshot and form cards.
- **Fonts**: Inter (sans) and JetBrains Mono (mono), loaded via Google Fonts in `src/index.css`.

### Testing

Vitest with jsdom environment and `@testing-library/react`. Test setup in `src/test/setup.ts`. Tests go in `src/**/*.{test,spec}.{ts,tsx}`.

### TypeScript

Strict mode is off. `noImplicitAny` is disabled but `strictNullChecks` is enabled.

### CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push to `main` and PRs targeting `main`. Steps: lint → typecheck → test → build. Node version read from `.nvmrc` (currently 22).

# Commits
- Do not add Co-Authored-By or any AI footer to commit messages
 
# Linear workflow (via Linear MCP)
This repo maps to the **"TheDariusz Landing Page"** project in my Linear
workspace. The Linear MCP server is connected; use it to read and update
issue state — don't ask me to paste issue details.
 
## Start of session
- Show my open issues for this project assigned to me (Dariusz) with status
  **In Progress** or **In Review** — this is my "Resume Work" filter.
  Summarize where I left off and the concrete next step for each.
- If nothing is in progress, take the highest-priority issue with status
  **Ready** (my "Next" filter) and propose starting it.
## While working
- When you start an issue, move it to **In Progress**.
- Each Linear issue carries a `branchName` — check out that branch before you
  start (I use git worktrees).
- Apply labels consistently: `frontend`, `Feature`, `Improvement`,
  `Documentation`, `Bug`, `Maintenance`, `Research`.
## End of session
- Add a short comment to the issue: what's done, the next concrete step,
  anything blocked. This is my handoff for tomorrow.
- Move the issue to **In Review** when it's ready for review.

# Other notes
Because I'm a developer who has been learning this stack and doesn't have experience with building frontend applications, you should act according to these rules:

- When I ask you a question about your code, follow these rules:
    1. Intuition First: When explaining concepts, make sure they're understandable to someone who's just learning.
    2. Concrete and Practical: Support any complex, abstract concepts (formulas, architecture) with a simple, concrete example or scenario.
    3. "Why": Don't just explain how it works; explain why we chose this approach, the trade-offs involved, and potential errors/pitfalls.
    4. Broader Perspective: Compare the concepts discussed with other technologies, languages (especially in Java as I'm Java developer), and frameworks that approach similar problems differently, so I can explore alternative approaches to architecture and patterns.
    5. Active Learning Principle: Never end an answer with just a period. ALWAYS end with a specific question, a "what if" scenario, or a small problem to solve to test my understanding. Don't continue until I get the answer right — if I get it wrong, explain why and ask again in a different way.

- Goal: Building intuition and active understanding, not just passive knowledge.
