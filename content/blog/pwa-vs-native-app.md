---
title: Progressive Web App vs Native App: Which Should a Small Business Build?
seoTitle: PWA vs Native App: Which Should a Small Business Build?
description: PWA vs native app for a small business in 2026: what a progressive web app can and cannot do on iPhone and Android, store fees, costs and how to decide.
date: 2026-09-27
category: web-development
order: 32
keywords: ["pwa vs native app", "progressive web app benefits", "pwa for small business", "web app or mobile app"]
summary: A progressive web app suits most small businesses whose customers book, order or fill in forms now and then: one codebase, found through search, installable without an app store. A native or cross-platform app earns its extra cost when you need Bluetooth, NFC or background work, daily use, or a listing customers expect in the App Store and Google Play.
takeaways: ["A PWA is a website with a manifest and a service worker; it installs, works offline and can send push notifications.", "iPhone supports installed web apps and, since iOS 16.4, web push, but has no install prompt and no Bluetooth or NFC in the browser.", "Native or cross-platform apps win for hardware access, background tasks and daily-use products.", "Build the backend as an API so a Flutter or React Native app can be added later without starting again."]
related: ["mobile-app-development-cost", "website-vs-web-application", "mvp-development-guide"]
services: ["mobile-app-development", "web-development"]
---

In the PWA vs native app decision, most small businesses should build the progressive web app first. It is one codebase, Google can index it, customers can install it without visiting an app store, and it costs far less than two native apps. A native app earns the extra money when the product needs hardware access, reliable background work or daily use by customers who expect to find you in the App Store.

The rest of this guide shows where that line falls in 2026, including the iPhone limits that decide many projects.

## What is a progressive web app?

A progressive web app (PWA) is a website built so it can also behave like an installed app. Three things make it one: it is served over HTTPS, it has a web app manifest (a small JSON file with the app's name, icons, colors and start page) and it registers a service worker (a script that can cache files, serve pages offline and receive push messages).

Once installed, it opens from a home-screen icon in its own window, without the browser's address bar. It is still a website underneath: the same URL works in any browser, search engines can index it, and it updates the moment you deploy, with no store review.

## What can a PWA do in 2026, and what can it not?

A PWA covers everything most business apps need (forms, payments, camera, location, offline pages, notifications) but still falls short on hardware and background access, especially on iPhone.

| Capability | Android (Chrome) | iPhone and iPad (Safari) | Native app |
| --- | --- | --- | --- |
| Install to home screen | Yes, with an install prompt | Yes, via Share then Add to Home Screen; no automatic prompt | Yes, from the store |
| Push notifications | Yes | Yes since iOS 16.4, only after the user adds it to the home screen | Yes |
| Offline pages and cached data | Yes | Yes, but treat stored data as a cache | Yes |
| Camera, microphone, location | Yes | Yes | Yes |
| Apple Pay or Google Pay | Yes, on the web | Yes, Apple Pay on the web | Yes |
| Bluetooth, NFC, USB | Partly, through Web Bluetooth and Web NFC | No | Yes |
| Background sync and background location | Limited | Very limited | Yes |
| Widgets, watch apps, Siri shortcuts | No | No | Yes |
| Store listing | Google Play via a Trusted Web Activity | Not as a plain website | Yes |

Outside the EU, every browser on an iPhone uses Apple's WebKit engine, so Chrome on iOS has Safari's limits. Browser support shifts every year; test the exact features you need on the phones your customers own.

## PWA vs native app: the comparison that affects the budget

The cost gap comes from how many codebases you maintain and how releases reach users.

| Factor | PWA | Cross-platform app (Flutter, React Native) | Fully native (Swift and Kotlin) |
| --- | --- | --- | --- |
| Codebases | One web codebase | One app codebase, plus your website | Two apps, plus your website |
| Relative build cost | Lowest | Middle | Highest |
| Developer accounts | None needed | Apple US$99 a year; Google Play US$25 once | Same as cross-platform |
| Releasing an update | Live on deploy | Store review for each release | Store review for each release |
| How people find it | Search, links, QR codes, maps | App store search plus your own marketing | Same as cross-platform |
| Install friction | Low on Android, manual on iPhone | Store download | Store download |
| Device access | What the browser allows | Close to native, through plugins | Full |

Payments are the other trap. Physical goods and real-world services, such as food orders, bookings or repairs, can use your own payment processor inside a store app. Digital goods and subscriptions sold in an app generally have to use Apple's and Google's billing, with commissions typically between 15 and 30 percent, and those rules have been changing country by country after court cases and new laws. A PWA sidesteps store billing entirely.

## When is a PWA the right choice for a small business?

The progressive web app benefits that matter most are low cost, instant updates and discovery through search. Choose a PWA when customers use you occasionally and arrive from search, social links or a QR code on the counter. Typical fits:

- Ordering from a restaurant or bakery, with a reorder button for regulars
- Appointment booking for clinics, salons and tutors
- Loyalty cards and simple member areas
- Field-staff checklists, delivery notes and inspection forms
- B2B reorder portals where trade customers check stock and prices
- Trip itineraries and documents for tour and trekking operators

It also suits markets where most customers use Android phones, as in Nepal, because Chrome on Android offers the smoothest PWA install and the widest feature support.

A badly built PWA is just a slow website with an icon. Budget for proper offline states, an install hint for iPhone users (who will not see a prompt) and testing on real, mid-range devices.

## When is a native or cross-platform app worth the extra cost?

Build a store app when the browser genuinely blocks what the product must do, or when being in the app stores is part of what customers expect.

- **Hardware**: Bluetooth receipt printers or fitness devices, NFC tags, background location for delivery drivers.
- **Daily habit**: products opened every day, where notifications and a home-screen presence drive retention.
- **Heavy offline work**: large datasets that must sync reliably after days without signal.
- **Platform features**: widgets, smartwatch apps, health data, deep integration with the phone's share sheet and shortcuts.
- **Expectation**: sectors such as banking or ride-hailing, where customers search the store first.

For most businesses in that position, a cross-platform app in Flutter or React Native is the sensible middle: one codebase, two stores, performance close to native. Fully native Swift and Kotlin makes sense when the app is the product and depends on platform-specific features. Our breakdown of [mobile app development cost](/blog/mobile-app-development-cost) compares the three routes in more detail.

## Can you start with a PWA and add a native app later?

Yes, and it is often the cheapest path, provided the first build is planned for it. Put the business logic and data behind an API rather than inside the web pages, use an authentication system that mobile apps can share, and keep file storage outside the web server. A later Flutter or React Native app then reuses the same backend instead of starting again.

Wait for evidence before building the store app: customers returning weekly, people asking for an app by name, or a feature the browser will not allow. For Android, a PWA can be packaged for Google Play as a Trusted Web Activity with tools such as Bubblewrap or PWABuilder at little cost. Apple is stricter: its review guidelines reject apps that are only a repackaged website, so an iOS listing means building real app functionality.

## Questions to answer before you commit a budget

Whether you need a web app or mobile app usually comes down to six questions.

1. How often will a typical customer open it? Weekly or more favors an app; a few times a year favors the web.
2. Which device features are essential on day one, and do they work in Safari on an iPhone?
3. How will people find it: search and links, or app store search?
4. Are you selling digital goods, which bring store billing, or physical goods and services?
5. Who will ship updates? Store apps need yearly work for new iOS and Android versions, and Google Play requires apps to target a recent Android API level to keep receiving updates.
6. What must still work offline, and what data must never be lost?

If most answers point to occasional use, discovery through search and standard features, the answer is a PWA, and possibly just a good [website or web application](/blog/website-vs-web-application) without the install step at all.

## How Meritbyte Technologies helps clients decide

Meritbyte Technologies is a Nepal-based web and software development company that builds PWAs as part of its [web development](/services/web-development) work and store apps in Flutter or React Native through its [mobile app development](/services/mobile-app-development) service, so we have no reason to push one route. The scoping conversation is free and ends with a recommendation, a timeline and a number.

The first milestone is fixed price. Often that milestone is the API and the PWA, which a native app can reuse later if the numbers justify it. Apple and Google developer accounts are registered in your name, as are the repository and hosting, whether the business is in Kathmandu or across [Australia](/website-developer/australia).

## Frequently asked questions

### Do PWAs work on iPhone?

Yes. Safari lets people add web apps to the home screen, caches pages for offline use and, since iOS 16.4, supports push notifications for web apps that have been added to the home screen. There is no automatic install prompt, so you need to show iPhone users how to add it, and features such as Bluetooth and NFC are not available in the browser.

### Can a PWA be listed in Google Play or the App Store?

Google Play accepts PWAs packaged as a Trusted Web Activity, built with tools such as Bubblewrap or PWABuilder, and the Microsoft Store accepts them too. Apple's App Store is harder: its guidelines reject apps that are only a repackaged website, so an iOS listing usually means building a genuine app with native features rather than a wrapper.

### Is a PWA good for SEO?

A PWA is a website, so its pages can be indexed like any other, as long as each screen has its own URL and the content renders reliably for search engines. Problems appear when everything loads through client-side JavaScript with no server rendering. Frameworks such as Next.js avoid that by rendering pages on the server first.

### How much cheaper is a PWA than a native app?

It depends on scope, but a PWA replaces two app codebases and store releases with one web codebase, so it is usually the cheapest of the three options, with cross-platform apps in the middle and fully native apps the most expensive. Budget for maintenance in every case; store apps in particular need updates each year as operating systems change.
