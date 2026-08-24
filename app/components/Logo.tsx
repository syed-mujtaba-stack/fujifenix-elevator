"use client";

import Link from "next/link";

const WORDMARK = "FUJIFENIX";

interface LogoProps {
  href?: string;
  animate?: boolean;
}

export default function Logo({ href = "/", animate }: LogoProps) {
  return (
    <Link href={href} className="flex items-center group" aria-label="Fuji Fenix Elevator home">
      <div className="flex flex-col">
        <div
          className="text-[#0047BB] font-black tracking-[0.08em] text-sm leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {WORDMARK}
        </div>
        <div className="eyebrow text-slate-400 text-[9px] mt-1">ELEVATOR</div>
      </div>
    </Link>
  );
}
