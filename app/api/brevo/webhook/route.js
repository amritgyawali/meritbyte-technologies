import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { syncSubscriber } from "../../../../lib/brevo.mjs";
import { supabase } from "../../../../lib/supabase.mjs";

// Brevo calls this when a contact stops being mailable, so Supabase (the
// source of truth) learns about unsubscribes made through Brevo's own
// campaign footer, hard bounces and spam complaints.
//
// Brevo > Settings > Webhooks > Marketing (and Transactional), URL:
//   https://www.meritbyte.com/api/brevo/webhook?key=<BREVO_WEBHOOK_SECRET>
// events: Unsubscribed, Hard bounce, Marked as spam.

const STOP_EVENTS = new Set(["unsubscribe", "unsubscribed", "hardbounce", "spam", "complaint"]);

function keyMatches(given) {
  const expected = process.env.BREVO_WEBHOOK_SECRET || "";
  if (expected.length < 24) return false;
  const a = Buffer.from(String(given || ""));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
  if (!keyMatches(new URL(request.url).searchParams.get("key"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  // Brevo sends one event per call, but batched webhooks send an array.
  const events = Array.isArray(body) ? body : [body];
  let stopped = 0;
  for (const event of events) {
    const name = String(event?.event || "").toLowerCase().replace(/[^a-z]/g, "");
    const email = String(event?.email || "").trim().toLowerCase();
    if (!STOP_EVENTS.has(name) || !email) continue;

    let rows;
    try {
      rows = await supabase(`subscribers?email=eq.${encodeURIComponent(email)}&subscribed=eq.true`, {
        method: "PATCH",
        prefer: "return=representation",
        body: {
          subscribed: false,
          unsubscribed_at: new Date().toISOString(),
          unsubscribe_reason: String(event.event).slice(0, 40)
        }
      });
    } catch (err) {
      // A non-2xx makes Brevo retry the call later, which is what we want.
      console.error("brevo webhook: Supabase update failed", err);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    for (const row of rows || []) {
      stopped += 1;
      await syncSubscriber(row);
    }
  }
  return NextResponse.json({ ok: true, stopped });
}
