// Copies public.subscribers from Supabase to Brevo.
//
// By default only rows whose Brevo copy is missing or out of date (a failed
// push, or rows saved before Brevo was set up). --all re-pushes every row.
// Subscribed rows join their Brevo list; unsubscribed rows are blocklisted.
//
//   node --env-file=.env.local scripts/brevo-sync.mjs [--all]
//
// Needs SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BREVO_API_KEY, BREVO_LIST_ID
// (and BREVO_SUBSCRIBE_LIST_ID if the popup has its own list).

import { syncPending } from "../lib/brevo.mjs";

try {
  const counts = await syncPending({ all: process.argv.includes("--all"), log: console.log });
  console.log(`\nchecked ${counts.checked}, synced ${counts.synced}, failed ${counts.failed}`);
  process.exit(counts.failed ? 1 : 0);
} catch (err) {
  console.error(String(err?.message || err));
  process.exit(1);
}
