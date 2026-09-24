# Meritbyte Technologies

Marketing site for Meritbyte Technologies. Next.js App Router, no UI framework,
plain CSS in `app/globals.css`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to .next
```

## Layout

- `app/page.jsx` — the whole page. Copy lives in the arrays at the top
  (`practices`, `support`, `steps`, `engagements`), so editing text does not
  mean touching markup.
- `app/globals.css` — design tokens at the top, then sections in the order they
  appear on the page. Light and dark share one set of variable names.
- `app/theme-toggle.jsx` — the only client component on the site. The matching
  boot script in `app/layout.jsx` sets the theme before first paint.

The contact address is `hello@meritbyte.com`, set once as `EMAIL` in
`app/page.jsx`.

## Free website sign-up (`/free-website`)

A double opt-in form for small businesses asking for a free website design.

1. The form posts to `app/api/signup/route.js`, which emails a confirmation
   link through Resend. Nothing is stored yet: the form data rides inside a
   signed token (`lib/signup.js`), valid for 7 days.
2. The link opens `/free-website/confirm`, which shows a **Confirm** button.
   Confirmation is a POST so mail scanners that pre-open links cannot confirm
   on someone's behalf.
3. On confirm, `app/api/signup/confirm/route.js` adds the contact to a Brevo
   list with the consent record as attributes (text agreed to, version, submit
   and confirm time and IP) and emails the owner the same record.

Environment variables are listed in `.env.example`. Run
`BREVO_API_KEY=... node scripts/brevo-setup.mjs` once to create the Brevo list
and attributes; it prints the `BREVO_LIST_ID` to set.
