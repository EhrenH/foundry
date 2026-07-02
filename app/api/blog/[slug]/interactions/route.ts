import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!supabaseAdmin) {
    return NextResponse.json({ likes: 0, comments: [] });
  }

  const [likesRes, commentsRes] = await Promise.all([
    supabaseAdmin
      .from("blog_likes")
      .select("id", { count: "exact", head: true })
      .eq("post_slug", slug),
    supabaseAdmin
      .from("blog_comments")
      .select("id, author_name, content, created_at")
      .eq("post_slug", slug)
      .order("created_at", { ascending: true }),
  ]);

  return NextResponse.json({
    likes:    likesRes.count ?? 0,
    comments: commentsRes.data ?? [],
  });
}
