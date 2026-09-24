import { NextResponse } from "next/server";

import { CONSENT_VERSION, clientIp, sendConfirmation, validate } from "../../../lib/signup";

export async function POST(request) {
  const back = (query) =>
    NextResponse.redirect(new URL(`/free-website?${query}`, request.url), 303);

  let form;
  try {
    form = await request.formData();
  } catch {
    return back("error=missing");
  }

  const result = validate(form);
  if (!result.ok) {
    // Pretend a bot succeeded so it learns nothing.
    return back(result.error === "spam" ? "sent=1" : `error=${result.error}`);
  }

  const payload = {
    ...result.data,
    at: Date.now(),
    ip: clientIp(request),
    v: CONSENT_VERSION
  };

  try {
    await sendConfirmation(new URL(request.url).origin, payload);
  } catch (err) {
    console.error("signup: confirmation email failed", err);
    return back("error=send");
  }
  return back("sent=1");
}
