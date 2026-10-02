import Link from "next/link";
import ForgeHero from "@/components/ForgeHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import ServicesGrid from "@/components/ServicesGrid";


export default function Home() {
  return (
    <main>
      {/* ── Hero ── forge focal point, dark near-black, asymmetric */}
      <ForgeHero />

      <ServicesGrid />

      {/* ── Final CTA ── */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-tight text-white leading-[1.1] mb-8">
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
