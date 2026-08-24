export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated elevator shaft */}
        <svg
          width="40"
          height="80"
          viewBox="0 0 40 80"
          fill="none"
          aria-label="Loading"
          className="animate-pulse"
        >
          <rect
            x="4" y="2" width="32" height="76"
            stroke="#0047BB"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <rect
            x="10" y="22" width="20" height="24"
            stroke="#0047BB"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            className="origin-center"
            style={{ animation: "elevatorRise 1.4s ease-in-out infinite" }}
          />
        </svg>
        <span className="eyebrow text-slate-400" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
          LOADING
        </span>
      </div>

      <style>{`
        @keyframes elevatorRise {
          0%   { transform: translateY(28px); }
          50%  { transform: translateY(-12px); }
          100% { transform: translateY(28px); }
        }
      `}</style>
    </div>
  );
}
