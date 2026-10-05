#!/usr/bin/env python3
"""The gate before anything is pushed: python3 tools/check.py

Runs the data files in a headless browser-free way (Node, if present) and checks
what a reader would never notice until it misled someone at the altar:

  * every step, custom, basics section and role cites a source that exists
  * every place a step names exists on the plan
  * every step has a title, a part that exists, and a server posture
  * every position at every form of Mass (data/low-mass-two.js,
    data/missa-cantata.js, data/solemn-mass.js) is drawn at every step it
    takes part in, cites its sources, and borrows only responses that exist
  * no two figures stand on top of each other on any drawing
  * the ready-made sheets (sheets/*.pdf) were made from the current data
  * no em dash in any file (GitHub Pages serves them all; house rule, see CLAUDE.md)
  * every internal #link points at a view, a step or a source that exists,
    and every file the page loads or links to is there
  * no leftover TEST or TODO text in served data

Exit code 1 on any failure.
"""
import hashlib
import json
import math
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The em dash and its HTML spellings, built in pieces so this file passes its own check.
EM_DASHES = ('\u2014', '&' + 'mdash;', '&#' + '8212;')
VIEWS = {'guide', 'sheets', 'responses', 'charts', 'customs', 'basics', 'high-mass', 'checklist', 'sources'}
POSTURES = {'kneel', 'stand', 'move', 'genuflect', 'sit'}
AUTHS = {'rubric', 'custom', 'manual', 'local'}
FACINGS = {'altar', 'people', 'epistle', 'gospel', 'north', 'south'}
DATA_FILES = ['data/sources.js', 'data/low-mass.js', 'data/extras.js',
              'data/low-mass-two.js', 'data/missa-cantata.js', 'data/solemn-mass.js', 'js/plan.js']
# What a ready-made sheet is drawn from: the same list as tools/make-sheets.cjs.
SHEET_INPUTS = ['css/site.css',
                'data/extras.js', 'data/low-mass-two.js', 'data/low-mass.js', 'data/missa-cantata.js',
                'data/solemn-mass.js', 'data/sources.js',
                'js/app.js', 'js/forms.js', 'js/plan.js', 'js/sheets.js']

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
    """Evaluate the data files and js/plan.js with Node and return them as JSON:
    the data as written (before js/forms.js reshapes it), the plan's places and
    cast, and the options js/forms.js knows."""
    script = r"""
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = process.argv[1], files = JSON.parse(process.argv[2]);
// The context's global object stands in for the browser's window, so
// `window.SERVING = ...` makes a global SERVING exactly as it does in a page.
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const raw = JSON.stringify(ctx.SERVING);
vm.runInContext(fs.readFileSync(path.join(root, 'js/forms.js'), 'utf8'), ctx, { filename: 'js/forms.js' });
process.stdout.write(JSON.stringify({ S: JSON.parse(raw), POINTS: ctx.PLAN_POINTS, CAST: ctx.PLAN_CAST,
  OPTIONS: Object.keys(ctx.Forms.OPTIONS), FORMS: ctx.Forms.all.map(f => ({ key: f.key, roles: f.roles.map(r => r.key) })) }));
"""
    try:
        out = subprocess.run(['node', '-e', script, ROOT, json.dumps(DATA_FILES)],
                             capture_output=True, text=True, check=True).stdout
    except FileNotFoundError:
        print('node is not installed; skipping the data checks')
        return None
    except subprocess.CalledProcessError as e:
        fail('data files do not load: ' + (e.stderr.strip().splitlines()[-1] if e.stderr else '?'))
        return None
    return json.loads(out)


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

    d = load_data()
    if d is None:
        return finish()
    S, POINTS, CAST = d['S'], d['POINTS'], d['CAST']

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

    check_forms(S, POINTS, CAST, d['OPTIONS'], sources, parts, ids, steps)
    check_sheets(d['FORMS'])

    # internal links in the HTML and the data must land somewhere
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    for ref in set(re.findall(r'(?:href|src)="([^"#:]+)"', html)):
        if not os.path.exists(os.path.join(ROOT, ref)):
            fail(f'index.html loads or links to {ref}, which does not exist')
    blob = html + json.dumps(S, ensure_ascii=False)
    for h in set(re.findall(r'href=\\?"#([^"\\]+)', blob)):
        if h in VIEWS:
            continue
        if h.startswith('s-') and h[2:] in ids:
            continue
        if h.startswith('src-') and h[4:] in sources:
            continue
        fail(f'link to #{h} goes nowhere')

    n_forms = len(S.get('forms', [])) + 1
    n_pos = sum(len(f['roles']) for f in d['FORMS'])
    print(f'{len(steps)} Low Mass steps, {n_forms} forms of Mass, {n_pos} positions, {len(sources)} sources, '
          f'{len(S.get("customs", []))} rubric-or-custom rows checked')
    return finish()


def check_lines(where, lines, options, form_options):
    """A do or notes list: strings, or {t, if: option} / {t, unless: option}."""
    for l in lines or []:
        if isinstance(l, str):
            if not l.strip():
                fail(f'{where}: an empty line')
            continue
        if not isinstance(l, dict) or not l.get('t'):
            fail(f'{where}: a line is neither text nor {{t, if/unless}}: {l!r}')
            continue
        k = l.get('if') or l.get('unless')
        if not k:
            fail(f'{where}: {l["t"][:30]!r} has no if/unless')
        elif k not in options:
            fail(f'{where}: unknown option {k!r}')
        elif k not in form_options:
            fail(f'{where}: option {k!r} is not offered for this form of Mass')


def check_say(where, say):
    for line in say or []:
        if line.get('who') not in ('P', 'S', 'B'):
            fail(f'{where}: a line has who={line.get("who")!r}; use P, S or B')
        if not line.get('la') and not line.get('cue'):
            fail(f'{where}: a line has neither Latin nor a cue')


def place_of(v):
    if v is None:
        return None
    if isinstance(v, str):
        return {'at': v}
    if isinstance(v, list):
        return {'at': v[0], 'posture': v[1] if len(v) > 1 else None,
                'faces': v[2] if len(v) > 2 else None, 'tag': v[3] if len(v) > 3 else None}
    return v


def check_overlap(where, figures, POINTS, CAST):
    """figures: {key: place name}. Two figures closer than their two radii overlap."""
    keys = [k for k, at in figures.items() if isinstance(at, str) and at in POINTS]
    for i, a in enumerate(keys):
        for b in keys[i + 1:]:
            pa, pb = POINTS[figures[a]], POINTS[figures[b]]
            dist = math.hypot(pa['x'] - pb['x'], pa['y'] - pb['y'])
            need = CAST.get(a, {}).get('r', 10) + CAST.get(b, {}).get('r', 10)
            if dist < need:
                fail(f'{where}: {a} at {figures[a]} and {b} at {figures[b]} overlap '
                     f'({dist:.0f} apart, need {need})')


def check_forms(S, POINTS, CAST, options, sources, parts, low_ids, low_steps):
    # Low Mass with one server: the priest and the server never overlap either.
    for st in low_steps:
        figs = {k: (st.get(w) or {}).get('at') for k, w in (('p', 'priest'), ('s', 'server'))}
        check_overlap(f'low1 step {st.get("id")!r}', figs, POINTS, CAST)

    keys = set()
    for form in S.get('forms', []):
        fk = form.get('key', '?')
        if fk in keys or fk == 'low1':
            fail(f'form {fk!r}: duplicate key')
        keys.add(fk)
        for k in ('name', 'short', 'roles', 'steps'):
            if not form.get(k):
                fail(f'form {fk!r}: missing {k}')
        if form.get('kind') not in ('low', 'high'):
            fail(f'form {fk!r}: kind must be low or high')
        form_options = set(form.get('options') or [])
        for k in form_options - set(options):
            fail(f'form {fk!r}: unknown option {k!r}')
        roles = form.get('roles') or []
        role_keys = [r.get('key') for r in roles]
        figure_owner = {}
        for r in roles:
            if not r.get('key') or not r.get('name') or not r.get('figures'):
                fail(f'form {fk!r}: a position needs key, name and figures')
                continue
            for fig in r['figures']:
                if fig not in CAST:
                    fail(f'form {fk!r} position {r["key"]!r}: no figure {fig!r} on the plan')
                figure_owner[fig] = r['key']
        used = set()
        step_ids = set()
        for st in form.get('steps') or []:
            sid = st.get('id', '?')
            where = f'{fk} step {sid!r}'
            if sid in step_ids:
                fail(f'{where}: duplicate id')
            step_ids.add(sid)
            if not re.fullmatch(r'[a-z0-9-]+', sid):
                fail(f'{where}: id must be lowercase letters, digits and hyphens')
            for k in ('title', 'short', 'part'):
                if not st.get(k):
                    fail(f'{where}: missing {k}')
            if st.get('short') and len(st['short']) > 26:
                fail(f'{where}: short label over 26 characters')
            if st.get('part') not in parts:
                fail(f'{where}: unknown part {st.get("part")!r}')
            for k in ('opt', 'optNot'):
                if st.get(k) and st[k] not in form_options:
                    fail(f'{where}: {k} {st[k]!r} is not an option of this form')
            if st.get('missal') and st['missal'] not in POINTS:
                fail(f'{where}: missal at unknown place {st["missal"]!r}')
            places = {}
            for key, raw in (st.get('place') or {}).items():
                if key not in CAST:
                    fail(f'{where}: nobody called {key!r} on the plan')
                    continue
                p = place_of(raw)
                if not p or not p.get('at'):
                    continue
                if isinstance(p['at'], str) and p['at'] not in POINTS:
                    fail(f'{where}: {key} at unknown place {p["at"]!r}')
                if p.get('posture') and p['posture'] not in POSTURES:
                    fail(f'{where}: {key} has unknown posture {p["posture"]!r}')
                if p.get('faces') and p['faces'] not in FACINGS:
                    fail(f'{where}: {key} faces {p["faces"]!r}')
                places[key] = p['at']
            check_overlap(where, places, POINTS, CAST)
            for r in st.get('routes') or []:
                if r.get('who') not in figure_owner:
                    fail(f'{where}: a route for {r.get("who")!r}, who is no position\'s figure')
                for v in (r.get('via') or []) + (r.get('genuflect') or []):
                    if isinstance(v, str) and v not in POINTS:
                        fail(f'{where}: route through unknown place {v!r}')
            for mk in st.get('marks') or []:
                if isinstance(mk.get('at'), str) and mk['at'] not in POINTS:
                    fail(f'{where}: mark at unknown place {mk["at"]!r}')
            for i in st.get('sayFrom') or []:
                if i not in low_ids:
                    fail(f'{where}: sayFrom names {i!r}, which is not a Low Mass step')
            check_say(where, st.get('say'))
            check_lines(where + ' notes', st.get('notes'), options, form_options)
            had = False
            for r in roles:
                e = st.get(r.get('key'))
                if not e:
                    continue
                had = True
                used.add(r['key'])
                w = f'{where} {r["key"]}'
                if not e.get('do'):
                    fail(f'{w}: nothing to do')
                check_lines(w, e.get('do'), options, form_options)
                check_lines(w + ' notes', e.get('notes'), options, form_options)
                if e.get('auth') not in AUTHS:
                    fail(f'{w}: auth must be one of {sorted(AUTHS)}')
                check_cites(w, e.get('cite'), sources)
                for i in e.get('sayFrom') or []:
                    if i not in low_ids:
                        fail(f'{w}: sayFrom names {i!r}, which is not a Low Mass step')
                check_say(w, e.get('say'))
                bell = e.get('bell')
                if bell:
                    if bell.get('auth') not in AUTHS:
                        fail(f'{w} bell: needs auth')
                    check_cites(w + ' bell', bell.get('cite'), sources)
                if not any(places.get(f) for f in r.get('figures') or []):
                    fail(f'{w}: this position has something to do but is not on the drawing')
            if not had:
                fail(f'{where}: no position has anything to do')
        for k in set(role_keys) - used:
            fail(f'form {fk!r}: position {k!r} has no steps')


def fingerprint():
    h = hashlib.sha256()
    for f in SHEET_INPUTS:
        text = open(os.path.join(ROOT, f), encoding='utf-8').read().replace('\r\n', '\n')
        h.update((f + '\n' + text + '\n').encode('utf-8'))
    return h.hexdigest()


def check_sheets(forms):
    """The ready-made PDFs must exist for every position and match the data."""
    man_path = os.path.join(ROOT, 'sheets', 'manifest.json')
    if not os.path.exists(man_path):
        fail('sheets/manifest.json is missing: run node tools/make-sheets.cjs')
        return
    man = json.load(open(man_path, encoding='utf-8'))
    if man.get('inputs') != SHEET_INPUTS:
        fail('sheets/manifest.json lists different inputs from tools/check.py: keep the two lists the same')
    if man.get('fingerprint') != fingerprint():
        fail('the ready-made sheets are out of date (the data, plan or sheet code changed): '
             'run node tools/make-sheets.cjs')
    for f in forms:
        for r in f['roles']:
            name = f'{f["key"]}-{r}.pdf'
            if not os.path.exists(os.path.join(ROOT, 'sheets', name)):
                fail(f'sheets/{name} is missing: run node tools/make-sheets.cjs')


def finish():
    if failures:
        print(f'\n{len(failures)} problem(s):')
        for f in failures:
            print('  FAIL ' + f)
        sys.exit(1)
    print('all checks passed')


if __name__ == '__main__':
    main()
