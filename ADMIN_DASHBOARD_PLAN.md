# Admin Dashboard — Revamp Plan (v2)

> **STATUS: PLANNING ONLY — work has NOT started.**
> This document supersedes the original v1 plan (deployed on a Vercel subdomain).
> Reality changed: the admin is now **integrated inside the main Next.js app** and
> deployed on **Hostinger at `/dashboard`** (same domain as the public site).
> The v2 plan re-scopes the revamp around that architecture, with a strong
> **Admin Privacy & Security** focus.

---

## 1. Current State (What Already Exists)

| Area | Where | Status |
|------|-------|--------|
| Admin routes | `app/dashboard/*`, `app/login` | ✅ Live on `/dashboard` |
| Auth | NextAuth v5 (Credentials) + 2FA (TOTP via otplib) | ✅ Live |
| Admin UI components | `components/admin` (Sidebar, TopBar) | ✅ Live |
| UI kit | `components/ui` (Button, Card, Input, Select, Table, Badge, …) | ✅ Live |
| Sanity-backed users | `sanity/schemaTypes/adminUser.ts` | ✅ Live |
| Inquiries / Popups / Analytics | `sanity/schemaTypes/{inquiry,popup,analyticsEvent}.ts` + `app/dashboard/*` | ✅ Live |
| Real-time layer | Socket.io → `lib/socket.ts`, `app/api/socket` | ✅ Live |
| Validation | Zod (`lib/validation.ts` / schema types) | ✅ Live |
| Rich forms | `react-hook-form` + `@hookform/resolvers` | ✅ Live |
| Charts | recharts (v2 — needs v3 upgrade) | ✅ Live (basic) |

**Cleanup completed (2026-09):**
- ❌ Removed duplicate admin app in `migrations/` (47 files)
- ❌ Removed dead `lib/push.ts` (never imported)
- ♻️ Archived 51 one-time Sanity scripts → `scripts/archive/`
- ❌ Removed stale `PHASE1_SEO_COMPLETE.md`

---

## 2. Why Revamp

1. **UI/UX is functional but dated** — needs a modern design system, consistent
   navigation, dark mode, and faster workflows.
2. **Admin privacy is weak** — today every admin can see everything (all inquiries,
   all user accounts). No roles, no audit trail, no session control, no activity
   visibility. This is the **#1 priority** of the revamp.
3. **Feature gaps** — product image management, inquiry inbox workflows, popup
   builder preview, and a real analytics dashboard.

---

## 3. Revamp Goals (v2)

### 3.1 Admin Privacy & Security (Priority #1)

- **Roles & least privilege** — `superadmin` > `admin` > `editor` > `viewer`:
  - `viewer`: read-only, aggregate stats only, **no PII** (no emails/phones/messages)
  - `editor`: manage products/content, cannot see other admins' data
  - `admin`: manage inquiries + popups + content
  - `superadmin`: users/settings/full access (only one)
- **Audit log** — every admin action logged to Sanity `auditLog`:
  `who, what, on which document, when, from which IP`. Immutable (append-only), viewable only by superadmin.
- **Session management** — list own + all active sessions, **revoke remotely**,
  force logout on password change.
- **Login hardening** — existing 2FA kept; add:
  - Rate limiting (5 attempts / 15 min) + lockout (30 min)
  - Strong password policy + expiry reminder
  - **New-device detection** — login alert showing IP/location/device
- **Profile privacy** — admin email/phone visible only to superadmin;
  other admins see name + role only.
- **Data minimization** — inquiries list shows contact info **only to admin/superadmin**;
  viewer sees counts/sources only.
- **Retention & export** — inquiry deletion/export policy for superadmin;
  automatic purge option after N months.
- **No leakage to public site** — admin data served only through authenticated
  server routes; never in client bundles or public APIs.

### 3.2 UI/UX Revamp

- Modern design system built on existing `components/ui` (shadcn-style) + Radix primitives
- **Dark mode** + persistent preference
- New dashboard overview: KPI cards, recent activity, inquiry funnel
- Responsive mobile-usable layout (PWA-ready)

### 3.3 Feature Upgrades

| Module | Upgrade |
|--------|---------|
| **Dashboard** | KPI cards, 7/30-day trends, recent activity feed |
| **Products** | Image upload to Sanity, drag-drop gallery ordering, live preview of public page |
| **Inquiries** | Inbox with filters (status/source/date), assignee, reply thread + internal notes, quick status workflow, export CSV |
| **Popups** | Visual builder with preview, targeting rules, schedule, impression/click stats |
| **Analytics** | recharts **v3** upgrade, GA4-connected traffic charts, source breakdown |
| **Settings** | Profile + 2FA management, push prefs, password change |

---

## 4. Target Architecture (Stays as-is)

- Admin stays **inside the main app** at `/dashboard`, `/login` — deployed on Hostinger.
- **No new subdomain** (v1's `admin.fujifenix.com` idea is dropped — extra cost/complexity).
- Server-only Sanity client for all admin writes (`lib/sanity.ts` style, never `NEXT_PUBLIC_` token).
- Per-route + per-action guards enforced in **Server Components/Server Actions** (not just client).
- Audit logger as a shared server utility used by all mutations.
- Keep Socket.io for real-time inquiry/product/popup notifications (already built).

---

## 5. Phases (Future — NOT started yet)

| Phase | Focus | Deliverables | Est. |
|-------|-------|--------------|------|
| **A** | Privacy & Security foundation | Roles + guards, audit log, session mgmt, login hardening, PII rules | 1–2 wks |
| **B** | UI revamp | Design system, dark mode, dashboard overview, navigation | 1 wk |
| **C** | Feature upgrades | Products media manager, Inquiries inbox, Popup builder, Analytics v3 | 2–3 wks |
| **D** | PWA + Web Push | Re-create push module (`lib/push.ts`), service worker notifications | 1 wk |
| **E** | QA & Security review | Playwright flows, OWASP-checks, dependency audit, rollout | 1 wk |

**Rough total: 6–8 weeks** (can be phased out separately; each phase ships independently).

---

## 6. Out of Scope / Hard Constraints

- ❌ **Zero visible changes to the public marketing site** — admin revamp is fully
  behind `/dashboard` (client constraint: no new public sections, no blog).
- ❌ No blog, no public-facing admin content.
- ❌ No new subdomain.
- ❌ No admin work begins until this plan is approved — this is a plan only.

---

## 7. Approval Checklist

- [ ] 1. Confirm role model: `superadmin / admin / editor / viewer`
- [ ] 2. Confirm audit log + session management requirements
- [ ] 3. Confirm recharts v3 + GA4 analytics in scope
- [ ] 4. Confirm phases and rough timeline
- [ ] 5. Confirm admin stays at `/dashboard` on Hostinger (no subdomain)

Once approved, implementation starts with **Phase A (Privacy & Security foundation)**.