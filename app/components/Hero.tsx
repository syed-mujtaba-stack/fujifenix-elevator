"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════
   FUJI FENIX — Hero  v5

   Mobile  (< 768 px):
     Completely separate JSX.
     Video = full-bleed autoplay background.
     Content = centred over video with gradient overlay.
     No GSAP scroll pinning. Simple fade-in entrance only.

   Desktop (≥ 768 px):
     Pinned 400 vh scroll track.
     Video starts as 300×450 centred panel, expands to 100vw×100vh.
     GSAP ScrollTrigger pin + RAF loop drives all transforms.
═══════════════════════════════════════════════════════════════════════ */

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

const lp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ════════════════════════════════════════════════════════════════════ */

export default function Hero() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Don't render either version until client has measured the viewport.
  // This prevents SSR from always outputting DesktopHero (400vh scroll track)
  // on mobile which causes layout flash and wrong hero height.
  if (isMobile === null) {
    return (
      <div
        id="home"
        aria-hidden="true"
        style={{ height: "100svh", minHeight: "560px", background: "#f4f3ef" }}
      />
    );
  }

  if (isMobile) return <MobileHero />;
  return <DesktopHero />;
}

/* ══════════════════════════════════════════════════════════════════════
   MOBILE HERO
   Full-bleed video background, content centred over it.
   Zero scroll tricks. Simple GSAP entrance.
══════════════════════════════════════════════════════════════════════ */
function MobileHero() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const cueRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    /* ── entrance ── */
    gsap.set([".mh-word", ".mh-desc", ".mh-cta", ".mh-stat"], { opacity: 0, y: 24 });
    gsap.set(".mh-line",  { scaleX: 0, transformOrigin: "left center" });
    gsap.set(cueRef.current, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
    tl.to(".mh-line",  { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(".mh-word",  { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.1)
      .to(".mh-desc",  { opacity: 1, y: 0, duration: 0.65 }, "-=0.35")
      .to(".mh-cta",   { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.3")
      .to(".mh-stat",  { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, "-=0.3")
      .to(cueRef.current, { opacity: 1, duration: 0.4 }, "-=0.15");

    /* count-up */
    STATS.forEach(s => {
      const el = document.querySelector<HTMLElement>(`[data-mob-stat="${s.end}"]`);
      if (!el) return;
      const proxy = { val: 0 };
      tl.to(proxy, {
        val: s.end, duration: 2, ease: "power2.out",
        onUpdate() { el.textContent = Math.round(proxy.val).toLocaleString() + s.suffix; },
      }, "-=1.5");
    });

    /* scroll cue bob */
    tl.call(() => {
      gsap.to(cueRef.current, { y: 7, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });

    /* ticker */
    const ticker = tickerRef.current;
    if (ticker) {
      const w = ticker.scrollWidth / 2;
      gsap.to(ticker, {
        x: -w, duration: 22, ease: "none", repeat: -1,
        modifiers: { x: (x: string) => `${parseFloat(x) % w}px` },
      });
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="home"
      aria-label="Fuji Fenix Elevator"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "560px",
        overflow: "hidden",
        background: "#0f172a",   /* fallback while video loads */
      }}
    >
      {/* ── Brand accent top rule ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#2563EB", zIndex: 50 }} aria-hidden="true" />

      {/* ── Full-bleed background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/Fuji_Fenix_compressed.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlay — dark at top (navbar readable), lighter at bottom (text readable) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: `
            linear-gradient(
              to bottom,
              rgba(15,23,42,0.55)   0%,
              rgba(15,23,42,0.30)  30%,
              rgba(15,23,42,0.45)  60%,
              rgba(15,23,42,0.80) 100%
            )
          `,
        }}
      />

      {/* ── CONTENT — bottom-anchored, full width ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          // top padding = navbar height + 8px gap, so content never hides behind navbar
          // if it's very tall (e.g. rotated phone)
          padding: "calc(var(--nav-h, 68px) + 8px) 20px calc(80px + env(safe-area-inset-bottom, 0px)) 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div
            className="mh-line"
            aria-hidden="true"
            style={{ width: "24px", height: "1px", background: "#2563EB", flexShrink: 0 }}
          />
          <span className="eyebrow" style={{ color: "#60a5fa", letterSpacing: "0.18em" }}>
            FUJI FENIX ELEVATOR
          </span>
        </div>

        {/* Headline */}
        <h1
          aria-label="Engineering Movement. Designed To Rise."
          style={{
            fontFamily   : "var(--font-display)",
            fontWeight   : 900,
            letterSpacing: "-0.03em",
            lineHeight   : 0.92,
            textTransform: "uppercase",
            fontSize     : "clamp(40px, 11vw, 72px)",
            marginBottom : "18px",
            color        : "#ffffff",
          }}
        >
          {HEADLINE.map((line, i) => (
            <span key={i} className="mh-word" style={{ display: "block", color: line.blue ? "#60a5fa" : "#ffffff" }}>
              {line.text}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          className="mh-desc"
          style={{
            fontSize    : "14px",
            lineHeight  : 1.7,
            color       : "rgba(255,255,255,0.75)",
            fontFamily  : "var(--font-sans)",
            maxWidth    : "340px",
            marginBottom: "22px",
            paddingLeft : "12px",
            borderLeft  : "2px solid rgba(96,165,250,0.5)",
          }}
        >
          Precision-engineered elevator and escalator solutions for
          residential, commercial, healthcare, and infrastructure projects.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
          <Link
            href="/solutions"
            className="mh-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "11px 20px",
              background: "#2563EB", color: "#fff",
              textDecoration: "none",
            }}
          >
            <span className="eyebrow" style={{ color: "#fff" }}>EXPLORE SOLUTIONS</span>
            <span aria-hidden="true" style={{ color: "#fff" }}>→</span>
          </Link>
          <Link
            href="/products"
            className="mh-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "11px 20px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.08)",
              textDecoration: "none",
            }}
          >
            <span className="eyebrow" style={{ color: "#fff" }}>VIEW PRODUCTS</span>
            <span aria-hidden="true" style={{ color: "#fff" }}>→</span>
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 0, paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {STATS.map((s, i) => (
            <div key={i} className="mh-stat" style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && (
                <div aria-hidden="true" style={{ width: "1px", height: "28px", margin: "0 14px", background: "rgba(255,255,255,0.15)" }} />
              )}
              <div>
                <div
                  className="tabular-nums"
                  data-mob-stat={s.end}
                  style={{
                    fontFamily: "var(--font-display)", fontWeight: 900,
                    letterSpacing: "-0.03em", lineHeight: 1,
                    fontSize: "clamp(20px, 6vw, 28px)",
                    color: "#ffffff",
                  }}
                >
                  0{s.suffix}
                </div>
                <div className="eyebrow" style={{ fontSize: "8px", color: "rgba(255,255,255,0.5)", marginTop: "3px" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        ref={cueRef}
        style={{
          position: "absolute", bottom: "40px", left: "50%",
          transform: "translateX(-50%)", zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "5px", pointerEvents: "none",
        }}
      >
        <span className="eyebrow" style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>
          SCROLL
        </span>
        <div aria-hidden="true" style={{ width: "1px", height: "22px", background: "linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)" }} />
      </div>

      {/* ── Ticker ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 20, overflow: "hidden", paddingBlock: "8px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)",
        }}
      >
        <div
          ref={tickerRef}
          style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}
        >
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex", alignItems: "center", gap: "12px",
                padding: "0 16px",
                fontFamily: "var(--font-sans)", fontSize: "9px",
                fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                color: i % 2 === 0 ? "rgba(255,255,255,0.3)" : "#60a5fa",
                opacity: 1,
              }}
            >
              {item}
              <span style={{ width: "2.5px", height: "2.5px", borderRadius: "50%", background: "#2563EB", display: "inline-block", opacity: 0.5 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   DESKTOP HERO
   400vh pinned scroll track. Video starts contained, expands to full.
══════════════════════════════════════════════════════════════════════ */
function DesktopHero() {
  const trackRef   = useRef<HTMLElement>(null);
  const pinRef     = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const cueRef     = useRef<HTMLDivElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);

  const rawP    = useRef(0);
  const smoothP = useRef(0);
  const rafId   = useRef<number | null>(null);
  const vidDur  = useRef(0);
  const vidTgt  = useRef(0);

  useEffect(() => {
    const video   = videoRef.current;
    const frame   = frameRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const stats   = statsRef.current;
    const cue     = cueRef.current;
    const ticker  = tickerRef.current;
    const pin     = pinRef.current;
    const track   = trackRef.current;

    if (!video || !frame || !pin || !track) return;

    const VW  = window.innerWidth;
    const VH  = window.innerHeight;
    // Navbar height from CSS variable (set by Navbar.tsx); fallback 68px
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "68"
    );
    // Visible area height below navbar
    const visH = VH - navH;
    const IW  = 300;
    const IH  = 450;
    const IR  = -7;
    const IBR = 4;

    /* Initial frame geometry — centred in visible area below navbar */
    Object.assign(frame.style, {
      position       : "absolute",
      left           : `${VW / 2}px`,
      top            : `${navH + visH / 2}px`,          // centre of visible area
      width          : `${IW}px`,
      height         : `${IH}px`,
      transform      : `translate(-50%,-50%) rotate(${IR}deg)`,
      borderRadius   : `${IBR}px`,
      transformOrigin: "center center",
      willChange     : "transform,width,height,border-radius",
      overflow       : "hidden",
      zIndex         : "10",
    });

    if (overlay) Object.assign(overlay.style, { opacity: "1", zIndex: "1" });

    /* Initial hide */
    gsap.set(".dh-word",   { opacity: 0, y: 80, skewY: 1.5, filter: "blur(5px)" });
    gsap.set(".dh-dline",  { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".dh-desc",   { opacity: 0, y: 22 });
    gsap.set(".dh-cta",    { opacity: 0, y: 14 });
    gsap.set(".dh-stat",   { opacity: 0, x: 22 });
    gsap.set(cue,          { opacity: 0, y: 8 });
    gsap.set(".dh-border", { opacity: 0 });

    /* Entrance */
    const enter = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
    enter
      .to(".dh-dline",  { scaleX: 1, duration: 0.65, stagger: 0.1, ease: "power2.inOut" }, 0)
      .to(".dh-word",   { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", duration: 1.0, stagger: { amount: 0.48 }, ease: "power4.out" }, 0.1)
      .to(".dh-border", { opacity: 1, duration: 0.5 }, 0.1)
      .to(".dh-desc",   { opacity: 1, y: 0, duration: 0.75 }, "-=0.5")
      .to(".dh-cta",    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.3)" }, "-=0.45")
      .to(".dh-stat",   { opacity: 1, x: 0, duration: 0.65, stagger: 0.1 }, "-=0.5")
      .to(cue,          { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");

    STATS.forEach(s => {
      const el = pin.querySelector<HTMLElement>(`[data-dsk-stat="${s.end}"]`);
      if (!el) return;
      const proxy = { val: 0 };
      enter.to(proxy, {
        val: s.end, duration: 2.2, ease: "power2.out",
        onUpdate() { el.textContent = Math.round(proxy.val).toLocaleString() + s.suffix; },
      }, "-=1.8");
    });

    enter.call(() => {
      gsap.to(cue, { y: 9, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });

    /* Ticker */
    if (ticker) {
      const w = ticker.scrollWidth / 2;
      gsap.to(ticker, {
        x: -w, duration: 28, ease: "none", repeat: -1,
        modifiers: { x: (x: string) => `${parseFloat(x) % w}px` },
      });
    }

    /* Video duration */
    const onMeta = () => { vidDur.current = video.duration || 0; };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    /* Video lerp via GSAP ticker */
    const VLERP = 0.1;
    const vidTick = () => {
      if (vidDur.current <= 0) return;
      const next = lp(video.currentTime, vidTgt.current, VLERP);
      if (Math.abs(next - video.currentTime) > 0.0005) video.currentTime = next;
    };
    gsap.ticker.add(vidTick);

    /* Mouse parallax */
    let killPar: (() => void) | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      const qx = gsap.quickTo(frame, "x", { duration: 1.5, ease: "power3.out" });
      const qy = gsap.quickTo(frame, "y", { duration: 1.5, ease: "power3.out" });
      const onPtr = (e: PointerEvent) => {
        if (smoothP.current > 0.3) return;
        qx((e.clientX / VW - 0.5) * 12);
        qy((e.clientY / VH - 0.5) *  8);
      };
      window.addEventListener("pointermove", onPtr, { passive: true });
      killPar = () => window.removeEventListener("pointermove", onPtr);
    }

    /* ScrollTrigger pin */
    const st = ScrollTrigger.create({
      trigger     : track,
      start       : "top top",
      end         : "bottom bottom",
      pin         : pin,
      pinSpacing  : false,
      anticipatePin: 1,
      onUpdate(self) { rawP.current = self.progress; },
    });

    /* RAF loop */
    const remap = (p: number, i0: number, i1: number, o0: number, o1: number) =>
      o0 + (o1 - o0) * Math.max(0, Math.min(1, (p - i0) / (i1 - i0)));

    const loop = () => {
      smoothP.current = lp(smoothP.current, rawP.current, 0.065);
      const p = smoothP.current;

      vidTgt.current = p * vidDur.current;

      const wt  = remap(p, 0.55, 1.0, IW, VW);
      const ht  = remap(p, 0.55, 1.0, IH, VH);
      const br  = remap(p, 0.55, 0.95, IBR, 0);
      const rot = Math.sin(remap(p, 0, 0.65, 0, Math.PI)) * IR;
      const ty  = remap(p, 0, 0.65, 0, -visH * 0.04);
      // frame top: starts centred in visible area, ends at VH/2 (full viewport centre)
      const frameTop = remap(p, 0, 0.55, navH + visH / 2, VH / 2);

      Object.assign(frame.style, {
        width        : `${wt}px`,
        height       : `${ht}px`,
        borderRadius : `${br}px`,
        left         : `${VW / 2}px`,
        top          : `${frameTop}px`,
        transform    : `translate(-50%,-50%) rotate(${rot}deg) translateY(${ty}px)`,
      });

      const borderEl = frame.querySelector<HTMLElement>(".dh-border");
      if (borderEl) borderEl.style.opacity = String(remap(p, 0, 0.5, 1, 0));

      if (overlay) overlay.style.opacity = String(remap(p, 0.35, 0.80, 1, 0));

      if (content) {
        content.style.opacity   = String(remap(p, 0, 0.45, 1, 0));
        content.style.transform = `translateY(${remap(p, 0, 0.45, 0, -VH * 0.05)}px)`;
      }

      if (stats) stats.style.opacity = String(remap(p, 0, 0.40, 1, 0));
      if (cue)   cue.style.opacity   = String(remap(p, 0, 0.08, 1, 0));

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      enter.kill();
      st.kill();
      gsap.ticker.remove(vidTick);
      video.removeEventListener("loadedmetadata", onMeta);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (killPar) killPar();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="home"
      style={{ height: "400vh" }}
      aria-label="Fuji Fenix Elevator — Hero"
    >
      <div
        ref={pinRef}
        className="relative overflow-hidden"
        style={{ width: "100%", height: "100vh", background: "#f4f3ef" }}
      >
        {/* Top rule */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#2563EB", zIndex: 50 }} />

        {/* Off-white overlay + dot grid */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#f4f3ef 0%,#eceae4 100%)" }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle,rgba(37,99,235,0.055) 1px,transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 30%,transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 30%,transparent 100%)",
          }} />
        </div>

        {/* Video frame */}
        <div
          ref={frameRef}
          style={{ position: "absolute", overflow: "hidden", width: "300px", height: "450px", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src="/Fuji_Fenix_compressed.mp4" type="video/mp4" />
          </video>
          <div
            className="dh-border"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 0 1px rgba(37,99,235,0.40),0 24px 60px -8px rgba(15,23,42,0.20)", opacity: 0, zIndex: 1 }}
          />
        </div>

        {/* Editorial content — left column
             paddingTop uses --nav-h (set by Navbar.tsx at runtime) so the
             content always clears the fixed header exactly, regardless of
             whether the navbar is in py-3 (scrolled) or py-5 (top) state.
             We use paddingTop + paddingBottom with flex justify-center so
             the visible area (below navbar, above ticker) is what centers.  */}
        <div
          ref={contentRef}
          style={{
            position    : "absolute",
            inset       : 0,
            zIndex      : 20,
            display     : "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop  : "calc(var(--nav-h, 68px) + 16px)",
            paddingBottom: "48px",
            paddingLeft : "clamp(24px,5.5vw,88px)",
            paddingRight : "clamp(24px,5.5vw,88px)",
            boxSizing   : "border-box",
            willChange  : "opacity,transform",
            pointerEvents: "none",
          }}
        >
          <div style={{ maxWidth: "clamp(280px,38vw,500px)" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div className="dh-dline" aria-hidden="true" style={{ width: "28px", height: "1px", background: "#2563EB", flexShrink: 0, transformOrigin: "left center" }} />
              <span className="eyebrow text-[#2563EB]" style={{ letterSpacing: "0.2em" }}>FUJI FENIX ELEVATOR</span>
            </div>

            {/* Headline */}
            <h1
              aria-label="Engineering Movement. Designed To Rise."
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.91, textTransform: "uppercase", fontSize: "clamp(38px,5.2vw,86px)", marginBottom: "18px" }}
            >
              {HEADLINE.map((line, li) => (
                <span key={li} style={{ display: "block", overflow: "hidden", lineHeight: "1.0em" }}>
                  <span className="dh-word" style={{ display: "block", color: line.blue ? "#2563EB" : "#0f172a" }}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="dh-desc" style={{ maxWidth: "340px", fontSize: "clamp(12.5px,1.4vw,15px)", lineHeight: 1.75, color: "#334155", fontFamily: "var(--font-sans)", marginBottom: "20px", paddingLeft: "14px", borderLeft: "2px solid rgba(37,99,235,0.38)" }}>
              Precision-engineered elevator and escalator solutions for residential, commercial, healthcare, and infrastructure projects — delivered worldwide from Shanghai.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", pointerEvents: "auto" }}>
              <Link
                href="/solutions"
                className="dh-cta group"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "11px 22px", background: "#2563EB", color: "#fff", textDecoration: "none", position: "relative", overflow: "hidden" }}
              >
                <span aria-hidden="true" className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)" }} />
                <span className="eyebrow relative" style={{ color: "#fff" }}>EXPLORE SOLUTIONS</span>
                <span aria-hidden="true" className="relative group-hover:translate-x-0.5 transition-transform duration-300" style={{ color: "#fff" }}>→</span>
              </Link>
              <Link
                href="/products"
                className="dh-cta group"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "11px 22px", border: "1px solid rgba(15,23,42,0.18)", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(4px)", textDecoration: "none", transition: "border-color 0.3s,background 0.3s" }}
              >
                <span className="eyebrow group-hover:text-[#2563EB] transition-colors duration-300" style={{ color: "#0f172a" }}>VIEW PRODUCTS</span>
                <span aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:text-[#2563EB] transition-all duration-300" style={{ color: "#0f172a" }}>→</span>
              </Link>
            </div>

            {/* Stats strip (content column) */}
            <div className="dh-stat" style={{ display: "flex", gap: 0, marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(15,23,42,0.08)" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && <div aria-hidden="true" style={{ width: "1px", height: "32px", margin: "0 16px", background: "rgba(15,23,42,0.10)" }} />}
                  <div>
                    <div className="tabular-nums" data-dsk-stat={s.end} aria-label={`${s.end.toLocaleString()}${s.suffix} ${s.label}`} style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.03em", fontSize: "clamp(20px,2.4vw,34px)", color: "#0f172a", lineHeight: 1 }}>0{s.suffix}</div>
                    <div className="eyebrow" style={{ fontSize: "8.5px", color: "#64748b", marginTop: "3px" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — right col (desktop only, visual duplicate for right-side layout) */}
        <div
          ref={statsRef}
          className="absolute z-20 hidden xl:flex flex-col pointer-events-none"
          style={{ right: "clamp(24px,5vw,80px)", top: "50%", transform: "translateY(-50%)", marginTop: "20px", gap: "28px", willChange: "opacity" }}
        >
          <div className="dh-dline" aria-hidden="true" style={{ position: "absolute", left: "-20px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom,transparent,rgba(15,23,42,0.12) 20%,rgba(15,23,42,0.12) 80%,transparent)", transformOrigin: "top center" }} />
          {STATS.map((s, i) => (
            <div key={i} className="dh-stat">
              <div className="tabular-nums" aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.03em", fontSize: "clamp(26px,3vw,44px)", color: "#0f172a", lineHeight: 1, marginBottom: "3px" }}>
                {s.end.toLocaleString()}{s.suffix}
              </div>
              <div className="eyebrow" style={{ fontSize: "9px", color: "#64748b" }}>{s.label}</div>
              <div className="dh-dline" aria-hidden="true" style={{ marginTop: "6px", height: "1px", width: "28px", background: "rgba(37,99,235,0.22)", transformOrigin: "left center" }} />
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0, pointerEvents: "none", willChange: "opacity,transform" }}
        >
          <span className="eyebrow" style={{ fontSize: "8.5px", letterSpacing: "0.22em", color: "#64748b" }}>SCROLL TO EXPLORE</span>
          <div aria-hidden="true" style={{ width: "1px", height: "26px", borderRadius: "999px", background: "linear-gradient(to bottom,#2563EB,transparent)" }} />
        </div>

        {/* Ticker */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30, overflow: "hidden", paddingBlock: "9px", borderTop: "1px solid rgba(15,23,42,0.06)", background: "rgba(255,255,255,0.28)", backdropFilter: "blur(4px)" }}>
          <div ref={tickerRef} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}>
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "14px", padding: "0 18px", fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: i % 2 === 0 ? "#0f172a" : "#2563EB", opacity: i % 2 === 0 ? 0.28 : 0.42 }}>
                {item}
                <span style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", background: "#2563EB", opacity: 0.32 }} />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
