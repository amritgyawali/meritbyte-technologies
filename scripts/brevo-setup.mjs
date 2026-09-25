// One-time Brevo setup for the website sign-ups.
//
// Creates the contact attributes that hold the consent record, and one list
// for confirmed /free-website sign-ups and one for the subscribe popup, then
// prints the ids to put in BREVO_LIST_ID and BREVO_SUBSCRIBE_LIST_ID.
// Safe to re-run: anything that already exists is reported and left alone.
//
//   BREVO_API_KEY=xkeysib-... node scripts/brevo-setup.mjs

const KEY = process.env.BREVO_API_KEY;
if (!KEY) {
  console.error("Set BREVO_API_KEY first.");
  process.exit(1);
}

const LISTS = [
  ["BREVO_LIST_ID", "Free website design sign-ups (double opt-in)"],
  ["BREVO_SUBSCRIBE_LIST_ID", "Website subscribers (popup)"]
];
const ATTRIBUTES = [
  "SUBSCRIBER_ID",
  "BUSINESS",
  "CITY",
  "PHONE_NUMBER",
  "CONSENT_TEXT",
  "CONSENT_VERSION",
  "CONSENT_SOURCE",
  "CONSENT_AT",
  "CONSENT_IP",
  "CONFIRMED_AT",
  "CONFIRM_IP"
];

async function brevo(method, path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { "api-key": KEY, "Content-Type": "application/json", accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { status: res.status, ok: res.ok, data };
}

for (const name of ATTRIBUTES) {
  const r = await brevo("POST", `/contacts/attributes/normal/${name}`, { type: "text" });
  if (r.status === 401) {
    // Brevo blocks API calls from IPs not on its allowlist. Vercel's IPs change
    // on every deploy, so the site needs the allowlist switched off too.
    console.error(`Brevo refused the key: ${r.data.message || "unauthorized"}`);
    console.error("Fix: app.brevo.com/security/authorised_ips -> deactivate IP blocking, then re-run.");
    process.exit(1);
  }
  console.log(`attribute ${name}: ${r.ok ? "created" : `left as is (${r.status} ${r.data.message || ""})`}`);
}

const lists = await brevo("GET", "/contacts/lists?limit=50&offset=0");
let folderId;
const ids = [];
for (const [env, name] of LISTS) {
  const existing = (lists.data.lists || []).find((l) => l.name === name);
  if (existing) {
    ids.push(`${env}=${existing.id}`);
    continue;
  }
  if (!folderId) {
    const folders = await brevo("GET", "/contacts/folders?limit=10&offset=0");
    folderId = folders.data.folders?.[0]?.id;
    if (!folderId) folderId = (await brevo("POST", "/contacts/folders", { name: "Website" })).data.id;
  }
  const created = await brevo("POST", "/contacts/lists", { name, folderId });
  if (!created.ok) {
    console.error(`could not create the list "${name}":`, created.status, created.data);
    process.exit(1);
  }
  ids.push(`${env}=${created.data.id}`);
}
console.log(`\nSet these in Vercel and .env.local:\n${ids.join("\n")}`);
