import { NextResponse } from "next/server";

import { supabase } from "../../../lib/supabase.mjs";

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Two callers:
// - the Unsubscribe button on /unsubscribe (form field t, redirects back), and
// - mail apps' one-click unsubscribe (RFC 8058): a POST to ?t=... with the
//   body List-Unsubscribe=One-Click, which only wants a status code.
// POST only, so mail scanners that pre-open links cannot unsubscribe anyone.
export async function POST(request) {
  const url = new URL(request.url);
  let token = url.searchParams.get("t") || "";
  let oneClick = false;
  try {
    const form = await request.formData();
    token = String(form.get("t") || token);
    oneClick = form.get("List-Unsubscribe") === "One-Click";
  } catch {
    // No form body; the token from the query string is all there is.
  }

  const back = (query) =>
    oneClick
      ? new NextResponse(null, { status: query === "done=1" ? 200 : 400 })
      : NextResponse.redirect(new URL(`/unsubscribe?${query}`, request.url), 303);

  if (!TOKEN_RE.test(token)) return back("error=link");
  try {
    await supabase(`subscribers?unsubscribe_token=eq.${token}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: { subscribed: false, unsubscribed_at: new Date().toISOString() }
    });
  } catch (err) {
    console.error("unsubscribe: Supabase update failed", err);
    return back(`error=server&t=${token}`);
  }
  return back("done=1");
}
