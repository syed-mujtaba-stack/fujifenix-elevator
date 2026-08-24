"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CONTACT } from "@/app/data/content";
import { submitContact } from "@/app/actions/contact";
import WeChatQRButton from "@/app/components/WeChatQR";

const COUNTRIES = [
  "China",
  "United Arab Emirates",
  "Saudi Arabia",
  "India",
  "Pakistan",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "Turkey",
  "Egypt",
  "Nigeria",
  "South Africa",
  "Brazil",
  "Mexico",
  "Canada",
  "Other",
];

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu", "Wuhan", "Other"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Other"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Other"],
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Other"],
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Other"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Other"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Other"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Other"],
  France: ["Paris", "Lyon", "Marseille", "Other"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Other"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Other"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Other"],
  Singapore: ["Singapore"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru", "Other"],
  Indonesia: ["Jakarta", "Surabaya", "Bandung", "Other"],
  Philippines: ["Manila", "Cebu", "Other"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Other"],
  Thailand: ["Bangkok", "Chiang Mai", "Other"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Other"],
  Egypt: ["Cairo", "Alexandria", "Other"],
  Nigeria: ["Lagos", "Abuja", "Other"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Other"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Other"],
  Mexico: ["Mexico City", "Monterrey", "Guadalajara", "Other"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Other"],
  Other: [],
};

export default function CtaContent() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".cta-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .fromTo(
          ".cta-line",
          { opacity: 0, y: 80, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12 },
          0.25
        )
        .fromTo(".cta-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(".cta-form", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(".cta-contact", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".cta-nav", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
    }, ref);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);

    const result = await submitContact({
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: (data.get("phone") as string) || undefined,
      company: (data.get("company") as string) || undefined,
      country: (data.get("country") as string) || undefined,
      city: (data.get("city") as string) || undefined,
      projectType: (data.get("projectType") as string) || undefined,
      floors: (data.get("floors") as string) || undefined,
      units: (data.get("units") as string) || undefined,
      message: data.get("message") as string,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  const cities = CITIES_BY_COUNTRY[country] || [];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#071324] text-white flex flex-col overflow-hidden"
    >
      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.07] arch-grid pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0047BB]" />

      <div className="relative flex-1 flex flex-col container-gutter pt-28 md:pt-32 pb-12">
        {/* top row */}
        <div className="flex items-center justify-between">
          <div className="cta-eyebrow flex items-center gap-3 opacity-0">
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#60a5fa]">START YOUR PROJECT</span>
          </div>
          <Link href="/" className="cta-nav eyebrow text-slate-400 hover:text-white transition-colors opacity-0">
            ← BACK TO HOME
          </Link>
        </div>

        {/* main title */}
        <div className="py-12">
          <h1 className="display" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            <span className="cta-line block opacity-0 overflow-hidden">LET'S</span>
            <span className="cta-line block opacity-0 overflow-hidden">
              BUILD <span className="text-[#0047BB]">TOGETHER</span>
            </span>
          </h1>

          <p className="cta-sub body-text text-slate-400 max-w-lg mt-6 border-l-2 border-[#0047BB]/40 pl-6 opacity-0">
            Share your project details and our engineering team will craft a tailored vertical transportation solution.
          </p>
        </div>

        {/* ── INQUIRY FORM ── */}
        <div className="cta-form opacity-0 mb-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-name" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                FULL NAME *
              </label>
              <input
                id="cta-name"
                name="name"
                type="text"
                required
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="John Smith"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-email" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                EMAIL *
              </label>
              <input
                id="cta-email"
                name="email"
                type="email"
                required
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="john@company.com"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-phone" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                PHONE
              </label>
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="+1 234 567 890"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-company" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                COMPANY
              </label>
              <input
                id="cta-company"
                name="company"
                type="text"
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="Company name"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-country" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                COUNTRY *
              </label>
              <select
                id="cta-country"
                name="country"
                required
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors appearance-none cursor-pointer"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" className="bg-[#071324]">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="bg-[#071324]">{c}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-city" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                CITY
              </label>
              {cities.length > 0 ? (
                <select
                  id="cta-city"
                  name="city"
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#071324]">Select city</option>
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-[#071324]">{c}</option>
                  ))}
                </select>
              ) : (
                <input
                  id="cta-city"
                  name="city"
                  type="text"
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                  placeholder="Enter your city"
                />
              )}
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-type" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                PROJECT TYPE *
              </label>
              <select
                id="cta-type"
                name="projectType"
                required
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#071324]">Select type</option>
                <option value="passenger" className="bg-[#071324]">Passenger Elevators</option>
                <option value="home" className="bg-[#071324]">Home Elevators</option>
                <option value="high-speed" className="bg-[#071324]">High-Speed Elevators</option>
                <option value="panoramic" className="bg-[#071324]">Panoramic Elevators</option>
                <option value="escalator" className="bg-[#071324]">Escalators & Moving Walks</option>
                <option value="maintenance" className="bg-[#071324]">After-Sales & Maintenance</option>
                <option value="other" className="bg-[#071324]">Other</option>
              </select>
            </div>

            {/* Floors */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-floors" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                NUMBER OF FLOORS
              </label>
              <input
                id="cta-floors"
                name="floors"
                type="text"
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="e.g. 15"
              />
            </div>

            {/* Units */}
            <div className="flex flex-col gap-2">
              <label htmlFor="cta-units" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                UNITS REQUIRED
              </label>
              <input
                id="cta-units"
                name="units"
                type="text"
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors placeholder:text-slate-600"
                placeholder="e.g. 4"
              />
            </div>

            {/* Message — full width */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-2">
              <label htmlFor="cta-message" className="eyebrow text-slate-500" style={{ fontSize: "10px" }}>
                PROJECT DETAILS *
              </label>
              <textarea
                id="cta-message"
                name="message"
                rows={4}
                required
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#0047BB] transition-colors resize-none placeholder:text-slate-600"
                placeholder="Tell us about your building, requirements, timeline..."
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-3 bg-[#0047BB] hover:bg-[#003A94] text-white px-8 py-4 eyebrow transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,71,187,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "SENDING…" : "SEND INQUIRY"}
                {status !== "submitting" && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </button>

              {status === "success" && (
                <p className="eyebrow text-[#60a5fa]" style={{ fontSize: "12px" }}>
                  Thank you! We&apos;ll get back to you within 24 hours. You can also reach us at{" "}
                  <a href={CONTACT.emailHref} className="underline hover:text-white">{CONTACT.email}</a>{" "}
                  or call{" "}
                  <a href={CONTACT.phoneHref} className="underline hover:text-white">{CONTACT.phone}</a>.
                </p>
              )}

              {status === "error" && (
                <p className="eyebrow text-red-400" style={{ fontSize: "12px" }}>
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* contact */}
        <div className="cta-contact opacity-0 flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-white/10 pt-8">
          <div>
            <div className="eyebrow text-slate-500 mb-3" style={{ fontSize: "11px" }}>
              REACH US DIRECTLY
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <a
                href={CONTACT.phoneHref}
                className="display text-white hover:text-[#60a5fa] transition-colors"
                style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
              >
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="body-text text-slate-300 hover:text-white transition-colors"
                style={{ fontSize: "15px" }}
              >
                {CONTACT.email}
              </a>
              <span className="body-text text-slate-500" style={{ fontSize: "15px" }}>
                {CONTACT.address}
              </span>
              <WeChatQRButton variant="dark" label="CONTACT US ON WECHAT" />
            </div>
          </div>
        </div>

        <div className="cta-nav opacity-0 flex flex-wrap gap-x-10 gap-y-4 mt-10 pt-6 border-t border-white/10">
          {[
            { label: "PRODUCTS", href: "/products" },
            { label: "SERVICES", href: "/services" },
            { label: "SOLUTIONS", href: "/solutions" },
            { label: "PROJECTS", href: "/projects" },
            { label: "ABOUT", href: "/about" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="eyebrow text-slate-500 hover:text-[#60a5fa] transition-colors"
              style={{ fontSize: "11px" }}
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
