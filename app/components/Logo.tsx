"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
  animate?: boolean;
  /** Override the brand blue if needed (defaults to FujiFenix deep blue) */
  color?: string;
  /** Extra classes for the horizontal svg (e.g. responsive height overrides) */
  className?: string;
}

/**
 * Fuji Fenix logo — hand-drawn geometric SVG letterforms.
 * Grid: cap-height 100u, stroke 24u, letter gap 12u, word gap 28u.
 *
 * Two variants:
 *  • Stacked (FUJI over FENIX) — mobile only; square-ish proportions
 *    so the mark reads as a logo instead of a thin text strip.
 *  • Horizontal wordmark — tablet/desktop (md+).
 * Rendered via currentColor so the brand color stays configurable.
 */
export default function Logo({ href = "/", color = "#174F96", className = "" }: LogoProps) {
  return (
    <Link href={href} className="flex items-center group" aria-label="Fuji Fenix Elevator home">
      {/* ── Stacked variant · mobile ── */}
      <svg
        viewBox="0 0 324 218"
        role="img"
        aria-labelledby="fuji-fenix-logo-title"
        className="h-9 w-auto flex-shrink-0 md:hidden"
        style={{ color }}
      >
        <title id="fuji-fenix-logo-title">Fuji Fenix</title>

        {/* Row 1 · FUJI */}
        <g fill="currentColor">
          <path d="M0 0 H64 V24 H24 V38 H56 V62 H24 V100 H0 Z" />
          <path d="M76 0 H100 V76 H116 V0 H140 V100 H76 Z" />
          <path d="M184 0 H208 V100 H152 V76 H184 Z" />
          <path d="M220 0 H244 V100 H220 Z" />
        </g>

        {/* ® — upper-right of row 1 */}
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M256 13 A13 13 0 1 0 282 13 A13 13 0 1 0 256 13 Z M260 13 A9 9 0 1 0 278 13 A9 9 0 1 0 260 13 Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="butt"
          d="M265.5 19 V7.5 H270 A3.25 3.25 0 0 1 270 14 H265.5 M270 14 L274 19"
        />

        {/* Row 2 · FENIX */}
        <g fill="currentColor" transform="translate(0 118)">
          <path d="M0 0 H64 V24 H24 V38 H56 V62 H24 V100 H0 Z" />
          <path d="M76 0 H136 V24 H100 V38 H130 V62 H100 V76 H136 V100 H76 Z" />
          <path d="M148 0 H172 L188 44 V0 H212 V100 H188 L172 56 V100 H148 Z" />
          <path d="M224 0 H248 V100 H224 Z" />
          <path d="M260 0 H282 L292 34 L302 0 H324 L306 50 L324 100 H302 L292 66 L282 100 H260 L278 50 Z" />
        </g>
      </svg>

      {/* ── Horizontal variant · tablet/desktop ── */}
      <svg
        viewBox="0 0 630 100"
        role="img"
        aria-labelledby="fuji-fenix-logo-title"
        className={`hidden md:block h-6 w-auto md:h-7 flex-shrink-0 ${className}`}
        style={{ color }}
      >
        <title id="fuji-fenix-logo-title">Fuji Fenix</title>

        {/* FUJI */}
        <g fill="currentColor">
          {/* F */}
          <path d="M0 0 H64 V24 H24 V38 H56 V62 H24 V100 H0 Z" />
          {/* U */}
          <path d="M76 0 H100 V76 H116 V0 H140 V100 H76 Z" />
          {/* J */}
          <path d="M184 0 H208 V100 H152 V76 H184 Z" />
          {/* I */}
          <path d="M220 0 H244 V100 H220 Z" />

          {/* FENIX */}
          {/* F */}
          <path d="M272 0 H336 V24 H296 V38 H328 V62 H296 V100 H272 Z" />
          {/* E */}
          <path d="M348 0 H408 V24 H372 V38 H402 V62 H372 V76 H408 V100 H348 Z" />
          {/* N */}
          <path d="M420 0 H444 L460 44 V0 H484 V100 H460 L444 56 V100 H420 Z" />
          {/* I */}
          <path d="M496 0 H520 V100 H496 Z" />
          {/* X */}
          <path d="M532 0 H554 L564 34 L574 0 H596 L578 50 L596 100 H574 L564 66 L554 100 H532 L550 50 Z" />
        </g>

        {/* Registered trademark — upper-right of the final X */}
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M598 13 A13 13 0 1 0 624 13 A13 13 0 1 0 598 13 Z M602 13 A9 9 0 1 0 620 13 A9 9 0 1 0 602 13 Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="butt"
          d="M607.5 19 V7.5 H612 A3.25 3.25 0 0 1 612 14 H607.5 M612 14 L616 19"
        />
      </svg>
    </Link>
  );
}
