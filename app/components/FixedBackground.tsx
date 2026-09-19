"use client";

import { usePathname } from "next/navigation";

/* ============================================================
   FIXED BACKGROUND — Professional Checker Pattern + Blue Glows
   Fixed to viewport, content scrolls over it.
   ============================================================ */

export default function FixedBackground() {
  const pathname = usePathname();

  if (pathname === "/cta") return null;

  const isHome = pathname === "/" || pathname === "";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ─── LAYER 1: Checker Pattern ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0,71,187,0.028) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0,71,187,0.028) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0,71,187,0.028) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0,71,187,0.028) 75%)
          `,
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 0 18px, 18px -18px, -18px 0px",
        }}
      />

      {/* ─── LAYER 2: Fine dot overlay (adds depth on checker) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,71,187,0.07) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          backgroundPosition: "18px 18px",
        }}
      />

      {/* ─── LAYER 3: Top-right main glow (blue) ─────────────── */}
      <div
        className="absolute"
        style={{
          top: "-15%",
          right: "-10%",
          width: "900px",
          height: "800px",
          background: `radial-gradient(ellipse at center,
            rgba(0,71,187,${isHome ? "0.13" : "0.09"}) 0%,
            rgba(0,71,187,0.03) 50%,
            transparent 72%)`,
        }}
      />

      {/* ─── LAYER 4: Center-top secondary glow ──────────────── */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          left: "20%",
          width: "700px",
          height: "550px",
          background: `radial-gradient(ellipse at center,
            rgba(59,130,246,${isHome ? "0.07" : "0.05"}) 0%,
            transparent 65%)`,
        }}
      />

      {/* ─── LAYER 5: Bottom-left soft glow ──────────────────── */}
      <div
        className="absolute"
        style={{
          bottom: "-10%",
          left: "-8%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(ellipse at center,
            rgba(0,71,187,0.05) 0%,
            transparent 65%)`,
        }}
      />

      {/* ─── LAYER 6: Vignette — edges fade to white ─────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 110% at 50% 50%,
              transparent 40%,
              rgba(255,255,255,0.55) 80%,
              rgba(255,255,255,0.85) 100%)
          `,
        }}
      />
    </div>
  );
}
