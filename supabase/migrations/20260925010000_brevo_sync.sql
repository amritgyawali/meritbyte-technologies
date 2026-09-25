-- Supabase stays the source of truth for everyone who signed up; Brevo gets a
-- copy of each contact and sends the email. These columns record the extra
-- details the /free-website form collects and whether the Brevo copy is
-- current, so scripts/brevo-sync.mjs can retry the rows that failed.
--
-- Paste into Supabase > SQL Editor and run after 20260925000000_subscribers.sql,
-- or `supabase db push`. Safe to run twice.

alter table public.subscribers
  add column if not exists contact_name text check (char_length(contact_name) <= 80),
  add column if not exists phone text check (char_length(phone) <= 30),
  add column if not exists city text check (char_length(city) <= 60),
  -- Set when the address was proven by a double opt-in click.
  add column if not exists confirmed_at timestamptz,
  add column if not exists confirm_ip text,
  -- Why the address stopped getting mail: 'unsubscribe page', or the Brevo
  -- event that stopped it ('unsubscribed', 'hard_bounce', 'spam').
  add column if not exists unsubscribe_reason text,
  -- Last successful push to Brevo, and the error from the last failed one.
  add column if not exists brevo_synced_at timestamptz,
  add column if not exists brevo_error text;

-- Rows whose Brevo copy is missing or older than the row itself.
create index if not exists subscribers_brevo_pending_idx
  on public.subscribers (updated_at)
  where brevo_synced_at is null or brevo_synced_at < updated_at;

-- Recording a Brevo push is bookkeeping, not a change to the subscriber, so it
-- must not bump updated_at; otherwise every synced row would look out of date.
create or replace function public.subscribers_touch()
returns trigger language plpgsql as $$
begin
  if (to_jsonb(new) - array['brevo_synced_at', 'brevo_error', 'updated_at'])
     is distinct from
     (to_jsonb(old) - array['brevo_synced_at', 'brevo_error', 'updated_at']) then
    new.updated_at := now();
  end if;
  return new;
end;
$$;
