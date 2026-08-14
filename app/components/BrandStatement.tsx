"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-word",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".bs-para",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bs-para",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white section-gap" id="statement">
      <div className="px-8 md:px-16 lg:px-24">

        {/* Top rule */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-8 h-px bg-[#2563EB]" />
          <span className="eyebrow text-[#2563EB]">OUR VISION</span>
        </div>

        {/* Massive word cascade */}
        <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-1 mb-16">
          {[
            { word: "MOVING", blue: false },
            { word: "PEOPLE.", blue: true },
            { word: "CONNECTING", blue: false },
            { word: "SPACES.", blue: false },
            { word: "ENGINEERING", blue: false },
            { word: "WHAT", blue: false },
            { word: "COMES", blue: false },
            { word: "NEXT.", blue: true },
          ].map(({ word, blue }, i) => (
            <span
              key={i}
              className={`bs-word display select-none ${blue ? "text-[#2563EB]" : "text-[#0f172a]"}`}
              style={{ fontSize: "clamp(44px, 8vw, 104px)" }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-14" />

        {/* Editorial paragraph row */}
        <div className="bs-para flex flex-col md:flex-row gap-10 md:gap-20">
          <p className="body-text max-w-lg border-l-2 border-[#2563EB]/20 pl-6 text-slate-600">
            Fuji Fenix Elevators is a leading provider of innovative elevator and escalator solutions, combining advanced technology with precision engineering to deliver world-class vertical transportation systems.
          </p>
          <div className="flex flex-col justify-center gap-1 md:ml-auto">
            <div className="eyebrow text-slate-400">HEADQUARTERS</div>
            <div
              className="display text-[#0f172a]"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              SHANGHAI
            </div>
            <div className="eyebrow text-slate-400 mt-3">REGION</div>
            <div
              className="display text-[#0f172a]"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              CHINA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
