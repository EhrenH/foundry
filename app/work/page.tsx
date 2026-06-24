import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Foundry",
  description: "A small selection of what we've built.",
};

export default function WorkPage() {
  return (
    <main>
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
            Work.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed">
            A small selection of what we&rsquo;ve built.
          </p>
        </div>
      </section>

      {/* Azzie's case study */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-foundry-mist h-[320px] md:h-[480px] rounded-[4px] mb-10" />
          <div className="max-w-[720px] flex flex-col gap-6">
            <p className="text-foundry-stone text-xs tracking-widest uppercase">
              Driving school · Cape Town
            </p>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink">
              Azzie&rsquo;s Driving School
            </h2>
            <p className="text-foundry-stone text-base leading-relaxed">
              A fast, mobile-first website built to convert visitors into
              bookings. Focused on WhatsApp lead capture and clear service
              pricing.
            </p>
            <a
              href="#"
              className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-300 self-start"
            >
              View live site →
            </a>
          </div>
        </div>
      </section>

      {/* Placeholders */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-foundry-mist p-8 rounded-[6px]">
              <p className="text-foundry-stone text-xs tracking-widest uppercase mb-3">
                Beauty · Sea Point
              </p>
              <h3 className="text-foundry-ink font-medium text-lg mb-2">
                Salon, Sea Point
              </h3>
              <p className="text-foundry-stone text-sm italic">
                Launching Q1 2026
              </p>
            </div>
            <div className="border border-foundry-mist p-8 rounded-[6px]">
              <p className="text-foundry-stone text-xs tracking-widest uppercase mb-3">
                Real estate · Cape Town
              </p>
              <h3 className="text-foundry-ink font-medium text-lg mb-2">
                Property management
              </h3>
              <p className="text-foundry-stone text-sm italic">
                Launching Q1 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
