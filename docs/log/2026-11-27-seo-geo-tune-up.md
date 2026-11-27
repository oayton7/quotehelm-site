# 2026-11-27 · SEO and GEO tune-up: About page, more questions, cleaner form markup

- **Date:** 2026-11-27
- **Author:** Claude Code
- **Pull request:** [oayton7/quotehelm-site#17](https://github.com/oayton7/quotehelm-site/pull/17)
- **What changed:** Added an About page (`/about/`) answering who runs Pillion Web, what it does and does not do, where it works and how a job runs, with AboutPage, Person, FAQ and breadcrumb structured data, linked from every footer, the sitemap and `llms.txt`. Added question sections with FAQ markup to the electrician, decorator and kitchen fitter pages, so all seven trade pages have them. Removed the "Placeholder: this form is not connected yet" notice from the home and contact page HTML: the form is connected, and crawlers that do not run scripts were reading the notice. Added `knowsAbout` to the business structured data on all 23 pages. Shortened the home and Chichester meta descriptions. Recorded a first search baseline and Lighthouse results in `docs/15`, and updated the to-do list.
- **Why:** Oscar asked for the SEO and GEO work to be pushed further now the Business Profile may be live. AI answer tools rely on plain, crawlable statements about who a business is and what it does.
- **Decisions affected:** None. The About page keeps the D03 offer and states what Pillion Web does not do.
- **Open items / next steps:** Oscar to send the Business Profile link (to add to `sameAs`) and ask the free-job client for a review. Repeat the question set monthly from a UK browser and compare with Search Console.
