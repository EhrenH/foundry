import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    business_name?: string;
    interest?: string;
    message?: string;
  };

  const { name, email, phone, business_name, interest, message } = body;

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

  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    business_name: business_name?.trim() || null,
    interest: interest?.trim() || null,
    message: message?.trim() || null,
    source: "contact",
  });

  if (error) {
    console.error("Lead insert failed:", error.message);
    return NextResponse.json(
      { error: "Failed to save your details. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
