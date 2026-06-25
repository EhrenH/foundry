import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Work — Foundry",
  description: "A small selection of what we've built.",
};

const AZZIE_IMG =
  "https://images.unsplash.com/photo-1449965408869-eefb6c23eaa7?auto=format&fit=crop&w=1600&q=80";
const SALON_IMG =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=75";
const PROPERTY_IMG =
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=75";

export default function WorkPage() {
  return (
    <main>
      {/* Page intro */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
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
      <section className="bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          {/* Full-width case study image — no reveal (background anchor) */}
          <div className="relative h-[480px] md:h-[580px] bg-foundry-mist overflow-hidden">
            <Image
              src={AZZIE_IMG}
              alt="Azzie's Driving School — road, Cape Town"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          <ScrollReveal className="px-8 md:px-16 py-[4rem] md:py-[5rem]">
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
                className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200 self-start"
              >
                View live site →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Placeholders */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0}>
              <div className="overflow-hidden rounded-[6px] border border-foundry-mist">
                <div className="relative h-52 bg-foundry-mist overflow-hidden">
                  <Image
                    src={SALON_IMG}
                    alt="Salon, Sea Point"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-foundry-ink/20" />
                </div>
                <div className="p-8">
                  <p className="text-foundry-stone text-xs tracking-widest uppercase mb-3">
                    Beauty · Sea Point
                  </p>
                  <h3 className="text-foundry-ink font-medium text-lg mb-2">
                    Salon, Sea Point
                  </h3>
                  <p className="text-foundry-stone text-sm italic">
                    Launching soon
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="overflow-hidden rounded-[6px] border border-foundry-mist">
                <div className="relative h-52 bg-foundry-mist overflow-hidden">
                  <Image
                    src={PROPERTY_IMG}
                    alt="Property management, Cape Town"
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-foundry-ink/20" />
                </div>
                <div className="p-8">
                  <p className="text-foundry-stone text-xs tracking-widest uppercase mb-3">
                    Real estate · Cape Town
                  </p>
                  <h3 className="text-foundry-ink font-medium text-lg mb-2">
                    Property management
                  </h3>
                  <p className="text-foundry-stone text-sm italic">
                    Launching soon
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
