import type { Metadata } from "next";
import CredibilitySection from "@/components/CredibilitySection";
import AcquisitionSection from "@/components/AcquisitionSection";
import ConversionSection  from "@/components/ConversionSection";

export const metadata: Metadata = {
  title: "Expertise — Foundry",
  description:
    "Credibility, acquisition, and conversion — three ways Foundry grows your business.",
};

export default function ServicesPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[8rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-6">
            Expertise
          </p>
          <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-medium tracking-[-0.025em] text-white leading-[1.05] max-w-[900px] mb-8">
            For businesses that want more.
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-[560px]">
            Credibility, acquisition, and conversion — the three levers that
            move a business forward. We build all three.
          </p>
        </div>
      </section>

      {/* ── Three interactive service sections ── */}
      <CredibilitySection />
      <AcquisitionSection />
      <ConversionSection />

    </main>
  );
}
