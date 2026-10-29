#!/usr/bin/env python3
"""Render this repository's small Markdown subset into a portable guide.

Supports headings, paragraphs, fenced code, flat lists, tables, blockquotes,
inline code, bold text and links. No HTML from the Markdown is executed.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
LOG = DOCS / "log"
# The log reads newest first after its README; templates stay last.
LOG_ENTRIES = sorted((p for p in LOG.glob("*.md") if p.name != "README.md"), reverse=True)
FILES = sorted(DOCS.glob("*.md")) + [LOG / "README.md", *LOG_ENTRIES] + sorted((DOCS / "templates").glob("*.md"))


def doc_id(path):
    return "doc-" + path.relative_to(DOCS).as_posix().replace("/", "-").removesuffix(".md")


def inline(text, current):
    def link(match):
        label, target = match.groups()
        if not re.match(r"^[a-z]+:", target) and not target.startswith("#"):
            dest = (current.parent / target.split("#")[0]).resolve()
            if dest in FILES:
                target = "#" + doc_id(dest)
            elif dest == DOCS / "templates":
                target = "#templates"
        return '<a href="' + html.escape(target, quote=True) + '">' + html.escape(label) + '</a>'
    tokens = []
    def save(value):
        tokens.append(value)
        return "\x00" + str(len(tokens) - 1) + "\x00"
    text = re.sub(r"`([^`]+)`", lambda m: save("<code>" + html.escape(m[1]) + "</code>"), text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", lambda m: save(link(m)), text)
    text = html.escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return re.sub(r"\x00(\d+)\x00", lambda m: tokens[int(m[1])], text)


def render(path):
    lines = path.read_text().splitlines()
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("```"):
            code = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                code.append(lines[i])
                i += 1
            out.append("<pre><code>" + html.escape("\n".join(code)) + "</code></pre>")
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-+:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            out.append('<div class="table-scroll"><table><thead><tr>' + ''.join('<th>' + inline(c, path) + '</th>' for c in rows[0]) + '</tr></thead><tbody>')
            out.extend('<tr>' + ''.join('<td>' + inline(c, path) + '</td>' for c in row) + '</tr>' for row in rows[1:])
            out.append('</tbody></table></div>')
            continue
        heading = re.match(r"^(#{1,5}) (.*)", line)
        if heading:
            level = min(len(heading[1]) + 1, 6)
            out.append(f'<h{level}>' + inline(heading[2], path) + f'</h{level}>')
            i += 1
            continue
        if line.startswith("> "):
            quote = []
            while i < len(lines) and lines[i].startswith("> "):
                quote.append(lines[i][2:])
                i += 1
            out.append('<blockquote>' + inline(" ".join(quote), path) + '</blockquote>')
            continue
        if re.match(r"^(?:- |\d+\. )", line):
            ordered = bool(re.match(r"^\d+\. ", line))
            pattern = r"^\d+\. " if ordered else r"^- "
            tag = "ol" if ordered else "ul"
            out.append('<' + tag + '>')
            while i < len(lines) and re.match(pattern, lines[i]):
                item = re.sub(pattern, '', lines[i])
                item = item.replace('[ ] ', '☐ ', 1)
                out.append('<li>' + inline(item, path) + '</li>')
                i += 1
            out.append('</' + tag + '>')
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(?:#|\||>|```|- |\d+\. )", lines[i]):
            paragraph.append(lines[i])
            i += 1
        out.append('<p>' + inline(" ".join(paragraph), path) + '</p>')
    return "\n".join(out)


def build():
    titles = {p: p.read_text().splitlines()[0].removeprefix("# ") for p in FILES}
    toc = '<ol class="guide-toc">' + ''.join('<li><a href="#' + doc_id(p) + '">' + html.escape(titles[p]) + '</a></li>' for p in FILES) + '</ol>'
    sections = []
    for p in FILES:
        if p == next(iter(sorted((DOCS / 'templates').glob('*.md'))), None):
            sections.append('<div id="templates"></div>')
        sections.append('<section id="' + doc_id(p) + '">' + render(p) + '<p class="fine"><a href="#contents">Back to contents ↑</a></p></section>')
    output = '''<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Tandem — Oscar’s business plan and launch guide</title><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><style>.guide-toc{columns:2;column-gap:40px}.guide-toc li{break-inside:avoid;font-size:14px}pre{overflow:auto;padding:20px;background:#e8eddd;font-size:13px}code{overflow-wrap:anywhere}blockquote{border-left:3px solid #173f35;margin:24px 0;padding:20px;background:#e8eddd}section{scroll-margin-top:24px}section+section{margin-top:65px;border-top:1px solid #cbd5c1}.report h3{margin-top:30px}.report h2{font-size:38px}.guide-intro{max-width:850px}@media(max-width:700px){.guide-toc{columns:1}.report h2{font-size:31px}}</style></head><body><a class="skip" href="#main">Skip to content</a><div class="reviewbar"><span>TANDEM STARTER · 28 OCTOBER 2026</span><a href="index.html">Open website concept ↗</a></div><header class="wrap nav"><a class="brand" href="index.html"><span class="brandmark" aria-hidden="true">t</span>Tandem.</a></header><main id="main" class="wrap report"><p class="eyebrow">PREPARED FOR OSCAR AYTON</p><h1>Build one useful service.<br>Prove it. Then expand.</h1><p class="intro guide-intro">The business plan, operating playbooks and next steps for Tandem. Start with one paid enquiry-capture installation and measure whether the same offer can be sold and delivered reliably.</p><div class="callout"><strong>Working plan, not a completed launch.</strong><p>Tandem is the selected working name; brand and domain clearance are pending. The website is a concept. Pricing, service terms and delivery systems still need validation. Real client records belong outside the public repository.</p></div><h2 id="contents">Contents</h2>'''
    output += toc + '\n'.join(sections) + '</main></body></html>\n'
    return output


if __name__ == '__main__':
    (ROOT / 'site/guide.html').write_text(build())
    print(f'Generated site/guide.html from {len(FILES)} documents.')
