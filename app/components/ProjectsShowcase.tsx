"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectItem({
  project,
  tall,
}: {
  project: {
    title: string;
    location: string;
    type: string;
    floors: string;
    img: string;
    size: string;
  };
  tall: boolean;
}) {
  return (
    <div
      className="proj-card group relative overflow-hidden cursor-pointer"
      style={{ minHeight: tall ? "540px" : "260px" }}
    >
      {/* Image */}
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0f172a]/40 group-hover:bg-[#0f172a]/55 transition-colors duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        {/* Top badge */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-px bg-[#2563EB]" />
          <span className="eyebrow text-[#60a5fa]">{project.type}</span>
        </div>

        {/* Bottom info */}
        <div>
          <div className="h-px bg-white/15 mb-5" />
          <div className="flex items-end justify-between">
            <div>
              <h3
                className="heading text-white leading-tight mb-1"
                style={{ fontSize: tall ? "clamp(18px, 2.5vw, 30px)" : "clamp(15px, 2vw, 22px)" }}
              >
                {project.title}
              </h3>
              <div className="eyebrow text-white/50">{project.location}</div>
            </div>
            <div className="eyebrow text-white/40 text-right">{project.floors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const ref = useRef<HTMLElement>(null);

  const PROJECTS = [
    { title: "Shanghai Tower", location: "Shanghai, China", type: "Commercial", floors: "128", img: "/building-exterior.jpg", size: "large" },
    { title: "Dubai Marina Tower", location: "Dubai, UAE", type: "Residential", floors: "85", img: "/escalator.jpg", size: "small" },
    { title: "Cairo Medical Center", location: "Cairo, Egypt", type: "Healthcare", floors: "35", img: "/panoramic.jpg", size: "small" },
    { title: "Moscow Business Park", location: "Moscow, Russia", type: "Commercial", floors: "42", img: "/home-elevator.jpg", size: "large" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-head > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-head", start: "top 80%" },
        }
      );

      const cards = ref.current?.querySelectorAll(".proj-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="projects" className="bg-white section-gap">
      <div className="px-8 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="proj-head mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#2563EB]" />
            <span className="eyebrow text-[#2563EB]">PROJECT PORTFOLIO</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="heading text-[#0f172a]"
              style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
            >
              PROJECT<br />
              <span className="text-[#2563EB]">EXCELLENCE</span>
            </h2>
            <div className="lg:pb-2">
              <p className="body-text text-slate-500 max-w-xs mb-6">
                World-class vertical transportation systems for residential, commercial, healthcare, and infrastructure projects.
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 eyebrow text-[#2563EB] hover:gap-5 transition-all duration-300"
              >
                VIEW ALL PROJECTS
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Row 1: large (7) + small stack (5) */}
          <Link href="/projects" className="md:col-span-7 block">
            <ProjectItem project={PROJECTS[0]} tall={true} />
          </Link>
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/projects" className="block">
              <ProjectItem project={PROJECTS[1]} tall={false} />
            </Link>
            <Link href="/projects" className="block">
              <ProjectItem project={PROJECTS[2]} tall={false} />
            </Link>
          </div>

          {/* Row 2: small (5) + large (7) */}
          <Link href="/projects" className="md:col-span-5 block">
            <ProjectItem project={PROJECTS[3]} tall={true} />
          </Link>

          {/* Stats block */}
          <div className="md:col-span-7 bg-[#071324] flex flex-col justify-center px-12 md:px-16 py-14" style={{ minHeight: "260px" }}>
            <div className="eyebrow text-[#2563EB] mb-8">PROVEN TRACK RECORD</div>
            <div className="flex gap-10 md:gap-16 flex-wrap">
              <div>
                <div
                  className="display text-white leading-none mb-2"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
                >
                  3,240<span className="text-[#2563EB]">+</span>
                </div>
                <div className="eyebrow text-slate-400">PROJECTS DONE</div>
              </div>
              <div>
                <div
                  className="display text-white leading-none mb-2"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
                >
                  6,847<span className="text-[#2563EB]">+</span>
                </div>
                <div className="eyebrow text-slate-400">HAPPY CUSTOMERS</div>
              </div>
            </div>
            <div className="mt-8 h-px bg-white/10" />
            <div className="mt-5 eyebrow text-slate-500">INTERNATIONAL SAFETY STANDARDS · PRECISION ENGINEERING · SHANGHAI</div>
          </div>
        </div>
      </div>
    </section>
  );
}
