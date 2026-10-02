"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.875rem",
  borderRadius: "6px", border: "1px solid #E8E8E8",
  background: "#fff", fontSize: "0.9rem", color: "#1A1A1A",
  fontFamily: "inherit", outline: "none", boxSizing: "border-box",
};

const interests = [
  { value: "website",   label: "Website" },
  { value: "referral",  label: "Referral system" },
  { value: "founder",   label: "Product consulting (founder)" },
  { value: "agency",    label: "Product consulting (agency)" },
  { value: "not_sure",  label: "Not sure yet" },
];

export default function ReferralForm({ referrer_code }: { referrer_code: string }) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [business, setBusiness] = useState("");
  const [interest, setInterest] = useState("");
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !interest) {
      setError("Please fill in your name, email and what you're looking for.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrer_code,
          lead_name:          name.trim(),
          lead_email:         email.trim(),
          lead_phone:         phone.trim() || undefined,
          lead_business_name: business.trim() || undefined,
          consult_type:       interest,
          message:            message.trim() || undefined,
        }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ padding: "2rem 0" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: 500, color: "#1A1A1A", marginBottom: "0.5rem" }}>We&rsquo;ll be in touch.</p>
        <p style={{ color: "#6B6B6B" }}>We&rsquo;ll reach out within 24 hours to set up a call.</p>
      </div>
    );
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>WhatsApp number</label>
          <input style={inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+27 82 123 4567" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>Business name</label>
          <input style={inputStyle} type="text" value={business} onChange={e => setBusiness(e.target.value)} placeholder="Your business" />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>What are you looking for? *</label>
        <select
          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          value={interest}
          onChange={e => setInterest(e.target.value)}
          required
        >
          <option value="">Select one</option>
          {interests.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6B6B6B" }}>Anything useful to know?</label>
        <textarea
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell us a bit about your business and what you're trying to achieve."
          maxLength={800}
        />
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
        {loading ? "Sending..." : "Get in touch"}
      </button>
    </form>
  );
}
