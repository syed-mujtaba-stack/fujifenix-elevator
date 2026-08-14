"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  const STATS = [
    { end: 6847, suffix: "+", label: "HAPPY CUSTOMERS" },
    { end: 100, suffix: "%", label: "CLIENT SATISFACTION" },
    { end: 3240, suffix: "+", label: "PROJECTS DONE" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        ".about-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-img", start: "top 75%" },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".about-text > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-text", start: "top 70%" },
        }
      );

      // Stat counters
      STATS.forEach((stat) => {
        const el = document.querySelector(`[data-stat="${stat.end}"]`);
        if (!el) return;
        const proxy = { val: 0 };
        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: stat.end,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.textContent = Math.round(proxy.val).toLocaleString() + stat.suffix;
            },
          }
        );
      });

      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f8fafc] overflow-hidden" id="about">
      {/* Main two-panel composition */}
      <div className="flex flex-col lg:flex-row min-h-[90vh]">

        {/* Image panel — 58% */}
        <div className="about-img lg:w-[58%] relative overflow-hidden" style={{ minHeight: "560px" }}>
          <Image
            src="/about-lobby.jpg"
            alt="Fuji Fenix premium elevator lobby"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f8fafc]/60" />
          {/* Bottom scrim */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc]/80 to-transparent lg:hidden" />
        </div>

        {/* Text panel — 42% */}
        <div className="about-text lg:w-[42%] flex flex-col justify-center px-10 md:px-14 lg:px-16 py-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#2563EB]" />
            <span className="eyebrow text-[#2563EB]">ABOUT FUJI FENIX</span>
          </div>

          <h2
            className="heading text-[#0f172a] mb-8"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            WORLD-CLASS<br />
            <span className="text-[#2563EB]">VERTICAL MOBILITY</span><br />
            SOLUTIONS
          </h2>

          <p className="body-text text-slate-600 mb-6 max-w-md" style={{ fontSize: "16px", lineHeight: "1.75" }}>
            Fuji Fenix Elevators is a leading provider of innovative elevator and escalator solutions, combining advanced technology with precision engineering to deliver world-class vertical transportation systems.
          </p>

          <p className="body-text text-slate-500 mb-10 max-w-md" style={{ fontSize: "15px", lineHeight: "1.7" }}>
            With fully equipped manufacturing facilities and modern testing systems, we ensure every product meets strict international safety and performance standards. Our expertise spans across residential, commercial, healthcare, and infrastructure projects.
          </p>

          <Link
            href="/about"
            className="group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300"
          >
            READ MORE
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Stats row — large numbers, thin dividers, NO cards */}
      <div className="about-stats bg-white border-t border-slate-100">
        <div className="flex flex-col sm:flex-row">
          {STATS.map(({ end, suffix, label }, i) => (
            <div
              key={label}
              className={`about-stat flex-1 flex flex-col items-center justify-center py-14 text-center
                ${i < STATS.length - 1 ? "sm:border-r border-b sm:border-b-0 border-slate-100" : ""}
                hover:bg-[#f8fafc] transition-colors duration-300 group`}
            >
              <span
                className="display text-[#0f172a] group-hover:text-[#2563EB] transition-colors duration-300 leading-none mb-3"
                style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
                data-stat={end}
              >
                0{suffix}
              </span>
              <span className="eyebrow text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
