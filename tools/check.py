#!/usr/bin/env python3
"""The gate before anything is pushed: python3 tools/check.py

Runs the data files in a headless browser-free way (Node, if present) and checks
what a reader would never notice until it misled someone at the altar:

  * every step, custom, basics section and role cites a source that exists
  * every place a step names exists on the plan
  * every step has a title, a part that exists, and a server posture
  * no em dash in any file (GitHub Pages serves them all; house rule, see CLAUDE.md)
  * every internal #link points at a view, a step or a source that exists
  * no leftover TEST or TODO text in served data

Exit code 1 on any failure.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The em dash and its HTML spellings, built in pieces so this file passes its own check.
EM_DASHES = ('\u2014', '&' + 'mdash;', '&#' + '8212;')
VIEWS = {'guide', 'responses', 'charts', 'customs', 'basics', 'high-mass', 'checklist', 'sources'}
POSTURES = {'kneel', 'stand', 'move', 'genuflect', 'sit'}
AUTHS = {'rubric', 'custom', 'manual', 'local'}

failures = []


def fail(msg):
    failures.append(msg)


def served_files():
    # GitHub Pages serves every file in the branch, so every file is checked.
    for dirpath, dirnames, names in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d != '.git']
        for n in names:
            yield os.path.join(dirpath, n)


def load_data():
    """Evaluate data/*.js and js/plan.js's POINTS with Node and return them as JSON."""
    script = r"""
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = process.argv[1];
// The context's global object stands in for the browser's window, so
// `window.SERVING = ...` makes a global SERVING exactly as it does in a page.
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['data/sources.js', 'data/low-mass.js', 'data/extras.js', 'js/plan.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
process.stdout.write(JSON.stringify({ S: ctx.SERVING, POINTS: ctx.PLAN_POINTS }));
"""
    try:
        out = subprocess.run(['node', '-e', script, ROOT], capture_output=True, text=True, check=True).stdout
    except FileNotFoundError:
        print('node is not installed; skipping the data checks')
        return None, None
    except subprocess.CalledProcessError as e:
        fail('data files do not load: ' + e.stderr.strip().splitlines()[-1] if e.stderr else 'data files do not load')
        return None, None
    d = json.loads(out)
    return d['S'], d['POINTS']


def check_cites(where, cites, sources):
    if not cites:
        fail(f'{where}: no source cited')
        return
    for c in cites:
        if not isinstance(c, list) or not c:
            fail(f'{where}: malformed citation {c!r}')
        elif c[0] not in sources:
            fail(f'{where}: cites unknown source {c[0]!r}')


def main():
    # 1. no em dashes in anything served
    for p in served_files():
        rel = os.path.relpath(p, ROOT)
        try:
            text = open(p, encoding='utf-8').read()
        except UnicodeDecodeError:
            continue
        for i, line in enumerate(text.splitlines(), 1):
            if any(d in line for d in EM_DASHES):
                fail(f'{rel}:{i}: em dash (use a full stop, comma, colon or brackets)')
        if rel.startswith('data') and re.search(r'\b(TEST|TODO|TK)\b', text):
            fail(f'{rel}: leftover TEST/TODO text')

    S, POINTS = load_data()
    if S is None:
        return finish()

    sources = {s['key']: s for s in S.get('sources', [])}
    for s in S.get('sources', []):
        for k in ('key', 'short', 'title'):
            if not s.get(k):
                fail(f'source {s.get("key")!r}: missing {k}')
    parts = {p['key'] for p in S.get('parts', [])}

    steps = S.get('lowMass', {}).get('steps', [])
    if not steps:
        fail('data/low-mass.js: no steps')
    ids = set()
    for st in steps:
        sid = st.get('id', '?')
        where = f'step {sid!r}'
        if sid in ids:
            fail(f'{where}: duplicate id')
        ids.add(sid)
        if not re.fullmatch(r'[a-z0-9-]+', sid):
            fail(f'{where}: id must be lowercase letters, digits and hyphens')
        for k in ('title', 'short', 'part'):
            if not st.get(k):
                fail(f'{where}: missing {k}')
        if st.get('short') and len(st['short']) > 26:
            fail(f'{where}: short label over 26 characters (charts cut it off)')
        if st.get('part') not in parts:
            fail(f'{where}: unknown part {st.get("part")!r}')
        server = st.get('server') or {}
        if server.get('posture') not in POSTURES:
            fail(f'{where}: server posture must be one of {sorted(POSTURES)}')
        if st.get('auth') and st['auth'] not in AUTHS:
            fail(f'{where}: unknown authority {st["auth"]!r}')
        for who in ('priest', 'server', 'server2'):
            at = (st.get(who) or {}).get('at')
            if at and at not in POINTS:
                fail(f'{where}: {who} at unknown place {at!r}')
        if st.get('missal') and st['missal'] not in POINTS:
            fail(f'{where}: missal at unknown place {st["missal"]!r}')
        for mk in st.get('marks') or []:
            if isinstance(mk.get('at'), str) and mk['at'] not in POINTS:
                fail(f'{where}: mark at unknown place {mk["at"]!r}')
        for r in st.get('routes') or []:
            for v in (r.get('via') or []) + (r.get('genuflect') or []):
                if isinstance(v, str) and v not in POINTS:
                    fail(f'{where}: route through unknown place {v!r}')
        for line in st.get('say') or []:
            if line.get('who') not in ('P', 'S', 'B'):
                fail(f'{where}: a line has who={line.get("who")!r}; use P, S or B')
            if not line.get('la') and not line.get('cue'):
                fail(f'{where}: a line has neither Latin nor a cue')
            if line.get('who') == 'S' and line.get('la') and not line.get('en'):
                fail(f'{where}: your line {line["la"][:30]!r} has no English')
        bell = st.get('bell')
        if bell:
            if bell.get('auth') not in AUTHS:
                fail(f'{where}: bell needs auth (rubric/custom/manual/local)')
            check_cites(where + ' bell', bell.get('cite'), sources)
        check_cites(where, st.get('cite'), sources)

    for i, c in enumerate(S.get('customs', [])):
        where = f'customs row {i + 1} ({c.get("practice", "?")[:30]})'
        if c.get('auth') not in AUTHS:
            fail(f'{where}: unknown authority')
        check_cites(where, c.get('cite'), sources)
    for sec in S.get('basics', []):
        check_cites(f'basics {sec.get("title")!r}', sec.get('cite'), sources)
    for role in (S.get('highMass') or {}).get('roles', []):
        check_cites(f'role {role.get("name")!r}', role.get('cite'), sources)
    ex = S.get('exceptions')
    if ex:
        cols = {c['key'] for c in ex.get('cols', [])}
        for r in ex.get('rows', []):
            missing = cols - set((r.get('cells') or {}).keys())
            if missing:
                fail(f'exceptions row {r.get("name")!r}: no answer for {sorted(missing)}')
            check_cites(f'exceptions row {r.get("name")!r}', r.get('cite'), sources)

    # internal links in the HTML and the data must land somewhere
    blob = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    blob += json.dumps(S, ensure_ascii=False)
    for h in set(re.findall(r'href=\\?"#([^"\\]+)', blob)):
        if h in VIEWS:
            continue
        if h.startswith('s-') and h[2:] in ids:
            continue
        if h.startswith('src-') and h[4:] in sources:
            continue
        fail(f'link to #{h} goes nowhere')

    print(f'{len(steps)} steps, {len(sources)} sources, {len(S.get("customs", []))} rubric-or-custom rows checked')
    return finish()


def finish():
    if failures:
        print(f'\n{len(failures)} problem(s):')
        for f in failures:
            print('  FAIL ' + f)
        sys.exit(1)
    print('all checks passed')


if __name__ == '__main__':
    main()
