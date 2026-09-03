"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, STATS, type Project } from "@/app/data/content";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, tall }: { project: Project; tall: boolean }) {
  return (
    <div className="group relative overflow-hidden cursor-pointer">
      <div className={`relative overflow-hidden bg-[#0f172a] ${tall ? "aspect-[3/4]" : "aspect-[16/11]"}`}>
        <Image
          src={project.img}
          alt={`Fuji Fenix ${project.title.toLowerCase()} project`}
          fill
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/20 to-transparent" />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <span className="eyebrow text-white/70" style={{ fontSize: "11px" }}>
            {project.type}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="heading text-white mb-2" style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}>
            {project.title}
          </h3>
          <p className="eyebrow text-white/60 mb-4" style={{ fontSize: "11px" }}>
            {project.location}
          </p>
          <span className="inline-flex items-center gap-2 eyebrow text-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            VIEW PROJECT <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 85%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={ref} className="bg-white">
        <div className="container-gutter py-16 md:py-20">
          <div className="proj-grid grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Row 1: large (7) + two small cards (5) */}
            <div className="proj-item md:col-span-7">
              <ProjectCard project={PROJECTS[0]} tall />
            </div>
            <div className="proj-item md:col-span-5 flex flex-col gap-4">
              <ProjectCard project={PROJECTS[1]} tall={false} />
              <ProjectCard project={PROJECTS[2]} tall={false} />
            </div>

            {/* Row 2: small (5) + dark stats block (7) — no empty column */}
            <div className="proj-item md:col-span-5">
              <ProjectCard project={PROJECTS[3]} tall />
            </div>
            <div className="proj-item md:col-span-7 bg-[#071324] flex flex-col justify-center px-12 md:px-16 py-14" style={{ minHeight: "320px" }}>
              <div className="eyebrow text-[#0047BB] mb-8">PROVEN TRACK RECORD</div>
              <div className="flex gap-10 md:gap-16 flex-wrap">
                {STATS.slice(0, 2).map((stat) => (
                  <div key={stat.label}>
                    <div className="display text-white leading-none mb-2" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                      {stat.end.toLocaleString()}<span className="text-[#0047BB]">{stat.suffix}</span>
                    </div>
                    <div className="eyebrow text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px bg-white/10" />
              <div className="mt-5 eyebrow text-slate-500">INTERNATIONAL SAFETY STANDARDS · PRECISION ENGINEERING · SHANGHAI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Start a project band */}
      <section className="relative overflow-hidden bg-[#071324]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#0047BB]" />
        <div className="container-gutter py-16 md:py-20 pb-24 md:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#0047BB]" />
                <span className="eyebrow text-[#60a5fa]">NEXT PROJECT</span>
              </div>
              <h2 className="display text-white" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
                HAVE A PROJECT<br />
                <span className="text-[#0047BB]">IN MIND?</span>
              </h2>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-[#0047BB] text-white px-8 py-4 eyebrow hover:bg-[#003A94] transition-colors"
              >
                START YOUR PROJECT
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="display text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                  {stat.end.toLocaleString()}
                  <span className="text-[#0047BB]">{stat.suffix}</span>
                </div>
                <div className="eyebrow text-slate-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
