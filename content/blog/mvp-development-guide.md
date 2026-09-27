---
title: How to Build an MVP: Scope, Budget and the First 90 Days
seoTitle: MVP Development Guide: Scope, Budget and First 90 Days
description: MVP development explained: how to scope a minimum viable product, what an MVP typically costs in 2026, examples that worked, and a plan for the first 90 days.
date: 2026-09-27
category: software-and-ai
order: 47
keywords: ["mvp development", "how to build an mvp", "mvp cost", "minimum viable product examples"]
summary: An MVP (minimum viable product) is the smallest version of a product that lets users complete one core job, so you learn whether they value it. Good MVP development means one user type, one workflow and one metric, built in weeks. Budgets vary widely: a few thousand dollars for a no-code test, tens of thousands for a coded web app.
takeaways: ["An MVP exists to answer one question about your customers; if it cannot fail a clear test, it is not an MVP.", "Cut user roles, admin screens, native apps and custom login before cutting quality in the one workflow that matters.", "Several well-known MVPs were barely software: a demo video, a landing page, or a manual service behind a simple website.", "Use a plain, mainstream stack: one web app, one PostgreSQL database, managed hosting and Stripe for payments.", "Set the success metric before launch, and judge the result on retention and willingness to pay, not sign-ups."]
related: ["custom-software-development-cost", "mobile-app-development-cost", "pwa-vs-native-app"]
services: ["software-development", "ui-ux-design", "mobile-app-development"]
---

MVP development means building the smallest thing that lets real users do one job with your product, so you can find out whether they want it before spending a full budget. In practice that is one type of user, one core workflow and one number that tells you whether it worked, launched to real people in roughly two to three months. This guide covers how to build an MVP: scoping it, what it typically costs in 2026, and what to do in the first 90 days.

## What is a minimum viable product, really?

Eric Ries, who popularized the term in *The Lean Startup* (2011), described the MVP as the version of a product that lets a team collect the most validated learning about customers with the least effort. The important word is learning: an MVP is an experiment, not a cheap version 1.0.

"Viable" means it has to work for the job it claims to do. A checkout that fails half the time tells you nothing about demand. "Minimum" means everything that does not serve the experiment is cut, however much you like it.

A useful test: write down what result would make you stop. If no result would, you are building a product launch, not an MVP.

## What are some minimum viable product examples?

Several well-known companies tested demand before building the full product, and some of their MVPs contained almost no software.

- **Dropbox.** Before the product was ready for the public, Drew Houston published a short video demonstrating file sync, and used the flood of beta sign-ups to judge demand.
- **Zappos.** Founder Nick Swinmurn photographed shoes in local stores and listed them online. When someone ordered, he bought the pair at retail and shipped it. The question was whether people would buy shoes online at all.
- **Airbnb.** In 2007 the founders rented air mattresses in their San Francisco apartment to conference visitors, using a simple website.

Those examples map onto four common MVP types:

| MVP type | What you build | What it tests | Good when |
| --- | --- | --- | --- |
| Landing page or smoke test | A page with the offer, price and a sign-up or pre-order button | Demand and price | You do not yet know if anyone wants it |
| Concierge or "Wizard of Oz" | A simple front end; people do the work behind it | Whether the outcome is valued | The process is unclear or costly to automate |
| No-code | An app built in Bubble, Glide, Softr or Airtable | Workflow and usability | Data and logic are simple and users are few |
| Single-feature coded app | A web app that does one job well | Retention and willingness to pay | The software itself is the value |

## How do you scope an MVP?

Write the one sentence the MVP must prove, then cut everything that does not help prove it.

1. **Write the hypothesis.** For example: "Independent clinics will pay a monthly fee to stop taking appointment requests by phone."
2. **Choose one user type.** In a two-sided marketplace, start with the harder side and handle the other side manually if you can.
3. **Map the core workflow** in five to ten steps, from sign-up to the moment the user gets value.
4. **Set the success metric and threshold before building,** such as "a third of pilot clinics take most of their bookings through it by week four". The exact numbers are yours to choose; the point is choosing them in advance.
5. **Write the "not in the MVP" list** and share it with everyone involved.

Usually safe to cut in version one: multiple roles and permissions, a custom admin panel (use a database admin tool), native mobile apps (a responsive web app or PWA first, as our [PWA vs native app comparison](/blog/pwa-vs-native-app) explains), custom login (use Clerk, Auth0 or Supabase Auth), custom billing (use Stripe Checkout), multiple languages and most integrations.

Not safe to cut: basic security, backups, the quality of the core workflow, analytics that measure your metric, and an easy way for users to talk to you.

## How much does MVP development cost?

MVP cost varies widely with type and team. The table shows typical 2026 market ranges, not quotes.

| MVP type | Typical market range (varies) | Typical time to launch |
| --- | --- | --- |
| Landing page or smoke test | Under $2,000, plus ad spend | 1-2 weeks |
| No-code MVP | $3,000-$20,000 | 2-6 weeks |
| Coded web MVP | $20,000-$80,000 | 8-14 weeks |
| Mobile MVP with a backend | $40,000-$120,000 | 10-16 weeks |

Payments, integrations, regulated data (health or finance) and anything real-time push a project toward the top of its band. Keep a meaningful share of the budget, a third is a sensible starting point, for the changes you will need once real users arrive. Our guides to [custom software development cost](/blog/custom-software-development-cost) and [mobile app development cost](/blog/mobile-app-development-cost) break down the estimates in more detail.

## What should the first 90 days look like?

Two weeks to scope and prototype, about eight weeks to build and launch to a small group, and the remaining weeks learning from real usage.

| Days | Focus | Output |
| --- | --- | --- |
| 1-14 | Hypothesis, workflow, clickable prototype in Figma tested with about five target users | Agreed scope, metric and estimate |
| 15-70 | Build in two-week increments, each ending with a demo | Working software on a staging URL |
| 71-80 | Private launch to users you recruited yourself | Real usage data |
| 81-90 | User interviews, retention check, decision | Continue, change direction or stop |

Five users per prototype round is not arbitrary: Nielsen Norman Group has long argued that small rounds of about five users uncover most usability problems, and that several small rounds beat one large one.

## Which technology should an MVP use?

Whatever your developers know best, provided it is mainstream and easy to hire for. Novel technology is a risk you do not need while testing a business idea.

A typical choice is a Next.js or React front end, a Node.js, Python or .NET backend, and PostgreSQL, deployed on a managed platform or on managed services from AWS, Azure or Google Cloud. Avoid microservices, Kubernetes and a custom design system at this stage; they solve problems you will only have if the MVP succeeds.

If you start on a no-code tool, plan the exit early. Several no-code platforms, Bubble among them, do not export source code, so moving to custom code later is a rebuild. Keep your data exportable and write down the workflows your users depend on.

## How do you know if the MVP worked?

Look at retention and willingness to pay, not sign-ups. Sign-ups measure your marketing; retention measures your product.

- **Activation:** the share of sign-ups who complete the core workflow at least once.
- **Retention:** the share who come back and do it again in week two and week four, tracked by weekly cohort.
- **Willingness to pay:** pre-orders, paid pilots, or signed letters of intent for B2B products.
- **The Sean Ellis question:** ask active users how they would feel if they could no longer use the product. Ellis suggested that when 40% or more say "very disappointed", you are close to product-market fit.

Then make the decision you committed to in advance: continue, change direction or stop. Stopping after 90 days and a modest budget is a good outcome compared with stopping after two years.

## How Meritbyte Technologies builds MVPs

Meritbyte Technologies is a Nepal-based web and software development company that builds MVPs for founders and for established companies testing a new product line. The way our engagements run suits MVP work: a free scoping conversation that returns a scope, a timeline and a number; a fixed price for the first milestone; then two-week blocks, each ending with a demo, with the option to stop at the end of any block.

You get one project manager, a written update every week and a staging URL you can share with early users and investors. The code, repository, domain and hosting are in your name from the first day. If you are a US founder, Nepal's evening overlaps your morning, and our [US page](/website-developer/usa) explains how that works day to day. See also our [custom software development](/services/software-development) service and our page for [startups and SaaS companies](/industries/startups-and-saas).

## Frequently asked questions

### How long does it take to build an MVP?

Most coded web MVPs take about 8-14 weeks from agreed scope to a private launch, and landing-page or no-code tests can run within a few weeks. If an estimate for "an MVP" is six months or more, the scope usually describes a full product. Cut roles, integrations and admin features until the core workflow can launch within about a quarter.

### Should my MVP be a mobile app or a web app?

Start with a responsive web app or PWA unless the core value depends on phone hardware, such as background location, the camera, Bluetooth or offline use in the field. A web app needs no store review, can be updated daily and works on every device. Build native or cross-platform apps once you know users come back.

### Can I build an MVP on no-code and move to custom code later?

Yes, and it is often sensible. Tools such as Bubble, Glide and Softr are good for testing workflows cheaply. Plan the exit, though: many no-code platforms do not export source code, so the move is a rebuild rather than a migration. Keep data exportable and document the workflows users rely on before you switch.

### Who should own the MVP's code and accounts?

You should, from day one. The code repository, hosting or cloud account, domain, app store accounts and analytics should all be registered to your company, with developers invited as users. Investors and acquirers will ask about it during due diligence, and changing vendors later is far easier when nothing has to be transferred out of someone else's name.
