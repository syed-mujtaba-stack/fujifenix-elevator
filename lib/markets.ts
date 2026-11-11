/**
 * International market data for the /markets SEO programme.
 *
 * The markets below are the validated target markets from the Fuji Fenix
 * Global SEO & International Market Growth Strategy (Nov 2026). Business
 * priority is defined in lib/market-priority.ts:
 *   Tier 1: Pakistan, UAE, Saudi Arabia, Kenya, Ethiopia, South Africa,
 *           Nigeria, Tanzania  (export sourcing and regional supply)
 *   Tier 2: Bangladesh, Qatar, Oman, Kuwait, Indonesia  (B2B discovery)
 *   Tier 3: Malaysia, Vietnam, Thailand, Philippines  (validated expansion)
 *   Manufacturing / Asia priority: China, India, Japan, South Korea, Singapore
 *
 * Every market has its own intro, demand drivers, logistics, compliance notes,
 * FAQs and product focus copy so country pages are not near-duplicate pages.
 * Adding a new market = adding one object here; routes, sitemap and internal
 * links update automatically.
 *
 * Market pages describe Fuji Fenix's export and project supply capability.
 * Local offices, installation or maintenance coverage are confirmed only
 * where a project-specific agreement exists - see the market note component.
 */

import type { FocusSlug } from "@/lib/product-focuses";
import {
  PRIORITY_TIER_COPY,
  PRIORITY_TIER_MARKETS,
  type MarketPriorityTier,
} from "@/lib/market-priority";

export const MARKET_CONTENT_UPDATED = "2026-11-11";

export type MarketWave = "priority" | 1 | 2 | 3;

export type MarketRegion =
  | "East Asia"
  | "South Asia"
  | "Middle East"
  | "Southeast Asia"
  | "Africa";

export interface MarketFaq {
  question: string;
  answer: string;
}

export interface MarketDemandDriver {
  title: string;
  description: string;
}

export interface MarketCompliance {
  standard: string;
  note: string;
}

export interface Market {
  slug: string;
  country: string;
  /** Short name used in H1s and page titles. */
  shortName: string;
  /** ISO 3166-1 alpha-2 code, used for geo metadata. */
  code: string;
  region: MarketRegion;
  wave: MarketWave;
  currency: string;
  languages: string[];
  /** Raw public path - run through getSafeImageUrl before next/image. */
  heroImage: string;
  heroAlt: string;
  /** Two-line H1 for PageHero. */
  headline: string[];
  metaTitle: string;
  metaDescription: string;
  intro: [string, string];
  cities: string[];
  demandDrivers: MarketDemandDriver[];
  projectTypes: string[];
  buyerSegments: string[];
  logistics: {
    ports: string;
    note: string;
  };
  compliance: MarketCompliance[];
  focuses: FocusSlug[];
  focusNotes: Partial<Record<FocusSlug, string>>;
  faqs: MarketFaq[];
  related: string[];
  keywords: string[];
}

export const MARKETS: Market[] = [
  {
    slug: "china",
    country: "China",
    shortName: "China",
    code: "CN",
    region: "East Asia",
    wave: "priority",
    currency: "CNY",
    languages: ["Mandarin Chinese", "English"],
    heroImage: "/Elevators/passenger-elevator/hero.png",
    heroAlt: "Passenger elevator installation by Fuji Fenix",
    headline: ["ELEVATOR & ESCALATOR", "MANUFACTURER IN CHINA"],
    metaTitle: "Elevator Manufacturer in China | Fuji Fenix Shanghai",
    metaDescription:
      "Fuji Fenix manufactures passenger elevators, escalators, moving walks and custom vertical transport systems in Shanghai for projects across China and export markets.",
    intro: [
      "Fuji Fenix is a Shanghai-based manufacturer of elevators, escalators and moving walks. Our product range covers passenger, home, high-speed, panoramic, hospital and freight elevators, together with escalators, moving walks and specialised vertical transportation systems.",
      "For projects in China, we support developers, contractors and consultants with engineered-to-order equipment, technical documentation and factory testing. Export customers are served alongside domestic projects through the same manufacturing and quality process.",
    ],
    cities: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Chengdu", "Hangzhou"],
    demandDrivers: [
      {
        title: "Urban high-rise development",
        description:
          "Residential, office and mixed-use towers in major Chinese cities need efficient core transport, accurate levelling and finishes that match the building's positioning.",
      },
      {
        title: "Transit and public infrastructure",
        description:
          "Metro systems, airports and public buildings require escalators and moving walks designed for long operating hours and continuous passenger flow.",
      },
      {
        title: "Healthcare capacity",
        description:
          "New hospitals, clinics and medical campuses specify bed lifts with priority controls, hygienic finishes and dependable service access.",
      },
      {
        title: "Manufacturing and export",
        description:
          "Overseas developers and distributors source from Chinese factories for engineering flexibility, competitive lead times and export documentation support.",
      },
    ],
    projectTypes: [
      "High-rise residential and office towers",
      "Metro, airport and transit projects",
      "Hospitals and medical campuses",
      "Retail centres and mixed-use developments",
      "Villas and premium residential projects",
    ],
    buyerSegments: [
      "Property developers",
      "EPC and main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and agents",
    ],
    logistics: {
      ports: "Shanghai and Ningbo",
      note:
        "Equipment is prepared for domestic delivery or export packing at our Shanghai manufacturing base. Shipping terms, documentation and site delivery schedules are confirmed per order.",
    },
    compliance: [
      {
        standard: "GB/T 7588 series",
        note:
          "China's lift safety standard series. Applicability and the required type-test documentation are confirmed with the project's lift authority.",
      },
      {
        standard: "Special equipment regulation",
        note:
          "Installation and acceptance follow the local market supervision and lift registration process. Responsibilities are agreed with the appointed installation partner.",
      },
      {
        standard: "Project specification",
        note:
          "Fire, structural, acoustic and finish requirements from the project consultant are incorporated into the approved drawings.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "high-speed-elevators",
      "escalators",
      "moving-walks",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Chinese residential, office and mixed-use towers are configured around traffic analysis, core efficiency and low-noise operation. Machine-room and machine-room-less layouts are matched to each building's shaft design.",
      "high-speed-elevators":
        "For tall buildings in Shanghai, Shenzhen and other major cities, high-speed gearless traction systems are configured for ride comfort, energy efficiency and group or destination control.",
      escalators:
        "Escalators for Chinese retail, transit and commercial projects are specified with heavy-duty drives and safety features suited to continuous public operation.",
      "moving-walks":
        "Moving walks support Chinese airport, metro and large-format retail projects where level passenger movement and high throughput are required.",
    },
    faqs: [
      {
        question: "Where are Fuji Fenix elevators manufactured?",
        answer:
          "Our manufacturing base is in Jinshan District, Shanghai. Production covers passenger, home, high-speed, panoramic, hospital and freight elevators, plus escalators, moving walks and specialised systems.",
      },
      {
        question: "Can overseas buyers visit the factory?",
        answer:
          "Yes. Factory visits, product reviews and pre-shipment inspections can be arranged by appointment. Our team coordinates the visit with the project's technical and commercial requirements.",
      },
      {
        question: "Which standards apply to an export order from China?",
        answer:
          "Export projects normally follow the destination market's standards and approval process. Where Chinese standards or additional certifications are requested, the applicable documentation is agreed during contract review.",
      },
      {
        question: "How do I request a quotation for a project in China?",
        answer:
          "Share the project location, building type, number of stops, expected traffic, shaft dimensions and target timeline. Our engineering team will confirm the configuration and documentation requirements.",
      },
    ],
    related: ["india", "pakistan", "vietnam"],
    keywords: [
      "elevator manufacturer China",
      "elevator factory Shanghai",
      "elevator exporter China",
      "wholesale elevator supplier",
    ],
  },

  {
    slug: "india",
    country: "India",
    shortName: "India",
    code: "IN",
    region: "South Asia",
    wave: "priority",
    currency: "INR",
    languages: ["English", "Hindi"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "High-rise elevator installation for a modern city project",
    headline: ["ELEVATORS & ESCALATORS", "FOR INDIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in India | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for residential, commercial, healthcare and transit projects across India.",
    intro: [
      "India's fast-growing cities combine high-rise housing, expanding metro networks and new healthcare and retail capacity. Each building type places different demands on vertical transportation, from passenger handling and energy use to bed access and heavy goods movement.",
      "Fuji Fenix supports Indian developers, contractors and elevator partners with engineered equipment, project drawings and export documentation. Equipment is configured to the project's specification and the applicable Indian standards, with installation and service arrangements agreed locally.",
    ],
    cities: ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Ahmedabad"],
    demandDrivers: [
      {
        title: "High-rise residential growth",
        description:
          "Dense urban housing projects require reliable passenger lifts, efficient core planning and finishes that appeal to buyers in competitive developments.",
      },
      {
        title: "Metro and transit expansion",
        description:
          "New metro lines, stations and transport hubs need escalators and moving walks built for heavy daily use and public safety requirements.",
      },
      {
        title: "Healthcare investment",
        description:
          "Private and public hospitals are adding bed elevators, priority controls and hygienic cabin finishes to support patient transport.",
      },
      {
        title: "Commercial and retail",
        description:
          "Offices, malls and mixed-use centres specify group-controlled passenger lifts and escalators sized for peak footfall.",
      },
    ],
    projectTypes: [
      "High-rise residential towers",
      "Metro stations and transit infrastructure",
      "Hospitals and diagnostic centres",
      "Shopping malls and retail centres",
      "Office and mixed-use developments",
    ],
    buyerSegments: [
      "Real estate developers",
      "Main contractors and EPC companies",
      "MEP and lift consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Nhava Sheva (JNPT), Mundra and Chennai",
      note:
        "Export shipments are coordinated through the port that best serves the project's inland destination. Packing, documentation and delivery schedules are confirmed with the buyer and freight forwarder.",
    },
    compliance: [
      {
        standard: "IS 14665 series",
        note:
          "Indian standards for electric traction lifts. The applicable parts and the required test documentation are confirmed with the project's lift inspector.",
      },
      {
        standard: "National Building Code (NBC) 2016",
        note:
          "Building and fire-safety requirements that influence shaft design, lobby protection, signage and emergency operation.",
      },
      {
        standard: "State lift authority",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant state or municipal lift rules.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Indian residential and commercial towers are configured around traffic peaks, shaft efficiency and dependable operation through voltage and temperature variations. Group control options support high-density cores.",
      "home-elevators":
        "Home lifts for Indian villas and duplexes combine compact equipment, customised cabins and residential safety features. Site surveys confirm shaft, pit and overhead requirements before manufacture.",
      "hospital-elevators":
        "Hospital bed lifts for Indian healthcare projects are specified with stretcher access, priority controls and easy-clean finishes. Redundancy and service planning are reviewed with the facility team.",
      escalators:
        "Escalators for Indian metro stations, malls and transport hubs are selected for high passenger volumes, continuous duty and public safety compliance.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to projects in India?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Indian projects through developers, contractors and local elevator partners. Installation and statutory approvals are coordinated with the appointed local agency.",
      },
      {
        question: "Are home lifts available for Indian villas?",
        answer:
          "Yes. Compact home elevator systems are available for villas, duplexes and residential retrofits. A site survey confirms the shaft, pit, overhead and power requirements before the final configuration is issued.",
      },
      {
        question: "Which Indian standards should be specified?",
        answer:
          "Projects commonly reference the IS 14665 series, the National Building Code and state lift rules. The final compliance matrix is confirmed with the project consultant and local lift inspector.",
      },
      {
        question: "How are spare parts and service handled?",
        answer:
          "A recommended spare-parts list and maintenance guidance are supplied with the equipment. Service can be delivered by the buyer's team or an appointed local partner, with factory support where required.",
      },
    ],
    related: ["pakistan", "bangladesh", "uae"],
    keywords: [
      "elevator supplier India",
      "passenger elevator manufacturer India",
      "home lift supplier India",
      "escalator supplier India",
    ],
  },

  {
    slug: "pakistan",
    country: "Pakistan",
    shortName: "Pakistan",
    code: "PK",
    region: "South Asia",
    wave: 1,
    currency: "PKR",
    languages: ["Urdu", "English"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "Commercial building exterior for a modern project",
    headline: ["ELEVATORS & ESCALATORS", "FOR PAKISTAN PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Pakistan | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators for housing, commercial, healthcare and industrial projects across Pakistan.",
    intro: [
      "Pakistan's major cities are building upward, with residential towers, commercial centres and healthcare facilities adding floors and capacity. Reliable lifts and escalators are essential to how these buildings operate day to day.",
      "Fuji Fenix works with Pakistani developers, contractors and elevator companies to supply engineered equipment, project drawings and export documentation. Configurations are aligned with the project specification and the applicable local building and lift requirements.",
    ],
    cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"],
    demandDrivers: [
      {
        title: "Urban housing demand",
        description:
          "Karachi, Lahore and Islamabad continue to add apartment towers and mixed-use developments that depend on efficient passenger lift cores.",
      },
      {
        title: "Commercial and retail growth",
        description:
          "Offices, shopping centres and hotels require group-controlled passenger lifts and escalators sized for peak visitor traffic.",
      },
      {
        title: "Healthcare expansion",
        description:
          "New private hospitals and clinics specify bed elevators with priority control, stretcher access and hygienic finishes.",
      },
      {
        title: "Industrial and logistics projects",
        description:
          "Factories, warehouses and distribution facilities need freight lifts for goods, pallets and handling equipment.",
      },
    ],
    projectTypes: [
      "Residential apartment towers",
      "Commercial and office buildings",
      "Hospitals and clinics",
      "Shopping centres and retail",
      "Factories and warehouses",
    ],
    buyerSegments: [
      "Property developers",
      "Construction contractors",
      "Hospital and facility owners",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Karachi Port and Port Qasim",
      note:
        "Shipments are typically consolidated through Karachi Port or Port Qasim, with inland delivery coordinated to Lahore, Islamabad and other project cities. Packing and customs documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Provincial building codes",
        note:
          "Building and fire requirements vary by province and development authority. The applicable code is confirmed with the project's consultant and local authority.",
      },
      {
        standard: "PSQCA and local approvals",
        note:
          "Where Pakistan Standards apply, the required documentation is reviewed during contract planning. Lift installation approvals are handled locally.",
      },
      {
        standard: "Project specification",
        note:
          "Structural, electrical, acoustic and finish requirements are incorporated into the approved layout and interface drawings.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Pakistani apartment and commercial buildings are configured for reliable daily use, efficient cores and finishes suited to the project's market positioning.",
      "home-elevators":
        "Home lifts for Pakistani villas and multi-storey houses offer compact layouts, customised cabins and residential safety features. Existing-house retrofits are assessed by site survey.",
      "hospital-elevators":
        "Hospital bed elevators are configured for stretcher and bed access, priority operation and easy-clean finishes for Pakistani healthcare facilities.",
      "freight-elevators":
        "Freight lifts for Pakistani factories and warehouses are engineered around pallet sizes, trolley loads and the loading equipment used at each facility.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Pakistan?",
        answer:
          "Yes. We supply elevator and escalator systems to Pakistani projects through developers, contractors and local elevator partners. Installation and local approvals are coordinated with the appointed partner.",
      },
      {
        question: "Can I buy a home lift for an existing house in Pakistan?",
        answer:
          "In many cases yes, subject to a site survey. Compact machine-room-less systems or self-supporting structures can reduce building work where space is limited.",
      },
      {
        question: "Which standards apply to lifts in Pakistan?",
        answer:
          "Requirements depend on the province, development authority and project specification. The compliance matrix is confirmed with the project consultant and the local lift inspection authority.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery depends on the approved configuration, quantity, finish selection and shipping schedule. A project-specific production and shipping plan is issued with the quotation.",
      },
    ],
    related: ["india", "uae", "saudi-arabia"],
    keywords: [
      "elevator supplier Pakistan",
      "elevator manufacturer Lahore",
      "home lift Pakistan",
      "hospital elevator supplier Pakistan",
    ],
  },

  {
    slug: "uae",
    country: "United Arab Emirates",
    shortName: "UAE",
    code: "AE",
    region: "Middle East",
    wave: 1,
    currency: "AED",
    languages: ["Arabic", "English"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "High-rise development in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR UAE & DUBAI PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in UAE & Dubai | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, panoramic, home and high-speed elevators plus escalators for towers, hotels, malls and villas across Dubai, Abu Dhabi and the UAE.",
    intro: [
      "The UAE combines landmark towers, hospitality-led development, large retail destinations and premium villa communities. Each project type has its own expectations for elevator performance, cabin design and passenger experience.",
      "Fuji Fenix supports UAE developers, contractors and vertical transport consultants with engineered elevator and escalator systems, technical drawings and export documentation. Equipment is configured to the project specification and the approval requirements of the relevant emirate.",
    ],
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    demandDrivers: [
      {
        title: "Tower and mixed-use pipeline",
        description:
          "Residential and commercial towers require efficient passenger cores, high-speed options and finishes that match premium building positioning.",
      },
      {
        title: "Hospitality and tourism",
        description:
          "Hotels, resorts and serviced apartments specify panoramic lifts, smooth ride quality and cabin designs coordinated with interior architecture.",
      },
      {
        title: "Retail and leisure destinations",
        description:
          "Malls and mixed-use centres need escalators and moving walks sized for high footfall and long operating hours.",
      },
      {
        title: "Villas and community living",
        description:
          "Premium villas and townhouse communities increasingly include home lifts as part of accessible, multi-generation living.",
      },
    ],
    projectTypes: [
      "High-rise residential and commercial towers",
      "Hotels, resorts and serviced apartments",
      "Shopping malls and mixed-use destinations",
      "Hospitals and healthcare facilities",
      "Luxury villas and residential communities",
    ],
    buyerSegments: [
      "Master developers",
      "Main contractors and fit-out companies",
      "Vertical transport and MEP consultants",
      "Elevator distributors and service providers",
    ],
    logistics: {
      ports: "Jebel Ali Port and Khalifa Port",
      note:
        "Equipment is shipped through Jebel Ali or Khalifa Port and delivered to site against the project's construction programme. Export packing, documentation and delivery sequencing are agreed with the contractor.",
    },
    compliance: [
      {
        standard: "EN 81-20 / EN 81-50",
        note:
          "Commonly specified for UAE projects. Applicability and any additional requirements are confirmed with the project consultant and authority.",
      },
      {
        standard: "UAE Fire and Life Safety Code",
        note:
          "Fire-fighting lift, lobby protection, signage and emergency operation requirements are incorporated where the project requires them.",
      },
      {
        standard: "Dubai Municipality / Abu Dhabi approvals",
        note:
          "Approval routes differ by emirate. The appointed local installer and consultant manage authority submissions, with factory documentation provided as required.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "panoramic-elevators",
      "home-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for UAE towers are configured for high handling capacity, smooth ride quality and premium cabin finishes. Group control and high-speed options support tall residential and commercial cores.",
      "panoramic-elevators":
        "Panoramic lifts for UAE hotels, atriums and retail destinations combine glass cabins, feature lighting and finishes coordinated with interior designers.",
      "home-elevators":
        "Home lifts for UAE villas and townhouses combine compact MRL equipment, customised cabins and residential safety features suited to premium homes.",
      escalators:
        "Escalators for UAE malls, airports and commercial destinations are specified for high footfall, continuous duty and architectural integration.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Dubai and Abu Dhabi?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to UAE projects through developers, contractors and local partners. Installation and authority approvals are managed by the appointed local team.",
      },
      {
        question: "Are villa lifts available for UAE homes?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, with cabin finishes selected to complement the interior. A site survey confirms shaft and installation requirements.",
      },
      {
        question: "Which standards are commonly required in the UAE?",
        answer:
          "EN 81-20/50 is commonly referenced, together with the UAE Fire and Life Safety Code and emirate-specific approval requirements. The final compliance matrix is confirmed with the consultant.",
      },
      {
        question: "Can panoramic elevators be customised?",
        answer:
          "Yes, within engineering limits. Cabin shape, glazing, frames, lighting and finishes are developed with the architect and confirmed against structural and safety requirements.",
      },
    ],
    related: ["saudi-arabia", "qatar", "oman"],
    keywords: [
      "elevator supplier Dubai",
      "elevator supplier UAE",
      "villa lift UAE",
      "escalator supplier Dubai",
    ],
  },

  {
    slug: "saudi-arabia",
    country: "Saudi Arabia",
    shortName: "Saudi Arabia",
    code: "SA",
    region: "Middle East",
    wave: 1,
    currency: "SAR",
    languages: ["Arabic", "English"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "Large-scale construction project in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR SAUDI PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Saudi Arabia | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies high-speed, passenger, hospital and freight elevators plus escalators for Saudi towers, hospitals and retail projects.",
    intro: [
      "Saudi Arabia is delivering an extraordinary pipeline of giga-projects, urban developments, hospitality capacity and healthcare infrastructure under Vision 2030. Vertical transportation is a critical part of making these projects efficient and accessible.",
      "Fuji Fenix supports Saudi developers, EPC contractors and consultants with high-speed and passenger elevators, hospital bed lifts, freight systems and escalators. Equipment is engineered to the project specification and the applicable Saudi approval requirements.",
    ],
    cities: ["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah", "NEOM region"],
    demandDrivers: [
      {
        title: "Vision 2030 giga-projects",
        description:
          "Large-scale developments require coordinated elevator packages, high-speed options and documentation that supports complex consultant and EPC workflows.",
      },
      {
        title: "Hospitality and religious tourism",
        description:
          "Hotels and pilgrimage-related facilities in Makkah and Madinah need reliable passenger lifts, group control and premium finishes.",
      },
      {
        title: "Healthcare infrastructure",
        description:
          "New hospitals and medical cities specify bed elevators with priority controls, infection-control finishes and service access planning.",
      },
      {
        title: "Retail, logistics and industry",
        description:
          "Malls, distribution centres and factories require escalators, moving walks and freight lifts sized for high throughput.",
      },
    ],
    projectTypes: [
      "Giga-projects and master developments",
      "High-rise residential and commercial towers",
      "Hospitals and medical cities",
      "Hotels and pilgrimage infrastructure",
      "Retail centres and logistics facilities",
    ],
    buyerSegments: [
      "Giga-project developers",
      "EPC contractors",
      "Design and MEP consultants",
      "Elevator distributors and installation partners",
    ],
    logistics: {
      ports: "Jeddah Islamic Port, King Abdullah Port and Dammam",
      note:
        "Port selection depends on the project location and construction programme. Export packing, customs documentation and phased site delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "Saudi Building Code (SBC)",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "SASO requirements",
        note:
          "Product conformity and documentation requirements are reviewed during contract planning and confirmed with the importer.",
      },
      {
        standard: "EN 81-20 / EN 81-50",
        note:
          "Commonly specified for elevator safety. Any additional local requirements are confirmed with the project consultant and Civil Defense.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "high-speed-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Saudi towers and mixed-use projects are configured for high traffic, group control and finishes suited to premium developments.",
      "high-speed-elevators":
        "High-speed systems for Saudi towers and landmark developments use gearless traction, VVVF drives and destination control options for efficient passenger flow.",
      "hospital-elevators":
        "Hospital bed elevators for Saudi healthcare projects include stretcher access, priority operation, hygienic finishes and service planning for critical facilities.",
      escalators:
        "Escalators for Saudi malls, airports and public buildings are specified for high throughput, continuous operation and integration with the architectural design.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Saudi Arabia?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Saudi projects through developers, EPC contractors and local partners. Installation and authority approvals are coordinated with the appointed local team.",
      },
      {
        question: "Can you support giga-project documentation requirements?",
        answer:
          "Our team can prepare technical drawings, product data, test documentation and export paperwork to the project's specification. Document formats and approval workflows are agreed during contract review.",
      },
      {
        question: "Which standards are required for Saudi projects?",
        answer:
          "Projects commonly reference the Saudi Building Code, SASO requirements, EN 81-20/50 and Civil Defense rules. The final compliance matrix is confirmed with the consultant and local authority.",
      },
      {
        question: "Are hospital elevators available for Saudi healthcare projects?",
        answer:
          "Yes. Bed elevators can be configured for stretcher access, priority control, hygienic finishes and emergency operation where the building provides the required power supply.",
      },
    ],
    related: ["uae", "qatar", "kuwait"],
    keywords: [
      "elevator supplier Saudi Arabia",
      "elevator supplier Riyadh",
      "hospital elevator Saudi Arabia",
      "escalator supplier Jeddah",
    ],
  },

  {
    slug: "qatar",
    country: "Qatar",
    shortName: "Qatar",
    code: "QA",
    region: "Middle East",
    wave: 2,
    currency: "QAR",
    languages: ["Arabic", "English"],
    heroImage: "/panoramic.jpg",
    heroAlt: "Modern architectural development with panoramic glazing",
    headline: ["ELEVATORS & ESCALATORS", "FOR QATAR PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Qatar | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, panoramic, home and hospital elevators plus escalators for towers, hotels, malls and villas in Doha, Lusail and across Qatar.",
    intro: [
      "Qatar's development programme has created a skyline of towers, hotels, retail destinations and public facilities, with Lusail and Doha continuing to add mixed-use and residential capacity. Vertical transportation must combine reliability with design quality.",
      "Fuji Fenix supports Qatari developers, contractors and consultants with passenger, panoramic and home elevators, hospital lifts and escalators. Configurations are aligned with the project specification and Qatar's construction and approval requirements.",
    ],
    cities: ["Doha", "Lusail", "Al Wakrah", "Al Khor", "Al Rayyan"],
    demandDrivers: [
      {
        title: "Lusail and Doha growth",
        description:
          "Mixed-use districts and residential towers require efficient lift cores, group control and finishes that match premium developments.",
      },
      {
        title: "Hospitality and tourism",
        description:
          "Hotels and serviced apartments specify panoramic lifts and smooth ride quality as part of the guest experience.",
      },
      {
        title: "Retail and public facilities",
        description:
          "Malls, museums and public buildings need escalators and moving walks designed for high footfall and continuous operation.",
      },
      {
        title: "Healthcare and education",
        description:
          "Hospitals, clinics and campuses specify bed lifts, accessibility features and dependable service access.",
      },
    ],
    projectTypes: [
      "Residential and mixed-use towers",
      "Hotels and serviced apartments",
      "Shopping malls and retail",
      "Hospitals and healthcare facilities",
      "Villas and premium residences",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Hamad Port",
      note:
        "Equipment is shipped through Hamad Port and delivered against the project's construction schedule. Export packing and documentation are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "Qatar Construction Specifications (QCS)",
        note:
          "Project specifications commonly reference QCS requirements for vertical transportation and related building works.",
      },
      {
        standard: "EN 81-20 / EN 81-50",
        note:
          "Commonly specified for elevator safety. Additional requirements are confirmed with the consultant and Ministry of Municipality.",
      },
      {
        standard: "Civil Defence requirements",
        note:
          "Fire-fighting lift, lobby protection and emergency operation requirements are incorporated where the project requires them.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "panoramic-elevators",
      "escalators",
      "home-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Qatari towers and mixed-use buildings are configured for efficient traffic handling, smooth ride quality and premium finishes.",
      "panoramic-elevators":
        "Panoramic lifts for Qatari hotels, atriums and retail destinations combine glass cabins, feature lighting and architectural finishes.",
      escalators:
        "Escalators for Qatari malls, hotels and public buildings are specified for high footfall, continuous duty and design integration.",
      "home-elevators":
        "Home lifts for Qatari villas and premium residences combine compact equipment, customised cabins and residential safety features.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Qatar?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Qatari projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Are panoramic lifts suitable for Qatari hotels?",
        answer:
          "Yes. Glass cabins, curved or custom geometries, feature lighting and finishes can be developed with the architect and confirmed against structural and safety requirements.",
      },
      {
        question: "Which standards are commonly specified in Qatar?",
        answer:
          "Qatar Construction Specifications, EN 81-20/50 and Civil Defence requirements are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply villa lifts in Qatar?",
        answer:
          "Yes. Compact home elevators are available for villas and premium residences. A site survey confirms shaft, pit, overhead and power requirements before manufacture.",
      },
    ],
    related: ["uae", "oman", "kuwait"],
    keywords: [
      "elevator supplier Qatar",
      "elevator supplier Doha",
      "panoramic elevator Qatar",
      "villa lift Qatar",
    ],
  },

  {
    slug: "oman",
    country: "Oman",
    shortName: "Oman",
    code: "OM",
    region: "Middle East",
    wave: 2,
    currency: "OMR",
    languages: ["Arabic", "English"],
    heroImage: "/escalator.jpg",
    heroAlt: "Commercial escalator installation in a retail environment",
    headline: ["ELEVATORS & ESCALATORS", "FOR OMAN PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Oman | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, freight and hospital elevators plus escalators for Oman's urban, tourism, logistics and healthcare projects.",
    intro: [
      "Oman's Vision 2040 programme is supporting urban development, tourism, logistics and healthcare investment across Muscat, Salalah, Sohar and Duqm. Buildings in these markets need vertical transportation that performs in demanding climates and operating conditions.",
      "Fuji Fenix supports Omani developers, contractors and elevator partners with engineered passenger, home, freight and hospital lifts, together with escalators. Equipment is configured to the project specification and the applicable Omani requirements.",
    ],
    cities: ["Muscat", "Salalah", "Sohar", "Duqm", "Nizwa"],
    demandDrivers: [
      {
        title: "Vision 2040 development",
        description:
          "Urban expansion, tourism projects and public infrastructure are adding hotels, residences, retail and institutional buildings.",
      },
      {
        title: "Tourism and hospitality",
        description:
          "Hotels and resorts require reliable passenger lifts, panoramic options and finishes suited to premium guest areas.",
      },
      {
        title: "Logistics and industry",
        description:
          "Ports and industrial zones in Sohar and Duqm need freight lifts and heavy-duty vertical transport for goods and equipment.",
      },
      {
        title: "Healthcare and education",
        description:
          "Hospitals, clinics and campuses specify bed lifts, accessibility features and dependable service access.",
      },
    ],
    projectTypes: [
      "Hotels and tourism developments",
      "Residential and mixed-use buildings",
      "Port and logistics facilities",
      "Hospitals and healthcare facilities",
      "Retail and public buildings",
    ],
    buyerSegments: [
      "Developers and property owners",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Sohar Port, Salalah Port and Duqm Port",
      note:
        "Port selection depends on the project location and construction schedule. Export packing, documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "Oman Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "EN 81-20 / EN 81-50",
        note:
          "Commonly specified for elevator safety. Additional requirements are confirmed with the project consultant and local authority.",
      },
      {
        standard: "Ministry and Civil Defence approvals",
        note:
          "Approval routes are managed by the appointed local installer and consultant, with factory documentation provided as required.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "escalators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Omani hotels, offices and residential buildings are configured for reliable operation in high-temperature environments, with finishes suited to the project.",
      "home-elevators":
        "Home lifts for Omani villas and low-rise residences combine compact equipment, customised cabins and residential safety features.",
      escalators:
        "Escalators for Omani malls, hotels and public buildings are specified for continuous duty, passenger safety and architectural integration.",
      "freight-elevators":
        "Freight lifts for Omani ports, warehouses and industrial facilities are engineered around the loads, pallets and handling equipment used on site.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Oman?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Omani projects through developers, contractors and local partners. Installation and local approvals are coordinated with the appointed team.",
      },
      {
        question: "Are your systems suitable for Oman's climate?",
        answer:
          "Equipment configurations consider the site environment, including temperature and humidity. Protection, ventilation and material selections are confirmed with the project's mechanical and electrical consultants.",
      },
      {
        question: "Which standards are commonly required in Oman?",
        answer:
          "The Oman Building Code, EN 81-20/50 and Civil Defence requirements are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply freight lifts for port and logistics projects?",
        answer:
          "Yes. Freight elevators can be configured for pallets, trolleys, equipment and heavy goods, with load ratings and platform dimensions confirmed during engineering.",
      },
    ],
    related: ["uae", "qatar", "kuwait"],
    keywords: [
      "elevator supplier Oman",
      "elevator supplier Muscat",
      "freight elevator Oman",
      "escalator supplier Oman",
    ],
  },

  {
    slug: "kuwait",
    country: "Kuwait",
    shortName: "Kuwait",
    code: "KW",
    region: "Middle East",
    wave: 2,
    currency: "KWD",
    languages: ["Arabic", "English"],
    heroImage: "/about-lobby.jpg",
    heroAlt: "Premium lobby and elevator interior",
    headline: ["ELEVATORS & ESCALATORS", "FOR KUWAIT PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Kuwait | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, car and hospital elevators plus escalators for residential, commercial, retail and healthcare projects across Kuwait.",
    intro: [
      "Kuwait's Vision 2035 programme and a resilient residential and retail market continue to drive new towers, mixed-use centres and healthcare facilities. Building owners expect reliable operation, efficient cores and finishes that reflect the project's quality.",
      "Fuji Fenix supports Kuwaiti developers, contractors and elevator partners with passenger, home, car and hospital elevators, together with escalators. Equipment is configured to the project specification and the applicable Kuwaiti requirements.",
    ],
    cities: ["Kuwait City", "Salmiya", "Hawalli", "Al Ahmadi", "Jahra"],
    demandDrivers: [
      {
        title: "Residential and mixed-use towers",
        description:
          "Apartment towers and mixed-use developments require efficient passenger lift cores, group control and durable finishes.",
      },
      {
        title: "Retail and leisure",
        description:
          "Malls and retail centres need escalators and moving walks sized for high footfall and continuous operation.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with priority controls, hygienic finishes and service access planning.",
      },
      {
        title: "Premium villas and car lifts",
        description:
          "Luxury homes and showrooms increasingly include home lifts and vehicle elevators as part of the building design.",
      },
    ],
    projectTypes: [
      "Residential towers and mixed-use buildings",
      "Shopping malls and retail centres",
      "Hospitals and clinics",
      "Luxury villas and residences",
      "Showrooms and automotive facilities",
    ],
    buyerSegments: [
      "Developers and property owners",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Shuwaikh Port, Shuaiba Port and Doha Port",
      note:
        "Equipment is shipped through the port best suited to the project schedule and delivered to site against the construction programme. Packing and documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Kuwait Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "EN 81-20 / EN 81-50",
        note:
          "Commonly specified for elevator safety. Additional requirements are confirmed with the project consultant and municipality.",
      },
      {
        standard: "Fire Department approvals",
        note:
          "Fire-fighting lift, lobby protection and emergency operation requirements are incorporated where the project requires them.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "escalators",
      "car-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Kuwaiti towers and mixed-use buildings are configured for efficient traffic handling, durability and finishes suited to the project.",
      "home-elevators":
        "Home lifts for Kuwaiti villas and premium residences combine compact equipment, customised cabins and residential safety features.",
      escalators:
        "Escalators for Kuwaiti malls and retail centres are specified for high footfall, continuous duty and architectural integration.",
      "car-elevators":
        "Car elevators for Kuwaiti showrooms and luxury garages are engineered around vehicle dimensions, parking flow and the building's structural constraints.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Kuwait?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Kuwaiti projects through developers, contractors and local partners. Installation and local approvals are coordinated with the appointed team.",
      },
      {
        question: "Are car elevators available for showrooms and villas?",
        answer:
          "Yes. Vehicle lifts can be configured for showrooms, dealerships, workshops and luxury residences, with platform dimensions and load ratings based on the vehicles expected.",
      },
      {
        question: "Which standards are commonly required in Kuwait?",
        answer:
          "The Kuwait Building Code, EN 81-20/50 and Fire Department requirements are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply home lifts for existing villas?",
        answer:
          "In many cases yes, subject to a site survey. Compact MRL systems or self-supporting structures can reduce building work where space is limited.",
      },
    ],
    related: ["saudi-arabia", "qatar", "oman"],
    keywords: [
      "elevator supplier Kuwait",
      "car elevator Kuwait",
      "home lift Kuwait",
      "escalator supplier Kuwait",
    ],
  },

  {
    slug: "bangladesh",
    country: "Bangladesh",
    shortName: "Bangladesh",
    code: "BD",
    region: "South Asia",
    wave: 2,
    currency: "BDT",
    languages: ["Bengali", "English"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "High-rise building project in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR BANGLADESH PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Bangladesh | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Dhaka's towers, hospitals, factories and commercial projects.",
    intro: [
      "Dhaka and Chattogram are growing vertically, with residential towers, commercial buildings, hospitals and industrial facilities adding capacity. Dense sites and high passenger volumes place a premium on reliable, space-efficient vertical transportation.",
      "Fuji Fenix supports Bangladeshi developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Bangladeshi building and lift requirements.",
    ],
    cities: ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi"],
    demandDrivers: [
      {
        title: "Dense urban development",
        description:
          "Apartment towers and mixed-use buildings in Dhaka require efficient lift cores, reliable operation and durable finishes.",
      },
      {
        title: "Industrial and garment facilities",
        description:
          "Factories and warehouses need freight lifts for materials, cartons and handling equipment, with safety and duty cycles matched to the operation.",
      },
      {
        title: "Healthcare expansion",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Retail and commercial",
        description:
          "Shopping centres and office buildings need passenger lifts, escalators and group control sized for peak footfall.",
      },
    ],
    projectTypes: [
      "Residential apartment towers",
      "Commercial and office buildings",
      "Hospitals and clinics",
      "Factories and warehouses",
      "Shopping centres and retail",
    ],
    buyerSegments: [
      "Real estate developers",
      "Construction contractors",
      "Factory and facility owners",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Chattogram Port and Mongla Port",
      note:
        "Shipments are typically handled through Chattogram Port, with inland delivery coordinated to Dhaka and other project locations. Packing and customs documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Bangladesh National Building Code (BNBC) 2020",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "BSTI requirements",
        note:
          "Where Bangladeshi standards apply, the required product documentation is reviewed during contract planning.",
      },
      {
        standard: "RAJUK and local approvals",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant development authority rules.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Bangladeshi apartment and commercial buildings are configured for dense traffic, efficient cores and durable finishes.",
      "home-elevators":
        "Home lifts for Bangladeshi villas and duplexes combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Bangladeshi healthcare projects are configured for stretcher access, priority controls and easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Bangladeshi factories and warehouses are engineered around carton sizes, trolley loads and the handling equipment used at each facility.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Bangladesh?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Bangladeshi projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Can you supply freight lifts for garment factories?",
        answer:
          "Yes. Freight elevators can be configured for cartons, materials and trolleys, with capacity, platform dimensions and door requirements confirmed during engineering.",
      },
      {
        question: "Which standards are commonly required in Bangladesh?",
        answer:
          "The Bangladesh National Building Code, BSTI requirements and RAJUK or local authority rules are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Are home lifts available in Bangladesh?",
        answer:
          "Yes. Compact home elevators are available for villas and duplexes, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
    ],
    related: ["india", "pakistan", "malaysia"],
    keywords: [
      "elevator supplier Bangladesh",
      "elevator supplier Dhaka",
      "freight elevator Bangladesh",
      "hospital elevator Dhaka",
    ],
  },

  {
    slug: "indonesia",
    country: "Indonesia",
    shortName: "Indonesia",
    code: "ID",
    region: "Southeast Asia",
    wave: 2,
    currency: "IDR",
    languages: ["Indonesian", "English"],
    heroImage: "/escalator.jpg",
    heroAlt: "Escalator installation in a retail centre",
    headline: ["ELEVATORS & ESCALATORS", "FOR INDONESIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Indonesia | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and panoramic elevators plus escalators and moving walks for projects across Jakarta, Surabaya and Indonesia.",
    intro: [
      "Indonesia combines dense urban growth in Jakarta and Surabaya with tourism-led development in Bali and the long-term build-out of the new capital, Nusantara. Each context brings different requirements for passenger flow, climate resilience and building design.",
      "Fuji Fenix supports Indonesian developers, contractors and elevator partners with passenger, home, hospital and panoramic elevators, plus escalators and moving walks. Equipment is configured to the project specification and the applicable Indonesian requirements.",
    ],
    cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Denpasar", "Balikpapan"],
    demandDrivers: [
      {
        title: "Jakarta high-rise development",
        description:
          "Residential, office and mixed-use towers require efficient passenger cores, group control and durable finishes.",
      },
      {
        title: "Nusantara capital programme",
        description:
          "The new capital and supporting infrastructure create demand for public buildings, housing and transport facilities.",
      },
      {
        title: "Tourism and hospitality",
        description:
          "Hotels and resorts in Bali and other destinations specify panoramic lifts and finishes suited to guest areas.",
      },
      {
        title: "Healthcare and retail",
        description:
          "Hospitals, clinics and malls need bed lifts, escalators and moving walks sized for high footfall.",
      },
    ],
    projectTypes: [
      "Residential and office towers",
      "Hotels and resorts",
      "Hospitals and healthcare facilities",
      "Shopping malls and retail",
      "Transport and public buildings",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Tanjung Priok, Tanjung Perak and Belawan",
      note:
        "Port selection depends on the project island and construction schedule. Export packing, documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "SNI standards",
        note:
          "Indonesian national standards for elevators and escalators. The applicable clauses and test documentation are confirmed with the project consultant.",
      },
      {
        standard: "Indonesian Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "Local Dinas approvals",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant municipal rules.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "escalators",
      "moving-walks",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Indonesian towers are configured for dense traffic, humidity and reliable daily operation, with cabin finishes suited to the project.",
      "home-elevators":
        "Home lifts for Indonesian villas and residences combine compact equipment, customised cabins and residential safety features.",
      escalators:
        "Escalators for Indonesian malls, hotels and public buildings are specified for high footfall, continuous duty and architectural integration.",
      "moving-walks":
        "Moving walks support Indonesian airports, transit hubs and large retail projects where level passenger movement and high throughput are required.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Indonesia?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Indonesian projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Are your systems suited to Indonesia's climate?",
        answer:
          "Equipment configurations consider humidity, temperature and ventilation. Material and protection selections are confirmed with the project's mechanical and electrical consultants.",
      },
      {
        question: "Can you supply moving walks for airports?",
        answer:
          "Yes. Horizontal and inclined moving walks can be configured for airports, transit hubs and large public buildings, with pallet width and drive capacity matched to passenger volumes.",
      },
      {
        question: "Which standards are commonly required in Indonesia?",
        answer:
          "SNI standards, the Indonesian Building Code and local Dinas requirements are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
    ],
    related: ["malaysia", "vietnam", "india"],
    keywords: [
      "elevator supplier Indonesia",
      "elevator supplier Jakarta",
      "escalator supplier Indonesia",
      "moving walk Indonesia",
    ],
  },

  {
    slug: "malaysia",
    country: "Malaysia",
    shortName: "Malaysia",
    code: "MY",
    region: "Southeast Asia",
    wave: 3,
    currency: "MYR",
    languages: ["Malay", "English"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "High-rise development in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR MALAYSIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Malaysia | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and panoramic elevators plus escalators for high-rise, transit, healthcare and retail projects across Malaysia.",
    intro: [
      "Malaysia's urban centres combine high-rise residential and commercial development with transit-oriented projects, healthcare investment and a mature retail market. Building owners expect reliable equipment, efficient cores and finishes that suit the project's positioning.",
      "Fuji Fenix supports Malaysian developers, contractors and elevator partners with passenger, home, hospital and panoramic elevators, plus escalators. Equipment is configured to the project specification and the applicable Malaysian requirements.",
    ],
    cities: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu", "Ipoh"],
    demandDrivers: [
      {
        title: "Kuala Lumpur high-rise",
        description:
          "Residential and commercial towers require efficient passenger lift cores, group control and premium finishes.",
      },
      {
        title: "Transit-oriented development",
        description:
          "Rail and transit projects need escalators, moving walks and passenger lifts designed for high footfall and continuous operation.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and medical centres specify bed elevators with priority controls, hygienic finishes and service access planning.",
      },
      {
        title: "Retail and tourism",
        description:
          "Malls, hotels and mixed-use destinations need escalators and panoramic lifts that support the visitor experience.",
      },
    ],
    projectTypes: [
      "High-rise residential and commercial towers",
      "Transit and transport infrastructure",
      "Hospitals and medical centres",
      "Shopping malls and retail",
      "Hotels and mixed-use developments",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Port Klang, Penang Port and Johor Port",
      note:
        "Equipment is shipped through the port best suited to the project location and delivered against the construction schedule. Packing and documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Malaysian Standards for lifts",
        note:
          "The applicable Malaysian standards and design requirements are confirmed with the project consultant and lift inspector.",
      },
      {
        standard: "DOSH / JKKP requirements",
        note:
          "Installation, inspection and registration follow the Department of Occupational Safety and Health process through the appointed local partner.",
      },
      {
        standard: "Local authority approvals",
        note:
          "Building, fire and accessibility requirements vary by state and municipality and are incorporated into the approved drawings.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "escalators",
      "hospital-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Malaysian towers are configured for efficient traffic handling, smooth ride quality and finishes suited to the project.",
      "home-elevators":
        "Home lifts for Malaysian villas and low-rise residences combine compact equipment, customised cabins and residential safety features.",
      escalators:
        "Escalators for Malaysian malls, transit hubs and public buildings are specified for high footfall, continuous duty and design integration.",
      "hospital-elevators":
        "Hospital bed elevators for Malaysian healthcare projects include stretcher access, priority controls and hygienic finishes.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Malaysia?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Malaysian projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Which approval process applies to lifts in Malaysia?",
        answer:
          "Installation and registration typically involve DOSH/JKKP through the appointed local partner, together with local authority building approvals. The exact route is confirmed for each project.",
      },
      {
        question: "Are home lifts available in Malaysia?",
        answer:
          "Yes. Compact home elevators are available for villas and low-rise residences, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
      {
        question: "Can you supply escalators for transit projects?",
        answer:
          "Yes. Escalators can be configured for rail, transit and public buildings with heavy-duty drives, safety features and finishes suited to the station design.",
      },
    ],
    related: ["indonesia", "vietnam", "bangladesh"],
    keywords: [
      "elevator supplier Malaysia",
      "elevator supplier Kuala Lumpur",
      "escalator supplier Malaysia",
      "hospital elevator Malaysia",
    ],
  },

  {
    slug: "vietnam",
    country: "Vietnam",
    shortName: "Vietnam",
    code: "VN",
    region: "Southeast Asia",
    wave: 3,
    currency: "VND",
    languages: ["Vietnamese", "English"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "High-rise construction in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR VIETNAM PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Vietnam | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Vietnam's towers, hospitals and industrial parks.",
    intro: [
      "Vietnam's cities are expanding rapidly, with high-rise housing, commercial centres, hospitals and industrial parks adding capacity. The country's construction market combines volume demand with increasingly specific requirements for quality and energy efficiency.",
      "Fuji Fenix supports Vietnamese developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Vietnamese requirements.",
    ],
    cities: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho"],
    demandDrivers: [
      {
        title: "Urban high-rise growth",
        description:
          "Residential and commercial towers in Hanoi and Ho Chi Minh City require efficient lift cores and reliable daily operation.",
      },
      {
        title: "Industrial and logistics parks",
        description:
          "Factories and warehouses need freight lifts for materials, equipment and handling traffic.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Tourism and retail",
        description:
          "Hotels, resorts and shopping centres need passenger lifts, panoramic options and escalators sized for visitor traffic.",
      },
    ],
    projectTypes: [
      "Residential and commercial towers",
      "Industrial parks and factories",
      "Hospitals and clinics",
      "Hotels and resorts",
      "Shopping centres and retail",
    ],
    buyerSegments: [
      "Property developers",
      "Industrial park developers",
      "Main contractors",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Hai Phong, Cai Mep-Thi Vai and Da Nang",
      note:
        "Port selection depends on the project location and construction programme. Export packing, documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "QCVN technical regulations",
        note:
          "Vietnamese technical regulations for elevators and related building systems. Applicability is confirmed with the project consultant and local inspector.",
      },
      {
        standard: "Ministry of Construction requirements",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "Local acceptance",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant municipal process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Vietnamese towers are configured for dense traffic, energy efficiency and finishes suited to the project.",
      "home-elevators":
        "Home lifts for Vietnamese villas and townhouses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Vietnamese healthcare projects include stretcher access, priority controls and easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Vietnamese factories and warehouses are engineered around pallet sizes, equipment loads and the facility's handling flow.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Vietnam?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Vietnamese projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Can you supply freight lifts for industrial parks?",
        answer:
          "Yes. Freight elevators can be configured for materials, equipment and pallets, with capacity, platform dimensions and door requirements confirmed during engineering.",
      },
      {
        question: "Which technical regulations apply in Vietnam?",
        answer:
          "Vietnamese QCVN technical regulations, Ministry of Construction requirements and local acceptance rules apply. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Are home lifts available in Vietnam?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
    ],
    related: ["malaysia", "indonesia", "china"],
    keywords: [
      "elevator supplier Vietnam",
      "elevator supplier Hanoi",
      "elevator supplier Ho Chi Minh City",
      "freight elevator Vietnam",
    ],
  },

  {
    slug: "kenya",
    country: "Kenya",
    shortName: "Kenya",
    code: "KE",
    region: "Africa",
    wave: 1,
    currency: "KES",
    languages: ["English", "Swahili"],
    heroImage: "/about-lobby.jpg",
    heroAlt: "Commercial building interior with an elevator lobby",
    headline: ["ELEVATORS & ESCALATORS", "FOR KENYA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Kenya | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Nairobi's towers, healthcare, retail and housing projects.",
    intro: [
      "Nairobi is East Africa's largest commercial centre, with high-rise offices, residential towers, retail centres and healthcare facilities expanding across the city. Reliable vertical transportation is central to how these buildings perform.",
      "Fuji Fenix supports Kenyan developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Kenyan requirements.",
    ],
    cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
    demandDrivers: [
      {
        title: "Nairobi commercial growth",
        description:
          "Office towers and mixed-use buildings require efficient passenger cores, group control and durable finishes.",
      },
      {
        title: "Housing demand",
        description:
          "Apartment towers and affordable housing projects need reliable passenger lifts and compact home lift options.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Retail and tourism",
        description:
          "Shopping centres and hotels need escalators, panoramic lifts and passenger systems sized for visitor traffic.",
      },
    ],
    projectTypes: [
      "Commercial and office towers",
      "Residential apartment buildings",
      "Hospitals and clinics",
      "Shopping centres and retail",
      "Hotels and tourism developments",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "Healthcare and facility owners",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Mombasa Port and Lamu Port",
      note:
        "Shipments are typically handled through Mombasa Port, with inland delivery coordinated to Nairobi and other project locations. Packing and documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Kenya Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "KEBS requirements",
        note:
          "Where Kenya Bureau of Standards requirements apply, product documentation is reviewed during contract planning.",
      },
      {
        standard: "County approvals",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant county rules.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Kenyan commercial and residential buildings are configured for reliable daily use, efficient cores and durable finishes.",
      "home-elevators":
        "Home lifts for Kenyan villas and townhouses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Kenyan healthcare projects include stretcher access, priority controls and easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Kenyan warehouses and commercial facilities are engineered around pallet sizes, trolley loads and the handling equipment used on site.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Kenya?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Kenyan projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Are home lifts available in Kenya?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
      {
        question: "Which standards are commonly required in Kenya?",
        answer:
          "The Kenya Building Code, KEBS requirements and county approval rules are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply hospital elevators for Kenyan facilities?",
        answer:
          "Yes. Bed elevators can be configured for stretcher access, priority control, hygienic finishes and emergency operation where the building provides the required power supply.",
      },
    ],
    related: ["tanzania", "ethiopia", "nigeria"],
    keywords: [
      "elevator supplier Kenya",
      "elevator supplier Nairobi",
      "hospital elevator Kenya",
      "home lift Kenya",
    ],
  },

  {
    slug: "ethiopia",
    country: "Ethiopia",
    shortName: "Ethiopia",
    code: "ET",
    region: "Africa",
    wave: 1,
    currency: "ETB",
    languages: ["Amharic", "English"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "Urban development project in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR ETHIOPIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Ethiopia | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators for Ethiopia's housing, commercial, healthcare and infrastructure projects.",
    intro: [
      "Addis Ababa is one of Africa's fastest-growing capitals, with corridor development, new housing, commercial buildings and healthcare facilities reshaping the city. As buildings rise, dependable vertical transportation becomes essential.",
      "Fuji Fenix supports Ethiopian developers, contractors and elevator partners with passenger, home, hospital and freight elevators. Equipment is configured to the project specification and the applicable Ethiopian requirements, with logistics planned through the Djibouti corridor.",
    ],
    cities: ["Addis Ababa", "Dire Dawa", "Hawassa", "Bahir Dar", "Adama"],
    demandDrivers: [
      {
        title: "Addis Ababa corridor development",
        description:
          "Urban corridor projects and new housing are adding multi-storey residential and commercial buildings across the capital.",
      },
      {
        title: "Commercial and institutional buildings",
        description:
          "Offices, banks, hotels and public buildings require reliable passenger lifts and group control.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Infrastructure and industry",
        description:
          "Industrial facilities and logistics projects need freight lifts for goods, equipment and materials.",
      },
    ],
    projectTypes: [
      "Residential apartment buildings",
      "Commercial and office buildings",
      "Hospitals and clinics",
      "Hotels and hospitality projects",
      "Industrial and logistics facilities",
    ],
    buyerSegments: [
      "Property developers",
      "Construction contractors",
      "Healthcare and facility owners",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Djibouti Port (landlocked corridor)",
      note:
        "As a landlocked market, Ethiopia-bound equipment is shipped through Djibouti and moved inland via the Addis-Djibouti corridor. Transit documentation, packing and delivery schedules are agreed per order.",
    },
    compliance: [
      {
        standard: "Ethiopian Standards Agency requirements",
        note:
          "Where Ethiopian standards apply, product documentation is reviewed during contract planning.",
      },
      {
        standard: "Addis Ababa building code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "Municipal approvals",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant municipal process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Ethiopian apartment and commercial buildings are configured for reliable daily use, efficient cores and durable finishes.",
      "home-elevators":
        "Home lifts for Ethiopian villas and multi-storey houses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Ethiopian healthcare projects include stretcher access, priority controls and easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Ethiopian warehouses and industrial facilities are engineered around pallet sizes, equipment loads and the handling flow on site.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Ethiopia?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Ethiopian projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "How is equipment delivered to landlocked Ethiopia?",
        answer:
          "Shipments are routed through Djibouti Port and moved inland via the Addis-Djibouti corridor. Transit documentation, packing and delivery schedules are agreed with the buyer and freight forwarder.",
      },
      {
        question: "Which standards are commonly required in Ethiopia?",
        answer:
          "Ethiopian Standards Agency requirements, the Addis Ababa building code and municipal rules are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Are home lifts available in Ethiopia?",
        answer:
          "Yes. Compact home elevators are available for villas and multi-storey houses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
    ],
    related: ["kenya", "tanzania", "saudi-arabia"],
    keywords: [
      "elevator supplier Ethiopia",
      "elevator supplier Addis Ababa",
      "hospital elevator Ethiopia",
      "home lift Ethiopia",
    ],
  },

  {
    slug: "south-africa",
    country: "South Africa",
    shortName: "South Africa",
    code: "ZA",
    region: "Africa",
    wave: 1,
    currency: "ZAR",
    languages: ["English", "Afrikaans", "isiZulu"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "High-rise commercial development in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR SOUTH AFRICA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in South Africa | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for South Africa's commercial, residential, healthcare and retail projects.",
    intro: [
      "South Africa's property market combines established high-rise commercial centres with residential towers, healthcare campuses, retail destinations and a significant building modernisation sector. Owners and consultants expect durable equipment and clear technical documentation.",
      "Fuji Fenix supports South African developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable South African requirements.",
    ],
    cities: ["Johannesburg", "Sandton", "Cape Town", "Durban", "Pretoria", "Gqeberha"],
    demandDrivers: [
      {
        title: "Commercial high-rise",
        description:
          "Office towers and mixed-use buildings require efficient passenger cores, group control and premium finishes.",
      },
      {
        title: "Modernisation and retrofits",
        description:
          "Older buildings need lift replacements and upgrades that improve reliability, energy use and passenger experience.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with priority controls, hygienic finishes and service access planning.",
      },
      {
        title: "Retail and tourism",
        description:
          "Malls, hotels and leisure destinations need escalators, panoramic lifts and passenger systems sized for visitor traffic.",
      },
    ],
    projectTypes: [
      "Commercial and office towers",
      "Residential and mixed-use buildings",
      "Hospitals and healthcare facilities",
      "Shopping centres and retail",
      "Hotel and tourism developments",
    ],
    buyerSegments: [
      "Property developers and owners",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Durban, Richards Bay, Cape Town and Gqeberha",
      note:
        "Port selection depends on the project location and construction programme. Export packing, documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "SANS 1545 for lifts",
        note:
          "The applicable South African standard and the required inspection documentation are confirmed with the project consultant and lift inspector.",
      },
      {
        standard: "Occupational Health and Safety Act",
        note:
          "Workplace safety requirements influence installation planning, maintenance access and operating procedures.",
      },
      {
        standard: "Municipal approvals",
        note:
          "Building, fire and accessibility requirements vary by municipality and are incorporated into the approved drawings.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for South African commercial and residential buildings are configured for reliable operation, efficient cores and durable finishes.",
      "home-elevators":
        "Home lifts for South African villas and townhouses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for South African healthcare projects include stretcher access, priority controls and hygienic finishes.",
      escalators:
        "Escalators for South African malls, airports and public buildings are specified for high footfall, continuous duty and design integration.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to South Africa?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to South African projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Can you support lift modernisation projects?",
        answer:
          "Yes, subject to a survey of the existing shaft, machine room and building services. Replacement and upgrade scopes are defined around the retained structure and the required performance.",
      },
      {
        question: "Which standards are commonly required in South Africa?",
        answer:
          "SANS 1545, the Occupational Health and Safety Act and municipal requirements are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Are home lifts available in South Africa?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
    ],
    related: ["nigeria", "kenya", "tanzania"],
    keywords: [
      "elevator supplier South Africa",
      "elevator supplier Johannesburg",
      "escalator supplier Cape Town",
      "hospital elevator South Africa",
    ],
  },

  {
    slug: "nigeria",
    country: "Nigeria",
    shortName: "Nigeria",
    code: "NG",
    region: "Africa",
    wave: 1,
    currency: "NGN",
    languages: ["English"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "Commercial development in a modern city",
    headline: ["ELEVATORS & ESCALATORS", "FOR NIGERIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Nigeria | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Lagos, Abuja and projects across Nigeria.",
    intro: [
      "Lagos and Abuja continue to add high-rise residential, commercial, hospitality and healthcare capacity to serve a fast-growing population. Buildings in these markets need robust vertical transportation and clear service planning.",
      "Fuji Fenix supports Nigerian developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Nigerian requirements.",
    ],
    cities: ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu"],
    demandDrivers: [
      {
        title: "Lagos high-rise development",
        description:
          "Residential and commercial towers require efficient lift cores, reliable operation and durable finishes.",
      },
      {
        title: "Housing demand",
        description:
          "Apartment buildings and gated communities need passenger lifts and compact home lift options for multi-storey living.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Retail and hospitality",
        description:
          "Malls, hotels and mixed-use destinations need escalators, panoramic lifts and passenger systems sized for visitor traffic.",
      },
    ],
    projectTypes: [
      "Residential and commercial towers",
      "Hospitals and clinics",
      "Shopping centres and retail",
      "Hotels and mixed-use developments",
      "Industrial and logistics facilities",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "Healthcare and facility owners",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Apapa, Tin Can Island and Lekki Deep Sea Port",
      note:
        "Port selection depends on the project location and construction schedule. Export packing, documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "Standards Organisation of Nigeria (SON)",
        note:
          "Where Nigerian standards apply, product documentation is reviewed during contract planning.",
      },
      {
        standard: "National Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "State building control",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant state building control process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Nigerian towers are configured for reliable daily use, efficient cores and durable finishes suited to the project.",
      "home-elevators":
        "Home lifts for Nigerian villas and townhouses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Nigerian healthcare projects include stretcher access, priority controls and easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Nigerian warehouses and commercial facilities are engineered around pallet sizes, equipment loads and the handling flow on site.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Nigeria?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Nigerian projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Are home lifts available in Nigeria?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
      {
        question: "Which standards are commonly required in Nigeria?",
        answer:
          "SON requirements, the National Building Code and state building control rules are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply hospital elevators for Nigerian facilities?",
        answer:
          "Yes. Bed elevators can be configured for stretcher access, priority control, hygienic finishes and emergency operation where the building provides the required power supply.",
      },
    ],
    related: ["south-africa", "kenya", "tanzania"],
    keywords: [
      "elevator supplier Nigeria",
      "elevator supplier Lagos",
      "hospital elevator Nigeria",
      "home lift Nigeria",
    ],
  },

  {
    slug: "tanzania",
    country: "Tanzania",
    shortName: "Tanzania",
    code: "TZ",
    region: "Africa",
    wave: 1,
    currency: "TZS",
    languages: ["Swahili", "English"],
    heroImage: "/escalator.jpg",
    heroAlt: "Commercial building project with escalator installation",
    headline: ["ELEVATORS & ESCALATORS", "FOR TANZANIA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Tanzania | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Dar es Salaam, Dodoma, Zanzibar and projects across Tanzania.",
    intro: [
      "Tanzania's commercial capital, Dar es Salaam, is growing quickly, while Dodoma's role as the administrative capital and Zanzibar's tourism economy create additional demand for modern buildings and reliable vertical transportation.",
      "Fuji Fenix supports Tanzanian developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Tanzanian requirements.",
    ],
    cities: ["Dar es Salaam", "Dodoma", "Arusha", "Zanzibar City", "Mwanza"],
    demandDrivers: [
      {
        title: "Dar es Salaam growth",
        description:
          "Commercial and residential towers require efficient lift cores, reliable operation and durable finishes.",
      },
      {
        title: "Dodoma capital development",
        description:
          "Government and institutional buildings in Dodoma need passenger lifts and accessible vertical transport.",
      },
      {
        title: "Tourism and hospitality",
        description:
          "Hotels and resorts in Zanzibar and Arusha specify passenger lifts, panoramic options and reliable service.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
    ],
    projectTypes: [
      "Commercial and residential towers",
      "Government and institutional buildings",
      "Hospitals and clinics",
      "Hotels and tourism developments",
      "Retail and mixed-use projects",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "Government and institutional clients",
      "Elevator distributors and installers",
    ],
    logistics: {
      ports: "Dar es Salaam Port and Zanzibar Port",
      note:
        "Shipments are typically handled through Dar es Salaam Port, with inland delivery coordinated to Dodoma, Arusha and other project locations. Packing and documentation are agreed per order.",
    },
    compliance: [
      {
        standard: "Tanzania Bureau of Standards (TBS)",
        note:
          "Where Tanzanian standards apply, product documentation is reviewed during contract planning.",
      },
      {
        standard: "National Building Code",
        note:
          "Building, fire and accessibility requirements that influence shaft design, lobby protection and emergency operation.",
      },
      {
        standard: "Municipal approvals",
        note:
          "Installation and commissioning approvals are handled by the appointed local partner under the relevant municipal process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Tanzanian commercial and residential buildings are configured for reliable daily use, efficient cores and durable finishes.",
      "home-elevators":
        "Home lifts for Tanzanian villas and townhouses combine compact equipment, customised cabins and residential safety features.",
      "hospital-elevators":
        "Hospital bed elevators for Tanzanian healthcare projects include stretcher access, priority controls and easy-clean finishes.",
      escalators:
        "Escalators for Tanzanian malls, hotels and public buildings are specified for continuous duty, passenger safety and design integration.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Tanzania?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Tanzanian projects through developers, contractors and local partners. Installation and approvals are coordinated with the appointed local team.",
      },
      {
        question: "Are home lifts available in Tanzania?",
        answer:
          "Yes. Compact home elevators are available for villas and townhouses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
      {
        question: "Which standards are commonly required in Tanzania?",
        answer:
          "TBS requirements, the National Building Code and municipal rules are commonly referenced. The final compliance matrix is confirmed with the project consultant.",
      },
      {
        question: "Can you supply elevators for hotels in Zanzibar?",
        answer:
          "Yes. Passenger and panoramic elevators can be configured for hotel and resort projects, with finishes and protection selected for the coastal environment.",
      },
    ],
    related: ["kenya", "ethiopia", "south-africa"],
    keywords: [
      "elevator supplier Tanzania",
      "elevator supplier Dar es Salaam",
      "hotel elevator Zanzibar",
      "home lift Tanzania",
    ],
  },

  {
    slug: "japan",
    country: "Japan",
    shortName: "Japan",
    code: "JP",
    region: "East Asia",
    wave: 2,
    currency: "JPY",
    languages: ["Japanese", "English"],
    heroImage: "/hero-elevator.jpg",
    heroAlt: "Modern elevator installation for a Japanese high-rise project",
    headline: ["ELEVATORS & ESCALATORS", "FOR JAPAN PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Japan | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, high-speed, hospital and home elevators for Japanese redevelopment, office, healthcare and residential projects, with engineering documentation and export support.",
    intro: [
      "Japan's major cities are rebuilding ageing stock while adding high-rise offices and transit-linked mixed-use districts. Redevelopment in Tokyo and Osaka, hospital upgrades and compact urban housing all depend on vertical transportation that is quiet, reliable and precisely engineered.",
      "Fuji Fenix supports Japanese developers, contractors and vertical transport consultants with passenger, high-speed, hospital bed and home elevators. Equipment is configured to the project specification and the applicable Japanese building and lift requirements, with installation and inspection handled through the appointed local partner.",
    ],
    cities: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Fukuoka", "Sapporo"],
    demandDrivers: [
      {
        title: "Urban redevelopment",
        description:
          "Tokyo, Osaka and Yokohama redevelopment projects replace ageing buildings with taller, denser mixed-use schemes that need efficient core transport and quiet operation.",
      },
      {
        title: "High-rise offices and towers",
        description:
          "Headquarters and mixed-use towers require high-speed systems, group control and ride quality suitable for large tenant populations.",
      },
      {
        title: "Healthcare and an ageing population",
        description:
          "Hospitals, clinics and care facilities specify bed lifts with priority controls, hygienic finishes and dependable access for patients and staff.",
      },
      {
        title: "Compact residential projects",
        description:
          "Land constraints and multi-generation housing support demand for home lifts and space-efficient MRL passenger systems.",
      },
    ],
    projectTypes: [
      "Redevelopment and mixed-use districts",
      "High-rise office and residential towers",
      "Hospitals, clinics and care facilities",
      "Hotels and transit-linked developments",
      "Villas and multi-storey homes",
    ],
    buyerSegments: [
      "Developers and redevelopment associations",
      "General contractors and EPC companies",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Tokyo, Yokohama, Kobe and Osaka",
      note:
        "Port selection follows the project location and construction programme. Export packing, technical documentation and phased site delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "Building Standards Act",
        note:
          "Japanese building and fire requirements influence shaft design, lobby protection, emergency operation and accessibility. The applicable route is confirmed with the project consultant and building official.",
      },
      {
        standard: "Japanese Industrial Standards (JIS)",
        note:
          "Where JIS references are specified, the project documentation package is aligned to the applicable requirements. Final acceptance criteria are agreed with the local inspector.",
      },
      {
        standard: "Project specification",
        note:
          "Seismic, acoustic, finish and energy requirements specific to the building are incorporated into the approved layout and interface drawings.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "high-speed-elevators",
      "hospital-elevators",
      "home-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Japanese redevelopment and residential projects are configured for quiet travel, accurate levelling and efficient cores in constrained city sites. Machine-room-less layouts help preserve valuable floor area.",
      "high-speed-elevators":
        "High-speed elevators for Tokyo and Osaka towers combine gearless traction, VVVF drives and group control to manage large tenant populations and long travel distances.",
      "hospital-elevators":
        "Hospital bed elevators for Japanese healthcare projects are specified with stretcher access, priority operation and easy-clean finishes suited to clinical environments.",
      "home-elevators":
        "Home lifts for Japanese multi-storey houses and villas use compact equipment and customised cabins, with a site survey confirming shaft, pit and overhead dimensions before manufacture.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to projects in Japan?",
        answer:
          "Yes. We supply engineered elevator systems to Japanese projects through developers, contractors and local partners. Installation, inspection and building approvals are coordinated with the appointed local team.",
      },
      {
        question: "Which standards apply to Japanese lift projects?",
        answer:
          "Projects are designed around the Building Standards Act, the specified JIS references and the building's own specification. The final compliance and inspection matrix is confirmed with the project consultant and local authority.",
      },
      {
        question: "Can high-speed elevators be supplied for Tokyo towers?",
        answer:
          "Yes. High-speed gearless systems with VVVF drive and group or destination control can be configured for tall buildings, with speed and handling capacity confirmed through traffic analysis.",
      },
      {
        question: "Are home lifts suitable for Japanese houses?",
        answer:
          "Compact home elevators can suit multi-storey houses and villas where a site survey confirms the shaft, pit, overhead and power requirements. MRL and structure-mounted options reduce building work where space is limited.",
      },
    ],
    related: ["south-korea", "china", "singapore"],
    keywords: [
      "elevator supplier Japan",
      "passenger elevator Tokyo",
      "high-speed elevator Japan",
      "hospital elevator Japan",
    ],
  },

  {
    slug: "south-korea",
    country: "South Korea",
    shortName: "South Korea",
    code: "KR",
    region: "East Asia",
    wave: 2,
    currency: "KRW",
    languages: ["Korean", "English"],
    heroImage: "/about-lobby.jpg",
    heroAlt: "Premium elevator lobby for a Korean commercial tower",
    headline: ["ELEVATORS & ESCALATORS", "FOR KOREA PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in South Korea | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, high-speed, hospital and escalator systems for South Korean apartment, office, healthcare and transit projects, with engineering and export support.",
    intro: [
      "South Korea combines dense apartment districts, a competitive office market and continuing transit and healthcare investment. Seoul and Busan are adding high-rise mixed-use schemes while older residential complexes are rebuilt with higher specifications.",
      "Fuji Fenix supports Korean developers, contractors and elevator partners with passenger, high-speed, hospital and escalator systems. Equipment is engineered to the project brief and the applicable Korean lift requirements, with installation and inspection delivered through the appointed local partner.",
    ],
    cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],
    demandDrivers: [
      {
        title: "Apartment reconstruction",
        description:
          "Housing reconstruction and new residential districts require reliable passenger lift cores, group control and finishes suited to competitive apartment sales.",
      },
      {
        title: "Office and mixed-use towers",
        description:
          "Seoul and Busan towers specify high-speed systems, destination control and smooth ride quality for large working populations.",
      },
      {
        title: "Healthcare investment",
        description:
          "Hospitals and medical centres need bed elevators with priority controls, hygienic finishes and service planning for critical departments.",
      },
      {
        title: "Transit and retail",
        description:
          "Rail extensions, malls and public buildings require escalators built for high footfall and continuous daily operation.",
      },
    ],
    projectTypes: [
      "Apartment complexes and residential towers",
      "Office and mixed-use towers",
      "Hospitals and medical centres",
      "Metro, rail and transit projects",
      "Shopping malls and retail centres",
    ],
    buyerSegments: [
      "Housing developers and reconstruction associations",
      "General contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Busan, Incheon and Gwangyang",
      note:
        "Equipment is shipped through the port best suited to the project's inland destination. Export packing, documentation and delivery sequencing are agreed with the contractor and forwarder.",
    },
    compliance: [
      {
        standard: "Elevator Safety Control Act",
        note:
          "Korean lift safety, installation and inspection requirements apply to the project. The approval route is managed by the appointed local installer and confirmed with the authority.",
      },
      {
        standard: "Korean Industrial Standards (KS)",
        note:
          "Where KS references are specified, product and test documentation is prepared to support the project's acceptance process.",
      },
      {
        standard: "Building and fire requirements",
        note:
          "Fire-fighting lift, lobby protection, accessibility and emergency operation requirements are incorporated where the building and local code require them.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "high-speed-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Korean apartment and mixed-use projects are configured for efficient peaks, durable finishes and quiet operation in dense residential cores.",
      "high-speed-elevators":
        "High-speed systems for Seoul and Busan office towers use gearless traction, VVVF drives and group or destination control to reduce waiting times across tall buildings.",
      "hospital-elevators":
        "Hospital bed elevators for Korean medical projects are specified with stretcher access, priority operation and hygienic, easy-clean finishes.",
      escalators:
        "Escalators for Korean transit, retail and public buildings are selected for high passenger volumes, continuous duty and integration with the architectural design.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to South Korea?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Korean projects through developers, contractors and local partners. Installation and statutory inspection are coordinated with the appointed local team.",
      },
      {
        question: "Which Korean requirements apply to lift projects?",
        answer:
          "The Elevator Safety Control Act, any specified KS references and the building's fire and accessibility requirements apply. The final compliance matrix is confirmed with the project consultant and inspection body.",
      },
      {
        question: "Can you support apartment reconstruction projects?",
        answer:
          "Yes. Passenger lift packages can be configured for residential towers, including group control, cabin finishes and documentation for the project's approval and construction schedule.",
      },
      {
        question: "Are escalators available for transit and retail projects?",
        answer:
          "Yes. Escalators can be specified for metro, rail, mall and public building projects with heavy-duty drives, safety features and finishes suited to the location.",
      },
    ],
    related: ["japan", "china", "singapore"],
    keywords: [
      "elevator supplier South Korea",
      "elevator supplier Seoul",
      "high-speed elevator Korea",
      "escalator supplier Korea",
    ],
  },

  {
    slug: "singapore",
    country: "Singapore",
    shortName: "Singapore",
    code: "SG",
    region: "Southeast Asia",
    wave: 2,
    currency: "SGD",
    languages: ["English", "Mandarin Chinese", "Malay", "Tamil"],
    heroImage: "/building-exterior.jpg",
    heroAlt: "High-rise commercial development in Singapore",
    headline: ["ELEVATORS & ESCALATORS", "FOR SINGAPORE PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Singapore | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, high-speed, hospital and escalator systems for Singapore's high-rise, transit, healthcare and mixed-use developments, with full engineering documentation.",
    intro: [
      "Singapore's development model favours high-density, transit-connected projects with demanding standards for safety, accessibility and whole-life performance. Redevelopment, MRT expansion and healthcare capacity keep vertical transportation in constant demand.",
      "Fuji Fenix supports Singaporean developers, contractors and consultants with passenger, high-speed, hospital and escalator systems. Equipment is engineered to the project specification and Singapore's building and lift requirements, with installation and inspection delivered through the appointed local partner.",
    ],
    cities: ["Marina Bay", "Jurong", "Punggol", "Tampines", "Woodlands"],
    demandDrivers: [
      {
        title: "High-density redevelopment",
        description:
          "Residential, commercial and mixed-use redevelopment requires efficient lift cores, accurate levelling and finishes that meet the project's positioning.",
      },
      {
        title: "MRT and transit expansion",
        description:
          "New stations and interchanges need escalators and moving walks designed for continuous heavy use and public safety.",
      },
      {
        title: "Healthcare capacity",
        description:
          "Hospitals and medical campuses specify bed elevators with priority controls, hygienic finishes and service access planning.",
      },
      {
        title: "Retail and hospitality",
        description:
          "Malls, hotels and integrated resorts need escalators, panoramic lifts and a smooth passenger experience across high-traffic areas.",
      },
    ],
    projectTypes: [
      "High-rise residential and mixed-use developments",
      "MRT stations and transit infrastructure",
      "Hospitals and healthcare campuses",
      "Shopping malls and integrated developments",
      "Hotels and commercial towers",
    ],
    buyerSegments: [
      "Developers and property owners",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Port of Singapore",
      note:
        "Equipment is shipped through Singapore and delivered to site against the construction programme. Packing, documentation and just-in-time delivery sequencing are agreed with the contractor.",
    },
    compliance: [
      {
        standard: "BCA requirements",
        note:
          "Building and Construction Authority requirements influence lift design, accessibility and the approval process. The submission route is managed by the appointed local installer.",
      },
      {
        standard: "SS 550",
        note:
          "The Singapore code of practice for electric passenger and goods lifts is commonly referenced. Applicability is confirmed with the project consultant.",
      },
      {
        standard: "Fire Code",
        note:
          "Fire-fighting lift, lobby protection, signage and emergency operation requirements are incorporated where the project requires them.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "high-speed-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Singapore's high-density developments are configured for efficient handling capacity, smooth ride quality and durable finishes suited to heavy daily use.",
      "high-speed-elevators":
        "High-speed systems for Singapore towers use gearless traction, VVVF drives and group control to support tall commercial and mixed-use cores.",
      "hospital-elevators":
        "Hospital bed elevators for Singapore healthcare projects include stretcher access, priority controls and hygienic finishes for clinical environments.",
      escalators:
        "Escalators for Singapore's MRT stations, malls and public buildings are specified for continuous heavy duty, passenger safety and design integration.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Singapore?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Singaporean projects through developers, contractors and local partners. Installation and BCA-related approvals are coordinated with the appointed local team.",
      },
      {
        question: "Which standards are commonly referenced in Singapore?",
        answer:
          "BCA requirements, SS 550 and the Fire Code are commonly referenced for lift projects. The final compliance and submission matrix is confirmed with the project consultant and local installer.",
      },
      {
        question: "Can you supply escalators for MRT stations?",
        answer:
          "Yes. Escalators and moving walks can be configured for transit projects with heavy-duty drives, monitoring features and finishes suited to station architecture.",
      },
      {
        question: "Are high-speed elevators available for Singapore towers?",
        answer:
          "Yes. High-speed gearless systems with group or destination control can be configured for tall buildings, with speed and capacity confirmed through traffic analysis.",
      },
    ],
    related: ["malaysia", "indonesia", "thailand"],
    keywords: [
      "elevator supplier Singapore",
      "escalator supplier Singapore",
      "high-speed elevator Singapore",
      "hospital elevator Singapore",
    ],
  },

  {
    slug: "thailand",
    country: "Thailand",
    shortName: "Thailand",
    code: "TH",
    region: "Southeast Asia",
    wave: 3,
    currency: "THB",
    languages: ["Thai", "English"],
    heroImage: "/panoramic.jpg",
    heroAlt: "Panoramic elevator and modern architectural development in Thailand",
    headline: ["ELEVATORS & ESCALATORS", "FOR THAILAND PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in Thailand | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and escalator systems for Bangkok, Phuket and Thailand-wide residential, hospitality, healthcare and retail projects.",
    intro: [
      "Thailand's construction market spans Bangkok condominiums, tourism-led hospitality projects, private healthcare and regional retail centres. Each segment has different expectations for passenger flow, cabin finish and operating cost.",
      "Fuji Fenix supports Thai developers, contractors and elevator partners with passenger, home, hospital and escalator systems. Equipment is configured to the project specification and the applicable Thai building requirements, with installation and inspection delivered through the appointed local partner.",
    ],
    cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Khon Kaen"],
    demandDrivers: [
      {
        title: "Bangkok condominium supply",
        description:
          "Residential towers need efficient passenger cores, quiet operation and finishes that support sales in a competitive condominium market.",
      },
      {
        title: "Tourism and hospitality",
        description:
          "Hotels and resorts in Bangkok, Phuket and Pattaya specify panoramic lifts, smooth ride quality and interiors coordinated with the guest experience.",
      },
      {
        title: "Private healthcare",
        description:
          "Hospitals and clinics, including medical tourism facilities, require bed elevators with priority controls and hygienic finishes.",
      },
      {
        title: "Retail and regional development",
        description:
          "Malls and mixed-use centres across Thailand need escalators sized for high footfall and long operating hours.",
      },
    ],
    projectTypes: [
      "Condominium and residential towers",
      "Hotels, resorts and serviced apartments",
      "Hospitals and medical centres",
      "Shopping malls and retail centres",
      "Mixed-use and transit-linked developments",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Laem Chabang, Bangkok and Map Ta Phut",
      note:
        "Equipment is shipped through the port best suited to the project location and delivered against the construction programme. Export packing, customs documentation and inland delivery are agreed per order.",
    },
    compliance: [
      {
        standard: "Building Control Act",
        note:
          "Thai building and fire requirements influence shaft design, lobby protection and emergency operation. The approval route is confirmed with the project consultant and local authority.",
      },
      {
        standard: "Thai Industrial Standards (TIS)",
        note:
          "Where TIS references are specified, the documentation package is prepared to support the project's acceptance process.",
      },
      {
        standard: "Local authority permits",
        note:
          "Installation, inspection and operating permits are handled through the appointed local partner under the relevant municipal or provincial process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "escalators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Thai condominiums and commercial buildings are configured for efficient peaks, quiet operation and finishes suited to the project's market positioning.",
      "home-elevators":
        "Home lifts for Thai villas and multi-storey houses combine compact equipment, customised cabins and residential safety features, with feasibility confirmed by site survey.",
      "hospital-elevators":
        "Hospital bed elevators for Thai healthcare projects are specified with stretcher access, priority controls and easy-clean finishes for clinical use.",
      escalators:
        "Escalators for Thai malls, hotels and transport buildings are selected for high footfall, continuous duty and integration with the interior design.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to Thailand?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Thai projects through developers, contractors and local partners. Installation, inspection and local permits are coordinated with the appointed team.",
      },
      {
        question: "Which standards apply to Thai lift projects?",
        answer:
          "The Building Control Act, any specified TIS references and local authority requirements apply. The final compliance and permit matrix is confirmed with the project consultant and local partner.",
      },
      {
        question: "Are villa lifts available in Thailand?",
        answer:
          "Yes. Compact home elevators are available for villas, resorts and multi-storey houses, subject to a site survey confirming shaft, pit, overhead and power requirements.",
      },
      {
        question: "Can you supply panoramic lifts for hotels?",
        answer:
          "Yes. Glass and semi-glass cabins, feature lighting and finishes can be developed with the architect and confirmed against structural and safety requirements.",
      },
    ],
    related: ["vietnam", "malaysia", "singapore"],
    keywords: [
      "elevator supplier Thailand",
      "elevator supplier Bangkok",
      "villa lift Thailand",
      "escalator supplier Thailand",
    ],
  },

  {
    slug: "philippines",
    country: "Philippines",
    shortName: "Philippines",
    code: "PH",
    region: "Southeast Asia",
    wave: 3,
    currency: "PHP",
    languages: ["Filipino", "English"],
    heroImage: "/escalator.jpg",
    heroAlt: "Escalator installation for a Philippine retail and transit project",
    headline: ["ELEVATORS & ESCALATORS", "FOR PHILIPPINES PROJECTS"],
    metaTitle: "Elevator & Escalator Supplier in the Philippines | Fuji Fenix",
    metaDescription:
      "Fuji Fenix supplies passenger, home, hospital and freight elevators plus escalators for Metro Manila, Cebu and Davao residential, BPO, healthcare and retail projects.",
    intro: [
      "The Philippines combines a fast-growing BPO office market, dense residential condominium development, expanding healthcare capacity and large retail formats. Metro Manila and regional cities such as Cebu and Davao continue to add vertical capacity.",
      "Fuji Fenix supports Philippine developers, contractors and elevator partners with passenger, home, hospital and freight elevators, plus escalators. Equipment is configured to the project specification and the applicable Philippine building requirements, with installation and permits handled through the appointed local partner.",
    ],
    cities: ["Metro Manila", "Cebu", "Davao", "Clark", "Iloilo"],
    demandDrivers: [
      {
        title: "BPO and office towers",
        description:
          "Office developments need efficient passenger cores, group control and reliable operation across long daily shifts.",
      },
      {
        title: "Residential condominiums",
        description:
          "Dense condominium projects require space-efficient passenger lifts, durable finishes and dependable service access.",
      },
      {
        title: "Healthcare expansion",
        description:
          "Hospitals and clinics specify bed elevators with stretcher access, priority controls and hygienic finishes.",
      },
      {
        title: "Retail and logistics",
        description:
          "Malls, warehouses and distribution facilities need escalators and freight lifts sized for high throughput and heavy goods movement.",
      },
    ],
    projectTypes: [
      "BPO and office towers",
      "Residential condominiums",
      "Hospitals and clinics",
      "Shopping malls and retail centres",
      "Warehouses and logistics facilities",
    ],
    buyerSegments: [
      "Property developers",
      "Main contractors",
      "MEP and vertical transport consultants",
      "Elevator distributors and service companies",
    ],
    logistics: {
      ports: "Manila, Cebu and Subic",
      note:
        "Port selection follows the project location and construction schedule. Export packing, customs documentation and inland delivery are coordinated with the contractor and freight forwarder.",
    },
    compliance: [
      {
        standard: "National Building Code (PD 1096)",
        note:
          "Building, fire and accessibility requirements influence shaft design, lobby protection and emergency operation. The applicable route is confirmed with the project consultant and local building official.",
      },
      {
        standard: "Philippine Electrical Code",
        note:
          "Power supply, protection and emergency operation requirements are coordinated with the project's electrical consultant and the local utility.",
      },
      {
        standard: "Local government permits",
        note:
          "Installation, inspection and operating permits are handled through the appointed local partner under the relevant city or municipal process.",
      },
    ],
    focuses: [
      "passenger-elevators",
      "home-elevators",
      "hospital-elevators",
      "freight-elevators",
    ],
    focusNotes: {
      "passenger-elevators":
        "Passenger elevators for Philippine condominium and BPO projects are configured for efficient peaks, durable finishes and dependable operation in high-usage buildings.",
      "home-elevators":
        "Home lifts for Philippine villas and multi-storey houses combine compact equipment, customised cabins and residential safety features, subject to site survey.",
      "hospital-elevators":
        "Hospital bed elevators for Philippine healthcare projects include stretcher access, priority operation and hygienic, easy-clean finishes.",
      "freight-elevators":
        "Freight lifts for Philippine warehouses and retail back-of-house are engineered around pallet sizes, trolley loads and the handling equipment used on site.",
    },
    faqs: [
      {
        question: "Does Fuji Fenix supply elevators to the Philippines?",
        answer:
          "Yes. We supply engineered elevator and escalator systems to Philippine projects through developers, contractors and local partners. Installation and local permits are coordinated with the appointed team.",
      },
      {
        question: "Which requirements apply to Philippine lift projects?",
        answer:
          "The National Building Code, Philippine Electrical Code and local government permit requirements apply, together with the project specification. The final compliance matrix is confirmed with the consultant and local authority.",
      },
      {
        question: "Are freight lifts available for warehouses?",
        answer:
          "Yes. Freight elevators can be configured for pallets, trolleys, equipment and heavy goods, with load ratings and platform dimensions confirmed during engineering.",
      },
      {
        question: "Can you supply home lifts for existing houses?",
        answer:
          "In many cases yes, subject to a site survey. Compact MRL systems or self-supporting structures can reduce building work where space is limited.",
      },
    ],
    related: ["vietnam", "indonesia", "malaysia"],
    keywords: [
      "elevator supplier Philippines",
      "elevator supplier Manila",
      "freight elevator Philippines",
      "home lift Philippines",
    ],
  },
];

export const WAVE_ORDER: MarketWave[] = ["priority", 1, 2, 3];

export function waveLabel(wave: MarketWave): string {
  return wave === "priority" ? "Priority market" : `Wave ${wave}`;
}

export function getMarket(slug: string): Market | undefined {
  return MARKETS.find((market) => market.slug === slug);
}

export function getMarketsByWave(wave: MarketWave): Market[] {
  return MARKETS.filter((market) => market.wave === wave);
}

/**
 * Business priority tier for a market, based on the Nov 2026 growth plan.
 * Returns null for markets that sit outside the three explicit priority tiers
 * (China, India, Japan, South Korea and Singapore).
 */
export function getPriorityTier(market: Market): MarketPriorityTier | null {
  for (const tier of [1, 2, 3] as const) {
    if (PRIORITY_TIER_MARKETS[tier].some((entry) => entry.slug === market.slug)) {
      return tier;
    }
  }
  return null;
}

/** Markets in a priority tier, in the order defined by the growth plan. */
export function getPriorityMarkets(tier: MarketPriorityTier): Market[] {
  return PRIORITY_TIER_MARKETS[tier]
    .map((entry) => getMarket(entry.slug))
    .filter((market): market is Market => Boolean(market));
}

/** Priority markets that offer a specific product focus. */
export function getPriorityMarketsForFocus(
  focus: FocusSlug,
  tiers: MarketPriorityTier[] = [1, 2]
): Market[] {
  const seen = new Set<string>();
  const result: Market[] = [];

  for (const tier of tiers) {
    for (const market of getPriorityMarkets(tier)) {
      if (!market.focuses.includes(focus) || seen.has(market.slug)) continue;
      seen.add(market.slug);
      result.push(market);
    }
  }

  return result;
}

/**
 * Priority-tier label used on cards and country pages. Markets outside the
 * three explicit tiers fall back to their programme label.
 */
export function marketPriorityLabel(market: Market): string {
  const tier = getPriorityTier(market);
  if (tier) return PRIORITY_TIER_COPY[tier].label;
  return market.wave === "priority" ? "Priority market" : "Asia priority market";
}

/** All markets ordered by business priority, then by the original dataset order. */
export function getMarketsInPriorityOrder(): Market[] {
  const rank = new Map<string, number>();
  ([1, 2, 3] as const).forEach((tier) => {
    PRIORITY_TIER_MARKETS[tier].forEach((entry, index) => {
      rank.set(entry.slug, tier * 100 + index);
    });
  });

  return [...MARKETS].sort(
    (a, b) => (rank.get(a.slug) ?? 9999) - (rank.get(b.slug) ?? 9999)
  );
}

export function getRegionOrder(): MarketRegion[] {
  return ["East Asia", "South Asia", "Middle East", "Southeast Asia", "Africa"];
}

export function getMarketsForFocus(focus: FocusSlug): Market[] {
  return MARKETS.filter((market) => market.focuses.includes(focus));
}

/**
 * Canonical country URL, keyed by ISO 3166-1 alpha-2 code:
 *   china -> /cn, pakistan -> /pk, uae -> /ae, japan -> /jp
 *
 * Country-code paths are the indexable URLs. The older /markets/<slug>
 * routes 308-redirect to these from `proxy.ts`.
 */
export function marketPath(slug: string): string {
  const market = getMarket(slug);
  return `/${(market?.code ?? slug).toLowerCase()}`;
}

export function marketFocusPath(marketSlug: string, focusSlug: FocusSlug): string {
  return `${marketPath(marketSlug)}/${focusSlug}`;
}

/** Legacy URL retained only so inbound links can be redirected. */
export function legacyMarketPath(slug: string): string {
  return `/markets/${slug}`;
}

/** Legacy URL retained only so inbound links can be redirected. */
export function legacyMarketFocusPath(
  marketSlug: string,
  focusSlug: FocusSlug
): string {
  return `/markets/${marketSlug}/${focusSlug}`;
}

export function getMarketByCode(code: string): Market | undefined {
  const normalized = code.trim().toUpperCase();
  return MARKETS.find((market) => market.code === normalized);
}

/** The /markets hub stays indexable; /markets/<slug> redirects to /<code>. */
export function isCountryCodePathSegment(segment: string): boolean {
  return Boolean(getMarketByCode(segment));
}

/** Asia is the primary growth region for the international programme. */
export const ASIA_REGIONS: MarketRegion[] = [
  "East Asia",
  "South Asia",
  "Southeast Asia",
  "Middle East",
];

export function isAsiaMarket(market: Market): boolean {
  return ASIA_REGIONS.includes(market.region);
}

export function getAsiaMarkets(): Market[] {
  const order = getRegionOrder();
  return [...MARKETS]
    .filter(isAsiaMarket)
    .sort(
      (a, b) =>
        order.indexOf(a.region) - order.indexOf(b.region) ||
        a.country.localeCompare(b.country)
    );
}

export function getAsiaMarketsForFocus(focus: FocusSlug): Market[] {
  return getAsiaMarkets().filter((market) => market.focuses.includes(focus));
}

export function getRelatedMarkets(market: Market): Market[] {
  return market.related
    .map((slug) => getMarket(slug))
    .filter((related): related is Market => Boolean(related));
}
