import type { Metadata } from "next";
import Link from "next/link";
import CalEmbed from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a free 30-minute call with Foundry. Pick a time that works for you.",
};

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export default function BookPage() {
  return (
    <main>
      {/* Page intro */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-5">
            Book a call
          </p>
          <h1 className="text-[3rem] md:text-[4rem] font-medium tracking-[-0.025em] text-foundry-ink leading-[1.05] mb-4">
            Thirty minutes.
          </h1>
          <p className="text-foundry-stone text-xl leading-relaxed max-w-[560px]">
            Pick a time that works for you. We&rsquo;ll talk about your business
            and what Foundry can do for it.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          {CAL_LINK ? (
            <CalEmbed calLink={CAL_LINK} />
          ) : (
            <div className="max-w-[480px]">
              <p className="text-foundry-stone text-base leading-relaxed mb-6">
                Our live calendar is being set up. In the meantime, send us a
                message and we&rsquo;ll book a time directly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-foundry-ink text-white font-medium px-6 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity duration-200"
              >
                Contact us →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Alternative contact */}
      <section className="px-8 md:px-16 py-[3rem] bg-foundry-white border-t border-foundry-mist">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-stone text-sm">
            Prefer to message us?{" "}
            <Link
              href="/contact"
              className="text-foundry-ink underline underline-offset-4 decoration-foundry-mist hover:decoration-foundry-ink transition-colors duration-200"
            >
              Contact us →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
