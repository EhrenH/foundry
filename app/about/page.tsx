import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — Foundry",
  description: "Foundry is a Cape Town-based product studio.",
};

const STORY_IMG =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80";

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

      {/* The story — image left, text right */}
      <section className="bg-foundry-cream overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[360px] md:h-auto min-h-[360px] bg-foundry-mist">
            <Image
              src={STORY_IMG}
              alt="Foundry workspace"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <ScrollReveal className="px-8 md:px-14 py-[4rem] md:py-[6rem] flex flex-col gap-6 justify-center">
            <p className="text-foundry-stone text-lg leading-relaxed">
              Foundry was started in 2025 to do one thing well — help founders
              and agencies ship the right thing, faster.
            </p>
            <p className="text-foundry-stone text-lg leading-relaxed">
              After eight years inside a UK software agency, working as a BA,
              PM, and Product Owner on mobile apps and websites for
              international clients, I kept seeing the same problem: technical
              capacity wasn&rsquo;t the bottleneck. Product clarity was.
              Founders had engineers but no one owning the roadmap. Agencies had
              developers but no one writing the specs properly.
            </p>
            <p className="text-foundry-stone text-lg leading-relaxed">
              Foundry exists to fill that gap. Fractional product leadership.
              Done well. Done by one person.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What I work on */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-10">
              What Foundry does
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Consulting",
                body: "Fractional PO and BA work for founders and dev agencies. Backlogs, specs, roadmaps, and delivery oversight.",
                href: "/consulting",
              },
              {
                title: "Web",
                body: "Custom websites for service businesses. Designed from scratch. Built to convert visitors into customers.",
                href: "/web",
              },
              {
                title: "Referral",
                body: "A referral system inside your website. Personal links, automated tracking, reward management.",
                href: "/referral",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-foundry-ink font-medium">{item.title}</h3>
                  <p className="text-foundry-stone text-base leading-relaxed">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200"
                  >
                    Learn more →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] font-medium tracking-tight text-white mb-8">
              Let&rsquo;s talk.
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
