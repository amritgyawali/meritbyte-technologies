import { NextResponse } from "next/server";

import { syncSubscriber } from "../../../lib/brevo.mjs";
import { CONSENT_TEXT, CONSENT_VERSION } from "../../../lib/consent.mjs";
import { supabase } from "../../../lib/supabase.mjs";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

function fail(error, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

// Saves the popup's business name and email to public.subscribers, then copies
// the contact to Brevo. Posting an address that is already there updates its
// business name and subscribes it again, with the new consent record.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail("missing");
  }

  // Bots fill every field; people never see this one. Pretend it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const business = clean(body.business, 120);
  const email = clean(body.email, 254).toLowerCase();
  if (!business) return fail("business");
  if (!EMAIL_RE.test(email)) return fail("email");
  if (body.consent !== true) return fail("consent");

  const now = new Date().toISOString();
  const fwd = request.headers.get("x-forwarded-for") || "";
  let saved;
  try {
    [saved] = await supabase("subscribers?on_conflict=email", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=representation",
      body: {
        business_name: business,
        email,
        subscribed: true,
        consent: true,
        consent_text: CONSENT_TEXT,
        consent_version: CONSENT_VERSION,
        consent_at: now,
        ip: fwd.split(",")[0].trim() || request.headers.get("x-real-ip") || null,
        user_agent: clean(request.headers.get("user-agent"), 300) || null,
        source: "meritbyte.com subscribe popup",
        unsubscribed_at: null,
        unsubscribe_reason: null
      }
    });
  } catch (err) {
    console.error("subscribe: saving to Supabase failed", err);
    return fail("server", 502);
  }

  // The row is saved, so the visitor is subscribed. A failed Brevo push is
  // recorded on the row and retried by the daily sync; it is not their problem.
  if (saved) {
    const brevo = await syncSubscriber(saved);
    if (!brevo.ok && !brevo.skipped) console.error("subscribe: Brevo sync failed", brevo.status);
  }
  return NextResponse.json({ ok: true });
}
