"use client";

import { useEffect, useRef } from "react";

// Translation limits (px) at the extremes of the hero (mx/my = ±0.5)
// calc(var(--mx, 0) * MULTIPLIER) where MULTIPLIER = limit * 2
// glow: ±26px x, ±16px y  → multiplier 52 / 32
// form: ±7px  x, ±5px  y  → multiplier 14 / 10  (counter direction handled in CSS)

export default function ForgeFocalPoint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const mx = useRef(0);
  const my = useRef(0);

  useEffect(() => {
    // Skip parallax for touch devices and reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const hero = document.getElementById("forge-hero");
    const el = containerRef.current;
    if (!hero || !el) return;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mx.current = (e.clientX - r.left) / r.width - 0.5;
      my.current = (e.clientY - r.top) / r.height - 0.5;

      if (pending.current) return;
      pending.current = true;
      requestAnimationFrame(() => {
        el.style.setProperty("--mx", String(mx.current));
        el.style.setProperty("--my", String(my.current));
        pending.current = false;
      });
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    /* PLACEHOLDER: replace with forge asset — see FOCAL_POINT_SPEC.md §2 */
    <div
      ref={containerRef}
      className="forge-focal-point relative"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Glow layer — translates toward cursor, pulses idle */}
      <div className="forge-glow-wrap absolute inset-[-35%]">
        <div className="forge-glow-pulse w-full h-full" />
      </div>

      {/* Form layer — counter-translates for depth */}
      <div className="forge-form-wrap absolute inset-0">
        <div className="forge-form w-full h-full" />
      </div>
    </div>
  );
}
