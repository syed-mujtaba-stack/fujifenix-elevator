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
      <div className="px-8 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row">
          {CAPABILITIES_STRIP.map((c, i) => (
            <div
              key={c.title}
              className={`cap-item flex-1 flex items-start gap-6 py-6 lg:py-2 lg:px-10 ${
                i > 0 ? "lg:border-l border-t lg:border-t-0 border-slate-100" : ""
              } ${i === 0 ? "lg:pl-0" : ""} ${i === CAPABILITIES_STRIP.length - 1 ? "lg:pr-0" : ""}`}
            >
              <span className="eyebrow text-[#2563EB] flex-shrink-0 pt-1">{c.num}</span>
              <div>
                <div className="subheading text-[#0f172a] mb-2" style={{ fontSize: "15px", letterSpacing: "0.04em" }}>
                  {c.title}
                </div>
                <p className="text-slate-500" style={{ fontSize: "14px", lineHeight: "1.6" }}>
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
