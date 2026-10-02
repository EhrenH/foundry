"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const MAX  = 16;
const EASE = 0.05;

const included = [
  "Custom design, built from scratch around your business",
  "Hosted on fast, reliable infrastructure (Vercel + Cloudflare)",
  "Mobile-first, accessible, search-engine optimised",
  "WhatsApp integration for lead capture",
  "Ongoing support, updates and security",
];

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const f1 = useRef<HTMLDivElement>(null);
  const f2 = useRef<HTMLDivElement>(null);
  const f3 = useRef<HTMLDivElement>(null);
  const f4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = sectionRef.current;
    const glow = glowRef.current;
    if (!host || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const facets = [
      { el: f1.current!, factor: (1.2 - 1.00) * 0.7 },
      { el: f2.current!, factor: (1.2 - 0.62) * 0.7 },
      { el: f3.current!, factor: (1.2 - 0.32) * 0.7 },
      { el: f4.current!, factor: (1.2 - 0.32) * 0.7 },
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
      facets.forEach(({ el, factor }) => {
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
    <section ref={sectionRef} id="credibility" style={{ background: "#FBFAF8", overflow: "hidden" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ minHeight: "580px" }}>

        {/* ── Content — LEFT ─────────────────────────────── */}
        <div className="px-8 md:pl-16 md:pr-12 py-16 md:py-20 flex flex-col justify-center">
          <p style={{ color: "#C9A96E", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            01 | Web
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", fontWeight: 500, letterSpacing: "-0.025em", color: "#1A1A1A", lineHeight: 1.05, margin: "0 0 1rem" }}>
            Credibility.
          </h2>
          <p style={{ color: "#6B6B6B", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            A website so considered that customers trust you before they speak
            to you. Built to convert visitors into customers.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
            {included.map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#B8860B", flexShrink: 0, marginTop: "6px", width: "6px", height: "6px", borderRadius: "50%", background: "#B8860B" }}></span>
                <span style={{ color: "#6B6B6B", fontSize: "0.875rem", lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/book"
            className="hover:bg-foundry-ochre-hover transition-colors duration-200"
            style={{ display: "inline-flex", alignItems: "center", background: "#C9A96E", color: "#fff", fontWeight: 500, padding: "0.55rem 1.1rem", borderRadius: "6px", fontSize: "0.875rem", textDecoration: "none", alignSelf: "flex-start" }}
          >
            Book a call
          </Link>
        </div>

        {/* ── Prism focal point — RIGHT ───────────────────── */}
        <div className="relative hidden md:block" style={{ minHeight: "580px" }} aria-hidden="true">
          <div ref={glowRef} style={{ position: "absolute", inset: "-25% -35%", willChange: "transform", pointerEvents: "none" }}>
            <div className="prism-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 48% 50%, rgba(214,150,40,0.32) 0%, rgba(184,134,11,0.08) 42%, transparent 66%)" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
            <div style={{ position: "relative", width: "280px", height: "360px" }}>
              <div ref={f1} className="prism-shimmer" style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(52% 6%, 88% 62%, 24% 52%)", background: "linear-gradient(160deg, rgba(184,134,11,0.28), rgba(214,150,40,0.12))" }} />
              <div ref={f2} className="prism-shimmer" style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(18% 24%, 76% 32%, 50% 96%)", background: "linear-gradient(180deg, rgba(255,196,110,0.34), rgba(184,134,11,0.16))" }} />
              <div ref={f3} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(50% 16%, 72% 86%, 30% 70%)", background: "linear-gradient(180deg, rgba(255,214,140,0.52), rgba(214,150,40,0.22))" }} />
              <div ref={f4} style={{ position: "absolute", inset: 0, willChange: "transform", clipPath: "polygon(50% 16%, 51% 16.6%, 31% 69%, 30% 70%)", background: "linear-gradient(180deg, rgba(255,228,170,0.9), transparent 72%)" }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
