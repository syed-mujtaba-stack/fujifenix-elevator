"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPABILITIES_STRIP } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-item",
        { opacity: 0, y: 24 },
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
    <section ref={ref} className="bg-[#f8fafc] border-y border-slate-100">
      {/*
        Padding:
        • px-4  (≥ 0px)   — 16px each side on smallest phones
        • px-6  (≥ 480px) — 24px each side on wider phones
        • px-10 (≥ 768px) — matches rest of site
        • px-16 (≥ 1024px)
        • px-24 (≥ 1280px)
      */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-12 sm:py-14 md:py-20">
        <div className="flex flex-col lg:flex-row">
          {CAPABILITIES_STRIP.map((c, i) => (
            <div
              key={c.title}
              className={[
                "cap-item",
                "flex-1 flex items-start",
                /* gap tighter on mobile so number + text don't crowd */
                "gap-4 sm:gap-5 lg:gap-6",
                /* vertical padding — generous on mobile, compact on desktop */
                "py-5 sm:py-6 lg:py-2",
                /* horizontal padding only kicks in on desktop */
                "lg:px-10",
                /* separator lines */
                i > 0 ? "border-t border-slate-100 lg:border-t-0 lg:border-l" : "",
                /* remove outer edges on desktop */
                i === 0 ? "lg:pl-0" : "",
                i === CAPABILITIES_STRIP.length - 1 ? "lg:pr-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Number badge */}
              <span className="eyebrow text-[#2563EB] flex-shrink-0 pt-0.5 leading-none">
                {c.num}
              </span>

              {/* Text block — min-w-0 prevents flex blowout on narrow screens */}
              <div className="min-w-0">
                <div
                  className="subheading text-[#0f172a] mb-1.5 leading-snug"
                  style={{
                    fontSize: "clamp(12px, 3.5vw, 15px)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {c.title}
                </div>
                <p
                  className="text-slate-500"
                  style={{ fontSize: "clamp(12.5px, 3.2vw, 14px)", lineHeight: "1.65" }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
