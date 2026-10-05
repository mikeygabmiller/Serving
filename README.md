# Serving the Latin Mass

A personal project: a site for altar servers at the Traditional Latin Mass
(the 1962 Missal). It shows where to be, what to do and what to answer at every
step of Low Mass, with the rubric or manual behind every instruction.

## What's on it

| Section | What it does |
|---|---|
| **Low Mass** | Step-by-step guide. A plan of the sanctuary shows the priest, the server and the missal at each step, with arrows for every move and a mark where you genuflect. |
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
index.html         the page shell; holds no facts
css/site.css       the look (red is what you do, black is what is said)
js/plan.js         the sanctuary plan and every place a figure can stand
js/app.js          the guide, responses, checklist and sources
js/charts.js       the charts
data/sources.js    the bibliography, and the parts of the Mass
data/low-mass.js   every step of Low Mass: places, posture, words, sources
data/extras.js     rubric-or-custom table, exceptions, basics, High Mass roles
research/          the research the data is built from, with every source
tools/check.py     the gate: run it before every push
```

**Where the facts come from.** `research/serving-the-tlm.md` holds the
research: the 1962 rubrics quoted in Latin, the manuals, current practice,
where they disagree, and what could not be verified. Every step on the site
cites the sources in `data/sources.js`.

**Every fact lives once, in `data/`.** The guide, the responses page, the
charts and the checklist are all drawn from the same steps, so they cannot
disagree with each other.

## Run it

Open `index.html` in a browser. That's all; there is nothing to install.

Before pushing a change:

```sh
python3 tools/check.py
```

It fails on a step with no source, a place that isn't on the plan, a broken
link, or an em dash.

## Put it online

Turn on GitHub Pages once, after this is merged to `main`:

1. On GitHub, open the repository and go to **Settings**, then **Pages** (left sidebar).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set the branch to **main** and the folder to **/ (root)**, then **Save**.
4. Wait a minute or two. The page shows the site's address once it is live.

The empty `.nojekyll` file tells GitHub to serve the files exactly as they are.
