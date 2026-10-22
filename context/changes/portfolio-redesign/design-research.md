# Design research — portfolio-redesign

Date: 2026-10-22 · Method: `refero-design` skill (Refero styles) + Mobbin sections · Direction chosen by user: **Editorial split**

## Brief

Designing a personal landing page + portfolio for Dariusz Szczepański (Java/Spring backend engineer building AI side products) on web, desktop and mobile.
Goal: show recruiters/clients three live products and make contact easy.
Tone: confident, quiet, technical; product screenshots carry the color.
Must remember: three real, shipped AI apps.
Constraints: React 19 + Tailwind 4 + shadcn/ui, dark theme only, content lives in `src/data/siteData.ts`, Lighthouse 90+, accessibility (PRD).

## Research summary

- Refero styles reviewed: 3 searches (dev portfolio dark, indie maker AI apps, Linear-style dev tool), 3 full styles retrieved:
  - **Akash Tyagi** (akashtyagi.com) — `17bf2691-6815-4335-b04b-340122754ff4`
  - **David Kirschberg** (kirschberg.co.nz) — `3ce811a6-5b93-4542-91d5-62b2f1379d24`
  - **Linear** (linear.app) — `554b801c-3b31-4086-a7e5-ae613cdd618b`
- Mobbin sections reviewed: 12 for "projects showcase section with product screenshots". Useful:
  - [Koto](https://mobbin.com/sites/sections/eec8e349-6e6b-4409-aac8-8fed304d4ae6) — black canvas, text column left, large media right, small index label
  - [Instrument](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1) — large rounded media, title + one-line description + tag beneath
  - [Whereby](https://mobbin.com/sites/sections/c8614e3d-8155-4789-8322-5b52bf219e88) — screenshots in browser-like frames
- Options shown to user: Editorial split (Akash Tyagi + Koto), Gallery cards (Kirschberg + Whereby), Command center (Linear + Verse). User picked **Editorial split**.

## Reference lock

**Primary reference:** Akash Tyagi — dark portfolio, single saturated accent, text-led, product screenshots as the only imagery.

**Preserve:**
1. Near-black flat canvas; hierarchy from type and spacing, not shadows or glows.
2. One accent color, CTA-only (here: existing red `#e11d48`, replacing Akash's fuchsia in the same role).
3. Mono for utilitarian details (labels, indices, stack, links) — JetBrains Mono already loaded.
4. Generous vertical rhythm between sections (source: 200px; adapt to ~128–160px desktop).
5. Left-aligned content; tight-tracked headings.

**Borrow only:**
- Koto: project row = text column + large screenshot, alternating sides; small `01 / 03` index label.
- Kirschberg: screenshots inside flat cards with 24px radius on a slightly lighter surface.

**Role rules:**
- Red accent: primary CTA background + focus ring only. Not section backgrounds, not gradients, not headline word highlights.
- Mono: labels, indices, metadata, external links. Never body paragraphs.
- Screenshot card surface: only around imagery.

**Media strategy:** real screenshots of each app (light UI). Current refs in `refs/` are 1920×1080 landing-page captures; replace with in-app screens if available. Display at 16:10 crop, `object-cover object-top`, `loading="lazy"`, explicit width/height, descriptive alt text.

**Reject:**
- Radial glow blobs behind hero, glowing ring around profile photo, `text-gradient`, `glow-accent`, `badge-glow`.
- Navy slate background (`222 47% 11%`) and alternating navy/blue section bands.
- Centered-everything layout; generic 3-column feature grid for projects.
- Serif/italic/color word swaps in headlines.

**Token commitments (proposed):**

| Token | Value | Role |
|-------|-------|------|
| background | `#0a0a0a` | page canvas |
| surface | `#141414` | screenshot cards, contact form |
| border | `#ffffff14` | hairline dividers |
| foreground | `#ededed` | primary text |
| muted | `#a1a1a1` | secondary text |
| subtle | `#6b6b6b` | metadata, indices |
| accent | `#e11d48` | primary CTA, focus ring |
| radius-media | 24px | screenshot cards |
| radius-control | 9999px | buttons, tags |
| font-sans | Inter, tracking −0.02 to −0.03em on headings | all text |
| font-mono | JetBrains Mono 12–13px uppercase | labels, metadata |

## Decision ledger

| Decision | Source | Source rule / role | Why |
|----------|--------|--------------------|-----|
| Near-black flat canvas, no glows | Akash Tyagi | Canvas `#000`, "no shadows or elevation" | Removes the most template-looking parts of the current page |
| Keep red `#e11d48` as the single accent | User brand (lovable-prompt.md) + Akash Tyagi | Accent is CTA-only, deliberately singular | Keeps brand continuity while adopting the restraint |
| Portfolio as alternating split rows | Koto (Mobbin) + Akash Tyagi layout | Text column + large visual, stacked sections | Each app needs room for a real description, not just a caption |
| `01 / 03` index + mono labels | Koto + Akash Tyagi | Mono for timestamps/utility text | Adds a technical, editorial detail that fits a backend engineer |
| Screenshots in 24px-radius flat cards | Kirschberg | Work Item Card, 24px radius, tonal surface | Light app UIs need a frame to sit cleanly on black |
| Screenshots are the only color | Kirschberg + Akash Tyagi imagery | "Imagery provides the visual interest" | Three light, colorful apps contrast well on a dark canvas |
| Left-aligned hero, smaller photo, no ring/glow | Akash Tyagi (left-aligned blocks) + reject list | — | Current centered hero + glow reads as AI template |
| Large section gaps (~128–160px) | Akash Tyagi | sectionGap 200px | Calm, confident rhythm; adapted down for a longer page |
| Pill buttons | Akash Tyagi | buttons 40px radius | Matches source control shape |
| Add "Work" to nav, place Portfolio after Hero/Stats | User brief | — | Portfolio is the new headline feature |

## Portfolio content (draft, from each app's landing page)

| App | URL | Draft description |
|-----|-----|-------------------|
| AI Cards | https://ai-cards.app | English flashcards for Polish speakers. Type a word you heard; AI builds the card (meaning, example sentence, audio) and a three-day routine takes it from first read to active recall. |
| Crisis Assistant | https://crisisassistant.app | Works out how much water, food and other emergency supplies your household needs, then tracks expiry dates. Two minutes, no account needed. |
| 2do AI | https://2doai.app | Keeps everyday tasks, long-term goals and someday dreams in one place, reminds you of plans you set aside, and suggests a first step. |

## Open questions

- Real tech stack per app (shown as mono metadata line).
- Better screenshots: in-app screens vs. landing-page captures in `refs/`.
- Mobile layout references not yet researched (plan: rows stack, screenshot first).
