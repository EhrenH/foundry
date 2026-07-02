import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Foundry — Every business has a next level. We help you reach it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "auto" }}>
          <span
            style={{
              color: "#C9A96E",
              fontSize: "28px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif",
            }}
          >
            foundry
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Every business has a next level.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "26px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            For ambitious businesses, everywhere.
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
