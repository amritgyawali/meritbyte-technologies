# Meritbyte Technologies

Marketing site for Meritbyte Technologies. Next.js App Router, no UI framework,
plain CSS.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to .next
```

## Layout

The app has two route groups, each with its own root layout and stylesheet, so
the two designs never share CSS:

- `app/(home)/` — the home page (`/`). `page.jsx` reads the markup from
  `Meritbyte Homepage.dc.html` at build time; `home-page-client.jsx` handles
  the theme toggle, scroll reveal and loads the WebGL scene from
  `public/nexus.js`. Styles in `app/(home)/globals.css`.
- `app/(site)/` — `/free-website` (and its confirm page), `/subscribe` and
  `/unsubscribe`. Styles in `app/(site)/globals.css`; `theme-toggle.jsx` is
  the toggle for these pages.
- `app/subscribe-popup.jsx` — the subscribe popup, mounted by both layouts.
  Its home-page styles are in `app/(home)/subscribe.css`, scoped to
  `.subscribe`.

Both groups store the theme under the same `meritbyte-theme` key.

## Free website sign-up (`/free-website`)

A double opt-in form for small businesses asking for a free website design.

1. The form posts to `app/api/signup/route.js`, which emails a confirmation
   link through Resend. Nothing is stored yet: the form data rides inside a
   signed token (`lib/signup.js`), valid for 7 days.
2. The link opens `/free-website/confirm`, which shows a **Confirm** button.
   Confirmation is a POST so mail scanners that pre-open links cannot confirm
   on someone's behalf.
3. On confirm, `app/api/signup/confirm/route.js` saves the contact to
   `public.subscribers` in Supabase with the consent record (text agreed to,
   version, submit and confirm time and IP), copies it to a Brevo list and
   emails the owner the same record.

## Where the data lives and who sends the mail

Supabase is the source of truth; Brevo holds a copy and sends the email.

- Every sign-up (the `/free-website` form and the subscribe popup) is a row in
  `public.subscribers`. Run the SQL in `supabase/migrations/` in order.
- After saving, the route pushes the row to Brevo (`lib/brevo.mjs`):
  `/free-website` sign-ups to `BREVO_LIST_ID`, popup subscribers to
  `BREVO_SUBSCRIBE_LIST_ID`, with the consent record as contact attributes.
  The result is written back to the row (`brevo_synced_at`, `brevo_error`).
- A push that failed is retried by the daily cron `/api/cron/brevo-sync`
  (`vercel.json`), or at once with `npm run brevo:sync` (`-- --all` re-pushes
  every row).
- Unsubscribing on `/unsubscribe` marks the row and blocklists the address in
  Brevo. Unsubscribes, hard bounces and spam complaints that happen in Brevo
  come back through the webhook `/api/brevo/webhook?key=<BREVO_WEBHOOK_SECRET>`
  and mark the row too.
- Newsletters are written and sent in Brevo (Campaigns), to those lists.
  Brevo adds its own unsubscribe link.
- The confirmation and owner emails go through `MAIL_PROVIDER` (`lib/mail.mjs`):
  Resend by default, Brevo once meritbyte.com is authenticated there.

Brevo is for people who signed up here. Do not import scraped or bought lists
into it: Brevo's terms forbid it and it gets the account suspended.

## Setup

1. Supabase > SQL Editor: run the files in `supabase/migrations/` in order.
2. Brevo > Settings > Security > Authorised IPs: deactivate IP blocking (Vercel
   IPs change on every deploy). Create an API key.
3. `npm run brevo:setup` (with `BREVO_API_KEY` in `.env.local`) and copy the
   printed list ids.
4. Set every variable in `.env.example` in Vercel, then redeploy.
5. Brevo > Settings > Webhooks: add a Marketing webhook (and a Transactional one)
   to `https://meritbyte.com/api/brevo/webhook?key=<BREVO_WEBHOOK_SECRET>` for
   Unsubscribed, Hard bounce and Marked as spam.
6. `npm run brevo:sync` once to copy anyone who subscribed before Brevo was set up.
7. To send the confirmation emails through Brevo as well: authenticate
   meritbyte.com in Brevo > Senders, domains > Domains (add its DNS records in
   Vercel), verify ceo@meritbyte.com as a sender, then set `MAIL_PROVIDER=brevo`.
