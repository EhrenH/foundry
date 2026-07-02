import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { generateReferralCode } from "@/lib/referral";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/constants";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function triggerN8n(payload: Record<string, unknown>) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "new_referrer", ...payload }),
  }).catch(() => null);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    name?: string;
    email?: string;
    whatsapp_number?: string;
    source?: string;
  };

  const { name, email, whatsapp_number, source } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  // Check for duplicate email
  const { data: existing } = await supabaseAdmin
    .from("referrers")
    .select("referral_code")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ referral_code: existing.referral_code });
  }

  // Generate unique referral code
  const { data: allCodes } = await supabaseAdmin
    .from("referrers")
    .select("referral_code");

  const codes = (allCodes ?? []).map(r => r.referral_code as string);
  const referral_code = generateReferralCode(name.trim(), codes);

  const { data: referrer, error } = await supabaseAdmin
    .from("referrers")
    .insert({
      name:            name.trim(),
      email:           email.trim().toLowerCase(),
      whatsapp_number: whatsapp_number?.trim() || null,
      source:          source?.trim() || null,
      referral_code,
    })
    .select("id, name, email, referral_code")
    .single();

  if (error || !referrer) {
    return NextResponse.json({ error: "Failed to create referrer." }, { status: 500 });
  }

  const dashboardUrl = `${SITE_URL}/dashboard/${referral_code}`;
  const referralUrl  = `${SITE_URL}/r/${referral_code}`;

  // Welcome email
  if (resend) {
    await resend.emails.send({
      from:    `Foundry <hello@foundry.co.za>`,
      to:      referrer.email,
      subject: "Your Foundry referral link is ready",
      html: `
        <p>Hi ${referrer.name},</p>
        <p>You're in. Here's your personal referral link:</p>
        <p><strong><a href="${referralUrl}">${referralUrl}</a></strong></p>
        <p>Share it with any business owner who could use a website, referral system, or product consulting. When they become a Foundry client, you earn a reward.</p>
        <p><strong>Rewards:</strong></p>
        <ul>
          <li>Consulting engagement — R2,000</li>
          <li>Website project — R1,500</li>
          <li>Referral platform — R500</li>
        </ul>
        <p>Track your referrals and rewards at any time: <a href="${dashboardUrl}">${dashboardUrl}</a></p>
        <p>— Foundry</p>
        <p><small>Questions? ${CONTACT_EMAIL}</small></p>
      `,
    }).catch(() => null);
  }

  // n8n notification
  await triggerN8n({ referrer });

  return NextResponse.json({ referral_code });
}
