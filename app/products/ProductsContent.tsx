"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS, getProduct } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".product-grid", start: "top 78%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((p, i) => {
            const details = getProduct(p.slug);
            const shortDesc = details?.description
              ? details.description.length > 110
                ? details.description.slice(0, 110).trimEnd() + "…"
                : details.description
              : undefined;
            return (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className={`product-card group block ${
                  i === 0 ? "md:col-span-2 lg:col-span-2" : ""
                } ${i === 1 ? "lg:col-span-1" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-[#f1f5f9]">
                  {details?.image ? (
                    <Image
                      src={details.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="grid grid-cols-6 gap-3 w-24 opacity-30">
                        {Array.from({ length: 12 }).map((_, j) => (
                          <div key={j} className="aspect-square bg-[#cbd5e1] rounded-[2px]" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <span className="eyebrow text-white">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="eyebrow text-[#2563EB] mb-1" style={{ fontSize: "11px" }}>
                    {p.category}
                  </div>
                  <h3 className="heading text-[#0f172a]" style={{ fontSize: "20px", letterSpacing: "0.02em" }}>
                    {p.name}
                  </h3>
                  {shortDesc && (
                    <p className="body-text text-slate-500 mt-2" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {shortDesc}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
