"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/constants";
import { rewardLabel, statusColour } from "@/lib/referral";

type Referral = {
  id: string;
  lead_name: string;
  consult_type: string;
  status: string;
  created_at: string;
  reward_amount: number | null;
};

type Reward = {
  id: string;
  amount: number;
  status: string;
  payment_reference: string | null;
  created_at: string;
};

type Props = {
  name: string;
  referral_code: string;
  referrals: Referral[];
  rewards: Reward[];
  stats: { total: number; earned: number; pending: number };
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReferralDashboard({ name, referral_code, referrals, rewards, stats }: Props) {
  const referralUrl = `${SITE_URL}/r/${referral_code}`;
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const waMessage = encodeURIComponent(
    `Hi! I thought you might be interested in Foundry. They build websites, referral systems and product consulting for businesses. Here's my link: ${referralUrl}`
  );

  return (
    <div>
      {/* Greeting */}
      <h1 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 500, color: "#1A1A1A", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
        Hi {name.split(" ")[0]}.
      </h1>
      <p style={{ color: "#6B6B6B", marginBottom: "2.5rem" }}>Here&rsquo;s your Foundry referral dashboard.</p>

      {/* Link card */}
      <div style={{ background: "#FAF8F5", border: "1px solid #E8E8E8", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "0.75rem" }}>
          Your referral link
        </p>
        <p style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#1A1A1A", marginBottom: "1rem", wordBreak: "break-all" }}>
          {referralUrl}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={copyLink}
            style={{
              background: copied ? "#E8E8E8" : "#1A1A1A", color: copied ? "#6B6B6B" : "#fff",
              border: "none", borderRadius: "6px", padding: "0.55rem 1rem",
              fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
          <a
            href={`https://wa.me/?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366", color: "#fff", borderRadius: "6px",
              padding: "0.55rem 1rem", fontSize: "0.8rem", fontWeight: 500,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Share on WhatsApp
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Referrals made", value: stats.total },
          { label: "Rewards earned", value: `R${stats.earned.toLocaleString()}` },
          { label: "Pending", value: `R${stats.pending.toLocaleString()}` },
        ].map(s => (
          <div key={s.label} style={{ background: "#FAF8F5", border: "1px solid #E8E8E8", borderRadius: "8px", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "0.4rem" }}>{s.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 500, color: "#1A1A1A" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Referrals table */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1A1A", marginBottom: "1rem" }}>Referrals</h2>
        {referrals.length === 0 ? (
          <p style={{ color: "#6B6B6B", fontSize: "0.875rem" }}>No referrals yet. Share your link to get started.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E8E8" }}>
                  {["Lead", "Interest", "Status", "Date", "Reward"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "#6B6B6B", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referrals.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #F4F2EE" }}>
                    <td style={{ padding: "0.75rem", color: "#1A1A1A" }}>{r.lead_name}</td>
                    <td style={{ padding: "0.75rem", color: "#6B6B6B", textTransform: "capitalize" }}>{r.consult_type}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span style={{ background: statusColour(r.status) + "20", color: statusColour(r.status), padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 500, textTransform: "capitalize" }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem", color: "#6B6B6B" }}>{fmt(r.created_at)}</td>
                    <td style={{ padding: "0.75rem", color: r.reward_amount ? "#C9A96E" : "#6B6B6B", fontWeight: r.reward_amount ? 500 : 400 }}>
                      {r.reward_amount ? `R${r.reward_amount.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rewards table */}
      {rewards.length > 0 && (
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 500, color: "#1A1A1A", marginBottom: "1rem" }}>Rewards</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E8E8" }}>
                  {["Date", "Amount", "Status", "Reference"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "#6B6B6B", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rewards.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #F4F2EE" }}>
                    <td style={{ padding: "0.75rem", color: "#6B6B6B" }}>{fmt(r.created_at)}</td>
                    <td style={{ padding: "0.75rem", color: "#C9A96E", fontWeight: 500 }}>{rewardLabel(String(r.amount))}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span style={{ background: r.status === "paid" ? "#C9A96E20" : "#E8E8E8", color: r.status === "paid" ? "#C9A96E" : "#6B6B6B", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 500, textTransform: "capitalize" }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem", color: "#6B6B6B", fontFamily: "monospace", fontSize: "0.8rem" }}>
                      {r.payment_reference ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
