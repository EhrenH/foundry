import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("start" in body) ||
    !("name" in body) ||
    !("email" in body) ||
    !("reason" in body)
  ) {
    return Response.json(
      { ok: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const { start, name, email, reason, notes } = body as {
    start: string;
    name: string;
    email: string;
    reason: string;
    notes?: string;
  };

  if (!start || !name || !email || !reason) {
    return Response.json(
      { ok: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;

  if (!apiKey || !eventTypeId) {
    return Response.json(
      { ok: false, message: "Booking not configured" },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.cal.com/v2/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({
      start,
      eventTypeId: Number(eventTypeId),
      attendee: {
        name,
        email,
        timeZone: "Africa/Johannesburg",
      },
      metadata: { reason, notes: notes ?? "" },
    }),
  });

  if (!res.ok) {
    let message = "Booking failed. Please try again.";
    try {
      const err = (await res.json()) as { message?: string };
      if (err.message) message = err.message;
    } catch {
      // use default message
    }
    return Response.json({ ok: false, message }, { status: 502 });
  }

  return Response.json({ ok: true });
}
