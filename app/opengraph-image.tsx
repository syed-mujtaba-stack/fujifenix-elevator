import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Fuji Fenix Elevator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0f172a",
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
            backgroundColor: "#0047BB",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "4px",
              backgroundColor: "#0047BB",
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
          Fuji Fenix Elevator
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#60a5fa",
            fontSize: "22px",
            fontWeight: 500,
            marginTop: "16px",
            marginBottom: 0,
            opacity: 0.9,
          }}
        >
          Total Solution for Vertical Transportation
        </p>

        {/* Decorative element */}
        <div
          style={{
            marginTop: "40px",
            width: "120px",
            height: "4px",
            backgroundColor: "#0047BB",
            opacity: 0.5,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
