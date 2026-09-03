"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PRODUCT_MENU, CONTACT } from "@/app/data/content";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

let scriptLoaded = false;

function GoogleTranslateWidget() {
  useEffect(() => {
    if (scriptLoaded) return;
    scriptLoaded = true;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,ar,zh-CN,zh-TW,fr,es,ur,ru,hi,ja,ko,pt,de,it,tr,th,vi,ms,id,bn,sw",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const s = document.createElement("script");
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div id="google_translate_element" className="ff-translate" aria-label="Language selector" />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen]   = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [navH, setNavH]             = useState(64);
  const headerRef                   = useRef<HTMLElement>(null);
  const pathname                    = usePathname();

  /* Close menus on route change */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMobileOpen(false);
      setMegaOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  /* Escape closes the mega menu */
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  /* Track scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Measure real header height so mobile menu sits flush below it */
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight;
        setNavH(h);
        document.documentElement.style.setProperty("--nav-h", `${h}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname === "/cta") return null;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_2px_24px_rgba(15,23,42,0.04)] py-3"
          : "bg-white py-4 md:py-5"
      }`}
    >
      {/* Thin blue top border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#0047BB]" aria-hidden="true" />

      {/* Bottom hairline */}
      <div
        className={`absolute bottom-0 inset-x-0 h-px bg-slate-100 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-60"
        }`}
        aria-hidden="true"
      />

      {/*
        ============================================================
        DESKTOP ROW (≥1280px) — CSS GRID, three independent columns:
          [ logo ]  [ 7 nav links, centered, own track ]  [ utilities ]
        Sections live in separate grid tracks, so the navigation can
        physically never bleed into the utility cluster.

        Width budget (worst case, 1280px, fully-rendered widget):
          logo 151 + nav ~580 + utilities ~360 + track gaps ~52
          ≈ 1143px of the 1168px available → fits with breathing room.
        Phone number joins the row from 1536px up, where there is
        guaranteed space for it without compressing anything.
        ============================================================
      */}
      <div
        className="hidden xl:grid items-center px-4 sm:px-6 md:px-10 xl:px-14"
        style={{
          gridTemplateColumns: "auto minmax(0, 1fr) auto",
          columnGap: "clamp(20px, 2vw, 44px)",
        }}
      >
        {/* ── Section 1 · Logo ── */}
        <Logo className="xl:h-6 2xl:h-7" />

        {/* ── Section 2 · Primary navigation ── */}
        <nav aria-label="Primary" className="justify-self-center min-w-0">
          <ul
            className="flex items-center list-none m-0 p-0"
            style={{ gap: "clamp(12px, 1.4vw, 26px)" }}
          >
{NAV_LINKS.map((l) => {
                const active = pathname === l.href || 
                  (l.href === "/products" && (pathname.startsWith("/products") || pathname === "/")) ||
                  (l.href === "/" && pathname === "/");

              /* PRODUCTS — hover mega-menu trigger */
              if (l.href === "/products") {
                return (
                  <li
                    key={l.label}
                    className="relative whitespace-nowrap"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      className={`eyebrow inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 ${
                        active || megaOpen
                          ? "text-[#0047BB]"
                          : "text-slate-600 hover:text-[#0047BB]"
                      }`}
                      style={{ letterSpacing: "0.12em" }}
                    >
                      {l.label}
                      <svg
                        viewBox="0 0 12 12"
                        className={`h-2.5 w-2.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </Link>

                    {/* Mega dropdown panel */}
                    <AnimatePresence>
                      {megaOpen && (
                        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                          <motion.div
                            role="menu"
                            aria-label="Product categories"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="w-[840px] max-w-[calc(100vw-4rem)] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.14)]"
                          >
                            <div className="columns-2 gap-10 lg:columns-3">
                              {PRODUCT_MENU.map((g) => (
                                <div key={g.title} className="mb-8 break-inside-avoid last:mb-0">
                                  <div className="mb-3 flex items-baseline gap-2.5">
                                    <span className="eyebrow text-[#0047BB]">{g.num}</span>
                                    <span
                                      className="subheading text-[#0f172a]"
                                      style={{ fontSize: "12px", letterSpacing: "0.08em" }}
                                    >
                                      {g.title}
                                    </span>
                                  </div>
                                  <ul className="ml-1 space-y-1.5 border-l border-slate-100 pl-4">
                                    {g.items.map((it) => (
                                      <li key={it.href}>
                                        <Link
                                          href={it.href}
                                          role="menuitem"
                                          onClick={() => setMegaOpen(false)}
                                          className="group flex items-center gap-2 text-slate-600 transition-colors duration-150 hover:text-[#0047BB]"
                                          style={{ fontSize: "13px" }}
                                        >
                                          <span
                                            className="h-1 w-1 flex-shrink-0 rounded-full bg-slate-300 transition-colors duration-150 group-hover:bg-[#0047BB]"
                                            aria-hidden="true"
                                          />
                                          {it.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={l.label} className="whitespace-nowrap">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`eyebrow whitespace-nowrap transition-colors duration-200 ${
                      active
                        ? "text-[#0047BB]"
                        : "text-slate-600 hover:text-[#0047BB]"
                    }`}
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Section 3 · Utilities ── */}
        <div className="flex items-center flex-shrink-0">

          {/* Language selector */}
          <div className="flex items-center gap-1.5 pr-4 mr-4 border-r border-slate-200">
            <span className="eyebrow text-slate-400 select-none">EN</span>
            <span className="text-slate-300 select-none" aria-hidden="true">/</span>
            <GoogleTranslateWidget />
          </div>

          {/* Phone — from 1536px, where it fits without compression */}
          <a
            href={CONTACT.phoneHref}
            className="hidden 2xl:inline-block eyebrow text-slate-500 hover:text-[#0047BB] transition-colors duration-200 whitespace-nowrap mr-4"
          >
            {CONTACT.phone}
          </a>

          {/* CTA — far right */}
          <Link
            href="/cta"
            className="group inline-flex items-center justify-center gap-2 bg-[#0047BB] hover:bg-[#003A94] text-white eyebrow px-4 py-2.5 transition-colors duration-200 whitespace-nowrap"
          >
            GET A QUOTE
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/*
        ============================================================
        MOBILE / TABLET ROW (<1280px) — flex: logo + hamburger.
        Desktop nav and utilities are removed entirely; the existing
        MobileMenu drawer carries links, quote CTA and language picker.
        ============================================================
      */}
      <div className="xl:hidden flex items-center justify-between px-6 sm:px-8">
        <Logo />

        {/* Hamburger — 44×44 px minimum touch target per WCAG 2.5.5 */}
        <button
          className="flex items-center justify-center w-11 h-11 -mr-1 text-[#0f172a] rounded-sm
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {/* Three-bar → X morph */}
          <span className="relative w-5 h-[14px] flex flex-col justify-between" aria-hidden="true">
            <span className={`absolute top-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-px bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute bottom-0 left-0 w-5 h-px bg-current origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </span>
        </button>
      </div>

      {/* ── Mobile menu drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            id="mobile-nav"
            navHeight={navH}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
