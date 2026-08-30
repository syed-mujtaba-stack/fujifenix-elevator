export const CONTACT = {
  address: "Shanghai, China",
  phone: "+86 157 5725 3279",
  phoneHref: "tel:+8615757253279",
  email: "info@fujifenix.com",
  emailHref: "mailto:info@fujifenix.com",
} as const;

export const COMPANY = {
  name: "Fuji Fenix Elevator",
  displayName: "FUJI FENIX",
  shortName: "FUJIFENIX",
  tagline: "Total Solution for Vertical Transportation",
  intro:
    "From high-rise towers to shopping centers, private villas to transit hubs, hospitals to dumbwaiters — we deliver end-to-end vertical transportation solutions tailored to every environment.",
  about1:
    "Fuji Fenix Elevator is a leading manufacturer and solution provider of advanced elevator and escalator systems. By integrating cutting-edge technology with precision engineering, we deliver world-class vertical mobility solutions that redefine safety, efficiency, and design.",
  about2:
    "Equipped with state-of-the-art manufacturing facilities and rigorous testing protocols, every product we deliver meets the highest international safety and performance standards. Our portfolio spans residential towers, commercial complexes, healthcare facilities, and large-scale infrastructure projects worldwide.",
} as const;

export const STATS = [
  { end: 6847, suffix: "+", label: "HAPPY CUSTOMERS" },
  { end: 100, suffix: "%", label: "CLIENT SATISFACTION" },
  { end: 3240, suffix: "+", label: "PROJECTS COMPLETED" },
] as const;

export const SERVICE_OFFERINGS = [
  {
    icon: "factory",
    title: "Manufacturing & Supply",
    desc: "State-of-the-art production of elevators and escalators, engineered to order in our Shanghai facility and delivered on schedule.",
    bullets: ["Made-to-order systems", "ISO-certified production", "Global logistics"],
  },
  {
    icon: "wrench",
    title: "Installation & Commissioning",
    desc: "Certified crews handle everything from shaft preparation to final handover — tested, tuned, and compliant from day one.",
    bullets: ["Certified install teams", "Precision commissioning", "Full compliance testing"],
  },
  {
    icon: "refresh",
    title: "Modernization & Upgrades",
    desc: "Breathe new life into aging equipment — controllers, drives, cabins, and safety systems upgraded with minimal downtime.",
    bullets: ["Control system retrofits", "Cabin refurbishment", "Safety upgrades"],
  },
  {
    icon: "shield",
    title: "Maintenance & Servicing",
    desc: "Preventive maintenance programs that keep every unit running smoothly, quietly, and safely throughout its lifecycle.",
    bullets: ["Scheduled preventive care", "Genuine spare parts", "Performance audits"],
  },
  {
    icon: "bolt",
    title: "Repair & Emergency Response",
    desc: "Rapid-response technicians on call around the clock to diagnose and resolve breakdowns before they disrupt your building.",
    bullets: ["24/7 emergency hotline", "Fast dispatch", "Qualified technicians"],
  },
  {
    icon: "compass",
    title: "Design Consultation",
    desc: "Traffic analysis, shaft planning, and bespoke cabin design — expert guidance from feasibility study to final specification.",
    bullets: ["Traffic analysis", "Shaft & pit planning", "Custom interiors"],
  },
] as const;

export const SERVICE_PROCESS = [
  {
    step: "01",
    title: "Consultation",
    desc: "We assess your site, traffic demands, and budget to define the right solution.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Engineers produce specifications, drawings, and cabin designs for your approval.",
  },
  {
    step: "03",
    title: "Manufacturing",
    desc: "Your system is built and rigorously tested in our ISO-certified facility.",
  },
  {
    step: "04",
    title: "Installation",
    desc: "Certified crews install, commission, and hand over — safe, clean, on time.",
  },
  {
    step: "05",
    title: "Lifetime Support",
    desc: "Maintenance, modernization, and 24/7 emergency response for the long run.",
  },
] as const;

export const SERVICE_SUPPORT_POINTS = [
  { stat: "24/7", label: "EMERGENCY RESPONSE" },
  { stat: "98%", label: "FIRST-VISIT FIX RATE" },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "Comprehensive Solutions",
    desc: "End-to-end manufacturing, installation, sales, and after-sales support for elevators and escalators across all project types.",
  },
  {
    num: "02",
    title: "Safety First",
    desc: "Engineered to exceed the most stringent international safety standards with multi-layered protection systems.",
  },
  {
    num: "03",
    title: "Energy Efficiency",
    desc: "Intelligent drive systems and regenerative technology that minimize power consumption and reduce operating costs.",
  },
  {
    num: "04",
    title: "Proven Expertise",
    desc: "Trusted by developers, architects, contractors, and property managers across global markets.",
  },
  {
    num: "05",
    title: "Custom Design",
    desc: "Bespoke cabin interiors, finishes, and configurations tailored to complement any architectural vision.",
  },
  {
    num: "06",
    title: "Reliability and Performance",
    desc: "Smooth, quiet, and dependable operation built to perform consistently in demanding environments.",
  },
] as const;

export interface SolutionSegment {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  points: string[];
}

export const SOLUTIONS: SolutionSegment[] = [
  {
    slug: "residential",
    title: "RESIDENTIAL",
    eyebrow: "VILLAS · APARTMENTS · LOW-RISE",
    description:
      "From private villas to multi-story apartment buildings, Fuji Fenix delivers quiet, compact, and architecturally refined vertical transportation designed for everyday residential life.",
    points: ["Home Elevators", "Passenger Elevators", "Custom Cabin Interiors"],
    image: "/home-elevator.jpg",
  },
  {
    slug: "commercial",
    title: "COMMERCIAL",
    eyebrow: "TOWERS · OFFICES · RETAIL CENTERS",
    description:
      "High-capacity passenger elevators, panoramic observation lifts, and escalators engineered for offices, shopping malls, and commercial towers that move thousands of people every day.",
    points: ["Passenger Elevators", "High-Speed Elevators", "Panoramic Elevators", "Escalators"],
    image: "/hero-elevator.jpg",
  },
  {
    slug: "healthcare",
    title: "HEALTHCARE",
    eyebrow: "HOSPITALS · CLINICS · CARE FACILITIES",
    description:
      "Specialized vertical transportation systems including hospital bed elevators, engineered to support patient circulation and the demanding operational requirements of healthcare environments.",
    points: ["Hospital Bed Elevators", "Passenger Elevators", "Reliability and Safety"],
    image: "/about-lobby.jpg",
  },
  {
    slug: "infrastructure",
    title: "INFRASTRUCTURE",
    eyebrow: "AIRPORTS · TRANSIT HUBS · PUBLIC BUILDINGS",
    description:
      "Heavy-duty escalators and moving walkways built for continuous high-traffic operation in airports, transit hubs, and large-scale public facilities.",
    points: ["Escalators", "Moving Walks", "Continuous High-Traffic Operation"],
    image: "/escalator.jpg",
  },
] as const;

export interface Project {
  title: string;
  location: string;
  type: string;
  floors: string;
  img: string;
  size: "large" | "small";
}

export const PROJECTS: Project[] = [
  {
    title: "HIGH-RISE TOWER",
    location: "COMMERCIAL AND RESIDENTIAL",
    type: "PASSENGER ELEVATORS",
    floors: "28 FLOORS",
    img: "/hero-elevator.jpg",
    size: "large",
  },
  {
    title: "RETAIL COMPLEX",
    location: "COMMERCIAL RETAIL",
    type: "ESCALATORS",
    floors: "6 FLOORS",
    img: "/escalator.jpg",
    size: "small",
  },
  {
    title: "EXECUTIVE TOWER",
    location: "COMMERCIAL OFFICE",
    type: "PANORAMIC GLASS LIFTS",
    floors: "18 FLOORS",
    img: "/escalator.jpg",
    size: "small",
  },
  {
    title: "LUXURY RESIDENCE",
    location: "PRIVATE VILLA",
    type: "HOME ELEVATORS",
    floors: "4 FLOORS",
    img: "/home-elevator.jpg",
    size: "large",
  },
] as const;

export const ENGINEERING_PILLARS = [
  {
    num: "01",
    title: "SAFETY FIRST",
    desc: "Multi-layered safety systems that exceed international standards, ensuring passenger protection at every level.",
  },
  {
    num: "02",
    title: "ENERGY EFFICIENCY",
    desc: "Intelligent drive technology and regenerative systems that reduce power consumption and operating costs.",
  },
  {
    num: "03",
    title: "RELIABILITY",
    desc: "Smooth, quiet, and dependable operation engineered to perform consistently across every installation.",
  },
  {
    num: "04",
    title: "ADVANCED TECHNOLOGY",
    desc: "Smart controls, IoT-enabled monitoring, and remote diagnostics for intelligent vertical mobility.",
  },
  {
    num: "05",
    title: "CUSTOM DESIGN",
    desc: "Bespoke cabin finishes, materials, and configurations tailored to complement any architectural vision.",
  },
  {
    num: "06",
    title: "AFTER-SALES SUPPORT",
    desc: "Comprehensive maintenance programs and rapid emergency response to ensure uninterrupted operation.",
  },
] as const;

export const CAPABILITIES_STRIP = [
  { num: "01", title: "CUSTOM DESIGN SOLUTIONS", desc: "Tailored solutions to complement every architectural project" },
  { num: "02", title: "CUTTING-EDGE TECHNOLOGY", desc: "Integration of smart controls and innovative mobility systems" },
  { num: "03", title: "ENERGY-EFFICIENT SYSTEMS", desc: "Intelligent technology that reduces operating costs and consumption" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/* Hero display headings — plural form per client requirement.
 * Only the HERO heading is overridden here; Sanity product titles, slugs,
 * URLs, cards, and SEO remain unchanged. Products already using a
 * client-approved plural name are intentionally not listed. */
export const HERO_HEADINGS: Record<string, string> = {
  "passenger-elevator-cabin": "Passenger Elevators",
  escalator: "Escalators",
  "platform-stair-lift": "Platform Stair Lifts",
};

/* Desktop mega-menu under PRODUCTS — grouped category links */
export const PRODUCT_MENU = [
  {
    num: "01",
    title: "ELEVATORS",
    items: [
      { label: "Passenger Elevators", href: "/products/elevators/passenger-elevator-cabin" },
      { label: "Home Elevators", href: "/products/elevators/home-elevators" },
      { label: "High-Speed Elevators", href: "/products/elevators/high-speed-elevators" },
      { label: "Panoramic Elevators", href: "/products/elevators/panoramic-observation-elevators" },
      { label: "Hospital Bed Elevators", href: "/products/elevators/hospital-bed-elevators" },
      { label: "Freight Elevators", href: "/products/elevators/freight-elevators" },
      { label: "Car Elevators", href: "/products/elevators/car-elevators" },
      { label: "Escalators", href: "/products/elevators/escalator" },
      { label: "Moving Walks", href: "/products/elevators/moving-walks" },
      { label: "Marine Elevators", href: "/products/elevators/marine-elevators" },
      { label: "Circular Elevators", href: "/products/elevators/circular-elevators" },
      { label: "Platform / Stair Lifts", href: "/products/elevators/platform-stair-lift" },
      { label: "Dumbwaiters", href: "/products/elevators/dumbwaiters" },
      { label: "View All Elevators", href: "/products/elevators" },
    ],
  },
] as const;
