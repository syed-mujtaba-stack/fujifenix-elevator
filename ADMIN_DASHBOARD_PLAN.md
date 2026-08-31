# Admin Dashboard Implementation Plan

## Overview
Build a secure, real-time admin dashboard deployed on a subdomain (`admin.fujifenix.com`) with the same Sanity backend, Socket.io for real-time updates, PWA support, and web-push notifications.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Subdomain: admin.fujifenix.com           │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 16 (App Router) + TypeScript + Tailwind CSS 4          │
│  ├── Sanity Client (shared with main site)                      │
│  ├── Socket.io Client (real-time sync)                          │
│  ├── Service Worker (PWA + Web Push)                            │
│  └── Auth (NextAuth.js + Sanity-backed users)                   │
├─────────────────────────────────────────────────────────────────┤
│  Shared Sanity Backend (fujifenix-elevator.sanity.studio)       │
│  ├── Products, Categories (existing)                            │
│  ├── Admin Users (new)                                          │
│  ├── Inquiries / Contact Forms (new)                            │
│  ├── Popups / Banners (new)                                     │
│  └── Push Subscriptions (new)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Socket.io Server (separate Node.js service or Vercel Functions)│
│  ├── Real-time product updates                                  │
│  ├── Real-time inquiry notifications                            │
│  ├── Real-time popup updates                                    │
│  └── Admin presence / typing indicators                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Sanity Schema Extensions (Week 1)

### New Document Types

#### 1. `adminUser` - Admin Authentication
```typescript
// sanity/schemaTypes/adminUser.ts
{
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    { name: 'email', type: 'string', validation: required + email },
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string', options: { list: ['superadmin', 'admin', 'editor'] } },
    { name: 'passwordHash', type: 'string', hidden: true }, // bcrypt
    { name: 'isActive', type: 'boolean', initial: true },
    { name: 'lastLogin', type: 'datetime' },
    { name: 'twoFactorSecret', type: 'string', hidden: true }, // TOTP
    { name: 'pushSubscription', type: 'object', hidden: true }, // web-push
  ]
}
```

#### 2. `inquiry` - Contact Form Submissions
```typescript
// sanity/schemaTypes/inquiry.ts
{
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: required },
    { name: 'email', type: 'string', validation: required + email },
    { name: 'phone', type: 'string' },
    { name: 'country', type: 'string' },
    { name: 'city', type: 'string' },
    { name: 'subject', type: 'string' },
    { name: 'message', type: 'text', validation: required },
    { name: 'company', type: 'string' },
    { name: 'projectType', type: 'string' },
    { name: 'floors', type: 'string' },
    { name: 'units', type: 'string' },
    { name: 'source', type: 'string', options: { list: ['contact', 'cta', 'popup'] } },
    { name: 'status', type: 'string', options: { list: ['new', 'reading', 'replied', 'closed'] }, initial: 'new' },
    { name: 'assignedTo', type: 'reference', to: [{ type: 'adminUser' }] },
    { name: 'replies', type: 'array', of: [{ type: 'inquiryReply' }] },
    { name: 'createdAt', type: 'datetime', initial: now() },
    { name: 'updatedAt', type: 'datetime' },
  ]
}

// Embedded object for replies
{
  name: 'inquiryReply',
  title: 'Reply',
  type: 'object',
  fields: [
    { name: 'message', type: 'text', validation: required },
    { name: 'sentBy', type: 'reference', to: [{ type: 'adminUser' }] },
    { name: 'sentAt', type: 'datetime', initial: now() },
    { name: 'isInternal', type: 'boolean', initial: false },
  ]
}
```

#### 3. `popup` - Dynamic Popups/Banners
```typescript
// sanity/schemaTypes/popup.ts
{
  name: 'popup',
  title: 'Popup / Banner',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'type', type: 'string', options: { list: ['modal', 'banner', 'slide-in', 'fullscreen'] }, initial: 'modal' },
    { name: 'trigger', type: 'string', options: { list: ['onLoad', 'onScroll', 'onExit', 'onClick', 'timer'] }, initial: 'onLoad' },
    { name: 'triggerConfig', type: 'object', fields: [
      { name: 'delay', type: 'number' }, // seconds
      { name: 'scrollPercentage', type: 'number' },
      { name: 'selector', type: 'string' }, // for onClick
    ]},
    { name: 'content', type: 'object', fields: [
      { name: 'headline', type: 'string' },
      { name: 'subheadline', type: 'string' },
      { name: 'body', type: 'text' },
      { name: 'image', type: 'image' },
      { name: 'primaryCTA', type: 'object', fields: [
        { name: 'text', type: 'string' },
        { name: 'url', type: 'url' },
        { name: 'style', type: 'string', options: { list: ['primary', 'secondary', 'ghost'] } },
      ]},
      { name: 'secondaryCTA', type: 'object', fields: [...] },
    ]},
    { name: 'targeting', type: 'object', fields: [
      { name: 'paths', type: 'array', of: [{ type: 'string' }] }, // URL paths
      { name: 'countries', type: 'array', of: [{ type: 'string' }] },
      { name: 'devices', type: 'array', of: [{ type: 'string', options: { list: ['desktop', 'mobile', 'tablet'] } }] },
      { name: 'userSegments', type: 'array', of: [{ type: 'string' }] }, // new, returning, customer
      { name: 'showOnce', type: 'boolean', initial: true },
      { name: 'frequencyCap', type: 'number' }, // days
    ]},
    { name: 'schedule', type: 'object', fields: [
      { name: 'startDate', type: 'datetime' },
      { name: 'endDate', type: 'datetime' },
      { name: 'timezone', type: 'string', initial: 'Asia/Shanghai' },
    ]},
    { name: 'isActive', type: 'boolean', initial: true },
    { name: 'priority', type: 'number', initial: 0 }, // higher = shows first
    { name: 'analytics', type: 'object', fields: [
      { name: 'impressions', type: 'number', initial: 0 },
      { name: 'clicks', type: 'number', initial: 0 },
      { name: 'conversions', type: 'number', initial: 0 },
    ]},
  ]
}
```

#### 4. `pushSubscription` - Web Push
```typescript
// sanity/schemaTypes/pushSubscription.ts
{
  name: 'pushSubscription',
  title: 'Push Subscription',
  type: 'document',
  fields: [
    { name: 'endpoint', type: 'string', validation: required },
    { name: 'keys', type: 'object', fields: [
      { name: 'p256dh', type: 'string' },
      { name: 'auth', type: 'string' },
    ]},
    { name: 'userAgent', type: 'string' },
    { name: 'adminUser', type: 'reference', to: [{ type: 'adminUser' }] },
    { name: 'createdAt', type: 'datetime', initial: now() },
  ]
}
```

### Updated Existing Schemas
- Add `order` field to products (already exists)
- Add `seo` object to products/categories
- Add `publishedAt` datetime for scheduling

---

## Phase 2: Authentication System (Week 1-2)

### Tech Stack
- **NextAuth.js v5** (App Router compatible)
- **Credentials Provider** (email/password + 2FA)
- **Sanity Adapter** (custom - store users in Sanity)
- **JWT Strategy** with short expiry + refresh tokens
- **bcryptjs** for password hashing
- **jose** for JWT signing
- **otplib** for TOTP 2FA

### Security Features
- Rate limiting on auth endpoints (5 attempts/15min)
- Account lockout after 5 failed attempts (30 min)
- Secure HTTP-only cookies with `SameSite=Strict`
- CSRF protection via NextAuth built-in
- Content Security Policy headers
- Subdomain isolation: `admin.fujifenix.com` cookie domain
- IP allowlisting for superadmin (optional)

### Auth Flow
```
1. Admin visits admin.fujifenix.com
2. Redirected to /login
3. Email + Password + 2FA (TOTP)
4. NextAuth validates against Sanity
5. JWT issued (15min access, 7d refresh)
6. Socket.io connects with JWT auth
7. Service Worker registers for push
```

---

## Phase 3: Real-time Layer with Socket.io (Week 2)

### Server Options
**Option A: Separate Node.js Server** (Recommended for scale)
- Deploy on Railway/Render/Fly.io
- WebSocket server independent of Vercel
- Horizontal scaling with Redis adapter

**Option B: Vercel + Pusher/Ably** (Easier)
- Managed WebSocket service
- Higher cost at scale

**Option C: Custom H3/WS on Vercel Edge** (Complex)

### Socket.io Events

#### Client → Server
```typescript
// Auth
'auth:join'        // { token: JWT }
'auth:leave'

// Products
'product:subscribe'    // { categoryId? }
'product:unsubscribe'
'product:create'       // { data }
'product:update'       // { id, data }
'product:delete'       // { id }

// Inquiries
'inquiry:subscribe'
'inquiry:unsubscribe'
'inquiry:assign'       // { inquiryId, adminId }
'inquiry:reply'        // { inquiryId, message }
'inquiry:statusChange' // { inquiryId, status }

// Popups
'popup:subscribe'
'popup:create'
'popup:update'
'popup:delete'

// Presence
'presence:update'      // { status: 'online'|'away'|'busy' }
'presence:typing'      // { inquiryId, isTyping }
```

#### Server → Client
```typescript
'product:created'      // { product }
'product:updated'      // { product }
'product:deleted'      // { id }
'inquiry:created'      // { inquiry }
'inquiry:updated'      // { inquiry }
'inquiry:newReply'     // { inquiryId, reply }
'popup:created'        // { popup }
'popup:updated'        // { popup }
'popup:deleted'        // { id }
'notification:push'    // { title, body, data }
'presence:userJoined'  // { user }
'presence:userLeft'    // { userId }
'presence:typing'      // { userId, inquiryId, isTyping }
```

### Sanity Webhooks → Socket.io Bridge
```typescript
// Sanity webhook endpoint: /api/webhooks/sanity
// Verifies signature, emits to Socket.io rooms
// Handles: product.create, product.update, product.delete
//          inquiry.create, inquiry.update
//          popup.create, popup.update, popup.delete
```

---

## Phase 4: Admin Dashboard UI (Week 2-3)

### Layout Structure (Mobile-First, PWA-Ready)
```
app/(dashboard)/
├── layout.tsx              // AuthProvider, Sidebar, TopBar, SocketProvider
├── page.tsx                // Dashboard overview (stats, recent activity)
├── products/
│   ├── page.tsx            // List with filters, search, bulk actions
│   ├── [id]/
│   │   ├── page.tsx        // Detail view
│   │   └── edit/page.tsx   // Edit form
│   └── new/page.tsx        // Create form
├── inquiries/
│   ├── page.tsx            // List with status filters
│   └── [id]/page.tsx       // Detail + reply thread
├── popups/
│   ├── page.tsx            // List with preview
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── edit/page.tsx
│   └── new/page.tsx
├── analytics/
│   └── page.tsx            // Charts (Recharts)
├── settings/
│   ├── page.tsx            // Profile, 2FA, push prefs
│   └── users/page.tsx      // Admin user management (superadmin only)
└── login/
    └── page.tsx
```

### Shared Components (Same as Web)
- `Button`, `Input`, `Select`, `Textarea`, `Card`, `Table`, `Modal`, `Toast`
- `Navbar` → `TopBar` (with user menu, notifications, PWA install prompt)
- `MobileMenu` → `Sidebar` (collapsible, responsive)
- `PageTransition`, `AnimatedText`, `ImageReveal` (reuse animations)
- Theme: CSS variables from `globals.css` (consistent branding)

### Real-time UI Features
- **Optimistic Updates**: Immediate UI feedback, rollback on error
- **Live Indicators**: Green dot on products being edited by others
- **Toast Notifications**: Socket.io driven (new inquiry, popup published)
- **Auto-refresh**: Lists update without manual refresh
- **Conflict Detection**: Warn if editing same product as another admin

---

## Phase 5: PWA + Web Push (Week 3)

### Service Worker (`public/sw.js`)
```typescript
// Workbox-generated with custom handlers
// - Cache-first for static assets
// - Network-first for API calls
// - Background sync for offline form submissions
// - Push event handler for notifications
```

### Manifest (`public/manifest.json`)
```json
{
  "name": "Fuji Fenix Admin",
  "short_name": "FFAadmin",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0047BB",
  "icons": [...],
  "categories": ["business", "productivity"],
  "shortcuts": [
    { "name": "New Product", "url": "/products/new" },
    { "name": "Inquiries", "url": "/inquiries" }
  ]
}
```

### Web Push Implementation
```typescript
// VAPID keys generated once, stored in env
// lib/push.ts
export async function sendPushNotification(
  subscription: PushSubscription,
  payload: { title: string; body: string; data?: any }
) {
  await webpush.sendNotification(subscription, JSON.stringify(payload));
}

// Triggered on:
// - New inquiry (high priority)
// - Product published/updated
// - Popup scheduled to go live
// - Security alerts (failed logins)
```

### Push Subscription Flow
1. Admin logs in → prompt for notification permission
2. Subscribe via Push API → save to Sanity
3. Server sends via `web-push` library (Node.js)
4. Service Worker shows notification
5. Click → focus/open admin dashboard

---

## Phase 6: Security Hardening (Week 3-4)

### Network/Infrastructure
- **Subdomain**: `admin.fujifenix.com` (separate Vercel project)
- **DNS**: CNAME to Vercel, WAF rules (Cloudflare)
- **Rate Limiting**: Vercel Edge Middleware + Upstash Redis
- **IP Allowlist**: Superadmin IPs only for `/settings/users`
- **Geo-blocking**: Restrict to known regions (optional)

### Application Security
```typescript
// middleware.ts
- Auth check on all /dashboard/* routes
- Role-based access (superadmin > admin > editor)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Request validation (Zod schemas)
- SQL injection prevention (Sanity GROQ params)
- XSS prevention (React auto-escape + DOMPurify for rich text)
```

### Data Protection
- **Encryption at rest**: Sanity handles
- **Encryption in transit**: TLS 1.3 (Vercel)
- **Secrets**: Vercel Environment Variables (never in code)
- **Audit Logs**: All admin actions logged to Sanity `auditLog` document
- **Backup**: Daily Sanity exports + GitHub repo backup

### Monitoring
- **Vercel Analytics** + **Sentry** (error tracking)
- **Uptime monitoring**: BetterStack/Pingdom
- **Log aggregation**: Vercel Logs + Sanity webhook logs

---

## Phase 7: Contact Form → Inquiry Pipeline (Week 1)

### Updated Contact Action
```typescript
// app/actions/contact.ts
export async function submitContact(payload: ContactPayload): Promise<ActionResult> {
  // 1. Create inquiry in Sanity
  const inquiry = await sanityClient.create({
    _type: 'inquiry',
    ...payload,
    source: payload.source || 'contact',
    status: 'new',
    createdAt: new Date().toISOString(),
  });

  // 2. Emit real-time event via Socket.io
  await socketServer.emit('inquiry:created', inquiry);

  // 3. Send push notification to all online admins
  await sendPushToAdmins({
    title: 'New Inquiry',
    body: `${payload.name} (${payload.email}) - ${payload.subject}`,
    data: { inquiryId: inquiry._id, url: `/inquiries/${inquiry._id}` }
  });

  // 4. Send email to admin (Resend/SendGrid)
  await sendEmailAdmin(inquiry);

  // 5. Return success
  return { success: true };
}
```

### Email Template
- Admin receives formatted email with inquiry details
- Quick reply link → opens admin dashboard inquiry page
- Unsubscribe link for notification preferences

---

## Phase 8: Deployment Strategy (Week 4)

### Vercel Project Setup
```
Project: fujifenix-admin
Framework: Next.js
Root Directory: / (same repo, different build output)
Build Command: npm run build:admin
Output Directory: .next
Install Command: npm ci
```

### Environment Variables (Vercel Dashboard)
```env
# Sanity (shared)
NEXT_PUBLIC_SANITY_PROJECT_ID=fpxhz2d3
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-19
SANITY_API_TOKEN=sk... (write token for webhooks)

# Auth
NEXTAUTH_URL=https://admin.fujifenix.com
NEXTAUTH_SECRET=... (32+ chars)
AUTH_SANITY_PROJECT_ID=fpxhz2d3
AUTH_SANITY_DATASET=production

# Socket.io
NEXT_PUBLIC_SOCKET_URL=wss://socket.fujifenix.com
SOCKET_SECRET=... (shared secret for server auth)

# Web Push
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@fujifenix.com

# Email (Resend)
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@fujifenix.com

# Security
ALLOWED_ADMIN_IPS=1.2.3.4,5.6.7.8 (optional)
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Custom Domain
1. Add `admin.fujifenix.com` in Vercel Domains
2. DNS: CNAME `admin` → `cname.vercel-dns.com`
3. SSL auto-provisioned
4. Cookie domain: `.fujifenix.com` (shared with main site if needed)

### CI/CD
- GitHub Actions: lint → typecheck → test → deploy preview → production
- Branch protection: main requires PR + checks
- Preview deployments for each PR

---

## Phase 9: Testing & QA (Week 4)

### Test Coverage
- **Unit**: Auth utils, push helpers, validation schemas (Vitest)
- **Integration**: API routes, Socket.io events, Sanity mutations
- **E2E**: Playwright (login, CRUD flows, real-time sync, PWA install)
- **Visual**: Chromatic/Storybook for component consistency
- **Security**: OWASP ZAP scan, dependency audit

### Performance Budget
- Initial JS < 100KB gzipped
- LCP < 2.5s on 3G
- TTI < 3.5s
- PWA Lighthouse > 90

---

## Dependencies to Add

```json
// package.json additions
"dependencies": {
  "next-auth": "^5.0.0-beta.18",
  "socket.io": "^4.7.5",
  "socket.io-client": "^4.7.5",
  "bcryptjs": "^2.4.3",
  "jose": "^5.2.3",
  "otplib": "^12.0.1",
  "web-push": "^3.6.7",
  "zod": "^3.22.4",
  "date-fns": "^3.6.0",
  "recharts": "^2.12.7",
  "lucide-react": "^0.447.0",
  "@hookform/resolvers": "^3.3.4",
  "react-hook-form": "^7.51.2",
  "sonner": "^1.4.41", // toasts
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-tooltip": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.1"
},
"devDependencies": {
  "@types/bcryptjs": "^2.4.6",
  "@types/otplib": "^12.0.0",
  "@types/web-push": "^3.6.3",
  "playwright": "^1.44.0",
  "vitest": "^1.4.0",
  "@testing-library/react": "^14.2.1"
}
```

---

## File Structure (New Additions)

```
├── app/
│   ├── (admin)/                    # Route group for admin
│   │   ├── layout.tsx              # AuthProvider, Sidebar, SocketProvider
│   │   ├── page.tsx                # Dashboard
│   │   ├── products/
│   │   ├── inquiries/
│   │   ├── popups/
│   │   ├── analytics/
│   │   └── settings/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── webhooks/sanity/route.ts
│   │   ├── push/subscribe/route.ts
│   │   ├── push/send/route.ts
│   │   └── socket/route.ts         # For Vercel Edge WebSocket (if used)
│   └── actions/
│       ├── inquiry.ts
│       ├── popup.ts
│       └── product.ts
├── components/
│   ├── admin/                      # Admin-specific components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── DataTable.tsx
│   │   ├── ProductForm.tsx
│   │   ├── InquiryThread.tsx
│   │   ├── PopupBuilder.tsx
│   │   └── StatsCards.tsx
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   └── ProtectedRoute.tsx
│   └── ui/                         # Shared UI (Button, Input, etc.)
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── sanity.ts                   # Sanity server client (write)
│   ├── socket.ts                   # Socket.io client/server
│   ├── push.ts                     # Web push helpers
│   ├── validation.ts               # Zod schemas
│   └── utils.ts
├── hooks/
│   ├── useSocket.ts
│   ├── useRealtimeProducts.ts
│   ├── useRealtimeInquiries.ts
│   └── usePushSubscription.ts
├── public/
│   ├── sw.js                       # Service Worker (Workbox)
│   ├── manifest.json
│   └── icons/
├── sanity/
│   ├── schemaTypes/
│   │   ├── adminUser.ts
│   │   ├── inquiry.ts
│   │   ├── popup.ts
│   │   ├── pushSubscription.ts
│   │   └── auditLog.ts
│   └── structure.ts                # Updated studio structure
├── middleware.ts                   # Auth + Security headers
├── next.config.ts                  # Updated for PWA
└── ADMIN_DASHBOARD_PLAN.md         # This file
```

---

## Timeline Summary

| Week | Phase | Deliverable |
|------|-------|-------------|
| 1 | 1-2 | Sanity schemas + Auth system |
| 2 | 3-4 | Socket.io real-time + Dashboard UI |
| 3 | 5-6 | PWA + Push + Security hardening |
| 4 | 7-9 | Contact→Inquiry pipeline + Deployment + Testing |

**Total: ~4 weeks**

---

## Approval Checkpoint

Please review this plan and confirm:
1. ✅ Architecture approach (shared Sanity, separate admin subdomain)
2. ✅ Socket.io for real-time (vs. alternatives)
3. ✅ PWA + Web Push requirements
4. ✅ Security level (2FA, IP allowlist, audit logs)
5. ✅ Timeline and phasing
6. ✅ Deployment target (Vercel subdomain)

Once approved, I'll start with **Phase 1: Sanity Schema Extensions** and **Phase 2: Authentication System**.