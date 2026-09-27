---
title: Legacy System Modernization: Rewrite, Refactor or Replace?
seoTitle: Legacy System Modernization: Rewrite, Refactor or Replace?
description: Legacy system modernization compared: when to rewrite, refactor, replatform or replace with SaaS, how the strangler fig approach works, and what to ask a vendor.
date: 2026-09-27
category: software-and-ai
order: 49
keywords: ["legacy system modernization", "legacy application modernization", "rewrite vs refactor", "software modernization strategy"]
summary: Legacy system modernization usually works best in stages. Refactor or replatform when the business logic is sound but the technology is outdated; replace with SaaS when the process is standard, such as accounting or HR; rewrite only small or truly unsalvageable systems. Most teams move one capability at a time while the old system keeps running (the strangler fig approach).
takeaways: ["Modernize for a business reason (unsupported software, slow changes, hiring risk, integration limits), not because the code is old.", "A big-bang rewrite is the riskiest option; moving one capability at a time keeps the business running.", "If a process is not what makes you different, buying SaaS usually beats rebuilding it.", "Record what the old system actually does with tests before changing it, and plan data migration as a project of its own.", "Lifting an old application onto cloud servers unchanged removes hardware risk but leaves every other problem in place."]
related: ["custom-software-development-cost", "aws-vs-azure-vs-google-cloud", "website-security-checklist"]
services: ["software-development", "cloud-devops", "qa-testing"]
---

Legacy system modernization comes down to four broad choices: keep the system and contain its risks, move it to a supported platform with minimal changes, rebuild or refactor it in stages, or replace it with an off-the-shelf product. For most businesses the answer is a mix, delivered one piece at a time while the old system keeps working. The single big-bang rewrite is the riskiest of these, and the one most often chosen for the wrong reasons.

## When does a legacy system need modernizing?

When it is costing you money, security or options, not simply because it is old. A stable old system that rarely changes may be best left alone, with backups and monitoring.

Signals that it is time:

- **The platform is out of support.** Python 2 reached end of life on January 1, 2020; AngularJS support ended on December 31, 2021; Windows Server 2012 R2 left extended support on October 10, 2023; CentOS 7 reached end of life on June 30, 2024; PHP 8.1 stopped receiving security fixes at the end of 2025. Out of support means no more security patches.
- **One person understands it,** and they are close to retiring or already work as a contractor.
- **Small changes take weeks** because nothing is tested and everything is connected to everything else.
- **You cannot hire for it:** Visual Basic 6, classic ASP, Delphi, Microsoft Access, or a framework written in-house years ago.
- **Integrations run on nightly CSV exports** and a spreadsheet someone updates by hand.
- **Customers or auditors ask for what it cannot do:** single sign-on, MFA, audit logs, an API, or a screen that works on a phone.
- **Security reviews keep finding the same problems,** often the items on our [website security checklist](/blog/website-security-checklist).

## What are the options for legacy application modernization?

Consultancies describe the choices as the "Rs" of modernization; Gartner's original list had five and AWS now uses seven. Stripped of jargon, they look like this:

| Option | What happens | Cost and risk | Choose it when |
| --- | --- | --- | --- |
| Retain | Keep it, isolate it, monitor it | Lowest | It works, rarely changes and can be protected |
| Retire | Switch it off | Low | Few people use it, or another system already does the job |
| Rehost (lift and shift) | Move it as-is to new servers or the cloud | Low to medium | Hardware or the data center is the urgent problem, not the code |
| Replatform | Small changes so it runs on a supported OS, runtime or managed database | Medium | The code is fine but the platform is end-of-life |
| Refactor | Restructure and upgrade the code in place, piece by piece | Medium, spread over time | The business logic is valuable and mostly correct |
| Rebuild | Write a new system from scratch | High | The system is small, or cannot be changed safely at all |
| Replace | Move to a SaaS product | Medium, mostly migration and retraining | The process is standard: accounting, HR, CRM, help desk |

The last row is often the cheapest long-term answer and the hardest to accept. If a process is not what makes your business different, bending it slightly to fit a mature SaaS product usually beats paying to maintain a custom version forever.

## Rewrite vs refactor: which is safer?

Refactoring in stages is safer in most cases, because the business has a working system at every step. A rewrite looks cleaner on paper but routinely underestimates how much undocumented behavior the old system contains.

Joel Spolsky's 2000 essay "Things You Should Never Do, Part I" used Netscape's browser rewrite as the cautionary tale: code that looks ugly often encodes years of fixes for real-world cases nobody wrote down. That does not mean never rewrite. A rewrite makes sense when:

- the system is small enough to rebuild in a few months;
- the platform cannot run anywhere supported, such as a desktop application on a runtime that no longer installs;
- the business process itself is changing, so reproducing the old behavior is not the goal.

Even then, rebuild in slices and run old and new side by side, rather than switching everything over in one weekend.

## How does the strangler fig approach work?

You put a routing layer in front of the old system and move one capability at a time to new code, until the old system has nothing left to do and can be switched off. Martin Fowler named the pattern after strangler fig vines, which grow around a host tree until they replace it.

1. Place a proxy, API gateway or new front end in front of the old system, so requests can be routed feature by feature.
2. Choose a first slice that is valuable but low-risk: a report, a customer-facing lookup, a new integration.
3. Build it properly, with tests, reading from the old database or a synchronized copy if needed.
4. Route traffic to the new version and keep the old one available as a fallback.
5. Repeat slice by slice, deleting old code and tables as each one is retired.
6. Switch off the old system once nothing routes to it.

The cost is running two systems for a while and keeping their data in sync. The benefit is that every step delivers something usable, and you can pause or stop without being left with half a system.

## Why is data migration the hardest part?

Because old data holds years of workarounds that nobody documented. It deserves its own plan, owner and rehearsals.

- **Profile the data first:** blanks, duplicates, free-text fields used for three different purposes, dates stored as text.
- **Agree on mapping rules with the people who use the data,** not just from the database schema.
- **Write reconciliation checks:** record counts, totals and balances must match between old and new.
- **Rehearse the migration at least twice** on a copy of production, and time it.
- **Plan the cutover and the rollback,** including a freeze window when nobody edits data.

Michael Feathers' *Working Effectively with Legacy Code* (2004) defines legacy code simply as code without tests. The practical lesson applies here: before changing anything, write characterization tests that record what the system does today, odd behavior included, so you can prove the new version matches it.

## What drives the cost and timeline of legacy system modernization?

Integrations, data volume and the number of people whose work changes drive cost far more than lines of code. Rough shapes, which vary widely:

- **Replatforming one application** onto a supported OS, runtime and managed database: weeks to a few months.
- **Refactoring or rebuilding a core business system in stages:** many months to more than a year, delivered as a series of useful releases.
- **Replacing with SaaS:** the subscription is the small part; data migration, integrations, training and process changes are the real budget.

AI coding assistants now help with the reading: explaining unfamiliar code, drafting tests and suggesting translations between languages. They speed the work up, but their output still needs tests, review and people who understand the business rules. Our guide to [custom software development cost](/blog/custom-software-development-cost) explains how the build itself is usually priced, and our [cloud comparison](/blog/aws-vs-azure-vs-google-cloud) helps if the target platform is still undecided.

## What should you ask a modernization vendor?

- Which parts would you retain, replatform, refactor or replace, and why?
- What is the first slice you would move, and what does it deliver on its own?
- How will you capture the current system's behavior before changing it?
- What are the data migration, reconciliation and rollback plans?
- How long will old and new run side by side, and what does that cost?
- Who will understand the new system after you leave, and what documentation do we receive?
- Are the new code, repositories and cloud accounts in our name?

## How Meritbyte Technologies handles modernization

Meritbyte Technologies is a Nepal-based web and software development company working in TypeScript, Python, Go and .NET, with cloud work on AWS, Azure and Google Cloud. A lot of custom software work is replacement work: an Access database, a VB6 desktop tool, or a set of shared spreadsheets that the business now depends on.

Staged modernization fits the way our engagements run. The first milestone is fixed price, and for modernization a sensible first milestone is the first slice running in production. After that, work runs in two-week blocks with a demo at the end of each, and you can stop at the end of any block with a working system. You get one project manager, a written update every week, and documentation at handover, with code, repositories and cloud accounts in your name. Dealer portals and ERP integrations for manufacturers and distributors are common candidates; our [Chicago page](/website-developer/chicago) covers that kind of B2B work. See also our [custom software development](/services/software-development) and [cloud and DevOps](/services/cloud-devops) services.

## Frequently asked questions

### Is moving to the cloud the same as modernizing?

No. Moving an application to cloud servers unchanged, called rehosting, can remove hardware risk and data center costs, but the code, its dependencies and its limitations come along. It is a reasonable first step when hardware is the urgent problem. Real modernization changes how the application is built, run or bought, so it becomes cheaper and safer to change.

### Can we modernize while the old system is still in use?

Yes, and in most cases you should. The strangler fig approach routes one capability at a time to new code while the old system keeps handling everything else, so staff and customers keep working. It costs more in the short term, because two systems run in parallel, but it avoids betting the business on a single weekend cutover.

### What if nobody understands the old code anymore?

That is common, and fixable. Start by observing behavior: log inputs and outputs, interview the people who use the system daily, and write characterization tests that record what it does now. AI coding assistants can help explain unfamiliar code, but check their explanations against real behavior. Document as you go so the knowledge is not lost again.

### How long does legacy system modernization take?

Replatforming a single application can take a few weeks. Modernizing a core system in stages usually takes many months, delivered as a series of releases that are each useful on their own. Timelines depend mostly on integrations, data quality and how much the business process changes, not on lines of code. Be wary of a fixed date for rewriting a large system all at once.
