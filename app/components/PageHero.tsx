"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface PageHeroProps {
  eyebrow: string;
  titleLines?: string[];
  title?: string[];
  highlight?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  breadcrumb: string;
  breadcrumbHref?: string;
  /** Accent the full title in light blue (readable on the dark photo backdrop) */
  titleBlue?: boolean;
  /** Center the eyebrow + heading block */
  centered?: boolean;
}

export default function PageHero({
  eyebrow,
  titleLines,
  title,
  highlight,
  description,
  image,
  imageAlt = "",
  breadcrumb,
  breadcrumbHref,
  titleBlue = false,
  centered = false,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = title ?? titleLines ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".ph-img",
        { opacity: 0, scale: 1.12 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      )
        .fromTo(".ph-eyebrow", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.9")
        .fromTo(
          ".ph-line",
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.1 },
          "-=0.35"
        )
        .fromTo(".ph-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(".ph-crumb", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6");
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#071324]">
      {/* Background image */}
      <div className="ph-img absolute inset-0 opacity-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/95 via-[#071324]/55 to-[#071324]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/75 via-[#071324]/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-gutter relative flex flex-col justify-between pt-28 md:pt-32 pb-12 md:pb-16 min-h-[clamp(460px,64vh,640px)] md:min-h-[clamp(560px,76vh,780px)]">
        {/* Breadcrumb */}
        <div className="ph-crumb flex items-center gap-2 opacity-0 self-end flex-shrink-0">
          <Link href="/" className="eyebrow text-slate-400 hover:text-white transition-colors">
            HOME
          </Link>
          <span className="text-slate-500">/</span>
          {breadcrumbHref ? (
            <Link
              href={breadcrumbHref}
              className="eyebrow text-slate-400 hover:text-white transition-colors"
            >
              {breadcrumb}
            </Link>
          ) : (
            <span className="eyebrow text-[#60a5fa]">{breadcrumb}</span>
          )}
        </div>

        {/* Heading block */}
        <div className={`max-w-3xl mt-16 md:mt-24 flex flex-col ${centered ? "items-center text-center mx-auto" : ""}`}>
          <div className={`ph-eyebrow flex items-center gap-3 mb-8 opacity-0 ${centered ? "justify-center" : ""}`}>
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#60a5fa]">{eyebrow}</span>
          </div>
          <h1
            className={`display ${titleBlue ? "text-[#60a5fa]" : "text-white"}`}
            style={{ fontSize: "var(--fs-hero)" }}
          >
            {lines.map((line, i) => (
              <span key={i} className="ph-line block opacity-0 overflow-hidden drop-shadow-lg">
                {line}
              </span>
            ))}
            {highlight ? (
              <span className="ph-line block text-[#60a5fa] opacity-0 overflow-hidden drop-shadow-lg">
                {highlight}
              </span>
            ) : null}
          </h1>
          {description ? (
            <p className="ph-desc body-text text-slate-300 max-w-lg mt-8 border-l-2 border-[#60a5fa]/50 pl-6 opacity-0">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* Blue base accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0047BB] z-10" />
    </section>
  );
}
