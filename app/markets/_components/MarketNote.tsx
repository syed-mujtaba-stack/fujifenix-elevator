export default function MarketNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`border-l-2 border-[#0047BB] pl-4 text-[12px] leading-relaxed text-slate-500 ${className}`}
    >
      <strong className="font-semibold text-slate-600">Market note:</strong>{" "}
      This page describes Fuji Fenix&apos;s manufacturing, engineering and export
      supply capability. Local offices, installation and maintenance coverage are
      confirmed only where a project-specific agreement is in place. Technical,
      regulatory and product statements are validated against the final project
      specification before contract.
    </p>
  );
}
