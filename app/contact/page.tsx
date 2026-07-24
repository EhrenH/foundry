import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Foundry. Tell us about your business and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Contact
            </p>
            <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
              Let&rsquo;s talk.
            </h1>
            <p className="text-foundry-stone text-xl leading-relaxed max-w-[420px] mb-8">
              Tell us a bit about your business. We&rsquo;ll get back to you
              within 24 hours.
            </p>
            <p className="text-foundry-stone text-sm">
              Prefer to book a time directly?{" "}
              <Link
                href="/book"
                className="text-foundry-ink underline underline-offset-4 decoration-foundry-mist hover:decoration-foundry-ink transition-colors duration-200"
              >
                Book a call →
              </Link>
            </p>
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
