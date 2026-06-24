import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Referral — Foundry",
  description: "A referral system inside your website.",
};

const included = [
  "Personal referral links for each of your customers",
  "Branded landing pages on your own website",
  "WhatsApp-first sharing — your customers send links in one tap",
  "Automated tracking, notifications, and reward management",
  "Reporting dashboard with referral activity and revenue",
];

const steps = [
  {
    number: "One.",
    description: "We integrate the system into your website",
  },
  {
    number: "Two.",
    description: "Your customers get personal referral links to share",
  },
  {
    number: "Three.",
    description:
      "When they refer someone who becomes a customer, they earn a reward",
  },
];

export default function ReferralPage() {
  return (
    <main>
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] max-w-[800px] mb-8">
            A referral system inside your website.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed max-w-[600px]">
            Your existing customers refer new ones, automatically. You handle
            the rewards. We handle everything else.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-8">
            What&rsquo;s included
          </h2>
          <ul className="flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex gap-4 items-start">
                <span className="text-foundry-ochre mt-0.5">—</span>
                <span className="text-foundry-stone text-base leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-3">
                <span className="text-foundry-ochre font-medium">
                  {step.number}
                </span>
                <p className="text-foundry-stone text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-stone text-lg mb-8">
            From R499/month. Setup included.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-4 rounded-[6px] hover:bg-foundry-ochre-hover transition-colors duration-300"
          >
            Book a referral system call →
          </Link>
        </div>
      </section>
    </main>
  );
}
