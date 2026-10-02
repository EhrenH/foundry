import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import AboutFocalPoint from "@/components/AboutFocalPoint";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "About | Foundry",
  description: "Foundry is a Cape Town-based growth studio.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Page intro */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05]">
            About Foundry.
          </h1>
        </div>
      </section>

      {/* The story — focal point left, copy right */}
      <section className="bg-foundry-cream overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[360px] md:h-auto min-h-[360px]">
            <AboutFocalPoint />
          </div>
          <ScrollReveal className="px-8 md:px-14 py-[4rem] md:py-[6rem] flex flex-col gap-5 justify-center">
            <p className="text-foundry-ink text-lg leading-relaxed font-medium">
              Most businesses grow by accident. Foundry exists to change that.
            </p>
            <p className="text-foundry-stone text-base leading-relaxed">
              A good month. A lucky referral. A busy season. Real, but not consistently repeatable.
            </p>
            <p className="text-foundry-stone text-base leading-relaxed">
              We&rsquo;ve spent years growing businesses and shaping products around the world.
              One lesson held firm: growth isn&rsquo;t luck. It&rsquo;s deliberate.
              The businesses that grew earned trust. They built the right things.
              They turned their traffic into customers and their customers into advocates.
            </p>
            <p className="text-foundry-ink text-base leading-relaxed font-medium">
              Foundry brings that same deliberateness to your business.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ServicesGrid />

      {/* CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] font-medium tracking-tight text-white mb-8">
              Let&rsquo;s grow your business.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-200"
            >
              Book a call
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
