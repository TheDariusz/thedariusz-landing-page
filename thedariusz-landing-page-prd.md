# PRD: Personal Landing Page / Portfolio Website

## 1. Product Overview

### Problem Statement
The user (a senior Java/Spring Boot software engineer) lacks a professional online presence that consolidates their identity, skills, contact information, and social links into a single, polished destination.

### Target Audiences (Priority Order)
1. **Hiring managers** evaluating technical skills and professional background
2. **Potential freelance clients** seeking development services
3. **Other developers** (Phase 2+, when blog content is available)

### Product Vision
A clean, modern, single-page personal landing page that professionally presents the user's skills, background, and contact options — designed to convert visitors into contacts/followers.

---

## 2. Brand Identity

### Brand Name & Logo
- **Brand:** "dev ■ TheDariusz" — stylized with "dev" in light gray, a red square accent (■), and "TheDariusz" in bold black
- **Full name:** Dariusz Szczepański
- **Business name:** TheDariusz Dariusz Szczepański
- **Title:** Software Engineer

### Color Palette (derived from business card)
- **Primary dark background:** Deep charcoal/dark gray (dark theme base)
- **Primary text:** White / light gray
- **Accent color:** Red (from the ■ square in the logo)
- **Secondary text:** Muted gray (as used for "dev" and contact info on the card)
- **Typography contrast:** Bold black for emphasis, light gray for supporting text

### Typography
- Clean sans-serif font pairing: Inter (sans) + JetBrains Mono (mono), loaded via Google Fonts
- High contrast between heading weights (bold) and body text (regular/light)
- Spaced-out uppercase lettering for subtitle elements (matching business card style)

---

## 3. Phased Roadmap

### Phase 0 — Lovable.dev Prototype (MVP) ✅ COMPLETE
- **Goal:** Disposable design exploration, validate layout and content
- **Deliverable:** Working one-page landing page, scaffolded via Lovable.dev, then iterated and hardened on the same Vite + React codebase
- **Actual stack:** React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4, shadcn/ui, motion v12, Zod 4
- **Status:** All MVP sections implemented and functional. Contact form wired to n8n webhook. Test suite added. Major dependency upgrades and code cleanup completed.

### Phase 1 — Astro + React + Tailwind Rebuild
- **Goal:** Production-quality site, clean codebase, performance-optimized, SSG for better SEO
- **Stack:** Astro, React (islands), Tailwind CSS, TypeScript
- **Additions:** Portfolio section, dark/light theme toggle, i18n support
- **Note:** Phase 0 codebase serves as a validated reference for layout, content, and component logic. The Astro rebuild will port these to an SSG architecture.

### Phase 2 — Blog & Interactivity
- **Goal:** Content platform for developer audience
- **Stack addition:** Supabase (user interactions, form storage)
- **Additions:** Blog at `yourdomain.com/blog` (Astro content collections), comments, newsletter

---

## 4. MVP Scope (Phase 0) — Detailed Specification

### 4.1 Page Structure & Sections (Top to Bottom)

#### Header / Navigation
- "dev ■ TheDariusz" logo on the left (image asset)
- Navigation links (anchor scroll): About, Skills, Contact
- Social icons: GitHub, LinkedIn, X (with accessible labels)
- CV Download button — dropdown with EN/PL PDF options
- Mobile: hamburger menu

#### Hero Section
- Professional headshot (circular avatar, ~200px diameter, with subtle red accent ring)
- Full name: "Dariusz Szczepański"
- Tagline: "Software Engineer | Backend & Integration Specialist"
- Primary CTA button (filled, red accent): "Get in Touch" (scrolls to Contact)
- Secondary CTA (outline): "Download CV" (opens EN/PL dropdown)

#### Stats Bar
- Horizontal bar of key metrics below the hero: Years Experience, Enterprise Projects, Core Expertise, Development Approach
- Provides at-a-glance credibility before the visitor reads the full About section

#### About Section
- **Professional Background** — concise summary of experience, specialization, and value proposition (3 paragraphs, including AI/spec-driven development approach)
- **Beyond Work** — short, personality-driven subsection about personal interests/hobbies (1 short paragraph, visually lighter)

#### Skills / Technologies Section
Displayed as categorized tag/badge groups (NO proficiency bars):

| Category | Technologies |
|---|---|
| **Backend** | Java, Spring Boot, REST APIs, SOAP, Apache Camel |
| **Data & ORM** | MySQL, MariaDB, PostgreSQL, Hibernate, JPA, JOOQ |
| **Data Analysis & Reporting** | SQL, Python, PowerBI, Dashboards, KPI Monitoring |
| **DevOps & Tools** | Docker, Git, GitHub Actions, Maven, JIRA, Confluence, JetBrains, OAuth2 |
| **Testing** | JUnit 5, Mockito, AssertJ |
| **Management & Business** | Agile, SAFe, Scrum, Business Analysis, UML |
| **AI** | Spec-Driven Development, RAG, Agentic Workflow, Claude Code, Prompt Engineering, n8n |

#### Contact Section
- **Contact form** (lightweight): Name, Email, Message fields
  - Client-side validation with Zod 4
  - Async submission via n8n webhook (Hetzner server) → email notification
  - Loading state during submission ("Sending...")
  - Success toast/notification on submit
- **Mailto link** as fallback: thedariusz@gmail.com
- Brief encouragement text: "Let's Work Together"

#### Footer
- **Business Information** subsection:
  - Business name: TheDariusz Dariusz Szczepański
  - NIP: PL9521789822
  - Business address: Ignacego Paderewskiego 144B/104, 04-438 Warsaw, Poland
  - Email: thedariusz@gmail.com
  - Phone: +48 512 241 841 (displayed as text, NOT a clickable `tel:` link to reduce spam)
- Social icons (GitHub, LinkedIn, X) — repeated from header
- Copyright: "© {current year} TheDariusz Dariusz Szczepański. All rights reserved." (dynamically generated)

### 4.2 Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Theme** | Single dark theme (MVP); toggle added in Phase 1 |
| **Responsive** | Mobile-first, fully responsive (mobile, tablet, desktop) |
| **Performance** | Lighthouse score target: 90+ across all categories |
| **SEO** | Meta title, description, OG image (using logo), Twitter card meta |
| **Accessibility** | Semantic HTML, ARIA labels on icons, keyboard navigation |
| **Language** | English (MVP); i18n-ready structure (`src/data/siteData.ts` data file) |
| **Analytics** | Umami (self-hosted on Hetzner) — cookie-free, GDPR-compliant (not yet integrated) |
| **Testing** | Vitest + @testing-library/react, jsdom environment |

### 4.3 Assets Required
- [x] Custom logo — "dev ■ TheDariusz"
- [x] Professional headshot (`src/assets/profile-photo.png`)
- [x] CV as PDF file (EN + PL versions in `public/`)
- [x] Tagline / professional description text
- [x] About Me content (professional + personal)
- [x] Social media URLs (GitHub, LinkedIn, X)
- [x] NIP number: PL9521789822
- [x] Business address: Ignacego Paderewskiego 144B/104, 04-438 Warsaw, Poland
- [ ] OG image (`/og-image.png` referenced in meta but may need updating)

---

## 5. Hosting & Domain Strategy

### MVP (Phase 0)
- Local development only (not yet deployed)

### Phase 1+ (Astro Rebuild)
- **Static site hosting:** Cloudflare Pages or Netlify (free tier, global CDN, auto HTTPS, CI/CD from Git)
- **Backend services (n8n, Umami):** Hetzner VPS (existing)
- **Domains:**
  - `.com` domain → primary (English), redirect from `.pl`
  - `.pl` domain → redirect to `.com` (MVP); Polish content in Phase 1+ (i18n)
  - Both domains configured with SSL/HTTPS

---

## 6. Contact Form Architecture

```
[User fills form] → [Zod 4 client-side validation] → [POST to n8n webhook on Hetzner]
                                                               ↓
                                                      [n8n workflow]
                                                          ├── Send email notification to user
                                                          ├── (Optional) Store in Google Sheets / JSON
                                                          └── (Phase 2) Store in Supabase
```

**Current webhook endpoint:** `https://n8n.thedariusz.com/webhook/972def4a-2294-400f-a8f4-72df7db8e442`

---

## 7. Success Metrics

| Metric | Tool | Target (first 3 months) |
|---|---|---|
| Monthly page views | Umami | Baseline establishment |
| Contact form submissions | n8n logs | ≥5/month |
| CV downloads | Umami event tracking | ≥10/month |
| Social link clicks | Umami outbound tracking | Track CTR |
| Lighthouse performance | Lighthouse | 90+ all categories |

---

## 8. Design Guidance

- **Style:** Modern, minimal, professional (dark theme)
- **Color palette:** Dark charcoal background, white/light gray text, **red accent** (from logo ■), muted gray for secondary text
- **Typography:** Clean sans-serif (Inter) + monospace (JetBrains Mono), bold headings, light body, spaced uppercase for subtitles (matching business card aesthetic)
- **Animations:** Motion v12 entrance animations, custom Tailwind keyframes (`fade-in-up`, `bounce-subtle`)
- **Inspiration:** brittanychiang.com, leerob.io as benchmarks
- **Logo:** "dev ■ TheDariusz" integrated into header/nav, used as OG image / favicon base

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| ~~Lovable.dev prototype becomes a perfectionism trap~~ | ~~Treat as disposable; hard 1-week cap~~ (Phase 0 complete) |
| ~~Content not ready (About Me, tagline)~~ | ~~Draft placeholder content; iterate post-launch~~ (content written) |
| n8n webhook downtime affects contact form | Mailto fallback link present; n8n monitoring recommended |
| Missing portfolio weakens hiring manager impression | Strong skills section + CV download compensate; portfolio planned for Phase 1 |
| Public phone number attracts spam | Displayed as text only (no `tel:` link); consider business VoIP number |
| Astro migration effort — rewriting working code | Phase 0 codebase serves as validated reference; port logic incrementally |

---

## 10. Out of Scope (MVP)

- Portfolio / project showcase section
- Blog
- Dark/light theme toggle
- Multi-language (i18n) content
- Supabase integration
- User authentication
- Newsletter signup
- Comments system
- Paid features / subscriptions
- Umami analytics integration (deferred to deployment)
- Structured data / JSON-LD

---

## 11. Verification / Definition of Done (MVP)

- [x] Page loads and renders correctly on mobile, tablet, and desktop
- [x] All sections present: Header, Hero, StatsBar, About, Skills, Contact, Footer (with business info)
- [x] Logo "dev ■ TheDariusz" displayed in header
- [x] Photo displayed as circular avatar in hero
- [x] CV PDF downloads correctly (EN + PL dropdown)
- [x] Social links open correct profiles in new tabs (GitHub, LinkedIn, X)
- [x] Contact form submits successfully via n8n webhook
- [ ] Email notification received on form submission (requires live testing)
- [x] Mailto fallback link works
- [x] Business information displayed in footer (business name, NIP, address, email, phone)
- [x] Basic SEO meta tags and OG image present
- [ ] Page achieves 90+ Lighthouse scores (requires deployment to test properly)
- [ ] Responsive across breakpoints (320px, 768px, 1024px, 1440px) (needs formal verification)
- [x] Client-side form validation with Zod 4
- [x] Test suite passing (Vitest + testing-library)

---

## 12. Current Tech Stack (Phase 0)

| Layer | Technology | Version |
|---|---|---|
| **Framework** | React | 19 |
| **Language** | TypeScript | 5.9 |
| **Bundler** | Vite | 7 |
| **Styling** | Tailwind CSS (CSS-first config) | 4 |
| **UI Components** | shadcn/ui + Radix primitives | — |
| **Animations** | motion (formerly framer-motion) | 12 |
| **Form Validation** | Zod | 4 |
| **Testing** | Vitest + @testing-library/react | Vitest 4 |
| **Linting** | ESLint 9 + typescript-eslint | — |
| **CSS Animations** | tw-animate-css | — |
| **Icons** | lucide-react | — |
