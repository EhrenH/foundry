import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { author_name, content } = await req.json() as {
    author_name: string;
    content: string;
  };

  if (!author_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Name and comment are required." }, { status: 400 });
  }
  if (content.length > 1000) {
    return NextResponse.json({ error: "Comment too long (max 1000 chars)." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({
      comment: { id: "preview", author_name: author_name.trim(), content: content.trim(), created_at: new Date().toISOString() },
    });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_comments")
    .insert({ post_slug: slug, author_name: author_name.trim(), content: content.trim() })
    .select("id, author_name, content, created_at")
    .single();

  if (error) return NextResponse.json({ error: "Failed to save comment." }, { status: 500 });

  return NextResponse.json({ comment: data });
}
