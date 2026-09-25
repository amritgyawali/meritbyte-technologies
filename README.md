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
3. On confirm, `app/api/signup/confirm/route.js` adds the contact to a Brevo
   list with the consent record as attributes (text agreed to, version, submit
   and confirm time and IP) and emails the owner the same record.

Environment variables are listed in `.env.example`. Run
`BREVO_API_KEY=... node scripts/brevo-setup.mjs` once to create the Brevo list
and attributes; it prints the `BREVO_LIST_ID` to set.
