"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyFujiFenix() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-heading > *",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-heading", start: "top 80%" },
        }
      );

      const items = ref.current?.querySelectorAll(".why-item");
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: item, start: "top 87%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const REASONS = [
    { title: "COMPREHENSIVE\nSOLUTIONS", desc: "Manufacturing, Sales & After sales support of elevators and escalators" },
    { title: "SAFETY FIRST", desc: "Built to meet the highest international safety standards" },
    { title: "ENERGY EFFICIENCY", desc: "Smart technologies that reduce power consumption and operating costs" },
    { title: "PROVEN EXPERTISE", desc: "Trusted by developers, contractors, and property managers" },
    { title: "CUSTOM DESIGN", desc: "Tailored solutions to fit residential, commercial, and industrial projects" },
    { title: "RELIABILITY &\nPERFORMANCE", desc: "Smooth, quiet, and dependable operation you can trust" },
    { title: "ADVANCED\nTECHNOLOGY", desc: "Integration of smart controls and innovative mobility solutions" },
    { title: "AFTER SALES\nSUPPORT", desc: "Dedicated maintenance and emergency response services" },
  ];

  return (
    <section ref={ref} id="why-fuji-fenix" className="bg-[#f8fafc] section-gap">
      <div className="px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:gap-20">

          {/* Left — sticky heading */}
          <div className="lg:w-[38%] lg:sticky lg:top-28 lg:self-start mb-16 lg:mb-0">
            <div className="why-heading">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[#2563EB]" />
                <span className="eyebrow text-[#2563EB]">WHY CHOOSE US</span>
              </div>
              <h2
                className="heading text-[#0f172a] mb-8"
                style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
              >
                WHY DEVELOPERS<br />
                & ARCHITECTS<br />
                <span className="text-[#2563EB]">TRUST</span><br />
                FUJI FENIX
              </h2>
              <p className="body-text text-slate-500 max-w-xs border-l-2 border-[#2563EB]/20 pl-5">
                Eight core capabilities that define Fuji Fenix Elevator.
              </p>
            </div>
          </div>

          {/* Right — numbered list with dividers */}
          <div className="lg:w-[62%]">
            {REASONS.map((reason, i) => (
              <div key={i}>
                <div className="h-px bg-slate-200" />
                <div className="why-item flex gap-8 py-10 md:py-12">
                  <div className="eyebrow text-[#2563EB] flex-shrink-0 pt-1 w-8">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3
                      className="heading text-[#0f172a] mb-4 whitespace-pre-line"
                      style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="body-text text-slate-500 max-w-lg" style={{ fontSize: "16px" }}>
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="h-px bg-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
