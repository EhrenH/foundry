"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const MAX  = 14;
const EASE = 0.06;

const engagements = [
  {
    title: "Fractional ongoing",
    description: "1-3 days a week embedded with your team. Best for founders who need consistent product leadership.",
  },
  {
    title: "Project sprint",
    description: "4-8 week engagements with defined deliverables. Best for agencies bringing me onto specific client work.",
  },
  {
    title: "Advisory",
    description: "A few hours a week of strategic input. Best for founders who need a sounding board, not a hands-on lead.",
  },
];

export default function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const halfLRef   = useRef<HTMLDivElement>(null);
  const halfRRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host  = sectionRef.current;
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
      const sep = Math.min(4, Math.hypot(cx, cy) * 0.28);
      const fx  = -cx * 0.3;
      const fy  = -cy * 0.3;
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
    <section ref={sectionRef} id="conversion" style={{ background: "#0D0D0D", overflow: "hidden" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ minHeight: "680px" }}>

        {/* ── Content — LEFT ─────────────────────────────────── */}
        <div className="px-8 md:pl-16 md:pr-12 py-16 md:py-24 flex flex-col justify-center">
          <p style={{ color: "#C9A96E", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            03 | Consulting
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", fontWeight: 500, letterSpacing: "-0.025em", color: "#F4F2EE", lineHeight: 1.05, margin: "0 0 1.1rem" }}>
            Conversion.
          </h2>
          <p style={{ color: "rgba(244,242,238,0.52)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Most businesses waste months building the wrong things. I make
            sure yours builds what actually moves it forward.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "1.1rem" }}>
              <p style={{ color: "#F4F2EE", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>For founders</p>
              <p style={{ color: "rgba(244,242,238,0.45)", fontSize: "0.8rem", lineHeight: 1.65 }}>
                Messy backlog, vague specs, no one owning the roadmap: that&rsquo;s the gap I fill.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "1.1rem" }}>
              <p style={{ color: "#F4F2EE", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>For agencies</p>
              <p style={{ color: "rgba(244,242,238,0.45)", fontSize: "0.8rem", lineHeight: 1.65 }}>
                Drop-in BA/PO capacity so your devs build the right thing the first time.
              </p>
            </div>
          </div>

          <p style={{ color: "rgba(244,242,238,0.35)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            How engagements work
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
            {engagements.map(item => (
              <div key={item.title} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#B8860B", flexShrink: 0, marginTop: "6px", width: "6px", height: "6px", borderRadius: "50%", background: "#B8860B" }}></span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span style={{ color: "#F4F2EE", fontSize: "0.875rem", fontWeight: 500 }}>{item.title}</span>
                  <span style={{ color: "rgba(244,242,238,0.45)", fontSize: "0.875rem" }}>{item.description}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/book"
            className="hover:bg-foundry-ochre-hover transition-colors duration-200"
            style={{ display: "inline-flex", alignItems: "center", background: "#C9A96E", color: "#fff", fontWeight: 500, padding: "0.6rem 1.25rem", borderRadius: "6px", fontSize: "0.875rem", textDecoration: "none", alignSelf: "flex-start" }}
          >
            Book a call
          </Link>
        </div>

        {/* ── Ember Fissure focal point — RIGHT ──────────────── */}
        <div className="relative hidden md:block" style={{ minHeight: "680px" }} aria-hidden="true">
          <div ref={glowRef} style={{ position: "absolute", inset: "-30% -45%", willChange: "transform", pointerEvents: "none" }}>
            <div className="ember-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 48%, rgba(184,134,11,0.46) 0%, rgba(184,134,11,0.14) 34%, transparent 62%)" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, pointerEvents: "none" }}>
            <div style={{ position: "relative", width: "200px", height: "340px" }}>
              <div ref={halfLRef} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(0% 6%, 48% 0%, 46% 100%, 0% 94%)", background: "linear-gradient(120deg, #1a1610 0%, #0c0a08 80%)" }} />
              <div ref={halfRRef} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(52% 0%, 100% 6%, 100% 94%, 54% 100%)", background: "linear-gradient(240deg, #2c2114 0%, #140f0a 70%)" }} />
              <div className="ember-seam" style={{ position: "absolute", top: "2%", bottom: "2%", left: "50%", width: "20%", transform: "translateX(-50%)", background: "radial-gradient(ellipse 60% 52% at 50% 50%, rgba(255,196,104,0.95) 0%, rgba(214,150,40,0.5) 26%, rgba(184,134,11,0.12) 52%, transparent 72%)" }} />
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(48.5% 0.5%, 49.5% 0.5%, 47.5% 99.5%, 46.5% 99.5%)", background: "linear-gradient(180deg, rgba(255,200,110,0.6), transparent 70%)" }} />
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(52% 0.5%, 53% 0.5%, 55% 99.5%, 54% 99.5%)", background: "linear-gradient(180deg, rgba(255,190,96,0.5), transparent 70%)" }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
