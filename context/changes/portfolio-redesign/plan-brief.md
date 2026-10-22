# Portfolio Redesign — Plan Brief

> Full plan: `context/changes/portfolio-redesign/plan.md`
> Research: `context/changes/portfolio-redesign/design-research.md`
> Approved prototype: `context/changes/portfolio-redesign/prototype/index.html` (open via `npm run dev` → `/context/changes/portfolio-redesign/prototype/index.html`)

## What & Why

Restyle the landing page to the "Editorial split" direction, as refined in the prototype review: charcoal canvas, red only on CTAs, mono labels, a split hero with a large portrait and one subtle glow, and scroll and hover motion. Add a **Projects** section showcasing three shipped AI apps: AI Cards, 2do AI and Crisis Assistant. Recruiters and clients should see real products, not just a skills list, and the page should stop looking like an AI-generated template.

## Starting Point

The page is a single-page React 19 + Tailwind 4 app scaffolded by Lovable. It has a navy palette in `:root` HSL variables, six "glow/gradient/band" utilities, and a centered hero with radial blobs and a ringed photo. All content lives in `src/data/siteData.ts`. There is no portfolio section; the PRD had deferred it to the Astro rebuild.

## Desired End State

The page is charcoal (`#131316`), with one soft red glow behind a split hero (large rounded portrait on the right). Sections fade up on scroll. "Projects" is the first nav item and leads to three alternating text and screenshot rows (`01 / 03`…). Screenshots zoom gently on hover, and each row has a mono `domain ↗` link to the live app in a new tab. The header keeps the GitHub, LinkedIn and X icons and the EN/PL CV dropdown. All CI checks and e2e tests pass, and motion turns off for users who set reduced motion.

## Key Decisions Made

| Decision | Choice | Why (1 sentence) | Source |
|---|---|---|---|
| Visual direction | Editorial split; `#e11d48` CTA-only | User picked it from 3 researched options | Research |
| Canvas | Charcoal `#131316` instead of `#0a0a0a` | User found pure black too dark in the prototype | Prototype |
| Hero glow | One subtle red radial glow (deviation from the research reject list) | Adds warmth; far softer than today's blur blobs | Prototype |
| Hero layout | Split: text left, 340px rounded portrait right; 160px circle on mobile | User found the small avatar too small | Prototype |
| Nav label / anchor | "Projects" → `#projects`, heading "Selected projects" | "Work" was easy to miss; the label should match the heading | Prototype |
| Header contents | GitHub, LinkedIn, X icons + EN/PL CV dropdown kept | User wants X in the header and both CV languages | Prototype |
| Motion | Scroll reveal everywhere, hover zoom/nudge/lift, `MotionConfig reducedMotion="user"` | Page felt static; motion must stay accessible | Prototype |
| Restyle reach | Full page, staged in 4 phases | A charcoal portfolio between navy sections would look broken | Plan |
| Screenshots | Ship current refs as WebP now, swap files later | Unblocks work; a later swap is a drop-in file replacement | Plan |
| App order | AI Cards → 2do AI → Crisis Assistant | Leads with the strongest "AI product" signal | Plan |
| Mobile row order | Screenshot first, every row | Image hooks the scroll; DOM order needs no reordering | Plan |
| Linking | Mono text link + linked screenshot, one tab stop | Large click target without a duplicate keyboard stop | Plan |
| Testing | Update existing + targeted data/section/link tests; no visual snapshots | Covers the new contract without flaky cross-OS baselines | Plan |
| `subtle` grey | `#8a8a8a` instead of `#6b6b6b` | The original fails WCAG AA for small mono labels | Plan |

## Scope

**In scope:**
- Token swap (charcoal) and removal of the 6 rejected utilities
- Split hero with glow; header with icons and the CV dropdown
- New `PortfolioSection` with data, assets and a "Projects" nav link
- Scroll and hover motion, with reduced-motion support
- Editorial spacing and headings for the remaining sections
- Unit and e2e test updates
- PRD and CLAUDE.md doc updates

**Out of scope:**
- Polish version / i18n (a separate upcoming change; copy stays in `siteData.ts`)
- Light theme, Astro migration
- New in-app screenshots, per-app tech stack
- Skills/Stats content restructure
- Visual snapshot tests, `ui/*` edits, OG image
- The prototype's variant switcher

## Architecture / Approach

The palette changes only through the `:root` variable values in `src/index.css`, so the shadcn primitives re-theme for free. Portfolio content (including the imported WebP modules) lives in `siteData.portfolio.projects`. A new `PortfolioSection` maps over it and reuses `FadeInSection` for entrance animation. Index position and length give the `0N / 0M` label, and `new URL(url).hostname` gives the link text. The approved prototype holds the exact class strings to port. Index order becomes Hero → Stats → **Projects** → About → Skills → Contact.

## Phases at a Glance

| Phase | What it delivers | Key risk |
|---|---|---|
| 1. Tokens & effect cleanup | Whole page charcoal and flat; red CTA-only | Leftover utility classes fail silently (Tailwind gives no error); a grep check is required |
| 2. Header & hero | Split hero with portrait and glow; header icons + CV; reduced-motion config | Glow causing horizontal scroll on mobile; breaking h1/tagline/header-blur e2e checks |
| 3. Projects section | 3 alternating project rows with hover motion, Projects nav, tests | Polish-language AI Cards capture on an English page (accepted for now) |
| 4. Remaining sections & docs | Consistent rhythm + scroll reveal across sections; PRD/CLAUDE.md updated | Lighthouse a11y/perf regression; verified manually on the preview build |

**Prerequisites:** `cwebp` (installed); Node 22.
**Estimated effort:** about 2–3 sessions across 4 phases.

## Open Risks & Assumptions

- The current screenshots are landing-page captures (one in Polish). We accept this until in-app English screens exist.
- The portrait source is 480px. At 340px display width on retina screens it is slightly soft; a 700px+ source photo would fix it (a drop-in file replacement).
- We assume the three app URLs stay live; the e2e tests check hrefs only, not reachability.
- There is no Linear issue for this change, so the branch name and status tracking must be set up manually if wanted.

## Success Criteria (Summary)

- A visitor reaches three live AI apps from the first nav item in one click each.
- The page reads as calm but alive: charcoal with one warm glow and gentle motion, with red only marking the actions to take.
- CI is green (lint, typecheck, unit, build, e2e), and Lighthouse scores 90+ on the production build.
