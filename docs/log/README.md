# Progress log

This log records how the project has progressed so that every person and AI agent working here can see what was done, why, and what comes next. Git history records each file change and the [decision register](../10-decisions.md) records decisions. The log fills the gap between them: one short, readable entry for every merged pull request, plus Oscar's work outside the repository when it is reported.

## Current state

Last updated 2026-10-28. Update this section when a merge changes the overall picture.

- **Live site:** the root Quotehelm site at getquotehelm.co.uk, positioned for Chichester and the South East, with quote forms sent to Formspree.
- **Tandem:** a working brand with a static concept in `site/` and a business plan in `docs/`. Brand clearance, offer terms and production deployment are not done.
- **Deployment:** GitHub Pages serves the whole repository. `robots.txt` keeps internal folders out of search until deployment publishes only the website.
- **Next:** build and test the first enquiry-capture workflow, hold discovery conversations and resolve the open decisions in the register.

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
