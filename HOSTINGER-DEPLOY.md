# Hostinger Deployment Guide (Node.js Hosting)

## Overview

- **Public Website + Admin** → Hostinger (Node.js Hosting)
- **Admin is behind auth** — protected by NextAuth

---

## Step 1: Build

```bash
npm run build
```

---

## Step 2: Upload to Hostinger

1. Login to **Hostinger hPanel**
2. Go to **Advanced** → **Node.js**
3. Create new application:
   - **Node.js version**: 18 or 20
   - **Application root**: `public_html`
   - **Application startup file**: `server.js`
4. Upload ALL project files via **File Manager** or **FTP**

### Files to upload:
```
├── .next/              # Next.js build output
├── node_modules/       # Dependencies
├── public/             # Static assets
├── server.js           # Entry point
├── package.json        # Dependencies
├── package-lock.json   # Lock file
├── .env.local          # Environment variables
└── next.config.js      # Next.js config
```

---

## Step 3: Install Dependencies

In Hostinger Terminal:
```bash
cd public_html
npm install
```

---

## Step 4: Environment Variables

Create `.env.local` in Hostinger File Manager:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-token
VAPID_PUBLIC_KEY=your-key
VAPID_PRIVATE_KEY=your-private-key
VAPID_SUBJECT=mailto:admin@yourdomain.com
```

---

## Step 5: Start the App

In Hostinger Node.js panel:
- Click **Start** or **Restart**

Or in Terminal:
```bash
node server.js
```

---

## Step 6: Disable Cache (REQUIRED for Next.js)

Hostinger's built-in page cache / CDN does **not** understand Next.js RSC requests
(`?_rsc=...`) and can return **400 Bad Request** on client-side navigation, with a
`__cpo=` parameter in the URL. Fix this in hPanel:

1. hPanel → **Websites** → your site → **Node.js**
2. Turn **OFF** the built-in **Cache** option for the application
3. Also check **Website → Cache settings** (LiteSpeed/other) → disable or exclude:
   - `/_next/*`
   - any URL containing `_rsc`
4. **Purge/Clean all caches**
5. Restart the Node.js app
6. Test in **Incognito mode** (Ctrl/Cmd+Shift+N) without browser extensions

> Symptoms if cache is still on: `GET /...?_rsc=... 400 (Bad Request)`,
> `__cpo=base64(https://server-ip)` in failing requests, broken client-side navigation.

---

## Access

- **Website**: `https://yourdomain.com`
- **Admin**: `https://yourdomain.com/dashboard`
- **Login**: `https://yourdomain.com/login`

---

## Notes

- Admin is protected by NextAuth authentication
- Only authenticated users can access `/dashboard`
- Public pages are accessible to everyone
- Sanity Studio is at `/studio`
