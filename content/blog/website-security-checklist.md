---
title: Website Security Checklist for Small Businesses
seoTitle: Website Security Checklist for Small Businesses (2026)
description: A practical website security checklist for small businesses: MFA, updates, backups, TLS, a WAF, security headers, the OWASP Top 10 and WordPress steps.
date: 2026-09-27
category: web-development
order: 50
keywords: ["website security checklist", "how to secure a website", "wordpress security", "small business cybersecurity"]
summary: A small business website security checklist covers eight basics: multi-factor authentication on every admin, hosting, domain and email account; prompt updates; least-privilege access; HTTPS with modern TLS; tested off-site backups; a web application firewall; security headers; and a review of any custom code against the OWASP Top 10. Automated attacks look for exactly these gaps.
takeaways: ["Turn on MFA for the domain registrar, hosting, CMS admin and email first; those accounts can take over everything else.", "Plugins and themes, not WordPress core, account for most published WordPress vulnerabilities, so remove what you do not use and update what you keep.", "A backup you have never restored is a hope, not a backup; keep one copy outside your hosting account.", "A WAF and security headers reduce exposure, but they do not replace patching and secure code.", "Write a one-page incident plan before you need it: who to call, how to restore, which credentials to rotate."]
related: ["website-maintenance-guide", "nextjs-vs-wordpress", "legacy-system-modernization"]
services: ["cybersecurity", "wordpress-development", "managed-it-services"]
---

A website security checklist for a small business does not need to be long, but every item on it needs to be done. Lock down the accounts that control the site with multi-factor authentication, keep software updated, give people only the access they need, serve everything over HTTPS, keep tested backups where an attacker cannot reach them, and put a web application firewall and security headers in front. Then check any custom code against the OWASP Top 10.

## Why would anyone attack a small business website?

Because attacks are automated. Bots scan the internet around the clock for known vulnerable plugins, weak passwords and exposed admin pages, and they do not care how small you are.

What they want is often your site's resources rather than your secrets: to host phishing pages on your domain, inject card-skimming scripts into a checkout, redirect visitors to scams, or harvest customer data. Google Safe Browsing can also put a warning in front of a compromised site, and cleaning up takes days you did not plan for.

## What should a website security checklist include?

Eight areas, each with a minimum to reach now and a better level to aim for.

| Area | Minimum | Better |
| --- | --- | --- |
| Accounts | MFA on the registrar, DNS, hosting, CMS, email and payment accounts | Passkeys or hardware keys for owners; single sign-on for staff |
| Updates | Security releases for the CMS, plugins, framework and server applied within days | Automatic minor updates; major updates tested on staging first |
| Access | Individual accounts, no shared logins | Least-privilege roles and a quarterly access review |
| Transport | HTTPS everywhere with TLS 1.2 or 1.3 | HSTS and automatic certificate renewal |
| Backups | Daily, automatic, stored off-site | Three copies, one immutable, restore tested every quarter |
| Perimeter | A WAF and login rate limiting | Bot management and restricted admin access |
| Headers | HSTS, nosniff and frame protection | A Content Security Policy |
| Monitoring | Uptime alerts and Search Console notifications | Log alerts and file-change detection |

## How do you secure the accounts that control your website?

With multi-factor authentication and least privilege on every account that could change your site, starting with the domain registrar. Whoever controls your domain controls your website and your email.

- **Registrar:** MFA, the registrar transfer lock, and a contact email you will still have if the domain's own email breaks.
- **Everything else that matters:** hosting, DNS, CMS admin, Google Workspace or Microsoft 365, the payment gateway, Search Console and analytics.
- **Stronger factors first:** authenticator apps, passkeys or hardware security keys rather than SMS codes, which can be stolen through SIM-swap fraud.
- **One login per person:** no shared "admin" account. Remove former staff and former agencies on the day they leave.
- **Least privilege:** content editors get the Editor role, not Administrator; developers work on staging; an agency gets its own user on your account, never your owner login.
- **A password manager** such as Bitwarden or 1Password for the whole team.

## How quickly should you apply updates?

Apply security releases within days, not at the next redesign. Once a fix is published, the vulnerability it patches is public knowledge too.

For WordPress security, the pattern is well documented: vendors that track WordPress vulnerabilities, such as Wordfence and Patchstack, consistently report that the large majority are in plugins and themes rather than WordPress core.

- Delete plugins and themes you do not use; deactivated code still sits on the server.
- Choose plugins that are updated regularly and have active maintainers.
- Keep automatic minor core updates on (the default), and test major updates on a staging copy.
- Disable file editing in the dashboard with `DISALLOW_FILE_EDIT`, and turn off XML-RPC if nothing uses it.

For custom sites and apps built with Next.js, Node.js, Laravel or .NET, turn on dependency alerts such as GitHub Dependabot, and keep the framework on a version that still receives security fixes. Our [website maintenance guide](/blog/website-maintenance-guide) covers how to budget for this, and our comparison of [Next.js vs WordPress](/blog/nextjs-vs-wordpress) looks at how the two differ in upkeep.

## Is HTTPS enough to make a website secure?

No. HTTPS, provided by TLS, encrypts traffic between the visitor and your server, which is essential, but it does nothing about vulnerable plugins, weak passwords or insecure code.

- Serve every page over HTTPS, with a free certificate from Let's Encrypt or your host or CDN, renewed automatically.
- Allow only TLS 1.2 and 1.3. TLS 1.0 and 1.1 were formally deprecated by the IETF in RFC 8996 in 2021.
- Redirect all HTTP requests to HTTPS and add an HSTS header.
- Check the configuration with the free [SSL Labs server test](https://www.ssllabs.com/ssltest/).

## How should you back up a website?

Automatically, off-site, with several versions kept, and proven by actually restoring.

- Follow the 3-2-1 rule: three copies of your data, on two different types of storage, with one copy off-site.
- Keep at least one copy outside your hosting account, in separate cloud storage with its own credentials and ideally immutability (such as S3 Object Lock), so a hijacked hosting account or ransomware cannot delete the backups as well.
- Back up the database, uploads and configuration together.
- Keep enough history to go back to before an infection you did not notice straight away; 30 days of daily backups is a reasonable floor.
- Restore to a staging site every quarter and time how long it takes.

## Do you need a web application firewall?

For most business sites, yes. A WAF inspects web requests and blocks common attack patterns and abusive bots before they reach your application, and it is cheap or included with a CDN.

Options include Cloudflare (whose free plan includes a basic managed ruleset), Sucuri, Wordfence at the WordPress level, AWS WAF, Azure Web Application Firewall and Google Cloud Armor. Add rate limiting on login and forms, a challenge such as Cloudflare Turnstile on public forms, and restrict admin areas by IP address or put them behind single sign-on.

A WAF does not fix vulnerable code, and attackers can bypass it if your server's real IP address is public, so configure the origin to accept traffic only from the WAF or CDN.

## Which security headers should a website send?

Headers that force HTTPS, stop your pages being framed or sniffed, limit what leaks to other sites and, ideally, restrict which scripts can run.

| Header | What it does | Starting value |
| --- | --- | --- |
| Strict-Transport-Security | Forces HTTPS on future visits | `max-age=31536000; includeSubDomains` once every subdomain supports HTTPS |
| Content-Security-Policy | Limits where scripts, styles and frames load from; the main defense against injected scripts | Start in report-only mode, then enforce |
| X-Content-Type-Options | Stops browsers guessing file types | `nosniff` |
| X-Frame-Options, or CSP frame-ancestors | Prevents clickjacking through framing | `DENY`, or `frame-ancestors 'self'` |
| Referrer-Policy | Limits URL data sent to other sites | `strict-origin-when-cross-origin` |
| Permissions-Policy | Switches off browser features you do not use | `camera=(), microphone=(), geolocation=()` |

Mozilla's HTTP Observatory will scan your headers for free and explain each result.

## What is the OWASP Top 10, and does it matter for a small business?

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is the Open Worldwide Application Security Project's list of the most critical web application security risks. It matters whenever your site has custom code: a booking system, a customer login, a bespoke checkout or an API. Broken access control has been at the top of the list since the 2021 edition.

| Risk | What it looks like on a small business site | Fix |
| --- | --- | --- |
| Broken access control | Changing the order number in a URL shows another customer's order | Check permissions on the server for every request |
| Injection | A search box passes input straight into a database query | Parameterized queries and input validation |
| Security misconfiguration | Debug mode left on, default passwords, directory listing | A hardened configuration checklist per environment |
| Cryptographic failures | Passwords stored with weak hashing | bcrypt or Argon2 hashing, TLS everywhere |
| Vulnerable and outdated components | An old library or plugin with a published exploit | Dependency alerts and prompt patching |
| Authentication failures | Unlimited login attempts, no MFA, guessable reset links | Rate limiting, MFA, secure session handling |

For payments, never store card numbers. Use a hosted checkout from Stripe, PayPal or your local gateway, so card data never touches your server and your PCI DSS scope stays small.

## What should you do if your website is hacked?

Contain it, restore from a clean backup, close the hole, rotate every credential, and notify people if personal data was involved.

1. Put the site into maintenance mode if it is serving malware or skimming cards.
2. Keep the logs and a copy of the compromised site for investigation.
3. Rotate passwords, API keys and database credentials; end all sessions; look for new admin users.
4. Restore from a backup taken before the compromise, then patch the way in, or the attacker will be back.
5. Request a review in Google Search Console if the site was flagged.
6. Check your notification duties. Under GDPR and UK GDPR, a personal data breach that risks people's rights must usually be reported to the regulator within 72 hours of becoming aware of it; US states have their own rules, such as New York's SHIELD Act, covered on our [New York page](/website-developer/new-york).

## How Meritbyte Technologies approaches website security

Meritbyte Technologies is a Nepal-based web and software development company. Our [cybersecurity services](/services/cybersecurity) cover code and infrastructure review, penetration testing, hardening and incident plans, and our [managed IT services](/services/managed-it-services) handle the ongoing updates and backups.

For sites we build or maintain, the domain, hosting and admin credentials stay in the client's name, with our team as invited users you can remove at any time. Updates are tested on a staging URL before they reach the live site, and documentation comes at handover. If a managed platform would remove most of this work for your business, we will say so.

## Frequently asked questions

### How often should I back up my website?

Match the schedule to how often the site changes. A brochure site edited monthly can manage with daily backups kept for 30 days; an online store or booking site taking orders all day needs database backups several times a day or continuous point-in-time recovery. Whatever the schedule, keep one copy outside your hosting account and test a restore every quarter.

### Is WordPress secure enough for a business website?

WordPress core is actively maintained and has a dedicated security team. Most problems come from outdated or poorly maintained plugins and themes, weak admin passwords and neglected hosting. A WordPress site with a small set of well-chosen plugins, automatic updates, MFA and a WAF is a reasonable choice for most businesses; one with dozens of plugins and no maintenance plan is not.

### Does my host's firewall mean I do not need a WAF?

Not necessarily. Many hosts run a network firewall that blocks unused ports and some attacks, but a web application firewall inspects the web requests themselves for patterns such as SQL injection, abusive bots and login attacks. Ask your host exactly what their firewall covers. If it does not inspect web traffic, add a WAF through your CDN or a security plugin.

### What does a website security audit involve?

A useful audit checks accounts and access, software versions, server and TLS configuration, security headers, backups and any custom code against the OWASP Top 10, often with a penetration test of logins, forms and payment flows. You should receive a prioritized list of findings with fixes, not just a scanner export. Ask for a re-test after fixes to confirm they worked.
