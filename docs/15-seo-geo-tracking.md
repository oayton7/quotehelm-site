# SEO and GEO tracking

How to tell whether search and AI visibility are improving for Pillion Web. It follows the measurement approach in [SEO, GEO and the Grokbot brief](05-search-and-content.md): a small fixed set of questions, checked on dated occasions, plus Search Console data. Results vary by wording, location and personalisation, so treat them as direction, not proof. Never promise rankings or AI mentions to anyone.

## What is on the site

- Home, prices, contact, seven trade pages (including scaffolders) and six town pages (Chichester, Bognor Regis, Worthing, Brighton, Portsmouth, Southampton), each with a unique title, description, canonical URL and accurate structured data. Town and trade pages use question headings with the answer first, and FAQ structured data that matches the visible questions.
- Structured data names the business as Pillion Web with Quotehelm as the alternate (previous) name.
- `llms.txt` summarises the services, prices and pages in plain text.
- Guides at `/guides/` answer buyer questions: missed enquiries, checking business details on Google, what a trades website costs, what a quote form does for a scaffolder, what Pillion Web costs, how Google review requests work, and what AI chat can and cannot do. Each guide has article and breadcrumb structured data and a named author.
- `robots.txt` keeps internal folders out of search; the sitemap lists every public page.

Do not add pages that only swap a trade or town name. Add a guide only when it answers a real question from conversations or Search Console.

## Off-site checklist (Oscar)

| Task | Why | Status |
| --- | --- | --- |
| Verify pillionweb.co.uk in Google Search Console and submit the sitemap | See indexing and real search queries | Done 31 October 2026 (domain property) |
| Use Change of address from the getquotehelm.co.uk property | Moves Google’s signals to the new domain | To do, after the redirect is confirmed |
| Import the site into Bing Webmaster Tools | Bing feeds ChatGPT search and Copilot | Done 31 October 2026 |
| Check Google Business Profile eligibility as a service-area business | Maps visibility; Google excludes online-only businesses | Eligible: Oscar meets clients in person when needed (confirmed 10 November 2026). To create and verify, using the draft in [docs/16](16-local-search-pack.md) |
| Create a LinkedIn company page for Pillion Web | A consistent third-party profile that search engines and AI tools can find | Done 31 October 2026; linked from the site’s structured data (`sameAs`) |
| List on two or three free UK directories with identical name, email and website | Consistent mentions across the web | To do: prioritised list in [docs/16](16-local-search-pack.md) |
| Ask each real client for a Google review and permission for a case study | The strongest trust signal | After first jobs |

Use exactly “Pillion Web” and oscar@pillionweb.co.uk everywhere. Mention “previously Quotehelm” where a profile allows a description.

## Fixed question set

Ask each question in a logged-out or private browser window, from the UK, on the same assistants each time. Record the date, whether Pillion Web is mentioned or linked, and what is cited instead.

1. Who can add a quote form to my trades website in Chichester?
2. Web designer for plumbers in West Sussex
3. How do I stop missing enquiries when I am on a job?
4. How do I check my business phone number on Google is correct?
5. How much does a website for a plumber cost in the UK?
6. Pillion Web Chichester
7. Quotehelm Chichester
8. Website fixes for scaffolders in Chichester
9. Who can add a quote form to a roofer's website in Portsmouth?

## Lighthouse

Mobile Lighthouse scores, run locally against a test server on 10 November 2026 (performance, accessibility, best practices, SEO). Live scores also depend on GitHub Pages and the network.

| Page | Before | After |
| --- | --- | --- |
| Home | 99, 100, 100, 100 | 100, 100, 100, 100 |
| Roofers | 100, 100, 100, 100 | 100, 100, 100, 100 |
| Chichester | 100, 100, 100, 100 | 100, 100, 100, 100 |
| Missed enquiries guide | 100, 100, 100, 100 | 100, 100, 100, 100 |
| Prices | 100, 100, 100, 100 | 100, 100, 100, 100 |
| Contact | 100, 100, 100, 100 | 100, 100, 100, 100 |
| Scaffolders (new) | n/a | 100, 100, 100, 100 |
| Portsmouth (new) | n/a | 100, 100, 100, 100 |
| Brighton (new) | n/a | 100, 100, 100, 100 |
| Scaffolder quote form guide (new) | n/a | 100, 100, 100, 100 |

## Results log

| Date | Assistant or search | Question | Pillion Web mentioned or linked? | Notes |
| --- | --- | --- | --- | --- |
| | Google | 6 | | |
| | ChatGPT | 1 | | |
| | Perplexity | 3 | | |

Check monthly. Compare with Search Console queries and with how real enquiries say they found you. Record findings in the progress log.
