# Working on Serving the Latin Mass

Mikey's personal project, separate from his detailing business: a site that
teaches altar servers the Traditional Latin Mass (1962 Missal). People will do
what this site says at the altar, in front of a congregation, so **a wrong
instruction is worse than a missing one.**

## Accuracy rules

- **Every instruction cites a source.** Steps, rubric-or-custom rows, basics,
  roles and exception rows all carry `cite: [['KEY', 'section or page']]`
  pointing at `data/sources.js`. `tools/check.py` fails on anything uncited.
- **Never fill a gap from memory.** If the sources don't settle it, leave it
  out or say it varies. The research behind the data is in
  `research/serving-the-tlm.md`; read it before changing a step, and add to it
  (with citations) when you learn something new.
- **Say how binding it is.** Each practice is labelled `rubric` (in the 1962
  rubrics), `custom` (widespread and approved, not in the rubrics), `manual`
  (what the ceremonial manuals direct) or `local` (varies by church). Don't
  promote a custom to a rubric.
- **1962 wins over older manuals.** Fortescue's pre-1960 editions, Britt and
  other old manuals describe some things the 1960 Code of Rubrics changed.
  When they differ, the site gives the 1962 answer and a note says what
  changed.
- **Defer to the priest.** Practice varies a little between churches; the site
  says so rather than pretending one way is the only way.

## How the code is laid out

- **Facts live once, in `data/`.** `index.html` is a shell. The guide, the
  responses page, the charts and the checklist are all drawn from
  `data/low-mass.js`, so a step changed there changes everywhere.
- **Places on the plan live only in `js/plan.js` (`POINTS`).** Steps name a
  place (`s-foot-gospel`), never a coordinate.
- **Relative links only.** GitHub Pages serves this repo under a path
  (`/Serving/`), so a link starting with `/` breaks.
- **No build step, no framework, no npm.** Plain HTML, CSS and JS that open
  from the file system.

## Look and voice

- **Red is what you do, black is what is said.** That's how a missal prints
  rubrics, and the whole design follows it. On the plan you (the position the
  page is for) are red, the priest, deacon and subdeacon gold, the other
  servers grey, and the missal red.
- **Talk to the server as "you".** Plain words, short sentences, the way an
  experienced server or MC would explain it in the sacristy.
- **No em dashes** in anything served (the same rule as Mikey's business
  site): use a full stop, comma, colon or brackets. En dashes in ranges are
  fine. The checker enforces it.

## Forms of Mass and positions

- **Four forms:** Low Mass with one server (`data/low-mass.js`), with two
  (`data/low-mass-two.js`), Missa Cantata (`data/missa-cantata.js`) and Solemn
  High Mass (`data/solemn-mass.js`). `js/forms.js` puts them into one shape; the
  guide and the sheet maker only ever read that.
- **A step names where everyone ends up** (`place`), and each position's part
  (`mc`, `th`, `ac1`, ...). Every position with a part must be on the drawing.
  The deacon and subdeacon are drawn only where a source says where they are.
- **Responses are written once.** Other forms borrow them with
  `sayFrom: ['<low-mass step id>']`; never copy the Latin.
- **Parish differences are options** (`OPTIONS` in `js/forms.js`): a line can be
  `{ t, if: 'option' }` or `{ t, unless: 'option' }`, a step `opt` or `optNot`.
  Use one where the sources really disagree (say which in a note), not to hide a
  gap.
- **FSSP Omaha's line diagrams are drawn as seen from the nave**, like the plan:
  left is the Gospel side (see `research/positions.md`, Communion).

## Position sheets

- `js/sheets.js` draws them; its styles are in `SHEET_CSS` there, because the
  same text goes into a downloaded sheet. A sheet is light even in dark mode.
- **The ready-made PDFs in `sheets/` are made, not written:** after any change
  to the data, the plan, the forms or the sheet code, run
  `node tools/make-sheets.cjs`. `tools/check.py` fails until you do.

## Before you push

Run `python3 tools/check.py`. Then look at the change in a browser at phone
width as well as desktop: most servers will read this on a phone in the
sacristy.
