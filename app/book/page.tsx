import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book a call — Foundry",
  description:
    "Book a free 30-minute call. Select a day, a time, and what you want to talk about.",
};

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
            Thirty minutes. Pick a time, tell me what you&rsquo;re working on.
          </p>
        </div>
      </section>

      {/* Booking flow */}
      <section className="px-8 md:px-16 py-[5rem] md:py-[7.5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[480px]">
            <BookingFlow />
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
