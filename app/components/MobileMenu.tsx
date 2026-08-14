"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/app/data/content";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden bg-white border-t border-slate-100 px-6 py-8 flex flex-col gap-1 max-h-[calc(100vh-72px)] overflow-y-auto"
    >
      {NAV_LINKS.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.3 }}
        >
          <Link
            href={l.href}
            className="flex items-center justify-between py-4 border-b border-slate-100 group"
            onClick={onClose}
          >
            <span className="heading text-[#0f172a] group-hover:text-[#2563EB] transition-colors" style={{ fontSize: "22px" }}>
              {l.label}
            </span>
            <span className="text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all">
              →
            </span>
          </Link>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex flex-col gap-3 pt-6"
      >
        <Link
          href="/cta"
          onClick={onClose}
          className="bg-[#2563EB] text-white eyebrow py-4 text-center hover:bg-[#1d4ed8] transition-colors"
        >
          GET A QUOTE
        </Link>
        <div className="flex items-center justify-between px-1">
          <span className="eyebrow text-slate-400">{CONTACT.address}</span>
          <a href={CONTACT.phoneHref} className="eyebrow text-[#2563EB]">
            {CONTACT.phone}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
