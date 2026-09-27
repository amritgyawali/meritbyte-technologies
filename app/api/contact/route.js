import { NextResponse } from "next/server";

import { clientIp, sendEmail } from "../../../lib/signup";

// The /contact form. Emails the enquiry to the owners (OWNER_EMAIL) with the
// visitor's address as Reply-To, so answering is one click. Nothing is stored.
// No acknowledgement goes to the visitor's address: anyone could type someone
// else's email into the form, and we must not send mail to people who did not ask.

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request) {
  const back = (query) =>
    NextResponse.redirect(new URL(`/contact?${query}#enquiry`, request.url), 303);

  let form;
  try {
    form = await request.formData();
  } catch {
    return back("error=missing");
  }

  // Bots fill every field; people never see this one. Pretend it worked.
  if (clean(form.get("website"), 200)) return back("sent=1");

  const data = {
    name: clean(form.get("name"), 80),
    email: clean(form.get("email"), 254).toLowerCase(),
    company: clean(form.get("company"), 120),
    country: clean(form.get("country"), 60),
    service: clean(form.get("service"), 80),
    budget: clean(form.get("budget"), 60),
    message: clean(form.get("message"), 5000)
  };
  if (!data.name || !data.message) return back("error=missing");
  if (!EMAIL_RE.test(data.email)) return back("error=email");

  const owners = (process.env.OWNER_EMAIL || "amritgyawali999@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const text = [
    "New enquiry from meritbyte.com/contact",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "-"}`,
    `Country: ${data.country || "-"}`,
    `Service: ${data.service || "-"}`,
    `Budget: ${data.budget || "-"}`,
    "",
    "Message:",
    data.message,
    "",
    `Sent ${new Date().toISOString()} from IP ${clientIp(request) || "-"}`,
    "Reply to this email to answer them directly."
  ].join("\n");

  try {
    await sendEmail({
      to: owners,
      subject: `Enquiry: ${data.name}${data.company ? ` (${data.company})` : ""}${data.service ? ` - ${data.service}` : ""}`,
      text,
      replyTo: data.email
    });
  } catch (err) {
    console.error("contact: sending the enquiry failed", err);
    return back("error=send");
  }
  return back("sent=1");
}
