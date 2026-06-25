"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;       // stagger offset in ms
  className?: string;   // forwarded to wrapper div (allows layout classes)
}

export function ScrollReveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — leave element fully visible
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide element (only after mount, avoiding SSR flash)
    el.classList.add("scroll-reveal-ready");

    let timerId: number | null = null;

    const reveal = () => {
      if (delay > 0) {
        timerId = window.setTimeout(
          () => el.classList.add("sr-visible"),
          delay
        );
      } else {
        el.classList.add("sr-visible");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.unobserve(el);
      },
      // Trigger slightly before the element is fully visible
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className || undefined}>
      {children}
    </div>
  );
}
