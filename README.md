# Serving the Latin Mass

A personal project: a site for altar servers at the Traditional Latin Mass
(the 1962 Missal). It shows where to be, what to do and what to answer at every
step, for every server at Low Mass (one server or two) and at High Mass (Missa
Cantata and Solemn High Mass), with the rubric or manual behind every
instruction. Any position can be printed as a sheet to hand to a new server.

## What's on it

| Section | What it does |
|---|---|
| **Guide** | Step-by-step guide for any position: pick the Mass (Low Mass with one or two servers, Missa Cantata, Solemn High Mass) and your position (server, MC, thurifer, acolytes, crucifer, torchbearers). A plan of the sanctuary shows you in red, the clergy in gold and the other servers in grey, with arrows for every move and a mark where you genuflect. |
| **Sheets** | A printable sheet for any position: every step it takes part in, the plan beside the instructions. Set your church's options (Confiteor before Communion, bells, sermon, Creed, Asperges, who takes the humeral veil), change the wording, drag your figure to where you really stand, leave steps off, then print it, download it as one file, or take the ready-made PDF. |
| **Responses** | Every Latin line the server says, in order, with English. Practice mode hides your lines so you can test yourself. |
| **Charts** | *Where everyone is*: the whole Mass on one chart, showing the server staying opposite the missal. *The bells*: when, how many, rubric or custom. *What changes, and when*: Requiems, Passiontide and the rest. |
| **Rubric or custom?** | The things servers argue about (bells, the third Confiteor, the paten), each with its status and source. |
| **Basics** | Sides of the altar, genuflections, bows, hands, and how to pronounce Church Latin. |
| **High Mass** | The roles at a Missa Cantata and a Solemn High Mass. |
| **Checklist** | A trainer's rubric: every skill a new server needs, ticked off one at a time. |
| **Sources** | The bibliography every instruction cites. |

## How it's built

A static site with no build step and no framework, so GitHub Pages can serve it
as it is.

```
index.html             the page shell; holds no facts
css/site.css           the look (red is what you do, black is what is said)
js/plan.js             the sanctuary plan and every place a figure can stand
js/forms.js            puts every form of Mass into one shape; parish options
js/app.js              the guide, responses, checklist and sources
js/sheets.js           the sheet maker: print, download
js/charts.js           the charts
data/sources.js        the bibliography, and the parts of the Mass
data/low-mass.js       every step of Low Mass with one server: places, posture, words, sources
data/low-mass-two.js   Low Mass with two servers
data/missa-cantata.js  Missa Cantata: MC, thurifer, acolytes, crucifer, torchbearers
data/solemn-mass.js    Solemn High Mass: the same positions, with deacon and subdeacon
data/extras.js         rubric-or-custom table, exceptions, basics, High Mass roles
sheets/                the ready-made PDF sheets, one per position (made, not written)
research/              the research the data is built from, with every source
tools/check.py         the gate: run it before every push
tools/make-sheets.cjs  makes sheets/*.pdf from the data
```

**Where the facts come from.** `research/serving-the-tlm.md` holds the
research: the 1962 rubrics quoted in Latin, the manuals, current practice,
where they disagree, and what could not be verified. Every step on the site
cites the sources in `data/sources.js`.

**Every fact lives once, in `data/`.** The guide, the sheets, the responses
page, the charts and the checklist are all drawn from the same steps, so they
cannot disagree with each other. The two-server and High Mass forms borrow the
Latin responses from the Low Mass steps instead of copying them.

## Run it

Open `index.html` in a browser. That's all; there is nothing to install.

Before pushing a change:

```sh
python3 tools/check.py
```

It fails on a step with no source, a place that isn't on the plan, two
figures drawn on top of each other, a broken link, an em dash, or ready-made
sheets that no longer match the data. When it says the sheets are out of date,
make them again (needs Playwright and its Chromium):

```sh
node tools/make-sheets.cjs
```

## Put it online

Turn on GitHub Pages once, after this is merged to `main`:

1. On GitHub, open the repository and go to **Settings**, then **Pages** (left sidebar).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set the branch to **main** and the folder to **/ (root)**, then **Save**.
4. Wait a minute or two. The page shows the site's address once it is live.

The empty `.nojekyll` file tells GitHub to serve the files exactly as they are.
