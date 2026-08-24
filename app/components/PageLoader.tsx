"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ============================================================
   FUJI FENIX — "THE ELEVATOR RISE" page loader
   Full-screen brand moment on initial application load only.
   Internal SPA navigation never replays it (lives in the root
   layout and unmounts permanently after first play).
   ============================================================ */

export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (done) return;
    const root = rootRef.current;
    if (!root) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const prog = { v: 0 };
      const progDuration = reduced ? 0.6 : 2.0;

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setDone(true),
      });

      /* Progress — thin line + compact counter (completes with the sequence) */
      timeline.to(
        prog,
        {
          v: 100,
          duration: progDuration,
          ease: "power2.inOut",
          onUpdate: () => {
            if (progRef.current) {
              progRef.current.textContent = String(Math.round(prog.v)).padStart(3, "0") + "%";
            }
            if (barRef.current) {
              barRef.current.style.width = prog.v + "%";
            }
          },
        },
        0
      );

      if (reduced) {
        /* Reduced motion — quick, calm fade reveal */
        timeline
          .fromTo(".ld-logo", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 0.05)
          .to(root, { autoAlpha: 0, duration: 0.35 }, 0.5);
        return;
      }

      /* Continuous faint grid drift (separate from the finite timeline) */
      gsap.to(".ld-grid", { y: -60, duration: 34, repeat: -1, ease: "none" });

      timeline
        .set(root, { autoAlpha: 1 }, 0)

        /* 200ms — architectural grid fades in */
        .fromTo(".ld-grid", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0.15)

        /* 350ms — logo reveals */
        .fromTo(
          ".ld-logo",
          { opacity: 0, y: 14, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          0.3
        )

        /* 600ms — elevator shaft lines draw */
        .fromTo(
          ".ld-shaft-frame",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.4, ease: "power1.inOut" },
          0.55
        )

        /* 900ms — cabin appears */
        .set(".ld-cabin", { opacity: 1 }, 0.85)

        /* 1100ms — mechanically precise rise */
        .to(".ld-cabin", { y: -150, duration: 0.55, ease: "power2.inOut" }, 1.0)

        /* 1550ms — doors close (panels meet at centre) */
        .to(".ld-door-l", { x: 4, duration: 0.22, ease: "power2.inOut" }, 1.5)
        .to(".ld-door-r", { x: -4, duration: 0.22, ease: "power2.inOut" }, 1.5)

        /* 1600ms — indicator activates */
        .fromTo(".ld-indicator", { opacity: 0.25 }, { opacity: 1, duration: 0.12 }, 1.58)

        /* 1650ms — blue vertical line expands upward */
        .fromTo(
          ".ld-rise",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.38, ease: "power1.inOut" },
          1.6
        )

        /* 1850ms — doors open (wide reveal) */
        .to(".ld-door-l", { x: -4, duration: 0.24, ease: "power2.inOut" }, 1.82)
        .to(".ld-door-r", { x: 4, duration: 0.24, ease: "power2.inOut" }, 1.82)

        /* 2000ms — door panels push outward, white screen rises */
        .to(".ld-door-l", { x: -10, duration: 0.4, ease: "power3.in" }, 2.0)
        .to(".ld-door-r", { x: 10, duration: 0.4, ease: "power3.in" }, 2.0)
        .to(root, { yPercent: -100, duration: 0.48, ease: "power3.inOut" }, 2.0)
        .to(root, { autoAlpha: 0, duration: 0.2 }, 2.28);
    }, root);

    return () => {
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [reduced, done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] bg-white overflow-hidden"
    >
      {/* Subtle blueprint grid */}
      <div
        className="ld-grid arch-grid absolute inset-0 will-change-transform"
        style={{ opacity: 0 }}
      />

      {/* Centered stage */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div
          className="ld-logo text-center mb-10 opacity-0"
          style={{ opacity: 0 }}
        >
          <div
            className="display text-[#0047BB] leading-none"
            style={{ fontSize: "clamp(34px, 6vw, 52px)", letterSpacing: "0.02em" }}
          >
            FUJI FENIX
          </div>
          <div className="eyebrow text-slate-400 mt-3" style={{ fontSize: "10px" }}>
            ELEVATOR
          </div>
        </div>

        {/* Elevator shaft */}
        <div className="relative">
          <svg
            width="150"
            height="300"
            viewBox="0 0 150 300"
            fill="none"
            className="block"
          >
            {/* Blue rise line (draws upward when system activates) */}
            <line
              className="ld-rise"
              x1="75" y1="286" x2="75" y2="20"
              stroke="#0047BB"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="1 1"
              pathLength={1}
            />

            {/* Shaft frame (draws in) */}
            <g className="ld-shaft-frame" stroke="rgba(15,23,42,0.25)" strokeWidth="1">
              <line x1="36" y1="14" x2="36" y2="286" strokeDasharray="1 1" pathLength={1} />
              <line x1="114" y1="14" x2="114" y2="286" strokeDasharray="1 1" pathLength={1} />
              <line x1="36" y1="14" x2="114" y2="14" strokeDasharray="1 1" pathLength={1} />
              <line x1="36" y1="286" x2="114" y2="286" strokeDasharray="1 1" pathLength={1} />
            </g>

            {/* Floor ticks */}
            <g stroke="rgba(15,23,42,0.2)" strokeWidth="1">
              <line x1="114" y1="40" x2="128" y2="40" />
              <line x1="114" y1="84" x2="128" y2="84" />
              <line x1="114" y1="128" x2="128" y2="128" />
              <line x1="114" y1="172" x2="128" y2="172" />
              <line x1="114" y1="216" x2="128" y2="216" />
              <line x1="114" y1="260" x2="128" y2="260" />
            </g>

            {/* Floor indicator (activates at arrival) */}
            <circle
              className="ld-indicator"
              cx="121"
              cy="40"
              r="3"
              fill="#0047BB"
              opacity="0.25"
            />

            {/* Cabin — rises, then doors open */}
            <g className="ld-cabin" style={{ opacity: 0 }}>
              {/* cabin frame */}
              <rect
                x="46" y="204" width="58" height="66"
                stroke="rgba(0,71,187,0.55)"
                strokeWidth="1.2"
                fill="#ffffff"
              />
              {/* dark interior gap revealed when doors open */}
              <rect x="71" y="210" width="8" height="54" fill="rgba(15,23,42,0.14)" />
              {/* door panels */}
              <rect
                className="ld-door-l"
                x="48" y="210" width="23" height="54"
                fill="#ffffff"
                stroke="#0047BB"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <rect
                className="ld-door-r"
                x="79" y="210" width="23" height="54"
                fill="#ffffff"
                stroke="#0047BB"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
            </g>
          </svg>

          {/* Engineering micro-label */}
          <div
            className="eyebrow text-slate-400 mt-5 text-center"
            style={{ fontSize: "9px", letterSpacing: "0.22em" }}
          >
            VERTICAL TRANSPORTATION SYSTEM
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-5 mt-12">
          <div className="relative h-px w-44 bg-slate-200 overflow-hidden">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 bg-[#0047BB]"
              style={{ width: "0%" }}
            />
          </div>
          <span
            ref={progRef}
            className="eyebrow text-[#0f172a] tabular-nums"
            style={{ fontSize: "11px" }}
          >
            000%
          </span>
        </div>

        <div className="eyebrow text-slate-300 mt-8" style={{ fontSize: "9px" }}>
          INITIALIZING EXPERIENCE
        </div>
      </div>
    </div>
  );
}
