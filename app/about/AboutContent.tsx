"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageReveal from "@/app/components/ImageReveal";
import SectionHeading from "@/app/components/SectionHeading";
import AnimatedText from "@/app/components/AnimatedText";
import Stats from "@/app/components/Stats";
import { COMPANY, STATS, SERVICES, ENGINEERING_PILLARS } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

function EngineeringApproach() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".eng-item",
        { opacity: 0, x: (i) => (i % 2 === 0 ? -20 : 20) },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".eng-list", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#f8fafc] border-t border-slate-100">
      <div className="container-gutter py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[46%]">
            <ImageReveal
              src="/about-lobby.jpg"
              alt="Fuji Fenix premium elevator lobby showcasing modern design"
              className="w-full h-full min-h-[480px]"
              sizes="46vw"
            />
          </div>
          <div className="lg:w-[54%]">
            <SectionHeading
              eyebrow="ENGINEERING APPROACH"
              title="THE FUJI FENIX\nTECHNOLOGY ADVANTAGE"
              description="Six core engineering pillars that define every Fuji Fenix vertical transportation system."
            />
            <div className="eng-list grid grid-cols-1 sm:grid-cols-2 gap-0">
              {ENGINEERING_PILLARS.map((pillar, i) => (
                <div
                  key={pillar.num}
                  className={`eng-item flex gap-5 py-7 pr-6 ${
                    i % 2 === 0 ? "sm:border-r sm:border-slate-100 sm:pr-8" : ""
                  } ${i < ENGINEERING_PILLARS.length - 2 ? "border-b border-slate-100" : ""}`}
                >
                  <div className="eyebrow text-[#0047BB] flex-shrink-0 pt-1">{pillar.num}</div>
                  <div>
                    <div className="subheading text-[#0f172a] mb-2" style={{ fontSize: "15px", letterSpacing: "0.04em" }}>
                      {pillar.title}
                    </div>
                    <p className="text-slate-500" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(".cap-list-item");
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="container-gutter py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[38%] mb-14 lg:mb-0">
            <SectionHeading
              eyebrow="COMPANY STRENGTHS"
              title="WHY DEVELOPERS\nAND ARCHITECTS\nTRUST FUJI FENIX"
              description="Eight core capabilities that define the Fuji Fenix standard of excellence."
            />
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
            >
              EXPLORE OUR SERVICES
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="lg:w-[62%]">
            {SERVICES.map((service) => (
              <div key={service.num}>
                <div className="h-px bg-slate-200" />
                <div className="cap-list-item flex gap-8 py-8 md:py-10">
                  <div className="eyebrow text-[#0047BB] flex-shrink-0 pt-1 w-8">{service.num}</div>
                  <div>
                    <h3
                      className="heading text-[#0f172a] mb-3"
                      style={{ fontSize: "clamp(18px, 2.4vw, 28px)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="body-text text-slate-500 max-w-lg" style={{ fontSize: "15px" }}>
                      {service.desc}
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

export default function AboutContent() {
  return (
    <>
      {/* Company overview */}
      <section className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-[54%]">
              <SectionHeading
                eyebrow="ABOUT FUJI FENIX"
                title="WORLD-CLASS\nVERTICAL MOBILITY\nSOLUTIONS"
              />
              <AnimatedText
                text={COMPANY.about1}
                className="body-text text-slate-600 max-w-xl mb-6"
              />
              <AnimatedText
                text={COMPANY.about2}
                className="body-text text-slate-500 max-w-xl"
                delay={0.2}
              />
            </div>
            <div className="lg:w-[46%]">
              <ImageReveal
                src="/hero-elevator.jpg"
                alt="Fuji Fenix architectural elevator installation project"
                className="w-full min-h-[420px]"
                sizes="46vw"
                parallax
              />
            </div>
          </div>
        </div>
      </section>

      {/* Total solution band */}
      <section className="relative overflow-hidden bg-[#071324]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0047BB]" />
        <div className="container-gutter py-16 md:py-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#60a5fa]">OUR PROMISE</span>
          </div>
          <h2
            className="display text-white"
            style={{ fontSize: "clamp(40px, 6.5vw, 92px)" }}
          >
            TOTAL SOLUTION FOR<br />
            <span className="text-[#0047BB]">VERTICAL TRANSPORTATION</span>
          </h2>
          <AnimatedText
            text={COMPANY.intro}
            className="body-text text-slate-400 max-w-2xl mt-10 border-l-2 border-[#0047BB]/40 pl-6"
          />
        </div>
      </section>

      <EngineeringApproach />
      <Capabilities />

      {/* Stats */}
      <section className="bg-white border-t border-slate-100">
        <Stats items={[...STATS]} />
      </section>
    </>
  );
}
