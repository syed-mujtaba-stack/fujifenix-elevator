import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Fuji Fenix Elevator";
  const subtitle = searchParams.get("subtitle") ?? "Total Solution for Vertical Transportation";
  const type = searchParams.get("type") ?? "product"; // product, category, home

  const bgColors: Record<string, string> = {
    home: "#0f172a",
    product: "#0f172a",
    category: "#0047BB",
  };
  const accentColors: Record<string, string> = {
    home: "#0047BB",
    product: "#60a5fa",
    category: "#fff",
  };

  const bg = bgColors[type] ?? bgColors.home;
  const accent = accentColors[type] ?? accentColors.home;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: bg,
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: accent,
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "4px",
              backgroundColor: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: "20px",
            }}
          >
            FF
          </div>
          <span style={{ color: "#fff", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Fuji Fenix
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#fff",
            fontSize: "52px",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "900px",
            letterSpacing: "-0.03em",
          }}
        >
          {title.length > 40 ? `${title.slice(0, 37)}...` : title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: accent,
            fontSize: "22px",
            fontWeight: 500,
            marginTop: "16px",
            marginBottom: 0,
            opacity: 0.9,
          }}
        >
          {subtitle}
        </p>

        {/* Decorative element */}
        <div
          style={{
            marginTop: "40px",
            width: "120px",
            height: "4px",
            backgroundColor: accent,
            opacity: 0.5,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
