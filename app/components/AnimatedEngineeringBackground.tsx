"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   ENGINEERING BLUEPRINT ATMOSPHERE — Global animated background
   90% design / 10% animation. White-light theme. Subtle.
   ============================================================ */

type Variant =
  | "home"
  | "about"
  | "products"
  | "services"
  | "solutions"
  | "projects"
  | "contact"
  | "default";

function getVariant(pathname: string): Variant {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/about") return "about";
  if (path.startsWith("/products")) return "products";
  if (path === "/services") return "services";
  if (path.startsWith("/solutions")) return "solutions";
  if (path.startsWith("/projects")) return "projects";
  if (path === "/contact") return "contact";
  return "default";
}

const VARIANTS: Record<
  Variant,
  { grid: string; shaft: boolean; elevation: boolean; nodes: 1 | 2; glow: number }
> = {
  home: { grid: "0.05", shaft: true, elevation: false, nodes: 2, glow: 0.12 },
  products: { grid: "0.045", shaft: true, elevation: false, nodes: 1, glow: 0.07 },
  about: { grid: "0.04", shaft: false, elevation: true, nodes: 1, glow: 0.06 },
  services: { grid: "0.055", shaft: false, elevation: false, nodes: 1, glow: 0.06 },
  solutions: { grid: "0.04", shaft: false, elevation: true, nodes: 1, glow: 0.06 },
  projects: { grid: "0.04", shaft: false, elevation: true, nodes: 1, glow: 0.06 },
  contact: { grid: "0.045", shaft: false, elevation: false, nodes: 2, glow: 0.06 },
  default: { grid: "0.04", shaft: false, elevation: false, nodes: 1, glow: 0.06 },
};

/* Engineering schematic node coordinates */
const NODES: Array<[number, number]> = [
  [20, 250],
  [70, 210],
  [60, 140],
  [130, 160],
  [150, 90],
  [220, 110],
  [260, 60],
  [200, 200],
  [240, 240],
  [120, 40],
];
const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [4, 7],
  [7, 8],
  [5, 7],
  [3, 9],
  [9, 4],
  [2, 9],
];

/* Thin architectural elevator shaft line drawing (hero / products) */
function ShaftDrawing() {
  return (
    <svg
      className="absolute top-[9%] right-[5%] w-[110px] h-[420px]"
      viewBox="0 0 110 420"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="15" y="8" width="80" height="404"
        stroke="#2563EB" strokeOpacity="0.1" strokeWidth="1"
        strokeDasharray="0.3 0.7" pathLength={1} className="bg-draw"
      />
      <line x1="40" y1="8" x2="40" y2="412" stroke="#2563EB" strokeOpacity="0.07" strokeWidth="1" />
      <line x1="70" y1="8" x2="70" y2="412" stroke="#2563EB" strokeOpacity="0.07" strokeWidth="1" />
      <rect
        x="24" y="120" width="62" height="180"
        stroke="#2563EB" strokeOpacity="0.12" strokeWidth="1"
        strokeDasharray="0.3 0.7" pathLength={1} className="bg-draw"
      />
      <line x1="55" y1="120" x2="55" y2="300" stroke="#2563EB" strokeOpacity="0.08" strokeWidth="1" />
      <g stroke="#2563EB" strokeOpacity="0.1" strokeWidth="1">
        <line x1="95" y1="90" x2="106" y2="90" />
        <line x1="95" y1="180" x2="106" y2="180" />
        <line x1="95" y1="270" x2="106" y2="270" />
        <line x1="95" y1="360" x2="106" y2="360" />
      </g>
    </svg>
  );
}

/* Building elevation with floor lines + dimension (about / solutions / projects) */
function ElevationDrawing() {
  return (
    <svg
      className="absolute top-[15%] right-[7%] w-[270px] h-[330px]"
      viewBox="0 0 270 330"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#0f172a" strokeWidth="1">
        <line x1="20" y1="30" x2="230" y2="30" strokeOpacity="0.06" />
        <line x1="20" y1="80" x2="230" y2="80" strokeOpacity="0.06" />
        <line x1="20" y1="130" x2="230" y2="130" strokeOpacity="0.06" />
        <line x1="20" y1="180" x2="230" y2="180" strokeOpacity="0.06" />
        <line x1="20" y1="230" x2="230" y2="230" strokeOpacity="0.06" />
        <line x1="100" y1="30" x2="100" y2="300" strokeOpacity="0.07" />
        <line x1="150" y1="30" x2="150" y2="300" strokeOpacity="0.07" />
        <rect
          x="20" y="30" width="210" height="270"
          strokeOpacity="0.08"
          strokeDasharray="0.3 0.7" pathLength={1} className="bg-draw"
        />
      </g>
      <line
        x1="20" y1="310" x2="230" y2="310"
        stroke="#2563EB" strokeOpacity="0.1" strokeWidth="1"
        strokeDasharray="0.2 0.8" pathLength={1} className="bg-draw"
      />
      <line x1="20" y1="306" x2="20" y2="314" stroke="#2563EB" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="230" y1="306" x2="230" y2="314" stroke="#2563EB" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  );
}

/* Engineering connection network (nodes layer) */
function NodeNetwork({ density }: { density: 1 | 2 }) {
  const shownIndices = density === 2 ? NODES.map((_, i) => i) : [0, 1, 3, 4, 5, 7];
  const shownSet = new Set(shownIndices);
  return (
    <svg
      className="absolute left-[4%] bottom-[14%] w-[230px] h-[230px]"
      viewBox="0 0 280 280"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#2563EB" strokeWidth="1">
        {LINKS.map(([a, b], i) => {
          if (!shownSet.has(a) || !shownSet.has(b)) return null;
          const [ax, ay] = NODES[a];
          const [bx, by] = NODES[b];
          return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} strokeOpacity="0.06" />;
        })}
      </g>
      {shownIndices.map((idx) => {
        const [x, y] = NODES[idx];
        return <circle key={idx} cx={x} cy={y} r="2" fill="#2563EB" opacity="0.12" />;
      })}
    </svg>
  );
}

export default function AnimatedEngineeringBackground() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  const variant = getVariant(pathname);
  const cfg = VARIANTS[variant];
  const gridStyle = {
    backgroundImage:
      "linear-gradient(rgba(15,23,42," +
      cfg.grid +
      ") 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42," +
      cfg.grid +
      ") 1px, transparent 1px)",
    backgroundSize: "80px 80px",
  } as const;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = requestAnimationFrame(() => setReduced(mq.matches));
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  /* ------------------------------------------------ */
  /* Animation orchestration                          */
  /* ------------------------------------------------ */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".bg-draw", { strokeDashoffset: 0 });
        return;
      }

      /* LAYER 1 — grid drifts slowly with scroll */
      gsap.fromTo(
        ".bg-grid-inner",
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );

      /* LAYER 2 — architectural lines draw/reveal on scroll */
      gsap.fromTo(
        ".bg-draw",
        { strokeDashoffset: 0.3 },
        {
          strokeDashoffset: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );

      /* Travelers — tall guide lines drift at different speeds */
      gsap.fromTo(
        ".bg-traveler-a",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );
      gsap.fromTo(
        ".bg-traveler-b",
        { yPercent: 18 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        }
      );

      /* LAYER 5 — hero glow fades away as user scrolls (home only) */
      if (variant === "home") {
        gsap.to(".bg-glow-hero", {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "+=600", scrub: true },
        });
      }

      /* LAYER 4 — periodic blue energy pulse sweep */
      const pulse = root.querySelector(".bg-pulse");
      if (pulse) {
        gsap.to(pulse, {
          x: "115vw",
          opacity: 0.14,
          duration: 5,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 9 + Math.random() * 6,
          yoyo: true,
        });
      }

      /* MOUSE PARALLAX — extremely subtle, disabled for coarse pointers / reduced motion */
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine) return;

      const gridX = gsap.quickTo(".bg-grid-wrap", "x", { duration: 1.1, ease: "power3.out" });
      const gridY = gsap.quickTo(".bg-grid-wrap", "y", { duration: 1.1, ease: "power3.out" });
      const archX = gsap.quickTo(".bg-arch", "x", { duration: 1.2, ease: "power3.out" });
      const archY = gsap.quickTo(".bg-arch", "y", { duration: 1.2, ease: "power3.out" });
      const nodesX = gsap.quickTo(".bg-nodes", "x", { duration: 1.3, ease: "power3.out" });
      const nodesY = gsap.quickTo(".bg-nodes", "y", { duration: 1.3, ease: "power3.out" });
      const glowX = gsap.quickTo(".bg-glow-wrap", "x", { duration: 1.4, ease: "power3.out" });
      const glowY = gsap.quickTo(".bg-glow-wrap", "y", { duration: 1.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        gridX(nx * 3);
        gridY(ny * 3);
        archX(nx * 6);
        archY(ny * 6);
        nodesX(nx * 9);
        nodesY(ny * 9);
        glowX(nx * 14);
        glowY(ny * 14);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }, root);

    return () => ctx.revert();
  }, [pathname, reduced, variant]);

  if (pathname === "/cta") return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    >
      {/* LAYER 5 — soft radial depth light (behind hero image / top) */}
      <div className="bg-glow-wrap absolute inset-0 will-change-transform">
        <div
          className={`bg-glow-hero absolute ${variant === "home" ? "right-[-90px] top-[6%]" : "right-[-160px] top-[2%]"} w-[760px] h-[600px]`}
          style={{
            background:
              "radial-gradient(closest-side, rgba(37,99,235," +
              (cfg.glow * 0.8).toFixed(3) +
              "), rgba(37,99,235,0.02) 55%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-1/2 -top-[220px] -translate-x-1/2 w-[900px] h-[520px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.05), transparent 70%)",
          }}
        />
      </div>

      {/* LAYER 1 — blueprint grid */}
      <div className="bg-grid-wrap absolute inset-0 will-change-transform">
        <div className="bg-grid-inner absolute -inset-10" style={gridStyle} />
      </div>

      {/* LAYER 2 — architectural line drawings */}
      <div className="bg-arch absolute inset-0 will-change-transform">
        {cfg.shaft ? <ShaftDrawing /> : null}
        {cfg.elevation ? <ElevationDrawing /> : null}
        <div className="bg-traveler-a absolute left-[3%] -top-10 -bottom-10 w-px bg-[#0f172a]" style={{ opacity: 0.05 }} />
        <div className="bg-traveler-b absolute right-[14%] -top-10 -bottom-10 w-px bg-[#2563EB]" style={{ opacity: 0.05 }} />
      </div>

      {/* LAYER 3 — engineering connection nodes */}
      <div className="bg-nodes absolute inset-0 will-change-transform">
        <NodeNetwork density={cfg.nodes} />
        {variant === "home" ? (
          <div className="absolute right-[26%] bottom-[22%] w-2 h-2 rounded-full bg-[#2563EB] opacity-20" />
        ) : null}
      </div>

      {/* LAYER 4 — blue energy pulse */}
      <div
        className="bg-pulse absolute left-0 top-[34%] h-40 w-px bg-[#2563EB]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
