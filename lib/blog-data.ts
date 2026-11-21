/**
 * Editorial content for the Fuji Fenix blog.
 *
 * These are real, indexable articles — not doorway pages. Every article targets
 * a distinct buyer question, links back to relevant product/market pages and is
 * included in the XML sitemap with Article structured data.
 *
 * No unconfirmed local-office, manufacturing or installation claims are made.
 * Service coverage is always described as project-specific.
 */

export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: BlogLink[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  datePublished: string;
  dateModified: string;
  author: string;
  readingMinutes: number;
  focusKeyphrase: string;
  keywords: string[];
  takeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  related: BlogLink[];
}

export const BLOG_UPDATED = "2026-11-22";

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "elevator-manufacturer-china-shanghai",
    category: "China sourcing",
    title: "Elevator Manufacturer in China: How to Choose a Shanghai Supplier",
    seoTitle: "Elevator Manufacturer China | Shanghai Supplier Guide",
    description:
      "Choose an elevator manufacturer in China with confidence: factory checks, drawings, standards, product range, factory testing and export documentation for Shanghai suppliers.",
    heroImage: "/building-exterior.jpg",
    heroAlt: "Modern tower supplied by a China elevator manufacturer",
    datePublished: "2026-11-22",
    dateModified: "2026-11-22",
    author: "Fuji Fenix Elevator",
    readingMinutes: 8,
    focusKeyphrase: "elevator manufacturer China",
    keywords: [
      "elevator manufacturer China",
      "elevator supplier China",
      "elevator manufacturer Shanghai",
      "elevator factory Shanghai",
      "Shanghai elevator supplier",
      "China elevator exporter",
      "elevator exporter China",
      "escalator manufacturer China",
      "elevator factory",
      "elevator manufacturer direct",
      "OEM elevator manufacturer",
      "ODM elevator supplier",
      "custom elevator manufacturer",
      "elevator supplier for projects",
      "elevator export documentation",
      "elevator technical drawings",
      "elevator factory testing",
      "passenger elevators",
      "high speed elevators",
      "home elevators",
      "hospital elevators",
      "freight elevators",
      "escalators",
      "moving walks",
      "vertical transportation supplier",
    ],
    takeaways: [
      "Judge a China elevator factory on drawings, testing and documentation — not only on unit price.",
      "Confirm that the product range covers every lift type in the project, including escalators and moving walks.",
      "Ask for the export document pack before production starts.",
      "Agree packing, shipment sequence and spare parts with the supplier in writing.",
    ],
    sections: [
      {
        id: "china-sourcing-base",
        heading: "Why China remains a practical sourcing base",
        paragraphs: [
          "Buyers searching for an elevator manufacturer China usually want three things: a controlled factory, a broad product range and a supplier that can ship to a different regulatory environment. Shanghai is one of the established manufacturing bases for elevators, escalators and moving walks, and Fuji Fenix operates from its Shanghai facility.",
          "Factory-direct supply can help when a project needs custom elevator cabins, coordinated drawing packages or a mixed order of lifts and escalators. The advantage is only real if the supplier can show how the equipment will be engineered, tested, packed and supported after arrival.",
          "This guide sets out the checks that matter when comparing a Shanghai elevator supplier with other elevator suppliers in China.",
        ],
        links: [{ label: "China market page", href: "/cn" }],
      },
      {
        id: "factory-checks",
        heading: "What to check before you shortlist a factory",
        paragraphs: [
          "Start with evidence, not claims. A serious elevator factory should be able to walk you through its production process, show relevant test records and explain how it handles revisions to drawings and finishes.",
          "For an OEM elevator manufacturer or ODM elevator supplier, confirm who owns the design, what can be customised and how changes are controlled. For a custom elevator manufacturer, ask for a finish sample and a drawing revision history before the order is placed.",
        ],
        bullets: [
          "Factory overview: production lines, assembly area and quality checkpoints.",
          "Product range: passenger, home, hospital, freight, panoramic and high speed elevators, escalators and moving walks.",
          "Engineering output: shaft drawings, interface drawings and finish schedules.",
          "Testing and records: factory testing procedure and inspection documents in the required format.",
          "After-sales: recommended spare parts, operating manuals and a technical contact route.",
        ],
      },
      {
        id: "product-range",
        heading: "Products a Chinese supplier should cover",
        paragraphs: [
          "A single project may need several lift types. Passenger elevators and high speed elevators serve tower traffic; home elevators and villa lifts serve residences; hospital elevators and freight elevators have dimensional and load requirements that must be checked early. Panoramic elevators add an architectural requirement, while escalators and moving walks serve public circulation.",
          "Ask the supplier to confirm which products are manufactured in-house and which are sourced. That answer affects consistency of finishes, documentation and spare parts.",
        ],
        links: [
          { label: "China passenger elevators", href: "/cn/passenger-elevators" },
          { label: "China high speed elevators", href: "/cn/high-speed-elevators" },
          { label: "China escalators", href: "/cn/escalators" },
          { label: "China moving walks", href: "/cn/moving-walks" },
        ],
        image: {
          src: "/hero-elevator.jpg",
          alt: "Passenger elevator cabin manufactured for an international project",
          caption: "A factory-direct supplier should explain how cabin, shaft and door drawings connect.",
        },
      },
      {
        id: "drawings-and-testing",
        heading: "Drawings, standards and factory testing",
        paragraphs: [
          "Elevator technical drawings should be issued early: shaft plan, car layout, door openings, pit and overhead details, plus electrical interface points. These files let the architect, structural engineer and electrical contractor design around the equipment.",
          "The compliance matrix should map the project’s specified standard and local approval route to the equipment supplied. Elevator factory testing records should be requested before shipment, not after arrival on site.",
        ],
        links: [
          { label: "Elevator export documents checklist", href: "/blog/elevator-export-documents-checklist" },
          { label: "Our services", href: "/services" },
        ],
      },
      {
        id: "export-planning",
        heading: "Export packing and shipment planning",
        paragraphs: [
          "When you work with an elevator exporter China route, agree commercial invoice details, packing lists, country-of-origin information and material declarations before production. Packing should follow the installation sequence so the site team receives components in a usable order.",
          "A China elevator exporter should also state clearly who handles local authority submission and who provides installation support. Fuji Fenix confirms these responsibilities per project; we do not assume that every destination has the same service arrangement.",
        ],
        image: {
          src: "/escalator.jpg",
          alt: "Escalator supplied as part of an international vertical transportation order",
          caption: "Mixed elevator and escalator orders need coordinated packing and shipment sequencing.",
        },
        links: [
          { label: "Request a quotation", href: "/contact" },
          { label: "All markets", href: "/markets" },
        ],
      },
      {
        id: "related-search-terms",
        heading: "Related search terms this guide covers",
        paragraphs: [
          "Different buyers use different wording for the same supplier review. These terms are covered in this guide.",
        ],
        bullets: [
          "English: elevator manufacturer China, elevator supplier China, elevator manufacturer Shanghai, elevator factory Shanghai, Shanghai elevator supplier, China elevator exporter, elevator exporter China.",
          "Products: escalator manufacturer China, passenger elevators, high speed elevators, home elevators, hospital elevators, freight elevators, escalators, moving walks.",
          "Supply model: elevator factory, elevator manufacturer direct, OEM elevator manufacturer, ODM elevator supplier, custom elevator manufacturer, elevator supplier for projects, vertical transportation supplier.",
          "Documents: elevator export documentation, elevator technical drawings, elevator factory testing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why choose an elevator manufacturer in China?",
        answer:
          "A China-based factory can offer a broad product range, controlled manufacturing and factory-direct pricing. The deciding factors should be engineering drawings, test records, export experience and clear support responsibilities — not price alone.",
      },
      {
        question: "How do I verify a Shanghai elevator supplier?",
        answer:
          "Ask for a factory overview, product range, drawing samples, factory testing records and a list of documents supplied with shipment. Confirm who handles design ownership, finish approvals and after-sales support.",
      },
      {
        question: "Can one China elevator exporter supply escalators too?",
        answer:
          "Yes. Fuji Fenix manufactures elevators, escalators and moving walks in Shanghai, so mixed projects can be reviewed as one package with consistent drawings, finishes and shipment planning.",
      },
      {
        question: "What export documents should a China elevator factory provide?",
        answer:
          "Request the compliance matrix, elevator technical drawings, factory testing records, commercial invoice, packing list, country-of-origin information, material declarations and a recommended spare-parts list.",
      },
      {
        question: "Do you only supply projects inside China?",
        answer:
          "No. China is our manufacturing base, and we supply priority markets across South Asia, the Gulf, Africa and Asia. Installation and maintenance arrangements are confirmed per project rather than assumed for every country.",
      },
    ],
    related: [
      { label: "China market page", href: "/cn" },
      { label: "Passenger, home or freight elevator guide", href: blogPath("passenger-home-freight-elevators") },
      { label: "Elevator export documents checklist", href: blogPath("elevator-export-documents-checklist") },
    ],
  },
  {
    slug: "elevator-supplier-pakistan-uae-saudi-arabia",
    category: "Market guides",
    title:
      "Elevator Supplier in Pakistan, UAE & Saudi Arabia: A Project Buyer’s Guide",
    seoTitle: "Elevator Supplier Pakistan, UAE & Saudi Arabia Guide",
    description:
      "How to choose an elevator supplier for projects in Pakistan, the UAE (including Dubai) and Saudi Arabia: standards, drawings, traffic design, finishes and export documents.",
    heroImage: "/building-exterior.jpg",
    heroAlt: "Modern commercial tower using passenger elevators and escalators",
    datePublished: "2026-11-22",
    dateModified: "2026-11-22",
    author: "Fuji Fenix Elevator",
    readingMinutes: 8,
    focusKeyphrase: "elevator supplier Pakistan UAE Saudi Arabia",
    keywords: [
      "elevator supplier Pakistan",
      "elevator manufacturer Pakistan",
      "escalator supplier Pakistan",
      "elevator supplier UAE",
      "elevator manufacturer UAE",
      "elevator supplier Dubai",
      "elevator manufacturer Dubai",
      "escalator supplier Dubai",
      "elevator supplier Saudi Arabia",
      "elevator manufacturer Saudi Arabia",
      "escalator supplier Saudi Arabia",
      "elevator exporter China",
      "elevator exporter to Middle East",
      "elevator supplier for projects",
      "elevator project supplier",
      "request elevator quote",
      "elevator tender",
      "elevator technical drawings",
      "elevator export documentation",
      "passenger elevators",
      "high speed elevators",
      "panoramic elevators",
      "hospital elevators",
      "escalators",
      "moving walks",
      "vertical transportation supplier",
    ],
    takeaways: [
      "Compare suppliers on engineering output and documentation, not only unit price.",
      "Confirm the destination market’s approval route before the contract is signed.",
      "Share floor count, shaft dimensions, traffic and finishes to get a usable quotation.",
      "Ask who supplies installation, spare parts and commissioning support in your project.",
    ],
    sections: [
      {
        id: "start-with-the-project",
        heading: "Start with the building, not the brochure",
        paragraphs: [
          "An elevator supplier for a residential tower in Karachi, a mixed-use development in Dubai and a healthcare project in Riyadh is being asked to solve three different problems. The right specification starts with the building: how many stops it has, who moves through it at peak time and what the consultant has already fixed in the shaft drawings.",
          "Before shortlisting an elevator manufacturer, prepare a one-page brief with project location, building type, floor count, approximate shaft size, expected passenger volume, target delivery window and whether escalators or moving walks are also in scope. An elevator project supplier that asks for these details is usually more useful than one that quotes a catalogue model immediately. A vertical transportation supplier should be judged on the quality of that brief and the drawings that follow it.",
          "Fuji Fenix manufactures elevators, escalators and moving walks in Shanghai and supplies project teams across our priority markets. We do not assume that every market needs the same configuration; each proposal starts from the drawings and the approval route of the destination country.",
        ],
        links: [
          { label: "Pakistan market page", href: "/pk" },
          { label: "UAE and Dubai market page", href: "/ae" },
          { label: "Saudi Arabia market page", href: "/sa" },
        ],
      },
      {
        id: "standards-and-approvals",
        heading: "Standards and approvals differ by market",
        paragraphs: [
          "The most common reason an elevator tender slips is late discovery of a local code or authority requirement. In some projects the consultant names a specific standard family; in others the authority has its own submission and inspection sequence. The supplier should confirm the compliance matrix, documentation language and approval responsibilities early.",
          "For buyers comparing an elevator supplier in Pakistan, UAE or Saudi Arabia, ask for the exact list of documents the supplier will provide and who signs them. Do not assume that a certificate accepted in one country automatically satisfies another authority.",
        ],
        bullets: [
          "A written compliance matrix against the project’s specified code and local authority requirements.",
          "Shop drawings for car, shaft, door and machine-room or machine-room-less arrangements.",
          "Factory test records and inspection documents in the format expected by the project consultant.",
          "Confirmation of who coordinates third-party inspection, if it is required.",
        ],
      },
      {
        id: "traffic-and-car-specification",
        heading: "Traffic, speed and car specification",
        paragraphs: [
          "Passenger elevators in office towers are usually selected after a traffic study: peak demand, transfer floors and group behaviour matter as much as rated speed. High speed elevators may be specified for taller buildings, while panoramic elevators are often chosen where the lift is part of the architectural experience.",
          "Home elevators and villa lifts follow a different logic: compact shaft planning, low-noise operation and cabin finishes that match the residence. Hospital elevators need careful attention to stretcher dimensions and door clear widths. Freight elevators and goods lifts are sized around loads and loading patterns rather than passenger comfort alone.",
          "A reliable elevator exporter should be able to explain why a configuration was proposed, not just list features. If a supplier cannot connect traffic, shaft and finish decisions to your building type, the specification is probably incomplete.",
        ],
        links: [
          { label: "Passenger elevators", href: "/pk/passenger-elevators" },
          { label: "Panoramic elevators in the UAE", href: "/ae/panoramic-elevators" },
          { label: "High speed elevators in Saudi Arabia", href: "/sa/high-speed-elevators" },
        ],
        image: {
          src: "/hero-elevator.jpg",
          alt: "Passenger elevator interior with modern cabin finishes",
          caption: "Car size, speed and finishes should follow the building’s traffic and design brief.",
        },
      },
      {
        id: "drawings-and-export-documents",
        heading: "Drawings and export documents to request",
        paragraphs: [
          "For international projects, documentation is part of the product. Request the interface drawings early enough for the civil and MEP teams to react: shaft plan, pit and overhead details, door openings, machine placement, electrical loads and any embedded items.",
          "Elevator export documentation should be agreed at contract review. Packing lists, commercial invoice, bill of lading details, country-of-origin information and any material declarations all affect customs clearance and site handover.",
        ],
        bullets: [
          "Elevator technical drawings: shaft plan, elevation, pit and overhead sections.",
          "Elevator interface drawings showing power, ventilation and civil works requirements.",
          "Elevator load calculation and traffic assumptions where the consultant requires them.",
          "Export documentation, packing list and spare-parts list agreed before shipment.",
        ],
      },
      {
        id: "installation-and-after-sales",
        heading: "Installation, commissioning and after-sales support",
        paragraphs: [
          "Ask who will install and commission the equipment. In some projects the buyer’s own contractor handles installation; in others an appointed local partner is used. Fuji Fenix confirms installation and maintenance coverage per project and provides factory engineering support, documentation and spare-parts guidance where required.",
          "A clear handover package matters as much as the equipment itself: operating instructions, maintenance schedule, recommended spares and contact route for technical questions. Get these commitments in writing before placing the order.",
        ],
        links: [
          { label: "Our services", href: "/services" },
          { label: "Request a quotation", href: "/contact" },
        ],
        image: {
          src: "/realistic-earth.jpg",
          alt: "Global map illustrating international elevator and escalator supply",
          caption: "Market coverage should be confirmed project by project, not assumed from a brochure.",
        },
      },
      {
        id: "quote-checklist",
        heading: "What to send for a faster quotation",
        paragraphs: [
          "The fastest way to receive a usable elevator quotation is to send consistent inputs. Include the project city, building type, number of floors and stops, passenger volume, shaft dimensions, required products, finish preference, applicable standards and target delivery date. When you request elevator quote pricing, ask for the drawing list and delivery plan alongside the price.",
          "For escalators and moving walks, add rise, incline, expected traffic and whether the installation is indoor or outdoor. With those details, a supplier can return a configuration, drawing list and realistic delivery plan instead of a rough price.",
        ],
        bullets: [
          "Project location, building type and construction stage.",
          "Number of stops, shaft dimensions and pit/overhead constraints.",
          "Product mix: passenger, home, hospital, freight, panoramic, escalators or moving walks.",
          "Standards, approval route, finishes and target shipment date.",
        ],
        links: [{ label: "Compare all 22 markets", href: "/markets" }],
      },
      {
        id: "related-search-terms",
        heading: "Related search terms this guide covers",
        paragraphs: [
          "Project teams describe the same requirement in different ways. The wording below maps to the same engineering review and document package.",
        ],
        bullets: [
          "Pakistan: elevator supplier Pakistan, elevator manufacturer Pakistan, escalator supplier Pakistan.",
          "UAE and Dubai: elevator supplier UAE, elevator manufacturer UAE, elevator supplier Dubai, elevator manufacturer Dubai, escalator supplier Dubai.",
          "Saudi Arabia: elevator supplier Saudi Arabia, elevator manufacturer Saudi Arabia, escalator supplier Saudi Arabia.",
          "Procurement: elevator exporter China, elevator exporter to Middle East, elevator project supplier, request elevator quote, vertical transportation supplier.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is the best elevator supplier for projects in Pakistan?",
        answer:
          "The best supplier for a Pakistan project is one that confirms the local approval route, provides shaft and interface drawings, and states clearly who handles installation and spare parts. Fuji Fenix supplies engineered elevator and escalator equipment from Shanghai and reviews each Pakistan project against its drawings and standards.",
      },
      {
        question: "Do you supply elevators in Dubai and the wider UAE?",
        answer:
          "Yes, the UAE is a priority market and Dubai is covered within it. Passenger, panoramic, home, hospital, freight and high-speed elevators, plus escalators and moving walks, can be configured for UAE projects. Installation and service arrangements are confirmed per project.",
      },
      {
        question: "What documents should I request from an elevator exporter in China?",
        answer:
          "Request the compliance matrix, technical and interface drawings, factory test records, packing list, commercial invoice, shipping details and a recommended spare-parts list. Agree the required language and authority format before production.",
      },
      {
        question: "Can one supplier cover elevators and escalators for the same project?",
        answer:
          "Yes. Fuji Fenix manufactures both elevators and escalators, as well as moving walks, so a mixed-use project can be reviewed as one vertical transportation package with consistent documentation and shipment planning.",
      },
      {
        question: "How do I get an elevator quotation for Saudi Arabia?",
        answer:
          "Share the project location, building type, floor count, shaft dimensions, expected traffic, product types, standards and delivery target. Use the contact page to send the brief; the team will confirm the configuration, documentation and shipping plan.",
      },
    ],
    related: [
      { label: "Passenger, home or freight elevator guide", href: blogPath("passenger-home-freight-elevators") },
      { label: "Elevator export documents checklist", href: blogPath("elevator-export-documents-checklist") },
      { label: "Global markets", href: "/markets" },
    ],
  },
  {
    slug: "passenger-home-freight-elevators",
    category: "Product guides",
    title: "Passenger, Home or Freight Elevator? How to Specify the Right Lift",
    seoTitle: "Passenger vs Home vs Freight Elevator Guide",
    description:
      "Compare passenger elevators, home lifts and freight elevators by traffic, shaft space, load and finishes. A practical specification guide for developers, architects and contractors.",
    heroImage: "/home-elevator.jpg",
    heroAlt: "Private home elevator installed in a modern residence",
    datePublished: "2026-11-20",
    dateModified: "2026-11-22",
    author: "Fuji Fenix Elevator",
    readingMinutes: 7,
    focusKeyphrase: "passenger home freight elevator guide",
    keywords: [
      "passenger elevators",
      "passenger lifts",
      "passenger elevator manufacturer",
      "home elevators",
      "villa elevators",
      "home lifts",
      "luxury villa lifts",
      "freight elevators",
      "goods lifts",
      "heavy duty freight elevators",
      "hospital elevators",
      "hospital bed lifts",
      "panoramic elevators",
      "glass lifts",
      "high speed elevators",
      "MRL elevators",
      "machine room less elevators",
      "custom elevator cabins",
      "elevator load calculation",
      "elevator traffic analysis",
    ],
    takeaways: [
      "Passenger elevators are sized around traffic, group control and waiting time.",
      "Home elevators prioritise compact shafts, quiet operation and interior finishes.",
      "Freight elevators are sized around load, platform dimensions and loading method.",
      "Hospital and panoramic lifts have additional dimensional or architectural requirements.",
    ],
    sections: [
      {
        id: "three-questions",
        heading: "Three questions before choosing a lift type",
        paragraphs: [
          "Elevator selection is not a matter of picking the largest car. Start with three questions: who uses the lift, what moves through it and how much shaft space is available. The answers usually separate passenger elevators, home elevators and freight elevators very quickly.",
          "Architects often ask for a single supplier that can cover several lift types in one building. That is practical, provided each lift is specified on its own duty cycle instead of being treated as a catalogue variation of the same car.",
        ],
      },
      {
        id: "passenger-elevators",
        heading: "Passenger elevators: traffic, group control and waiting time",
        paragraphs: [
          "Passenger elevators in apartments, offices and hotels are sized after a traffic analysis. Peak demand, transfer floors and the number of stops influence car capacity, speed and whether two or more lifts need group control. When you compare a passenger elevator manufacturer, ask how the traffic study changed the car size and speed. In high rise towers, high speed elevators may be specified to keep waiting time acceptable.",
          "Cabin finishes are also part of the specification. Custom elevator cabins and elevator cabin finishes must be balanced against durability and cleaning needs in a busy building. A machine room less elevator may be preferred where architectural space is limited.",
        ],
        links: [
          { label: "Passenger elevator cabin", href: "/products/elevators/passenger-elevator-cabin" },
          { label: "High speed elevators", href: "/products/elevators/high-speed-elevators" },
        ],
      },
      {
        id: "home-elevators",
        heading: "Home elevators: compact planning and quiet operation",
        paragraphs: [
          "Home elevators and villa lifts are planned around the residence rather than a commercial core. Villa elevators and luxury villa lifts are often treated as part of the interior architecture. Shaft footprint, pit depth, overhead height, door arrangement and interior finishes usually drive the decision. Low noise operation and smooth rides are as important as rated load.",
          "For a villa lift, the cab can be treated as part of the interior architecture. Glass lifts or panoramic elevators may be chosen where the view matters, while more private residences often prefer fully enclosed cabin finishes.",
        ],
        links: [
          { label: "Home elevators", href: "/products/elevators/home-elevators" },
          { label: "Panoramic observation elevators", href: "/products/elevators/panoramic-observation-elevators" },
        ],
        image: {
          src: "/about-lobby.jpg",
          alt: "Premium elevator lobby and cabin finishes",
          caption: "Cabin and lobby finishes should suit both the architecture and daily traffic.",
        },
      },
      {
        id: "freight-hospital",
        heading: "Freight and hospital elevators: dimensions first",
        paragraphs: [
          "Freight elevators and goods lifts are defined by load, platform size, door width and how goods are loaded. Heavy duty freight elevators may need reinforced flooring or specific door protection. Car elevators and vehicle elevators follow the same principle at a larger scale.",
          "Hospital elevators and hospital bed lifts are governed by stretcher length, bed orientation and door clear width. These dimensions should be confirmed with the clinical planner before the shaft is fixed; changing them late in construction is expensive.",
        ],
        links: [
          { label: "Freight elevators", href: "/products/elevators/freight-elevators" },
          { label: "Hospital bed elevators", href: "/products/elevators/hospital-bed-elevators" },
        ],
      },
      {
        id: "common-mistakes",
        heading: "Common specification mistakes",
        paragraphs: [
          "The most frequent problems are an undersized pit or overhead, a door opening that does not match the equipment, and finishes selected without considering maintenance. A traffic study — sometimes requested as elevator traffic analysis — should be completed before the car count is fixed. Another common issue is ordering equipment before the destination market’s approval route is confirmed.",
          "Ask your supplier for a coordinated drawing set and an elevator load calculation where required. Those documents let the structural, electrical and architectural teams design around the lift instead of adapting the shaft after production.",
        ],
        image: {
          src: "/panoramic.jpg",
          alt: "Panoramic glass elevator in a modern building",
          caption: "Panoramic elevators combine vertical transport with an architectural feature.",
        },
        links: [{ label: "Send a project brief", href: "/contact" }],
      },
    ],
    faqs: [
      {
        question: "What is the difference between a passenger lift and a home elevator?",
        answer:
          "Passenger lifts are designed for repeated high traffic in multi-storey buildings and are often grouped with traffic analysis and group control. Home elevators are usually specified for one residence, with a smaller shaft, lower noise and interior-focused finishes.",
      },
      {
        question: "How do I choose a freight elevator capacity?",
        answer:
          "Start with the load and the largest item that must fit through the door, then confirm platform size, loading method and floor structure. Heavy duty applications may need additional floor or door protection.",
      },
      {
        question: "Are machine room less elevators suitable for retrofit projects?",
        answer:
          "MRL elevators can be useful where a traditional machine room is not available, but the existing shaft, pit, overhead and power supply must be surveyed before the configuration is confirmed.",
      },
      {
        question: "Can Fuji Fenix supply several elevator types for one project?",
        answer:
          "Yes. Passenger, home, hospital, freight, panoramic and high speed elevators can be reviewed together so that drawings, finishes, standards and shipment planning stay consistent across the package.",
      },
    ],
    related: [
      { label: "Elevator supplier guide for Pakistan, UAE and Saudi Arabia", href: blogPath("elevator-supplier-pakistan-uae-saudi-arabia") },
      { label: "Escalator and moving walk guide", href: blogPath("escalators-moving-walks-guide") },
      { label: "All elevators", href: "/products/elevators" },
    ],
  },
  {
    slug: "escalators-moving-walks-guide",
    category: "Product guides",
    title:
      "Escalators vs Moving Walks: Choosing Equipment for Malls, Airports and Metro Stations",
    seoTitle: "Escalators vs Moving Walks: Project Selection Guide",
    description:
      "Compare escalators and moving walks for shopping malls, airports, metro stations and retail projects: rise, incline, traffic, duty cycle and technical documentation.",
    heroImage: "/escalator.jpg",
    heroAlt: "Escalators in a modern commercial building",
    datePublished: "2026-11-18",
    dateModified: "2026-11-22",
    author: "Fuji Fenix Elevator",
    readingMinutes: 6,
    focusKeyphrase: "escalators vs moving walks",
    keywords: [
      "escalator manufacturer",
      "escalator supplier",
      "escalator exporter",
      "moving walk manufacturer",
      "moving walk supplier",
      "escalators",
      "moving walks",
      "autowalks",
      "travelators",
      "shopping mall escalators",
      "retail escalators",
      "airport escalators",
      "metro station escalators",
      "stadium escalators",
      "transit hub vertical transportation",
      "public infrastructure elevators",
      "elevator technical drawings",
      "elevator export documentation",
    ],
    takeaways: [
      "Escalators solve vertical change over a shorter rise; moving walks move people over longer horizontal distances.",
      "Transit hubs need higher duty-cycle attention than typical retail projects.",
      "Confirm incline, rise, step or belt width and local approval requirements early.",
      "Outdoor and semi-outdoor installations need an explicit environmental specification.",
    ],
    sections: [
      {
        id: "basic-difference",
        heading: "The basic difference",
        paragraphs: [
          "Escalators carry passengers between levels using moving steps. Moving walks, also called autowalks or travelators, move passengers across a gentle incline or a long horizontal route. The right choice depends on the distance, the rise and the way people enter and leave the equipment.",
          "Shopping mall escalators and retail escalators are usually selected for visible, high-capacity movement between retail floors. Airport escalators, metro station escalators and stadium escalators operate for long hours and need careful attention to duty cycle, queueing and replacement part planning. In large buildings, escalators may form part of transit hub vertical transportation alongside public infrastructure elevators.",
        ],
        links: [
          { label: "Escalators", href: "/products/escalators-moving-walks/escalator" },
          { label: "Moving walks", href: "/products/escalators-moving-walks/moving-walks" },
        ],
      },
      {
        id: "project-conditions",
        heading: "Conditions that change the specification",
        paragraphs: [
          "Record the rise, incline, expected passenger flow, available support span and whether the route is straight. Retail escalators often need to align with atrium design; transit equipment has to handle sustained peak loads and clear crowd control requirements.",
          "Outdoor or semi-outdoor installations need a separate environmental discussion. Cover the operating temperature, exposure to dust or water, drainage and cleaning method in the specification rather than assuming an indoor configuration will perform the same way.",
        ],
        bullets: [
          "Rise, incline and horizontal travel distance.",
          "Expected traffic at peak and total daily operating hours.",
          "Indoor, outdoor or semi-outdoor environment.",
          "Local authority approval and inspection route.",
        ],
        image: {
          src: "/building-exterior.jpg",
          alt: "Commercial building exterior with public access routes",
          caption: "Public access routes should be planned around real passenger flow, not only floor plans.",
        },
      },
      {
        id: "drawings-and-supply",
        heading: "Drawings, finishes and export planning",
        paragraphs: [
          "An escalator supplier should provide support span drawings, pit and landing details, power requirements and finish samples early enough for the architect and structural engineer to coordinate. When comparing an escalator manufacturer, escalator exporter, moving walk manufacturer or moving walk supplier, ask for the same drawing set before a price is compared. For moving walks, confirm balustrade options, handrail finish and the interface with surrounding flooring. Where elevators share the same core, request elevator technical drawings as well and agree elevator export documentation at contract review.",
          "For international projects, packing, shipment sequencing and spare parts should be agreed with the same care as the equipment. Fuji Fenix supplies escalators and moving walks from its Shanghai manufacturing base and coordinates documentation with the project team.",
        ],
        links: [
          { label: "Escalators in the UAE", href: "/ae/escalators" },
          { label: "Escalators in Saudi Arabia", href: "/sa/escalators" },
          { label: "Export documents checklist", href: blogPath("elevator-export-documents-checklist") },
        ],
      },
    ],
    faqs: [
      {
        question: "When should I choose a moving walk instead of an escalator?",
        answer:
          "Choose a moving walk when the main need is to move people across a long horizontal distance or a gentle incline. Escalators are usually better where a clear vertical level change is required in a shorter footprint.",
      },
      {
        question: "What information is needed to quote escalators?",
        answer:
          "Provide rise, incline, width, expected traffic, operating hours, indoor or outdoor conditions, support span and the applicable approval route. Finish preferences and installation responsibilities should also be stated.",
      },
      {
        question: "Can escalators and elevators be supplied in one project package?",
        answer:
          "Yes. Fuji Fenix manufactures elevators, escalators and moving walks, which allows one drawing and documentation workflow for mixed-use developments, transit projects and retail buildings.",
      },
    ],
    related: [
      { label: "Passenger, home or freight elevator guide", href: blogPath("passenger-home-freight-elevators") },
      { label: "Elevator export documents checklist", href: blogPath("elevator-export-documents-checklist") },
      { label: "Product catalogue", href: "/products" },
    ],
  },
  {
    slug: "elevator-export-documents-checklist",
    category: "Project guides",
    title: "Elevator Export Documents & Technical Drawings: A Project Checklist",
    seoTitle: "Elevator Export Documents & Drawings Checklist",
    description:
      "A practical checklist of elevator export documents, shaft drawings, interface drawings, test records and approval files for international projects and tender submissions.",
    heroImage: "/about-lobby.jpg",
    heroAlt: "Elevator lobby used in an international project specification",
    datePublished: "2026-11-16",
    dateModified: "2026-11-22",
    author: "Fuji Fenix Elevator",
    readingMinutes: 7,
    focusKeyphrase: "elevator export documentation checklist",
    keywords: [
      "elevator export documentation",
      "elevator shipping logistics",
      "elevator technical drawings",
      "elevator interface drawings",
      "elevator shaft drawings",
      "elevator civil works requirements",
      "elevator load calculation",
      "elevator traffic analysis",
      "elevator factory testing",
      "elevator compliance documentation",
      "elevator code compliance",
      "international elevator standards",
      "elevator exporter China",
      "elevator supplier for projects",
      "elevator tender",
      "vertical transportation supplier",
    ],
    takeaways: [
      "Agree the compliance matrix before production starts.",
      "Technical and interface drawings must be approved before shaft works are finalised.",
      "Packing, shipping and spare-parts lists should be part of the contract pack.",
      "Factory test records and handover documents must match the project’s approval format.",
    ],
    sections: [
      {
        id: "why-documents-matter",
        heading: "Why documentation decides project speed",
        paragraphs: [
          "On international elevator projects, the equipment is only part of the delivery. Consultants, civil contractors, electrical teams and authorities all work from documents. When those files are late or inconsistent, the installation programme absorbs the delay even if the lift itself was manufactured on time.",
          "Treat the document list as a contract deliverable. Agree formats, languages, revision control and approval deadlines at the beginning of the project.",
        ],
      },
      {
        id: "design-stage",
        heading: "Design-stage documents",
        paragraphs: [
          "At design stage, the priority is coordination. Elevator technical drawings should show the car, shaft plan, door openings, pit, overhead and machine arrangement. Elevator interface drawings should identify electrical loads, ventilation, civil works requirements and embedded items.",
          "A traffic analysis and elevator load calculation may also be required, especially for high rise or high-demand buildings. These documents let the architect and structural engineer confirm that the lift will perform as intended.",
        ],
        bullets: [
          "Shaft plan, elevation, pit and overhead sections.",
          "Car layout, door clear widths and finish schedule.",
          "Electrical load schedule and interface points.",
          "Traffic analysis and load calculation where specified.",
        ],
        image: {
          src: "/hero-elevator.jpg",
          alt: "Elevator cabin used for technical specification and finish review",
          caption: "Approved drawings and finish schedules keep manufacturing aligned with the building design.",
        },
      },
      {
        id: "compliance-stage",
        heading: "Compliance and factory records",
        paragraphs: [
          "The compliance matrix should map the project’s specified code and local approval requirements to the equipment and documents supplied. Do not rely on a generic statement that a lift is compliant; name the standard, the scope and the evidence.",
          "Before shipment, request factory testing records and inspection documents in the format the consultant and authority expect. If third-party inspection is required, confirm who books it and how revisions are handled.",
        ],
        links: [
          { label: "Our services", href: "/services" },
          { label: "Project markets", href: "/markets" },
        ],
      },
      {
        id: "shipping-stage",
        heading: "Shipping and handover pack",
        paragraphs: [
          "Elevator export documentation should include the commercial invoice, packing list, shipping instructions, country-of-origin information and any material declarations requested by the destination. Coordinate packing with the installation sequence so components arrive in the order the site team needs them.",
          "At handover, keep operating instructions, maintenance schedules, warranty terms, recommended spare parts and technical contact details in one indexed pack. A clear handover file reduces dependence on verbal knowledge when the original installation team leaves site.",
        ],
        bullets: [
          "Commercial invoice, packing list and shipping details.",
          "Country-of-origin and material declarations where required.",
          "Recommended spare-parts list and maintenance schedule.",
          "Operating manuals and technical contact route.",
        ],
        links: [
          { label: "Request an export quotation", href: "/contact" },
          { label: "Pakistan market page", href: "/pk" },
        ],
      },
      {
        id: "related-search-terms",
        heading: "Related search terms this checklist covers",
        paragraphs: [
          "Buyers, consultants and procurement teams use different names for the same files. These are the exact document and supplier terms covered by this guide.",
        ],
        bullets: [
          "Drawings: elevator technical drawings, elevator interface drawings, elevator shaft drawings, elevator civil works requirements.",
          "Engineering: elevator load calculation, elevator traffic analysis, elevator factory testing, international elevator standards, elevator code compliance, elevator compliance documentation.",
          "Export and tender: elevator export documentation, elevator shipping logistics, elevator exporter China, elevator supplier for projects, elevator tender, vertical transportation supplier.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the essential elevator technical drawings?",
        answer:
          "At minimum, request the shaft plan, elevation, pit and overhead sections, car layout, door details and interface drawing showing power and civil works requirements. The exact set depends on the project and approval route.",
      },
      {
        question: "Who is responsible for elevator export documentation?",
        answer:
          "Responsibilities should be stated in the supply contract. Fuji Fenix provides manufacturing, test and packing documents from Shanghai; the buyer or appointed partner normally handles local authority submission unless agreed otherwise.",
      },
      {
        question: "When should drawings be frozen?",
        answer:
          "Shaft and interface drawings should be approved before final civil works and production. Late changes to pit depth, overhead or door openings can delay both manufacturing and installation.",
      },
    ],
    related: [
      { label: "Elevator supplier guide for Pakistan, UAE and Saudi Arabia", href: blogPath("elevator-supplier-pakistan-uae-saudi-arabia") },
      { label: "Escalator and moving walk guide", href: blogPath("escalators-moving-walks-guide") },
      { label: "Contact the project team", href: "/contact" },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
