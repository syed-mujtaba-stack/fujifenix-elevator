"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import ImageReveal from "@/app/components/ImageReveal";
import { getRelatedProducts, type Product } from "@/app/data/content";
gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailContent({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const related = getRelatedProducts(product.slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pd-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".pd-body", start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Detail body */}
      <section ref={ref} className="bg-white">
        <div className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-[52%]">
              <SectionHeading
                eyebrow={product.category}
                title={product.name.toUpperCase()}
                description={product.description}
              />
              {product.features.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="pd-reveal inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 py-2"
                      style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                    >
                      <span className="w-1 h-1 bg-[#2563EB] rounded-full" />
                      {f}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href="/contact"
                className="pd-reveal mt-12 inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300"
              >
                REQUEST A QUOTE
                <span>→</span>
              </Link>
            </div>
            <div className="lg:w-[48%]">
              <ImageReveal
                src={product.image ?? "/hero-elevator.jpg"}
                alt={product.imageAlt ?? product.name}
                className="w-full min-h-[480px]"
                sizes="48vw"
                parallax
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="bg-[#f8fafc] border-t border-slate-100">
        <div className="px-8 md:px-16 lg:px-24 py-24 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <SectionHeading eyebrow="MORE PRODUCTS" title="EXPLORE THE\nFULL RANGE" />
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300 flex-shrink-0"
            >
              VIEW ALL PRODUCTS
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[16/10] bg-[#e2e8f0]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="grid grid-cols-6 gap-3 w-20 opacity-30">
                        {Array.from({ length: 12 }).map((_, j) => (
                          <div key={j} className="aspect-square bg-[#cbd5e1] rounded-[2px]" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <span className="eyebrow text-white">{p.category}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="heading text-[#0f172a]" style={{ fontSize: "17px", letterSpacing: "0.02em" }}>
                    {p.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
