import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const services = [
  {
    title: "Credibility.",
    description: "The digital impression your business deserves. A presence that earns trust.",
    href: "/expertise#credibility",
  },
  {
    title: "Acquisition.",
    description: "Turn loyal customers into your best marketers and reward them for it. Growth that pays itself forward.",
    href: "/expertise#acquisition",
  },
  {
    title: "Conversion.",
    description: "Most just build even if it's the wrong things. We focus on converting traffic into revenue.",
    href: "/expertise#conversion",
  },
];

export default function ServicesGrid() {
  return (
    <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[1.1rem] font-medium tracking-tight text-foundry-ink mb-10">
            For businesses that want more.
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <div className="flex flex-col gap-4">
                <h3 className="text-[1.75rem] font-medium tracking-tight text-foundry-ink">
                  {service.title}
                </h3>
                <p className="text-foundry-stone text-base leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200"
                >
                  Learn more
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
