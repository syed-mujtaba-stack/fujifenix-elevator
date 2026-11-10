import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionTitleProps) {
  return (
    <div
      className={`mb-10 md:mb-14 ${
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }`}
    >
      {eyebrow ? (
        <div
          className={`mb-5 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-[#0047BB]" aria-hidden="true" />
          <span className={`eyebrow ${dark ? "text-[#60a5fa]" : "text-[#0047BB]"}`}>
            {eyebrow}
          </span>
        </div>
      ) : null}
      <h2
        className={`heading ${dark ? "text-white" : "text-[#0f172a]"}`}
        style={{ fontSize: "var(--fs-h2)" }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-[15.5px] leading-relaxed ${
            dark ? "text-slate-400" : "text-slate-500"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
