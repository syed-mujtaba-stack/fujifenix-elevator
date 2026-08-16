"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);

  const PRODUCTS = [
    { num: "01", slug: "passenger-elevators", title: "FUJI PASSENGER\nELEVATOR SERIES", desc: "Our flagship passenger elevator series delivers smooth, whisper-quiet performance for commercial towers and high-rises across 2 to 30+ floors.", specs: ["2–30+ Floors", "MRL Technology", "Smart Controls", "Custom Finishes"], img: "/hero-elevator.jpg", imgAlt: "Fuji Passenger Elevator" },
    { num: "02", slug: "home-elevators", title: "HOME ELEVATOR\nSERIES", desc: "Quiet, compact, and meticulously designed for the modern luxury home.", specs: ["2–6 Floors", "Compact Design", "Silent Operation", "Custom Interiors"], img: "/home-elevator.jpg", imgAlt: "Fuji Home Elevator" },
    { num: "03", slug: "high-speed-elevators", title: "HIGH-SPEED\nELEVATOR SERIES", desc: "Engineered for skyscrapers and landmark towers — our high-speed systems travel at up to 6m/s.", specs: ["Up to 6m/s", "Vibration Control", "AI Traffic Mgmt", "Safety First"], img: "/escalator.jpg", imgAlt: "Fuji High-Speed Elevator" },
    { num: "04", slug: "panoramic-elevators", title: "PANORAMIC\nELEVATOR SERIES", desc: "Transform vertical movement into an architectural highlight.", specs: ["Full Glass Cabin", "Curved Track", "LED Lighting", "Custom Shapes"], img: "/hero-elevator.jpg", imgAlt: "Fuji Panoramic Elevator" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ps-head > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ps-head", start: "top 80%" },
        }
      );

      const blocks = ref.current?.querySelectorAll(".product-block");
      blocks?.forEach((block, i) => {
        const isEven = i % 2 === 0;

        gsap.fromTo(
          block.querySelector(".prod-img"),
          { clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 72%" },
          }
        );

        gsap.fromTo(
          block.querySelectorAll(".prod-text-el"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.25,
            scrollTrigger: { trigger: block, start: "top 72%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="products" className="bg-[#f8fafc]">
      {/* Section header */}
      <div className="ps-head px-8 md:px-16 lg:px-24 pt-24 pb-16 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#2563EB]" />
          <span className="eyebrow text-[#2563EB]">OUR PRODUCTS</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="heading text-[#0f172a]"
            style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
          >
            PRECISION CRAFTED<br />
            <span className="text-[#2563EB]">ELEVATOR SYSTEMS</span>
          </h2>
          <p className="body-text text-slate-500 max-w-sm lg:pb-2">
            Each product line is purpose-built for specific architectural requirements — from low-rise villas to landmark towers.
          </p>
          <Link
            href="/products"
            className="lg:pb-2 group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300 flex-shrink-0"
          >
            VIEW ALL PRODUCTS
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Alternating product blocks */}
      {PRODUCTS.map((product, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={i}
            className={`product-block flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} bg-white border-b border-slate-100`}
            style={{ minHeight: "70vh" }}
          >
            {/* Image */}
            <div className="prod-img lg:w-[55%] relative overflow-hidden" style={{ minHeight: "360px" }}>
              <Image
                src={product.img}
                alt={product.imgAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Ghost number watermark */}
              <div
                className="absolute bottom-4 right-6 display text-white/10 select-none leading-none pointer-events-none"
                style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
              >
                {product.num}
              </div>
            </div>

            {/* Text */}
            <div className="lg:w-[45%] flex flex-col justify-center px-10 md:px-14 lg:px-16 py-16 bg-white">
              <div
                className="prod-text-el display text-slate-100 select-none leading-none mb-6"
                style={{ fontSize: "clamp(60px, 8vw, 100px)" }}
              >
                {product.num}
              </div>

              <h3
                className="prod-text-el heading text-[#0f172a] mb-6 whitespace-pre-line"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
              >
                {product.title}
              </h3>

              <div className="prod-text-el w-10 h-px bg-[#2563EB] mb-6" />

              <p className="prod-text-el body-text text-slate-500 max-w-md mb-8">
                {product.desc}
              </p>

              {/* Specs — inline list, no dot markers */}
              <div className="prod-text-el flex flex-wrap gap-x-5 gap-y-2 mb-10">
                {product.specs.map((s, si) => (
                  <span key={s} className="flex items-center gap-2">
                    {si > 0 && <span className="text-slate-300">·</span>}
                    <span className="eyebrow text-slate-500">{s}</span>
                  </span>
                ))}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="prod-text-el group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300"
              >
                EXPLORE PRODUCT
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
