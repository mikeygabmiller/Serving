/* Serving the Latin Mass: everything on the page is drawn from window.SERVING
   (data/*.js). Facts live once, in the data; this file only arranges them. */
(function () {
  'use strict';

  var S = window.SERVING;
  var steps = S.lowMass.steps;
  var partsByKey = {};
  S.parts.forEach(function (p) { partsByKey[p.key] = p; });
  var sourcesByKey = {};
  S.sources.forEach(function (s, i) { s.n = i + 1; sourcesByKey[s.key] = s; });

  var POSTURE = {
    kneel: { tag: 'kneels', label: 'Kneel' },
    stand: { tag: 'stands', label: 'Stand' },
    move: { tag: 'walks', label: 'Moving' },
    genuflect: { tag: 'genuflects', label: 'Genuflect' },
    sit: { tag: 'sits', label: 'Sit' }
  };
  var AUTH = {
    rubric: { label: 'Rubric', title: 'Prescribed by the 1962 rubrics, or by a decree in force with them' },
    custom: { label: 'Custom', title: 'A widespread, approved custom; not written in the 1962 rubrics' },
    manual: { label: 'Manual', title: 'What the standard ceremonial manuals direct' },
    local: { label: 'Varies', title: 'Varies from church to church; follow your priest or MC' }
  };

  // ---------- small helpers ----------

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  // **bold**, *italic* (Latin words inside English), and ✠ where you sign yourself.
  var CROSS = '<svg class="cross" viewBox="0 0 20 20" role="img" aria-label="sign of the cross"><path fill="currentColor" d="M6.5 1H13.5L11.2 8.8L19 6.5V13.5L11.2 11.2L13.5 19H6.5L8.8 11.2L1 13.5V6.5L8.8 8.8Z"/></svg>';
  function rich(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<i>$1</i>')
      .replace(/\s*✠\s*/g, ' ' + CROSS + ' ')
      .trim();
  }
  function store(key, value) {
    try {
      if (value === undefined) return JSON.parse(localStorage.getItem('serving.' + key));
      localStorage.setItem('serving.' + key, JSON.stringify(value));
    } catch (e) { return null; }
  }

  function chip(cls, label, title) {
    return '<span class="chip ' + cls + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + esc(label) + '</span>';
  }
  function authChip(a) { return a && AUTH[a] ? chip('auth-' + a, AUTH[a].label, AUTH[a].title) : ''; }

  function citeHtml(cites) {
    if (!cites || !cites.length) return '';
    return '<div class="cites"><span>Sources:</span>' + cites.map(function (c) {
      var s = sourcesByKey[c[0]];
      if (!s) return '<span>' + esc(c[0]) + '</span>';
      return '<a href="#src-' + esc(s.key) + '" data-view-link="sources">[' + s.n + '] ' + esc(s.short) + (c[1] ? ' ' + esc(c[1]) : '') + '</a>';
    }).join('') + '</div>';
  }

  // A line is { who: 'P' | 'S' | 'B', la, en, times } or a cue { who, cue } for
  // something the priest does rather than says ("at the end of the Epistle").
  var TIMES = { 2: 'twice', 3: 'three times' };
  function lineHtml(l) {
    var you = l.who === 'S';
    var who = { P: 'Priest', S: 'You', B: 'All' }[l.who] || l.who;
    var text = l.cue
      ? '<span class="la cue">' + rich(l.cue) + '</span>'
      : '<span class="la" lang="la">' + rich(l.la) + (l.times ? ' <span class="times">(' + TIMES[l.times] + ')</span>' : '') + '</span>';
    return '<div class="line ' + (you ? 'you' : l.who === 'B' ? 'all' : 'priest') + '">' +
      '<span class="who">' + esc(who) + '</span>' + text +
      (l.en ? '<span class="en">' + rich(l.en) + '</span>' : '') +
      '</div>';
  }

  // ---------- views ----------

  var VIEWS = ['guide', 'sheets', 'responses', 'charts', 'customs', 'basics', 'high-mass', 'checklist', 'sources'];

  function showView(name, opts) {
    opts = opts || {};
    if (VIEWS.indexOf(name) < 0) name = 'guide';
    VIEWS.forEach(function (v) {
      var sec = document.getElementById('view-' + v);
      if (sec) sec.hidden = v !== name;
    });
    $all('.tabs a').forEach(function (a) {
      if (a.getAttribute('href') === '#' + name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.body.classList.toggle('on-sheets', name === 'sheets');
    if (name === 'guide' && g) refreshGuide();
    if (name === 'charts') Charts.render();
    if (name === 'sheets' && !opts.sheet) Sheets.show();
    if (!opts.keepScroll) window.scrollTo(0, 0);
  }

  // #s-<step> is a step of Low Mass with one server (the first links ever
  // made); #s-<form>.<position>.<step> is a step of any other form.
  // #sheets:<form>:<position> opens the sheet maker on that position.
  function route() {
    var h = (location.hash || '').slice(1);
    try { h = decodeURIComponent(h); } catch (e) { /* keep it as it is */ }
    if (h.indexOf('s-') === 0) {
      var bits = h.slice(2).split('.');
      showView('guide');
      if (bits.length === 3 && Forms.has(bits[0])) openGuide(bits[0], bits[1], bits[2]);
      else openGuide('low1', 'server', bits[0]);
      return;
    }
    if (h.indexOf('sheets:') === 0) {
      var p = h.split(':');
      showView('sheets', { sheet: true });
      Sheets.show(p[1], p[2]);
      return;
    }
    if (h.indexOf('src-') === 0) {
      showView('sources');
      var li = document.getElementById(h);
      if (li) li.scrollIntoView({ block: 'center' });
      return;
    }
    showView(h || 'guide');
  }

  // ---------- the guide: any form of Mass, any position ----------

  var plan, cur = 0, g = null; // g: { form, role, o, steps }

  function indexOfStep(id) {
    for (var i = 0; i < g.steps.length; i++) if (g.steps[i].id === id) return i;
    return -1;
  }
  function hashFor(st) { return '#s-' + (g.form.key === 'low1' ? st.id : g.form.key + '.' + g.role + '.' + st.id); }
  function stepStore() { return g.form.key === 'low1' ? 'step' : 'step.' + g.form.key + '.' + g.role; }

  function openGuide(formKey, roleKey, stepId, quiet) {
    var form = Forms.get(formKey);
    var role = form.roleByKey[roleKey] ? roleKey : form.roles[0].key;
    if (!g || g.form !== form || g.role !== role) {
      var o = Forms.opts(form);
      g = { form: form, role: role, o: o, steps: Forms.stepsFor(form, role, o) };
      store('guide', { form: form.key, role: role });
      fillPicker();
      buildRail();
    }
    var id = stepId || store(stepStore());
    var i = id ? indexOfStep(id) : 0;
    goStep(i < 0 ? 0 : i, { noHash: !!stepId || quiet });
  }

  // Your church's options are shared with the sheet maker: pick up a change
  // made there when you come back to the guide.
  function refreshGuide() {
    var o = Forms.opts(g.form);
    if (JSON.stringify(o) === JSON.stringify(g.o)) return;
    var id = g.steps[cur] && g.steps[cur].id;
    g.o = o;
    g.steps = Forms.stepsFor(g.form, g.role, o);
    fillPicker();
    buildRail();
    var i = indexOfStep(id);
    goStep(i < 0 ? Math.min(cur, g.steps.length - 1) : i, { noHash: true });
  }

  function fillPicker() {
    var form = g.form;
    $('#g-form').innerHTML = Forms.all.map(function (f) {
      return '<option value="' + f.key + '"' + (f === form ? ' selected' : '') + '>' + esc(f.name) + '</option>';
    }).join('');
    $('#g-role').innerHTML = form.roles.map(function (r) {
      return '<option value="' + r.key + '"' + (r.key === g.role ? ' selected' : '') + '>' + esc(r.name) + '</option>';
    }).join('');
    $('#g-role').disabled = form.roles.length < 2;
    $('#g-opts').innerHTML = (form.options || []).map(function (k) {
      var op = Forms.OPTIONS[k];
      return '<label><input type="checkbox" data-opt="' + k + '"' + (g.o[k] ? ' checked' : '') + '><span>' + esc(op.label) +
        (op.note ? '<small>' + rich(op.note) + '</small>' : '') + '</span></label>';
    }).join('');
    var role = form.roleByKey[g.role];
    $('#guide-h').textContent = form.name + (form.roles.length > 1 ? ': ' + role.name : '');
    $('#guide-intro').innerHTML = form.intro ? rich(form.intro) : '';
  }

  function wirePicker() {
    $('#g-form').addEventListener('change', function (e) { openGuide(e.target.value, null); });
    $('#g-role').addEventListener('change', function (e) { openGuide(g.form.key, e.target.value); });
    $('#g-opts').addEventListener('change', function (e) {
      var k = e.target.getAttribute('data-opt');
      if (!k) return;
      var id = g.steps[cur] && g.steps[cur].id;
      g.o[k] = e.target.checked;
      Forms.saveOpts(g.form, g.o);
      g.steps = Forms.stepsFor(g.form, g.role, g.o);
      buildRail();
      var i = indexOfStep(id);
      goStep(i < 0 ? Math.min(cur, g.steps.length - 1) : i);
    });
    $('#g-sheet').addEventListener('click', function (e) {
      e.preventDefault();
      location.hash = '#sheets:' + g.form.key + ':' + g.role;
    });
  }

  function buildRail() {
    var rail = $('#rail');
    var steps = g.steps;
    rail.innerHTML = steps.map(function (st, i) {
      var p = Forms.view(g.form, g.role, st, g.o).posture || 'move';
      return '<button type="button" class="p-' + p + '" data-i="' + i + '" aria-label="Step ' + (i + 1) + ': ' + esc(st.title) + '" title="' + esc(st.short || st.title) + '"></button>';
    }).join('');
    // part labels, sized by how many steps each part has
    var counts = [];
    steps.forEach(function (st) {
      var last = counts[counts.length - 1];
      if (last && last.key === st.part) last.n++;
      else counts.push({ key: st.part, n: 1 });
    });
    var parts = $('#rail-parts');
    parts.style.gridTemplateColumns = counts.map(function (c) { return c.n + 'fr'; }).join(' ');
    parts.innerHTML = counts.map(function (c) {
      var p = partsByKey[c.key];
      return '<span title="' + esc(p.name) + '">' + esc(p.short || p.name) + '</span>';
    }).join('');
  }

  function goStep(i, opts) {
    opts = opts || {};
    var steps = g.steps;
    cur = Math.max(0, Math.min(steps.length - 1, i));
    var st = steps[cur];
    var v = Forms.view(g.form, g.role, st, g.o);
    plan.pose(v.scene);
    $('#plan-caption').textContent = plan.describe(v.scene);

    var part = partsByKey[st.part];
    var chips = [];
    if (v.posture && POSTURE[v.posture]) chips.push(chip('posture', POSTURE[v.posture].label));
    if (v.auth) chips.push(authChip(v.auth));
    if (v.bell) chips.push(chip('bell', 'Bell' + (v.bell.rings ? ': ' + v.bell.rings : ''), 'Ring the bell'));
    if (v.bell && v.bell.auth && v.bell.auth !== v.auth) chips.push(authChip(v.bell.auth));

    $('#step-head').innerHTML = '<span class="eyebrow">' + esc(part.name) + '</span>' +
      '<h3 id="step-title" tabindex="-1">' + rich(v.title) + '</h3>' +
      (st.latin ? '<span class="latin" lang="la">' + esc(st.latin) + '</span>' : '') +
      (chips.length ? '<div class="chips" style="margin-top:6px">' + chips.join('') + '</div>' : '');
    var html = '';
    if (v.do.length) html += '<div class="do"><ol>' + v.do.map(function (d) { return '<li><span>' + rich(d) + '</span></li>'; }).join('') + '</ol></div>';
    if (v.say.length) html += '<div class="say">' + v.say.map(lineHtml).join('') + '</div>';
    if (v.notes.length) html += '<div class="note">' + v.notes.map(function (n) { return '<p>' + rich(n) + '</p>'; }).join('') + '</div>';
    if (v.bell && v.bell.note) html += '<div class="note"><p><strong>Bell:</strong> ' + rich(v.bell.note) + '</p>' + citeHtml(v.bell.cite) + '</div>';
    html += citeHtml(v.cite);
    $('#step-text').innerHTML = html;

    $('#count').textContent = (cur + 1) + ' of ' + steps.length;
    $('#prev').disabled = cur === 0;
    $('#next').disabled = cur === steps.length - 1;
    $all('#rail button').forEach(function (b, j) {
      if (j === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });

    store(stepStore(), st.id);
    if (!opts.noHash && location.hash !== hashFor(st)) {
      try { history.replaceState(null, '', hashFor(st)); } catch (e) { /* some embedded viewers refuse; the step still shows */ }
    }
    if (opts.focus) $('#step-title').focus({ preventScroll: true });
  }

  function initGuide() {
    plan = window.Plan($('#plan'), { idPrefix: 'guide' });
    wirePicker();
    $('#rail').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]');
      if (b) goStep(+b.getAttribute('data-i'));
    });
    $('#prev').addEventListener('click', function () { goStep(cur - 1, { focus: true }); });
    $('#next').addEventListener('click', function () { goStep(cur + 1, { focus: true }); });
    document.addEventListener('keydown', function (e) {
      if ($('#view-guide').hidden || e.altKey || e.ctrlKey || e.metaKey) return;
      if (/input|textarea|select/i.test((e.target.tagName || ''))) return;
      if (e.key === 'ArrowRight') { goStep(cur + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { goStep(cur - 1); e.preventDefault(); }
    });
    var last = store('guide') || {};
    var h = location.hash || '';
    if (h.indexOf('#s-') !== 0) openGuide(last.form || 'low1', last.role, null, true);
  }

  // ---------- responses ----------

  function initResponses() {
    var box = $('#resp');
    var html = '', lastPart = null;
    steps.forEach(function (st) {
      if (!st.say || !st.say.length) return;
      if (st.part !== lastPart) {
        html += '<h3 class="resp-part">' + esc(partsByKey[st.part].name) + '</h3>';
        lastPart = st.part;
      }
      html += st.say.map(lineHtml).join('');
      html += '<p class="resp-step"><a href="#s-' + esc(st.id) + '">' + esc(st.short || st.title) + ': see where you are</a></p>';
    });
    box.innerHTML = html;

    var practice = $('#practice'), english = $('#english');
    function apply() {
      box.classList.toggle('practice', practice.checked);
      box.classList.toggle('hide-en', !english.checked);
      if (!practice.checked) $all('.line.you.shown', box).forEach(function (l) { l.classList.remove('shown'); });
      store('practice', practice.checked);
      store('english', english.checked);
    }
    practice.checked = store('practice') === true;
    english.checked = store('english') !== false;
    practice.addEventListener('change', apply);
    english.addEventListener('change', apply);
    box.addEventListener('click', function (e) {
      if (!box.classList.contains('practice')) return;
      var l = e.target.closest('.line.you');
      if (l) l.classList.toggle('shown');
    });
    $('#reveal-all').addEventListener('click', function () {
      $all('.line.you', box).forEach(function (l) { l.classList.add('shown'); });
    });
    apply();
  }

  // ---------- rubric or custom ----------

  function initCustoms() {
    var rows = S.customs || [];
    $('#customs-body').innerHTML = rows.map(function (r) {
      return '<tr><th scope="row">' + rich(r.practice) + '</th>' +
        '<td>' + authChip(r.auth) + '</td>' +
        '<td>' + rich(r.answer) + (r.cite ? citeHtml(r.cite) : '') + '</td></tr>';
    }).join('');
  }

  // ---------- basics ----------

  function initBasics() {
    var b = S.basics || [];
    $('#basics-body').innerHTML = b.map(function (sec) {
      return '<h3>' + esc(sec.title) + '</h3>' +
        (sec.paras || []).map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('') +
        (sec.list && sec.list.length ? '<ul>' + sec.list.map(function (li) { return '<li>' + rich(li) + '</li>'; }).join('') + '</ul>' : '') +
        citeHtml(sec.cite);
    }).join('');
  }

  // ---------- high Mass roles ----------

  function initHighMass() {
    var hm = S.highMass;
    if (!hm) return;
    if (hm.intro) $('#hm-intro').innerHTML = '<p>' + rich(hm.intro) + '</p>' + citeHtml(hm.cite);
    $('#roles').innerHTML = hm.roles.map(function (r) {
      return '<article class="card"><h3>' + (r.abbr ? '<span class="abbr">' + esc(r.abbr) + '</span>' : '') + esc(r.name) + '</h3>' +
        (r.latin ? '<span class="latin" lang="la"><i>' + esc(r.latin) + '</i></span>' : '') +
        (r.summary ? '<p>' + rich(r.summary) + '</p>' : '') +
        (r.duties && r.duties.length ? '<ul>' + r.duties.map(function (d) { return '<li>' + rich(d) + '</li>'; }).join('') + '</ul>' : '') +
        citeHtml(r.cite) + '</article>';
    }).join('');
  }

  // ---------- checklist (a trainer's rubric) ----------

  function initChecklist() {
    var items = [];
    (S.extraSkills || []).forEach(function (sk, j) { items.push({ id: 'x.' + j, part: sk.part, text: sk.text }); });
    steps.forEach(function (st) {
      (st.skills || []).forEach(function (sk, j) { items.push({ id: st.id + '.' + j, part: st.part, text: sk, step: st }); });
    });
    var done = store('checks') || {};
    var html = '', lastPart = null;
    items.forEach(function (it) {
      if (it.part !== lastPart) {
        html += '<h3>' + esc((partsByKey[it.part] || { name: it.part }).name) + '</h3>';
        lastPart = it.part;
      }
      html += '<label class="check"><input type="checkbox" id="chk-' + esc(it.id) + '" data-id="' + esc(it.id) + '"' + (done[it.id] ? ' checked' : '') + '>' +
        '<span>' + rich(it.text) + (it.step ? '<small><a href="#s-' + esc(it.step.id) + '">' + esc(it.step.short || it.step.title) + '</a></small>' : '') + '</span></label>';
    });
    var box = $('#checks');
    box.innerHTML = html;
    function update() {
      var n = $all('input[type=checkbox]', box).filter(function (c) { return c.checked; }).length;
      $('#check-count').textContent = n + ' of ' + items.length;
      $('#check-bar').style.width = (items.length ? (100 * n / items.length) : 0) + '%';
    }
    box.addEventListener('change', function (e) {
      var c = e.target;
      if (!c.matches('input[type=checkbox]')) return;
      if (c.checked) done[c.getAttribute('data-id')] = true; else delete done[c.getAttribute('data-id')];
      store('checks', done);
      update();
    });
    $('#check-reset').addEventListener('click', function () {
      done = {};
      store('checks', done);
      $all('input[type=checkbox]', box).forEach(function (c) { c.checked = false; });
      update();
    });
    update();
  }

  // ---------- sources ----------

  function initSources() {
    $('#biblio').innerHTML = S.sources.map(function (s) {
      return '<li id="src-' + esc(s.key) + '">' +
        (s.author ? esc(s.author) + ', ' : '') + '<span class="t">' + esc(s.title) + '</span>' +
        (s.edition ? ', ' + esc(s.edition) : '') + '.' +
        (s.url ? ' <a href="' + esc(s.url) + '" target="_blank" rel="noopener">Read it</a>' : '') +
        (s.note ? '<small>' + rich(s.note) + '</small>' : '') + '</li>';
    }).join('');
  }

  // ---------- go ----------

  window.Serving = {
    steps: steps, partsByKey: partsByKey, sourcesByKey: sourcesByKey, POSTURE: POSTURE, AUTH: AUTH,
    rich: rich, esc: esc, citeHtml: citeHtml, authChip: authChip, lineHtml: lineHtml,
    goToStep: function (id) { location.hash = '#s-' + id; }
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    // same-hash clicks still need routing (hashchange will not fire)
    if (a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
  });

  initGuide();
  initResponses();
  initCustoms();
  initBasics();
  initHighMass();
  initChecklist();
  initSources();
  window.addEventListener('hashchange', route);
  route();
})();
