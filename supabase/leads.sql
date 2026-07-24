-- Run this once in the Supabase SQL editor to create the leads table.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_name text,
  interest text,
  message text,
  source text default 'contact',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

-- Public contact form can insert; only the service role can read.
create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
