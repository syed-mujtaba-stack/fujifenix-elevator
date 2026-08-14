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
  dark?: boolean;
  titleBlue?: boolean;
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
  dark = false,
  titleBlue = false,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = title ?? titleLines ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".ph-eyebrow", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ph-line",
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(".ph-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          ".ph-img",
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(".ph-crumb", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6");
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-white overflow-hidden pt-28 md:pt-32">
      <div className="px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16 pb-12 border-b border-slate-100">
          {/* Left — typography */}
          <div className="max-w-3xl">
            <div className="ph-eyebrow flex items-center gap-3 mb-8 opacity-0">
              <div className="w-8 h-px bg-[#2563EB]" />
              <span className="eyebrow text-[#2563EB]">{eyebrow}</span>
            </div>
            <h1
              className={`display ${titleBlue ? "text-[#2563EB]" : "text-[#0f172a]"}`}
              style={{ fontSize: "clamp(52px, 8vw, 110px)" }}
            >
              {lines.map((line, i) => (
                <span key={i} className="ph-line block opacity-0 overflow-hidden">
                  {line}
                </span>
              ))}
              {highlight ? (
                <span className="ph-line block text-[#2563EB] opacity-0 overflow-hidden">
                  {highlight}
                </span>
              ) : null}
            </h1>
            {description ? (
              <p className="ph-desc body-text text-slate-500 max-w-lg mt-8 border-l-2 border-[#2563EB]/20 pl-6 opacity-0">
                {description}
              </p>
            ) : null}
          </div>

          {/* Breadcrumb */}
          <div className="ph-crumb flex items-center gap-2 opacity-0 pb-2 lg:pb-6 flex-shrink-0">
            <Link href="/" className="eyebrow text-slate-400 hover:text-[#2563EB] transition-colors">
              HOME
            </Link>
            <span className="text-slate-300">/</span>
            {breadcrumbHref ? (
              <Link
                href={breadcrumbHref}
                className="eyebrow text-slate-400 hover:text-[#2563EB] transition-colors"
              >
                {breadcrumb}
              </Link>
            ) : (
              <span className="eyebrow text-[#2563EB]">{breadcrumb}</span>
            )}
          </div>
        </div>

        {/* Hero image */}
        <div
          className="ph-img relative overflow-hidden opacity-0"
          style={{ height: "clamp(340px, 46vh, 560px)" }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className={`object-cover ${dark ? "opacity-25" : ""}`}
            sizes="100vw"
          />
          {dark ? (
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/70 via-transparent to-transparent" />
          ) : null}
          <div className="absolute inset-0 border border-white/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
