"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FloatingCTA() {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(my, { stiffness: 150, damping: 15, mass: 0.1 });

  if (pathname === "/cta") return null;

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      className="fixed z-50"
      style={{ right: 16, bottom: 20 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div style={{ x: sx, y: sy }}>
        <Link
          ref={ref}
          href="/cta"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          aria-label="Get a quote"
          className="group relative flex items-center justify-center"
        >
          {/* Halo */}
          <span className="absolute inset-0 rounded-full bg-[#2563EB]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Button */}
          <span className="relative inline-flex items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_12px_40px_rgba(37,99,235,0.45)] transition-colors duration-300 hover:bg-[#1d4ed8] overflow-hidden">
            {/* Compact circular core */}
            <span className="flex items-center justify-center transition-all duration-300 w-14 h-14 md:w-16 md:h-16 group-hover:scale-105">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
            {/* Expanded label on hover (desktop) */}
            <span className="absolute inset-0 hidden lg:flex items-center justify-center pl-6 pr-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="eyebrow text-white whitespace-nowrap" style={{ fontSize: "10px" }}>
                GET A QUOTE
              </span>
            </span>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
