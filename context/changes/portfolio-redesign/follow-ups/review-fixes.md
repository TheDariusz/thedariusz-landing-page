# Review follow-ups: portfolio-redesign

Queued from `reviews/impl-review.md` triage (2026-10-22).

## F2 — Mobile Lighthouse Performance below 90

- **Evidence**: `npx lighthouse@12` (default mobile emulation) against `npm run preview`:
  - branch: Performance 82, FCP 3.4s, LCP 3.7s (LCP element: hero `h1`), TBT 0ms, CLS 0
  - main: Performance 87, FCP 2.1s, LCP 3.8s
  - desktop on the branch: 98
- **Opportunities reported**: unused JavaScript (~93 KiB), responsive images (~108 KiB savings).
- **Next step**: find why FCP got 1.3s slower. Suspects to check: the hero now animates every text line from `opacity: 0` with nothing contentful painted before JS runs, and the Google Fonts `@import` chain in `src/index.css`. Then aim for 90+ on mobile (main was already below 90, so this may need bundle splitting too).
- **Done when**: plan Progress 4.7 can be re-ticked with mobile Performance ≥ 90.
