"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  if (pathname === "/cta") return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_24px_rgba(15,23,42,0.04)] py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-14 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`eyebrow transition-colors duration-200 ${
                  active
                    ? "text-[#2563EB]"
                    : "text-slate-600 hover:text-[#2563EB]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side — one flex container for all breakpoints */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Translator — always in the flex row */}
          <GoogleTranslateWidget />

          {/* Desktop only: phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={CONTACT.phoneHref}
              className="eyebrow text-slate-500 hover:text-[#2563EB] transition-colors"
            >
              {CONTACT.phone}
            </a>
            <Link
              href="/cta"
              className="group inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white eyebrow px-6 py-3 transition-all duration-200"
            >
              GET A QUOTE
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Mobile only: hamburger */}
          <button
            className="lg:hidden text-[#0f172a] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <MobileMenu onClose={() => setMobileOpen(false)} />
        ) : null}
      </AnimatePresence>
    </header>
  );
}
