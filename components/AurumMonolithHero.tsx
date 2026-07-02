"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Referral page hero — warm cream bg, focal point RIGHT, copy LEFT
// Faceted dark shard with warm halo and contact shadow.
// The contact shadow translates horizontally with mouse for a grounded feel.
const MAX  = 16;
const EASE = 0.055;

export default function AurumMonolithHero() {
  const hostRef   = useRef<HTMLElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host   = hostRef.current;
    const glow   = glowRef.current;
    const form   = formRef.current;
    const shadow = shadowRef.current;
    if (!host || !glow || !form || !shadow) return;
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

      glow.style.transform   = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      form.style.transform   = `translate3d(${(-cx * 0.36).toFixed(2)}px,${(-cy * 0.36).toFixed(2)}px,0)`;
      // Contact shadow shifts horizontally opposite the form for realism
      shadow.style.transform = `translate3d(${(-cx * 0.5).toFixed(2)}px,0,0)`;

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
      style={{ position: "relative", width: "100%", overflow: "hidden", background: "#FAF7F1" }}
      className="min-h-[480px] md:h-[560px]"
    >
      {/* Subtle warm wash from the right — reinforces warmth of the shard */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "radial-gradient(70% 90% at 70% 50%, rgba(184,134,11,0.07) 0%, transparent 60%)" }} />

      {/* ── Focal point — RIGHT ─────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", right: "9%", transform: "translateY(-50%)", width: "min(32vw, 340px)", height: "380px", zIndex: 2, pointerEvents: "none" }}
      >
        {/* Warm halo */}
        <div ref={glowRef} style={{ position: "absolute", inset: "-24% -34%", willChange: "transform" }}>
          <div className="aurum-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 46%, rgba(214,150,40,0.42) 0%, rgba(184,134,11,0.14) 38%, transparent 66%)" }} />
        </div>

        {/* Contact shadow beneath the shard */}
        <div ref={shadowRef} style={{ position: "absolute", left: "8%", right: "8%", bottom: "4%", height: "60px", willChange: "transform", background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(60,42,14,0.22) 0%, transparent 70%)" }} />

        {/* Faceted dark shard */}
        <div ref={formRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, willChange: "transform" }}>
          <div style={{ position: "relative", width: "60%", height: "88%" }}>
            {/* Left facet — deep shadow */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 8% 32%, 18% 80%, 46% 100%)", background: "linear-gradient(150deg, #241d12 0%, #15110b 75%)" }} />
            {/* Right facet — warm lift */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 92% 42%, 78% 86%, 46% 100%)", background: "linear-gradient(205deg, #4a3a23 0%, #2a2013 50%, #181109 100%)" }} />
            {/* Ridge highlight */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 55.4% 0.6%, 47.2% 100%, 46% 100%)", background: "linear-gradient(180deg, rgba(255,206,128,0.7), rgba(184,134,11,0.16) 60%, transparent)" }} />
            {/* Right silhouette rim */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(92% 42%, 90% 43%, 76.5% 85.4%, 78% 86%)", background: "linear-gradient(200deg, rgba(255,196,110,0.5), transparent 72%)" }} />
          </div>
        </div>
      </div>

      {/* ── Copy — LEFT ──────────────────────────────────── */}
      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", top: "50%", left: "8%", transform: "translateY(-50%)", zIndex: 4, maxWidth: "420px" }}
      >
        <h1 style={{ margin: 0, color: "#1A150D", fontWeight: 500, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Your customers, bringing you more.
        </h1>
        <p style={{ margin: "18px 0 0", color: "#6B6B6B", fontSize: "17px", lineHeight: 1.6, maxWidth: "360px" }}>
          The people who already trust you are your best source of new business.
        </p>
        <div style={{ display: "flex", gap: "14px", marginTop: "32px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold hover:bg-foundry-ochre-hover transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", fontSize: "15px", letterSpacing: "-0.01em", textDecoration: "none", whiteSpace: "nowrap" }}>
            Book a referral system call →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center transition-colors duration-200" style={{ height: "46px", padding: "0 24px", borderRadius: "8px", color: "#2a2114", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em", border: "1px solid rgba(42,33,20,0.24)", whiteSpace: "nowrap" }}>
            See our work
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-8 py-[4rem]">
        <h1 className="text-[2.5rem] font-medium tracking-tight text-foundry-ink leading-[1.05] mb-5">
          Your customers, bringing you more.
        </h1>
        <p className="text-foundry-stone text-base leading-relaxed mb-8 max-w-[480px]">
          The people who already trust you are your best source of new business.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link href="/book" className="inline-flex items-center justify-center bg-foundry-ochre text-white font-semibold px-6 py-3 rounded-[8px] hover:bg-foundry-ochre-hover transition-colors duration-200">
            Book a referral system call →
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center border border-foundry-mist text-foundry-ink font-medium px-6 py-3 rounded-[8px] hover:bg-foundry-cream transition-colors duration-200">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
