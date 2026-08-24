# Fuji Fenix Elevator

A modern marketing website for Fuji Fenix Elevator, built with Next.js and integrated with Sanity for content management.

The project presents the company’s elevator and escalator solutions, product range, technology focus, and project portfolio in a polished, conversion-oriented experience.

## Overview

- Next.js 16 app router project
- Tailwind CSS styling
- Sanity CMS for product and content data
- Animated sections using GSAP and Framer Motion
- Responsive landing page for commercial, residential, healthcare, and infrastructure vertical-transportation use cases

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Sanity
- GSAP
- Framer Motion

## Project Structure

```bash
app/                 # App routes and UI sections
public/              # Static assets and imported media
sanity/              # Sanity client, schema helpers, env config
scripts/             # Sanity import/update utilities
package.json         # Project scripts and dependencies
```

## Prerequisites

- Node.js 18+ recommended
- npm
- A Sanity project with dataset configured

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and add your Sanity values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-19
```

3. Sign in to Sanity if needed:

```bash
npx sanity login
```

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

## Useful Commands

```bash
npm run dev      # Run local development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Lint the project
```

## Sanity Content Import

The project includes scripts to import and sync product/category data from local image folders into Sanity.

Dry run:

```bash
node scripts/import-sanity.mjs --dry-run
```

Run import:

```bash
node scripts/import-sanity.mjs
```

## Deployment

This app is ready to be deployed to a platform such as Vercel. Make sure that the Sanity environment variables are configured in the deployment environment as well.

## Notes

The site is designed as a brand-focused B2B marketing experience for vertical transportation products, with dynamic product sections and CMS-driven content updates.
