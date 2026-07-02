"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Web page hero — white bg, focal point LEFT, copy RIGHT
// Translucent crystalline facets at different depths.
// Front facets (lower depth value) counter-move MORE for 3D crystal feel.
// Focal point is on the LEFT here — opposite to the other two pages.
const MAX  = 16;
const EASE = 0.05;

export default function PrismHero() {
  const hostRef   = useRef<HTMLElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  // Four facets at different depths: back=1.0, mid=0.62, front=0.32, edge=0.32
  const facetBack  = useRef<HTMLDivElement>(null);
  const facetMid   = useRef<HTMLDivElement>(null);
  const facetFront = useRef<HTMLDivElement>(null);
  const facetEdge  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const glow = glowRef.current;
    if (!host || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const facets: { el: HTMLDivElement; depth: number }[] = [
      { el: facetBack.current!,  depth: 1.00 },
      { el: facetMid.current!,   depth: 0.62 },
      { el: facetFront.current!, depth: 0.32 },
      { el: facetEdge.current!,  depth: 0.32 },
    ].filter(f => f.el);

    let tx = 0, ty = 0, cx = 0, cy = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      // Focal point is on the LEFT — glow still moves toward cursor naturally.
      // Facets counter-move in the opposite direction with depth-based scaling.
      tx = ((e.clientX - r.left) / r.width  - 0.5) * 2 * MAX;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * 2 * MAX;
    };
    const recenter = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;

      glow.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;

      facets.forEach(({ el, depth }) => {
        // Front facets (smaller depth) move more → stronger crystalline parallax
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
    <section
      ref={hostRef}
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "#FBFAF8" }}
      className="min-h-[480px] md:h-[560px]"
    >
      {/* ── Focal point — LEFT ─────────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", left: "9%", transform: "translateY(-50%)", width: "min(32vw, 340px)", height: "380px", zIndex: 2, pointerEvents: "none" }}
      >
        {/* Warm refraction glow */}
        <div ref={glowRef} style={{ position: "absolute", inset: "-20% -28%", willChange: "transform" }}>
          <div className="prism-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(214,150,40,0.34) 0%, rgba(184,134,11,0.1) 40%, transparent 66%)" }} />
        </div>

        {/* Layered crystal facets */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          {/* Back facet — deepest, least movement */}
          <div ref={facetBack} className="prism-shimmer" style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(52% 6%, 88% 62%, 24% 52%)", background: "linear-gradient(160deg, rgba(184,134,11,0.28), rgba(214,150,40,0.12))" }} />
          {/* Mid facet */}
          <div ref={facetMid} className="prism-shimmer" style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(18% 24%, 76% 32%, 50% 96%)", background: "linear-gradient(180deg, rgba(255,196,110,0.34), rgba(184,134,11,0.16))" }} />
          {/* Front facet — brightest, most movement */}
          <div ref={facetFront} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(50% 16%, 72% 86%, 30% 70%)", background: "linear-gradient(180deg, rgba(255,214,140,0.5), rgba(214,150,40,0.22))" }} />
          {/* Bright edge accent */}
          <div ref={facetEdge} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(50% 16%, 51% 16.6%, 31% 69%, 30% 70%)", background: "linear-gradient(180deg, rgba(255,228,170,0.9), transparent 72%)" }} />
        </div>
      </div>

      {/* ── Copy — RIGHT ───────────────────────────────────── */}
      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", right: "8%", transform: "translateY(-50%)", zIndex: 4, maxWidth: "420px" }}
      >
        <h1 style={{ margin: 0, color: "#171514", fontWeight: 500, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          A presence that earns trust.
        </h1>
        <p style={{ margin: "18px 0 0", color: "#6B6B6B", fontSize: "17px", lineHeight: 1.6, maxWidth: "360px" }}>
          A website so considered that customers believe in you before they&rsquo;ve spoken to you.
        </p>
        <div style={{ display: "flex", gap: "14px", marginTop: "32px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold hover:bg-foundry-ochre-hover transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", fontSize: "15px", letterSpacing: "-0.01em", textDecoration: "none", whiteSpace: "nowrap" }}>
            Book a website project →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", color: "#2a2114", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em", border: "1px solid rgba(30,28,26,0.2)", whiteSpace: "nowrap" }}>
            See our work
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-8 py-[4rem]">
        <h1 className="text-[2.5rem] font-medium tracking-tight text-foundry-ink leading-[1.05] mb-5">
          A presence that earns trust.
        </h1>
        <p className="text-foundry-stone text-base leading-relaxed mb-8 max-w-[480px]">
          A website so considered that customers believe in you before they&rsquo;ve spoken to you.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold px-6 py-3 rounded-[8px] hover:bg-foundry-ochre-hover transition-colors duration-200">
            Book a website project →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center border border-foundry-mist text-foundry-ink font-medium px-6 py-3 rounded-[8px] hover:bg-foundry-cream transition-colors duration-200">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
