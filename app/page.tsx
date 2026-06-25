import Image from "next/image";
import Link from "next/link";
import ForgeHero from "@/components/ForgeHero";
import { ScrollReveal } from "@/components/ScrollReveal";

const CAPE_TOWN_IMG =
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80";
const WORK_AZZIE_IMG =
  "https://images.unsplash.com/photo-1449965408869-eefb6c23eaa7?auto=format&fit=crop&w=800&q=75";
const WORK_SALON_IMG =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=75";
const WORK_PROPERTY_IMG =
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=75";

const services = [
  {
    title: "Consulting",
    description:
      "Fractional Product Owner and Business Analyst for founders and dev agencies. We scope, spec, and own the roadmap.",
    href: "/consulting",
  },
  {
    title: "Web",
    description:
      "Custom websites for service businesses. Designed around your customers. Built to convert.",
    href: "/web",
  },
  {
    title: "Referral",
    description:
      "A referral system inside your website. Your customers refer new ones, automatically.",
    href: "/referral",
  },
];

const work = [
  {
    client: "Azzie's Driving School",
    industry: "Driving school · Cape Town",
    summary:
      "A fast, mobile-first website built to convert visitors into bookings.",
    img: WORK_AZZIE_IMG,
    live: true,
  },
  {
    client: "Salon, Sea Point",
    industry: "Beauty · Cape Town",
    summary: null,
    img: WORK_SALON_IMG,
    live: false,
  },
  {
    client: "Property management",
    industry: "Real estate · Cape Town",
    summary: null,
    img: WORK_PROPERTY_IMG,
    live: false,
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ── forge focal point, dark near-black, asymmetric */}
      <ForgeHero />

      {/* ── Services ── */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[1.75rem] font-medium tracking-tight text-foundry-ink">
                    {service.title}
                  </h2>
                  <p className="text-foundry-stone text-base leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
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

      {/* ── Pitch ── full-width dark ink panel */}
      <section className="bg-foundry-ink px-8 md:px-16 py-[5rem] md:py-[7.5rem]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-medium tracking-[-0.02em] text-white leading-[1.08] max-w-[760px] mb-8">
              One person. End-to-end.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-white/60 text-xl leading-relaxed max-w-[580px]">
              Foundry exists because most agencies hand you off between
              salespeople, account managers, and developers. Foundry
              doesn&rsquo;t. The person who scopes your project is the person
              who builds it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-10">
              Selected work
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {work.map((item, i) => (
              <ScrollReveal key={item.client} delay={i * 100}>
                <div className="flex flex-col gap-4">
                  <div className="relative h-52 rounded-[4px] overflow-hidden bg-foundry-mist">
                    <Image
                      src={item.img}
                      alt={item.client}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {!item.live && (
                      <div className="absolute inset-0 bg-foundry-ink/40 flex items-end p-4">
                        <span className="text-white/70 text-xs tracking-widest uppercase">
                          Launching soon
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-foundry-stone text-xs tracking-widest uppercase">
                      {item.industry}
                    </p>
                    <h3 className="text-foundry-ink font-medium text-lg">
                      {item.client}
                    </h3>
                    {item.live && item.summary && (
                      <p className="text-foundry-stone text-sm leading-relaxed">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10">
            <ScrollReveal delay={300}>
              <Link
                href="/work"
                className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200"
              >
                View all work →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Cape Town credibility ── image + text split */}
      <section className="bg-foundry-cream overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[320px] md:h-auto min-h-[320px] bg-foundry-mist">
            <Image
              src={CAPE_TOWN_IMG}
              alt="Cape Town"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <ScrollReveal className="px-8 md:px-14 py-[4rem] md:py-[6rem] flex flex-col justify-center gap-5">
            <p className="text-foundry-stone text-xs tracking-widest uppercase">
              About Foundry
            </p>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink leading-[1.2]">
              Built in Cape Town. Made for businesses everywhere.
            </h2>
            <p className="text-foundry-stone text-base leading-relaxed">
              Eight years as a BA, PM, and Product Owner inside a UK software
              agency, shipping mobile apps and websites for international
              clients. Now working fractionally with founders and agencies who
              need that experience without the full-time commitment.
            </p>
            <Link
              href="/about"
              className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200 self-start"
            >
              More about Foundry →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-white leading-[1.1] mb-8">
              Let&rsquo;s build something.
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
