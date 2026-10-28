# 2026-10-28 · Keep internal folders out of search; send every ticked product

- **Date:** 2026-10-28
- **Author:** Claude Code
- **Pull request:** [oayton7/quotehelm-site#6](https://github.com/oayton7/quotehelm-site/pull/6)
- **What changed:** `robots.txt` now blocks `docs/`, `archive/`, `site/`, `scripts/` and internal files for every listed crawler. The quote form now sends all ticked products in one field. Both files were added to `LIVE_FIXES` in the check script.
- **Why:** GitHub Pages publishes the whole repository, so the business plan and archive were reachable on getquotehelm.co.uk. Formspree could drop all but one ticked product.
- **Decisions affected:** Relates to D09/D10. The full fix is publishing only the website files.
- **Open items / next steps:** Internal files can still be opened by direct link until deployment publishes only the site. Backfilled on 2026-10-28.
