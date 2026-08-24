"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageReveal from "@/app/components/ImageReveal";
import SectionHeading from "@/app/components/SectionHeading";
import { SOLUTIONS } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sol-text",
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".sol-text", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".sol-tag",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".sol-tags", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro */}
      <section className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <SectionHeading
            eyebrow="INDUSTRY SOLUTIONS"
            title="ENGINEERED FOR"
            highlight="EVERY BUILDING TYPE"
            description="Fuji Fenix vertical transportation systems are precision-engineered to meet the specific demands of each industry sector."
          />
        </div>
      </section>

      {/* Segments */}
      <section ref={ref} className="bg-white">
        {SOLUTIONS.map((seg, i) => (
          <div key={seg.slug} className="border-t border-slate-100">
            <div className="container-gutter py-16 md:py-20">
              <div
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
              >
                <div className="lg:w-[52%]">
                  <ImageReveal
                    src={seg.image}
                    alt={`Fuji Fenix ${seg.title.toLowerCase()} vertical transportation solutions`}
                    className="w-full min-h-[420px]"
                    sizes="52vw"
                    parallax
                  />
                </div>
                <div className={`lg:w-[48%] ${i % 2 !== 0 ? "lg:pr-8" : ""}`}>
                  <div className="sol-text">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="eyebrow text-[#0047BB]">{seg.eyebrow}</span>
                    </div>
                    <h2
                      className="display text-[#0f172a] mb-6"
                      style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
                    >
                      {seg.title}
                    </h2>
                    <p className="body-text text-slate-500 max-w-lg mb-8" style={{ fontSize: "15px" }}>
                      {seg.description}
                    </p>
                    <div className="sol-tags flex flex-wrap gap-3 mb-10">
                      {seg.points.map((point) => (
                        <span
                          key={point}
                          className="sol-tag inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 py-2"
                          style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                        >
                          <span className="w-1 h-1 bg-[#0047BB] rounded-full" />
                          {point}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
                    >
                      DISCUSS YOUR PROJECT
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
