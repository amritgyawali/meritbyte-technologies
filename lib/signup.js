// Double opt-in sign-up for the free website design offer.
//
// Nothing is stored until the person clicks the link in the confirmation
// email. The form data travels inside a signed token instead of a database
// row, so the site stays stateless: the token proves who asked, what they
// agreed to and when, and the confirmation click proves the address is theirs.
//
// On confirmation the contact is added to a Brevo list (when Brevo is
// configured) with the consent details as attributes, and the owner gets an
// email carrying the same proof.

import { createHmac, timingSafeEqual } from "node:crypto";

export const CONSENT_VERSION = "free-website-2026-09-25";
export const CONSENT_TEXT =
  "Yes, send me my free website design and occasional emails from Meritbyte " +
  "Technologies about websites and apps for my business. I can unsubscribe at any time.";

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
const FROM = "Meritbyte Technologies <ceo@meritbyte.com>";
const REPLY_TO = "ceo@meritbyte.com";

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

async function sendEmail({ to, subject, text }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: Array.isArray(to) ? to : [to],
      reply_to: REPLY_TO,
      subject,
      text
    })
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
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

async function brevoRequest(path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(body)
  });
  return res;
}

// Adds the confirmed contact to the Brevo list. Returns a short status string;
// never throws, because the owner email must still go out if Brevo is down.
export async function addToBrevo(payload, confirmedAt, confirmIp) {
  const listId = Number(process.env.BREVO_LIST_ID || 0);
  if (!process.env.BREVO_API_KEY || !listId) return "Brevo not configured - skipped";
  const attributes = {
    FIRSTNAME: payload.name,
    BUSINESS: payload.business,
    CITY: payload.city,
    PHONE_NUMBER: payload.phone,
    CONSENT_TEXT: CONSENT_TEXT,
    CONSENT_VERSION: CONSENT_VERSION,
    CONSENT_SOURCE: "meritbyte.com/free-website (double opt-in)",
    CONSENT_AT: new Date(payload.at).toISOString(),
    CONSENT_IP: payload.ip,
    CONFIRMED_AT: confirmedAt,
    CONFIRM_IP: confirmIp
  };
  try {
    let res = await brevoRequest("/contacts", {
      email: payload.email,
      attributes,
      listIds: [listId],
      updateEnabled: true
    });
    if (res.status === 400) {
      // Usually an attribute that was never created in Brevo. Keep the
      // contact and its list membership; the proof is in the owner email.
      res = await brevoRequest("/contacts", {
        email: payload.email,
        attributes: { FIRSTNAME: payload.name },
        listIds: [listId],
        updateEnabled: true
      });
      if (res.ok) return `added to Brevo list ${listId} (consent attributes missing - run scripts/brevo-setup.mjs)`;
    }
    if (res.ok) return `added to Brevo list ${listId}`;
    return `Brevo error ${res.status}: ${(await res.text()).slice(0, 160)}`;
  } catch (err) {
    return `Brevo unreachable: ${String(err?.message || err).slice(0, 160)}`;
  }
}

export async function notifyOwner(payload, confirmedAt, confirmIp, brevoStatus) {
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
    `Brevo: ${brevoStatus}`,
    "",
    "Next: send them a design idea within a day. Reply from ceo@meritbyte.com."
  ].join("\n");
  await sendEmail({
    to: owners,
    subject: `New sign-up: ${payload.business} (${payload.email})`,
    text
  });
}
