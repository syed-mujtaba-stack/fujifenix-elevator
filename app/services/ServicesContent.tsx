"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import AnimatedText from "@/app/components/AnimatedText";
import { SERVICES, COMPANY } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-item",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svc-list", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="container-gutter py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[38%] mb-14 lg:mb-0">
            <SectionHeading
              eyebrow="WHAT WE OFFER"
              title="SERVICES"
              description="From manufacturing to after-sales support — everything your project needs under one roof."
            />
            <AnimatedText
              text={COMPANY.tagline}
              className="body-text text-slate-500 max-w-sm mt-8 border-l-2 border-[#0047BB]/20 pl-6"
            />
            <Link
              href="/contact"
              className="group mt-12 inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
            >
              DISCUSS YOUR PROJECT
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="lg:w-[62%]">
            {SERVICES.map((s) => (
              <div key={s.num}>
                <div className="h-px bg-slate-200" />
                <div className="svc-item flex gap-8 py-9 md:py-11">
                  <div className="eyebrow text-[#0047BB] flex-shrink-0 pt-1 w-8">{s.num}</div>
                  <div>
                    <h3 className="heading text-[#0f172a] mb-3" style={{ fontSize: "clamp(18px, 2.4vw, 28px)" }}>
                      {s.title}
                    </h3>
                    <p className="body-text text-slate-500 max-w-lg" style={{ fontSize: "15px" }}>
                      {s.desc}
                    </p>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <span className="text-slate-300 text-xl">→</span>
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
