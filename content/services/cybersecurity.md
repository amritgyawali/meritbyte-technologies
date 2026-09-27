---
title: Cybersecurity
seoTitle: Cybersecurity Services | Audits and Pen Tests | Meritbyte
description: Cybersecurity services for growing businesses: code and infrastructure review, penetration testing under written authorization, hardening and an incident plan.
h1: Cybersecurity services that find the gaps before someone else does
lead: Code and infrastructure review against the OWASP Top 10, penetration testing under a signed scope, hardening, and an incident plan written before you need it.
summary: Meritbyte's cybersecurity services cover code and infrastructure review against the OWASP Top 10, penetration testing under a written scope and authorization, hardening of servers, cloud accounts and websites, and an incident response plan written before anything goes wrong. Findings are ranked by severity, with a fix list and a retest to confirm each fix.
keywords: ["cybersecurity services", "website security audit", "penetration testing", "security hardening"]
deliverables: ["Signed scope and authorization before any testing", "Code review against the OWASP Top 10", "Cloud and server configuration review", "Penetration test report ranked by severity", "Hardening of accounts, servers and websites", "Retest confirming each fix", "Incident response plan and contact sheet"]
technologies: ["Burp Suite", "ZAP", "Nmap", "Semgrep", "Trivy", "Dependabot", "Cloudflare", "AWS Security Hub"]
related: ["cloud-devops", "managed-it-services", "wordpress-development"]
posts: ["website-security-checklist", "website-maintenance-guide", "legacy-system-modernization", "aws-vs-azure-vs-google-cloud"]
order: 13
---

Cybersecurity services for a small or mid-size business should answer three questions: where are we exposed, what do we fix first, and what do we do on the day something goes wrong. Meritbyte Technologies, a Nepal-based web and software development company, answers them with code and infrastructure review, authorized penetration testing, hardening, and an incident plan you write with us before you need it.

## Who asks for a security review, and why?

Usually something has just happened, or is about to:

- A web app or API is about to launch, and it holds customer data or takes payments.
- A developer or agency has left, possibly with the passwords.
- An enterprise customer has sent a security questionnaire that nobody can answer.
- A WordPress site has been defaced, redirected to spam, or flagged by Google.
- An investor or buyer is about to run due diligence.

We are not an audit firm. A SOC 2 report or ISO 27001 certificate comes from an independent, accredited auditor. We do the technical work auditors ask about, such as access control, logging, backups and change history.

## What do our cybersecurity services cover?

### Code review against the OWASP Top 10

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is the standard list of the most serious web application security risks, and we use it as the checklist. In custom business apps, the findings we look for first are broken access control (change an ID in the URL and see another customer's invoice), injection, security misconfiguration, outdated components, and weak authentication. Automated tools such as Semgrep and Dependabot find candidates; a person reads the authentication and permission code line by line.

### Infrastructure review

Cloud accounts: MFA on the root or global admin, least-privilege IAM roles, public buckets, open security groups, audit logging and secrets in code. Servers: patch levels, SSH keys, exposed admin panels and database ports, TLS. Email: SPF, DKIM and DMARC, so nobody can send convincing mail as your domain.

### Penetration testing, with the paperwork first

A penetration test is an authorized, simulated attack to find weaknesses that can actually be exploited. Nothing starts until a written authorization is signed by someone with authority over the systems. It sets out:

1. The URLs, IP ranges and applications in scope, and what is explicitly out of scope.
2. The testing window, stated with time zones.
3. Allowed techniques. Denial-of-service and social engineering are excluded unless agreed.
4. Test accounts for each user role.
5. Emergency contacts on both sides and how to stop the test.
6. How any data seen during testing is handled and deleted.

Accessing systems without the owner's permission is a crime in most countries, including under the UK's Computer Misuse Act 1990 and the US Computer Fraud and Abuse Act. That is why the paperwork comes first.

The report gives each finding a severity, evidence, steps to reproduce and a recommended fix. After you fix, we retest and mark each item closed or still open.

### Hardening

| Area | What we tighten |
| --- | --- |
| Accounts | MFA everywhere, a password manager, leavers removed, admin rights only where needed |
| WordPress | Unused plugins removed, updates on a schedule, file editing disabled, login rate limits, a web application firewall |
| Servers | Patching, key-only SSH, firewall rules, no public database ports |
| Web apps | Security headers such as CSP and HSTS, secure cookies, rate limiting on login and forms |
| Backups | Stored off the main account, protected from deletion, and a restore actually tested |

### An incident plan written before you need it

Nobody reads a forty-page policy mid-incident. The plan is short: who leads, who decides to take systems offline, a contact sheet (host, registrar, payment provider, lawyer, insurer), first-hour steps, notification duties and drafted customer messages. Some duties are tight: the UK GDPR requires notifying the ICO of a reportable personal data breach within 72 hours of becoming aware of it. The structure follows NIST's incident handling guidance (SP 800-61), rehearsed in a short tabletop exercise.

## How the work is sequenced

1. **Scoping conversation, free.** What you run, what data you hold, what worries you, and any questionnaire you have been sent.
2. **Scope, authorization and a fixed-price first milestone.** Usually a code and infrastructure review plus a penetration test of one application.
3. **Findings walkthrough, then two-week fix blocks.** Our engineers fix the issues or your developers do; each block ends with a retest demo showing what is now closed. You decide after each block whether to continue.
4. **Ongoing.** Set retainer days each month for patching, dependency updates, periodic reviews and retests after major releases.

For businesses in the [UK](/website-developer/uk), findings can be mapped to the UK GDPR's security duty; the method is the same under other privacy laws.

## Tools, and what they are for

- **Burp Suite**: manual web application testing.
- **ZAP**: automated scans in CI between tests.
- **Nmap**: mapping what is exposed.
- **Semgrep, Trivy and Dependabot**: static analysis, container and Terraform scanning, vulnerable dependencies.
- **Cloudflare**: a web application firewall in front of the site.
- **AWS Security Hub** or Microsoft Defender for Cloud: cloud configuration tracked over time.

Tools find candidates; people confirm what is real. A scanner report relabelled as a penetration test is a shortcut to watch for.

## What drives the cost of a security review?

- Number of applications and APIs, and especially user roles: each role multiplies the access control tests.
- Size and age of the infrastructure.
- Grey-box testing (with accounts and code) finds more per hour than black-box testing.
- Whether retesting is included.
- Out-of-hours testing windows.
- Reporting for customers or auditors in a set format.

On payments: a hosted checkout such as Stripe Checkout keeps card data off your servers, which usually shrinks your PCI DSS obligations considerably. We quote after discovery; the [pricing page](/pricing) explains the model.

## Red flags in a cybersecurity provider

- Testing begins before a written authorization exists.
- The report is raw scanner output with a logo on it.
- No retest, or retests billed as a surprise.
- Promises to make you "compliant" or "certified" on their own.
- Asking for your admin password over chat instead of test accounts.
- Findings with no severity, no evidence or no fix.

For a do-it-yourself starting point, our [website security checklist](/blog/website-security-checklist) covers the basics. Infrastructure changes that come out of a review are often handed to our [cloud and DevOps](/services/cloud-devops) team, and routine patching to [managed IT services](/services/managed-it-services).

## Frequently asked questions

### What is the difference between a vulnerability scan and a penetration test?

A vulnerability scan is automated: a tool checks for known weaknesses and produces a long list, including false positives. A penetration test is done by a person who confirms which weaknesses are real, chains them together the way an attacker would, and shows the actual impact. Scans are cheap and worth running often; penetration tests go deeper and are run less often.

### Do we need permission from our hosting provider?

Sometimes. AWS, Azure and Google Cloud publish policies listing what may be tested without asking and what is prohibited, such as denial-of-service. Shared hosting and SaaS platforms often have stricter terms, and some forbid testing their infrastructure entirely. We check the current policies for every provider in scope and note them in the written authorization before testing starts.

### How often should we run a penetration test?

A common pattern is once a year and after any major change, such as a new login system, a payments integration or a move to a new cloud. Between tests, automated scans in CI and dependency alerts catch many regressions. If you ship large changes every few weeks, smaller focused tests on the changed areas are often better value than one big annual test.

### Can you make us SOC 2 or ISO 27001 compliant?

We can do much of the technical work those frameworks ask about: access reviews, MFA, logging, backups, change management and an incident plan, with evidence recorded as we go. The report or certificate itself comes only from an independent, accredited auditor. Any provider claiming to certify you on its own is overstating what it can do.

### What should we do in the first hour of a breach?

Contain it without destroying evidence: isolate affected systems, rotate exposed credentials and preserve logs rather than wiping servers. Then call the people on your contact sheet, including your host and, where personal data is involved, whoever handles notification duties. Having this written down in advance is the point of an incident plan; improvising it under pressure is how evidence gets lost.
