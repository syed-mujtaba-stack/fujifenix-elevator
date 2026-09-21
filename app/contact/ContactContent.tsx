"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SectionHeading from "@/app/components/SectionHeading";
import WeChatQRButton from "@/app/components/WeChatQR";
import ContactForm from "./ContactForm";
import { CONTACT, COMPANY } from "@/app/data/content";
import AnimatedLocationSVG from "@/app/components/AnimatedLocationSVG";

const GLOBAL_OFFICES = [
  {
    region: "ASIA",
    countries: [
      "Bangladesh",
      "Bhutan",
      "Brunei",
      "Cambodia",
      "China",
      "Hong Kong",
      "India",
      "Indonesia",
      "Japan",
      "Laos",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "Pakistan",
      "Philippines",
      "Singapore",
      "South Korea",
      "Sri Lanka",
      "Taiwan",
      "Thailand",
      "Vietnam",
    ],
  },
  {
    region: "AFRICA",
    countries: [
      "Egypt",
      "Ethiopia",
      "Ghana",
      "Kenya",
      "Madagascar",
      "Mauritius",
      "Morocco",
      "Nigeria",
      "Rwanda",
      "South Africa",
      "Tanzania",
      "Uganda",
      "Zambia",
    ],
  },
  {
    region: "EUROPE / CIS",
    countries: [
      "Albania",
      "Armenia",
      "Azerbaijan",
      "Georgia",
      "Kazakhstan",
      "Kyrgyzstan",
      "Russia",
      "Serbia",
      "Tajikistan",
      "Turkey",
      "Turkmenistan",
      "Uzbekistan",
    ],
  },
  {
    region: "MIDDLE EAST",
    countries: [
      "Bahrain",
      "Iraq",
      "Jordan",
      "Kuwait",
      "Lebanon",
      "Oman",
      "Qatar",
      "Saudi Arabia",
      "United Arab Emirates",
    ],
  },
  {
    region: "AMERICAS",
    countries: [
      "Argentina",
      "Bolivia",
      "Brazil",
      "Chile",
      "Colombia",
      "Costa Rica",
      "Dominican Republic",
      "Ecuador",
      "El Salvador",
      "Guatemala",
      "Mexico",
      "Panama",
      "Paraguay",
      "Peru",
      "Uruguay",
    ],
  },
];

export default function ContactContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ct-line",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={ref} className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — info */}
            <div className="lg:w-[40%]">
              <SectionHeading
                title="LET'S TALK"
              />
              <div className="mt-10 space-y-8">
                <div className="ct-line">
                  <div className="eyebrow text-slate-400 mb-2" style={{ fontSize: "11px" }}>
                    HEADQUARTERS
                  </div>
                  <p className="body-text text-[#0f172a] font-medium" style={{ fontSize: "17px" }}>
                    Shanghai Fuji Fenix Elevator Co Ltd.
                  </p>
                </div>
                <div className="ct-line">
                  <div className="eyebrow text-slate-400 mb-2" style={{ fontSize: "11px" }}>
                    PHONE
                  </div>
                  <a
                    href={CONTACT.phoneHref}
                    className="body-text text-[#0047BB] hover:underline"
                    style={{ fontSize: "17px" }}
                  >
                    {CONTACT.phone}
                  </a>
                </div>
                <div className="ct-line">
                  <div className="eyebrow text-slate-400 mb-2" style={{ fontSize: "11px" }}>
                    EMAIL
                  </div>
                  <a
                    href={CONTACT.emailHref}
                    className="body-text text-[#0047BB] hover:underline"
                    style={{ fontSize: "17px" }}
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div className="ct-line">
                  <div className="eyebrow text-slate-400 mb-2" style={{ fontSize: "11px" }}>
                    WECHAT
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <p className="body-text text-[#0f172a]" style={{ fontSize: "15px" }}>
                      Chat with our team instantly on WeChat.
                    </p>
                    <WeChatQRButton variant="light" label="SHOW QR CODE" />
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 flex flex-col gap-3">
                <Link href="/products" className="eyebrow text-slate-500 hover:text-[#0047BB] transition-colors">
                  EXPLORE OUR PRODUCTS
                </Link>
                <Link href="/solutions" className="eyebrow text-slate-500 hover:text-[#0047BB] transition-colors">
                  INDUSTRY SOLUTIONS
                </Link>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:w-[60%]">
              <div className="ct-line border border-slate-200 p-8 md:p-12 bg-[#f8fafc]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="bg-white">
        <div className="container-gutter pb-20 md:pb-28">
          <div className="border border-slate-200 overflow-hidden h-[500px] md:h-[620px] rounded-2xl shadow-xl">
            <AnimatedLocationSVG />
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORKING SECTION */}
      <section className="bg-[#0f172a]">
        <div className="container-gutter py-16 md:py-20">
          <SectionHeading
            eyebrow="GLOBAL NETWORKING"
            title="WORLDWIDE PRESENCE"
            dark
          />
          <p className="body-text text-slate-300 mt-6 max-w-2xl" style={{ fontSize: "17px" }}>
            With offices and partners in over 70 countries across 5 continents, Fuji Fenix delivers global expertise with local support.
          </p>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {GLOBAL_OFFICES.map((office) => (
              <div key={office.region} className="border-t border-white/20 pt-6">
                <h3 className="eyebrow text-[#3b82f6] mb-4" style={{ fontSize: "11px" }}>
                  {office.region}
                </h3>
                <ul className="space-y-2">
                  {office.countries.map((country) => (
                    <li key={country} className="text-slate-400 text-sm">
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-12">
            <div>
              <div className="text-4xl font-bold text-white">70+</div>
              <div className="eyebrow text-slate-400 mt-1" style={{ fontSize: "11px" }}>COUNTRIES SERVED</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">5</div>
              <div className="eyebrow text-slate-400 mt-1" style={{ fontSize: "11px" }}>CONTINENTS</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="eyebrow text-slate-400 mt-1" style={{ fontSize: "11px" }}>SUPPORT AVAILABLE</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
