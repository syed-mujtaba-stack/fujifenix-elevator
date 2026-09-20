# Fuji Fenix Elevator

**Total Solution for Vertical Transportation**

Modern web platform for [Fuji Fenix Elevator](https://fujifenix.com) — a leading manufacturer and solution provider of advanced elevator and escalator systems. Built with **Next.js 16 (App Router)**, **Sanity CMS**, and modern animation technologies (GSAP + Framer Motion).

> ⚠️ **Client constraint:** No blog. No new public-facing sections. All SEO work stays invisible to visitors (metadata, redirects, JSON-LD, sitemap, canonicals).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation & Development

```bash
# Install dependencies (postinstall runs scripts/force-wasm.js automatically)
npm install

# Copy env template & fill in values (see .env.local.example)
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
npm run build   # uses SWC WASM fallback (force-wasm.js) — GLIBC/ELF build warnings are expected
npm start       # or: node server.js (Hostinger uses this)
npm run lint
```

> **Do NOT run `npm audit fix --force`** — it breaks `otplib` (2FA) and `recharts`.

---

## 📋 Project Structure

```
app/
  ├── page.tsx               # Home (JSON-LD, hero, product showcase)
  ├── layout.tsx             # Root layout — metadata, GA4, GSC verification, structured data
  ├── sitemap.ts             # Dynamic XML sitemap (Next.js native)
  ├── opengraph-image.tsx    # Dynamic OG image
  ├── not-found.tsx          # 404 (robots: noindex)
  ├── products/              # /products, /products/[category], /products/[category]/[product]
  ├── services/ solutions/ projects/ about/ contact/ cta/
  ├── actions/               # Server actions (contact form)
  ├── data/                  # Static content & configuration
  ├── components/            # Public-site React components (ProductShowcase, Hero, …)
  ├── lib/                   # safeImageUrl (gallery path normalization)
  ├── studio/                # Sanity Studio route
  ├── dashboard/             # Admin dashboard (protected)
  ├── api/                   # Backend routes (auth, socket, inquiries, popups, analytics)
  └── (auth)/                # Auth flow (login, 2FA)
components/
  ├── admin/                 # Admin layout (Sidebar, TopBar)
  └── ui/                    # shadcn-style kit (Button, Card, Input, Select, Table, …)
lib/                         # auth (NextAuth), socket, structured-data, utils
sanity/
  ├── schemaTypes/           # product, category, adminUser, auditLog, inquiry, popup, pushSubscription
  └── lib/                   # client, queries (GROQ), image, live, env, structure
scripts/
  ├── force-wasm.js          # Build-time SWC WASM fallback (required — do not remove)
  └── archive/               # One-time Sanity data/seed scripts (already run)
public/
  ├── robots.txt             # Crawl rules + sitemap reference
  ├── sw.js                  # Service worker (RSC/navigation-safe fetch handling)
  └── Elevators/…            # Local product imagery
server.js                    # Production server (Hostinger)
```

---

## 🔧 Environment Variables

Copy `.env.local.example` → `.env.local` (`.env*` is gitignored).

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Sanity dataset (production) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ | Sanity API version |
| `SANITY_API_TOKEN` | ✅ | Server-side Sanity token (admin auth) |
| `NEXT_PUBLIC_SITE_URL` | – | Sitemap base URL (defaults to https://fujifenix.com) |
| `NEXT_PUBLIC_GA_ID` | ✅ | GA4 ID (`G-K8N55C390S`) — also hardcoded in `layout.tsx` |
| `FORMSPREE_ENDPOINT` | – | Contact form endpoint |
| `NEXT_PUBLIC_SOCKET_URL` | – | Socket.io URL (defaults to wss://socket.fujifenix.com) |

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.3.5 (App Router, `output: 'standalone'`) |
| **UI** | React 19, TypeScript, Tailwind CSS 4, styled-components |
| **CMS** | Sanity 5.31 |
| **Animation** | GSAP 3.15, Framer Motion 13 |
| **Auth** | NextAuth v5 + 2FA (TOTP via otplib) + bcryptjs |
| **Realtime** | Socket.io (real-time admin notifications) |
| **Forms** | react-hook-form + Zod |
| **Analytics** | GA4 (`G-K8N55C390S`) + recharts (dashboard) |

---

## 🧭 Routes

### Public (marketing site)
- `/` — Home (hero, capabilities, product showcase, stats)
- `/products`, `/products/[category]`, `/products/[category]/[product]`
- `/services` · `/solutions` · `/projects` · `/about` · `/contact`
- `/studio` — Sanity Studio
- Legacy URLs (`/home-elevators`, `/passenger-elevators`, `/escalators`, `/moving-walks`, `/home`) → **308 permanent redirects** to current pages

### Admin (`/dashboard` — protected, NextAuth + 2FA)
- `/dashboard` — Overview
- `/dashboard/products` (+ `/new`, `/[id]`) — Product management
- `/dashboard/inquiries` (+ `/[id]`) — Contact form inbox
- `/dashboard/popups` (+ `/new`) — Popup/banner management
- `/dashboard/analytics` — Traffic/product analytics
- `/dashboard/settings` (+ `/users`) — Settings & admin users
- `/login` — Admin sign-in

> **Admin revamp is planned (v2 — privacy/security-first, roles, audit log, sessions).**
> It is **planning only — no admin work has started**. See `ADMIN_DASHBOARD_PLAN.md`.

---

## 🔍 SEO Status (Complete — Invisible to visitors)

Implemented and verified:
- **Sitemap** `app/sitemap.ts` — auto-generated (no blog)
- **Image sitemap** `app/sitemap-images.xml` — all product gallery/drawing images + key static visuals (Google Images)
- **robots.txt** — crawl rules + sitemap ref
- **JSON-LD** — Organization, LocalBusiness, WebSite, Product, FAQ, BreadcrumbList
- **Per-page metadata** — titles/descriptions from Sanity, canonical URLs
- **GA4** `G-K8N55C390S` + **Google Search Console** verification tag in `layout.tsx`
- **308 redirects** for 5 legacy URLs (link equity preserved)
- **Image safety** — `lib/safeImageUrl` normalizes gallery paths (fixes `_next/image` 400s)
- **404** — `robots: noindex`
- **Security headers** — CSP-friendly set in `next.config.mjs`

Full roadmap & spec: `SEO_ROADMAP.md`, `SEO_SPEC.md`.

---

## 🚀 Deployment (Hostinger)

This project deploys on **Hostinger VPS** (git pull → `npm install` → `npm run build` → `node server.js`), **not Vercel**.

Follow the step-by-step guide in **[`HOSTINGER-DEPLOY.md`](HOSTINGER-DEPLOY.md)** — incl. required **disabling Hostinger cache** (RSC/`?_rsc=` 400 fixes) and optional CDN setup.

---

## 📚 Docs Index

| Doc | Purpose |
|---|---|
| [`HOSTINGER-DEPLOY.md`](HOSTINGER-DEPLOY.md) | Live deploy guide + cache setup |
| [`SEO_ROADMAP.md`](SEO_ROADMAP.md) | Current SEO roadmap (v3) |
| [`SEO_SPEC.md`](SEO_SPEC.md) | SEO implementation spec |
| [`ADMIN_DASHBOARD_PLAN.md`](ADMIN_DASHBOARD_PLAN.md) | Admin revamp plan v2 (privacy-first) — planning only |

---

## 🎨 Key Frontend Components

- `Hero.tsx` — landing hero
- `Navbar.tsx` / `MobileMenu.tsx` — navigation
- `ProductShowcase.tsx` — product gallery with filtering & safe image URLs
- `HorizontalSolutions.tsx` — horizontal scroll section
- `ProjectsShowcase.tsx` — portfolio showcase
- `AnimatedText.tsx` / `ImageReveal.tsx` / `PageTransition.tsx` — animations

---

## 📝 License

Proprietary — Fuji Fenix Elevator.

## 🤝 Support

For support or inquiries: **info@fujifenix.com** or [fujifenix.com](https://fujifenix.com).