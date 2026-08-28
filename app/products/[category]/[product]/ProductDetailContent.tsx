"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/app/components/SectionHeading";
import WeChatQRButton from "@/app/components/WeChatQR";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_IMAGE_OVERRIDES } from "@/app/data/productImageOverrides";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  _key?: string;
}

interface SpecGroup {
  title: string;
  sectionImages?: string[] | null;
  sectionDescription?: string | null;
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
  gallery: { src: string; alt: string }[] | null;
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
  disclaimer?: string | null;
  imageDisclaimer?: string | null;
  designedFor?: string[] | null;
  configurationNote?: string | null;
  category: string;
  categorySlug: string;
  related: RelatedProduct[] | null;
}

/* Short CTA row shown at the end of every product section */
function SectionCta() {
  return (
    <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
      <span className="eyebrow mr-auto text-slate-400">NEED MORE DETAILS?</span>
      <WeChatQRButton />
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2.5 border border-[#0047BB] bg-[#0047BB] px-5 py-3 eyebrow text-white transition-all duration-200 hover:bg-transparent hover:text-[#0047BB]"
      >
        CONTACT US
        <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}

/* Subtle client / legal note shown only when the product defines one */
function Disclaimer({ text }: { text: string }) {
  return (
    <p className="mt-8 border-l-2 border-[#0047BB]/30 pl-4 text-[13px] leading-relaxed text-slate-500">
      {text}
    </p>
  );
}

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
  const overrideImage = PRODUCT_IMAGE_OVERRIDES[product.slug];
  const heroImage = overrideImage
    ? { src: overrideImage, alt: product.title }
    : product.image
      ? { src: urlFor(product.image).width(1200).auto("format").url(), alt: product.title }
      : galleryImages[0]
        ? { src: galleryImages[0].src, alt: galleryImages[0].alt }
        : null;
  const galleryRest = product.image ? galleryImages : galleryImages.slice(1);
  const hasSections = product.specGroups?.some((g) => g.sectionImages && g.sectionImages.length > 0) ?? false;
  const isEscalator =
    /escalator/i.test(product.slug || "") ||
    /escalator/i.test(product.title || "") ||
    /escalator/i.test(product.category || "");

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
                     alt={heroImage.alt || product.title || "Product image"}
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
                    {product.title?.toUpperCase()?.includes('ESCALATOR') ? 'ESCALATORS' : product.category}
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
          <SectionCta />
        </div>
      </section>

      {/* Image disclaimer (client note, near product imagery) */}
      {product.imageDisclaimer && (
        <section className="bg-white border-t border-slate-100">
          <div className="container-gutter py-8">
            <Disclaimer text={product.imageDisclaimer} />
          </div>
        </section>
      )}

      {/* Designed For */}
      {product.designedFor && product.designedFor.length > 0 && (
        <section className="bg-white border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <div className="mb-12 md:mb-16 flex items-center gap-3">
              <div className="w-8 h-px bg-[#0047BB]" />
              <span className="eyebrow text-[#0047BB]">DESIGNED FOR</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {product.designedFor.map((item, i) => (
                <div key={item} className="bg-[#f8fafc] border border-slate-200 p-8 text-center">
                  <span className="eyebrow text-[#0047BB]">0{i + 1}</span>
                  <p className="heading text-[#0f172a] mt-3" style={{ fontSize: '17px' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical specifications */}
      {product.specGroups && product.specGroups.length > 0 && (() => {
        const hasSections = product.specGroups.some((g) => g.sectionImages && g.sectionImages.length > 0);

        if (hasSections) {
          return product.specGroups.map((group) => {
            const sectionImgs = (group.sectionImages ?? [])
              .map((key) => galleryImages.find((g) => g._key === key))
              .filter(Boolean) as GalleryImage[];

            return (
              <section key={group._key ?? group.title} className="bg-white border-t border-slate-100">
                <div className="container-gutter py-16 md:py-20">
                  {/* Section title */}
                  <div className="mb-8">
                    <h2 className="heading text-[#0f172a] mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                      {group.title}
                    </h2>
                  </div>

                  {/* Section gallery images */}
                  {sectionImgs.length > 0 && (
                    <div className={`grid grid-cols-2 ${group.title === 'Platform Home Elevator' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5 md:gap-8 mb-12`}>
                      {sectionImgs.map((img, idx) => {
                        const alumOrder = group.title === 'Aluminum Structure Home Elevator'
                          ? idx === 3 ? 'order-5 md:order-none'
                          : idx === 4 ? 'order-4 md:order-none md:ml-8'
                          : idx === 2 ? 'order-3 md:order-none'
                          : idx === 1 ? 'order-2 md:order-none'
                          : 'order-1 md:order-none'
                          : ''
                        return (
                        <button
                          key={img._key ?? img.src}
                          type="button"
                          onClick={() => setZoom({ src: img.src, alt: img.alt })}
                          aria-label={`View larger: ${img.alt}`}
                          className={`gal-item group relative bg-[#f8fafc] border border-slate-100 overflow-hidden cursor-zoom-in h-full ${group.title === 'Platform Home Elevator' && idx === sectionImgs.length - 1 ? 'col-span-2 aspect-[16/9]' : group.title === 'Aluminum Structure Home Elevator' && idx === 3 ? 'col-span-2 aspect-[16/9]' : 'aspect-[3/4]'} ${alumOrder}`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt || group.title}
                            fill
                            quality={85}
                       className={`p-3 md:p-5 transition-transform duration-500 group-hover:scale-[1.04] ${group.title === 'Platform Home Elevator' && idx === sectionImgs.length - 1 || group.title === 'Aluminum Structure Home Elevator' && idx === 3 ? 'object-contain' : 'object-cover'}`}
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <span className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0047BB] opacity-0 group-hover:opacity-100 transition-opacity">
                            ZOOM ⤢
                          </span>
                        </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Key Specifications */}
                  <div className="max-w-2xl">
                    <div className="bg-white border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.035)]">
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
                  </div>
                </div>
              </section>
            );
          });
        }

        return (
          <section className="bg-[#f8fafc] border-t border-slate-100">
            <div className="container-gutter py-16 md:py-20">
              <div className="mb-12 md:mb-16 flex items-center gap-3">
                <div className="w-8 h-px bg-[#0047BB]" />
                <span className="eyebrow text-[#0047BB]">SPECIFICATIONS</span>
              </div>
              <div className={`spec-grid grid gap-8 ${product.specGroups.length <= 1 ? 'grid-cols-1 max-w-3xl' : 'md:grid-cols-2 max-w-4xl'}`}>
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
              <SectionCta />
            </div>
          </section>
        );
      })()}

      {/* General disclaimer (client note, e.g. specs may vary) */}
      {product.disclaimer && (
        <section className="bg-[#f8fafc] border-t border-slate-100">
          <div className="container-gutter py-8">
            <Disclaimer text={product.disclaimer} />
          </div>
        </section>
      )}

      {/* Request Technical Specification CTA */}
      {product.specGroups && product.specGroups.some((g) => g.sectionImages && g.sectionImages.length > 0) && (
        <section className="bg-white border-t border-slate-100">
          <div className="container-gutter py-12 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-[#0047BB] bg-[#0047BB] px-6 py-4 eyebrow text-white transition-all duration-200 hover:bg-transparent hover:text-[#0047BB]"
            >
              REQUEST TECHNICAL SPECIFICATION
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
            <WeChatQRButton />
          </div>
        </section>
      )}

      {/* Product gallery — skip for section-based products */}
      {!hasSections && galleryRest.length > 0 && (
        <section className="bg-white border-t border-slate-100">
          <div className="container-gutter py-16 md:py-20">
            <SectionHeading
              eyebrow="PRODUCT GALLERY"
              title={isEscalator ? "ESCALATOR FINISH OPTIONS" : "CABIN FINISH OPTIONS"}
              description={
                isEscalator
                  ? "A selection of escalator interior finishes available for this product. Click any image to view it larger."
                  : "A selection of cabin interior finishes available for this product. Click any image to view it larger."
              }
            />
            <div className="gal-grid grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 [grid-auto-rows:1fr]">
              {galleryRest.map((img) => (
                <button
                  key={img._key ?? img.src}
                  type="button"
                  onClick={() => setZoom({ src: img.src, alt: img.alt })}
                  aria-label={`View larger: ${img.alt}`}
                  className="gal-item group relative aspect-[2/3] bg-[#f8fafc] border border-slate-100 overflow-hidden cursor-zoom-in h-full"
                >
                   <Image
                     src={img.src}
                     alt={img.alt || product.title || "Product image"}
                     fill
                     quality={85}
                      className="p-3 md:p-5 transition-transform duration-500 group-hover:scale-[1.04] object-cover"
                      style={img._key === 'grid-ceiling' ? { objectPosition: 'top' } : undefined}
                    sizes="(max-width: 768px) 50vw, 33vw"
                   />
                  <span className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0047BB] opacity-0 group-hover:opacity-100 transition-opacity">
                    ZOOM ⤢
                  </span>
                </button>
              ))}
            </div>
            <SectionCta />
          </div>
        </section>
      )}

      {/* Configuration note (client notes) */}
      {product.configurationNote && (
        <section className="bg-[#f8fafc] border-t border-slate-100">
          <div className="container-gutter py-8 space-y-4">
            <Disclaimer text={product.configurationNote} />
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
                    {(p.image || p.gallery?.[0]?.src) ? (
                      <Image
                        src={p.image ? urlFor(p.image).width(800).auto("format").url() : p.gallery?.[0]?.src ?? "/hero-elevator.jpg"}
                        alt={p.gallery?.[0]?.alt || p.title || "Product image"}
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
            <SectionCta />
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
            <Image src={zoom.src} alt={zoom.alt || product.title || "Product image"} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
