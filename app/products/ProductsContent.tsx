"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const FALLBACK_IMAGE = "/hero-elevator.jpg";

interface ProductData {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  image: unknown;
  gallery: { src: string; alt: string }[] | null;
  category: string;
  categorySlug: string;
}

const cardImage = (product: ProductData) =>
  product.image
    ? urlFor(product.image).width(900).auto("format").url()
    : product.gallery?.[0]?.src ?? FALLBACK_IMAGE;

export default function ProductsContent({ categories, products }: { categories: CategoryData[]; products: ProductData[] }) {
  const ref = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [catsOpen, setCatsOpen] = useState(true);
  const pageSize = 12;
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categorySlug === selectedCategory)
    : products;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

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
          scrollTrigger: { trigger: ".cat-intro", start: "top 85%" },
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
      <div className="container-gutter py-16 md:py-24">
        <div className="cat-intro mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#0047BB]" />
            <span className="eyebrow text-[#0047BB]">OUR PRODUCT RANGE</span>
          </div>
          <p className="body-text text-slate-500 max-w-xl">
            {`${products.length} product${products.length === 1 ? "" : "s"} across ${categories.length} categor${categories.length === 1 ? "y" : "ies"}. Browse the range and open any product for technical details.`}
          </p>
        </div>

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          <aside className="w-full lg:w-64 lg:sticky lg:top-28 flex-shrink-0">
            <div className="border border-slate-200 bg-[#f8fafc] p-3 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              {/* Mobile: collapsible header · Desktop: static label */}
              <button
                type="button"
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
                className="mb-4 flex w-full items-center justify-between px-3"
              >
                <div className="eyebrow text-[#0047BB]">PRODUCT CATEGORIES</div>
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  {categories.length}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 text-slate-400 transition-transform duration-200 lg:hidden ${catsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </span>
              </button>
              {/* Vertical category list on every breakpoint — scrollable panel on mobile */}
              <nav
                className={`${catsOpen ? "flex" : "hidden"} max-h-[300px] flex-col gap-1 overflow-y-auto pb-1 lg:max-h-none lg:overflow-visible lg:pb-0`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPage(1);
                    if (window.innerWidth < 1024) setCatsOpen(false);
                  }}
                  className={`group flex min-h-11 w-full items-center justify-between gap-4 border-l-2 px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] transition-all ${selectedCategory === null ? "border-[#0047BB] bg-blue-50/60 text-[#0047BB]" : "border-transparent bg-white text-slate-600 hover:border-[#0047BB] hover:bg-blue-50/50 hover:text-[#0047BB]"}`}
                >
                  <span>ALL PRODUCTS</span>
                  <span className="text-[10px] text-slate-400">{products.length}</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.slug);
                      setPage(1);
                      if (window.innerWidth < 1024) setCatsOpen(false);
                    }}
                    className={`group flex min-h-11 w-full items-center justify-between gap-4 border-l-2 px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] transition-all ${selectedCategory === category.slug ? "border-[#0047BB] bg-blue-50/60 text-[#0047BB]" : "border-transparent bg-white text-slate-600 hover:border-[#0047BB] hover:bg-blue-50/50 hover:text-[#0047BB]"}`}
                  >
                    <span>{category.title}</span>
                    <span className="text-[10px] text-slate-400">{category.productCount}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-6 bg-[#0047BB] p-6 text-white shadow-[0_14px_30px_rgba(0,71,187,0.16)]">
              <div className="eyebrow mb-3 text-[#bfdbfe]">NEED HELP?</div>
              <p className="text-sm leading-6 text-white/85">Talk to our product team about specifications, pricing, and project requirements.</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 border border-white/40 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-[#0047BB]">
                CONTACT US <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-7 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow text-[#0047BB]">{selectedCategory ? categories.find((category) => category.slug === selectedCategory)?.title : "ALL PRODUCTS"}</span>
                <p className="mt-2 text-sm text-slate-500">Engineered systems and components for every vertical transportation project.</p>
              </div>
              <span className="self-start whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 sm:self-auto">{filteredProducts.length} ITEMS</span>
            </div>
            <div className="product-grid grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product, i) => (
                <Link key={product._id} href={`/products/${product.categorySlug}/${product.slug}`} className="product-card group block rounded-sm border border-slate-200 bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_32px_rgba(15,23,42,0.09)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={cardImage(product)}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 300px"
                    />
                    <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-[#0047BB] shadow-sm">
                      {String((page - 1) * pageSize + i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 mb-8 border-l-2 border-[#0047BB]/30 pl-4 text-[13px] leading-relaxed text-slate-500">Images are for illustrative purposes only. Actual product may vary according to project requirements and selected specifications.</p>
                  <div className="px-2 pb-3 pt-4">
                    <h3 className="heading line-clamp-2 text-[#0f172a]" style={{ fontSize: "16px", letterSpacing: "0.02em" }}>
                      {product.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="eyebrow truncate text-[#0047BB]" style={{ fontSize: "9px" }}>{product.category}</span>
                      <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.08em] text-[#0047BB] transition-transform group-hover:translate-x-1">VIEW DETAILS →</span>
                    </div>
                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Product pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => {
                      setPage(pageNumber);
                      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`min-w-9 border px-3 py-2 text-xs font-semibold transition-colors ${page === pageNumber ? "border-[#0047BB] bg-[#0047BB] text-white" : "border-slate-200 text-slate-500 hover:border-[#0047BB] hover:text-[#0047BB]"}`}
                    aria-current={page === pageNumber ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}