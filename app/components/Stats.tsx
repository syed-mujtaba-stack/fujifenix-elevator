"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  items: { end: number; suffix: string; label: string }[];
  dark?: boolean;
}

export default function Stats({ items, dark = false }: StatsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      items.forEach((stat) => {
        const el = ref.current?.querySelector(`[data-stat="${stat.end}"]`);
        if (!el) return;
        const proxy = { val: 0 };
        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: stat.end,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.textContent = Math.round(proxy.val).toLocaleString() + stat.suffix;
            },
          }
        );
      });

      gsap.fromTo(
        ".stats-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={ref} className="flex flex-col sm:flex-row">
      {items.map((stat, i) => (
        <div
          key={stat.label}
          className={`stats-item flex-1 flex flex-col items-center justify-center py-14 text-center ${
            i < items.length - 1
              ? "sm:border-r border-b sm:border-b-0 border-slate-100"
              : ""
          } hover:bg-[#f8fafc] transition-colors duration-300 group`}
        >
          <span
            className={`display ${
              dark ? "text-white group-hover:text-[#0047BB]" : "text-[#0f172a] group-hover:text-[#0047BB]"
            } transition-colors duration-300 leading-none mb-3`}
            style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
            data-stat={stat.end}
          >
            0{stat.suffix}
          </span>
          <span className={`eyebrow ${dark ? "text-slate-400" : "text-slate-400"}`}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
