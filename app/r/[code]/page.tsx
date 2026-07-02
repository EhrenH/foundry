import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import ReferralForm from "@/components/ReferralForm";

type Props = { params: Promise<{ code: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  if (!supabaseAdmin) return { title: "Foundry" };
  const { data } = await supabaseAdmin
    .from("referrers")
    .select("name")
    .eq("referral_code", code)
    .maybeSingle();
  return {
    title: data ? `${data.name} recommends Foundry` : "Foundry",
    description: "Websites, referral systems, and product consulting for businesses in South Africa.",
  };
}

const services = [
  { title: "Credibility.", body: "A website that earns trust before your customer ever picks up the phone." },
  { title: "Acquisition.", body: "A referral system that turns your best customers into your best marketers." },
  { title: "Conversion.", body: "Product consulting that makes sure you build the right thing the first time." },
];

export default async function ReferralLandingPage({ params }: Props) {
  const { code } = await params;

  if (!supabaseAdmin) notFound();

  const { data: referrer } = await supabaseAdmin
    .from("referrers")
    .select("name, referral_code")
    .eq("referral_code", code)
    .maybeSingle();

  if (!referrer) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-5">
            Referred by {referrer.name}
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-[-0.025em] text-white leading-[1.05] max-w-[720px] mb-5">
            {referrer.name.split(" ")[0]} thinks Foundry can help your business grow.
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-[560px]">
            Websites, referral systems, and product consulting for businesses in South Africa.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-8 md:px-16 py-[3rem] md:py-[5rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-stone text-sm mb-8">What we do</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map(s => (
              <div key={s.title} className="flex flex-col gap-3">
                <h2 className="text-foundry-ink font-medium text-xl">{s.title}</h2>
                <p className="text-foundry-stone text-base leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-8 md:px-16 py-[3rem] md:py-[5rem] bg-foundry-white" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[640px]">
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-2">
              Get in touch.
            </h2>
            <p className="text-foundry-stone text-base mb-8">
              Tell us a bit about your business. We&rsquo;ll get back to you within 24 hours.
            </p>
            <ReferralForm referrer_code={code} />
          </div>
        </div>
      </section>

      {/* Or book directly */}
      <section className="px-8 md:px-16 py-[3rem] md:py-[4rem] bg-foundry-cream border-t border-foundry-mist">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-foundry-stone text-base">
            Prefer to pick a time directly?
          </p>
          <Link
            href={`/book?ref=${code}`}
            className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200"
          >
            Book a call directly →
          </Link>
        </div>
      </section>
    </main>
  );
}
