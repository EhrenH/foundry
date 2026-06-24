export const REWARD_AMOUNTS = {
  founder: 2000,
  agency: 2000,
  website: 1500,
  referral: 500,
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://foundry.co.za";

export const CONTACT_EMAIL = "hello@foundry.co.za";
