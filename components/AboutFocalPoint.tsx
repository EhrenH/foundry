"use client";

import { useEffect, useRef } from "react";

// Standalone Prism crystal for the About page image column.
// Fills its parent absolutely. No copy — visual only.
const MAX  = 14;
const EASE = 0.05;

export default function AboutFocalPoint() {
  const hostRef    = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const facetBack  = useRef<HTMLDivElement>(null);
  const facetMid   = useRef<HTMLDivElement>(null);
  const facetFront = useRef<HTMLDivElement>(null);
  const facetEdge  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const glow = glowRef.current;
    if (!host || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const facets = [
      { el: facetBack.current!,  depth: 1.00 },
      { el: facetMid.current!,   depth: 0.62 },
      { el: facetFront.current!, depth: 0.32 },
      { el: facetEdge.current!,  depth: 0.32 },
    ].filter(f => f.el);

    let tx = 0, ty = 0, cx = 0, cy = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width  - 0.5) * 2 * MAX;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * 2 * MAX;
    };
    const recenter = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      glow.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      facets.forEach(({ el, depth }) => {
        const factor = (1.2 - depth) * 0.7;
        el.style.transform = `translate3d(${(-cx * factor).toFixed(2)}px,${(-cy * factor).toFixed(2)}px,0)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    host.addEventListener("mousemove", onMove, { passive: true });
    host.addEventListener("mouseleave", recenter);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", recenter);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      style={{ position: "absolute", inset: 0, background: "#FAF8F5",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        style={{ position: "absolute", inset: "-30%", willChange: "transform" }}
      >
        <div
          className="prism-halo"
          style={{ position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(214,150,40,0.28) 0%, rgba(184,134,11,0.08) 42%, transparent 68%)" }}
        />
      </div>

      {/* Crystal facets — centered */}
      <div style={{ position: "relative", width: "200px", height: "280px" }}>
        <div
          ref={facetBack}
          className="prism-shimmer"
          style={{ position: "absolute", inset: 0, willChange: "transform",
            clipPath: "polygon(52% 6%, 88% 62%, 24% 52%)",
            background: "linear-gradient(160deg, rgba(184,134,11,0.26), rgba(214,150,40,0.10))" }}
        />
        <div
          ref={facetMid}
          className="prism-shimmer"
          style={{ position: "absolute", inset: 0, willChange: "transform",
            clipPath: "polygon(18% 24%, 76% 32%, 50% 96%)",
            background: "linear-gradient(180deg, rgba(255,196,110,0.32), rgba(184,134,11,0.14))" }}
        />
        <div
          ref={facetFront}
          style={{ position: "absolute", inset: 0, willChange: "transform",
            clipPath: "polygon(50% 16%, 72% 86%, 30% 70%)",
            background: "linear-gradient(180deg, rgba(255,214,140,0.46), rgba(214,150,40,0.20))" }}
        />
        <div
          ref={facetEdge}
          style={{ position: "absolute", inset: 0, willChange: "transform",
            clipPath: "polygon(50% 16%, 51% 16.6%, 31% 69%, 30% 70%)",
            background: "linear-gradient(180deg, rgba(255,228,170,0.88), transparent 72%)" }}
        />
      </div>
    </div>
  );
}
