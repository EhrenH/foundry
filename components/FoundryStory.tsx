import { ScrollReveal } from "@/components/ScrollReveal";

export default function FoundryStory() {
  return (
    <section className="bg-foundry-ink px-8 md:px-16 py-[5rem] md:py-[7.5rem]">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[680px]">

          <ScrollReveal>
            <p className="text-white text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.25] tracking-[-0.015em] mb-8">
              Most businesses grow by accident. Foundry exists to change that.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="text-white/50 text-lg leading-relaxed mb-5">
              A good month. A lucky referral. A busy season. Real, but not consistently repeatable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="text-white/50 text-lg leading-relaxed mb-5">
              We&rsquo;ve spent years growing businesses and shaping products around the world.
              One lesson held firm — growth isn&rsquo;t luck. It&rsquo;s deliberate.
              The businesses that grew earned trust. They built the right things.
              They turned their traffic into customers and their customers into advocates.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="text-white/70 text-lg leading-relaxed font-medium mb-12">
              Foundry brings that same deliberateness to your business.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
              <p style={{ color: "#C9A96E", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                For businesses that want more.
              </p>
              <p className="text-white/35 text-sm tracking-wide">
                Credibility.&ensp;→&ensp;Acquisition.&ensp;→&ensp;Conversion.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
