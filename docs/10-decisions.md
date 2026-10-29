# Brand and decision register

## Brand

**Tandem** is the user’s selected working name. Availability of trademarks, company/trading names, domains and social handles has not been checked. Do not present it as cleared or registered. Keep the existing Quotehelm contact address until a replacement is explicitly chosen and configured.

A possible future naming structure is Tandem Enquiries, Tandem Booking, Tandem Reviews and Tandem Sites. These are product labels, not a requirement to create separate brands or repositories. Start with one reputation and one clear service.

## Decisions to resolve

| ID | Decision | Status | Evidence required / owner |
| --- | --- | --- | --- |
| D01 | Working parent name: Tandem | Conflict found 29 Oct 2026; replacement name needed | Oscar: shortlist alternatives; check domain, Companies House and trademarks |
| D02 | First segment: scheduled plumbing/heating work in West Sussex | Hypothesis | Oscar: ten discovery conversations |
| D03 | Live offer: enquiry capture, Google details fix and new website | Approved 29 Oct 2026 | Oscar: conversations and paid pilots; review which of the three sells |
| D04 | Pilot setup price £345 | Approved for pilot 29 Oct 2026 | Oscar: record hours, costs and client responses; review after first pilots |
| D05 | Client-paid vendors + optional support | Approved for pilot 29 Oct 2026 | Oscar: confirm handover steps and decline/cancel scenarios in first pilot |
| D06 | Supported platforms and tools | Open | Technical test results and actual supplier terms |
| D07 | Support allowance and response hours | Approved for pilot 29 Oct 2026 | Oscar: observed support workload against the allowance |
| D08 | New domain/email | Open | Clearance, ownership and DNS plan |
| D09 | Commercial hosting and launch path | Open | Appropriate host and migration rehearsal |
| D10 | Production deployment | Not authorised by this starter | Separate reviewed release after launch gates |
| D11 | Case-study claims | Not yet available | Actual results and permission |

When resolving a decision, add the date, owner, choice, evidence and consequences using the [decision template](templates/decision.md). Keep private evidence in a controlled location and use a sanitised reference here if appropriate.

## Resolved decisions

### D04, D05 and D07: pilot commercial terms

- Decision ID and date: D04, D05, D07; 29 October 2026
- Owner: Oscar Ayton
- Question: Pilot setup price, who pays running costs and owns the accounts, and what support is offered
- Options considered: £295, £345 or £395 setup; client-paid vendors or a managed monthly fee; no support, optional paid support or free support during the pilot; 14, 30 or 60 days of free fixes
- Evidence and remaining uncertainty: £345 is the existing Quotehelm price; Stage 1 test build costs about 6 to 7 Make credits per enquiry (see [first test build results](14-first-test-results.md)). Willingness to pay, real delivery hours and support workload are not yet known
- Choice and reason: £345 setup, 50% deposit and 50% before go-live; built in Oscar’s accounts and handed to client-owned accounts on full payment; client pays tools directly; free fixes for 30 days; optional maintenance at £59 a month with the first month free, 30 days’ notice, up to 30 minutes of changes a month and a reply within one working day. Payment before handover protects the setup fee without needing to disable a client’s system later
- Commercial/technical consequences: recurring income only from clients who opt in; handover needs a documented export and import of the form, automation and records
- Documents or code that must change: [first pilot pack](13-first-pilot-pack.md) (done); private scope copies for each client
- Review trigger or date: after the first two paid pilots, or if delivery or support time exceeds the fee
- Status: approved for pilot

### D03: live site offer narrowed to three services

- Decision ID and date: D03; 29 October 2026
- Owner: Oscar Ayton
- Question: The live site listed eight products, which is too broad to sell and deliver at 10 to 20 hours a week. What should it offer?
- Options considered: enquiry capture alone (the plan’s proposed first product); enquiry capture with a Google details fix, with Google reviews, or with a new website
- Evidence and remaining uncertainty: enquiry capture is the only service with a tested build (see [first test build results](14-first-test-results.md)). The Google details fix needs no automation. A website is the largest job, at an estimated 20 to 30 hours. Demand for each is unproven
- Choice and reason: offer enquiries to your phone (£345), right details on Google (£225) and a new website including the quote form (£1,095), with optional £59 a month maintenance. Remove AI chat, reviews feed, booking links and CRM from the live site. Take on one website at a time
- Commercial/technical consequences: the quote-form lead time is agreed per job rather than promised, until compatibility and timings are proven; a website job ties up most of a week’s capacity
- Documents or code that must change: root site pages, structured data, `llms.txt`, share image and estimate builder (done)
- Review trigger or date: after ten owner conversations, or when one offer clearly sells better than the others
- Status: approved

### D01: brand clearance check

- Decision ID and date: D01; 29 October 2026
- Owner: Oscar Ayton
- Question: Is “Tandem” usable as the trading brand, with a matching domain and email?
- Evidence and remaining uncertainty: tandem.co.uk is listed as the website of Tandem Bank Limited; TANDEM and TANDEM BANK trademark applications are held by Tandem Money Limited for financial services; many other UK companies use the name, including Tandem Group plc. A full trademark search in the relevant classes has not been done
- Choice and reason: do not adopt oscar@tandem.co.uk or present Tandem as the brand; keep the Quotehelm site and email until a replacement is cleared
- Review trigger or date: when Oscar provides a shortlist of alternative names
- Status: conflict found; replacement pending

## Confirmed implementation facts

- The original site snapshot is pinned to commit `267929a5eeaf0849224d72a9597a4b9646a7ce15`.
- The new `site/` directory is a static concept, with no backend integration and no analytics added.
- The fictional demo only changes browser text.
- The contact form prepares an email draft; it does not submit to Formspree or another endpoint.
- No Tandem canonical domain, production schema or email address has been invented.
- Existing root site files and the current domain configuration are retained in this starter.
