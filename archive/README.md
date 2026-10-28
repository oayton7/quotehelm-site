# Quotehelm archive

`quotehelm-2026-10-28/` is an exact file snapshot of the repository at commit `267929a5eeaf0849224d72a9597a4b9646a7ce15`, before the Tandem starter was added. This includes the original README, trade and area pages, pricing, demos, CSS, JavaScript, images, sitemap and domain file.

Original commit: https://github.com/oayton7/quotehelm-site/tree/267929a5eeaf0849224d72a9597a4b9646a7ce15

Treat the archive as read-only. It is not a second active website. The root original files are also retained so the draft branch does not silently replace the current site.

To view the original site locally, serve the snapshot as the web root:

```sh
python3 -m http.server 8001 --directory archive/quotehelm-2026-10-28
```

Its root-relative links require this separate server root. Opening a nested HTML file directly will not reproduce the original correctly.

Do not publish this folder as part of the future Tandem deployment: it contains original indexable pages, contact endpoints and a `CNAME` that belongs to the old site. The validation script compares snapshot bytes with the original Git commit. Git history provides a second recovery route.
