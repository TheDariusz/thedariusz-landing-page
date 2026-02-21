# Deployment Plan: thedariusz.dev

## Overview

Deploy the landing page as a static site on **Cloudflare Pages**, with three domains:
- **thedariusz.dev** — primary domain (DNS on Cloudflare) ✅
- **thedariusz.com** — redirect to thedariusz.dev (DNS on Cloudflare) ✅
- **thedariusz.pl** — redirect to thedariusz.dev (DNS on Cloudflare) ✅

## Current State

- ✅ Code on GitHub: `TheDariusz/thedariusz-landing-page` (branch: `main`)
- ✅ Production build works: `npm run build` → outputs to `dist/`
- ✅ n8n webhook is already live at `n8n.thedariusz.com` (subdomain on Cloudflare — stays unchanged)
- ✅ OG image created (`public/og-image.png`, 1200×630px, domain-agnostic)
- ✅ Cloudflare Pages project created and connected to GitHub
- ✅ `thedariusz.dev` is the primary custom domain on Pages, serving the site
- ✅ `www.thedariusz.dev` → apex redirect rule deployed
- ✅ `thedariusz.com` + `www` → 301 redirect to `thedariusz.dev` (dummy AAAA `100::` records)
- ✅ `thedariusz.pl` + `www` → 301 redirect to `thedariusz.dev`
- ✅ OG meta tags, canonical URL, robots.txt, sitemap.xml all reference `thedariusz.dev`
- ✅ All three domains on Cloudflare DNS
- ✅ `www.thedariusz.com` — DNS propagated, 301 redirect working
- ⚠️ Build output has a 544 KB JS chunk (works fine, optimization can come later)

---

## Step 1: Pre-deployment fixes ✅ Done

### 1a. ✅ Create OG image
Done. Created `public/og-image.png` (1200×630px) — branded image with profile photo, dev.TheDariusz logo, name, and "Software Engineer" tagline on dark background. Domain-agnostic (no URL) so it works across all three domains.

### 1b. ✅ Update OG meta tags with full URL
Done (originally set to thedariusz.com — will be updated to .dev in Step 8).

### 1c. ✅ Add canonical URL
Done (originally set to thedariusz.com — will be updated to .dev in Step 8).

### 1d. ✅ Update robots.txt
Done (sitemap URL will be updated to .dev in Step 8).

### 1e. ✅ Add sitemap.xml
Done. Created `public/sitemap.xml` with `lastmod: 2026-02-15` (URL will be updated to .dev in Step 8).

---

## Step 2: Create Cloudflare Pages project ✅ Done

### 2a. Connect GitHub repo to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** (left sidebar)
3. Click **Create** → **Pages** → **Connect to Git**
4. Select your GitHub account and the `thedariusz-landing-page` repository
5. Configure build settings:

| Setting | Value |
|---|---|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | (set env variable, see below) |

6. Add environment variable:
   - **Variable name:** `NODE_VERSION`
   - **Value:** `22`

   _(Cloudflare Pages uses Node 18 by default. Your project needs a modern Node version for Vite 7.)_

7. Click **Save and Deploy**

### 2b. Verify the deployment

- Visit the `.pages.dev` URL
- Check all sections render
- Test the contact form (submits to n8n webhook)
- Test CV download (both EN/PL)
- Test social links
- Check mobile responsiveness

---

## Step 3: Configure thedariusz.com ✅ Done (will become redirect domain)

thedariusz.com was initially set up as the primary custom domain. Once thedariusz.dev is ready, it will be reconfigured as a redirect domain (see Step 9).

### 3a. ✅ Custom domain added to Cloudflare Pages
### 3b. ✅ DNS records configured
### 3c. ✅ SSL/HTTPS configured
### 3d. ✅ www → apex redirect set up

> These will be modified in Step 9 when switching the primary domain to thedariusz.dev.

---

## Step 4: Configure thedariusz.pl (redirect) ✅ Done

### 4a. ✅ Added thedariusz.pl as a site in Cloudflare (free plan)
### 4b. ✅ Updated nameservers at cyber_folks (propagation complete)
### 4c. ✅ Redirect rule deployed (updated to → .dev in Step 10)

---

## Step 5: Configure thedariusz.dev as primary domain ✅ Done

The `.dev` TLD **requires HTTPS** (it's HSTS-preloaded). Cloudflare handles this automatically.

### 5a. ✅ Added thedariusz.dev as a site in Cloudflare (free plan)
### 5b. ✅ Updated nameservers at cyber_folks (`sloan.ns.cloudflare.com`, `darwin.ns.cloudflare.com`)
### 5c. ✅ Domain active on Cloudflare

---

## Step 6: Add thedariusz.dev as custom domain on Pages ✅ Done

### 6a. ✅ Added `thedariusz.dev` and `www.thedariusz.dev` as custom domains on Pages
### 6b. ✅ DNS records configured (CNAME → `thedariusz-landing-page.pages.dev`)
### 6c. ✅ SSL/HTTPS configured
### 6d. ✅ www → apex redirect deployed (wildcard pattern: `https://www.thedariusz.dev/*` → `https://thedariusz.dev/${1}`)

---

## Step 7: Verify thedariusz.dev serves the site ✅ Done

- [x] `https://thedariusz.dev` loads the site correctly
- [x] `https://www.thedariusz.dev` → redirects to `https://thedariusz.dev`
- [x] All sections render properly (manual check)
- [x] Contact form works (manual check)
- [x] CV downloads work (manual check)

---

## Step 8: Update codebase URLs to thedariusz.dev ✅ Done

Updated all references from `thedariusz.com` to `thedariusz.dev`:
- ✅ `index.html` — canonical, og:url, og:image, twitter:image (4 changes)
- ✅ `public/robots.txt` — sitemap URL
- ✅ `public/sitemap.xml` — loc URL
- ✅ Committed and pushed to `main` → Cloudflare auto-deployed

> `n8n.thedariusz.com` webhook URL in `src/data/siteData.ts` unchanged — backend service on its own subdomain.

---

## Step 9: Reconfigure thedariusz.com as redirect domain ✅ Done

### 9a. ✅ Removed `thedariusz.com` and `www.thedariusz.com` from Pages custom domains
### 9b. ✅ Removed old www → apex redirect rule
### 9c. ✅ Redirect rule deployed: `thedariusz.com to .dev`
- Custom filter: `(http.host eq "thedariusz.com") or (http.host eq "www.thedariusz.com")`
- Dynamic redirect → `concat("https://thedariusz.dev", http.request.uri.path)`
- 301 permanent, preserve query string

### 9d. ✅ Dummy AAAA `100::` record added for apex (auto-created during rule deployment)
### 9e. ✅ AAAA `100::` record for `www` — DNS propagated

> `n8n.thedariusz.com` unaffected — redirect rule only matches exact hostnames.

---

## Step 10: Update thedariusz.pl redirect to point to .dev ✅ Done

Updated existing redirect rule from `.com` to `.dev`:
- **Rule name:** `thedariusz.pl to .dev`
- Covers both `thedariusz.pl` and `www.thedariusz.pl`
- 301 redirect to `https://thedariusz.dev`

---

## Step 11: Post-deployment verification

### Functional checks
- [x] `https://thedariusz.dev` — site loads correctly (HTTP 200)
- [x] `https://www.thedariusz.dev` → 301 to `https://thedariusz.dev`
- [x] `https://thedariusz.com` → 301 to `https://thedariusz.dev`
- [x] `https://www.thedariusz.com` → 301 to `https://thedariusz.dev` ✅ DNS propagated
- [x] `http://thedariusz.com` → 301 to `https://thedariusz.dev`
- [x] `https://thedariusz.pl` → 301 to `https://thedariusz.dev`
- [x] `https://www.thedariusz.pl` → 301 to `https://thedariusz.dev`
- [x] `https://n8n.thedariusz.com` — still works (HTTP 200)
- [x] Contact form submits successfully
- [x] CV downloads work (both EN and PL)
- [x] Social links open correct profiles
- [x] OG image shows up when sharing link — ✅ CTA added to image, title updated to 57 chars
- [x] Mobile responsive — checked on real phone

### Performance checks
- [x] Run [PageSpeed Insights](https://pagespeed.web.dev/) on `thedariusz.dev` (Feb 21, 2026)
  - Mobile: [results](https://pagespeed.web.dev/analysis/https-thedariusz-dev/brnrbz7nmg?form_factor=mobile)
  - Desktop: [results](https://pagespeed.web.dev/analysis/https-thedariusz-dev/brnrbz7nmg?form_factor=desktop)
- [x] Lighthouse scores:

  | Category | Mobile | Desktop |
  |---|---|---|
  | Performance | ⚠️ 84 (was 70) | ✅ 96 |
  | Accessibility | ✅ 100 | ✅ 100 |
  | Best Practices | ✅ 100 | ✅ 100 |
  | SEO | ✅ 92 | ✅ 92 |

  Desktop hits 90+ on all categories. Mobile Performance improved 70→84 after WebP conversion and font fix.
  Remaining gap to 90+ is the 544 KB JS chunk — code splitting possible but diminishing returns for a single-page site.
  - ⚠️ SEO 92: Lighthouse flags robots.txt as invalid — caused by Cloudflare-managed `Content-Signal` directives, not an actual issue
- [x] Cloudflare is caching static assets — confirmed `cf-cache-status: REVALIDATED` on JS assets; HTML returns `DYNAMIC` (expected)

### SEO checks
- [x] Canonical URL resolves correctly (`https://thedariusz.dev`)
- [x] `robots.txt` accessible at `https://thedariusz.dev/robots.txt` — includes Cloudflare-managed AI bot blocks + custom `Allow: /` and sitemap reference
- [x] Sitemap accessible at `https://thedariusz.dev/sitemap.xml` — correct `<loc>` pointing to `https://thedariusz.dev`
- [x] No duplicate content issues — all domains (`.com`, `.pl`, `www.*`) 301 redirect to `.dev`
- [x] Google Search Console: `thedariusz.dev` indexed and appearing in search results

---

## Step 12: CI/CD (Automatic)

Once set up, Cloudflare Pages provides automatic CI/CD:
- **Every push to `main`** → triggers a new production build and deploy
- **Every push to other branches** → creates a preview deployment at a unique URL

No additional setup needed. This is built into Cloudflare Pages.

---

## Summary: Action Checklist

| # | Action | Where | Status |
|---|---|---|---|
| 1 | Pre-deployment fixes (OG image, meta, sitemap, robots) | Codebase | ✅ Done |
| 2 | Create Cloudflare Pages project, connect to GitHub | Cloudflare Dashboard | ✅ Done |
| 3 | Add `thedariusz.com` + `www` as custom domains | Cloudflare Pages | ✅ Done (later reconfigured as redirect) |
| 4 | Add `thedariusz.pl` to Cloudflare, redirect → `.dev` | Cloudflare + cyber_folks | ✅ Done |
| 5 | Add `thedariusz.dev` to Cloudflare, change nameservers | Cloudflare + cyber_folks | ✅ Done |
| 6 | Add `thedariusz.dev` + `www` as custom domains on Pages | Cloudflare Pages | ✅ Done |
| 7 | Verify `thedariusz.dev` serves the site | Browser | ✅ Done |
| 8 | Update codebase URLs to `.dev` (index.html, robots, sitemap) | Codebase + push | ✅ Done |
| 9 | Reconfigure `thedariusz.com` as redirect → `.dev` | Cloudflare | ✅ Done |
| 10 | Update `thedariusz.pl` redirect → `.dev` | Cloudflare Rules | ✅ Done |
| 11 | Run full verification checklist | Browser | ✅ Done (mobile perf 84, desktop 96+) |
| 12 | Submit `thedariusz.dev` to Google Search Console | Google Search Console | ✅ Done |

---

## Cost

| Service | Cost |
|---|---|
| Cloudflare Pages (hosting + CDN) | **Free** |
| Cloudflare DNS for thedariusz.com | **Free** (already set up) |
| Cloudflare DNS for thedariusz.pl | **Free** (already on Cloudflare) |
| Cloudflare DNS for thedariusz.dev | **Free** (adding site to Cloudflare) |
| Domain renewals | Existing cost at cyber_folks |
| **Total additional cost** | **$0** |
