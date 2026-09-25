// One-off transactional email (sign-up confirmation, owner notice).
//
// MAIL_PROVIDER picks the sender: "brevo" or "resend" (the default, because
// Resend already has meritbyte.com verified). Switch to "brevo" only after
// meritbyte.com is authenticated in Brevo and ceo@meritbyte.com is a verified
// sender there. If the chosen provider fails and the other one is configured,
// the email goes out through the other one instead.

export const FROM_NAME = "Meritbyte Technologies";
export const FROM_EMAIL = "ceo@meritbyte.com";

async function viaResend({ to, subject, text }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      reply_to: FROM_EMAIL,
      subject,
      text
    })
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}

async function viaBrevo({ to, subject, text }) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY is not set");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: to.map((email) => ({ email })),
      replyTo: { email: FROM_EMAIL },
      subject,
      textContent: text
    })
  });
  if (!res.ok) {
    throw new Error(`Brevo responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}

const PROVIDERS = {
  brevo: { send: viaBrevo, key: "BREVO_API_KEY" },
  resend: { send: viaResend, key: "RESEND_API_KEY" }
};

export async function sendEmail({ to, subject, text }) {
  const recipients = Array.isArray(to) ? to : [to];
  const first = process.env.MAIL_PROVIDER === "brevo" ? "brevo" : "resend";
  const second = first === "brevo" ? "resend" : "brevo";
  try {
    await PROVIDERS[first].send({ to: recipients, subject, text });
  } catch (err) {
    if (!process.env[PROVIDERS[second].key]) throw err;
    console.error(`mail: ${first} failed, sending through ${second}`, err);
    await PROVIDERS[second].send({ to: recipients, subject, text });
  }
}
