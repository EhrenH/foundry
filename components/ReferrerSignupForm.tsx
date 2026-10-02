"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.875rem",
  borderRadius: "6px", border: "1px solid #E8E8E8",
  background: "#fff", fontSize: "0.9rem", color: "#1A1A1A",
  fontFamily: "inherit", outline: "none", boxSizing: "border-box",
};

export default function ReferrerSignupForm() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [source,   setSource]   = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/referrers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:            name.trim(),
          email:           email.trim(),
          whatsapp_number: phone.trim() || undefined,
          source:          source.trim() || undefined,
        }),
      });
      const data = await res.json() as { referral_code?: string; error?: string };
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      router.push(`/dashboard/${data.referral_code}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>Name *</label>
          <input style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>Email *</label>
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>WhatsApp number</label>
        <input style={inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+27 82 123 4567" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>How did you hear about Foundry?</label>
        <input style={inputStyle} type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="LinkedIn, a friend, etc." />
      </div>

      {error && <p style={{ color: "#C0392B", fontSize: "0.8rem" }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#E8E8E8" : "#C9A96E",
          color: loading ? "#6B6B6B" : "#fff",
          border: "none", borderRadius: "6px", padding: "0.7rem 1.5rem",
          fontSize: "0.9rem", fontWeight: 500, cursor: loading ? "default" : "pointer",
          fontFamily: "inherit", transition: "background 0.15s ease", alignSelf: "flex-start",
        }}
      >
        {loading ? "Creating your link..." : "Get my referral link"}
      </button>
    </form>
  );
}
