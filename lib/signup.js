// Double opt-in sign-up for the free website design offer.
//
// Nothing is stored until the person clicks the link in the confirmation
// email. The form data travels inside a signed token instead of a database
// row, so the site stays stateless: the token proves who asked, what they
// agreed to and when, and the confirmation click proves the address is theirs.
//
// On confirmation the contact is saved to public.subscribers in Supabase with
// the consent record, copied to a Brevo list (lib/brevo.mjs), and the owner
// gets an email carrying the same proof.

import { createHmac, timingSafeEqual } from "node:crypto";

import { FREE_WEBSITE_SOURCE, pushSubscriber, syncSubscriber } from "./brevo.mjs";
import { sendEmail } from "./mail.mjs";
import { supabase } from "./supabase.mjs";

export const CONSENT_VERSION = "free-website-2026-09-25";
export const CONSENT_TEXT =
  "Yes, send me my free website design and occasional emails from Meritbyte " +
  "Technologies about websites and apps for my business. I can unsubscribe at any time.";

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

function secret() {
  const s = process.env.SIGNUP_SECRET || "";
  if (s.length < 24) {
    throw new Error("SIGNUP_SECRET is missing or shorter than 24 characters");
  }
  return s;
}

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

function sign(body) {
  return b64url(createHmac("sha256", secret()).update(body).digest());
}

export function makeToken(payload) {
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function readToken(token) {
  const [body, mac] = String(token || "").split(".");
  if (!body || !mac) return null;
  const expected = Buffer.from(sign(body));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!payload || typeof payload.at !== "number") return null;
  if (Date.now() - payload.at > TOKEN_MAX_AGE_MS) return null;
  return payload;
}

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

// Returns { ok: true, data } or { ok: false, error } with a short error code.
export function validate(form) {
  // Bots fill every field; people never see this one.
  if (clean(form.get("website"), 200)) return { ok: false, error: "spam" };

  const data = {
    email: clean(form.get("email"), 254).toLowerCase(),
    name: clean(form.get("name"), 80),
    business: clean(form.get("business"), 120),
    phone: clean(form.get("phone"), 30),
    city: clean(form.get("city"), 60)
  };
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: "email" };
  if (!data.name || !data.business) return { ok: false, error: "missing" };
  if (form.get("consent") !== "yes") return { ok: false, error: "consent" };
  return { ok: true, data };
}

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0].trim() || request.headers.get("x-real-ip") || "";
}

const SIGNATURE = [
  "",
  "--",
  "CEO of Meritbyte Technologies",
  "Mobile: +977-9715555771",
  "ceo@meritbyte.com",
  "https://meritbyte.com"
].join("\n");

export async function sendConfirmation(origin, payload) {
  const link = `${origin}/free-website/confirm?t=${encodeURIComponent(makeToken(payload))}`;
  const text = [
    `Namaste ${payload.name},`,
    "",
    `Thank you for asking for a free website design for ${payload.business}.`,
    "",
    "Please open this link and press the Confirm button:",
    link,
    "",
    "Once you confirm, we will prepare a design idea for your business and send it to this address.",
    "",
    "If you did not ask for this, ignore this email. Nothing happens and you will not hear from us again.",
    SIGNATURE
  ].join("\n");
  await sendEmail({
    to: payload.email,
    subject: `Confirm your free website design for ${payload.business}`,
    text
  });
}

// Saves the confirmed sign-up to Supabase and copies it to Brevo. Returns a
// short status line for the owner email; never throws, because the person did
// confirm and the owner email must still go out.
export async function saveSignup(payload, confirmedAt, confirmIp) {
  const row = {
    email: payload.email,
    business_name: payload.business,
    contact_name: payload.name,
    phone: payload.phone || null,
    city: payload.city || null,
    subscribed: true,
    consent: true,
    consent_text: CONSENT_TEXT,
    consent_version: CONSENT_VERSION,
    consent_at: new Date(payload.at).toISOString(),
    ip: payload.ip || null,
    confirmed_at: confirmedAt,
    confirm_ip: confirmIp || null,
    source: FREE_WEBSITE_SOURCE,
    unsubscribed_at: null,
    unsubscribe_reason: null
  };

  let saved = null;
  let dbStatus = "saved to Supabase";
  try {
    [saved] = await supabase("subscribers?on_conflict=email", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=representation",
      body: row
    });
  } catch (err) {
    console.error("signup: saving to Supabase failed", err);
    dbStatus = `NOT saved to Supabase (${String(err?.message || err).slice(0, 160)})`;
  }

  // Without a Supabase row there is nothing to record the result on, so push
  // the details straight to Brevo; scripts/brevo-sync.mjs cannot retry it.
  const brevo = saved ? await syncSubscriber(saved) : await pushSubscriber(row);
  return `${dbStatus}; ${brevo.status}`;
}

export async function notifyOwner(payload, confirmedAt, confirmIp, saveStatus) {
  const owners = (process.env.OWNER_EMAIL || "amritgyawali999@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const text = [
    "A business confirmed its request for a free website design.",
    "",
    `Business: ${payload.business}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `City: ${payload.city || "-"}`,
    "",
    "Consent record (keep this):",
    `  Agreed to: "${CONSENT_TEXT}"`,
    `  Consent version: ${CONSENT_VERSION}`,
    `  Form submitted: ${new Date(payload.at).toISOString()} from IP ${payload.ip || "-"}`,
    `  Email confirmed: ${confirmedAt} from IP ${confirmIp || "-"}`,
    "  Source: meritbyte.com/free-website, double opt-in",
    "",
    `Saved: ${saveStatus}`,
    "",
    "Next: send them a design idea within a day. Reply from ceo@meritbyte.com."
  ].join("\n");
  await sendEmail({
    to: owners,
    subject: `New sign-up: ${payload.business} (${payload.email})`,
    text
  });
}
