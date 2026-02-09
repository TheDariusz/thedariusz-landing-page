# Lovable.dev Prompt — Personal Landing Page (v2 — visual improvements)

> Copy everything below this line and paste into Lovable.dev

---

Create a modern, professional one-page personal landing page for a software engineer. The design should be dark-themed, minimal, and clean — inspired by developer portfolios like brittanychiang.com and leerob.io. The page should feel visually rich and polished, NOT sparse — use visual variety, background variation, icons, and layout techniques to make each section feel distinct and engaging.

## Brand Identity
The brand is "dev ■ TheDariusz" — the logo uses "dev" in light gray, a small red square accent (■), and "TheDariusz" in bold black. The overall aesthetic from the business card is: high contrast, clean typography, spaced uppercase subtitles, and a red accent color as the signature brand element.

## Tech & Style Requirements
- Use React with TypeScript and Tailwind CSS
- Dark theme with TWO alternating background shades to create visual rhythm between sections:
  - Primary sections: #0f172a (deep navy)
  - Alternate sections: #1e293b (slightly lighter slate)
- White/light gray text for headings, **red accent color** (#e11d48) for CTAs, hover states, highlights, and decorative elements
- Secondary/muted text in gray (#9ca3af)
- Typography: Inter font (or similar clean sans-serif), bold headings, light body text, spaced uppercase for subtitle elements (matching business card style)
- Fully responsive: mobile-first, looks great on 320px through 1440px+
- Smooth scroll navigation between sections
- Scroll-triggered fade-in animations on each section (staggered entrance for child elements)
- Gentle hover effects on all interactive elements (buttons, badges, cards, social icons)
- Semantic HTML with ARIA labels for accessibility

## Page Structure (top to bottom):

### 1. Header / Navbar (sticky, with backdrop blur)
- Logo placeholder on the left (I will upload "dev ■ TheDariusz" logo image later)
- Navigation links that smooth-scroll to sections: About, Skills, Contact
- Social icon links on the right: GitHub, LinkedIn, Twitter/X — use Lucide or similar icons with accessible aria-labels, open in new tabs
- A prominent "Download CV" button styled as an outline/ghost button with red accent border
- On scroll: header gets a subtle dark background + backdrop-blur effect
- Mobile: hamburger menu with smooth slide-in panel

### 2. Hero Section (background: #0f172a)
- Add a subtle background visual element: a faint radial gradient glow (red/purple tones, very low opacity ~5-10%) behind the avatar area, or a subtle dot grid pattern — something to prevent the large dark space from feeling empty
- Large, centered layout
- Circular professional photo placeholder (avatar, ~200px diameter, with a subtle red accent ring/border and a soft glow shadow)
- Small greeting text above the name: "Hello, I'm" in muted gray
- Full name in large heading: "Dariusz Szczepański"
- Tagline below the name in muted gray, spaced uppercase: "SOFTWARE ENGINEER | BACKEND & INTEGRATION SPECIALIST"
- Two CTA buttons side by side:
  - Primary (filled red accent): "Get in Touch" → scrolls to Contact section
  - Secondary (outline/ghost with red border): "Download CV" → links to a PDF file (use "#" as placeholder href)
- Below the buttons: a subtle animated scroll-down indicator (chevron or mouse icon)

### 3. Highlight Stats Bar (background: #1e293b — a narrow horizontal band)
- A compact row of 3-4 key stats/numbers displayed as highlight cards in a horizontal flex row, centered
- Each stat has a large number/value in white + a small label below in muted gray
- Example stats:
  - "4+" / "Years Experience"
  - "10+" / "Enterprise Projects"
  - "Java & Spring Boot" / "Core Expertise"
  - "AI-Driven" / "Development Approach"
- Subtle red accent on the numbers or a thin red top border on each stat card
- This section acts as a visual trust anchor between Hero and About

### 4. About Section (background: #0f172a)
- Section heading: "About Me" with a small red accent line/underline decoration below it
- Two subsections:
  - **Professional Background** — 2-3 paragraphs of placeholder text about Java/Spring Boot experience (4 years), backend development, API integrations, and enterprise systems. Business analytic, acting as a bridge between business requirements and technical implementation capabilities. Very strong analytical skills, very high level of understanding of business processes, active AI user with Spec-driven development skills, AI is a tool for achieving business goals faster, more effective and using less resources, but still under my full control, with proper tests and validations.
  - **Beyond Work** — 1 short paragraph of placeholder text about personal interests (technology, automation, astronomy, physics, continuous learning, fitness). Visually lighter/smaller than the professional section, in muted gray. Preceded by a thin horizontal divider line and a small subheading "Beyond Work" in spaced uppercase.

### 5. Skills / Technologies Section (background: #1e293b)
- Section heading: "Skills & Technologies" with a small red accent line/underline decoration
- Display as categorized groups, each inside a subtle card/panel with a slightly different background (#111827) and a thin border, giving depth
- Each category card has:
  - A small Lucide icon on the left matching the category (e.g., Server for Backend, Database for Data, BarChart for Analytics, GitBranch for DevOps, TestTube for Testing, Briefcase for Management)
  - Category heading next to the icon
  - A row of rounded pill badges below
- Use these exact categories and technologies:

**Backend:** Java, Spring Boot, REST APIs, SOAP, Apache Camel
**Data & ORM:** MySQL, MariaDB, PostgreSQL, Hibernate, JPA, JOOQ
**Data Analysis & Reporting:** SQL, Python, PowerBI, Dashboards, KPI Monitoring
**DevOps & Tools:** Docker, Git, GitHub Actions, Maven, JIRA, Confluence, JetBrains, Keycloak
**Testing:** JUnit 5, Mockito, AssertJ
**Management & Business:** Agile, SAFe, Scrum, Business Analysis, UML

- Badge styling: semi-transparent dark background with subtle red accent border, slight red glow on hover
- Layout: 2-column grid on desktop (3 cards per column), stacking to single column on mobile

### 6. Contact Section (background: #0f172a)
- Section heading: "Get in Touch" with red accent underline decoration
- **Two-column layout on desktop** (stacks on mobile):
  - **Left column:** Encouraging text + direct contact details
    - Heading: "Let's Work Together"
    - Subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you."
    - Direct contact items with Lucide icons:
      - Mail icon + thedariusz@gmail.com (clickable mailto link)
      - MapPin icon + Warsaw, Poland
    - Social icons row: GitHub, LinkedIn, Twitter/X (larger size than header, with labels)
  - **Right column:** The contact form
    - Name (text input, required)
    - Email (email input, required, basic validation)
    - Message (textarea, required)
    - Submit button: "Send Message" (filled red accent button, full width)
- The form should have basic client-side validation (required fields, email format)
- On submit, for now just show a success toast/notification (we'll connect to a backend webhook later)

### 7. Footer (background: #020617 — darkest shade)
- **Business Information** subsection with a subtle heading "Business Info" or a small briefcase icon:
  - Business name: "TheDariusz Dariusz Szczepański"
  - NIP: PL9521789822
  - Business address: Ignacego Paderewskiego 144B/104, 04-438 Warsaw, Poland
  - Email: thedariusz@gmail.com
  - Phone: +48 512 241 841 (displayed as plain text, NOT a clickable tel: link)
- Repeated social icons: GitHub, LinkedIn, Twitter/X (same style as header)
- Copyright line: "© 2025 TheDariusz Dariusz Szczepański. All rights reserved."
- Keep it clean and compact — business info in a subtle, smaller font size
- Thin red accent line at the very top of the footer as a separator

## Additional Requirements
- All content should be stored in a separate data/constants file (e.g., `content.ts` or `siteData.ts`) — NOT hardcoded in components. This is important for future i18n support.
- Use placeholder URLs for social links (https://github.com, https://linkedin.com, https://x.com)
- Use placeholder for the CV download link (href="#")
- Add meta tags: title "Dariusz Szczepański — Software Engineer", description, and Open Graph tags
- Ensure the page scores well on Lighthouse (semantic HTML, alt texts, contrast ratios)
- Scroll-to-top button that appears after scrolling down (red accent, circular, bottom-right corner)
- All section headings should use consistent styling: large bold text + small red accent underline/bar below
