# Portfolio Redesign Implementation Plan

## Overview

Restyle the landing page to the "Editorial split" direction chosen in `design-research.md`, as refined by the approved prototype (`context/changes/portfolio-redesign/prototype/index.html`):
- a charcoal canvas, with red used only for CTAs
- mono for labels
- a split hero with a large portrait and one subtle red glow
- scroll and hover motion

Add a new **Projects** section that presents three shipped AI apps (AI Cards, 2do AI, Crisis Assistant) as alternating rows of text and screenshot. The goal is to show recruiters and clients real products and keep contact easy.

**The prototype is the visual source of truth.** Where this plan and `design-research.md` disagree, the plan wins; both deviations are listed in "Prototype review" below.

### Prototype review (2026-10-22)

The user reviewed a static HTML prototype and asked for these changes to the research direction:

| Feedback | Decision |
|---|---|
| Photo too small | Split hero: text in 7 columns, portrait in 5 columns (max 340px, 24px radius) on desktop; a 160px circle above the name on mobile |
| No visible link to the portfolio | Nav label **Projects** (first item), section id `#projects`, heading "Selected projects"; the mobile menu includes it |
| X missing from header | The header keeps all three `SocialLinks` icons (GitHub, LinkedIn, X), on desktop and in the mobile menu |
| CV must offer PL and EN | Keep the existing `CVDownloadButton` dropdown (English and Polski, each with PDF and Markdown) everywhere it appears today |
| Too dark and static | **Charcoal** canvas instead of black, plus a **subtle red hero glow** (deviates from the research's reject list on purpose), scroll-reveal on every section, and hover motion on screenshots, external links and the primary button |
| Polish version of the page coming | Out of scope here, as a separate i18n change. Copy stays in `siteData.ts` so it is ready for translation |

## Current State Analysis

- **Palette.** The navy shadcn palette is defined once, as HSL triplets in `:root` (`src/index.css:49-82`), and exposed through the `@theme` block (`src/index.css:4-46`). Every component, including the shadcn primitives in `src/components/ui/`, reads these variables.
- **Rejected utilities.** Six custom utilities from the Lovable scaffold carry the look the research rejects: `text-gradient`, `glow-accent`, `badge-glow`, `section-alt`, `section-deep` and `accent-underline` (`src/index.css:98-126`). They are used in About, Stats, Skills, Contact and Footer.
- **Hero.** The hero (`src/components/HeroSection.tsx`) is centered, sits on two radial glow blobs, shows a 192–208px photo with a red ring and glow, and ends with a bouncing chevron.
- **Red outside CTAs.** Red appears in places that are not CTAs: the StatsBar top borders, the Skills icons and chip hovers, the Footer top border, the ScrollToTop background, the form error text and the CV button outline.
- **Content.** All content lives in `src/data/siteData.ts`. There is no portfolio data or section yet. Section order is set in `src/pages/Index.tsx`.
- **Tests that depend on structure:**
  - `src/test/Index.test.tsx` looks up sections by `aria-label`.
  - `e2e/navigation.spec.ts` hard-codes the About, Skills and Contact nav labels, and expects the header to gain `backdrop-blur` after scrolling.
  - `e2e/content-and-layout.spec.ts` checks the section ids and the h1 and tagline text.
- **PRD conflict.** The PRD schedules the Portfolio for Phase 1, the Astro rebuild (`specs/thedariusz-landing-page-prd.md:51`, `:205`, `:213`). This change delivers it in the Phase 0 React app.
- **Screenshot assets.** The three refs (`context/changes/portfolio-redesign/refs/*.png`) are 1920×1080 PNG captures of the landing pages, about 160 KB each. The AI Cards capture is in Polish.
- **Linear.** The "TheDariusz Landing Page" project in Linear currently has no issues, so there is no issue `branchName` to check out.

## Desired End State

When the page loads:
- The canvas is charcoal (`#131316`), with no navy bands or text gradients.
- The hero is split: name, tagline and CTAs on the left, a large rounded portrait on the right, and one soft red radial glow behind the top-right of the hero.
- Sections fade up as they scroll into view.
- Red appears only on primary CTA backgrounds, focus rings and that single glow.
- The header shows the nav, the GitHub, LinkedIn and X icons, and the EN/PL CV dropdown.

A "Projects" link, first in the nav, scrolls to a section with three rows (`01 / 03` … `03 / 03`), each showing:
- a mono index
- the app name
- a short description
- a mono `domain ↗` link
- a 24px-radius screenshot card

On desktop, text and screenshot alternate sides from row to row, and hovering a screenshot zooms it slightly. On mobile, the screenshot comes first in every row. Each project's text link and screenshot both open the live app in a new tab, and there is only one keyboard tab stop per project. With the OS "reduce motion" setting on, entrance and hover motion are disabled. All existing behaviour (contact form, CV dropdown, mobile menu, scroll-to-top) works unchanged. Lint, typecheck, unit tests, build and e2e tests all pass.

### Key Discoveries:

- Changing the HSL values in `:root` while keeping the variable names re-themes the shadcn primitives without editing `src/components/ui/` (`src/index.css:49-82`).
- In Tailwind 4, an unknown class name in `className` produces no build error. After the utilities are deleted, any leftover use fails silently, so verify with grep (see Phase 1).
- Vitest already handles `.webp` imports: `HeroSection` imports `@/assets/profile-photo.webp` and renders in `Index.test.tsx`. So `siteData.ts` can import the project screenshots directly.
- `FadeInSection` (`src/components/FadeInSection.tsx`) is the existing entrance-animation wrapper. Reuse it for the portfolio rows.
- `cwebp` is installed at `/opt/homebrew/bin/cwebp` for the asset conversion.
- The header `backdrop-blur`-on-scroll behaviour is checked by an e2e test (`e2e/navigation.spec.ts:51-60`). Keep it.
- `motion/react` animations ignore `prefers-reduced-motion` unless they are told to respect it. Wrapping the app in `<MotionConfig reducedMotion="user">` (`src/App.tsx`) turns transform animations off for those users, with no per-component changes.
- The approved prototype (`context/changes/portfolio-redesign/prototype/index.html`) contains the exact class strings for the hero split, the glow, the screenshot card hover and the external-link arrow. Port them from there rather than re-deriving them. It runs via `npm run dev` at `/context/changes/portfolio-redesign/prototype/index.html`.

## What We're NOT Doing

- Light theme or theme toggle (PRD Phase 1)
- i18n or a Polish version of the page. That is a separate, upcoming change. This change only keeps all copy in `siteData.ts`, and leaves header space next to the social icons for a future EN/PL switch.
- Astro migration
- New in-app or English screenshots. The current landing-page captures ship now and are swapped later by replacing the files under the same names.
- A per-app tech-stack metadata line (the real stacks are not yet known). Adding it later means one optional field in the project data and one line in the component.
- Restructuring the Skills or Stats content. Only their styling changes.
- Playwright visual-snapshot baselines
- Changes to `src/components/ui/*`
- `og-image.png`, meta tags, sitemap
- The prototype's variant switcher panel (prototype-only; the choice is fixed: charcoal + glow)
- Creating Linear issues (none exist for this project; set up separately if wanted)

## Implementation Approach

Work from the outside in, so the page is shippable after every phase:
1. Swap the tokens and strip the rejected effects globally. The whole page turns black and flat at once, so no navy/black mix is ever visible.
2. Redo the hero and header layout, where the "template" feel is strongest.
3. Add the Projects section on the new tokens, together with its data and tests.
4. Bring the remaining sections up to the same editorial rhythm, and update the docs to match reality.

Content stays in `siteData.ts`. Images are imported there so Vite fingerprints them. No new dependencies.

## Critical Implementation Details

**Contrast.** The research's `subtle` grey `#6b6b6b` gives only about 3.7:1 against the canvas, which fails WCAG AA for the 12–13px mono labels and would cost Lighthouse accessibility points. Use `#8a8a8a` (`0 0% 54%`, about 5.4:1 on the charcoal `#131316`) for the subtle role. Express the hairline border as a solid colour (`240 6% 17%`, i.e. `#2a2a2f`) so it fits the existing `hsl(var(--x))` triplet format.

**Glow vs. CV dropdown clipping.** The hero glow must be clipped so it does not cause horizontal scroll. Put `overflow-hidden` on its own `absolute inset-0 pointer-events-none` wrapper inside the hero, **never** on the hero `<section>`. The prototype first had `overflow-hidden` on the section, and it cut off the CV dropdown. Note that the dropdown is a Radix portal in the real app, so it renders outside the section anyway. The other overflow risk, the glow causing horizontal scroll at 375px, still applies.

**Mobile order vs. keyboard order.** Put the screenshot link before the text in the DOM, so the mobile order needs no reordering. On desktop, alternate sides with CSS order or `md:` grid placement only. Remove the screenshot anchor from the tab order (`tabIndex={-1}`, `aria-hidden="true"`) so the mono text link is the only focus stop and the accessible name per project.

## Phase 1: Design Tokens & Effect Cleanup

### Overview

Re-theme the page to charcoal and remove every rejected effect. After this phase the page looks flat and dark everywhere, with the layout still the same.

### Changes Required:

#### 1. Palette and utilities

**File**: `src/index.css`

**Intent**: Replace the navy HSL values with the research token set and delete the six rejected utilities. (`bounce-subtle` stays until Phase 2 removes the chevron that uses it.)

**Contract**: Variable names stay the same; only the values change.

| Variable | New value | Hex |
|---|---|---|
| `--background` | `240 7% 8%` | `#131316` (charcoal) |
| `--card`, `--popover`, `--secondary`, `--muted` | `240 7% 12%` | `#1c1c20` |
| `--foreground`, `--card-foreground`, `--popover-foreground` | `0 0% 93%` | `#ededed` |
| `--secondary-foreground` | `0 0% 75%` | |
| `--muted-foreground` | `0 0% 63%` | `#a1a1a1` |
| `--border`, `--input` | `240 6% 17%` | `#2a2a2f` |
| `--primary`, `--accent`, `--ring` | unchanged red | `#e11d48` |

- Drop `--background-alt` and `--background-deep`, and their `@theme` mappings.
- Add `--subtle: 0 0% 54%` and map it to `--color-subtle`.
- Add `--radius-media: 24px` in `@theme`, for the screenshot cards.
- Delete `@utility` `text-gradient`, `glow-accent`, `badge-glow`, `section-alt`, `section-deep` and `accent-underline`.

#### 2. Remove utility usages and off-role red

**Files**: `src/components/StatsBar.tsx`, `src/components/AboutSection.tsx`, `src/components/SkillsSection.tsx`, `src/components/ContactSection.tsx`, `src/components/Footer.tsx`, `src/components/ScrollToTop.tsx`, `src/components/CVDownloadButton.tsx`

**Intent**: Remove every class that referenced a deleted utility. Replace red that is not a CTA or focus ring with neutral tokens, following the research role rules.

**Contract**:
- No `section-alt`, `section-deep`, `accent-underline`, `badge-glow` or `glow-accent` remains in `src/`.
- **StatsBar:** the top borders use `border-border`.
- **Skills:** icons use `text-muted-foreground`, and the chip hover no longer uses red.
- **Footer:** the top border becomes a hairline `border-border`.
- **ScrollToTop:** card surface with a border instead of `bg-primary`.
- **Form errors:** use `text-destructive` instead of `text-primary`.
- **CV button:** outline uses a neutral border.
- **Pill CTAs:** primary CTAs (hero "Get in Touch", contact submit, CV trigger) get `rounded-full` through `className` at the call site.

### Success Criteria:

#### Automated Verification:

- No rejected utility remains: `grep -rnE "section-alt|section-deep|accent-underline|badge-glow|glow-accent|text-gradient|background-alt|background-deep" src` returns nothing
- Lint passes: `npm run lint`
- Type checking passes: `npm run typecheck`
- Unit tests pass: `npm run test`
- Build passes: `npm run build`
- E2E tests pass: `npm run test:e2e`

#### Manual Verification:

- Page canvas is charcoal everywhere; no navy bands remain
- Red appears only on primary CTA backgrounds and focus rings
- CV dropdown, toast and contact inputs look correct on the new palette

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Header & Hero Editorial Layout

### Overview

Replace the centered "template" hero with the prototype's split hero (large portrait, one subtle glow), calm down the header, and make all motion respect reduced-motion.

### Changes Required:

#### 1. Hero

**File**: `src/components/HeroSection.tsx`

**Intent**: Build the prototype's split layout:
- **Left (7 of 12 columns):** mono greeting, a large tight-tracked h1 (`tracking-[-0.04em]`, up to about 88px on `lg`), muted sans tagline (no letter-spaced uppercase), and the CTAs.
- **Right (5 columns):** the portrait, at most 340px wide, square, 24px radius, hairline border, no ring or shadow.
- **Mobile:** the portrait comes first, as a 160px circle above the name.

Replace the two old blur blobs with **one** glow: a soft radial gradient of `rgb(225 29 72 / .14)` fading to transparent, about 720px wide, sitting at the top-right behind the portrait. Remove the bouncing chevron. Keep the staggered `motion` entrance for the text lines (about 80ms apart).

**Contract**:
- The section keeps `aria-label="Introduction"`. The section has `relative` positioning, and the glow lives in its own `absolute inset-0 overflow-hidden pointer-events-none` wrapper (see Critical Implementation Details).
- The h1 text stays `siteData.name`, and the tagline stays `siteData.tagline` (both asserted in `e2e/content-and-layout.spec.ts:19-22`).
- CTAs keep their labels: "Get in Touch" (red pill) and "Download CV" (neutral outline pill).
- The section no longer needs `min-h-screen`. Use generous top and bottom padding instead.
- The photo `<img>` gets explicit `width`/`height` (480 source) to avoid layout shift.
- With the chevron gone, delete the `bounce-subtle` keyframe and `--animate-bounce-subtle` from `src/index.css`.

#### 2. Header

**File**: `src/components/Header.tsx`

**Intent**: Keep the behaviour and make the look match the flat style. Drop `shadow-lg shadow-background/50` from the scrolled state. Keep the `backdrop-blur` class on scroll, because e2e asserts it. Keep the right-hand cluster exactly as today: the `SocialLinks` icons (GitHub, LinkedIn **and X**) followed by `CVDownloadButton`, in both the desktop header and the mobile menu.

**Contract**: Nav markup, aria-labels, the mobile menu `data-testid` and the logo `aria-label="Home"` are unchanged. `SocialLinks` and `CVDownloadButton` remain in both header variants.

#### 3. Reduced motion

**File**: `src/App.tsx`

**Intent**: This change adds more motion, so make all `motion/react` animations respect the OS reduced-motion setting in one place.

**Contract**: Wrap the tree in `<MotionConfig reducedMotion="user">`. CSS hover transitions added in later phases use Tailwind `motion-reduce:` variants (e.g. `motion-reduce:transition-none`, `motion-reduce:transform-none`).

### Success Criteria:

#### Automated Verification:

- Lint passes: `npm run lint`
- Type checking passes: `npm run typecheck`
- Unit tests pass: `npm run test`
- E2E tests pass: `npm run test:e2e`

#### Manual Verification:

- Hero matches the prototype at 375px, 768px and 1440px widths (split with large portrait on desktop, circle above the name on mobile), with no horizontal scroll caused by the glow
- Exactly one subtle red glow behind the hero; no photo ring and no bounce animation
- Header shows the GitHub, LinkedIn and X icons and the EN/PL CV dropdown; blur appears on scroll without a drop shadow
- With macOS "Reduce motion" on, the hero text appears without sliding

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 3: Portfolio ("Projects") Section

### Overview

Add the three-app showcase together with its assets, data, navigation and tests.

### Changes Required:

#### 1. Screenshot assets

**Files**: `src/assets/projects/ai-cards.webp`, `src/assets/projects/2doai.webp`, `src/assets/projects/crisis-assistant.webp`

**Intent**: Convert the three PNG refs to WebP at 1600px wide (quality about 80) so they are well under 100 KB each. The file names are the swap points for later in-app screenshots.

**Contract**: `cwebp -q 80 -resize 1600 0 context/changes/portfolio-redesign/refs/<src>.png -o src/assets/projects/<name>.webp`. Output is 1600×900.

#### 2. Portfolio content

**File**: `src/data/siteData.ts`

**Intent**: Add the Projects nav link and the portfolio content, in the agreed order: AI Cards, 2do AI, Crisis Assistant. Use the draft descriptions from `design-research.md`.

**Contract**:
- `navLinks` gets `{ label: "Projects", href: "#projects" }` as its **first** entry.
- New `portfolio` object:
  - `heading` ("Selected projects")
  - `projects`: an array of `{ name, url, description, image, imageAlt }`
- `image` is the imported WebP module.
- `url` is the full `https://` URL. The component derives the displayed domain from it via `new URL(url).hostname`.

#### 3. Portfolio section component

**File**: `src/components/PortfolioSection.tsx` (new)

**Intent**: Render the projects as alternating split rows, as decided in the research and shown in the prototype. Each row is wrapped in `FadeInSection`.

Hover motion, as in the prototype:
- **Screenshot card:** the image scales to about 1.025 over about 0.6s with an ease-out curve, and the card border lightens to `subtle`. The card has `overflow-hidden` so the zoom stays inside the frame.
- **Text link:** the `↗` arrow nudges 2px up and to the right.
- **Reduced motion:** both are disabled via `motion-reduce:` variants.

**Contract**:
- `<section id="projects" aria-label="Projects">`.
- **Each row contains:**
  - a mono index `0N / 0M`, computed from the array position and length
  - an `h3` with the app name
  - the description in muted sans
  - a mono text link `hostname ↗` with `target="_blank" rel="noopener noreferrer"`, with the arrow in its own `<span>` so it can animate
  - a screenshot anchor to the same URL with `tabIndex={-1}` and `aria-hidden="true"`, wrapping an `<img>` with `width={1600} height={900} loading="lazy" decoding="async"`, the `imageAlt` text, and `object-cover object-top aspect-[16/10]` inside a `bg-card border overflow-hidden rounded-[var(--radius-media)]` card
- **Layout:** the screenshot comes first in the DOM. On `md:` and up, rows use a two-column grid, and odd rows put the screenshot on the right (via `md:order-*`).

#### 4. Page composition

**File**: `src/pages/Index.tsx`

**Intent**: Place the Projects section right after the StatsBar, before About.

**Contract**: The order becomes Header, Hero, Stats, **Portfolio**, About, Skills, Contact, Footer.

#### 5. Tests

**Files**: `src/test/siteData.test.ts`, `src/test/Index.test.tsx`, `e2e/navigation.spec.ts`, `e2e/content-and-layout.spec.ts`

**Intent**: Cover the new data contract, the section's presence and the external links, without testing styles.

**Contract**:
- `siteData.test.ts`: `portfolio.projects` has exactly 3 entries. Each has a non-empty `name`, `description` and `imageAlt`, a `url` matching `^https://`, and an `image`.
- `Index.test.tsx`: `getByLabelText("Projects")` is in the document.
- `navigation.spec.ts`: the desktop nav loop includes `["Projects", "#projects"]`.
- `content-and-layout.spec.ts`:
  - `#projects` is attached.
  - The section shows 3 links named `ai-cards.app ↗`, `2doai.app ↗` and `crisisassistant.app ↗` (or a hostname regex), in that order.
  - Each link has the correct `href`, `target="_blank"` and a `rel` containing `noopener`.
  - The screenshot anchors are not focusable (`tabindex="-1"`).

### Success Criteria:

#### Automated Verification:

- Assets exist and are small: `ls -l src/assets/projects/*.webp` shows 3 files, each under 150 KB
- Lint passes: `npm run lint`
- Type checking passes: `npm run typecheck`
- Unit tests pass, including the new portfolio data and section assertions: `npm run test`
- Build passes: `npm run build`
- E2E tests pass, including Projects nav and project links on desktop and mobile: `npm run test:e2e`

#### Manual Verification:

- Desktop: rows alternate sides; indices read `01 / 03`, `02 / 03`, `03 / 03`
- Rows fade up on scroll; hovering a screenshot zooms it slightly inside its frame, and hovering a link nudges the arrow
- Mobile (375px): every row shows the screenshot first, with no horizontal scroll
- Clicking a screenshot or a text link opens the live app in a new tab
- Tabbing through the section focuses exactly one link per project, with a visible red focus ring
- Screenshots load lazily (Network tab: images are requested only when the section approaches the viewport)

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 4: Remaining Sections & Docs

### Overview

Bring Stats, About, Skills, Contact and Footer to the same editorial rhythm, and update the docs so they match what was built.

### Changes Required:

#### 1. Section rhythm and headings

**Files**: `src/components/StatsBar.tsx`, `src/components/AboutSection.tsx`, `src/components/SkillsSection.tsx`, `src/components/ContactSection.tsx`, `src/components/Footer.tsx`, `src/components/PortfolioSection.tsx`

**Intent**: Apply one consistent section treatment across all sections:
- vertical padding of about 128–160px on desktop (`py-24 md:py-32 lg:py-40`) and less on mobile
- left-aligned, tight-tracked `h2`
- a small mono uppercase eyebrow label in `text-subtle` above each heading
- hairline `border-border` dividers instead of colored bands
- every section's heading block and content wrapped in `FadeInSection` (Stats and Skills keep their existing staggered `motion` reveal)
- hover states on the remaining interactive pieces: the primary CTA lifts by 2px (`hover:-translate-y-0.5`), and Skills chips and outline buttons lighten their border to `subtle`. All of these respect `motion-reduce:`.

Contact keeps its two-column layout, and the contact details are shown as a mono-label list (Email / Location / Elsewhere with the three social icons). The contact form sits on a `bg-card` surface with the 24px media radius.

**Contract**:
- All existing section ids, `aria-label`s, form labels and button names stay unchanged; the unit and e2e tests depend on them.
- Mono is used only for labels, metadata and links, never for body paragraphs.

#### 2. Documentation

**Files**: `specs/thedariusz-landing-page-prd.md`, `CLAUDE.md`

**Intent**:
- **PRD:** record that the Portfolio section shipped in Phase 0 (the React app), and drop it from the Phase 1 additions and the risk row.
- **CLAUDE.md:** update the section list (add PortfolioSection), the custom utility list (all removed) and the color description, to match the new tokens.

**Contract**:
- PRD lines around `:51`, `:205` and `:213` are updated.
- The CLAUDE.md "Key patterns" bullets for "Single-page app" and "Styling" are updated.

### Success Criteria:

#### Automated Verification:

- Lint passes: `npm run lint`
- Type checking passes: `npm run typecheck`
- Unit tests pass: `npm run test`
- Build passes: `npm run build`
- E2E tests pass: `npm run test:e2e`

#### Manual Verification:

- All sections share the same spacing rhythm and heading style on desktop and mobile
- Lighthouse (production build via `npm run preview`) scores 90+ in Performance, Accessibility, Best Practices and SEO
- Contact form submit, error and success toasts still look and behave correctly
- PRD and CLAUDE.md read correctly against the shipped page

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful.

---

## Testing Strategy

### Unit Tests:

- `siteData.portfolio.projects`: there are exactly 3, and every field is present and well-formed (https URLs, non-empty alt text)
- The Index page renders the Projects section alongside the existing sections

### Integration Tests:

- E2E: the Projects nav link scrolls to `#projects` (desktop)
- E2E: the 3 project text links have the correct href, open in a new tab with `noopener`, and appear in the agreed order
- E2E: the screenshot anchors are out of the tab order
- All existing contact, CV and navigation e2e tests stay green on desktop-chrome and mobile-chrome

### Manual Testing Steps:

1. Run `npm run dev`, then scroll the whole page at 1440px and check that only CTAs and focus rings are red.
2. Resize to 375px. Check that each project row shows the screenshot first and that nothing scrolls horizontally.
3. Tab from the top of the page through Projects. Check there is one focus stop per project and the ring is visible.
4. Run `npm run build && npm run preview`, then run Lighthouse on mobile and desktop.

## Performance Considerations

- The screenshots are the only new weight. WebP at 1600px with `loading="lazy"`, plus explicit width and height (no CLS), keeps the initial load unchanged, because the Projects section sits below the hero.
- Replacing the two `blur-[120px]` layers with one plain radial gradient (no blur filter) reduces paint cost in the hero.

## Migration Notes

- **Swapping screenshots later:** replace `src/assets/projects/<name>.webp` with a new 1600×900 (or 16:10) WebP. If the aspect ratio changes, update the `width`/`height` attributes in `PortfolioSection`.
- **Rollback:** every phase is self-contained, so you can revert per phase commit.

## References

- Design research: `context/changes/portfolio-redesign/design-research.md`
- Screenshot refs: `context/changes/portfolio-redesign/refs/`
- PRD: `specs/thedariusz-landing-page-prd.md`
- Existing animation wrapper: `src/components/FadeInSection.tsx:10`
- Token block: `src/index.css:49-82`

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: Design Tokens & Effect Cleanup

#### Automated

- [x] 1.1 No rejected utility remains (grep returns nothing) — ac37afd
- [x] 1.2 Lint passes — ac37afd
- [x] 1.3 Type checking passes — ac37afd
- [x] 1.4 Unit tests pass — ac37afd
- [x] 1.5 Build passes — ac37afd
- [x] 1.6 E2E tests pass — ac37afd

#### Manual

- [x] 1.7 Page canvas is charcoal everywhere; no navy bands remain — ac37afd
- [x] 1.8 Red appears only on primary CTA backgrounds and focus rings — ac37afd
- [x] 1.9 CV dropdown, toast and contact inputs look correct on the new palette — ac37afd

### Phase 2: Header & Hero Editorial Layout

#### Automated

- [x] 2.1 Lint passes
- [x] 2.2 Type checking passes
- [x] 2.3 Unit tests pass
- [x] 2.4 E2E tests pass

#### Manual

- [x] 2.5 Hero matches the prototype at 375/768/1440px, with no horizontal scroll from the glow
- [x] 2.6 Exactly one subtle red glow; no photo ring and no bounce animation
- [x] 2.7 Header shows the GitHub/LinkedIn/X icons and the EN/PL CV dropdown; blur on scroll without a shadow
- [x] 2.8 With Reduce motion on, the hero text appears without sliding

### Phase 3: Portfolio ("Projects") Section

#### Automated

- [ ] 3.1 Assets exist and are each under 150 KB
- [ ] 3.2 Lint passes
- [ ] 3.3 Type checking passes
- [ ] 3.4 Unit tests pass, including portfolio data and section assertions
- [ ] 3.5 Build passes
- [ ] 3.6 E2E tests pass, including Projects nav and project links

#### Manual

- [ ] 3.7 Desktop rows alternate sides; indices read 01/03–03/03
- [ ] 3.8 Rows fade up on scroll; screenshot zoom and arrow nudge on hover
- [ ] 3.9 Mobile shows the screenshot first in every row, with no horizontal scroll
- [ ] 3.10 Screenshot and text link open the live app in a new tab
- [ ] 3.11 One focus stop per project with a visible focus ring
- [ ] 3.12 Screenshots load lazily

### Phase 4: Remaining Sections & Docs

#### Automated

- [ ] 4.1 Lint passes
- [ ] 4.2 Type checking passes
- [ ] 4.3 Unit tests pass
- [ ] 4.4 Build passes
- [ ] 4.5 E2E tests pass

#### Manual

- [ ] 4.6 All sections share the same spacing rhythm and heading style
- [ ] 4.7 Lighthouse 90+ in all categories on the production build
- [ ] 4.8 Contact form submit, error and success toasts still work
- [ ] 4.9 PRD and CLAUDE.md match the shipped page
