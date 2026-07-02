import { REWARD_AMOUNTS } from "@/lib/constants";

export type ConsultType = keyof typeof REWARD_AMOUNTS;

export function generateReferralCode(name: string, existingCodes: string[]): string {
  const parts = name.trim().split(/\s+/);
  const first = (parts[0] ?? "user").toLowerCase().replace(/[^a-z]/g, "");
  const last  = (parts[1] ?? "").toLowerCase().replace(/[^a-z]/g, "");
  const base  = last ? `${first}-${last[0]}` : first;

  if (!existingCodes.includes(base)) return base;
  let i = 2;
  while (existingCodes.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export function rewardLabel(consult_type: string): string {
  const amt = REWARD_AMOUNTS[consult_type as ConsultType];
  return amt ? `R${amt.toLocaleString()}` : "—";
}

export function statusColour(status: string): string {
  switch (status) {
    case "contacted":  return "#3B82F6";
    case "converted":  return "#C9A96E";
    case "expired":    return "#E8E8E8";
    default:           return "#6B6B6B"; // pending
  }
}
