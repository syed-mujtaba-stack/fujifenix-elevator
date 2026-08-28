"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface SolutionProduct {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  image: unknown;
  gallery: { src: string; alt: string }[] | null;
  categorySlug: string;
}

const buildSolutions = (products: SolutionProduct[]) =>
  products.slice(0, 6).map((p, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: p.title.toUpperCase().replace(" ", "\n"),
    desc: p.description ?? "",
    img: p.image
      ? urlFor(p.image).width(1600).auto("format").url()
      : p.gallery?.[0]?.src ?? "/hero-elevator.jpg",
    imgAlt: p.gallery?.[0]?.alt || p.title,
    slug: p.slug,
    categorySlug: p.categorySlug,
  }));

export default function HorizontalSolutions({ products }: { products: SolutionProduct[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const SOLUTIONS = buildSolutions(products);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop GSAP Horizontal Pinned Animation
    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
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
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        tween.kill();
      };
    });

    return () => mm.revert();
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
        <div className="container-gutter pt-12 pb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">WHAT WE BUILD</span>
          </div>
          <div className="flex items-end justify-between border-b border-slate-100 pb-4">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              ENGINEERED SOLUTIONS <span className="text-[#0047BB]">FOR EVERY SCALE</span>
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
                {/* Image — 50% */}
                <div className="w-[50%] relative overflow-hidden h-full" style={{ minHeight: "200px" }}>
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

                {/* Details — 50% */}
                <div className="w-[50%] flex flex-col px-8 md:px-12 lg:px-14 py-10 bg-white">
                  <div className="eyebrow text-[#0047BB] mb-3">{sol.num}</div>

                  <h3
                    className="heading text-[#0f172a] mb-3 leading-tight"
                    style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
                  >
                    {sol.title.split("\n").map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </h3>

                  <div className="w-10 h-px bg-[#0047BB] mb-5" />

                  <p className="body-text text-slate-500 max-w-sm mb-8" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                    {sol.desc}
                  </p>

                  <Link
                    href={`/products/${sol.categorySlug}/${sol.slug}`}
                    className="group inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
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
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">WHAT WE BUILD</span>
          </div>
          <h2
            className="heading text-[#0f172a]"
            style={{ fontSize: "clamp(26px, 7vw, 32px)" }}
          >
            ENGINEERED SOLUTIONS<br />
            <span className="text-[#0047BB]">FOR EVERY SCALE</span>
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
                <div className="eyebrow text-[#0047BB] mb-3">{sol.num}</div>
                <h3
                  className="heading text-[#0f172a] mb-3 whitespace-pre-line"
                  style={{ fontSize: "20px" }}
                >
                  {sol.title}
                </h3>
                <div className="w-8 h-px bg-[#0047BB] mb-4" />
                <p className="body-text text-slate-500 mb-6" style={{ fontSize: "14px" }}>
                  {sol.desc}
                </p>
                <Link href={`/products/${sol.categorySlug}/${sol.slug}`} className="eyebrow text-[#0047BB] inline-flex items-center gap-2">
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
