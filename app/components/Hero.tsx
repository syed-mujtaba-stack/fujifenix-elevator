"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      .fromTo(".hero-line",
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.1 },
        "-=0.3"
      )
      .fromTo(".hero-body",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".hero-image-wrap",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1, ease: "power2.out" },
        "-=0.9"
      )
      .fromTo(".hero-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.6"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0f172a]"
      id="home"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-elevator.jpg"
      >
        <source src="/Fuji Fenix.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0f172a]/70" />

      {/* Thin top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2563EB] z-10" />

      <div className="w-full px-8 md:px-16 lg:px-24 pt-28 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 min-h-[calc(100vh-7rem)]">

          {/* LEFT — Typography */}
          <div className="lg:w-[50%] lg:pr-16 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-3 mb-8 opacity-0">
              <div className="w-8 h-px bg-[#2563EB]" />
              <span className="eyebrow text-[#2563EB]">FUJI FENIX ELEVATOR</span>
            </div>

            {/* Headline */}
            <h1
              className="display text-white mb-8"
              style={{
                fontSize: "clamp(42px, 7vw, 110px)",
                lineHeight: 1.05,
                wordBreak: "keep-all",
                overflowWrap: "normal",
                overflow: "visible",
              }}
            >
              <span className="hero-line block opacity-0">ENGINEERING</span>
              <span className="hero-line block text-[#2563EB] opacity-0">MOVEMENT.</span>
              <span className="hero-line block opacity-0">DESIGNED</span>
              <span className="hero-line block opacity-0">TO RISE.</span>
            </h1>

            {/* Description */}
            <p className="hero-body body-text max-w-lg mb-10 pl-5 border-l-2 border-[#2563EB] opacity-0" style={{ color: "#ffffff" }}>
              Innovative elevator and escalator solutions combining advanced technology with precision engineering for residential, commercial, healthcare, and infrastructure projects.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-12 opacity-0">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white eyebrow px-8 py-4 transition-colors duration-300"
              >
                EXPLORE SOLUTIONS
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 border border-white/30 hover:border-white text-white hover:bg-white/10 eyebrow px-8 py-4 transition-all duration-300"
              >
                VIEW PRODUCTS
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

            {/* Stats row */}
            <div className="hero-stat flex items-center gap-0 pt-8 border-t border-white/20 opacity-0">
              {[
                { val: "6,847+", label: "HAPPY CUSTOMERS" },
                { val: "3,240+", label: "PROJECTS DONE" },
                { val: "100%", label: "CLIENT SATISFACTION" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-12 bg-white/20 mx-6 md:mx-8" />}
                  <div>
                    <div
                      className="display text-white leading-none"
                      style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                    >
                      {s.val}
                    </div>
                    <div className="eyebrow text-white/50 mt-1.5" style={{ fontSize: "10px" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image with video overlay */}
          <div className="lg:w-[50%] relative">
            <div className="hero-image-wrap relative overflow-hidden opacity-0 rounded-sm" style={{ height: "clamp(400px, 65vh, 600px)" }}>
              <div className="hero-img-inner absolute inset-0">
                <Image
                  src="/hero-elevator.jpg"
                  alt="Premium Fuji Fenix elevator interior"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-[#0f172a]/20" />
              </div>

              {/* Border frame */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6">
                <div className="eyebrow text-white/70">FUJI FENIX — PREMIUM SERIES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10">
          <div className="eyebrow text-white/60 text-[9px]">SCROLL</div>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
