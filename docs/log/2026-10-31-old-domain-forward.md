# 2026-10-31 · getquotehelm.co.uk forwards to pillionweb.co.uk

- **Date:** 2026-10-31
- **Author:** Claude Code
- **Pull request:** [oayton7/quotehelm-site#10](https://github.com/oayton7/quotehelm-site/pull/10)
- **What changed:** Recorded Oscar's work outside the repository: a permanent (301) forward from getquotehelm.co.uk to https://pillionweb.co.uk at Porkbun, keeping paths and covering subdomains, and a free Porkbun certificate so https links to the old domain also redirect. Email records on the old domain were left in place. README status and Progress updated.
- **Why:** Old links, search results and past emails point at getquotehelm.co.uk; the forward keeps them working and passes search signals to the new domain.
- **Decisions affected:** D08.
- **Open items / next steps:** Confirm the redirect from a fresh device once DNS has updated, remove a duplicate forward entry, check Enforce HTTPS in GitHub Pages, then add pillionweb.co.uk to Search Console and use Change of address.
