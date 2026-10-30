# Pillion Web business and website

Pillion Web is Oscar Ayton’s business for practical websites and enquiry systems for trades firms. It replaces the earlier working name Tandem, which conflicts with Tandem Bank. The live site still trades as Quotehelm at getquotehelm.co.uk until the move to pillionweb.co.uk is complete. This repository contains the live site, a website concept, the business plan and delivery guidance, and a preserved copy of the original Quotehelm site.

**Oscar: start with [START HERE](docs/00-start-here.md).** The first milestone is one paid, tightly scoped enquiry-capture installation that works reliably and has documented costs.

## Current status

Last updated 30 October 2026. Every pull request updates this section and adds a row to Progress below, so anyone or any AI agent reading this page sees the latest state.

- **Brand:** Pillion Web chosen (decision D01). Companies House and UK IPO trademark checks still to do.
- **Domain and email:** pillionweb.co.uk bought on GoDaddy (D08), with its A records and www CNAME pointing at GitHub Pages. getquotehelm.co.uk is registered on Porkbun and paid through 21 October 2027; it will forward to pillionweb.co.uk after the rebrand merges. Zoho Mail is set up on it, with MX, SPF, DKIM and DMARC records in place, and oscar@pillionweb.co.uk added to Oscar’s mailbox. Cold email stays on getquotehelm.co.uk while the new domain builds sending reputation.
- **Live site:** getquotehelm.co.uk, trading as Quotehelm, offering three services: enquiries to your phone (£345), right details on Google (£225) and a new website (£1,095), with optional £59 a month maintenance (D03).
- **Rebrand:** prepared in draft pull request [oayton7/quotehelm-site#9](https://github.com/oayton7/quotehelm-site/pull/9). It goes live once pillionweb.co.uk points at GitHub Pages, followed by a redirect from getquotehelm.co.uk and Search Console’s change of address.
- **Pilot terms:** approved (D04, D05, D07): £345 setup, 50% upfront and 50% before go-live, optional £59 a month maintenance with the first month free.
- **Test build:** Stage 1 works with synthetic enquiries. SMS (Stage 2) and most acceptance tests are still to do.
- **Next:** point pillionweb.co.uk at GitHub Pages, set up the redirect, merge the rebrand, then owner conversations.

The full history is in the [progress log](docs/log/README.md) and decisions are in the [decision register](docs/10-decisions.md).

## Progress

| Date | Milestone |
| --- | --- |
| 30 October 2026 | Zoho Mail set up on pillionweb.co.uk and oscar@pillionweb.co.uk added. The rebrand to Pillion Web, with the new contact email, is prepared in draft pull request [#9](https://github.com/oayton7/quotehelm-site/pull/9). |
| 30 October 2026 | Pillion Web chosen as the brand, replacing Tandem, and pillionweb.co.uk bought. See the [decision register](docs/10-decisions.md). |
| 29 October 2026 | Pilot terms approved (£345 setup, 50% upfront and 50% before go-live, optional £59 a month maintenance) and the live Quotehelm site narrowed to three offers: enquiries to your phone, right details on Google and a new website. See the [decision register](docs/10-decisions.md). |
| 29 October 2026 | Stage 1 test flow working with synthetic enquiries: Tally form → Make → duplicate check → Airtable record → email to Oscar → marked Sent, with failed emails marked Failed. SMS and the wider test suite are next. See the [first test build results](docs/14-first-test-results.md). |

## What is where

| Location | Purpose |
| --- | --- |
| [`site/`](site/) | Tandem website concept: static HTML, CSS and an illustrative workflow demo |
| [`docs/`](docs/) | Business plan, operating playbooks, learning path and next steps |
| [`docs/log/`](docs/log/) | Progress log: one entry per merged pull request, plus a current-state summary |
| [`docs/templates/`](docs/templates/) | Reusable discovery, scope, pilot-result, decision and log entry templates |
| [`archive/`](archive/) | Preservation notes and an exact dated snapshot of Quotehelm |
| Existing root HTML, assets and domain files | Current Quotehelm site, retained during refinement |
| [`scripts/check_starter.py`](scripts/check_starter.py) | Dependency-free checks for links, brand, JavaScript syntax and archive integrity |

This uses ordinary folders in one repository. No nested Git repository or submodule is needed. The archive remains reference material; new changes belong in `site/` and `docs/`.

## Read the plan

1. [Start here and first seven days](docs/00-start-here.md)
2. [Business plan and financial assumptions](docs/01-business-plan.md)
3. [First offer and pricing](docs/02-offer-and-pricing.md)
4. [Build the test system and prove delivery](docs/03-delivery-and-test-plan.md)
5. [Customer discovery and first sales](docs/04-sales-playbook.md)
6. [SEO, GEO and the Grokbot brief](docs/05-search-and-content.md)
7. [Operations, privacy and launch readiness](docs/06-operations.md)
8. [Learning through delivery](docs/07-learning-path.md)
9. [90-day roadmap and decision gates](docs/08-roadmap.md)
10. [Competitors and sources](docs/09-competition-and-sources.md)
11. [Brand and unresolved decisions](docs/10-decisions.md)
12. [Using this repository and launching safely](docs/11-repository-guide.md)
13. [Progress log and current state](docs/log/README.md)
14. [Build the test enquiry flow](docs/12-test-build-guide.md)
15. [First pilot pack: offer, messages and first conversation](docs/13-first-pilot-pack.md)
16. [First test build results](docs/14-first-test-results.md)

## Preview the Tandem site

From the repository root, run:

```sh
python3 -m http.server 8000 --directory site
```

Open `http://localhost:8000`. The website is intentionally marked `noindex,nofollow`. Its enquiry demonstration sends nothing. The contact action prepares an email draft addressed to Oscar’s existing Quotehelm email; a Tandem domain/email has not been selected or verified.

The scope and separate running-cost wording are **proposals**, not approved customer promises. The £345 setup figure comes from the current Quotehelm offer. Do not remove the concept notices until those decisions are settled.

## Validate

```sh
python3 scripts/check_starter.py
```

Python 3 is required. Node.js, when installed, is used to check inline JavaScript syntax. Browser QA remains necessary for layout and interaction changes. This is a static starter, not a production backend or an automation implementation.

## Contribution and deployment

Create a branch, change a bounded part, check it, and open a pull request. Keep production deployment as a separate decision. Do not copy `site/` over the root without the migration checklist in the repository guide.

The root site is documented as deploying from `main`. This starter does not change that configuration. A future deployment should publish only the intended website directory, not this entire repository or its archive. The current GitHub Pages hosting arrangement also needs review against GitHub’s commercial-use restrictions.

This is a public repository. Never commit credentials, real customer submissions, lead lists, private financial records or employer information. Templates contain no real customer data.

Prepared 28 October 2026. Public competitor offers and assumptions are dated in the source register. Recommendations are hypotheses to test, not revenue forecasts or guarantees. No new licence is granted over the existing materials.
