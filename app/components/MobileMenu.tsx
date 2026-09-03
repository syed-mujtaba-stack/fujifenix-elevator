"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, PRODUCT_MENU, CONTACT, type ProductMenuGroup } from "@/app/data/content";

const ProductCategoryAccordion = ({
  group,
  onClose,
}: {
  group: ProductMenuGroup;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const categoryHref = `/products/${group.slug}`;

  return (
    <div className="border-b border-slate-100">
      <div className="flex items-center w-full">
        <Link
          href={categoryHref}
          onClick={onClose}
          className="
            flex items-center justify-between w-full flex-1
            py-3 px-4 min-h-[48px]
            group
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]
          "
          aria-label={`View ${group.title} category`}
        >
          <span
            className="subheading text-[#0f172a] group-hover:text-[#0047BB] transition-colors leading-none flex-1 whitespace-nowrap"
            style={{ fontSize: "clamp(9px, 2.8vw, 11px)", letterSpacing: "0.06em" }}
          >
            <span className="eyebrow text-[#0047BB] mr-2">{group.num}</span>
            {group.title}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`category-products-${group.slug}`}
          className="
            flex items-center justify-center w-12 h-12 min-w-[44px]
            group
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]
            ml-auto
          "
        >
          <span
            className={`text-slate-300 group-hover:text-[#0047BB] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>
      <AnimatePresence mode="popLayout">
        {open && (
          <motion.ul
            id={`category-products-${group.slug}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden bg-blue-50/30"
          >
            {group.items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className="
                    flex items-center gap-2
                    py-2 px-6
                    text-[10px] text-slate-600
                    border-l-2 border-slate-200
                    hover:border-[#0047BB] hover:text-[#0047BB] hover:bg-blue-100/50
                    transition-colors
                  "
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
                  {it.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

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
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <motion.div
      id={id}
      role="dialog"
      aria-label="Navigation menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
        {NAV_LINKS.map((l, i) => {
          const isProducts = l.href === "/products";
          return (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.25 }}
            >
              {isProducts ? (
                <>
                  <button
                    type="button"
                    onClick={() => setProductsOpen((v) => !v)}
                    aria-expanded={productsOpen}
                    aria-controls="products-categories"
                    className="
                      flex items-center justify-between w-full
                      py-4 border-b border-slate-100
                      group min-h-[52px]
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]
                    "
                  >
                    <span
                      className="heading text-[#0f172a] group-hover:text-[#0047BB] transition-colors leading-none"
                      style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                    >
                      {l.label}
                    </span>
                    <span
                      className={`text-slate-300 group-hover:text-[#0047BB] transition-transform duration-200 flex-shrink-0 ml-3 ${
                        productsOpen ? "rotate-90" : ""
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                  {productsOpen && (
                    <motion.div
                      id="products-categories"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pb-3"
                    >
                      <AnimatePresence mode="popLayout">
                        {PRODUCT_MENU.map((group) => (
                          <ProductCategoryAccordion
                            key={group.title}
                            group={group}
                            onClose={onClose}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </>
              ) : (
                <Link
                  href={l.href}
                  className="
                    flex items-center justify-between
                    py-4 border-b border-slate-100
                    group min-h-[52px]
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
              )}
            </motion.div>
          );
        })}
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
