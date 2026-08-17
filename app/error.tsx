"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-lg text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-8 h-px bg-[#2563EB]" />
          <span className="eyebrow text-[#2563EB]">ERROR</span>
          <div className="w-8 h-px bg-[#2563EB]" />
        </div>

        <h1
          className="display text-[#0f172a] mb-6"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        >
          SOMETHING<br />
          <span className="text-[#2563EB]">WENT WRONG</span>
        </h1>

        <p className="body-text text-slate-500 mb-10" style={{ fontSize: "16px" }}>
          An unexpected error occurred. Please try again or contact us directly if the issue persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white eyebrow px-8 py-4 transition-colors duration-300"
          >
            TRY AGAIN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border border-slate-200 hover:border-[#2563EB] text-[#0f172a] hover:text-[#2563EB] eyebrow px-8 py-4 transition-all duration-300"
          >
            BACK TO HOME
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
