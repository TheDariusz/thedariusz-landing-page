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
- Clean sans-serif font pairing (e.g., Inter or similar)
- High contrast between heading weights (bold) and body text (regular/light)
- Spaced-out uppercase lettering for subtitle elements (matching business card style)

---

## 3. Phased Roadmap

### Phase 0 — Lovable.dev Prototype (MVP)
- **Goal:** Disposable design exploration, validate layout and content
- **Timeline:** 1-2 focused sessions (~1 week soft deadline)
- **Deliverable:** Working one-page landing page deployed via Lovable.dev

### Phase 1 — Astro + React + Tailwind Rebuild
- **Goal:** Production-quality site, clean codebase, performance-optimized
- **Stack:** Astro, React, Tailwind CSS, TypeScript
- **Additions:** Portfolio section, dark/light theme toggle, i18n support

### Phase 2 — Blog & Interactivity
- **Goal:** Content platform for developer audience
- **Stack addition:** Supabase (user interactions, form storage)
- **Additions:** Blog at `yourdomain.com/blog` (Astro content collections), comments, newsletter

---

## 4. MVP Scope (Phase 0) — Detailed Specification

### 4.1 Page Structure & Sections (Top to Bottom)

#### Header / Navigation
- "dev ■ TheDariusz" logo on the left (image — user will upload)
- Navigation links (anchor scroll): About, Skills, Contact
- Social icons: GitHub, LinkedIn, Twitter/X (with accessible labels)
- CV Download button (prominent, outline/ghost style)
- Mobile: hamburger menu

#### Hero Section
- Professional headshot (circular avatar, ~200px diameter, with subtle red accent ring)
- Full name: "Dariusz Szczepański"
- Tagline: "Software Engineer | Backend & Integration Specialist"
- Primary CTA button (filled, red accent): "Get in Touch" (scrolls to Contact)
- Secondary CTA (outline): "Download CV" (PDF download)

#### About Section
- **Professional Background** — concise summary of experience, specialization, and value proposition (2-3 paragraphs)
- **Beyond Work** — short, personality-driven subsection about personal interests/hobbies (1 short paragraph, visually lighter)

#### Skills / Technologies Section
Displayed as categorized tag/badge groups (NO proficiency bars):

| Category | Technologies |
|---|---|
| **Backend** | Java 8-24, Spring Boot 3, REST/SOAP APIs, Apache Camel |
| **Data & ORM** | MySQL/MariaDB/PostgreSQL, Hibernate/JPA/JOOQ |
| **Data Analysis & Reporting** | SQL, Python, PowerBI, Dashboards, KPI Monitoring |
| **DevOps & Tools** | Docker, Git/GitHub/GitHub Actions, Maven, JIRA, Confluence, JetBrains, Keycloak |
| **Testing** | JUnit 5, Mockito, AssertJ |
| **Management & Business** | Project Management (Agile/SAFe/Scrum), Business Analysis, UML Process Mapping |

#### Contact Section
- **Contact form** (lightweight): Name, Email, Message fields
  - Submission via n8n webhook (Hetzner server) → email notification
  - Basic client-side validation
  - Success toast/notification on submit
- **Mailto link** as fallback: thedariusz@gmail.com
- Brief encouragement text (e.g., "Let's work together")

#### Footer
- **Business Information** subsection:
  - Business name: TheDariusz Dariusz Szczepański
  - NIP: [to be provided]
  - Business address: [to be provided]
  - Email: thedariusz@gmail.com
  - Phone: +48 512 241 841 (displayed as text, NOT a clickable `tel:` link to reduce spam)
- Social icons (GitHub, LinkedIn, Twitter/X) — repeated from header
- Copyright: "© 2025 TheDariusz Dariusz Szczepański. All rights reserved."

### 4.2 Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Theme** | Single dark theme (MVP); toggle added in Phase 1 |
| **Responsive** | Mobile-first, fully responsive (mobile, tablet, desktop) |
| **Performance** | Lighthouse score target: 90+ across all categories |
| **SEO** | Meta title, description, OG image (using logo), structured data |
| **Accessibility** | Semantic HTML, ARIA labels on icons, keyboard navigation |
| **Language** | English (MVP); i18n-ready structure (`content/en.ts` data file) |
| **Analytics** | Umami (self-hosted on Hetzner) — cookie-free, GDPR-compliant |

### 4.3 Assets Required
- [x] Custom logo — "dev ■ TheDariusz" (available)
- [ ] Professional headshot (400×400px minimum, circular crop)
- [x] CV as PDF file (available)
- [ ] Tagline / professional description text
- [ ] About Me content (professional + personal)
- [ ] Social media URLs
- [ ] NIP number
- [ ] Business address

---

## 5. Hosting & Domain Strategy

### MVP (Phase 0 — Lovable.dev)
- Hosted on Lovable.dev default URL

### Phase 1+ (Astro Rebuild)
- **Static site hosting:** Cloudflare Pages or Netlify (free tier, global CDN, auto HTTPS, CI/CD from Git)
- **Backend services (n8n, Umami):** Hetzner VPS (existing)
- **Domains:**
  - `.com` domain → primary (English), redirect from `.pl`
  - `.pl` domain → redirect to `.com` (MVP); Polish content in Phase 1+ (i18n)
  - Both domains configured with SSL/HTTPS

---

## 6. Contact Form Architecture (MVP)

```
[User fills form] → [Client-side validation] → [POST to n8n webhook on Hetzner]
                                                        ↓
                                               [n8n workflow]
                                                   ├── Send email notification to user
                                                   ├── (Optional) Store in Google Sheets / JSON
                                                   └── (Phase 2) Store in Supabase
```

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
- **Typography:** Clean sans-serif (Inter), bold headings, light body, spaced uppercase for subtitles (matching business card aesthetic)
- **Inspiration:** brittanychiang.com, leerob.io as benchmarks
- **Logo:** "dev ■ TheDariusz" integrated into header/nav, used as OG image / favicon base

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Lovable.dev prototype becomes a perfectionism trap | Treat as disposable; hard 1-week cap |
| Content not ready (About Me, tagline) | Draft placeholder content; iterate post-launch |
| n8n webhook downtime affects contact form | Add mailto fallback link; n8n monitoring |
| Missing portfolio weakens hiring manager impression | Strong skills section + CV download compensate; portfolio added in Phase 1 |
| Public phone number attracts spam | Display as text only (no `tel:` link); consider business VoIP number |

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

---

## 11. Verification / Definition of Done (MVP)

- [ ] Page loads and renders correctly on mobile, tablet, and desktop
- [ ] All sections present: Header, Hero, About, Skills, Contact, Footer (with business info)
- [ ] Logo "dev ■ TheDariusz" displayed in header
- [ ] Photo displayed as circular avatar in hero
- [ ] CV PDF downloads correctly
- [ ] Social links open correct profiles in new tabs
- [ ] Contact form submits successfully via n8n webhook
- [ ] Email notification received on form submission
- [ ] Mailto fallback link works
- [ ] Business information displayed in footer (business name, NIP, address, email, phone)
- [ ] Basic SEO meta tags and OG image present
- [ ] Page achieves 90+ Lighthouse scores
- [ ] Responsive across breakpoints (320px, 768px, 1024px, 1440px)
