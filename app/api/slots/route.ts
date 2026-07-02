import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return Response.json({ error: "Missing start or end" }, { status: 400 });
  }

  const username = process.env.CAL_USERNAME;
  const slug = process.env.CAL_EVENT_TYPE_SLUG;

  if (!username || !slug) {
    return Response.json({ data: { slots: {} } });
  }

  const url = new URL("https://api.cal.com/v2/slots/available");
  url.searchParams.set("startTime", start);
  url.searchParams.set("endTime", end);
  url.searchParams.set("eventTypeSlug", slug);
  url.searchParams.set("username", username);

  const res = await fetch(url.toString(), {
    headers: { "cal-api-version": "2024-08-13" },
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch slots" }, { status: 502 });
  }

  const data: unknown = await res.json();
  return Response.json(data);
}
