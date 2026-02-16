# Deployment Plan: thedariusz.com

## Overview

Deploy the landing page as a static site on **Cloudflare Pages**, with three domains pointing to it:
- **thedariusz.com** — primary (DNS already on Cloudflare)
- **thedariusz.pl** — redirect to thedariusz.com (DNS on cyber_folks)
- **thedariusz.dev** — redirect to thedariusz.com (DNS on cyber_folks)

## Current State

- ✅ Code on GitHub: `TheDariusz/thedariusz-landing-page` (branch: `main`)
- ✅ Production build works: `npm run build` → outputs to `dist/`
- ✅ n8n webhook is already live at `n8n.thedariusz.com` (subdomain on Cloudflare)
- ✅ OG meta tags updated with absolute URLs (`https://thedariusz.com/og-image.png`)
- ✅ Canonical URL added (`<link rel="canonical" href="https://thedariusz.com" />`)
- ✅ `robots.txt` updated with sitemap reference
- ✅ `sitemap.xml` created
- ✅ OG image created (`public/og-image.png`, 1200×630px, domain-agnostic)
- ⚠️ Build output has a 544 KB JS chunk (works fine, optimization can come later)

---

## Step 1: Pre-deployment fixes

Before deploying, fix a few things in the codebase:

### 1a. ✅ Create OG image
Done. Created `public/og-image.png` (1200×630px) — branded image with profile photo, dev.TheDariusz logo, name, and "Software Engineer" tagline on dark background. Domain-agnostic (no URL) so it works across all three domains.

### 1b. ✅ Update OG meta tags with full URL
Done. `index.html` now has:
- `og:url` → `https://thedariusz.com`
- `og:image` → `https://thedariusz.com/og-image.png`
- `twitter:image` → `https://thedariusz.com/og-image.png`

### 1c. ✅ Add canonical URL
Done. Added `<link rel="canonical" href="https://thedariusz.com" />` to `index.html`.

### 1d. ✅ Update robots.txt
Done. Simplified `public/robots.txt` with sitemap reference.

### 1e. ✅ Add sitemap.xml
Done. Created `public/sitemap.xml` with `lastmod: 2026-02-15`.

---

## Step 2: Create Cloudflare Pages project

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

Cloudflare will build and deploy your site. You'll get a URL like:
`https://thedariusz-landing-page.pages.dev`

### 2b. Verify the deployment

- Visit the `.pages.dev` URL
- Check all sections render
- Test the contact form (submits to n8n webhook)
- Test CV download (both EN/PL)
- Test social links
- Check mobile responsiveness

---

## Step 3: Configure thedariusz.com (primary domain)

Since your DNS is already on Cloudflare, this is the easiest part.

### 3a. Add custom domain in Cloudflare Pages

1. In your Pages project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter: `thedariusz.com`
4. Cloudflare will automatically add the DNS record (CNAME pointing to your Pages project)
5. Click **Activate domain**
6. Also add: `www.thedariusz.com` (same process)

### 3b. Verify DNS records

In **Cloudflare Dashboard → DNS → Records**, you should see:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `thedariusz.com` | `thedariusz-landing-page.pages.dev` | Proxied ☁️ |
| CNAME | `www` | `thedariusz-landing-page.pages.dev` | Proxied ☁️ |
| CNAME | `n8n` | _(your existing Hetzner record)_ | _(keep as-is)_ |

> ⚠️ **Important:** Your existing `n8n.thedariusz.com` subdomain record will NOT be affected. Cloudflare handles subdomains independently.

### 3c. SSL/HTTPS

Cloudflare handles HTTPS automatically. In **SSL/TLS** settings, ensure:
- **Encryption mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON

### 3d. Set up www → apex redirect

In **Cloudflare Dashboard → Rules → Redirect Rules**:
- **Rule name:** `www to apex`
- **When:** Hostname equals `www.thedariusz.com`
- **Then:** Redirect to `https://thedariusz.com` + concat URI path
- **Status code:** 301 (permanent)

---

## Step 4: Configure thedariusz.pl (redirect to .com)

This domain's DNS is managed by cyber_folks. We need it to redirect all traffic to `thedariusz.com`.

### Strategy: Point DNS to Cloudflare, then redirect

There are two approaches. Choose one:

### Option A: Transfer DNS to Cloudflare (Recommended)

This gives you the most control and lets Cloudflare handle the redirect.

1. **Add thedariusz.pl as a site in Cloudflare** (free plan)
   - Cloudflare Dashboard → **Add a site** → enter `thedariusz.pl`
   - Select Free plan
   - Cloudflare will scan existing DNS records
2. **Update nameservers at cyber_folks**
   - Log in to cyber_folks panel
   - Find domain `thedariusz.pl` → DNS/Nameserver settings
   - Replace existing nameservers with the two Cloudflare gives you (e.g., `iris.ns.cloudflare.com`, `sam.ns.cloudflare.com`)
   - ⏳ Nameserver propagation takes 1–24 hours
3. **Add redirect rule in Cloudflare**
   - Once the domain is active on Cloudflare
   - Go to **Rules → Redirect Rules**
   - **Rule name:** `thedariusz.pl to .com`
   - **When:** Hostname equals `thedariusz.pl` OR hostname equals `www.thedariusz.pl`
   - **Then:** Redirect to `https://thedariusz.com` + concat URI path
   - **Status code:** 301 (permanent)

### Option B: Use cyber_folks redirect (if you prefer not to move DNS)

If cyber_folks supports HTTP redirects or URL forwarding:
1. Set up a web redirect from `thedariusz.pl` → `https://thedariusz.com`
2. Set up a redirect from `www.thedariusz.pl` → `https://thedariusz.com`
3. Check if cyber_folks supports HTTPS for the redirect (some registrars don't)

> **Recommendation:** Option A is better because you get HTTPS, caching, and simpler management all in one place.

---

## Step 5: Configure thedariusz.dev (redirect to .com)

Same approach as thedariusz.pl. The `.dev` TLD **requires HTTPS** (it's HSTS-preloaded), so Cloudflare is the safest option.

### Option A: Transfer DNS to Cloudflare (Recommended)

1. **Add thedariusz.dev as a site in Cloudflare** (free plan)
2. **Update nameservers at cyber_folks** for this domain
3. **Add redirect rule** (same as Step 4 but for `thedariusz.dev`)
   - **When:** Hostname equals `thedariusz.dev` OR `www.thedariusz.dev`
   - **Then:** 301 redirect to `https://thedariusz.com`

> ⚠️ **`.dev` domains REQUIRE HTTPS.** Browsers enforce this via HSTS preloading. Cloudflare handles this automatically when the domain is on their platform.

### Option B: cyber_folks redirect

Same caveat as Step 4 — must support HTTPS redirect. For `.dev` this is non-negotiable.

---

## Step 6: Post-deployment verification

### Functional checks
- [ ] `https://thedariusz.com` — site loads correctly
- [ ] `https://www.thedariusz.com` → redirects to `https://thedariusz.com`
- [ ] `http://thedariusz.com` → redirects to HTTPS
- [ ] `https://thedariusz.pl` → redirects to `https://thedariusz.com`
- [ ] `https://thedariusz.dev` → redirects to `https://thedariusz.com`
- [ ] `https://n8n.thedariusz.com` — still works (n8n unaffected)
- [ ] Contact form submits successfully
- [ ] CV downloads work (both EN and PL)
- [ ] Social links open correct profiles
- [ ] OG image shows up when sharing link on LinkedIn/X (use [opengraph.xyz](https://www.opengraph.xyz/) to test)
- [ ] Mobile responsive — check on real phone

### Performance checks
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on `thedariusz.com`
- [ ] Target: 90+ on all Lighthouse categories
- [ ] Check that Cloudflare is caching static assets (inspect response headers for `cf-cache-status: HIT`)

### SEO checks
- [ ] Canonical URL resolves correctly
- [ ] `robots.txt` accessible at `https://thedariusz.com/robots.txt`
- [ ] Sitemap accessible at `https://thedariusz.com/sitemap.xml` (if added)
- [ ] No duplicate content issues (all domains redirect to .com)
- [ ] Google Search Console: submit `thedariusz.com` for indexing

---

## Step 7: CI/CD (Automatic)

Once set up, Cloudflare Pages provides automatic CI/CD:
- **Every push to `main`** → triggers a new production build and deploy
- **Every push to other branches** → creates a preview deployment at a unique URL

No additional setup needed. This is built into Cloudflare Pages.

---

## Summary: Action Checklist

| # | Action | Where | Status |
|---|---|---|---|
| 1a | Create OG image (1200×630px) | Manual | ✅ Done |
| 1b | Update OG meta tags with absolute URLs | Codebase | ✅ Done |
| 1c | Add canonical URL | Codebase | ✅ Done |
| 1d | Update robots.txt | Codebase | ✅ Done |
| 1e | Add sitemap.xml | Codebase | ✅ Done |
| 2 | Push changes to GitHub | Terminal |
| 3 | Create Cloudflare Pages project, connect to GitHub | Cloudflare Dashboard |
| 4 | Add `thedariusz.com` + `www` as custom domains | Cloudflare Pages |
| 5 | Set up www → apex redirect rule | Cloudflare Rules |
| 6 | Add `thedariusz.pl` site to Cloudflare, change nameservers | Cloudflare + cyber_folks |
| 7 | Add redirect rule for `.pl` → `.com` | Cloudflare Rules |
| 8 | Add `thedariusz.dev` site to Cloudflare, change nameservers | Cloudflare + cyber_folks |
| 9 | Add redirect rule for `.dev` → `.com` | Cloudflare Rules |
| 10 | Run verification checklist | Browser |
| 11 | Submit to Google Search Console | Google Search Console |

---

## Cost

| Service | Cost |
|---|---|
| Cloudflare Pages (hosting + CDN) | **Free** |
| Cloudflare DNS for thedariusz.com | **Free** (already set up) |
| Cloudflare DNS for thedariusz.pl | **Free** (adding site to Cloudflare) |
| Cloudflare DNS for thedariusz.dev | **Free** (adding site to Cloudflare) |
| Domain renewals | Existing cost at cyber_folks |
| **Total additional cost** | **$0** |
