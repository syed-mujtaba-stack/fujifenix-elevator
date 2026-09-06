"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PRODUCT_MENU, CONTACT, type ProductMenuGroup } from "@/app/data/content";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

let scriptLoaded = false;

const ENGLISH_LABELS: Record<string, string> = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jv: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  rw: "Kinyarwanda",
  ko: "Korean",
  ku: "Kurdish",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  ny: "Chichewa",
  or: "Odia",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tl: "Filipino",
  tg: "Tajik",
  ta: "Tamil",
  tt: "Tatar",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  tk: "Turkmen",
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

function forceEnglishOptions() {
  const container = document.getElementById("google_translate_element");
  if (!container) return;

  const select = container.querySelector("select") as HTMLSelectElement | null;
  if (!select) return;

  Array.from(select.options).forEach((opt) => {
    if (opt.text && ENGLISH_LABELS[opt.value]) {
      opt.text = ENGLISH_LABELS[opt.value];
    }
  });
}

function GoogleTranslateWidget() {
  useEffect(() => {
    if (scriptLoaded) return;
    scriptLoaded = true;

    // Force Google Translate UI to always use English
    document.cookie = "googtranslate=en; path=/; max-age=31536000; SameSite=Lax";

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

      // Force English option labels after widget renders
      const timers = [300, 600, 1200, 2500];
      timers.forEach((ms) => setTimeout(forceEnglishOptions, ms));

      // Watch for any DOM changes that re-render the options
      const observer = new MutationObserver(forceEnglishOptions);
      const target = document.getElementById("google_translate_element");
      if (target) {
        observer.observe(target, { childList: true, subtree: true, characterData: true });
      }
    };

    const s = document.createElement("script");
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div id="google_translate_element" className="ff-translate notranslate" translate="no" aria-label="Language selector" />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navH, setNavH] = useState(64);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

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

      {/* ── DESKTOP ROW (≥1280px) ── */}
      <div className="hidden xl:flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        {/* LEFT: Logo */}
        <Logo className="xl:h-6 2xl:h-7 flex-shrink-0" />

        {/* CENTER: Navigation */}
        <nav aria-label="Primary" className="flex-1 flex justify-center items-center">
          <div className="flex items-center" style={{ gap: "clamp(16px, 2vw, 32px)" }}>
            {/* Nav links */}
            <ul className="flex items-center list-none m-0 p-0" style={{ gap: "clamp(16px, 2vw, 32px)" }}>
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href || (l.href === "/" && pathname === "/");
                const isProducts = l.href === "/products";
                return (
                  <li
                    key={l.label}
                    className={`whitespace-nowrap${isProducts ? " relative" : ""}`}
                    onMouseEnter={isProducts ? () => setMegaOpen(true) : undefined}
                    onMouseLeave={isProducts ? () => setMegaOpen(false) : undefined}
                  >
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={isProducts ? "true" : undefined}
                      aria-expanded={isProducts ? megaOpen : undefined}
                      className={`eyebrow inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 ${
                        active
                          ? "text-[#0047BB]"
                          : "text-slate-600 hover:text-[#0047BB]"
                      }`}
                      style={{ letterSpacing: "0.12em" }}
                    >
                      {l.label}
                      {isProducts && (
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
                      )}
                    </Link>

                    {/* ── MEGA MENU (Desktop) — FenixSeven-style two-level flyout ── */}
                    {isProducts && (
                      <AnimatePresence>
                        {megaOpen && (
                          <motion.div
                            role="menu"
                            aria-label="Product categories"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-full z-[50]"
                            style={{ marginTop: "2px" }}
                          >
                            <div className="bg-white border border-slate-100/80 rounded-lg shadow-[0_20px_60px_rgba(15,23,42,0.12)] py-1 min-w-[280px]">
                              {PRODUCT_MENU.map((group) => (
                                <div key={group.slug} className="relative group/cat">
                                  <Link
                                    href={`/products/${group.slug}`}
                                    className="flex items-center justify-between px-5 py-3 text-[13px] font-semibold text-slate-700 hover:text-[#0047BB] hover:bg-slate-50/80 transition-colors duration-150"
                                    onClick={() => setMegaOpen(false)}
                                    role="menuitem"
                                  >
                                    <span className="uppercase tracking-[0.04em] truncate" style={{ fontSize: "10px" }}>
                                      {group.title}
                                    </span>
                                    <svg
                                      viewBox="0 0 12 12"
                                      className="h-3 w-3 flex-shrink-0 text-slate-300 group-hover/cat:text-[#0047BB] transition-colors"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      aria-hidden="true"
                                    >
                                      <path d="M4 2l4 4-4 4" />
                                    </svg>
                                  </Link>

                                  {/* Flyout submenu */}
                                  <div className="absolute left-full top-0 pl-3 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible pointer-events-none group-hover/cat:pointer-events-auto transition-all duration-200 ease-out z-[51]">
                                    <div className="bg-white border border-slate-100/80 rounded-lg shadow-[0_20px_60px_rgba(15,23,42,0.12)] py-3 min-w-[240px]">
                                      <div className="px-4 mb-2">
                                        <span className="block text-[10px] font-bold text-[#0047BB] uppercase tracking-[0.15em]">
                                          {group.num}
                                        </span>
                                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                                          {group.title}
                                        </span>
                                      </div>
                                      <div className="border-t border-slate-100 mx-4 mb-2" />
                                      <ul className="space-y-0.5 px-1">
                                        {group.items.map((item) => (
                                          <li key={item.href}>
                                            <Link
                                              href={item.href}
                                              role="menuitem"
                                              onClick={() => setMegaOpen(false)}
                                              className="group/item flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-500 transition-colors duration-150 hover:text-[#0047BB] hover:bg-slate-50/80 rounded-md"
                                            >
                                              <span
                                                className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-slate-200 transition-colors duration-150 group-hover/item:bg-[#0047BB]"
                                                aria-hidden="true"
                                              />
                                              {item.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* RIGHT: Utilities */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Language selector */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <span className="eyebrow text-slate-400 select-none whitespace-nowrap">EN</span>
            <span className="text-slate-300 select-none" aria-hidden="true">/</span>
            <GoogleTranslateWidget />
          </div>

          {/* GET A QUOTE CTA */}
          <Link
            href="/cta"
            className="group inline-flex items-center justify-center gap-2 bg-[#0047BB] hover:bg-[#003A94] text-white eyebrow px-5 py-2.5 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            GET A QUOTE
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ── MOBILE / TABLET ROW (<1280px) ── */}
      <div className="xl:hidden flex items-center justify-between px-6 sm:px-8">
        <Logo />
        <button
          className="flex items-center justify-center w-11 h-11 -mr-1 text-[#0f172a] rounded-sm
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
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