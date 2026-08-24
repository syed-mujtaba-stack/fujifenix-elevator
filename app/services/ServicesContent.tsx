"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import AnimatedText from "@/app/components/AnimatedText";
import {
  SERVICE_OFFERINGS,
  SERVICE_PROCESS,
  SERVICE_SUPPORT_POINTS,
  COMPANY,
  CONTACT,
} from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Icons (stroke-based, inherit currentColor) ---------- */

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case "factory":
      return (
        <svg {...iconProps}>
          <path d="M3 21V9l6 4V9l6 4V5h6v16H3Z" />
          <path d="M8 17h2M14 17h2" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...iconProps}>
          <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6l-3 3-2.8-.7-.7-2.8 3.5-2.5Z" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...iconProps}>
          <path d="M21 12a9 9 0 1 1-2.6-6.3" />
          <path d="M21 3v5h-5" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...iconProps}>
          <path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3Z" />
          <path d="M9.5 11.5l2 2 3.5-3.5" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...iconProps}>
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- Service offerings ---------- */

function ServiceOfferings() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll(".svc-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="container-gutter py-20 md:py-28">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Sticky intro */}
          <div className="mb-14 lg:sticky lg:top-28 lg:mb-0 lg:w-[34%] lg:self-start">
            <SectionHeading
              eyebrow="WHAT WE DO"
              title={"END-TO-END\nSERVICE\nCOVERAGE"}
              description="One partner for the entire lifecycle of your vertical transportation — from first drawing to decades of dependable operation."
            />
            <AnimatedText
              text={COMPANY.tagline}
              className="body-text text-slate-500 mt-8 max-w-sm border-l-2 border-[#0047BB]/20 pl-6"
            />
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 eyebrow text-[#0047BB] transition-all duration-300 hover:gap-5"
            >
              DISCUSS YOUR PROJECT
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Offering rows */}
          <div className="lg:w-[66%]">
            {SERVICE_OFFERINGS.map((s, i) => (
              <div key={s.title} className="border-t border-slate-200">
                <article
                  className={`svc-row group grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr] items-start gap-x-5 md:gap-x-8 py-8 md:py-10 px-2 md:px-4 -mx-2 md:-mx-4 transition-colors duration-300 hover:bg-[#f8fafc] ${
                    i === 0 ? "" : ""
                  }`}
                >
                  {/* Number */}
                  <span className="eyebrow text-slate-400 pt-1 group-hover:text-[#0047BB] transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="hidden md:flex h-12 w-12 flex-shrink-0 items-center justify-center border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-[#0047BB] group-hover:bg-[#0047BB] group-hover:text-white">
                    <ServiceIcon name={s.icon} />
                  </div>

                  {/* Body */}
                  <div className="min-w-0 col-span-2 md:col-span-1 mt-4 md:mt-0">
                    <h3
                      className="heading mb-3 text-[#0f172a] transition-colors duration-300 group-hover:text-[#0047BB]"
                      style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="body-text text-slate-500 max-w-xl" style={{ fontSize: "15px" }}>
                      {s.desc}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="eyebrow text-slate-500 bg-slate-100 px-3 py-1.5 group-hover:bg-white transition-colors duration-300"
                          style={{ letterSpacing: "0.08em", fontSize: "10px" }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
            <div className="border-t border-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process timeline ---------- */

function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".proc-grid", start: "top 80%" },
        }
      );
      ref.current?.querySelectorAll(".proc-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 88%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f8fafc] border-t border-slate-100 overflow-hidden">
      <div className="container-gutter py-20 md:py-28">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="FROM FIRST CALL TO\nLIFETIME SUPPORT"
          description="A proven five-step delivery process refined across thousands of installations worldwide."
        />

        <div className="proc-grid relative">
          {/* Connector line (desktop) */}
          <div className="proc-line hidden lg:block absolute top-[22px] left-0 right-0 h-px bg-slate-300" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8">
            {SERVICE_PROCESS.map((p) => (
              <li key={p.step} className="proc-step relative lg:pr-4">
                <div className="relative z-10 flex h-11 w-11 items-center justify-center bg-[#071324] eyebrow text-white mb-6">
                  {p.step}
                </div>
                <h3 className="subheading text-[#0f172a] mb-2" style={{ fontSize: "15px", letterSpacing: "0.05em" }}>
                  {p.title}
                </h3>
                <p className="text-slate-500" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  {p.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- After-sales support band ---------- */

function SupportBand() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sup-el",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#071324] arch-grid-dark">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0047BB]" />
      <div className="container-gutter py-20 md:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <div className="sup-el flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#0047BB]" />
              <span className="eyebrow text-[#60a5fa]">AFTER-SALES SUPPORT</span>
            </div>
            <h2 className="sup-el display text-white" style={{ fontSize: "var(--fs-h2)" }}>
              WE DON&apos;T JUST INSTALL.
              <br />
              <span className="text-[#60a5fa]">WE STAND BEHIND EVERY UNIT.</span>
            </h2>
            <p className="sup-el body-text text-slate-400 max-w-xl mt-8">
              Our commitment continues long after handover — preventive maintenance programs,
              genuine spare parts, and a rapid-response team on call every hour of every day.
            </p>
          </div>

          <div className="sup-el flex-shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-[#0047BB] px-8 py-5 eyebrow text-white transition-colors duration-300 hover:bg-white hover:text-[#0047BB]"
            >
              REQUEST A SERVICE PLAN
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Support stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 border-t border-white/10">
          {SERVICE_SUPPORT_POINTS.map((pt, i) => (
            <div
              key={pt.label}
              className={`flex flex-col py-10 sm:py-12 sm:px-8 ${
                i > 0 ? "sm:border-l border-white/10" : "sm:pl-0"
              }`}
            >
              <span
                className="display text-[#60a5fa] leading-none mb-3"
                style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
              >
                {pt.stat}
              </span>
              <span className="eyebrow text-slate-400">{pt.label}</span>
            </div>
          ))}
        </div>

        {/* Emergency line */}
        <div className="sup-el mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border border-white/10 bg-white/[0.03] px-6 py-5">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="eyebrow text-slate-400">EMERGENCY BREAKDOWN?</span>
          <a
            href={CONTACT.phoneHref}
            className="subheading text-white hover:text-[#60a5fa] transition-colors"
            style={{ fontSize: "15px" }}
          >
            {CONTACT.phone}
          </a>
          <span className="text-slate-600">|</span>
          <a
            href={CONTACT.emailHref}
            className="subheading text-white hover:text-[#60a5fa] transition-colors"
            style={{ fontSize: "15px" }}
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bottom CTA ---------- */

function ServicesCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-el",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-slate-100">
      <div className="container-gutter py-20 md:py-28 text-center">
        <div className="cta-el mx-auto mb-8 flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-[#0047BB]" />
          <span className="eyebrow text-[#0047BB]">GET STARTED</span>
          <div className="w-8 h-px bg-[#0047BB]" />
        </div>
        <h2 className="cta-el display text-[#0f172a] mx-auto max-w-3xl" style={{ fontSize: "clamp(30px, 4.5vw, 56px)" }}>
          READY TO ELEVATE YOUR NEXT PROJECT?
        </h2>
        <p className="cta-el body-text text-slate-500 max-w-xl mx-auto mt-6">
          Tell us about your building and requirements — our team will respond within one business day.
        </p>
        <div className="cta-el mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 bg-[#0047BB] px-10 py-5 eyebrow text-white transition-colors duration-300 hover:bg-[#071324]"
          >
            CONTACT US
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-4 border border-slate-300 px-10 py-5 eyebrow text-[#0f172a] transition-colors duration-300 hover:border-[#0047BB] hover:text-[#0047BB]"
          >
            BROWSE PRODUCTS
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesContent() {
  return (
    <>
      <ServiceOfferings />
      <ProcessTimeline />
      <SupportBand />
      <ServicesCTA />
    </>
  );
}
