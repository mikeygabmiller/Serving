/* Mass forms and positions. Every form (Low Mass with one server, with two,
   Missa Cantata, Solemn High Mass) is put into one shape here, so the guide
   and the sheet maker can show any position the same way.

   A step, after this file has normalised it:
     { id, part, title, short, latin, opt, optNot,
       place:  { figureKey: { at, posture, faces, tag, tagSide } },
       missal, routes: [{ who, via, genuflect, carrying, shorten }], marks,
       say:    lines everyone serving says (two servers answer together),
       roles:  { roleKey: { title, do, say, notes, auth, cite, bell, skills } },
       auth, cite }
   A line in `do` or `notes` is a string, or { t, if: option } / { t, unless: option }.
   A step with opt shows only when that option is on; with optNot, only when it is off. */
(function () {
  'use strict';

  var S = window.SERVING;

  // Choices that differ from church to church. A sheet or the guide shows the
  // lines that match what you pick; nothing here changes the rubrics.
  var OPTIONS = {
    confiteor: { label: 'The servers say the Confiteor before Communion', def: false,
      note: 'The 1962 rubric leaves it out (Code n. 503); many churches still say it.' },
    bells131: { label: 'Elevation bells: 1, 3, 1', def: true,
      note: 'Once at each genuflection and three times at the elevation. Off: three rings at each elevation.' },
    sermon: { label: 'There is a sermon', def: true },
    creed: { label: 'The Creed is said today', def: true },
    leonine: { label: 'Prayers after Low Mass are said', def: true },
    asperges: { label: 'Asperges before Mass (Sundays)', def: false },
    veilAc1: { label: 'The first acolyte takes the humeral veil', def: false,
      note: 'Off: the thurifer takes it (FSSP Omaha). On: the first acolyte (Fortescue).' }
  };

  function opts(form) {
    var o = {};
    (form.options || []).forEach(function (k) { o[k] = OPTIONS[k].def; });
    try {
      var saved = JSON.parse(localStorage.getItem('serving.opts.' + form.key) || 'null');
      if (saved) Object.keys(saved).forEach(function (k) { if (k in o) o[k] = !!saved[k]; });
    } catch (e) { /* storage refused: use the defaults */ }
    return o;
  }
  function saveOpts(form, o) {
    try { localStorage.setItem('serving.opts.' + form.key, JSON.stringify(o)); } catch (e) { /* per-device convenience only */ }
  }

  function wanted(l, o) {
    if (l.if) return !!o[l.if];
    if (l.unless) return !o[l.unless];
    return true;
  }
  // Keep the lines that match the options; strings always stay.
  function lines(list, o) {
    return (list || []).filter(function (l) {
      if (!l || typeof l === 'string') return !!l;
      return wanted(l, o);
    }).map(function (l) { return typeof l === 'string' ? l : (l.t != null ? l.t : l); });
  }

  function placeOf(v) {
    if (!v) return null;
    if (typeof v === 'string') return { at: v };
    if (Array.isArray(v)) return { at: v[0], posture: v[1], faces: v[2], tag: v[3] };
    return v;
  }

  // The words of the responses live once, in data/low-mass.js. Other forms
  // borrow them by step id (sayFrom) instead of copying them.
  var LOW_SAY = {};
  S.lowMass.steps.forEach(function (st) { LOW_SAY[st.id] = st.say || []; });
  function sayFrom(ids) {
    var out = [];
    (ids || []).forEach(function (id) { out = out.concat(LOW_SAY[id] || []); });
    return out;
  }

  // ---------- Low Mass, one server: built from data/low-mass.js ----------

  function lowOne() {
    var steps = S.lowMass.steps.map(function (st) {
      var place = {};
      if (st.priest && st.priest.at) place.p = { at: st.priest.at, faces: st.priest.faces, tag: st.priest.tag, tagSide: st.priest.tagSide };
      if (st.server && st.server.at) place.s = { at: st.server.at, posture: st.server.posture, tag: st.server.tag, tagSide: st.server.tagSide };
      return {
        id: st.id, part: st.part, title: st.title, short: st.short, latin: st.latin, opt: st.opt,
        place: place, missal: st.missal,
        routes: (st.routes || []).map(function (r) { var c = {}; for (var k in r) c[k] = r[k]; c.who = 's'; return c; }),
        marks: st.marks || [],
        say: [],
        roles: { server: { do: st.do, say: st.say, notes: st.notes, auth: st.auth, cite: st.cite, bell: st.bell, skills: st.skills } },
        auth: st.auth, cite: st.cite, legacy: st
      };
    });
    return {
      key: 'low1', name: 'Low Mass with one server', short: 'Low Mass, one server', kind: 'low',
      roles: [{ key: 'server', name: 'Server', figures: ['s'] }],
      options: ['confiteor', 'bells131', 'sermon', 'creed', 'leonine'],
      intro: 'One server does everything: answers every response, moves the missal, brings the cruets and rings the bell.',
      steps: steps
    };
  }

  function normalise(form) {
    form.kind = form.kind || 'high';
    form.steps = form.steps.map(function (st) {
      var place = {};
      Object.keys(st.place || {}).forEach(function (k) { place[k] = placeOf(st.place[k]); });
      var roles = {};
      form.roles.forEach(function (r) {
        var e = st[r.key];
        if (!e) return;
        if (e.sayFrom && !e.say) e.say = sayFrom(e.sayFrom);
        roles[r.key] = e;
      });
      return {
        id: st.id, part: st.part, title: st.title, short: st.short, latin: st.latin, opt: st.opt, optNot: st.optNot,
        place: place, missal: st.missal, routes: st.routes || [], marks: st.marks || [],
        say: st.say || sayFrom(st.sayFrom), roles: roles, auth: st.auth, cite: st.cite, notes: st.notes
      };
    });
    return form;
  }

  var FORMS = [lowOne()].concat((S.forms || []).map(normalise));
  var byKey = {};
  FORMS.forEach(function (f) { byKey[f.key] = f; f.roleByKey = {}; f.roles.forEach(function (r) { f.roleByKey[r.key] = r; }); });

  // The steps one position takes part in, with today's options applied.
  function stepsFor(form, roleKey, o) {
    o = o || opts(form);
    return form.steps.filter(function (st) {
      if (st.opt && !o[st.opt]) return false;
      if (st.optNot && o[st.optNot]) return false;
      return !!st.roles[roleKey];
    });
  }

  var POST = { kneel: 'kneels', stand: 'stands', move: 'walks', genuflect: 'genuflects', sit: 'sits' };

  // What one position sees at one step: the drawing and the words.
  // moved: { figureKey: {x, y} } where you have moved your own figure on a sheet.
  // others: false leaves the other servers off the drawing (clergy stay).
  function view(form, roleKey, st, o, moved, others) {
    o = o || opts(form);
    var role = form.roleByKey[roleKey];
    var entry = st.roles[roleKey] || {};
    var mine = {};
    role.figures.forEach(function (k) { mine[k] = true; });
    var present = role.figures.filter(function (k) { return st.place[k] && st.place[k].at; });
    var cast = window.PLAN_CAST || {};
    var figures = Object.keys(st.place).map(function (k) {
      var p = st.place[k];
      if (!p || !p.at) return null;
      if (others === false && !mine[k] && !(cast[k] || {}).clergy) return null;
      var at = moved && moved[k] ? moved[k] : p.at;
      // one label is enough when a position has several figures (torchbearers)
      var tag = k === present[0] ? (p.tag || POST[p.posture]) : '';
      return { key: k, at: at, faces: p.faces, posture: p.posture, tag: tag, tagSide: p.tagSide, you: !!mine[k] };
    }).filter(Boolean);
    var marks = (st.marks || []).slice();
    var bell = entry.bell;
    if (bell && present[0]) {
      var who = present[0];
      marks.push({ kind: 'bell', at: moved && moved[who] ? moved[who] : st.place[who].at, dx: bell.dx || 0, dy: bell.dy || -22 });
    }
    var routes = (st.routes || []).filter(function (r) { return mine[r.who]; }).map(function (r) {
      var c = {}; for (var k in r) c[k] = r[k]; c.you = true;
      // a route ends where you moved yourself to
      if (moved && moved[r.who] && c.via && c.via.length) { c.via = c.via.slice(); c.via[c.via.length - 1] = moved[r.who]; }
      return c;
    });
    var myPlace = present.length ? st.place[present[0]] : {};
    return {
      scene: { figures: figures, missal: st.missal, routes: routes, marks: marks, levels: form.kind === 'low', bench: form.kind === 'high' },
      posture: myPlace.posture,
      title: entry.title || st.title,
      do: lines(entry.do, o),
      say: (entry.say || st.say || []).filter(function (l) { return wanted(l, o); }),
      notes: lines(entry.notes, o).concat(lines(st.notes, o)),
      auth: entry.auth || st.auth,
      cite: entry.cite || st.cite,
      bell: bell,
      skills: entry.skills
    };
  }

  window.Forms = {
    all: FORMS, get: function (k) { return byKey[k] || FORMS[0]; }, has: function (k) { return !!byKey[k]; },
    OPTIONS: OPTIONS, opts: opts, saveOpts: saveOpts, lines: lines,
    stepsFor: stepsFor, view: view
  };
})();
