"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-[6px] border border-foundry-mist bg-white px-3.5 py-2.5 text-[0.9rem] text-foundry-ink outline-none focus:border-foundry-stone transition-colors";

const interests = [
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral system" },
  { value: "consulting", label: "Product consulting" },
  { value: "not_sure", label: "Not sure yet" },
];

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          business_name: business.trim() || undefined,
          interest: interest || undefined,
          message: message.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="py-8">
        <p className="text-xl font-medium text-foundry-ink mb-2">
          We&rsquo;ll be in touch.
        </p>
        <p className="text-foundry-stone">
          Thanks for reaching out. We&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foundry-stone">Name *</label>
          <input
            className={inputClass}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foundry-stone">Email *</label>
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foundry-stone">Phone</label>
          <input
            className={inputClass}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+27 82 123 4567"
            autoComplete="tel"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foundry-stone">Business</label>
          <input
            className={inputClass}
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Your business"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foundry-stone">
          What are you looking for?
        </label>
        <select
          className={`${inputClass} appearance-none cursor-pointer`}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="">Select one</option>
          {interests.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foundry-stone">Message</label>
        <textarea
          className={`${inputClass} resize-y leading-relaxed`}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your business and what you're trying to achieve."
          maxLength={1000}
        />
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-[6px] bg-foundry-ochre px-6 py-3 text-[0.9rem] font-medium text-white hover:bg-foundry-ochre-hover transition-colors duration-200 disabled:bg-foundry-mist disabled:text-foundry-stone disabled:cursor-default"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
