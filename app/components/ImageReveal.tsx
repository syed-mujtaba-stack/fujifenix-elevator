"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  from?: "left" | "right";
  parallax?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  from = "left",
  parallax = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          clipPath: from === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );

      if (parallax) {
        gsap.to(innerRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [from, parallax]);

  return (
    <div ref={ref} className={`relative overflow-hidden will-change-transform ${className}`}>
      <div ref={innerRef} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${imgClassName}`}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
