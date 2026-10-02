"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const MAX  = 16;
const EASE = 0.055;

const included = [
  "Personal referral links for each of your customers",
  "Branded landing pages on your own website",
  "WhatsApp-first sharing: your customers send links in one tap",
  "Automated tracking, notifications and reward management",
  "Reporting dashboard with referral activity and revenue",
];

const steps = [
  { number: "One.",   description: "We integrate the system into your website" },
  { number: "Two.",   description: "Your customers get personal referral links to share" },
  { number: "Three.", description: "When they refer someone who becomes a customer, they earn a reward" },
];

export default function AcquisitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const shadowRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host   = sectionRef.current;
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
    <section ref={sectionRef} id="acquisition" style={{ background: "#FAF7F1", overflow: "hidden" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ minHeight: "640px" }}>

        {/* ── Aurum Monolith focal point — LEFT ──────────────── */}
        <div className="relative hidden md:block" style={{ minHeight: "640px" }} aria-hidden="true">
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(60% 80% at 50% 50%, rgba(184,134,11,0.06) 0%, transparent 60%)" }} />
          <div ref={glowRef} style={{ position: "absolute", inset: "-28% -38%", willChange: "transform", pointerEvents: "none" }}>
            <div className="aurum-halo" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 46%, rgba(214,150,40,0.38) 0%, rgba(184,134,11,0.12) 38%, transparent 64%)" }} />
          </div>
          <div ref={shadowRef} style={{ position: "absolute", left: "24%", right: "24%", bottom: "8%", height: "56px", willChange: "transform", pointerEvents: "none", background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(60,42,14,0.18) 0%, transparent 70%)" }} />
          <div ref={formRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, willChange: "transform", pointerEvents: "none" }}>
            <div style={{ position: "relative", width: "220px", height: "340px" }}>
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 8% 32%, 18% 80%, 46% 100%)", background: "linear-gradient(150deg, #241d12 0%, #15110b 75%)" }} />
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 92% 42%, 78% 86%, 46% 100%)", background: "linear-gradient(205deg, #4a3a23 0%, #2a2013 50%, #181109 100%)" }} />
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(54% 0%, 55.4% 0.6%, 47.2% 100%, 46% 100%)", background: "linear-gradient(180deg, rgba(255,206,128,0.72), rgba(184,134,11,0.16) 60%, transparent)" }} />
              <div style={{ position: "absolute", inset: 0, clipPath: "polygon(92% 42%, 90% 43%, 76.5% 85.4%, 78% 86%)", background: "linear-gradient(200deg, rgba(255,196,110,0.5), transparent 72%)" }} />
            </div>
          </div>
        </div>

        {/* ── Content — RIGHT ────────────────────────────────── */}
        <div className="px-8 md:pl-12 md:pr-16 py-16 md:py-20 flex flex-col justify-center">
          <p style={{ color: "#C9A96E", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            02 | Referral
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", fontWeight: 500, letterSpacing: "-0.025em", color: "#1A150D", lineHeight: 1.05, margin: "0 0 1.1rem" }}>
            Acquisition.
          </h2>
          <p style={{ color: "#6B6B6B", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            The people who already trust you are your best source of new
            business. We build the system that turns them into a steady stream
            of referrals. Automatically.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
            {included.map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#B8860B", flexShrink: 0, marginTop: "6px", width: "6px", height: "6px", borderRadius: "50%", background: "#B8860B" }}></span>
                <span style={{ color: "#6B6B6B", fontSize: "0.875rem", lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ color: "#1A150D", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            How it works
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
            {steps.map(step => (
              <div key={step.number} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#C9A96E", fontSize: "0.8rem", fontWeight: 500, flexShrink: 0, marginTop: "2px", width: "2.5rem" }}>{step.number}</span>
                <span style={{ color: "#6B6B6B", fontSize: "0.875rem", lineHeight: 1.65 }}>{step.description}</span>
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

      </div>
    </section>
  );
}
