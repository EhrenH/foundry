import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting — Foundry",
  description:
    "Fractional Product Owner and Business Analyst for founders and dev agencies.",
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
      {/* Hero */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] max-w-[800px] mb-8">
            Fractional Product Owner &amp; Business Analyst.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed max-w-[600px]">
            I help founders and agencies ship the right thing, faster.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
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
      </section>

      {/* Who I work with */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-12">
            Who I work with
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founders */}
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
                Turn a chaotic backlog into a roadmap that actually ships.
              </p>
            </div>

            {/* Agencies */}
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
                Senior delivery without the senior-market rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How engagements work */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-12">
            How engagements work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <h3 className="text-foundry-ink font-medium text-lg">
                  {item.title}
                </h3>
                <p className="text-foundry-stone text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2.5rem] font-medium tracking-tight text-foundry-ink mb-8">
            Let&rsquo;s talk about what you&rsquo;re building.
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
