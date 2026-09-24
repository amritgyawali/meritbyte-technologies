// Minimal Supabase REST (PostgREST) client, so the site needs no SDK.
// Server side only: it uses the service role key, which bypasses row level
// security. Used by the API routes and by scripts/send-campaign.mjs.

export async function supabase(path, { method = "GET", body, prefer } = {}) {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }

  const headers = { apikey: key, "Content-Type": "application/json", Accept: "application/json" };
  // Legacy service_role keys are JWTs and also go in Authorization.
  // The newer sb_secret_ keys are only accepted in the apikey header.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  if (prefer) headers.Prefer = prefer;

  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase ${method} ${path.split("?")[0]} responded ${res.status}: ${text.slice(0, 200)}`);
  }
  return text ? JSON.parse(text) : null;
}
