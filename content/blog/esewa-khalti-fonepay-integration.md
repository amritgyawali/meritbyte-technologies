---
title: eSewa, Khalti and Fonepay Integration: Taking Online Payments on a Nepali Website
seoTitle: eSewa Integration Guide: Khalti, Fonepay and ConnectIPS
description: eSewa integration explained for 2026: how eSewa, Khalti, Fonepay and ConnectIPS work on a Nepali website, merchant onboarding, verification and pitfalls.
date: 2026-09-27
category: nepal
order: 3
keywords: ["esewa integration", "khalti payment gateway integration", "payment gateway in nepal", "fonepay qr website", "connectips integration", "esewa payment gateway"]
summary: To take eSewa, Khalti or Fonepay payments on a website in Nepal, a registered business first gets a merchant account with each provider. A developer then connects checkout to the provider's API, sends the customer to pay, and verifies every transaction server-side before marking the order paid. Stripe does not onboard Nepal-registered businesses.
takeaways: ["Every Nepali payment gateway needs a merchant account in a registered business's name; start that paperwork before the build.", "Never trust the success redirect: confirm each payment and its amount with the provider's API on your server.", "Khalti amounts are sent in paisa, and eSewa requests are signed with a secret key that must never reach the browser.", "Use a dynamic Fonepay QR per order on websites; static QR codes force staff to match payments by hand.", "Reconcile settlement reports against orders regularly, and keep keys and dashboards in your business's name."]
related: ["start-ecommerce-website-in-nepal", "website-cost-in-nepal", "hotel-website-direct-bookings-nepal"]
services: ["ecommerce-development", "web-development"]
---

eSewa integration, like Khalti and Fonepay integration, has two halves: a merchant account your business applies for, and code that sends the customer to pay and then confirms the payment with the provider's server before your site treats the order as paid. The paperwork usually takes longer than the code, so start it first.

The payment landscape here is local. Stripe does not onboard businesses registered in Nepal, and PayPal does not offer Nepali accounts that can receive payments, so a Nepali website takes money through domestic wallets, bank-linked QR payments, direct bank debits and, for foreign cards, a Nepali bank's card service.

## Which payment gateways work in Nepal in 2026?

The main options are eSewa and Khalti (digital wallets), Fonepay (QR payments from bank apps), ConnectIPS (direct bank account payments), IME Pay (another wallet), and online card acquiring offered by some Nepali banks. Most online stores start with two of these.

| Option | How the customer pays | How integration works | Best for |
| --- | --- | --- | --- |
| eSewa | eSewa wallet, funded from a linked bank account | Signed form redirect to eSewa, then a status check | Broad consumer reach |
| Khalti | Khalti wallet, plus bank options in Khalti's checkout depending on setup | Server starts a payment, customer goes to Khalti, server looks up the result | Consumer retail, digital goods |
| Fonepay | Scanning a QR code in a mobile banking app | Dynamic QR per order, payment status checked by API | Customers who prefer their bank app |
| ConnectIPS | Direct debit from a bank account, run by Nepal Clearing House Ltd | Request signed with a digital certificate, redirect, then validation | Larger payments: fees, B2B invoices |
| IME Pay | IME Pay wallet | Redirect and verification API | Extra wallet coverage |
| Bank card acquiring | Visa or Mastercard, including foreign cards | The bank's hosted payment page | Tourism and international customers |

Products and APIs change, so treat the table as the shape of the market and confirm current integration methods in each provider's developer documentation.

## What do you need before integrating eSewa or Khalti?

A merchant account, which normally means a registered business, a bank account in that business's name and a website that shows what you sell. A personal wallet is not a substitute for website checkout.

Typical onboarding documents and conditions:

- Company or firm registration certificate.
- PAN or VAT registration certificate.
- A bank account in the business's name for settlement.
- Identity documents for the owner or directors.
- A website, live or on staging, with products or services, prices, contact details, terms, a refund and cancellation policy and a privacy policy.

The merchant agreement sets the commission per transaction and the settlement cycle, meaning how often collected money reaches your bank. These differ between providers and can move with volume, so ask each for current terms in writing rather than relying on figures quoted online. Onboarding can take anything from several days to a few weeks, and developers can build against each provider's sandbox in the meantime.

Keep the merchant account, dashboard logins and API keys in your business's name. They are how you see settlements and issue refunds.

## How does eSewa integration work?

In eSewa's current ePay flow, your server signs the order details with a secret key, the customer's browser goes to eSewa to log in and confirm, and eSewa returns them to your site with a signed response. Your server checks that response, then confirms the transaction status before releasing the order.

Step by step:

1. The customer clicks "Pay with eSewa". Your server creates the order with a unique transaction ID and the total amount.
2. Your server generates an HMAC-SHA256 signature over the fields eSewa specifies, such as the amount, transaction ID and merchant product code, using the secret key eSewa issued to you.
3. The browser submits a form to eSewa with those fields, the signature, and your success and failure URLs.
4. The customer logs in to eSewa and confirms the payment.
5. eSewa redirects to your success URL with an encoded response. Your server decodes it and recomputes the signature to confirm it came from eSewa.
6. Your server calls eSewa's transaction status API and checks that the status is complete and the amount matches the order.
7. Only then does the order move to "paid" and trigger emails, stock changes or dispatch.

The secret key stays on the server. If it ever appears in JavaScript sent to the browser, anyone can forge a valid-looking request.

## How does Khalti payment gateway integration work?

Khalti's web checkout is server-driven: your server asks Khalti to start a payment, receives a payment identifier and a payment URL, sends the customer there, and afterwards looks up the payment by that identifier to confirm it.

The details that catch people out:

- **Amounts are in paisa.** NPR 1,500 is sent as 150000. Being out by a factor of 100 is a classic first-integration bug.
- **The initiate call carries your secret key** in its header, so it must be made from the server.
- **The return URL is not proof of payment.** Khalti sends the customer back with a status, but your server should call the lookup API and act only on a "Completed" status with the right amount.
- **Payments can be pending, expired or cancelled.** Build for those states rather than assuming a clean success or failure.

Khalti provides a sandbox with test credentials, so the whole flow can be proven on a staging site before any real money moves.

## How do you add Fonepay QR to a website?

Use a dynamic QR: a code generated for each order, carrying the amount and your order reference, whose payment status your system can check automatically. A static QR image, the kind printed at shop counters, leaves staff matching payments to orders by hand.

Fonepay connects the mobile banking apps of its member banks, so customers pay from the app they already use. Merchant onboarding typically goes through a bank or through Fonepay itself. The integration pattern is to request a QR for the order, display it at checkout, then confirm the payment through Fonepay's status API or notification before completing the order.

One practical snag: QR suits a desktop checkout, where the customer scans the screen with a phone, and is awkward on a phone, where they would need to scan their own screen. On mobile, show wallet options first and keep QR as a choice, with an option to save the code and pay from the banking app.

## When should you use ConnectIPS?

Use ConnectIPS for large or bank-to-bank payments: school and college fees, B2B invoices, insurance premiums, or anything likely to exceed a customer's wallet limits. It debits the customer's bank account directly and is operated by Nepal Clearing House Ltd.

Integration is more formal than for wallets. After onboarding you receive a digital certificate used to sign each payment request; the customer is redirected to authorise the debit, and your server validates the transaction afterwards. Keep the certificate out of the code repository and guard it like a password.

## Mistakes that lose money or orders

- **Trusting the redirect.** Anyone can type your success URL into a browser. Always verify with the provider.
- **Not checking the amount.** Confirm the verified amount equals the order total, so a tampered request cannot pay NPR 10 for an NPR 10,000 order.
- **Fulfilling twice.** A refreshed success page should not process the order again. Make "mark as paid" safe to run more than once.
- **Ignoring closed browsers.** Some customers pay and close the tab before the redirect. A scheduled job that re-checks pending orders catches them.
- **Secrets in the repository.** Keep keys and certificates in environment variables or a secrets manager.
- **No reconciliation.** Match each provider's settlement report to your orders at least weekly. Refunds made in a merchant dashboard also need recording in your system.
- **Abandoned plugins.** A gateway plugin last updated years ago may call an API version that has since been retired.

## WooCommerce, Shopify or a custom checkout?

WooCommerce is the path of least resistance for Nepali wallets. Plugins exist for eSewa and Khalti, some from the providers and some from the community; check when each was last updated and whether it verifies payments server-side.

Shopify only offers payment providers approved for its platform, so Nepali wallets are usually set up as a manual payment method: staff confirm the payment in the wallet dashboard before fulfilling. That works at low volume and becomes a bottleneck at higher volume. A custom checkout, for example on Next.js and Node.js, gives full control and suits stores with unusual flows. The trade-offs are in [Shopify vs WooCommerce vs custom e-commerce](/blog/shopify-vs-woocommerce-vs-custom-ecommerce).

For foreign customers paying by card, look at card acquiring through a Nepali bank. Hotels and trekking companies usually need it, as covered in [hotel websites and direct bookings in Nepal](/blog/hotel-website-direct-bookings-nepal).

## How Meritbyte Technologies handles payment integrations

Meritbyte Technologies is a Nepal-based web and software development company, and payment work is a routine part of our [e-commerce development](/services/ecommerce-development). We start merchant applications early, in your business's name, and build against each provider's sandbox while approval is pending. You can test the full checkout on a staging URL before anything goes live.

Every gateway we connect verifies payments server-side and handles pending and duplicate cases. Keys and certificates stay in your accounts and are documented at handover. More on local projects is on our page for [website development in Nepal](/website-developer/nepal).

## Frequently asked questions

### Can I accept eSewa on my website without a registered business?

Generally no. Automated website checkout needs a merchant account, and providers ask for business registration, a PAN or VAT certificate and a business bank account. A personal wallet can receive transfers, but it cannot confirm orders on your site automatically. If you are only testing demand, take orders manually first, then register the business before adding a gateway.

### Which payment gateway should a Nepali online store add first?

Most stores start with eSewa and Khalti, because many customers already hold one of the two wallets, then add Fonepay QR for people who prefer paying from their bank app. ConnectIPS suits high-value or fee-type payments. Look at your own customers first: if most currently pay by bank transfer after ordering by phone, Fonepay may matter more than a second wallet.

### Can a business in Nepal use Stripe or PayPal?

Not as a Nepal-registered business. Stripe does not onboard companies registered in Nepal, and PayPal does not offer Nepali accounts that receive payments. Businesses that need to accept foreign cards typically use online card acquiring from a Nepali bank. Using a company registered abroad is possible but brings tax and foreign-exchange obligations that need proper professional advice.

### How much do eSewa and Khalti charge merchants?

Each provider charges a commission on transactions under its merchant agreement, and the rate can depend on business type, volume and negotiation. Figures published online are often out of date. Ask each provider for its current rate, settlement timing and any setup or annual fees in writing, and compare the effective cost per order, including refunds, before choosing.

### How long does payment gateway integration take?

Coding one gateway with proper verification usually takes days, not weeks, once the rest of the store is ready. Merchant onboarding is often the slower part, taking from several days to a few weeks depending on your documents. Allow time for sandbox testing and a few small live payments before launch.
