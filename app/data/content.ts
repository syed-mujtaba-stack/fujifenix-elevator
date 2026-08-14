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
  {
    num: "07",
    title: "Advanced Technology",
    desc: "Smart controls, IoT-enabled monitoring, and AI-driven traffic management for modern mobility.",
  },
  {
    num: "08",
    title: "After-Sales Support",
    desc: "Dedicated preventive maintenance programs and rapid emergency response services.",
  },
] as const;

export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string | null;
  imageAlt?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "passenger-elevators",
    name: "Passenger Elevators",
    category: "Passenger Elevators",
    description:
      "High-capacity systems engineered for commercial towers, offices, and high-rise residential buildings — 2 to 30+ floors.",
    features: ["2–30+ Floors", "MRL Technology", "Smart Controls", "Custom Finishes"],
    image: "/hero-elevator.jpg",
    imageAlt: "Fuji Fenix passenger elevator interior",
  },
  {
    slug: "home-elevators",
    name: "Home Elevators",
    category: "Home Elevators",
    description:
      "Silent, compact, and architecturally refined residential lift systems for premium villas and private residences.",
    features: ["2–6 Floors", "Compact Design", "Silent Operation", "Custom Interiors"],
    image: "/home-elevator.jpg",
    imageAlt: "Fuji Fenix home elevator in a villa",
  },
  {
    slug: "high-speed-elevators",
    name: "High Speed Elevators",
    category: "High Speed Elevators",
    description:
      "Ultra-fast systems engineered for skyscrapers and landmark towers — traveling at up to 6m/s with precision floor-leveling.",
    features: ["Up to 6m/s", "Vibration Control", "AI Traffic Mgmt", "Safety First"],
    image: "/building-exterior.jpg",
    imageAlt: "High-rise tower served by a high-speed Fuji Fenix elevator",
  },
  {
    slug: "panoramic-elevators",
    name: "Panoramic Elevators",
    category: "Panoramic Elevators",
    description:
      "Full-glass observation elevators creating dramatic visual statements in hotel lobbies, malls, and commercial landmarks.",
    features: ["Full Glass Cabin", "Curved Track", "LED Lighting", "Custom Shapes"],
    image: "/panoramic.jpg",
    imageAlt: "Panoramic glass Fuji Fenix elevator",
  },
  {
    slug: "escalators",
    name: "Escalators",
    category: "Escalators",
    description:
      "Escalator systems for airports, retail malls, and transport hubs — built for continuous high-traffic operation.",
    features: [],
    image: "/escalator.jpg",
    imageAlt: "Fuji Fenix escalator in a shopping center",
  },
  {
    slug: "moving-walks",
    name: "Moving Walks",
    category: "Moving Walks",
    description:
      "Moving walkway systems for airports, retail malls, and transport hubs — built for continuous high-traffic operation.",
    features: [],
    image: "/escalator.jpg",
    imageAlt: "Fuji Fenix moving walkway",
  },
  {
    slug: "circular-elevators",
    name: "Circular Elevators",
    category: "Circular Elevators",
    description:
      "Circular elevators from the Fuji Fenix vertical transportation portfolio, built around the same precision engineering and safety standards.",
    features: [],
    image: null,
  },
  {
    slug: "special-elevators",
    name: "Special Elevators",
    category: "Special Elevators",
    description:
      "Special-purpose elevator systems engineered to meet unique project requirements with the same commitment to safety and performance.",
    features: [],
    image: null,
  },
  {
    slug: "trolley-escalators",
    name: "Trolley Escalators",
    category: "Trolley Escalators",
    description:
      "Trolley escalator systems designed for heavy-duty, continuous passenger circulation in high-traffic environments.",
    features: [],
    image: null,
  },
  {
    slug: "car-elevators",
    name: "Car Elevators",
    category: "Car Elevators",
    description:
      "Car elevator systems for vertical vehicle movement in residential and commercial buildings.",
    features: [],
    image: null,
  },
  {
    slug: "freight-elevators",
    name: "Freight Elevators",
    category: "Freight Elevators",
    description:
      "Freight elevator systems built for the safe, dependable movement of heavy goods.",
    features: [],
    image: null,
  },
  {
    slug: "auto-car-parking",
    name: "Auto Car Parking Systems",
    category: "Auto Car Parking Systems",
    description:
      "Automated car parking systems that maximise space efficiency with smart, technology-driven vehicle storage.",
    features: [],
    image: null,
  },
  {
    slug: "cargo-elevators",
    name: "Cargo Elevators",
    category: "Cargo Elevators",
    description:
      "Cargo elevator systems for reliable vertical movement of materials and goods.",
    features: [],
    image: null,
  },
  {
    slug: "hospital-bed-elevators",
    name: "Hospital Bed Elevators",
    category: "Hospital Bed Elevators",
    description:
      "Elevator systems designed for hospital beds and patient transport within healthcare facilities.",
    features: [],
    image: null,
  },
  {
    slug: "dumb-waiters",
    name: "Dumb Waiters",
    category: "Dumb Waiters",
    description:
      "Compact goods elevator systems for efficient movement of smaller loads between floors.",
    features: [],
    image: null,
  },
  {
    slug: "platform-starlifts",
    name: "Platform Starlifts",
    category: "Platform Starlifts",
    description:
      "Platform stairlift systems providing accessible vertical movement in homes and public buildings.",
    features: [],
    image: null,
  },
  {
    slug: "material-lifts",
    name: "Material Lifts",
    category: "Material Lifts",
    description:
      "Material lift systems for dependable vertical handling of goods and materials.",
    features: [],
    image: null,
  },
  {
    slug: "marine-elevators",
    name: "Marine Elevators",
    category: "Marine Elevators",
    description:
      "Elevator systems engineered for marine applications with the precision and reliability of the Fuji Fenix portfolio.",
    features: [],
    image: null,
  },
] as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  if (index === -1) return [];
  const related: Product[] = [];
  for (let i = 1; i <= PRODUCTS.length; i++) {
    const candidate = PRODUCTS[(index + i) % PRODUCTS.length];
    if (candidate.slug === slug) continue;
    related.push(candidate);
    if (related.length >= count) break;
  }
  return related;
}

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
    image: "/building-exterior.jpg",
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
    img: "/building-exterior.jpg",
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
    img: "/panoramic.jpg",
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
