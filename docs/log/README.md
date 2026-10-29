# Progress log

This log records how the project has progressed so that every person and AI agent working here can see what was done, why, and what comes next. Git history records each file change and the [decision register](../10-decisions.md) records decisions. The log fills the gap between them: one short, readable entry for every merged pull request, plus Oscar's work outside the repository when it is reported.

## Current state

Last updated 2026-10-30. Update this section when a merge changes the overall picture.

- **Live site:** the root Quotehelm site at getquotehelm.co.uk, positioned for Chichester and the South East, offering three services: enquiries to your phone (£345), right details on Google (£225) and a new website (£1,095), with optional £59 a month maintenance. Quote forms go to Formspree.
- **Pilot terms:** approved (D04, D05, D07). Setup is 50% upfront and 50% before go-live, built in Oscar's accounts and handed over on full payment.
- **Test build:** Stage 1 works with synthetic enquiries (form, duplicate check, Airtable record, email, Sent or Failed). SMS and most acceptance tests are still to do.
- **Brand:** Pillion Web chosen to replace the working name Tandem (D01), and pillionweb.co.uk bought (D08). Companies House and trademark checks are pending. Quotehelm stays live until the move.
- **Deployment:** GitHub Pages serves the whole repository. `robots.txt` keeps internal folders out of search until deployment publishes only the website.
- **Next:** owner conversations; Zoho email on pillionweb.co.uk, then the site rebrand, redirects and Search Console change of address; Stage 2 (SMS).

## Rules

- **Every merge gets an entry.** Add the entry in the same pull request as the change, so it lands when the pull request is merged. After opening the pull request, set its link in the entry and push.
- **Catch up at the start of a session.** Compare recently merged pull requests with the log. Add a backfilled entry, in your own pull request, for any merge without one (for example a pull request Oscar merged himself).
- **Work outside the repository** (calls, research, supplier checks) is logged only when Oscar reports it, with "None (outside the repository)" as the pull request.
- **Keep entries short and sanitised.** This repository is public. Never log names, contact details or messages of customers or leads, quotes from suppliers, private finances, employer information or credentials. Summarise instead, for example "three discovery calls; two mentioned missed enquiries".
- **Refer to decisions by ID** (for example D04). Record the decision itself in the register, not here.
- **Do not rewrite old entries.** If something turns out wrong, add a new entry that corrects it.

## Writing an entry

Create `docs/log/YYYY-MM-DD-short-description.md`, using the date the entry is written, and copy the fields from the [log entry template](../templates/log-entry.md). Entries are listed newest first in the generated guide. Order within a single day is approximate; the pull request links give the exact order. Then regenerate the guide and run the checks:

```sh
python3 scripts/build_guide.py
python3 scripts/check_starter.py
```

The check script fails if an entry is missing a field or its file name does not start with a valid date.
