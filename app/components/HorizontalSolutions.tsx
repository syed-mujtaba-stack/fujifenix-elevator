"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface SolutionProduct {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  image: unknown;
  categorySlug: string;
}

// Map the first 6 products from Sanity into the horizontal-scroll card shape
const buildSolutions = (products: SolutionProduct[]) =>
  products.slice(0, 6).map((p, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: p.title.toUpperCase().replace(" ", "\n"),
    desc: p.description ?? "",
    img: p.image ? urlFor(p.image).width(1600).auto("format").url() : "/hero-elevator.jpg",
    imgAlt: p.title,
    slug: p.slug,
    categorySlug: p.categorySlug,
  }));

export default function HorizontalSolutions({ products }: { products: SolutionProduct[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const SOLUTIONS = buildSolutions(products);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mm: any = null;
    let tween: any = null;
    (async () => {
      if (prefersReducedMotion) {
        // Reveal content without animation for reduced-motion users
        document.querySelectorAll('#solutions .heading, #solutions .eyebrow, #solutions .body-text, #solutions .display').forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
        return;
      }
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = (gsapModule && (gsapModule.default || gsapModule));
      const ScrollTrigger = (ScrollTriggerModule && (ScrollTriggerModule.default || ScrollTriggerModule));
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();
      // Desktop GSAP Horizontal Pinned Animation
      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const getDistance = () => track.scrollWidth - window.innerWidth;
        tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        // Refresh ScrollTrigger after layout settles
        const timer = setTimeout(() => {
          if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh();
        }, 150);
        return () => {
          clearTimeout(timer);
          if (tween && tween.kill) tween.kill();
        };
      });
    })();
    return () => {
      try { if (mm && mm.revert) mm.revert(); } catch (e) {}
      try { if (tween && tween.kill) tween.kill(); } catch (e) {}
    };
  }, []);

  return (
    <section id="solutions" className="bg-white">

      {/* ================================================= */}
      {/* DESKTOP VIEW: Pinned 100vh Container with Header */}
      {/* ================================================= */}
      <div
        ref={sectionRef}
        className="hidden md:flex flex-col justify-between h-screen w-full overflow-hidden bg-white relative"
      >
        {/* Pinned Header Bar (Top 22%) */}
        <div className="px-8 md:px-16 lg:px-24 pt-12 pb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2563EB]" />
            <h3 className="eyebrow text-[#2563EB]">WHAT WE BUILD</h3>
          </div>
          <p className="sr-only">What we build — engineered elevator and escalator products across residential, commercial, and infrastructure categories; scroll to explore examples.</p>
          <div className="flex items-end justify-between border-b border-slate-100 pb-4">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              ENGINEERED SOLUTIONS <span className="text-[#2563EB]">FOR EVERY SCALE</span>
            </h2>
            <p className="body-text max-w-xs text-slate-500 pb-1 text-right text-xs">
              Scroll down to explore all solutions →
            </p>
          </div>
        </div>

        {/* Horizontal Track Container (Bottom 78%) */}
        <div className="flex-1 overflow-hidden relative">
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: "max-content" }}
          >
            {SOLUTIONS.map((sol, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-row bg-white h-full px-4"
                style={{
                  width: "min(80vw, 1150px)",
                  borderRight: "1px solid #f1f5f9",
                }}
              >
                {/* Image — 55% */}
                <div className="w-[55%] relative overflow-hidden h-[90%] my-auto" style={{ minHeight: "260px" }}>
                  <Image
                    src={sol.img}
                    alt={sol.imgAlt}
                    fill
                    className="object-cover"
                    sizes="44vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                  {/* Ghost number on image */}
                  <div
                    className="absolute bottom-6 left-8 display text-white/15 select-none leading-none pointer-events-none"
                    style={{ fontSize: "clamp(48px, 8vw, 110px)" }}
                  >
                    {sol.num}
                  </div>
                </div>

                {/* Details — 45% */}
                <div className="w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-14 py-8 bg-white">
                  <div className="eyebrow text-[#2563EB] mb-4">{sol.num}</div>

                  <h3
                    className="heading text-[#0f172a] mb-4 whitespace-pre-line"
                    style={{ fontSize: "var(--fs-h3)" }}
                  >
                    {sol.title}
                  </h3>

                  <div className="w-10 h-px bg-[#2563EB] mb-5" />

                  <p className="body-text text-slate-500 max-w-sm mb-8" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                    {sol.desc}
                  </p>

                  <Link
                    href={`/products/${sol.categorySlug}/${sol.slug}`}
                    className="group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300"
                  >
                    EXPLORE
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE VIEW: Clean Vertical Stack                 */}
      {/* ================================================= */}
      <div className="block md:hidden bg-white">
        <div className="px-6 pt-16 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2563EB]" />
            <h3 className="eyebrow text-[#2563EB]">WHAT WE BUILD</h3>
          </div>
          <p className="sr-only">What we build — engineered elevator and escalator products across residential, commercial, and infrastructure categories; scroll to explore examples.</p>
          <h2
            className="heading text-[#0f172a]"
            style={{ fontSize: "clamp(26px, 7vw, 32px)" }}
          >
            ENGINEERED SOLUTIONS<br />
            <span className="text-[#2563EB]">FOR EVERY SCALE</span>
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {SOLUTIONS.map((sol, i) => (
            <div key={i} className="flex flex-col py-8 px-6">
              <div className="relative overflow-hidden mb-6" style={{ height: "240px" }}>
                <Image
                  src={sol.img}
                  alt={sol.imgAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div>
                <div className="eyebrow text-[#2563EB] mb-3">{sol.num}</div>
                <h3
                  className="heading text-[#0f172a] mb-3 whitespace-pre-line"
                  style={{ fontSize: "20px" }}
                >
                  {sol.title}
                </h3>
                <div className="w-8 h-px bg-[#2563EB] mb-4" />
                <p className="body-text text-slate-500 mb-6" style={{ fontSize: "14px" }}>
                  {sol.desc}
                </p>
                <Link href={`/products/${sol.categorySlug}/${sol.slug}`} className="eyebrow text-[#2563EB] inline-flex items-center gap-2">
                  EXPLORE <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
