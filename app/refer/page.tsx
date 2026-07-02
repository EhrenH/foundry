import type { Metadata } from "next";
import ReferrerSignupForm from "@/components/ReferrerSignupForm";
import { REWARD_AMOUNTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refer & Earn — Foundry",
  description:
    "Refer a business to Foundry and earn a reward when they become a client. Sign up for your personal referral link.",
};

const steps = [
  { n: "One.",   text: "Sign up below. You'll get your own referral link." },
  { n: "Two.",   text: "Share it with any business owner who might want a website, referral system, or product consulting." },
  { n: "Three.", text: "If they become a Foundry client, you earn a reward — paid by EFT within 7 days of their first payment." },
];

const rewards = [
  { type: "Consulting engagement (founder or agency)", amount: REWARD_AMOUNTS.founder },
  { type: "Website project",                           amount: REWARD_AMOUNTS.website },
  { type: "Referral platform",                         amount: REWARD_AMOUNTS.referral },
];

export default function ReferPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-ink">
        <div className="max-w-[1200px] mx-auto max-w-[720px]">
          <p className="text-foundry-ochre text-xs font-medium tracking-[0.2em] uppercase mb-5">
            Referral programme
          </p>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium tracking-[-0.025em] text-white leading-[1.05] mb-6">
            Our referral programme.
          </h1>
          <p className="text-white/55 text-xl leading-relaxed">
            We use Foundry&rsquo;s own referral system to grow Foundry. Refer a client, earn a reward.
          </p>
        </div>
      </section>

      {/* How it works + rewards */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-cream">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-foundry-ink font-medium text-xl mb-6">How it works</h2>
            <div className="flex flex-col gap-5">
              {steps.map(s => (
                <div key={s.n} className="flex gap-4">
                  <span className="text-foundry-ochre text-sm font-medium w-14 shrink-0 pt-[1px]">{s.n}</span>
                  <p className="text-foundry-stone text-base leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-foundry-ink font-medium text-xl mb-6">Rewards</h2>
            <div className="flex flex-col divide-y divide-foundry-mist">
              {rewards.map(r => (
                <div key={r.type} className="flex items-center justify-between py-4">
                  <p className="text-foundry-stone text-base">{r.type}</p>
                  <p className="text-foundry-ink font-medium text-base pl-6 shrink-0">
                    R{r.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-foundry-stone text-sm mt-4">
              Paid by EFT within 7 days of the referred client&rsquo;s first payment.
            </p>
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white" id="signup">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[560px]">
            <h2 className="text-[2rem] font-medium tracking-tight text-foundry-ink mb-2">
              Get your referral link.
            </h2>
            <p className="text-foundry-stone text-base mb-8">
              Takes 30 seconds. You&rsquo;ll be taken to your dashboard as soon as you submit.
            </p>
            <ReferrerSignupForm />
          </div>
        </div>
      </section>
    </main>
  );
}
