<!-- IMPL-REVIEW-REPORT -->
# Implementation Review: Portfolio Redesign Implementation Plan

- **Plan**: context/changes/portfolio-redesign/plan.md
- **Scope**: All phases (1–4 of 4)
- **Date**: 2026-10-22
- **Verdict**: APPROVED
- **Findings**: 0 critical, 2 warnings, 4 observations

## Verdicts

| Dimension | Verdict |
|-----------|---------|
| Plan Adherence | PASS |
| Scope Discipline | WARNING |
| Safety & Quality | WARNING |
| Architecture | PASS |
| Pattern Consistency | WARNING |
| Success Criteria | WARNING |

## Automated checks (run 2026-10-22)

| Check | Result |
|---|---|
| Rejected-utility grep over `src` | PASS (no matches) |
| `ls -l src/assets/projects/*.webp` | PASS (39–42 KB each) |
| `npm run lint` | PASS (0 errors; 1 pre-existing warning in `ui/button.tsx`) |
| `npm run typecheck` | PASS |
| `npm run test` | PASS (17/17) |
| `npm run build` | PASS (pre-existing >500 KB JS chunk warning) |
| `npm run test:e2e` | PASS (37 passed, 7 skipped) |

## Findings

### F1 — Form error text just below AA contrast on the new card surface

- **Severity**: ⚠️ WARNING
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Safety & Quality
- **Location**: src/components/ContactSection.tsx:116, 129, 142 (token at src/index.css:67)
- **Detail**: The form now sits on `bg-card` (`#1c1c21`). Error messages are `text-sm text-destructive` (`#ef4444`, `0 84% 60%`), which gives about 4.49:1, just under the 4.5:1 AA minimum for small text. Lighthouse's accessibility audit will flag it while an error is shown. It is still better than main (red on navy).
- **Fix**: Raise `--destructive` lightness from 60% to about 63% in `src/index.css` (the shared token also re-themes the destructive toast, which uses it as a background with white text; re-check that).
- **Decision**: FIXED — `--destructive` 0 84% 60% → 0 84% 63% (~4.85:1 on card)

### F2 — Lighthouse 90+ ticked without recorded evidence

- **Severity**: ⚠️ WARNING
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Success Criteria
- **Location**: context/changes/portfolio-redesign/plan.md:502 (Progress 4.7)
- **Detail**: Every manual item is ticked with a commit sha. Most are visible in the diff, but 4.7 (Lighthouse 90+ in all four categories on the production build) leaves no trace: no scores are recorded. F1 suggests Accessibility might not hold at 100 with errors visible, and the build still emits a 548 KB JS chunk. The criterion may well pass; it just isn't evidenced.
- **Fix**: Run Lighthouse on `npm run build && npm run preview` (mobile + desktop) and append the four scores next to 4.7.
- **Decision**: FIXED (evidence recorded) — Lighthouse run: desktop 98/100/100/100, mobile 82/100/100/100. Mobile Perf fails 90 (main 87; FCP 2.1s → 3.4s). 4.7 unticked in plan.md; follow-up queued in follow-ups/review-fixes.md

### F3 — Tooling files and one content removal ride along with the feature

- **Severity**: 💡 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Scope Discipline
- **Location**: .gitignore:43–112, .10x-cli.json, context/{archive,changes,foundation}/README.md, src/data/siteData.ts (`contact.subheading`)
- **Detail**: Not in the plan: (a) 10x-CLI scaffolding: `.gitignore` lists each vendored `.claude/skills/10x-*` file one by one, `.10x-cli.json`, and context READMEs. All benign: `.env*` is still ignored and `.claude/launch.json` stays tracked. (b) `contact.subheading` ("Let's Work Together") was deleted from siteData because the new Contact layout no longer renders it. Nothing references it.
- **Fix**: Accept as-is (note it in the PR description). Optionally replace the per-file `.gitignore` list with directory globs (e.g. `.claude/skills/10x-*/`) so future CLI syncs don't show up as untracked files.
- **Decision**: FIXED — 69 per-file `.gitignore` entries collapsed into 4 directory globs (ignored set verified unchanged); scaffolding and `contact.subheading` removal accepted

### F4 — Screenshots are 16:9 but shown in a 16:10 box

- **Severity**: 💡 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Safety & Quality
- **Location**: src/components/PortfolioSection.tsx:41
- **Detail**: The assets are 1600×900 (16:9) and the `width`/`height` attributes say so, but the class is `aspect-[16/10] object-cover object-top`. A 16:10 box is taller than 16:9, so `object-cover` scales the image up and trims about 5% off each side. That is the planned value (plan line 283), so it is a plan slip, not drift. There is no layout shift: the CSS aspect-ratio wins.
- **Fix**: Change `aspect-[16/10]` to `aspect-video` so the whole capture shows. If you later swap in 16:10 screenshots, change it back along with `width`/`height`.
- **Decision**: FIXED — `aspect-[16/10]` → `aspect-video`

### F5 — Input outlines nearly invisible on the card

- **Severity**: 💡 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Safety & Quality
- **Location**: src/components/ContactSection.tsx:113, 126, 139
- **Detail**: Inputs use `bg-background border-border` inside a `bg-card` form. The border (`#2a2a2f`) is about 1.2:1 against the card, below the 3:1 non-text contrast guideline for form controls. The field boundary is mostly carried by the slightly darker fill. Main had a similar weakness on navy, so this is not a regression. (Also pre-existing: errors have no `aria-invalid`/`aria-describedby`.)
- **Fix**: Use a lighter border on the inputs only, e.g. `border-subtle/40`, in ContactSection.
- **Decision**: FIXED (adjusted) — inputs use `border-subtle/70` (~3:1 on card); the proposed `/40` would only reach ~1.9:1. `aria-invalid`/`aria-describedby` gap left as-is (pre-existing)

### F6 — CLAUDE.md red-usage rule contradicts the logo dot

- **Severity**: 💡 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Pattern Consistency
- **Location**: CLAUDE.md:33, src/components/Header.tsx:34
- **Detail**: The updated CLAUDE.md says red is "used only for primary CTAs, focus rings and the single hero glow", but the header logo keeps a 7px `bg-primary` dot (pre-existing, brand mark). A future session following CLAUDE.md literally could "fix" the logo.
- **Fix**: Add "and the logo dot" to the CLAUDE.md Styling sentence.
- **Decision**: FIXED — CLAUDE.md Styling bullet now lists the header logo dot

## Triage summary (2026-10-22)

| Outcome | Findings |
|---|---|
| Fixed | F1, F3, F4, F5 (adjusted to `/70`), F6 |
| Evidence recorded, criterion failed → follow-up | F2 (mobile Lighthouse Performance 82; Progress 4.7 unticked; see `follow-ups/review-fixes.md`) |

After fixes: lint (0 errors), typecheck, unit 17/17, build, and e2e `content-and-layout` + `contact-form` (26 passed, 2 skipped) all pass. F1/F4/F5 confirmed in the browser on the preview build (computed styles + screenshot). Fixes are uncommitted.

## Notes (no action)

- Reduced-motion: the plan's `motion-reduce:transform-none` would not cancel Tailwind 4 `scale`/`translate`; the implementation uses `motion-safe:` gating instead and documents why in CLAUDE.md. It's a deliberate improvement over the plan.
- StatsBar and Footer don't get the eyebrow + h2 + `py-24…` treatment that Phase 4 says "every section" gets; they match the prototype, which is the visual source of truth.
- Contact submit logic (zod validation, `!response.ok` throw, toasts, reset, `isSubmitting`) is unchanged from main. Every `target="_blank"` has `rel="noopener noreferrer"`. Nothing under `src/components/ui/` was edited.
- Not verified in this review: visual check at 375/768/1440 and keyboard tab-through (static review plus e2e only).
