import Link from "next/link";

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
    summary: "A fast, mobile-first website built to convert visitors into bookings.",
    live: true,
  },
  {
    client: "Salon, Sea Point",
    industry: "Beauty · Cape Town",
    summary: null,
    live: false,
  },
  {
    client: "Property management",
    industry: "Real estate · Cape Town",
    summary: null,
    live: false,
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] max-w-[900px] mb-8">
            We help founders and agencies ship the right thing, faster.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed max-w-[600px] mb-12">
            Product consulting. Websites. Referral systems. Built by someone
            who&rsquo;s done the work.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300"
            >
              Book a call →
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center border border-foundry-ink text-foundry-ink font-medium px-6 py-4 rounded-[6px] hover:bg-[#F5F5F5] transition-colors duration-300"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col gap-4">
                <h2 className="text-[1.75rem] font-medium tracking-tight text-foundry-ink">
                  {service.title}
                </h2>
                <p className="text-foundry-stone text-base leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The pitch */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto max-w-[720px]">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-foundry-ink leading-[1.1] mb-8">
            One person. End-to-end.
          </h2>
          <p className="text-foundry-stone text-xl leading-relaxed">
            Foundry exists because most agencies hand you off between
            salespeople, account managers, and developers. Foundry
            doesn&rsquo;t. The person who scopes your project is the person
            who builds it.
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-12">
            Selected work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {work.map((item) => (
              <div key={item.client} className="flex flex-col gap-4">
                <div className="bg-foundry-mist h-48 rounded-[4px]" />
                <div className="flex flex-col gap-2">
                  <p className="text-foundry-stone text-xs tracking-widest uppercase">
                    {item.industry}
                  </p>
                  <h3 className="text-foundry-ink font-medium text-lg">
                    {item.client}
                  </h3>
                  {item.live ? (
                    <p className="text-foundry-stone text-sm leading-relaxed">
                      {item.summary}
                    </p>
                  ) : (
                    <p className="text-foundry-stone text-sm italic">
                      Launching soon
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/work"
              className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
            >
              View all work →
            </Link>
          </div>
        </div>
      </section>

      {/* Quiet credibility */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto max-w-[720px]">
          <p className="text-foundry-stone text-sm tracking-widest uppercase mb-8">
            About Foundry
          </p>
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-6">
            Built in Cape Town. Made for businesses everywhere.
          </h2>
          <p className="text-foundry-stone text-lg leading-relaxed">
            Eight years as a BA, PM, and Product Owner inside a UK software
            agency, shipping mobile apps and websites for international
            clients. Now working fractionally with founders and agencies who
            need that experience without the full-time commitment. Cape
            Town-based. Comfortable across US/EU timezones.
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300"
            >
              More about Foundry →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-foundry-ink leading-[1.1] mb-8">
            Let&rsquo;s build something.
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
