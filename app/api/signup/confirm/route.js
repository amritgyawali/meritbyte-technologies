import { NextResponse } from "next/server";

import { addToBrevo, clientIp, notifyOwner, readToken } from "../../../../lib/signup";

// POST only. The emailed link opens a page with a Confirm button; a GET here
// would let mail scanners that pre-open links "confirm" on the person's behalf.
export async function POST(request) {
  const back = (query) =>
    NextResponse.redirect(new URL(`/free-website?${query}`, request.url), 303);

  let token = "";
  try {
    token = String((await request.formData()).get("t") || "");
  } catch {
    return back("error=link");
  }
  const payload = readToken(token);
  if (!payload) return back("error=link");

  const confirmedAt = new Date().toISOString();
  const confirmIp = clientIp(request);
  const brevoStatus = await addToBrevo(payload, confirmedAt, confirmIp);
  try {
    await notifyOwner(payload, confirmedAt, confirmIp, brevoStatus);
  } catch (err) {
    // The person did confirm; do not show them an error for our own mail.
    console.error("signup: owner notification failed", err, brevoStatus);
  }
  return back("confirmed=1");
}
