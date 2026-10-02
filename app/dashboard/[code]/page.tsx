import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import ReferralDashboard from "@/components/ReferralDashboard";

type Props = { params: Promise<{ code: string }> };

export const metadata: Metadata = { title: "Dashboard | Foundry" };
export const dynamic = "force-dynamic";

export default async function DashboardPage({ params }: Props) {
  const { code } = await params;

  if (!supabaseAdmin) {
    return (
      <main className="px-8 md:px-16 py-[5rem] bg-foundry-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-foundry-stone">Dashboard not available. Supabase is not configured.</p>
        </div>
      </main>
    );
  }

  const { data: referrer } = await supabaseAdmin
    .from("referrers")
    .select("id, name, referral_code, email")
    .eq("referral_code", code)
    .maybeSingle();

  if (!referrer) notFound();

  const [{ data: referrals }, { data: rewards }] = await Promise.all([
    supabaseAdmin
      .from("referrals")
      .select("id, lead_name, consult_type, status, created_at, reward_amount")
      .eq("referrer_id", referrer.id)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("rewards")
      .select("id, amount, status, payment_reference, created_at")
      .eq("referrer_id", referrer.id)
      .order("created_at", { ascending: false }),
  ]);

  const totalReferrals = (referrals ?? []).length;
  const earned = (rewards ?? [])
    .filter(r => r.status === "paid")
    .reduce((sum, r) => sum + Number(r.amount), 0);
  const pending = (rewards ?? [])
    .filter(r => r.status === "owed")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  return (
    <main className="px-8 md:px-16 py-[4rem] md:py-[6rem] bg-foundry-white">
      <div className="max-w-[900px] mx-auto">
        <ReferralDashboard
          name={referrer.name}
          referral_code={referrer.referral_code}
          referrals={referrals ?? []}
          rewards={rewards ?? []}
          stats={{ total: totalReferrals, earned, pending }}
        />
      </div>
    </main>
  );
}
