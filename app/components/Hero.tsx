"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FUJI FENIX â€” Hero  v6

   Single responsive hero for all breakpoints.
   The video is a full-bleed background (autoplay, muted, loop) on every
   screen size â€” no scroll pinning, no GSAP transforms on the video.
   Only the text content gets a light GSAP entrance; stats count up.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const HEADLINE = [
  { text: "ENGINEERING", blue: false },
  { text: "MOVEMENT.",   blue: true  },
  { text: "DESIGNED",    blue: false },
  { text: "TO RISE.",    blue: false },
];

const STATS = [
  { end: 6847, suffix: "+", label: "HAPPY CUSTOMERS"     },
  { end: 3240, suffix: "+", label: "PROJECTS COMPLETED"  },
  { end: 100,  suffix: "%", label: "CLIENT SATISFACTION" },
];

const TICKER = [
  "RESIDENTIAL","COMMERCIAL","HEALTHCARE","INFRASTRUCTURE",
  "HIGH-SPEED","PANORAMIC","ESCALATORS","MOVING WALKS",
];

export default function Hero() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const cueRef    = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.play().catch(() => {});

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealNoAnimation = () => {
      const selectors = ['.hero-word', '.hero-eyebrow', '.hero-desc', '.hero-cta', '.hero-stat', '.hero-line'];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
      });
      if (cueRef.current) cueRef.current.style.opacity = '1';
    };

    let tl: any = null;
    let tickerAnim: any = null;

    (async () => {
      if (prefersReducedMotion) {
        revealNoAnimation();
        STATS.forEach((s) => {
          const el = document.querySelector<HTMLElement>(`[data-hero-stat="${s.end}"]`);
          if (el) el.textContent = s.end.toLocaleString() + s.suffix;
        });
        return;
      }

      const gsapModule = await import('gsap');
      const gsap = (gsapModule && (gsapModule.default || gsapModule));

      /* â”€â”€ entrance (text only) â”€â”€ */
      gsap.set(['.hero-word', '.hero-eyebrow', '.hero-desc', '.hero-cta', '.hero-stat'], {
        opacity: 0,
        y: 24,
      });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(cueRef.current, { opacity: 0 });

      tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
      tl.to('.hero-line', { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0)
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.5 }, 0.05)
        .to('.hero-word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.1)
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.65 }, '-=0.35')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.2)' }, '-=0.3')
        .to('.hero-stat', { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, '-=0.3')
        .to(cueRef.current, { opacity: 1, duration: 0.4 }, '-=0.15');

      /* count-up */
      STATS.forEach((s) => {
        const el = document.querySelector<HTMLElement>(`[data-hero-stat="${s.end}"]`);
        if (!el) return;
        const proxy = { val: 0 };
        tl.to(
          proxy,
          {
            val: s.end,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = Math.round(proxy.val).toLocaleString() + s.suffix;
            },
          },
          '-=1.5'
        );
      });

      /* scroll cue bob */
      tl.call(() => {
        if (cueRef.current) {
          gsap.to(cueRef.current, { y: 7, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }
      });

      /* ticker */
      const ticker = tickerRef.current;
      if (ticker) {
        const w = ticker.scrollWidth / 2;
        tickerAnim = gsap.to(ticker, {
          x: -w,
          duration: 22,
          ease: 'none',
          repeat: -1,
          modifiers: { x: (x: string) => `${parseFloat(x) % w}px` },
        });
      }
    })();

    return () => {
      if (tl && tl.kill) tl.kill();
      if (tickerAnim && tickerAnim.kill) tickerAnim.kill();
    };
  }, []);

  return (
    <section
      id="home"
      aria-label="Fuji Fenix Elevator"
      className="relative overflow-hidden"
      style={{ width: "100%", minHeight: "100svh", background: "#0f172a" }}
    >
      {/* â”€â”€ Brand accent top rule â”€â”€ */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2563EB] z-50" aria-hidden="true" />

      {/* ── Full-bleed background image (preload for LCP) ── */}
      <Image
        src="/hero-elevator.jpg"
        alt="Fuji Fenix Elevator"
        priority
        fill
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      {/* ── Full-bleed background video (deferred) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-elevator.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/Fuji_Fenix_compressed.mp4" type="video/mp4" />
      </video>

      {/* â”€â”€ Gradient overlay â”€â”€ */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0.62) 0%, rgba(15,23,42,0.28) 35%, rgba(15,23,42,0.35) 60%, rgba(15,23,42,0.82) 100%)",
        }}
      />

      {/* â”€â”€ Content â”€â”€ */}
      <div
        className="relative flex flex-col justify-center"
        style={{
          zIndex: 10,
          minHeight: "100svh",
          padding:
            "calc(var(--nav-h, 68px) + 16px) clamp(20px, 6vw, 88px) calc(96px + env(safe-area-inset-bottom, 0px))",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "clamp(320px, 54vw, 760px)" }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-3 mb-5">
            <div className="hero-line" aria-hidden="true" style={{ width: "28px", height: "1px", background: "#60a5fa", flexShrink: 0 }} />
            <span className="eyebrow" style={{ color: "#60a5fa", letterSpacing: "0.2em" }}>
              FUJI FENIX ELEVATOR
            </span>
          </div>

          {/* Headline */}
          <h1
            aria-label="Engineering Movement. Designed To Rise."
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "var(--fs-hero)",
              marginBottom: "20px",
              color: "#ffffff",
            }}
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="hero-word block" style={{ color: line.blue ? "#60a5fa" : "#ffffff" }}>
                {line.text}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="hero-desc"
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.78)",
              fontFamily: "var(--font-sans)",
              maxWidth: "360px",
              marginBottom: "26px",
              paddingLeft: "14px",
              borderLeft: "2px solid rgba(96,165,250,0.5)",
            }}
          >
            Precision-engineered elevator and escalator solutions for
            residential, commercial, healthcare, and infrastructure projects â€”
            delivered worldwide from Shanghai.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-9">
            <Link
              href="/solutions"
              aria-label="Explore solutions"
              className="btn-primary"
            >
              <span className="eyebrow" style={{ color: "#fff" }}>EXPLORE SOLUTIONS</span>
              <span aria-hidden="true" className="transition-transform duration-300" style={{ color: "#fff" }}>→</span>
            </Link>
            <Link
              href="/products"
              aria-label="View products"
              className="btn-secondary"
              style={{ color: "#fff" }}
            >
              <span className="eyebrow" style={{ color: "#fff" }}>VIEW PRODUCTS</span>
              <span aria-hidden="true" className="transition-all duration-300" style={{ color: "#fff" }}>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stat flex flex-wrap items-center gap-6 pt-5 border-t border-white/15">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <div aria-hidden="true" className="w-px h-7 mr-6" style={{ background: "rgba(255,255,255,0.18)" }} />}
                <div>
                  <div
                    className="tabular-nums"
                    data-hero-stat={s.end}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      fontSize: "clamp(20px, 3vw, 34px)",
                      color: "#ffffff",
                    }}
                  >
                    0{s.suffix}
                  </div>
                  <div className="eyebrow" style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Scroll cue â”€â”€ */}
      <div
        ref={cueRef}
        className="absolute flex flex-col items-center gap-2 pointer-events-none"
        style={{ bottom: "52px", left: "50%", transform: "translateX(-50%)", zIndex: 20, opacity: 0 }}
      >
        <span className="eyebrow" style={{ fontSize: "9px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}>
          SCROLL
        </span>
        <div aria-hidden="true" className="w-px h-6" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)" }} />
      </div>

      {/* â”€â”€ Ticker â”€â”€ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ zIndex: 20, paddingBlock: "10px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      >
        <div ref={tickerRef} className="flex items-center whitespace-nowrap" style={{ willChange: "transform" }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3.5 px-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "#60a5fa",
              }}
            >
              {item}
              <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#2563EB] opacity-50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}








