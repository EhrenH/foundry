import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a call — Foundry",
  description: "Book a free 30-minute call with Foundry.",
};

const consultTypes = [
  {
    title: "Founder consult",
    duration: "30 min · Free",
    description:
      "For early-stage founders who need product leadership but aren't sure what kind of engagement fits.",
    calLink: "#",
  },
  {
    title: "Agency consult",
    duration: "30 min · Free",
    description:
      "For dev agencies who need extra BA/PO capacity for client work.",
    calLink: "#",
  },
  {
    title: "Website project",
    duration: "30 min · Free",
    description:
      "For business owners who need a new website built well.",
    calLink: "#",
  },
  {
    title: "Referral system",
    duration: "30 min · Free",
    description:
      "For businesses who want a referral platform built into their existing site.",
    calLink: "#",
  },
];

export default function BookPage() {
  return (
    <main>
      {/* Page intro */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
            Book a call.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed">
            Pick what fits. We&rsquo;ll talk for 30 minutes.
          </p>
        </div>
      </section>

      {/* Consult cards */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultTypes.map((type) => (
              <div
                key={type.title}
                className="bg-foundry-white border border-foundry-mist p-8 rounded-[6px] flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-foundry-ink font-medium text-xl">
                    {type.title}
                  </h2>
                  <p className="text-foundry-stone text-sm">{type.duration}</p>
                </div>
                <p className="text-foundry-stone text-base leading-relaxed flex-1">
                  {type.description}
                </p>
                <a
                  href={type.calLink}
                  className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-5 py-3 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300 self-start"
                >
                  Book →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative contact */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-stone text-base">
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-foundry-ink underline underline-offset-4 decoration-foundry-mist hover:decoration-foundry-ink transition-colors duration-300"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
