"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface RelatedProduct {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: unknown;
}

interface ProductData {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  features: string[] | null;
  image: unknown;
  category: string;
  categorySlug: string;
  related: RelatedProduct[] | null;
}

export default function ProductDetailContent({ product }: { product: ProductData }) {
  const ref = useRef<HTMLElement>(null);

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
          scrollTrigger: { trigger: ".pd-body", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const related = product.related ?? [];

  return (
    <>
      {/* Breadcrumb / back link */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-gutter py-4">
          <Link
            href={`/products/${product.categorySlug}`}
            className="group inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {product.category}
          </Link>
        </div>
      </div>

      {/* Detail body */}
      <section ref={ref} className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <div className="pd-body flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-[52%]">
              <SectionHeading
                eyebrow="PRODUCT DETAILS"
                title="OVERVIEW"
                description={product.description ?? undefined}
              />
              {product.features && product.features.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="pd-reveal inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 py-2"
                      style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                    >
                      <span className="w-1 h-1 bg-[#0047BB] rounded-full" />
                      {f}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href="/contact"
                className="pd-reveal mt-12 inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300"
              >
                REQUEST A QUOTE
                <span>→</span>
              </Link>
            </div>
            <div className="lg:w-[48%]">
              {product.image ? (
                <div className="relative overflow-hidden aspect-[4/3] w-full bg-[#f1f5f9]">
                  <Image
                    src={urlFor(product.image).width(1200).auto("format").url()}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] bg-[#0f172a] flex items-center justify-center">
                  <span className="eyebrow text-white/40">IMAGE COMING SOON</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-[#f8fafc] border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <SectionHeading eyebrow="MORE PRODUCTS" title="EXPLORE THE\nFULL RANGE" />
              <Link
                href={`/products/${product.categorySlug}`}
                className="group inline-flex items-center gap-3 eyebrow text-[#0047BB] hover:gap-5 transition-all duration-300 flex-shrink-0"
              >
                VIEW ALL {product.category?.toUpperCase() ?? "PRODUCTS"}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${product.categorySlug}/${p.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-[#e2e8f0]">
                    {p.image ? (
                      <Image
                        src={urlFor(p.image).width(800).auto("format").url()}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0f172a]">
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
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}