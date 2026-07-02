import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function triggerN8n(payload: Record<string, unknown>) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "new_referral", ...payload }),
  }).catch(() => null);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    referrer_code?:     string;
    lead_name?:         string;
    lead_email?:        string;
    lead_phone?:        string;
    lead_business_name?: string;
    consult_type?:      string;
    message?:           string;
  };

  const {
    referrer_code, lead_name, lead_email,
    lead_phone, lead_business_name, consult_type, message,
  } = body;

  if (!lead_name?.trim() || !lead_email?.trim() || !consult_type?.trim()) {
    return NextResponse.json({ error: "Name, email, and interest are required." }, { status: 400 });
  }

  const validTypes = ["founder", "agency", "website", "referral", "not_sure"];
  if (!validTypes.includes(consult_type)) {
    return NextResponse.json({ error: "Invalid consult type." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  // Look up referrer
  let referrer_id: string | null = null;
  let referrerRow: { id: string; name: string; email: string } | null = null;

  if (referrer_code?.trim()) {
    const { data } = await supabaseAdmin
      .from("referrers")
      .select("id, name, email")
      .eq("referral_code", referrer_code.trim())
      .maybeSingle();
    referrer_id  = data?.id   ?? null;
    referrerRow  = data ?? null;
  }

  const { data: referral, error } = await supabaseAdmin
    .from("referrals")
    .insert({
      referrer_id,
      lead_name:          lead_name.trim(),
      lead_email:         lead_email.trim().toLowerCase(),
      lead_phone:         lead_phone?.trim() || null,
      lead_business_name: lead_business_name?.trim() || null,
      consult_type,
      message:            message?.trim() || null,
      source_path:        referrer_code ? `/r/${referrer_code}` : null,
      status:             "pending",
    })
    .select("id, lead_name, lead_email, consult_type")
    .single();

  if (error || !referral) {
    return NextResponse.json({ error: "Failed to save your details." }, { status: 500 });
  }

  // Notify referrer by email
  if (resend && referrerRow) {
    await resend.emails.send({
      from:    `Foundry <hello@foundry.co.za>`,
      to:      referrerRow.email,
      subject: `Thanks for referring ${referral.lead_name}`,
      html: `
        <p>Hi ${referrerRow.name},</p>
        <p>${referral.lead_name} just came through your referral link. We'll be in touch with them within 24 hours.</p>
        <p>You'll get another email if and when they become a Foundry client.</p>
        <p>— Foundry</p>
      `,
    }).catch(() => null);
  }

  // n8n notification
  await triggerN8n({ referral, referrer: referrerRow });

  return NextResponse.json({ ok: true });
}
