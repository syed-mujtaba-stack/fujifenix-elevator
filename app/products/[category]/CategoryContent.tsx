"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface CategoryProduct {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  features: string[] | null;
  image: unknown;
  category: string;
  categorySlug: string;
}

interface Props {
  category: { title: string; slug: string; description: string | null };
  products: CategoryProduct[];
}

export default function CategoryContent({ category, products }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-head > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cat-head", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".product-grid", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="container-gutter py-16 md:py-20">
        <div className="cat-head max-w-3xl">
          <SectionHeading
            eyebrow="PRODUCT RANGE"
            title="PRODUCTS"
            description={
              category.description ??
              `Explore the full range of ${category.title.toLowerCase()} products from Fuji Fenix Elevator.`
            }
          />
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="body-text text-slate-400 max-w-md mx-auto">
              Products in this category are being added. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <Link
                key={p._id}
                href={`/products/${p.categorySlug}/${p.slug}`}
                className="product-card group block"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#f1f5f9]">
                  {p.image ? (
                    <Image
                      src={urlFor(p.image).width(900).auto("format").url()}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0f172a]">
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
                  <h3 className="heading text-[#0f172a]" style={{ fontSize: "20px", letterSpacing: "0.02em" }}>
                    {p.title}
                  </h3>
                  {p.description && (
                    <p
                      className="body-text text-slate-500 mt-2"
                      style={{ fontSize: "14px", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {p.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}