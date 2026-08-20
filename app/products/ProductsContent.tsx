"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface CategoryData {
  _id: string;
  title: string;
  slug: string;
  group: string;
  description: string | null;
  image: unknown;
  productCount: number;
}

const GROUPS = [
  { key: "elevators", label: "ELEVATOR SYSTEMS", description: "Complete elevator and escalator systems for every building type." },
  { key: "components", label: "COMPONENTS & ACCESSORIES", description: "Premium cabin components and complementary accessories." },
];

function CategoryPlaceholder({ num }: { num: string }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b]" />
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-6 gap-3 p-8">
          {Array.from({ length: 12 }).map((_, j) => (
            <div key={j} className="aspect-square bg-[#cbd5e1]/30 rounded-[2px]" />
          ))}
        </div>
      </div>
      <div
        className="absolute -bottom-8 right-4 display text-white/10 select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(70px, 10vw, 130px)" }}
      >
        {num}
      </div>
    </div>
  );
}

export default function ProductsContent({ categories }: { categories: CategoryData[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-intro > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cat-intro", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".category-grid", start: "top 78%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  let counter = 0;

  return (
    <section ref={ref} className="bg-white">
      <div className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="cat-intro max-w-3xl">
          <SectionHeading
            eyebrow="OUR PRODUCT RANGE"
            title="ELEVATORS, ESCALATORS\n& ACCESSORIES"
            description="Thirteen product categories covering complete elevator and escalator systems, cabin components, and accessories. New products are being added to each category."
          />
        </div>

        {GROUPS.map((group) => {
          const groupCategories = categories.filter((c) => c.group === group.key);
          if (groupCategories.length === 0) return null;
          return (
            <div key={group.key} className="mt-20 md:mt-24 first:mt-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-[#2563EB]">{group.label}</span>
                  <div className="w-12 h-px bg-[#2563EB]/40" />
                  <span className="eyebrow text-slate-400">{String(groupCategories.length).padStart(2, "0")}</span>
                </div>
                <p className="body-text text-slate-500 max-w-sm" style={{ fontSize: "14px" }}>
                  {group.description}
                </p>
              </div>

              <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupCategories.map((c) => {
                  counter += 1;
                  const num = String(counter).padStart(2, "0");
                  return (
                    <Link key={c._id} href={`/products/${c.slug}`} className="category-card group block">
                      <div className="relative overflow-hidden aspect-[16/11] bg-[#0f172a]">
                        {c.image ? (
                          <Image
                            src={urlFor(c.image).width(900).auto("format").url()}
                            alt={c.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <CategoryPlaceholder num={num} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/80 via-[#071324]/10 to-transparent" />
                        <div className="absolute top-5 left-6">
                          <span className="eyebrow text-white">{num}</span>
                        </div>
                        <div className="absolute bottom-5 right-6">
                          <span className="eyebrow text-[#93c5fd] border border-[#93c5fd]/40 bg-[#071324]/50 backdrop-blur-sm px-3 py-1.5">
                            {c.productCount} PRODUCTS
                          </span>
                        </div>
                      </div>
                      <div className="pt-5">
                        <h3 className="heading text-[#0f172a]" style={{ fontSize: "20px", letterSpacing: "0.02em" }}>
                          {c.title}
                        </h3>
                        <p className="body-text text-slate-500 mt-2" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                          {c.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}