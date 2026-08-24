"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, CONTACT } from "@/app/data/content";
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

  return <div id="google_translate_element" className="ff-translate" />;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [navH, setNavH]             = useState(64); // tracked for mobile menu max-height
  const headerRef                   = useRef<HTMLElement>(null);
  const pathname                    = usePathname();

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
        // Expose navbar height as a CSS variable so Hero can consume it
        // without prop-drilling. Both MobileHero and DesktopHero use this.
        document.documentElement.style.setProperty("--nav-h", `${h}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]); // re-measure when padding changes on scroll

  /* Close menu on route change */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

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
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_24px_rgba(15,23,42,0.04)] py-3"
          : "bg-white border-b border-slate-100/60 py-4 md:py-5"
      }`}
    >
      {/*
        Inner row:
        • px-4 on the smallest screens (320 px) — prevents overflow
        • px-6 from sm (480 px)
        • px-10 from md (768 px)
        • px-14 from lg (1024 px)
        min-w-0 on children prevents flex blowout
      */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between min-w-0 gap-2">

        {/* ── Logo ── */}
        <div className="flex-shrink-0 min-w-0">
          <Logo />
        </div>

        {/* ── Desktop nav links (hidden below lg) ── */}
        <nav className="hidden lg:flex items-center gap-7 min-w-0">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`eyebrow whitespace-nowrap transition-colors duration-200 ${
                  active ? "text-[#0047BB]" : "text-slate-600 hover:text-[#0047BB]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 flex-shrink-0 min-w-0">

          {/*
            Google Translate:
            Hidden on mobile (<lg) — it lives inside the mobile menu instead,
            so it doesn't consume precious horizontal space on narrow screens.
          */}
          <div className="hidden lg:block">
            <GoogleTranslateWidget />
          </div>

          {/* Desktop: phone number + CTA button */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={CONTACT.phoneHref}
              className="eyebrow text-slate-500 hover:text-[#0047BB] transition-colors whitespace-nowrap"
            >
              {CONTACT.phone}
            </a>
            <Link
              href="/cta"
              className="group inline-flex items-center gap-2 bg-[#0047BB] hover:bg-[#003A94] text-white eyebrow px-6 py-3 transition-all duration-200 whitespace-nowrap"
            >
              GET A QUOTE
              <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
            </Link>
          </div>

          {/*
            Hamburger — mobile/tablet only (< lg).
            44×44 px minimum touch target per WCAG 2.5.5.
          */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1 text-[#0f172a] rounded-sm
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
