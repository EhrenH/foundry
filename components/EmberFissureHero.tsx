"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Consulting page hero — dark bg, focal point RIGHT, copy LEFT
// Split dark monolith with glowing molten seam. The two halves
// separate slightly as the cursor moves away from center.
const MAX  = 14;
const EASE = 0.06;

export default function EmberFissureHero() {
  const hostRef  = useRef<HTMLElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const halfLRef = useRef<HTMLDivElement>(null);
  const halfRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host  = hostRef.current;
    const glow  = glowRef.current;
    const halfL = halfLRef.current;
    const halfR = halfRRef.current;
    if (!host || !glow || !halfL || !halfR) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

      // Halves spread apart as cursor moves away from center (adds drama)
      const sep = Math.min(4, Math.hypot(cx, cy) * 0.28);
      const fx = -cx * 0.3;
      const fy = -cy * 0.3;

      glow.style.transform  = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      halfL.style.transform = `translate3d(${(fx - sep).toFixed(2)}px,${fy.toFixed(2)}px,0)`;
      halfR.style.transform = `translate3d(${(fx + sep).toFixed(2)}px,${fy.toFixed(2)}px,0)`;

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
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "#0D0D0D" }}
      className="min-h-[480px] md:h-[560px]"
    >
      {/* Corner vignette */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "radial-gradient(120% 120% at 64% 50%, transparent 42%, rgba(0,0,0,0.6) 100%)" }} />

      {/* ── Focal point — RIGHT ─────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", right: "8%", transform: "translateY(-50%)", width: "min(34vw, 360px)", height: "380px", zIndex: 2, pointerEvents: "none" }}
      >
        {/* Glow — lerps toward cursor */}
        <div ref={glowRef} style={{ position: "absolute", inset: "-30% -45%", willChange: "transform" }}>
          <div className="ember-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 48%, rgba(184,134,11,0.5) 0%, rgba(184,134,11,0.16) 34%, transparent 64%)" }} />
        </div>

        {/* Monolith with seam */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <div style={{ position: "relative", width: "58%", height: "92%" }}>
            {/* Left half */}
            <div
              ref={halfLRef}
              style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(0% 6%, 48% 0%, 46% 100%, 0% 94%)", background: "linear-gradient(120deg, #1a1610 0%, #0c0a08 80%)" }}
            />
            {/* Right half */}
            <div
              ref={halfRRef}
              style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(52% 0%, 100% 6%, 100% 94%, 54% 100%)", background: "linear-gradient(240deg, #2c2114 0%, #140f0a 70%)" }}
            />
            {/* Molten seam between the halves */}
            <div className="ember-seam" style={{ position: "absolute", top: "2%", bottom: "2%", left: "50%", width: "22%", transform: "translateX(-50%)", background: "radial-gradient(ellipse 60% 52% at 50% 50%, rgba(255,196,104,0.95) 0%, rgba(214,150,40,0.5) 26%, rgba(184,134,11,0.12) 52%, transparent 72%)" }} />
            {/* Left inner rim */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(48.5% 0.5%, 49.5% 0.5%, 47.5% 99.5%, 46.5% 99.5%)", background: "linear-gradient(180deg, rgba(255,200,110,0.6), transparent 70%)" }} />
            {/* Right inner rim */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(52% 0.5%, 53% 0.5%, 55% 99.5%, 54% 99.5%)", background: "linear-gradient(180deg, rgba(255,190,96,0.5), transparent 70%)" }} />
          </div>
        </div>
      </div>

      {/* ── Copy — LEFT ────────────────────────────────────── */}
      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", left: "8%", transform: "translateY(-50%)", zIndex: 4, maxWidth: "460px" }}
      >
        <h1 style={{ margin: 0, color: "#F4F2EE", fontWeight: 500, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Build the right thing. Grow faster.
        </h1>
        <p style={{ margin: "18px 0 0", color: "rgba(244,242,238,0.52)", fontSize: "17px", lineHeight: 1.6, maxWidth: "380px" }}>
          Most businesses waste months building the wrong things. I make sure yours builds what actually moves it forward.
        </p>
        <div style={{ display: "flex", gap: "14px", marginTop: "32px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold hover:bg-foundry-ochre-hover transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", fontSize: "15px", letterSpacing: "-0.01em", textDecoration: "none", whiteSpace: "nowrap" }}>
            Book a call →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", color: "#E8E5DF", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em", border: "1px solid rgba(232,229,223,0.22)", whiteSpace: "nowrap" }}>
            See our work
          </Link>
        </div>
      </div>

      {/* Mobile — simple stacked text */}
      <div className="md:hidden px-8 py-[4rem]">
        <h1 className="text-[2.5rem] font-medium tracking-tight text-white leading-[1.05] mb-5">
          Build the right thing. Grow faster.
        </h1>
        <p className="text-white/50 text-base leading-relaxed mb-8 max-w-[480px]">
          Most businesses waste months building the wrong things. I make sure yours builds what actually moves it forward.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold px-6 py-3 rounded-[8px] hover:bg-foundry-ochre-hover transition-colors duration-200">
            Book a call →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center border border-white/20 text-white/70 font-medium px-6 py-3 rounded-[8px] hover:border-white/40 transition-colors duration-200">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
