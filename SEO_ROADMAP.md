# 🔍 Fuji Fenix Elevator — SEO Roadmap v3.0

> **Purpose:** Improve on SEO_SPEC.md v2.0 with a real code-level audit, critical bug fixes, and a prioritized execution plan for 2026.
> **Base:** `SEO_SPEC.md` (v2.0) + `PHASE1_SEO_COMPLETE.md`

---

## Part A — Current SEO Audit (September 2026)

### ✅ Already Implemented

| Area | Status | Files |
|---|---|---|
| Dynamic XML sitemap | ✅ | `app/sitemap.ts` (static + categories + products) |
| robots.txt | ✅ | `public/robots.txt` (disallows /api, /studio, /login, /dashboard) |
| Structured Data | ✅ | `lib/structured-data.ts` + `app/components/StructuredData.tsx` |
| Global schemas (Org, LocalBusiness, WebSite) | ✅ | `app/layout.tsx` |
| Product + FAQ + Breadcrumb schema | ✅ | `app/products/[category]/[product]/page.tsx` |
| ItemList + Breadcrumb on category pages | ✅ | `app/products/[category]/page.tsx` |
| Dynamic per-page metadata | ✅ | `generateMetadata` on product/category pages |
| Preconnect hints | ✅ | `app/layout.tsx` (cdn.sanity.io, fonts) |
| GSC verification tag | ✅ | `app/layout.tsx` |
| Security headers | ✅ | `next.config.mjs` |
| ISR revalidation (60s) | ✅ | product/category pages |
| next/image WebP/AVIF | ✅ | `next.config.mjs` |
| PWA manifest + SW | ✅ | `public/` |

### ❌ Missing

| Area | Impact | Notes |
|---|---|---|
| **GA4 / analytics** | 🔴 High | Preconnect to GA exists but script NOT installed — no traffic data at all |
| **Canonical tags** | 🔴 High | No `alternates.canonical` in any `generateMetadata` |
| **Hreflang** | 🟡 Medium | Google Translate widget exists but no hreflang tags |
| **Visible breadcrumb navigation** | 🟡 Medium | Schema present, but no visible breadcrumb UI for users |
| **Blog / content hub** | 🔴 High | Biggest organic growth lever — zero informational content |
| **Image sitemap** | 🟡 Medium | Not present |
| **404 / soft-404 handling** | 🟡 Medium | `error.tsx` exists, but no custom 404 page for crawl |
| **Accurate `lastmod` in sitemap** | 🟡 Low | Uses `new Date()` everywhere |
| **SearchAction target** | 🟡 Low | Points to `/search` which does NOT exist |

### ⚠️ Critical Bugs in Structured Data (fix FIRST)

These can cause **Google Rich Results errors, loss of rich snippets, or manual-action risk**:

1. **Fake `aggregateRating`** — `lib/structured-data.ts` hardcodes `ratingValue: "4.8", reviewCount: "127"`. Google's review policy **forbids fabricated ratings**. Risk: manual action / no reviews stars.

2. **`offers.price: "0"`** with `availability: InStock` — invalid price. Google flags spoofed offers.

3. **Broken image URLs in schema**:
   - `logo: "https://fujifenix.com/logo.png"` → file does not exist (only `FUJI FENIX (1).svg`)
   - `localBusinessSchema` → `image: "https://fujifenix.com/factory.jpg"` → does not exist

4. **Wrong Product schema URL** — `productSchema()` builds `https://fujifenix.com/products/${slug}` (2 segments) but real URLs are `/products/{category}/{slug}` (3 segments).

5. **Raw Sanity asset passed as `image`** — product/category pages pass `p.image` directly into `productSchema()`. If it's an asset reference (not URL), schema image is invalid. Must run through `urlFor(...).auto('format').url()`.

6. **Duplicated Product schema on every page via layout** — layout injects Org/LocalBusiness/WebSite globally (fine), but **home page injects Product schema for 4 products** while product pages also do → inconsistent. Keep product schema ONLY on product detail pages.

---

## Part B — Immediate Fixes (P0, do this week)

### 1. Fix structured-data.ts
- **Remove** `aggregateRating` (or replace with real customer reviews only when available).
- **Remove** `offers` with `price: "0"`; use `offers: { "@type": "Offer", availability, url, priceCurrency, price }` only when real pricing exists — else drop `offers` entirely (Products without offers still valid).
- Fix `logo` → point to real existing asset (e.g. `/FUJI%20FENIX%20(1).svg` or better: upload a PNG logo to `/public/logo.png`).
- Fix `factory.jpg` → change to an existing image (`/building-exterior.jpg` or upload factory photo).
- Fix `productSchema.url` → accept `categorySlug` and build `/products/${categorySlug}/${slug}`.
- Fix `image` param — always resolve via `urlFor` on caller side.
- Remove `webSiteSchema`'s `SearchAction` (no search page) OR build a `/search` page.

### 2. Add canonical URLs
Add to BOTH `generateMetadata` in product & category pages:
```ts
alternates: {
  canonical: `/products/${cat.slug}` // or full path
}
```
(Next.js 16 with `metadataBase` set will absolutize it.)

### 3. Install GA4
Add `@next/third-parties/google` and `<GoogleAnalytics gaId="G-XXXX" />` in `app/layout.tsx` (preconnect already exists). Then connect GA4 ↔ Search Console for keyword + conversion data.

### 4. Sitemap accuracy
- Include `/products` (list page) — currently missing.
- Set `lastModified` from Sanity `_updatedAt` where available.
- Add image entries for key product images.

### 5. 404 page
Create `app/not-found.tsx` with 404 status, useful links, and search suggestion → reduces soft-404s.

---

## Part C — Content Strategy (P1, biggest ranking lever)

> **Client constraints (strict):**
> ❌ No blog.
> ❌ **No new visible sections on the website.** Layout/design must stay exactly as-is. All SEO content improvements must be **invisible** (metadata, schema, sitemap) or added **inside existing sections** only.

For a B2B elevator exporter, **on-page depth + FAQ content + dedicated landing pages** are how you win top-3 rankings without a blog.

### 1. FAQ content (deferred — needs client approval on placement)
- FAQ fields + visible FAQ sections were **built then removed** per client's "no new sections" rule.
- **Yet to decide:** if client allows FAQ inside an **existing** product/category section, re-enable quickly (code is ready in git history). Otherwise skip FAQ rich results.

### 2. Enrich category pages (P1, inside existing sections)
- Every category page should have **400–800 words of unique intro/SEO content** above the product grid (currently thin).
- Add 3–5 FAQs per category (see #1).
- Target: "passenger elevator manufacturer", "home elevator price", "freight elevator supplier" etc.

### 3. Dedicated landing pages (not a blog — permanent site pages)
Reuse the existing page structure (`/services`, `/solutions`, `/projects`) to add buyer-intent pages:

| Page | Keyword Target | Type |
|---|---|---|
| `/solutions/home-elevators` (or existing) | "home elevator cost" | Solution page |
| `/services/modernization` | "elevator modernization" | Service page |
| `/solutions/hospital` | "hospital elevator supplier" | Solution page |
| `/projects` (case studies) | "elevator case studies" | Project page |

> ⚠️ Confirm with client: these are **permanent promotional pages**, not blog articles. If client rejects any "content-style" page, fall back to FAQ + category optimization only.

### 4. On-page refresh (existing pages)
- **Home**: single clear H1 with "Elevator & Escalator Manufacturer", Manufacturing/Why-Us section linking to About + products.
- **Services/Solutions**: unique metadata, one H1, 600+ words, internal links to relevant product categories.

---

## Part D — International / Local SEO (P2)

### Hreflang

Hreflang is emitted per page in `app/layout.tsx`/`generateMetadata` and inside `sitemap.xml`:

- `en` — generic English
- `en-<CODE>` — country-targeted English (e.g. `en-AE`, `en-CN`, `en-JP`)
- `x-default` — fallback

`x-default` is self-referencing for country pages. No `zh`/`ar`/`ja` alternates are emitted until real translated routes exist: Google Translate widget content is **NOT** indexed as translated pages, and pointing hreflang at a non-existent `/zh` URL would be incorrect. If real translations are added later, add the locale routes and extend `countryLanguageTag()` + `sitemap.ts`.

### International market programme (Nov 2026)

**Canonical URL structure.** Country markets live on ISO 3166-1 alpha-2 country-code paths:

| Region | Markets (URL) |
|---|---|
| East Asia | China `/cn`, Japan `/jp`, South Korea `/kr` |
| South Asia | India `/in`, Pakistan `/pk`, Bangladesh `/bd` |
| Southeast Asia | Singapore `/sg`, Malaysia `/my`, Thailand `/th`, Philippines `/ph`, Indonesia `/id`, Vietnam `/vn` |
| Middle East | UAE `/ae`, Saudi Arabia `/sa`, Qatar `/qa`, Oman `/om`, Kuwait `/kw` |
| Africa | Kenya `/ke`, Ethiopia `/et`, South Africa `/za`, Nigeria `/ng`, Tanzania `/tz` |

- `/markets` is the indexable hub. `/markets/<slug>` and `/markets/<slug>/<focus>` are **308 permanent redirects** to `/<code>` and `/<code>/<focus>` — the country-code URL is the only indexable version. The redirect runs in `proxy.ts` before rendering, so it is a real HTTP 308 (invalid legacy slugs return 404).
- **22 country pages + 88 country × product pages**, statically generated from `lib/markets.ts` and `lib/product-focuses.ts`.
- Every country page has a unique intro, demand drivers, project types, buyer segments, logistics, compliance context, FAQs and keyword set. Every country × product page adds a market-specific product note, local FAQs and shipping/compliance context.
- **Business priority tiers (Nov 2026 growth plan).** `lib/market-priority.ts` defines the targeting order separately from the programme `wave`:
  - **Tier 1 — priority export markets:** Pakistan `/pk`, UAE `/ae` (incl. Dubai), Saudi Arabia `/sa`, Kenya `/ke`, Ethiopia `/et`, South Africa `/za`, Nigeria `/ng`, Tanzania `/tz`. Focus: manufacturer/export sourcing, regional elevator and escalator supply, product and application demand.
  - **Tier 2 — market-specific B2B focus:** Bangladesh `/bd`, Qatar `/qa`, Oman `/om`, Kuwait `/kw`, Indonesia `/id`. Focus: market-specific B2B discovery and relevant product solutions.
  - **Tier 3 — validated expansion:** Malaysia `/my`, Vietnam `/vn`, Thailand `/th`, Philippines `/ph`. Expansion is validated by search demand, competition, partner coverage and lead quality.
  - **Manufacturing base / Asia priority:** China `/cn`, India `/in`, Japan `/jp`, South Korea `/kr`, Singapore `/sg` stay visible on the hub without diluting the export tiers.
  - The tiers drive the home-page priority-market band (`app/components/PriorityMarkets.tsx`), the site-wide footer "Key markets" row, hub sections, `MarketCard`/country-page labels, priority-ordered `MarketNav`, tier 1–2 cross-links on country × product pages, and Organization `areaServed`.
  - Dubai is targeted through the UAE page H1, title and metadata (no separate city doorway page).
- Canonical + hreflang: `en`, `en-<CODE>` (e.g. `en-AE`) and self-referencing `x-default`. No translated-language hreflang is emitted because translated pages do not exist — Google Translate is a client-side overlay only.
- **Sitemap follows business priority.** `app/sitemap.ts` lists the home page, hub, Tier 1 country pages and their product pages first, then static/product pages, then Tier 2, Tier 3 and the manufacturing/Asia-priority markets. `priority` is 0.9 / 0.8 / 0.7 / 0.6 for Tier 1 / 2 / 3 / other country pages, one step lower for the matching country × product pages. `lastmod` comes from `MARKET_CONTENT_UPDATED` in `lib/markets.ts` — bump it whenever market copy changes.
- Country metadata adds `geo.region`, `geo.placename`, `content-language`, `applicable-device` and country `og:locale`.
- Schema: `Service` (with `areaServed` country + `inLanguage`), `FAQPage`, `BreadcrumbList`, `WebPage` and `ItemList`. All market URLs and images are included in `sitemap.xml` (with `xhtml:link` alternates) and `sitemap-images.xml`.
- **Geo suggestion, never a redirect.** `app/api/geo/route.ts` reads `x-vercel-ip-country` / `cf-ipcountry` / `x-country-code`; `app/components/CountrySuggestion.tsx` shows a dismissible card in the bottom-left. It is skipped on `/dashboard`, `/login` and `/studio`, and dismissal is stored in `localStorage` (`ff-geo-suggestion-dismissed`).
- **China / regional search engines.** `public/robots.txt` explicitly allows Baiduspider, Sogou, 360Spider, Yisouspider, Naver Yeti, Daum, Bingbot and YandexBot, and keeps `/_next/static/` and `/_next/image/` crawlable so pages render for crawlers.
- To add a market: add one object to `MARKETS` (with its country code and focuses). Routes, navigation, redirects, sitemap and image sitemap update automatically.

### Local SEO
- **Google Business Profile** — verify Shanghai location, category "Elevator Manufacturer", photos, weekly posts. (Not set up yet — critical for brand + local pack.)
- NAP consistency (already in schema — keep address identical everywhere).
- Submit to B2B directories: Alibaba (your store), Made-in-China, GlobalSources, TradeKey, Kompass, YellowPages.
- **YouTube**: installation/factory tour videos → embed on product pages (video = rich snippet opportunity).

---

## Part E — Backlinks (P2, ongoing)

High-intent B2B keywords need authority:
1. **Guest posts** on architecture/construction/real-estate blogs (DA 30+)
2. **Press releases** (new products, certifications, factory tours) via PRWeb/PRNewswire
3. **Case studies** published on LinkedIn + industry sites
4. **Business directories** (B2B marketplaces)
5. **Competitor backlink gap analysis** (Ahrefs/Semrush): find sites linking to Otis, KONE, Schindler that could link to you — e.g., "top elevator manufacturers in China" listicles

---

## Part F — Technical Performance (P3)

| Task | Impact | Effort |
|---|---|---|
| Run Lighthouse + PSI on top 10 pages; fix LCP/CLS | 🔴 High | Medium |
| Defer GSAP/Framer Motion until after `useEffect`/hydration | 🟡 Medium | Medium |
| `Image` sizes + `priority` audit on hero images | 🔴 High | Low |
| Review Google Translate widget impact on CLS/core | 🟡 Medium | Low |
| Caching layer on Sanity fetch (SWR/ISR beyond 60s for heavy pages) | 🟡 Medium | Medium |

---

## Part G — Measurement & Success (P2)

### Setup (Week 1–2)
1. **Google Search Console** — verify (tag already in layout), submit `sitemap.xml`
2. **Bing Webmaster Tools** — verify + import from GSC
3. **GA4** — install script, connect to GSC
4. **Google Looker Studio dashboard** — traffic, keywords, CWV

### KPIs (6-month)
| Metric | Target |
|---|---|
| Organic traffic | +100% |
| Top-10 keywords | 30+ |
| FAQ rich results | Live on all product/category pages |
| Indexed pages | 100% of sitemap |
| Core Web Vitals | All green |
| Backlinks (DA 30+) | 20+ |

---

## Execution Timeline

| When | Focus |
|---|---|
| **Week 1** | P0 fixes: structured data bugs, canonicals, GA4, 404 page, sitemap accuracy |
| **Week 2** | GSC + Bing verification, sitemap submit, baseline report (Lighthouse, PSI, rich results test) |
| **Week 3–4** | Enrich category pages (content inside existing sections), verify canonicals/schemas in Rich Results Test |
| **Month 2** | Landing page content approvals (with client), GBP setup, directory submissions |
| **Month 3+** | Backlink outreach, video content, competitor gap analysis, quarterly audits |

---

## ✅ Definition of "SEO System Done"
- [ ] All P0 fixes deployed & verified in Google Rich Results Test
- [ ] GSC + GA4 wired, Looker dashboard live
- [ ] Category pages ≥400 words unique content (inside existing sections — no new sections)
- [ ] Real hreflang for EN/ZH (AR/ES next) — client-approved languages only
- [ ] Quarterly audit cadence documented

---
*Version 3.0 — September 2026 · Owner: Fuji Fenix Digital Team*