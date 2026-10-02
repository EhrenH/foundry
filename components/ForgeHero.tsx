import Link from "next/link";
import ForgeFocalPoint from "@/components/ForgeFocalPoint";

// Server component — only ForgeFocalPoint is 'use client'
export default function ForgeHero() {
  return (
    <section
      id="forge-hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "680px",
        overflow: "hidden",
        background: "#0D0D0D",
      }}
    >
      {/* Corner vignette — deepens edges so headline reads on any display */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 120% at 62% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Forge stage — self-positions at right:6vw, top:50% */}
      <ForgeFocalPoint />

      {/* Headline + CTAs — absolutely anchored left */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7vw",
          transform: "translateY(-50%)",
          zIndex: 4,
          maxWidth: "560px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#F4F2EE",
            fontWeight: 500,
            fontSize: "clamp(40px, 5.6vw, 76px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          Every business has a next level. We help you reach it.
        </h1>

        <p
          style={{
            margin: "24px 0 0",
            color: "rgba(244,242,238,0.55)",
            fontSize: "clamp(16px, 1.25vw, 20px)",
            lineHeight: 1.55,
            maxWidth: "440px",
            whiteSpace: "nowrap",
          }}
        >
          More credibility. More customers. More conversion.
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(244,242,238,0.55)",
            fontSize: "clamp(16px, 1.25vw, 20px)",
            lineHeight: 1.55,
            maxWidth: "440px",
          }}
        >
          Foundry is the difference between a business that exists and one that grows.
        </p>

        <div style={{ display: "flex", gap: "16px", marginTop: "36px", alignItems: "center", flexWrap: "wrap" }}>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold hover:bg-foundry-ochre-hover transition-colors duration-200"
            style={{
              height: "52px",
              padding: "0 28px",
              borderRadius: "8px",
              fontSize: "16px",
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            Book a call
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 4,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>
    </section>
  );
}
