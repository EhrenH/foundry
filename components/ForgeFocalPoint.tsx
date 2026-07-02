"use client";

import { useEffect, useRef } from "react";

// Lerp-based parallax — smoother than CSS transitions because the target
// keeps chasing current position even after the mouse stops.
const MAX_GLOW   = 18;   // px the glow drifts toward cursor at screen edge
const FORM_RATIO = 0.38; // form drifts opposite at this fraction
const EASE       = 0.06; // damping — lower = heavier, more cinematic glide

export default function ForgeFocalPoint() {
  const glowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("forge-hero");
    const glow = glowRef.current;
    const form = formRef.current;
    if (!hero || !glow || !form) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0; // lerp target
    let cx = 0, cy = 0; // lerp current
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2; // -1..1
      const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      tx = nx * MAX_GLOW;
      ty = ny * MAX_GLOW;
    };
    const recenter = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      glow.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      form.style.transform = `translate3d(${(-cx * FORM_RATIO).toFixed(2)}px,${(-cy * FORM_RATIO).toFixed(2)}px,0)`;
      rafId = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", recenter);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", recenter);
    };
  }, []);

  return (
    // PLACEHOLDER: replace with forge asset — see FOCAL_POINT_SPEC.md §2
    // Stage — absolutely positioned within #forge-hero
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "6vw",
        transform: "translateY(-50%)",
        width: "min(46vw, 640px)",
        height: "min(72vh, 640px)",
        zIndex: 2,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* Glow wrap — lerped toward cursor, bleeds beyond stage bounds */}
      <div
        ref={glowRef}
        style={{ position: "absolute", inset: "-18% -22%", willChange: "transform" }}
      >
        {/* Broad warm halo */}
        <div
          className="forge-breathe"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 52% 46%, rgba(184,134,11,0.55) 0%, rgba(184,134,11,0.20) 32%, rgba(184,134,11,0.05) 54%, transparent 70%)",
          }}
        />
        {/* Hotter inner core — offset & faster for uneven living flame */}
        <div
          className="forge-breathe-core"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 49% 41%, rgba(255,176,77,0.6) 0%, rgba(214,150,40,0.18) 26%, transparent 46%)",
          }}
        />
      </div>

      {/* Form wrap — lerped opposite, smaller ratio */}
      <div
        ref={formRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
          zIndex: 3,
        }}
      >
        {/* 4-facet forged shard */}
        <div style={{ position: "relative", width: "62%", height: "88%" }}>
          {/* Left facet — deepest shadow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(52% 0%, 8% 30%, 18% 78%, 44% 100%)",
              background: "linear-gradient(150deg, #17150f 0%, #0c0b09 70%)",
            }}
          />
          {/* Right facet — catches the fire, faint warm lift */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(52% 0%, 92% 40%, 78% 86%, 44% 100%)",
              background: "linear-gradient(205deg, #36291a 0%, #1c1610 48%, #100d0a 100%)",
            }}
          />
          {/* Ridge highlight — thin warm rim where the two faces meet */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(52% 0%, 53.5% 0.6%, 45.2% 100%, 44% 100%)",
              background:
                "linear-gradient(180deg, rgba(255,190,96,0.55), rgba(184,134,11,0.12) 60%, transparent)",
            }}
          />
          {/* Right silhouette rim light */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(92% 40%, 90% 41%, 76.5% 85.4%, 78% 86%)",
              background:
                "linear-gradient(200deg, rgba(255,180,84,0.4), rgba(184,134,11,0.08) 70%, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
