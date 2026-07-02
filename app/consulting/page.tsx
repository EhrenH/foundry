import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import EmberFissureHero from "@/components/EmberFissureHero";

export const metadata: Metadata = {
  title: "Consulting — Foundry",
  description:
    "Build the right thing and grow faster — fractional product leadership for founders and agencies.",
};

const engagements = [
  {
    title: "Fractional ongoing",
    description:
      "1–3 days a week embedded with your team. Best for founders who need consistent product leadership.",
  },
  {
    title: "Project sprint",
    description:
      "4–8 week engagements with defined deliverables. Best for agencies bringing me onto specific client work.",
  },
  {
    title: "Advisory",
    description:
      "A few hours a week of strategic input. Best for founders who need a sounding board, not a hands-on lead.",
  },
];

export default function ConsultingPage() {
  return (
    <main>
      <EmberFissureHero />

      {/* Background */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto">
            <p className="text-foundry-stone text-lg leading-relaxed mb-6">
              Eight years as a BA, PM, and PO inside a UK software agency,
              shipping mobile apps and websites for international clients. Now
              working fractionally with founders and agencies who need that
              experience without the full-time commitment.
            </p>
            <p className="text-foundry-stone text-lg leading-relaxed">
              Cape Town-based. Comfortable across US/EU timezones. Senior
              delivery without senior-market rates.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Who I work with */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-10">
              Who I work with
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0}>
              <div className="border border-foundry-mist p-8 rounded-[6px]">
                <h3 className="text-[1.5rem] font-medium tracking-tight text-foundry-ink mb-4">
                  For founders
                </h3>
                <p className="text-foundry-stone text-base leading-relaxed mb-6">
                  If your devs are ready but the product side is the
                  bottleneck — messy backlog, vague specs, no one owning the
                  roadmap — that&rsquo;s the gap I fill.
                </p>
                <p className="text-foundry-ink text-sm font-medium">
                  Turn a chaotic backlog into a roadmap that ships — and a
                  product that grows.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="border border-foundry-mist p-8 rounded-[6px]">
                <h3 className="text-[1.5rem] font-medium tracking-tight text-foundry-ink mb-4">
                  For agencies
                </h3>
                <p className="text-foundry-stone text-base leading-relaxed mb-6">
                  I take discovery, specs, and backlog off your plate so your
                  devs build the right thing the first time. Drop-in BA/PO
                  capacity for client projects.
                </p>
                <p className="text-foundry-ink text-sm font-medium">
                  Drop-in product capacity that makes your team ship the right
                  thing the first time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How engagements work — dark panel */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] font-medium tracking-tight text-white mb-10">
              How engagements work
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-medium text-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] font-medium tracking-tight text-foundry-ink mb-8">
              Let&rsquo;s grow your business.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-200"
            >
              Book a call →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
