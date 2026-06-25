import Link from "next/link";
import ForgeFocalPoint from "@/components/ForgeFocalPoint";

// Server component — only ForgeFocalPoint is 'use client'
export default function ForgeHero() {
  return (
    <section
      id="forge-hero"
      className="relative overflow-hidden bg-[#0D0D0D]"
      style={{ height: "100dvh", minHeight: "620px" }}
    >
      {/* Layout — headline left, focal point center-right */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row md:items-center">

        {/* Left column: headline + CTAs (desktop) */}
        <div className="md:w-[46%] shrink-0 flex flex-col gap-7 pt-[16vh] md:pt-0">
          <div className="flex flex-col gap-5">
            <span className="text-foundry-ochre text-[11px] tracking-[0.22em] uppercase">
              Cape Town · Product Studio
            </span>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.75rem] font-medium tracking-[-0.025em] text-white leading-[1.05] max-w-[500px]">
              We help founders and agencies ship the right thing, faster.
            </h1>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-[360px]">
              Product consulting. Websites. Referral systems.
            </p>
          </div>

          {/* CTAs — desktop only at this position */}
          <div className="hidden md:flex gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-200"
            >
              Book a call →
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center border border-white/20 text-white/65 font-medium px-6 py-4 rounded-[6px] hover:border-white/40 hover:text-white/90 transition-colors duration-200"
            >
              See our work
            </Link>
          </div>
        </div>

        {/* Center-right: forge focal point
            Absolute on desktop (floats in darkness with negative space).
            Inline flow on mobile (sits between headline and CTAs). */}
        <div className="
          flex items-center justify-center my-8
          md:my-0 md:absolute md:inset-y-0
          md:right-[-2%] md:w-[58%]
          md:flex md:items-center md:justify-center
        ">
          <ForgeFocalPoint />
        </div>

        {/* CTAs — mobile only, below focal point */}
        <div className="md:hidden flex gap-3 flex-wrap pb-10">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-200"
          >
            Book a call →
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center border border-white/20 text-white/65 font-medium px-6 py-4 rounded-[6px] hover:border-white/40 hover:text-white/90 transition-colors duration-200"
          >
            See our work
          </Link>
        </div>
      </div>

      {/* Far-right editorial label — desktop XL only */}
      <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center">
        <span className="text-white/18 text-[10px] tracking-[0.28em] uppercase [writing-mode:vertical-rl] rotate-180">
          Built by one person
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none">
        <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>
  );
}
