# Quotehelm website

Source for **[getquotehelm.co.uk](https://getquotehelm.co.uk)**, the marketing site for Quotehelm. Quotehelm sells fixed-price website and AI fixes to trades firms in London.

> **TL;DR**
> - Static HTML/CSS/JS site, hosted free on GitHub Pages from this repo (`oayton7/quotehelm-site`).
> - Push to `main` and the site goes live in about 1 to 2 minutes. There's no build step, framework or database.
> - The site sets no cookies and uses no analytics. Keep it that way, or update the privacy notice first.
> - Prices, VAT wording and contact details appear on several pages. Use the [change checklists](#10-change-checklists) so they stay consistent.

---

## Contents

1. [What Quotehelm is](#1-what-quotehelm-is)
2. [What this site has to do](#2-what-this-site-has-to-do)
3. [Pages](#3-pages)
4. [Products and prices (source of truth)](#4-products-and-prices-source-of-truth)
5. [Repo structure](#5-repo-structure)
6. [Running it locally](#6-running-it-locally)
7. [Deploying and the domain](#7-deploying-and-the-domain)
8. [Design system](#8-design-system)
9. [Writing style for site copy](#9-writing-style-for-site-copy)
10. [Change checklists](#10-change-checklists)
11. [Interactive pieces (JavaScript)](#11-interactive-pieces-javascript)
12. [Demos and sample data](#12-demos-and-sample-data)
13. [Legal and compliance](#13-legal-and-compliance)
14. [Tool stack behind the business](#14-tool-stack-behind-the-business)
15. [How a lead becomes a client](#15-how-a-lead-becomes-a-client)
16. [Quality checks before every push](#16-quality-checks-before-every-push)
17. [Troubleshooting](#17-troubleshooting)
18. [Roadmap](#18-roadmap)
19. [Ground rules](#19-ground-rules)
20. [Ownership and licence](#20-ownership-and-licence)

---

## 1. What Quotehelm is

| | |
|---|---|
| **Business** | Quotehelm, a one-person side business run by Oscar Ayton as a sole trader |
| **Location** | London W6 |
| **Who it's for** | **Limited companies** (and LLPs) in the London trades: plumbers, electricians, roofers, builders, kitchen fitters |
| **What it sells** | Fixed-price fixes that turn website visitors into enquiries: quote forms, Google reviews, AI chat, online booking, listing clean-up, new sites, CRM and automations, plus an optional monthly care plan |
| **How clients are found** | A free website audit sent by cold email, plus referrals |
| **Time available** | 10 to 20 hours a week, alongside a full-time job |
| **Short-term goal** | First paying client |
| **Long-term goal** | A mostly automated business that could be sold |
| **VAT** | Not VAT registered. No VAT is charged |

**The pitch in one line:** *"Your website, taking enquiries while you're on the tools."*

**Positioning:**
- Fixed price, agreed in writing before any work starts
- No VAT charged
- No lock-in. The care plan is optional with 30 days' notice
- The client approves everything their customers will see
- One person runs it, so the client always deals with Oscar

---

## 2. What this site has to do

In priority order:

1. **Get a free website check request.** This is the main call to action on every page. It opens an email with the business name and website fields pre-filled.
2. **Back up the cold email.** People who get an audit email will click through to see if Quotehelm is real. The site has to look credible, answer "who is this?" fast, and show clear prices.
3. **Show, don't tell.** Every product has an interactive phone demo built on a made-up firm, *Example Plumbing Ltd (demo)*.
4. **Let the visitor price it themselves.** The estimate builder adds up the ticked products and puts the total into an email.
5. **Stay compliant.** The privacy notice covers the cold outreach, and the site sets no cookies and has no tracking.

Things the site deliberately does **not** do:
- No online payments or checkout
- No account logins
- No cookie banner, because no cookies or analytics are used
- No live chat on the Quotehelm site itself (the chat assistant is a product demo only)

---

## 3. Pages

| Page | URL | Purpose | Main call to action |
|---|---|---|---|
| **Home** | `/` | Hero, outcomes, product demos (8 tabs), estimate builder, how it works, who you're dealing with, FAQ | Ask for a free website check |
| **Prices** | `/pricing/` | Full price table, how it works, estimate builder, extended FAQ | Ask for a free website check |
| **Plumbers** | `/trades/plumbers/` | Trade landing page: scenario ("boiler breaks down at 9pm"), what I can set up, prices | Free check / see example site |
| **Electricians** | `/trades/electricians/` | Trade landing page (rewires, consumer units, EV chargers) | Free check / see example site |
| **Roofers** | `/trades/roofers/` | Trade landing page | Free check / see example site |
| **Builders** | `/trades/builders/` | Trade landing page | Free check / see example site |
| **Kitchen fitters** | `/trades/kitchen-fitters/` | Trade landing page | Free check / see example site |
| **Contact** | `/contact/` | Email, postal address, reply times | Ask for a free website check |
| **Privacy notice** | `/privacy/` | UK GDPR / PECR notice covering cold outreach | n/a |
| **404** | `404.html` | Friendly not-found page with links back | Home |
| **Demo: example website** | `/demos/` | A full sample trades website for Example Plumbing Ltd (demo) | n/a |
| **Demo: jobs dashboard** | `/demos/dashboard/` | Sample CRM / jobs dashboard used to sell the CRM product. Linked from the example website | n/a |

**Trade landing pages all use the same template:**
1. Page hero: "For [trade] in London" plus the lead line
2. Scene band: one real-world scenario as a blockquote, ending "Is yours the one that replies first?"
3. "What I can set up for [trade] firms": a list with price and lead time for each item
4. Note: client approval, care plan, no VAT
5. How it works (3 steps)
6. Links to the other trades
7. Closing call to action

To add a new trade, copy an existing trade folder (e.g. `trades/plumbers/`), change the hero, the scenario, the trade-specific chat assistant line, the `<title>`, meta description, Open Graph tags, canonical URL and JSON-LD. Then add it to the trades list on Home, the "Other trades" links on every trade page, `sitemap.xml` and `llms.txt`.

---

## 4. Products and prices (source of truth)

**This table is the master copy.** If a price changes, change it here first, then everywhere listed in [10.1](#101-changing-a-price).

| Customer-facing name | Formal name | What the client gets | Price | Lead time |
|---|---|---|---|---|
| Quotes to your phone | Quote form | A quote form on the website. Every enquiry goes to the client's phone by text and email straight away | **£345** | 3 working days |
| AI chat helper | Chat assistant | An AI chat assistant that answers common questions and takes quote requests 24/7, then sends them to the client | **£595** | 5 working days |
| Google reviews | Reviews feed | Google reviews shown on the site, plus an automatic review request after each job | **£345** | 5 working days |
| Online booking | Online booking link | Customers book a site visit or call-out from the website | **£225** | 3 working days |
| Right details on Google | Address fix | Name, address and phone made to match across the website, Google Business Profile and main directories | **£225** | 3 working days (Google and directories can take longer to update) |
| New website | Website redesign | Up to 5 mobile-friendly pages, quote form, Google reviews, click-to-call, HTTPS, basic Google setup. Copy written from client info, client's own photos, 2 rounds of changes | **£1,095** | 10 working days once content and access are in |
| Enquiry and job tracking | CRM and automations | Track every enquiry, with missed-call text replies, quote follow-ups and review requests that run on their own | **£1,750 to £2,750** | Agreed per job |
| Monthly care | Care plan (optional) | Everything kept running, small changes, a monthly check | **From £59 a month** (see tiers below) | 30 days' notice to cancel |

**Care plan tiers:**

| Tier | Price |
|---|---|
| 1 or 2 products | £59 a month |
| 3 or more products, or a website redesign | £79 a month |
| Includes a chat assistant or CRM | £99 a month |

**Pricing rules:**
- "From £225" is the headline starting price. If the cheapest product changes, update the hero, meta descriptions and `llms.txt`.
- Every price is shown with **no VAT added**, and the site says so near every total.
- Ongoing tool costs for client products (texts, automation) are **covered by the care plan**, not charged separately.
- The final price is always confirmed in writing before work starts. The website shows prices; the written quote is the contract.

---

## 5. Repo structure

```
quotehelm-site/
├── index.html                  # Home
├── pricing/index.html          # Prices         → /pricing/
├── trades/
│   ├── plumbers/index.html     # Trade landing pages → /trades/<trade>/
│   ├── electricians/index.html
│   ├── roofers/index.html
│   ├── builders/index.html
│   └── kitchen-fitters/index.html
├── contact/index.html          # Contact        → /contact/
├── privacy/index.html          # Privacy notice → /privacy/
├── demos/
│   ├── index.html              # Demo: example website (Example Plumbing Ltd)
│   └── dashboard/index.html    # Demo: jobs dashboard
├── 404.html                    # GitHub Pages serves this for any missing URL
├── assets/
│   ├── site.css                # Shared styles for every page
│   └── site.js                 # Tabs, phone demos, estimate builder
├── favicon.svg / favicon.png
├── og.png                      # Social share image (Open Graph)
├── CNAME                       # Contains: getquotehelm.co.uk
├── .nojekyll                   # Tells GitHub Pages to serve files as-is
├── robots.txt
├── sitemap.xml
├── llms.txt                    # Plain-text summary of services and prices for AI search tools
└── README.md                   # This file
```

**Conventions:**
- One folder with an `index.html` per page, so URLs are clean (`/pricing/`, not `/pricing.html`).
- No build tools. What's in the repo is what's served.
- Shared header and footer are copied into each page. When you change the nav or footer, change **every** page (see [10.4](#104-changing-the-nav-or-footer)).
- Home, Prices and the trade pages carry JSON-LD structured data in a `<script type="application/ld+json">` block. It repeats prices and FAQ answers, so keep it in sync with the visible copy.
- Don't commit client data, lead lists, API keys or `.env` files. This repo is public.

---

## 6. Running it locally

No install needed. Any of these works from the repo folder:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

Serve the site rather than double-clicking the HTML files: the pages use root-relative links (`/assets/site.css`, `/pricing/`), which break when opened straight from disk.

**Test on a real phone.** Most visitors arrive from a phone. With the Python server running, open `http://<your-computer's-local-IP>:8000` on your phone while on the same Wi-Fi. On a Mac, find the IP in System Settings > Wi-Fi > Details.

---

## 7. Deploying and the domain

### 7.1 How deploys work

- GitHub Pages serves the `main` branch (root folder).
- Every push to `main` triggers a Pages build. Check progress under the repo's **Actions** tab.
- Live in about 1 to 2 minutes. Hard refresh (Cmd+Shift+R) if you still see the old version.

**Safer workflow for bigger changes:**
1. Create a branch: `git checkout -b price-update`
2. Make the change and check it locally
3. Push the branch and open a pull request. Read the diff.
4. Merge into `main` to go live

To roll back, revert the bad commit on `main` (`git revert <commit>`) and push.

### 7.2 Custom domain

- The `CNAME` file in the repo root must contain exactly `getquotehelm.co.uk`. Don't delete it, or the custom domain stops working.
- Repo **Settings > Pages**: custom domain set, **Enforce HTTPS** ticked.
- DNS at the domain registrar:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | oayton7.github.io |

> **TODO (Oscar):** confirm these match the live DNS, and add the registrar's name here.

**Email DNS records live on the same domain. Don't touch them when editing website DNS:**
- MX records for **Zoho Mail** (inbox for `oscarayton@getquotehelm.co.uk`)
- SPF, DKIM and DMARC records for Zoho and **Emelia** (cold email sending)
- The custom tracking-link domain Emelia uses for click tracking

Breaking these would stop email arriving and hurt cold email deliverability. Take a screenshot of the full DNS zone before any change.

---

## 8. Design system

### 8.1 Colours

Defined as CSS variables on `:root` in `assets/site.css`:

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12302B` | Brand dark green: headings, buttons, dark bands |
| `--ink-2` | `#0C2420` | Button hover, footer, phone frame |
| `--text` | `#1E2826` | Body text |
| `--muted` | `#55615E` | Secondary text |
| `--line` | `#DCE3E0` | Borders and dividers |
| `--mist` | `#F2F5F3` | Light section backgrounds |
| `--page` | `#FFFFFF` | Page background |
| `--brass` | `#A87A2A` | Accent: diamond bullets, step numbers, focus ring, stars |
| `--ok` | `#1F7A4D` | "Good" states in demos |
| `--warn` | `#9E3814` | "Bad" or urgent states in demos |

The site is light mode only (`color-scheme: light`).

### 8.2 Type

- **Headings:** serif stack (`--serif`: Iowan Old Style, Palatino, Charter, Georgia). Weight 600, slight negative letter-spacing.
- **Body:** system sans stack (`--sans`: system-ui, -apple-system, Segoe UI, Roboto, Arial). Base size 1.0625rem, line height 1.6.
- No web fonts are loaded. This keeps the site fast and avoids third-party requests, which matters for the "no tracking" claim.

### 8.3 Components

| Component | Class | Notes |
|---|---|---|
| Primary button | `.btn` | Min height 3.25rem (big enough to tap with a thumb) |
| Secondary button | `.btn.ghost` | Outlined |
| Small button | `.btn.small` | Header call to action, desktop only |
| Brand mark | `.mark` | Word "Quotehelm" with a brass diamond |
| Pledges | `.pledges` | Diamond-bulleted trust points under the hero |
| Phone mock-up | `.phone` > `.screen` | Used for every product demo |
| Notification | `.notif` | Drops in on the hero phone (animated) |
| Product tabs | `.tab` / `.panel` | ARIA tablist pattern |
| Spec list | `.spec` | "What you get" and "Price" rows |
| Estimate builder | `.opts` / `.total` | Sticky total on desktop |
| Steps | `.steps` | Numbered 1 to 3 with brass numerals |
| Price table | `.prices` | Turns into stacked cards under 40rem |
| Sticky mobile CTA | `.sticky` | Fixed bottom bar on phones only |

### 8.4 Layout and breakpoints

- Content width: `max-width: 70rem` with 1.25rem side padding (`.wrap`)
- 40rem: smaller section padding, price table turns into stacked cards
- 48rem: 3-column grids (outcomes, steps)
- 52rem: desktop nav and header button appear, sticky mobile CTA hides
- 60rem: two-column hero, product panels and estimate builder

### 8.5 Accessibility

Keep all of these:
- "Skip to content" link (`.skip`)
- Visible focus ring: 3px brass outline on `:focus-visible`
- Tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and the left and right arrow keys move between tabs
- Estimate total uses `aria-live="polite"` so screen readers hear the new total
- `prefers-reduced-motion` turns off the hero animation, the chat demo delay and smooth scrolling
- Tap targets at least about 44px high
- Every demo is labelled as a demo, both visually and in `aria-label`

---

## 9. Writing style for site copy

The reader is a busy tradesperson reading on a phone between jobs.

**Do:**
- British English (enquiry, colour, organise)
- Plain words and short sentences. Talk about outcomes ("fewer missed enquiries") before features
- First person singular: "I set up", "I reply". It's a one-person business and the copy says so
- Put the plain-English name first and the formal name second (e.g. **Quotes to your phone**, then *Quote form*)
- Always give a price and a lead time together
- Use the curly apostrophe (’) in HTML copy to match existing pages

**Don't:**
- No em-dashes. Use commas, full stops or "to" for ranges (£1,750 to £2,750)
- No exclamation marks
- No buzzwords: streamline, unlock, leverage, empower, game-changer, robust, seamless, cutting-edge, solutions
- No "we" (it's one person), except in the privacy notice where legal style is fine
- **Never name Oscar's employer anywhere on the site, in commits, or in this repo**
- No made-up testimonials. Any quote shown as a real customer must be real and approved by that customer (see [12](#12-demos-and-sample-data))

---

## 10. Change checklists

### 10.1 Changing a price

Prices appear in **all** of these places. Search the repo for the old figure (e.g. `£345`, `"345"` and `345,`) and check each:

- [ ] [Section 4](#4-products-and-prices-source-of-truth) of this README
- [ ] Home: product tab panel (`.spec .price`)
- [ ] Home: estimate builder label **and** the `data-min` / `data-max` attributes
- [ ] Home and trade pages: JSON-LD structured data (`minPrice` / `maxPrice`, `priceRange`, and the FAQ answer text)
- [ ] Prices page: price table
- [ ] Prices page: estimate builder (same two spots as Home)
- [ ] Prices page: FAQ answer "How much does it cost?" **and** its copy in the JSON-LD `FAQPage` block
- [ ] Every trade page's "What I can set up" list
- [ ] Hero "Fixed prices from £225", meta descriptions and Open Graph descriptions if the cheapest price changed
- [ ] `llms.txt`
- [ ] Care plan only: the tier figures (59 / 79 / 99) are hard-coded in `assets/site.js`, not read from `data-monthly`. Change them there too
- [ ] Outreach templates and audit email templates (outside this repo)

Quick search:

```bash
grep -rn "345" --include=*.html --include=*.js --include=*.txt .
```

### 10.2 Changing contact details

Email `oscarayton@getquotehelm.co.uk` and the W6 postal address appear in:
- [ ] Every `mailto:` link (header button, hero, closing section, contact page)
- [ ] The estimate builder email link, which is built in `assets/site.js`
- [ ] Contact page
- [ ] Privacy notice ("Who we are" and postal address)
- [ ] Footer on every page
- [ ] JSON-LD (`email`, `address`) and `llms.txt`
- [ ] Email signatures and outreach templates (outside this repo)

### 10.3 Adding a new product

- [ ] Add a row to [section 4](#4-products-and-prices-source-of-truth)
- [ ] Home: new `.tab` button and matching `.panel` with a phone demo
- [ ] Home and Prices: new estimate builder option with `value`, `data-min`, `data-max`, `data-name`
- [ ] If it changes care plan tiers, update the tier logic in `assets/site.js`
- [ ] Prices page table row
- [ ] Relevant trade pages
- [ ] JSON-LD `makesOffer` list and `llms.txt`
- [ ] If it uses a new third-party tool that handles personal data, update the privacy notice processor list

### 10.4 Changing the nav or footer

- [ ] Change it on every HTML page, including `404.html` and the demos
- [ ] Click through every nav link on phone and desktop after deploying

### 10.5 Changing the privacy notice

- [ ] Update the "Last updated" date at the top
- [ ] Re-check the list of processors (section 14) is complete
- [ ] If adding cookies or analytics: add a cookie notice and consent first, and remove the "This website sets no cookies" line

---

## 11. Interactive pieces (JavaScript)

All plain JavaScript in `assets/site.js`, with no libraries. Every piece must still leave a usable page if JS fails.

### 11.1 Product tabs
- Clicking a `[role=tab]` sets `aria-selected="true"` on it, `false` on the others, and shows the matching panel (hides the rest with `hidden`). Left and right arrow keys move between tabs.
- Tabs scroll sideways on phones and wrap on desktop.

### 11.2 Phone demos
| Product | Trigger | What happens |
|---|---|---|
| Quote form | `data-demo="send"` | Shows a "New enquiry" text notification |
| Chat assistant | `data-demo="chat"` | Plays a scripted conversation into `[data-chat]`, flags "Urgent" |
| Online booking | `.slot` buttons in `[data-slots]` | Toggles `aria-pressed`, shows "Booked" with the chosen slot |
| Address fix | `data-demo="fix"` | Turns the red mismatched numbers green |
| Hero | page load | Three notifications drop in, 1.1s apart (CSS animation) |

### 11.3 Estimate builder
- Each checkbox in `[data-opts]` carries `data-name` plus either `data-min` and `data-max` (one-off) or `data-monthly` (care plan).
- The total shows a single figure, or a range when the CRM is ticked (£1,750 to £2,750), with the monthly figure on its own line.
- The monthly figure follows the care plan tiers: £99 if the chat assistant or CRM is ticked, £79 if the website redesign or 3 or more products are ticked, otherwise £59. This logic lives in `assets/site.js`.
- The **Send me this estimate** button (`[data-mail]`) rebuilds its `mailto:` link with the ticked items in the email body. Nothing is sent until the visitor presses send in their own email app.
- Pressing **Add to my estimate** on a product tab ticks the matching box (`data-add` matches `value`) and scrolls to `#estimate`.

### 11.4 Rules for any new JS
- No third-party scripts (no analytics, chat widgets or font loaders). They would break the "no tracking" statement in the privacy notice.
- No `localStorage` or cookies.
- Test with JS turned off: the copy, prices and email links must all still work.

---

## 12. Demos and sample data

- The made-up firm is **Example Plumbing Ltd (demo)**. Label every demo with it.
- Phone numbers come from Ofcom's ranges reserved for TV and drama, so they can never reach a real person:
  - London: `020 7946 0000` to `020 7946 0999`
  - Mobile: `07700 900000` to `07700 900999`
- Never use a real business's name, logo, reviews or phone number in a demo.
- Reviews in the demos are labelled "Sample reviews, made up to show how the feed looks." Keep that label.
- **Testimonial slot:** there is no testimonial on the site yet. A `.todo` highlight style exists in `assets/site.css` for marking a placeholder while drafting. Only add a testimonial with a real quote from a real client who has agreed in writing, with their name and business, and make sure no `.todo` placeholder is left on the live site.

---

## 13. Legal and compliance

> Not legal advice. A summary of how the site and outreach are set up, so changes don't break them.

### 13.1 Business status
- Sole trader trading as Quotehelm. Name and postal address are shown on the contact page and the privacy notice.
- Not VAT registered. The site says "No VAT charged" near every price. If turnover gets close to the VAT threshold, review every price and all VAT wording.

### 13.2 Privacy notice (UK GDPR)
Covers directors and staff of UK limited companies and LLPs whose work details are used for outreach. Key points:
- **Controller:** Oscar Ayton
- **Data collected:** name, job title, work email, published work phone, company name and number, public info (website, reviews, listings), email history, link clicks (not opens)
- **Sources:** Companies House, company websites, public listings such as Google Maps, replies
- **Lawful basis:** legitimate interests (Article 6(1)(f)), with a written assessment available on request
- **Retention:** non-replies deleted within 12 months of first contact. Opt-outs kept on a suppression list (email and company name only). Clients kept as long as needed for the contract and tax
- **Rights:** object to marketing, access, correction, erasure, restriction, object to legitimate interests. Complaints to the ICO (ico.org.uk, 0303 123 1113)

### 13.3 PECR (cold email rules)
- Unsolicited marketing email goes **only to limited companies and LLPs** (corporate subscribers).
- **Never** to sole traders or ordinary partnerships without consent. Check Companies House before adding a lead.
- Every email has a working opt-out ("reply unsubscribe"). Honour it straight away and add the address to the suppression list.

### 13.4 Cookies
- The site sets no cookies and has no analytics or tracking, so no cookie banner is needed.
- Adding Google Analytics, Meta Pixel, Hotjar, embedded YouTube, Google Fonts or similar would change this. Update the privacy notice and add consent **before** deploying.
- If you want visitor numbers, use a cookie-free tool and update the privacy notice first.

### 13.5 Client work
- The client approves the wording of every message their customers receive before it goes live (stated on the site and in the FAQ).
- Fixed price confirmed in writing before work starts.

---

## 14. Tool stack behind the business

Not part of the website code, but listed here so the privacy notice stays accurate.

| Tool | Used for | In privacy notice? |
|---|---|---|
| GitHub Pages | Hosting this site | Not needed (no personal data collected) |
| Zoho Mail (EU data centre) | Email hosting for `@getquotehelm.co.uk` | Yes |
| Emelia | Cold email sending, inbox warm-up, click tracking on own domain | Yes |
| Airtable | Lead and enquiry records | Yes |
| AI writing tools (currently Grok Bot) | Researching websites, drafting audits and emails | Yes |
| Companies House | Checking a lead is a limited company or LLP | Listed as a source |

**Planned for client delivery (not live yet):**
| Tool | Used for |
|---|---|
| Tally | Client quote forms |
| Make | Automation between form, text and email |
| Twilio | Sending enquiry texts to the client's phone, missed-call text replies |

> When any of these starts handling Quotehelm's own lead data, add it to the privacy notice processor list first.

---

## 15. How a lead becomes a client

1. **Find:** a London trades firm that is a limited company (check Companies House) with a weak website (no quote form, poor on phones, missing reviews, mismatched details on Google).
2. **Audit:** review their public website and listings. Note what's missing and what each fix would cost.
3. **Email:** short cold email with the audit and fixed prices, plus an opt-out. Sent from Emelia.
4. **Follow up:** on day 4, follow up with a mock-up of what their fixed site or quote form would look like.
5. **Site visit:** they click through to getquotehelm.co.uk, see the demos, build an estimate, and email back.
6. **Quote:** confirm a fixed price in writing.
7. **Build and approve:** build it, and the client approves anything their customers will see before it goes live.
8. **Care plan:** offer the optional care plan (from £59 a month, see [section 4](#4-products-and-prices-source-of-truth)).
9. **Review and referral:** ask happy clients for a testimonial (see [12](#12-demos-and-sample-data)) and referrals.

Referrals from Oscar's own network run alongside this.

---

## 16. Quality checks before every push

**Every change:**
- [ ] Checked locally on desktop **and** on a real phone
- [ ] All links work, including every `mailto:` link (it opens with the right subject and body)
- [ ] No typos in prices. Price table, tabs, estimate builder, trade pages, JSON-LD and `llms.txt` agree
- [ ] Copy follows [section 9](#9-writing-style-for-site-copy): no em-dashes, no exclamation marks, British English
- [ ] No employer name, client data or keys in the commit

**Monthly, or after big changes:**
- [ ] Lighthouse in Chrome DevTools: aim for 95+ on Performance, Accessibility, Best Practices and SEO (mobile)
- [ ] Run [W3C HTML validator](https://validator.w3.org/) on changed pages
- [ ] Check JSON-LD with Google's [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Keyboard-only test: Tab through Home, open each product tab, use the estimate builder
- [ ] Check `sitemap.xml` lists every public page, and update `<lastmod>` dates
- [ ] Check the HTTPS certificate is valid and "Enforce HTTPS" is still on
- [ ] Search Google for `site:getquotehelm.co.uk` to check pages are indexed

**SEO basics each page should have:**
- [ ] A unique `<title>` (e.g. "Website fixes for plumbers in London | Quotehelm")
- [ ] A unique `<meta name="description">`
- [ ] One `<h1>`
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) so links look right when shared on WhatsApp and LinkedIn
- [ ] `lang="en-GB"` on `<html>`
- [ ] A canonical URL

---

## 17. Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Change not showing | Browser cache or Pages still building | Hard refresh (Cmd+Shift+R); check the **Actions** tab |
| Site shows a GitHub 404 | `CNAME` file deleted or custom domain cleared in Settings | Restore `CNAME` with `getquotehelm.co.uk`, re-enter it in Settings > Pages |
| "Not secure" warning | HTTPS not enforced or certificate still being issued | Settings > Pages > tick Enforce HTTPS. A new certificate can take up to 24 hours |
| Email stopped arriving | MX records changed while editing DNS | Restore Zoho MX records from your DNS screenshot |
| Cold emails going to spam | SPF, DKIM or DMARC broken | Re-check records in Zoho and Emelia dashboards |
| Estimate total wrong | `data-min` / `data-max` doesn't match the label, or care plan tiers out of date in `assets/site.js` | Fix the attributes or the script (see [10.1](#101-changing-a-price)) |
| Tabs or demos don't work | JS error | Open DevTools > Console, fix the error |
| Styles missing locally | Opened the file directly instead of serving it | Run a local server (see [6](#6-running-it-locally)) |
| Layout broken on phone | New content wider than the screen | Check for long unbroken text or fixed widths; use `overflow-wrap:anywhere` |

---

## 18. Roadmap

**Now**
- [ ] Win the first paying client
- [ ] Send outreach batches using the free website audit
- [ ] Add a real testimonial once one exists

**Next (once there's a client)**
- [ ] Build the client quote form delivery setup: Tally + Make + Twilio. Do a practice build first
- [ ] Turn the outreach plan into a routine: network referral texts, cold email, day-4 mock-up follow-up
- [ ] Add a short case study page with real before-and-after results

**Later**
- [ ] Automate the audit and outreach as much as possible
- [ ] Write down repeatable delivery steps for each product, so the business could run with little input or be sold
- [ ] Consider more trades (e.g. locksmiths, decorators, landscapers) using the trade page template
- [ ] Consider cookie-free visitor stats (privacy notice update first)

---

## 19. Ground rules

1. Never name Oscar's employer anywhere.
2. Never publish a fake testimonial or a real business's details in a demo.
3. Never add tracking, cookies or third-party scripts without updating the privacy notice first.
4. Never cold email a sole trader or ordinary partnership.
5. Every price shown is a fixed price with no VAT. Keep all copies of a price in sync.
6. Nothing goes live to a client's customers without the client's approval.
7. This repo is public. Keep secrets, lead lists and client files out of it.

---

## 20. Ownership and licence

© 2026 Oscar Ayton, trading as Quotehelm. All rights reserved.

The code and copy in this repo are not open source. Please don't copy the site's code, copy or design without permission.

**Contact:** oscarayton@getquotehelm.co.uk
