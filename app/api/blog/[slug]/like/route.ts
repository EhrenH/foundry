import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { fingerprint } = await req.json() as { fingerprint: string };

  if (!fingerprint) return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 });

  if (!supabaseAdmin) {
    return NextResponse.json({ liked: true, likes: 1 });
  }

  // Check if already liked
  const { data: existing } = await supabaseAdmin
    .from("blog_likes")
    .select("id")
    .eq("post_slug", slug)
    .eq("fingerprint", fingerprint)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabaseAdmin
      .from("blog_likes")
      .delete()
      .eq("post_slug", slug)
      .eq("fingerprint", fingerprint);
  } else {
    // Like
    await supabaseAdmin
      .from("blog_likes")
      .insert({ post_slug: slug, fingerprint });
  }

  const { count } = await supabaseAdmin
    .from("blog_likes")
    .select("id", { count: "exact", head: true })
    .eq("post_slug", slug);

  return NextResponse.json({ liked: !existing, likes: count ?? 0 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const fingerprint = req.nextUrl.searchParams.get("fingerprint");

  if (!supabaseAdmin || !fingerprint) {
    return NextResponse.json({ liked: false });
  }

  const { data } = await supabaseAdmin
    .from("blog_likes")
    .select("id")
    .eq("post_slug", slug)
    .eq("fingerprint", fingerprint)
    .maybeSingle();

  return NextResponse.json({ liked: !!data });
}
