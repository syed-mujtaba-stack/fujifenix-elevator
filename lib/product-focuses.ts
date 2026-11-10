/**
 * Product focus definitions used by the international /markets SEO programme.
 *
 * Each focus maps to a real, published product page. The focus pages combine
 * this product-level content with market-specific content from lib/markets.ts
 * so that country × product landing pages are genuinely distinct.
 *
 * All technical statements are intentionally limited to configurations the
 * company already publishes. Exact capacities, speeds and approvals are
 * confirmed per project during engineering.
 */

export type FocusSlug =
  | "passenger-elevators"
  | "home-elevators"
  | "high-speed-elevators"
  | "hospital-elevators"
  | "freight-elevators"
  | "panoramic-elevators"
  | "escalators"
  | "moving-walks"
  | "car-elevators";

export interface FocusFaq {
  question: string;
  answer: string;
}

export interface FocusConfiguration {
  title: string;
  description: string;
}

export interface ProductFocus {
  slug: FocusSlug;
  title: string;
  /** Short form used in tight titles and cards. */
  shortTitle: string;
  category: string;
  categorySlug: string;
  productHref: string;
  /** Raw public path - run through getSafeImageUrl before next/image. */
  image: string;
  imageAlt: string;
  summary: string;
  applications: string[];
  configurations: FocusConfiguration[];
  supplyPoints: string[];
  faqs: FocusFaq[];
  related: FocusSlug[];
  keywords: string[];
}

export const PRODUCT_FOCUSES: Record<FocusSlug, ProductFocus> = {
  "passenger-elevators": {
    slug: "passenger-elevators",
    title: "Passenger Elevators",
    shortTitle: "Passenger Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/passenger-elevator-cabin",
    image: "/Elevators/passenger-elevator/hero.png",
    imageAlt: "Passenger elevator cabin engineered by Fuji Fenix",
    summary:
      "Passenger elevators move residents, employees, guests and visitors between floors in residential, commercial, hospitality and institutional buildings. Each Fuji Fenix system is engineered around traffic demand, shaft dimensions, specified finishes and the building's operating profile.",
    applications: [
      "High-rise residential towers",
      "Office and mixed-use buildings",
      "Hotels and serviced apartments",
      "Shopping centres and retail",
      "Public and institutional buildings",
    ],
    configurations: [
      {
        title: "Machine-room and MRL layouts",
        description:
          "Machine-room and machine-room-less arrangements are selected around the available core, shaft dimensions and overhead requirements of each building.",
      },
      {
        title: "Gearless traction and VVVF drives",
        description:
          "Permanent magnet synchronous gearless traction machines with variable-frequency drives support smooth travel, accurate levelling and efficient operation.",
      },
      {
        title: "Cabin, door and finish options",
        description:
          "Cabin dimensions, door openings, ceiling treatments, handrails, flooring and stainless-steel, glass or wood finishes are specified for the project.",
      },
      {
        title: "Traffic and control systems",
        description:
          "Single-lift, group and destination-oriented control options are configured to match the building's traffic pattern and passenger flow.",
      },
    ],
    supplyPoints: [
      "Engineered-to-order equipment matched to shaft, traffic and finish requirements",
      "Gearless traction and variable-frequency drive configurations",
      "Cabin, door and finish options for residential, commercial and hospitality projects",
      "Factory testing and export documentation for international deliveries",
    ],
    faqs: [
      {
        question: "Can passenger elevators be customised for a specific project?",
        answer:
          "Yes. Capacity, speed, cabin dimensions, door configuration, finishes and control options are selected during engineering. Final specifications are confirmed against the shaft, traffic study and local code requirements.",
      },
      {
        question: "Are technical drawings provided before manufacturing?",
        answer:
          "Project layout and interface drawings are prepared for consultant approval before production. Documentation covers shaft and pit requirements, loading, power supply, door openings and selected finishes.",
      },
    ],
    related: ["high-speed-elevators", "panoramic-elevators", "home-elevators"],
    keywords: [
      "passenger elevator manufacturer",
      "passenger lift supplier",
      "commercial passenger elevator",
      "passenger elevator for high-rise",
    ],
  },

  "home-elevators": {
    slug: "home-elevators",
    title: "Home Elevators",
    shortTitle: "Home Lifts",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/home-elevators",
    image: "/Elevators/Home Elevators/villa-wood-steel.png",
    imageAlt: "Villa home elevator with wood and steel cabin finishes",
    summary:
      "Home elevators give villas, duplexes and low-rise residences comfortable access between floors without sacrificing interior space or design. Fuji Fenix home lift systems combine compact equipment, customised cabins and residential safety features.",
    applications: [
      "Private villas and luxury residences",
      "Duplex and multi-storey homes",
      "Residential retrofits",
      "Low-rise apartment buildings",
      "Accessible residential projects",
    ],
    configurations: [
      {
        title: "Compact machine-room-less options",
        description:
          "Space-saving MRL configurations help preserve living space where a dedicated machine room is not practical.",
      },
      {
        title: "Self-supporting structure options",
        description:
          "Aluminium or steel structure solutions can simplify installation where an existing masonry shaft is not available, subject to site survey.",
      },
      {
        title: "Residential cabin design",
        description:
          "Cabin finishes include stainless steel, glass, wood-grain and dual-tone options to complement the interior architecture.",
      },
      {
        title: "Accessibility and safety",
        description:
          "Door operation, control placement and safety devices are configured for family use, including accessible requirements where specified.",
      },
    ],
    supplyPoints: [
      "Compact systems for villas and residential retrofits",
      "Custom cabin finishes matched to interior design",
      "Machine-room-less and structure-mounted options",
      "Residential safety features and clear operating documentation",
    ],
    faqs: [
      {
        question: "What is needed to plan a home elevator?",
        answer:
          "A site survey confirms the available shaft or structure space, pit and overhead dimensions, power supply and access route. The lift configuration is then matched to the home's layout and finish direction.",
      },
      {
        question: "Can a home elevator be added to an existing house?",
        answer:
          "In many cases yes, subject to a structural survey and available space. Self-supporting structure options or compact MRL layouts can reduce building work, but feasibility is confirmed per site.",
      },
    ],
    related: ["passenger-elevators", "panoramic-elevators", "high-speed-elevators"],
    keywords: [
      "home elevator supplier",
      "villa lift manufacturer",
      "residential elevator solutions",
      "home lift for villa",
    ],
  },

  "high-speed-elevators": {
    slug: "high-speed-elevators",
    title: "High-Speed Elevators",
    shortTitle: "High-Speed Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/high-speed-elevators",
    image: "/Elevators/high-speed-elevator/High-Speed Elevator Car (Aerodynamic Cabin Design).png",
    imageAlt: "High-speed elevator car with aerodynamic cabin design",
    summary:
      "High-speed elevators keep tall buildings efficient by reducing travel time and managing passenger flow across many floors. Fuji Fenix engineers high-speed systems around the building's height, population, traffic peaks and core configuration.",
    applications: [
      "High-rise office towers",
      "Tall residential developments",
      "Hotels and mixed-use landmarks",
      "Commercial headquarters",
      "Large-scale urban developments",
    ],
    configurations: [
      {
        title: "Gearless traction machines",
        description:
          "High-performance permanent magnet gearless machines are matched to travel height and duty requirements.",
      },
      {
        title: "VVVF drive and ride quality",
        description:
          "Variable-frequency drive control supports smooth acceleration, accurate levelling and comfortable ride quality across the travel range.",
      },
      {
        title: "Aerodynamic cabin design",
        description:
          "Cabin shape, weight and pressure control are considered to improve passenger comfort during high-speed travel.",
      },
      {
        title: "Advanced group control",
        description:
          "Destination-oriented and group control strategies reduce waiting time and improve handling capacity during peak demand.",
      },
    ],
    supplyPoints: [
      "Tall-building engineering support from traffic analysis to interface drawings",
      "Gearless traction and VVVF drive configurations",
      "Cabin and door systems selected for high-speed travel",
      "Factory testing before export and installation",
    ],
    faqs: [
      {
        question: "How is the right speed selected for a tower?",
        answer:
          "Speed is determined from building height, population, expected traffic peaks, acceptable waiting times and core layout. Final values are confirmed in the traffic analysis and project specification.",
      },
      {
        question: "Can high-speed elevators use destination control?",
        answer:
          "Yes. Destination-oriented control can be specified to group passengers by destination, reduce stops and improve handling capacity in tall buildings.",
      },
    ],
    related: ["passenger-elevators", "panoramic-elevators", "escalators"],
    keywords: [
      "high-speed elevator manufacturer",
      "high-rise elevator supplier",
      "high-speed passenger lift",
      "elevator for tall buildings",
    ],
  },

  "hospital-elevators": {
    slug: "hospital-elevators",
    title: "Hospital Bed Elevators",
    shortTitle: "Hospital Bed Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/hospital-bed-elevators",
    image: "/Elevators/Hospital bad elevator/hospital.png",
    imageAlt: "Hospital bed elevator designed for patient transport",
    summary:
      "Hospital bed elevators support the safe movement of patients, beds, stretchers, medical equipment and clinical staff. Fuji Fenix healthcare lifts are configured for hygiene, reliability and the demanding traffic patterns of medical facilities.",
    applications: [
      "Hospitals and medical centres",
      "Clinics and diagnostic facilities",
      "Care homes and rehabilitation centres",
      "Medical towers and healthcare campuses",
      "Laboratory and research buildings",
    ],
    configurations: [
      {
        title: "Bed and stretcher access",
        description:
          "Cabin depth, door width and opening type are configured for beds, stretchers and mobile medical equipment.",
      },
      {
        title: "Priority and emergency control",
        description:
          "Priority, attendant and emergency return functions support clinical transport when specified.",
      },
      {
        title: "Hygienic cabin finishes",
        description:
          "Durable, easy-clean wall, floor and handrail finishes are selected for healthcare environments.",
      },
      {
        title: "Reliability and redundancy",
        description:
          "Machine-room and MRL arrangements, redundant group control and service planning help maintain availability in critical facilities.",
      },
    ],
    supplyPoints: [
      "Healthcare-specific cabin and door configurations",
      "Priority and emergency operating options",
      "Hygienic finish packages",
      "Engineering documentation for hospital project consultants",
    ],
    faqs: [
      {
        question: "Can hospital elevators accommodate different bed sizes?",
        answer:
          "Cabin and door dimensions are selected around the beds, stretchers and equipment used by the facility. The clinical team's requirements and local accessibility rules are reviewed before the final specification is issued.",
      },
      {
        question: "Is emergency power operation available?",
        answer:
          "Emergency operation and return-to-floor functions can be specified where the building provides the required power supply. The exact configuration is agreed with the hospital's MEP consultant.",
      },
    ],
    related: ["passenger-elevators", "freight-elevators", "high-speed-elevators"],
    keywords: [
      "hospital bed elevator supplier",
      "hospital elevator manufacturer",
      "medical lift supplier",
      "bed elevator for hospital",
    ],
  },

  "freight-elevators": {
    slug: "freight-elevators",
    title: "Freight Elevators",
    shortTitle: "Freight Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/freight-elevators",
    image: "/Elevators/Flight Elevators/flight elevator image 1.jpeg",
    imageAlt: "Freight elevator system for goods and materials handling",
    summary:
      "Freight elevators move goods, materials, trolleys and heavy equipment safely between levels in industrial, logistics, retail and commercial buildings. Fuji Fenix freight systems are engineered for the loads, handling equipment and duty cycles of each facility.",
    applications: [
      "Warehouses and distribution centres",
      "Factories and production plants",
      "Retail back-of-house and stockrooms",
      "Commercial and mixed-use buildings",
      "Workshops and service facilities",
    ],
    configurations: [
      {
        title: "Reinforced cabin and platform",
        description:
          "Cabin construction, platform strength and flooring are selected for the loads and handling equipment used in the facility.",
      },
      {
        title: "Heavy-duty door systems",
        description:
          "Door width, height and mechanical strength are configured for pallets, trolleys and frequent loading cycles.",
      },
      {
        title: "Goods-only operation",
        description:
          "Control functions can be restricted to authorised staff, with call and dispatch logic suited to logistics operations.",
      },
      {
        title: "Loading and unloading access",
        description:
          "Door arrangements, thresholds and landing protection are coordinated with the building's logistics flow.",
      },
    ],
    supplyPoints: [
      "Load-specific cabin and platform engineering",
      "Heavy-duty door and landing configurations",
      "Controls suited to staff-only goods transport",
      "Documentation for industrial and logistics projects",
    ],
    faqs: [
      {
        question: "How is freight elevator capacity determined?",
        answer:
          "Capacity is based on the heaviest loads, the handling equipment, pallet or trolley dimensions, duty cycle and building structure. The final load and dimensions are confirmed during engineering.",
      },
      {
        question: "Can freight elevators be used by people?",
        answer:
          "Freight elevators are normally configured for goods transport. Where passenger use is required, the system must be specified and approved for that duty under the applicable local requirements.",
      },
    ],
    related: ["passenger-elevators", "hospital-elevators", "car-elevators"],
    keywords: [
      "freight elevator manufacturer",
      "goods lift supplier",
      "cargo elevator manufacturer",
      "freight lift for warehouse",
    ],
  },

  "panoramic-elevators": {
    slug: "panoramic-elevators",
    title: "Panoramic & Observation Elevators",
    shortTitle: "Panoramic Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/panoramic-observation-elevators",
    image: "/Elevators/Panoramic Elevator/panoramic glass elevator.jpg",
    imageAlt: "Panoramic glass elevator with observation cabin",
    summary:
      "Panoramic and observation elevators turn vertical travel into part of the building experience. Fuji Fenix glass cabin systems are used in hotel atriums, retail centres, offices, villas and public buildings where visibility and design are central.",
    applications: [
      "Hotel atriums and lobbies",
      "Shopping centres and retail",
      "Office and commercial buildings",
      "Observation and landmark projects",
      "Luxury villas and residences",
    ],
    configurations: [
      {
        title: "Glass and semi-glass cabins",
        description:
          "Cabin glazing, frame profiles and sightlines are selected to match the architectural design and structural requirements.",
      },
      {
        title: "Curved and round shapes",
        description:
          "Curved, round and custom cabin geometries are available for feature lifts in atriums and public spaces, subject to engineering review.",
      },
      {
        title: "Feature lighting and finishes",
        description:
          "LED ceiling treatments, integrated handrails and metal finishes are configured for the interior concept.",
      },
      {
        title: "MRL and machine-room options",
        description:
          "Drive and machine arrangements are selected around the available shaft and building core.",
      },
    ],
    supplyPoints: [
      "Glass cabin engineering for feature installations",
      "Curved, round and custom cabin options",
      "Finishes and lighting coordinated with interior designers",
      "Export documentation and installation guidance",
    ],
    faqs: [
      {
        question: "Can panoramic cabins be customised in shape and finish?",
        answer:
          "Yes, within engineering limits. Cabin geometry, glazing layout, frames, ceilings and finishes are developed with the architect and confirmed against structural and safety requirements.",
      },
      {
        question: "Are panoramic elevators suitable for outdoor locations?",
        answer:
          "Semi-outdoor and outdoor applications require specific protection, drainage and material selections. Suitability is confirmed against the site conditions and the local authority's requirements.",
      },
    ],
    related: ["passenger-elevators", "home-elevators", "high-speed-elevators"],
    keywords: [
      "panoramic elevator manufacturer",
      "glass elevator supplier",
      "observation elevator manufacturer",
      "panoramic lift for hotel",
    ],
  },

  escalators: {
    slug: "escalators",
    title: "Escalators",
    shortTitle: "Escalators",
    category: "Escalators & Moving Walks",
    categorySlug: "escalators-moving-walks",
    productHref: "/products/escalators-moving-walks/escalator",
    image: "/escalator.jpg",
    imageAlt: "Commercial escalator installation by Fuji Fenix",
    summary:
      "Escalators move high volumes of people efficiently between floors in retail, transport and public buildings. Fuji Fenix escalator systems are specified for continuous operation, passenger safety and the architectural finish of each location.",
    applications: [
      "Shopping centres and retail",
      "Airports and transit terminals",
      "Metro and railway stations",
      "Commercial and office buildings",
      "Public and cultural facilities",
    ],
    configurations: [
      {
        title: "Indoor and semi-outdoor versions",
        description:
          "Environmental protection, materials and drainage are selected for indoor, semi-outdoor or exposed installations where specified.",
      },
      {
        title: "Heavy-duty drive systems",
        description:
          "Drive and chain systems are matched to passenger volume, rise and continuous operating hours.",
      },
      {
        title: "Safety and monitoring features",
        description:
          "Skirt guards, handrail monitoring, emergency stops and fault diagnostics are included according to the applicable standard and project specification.",
      },
      {
        title: "Balustrade and finish options",
        description:
          "Balustrade materials, lighting, handrail colours and cladding are selected to integrate with the building interior.",
      },
    ],
    supplyPoints: [
      "Escalators for retail, transit and public infrastructure",
      "Indoor and semi-outdoor configurations",
      "Heavy-duty drives for continuous operation",
      "Technical documentation for consultants and contractors",
    ],
    faqs: [
      {
        question: "How are escalator width and rise selected?",
        answer:
          "Width and rise are based on passenger volume, floor-to-floor height, available space and the required handling capacity. Final dimensions are confirmed during layout engineering.",
      },
      {
        question: "What maintenance information is supplied?",
        answer:
          "The documentation package includes operating and maintenance guidance, safety instructions and recommended service intervals for the specified model.",
      },
    ],
    related: ["moving-walks", "passenger-elevators", "freight-elevators"],
    keywords: [
      "escalator manufacturer",
      "commercial escalator supplier",
      "escalator for shopping mall",
      "escalator for airport",
    ],
  },

  "moving-walks": {
    slug: "moving-walks",
    title: "Moving Walks",
    shortTitle: "Moving Walks",
    category: "Escalators & Moving Walks",
    categorySlug: "escalators-moving-walks",
    productHref: "/products/escalators-moving-walks/moving-walks",
    image: "/Elevators/Moving Walk/Moving Walk1.png",
    imageAlt: "Moving walk installation for a transport hub",
    summary:
      "Moving walks provide level or gently inclined passenger movement across long distances in airports, transit hubs, retail centres and public buildings. Fuji Fenix moving walks are configured for high throughput, safety and continuous operation.",
    applications: [
      "Airports and transit terminals",
      "Metro and railway stations",
      "Convention and exhibition centres",
      "Large retail and mixed-use centres",
      "Public and institutional buildings",
    ],
    configurations: [
      {
        title: "Horizontal and inclined layouts",
        description:
          "Horizontal and inclined configurations are selected around the building's level changes and passenger routes.",
      },
      {
        title: "Heavy-duty pallet systems",
        description:
          "Pallet width and drive capacity are matched to expected passenger volumes and luggage or trolley traffic.",
      },
      {
        title: "Safety and monitoring",
        description:
          "Handrail monitoring, skirt protection, emergency stops and diagnostic functions are specified for public operation.",
      },
      {
        title: "Architectural integration",
        description:
          "Balustrades, cladding, lighting and finishes are coordinated with the terminal or retail design.",
      },
    ],
    supplyPoints: [
      "Moving walks for airports, transit and major public buildings",
      "Horizontal and inclined configurations",
      "Heavy-duty components for continuous operation",
      "Layout and interface documentation for contractors",
    ],
    faqs: [
      {
        question: "What is the difference between a moving walk and an escalator?",
        answer:
          "A moving walk uses a flat or slightly inclined pallet band for level movement, while an escalator uses moving steps for floor-to-floor travel. The choice depends on the route, level change and passenger flow.",
      },
      {
        question: "Can moving walks handle luggage trolleys?",
        answer:
          "Suitable pallet widths and safety arrangements can be specified for luggage and trolley traffic. The operating rules and configuration are confirmed with the facility operator.",
      },
    ],
    related: ["escalators", "passenger-elevators", "freight-elevators"],
    keywords: [
      "moving walk manufacturer",
      "moving walkway supplier",
      "airport moving walk",
      "travelator manufacturer",
    ],
  },

  "car-elevators": {
    slug: "car-elevators",
    title: "Car Elevators",
    shortTitle: "Car Elevators",
    category: "Elevators",
    categorySlug: "elevators",
    productHref: "/products/elevators/car-elevators",
    image: "/Elevators/Car Elevator/car elevator1.png",
    imageAlt: "Car elevator platform for vehicle transport between levels",
    summary:
      "Car elevators move vehicles between floors in showrooms, dealerships, residences, workshops and automated parking facilities. Fuji Fenix car lift systems are engineered around vehicle dimensions, traffic flow and the building's structural constraints.",
    applications: [
      "Car showrooms and dealerships",
      "Luxury residential garages",
      "Automotive workshops and service centres",
      "Automated and mechanical parking",
      "Mixed-use buildings with stacked parking",
    ],
    configurations: [
      {
        title: "Vehicle-specific platforms",
        description:
          "Platform size, load rating and surface treatment are selected for the cars, vans or equipment the facility will handle.",
      },
      {
        title: "Structural and pit arrangements",
        description:
          "The lift structure, pit depth and overhead requirements are coordinated with the building's civil and structural design.",
      },
      {
        title: "Driver and attendant control",
        description:
          "Control options support driver-operated, attendant-operated or automated parking workflows.",
      },
      {
        title: "Safety and vehicle protection",
        description:
          "Wheel guides, door protection, positioning systems and emergency functions are configured for vehicle transport.",
      },
    ],
    supplyPoints: [
      "Vehicle-specific platform and load engineering",
      "Coordination with parking and structural systems",
      "Driver-operated and automated control options",
      "Factory testing and export support",
    ],
    faqs: [
      {
        question: "How much does vehicle size affect a car elevator?",
        answer:
          "Vehicle length, width, height, weight and wheelbase determine the platform and cabin dimensions. The largest vehicle expected to use the lift, plus operating clearances, should be confirmed during planning.",
      },
      {
        question: "Can car elevators integrate with automated parking?",
        answer:
          "Yes, subject to the parking system's interface requirements. Control, positioning and safety interfaces are coordinated with the parking equipment supplier during engineering.",
      },
    ],
    related: ["freight-elevators", "passenger-elevators", "high-speed-elevators"],
    keywords: [
      "car elevator manufacturer",
      "vehicle lift supplier",
      "automobile elevator",
      "car lift for showroom",
    ],
  },
};

/** Order used for navigation, hub cards and sitemap output. */
export const FOCUS_ORDER: FocusSlug[] = [
  "passenger-elevators",
  "home-elevators",
  "high-speed-elevators",
  "hospital-elevators",
  "freight-elevators",
  "panoramic-elevators",
  "escalators",
  "moving-walks",
  "car-elevators",
];

export function getFocus(slug: string): ProductFocus | undefined {
  return PRODUCT_FOCUSES[slug as FocusSlug];
}

export function getFocuses(slugs: FocusSlug[]): ProductFocus[] {
  return slugs.map((slug) => PRODUCT_FOCUSES[slug]).filter(Boolean);
}
