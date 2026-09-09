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

// Languages shown always in English regardless of user's locale
const TRANSLATE_LANGUAGES = [
  { code: "en",    label: "English" },
  { code: "ar",    label: "Arabic" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "fr",    label: "French" },
  { code: "de",    label: "German" },
  { code: "hi",    label: "Hindi" },
  { code: "id",    label: "Indonesian" },
  { code: "it",    label: "Italian" },
  { code: "ja",    label: "Japanese" },
  { code: "ko",    label: "Korean" },
  { code: "ms",    label: "Malay" },
  { code: "pt",    label: "Portuguese" },
  { code: "ru",    label: "Russian" },
  { code: "es",    label: "Spanish" },
  { code: "th",    label: "Thai" },
  { code: "tr",    label: "Turkish" },
  { code: "ur",    label: "Urdu" },
  { code: "vi",    label: "Vietnamese" },
];

function setGoogTransCookie(langCode: string) {
  const value = langCode === "en" ? "/en/en" : `/en/${langCode}`;
  // Set on current domain and root path so every page picks it up
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  // Also set on naked domain for sub-path compatibility
  document.cookie = `googtrans=${value}; path=/; domain=${location.hostname}; SameSite=Lax`;
}

function triggerGoogleTranslate(langCode: string) {
  setGoogTransCookie(langCode);
  // Programmatically select the language in the hidden native widget
  const container = document.getElementById("google_translate_element");
  const select = container?.querySelector("select") as HTMLSelectElement | null;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    // If widget not ready yet, reload — cookie will auto-translate
    window.location.reload();
  }
}

function GoogleTranslateWidget() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load the hidden Google Translate widget once
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

  // Detect active language from cookie on mount
  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith("googtrans="));
    if (match) {
      const parts = match.split("=")[1]?.split("/");
      const lang = parts?.[parts.length - 1];
      if (lang && TRANSLATE_LANGUAGES.find((l) => l.code === lang)) {
        setActiveLang(lang);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const currentLabel =
    TRANSLATE_LANGUAGES.find((l) => l.code === activeLang)?.label ?? "English";

  const handleSelect = (code: string) => {
    setActiveLang(code);
    setOpen(false);
    triggerGoogleTranslate(code);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      {/* Hidden Google Translate native widget — keeps GT engine alive */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          top: 0,
          left: 0,
        }}
      />

      {/* ── Compact trigger button ── */}
      <motion.button
        id="translate-toggle-btn"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047BB]/40 focus:ring-offset-1 ${
          open
            ? "bg-[#0047BB] text-white border border-[#0047BB]"
            : "bg-white text-slate-500 border border-slate-200 hover:border-[#0047BB] hover:text-[#0047BB]"
        }`}
      >
        {/* Globe icon — tiny & crisp */}
        <motion.svg
          viewBox="0 0 14 14"
          className="h-3 w-3 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden="true"
          animate={{ rotate: open ? 15 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <circle cx="7" cy="7" r="5.5" />
          <path d="M7 1.5C7 1.5 4.8 4 4.8 7s2.2 5.5 2.2 5.5M7 1.5C7 1.5 9.2 4 9.2 7S7 12.5 7 12.5M1.5 7h11" />
        </motion.svg>

        <span>{currentLabel === "English" ? "EN" : currentLabel.slice(0, 2).toUpperCase()}</span>

        {/* Chevron */}
        <motion.svg
          viewBox="0 0 10 10"
          className="h-2 w-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <path d="M2 3.5l3 3 3-3" />
        </motion.svg>
      </motion.button>

      {/* ── Animated dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.13)] overflow-hidden z-[200]"
            style={{ top: "100%", transformOrigin: "top right" }}
          >
            {/* Header */}
            <div className="px-3.5 pt-2.5 pb-1.5 border-b border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.14em]">
                Select Language
              </p>
            </div>

            {/* Language list */}
            <div className="py-1 max-h-64 overflow-y-auto">
              {TRANSLATE_LANGUAGES.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  role="option"
                  aria-selected={activeLang === lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.018, duration: 0.18 }}
                  whileHover={{ x: 2 }}
                  className={`w-full flex items-center gap-2 px-3.5 py-1.5 text-[12px] text-left transition-colors duration-100 ${
                    activeLang === lang.code
                      ? "bg-[#EEF3FF] text-[#0047BB] font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0047BB]"
                  }`}
                >
                  {/* Active checkmark */}
                  <span className="w-3 flex-shrink-0 flex items-center justify-center">
                    {activeLang === lang.code && (
                      <motion.svg
                        viewBox="0 0 10 10"
                        className="h-2.5 w-2.5 text-[#0047BB]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        <path d="M1.5 5l2.5 2.5 4.5-4" />
                      </motion.svg>
                    )}
                  </span>
                  {lang.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
          {/* Language selector — always displayed in English */}
          <div className="flex items-center pr-3 border-r border-slate-200">
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