import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Foundry",
  description: "Foundry is a Cape Town-based product studio.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Page intro */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
            About Foundry.
          </h1>
        </div>
      </section>

      {/* The story */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[720px] mx-auto flex flex-col gap-6">
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
        </div>
      </section>

      {/* What I work on */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-12">
            What Foundry does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-foundry-ink font-medium">Consulting</h3>
              <p className="text-foundry-stone text-base leading-relaxed">
                Fractional PO and BA work for founders and dev agencies.
                Backlogs, specs, roadmaps, and delivery oversight.
              </p>
              <Link
                href="/consulting"
                className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
              >
                Learn more →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-foundry-ink font-medium">Web</h3>
              <p className="text-foundry-stone text-base leading-relaxed">
                Custom websites for service businesses. Designed from scratch.
                Built to convert visitors into customers.
              </p>
              <Link
                href="/web"
                className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
              >
                Learn more →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-foundry-ink font-medium">Referral</h3>
              <p className="text-foundry-stone text-base leading-relaxed">
                A referral system inside your website. Personal links,
                automated tracking, reward management.
              </p>
              <Link
                href="/referral"
                className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2.5rem] font-medium tracking-tight text-foundry-ink mb-8">
            Let&rsquo;s talk.
          </h2>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300"
          >
            Book a call →
          </Link>
        </div>
      </section>
    </main>
  );
}
