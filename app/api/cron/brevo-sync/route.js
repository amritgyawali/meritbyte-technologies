import { NextResponse } from "next/server";

import { brevoConfigured, syncPending } from "../../../../lib/brevo.mjs";

// Daily retry of Brevo pushes that failed when the visitor signed up
// (vercel.json schedules it). Vercel sends Authorization: Bearer <CRON_SECRET>.
// A small batch per run keeps it inside the function time limit; run
// scripts/brevo-sync.mjs for a full backfill.
export const maxDuration = 60;

export async function GET(request) {
  const secret = process.env.CRON_SECRET || "";
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!brevoConfigured()) {
    return NextResponse.json({ ok: true, skipped: "Brevo not configured" });
  }
  try {
    const counts = await syncPending({ limit: 100 });
    return NextResponse.json({ ok: true, ...counts });
  } catch (err) {
    console.error("cron brevo-sync failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
