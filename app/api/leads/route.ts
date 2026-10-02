import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

async function sendTelegramNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  message?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text = `📬 New Contact Form

Name: ${lead.name}
Email: ${lead.email}${lead.phone ? `\nPhone: ${lead.phone}` : ""}${lead.business_name ? `\nBusiness: ${lead.business_name}` : ""}${lead.message ? `\n\nMessage:\n${lead.message}` : ""}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    business_name?: string;
    message?: string;
  };

  const { name, email, phone, business_name, message } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const leadData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    business_name: business_name?.trim() || null,
    message: message?.trim() || null,
    source: "contact",
  };

  const { error } = await supabase.from("leads").insert(leadData);

  if (error) {
    console.error("Lead insert failed:", error.message);
    return NextResponse.json(
      { error: "Failed to save your details. Please try again." },
      { status: 500 },
    );
  }

  // Send Telegram notification (non-blocking)
  sendTelegramNotification({
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone || undefined,
    business_name: leadData.business_name || undefined,
    message: leadData.message || undefined,
  });

  return NextResponse.json({ ok: true });
}
