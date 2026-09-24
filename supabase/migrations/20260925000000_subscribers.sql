-- Subscribers from the popup on meritbyte.com, and a log of every email sent
-- to them. Paste into Supabase > SQL Editor and run, or `supabase db push`.
--
-- Row level security is on with no policies, so the public anon key can do
-- nothing here. The site's API routes and scripts/send-campaign.mjs use the
-- service role key, which bypasses RLS. Never ship that key to the browser.

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  business_name text not null check (char_length(business_name) between 1 and 120),
  email text not null unique check (char_length(email) between 3 and 254),
  subscribed boolean not null default true,
  -- Consent record: the exact text the visitor ticked, and when and where.
  consent boolean not null default false,
  consent_text text,
  consent_version text,
  consent_at timestamptz,
  ip text,
  user_agent text,
  source text,
  unsubscribe_token uuid not null unique default gen_random_uuid(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscribers_subscribed_idx
  on public.subscribers (created_at) where subscribed;

create or replace function public.subscribers_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists subscribers_touch on public.subscribers;
create trigger subscribers_touch before update on public.subscribers
  for each row execute function public.subscribers_touch();

alter table public.subscribers enable row level security;

-- One row per attempt. A subscriber gets at most one successful send per
-- campaign, so re-running a campaign only reaches the people it missed.
create table if not exists public.email_sends (
  id bigint generated always as identity primary key,
  subscriber_id uuid not null references public.subscribers (id) on delete cascade,
  campaign text not null,
  provider text,
  status text not null check (status in ('sent', 'failed')),
  error text,
  sent_at timestamptz not null default now()
);

create unique index if not exists email_sends_once
  on public.email_sends (subscriber_id, campaign) where status = 'sent';

alter table public.email_sends enable row level security;
