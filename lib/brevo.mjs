// Brevo keeps a copy of every subscriber in public.subscribers and sends the
// email. Supabase stays the source of truth: every push to Brevo is driven by
// a subscribers row, and the result is written back to that row
// (brevo_synced_at / brevo_error) so failed pushes are retried by
// syncPending(), from scripts/brevo-sync.mjs or the daily /api/cron/brevo-sync.
//
// Lists:
// - BREVO_LIST_ID            confirmed /free-website sign-ups
// - BREVO_SUBSCRIBE_LIST_ID  the subscribe popup; falls back to BREVO_LIST_ID
// Run scripts/brevo-setup.mjs once to create both lists and the attributes.

import { supabase } from "./supabase.mjs";

export const FREE_WEBSITE_SOURCE = "meritbyte.com/free-website (double opt-in)";

export function brevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY && listFor({}));
}

export async function brevo(method, path, body) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY is not set");
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text.slice(0, 200) };
  }
  return { status: res.status, ok: res.ok, data };
}

function listFor(row) {
  const signup = Number(process.env.BREVO_LIST_ID || 0);
  const popup = Number(process.env.BREVO_SUBSCRIBE_LIST_ID || 0);
  if (String(row.source || "").startsWith("meritbyte.com/free-website")) return signup || popup;
  return popup || signup;
}

function iso(value) {
  return value ? new Date(value).toISOString() : "";
}

// Brevo contact attributes for a subscribers row. Empty values are left out so
// a later sign-up without a phone number does not wipe the one Brevo has.
export function contactAttributes(row) {
  const all = {
    FIRSTNAME: row.contact_name,
    BUSINESS: row.business_name,
    CITY: row.city,
    PHONE_NUMBER: row.phone,
    SUBSCRIBER_ID: row.id,
    CONSENT_TEXT: row.consent_text,
    CONSENT_VERSION: row.consent_version,
    CONSENT_SOURCE: row.source,
    CONSENT_AT: iso(row.consent_at),
    CONSENT_IP: row.ip,
    CONFIRMED_AT: iso(row.confirmed_at),
    CONFIRM_IP: row.confirm_ip
  };
  return Object.fromEntries(Object.entries(all).filter(([, v]) => v));
}

function describe(r) {
  return `Brevo ${r.status}: ${String(r.data?.message || r.data?.code || "").slice(0, 160)}`;
}

// Makes Brevo match one subscribers row. A subscribed row is added to its list
// and un-blocklisted (the person just gave consent again); an unsubscribed row
// is blocklisted, and created blocklisted if Brevo never had it, so a later
// import cannot mail it by mistake. Never throws; returns { ok, status }.
export async function pushSubscriber(row) {
  if (!brevoConfigured()) return { ok: false, skipped: true, status: "Brevo not configured - skipped" };
  const email = String(row.email || "").toLowerCase();
  try {
    if (!row.subscribed) {
      const r = await brevo("PUT", `/contacts/${encodeURIComponent(email)}`, { emailBlacklisted: true });
      if (r.ok) return { ok: true, status: "blocklisted in Brevo" };
      if (r.status !== 404) return { ok: false, status: describe(r) };
      const c = await brevo("POST", "/contacts", { email, emailBlacklisted: true, updateEnabled: true });
      return c.ok ? { ok: true, status: "added to Brevo as blocklisted" } : { ok: false, status: describe(c) };
    }

    const listId = listFor(row);
    const contact = { email, listIds: [listId], emailBlacklisted: false, updateEnabled: true };
    let r = await brevo("POST", "/contacts", { ...contact, attributes: contactAttributes(row) });
    if (r.status === 400 && /attribute/i.test(String(r.data?.message || ""))) {
      // An attribute that was never created in Brevo. Keep the contact and its
      // list membership; the full consent record is still in Supabase.
      r = await brevo("POST", "/contacts", {
        ...contact,
        attributes: row.contact_name ? { FIRSTNAME: row.contact_name } : {}
      });
      if (r.ok) {
        return {
          ok: true,
          status: `added to Brevo list ${listId} (attributes missing - run scripts/brevo-setup.mjs)`
        };
      }
    }
    return r.ok ? { ok: true, status: `added to Brevo list ${listId}` } : { ok: false, status: describe(r) };
  } catch (err) {
    return { ok: false, status: `Brevo unreachable: ${String(err?.message || err).slice(0, 160)}` };
  }
}

// Pushes the row and records the outcome on it. Never throws.
export async function syncSubscriber(row) {
  const result = await pushSubscriber(row);
  if (result.skipped || !row.id) return result;
  try {
    await supabase(`subscribers?id=eq.${row.id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: result.ok
        ? { brevo_synced_at: new Date().toISOString(), brevo_error: null }
        : { brevo_error: result.status }
    });
  } catch (err) {
    console.error("brevo: recording the sync result failed", err);
  }
  return result;
}

function pending(row) {
  return !row.brevo_synced_at || new Date(row.brevo_synced_at) < new Date(row.updated_at);
}

// Pushes every row whose Brevo copy is missing or out of date (every row with
// all: true), oldest first, up to limit rows. Returns counts for the caller.
export async function syncPending({ all = false, limit = Infinity, log = () => {} } = {}) {
  if (!brevoConfigured()) throw new Error("Set BREVO_API_KEY and BREVO_LIST_ID first");
  const page = 1000;
  const rows = [];
  for (let offset = 0; ; offset += page) {
    const batch = await supabase(`subscribers?select=*&order=updated_at.asc&limit=${page}&offset=${offset}`);
    rows.push(...batch.filter((row) => all || pending(row)));
    if (batch.length < page || rows.length >= limit) break;
  }

  const counts = { checked: 0, synced: 0, failed: 0 };
  for (const row of rows.slice(0, limit)) {
    counts.checked += 1;
    const result = await syncSubscriber(row);
    if (result.ok) counts.synced += 1;
    else counts.failed += 1;
    log(`${row.email}: ${result.status}`);
  }
  return counts;
}
