# Tandem working instructions

- Read README.md and docs/10-decisions.md before changing the offer or site.
- At the start of each session, read the current state and latest entries in docs/log/README.md and docs/log/. Then compare recently merged pull requests with the log and backfill an entry, in your own pull request, for any merge without one.
- Every pull request adds one progress log entry in docs/log/ (template: docs/templates/log-entry.md), so every merge is logged. After opening the pull request, set its link in the entry and push. Update the log's current-state summary when the overall picture changes. Log Oscar's work outside the repository only when Oscar reports it, sanitised.
- Every pull request also updates README.md: refresh the "Current status" section and add a row to the Progress table, so Oscar and other agents (including Grok) see the latest state on the repository front page.
- New website work belongs in site/. Business guidance belongs in docs/.
- archive/quotehelm-2026-10-28 is an immutable snapshot. Preserve it exactly.
- The root legacy website remains in place until a separate production migration.
- Keep Tandem described as a working brand until clearance is recorded. Keep the existing contact address until a replacement is approved.
- Do not turn proposed prices, support terms, demonstrations or forecasts into confirmed claims without evidence.
- Never commit credentials, customer submissions, lead lists, signed contracts or private financial/employer information.
- Real outreach and client communications require explicit human authorisation; draft preparation is separate from sending.
- Regenerate site/guide.html with scripts/build_guide.py after changing docs, then run scripts/check_starter.py.
- Use a branch and pull request for changes. Do not merge or deploy unless the user requests that action.
- Deployment must exclude archives, internal guides and business documents. Follow docs/11-repository-guide.md.
