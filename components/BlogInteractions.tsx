"use client";

import { useEffect, useRef, useState } from "react";

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

function getFingerprint(): string {
  const key = "foundry_fp";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(key, fp);
  }
  return fp;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogInteractions({ slug }: { slug: string }) {
  const [likes, setLikes]       = useState(0);
  const [liked, setLiked]       = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName]         = useState("");
  const [message, setMessage]   = useState("");
  const [submitting, setSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");
  const [liking, setLiking]     = useState(false);
  const fpRef = useRef<string>("");

  useEffect(() => {
    fpRef.current = getFingerprint();

    Promise.all([
      fetch(`/api/blog/${slug}/interactions`).then(r => r.json()),
      fetch(`/api/blog/${slug}/like?fingerprint=${fpRef.current}`).then(r => r.json()),
    ]).then(([interactions, likeState]) => {
      setLikes(interactions.likes ?? 0);
      setComments(interactions.comments ?? []);
      setLiked(likeState.liked ?? false);
    });
  }, [slug]);

  async function handleLike() {
    if (liking) return;
    setLiking(true);
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
    try {
      const res = await fetch(`/api/blog/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: fpRef.current }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikes(data.likes);
    } catch {
      setLiked(l => !l);
      setLikes(n => liked ? n + 1 : n - 1);
    } finally {
      setLiking(false);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and comment.");
      return;
    }
    setError("");
    setSubmit(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_name: name.trim(), content: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setComments(prev => [...prev, data.comment]);
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #E8E8E8" }}>

      {/* Like button */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
        <button
          onClick={handleLike}
          disabled={liking}
          aria-label={liked ? "Unlike this post" : "Like this post"}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer",
            background: liked ? "#C9A96E" : "#F4F2EE",
            color: liked ? "#fff" : "#6B6B6B",
            fontSize: "0.875rem", fontWeight: 500,
            transition: "all 0.15s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {likes} {likes === 1 ? "like" : "likes"}
        </button>
        {liked && (
          <p style={{ color: "#C9A96E", fontSize: "0.8rem" }}>Thanks for reading.</p>
        )}
      </div>

      {/* Comments */}
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1A1A", marginBottom: "1.5rem" }}>
          {comments.length === 0 ? "Leave a comment" : `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
        </h3>

        {comments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {comments.map(c => (
              <div key={c.id} style={{ padding: "1rem 1.25rem", background: "#FAF8F5", borderRadius: "6px", border: "1px solid #E8E8E8" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A" }}>{c.author_name}</span>
                  <span style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>{formatDate(c.created_at)}</span>
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#4A4A4A", margin: 0 }}>{c.content}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleComment} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={80}
            style={{
              padding: "0.65rem 0.875rem", borderRadius: "6px",
              border: "1px solid #E8E8E8", background: "#fff",
              fontSize: "0.875rem", color: "#1A1A1A", outline: "none",
              fontFamily: "inherit", width: "100%", boxSizing: "border-box",
            }}
          />
          <textarea
            placeholder="What are your thoughts?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            maxLength={1000}
            style={{
              padding: "0.65rem 0.875rem", borderRadius: "6px",
              border: "1px solid #E8E8E8", background: "#fff",
              fontSize: "0.875rem", color: "#1A1A1A", resize: "vertical", outline: "none",
              fontFamily: "inherit", width: "100%", boxSizing: "border-box", lineHeight: 1.6,
            }}
          />
          {error && (
            <p style={{ color: "#C0392B", fontSize: "0.8rem", margin: 0 }}>{error}</p>
          )}
          {submitted && (
            <p style={{ color: "#C9A96E", fontSize: "0.8rem", margin: 0 }}>Comment posted. Thanks for joining the conversation.</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            style={{
              alignSelf: "flex-start", padding: "0.55rem 1.1rem",
              background: submitting ? "#E8E8E8" : "#1A1A1A",
              color: submitting ? "#6B6B6B" : "#fff",
              border: "none", borderRadius: "6px", fontSize: "0.875rem",
              fontWeight: 500, cursor: submitting ? "default" : "pointer",
              fontFamily: "inherit", transition: "background 0.15s ease",
            }}
          >
            {submitting ? "Posting..." : "Post comment →"}
          </button>
        </form>
      </div>
    </div>
  );
}
