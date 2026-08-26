"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  _key?: string;
}

interface SpecGroup {
  title: string;
  items: { label: string; value: string; _key?: string }[] | null;
  _key?: string;
}

interface TechnicalDrawing {
  title: string;
  drawingGroup: "machine-room" | "mrl" | "general";
  src: string;
  _key?: string;
}

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
  gallery: GalleryImage[] | null;
  specGroups: SpecGroup[] | null;
  technicalDrawings: TechnicalDrawing[] | null;
  category: string;
  categorySlug: string;
  related: RelatedProduct[] | null;
}

const DRAWING_GROUPS = [
  { key: "machine-room", label: "General Traction — Machine Room Type" },
  { key: "mrl", label: "Machine-Room-Less (MRL) Type" },
  { key: "general", label: "Common / Entrance" },
] as const;

export default function ProductDetailContent({ product }: { product: ProductData }) {
  const ref = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

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

      gsap.fromTo(
        ".spec-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".spec-grid", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".gal-item",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gal-grid", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".draw-item",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".draw-groups", start: "top 88%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  const galleryImages = product.gallery ?? [];
  const heroImage = product.image
    ? { src: urlFor(product.image).width(1200).auto("format").url(), alt: product.title }
    : galleryImages[0]
      ? { src: galleryImages[0].src, alt: galleryImages[0].alt }
      : null;
  const galleryRest = product.image ? galleryImages : galleryImages.slice(1);

  const drawings = product.technicalDrawings ?? [];
  const groupedDrawings = DRAWING_GROUPS.map((g) => ({
    ...g,
    items: drawings.filter((d) => d.drawingGroup === g.key),
  })).filter((g) => g.items.length > 0);

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

      {/* Main product image + details */}
      <section ref={ref} className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <div className="pd-body grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Main product image — first in DOM */}
            <div className="pd-reveal relative bg-[#f1f5f9] border border-slate-100 flex items-center justify-center p-8 md:p-14">
              {heroImage ? (
                <div className="relative w-full max-w-[460px] aspect-[2/3]">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center">
                  <span className="eyebrow text-slate-400">IMAGE COMING SOON</span>
                </div>
              )}
            </div>

            {/* Product details */}
            <div>
              <SectionHeading
                eyebrow="PRODUCT DETAILS"
                title="OVERVIEW"
                description={product.description ?? undefined}
              />
              {product.category && (
                <div className="pd-reveal -mt-6 mb-8">
                  <span className="inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0047BB] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                    <span className="w-1 h-1 bg-[#0047BB] rounded-full" />
                    {product.category}
                  </span>
                </div>
              )}
              {product.features && product.features.length > 0 && (
                <div className="pd-reveal mt-2 flex flex-wrap gap-3">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-2 bg-[#f1f5f9] text-[#0f172a] px-4 py-2"
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
          </div>
        </div>
      </section>

      {/* Technical specifications */}
      {product.specGroups && product.specGroups.length > 0 && (
        <section className="bg-[#f8fafc] border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <SectionHeading
              eyebrow="TECHNICAL SPECIFICATIONS"
              title="SPECIFICATIONS"
              description="Available configurations and rated performance ranges for this product."
            />
            <div className="spec-grid grid md:grid-cols-2 gap-8 max-w-4xl">
              {product.specGroups.map((group) => (
                <div
                  key={group._key ?? group.title}
                  className="spec-card bg-white border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.035)]"
                >
                  <div className="bg-[#0047BB] px-6 py-4">
                    <h3 className="eyebrow text-white">{group.title}</h3>
                  </div>
                  <dl>
                    {(group.items ?? []).map((item, i) => (
                      <div
                        key={item._key ?? item.label}
                        className={`flex items-center justify-between gap-6 px-6 py-5 ${i > 0 ? "border-t border-slate-100" : ""}`}
                      >
                        <dt className="eyebrow text-slate-400">{item.label}</dt>
                        <dd className="heading text-[#0f172a] text-right" style={{ fontSize: "17px" }}>
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product gallery */}
      {galleryRest.length > 0 && (
        <section className="bg-white border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <SectionHeading
              eyebrow="PRODUCT GALLERY"
              title="CABIN FINISH\nOPTIONS"
              description="A selection of cabin interior finishes available for this product. Click any image to view it larger."
            />
            <div className="gal-grid grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {galleryRest.map((img) => (
                <button
                  key={img._key ?? img.src}
                  type="button"
                  onClick={() => setZoom({ src: img.src, alt: img.alt })}
                  aria-label={`View larger: ${img.alt}`}
                  className="gal-item group relative aspect-[2/3] bg-[#f8fafc] border border-slate-100 overflow-hidden cursor-zoom-in"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-3 md:p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <span className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0047BB] opacity-0 group-hover:opacity-100 transition-opacity">
                    ZOOM ⤢
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical drawings / blueprints */}
      {groupedDrawings.length > 0 && (
        <section className="bg-[#f8fafc] border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <SectionHeading
              eyebrow="TECHNICAL DRAWINGS"
              title="BLUEPRINTS &\nDIMENSION DRAWINGS"
              description="Architectural drawings shown at full aspect ratio. Open any drawing full size for detailed inspection."
            />
            <div className="draw-groups max-w-5xl">
              {groupedDrawings.map((group) => (
                <div key={group.key} className="mb-14 last:mb-0">
                  <h3 className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px bg-[#0047BB]" />
                    <span className="eyebrow text-[#0047BB]">{group.label}</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {group.items.map((d) => (
                      <figure
                        key={d._key ?? d.src}
                        className="draw-item bg-white border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.035)]"
                      >
                        <button
                          type="button"
                          onClick={() => setZoom({ src: d.src, alt: d.title })}
                          aria-label={`Enlarge drawing: ${d.title}`}
                          className="block w-full cursor-zoom-in bg-white p-4 md:p-6"
                        >
                          <div className="relative w-full aspect-[4/3]">
                            <Image
                              src={d.src}
                              alt={`${d.title} — technical drawing for ${product.title}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </button>
                        <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                          <span className="heading text-[#0f172a]" style={{ fontSize: "14px" }}>
                            {d.title}
                          </span>
                          <a
                            href={d.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0047BB] hover:underline whitespace-nowrap"
                          >
                            OPEN FULL SIZE ↗
                          </a>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-white border-t border-slate-100">
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

      {/* Lightbox */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          className="fixed inset-0 z-[100] bg-[#071324]/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center border border-white/30 text-white text-lg transition-colors hover:bg-white hover:text-[#071324]"
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={zoom.src} alt={zoom.alt} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
