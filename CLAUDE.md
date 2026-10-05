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
  rubrics, and the whole design follows it. The priest is gold, the missal is
  red, the server is ink.
- **Talk to the server as "you".** Plain words, short sentences, the way an
  experienced server or MC would explain it in the sacristy.
- **No em dashes** in anything served (the same rule as Mikey's business
  site): use a full stop, comma, colon or brackets. En dashes in ranges are
  fine. The checker enforces it.

## Before you push

Run `python3 tools/check.py`. Then look at the change in a browser at phone
width as well as desktop: most servers will read this on a phone in the
sacristy.
