---
title: Building a Nepali-English Bilingual Website: Unicode, Fonts and SEO
seoTitle: Nepali Language Website: Unicode, Fonts and Bilingual SEO
description: How to build a Nepali language website in 2026: Unicode instead of Preeti, Devanagari fonts, bilingual URLs, hreflang, dates, numerals and translation.
date: 2026-09-27
category: nepal
order: 9
keywords: ["nepali language website", "bilingual website nepal", "nepali unicode website", "nepali font for website", "preeti to unicode", "hreflang nepali"]
summary: A Nepali language website should store all Nepali text as Unicode Devanagari, never Preeti, use a Devanagari web font such as Mukta or Noto Sans Devanagari, give each language its own URL with lang and hreflang tags, and have a fluent Nepali writer review translations. Nepali pages built this way are searchable, readable on any phone and rank separately.
takeaways: ["Text typed in Preeti or other legacy fonts is Latin characters underneath; convert it to Unicode Devanagari or it cannot be searched or read reliably.", "Pick a Devanagari web font with good conjunct support, self-host it in WOFF2 and allow a taller line height.", "Give each language its own URL, ideally a /ne/ subfolder, and link versions with reciprocal hreflang tags.", "Decide deliberately on Devanagari or Western digits and on Bikram Sambat or Gregorian dates for each context.", "Machine translation is a first draft; a fluent Nepali writer should edit every page before it goes live."]
related: ["seo-in-nepal", "com-np-domain-registration", "international-seo-guide"]
services: ["web-development", "website-design", "seo-services"]
---

A Nepali language website needs four things done right: Nepali text stored as Unicode Devanagari (never typed in Preeti or another legacy font), a web font designed for Devanagari, a separate URL for each language marked up with `lang` and `hreflang`, and a person fluent in Nepali who writes or reviews the text. With those in place, a bilingual website in Nepal works for readers, screen readers and Google alike.

The rest is detail, but detail that shows: conjuncts that render wrongly, dates in the wrong calendar, and a language switcher that dumps visitors on the homepage.

## Why must a Nepali language website use Unicode?

Because text typed in Preeti is not Nepali as far as a computer is concerned. Preeti and similar legacy fonts, such as Kantipur and Sagarmatha, map Devanagari shapes onto ordinary Latin keys, so the stored text is Latin letters and punctuation that only look like Nepali when that exact font is installed and applied.

On a website, that means:

- Google indexes gibberish, so the page never ranks for Nepali searches.
- Phones without the font show strings of Latin characters.
- Copying text into a message or search box produces nonsense.
- Screen readers read out random letters.

Unicode Devanagari stores the actual Nepali characters, which every modern phone and browser can display. If you have years of Preeti documents, convert them with a Preeti-to-Unicode converter and have someone proofread the output, because conversions often break conjuncts and half-forms. Government offices, schools and NGOs tend to hold the most legacy content, often inside scanned PDFs that need retyping as well.

## Which Nepali font should you use on a website?

A Devanagari web font with good conjunct support, self-hosted in WOFF2, in no more than two weights. Freely licensed options that work well:

| Font | Style | Why choose it |
| --- | --- | --- |
| Noto Sans Devanagari | Neutral sans | Very wide character coverage, many weights |
| Noto Serif Devanagari | Serif | Long reading: reports, news, articles |
| Mukta | Clean sans | Readable at small sizes, several weights |
| Hind | Interface sans | Designed for UI text and forms |
| Poppins | Geometric sans | Latin and Devanagari in one family for consistent branding |
| Martel | Serif | Editorial feel for headlines and long text |

Test any candidate with real words that contain difficult clusters, such as क्षेत्र, राष्ट्रिय, श्रद्धा and द्वन्द्व, and check reph and half forms. Some fonts that look fine in an English specimen break on Nepali text.

### Typography settings that differ from English

- **Line height.** Devanagari carries marks above the headline and below the base, so it needs more line height than Latin text, around 1.6 to 1.8.
- **No letter-spacing.** Added spacing breaks the headline stroke (shirorekha) that joins letters.
- **No uppercase styling.** Devanagari has no case, so `text-transform: uppercase` does nothing to Nepali but can still change English words mixed into it.
- **Slightly larger size.** Devanagari at the same pixel size often reads smaller than Latin; many sites set Nepali text 1 to 2 pixels larger.
- **Performance.** Devanagari font files are larger. Subset them with `unicode-range`, preload the main weight and use `font-display: swap`.

## How should bilingual URLs be structured?

Give each language its own URL, ideally in a subfolder: `example.com/` for English and `example.com/ne/` for Nepali. One domain keeps its authority, the setup stays simple, and Google can index both versions.

| Structure | Verdict |
| --- | --- |
| Subfolder (`/ne/`) | Recommended for most sites |
| Subdomain (`ne.example.com`) | Workable, with more setup |
| Separate domains | Only with a strong reason, such as separate organisations |
| Same URL, language switched by cookie or script | Avoid; search engines see only one language |

For slugs, transliterated or English words (`/ne/sewa` or `/ne/services`) share better than Devanagari slugs, which become long `%E0%A4...` strings when pasted into many apps. The language switcher should link to the equivalent page in the other language, not to the homepage. Do not redirect automatically by location or browser language: a Nepali speaker in Sydney and a foreigner in Kathmandu both get the wrong version, and so can Google's crawler.

## How do you set lang and hreflang correctly?

Mark each page's language in the HTML, and tell search engines which pages are translations of each other.

1. Nepali pages use `lang="ne"` on the `html` element; English pages use `lang="en"`. Short English phrases inside Nepali pages can carry their own `lang` attribute.
2. Each page lists every language version with `hreflang`, including itself, for example `hreflang="ne"` and `hreflang="en"`, plus `hreflang="x-default"` for the version to show when no language matches.
3. The links must be reciprocal: if the English page points to the Nepali one, the Nepali page must point back.
4. Hreflang can go in the page head or in the XML sitemap. Pick one and use it everywhere.

Use `ne` or `ne-NP` consistently. The `lang` attribute also helps browsers pick fonts and screen readers pick pronunciation. The same principles apply to any multilingual site; our [international SEO guide](/blog/international-seo-guide) covers them more broadly.

## Numbers, dates and the Bikram Sambat calendar

Decide deliberately which digits and which calendar each part of the site uses. Inconsistency confuses readers more than either choice does.

- **Digits.** Nepali pages can use Devanagari numerals (१२३) or Western numerals (123). Western numerals are often clearer for phone numbers and anything a user must type. In JavaScript, `Intl.NumberFormat("ne-NP")` formats 1234567.5 as १२,३४,५६७.५, with Devanagari digits and lakh-style grouping.
- **Money.** Nepali readers think in lakh and crore. Even English pages for a Nepali audience can say NPR 1.5 lakh, with the full figure where precision matters.
- **Dates.** Bikram Sambat (BS) is Nepal's official calendar, and many readers expect it for notices, admissions and deadlines. Show the BS date with the Gregorian (AD) date alongside for anything time-critical.
- **Conversion.** BS month lengths vary from year to year and are fixed by calendar authorities rather than by a simple formula, so conversion libraries rely on lookup tables. Check that yours covers every year you need, including future dates.

## Forms, search and databases

- Accept Devanagari in name fields. Validation that allows only A to Z rejects Nepali names.
- Use UTF-8 end to end: the database (`utf8mb4` in MySQL), API responses, CSV exports and emails.
- Normalise text to Unicode NFC before storing and searching, because the same word can be typed as different character sequences.
- Make site search tolerate spelling variants, such as anusvara versus chandrabindu forms, and consider matching Romanized queries too.
- Test on phones with the keyboards people really use, including Romanized-to-Devanagari typing.

## Translation and keeping both languages in step

Machine translation gives you a draft, not a finished page. A fluent Nepali writer should edit every page against a short glossary that settles recurring terms, including which English words to keep (most readers expect वेबसाइट, not a pure-Nepali coinage). Settle the register too: तपाईं is the usual polite form on websites, while हजुर reads as very formal.

Publish the Nepali version only when it is complete. A half-translated site with English fallbacks everywhere frustrates readers and sends mixed signals to search engines. In the CMS, store each language as its own field or entry so editors can see what is missing. WordPress with Polylang or WPML, or a headless CMS with locale support behind Next.js, both handle this well.

Research keywords separately for each language. Many people in Nepal search in English or Romanized Nepali even when they prefer reading Nepali, so a Nepali page adds to the English one rather than replacing it; compare both in Search Console. The wider picture is in [SEO in Nepal](/blog/seo-in-nepal).

## How Meritbyte Technologies builds bilingual sites

Meritbyte Technologies is a Nepal-based web and software development company, and Nepali-English sites are a regular part of our [web development work](/services/web-development). We set up Unicode, fonts, URL structure and hreflang at the start rather than retrofitting them, check Nepali rendering on real phones through the staging URL, and hand over a written translation workflow for your editors. Our page on [website development in Nepal](/website-developer/nepal) covers the other local requirements we plan for.

## Frequently asked questions

### Is it okay to use Preeti font on my website?

No. Preeti text is stored as Latin characters that only display as Nepali when that font is installed, so search engines cannot read it, phones without the font show gibberish, and screen readers read nonsense. Convert existing Preeti content with a Preeti-to-Unicode converter, proofread the result carefully, and type all new content directly in Unicode Devanagari.

### Does Google index Nepali-language pages?

Yes. Google indexes Unicode Devanagari like any other script, and Nepali pages can rank for Nepali and mixed-language searches. They need their own URLs, a correct `lang` attribute and hreflang links to their English equivalents. Content typed in legacy fonts such as Preeti, or published only as images and scanned PDFs, cannot be read and will not rank.

### Should Nepali page URLs be written in Devanagari?

They can be, and Google handles them, but transliterated or English slugs are more practical. Devanagari URLs turn into long percent-encoded strings when pasted into many apps, emails and documents, which looks broken and is hard to read out over the phone. Use Devanagari in page titles and headings, and keep URLs short and in Latin characters.

### Which Nepali font loads fastest on a website?

No font is fastest by itself; speed depends on how you serve it. A good Devanagari font such as Mukta, Hind or Noto Sans Devanagari loads quickly if you self-host it as WOFF2, subset it to the characters you need, limit it to one or two weights, and use font-display swap so text appears immediately while the font loads.
