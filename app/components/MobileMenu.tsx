"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/app/data/content";

/* Google Translate widget — rendered inside the mobile menu
   so it doesn't eat horizontal space in the navbar row */
function MobileTranslate() {
  return (
    <div
      id="google_translate_element"
      className="ff-translate"
      aria-label="Language selector"
    />
  );
}

interface MobileMenuProps {
  onClose: () => void;
  navHeight?: number;   // real measured header height passed from Navbar
  id?: string;          // for aria-controls
}

export default function MobileMenu({ onClose, navHeight = 64, id }: MobileMenuProps) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-label="Navigation menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      /*
        Position: fixed so it overlays the entire screen below the navbar.
        max-h: viewport minus real navbar height.
        overflow-y: auto for very small screens / many links.
        width: 100vw prevents any horizontal overflow.
        No horizontal padding on the wrapper — applied per-item instead.
      */
      style={{ top: navHeight }}
      className="
        fixed left-0 right-0 bottom-0
        bg-white border-t border-slate-100
        flex flex-col
        overflow-y-auto overflow-x-hidden
        z-50
        w-full
        shadow-[0_8px_32px_rgba(15,23,42,0.08)]
      "
    >
      {/* ── Nav links ── */}
      <nav className="flex flex-col px-4 sm:px-6 pt-2 pb-4 flex-1">
        {NAV_LINKS.map((l, i) => (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.25 }}
          >
            <Link
              href={l.href}
              className="
                flex items-center justify-between
                py-4 border-b border-slate-100
                group
                min-h-[52px]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]
              "
              onClick={onClose}
            >
              <span
                className="heading text-[#0f172a] group-hover:text-[#0047BB] transition-colors leading-none"
                style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
              >
                {l.label}
              </span>
              <span
                className="text-slate-300 group-hover:text-[#0047BB] group-hover:translate-x-1 transition-all flex-shrink-0 ml-3"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* ── Bottom actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.25 }}
        className="
          px-4 sm:px-6
          pt-5 pb-8
          flex flex-col gap-3
          border-t border-slate-100
          bg-white
          flex-shrink-0
        "
      >
        {/* GET A QUOTE — full-width blue button */}
        <Link
          href="/cta"
          onClick={onClose}
          className="
            flex items-center justify-center gap-2
            bg-[#0047BB] hover:bg-[#003A94] active:bg-[#1e40af]
            text-white eyebrow
            py-4 px-6
            w-full
            transition-colors duration-200
            min-h-[48px]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047BB]
          "
        >
          GET A QUOTE
          <span aria-hidden="true">→</span>
        </Link>

        {/* Contact row — stacks on very narrow screens */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-4 pt-1">
          <span className="eyebrow text-slate-400 text-[10px] truncate">
            {CONTACT.address}
          </span>
          <a
            href={CONTACT.phoneHref}
            className="eyebrow text-[#0047BB] hover:underline whitespace-nowrap text-[11px] flex-shrink-0"
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Google Translate inside the menu — no navbar overflow */}
        <div className="pt-2">
          <MobileTranslate />
        </div>
      </motion.div>
    </motion.div>
  );
}
