import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Web — Foundry",
  description: "Custom websites for service businesses.",
};

const included = [
  "Custom design, built from scratch around your business",
  "Hosted on fast, reliable infrastructure (Vercel + Cloudflare)",
  "Mobile-first, accessible, search-engine optimised",
  "WhatsApp integration for lead capture",
  "Ongoing support, updates, and security",
];

export default function WebPage() {
  return (
    <main>
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] max-w-[800px] mb-8">
              Websites that bring you customers.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-foundry-stone text-xl leading-relaxed max-w-[600px]">
              Custom-built websites for service businesses. Designed to convert
              visitors into customers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[720px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-8">
              What&rsquo;s included
            </h2>
          </ScrollReveal>
          <ul className="flex flex-col gap-4">
            {included.map((item, i) => (
              <ScrollReveal key={item} delay={i * 80}>
                <li className="flex gap-4 items-start">
                  <span className="text-foundry-ochre mt-0.5">—</span>
                  <span className="text-foundry-stone text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-foundry-stone text-lg mb-8">
              From R6,500 build + R450/month hosting and support.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300"
            >
              Book a website project →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
