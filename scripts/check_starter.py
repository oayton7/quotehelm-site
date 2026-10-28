#!/usr/bin/env python3
"""Check the starter, not the legacy site's known production limitations."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
BASE = '267929a5eeaf0849224d72a9597a4b9646a7ce15'
errors = []


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids, self.robots, self.h1 = [], set(), None, 0
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:
                errors.append('Duplicate HTML id: ' + a['id'])
            self.ids.add(a['id'])
        for attr in ('href', 'src'):
            if attr in a:
                self.links.append(a[attr])
        if tag == 'meta' and a.get('name') == 'robots':
            self.robots = a.get('content', '')
        if tag == 'h1':
            self.h1 += 1


pages = {p.resolve(): Page(p.read_text()) for p in (ROOT / 'site').glob('*.html')}
for path, page in pages.items():
    if page.h1 != 1:
        errors.append(f'{path.name}: expected one h1')
    if not page.robots or 'noindex' not in page.robots:
        errors.append(f'{path.name}: preview must remain noindex')
    for target in page.links:
        u = urlsplit(target)
        if u.scheme or u.netloc:
            continue
        dest = (path.parent / unquote(u.path)).resolve() if u.path else path
        if not dest.exists():
            errors.append(f'{path.name}: missing local link {target}')
        elif u.fragment and dest in pages and unquote(u.fragment) not in pages[dest].ids:
            errors.append(f'{path.name}: missing fragment {target}')

for path in [ROOT / 'README.md', *ROOT.glob('docs/**/*.md'), ROOT / 'archive/README.md']:
    for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', path.read_text()):
        u = urlsplit(target)
        if not u.scheme and not u.netloc and u.path:
            if not (path.parent / unquote(u.path)).exists():
                errors.append(f'{path.relative_to(ROOT)}: missing link {target}')

home = (ROOT / 'site/index.html').read_text()
if 'Tandem' not in home or 'trading as Tandem' in home:
    errors.append('Brand must be Tandem concept, without claiming cleared trading identity')
if 'formspree.io' in home:
    errors.append('Concept must not silently submit to the legacy backend')

from build_guide import build
if (ROOT / 'site/guide.html').read_text() != build():
    errors.append('Generated guide is stale: run python3 scripts/build_guide.py')

node = shutil.which('node')
if node:
    for path in pages:
        scripts = re.findall(r'<script>([\s\S]*?)</script>', path.read_text())
        for script in scripts:
            result = subprocess.run([node, '--check'], input=script, text=True, capture_output=True)
            if result.returncode:
                errors.append(f'{path.name}: JavaScript syntax: {result.stderr}')
else:
    print('LIMIT: Node unavailable; JavaScript syntax not checked.')

git = shutil.which('git')
# Deliberate fixes to the live root site since the snapshot; the archive copy stays unchanged.
LIVE_FIXES = {
    'robots.txt',      # keep docs/, archive/, site/ and scripts/ out of search
    'assets/site.js',  # send every ticked product in the quote form
}
has_base = git and subprocess.run([git, 'cat-file', '-e', BASE + '^{commit}'], cwd=ROOT, capture_output=True).returncode == 0
if has_base:
    files = subprocess.check_output([git, 'ls-tree', '-r', '--name-only', BASE], cwd=ROOT, text=True).splitlines()
    for name in files:
        original = subprocess.check_output([git, 'show', BASE + ':' + name], cwd=ROOT)
        archived = ROOT / 'archive/quotehelm-2026-10-28' / name
        if not archived.exists() or archived.read_bytes() != original:
            errors.append('Archive mismatch: ' + name)
        if name != 'README.md' and name not in LIVE_FIXES and (ROOT / name).read_bytes() != original:
            errors.append('Unexpected original root file change: ' + name)
    print(f'Checked {len(files)} archived files against the original commit.')
else:
    print('LIMIT: Original commit unavailable; archive byte comparison skipped.')

assert 1250+12*39 == 1718 and 99+12*49 == 687 and 200+12*149 == 1988
assert 12*37 == 444 and 345+12*59 == 1053 and 1095+12*79 == 2043
assert 345-20-4*40 == 165 and 345-20-8*40 == 5 and 59-20-.5*40 == 19 and 59-20-40 == -1

if errors:
    print('\n'.join('FAIL: ' + e for e in errors))
    sys.exit(1)
print('PASS: local links, fragments, concept boundaries, guide freshness, available syntax/archive checks and planning arithmetic.')
