# Fuji Fenix Elevator

**Total Solution for Vertical Transportation**

A modern web platform for [Fuji Fenix Elevator](https://fujifenix.com) — a leading manufacturer and solution provider of advanced elevator and escalator systems. Built with Next.js, Sanity CMS, and cutting-edge animation technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📋 Project Structure

```
app/
  ├── components/          # Reusable React components
  ├── page.tsx            # Home page
  ├── layout.tsx          # Root layout
  ├── (routes)/           # Dynamic routes (products, services, etc.)
  ├── actions/            # Server actions (contact form)
  ├── data/               # Static content & configuration
  └── studio/             # Sanity Studio integration

sanity/
  ├── schemaTypes/        # Content schema (Product, Category)
  ├── lib/                # GROQ queries, Sanity client
  └── structure.ts        # Studio structure configuration

public/                    # Static assets (product images)
```

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.3.0 |
| **UI Library** | React 19.2.8 |
| **CMS** | Sanity 5.31.1 |
| **Styling** | Tailwind CSS 4, styled-components 6.5.3 |
| **Animation** | GSAP 3.15.0, Framer Motion 13.0.0 |
| **Language** | TypeScript 5 |

## 📦 Key Features

### Content Management
- **Sanity CMS**: Headless content management with visual editing
- **Product Schema**: Title, description, features, images, categories
- **Category Organization**: Grouped product management with ordering
- **Dynamic Routes**: Category and product detail pages generated from Sanity

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Advanced Animations**: GSAP ScrollTrigger, Framer Motion for entrance effects
- **Image Optimization**: Sanity Image URL with hotspot support
- **Internationalization**: Google Translate widget for multi-language support
- **Server-Side Rendering**: Static generation with 60-second revalidation

### Pages
- **Home** (`/`) - Hero, capabilities, brand statement, product showcase
- **Products** (`/products`, `/products/[category]`, `/products/[category]/[product]`)
- **Services** (`/services`)
- **Solutions** (`/solutions`)
- **About** (`/about`)
- **Projects** (`/projects`)
- **Contact** (`/contact`) - Form with server action
- **Sanity Studio** (`/studio`) - Content management interface

## 🎨 Design Components

Core reusable components:
- `Hero.tsx` - Landing hero section
- `Navbar.tsx` / `MobileMenu.tsx` - Navigation
- `ProductShowcase.tsx` - Product gallery with filtering
- `ProjectsShowcase.tsx` - Portfolio showcase
- `AnimatedText.tsx` - Text animation effects
- `ImageReveal.tsx` - Image reveal animations
- `PageTransition.tsx` - Page transition effects
- `HorizontalSolutions.tsx` - Horizontal scrolling section

## 📊 Content & Data

### Company Info
- **Name**: Fuji Fenix Elevator
- **Headquarters**: Shanghai, China
- **Contact**: info@fujifenix.com | +86 157 5725 3279

### Metrics
- 6,847+ Happy Customers
- 100% Client Satisfaction
- 3,240+ Projects Completed

### Product Categories
- Passenger Elevators
- Freight Elevators
- Home Elevators
- Sightseeing Elevators
- Escalators
- Hospital Elevators
- Car Elevators
- Accessories

## 🔧 Development Workflow

### Edit Home Page
Modify `app/page.tsx` to change the home page layout and components.

### Add New Products
1. Go to Sanity Studio: `http://localhost:3000/studio`
2. Create a new "Product" document
3. Fill in title, slug, category, description, features, and image
4. Publish the document
5. The product will automatically appear in the product catalog (ISR revalidation in 60 seconds)

### Create New Page
1. Create a new folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` with your content
3. Next.js automatically creates the route

### Update Static Content
Edit `app/data/content.ts` for company info, contact details, and static text.

## 🚀 Deployment

### Deploy on Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy from Vercel Dashboard
# Connect your GitHub repo to Vercel
```

**Environment Variables** (set in Vercel):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Other Deployment Options
- **Netlify**: Next.js plugin support
- **Self-hosted**: Build with `npm run build` and run `npm start`

## 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP](https://gsap.com/docs/)
- [Framer Motion](https://www.framer.com/motion/)

## 📝 License

Proprietary - Fuji Fenix Elevator

## 🤝 Support

For support or inquiries, contact us at **info@fujifenix.com** or visit our website.
