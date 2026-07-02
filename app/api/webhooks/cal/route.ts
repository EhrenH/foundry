import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

function verifySignature(body: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

async function triggerN8n(payload: Record<string, unknown>) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "new_booking", ...payload }),
  }).catch(() => null);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-cal-signature-256");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    triggerEvent?: string;
    payload?: {
      uid?: string;
      type?: string;
      startTime?: string;
      attendees?: Array<{ name?: string; email?: string }>;
      metadata?: Record<string, string>;
      notes?: string;
    };
  };

  if (payload.triggerEvent !== "BOOKING_CREATED") {
    return NextResponse.json({ ok: true });
  }

  const booking = payload.payload;
  if (!booking || !supabaseAdmin) return NextResponse.json({ ok: true });

  const attendee   = booking.attendees?.[0];
  const referrerCode = booking.metadata?.referrer_code;
  let referrer_id: string | null = null;

  if (referrerCode) {
    const { data } = await supabaseAdmin
      .from("referrers")
      .select("id")
      .eq("referral_code", referrerCode)
      .maybeSingle();
    referrer_id = data?.id ?? null;
  }

  const eventType = (booking.type ?? "unknown")
    .toLowerCase()
    .replace(/[^a-z_]/g, "")
    .replace("consultation", "founder");

  await supabaseAdmin.from("bookings").upsert({
    cal_booking_id:   booking.uid,
    referrer_id,
    event_type:       eventType,
    scheduled_at:     booking.startTime ?? new Date().toISOString(),
    attendee_name:    attendee?.name,
    attendee_email:   attendee?.email,
    notes:            booking.notes,
    status:           "scheduled",
  }, { onConflict: "cal_booking_id" });

  await triggerN8n({ booking, referrer_id });

  return NextResponse.json({ ok: true });
}
