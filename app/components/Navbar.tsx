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
  { code: "af",    label: "Afrikaans",            native: "Afrikaans" },
  { code: "sq",    label: "Albanian",             native: "Shqip" },
  { code: "am",    label: "Amharic",              native: "አማርኛ" },
  { code: "ar",    label: "Arabic",               native: "العربية" },
  { code: "hy",    label: "Armenian",             native: "Հայերեն" },
  { code: "az",    label: "Azerbaijani",          native: "Azərbaycan" },
  { code: "eu",    label: "Basque",               native: "Euskara" },
  { code: "be",    label: "Belarusian",           native: "Беларуская" },
  { code: "bn",    label: "Bengali",              native: "বাংলা" },
  { code: "bs",    label: "Bosnian",              native: "Bosanski" },
  { code: "bg",    label: "Bulgarian",            native: "Български" },
  { code: "my",    label: "Burmese",              native: "မြန်မာ" },
  { code: "ca",    label: "Catalan",              native: "Català" },
  { code: "ceb",   label: "Cebuano",              native: "Cebuano" },
  { code: "zh-CN", label: "Chinese (Simplified)",  native: "简体中文" },
  { code: "zh-TW", label: "Chinese (Traditional)", native: "繁體中文" },
  { code: "co",    label: "Corsican",             native: "Corsu" },
  { code: "hr",    label: "Croatian",             native: "Hrvatski" },
  { code: "cs",    label: "Czech",                native: "Čeština" },
  { code: "da",    label: "Danish",               native: "Dansk" },
  { code: "nl",    label: "Dutch",                native: "Nederlands" },
  { code: "en",    label: "English",              native: "English" },
  { code: "eo",    label: "Esperanto",            native: "Esperanto" },
  { code: "et",    label: "Estonian",             native: "Eesti" },
  { code: "fi",    label: "Finnish",              native: "Suomi" },
  { code: "fr",    label: "French",               native: "Français" },
  { code: "fy",    label: "Frisian",              native: "Frysk" },
  { code: "gl",    label: "Galician",             native: "Galego" },
  { code: "ka",    label: "Georgian",             native: "ქართული" },
  { code: "de",    label: "German",               native: "Deutsch" },
  { code: "el",    label: "Greek",                native: "Ελληνικά" },
  { code: "gu",    label: "Gujarati",             native: "ગુજરાતી" },
  { code: "ht",    label: "Haitian Creole",       native: "Kreyòl Ayisyen" },
  { code: "ha",    label: "Hausa",                native: "Hausa" },
  { code: "haw",   label: "Hawaiian",             native: "ʻŌlelo Hawaiʻi" },
  { code: "he",    label: "Hebrew",               native: "עברית" },
  { code: "hi",    label: "Hindi",                native: "हिन्दी" },
  { code: "hmn",   label: "Hmong",                native: "Hmong" },
  { code: "hu",    label: "Hungarian",            native: "Magyar" },
  { code: "is",    label: "Icelandic",            native: "Íslenska" },
  { code: "ig",    label: "Igbo",                 native: "Igbo" },
  { code: "id",    label: "Indonesian",           native: "Bahasa Indonesia" },
  { code: "ga",    label: "Irish",                native: "Gaeilge" },
  { code: "it",    label: "Italian",              native: "Italiano" },
  { code: "ja",    label: "Japanese",             native: "日本語" },
  { code: "jv",    label: "Javanese",             native: "Basa Jawa" },
  { code: "kn",    label: "Kannada",              native: "ಕನ್ನಡ" },
  { code: "kk",    label: "Kazakh",               native: "Қазақ" },
  { code: "km",    label: "Khmer",                native: "ភាសាខ្មែរ" },
  { code: "rw",    label: "Kinyarwanda",          native: "Ikinyarwanda" },
  { code: "ko",    label: "Korean",               native: "한국어" },
  { code: "ku",    label: "Kurdish",              native: "Kurdî" },
  { code: "ky",    label: "Kyrgyz",               native: "Кыргызча" },
  { code: "lo",    label: "Lao",                  native: "ລາວ" },
  { code: "la",    label: "Latin",                native: "Latina" },
  { code: "lv",    label: "Latvian",              native: "Latviešu" },
  { code: "lt",    label: "Lithuanian",           native: "Lietuvių" },
  { code: "lb",    label: "Luxembourgish",        native: "Lëtzebuergesch" },
  { code: "mk",    label: "Macedonian",           native: "Македонски" },
  { code: "mg",    label: "Malagasy",             native: "Malagasy" },
  { code: "ms",    label: "Malay",                native: "Bahasa Melayu" },
  { code: "ml",    label: "Malayalam",            native: "മലയാളം" },
  { code: "mt",    label: "Maltese",              native: "Malti" },
  { code: "mi",    label: "Maori",                native: "Te Reo Māori" },
  { code: "mr",    label: "Marathi",              native: "मराठी" },
  { code: "mn",    label: "Mongolian",            native: "Монгол" },
  { code: "ne",    label: "Nepali",               native: "नेपाली" },
  { code: "no",    label: "Norwegian",            native: "Norsk" },
  { code: "or",    label: "Odia",                 native: "ଓଡ଼ିଆ" },
  { code: "ps",    label: "Pashto",               native: "پښتو" },
  { code: "fa",    label: "Persian",              native: "فارسی" },
  { code: "pl",    label: "Polish",               native: "Polski" },
  { code: "pt",    label: "Portuguese",           native: "Português" },
  { code: "pa",    label: "Punjabi",              native: "ਪੰਜਾਬੀ" },
  { code: "ro",    label: "Romanian",             native: "Română" },
  { code: "ru",    label: "Russian",              native: "Русский" },
  { code: "sm",    label: "Samoan",               native: "Gagana Samoa" },
  { code: "gd",    label: "Scots Gaelic",         native: "Gàidhlig" },
  { code: "sr",    label: "Serbian",              native: "Српски" },
  { code: "st",    label: "Sesotho",              native: "Sesotho" },
  { code: "sn",    label: "Shona",                native: "ChiShona" },
  { code: "sd",    label: "Sindhi",               native: "سنڌي" },
  { code: "si",    label: "Sinhala",              native: "සිංහල" },
  { code: "sk",    label: "Slovak",               native: "Slovenčina" },
  { code: "sl",    label: "Slovenian",            native: "Slovenščina" },
  { code: "so",    label: "Somali",               native: "Soomaali" },
  { code: "es",    label: "Spanish",              native: "Español" },
  { code: "su",    label: "Sundanese",            native: "Basa Sunda" },
  { code: "sw",    label: "Swahili",              native: "Kiswahili" },
  { code: "sv",    label: "Swedish",              native: "Svenska" },
  { code: "tg",    label: "Tajik",                native: "Тоҷикӣ" },
  { code: "ta",    label: "Tamil",                native: "தமிழ்" },
  { code: "te",    label: "Telugu",               native: "తెలుగు" },
  { code: "th",    label: "Thai",                 native: "ไทย" },
  { code: "ti",    label: "Tigrinya",             native: "ትግርኛ" },
  { code: "ts",    label: "Tsonga",               native: "Xitsonga" },
  { code: "tr",    label: "Turkish",              native: "Türkçe" },
  { code: "tk",    label: "Turkmen",              native: "Türkmen" },
  { code: "uk",    label: "Ukrainian",            native: "Українська" },
  { code: "ur",    label: "Urdu",                 native: "اردو" },
  { code: "ug",    label: "Uyghur",               native: "ئۇيغۇرچە" },
  { code: "uz",    label: "Uzbek",                native: "Oʻzbek" },
  { code: "vi",    label: "Vietnamese",           native: "Tiếng Việt" },
  { code: "cy",    label: "Welsh",                native: "Cymraeg" },
  { code: "xh",    label: "Xhosa",                native: "isiXhosa" },
  { code: "yi",    label: "Yiddish",              native: "ייִדיש" },
  { code: "yo",    label: "Yoruba",               native: "Yorùbá" },
  { code: "zu",    label: "Zulu",                 native: "isiZulu" },
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

function GoogleTranslateWidget({ buttonId = "translate-toggle-btn" }: { buttonId?: string } = {}) {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [search, setSearch] = useState("");
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
          includedLanguages: "",
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
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const activeLangObj =
    TRANSLATE_LANGUAGES.find((l) => l.code === activeLang) ?? TRANSLATE_LANGUAGES[0];

  const handleSelect = (code: string) => {
    setActiveLang(code);
    setOpen(false);
    setSearch("");
    triggerGoogleTranslate(code);
  };

  const filteredLanguages = TRANSLATE_LANGUAGES.filter((l) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      l.label.toLowerCase().includes(q) ||
      (l.native && l.native.toLowerCase().includes(q)) ||
      l.code.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      {/* ── Compact trigger button ── */}
      <motion.button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0047BB]/40 focus:ring-offset-1 select-none ${
          open
            ? "bg-[#0047BB] text-white border border-[#0047BB] shadow-sm shadow-[#0047BB]/25"
            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Globe icon — crisp 13px */}
        <motion.svg
          width={13}
          height={13}
          viewBox="0 0 16 16"
          style={{ width: 13, height: 13, minWidth: 13, minHeight: 13 }}
          className="flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          animate={{ rotate: open ? 25 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8s-2.5 6.5-2.5 6.5M1.5 8h13" />
        </motion.svg>

        <span className="leading-none">{activeLangObj.code.toUpperCase().slice(0, 2)}</span>

        {/* Chevron */}
        <motion.svg
          width={9}
          height={9}
          viewBox="0 0 10 10"
          style={{ width: 9, height: 9, minWidth: 9, minHeight: 9 }}
          className="flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
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
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.16),0_1px_3px_rgba(0,0,0,0.06)] p-2 z-[200]"
            style={{ top: "100%", transformOrigin: "top right" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header with Title and Language Count */}
            <div className="px-2 pt-1 pb-2 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <svg
                    width={13}
                    height={13}
                    viewBox="0 0 16 16"
                    style={{ width: 13, height: 13, minWidth: 13, minHeight: 13 }}
                    className="text-[#0047BB] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8s-2.5 6.5-2.5 6.5M1.5 8h13" />
                  </svg>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.14em]">
                    Select Language
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  {TRANSLATE_LANGUAGES.length}
                </span>
              </div>

              {/* Quick search input */}
              <div className="relative flex items-center">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 16 16"
                  style={{ width: 13, height: 13, minWidth: 13, minHeight: 13 }}
                  className="absolute left-2.5 text-slate-400 pointer-events-none flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search language..."
                  className="w-full pl-8 pr-7 py-1.5 text-[11px] bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/90 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0047BB]/20 focus:border-[#0047BB] transition-all"
                  onClick={(e) => e.stopPropagation()}
                />
                {search && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearch("");
                    }}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 text-xs font-bold leading-none"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Language list with sleek scoped scrollbar & trapped scroll */}
            <div
              className="py-1.5 space-y-0.5 pr-1 lang-dropdown-scroll"
              style={{
                maxHeight: "260px",
                overflowY: "auto",
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {filteredLanguages.length === 0 ? (
                <div className="py-6 text-center text-[11px] text-slate-400">
                  No language found
                </div>
              ) : (
                filteredLanguages.map((lang, i) => {
                  const isSelected = activeLang === lang.code;
                  return (
                    <motion.button
                      key={lang.code}
                      role="option"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.012, duration: 0.15 }}
                      whileHover={{ x: 2 }}
                      className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all duration-150 ${
                        isSelected
                          ? "bg-[#0047BB]/10 text-[#0047BB] font-semibold"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Language code badge */}
                        <span
                          className={`w-6 h-5 rounded flex items-center justify-center text-[9px] font-bold font-mono flex-shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#0047BB] text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                          }`}
                        >
                          {lang.code.toUpperCase().slice(0, 2)}
                        </span>

                        {/* Language labels */}
                        <div className="min-w-0">
                          <p className="text-[12px] leading-snug truncate">
                            {lang.label}
                          </p>
                          {lang.native && lang.native !== lang.label && (
                            <p className="text-[10px] text-slate-400 font-normal leading-tight truncate group-hover:text-slate-500">
                              {lang.native}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Selected checkmark indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
                          className="rounded-full bg-[#0047BB] text-white flex items-center justify-center flex-shrink-0 ml-2"
                        >
                          <svg
                            width={9}
                            height={9}
                            viewBox="0 0 12 12"
                            style={{ width: 9, height: 9, minWidth: 9, minHeight: 9 }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2.5 6.5l2.5 2.5 4.5-5" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })
              )}
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
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileOpen
            ? "bg-white py-3 shadow-xs"
            : scrolled
              ? "bg-white/90 backdrop-blur-md shadow-[0_2px_24px_rgba(15,23,42,0.04)] py-3"
              : "bg-white py-4 md:py-5"
        }`}
      >
        {/* Hidden Google Translate native widget — single engine anchor */}
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
              <GoogleTranslateWidget buttonId="translate-toggle-btn" />
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
        <div className="xl:hidden flex items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-2.5">
            <GoogleTranslateWidget buttonId="translate-toggle-btn-mobile" />
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
        </div>
      </header>

      {/* ── Mobile menu drawer (rendered outside header so backdrop-blur on header never breaks fixed positioning) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            id="mobile-nav"
            navHeight={navH}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}