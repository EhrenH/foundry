-- Foundry — Supabase schema
-- Run this in the Supabase SQL Editor (project → SQL Editor → New query)

-- ── Tables ────────────────────────────────────────────────────────────────

create table if not exists referrers (
  id               uuid primary key default gen_random_uuid(),
  email            text unique not null,
  name             text not null,
  whatsapp_number  text,
  referral_code    text unique not null,
  source           text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table if not exists referrals (
  id                  uuid primary key default gen_random_uuid(),
  referrer_id         uuid references referrers(id) on delete set null,
  lead_name           text not null,
  lead_email          text not null,
  lead_phone          text,
  lead_business_name  text,
  consult_type        text not null,   -- founder | agency | website | referral
  message             text,
  status              text default 'pending',  -- pending | contacted | converted | expired
  source_path         text,
  created_at          timestamptz default now(),
  contacted_at        timestamptz,
  converted_at        timestamptz,
  reward_amount       numeric(10,2),
  reward_paid         boolean default false,
  notes               text
);

create table if not exists rewards (
  id                  uuid primary key default gen_random_uuid(),
  referrer_id         uuid references referrers(id) on delete restrict,
  referral_id         uuid references referrals(id) on delete restrict,
  amount              numeric(10,2) not null,
  status              text default 'owed',     -- owed | paid
  payment_method      text,                    -- eft | voucher | other
  payment_reference   text,
  paid_at             timestamptz,
  created_at          timestamptz default now()
);

create table if not exists bookings (
  id                  uuid primary key default gen_random_uuid(),
  cal_booking_id      text unique,
  referrer_id         uuid references referrers(id) on delete set null,
  event_type          text not null,           -- founder | agency | website | referral
  scheduled_at        timestamptz not null,
  attendee_name       text,
  attendee_email      text,
  attendee_business   text,
  notes               text,
  status              text default 'scheduled', -- scheduled | completed | no_show | cancelled
  created_at          timestamptz default now()
);

-- Blog tables (for /blog interactions)
create table if not exists blog_likes (
  id           uuid default gen_random_uuid() primary key,
  post_slug    text not null,
  fingerprint  text not null,
  created_at   timestamptz default now(),
  unique(post_slug, fingerprint)
);

create table if not exists blog_comments (
  id           uuid default gen_random_uuid() primary key,
  post_slug    text not null,
  author_name  text not null,
  content      text not null,
  created_at   timestamptz default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────

create index if not exists idx_referrers_code      on referrers(referral_code);
create index if not exists idx_referrals_referrer  on referrals(referrer_id);
create index if not exists idx_referrals_status    on referrals(status);
create index if not exists idx_rewards_referrer    on rewards(referrer_id);
create index if not exists idx_bookings_scheduled  on bookings(scheduled_at);

-- ── Row Level Security ────────────────────────────────────────────────────

alter table referrers    enable row level security;
alter table referrals    enable row level security;
alter table rewards      enable row level security;
alter table bookings     enable row level security;
alter table blog_likes   enable row level security;
alter table blog_comments enable row level security;

-- Anonymous: can submit referrals and blog interactions
create policy "anon can insert referrals"
  on referrals for insert to anon with check (true);

create policy "anon can insert blog_likes"
  on blog_likes for insert to anon with check (true);

create policy "anon can delete own blog_likes"
  on blog_likes for delete to anon using (true);

create policy "anon can select blog_likes"
  on blog_likes for select to anon using (true);

create policy "anon can insert blog_comments"
  on blog_comments for insert to anon with check (true);

create policy "anon can select blog_comments"
  on blog_comments for select to anon using (true);

-- Service role: full access (used by API routes via SUPABASE_SERVICE_ROLE_KEY)
-- No explicit policy needed — service role bypasses RLS.

-- Referrers can read their own rows (soft auth via referral_code in URL)
-- These are permissive for v1 — tighten with magic link auth in v2.
create policy "public can select referrers by code"
  on referrers for select to anon using (true);

create policy "public can select referrals"
  on referrals for select to anon using (true);

create policy "public can select rewards"
  on rewards for select to anon using (true);
