"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENGINEERING_PILLARS } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyBlueprint() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-heading > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tech-heading", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".tech-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tech-img", start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".tech-feature",
        { opacity: 0, x: (i) => (i % 2 === 0 ? -20 : 20) },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-features",
            start: "top 75%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="technology" className="bg-white section-gap overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="tech-heading mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#2563EB]" />
            <span className="eyebrow text-[#2563EB]">ENGINEERING EXCELLENCE</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="heading text-[#0f172a] max-w-2xl"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              THE FUJI FENIX<br />
              <span className="text-[#2563EB]">TECHNOLOGY</span><br />
              ADVANTAGE
            </h2>
            <p className="body-text max-w-sm text-slate-500 lg:pb-2">
              Six engineering pillars that define every Fuji Fenix vertical transportation system.
            </p>
          </div>
        </div>

        {/* Main composition: image + features grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Central image */}
          <div className="tech-img lg:w-[48%] relative overflow-hidden" style={{ minHeight: "520px" }}>
            <Image
              src="/about-lobby.jpg"
              alt="Fuji Fenix elevator engineering"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <div className="absolute inset-0 bg-[#0f172a]/30" />

            {/* Overlay label */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="h-px bg-white/20 mb-5" />
              <div className="eyebrow text-white/60">FUJI FENIX ENGINEERING SYSTEM</div>
            </div>
          </div>

          {/* Features — 3x2 grid, no cards */}
          <div className="tech-features lg:w-[52%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-0">
            {ENGINEERING_PILLARS.map((f, i) => (
              <div
                key={f.num}
                className={`tech-feature flex gap-5 py-8 ${i < ENGINEERING_PILLARS.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                <div className="eyebrow text-[#2563EB] flex-shrink-0 pt-1">{f.num}</div>
                <div>
                  <div
                    className="subheading text-[#0f172a] mb-2"
                    style={{ fontSize: "clamp(14px, 1.5vw, 18px)", letterSpacing: "0.04em" }}
                  >
                    {f.title}
                  </div>
                  <p className="text-slate-500" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
