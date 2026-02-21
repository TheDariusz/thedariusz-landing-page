# thedariusz.dev

Personal landing page for Dariusz — software engineer portfolio site.

**Live:** [thedariusz.dev](https://thedariusz.dev)

## Tech Stack

- React 19, TypeScript 5.9, Vite 7
- Tailwind CSS 4, shadcn/ui
- Motion v12 (animations)
- Zod 4 (form validation)
- Vitest 4 + Testing Library

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev          # Dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run tests
```

## Project Structure

```
src/
├── components/      # Page sections and shared components
│   └── ui/          # shadcn/ui primitives (don't edit manually)
├── data/
│   └── siteData.ts  # All site content lives here
├── hooks/           # Custom React hooks
├── lib/             # Utilities
└── test/            # Test setup
public/              # Static assets (OG image, CV files, robots.txt, sitemap.xml)
```

All site copy, skills, stats, and links are centralized in `src/data/siteData.ts` — edit content there, not in components.

## Contact Form

Form submissions are sent to an **n8n** workflow (self-hosted on Hetzner), which persists the data into a **Supabase** database.

## Deployment

Hosted on **Cloudflare Pages** with automatic deploys:

- Push to `main` → production build and deploy
- Push to other branches → preview deployment

### Domains

| Domain | Behavior |
|---|---|
| [thedariusz.dev](https://thedariusz.dev) | Primary domain |
| thedariusz.com | 301 redirect → thedariusz.dev |
| thedariusz.pl | 301 redirect → thedariusz.dev |

All DNS managed on Cloudflare.
