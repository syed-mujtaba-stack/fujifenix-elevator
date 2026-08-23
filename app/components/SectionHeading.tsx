"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sh-el",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const titleLines = title.split(/\\n|\n/);

  return (
    <div
      ref={ref}
      className={`sh-head flex flex-col ${align === "center" ? "items-center text-center" : ""} mb-12 md:mb-16`}
    >
      <div className="sh-el flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-[#2563EB]" />
        <span className={`eyebrow ${dark ? "text-[#60a5fa]" : "text-[#2563EB]"}`}>{eyebrow}</span>
      </div>
      <h2
        className={`sh-el heading ${dark ? "text-white" : "text-[#0f172a]"} max-w-3xl`}
        style={{ fontSize: "var(--fs-h2)" }}
      >
        {titleLines.map((line, i) => (
          <span key={i} className="block">
            {line}
            {highlight && i === titleLines.length - 1 ? (
              <span className="text-[#2563EB]"> {highlight}</span>
            ) : null}
          </span>
        ))}
      </h2>
      {description ? (
        <p
          className={`sh-el body-text ${align === "center" ? "max-w-xl mx-auto" : "max-w-md"} ${
            dark ? "text-slate-400" : "text-slate-500"
          } mt-6`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
