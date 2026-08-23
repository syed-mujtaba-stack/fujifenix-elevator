"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/app/data/content";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/cta") return null;

  const companyLinks = [
    { label: "About Fuji Fenix", href: "/about" },
    { label: "Our Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Projects", href: "/projects" },
  ];

  return (
    <footer className="bg-[#071324] text-white overflow-hidden">
      {/* Brand block */}
      <div className="px-6 md:px-10 lg:px-14 pt-20 pb-14 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <Logo animate={false} />
            <div
              className="display text-white/6 select-none leading-none mt-6"
              style={{ fontSize: "clamp(40px, 6.5vw, 88px)" }}
            >
              FUJI FENIX
            </div>
            <div className="eyebrow text-[#2563EB] mb-3">FUJI FENIX ELEVATOR</div>
            <p className="text-slate-400 max-w-sm" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              Combining advanced technology with precision engineering to deliver world-class vertical
              transportation systems.
            </p>
          </div>

          <Link
            href="/cta"
            className="group inline-flex items-center gap-3 border border-white/20 hover:border-[#2563EB] eyebrow text-white hover:text-[#2563EB] px-8 py-4 transition-all duration-300 self-start md:self-auto flex-shrink-0"
          >
            START A PROJECT
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Columns */}
      <div className="px-6 md:px-10 lg:px-14 py-14 grid grid-cols-2 md:grid-cols-3 gap-10 border-b border-white/5">
        <div>
          <div className="eyebrow text-[#2563EB] mb-6">COMPANY</div>
          <ul className="space-y-3">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  style={{ fontSize: "14px" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-[#2563EB] mb-6">CAPABILITIES</div>
          <ul className="space-y-3">
            {["Comprehensive Solutions", "Safety First", "Energy Efficiency", "After-Sales Support"].map(
              (label) => (
                <li key={label}>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                    style={{ fontSize: "14px" }}
                  >
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-[#2563EB] mb-6">CONTACT</div>
          <ul className="space-y-3">
            <li className="text-slate-400" style={{ fontSize: "14px" }}>
              {CONTACT.address}
            </li>
            <li>
              <a
                href={CONTACT.phoneHref}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontSize: "14px" }}
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontSize: "14px" }}
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 lg:px-14 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="eyebrow text-slate-600 text-[10px]">
          © {new Date().getFullYear()} FUJI FENIX ELEVATOR. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-4">
          <span className="eyebrow text-slate-600 text-[10px]">SHANGHAI · CHINA</span>
          <div className="w-px h-3 bg-slate-700" />
          <span className="eyebrow text-[#2563EB] text-[10px]">{CONTACT.phone}</span>
        </div>
      </div>
    </footer>
  );
}
