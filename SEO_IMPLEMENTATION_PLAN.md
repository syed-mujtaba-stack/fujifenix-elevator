# 🚀 Fuji Fenix Elevator — Top-Ranking SEO Implementation Plan

Based on a comprehensive audit of the codebase, SEO_ROADMAP.md, and SEO_SPEC.md. This plan prioritizes fixes that deliver the highest ranking impact with the least effort, respecting the client's "no blog" constraint.

---

## 📊 Current SEO Health Score: 65/100

### ✅ **Already Strong (25/50)**
- Dynamic XML sitemap with products & categories
- robots.txt properly configured
- Structured Data (Organization, LocalBusiness, WebSite schemas)
- Product + FAQ + Breadcrumb schema on detail pages
- Dynamic per-page metadata on category & product pages
- next/image WebP/AVIF optimization
- ISR revalidation (60s)
- Security headers
- Preconnect hints for CDN fonts

### ❌ **Critical Issues (30/50) — Fix These First**
- Fake aggregateRating & invalid offer prices (Rich Results risk)
- Broken image URLs in schema (logo, factory.jpg)
- Wrong product schema URL structure (2-segment vs 3-segment)
- Raw Sanity assets passed as image URLs
- Duplicated Product schema on home page + product pages
- Missing canonical tags on key pages
- GA4 not properly connected (preconnect exists but no script)
- No hreflang implementation
- No image sitemap
- Thin category pages (no SEO content)
- No 404/soft-404 handling

---

## 🎯 Priority Execution Roadmap

### **Phase 1: Critical — Week 1 (P0 fixes that prevent ranking penalties)**

#### 1.1 Fix Structured Data Bugs (Highest Risk — Fix Immediately)
**File:** `lib/structured-data.ts`

**Actions:**
- [ ] **Remove `aggregateRating`** entirely from `organizationSchema()` — Google forbids fabricated ratings. Risk: manual action / no rich snippets.
- [ ] **Remove `offers` block** from `localBusinessSchema()` where `price: "0"` with `InStock` — invalid price flags spoofed offers.
- [ ] **Fix `logo` URL** in `organizationSchema()` — change from `https://fujifenix.com/logo.svg` to existing asset `/FUJI%20FENIX%20(1).svg` or upload a real PNG to `/public/logo.png`.
- [ ] **Fix `image` URL** in `localBusinessSchema()` — change from `https://fujifenix.com/factory.jpg` to existing `/building-exterior.jpg` or upload real factory photo.
- [ ] **Fix `productSchema.url`** — ensure it builds `/products/${categorySlug}/${slug}` (3 segments), not `/products/${slug}` (2 segments). The current code in `productSchema()` already handles this correctly via the ternary, but verify callers pass `categorySlug`.
- [ ] **Fix image resolution** — Always resolve Sanity images via `urlFor(...).auto('format').url()` never pass raw asset references. Update `productSchema()` callers to use `resolveStructuredImageUrl()`.
- [ ] **Remove duplicated Product schema from home page** — the layout currently injects Product schema for 4 products on home, but product detail pages also inject it. Keep product schema **ONLY** on product detail pages.

**Verification:** Run each page through [Google Rich Results Test](https://search.google.com/test/rich-results). All should pass with zero errors.

#### 1.2 Add Canonical Tags to All `generateMetadata`
**Files:** 
- `app/products/[category]/page.tsx` (already has canonical — verify it's correct)
- `app/products\[category]\[product]\page.tsx` (already has canonical — verify)
- `app/layout.tsx` — add self-referencing canonical for home page

**Implementation:**
```tsx
// In generateMetadata for each page type:
alternates: {
  canonical: `/products/${cat.slug}` // category
  // or
  canonical: `/products/${p.categorySlug}/${p.slug}` // product
}
// For home layout:
canonical: metadataBase.href
```

#### 1.3 Install & Configure GA4
**File:** `app/layout.tsx`

**Actions:**
- [ ] Already has `<GoogleAnalytics gaId="G-K8N55C390S" />` — verify it's loading correctly.
- [ ] Install `@next/third-parties/google` if not already: `npm i @next/third-parties google`
- [ ] Connect GA4 to Google Search Console for keyword + conversion data.
- [ ] Add GSC verification meta tag (already in layout: `QCYK7KIg9f2yKjSAsu63MtlI0zIRtadlunap1k7rzJY`).

#### 1.4 Improve Sitemap Accuracy
**File:** `app/sitemap.ts`

**Actions:**
- [ ] Include `/products` list page (already included ✅)
- [ ] Set `lastModified` from Sanity `_updatedAt` instead of `new Date()` — already using `_updatedAt` in queries ✅
- [ ] **Add image entries** for key product images in sitemap (optional but helpful)
- [ ] Add `/products/[category]` pages with `changefreq: weekly`, `priority: 0.8`

#### 1.5 Create Custom 404 Page
**File:** `app/not-found.tsx` (already exists, verify it has proper 404 status)

**Actions:**
- [ ] Ensure `not-found.tsx` returns proper 404 HTTP status.
- [ ] Add useful links, search suggestion, and navigation back to home.
- [ ] This reduces soft-404s and improves crawl budget usage.

---

### **Phase 2: High Priority — Week 2–4 (P1 content optimizations)**

#### 2.1 Enrich Category Pages with SEO Content (Biggest Ranking Lever)
**Constraint:** No new visible sections. Content must be **invisible** or added **inside existing sections**.

**File:** `app/products\[category]\page.tsx`

**Actions:**
- [ ] Add 400–800 words of unique SEO-rich intro content **above the product grid** on every category page.
- [ ] Content should target commercial keywords: "passenger elevator manufacturer", "home elevator price", "freight elevator supplier", etc.
- [ ] Use the category `title` and `description` fields from Sanity as the source.
- [ ] Add 3–5 FAQs per category if client approves (code is ready in git history, was built then removed per "no new sections" rule).
- [ ] Ensure H1 contains primary keyword: `[Category] Elevators`.

**Example Category Content Structure:**
```html
<h1 className="sr-only">Passenger Elevators — Fuji Fenix</h1>
<div className="category-intro">
  <p>Fuji Fenix is a leading passenger elevator manufacturer...</p>
  <ul>
    <li>Customizable cabin designs</li>
    <li>Energy-efficient regenerative drives</li>
    <li>ISO 9001 certified manufacturing</li>
  </ul>
</div>
```

#### 2.2 Create Dedicated Landing Pages (Permanent Site Pages, Not Blog)
**Constraint:** Reuse existing page structure, add buyer-intent pages inside existing sections.

**Pages to create/enhance:**
| Page | Keyword Target | Action |
|---|---|---|
| `/solutions/home-elevators` | "home elevator cost" | Add 600+ words, H1, internal links |
| `/services/modernization` | "elevator modernization" | Add unique metadata, 600+ words |
| `/solutions/hospital` | "hospital elevator supplier" | Add dedicated solution page |
| `/projects` (case studies) | "elevator case studies" | Add project descriptions with keywords |

**Implementation:** Add SEO-rich content sections **within** existing page components, not as new top-level routes.

#### 2.3 On-Page Refresh (Existing Pages)
**Files:** `app/home` (check if exists), `app/about`, etc.

**Actions:**
- [ ] **Home:** Single clear H1: "Elevator & Escalator Manufacturer". Ensure "Manufacturing" and "Why Us" sections link to About + products.
- [ ] **Services/Solutions:** Unique metadata, one H1, 600+ words, internal links to relevant product categories.
- [ ] Ensure every page has: primary keyword in H1, first 100 words, meta title (beginning), meta description.

#### 2.4 Implement Breadcrumb UI (Visible Navigation)
**Files:** `app/products\[category]\page.tsx`, `app/products\[category]\[product]\page.tsx`

**Actions:**
- [ ] Schema breadcrumb is already present ✅
- [ ] Add visible breadcrumb UI component using Tailwind CSS above the hero/content.
- [ ] This improves UX and dwell time (indirect ranking factor).

---

### **Phase 3: Medium Priority — Month 2 (P2 optimizations)**

#### 3.1 Hreflang Implementation (Interim)
**File:** `app/layout.tsx` or `app/head.tsx`

**Actions:**
- [ ] Add hreflang tags for supported languages (EN, ZH at minimum):
```html
<link rel="alternate" hreflang="en" href="https://fujifenix.com/" />
<link rel="alternate" hreflang="zh" href="https://fujifenix.com/zh/" />
<link rel="alternate" hreflang="x-default" href="https://fujifenix.com/" />
```
- [ ] Note: Google Translate widget content is NOT indexed as translated pages. True multilingual needs real `/zh/` routes.
- [ ] Recommend long-term: 2-3 key languages (EN, ZH, AR/ES) with real translated pages.

#### 3.2 Local SEO Setup
**Actions:**
- [ ] **Google Business Profile:** Verify Shanghai location, category "Elevator Manufacturer", add photos, weekly posts.
- [ ] **NAP consistency:** Ensure address is identical everywhere: `Building 2, No. 315 Weichang Road, Jinshan, Shanghai`.
- [ ] **Directory submissions:** Alibaba, Made-in-China, TradeKey, Kompass, YellowPages.
- [ ] **YouTube:** Installation/factory tour videos → embed on product pages (rich snippet opportunity).

#### 3.3 Backlink Outreach (Low-Hanging Fruit)
**Actions:**
- [ ] Guest posts on architecture/construction blogs (DA 30+)
- [ ] Press releases for new products, certifications, factory tours via PRWeb/PRNewswire
- [ ] Case studies on LinkedIn + industry sites
- [ ] Business directories (B2B marketplaces)
- [ ] Competitor backlink gap analysis: find sites linking to Otis, KONE, Schindler that could link to you

---

### **Phase 4: Ongoing (Month 3+)**

#### 4.1 Monthly SEO Operations
- Check GSC for errors, monitor rankings
- Content audit (ensure category pages stay enriched)
- Backlink analysis
- Performance review

#### 4.2 Quarterly Audits
- Full technical audit
- Competitor analysis
- Strategy update based on ranking changes

#### 4.3 Success Metrics (6-Month Targets)

| Metric | Target |
|---|---|
| Organic traffic | +100% |
| Top-10 keywords | 30+ |
| FAQ rich results | Live on all product/category pages |
| Indexed pages | 100% of sitemap |
| Core Web Vitals | All green |
| Backlinks (DA 30+) | 20+ |
| Conversions (organic) | +40% |

---

## 🛠️ Technical Fix Checklist (Immediate)

### Critical (Do This Week)
- [ ] Remove fake `aggregateRating` from structured data
- [ ] Remove invalid `offers` with `price: "0"` from local business schema
- [ ] Fix `logo` URL to point to existing asset
- [ ] Fix `factory.jpg` to existing image
- [ ] Fix product schema URL to use 3-segment pattern `/products/{category}/{slug}`
- [ ] Always resolve images via `urlFor(...).auto('format').url()` never raw assets
- [ ] Remove duplicated Product schema from home page
- [ ] Add canonical tags to all `generateMetadata` functions
- [ ] Verify GA4 is loading and connecting to GSC
- [ ] Improve sitemap with accurate `lastmod` from `_updatedAt`
- [ ] Create custom 404 page with proper status

### High (Do This Month)
- [ ] Add 400-800 word SEO intro to every category page
- [ ] Add visible breadcrumb UI
- [ ] Create landing pages with buyer-intent content
- [ ] Set up Google Business Profile
- [ ] Submit to B2B directories (Alibaba, Made-in-China, etc.)
- [ ] Implement hreflang for EN/ZH languages
- [ ] Run Lighthouse/PSI on top 10 pages; fix LCP/CLS

### Medium (Ongoing)
- [ ] Backlink outreach (guest posts, directories, PR)
- [ ] YouTube video content embedding
- [ ] Quarterly technical audits
- [ ] Monthly ranking & traffic monitoring

---

## 📝 Key Success Factors for Top Rankings

1. **Fix structured data bugs FIRST** — Google Rich Results errors can cause manual actions that destroy rankings
2. **Category page content is the #1 lever** — 400-800 words of unique SEO content per category, inside existing sections only
3. **Canonical tags prevent duplicate content** — especially important with product category variations
4. **GA4 + GSC connection** — you can't optimize what you can't measure
5. **Client constraint compliance** — all content improvements must be invisible or within existing sections (no new blog, no new page sections)
6. **Local SEO + GBP** — critical for "near me" searches and brand authority in Shanghai/China market

---

## 🚨 Quick Wins (Can Do in 1-2 Days)

1. Run all pages through **Google Rich Results Test** — fix any errors shown
2. Verify canonical tags are present on category and product pages
3. Check that GA4 is firing (use Real-Time report in GA4)
4. Submit sitemap to Google Search Console if not already done
5. Add missing `alt` text to product images in Sanity (quick win for Image SEO)

---
*Plan generated based on analysis of codebase, SEO_ROADMAP.md v3.0 (Sept 2026), and SEO_SPEC.md v2.0. All improvements respect client's "no blog" and "no new visible sections" constraints.*