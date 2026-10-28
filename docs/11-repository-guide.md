# Use this repository and launch safely

## Why one repository

The website, business guidance and archive evolve together. Ordinary folders are easier to navigate and review than a nested repository or submodule. A submodule is useful for an independently maintained dependency; it offers little benefit here.

The proposed structure is `site/`, `docs/`, `archive/` and `scripts/`. The existing root site is retained temporarily so a starter branch does not change the current customer-facing site. The archive is an exact copy of the original tracked files, with Git history as a second recovery route.

## Preview and edit

Open the repository in your coding tool. Read the root README and the relevant guide before changes. Start a server from the repository root:

```sh
python3 -m http.server 8000 --directory site
```

Open `http://localhost:8000`. The internal guide at `/guide.html` is a generated, readable version of the Markdown documents. Change the Markdown sources, then regenerate it:

```sh
python3 scripts/build_guide.py
python3 scripts/check_starter.py
```

The original archived site must be served separately because it uses root-relative URLs:

```sh
python3 -m http.server 8001 --directory archive/quotehelm-2026-10-28
```

## A small change through GitHub

1. Pull the latest agreed base branch and create a new branch for a single change.
2. Tell the coding assistant what should change, what should remain, and how success will be checked.
3. Inspect the diff. Check wording, prices, links and data destinations.
4. Add a [progress log](log/README.md) entry for the change.
5. Run the validation script; use a browser for interaction and mobile checks.
6. Commit the change and open a pull request explaining the problem, result and checks.
7. Review before merging. Understand whether a merge triggers deployment.

Example after the starter has been merged:

```sh
git switch main
git pull --ff-only
git switch -c improve-tandem-offer
# Edit and check the relevant files.
git add site docs
git commit -m "Clarify Tandem enquiry setup scope"
git push -u origin improve-tandem-offer
```

The repository’s current GitHub Pages arrangement is documented as serving the root of `main`; check actual settings before acting. A branch or draft pull request is not a deployment of Tandem.

## Production migration checklist

- [ ] Approve brand, domain, email and legal identity.
- [ ] Approve product scope, pricing, usage, support and cancellation terms.
- [ ] Complete the real delivery test case and operational readiness checklist.
- [ ] Select a commercially appropriate host; review [GitHub Pages restrictions](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- [ ] Configure publication of **only `site/`**, excluding `guide.html`, archives, business documents and tests from the customer deployment.
- [ ] Remove internal concept/guide links from production pages and replace them with customer content.
- [ ] Configure the actual enquiry route and test receipt; approve privacy wording.
- [ ] Add verified canonical URLs, social metadata, sitemap and accurate structured data for the chosen domain.
- [ ] Remove `noindex` only from intended public pages after staging checks.
- [ ] Map retained old URLs to relevant new pages; preserve useful trade/service content rather than deleting URLs blindly.
- [ ] Preserve email MX, SPF, DKIM and DMARC records when changing web hosting.
- [ ] Confirm HTTPS, redirects, 404 handling, mobile layout, keyboard use and form failures.
- [ ] Record backup, deployment and rollback steps; agree a release window.

Do not deploy this entire repository as the new site. A later clean-up can remove obsolete root files from the production source once the migration and archive have been verified.

## Public and private material

Business strategy and templates are intentionally in this public repository. Store signed contracts, private finances, customer records, secrets and outreach lists elsewhere. Do not commit a filled client template here. Review every upload and diff, including generated files.

If GitHub write access is unavailable, this pack can still be imported locally on a branch and uploaded after authentication is restored. Never replace the remote repository or force-push to bypass an access problem.
