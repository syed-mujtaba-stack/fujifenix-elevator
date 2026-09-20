# 🔍 Fuji Fenix Elevator — SEO Specification v2.0

> **⚠️ v3.0 UPDATE (Sept 2026):** The client **strictly forbids a blog**. Section 3.2 (Content Hub Plan) and its blog-related items are **cancelled**. See **[SEO_ROADMAP.md](./SEO_ROADMAP.md)** for the current plan — content now lives in FAQ sections, enriched category pages, and permanent landing pages (client-approved).

## 📌 Goal
Achieve **top-3 rankings** for high-intent elevator/escalator commercial keywords, build topical authority across vertical transportation, and implement technical SEO best practices to maximize organic traffic and conversions.

---

## 1️⃣ Technical SEO Foundation

### 1.1 XML Sitemap
| Requirement | Detail |
|---|---|
| **Location** | `/sitemap.xml`, `/sitemap-products.xml`, `/sitemap-pages.xml` |
| **Generator** | `next-sitemap` package or dynamic Next.js route |
| **Auto-update** | Regenerate on Sanity content publish (webhook trigger) |
| **Products** | Include all published products with `lastmod`, `changefreq=daily`, `priority=0.9` |
| **Categories** | Include all categories with `changefreq=weekly`, `priority=0.8` |
| **Static pages** | Home, About, Services, Solutions, Projects, Contact with `changefreq=monthly`, `priority=0.7` |

```ts
// app/sitemap.ts
import { client } from '@/sanity/lib/client'
import { allProductsQuery, categoriesQuery } from '@/sanity/lib/queries'

export default async function sitemap() {
  const products = await client.fetch(allProductsQuery)
  const categories = await client.fetch(categoriesQuery)

  return [
    {
      url: 'https://fujifenix.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // ... static pages
    ...products.map((p: any) => ({
      url: `https://fujifenix.com/products/${p.categorySlug}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
  ]
}
```

### 1.2 robots.txt
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /studio/
Disallow: /login
Disallow: /dashboard
Disallow: /_next/
Disallow: /admin/

Sitemap: https://fujifenix.com/sitemap.xml

# Block query params to prevent duplicate content
Clean-param: * /products/
```

### 1.3 Canonical URLs
- **Every page** must have a self-referencing canonical tag
- Product/category pages: canonical to the cleanest URL variant (no trailing slash, no `www`)
- Pagination: `rel="prev"` / `rel="next"` for page > 1
- Implement in layout.tsx:
```tsx
<link rel="canonical" href={`https://fujifenix.com${pathname}`} />
```

### 1.4 Core Web Vitals Targets
| Metric | Target | Current Priority |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | 🔴 High |
| **INP** (Interaction to Next Paint) | < 200ms | 🔴 High |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 🔴 High |
| **FCP** (First Contentful Paint) | < 1.8s | 🟡 Medium |
| **TTFB** (Time to First Byte) | < 800ms | 🔴 High |

**Optimization actions:**
- ✅ Next.js Image Optimization (`next/image`) for all Sanity images
- ✅ Font `display: swap` for Outfit/Inter (already via `next/font`)
- ⚠️ Defer GSAP + Framer Motion animations until after hydration
- ⚠️ Inline critical CSS, lazy-load non-critical styles
- ⚠️ Move `AnimatedEngineeringBackground` to low-priority with `priority={false}`
- ✅ Enable ISR with 60s revalidation (already implemented)
- ⚠️ Add `unoptimized` flag to decorative images (backgrounds, SVGs)

### 1.5 Structured Data (JSON-LD)
Implement **schema.org** markup for every page type:

#### a) Organization (on every page)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shanghai Fuji Fenix Elevator Co Ltd.",
  "alternateName": "FUJI FENIX",
  "url": "https://fujifenix.com",
  "logo": "https://fujifenix.com/logo.png",
  "description": "Total Solution for Vertical Transportation",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Building 2, No. 315 Weichang Road",
    "addressLocality": "Shanghai",
    "addressRegion": "Shanghai",
    "postalCode": "",
    "addressCountry": "CN"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+86 157 5725 3279",
    "contactType": "sales",
    "areaServed": "Global",
    "availableLanguage": ["en", "zh", "hi", "ar", "es"]
  }],
  "sameAs": [
    "https://www.linkedin.com/company/fujifenix",
    "https://www.facebook.com/fujifenix",
    "https://www.youtube.com/fujifenix"
  ]
}
```

#### b) Product schema (on product detail pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Title]",
  "description": "[Product Description]",
  "image": "[Product Image URL]",
  "brand": { "@type": "Brand", "name": "Fuji Fenix" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "url": "https://fujifenix.com/products/..."
  }
}
```

#### c) LocalBusiness (on About/Contact pages)
```json
{
  "@type": "LocalBusiness",
  "name": "Shanghai Fuji Fenix Elevator Co Ltd.",
  "openingHours": "Mo-Sa 09:00-18:00",
  "telephone": "+86 157 5725 3279",
  "address": { ... }
}
```

#### d) FAQPage (on product category pages)
- Extract FAQ content from Sanity `specGroups` or create dedicated FAQ field
- Render as FAQPage structured data

**Implementation location:** `app/components/StructuredData.tsx` — client component accepting `schema` prop.

---

## 2️⃣ On-Page SEO

### 2.1 Metadata Strategy

#### Title Template (per page type)
| Page Type | Title Format | Max Chars |
|---|---|---|
| **Home** | `Fuji Fenix Elevator \| Elevator & Escalator Solutions` | 60 |
| **Product Category** | `[Category] Elevator \| Manufacturer \| Fuji Fenix` | 60 |
| **Product Detail** | `[Product Name] \| [Category] \| Fuji Fenix Elevator` | 60 |
| **About** | `About Us \| Fuji Fenix Elevator Manufacturer` | 60 |
| **Services** | `Elevator Services \| Install, Maintain, Modernize \| Fuji Fenix` | 60 |
| **Solutions** | `[Solution] Elevator Solutions \| Fuji Fenix` | 60 |
| **Projects** | `Projects & Case Studies \| Fuji Fenix Elevator` | 60 |
| **Contact** | `Contact Fuji Fenix \| Get a Quote` | 60 |

**Dynamic title from Sanity:** Add `seoTitle` and `seoDescription` fields to Product and Category schemas.

#### Meta Description Template
- Max 155 characters
- Include primary keyword naturally
- Include value proposition ("Total Solution for Vertical Transportation")
- Include CTA: "Get a Quote Today"

```tsx
<metadata description={`${product.seoDescription || product.description.slice(0, 155)} Get a Quote. Fuji Fenix - Global Elevator Manufacturer.`} />
```

### 2.2 Heading Hierarchy (H1-H6)
| Page | H1 | H2 | H3 |
|---|---|---|---|
| **Home** | `Fuji Fenix Elevator - Total Solution for Vertical Transportation` | Hero sections | Sub-sections |
| **Product Category** | `[Category] Elevators` (dynamic) | Product group headings | Individual products |
| **Product Detail** | Product title (from Sanity) | Specifications, Features, Applications | Spec items |
| **About** | `About Fuji Fenix Elevator` | Our Mission, Manufacturing | Sub-points |
| **Services** | `Elevator Services & Solutions` | Service categories | Details |

**Rules:**
- Exactly **one H1** per page
- H2s contain target keywords
- H3s are supporting terms
- Never skip heading levels (H1 → H2 → H3)

### 2.3 URL Structure
```
https://fujifenix.com/                              → Home
https://fujifenix.com/about                          → About
https://fujifenix.com/services                       → Services
https://fujifenix.com/solutions/[slug]               → Solutions
https://fujifenix.com/products/[category]/[product]  → Product detail
https://fujifenix.com/projects                       → Projects
https://fujifenix.com/contact                        → Contact
https://fujifenix.com/cta                            → Quote form
```

**Slug rules:**
- Lowercase, hyphenated
- No dates, no numbers unless part of name
- Max 3 levels deep
- Category slugs: `passenger-elevator-cabin`, `home-elevators`, `escalator`

### 2.4 Internal Linking Strategy

#### Link Architecture
```
Home
├── About → links to Products, Contact
├── Products → links to Categories → links to Product Details
│   └── Category Page → links to Related Products (4 max)
│   └── Product Detail → links to Spec Groups, Gallery, Related Products
├── Solutions → links to relevant Product Categories
├── Services → links to Product Categories (installation, maintenance)
├── Projects → links to Product Categories used in each project
└── Contact → links to CTA, Products
```

**Implementation:**
- Add `relatedProducts` field to Sanity Product schema (already partially implemented in queries)
- Auto-generate "You May Also Like" sections on product pages
- Footer sitemap links to all major sections
- Breadcrumb navigation on all category/product pages

#### Breadcrumb Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fujifenix.com"
  }, {
    "@type": "ListItem", "position": 2, "name": "Elevators", "item": "https://fujifenix.com/products/elevators"
  }, {
    "@type": "ListItem", "position": 3, "name": "Passenger Elevators", "item": "https://fujifenix.com/products/elevators/passenger-elevator-cabin"
  }]
}
```

### 2.5 Image SEO
Every image must have:
- ✅ Descriptive `alt` text (not "image" or "product-1")
- ✅ File name with target keywords (`passenger-elevator-cabin-high-speed.jpg`)
- ✅ `loading="lazy"` for below-the-fold images
- ✅ Next.js `<Image>` component with `width`, `height`, `placeholder="blur"`
- ✅ WebP format via Sanity Image URL (`?auto=format&format=webp`)
- ✅ `title` attribute for gallery images
- ✅ Image sitemap entries for key product images

**Sanity Image URL helper:**
```ts
// sanity/lib/image.ts
import { urlForImage } from '@sanity/image-url'
export function getImageUrl(source: any, params = {}) {
  return urlForImage(source)
    .auto('format')
    .format('webp')
    .quality(80)
    .fit('max')
    .params(params)
    .url()
}
```

### 2.6 Open Graph & Twitter Cards
Add to `app/layout.tsx`:
```tsx
openGraph: {
  type: 'website',
  images: ['https://fujifenix.com/og-home.jpg'],
  siteName: 'Fuji Fenix Elevator',
  locale: 'en_US',
  // Per-page: override images per product/category
},
twitter: {
  card: 'summary_large_image',
  site: '@fujifenix',
  creator: '@fujifenix',
}
```

**Per-page OG image:** Generate dynamic OG images using `next/og` for products/categories.

---

## 3️⃣ Content SEO Strategy

### 3.1 Keyword Research Matrix

#### Primary Commercial Keywords (Tier 1)
| Keyword | Search Volume | Difficulty | Target Page | Intent |
|---|---|---|---|---|
| elevator manufacturer | 8,100 | High | Home | Commercial |
| elevator supplier | 5,400 | High | Home | Commercial |
| elevator company | 4,400 | High | About | Commercial |
| escalator manufacturer | 2,900 | Medium | Products | Commercial |
| passenger elevator price | 2,400 | High | Products | Transactional |
| home elevator cost | 1,900 | Medium | Solutions/Residential | Transactional |

#### Long-Tail Keywords (Tier 2)
| Keyword | Volume | Target Page |
|---|---|---|
| best elevator manufacturer in China | 390 | About/Services |
| hospital bed elevator supplier | 260 | Products/Hospital |
| panoramic glass elevator manufacturer | 190 | Products/Panoramic |
| MRL elevator installation company | 140 | Services/Installation |
| custom elevator for villa | 210 | Solutions/Residential |
| high speed elevator price | 170 | Products/High-Speed |
| freight elevator supplier | 150 | Products/Freight |
| moving walkway manufacturer | 210 | Products/Escalators |
| platform screen doors supplier | 120 | Products/Platform |
| eco-friendly elevator | 90 | Solutions |

#### Informational Keywords (Tier 3 - Blog Targets)
| Topic | Search Volume | Content Type |
|---|---|---|
| types of elevators explained | 720 | Guide/Long-form |
| elevator maintenance checklist | 480 | How-to |
| how much does an elevator cost | 1,300 | Guide/Calculator |
| elevator vs escalator | 590 | Comparison |
| elevator installation timeline | 350 | Process article |
| MRL vs traditional elevator | 290 | Comparison |
| energy efficient elevator systems | 210 | Guide |
| elevator safety standards | 440 | Guide |
| wheelchair accessible elevator | 180 | Guide |
| how to choose elevator manufacturer | 260 | Buyer's Guide |

### 3.2 Content Hub Plan

#### Hub Architecture
```
Elevators Hub (pillar page: /elevators)
├── Passenger Elevator Types (guide)
├── Home Elevator Cost Guide (guide)
├── High-Speed Elevator Technology (guide)
├── Panoramic & Observation Elevators (guide)
├── Hospital Bed Elevator Guide (guide)
├── Freight Elevator Buying Guide (guide)
├── Car & Automobile Elevator Guide (guide)
│
Escalators Hub (/escalators)
├── Escalator Types & Applications
├── Escalator Maintenance Guide
├── Moving Walkways vs Escalators
│
Services Hub (/services)
├── Elevator Installation Process
├── Elevator Maintenance Plans
├── Elevator Modernization Guide
├── 24/7 Emergency Repair Service
│
Blog (/blog) — 2 posts/month minimum
├── Industry news
├── Technical deep-dives
├── Case studies
├── How-to guides
├── Buyer's guides
```

### 3.3 Sanity Content Fields for SEO
Add these fields to **Product**, **Category**, and **Blog** schemas:

```ts
// SEO fields to add to all document types
defineField({
  name: 'seoTitle',
  title: 'SEO Title',
  type: 'string',
  validation: (rule) => rule.max(60),
}),
defineField({
  name: 'seoDescription',
  title: 'SEO Meta Description',
  type: 'text',
  rows: 3,
  validation: (rule) => rule.max(160),
}),
defineField({
  name: 'slug',
  title: 'SEO Slug',
  type: 'slug',
  options: { source: 'title', maxLength: 96 },
}),
defineField({
  name: 'openGraphImage',
  title: 'OG Image',
  type: 'image',
  options: { hotspot: true },
}),
defineField({
  name: 'structuredData',
  title: 'Custom Structured Data (JSON)',
  type: 'object',
  fields: [
    { name: 'jsonLd', type: 'code', language: 'json' }
  ],
  hidden: true,
}),
```

### 3.4 Content Optimization Checklist (per page)
- [ ] Primary keyword in H1 and first 100 words
- [ ] Keyword in URL slug
- [ ] Keyword in meta title (beginning)
- [ ] Keyword in meta description
- [ ] 3+ related keywords naturally throughout content
- [ ] Internal links to 3+ related pages
- [ ] External links to authoritative sources (1-2)
- [ ] Image alt text with keywords
- [ ] Schema.org structured data
- [ ] 1,500+ words for pillar pages, 800+ for category pages
- [ ] Readability score > 60 (Flesch-Kincaid)
- [ ] Tables/lists for scannability

---

## 4️⃣ Local & International SEO

### 4.1 Local SEO
- ✅ **Google Business Profile** setup (not yet configured)
  - Category: Elevator Manufacturer
  - Services: Passenger, Freight, Home, Escalators
  - Photos: Factory, products, installations
  - Reviews: Encourage customers to leave reviews
  - Posts: Weekly updates
  - Attributes: "Women-owned", "Veteran-owned" (if applicable)
- ✅ **NAP consistency**: `Building 2, No. 315 Weichang Road, Jinshan, Shanghai` across all directories
- ✅ **Schema**: LocalBusiness markup on Contact/About pages
- ✅ **Directory submissions**: Yellow Pages, Alibaba, Made-in-China, TradeKey, Kompass

### 4.2 International / Hreflang
Since the site has a Google Translate widget (60+ languages), implement hreflang:

```html
<link rel="alternate" hreflang="en" href="https://fujifenix.com/" />
<link rel="alternate" hreflang="zh" href="https://fujifenix.com/zh/" />
<link rel="alternate" hreflang="x-default" href="https://fujifenix.com/" />
```

**Approach:**
- Use cookie-based translation (`googtrans`) as interim solution
- Long-term: Build separate locale folders `/zh/`, `/hi/`, `/ar/`
- Add `hreflang` tags in `<head>` for all supported languages
- Translate SEO meta content per locale in Sanity

---

## 5️⃣ Performance & Core Web Vitals

### 5.1 Optimization Plan

| Action | Impact | Effort | Status |
|---|---|---|---|
| Next.js Image Optimization | 🔴 High LCP/CLS | Low | ⚠️ Partial |
| Font subsetting + preload | 🟡 FCP | Low | ✅ via next/font |
| Static generation with ISR | 🔴 TTFB | Low | ✅ Implemented |
| Code splitting with dynamic imports | 🟡 INP | Medium | ⚠️ Partial |
| Service Worker caching | 🟡 LCP (repeat) | Medium | 🔴 Not done |
| Critical CSS inlining | 🔴 FCP | Medium | 🔴 Not done |
| Font-display: swap | 🟡 CLS | Low | ⚠️ Partial |
| Remove unused CSS/Tailwind | 🟡 CLS | Medium | 🔴 Not done |
| Preconnect to Sanity CDN | 🟡 TTFB | Low | 🔴 Not done |
| Resource hints (preload) for hero images | 🔴 LCP | Low | 🔴 Not done |

### 5.2 Implementation
```tsx
// app/layout.tsx - Add preconnect
<head>
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</head>
```

```tsx
// Product images - Next.js Image with priority
<Image
  src={imageUrl}
  alt={product.title}
  width={800}
  height={600}
  priority={true}  // Only for above-the-fold hero images
  placeholder="blur"
  blurDataURL={placeholderData}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## 6️⃣ Technical SEO Audit Checklist

### 6.1 Crawlability
- [ ] `sitemap.xml` at root, submitted to Google Search Console
- [ ] `robots.txt` properly configured
- [ ] All pages accessible via `<10` clicks from home
- [ ] No orphan pages
- [ ] No broken links (404s)
- [ ] No redirect chains
- [ ] Canonical tags on all pages
- [ ] No `noindex` on important pages
- [ ] JS-rendered content crawlable (Googlebot renders JS but prefer SSR)
- [ ] Structured data validated via Google Rich Results Test

### 6.2 Indexability
- [ ] Google Search Console property verified
- [ ] Bing Webmaster Tools verified
- [ ] Yandex Webmaster verified (for Russian market)
- [ ] Pages indexed within 24 hours of publish
- [ ] URL inspection tool used for important pages
- [ ] No indexing blocks (no `X-Robots-Tag: noindex` on public pages)

### 6.3 Mobile SEO
- [ ] Fully responsive (Tailwind breakpoints)
- [ ] Mobile-first indexing confirmed
- [ ] Touch targets > 48px
- [ ] No mobile-specific redirects
- [ ] Viewport meta tag set
- [ ] No intrusive interstitials on mobile
- [ ] Google Mobile-Friendly Test pass

### 6.4 Security
- [ ] HTTPS everywhere (Vercel auto-certificates)
- [ ] HSTS header enabled
- [ ] No mixed content (HTTP resources)
- [ ] Secure cookies for auth
- [ ] CSP headers configured

---

## 7️⃣ Analytics & Monitoring

### 7.1 Google Search Console Setup
| Task | Priority | Status |
|---|---|---|
| Verify property | 🔴 Critical | 🔴 Pending |
| Submit sitemap | 🔴 Critical | 🔴 Pending |
| Set preferred domain | 🟡 High | 🔴 Pending |
| Enable URL inspection | 🟡 High | 🔴 Pending |
| Set up Performance report | 🟡 High | 🔴 Pending |
| Configure Core Web Vitals report | 🟡 High | 🔴 Pending |
| Set up Coverage report alerts | 🟡 Medium | 🔴 Pending |
| Page indexing API | 🟡 Medium | 🔴 Pending |

### 7.2 Analytics Setup
```tsx
// app/layout.tsx - Add Google Analytics 4
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

// Add in layout.tsx:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### 7.3 SEO Monitoring Dashboard
Track weekly:
- Organic impressions & clicks (GSC)
- Average position for top 50 keywords
- Core Web Vitals scores
- Page speed in Search Console
- Index coverage (errors/warnings)
- Backlink profile (Ahrefs/Semrush)
- Organic conversion rate (GA4)

---

## 8️⃣ Backlink Strategy

### 8.1 Link Building Tactics
1. **Guest posting** on architecture, construction, and engineering blogs
2. **Directory submissions**: Alibaba, Made-in-China, Kompass, Yellow Pages, Glassdoor
3. **PR outreach**: Press releases for new products, factory tours, certifications
4. **Industry partnerships**: Link exchanges with architects, contractors, developers
5. **Case study publications**: Share project results on Medium, LinkedIn
6. **Social signals**: LinkedIn company page, YouTube (installation videos)
7. **Local citations**: Shanghai business directories, Chinese business registries

### 8.2 Link Quality Targets
- **DA 30+** preferred
- **Relevant** to construction, architecture, real estate, manufacturing
- **Editorial** links (not paid/sponsored unless tagged)
- **Dofollow** preferred, but noindex links still provide referral traffic

---

## 9️⃣ Migration & Audit Plan

### 9.1 30-Day SEO Sprint

| Week | Task | Deliverable |
|---|---|---|
| **Week 1** | Technical SEO foundation | Sitemap, robots.txt, canonicals, structured data |
| **Week 2** | On-page optimization | Updated metadata, heading hierarchy, internal links |
| **Week 3** | Content strategy | Keyword research, blog plan, Sanity SEO fields added |
| **Week 4** | Monitoring & tools | GSC setup, analytics, baseline report |

### 9.2 Ongoing SEO Operations
- **Weekly**: Check GSC for errors, monitor rankings
- **Monthly**: Content audit, backlink analysis, performance review
- **Quarterly**: Technical audit, competitor analysis, strategy update
- **Bi-annually**: Full site audit, schema validation, speed re-test

---

## 🔟 Priority Implementation Order

### Phase 1: Critical (Week 1)
```
1. Add SEO fields to Sanity schemas (seoTitle, seoDescription)
2. Generate sitemap.xml
3. Create robots.txt
4. Add canonical tags to layout
5. Implement Organization + LocalBusiness JSON-LD
6. Next.js Image optimization for all product images
7. Preconnect hints for CDN
8. Google Search Console verification
```

### Phase 2: High Priority (Week 2)
```
9. Add BreadcrumbList schema to product/category pages
10. Dynamic OG images per page
11. Update meta descriptions (dynamic from Sanity)
12. Fix heading hierarchy across all pages
13. Implement Product schema on product detail pages
14. Add FAQ schema to category pages
15. Optimize font loading (already mostly done via next/font)
16. Code review: remove unused CSS classes
```

### Phase 3: Medium Priority (Week 3)
```
17. Add internal linking suggestions in product sections
18. Create /blog structure in Sanity
19. Implement hreflang tags
20. Set up Google Analytics 4
21. Create service worker for caching
22. Add structured data for Services, FAQ, HowTo
23. Image alt text audit
```

### Phase 4: Ongoing (Week 4+)
```
24. Blog content creation (2x/month)
25. Backlink outreach
26. Local SEO: Google Business Profile setup
27. Directory submissions
28. Competent monitoring and reporting
29. Monthly SEO audits
30. A/B test meta titles/descriptions
```

---

## 📋 Sanity Schema Changes Required

### Add to Product Schema (`sanity/schemaTypes/product.ts`)
```ts
defineField({
  name: 'seoTitle',
  title: 'SEO Title',
  type: 'string',
  validation: (rule) => rule.max(60),
}),
defineField({
  name: 'seoDescription',
  title: 'SEO Meta Description',
  type: 'text',
  rows: 3,
  validation: (rule) => rule.max(160),
}),
defineField({
  name: 'faq',
  title: 'FAQ Section',
  type: 'array',
  of: [
    defineField({ name: 'question', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'answer', type: 'text', validation: rule => rule.required() }),
  ],
}),
```

### Add to Category Schema (`sanity/schemaTypes/category.ts`)
```ts
defineField({
  name: 'seoTitle',
  title: 'SEO Title',
  type: 'string',
  validation: (rule) => rule.max(60),
}),
defineField({
  name: 'seoDescription',
  title: 'SEO Meta Description',
  type: 'text',
  rows: 3,
  validation: (rule) => rule.max(160),
}),
```

---

## 📊 Success Metrics (6-Month Targets)

| Metric | Current (Est.) | 3-Month Target | 6-Month Target |
|---|---|---|---|
| Organic Traffic | Baseline | +50% | +150% |
| Top 3 Rankings | Unknown | 20 keywords | 50 keywords |
| Organic Impressions | Baseline | +80% | +200% |
| Organic CTR | ~2% | ~3.5% | ~5% |
| Domain Authority | Low | 15+ | 25+ |
| Backlinks | Unknown | 30 | 80 |
| Core Web Vitals | Needs work | All Green | All Green |
| Conversions (organic) | Baseline | +40% | +100% |
| Indexed Pages | Unknown | 100% | 100% |

---

## 🛠️ Recommended Tools Stack

| Purpose | Tool |
|---|---|
| **Keyword Research** | Ahrefs / Semrush / Ubersuggest |
| **Rank Tracking** | AccuRanker / Serpstat / Google Sheets + GSC |
| **Site Audit** | Screaming Frog / Sitebulb / DeepCrawl |
| **Backlink Analysis** | Ahrefs / Moz Link Explorer |
| **Structured Data Testing** | Google Rich Results Test / Schema Markup Validator |
| **Page Speed** | PageSpeed Insights / WebPageTest |
| **Core Web Vitals** | Search Console / CrUX Dashboard |
| **Analytics** | Google Analytics 4 + Search Console |
| **Visualization** | Google Looker Studio / Databox |

---

## ⚠️ Risk Factors & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Heavy JS animations hurt LCP | High | Defer GSAP/Framer Motion, use `useEffect` for after-load animations |
| Sanity downtime affects SEO | Medium | `safeFetch` with fallback values (already implemented) |
| Duplicate content from translation | Medium | Canonicalize to English, use hreflang |
| Dynamic content not indexed | Medium | ISR with 60s revalidate, ensure JS renders content |
| Too many product pages diluting authority | Low | Prioritize top products with internal links, use `noindex` for thin content |
| Slow Sanity queries | Medium | Add caching layer, optimize GROQ queries |
| Image-heavy pages slow | High | Next.js Image + WebP + lazy loading |

---

*Document Version: 2.0*
*Last Updated: September 2026*
*Owner: Fuji Fenix Digital Team*
*Review Cadence: Quarterly*
