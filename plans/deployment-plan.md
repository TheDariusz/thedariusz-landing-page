# Deployment Plan: thedariusz.dev

## Overview

Deploy the landing page as a static site on **Cloudflare Pages**, with three domains:
- **thedariusz.dev** — primary domain (DNS on cyber_folks → moving to Cloudflare)
- **thedariusz.com** — redirect to thedariusz.dev (DNS already on Cloudflare)
- **thedariusz.pl** — redirect to thedariusz.dev (DNS on cyber_folks → moved to Cloudflare)

## Current State

- ✅ Code on GitHub: `TheDariusz/thedariusz-landing-page` (branch: `main`)
- ✅ Production build works: `npm run build` → outputs to `dist/`
- ✅ n8n webhook is already live at `n8n.thedariusz.com` (subdomain on Cloudflare — stays unchanged)
- ✅ OG image created (`public/og-image.png`, 1200×630px, domain-agnostic)
- ✅ Cloudflare Pages project created and connected to GitHub
- ✅ `thedariusz.com` + `www` added as custom domains on Pages
- ✅ `www.thedariusz.com` → apex redirect rule set up
- ✅ `thedariusz.pl` added to Cloudflare, nameservers changed at cyber_folks
- ✅ `thedariusz.pl` redirect rule deployed (→ .com, needs updating to → .dev)
- ⚠️ OG meta tags, canonical URL, robots.txt, sitemap.xml still reference thedariusz.com (needs updating to .dev)
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

## Step 4: Configure thedariusz.pl (redirect) ✅ Partially done

### 4a. ✅ Added thedariusz.pl as a site in Cloudflare (free plan)
### 4b. ✅ Updated nameservers at cyber_folks (propagation complete)
### 4c. ✅ Redirect rule deployed

Current redirect points to thedariusz.com — will be updated to thedariusz.dev in Step 10.

---

## Step 5: Configure thedariusz.dev as primary domain

The `.dev` TLD **requires HTTPS** (it's HSTS-preloaded). Cloudflare handles this automatically.

### 5a. Add thedariusz.dev as a site in Cloudflare

1. Cloudflare Dashboard → **Add a site** → enter `thedariusz.dev`
2. Select Free plan
3. Cloudflare will scan existing DNS records and assign nameservers

### 5b. Update nameservers at cyber_folks

1. Log in to cyber_folks panel
2. Find domain `thedariusz.dev` → DNS/Nameserver settings
3. Replace existing nameservers with the two Cloudflare provides
4. ⏳ Wait for nameserver propagation (1–24 hours)

### 5c. Verify domain is active on Cloudflare

Check the Cloudflare Dashboard — `thedariusz.dev` status should change from "Pending" to **"Active"**.

---

## Step 6: Add thedariusz.dev as custom domain on Pages

Once thedariusz.dev is active on Cloudflare:

### 6a. Add custom domain

1. In your Pages project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter: `thedariusz.dev`
4. Cloudflare will automatically add the DNS record (CNAME pointing to your Pages project)
5. Click **Activate domain**
6. Also add: `www.thedariusz.dev` (same process)

### 6b. Verify DNS records

In **Cloudflare Dashboard → thedariusz.dev → DNS → Records**, you should see:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `thedariusz.dev` | `thedariusz-landing-page.pages.dev` | Proxied ☁️ |
| CNAME | `www` | `thedariusz-landing-page.pages.dev` | Proxied ☁️ |

### 6c. SSL/HTTPS

In **SSL/TLS** settings for thedariusz.dev:
- **Encryption mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON

### 6d. Set up www → apex redirect

In **Cloudflare Dashboard → thedariusz.dev → Rules → Redirect Rules**:
- **Rule name:** `www to apex`
- **When:** Hostname equals `www.thedariusz.dev`
- **Then:** Dynamic redirect → `concat("https://thedariusz.dev", http.request.uri.path)`
- **Status code:** 301 (permanent)
- **Preserve query string:** ON

---

## Step 7: Verify thedariusz.dev serves the site

Before changing other domains, confirm:
- [ ] `https://thedariusz.dev` loads the site correctly
- [ ] `https://www.thedariusz.dev` → redirects to `https://thedariusz.dev`
- [ ] All sections render properly
- [ ] Contact form works
- [ ] CV downloads work

---

## Step 8: Update codebase URLs to thedariusz.dev

Update all references from `thedariusz.com` to `thedariusz.dev` in the codebase:

### Files to change:

**`index.html`** (4 changes):
- `<link rel="canonical" href="https://thedariusz.dev" />`
- `<meta property="og:url" content="https://thedariusz.dev" />`
- `<meta property="og:image" content="https://thedariusz.dev/og-image.png" />`
- `<meta name="twitter:image" content="https://thedariusz.dev/og-image.png" />`

**`public/robots.txt`** (1 change):
- `Sitemap: https://thedariusz.dev/sitemap.xml`

**`public/sitemap.xml`** (1 change):
- `<loc>https://thedariusz.dev</loc>`

> **Note:** `n8n.thedariusz.com` webhook URL in `src/data/siteData.ts` stays unchanged — it's a backend service on its own subdomain.

After making these changes:
1. Commit and push to `main`
2. Cloudflare Pages will automatically rebuild and deploy

---

## Step 9: Reconfigure thedariusz.com as redirect domain

Now that thedariusz.dev is the primary domain:

### 9a. Remove thedariusz.com as Pages custom domain

1. In your Pages project → **Custom domains** tab
2. Remove `thedariusz.com` and `www.thedariusz.com` as custom domains

### 9b. Remove old www → apex redirect rule

Delete the existing `www to apex` redirect rule for thedariusz.com (no longer needed as a Pages domain).

### 9c. Add redirect rules for thedariusz.com → thedariusz.dev

In **Cloudflare Dashboard → thedariusz.com → Rules → Redirect Rules**:

**Rule:** `thedariusz.com to .dev`
- **When (Custom filter expression):**
  `(http.host eq "thedariusz.com") or (http.host eq "www.thedariusz.com")`
- **Then:** Dynamic redirect → `concat("https://thedariusz.dev", http.request.uri.path)`
- **Status code:** 301 (permanent)
- **Preserve query string:** ON

> ⚠️ **Important:** `n8n.thedariusz.com` must NOT be affected. The redirect rule only matches the exact hostnames `thedariusz.com` and `www.thedariusz.com`, so the `n8n` subdomain will continue working independently.

### 9d. Add a DNS record for thedariusz.com to enable the redirect

After removing thedariusz.com from Pages custom domains, you need a DNS record so the redirect rule can fire. Add a dummy AAAA record:

| Type | Name | Target | Proxy |
|---|---|---|---|
| AAAA | `thedariusz.com` | `100::` | Proxied ☁️ |
| AAAA | `www` | `100::` | Proxied ☁️ |

_(Proxied dummy records let Cloudflare intercept the request and apply redirect rules.)_

---

## Step 10: Update thedariusz.pl redirect to point to .dev

Update the existing redirect rule for thedariusz.pl:

In **Cloudflare Dashboard → thedariusz.pl → Rules → Redirect Rules**:

Edit the existing `thedariusz.pl to .com` rule:
- **Rule name:** `thedariusz.pl to .dev`
- **When (Custom filter expression):**
  `(http.host eq "thedariusz.pl") or (http.host eq "www.thedariusz.pl")`
- **Then:** Dynamic redirect → `concat("https://thedariusz.dev", http.request.uri.path)`
- **Status code:** 301 (permanent)
- **Preserve query string:** ON

---

## Step 11: Post-deployment verification

### Functional checks
- [ ] `https://thedariusz.dev` — site loads correctly
- [ ] `https://www.thedariusz.dev` → redirects to `https://thedariusz.dev`
- [ ] `https://thedariusz.com` → redirects to `https://thedariusz.dev`
- [ ] `https://www.thedariusz.com` → redirects to `https://thedariusz.dev`
- [ ] `http://thedariusz.com` → redirects to `https://thedariusz.dev`
- [ ] `https://thedariusz.pl` → redirects to `https://thedariusz.dev`
- [ ] `https://www.thedariusz.pl` → redirects to `https://thedariusz.dev`
- [ ] `https://n8n.thedariusz.com` — still works (n8n unaffected)
- [ ] Contact form submits successfully
- [ ] CV downloads work (both EN and PL)
- [ ] Social links open correct profiles
- [ ] OG image shows up when sharing link on LinkedIn/X (use [opengraph.xyz](https://www.opengraph.xyz/) to test)
- [ ] Mobile responsive — check on real phone

### Performance checks
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on `thedariusz.dev`
- [ ] Target: 90+ on all Lighthouse categories
- [ ] Check that Cloudflare is caching static assets (inspect response headers for `cf-cache-status: HIT`)

### SEO checks
- [ ] Canonical URL resolves correctly (`https://thedariusz.dev`)
- [ ] `robots.txt` accessible at `https://thedariusz.dev/robots.txt`
- [ ] Sitemap accessible at `https://thedariusz.dev/sitemap.xml`
- [ ] No duplicate content issues (all domains redirect to .dev)
- [ ] Google Search Console: submit `thedariusz.dev` for indexing

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
| 3 | Add `thedariusz.com` + `www` as custom domains | Cloudflare Pages | ✅ Done |
| 4a | Add `thedariusz.pl` to Cloudflare, change nameservers | Cloudflare + cyber_folks | ✅ Done |
| 4b | Add redirect rule for `.pl` | Cloudflare Rules | ✅ Done (needs updating to → .dev) |
| 5 | Add `thedariusz.dev` to Cloudflare, change nameservers | Cloudflare + cyber_folks | **Next** |
| 6 | Add `thedariusz.dev` + `www` as custom domains on Pages | Cloudflare Pages | |
| 7 | Verify `thedariusz.dev` serves the site | Browser | |
| 8 | Update codebase URLs to `.dev` (index.html, robots, sitemap) | Codebase + push | |
| 9 | Reconfigure `thedariusz.com` as redirect → `.dev` | Cloudflare | |
| 10 | Update `thedariusz.pl` redirect → `.dev` | Cloudflare Rules | |
| 11 | Run full verification checklist | Browser | |
| 12 | Submit `thedariusz.dev` to Google Search Console | Google Search Console | |

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
