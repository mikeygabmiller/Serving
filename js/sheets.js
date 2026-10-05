/* Position sheets: one position at one form of Mass, every step it takes part
   in, with the plan drawn for each step and the instructions beside it. Made
   to be printed and handed to a server, or downloaded as a single file.

   Everything on a sheet comes from data/*.js through js/forms.js. What you
   change here (your church's options, the wording, where your figure stands,
   which steps are on it) is kept on this device only, per form and position,
   and never changes the guide.

   The sheet's own styles are in SHEET_CSS below rather than in css/site.css,
   because the same text goes into a downloaded sheet, which has to work as a
   single file opened from anywhere. */
(function () {
  'use strict';

  var SITE_URL = 'https://mikeygabmiller.github.io/Serving/';

  var SHEET_CSS = [
    '.sheet{--paper:#fff;--panel:#f4f2ee;--ink:#1d1b18;--ink-soft:#5c574e;--rule:#d6d1c6;--red:#a3121d;--red-soft:#f5e2e0;--gold:#8a6104;--gold-soft:#f2e8d0;--other:#7a746b;',
    '  color-scheme:light;background:var(--paper);color:var(--ink);font-family:"Alegreya Sans","Segoe UI",system-ui,sans-serif;font-size:13.5px;line-height:1.4;',
    '  max-width:8.5in;margin:0 auto;padding:.45in .5in;border:1px solid var(--rule);border-radius:6px;box-sizing:border-box}',
    '.sheet *,.sheet *::before,.sheet *::after{box-sizing:border-box}',
    '.sheet-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;align-items:end;border-bottom:2px solid var(--ink);padding-bottom:8px;margin-bottom:8px}',
    '.sheet-church{grid-column:1/-1;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);font-weight:700;min-height:1em}',
    '.sheet-title{font-family:Alegreya,Georgia,"Times New Roman",serif;font-size:27px;line-height:1.1;margin:0;font-weight:700}',
    '.sheet-sub{color:var(--ink-soft);font-size:13px;text-align:right}',
    '.sheet-key{display:flex;flex-wrap:wrap;gap:3px 14px;font-size:11px;color:var(--ink-soft);margin:0 0 6px}',
    '.sheet-key span{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}',
    '.sheet-intro{margin:0 0 6px;font-size:12px;color:var(--ink-soft)}',
    '.sheet-steps{list-style:none;margin:0;padding:0;display:grid;gap:0 20px}',
    '.sheet-steps.cols-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}',
    '.sheet-step{display:grid;grid-template-columns:3.5in minmax(0,1fr);gap:6px 14px;align-items:start;align-content:start;padding:9px 0;border-top:1px solid var(--rule);break-inside:avoid;page-break-inside:avoid;position:relative}',
    '.cols-2 .sheet-step{grid-template-columns:minmax(0,1fr)}',
    '.sheet-plan{background:var(--panel);border-radius:4px;overflow:hidden;min-width:0}',
    '.sheet-plan svg{display:block;width:100%;height:auto}',
    '.sheet-text{min-width:0}',
    '.sheet-part{display:block;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);font-weight:700}',
    '.sheet-text h3{font-family:Alegreya,Georgia,"Times New Roman",serif;font-size:15.5px;margin:0;line-height:1.2;font-weight:700}',
    '.sheet-text h3 .n{color:var(--red);margin-right:.35em}',
    '.sheet-where{margin:2px 0 3px;font-size:12px;color:var(--ink-soft);font-style:italic}',
    '.sheet-do{margin:3px 0 0;padding-left:1.25em;color:var(--red)}',
    '.sheet-do li{margin:2px 0;padding-left:1px}',
    '.sheet-say{margin:6px 0 0;border-top:1px solid var(--rule);padding-top:4px;display:grid;gap:3px}',
    '.sheet-say .line{display:grid;grid-template-columns:3.6em minmax(0,1fr);gap:0 6px;align-items:baseline}',
    '.sheet-say .who{font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-soft)}',
    '.sheet-say .you .who{color:var(--red)}',
    '.sheet-say .la{font-family:Alegreya,Georgia,"Times New Roman",serif;font-size:13.5px;line-height:1.3}',
    '.sheet-say .you .la{font-weight:700}',
    '.sheet-say .priest .la{color:var(--ink-soft)}',
    '.sheet-say .la.cue{font-family:inherit;font-size:12px;font-style:italic;color:var(--ink-soft)}',
    '.sheet-say .times{font-family:inherit;font-size:10.5px;color:var(--ink-soft)}',
    '.sheet-say .en{grid-column:2;font-size:10.5px;color:var(--ink-soft)}',
    '.sheet-notes{margin:6px 0 0;font-size:11px;color:var(--ink-soft);border-left:2px solid var(--rule);padding-left:8px}',
    '.sheet-notes p{margin:0 0 2px}',
    '.sheet-cites{margin-top:4px;font-size:10px;color:var(--ink-soft)}',
    '.sheet-foot{margin-top:10px;border-top:1px solid var(--rule);padding-top:6px;font-size:10px;color:var(--ink-soft)}',
    '.sheet-foot p{margin:0}',
    '.sheet .cross{display:inline-block;width:.8em;height:.8em;vertical-align:-.05em;margin:0 .12em;color:var(--red)}',
    '.sheet .fig{transition:none}',
    '.sheet .sh-only{font-family:"Alegreya Sans",system-ui,sans-serif;font-size:12px;color:var(--ink-soft)}',
    '.sheet .sh-inc{position:absolute;right:0;top:8px;display:inline-flex;gap:5px;align-items:center;background:var(--paper);padding:0 0 2px 6px;cursor:pointer}',
    '.sheet .sh-inc input{width:18px;height:18px;margin:0;accent-color:var(--red)}',
    '.sheet .sh-step-tools{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:5px}',
    '.sheet .sh-step-tools button{all:unset;cursor:pointer;color:var(--red);text-decoration:underline;text-underline-offset:2px;font-size:12px}',
    '.sheet .sh-step-tools button:focus-visible{outline:2px solid #1b5fc1;outline-offset:2px}',
    '.sheet-step.is-off{opacity:.45}',
    '.sheet-step.is-off .sheet-plan,.sheet-step.is-off .sheet-where,.sheet-step.is-off .sheet-do,.sheet-step.is-off .sheet-say,.sheet-step.is-off .sheet-notes,.sheet-step.is-off .sheet-cites,.sheet-step.is-off .sh-step-tools{display:none}',
    '.sheet-step.is-off{grid-template-columns:minmax(0,1fr)}',
    '.sheet.editing [data-edit]{outline:1px dashed var(--ink-soft);outline-offset:1px;border-radius:2px;cursor:text}',
    '.sheet.editing [data-edit]:focus{outline:2px solid #1b5fc1;color:var(--ink)}',
    '.sheet.moving .sheet-plan svg{touch-action:none}',
    '.sheet.moving .fig.is-you{cursor:grab}',
    '.sheet.moving .fig.is-you .you-ring{stroke-dasharray:3 2}',
    '.cols-2 .sheet-step .sh-inc{position:static;justify-self:end;padding:0}',
    '@media screen and (max-width:760px){.sheet{padding:14px 12px}.sheet-step,.sheet-steps.cols-2{grid-template-columns:minmax(0,1fr)}.sheet-head{grid-template-columns:minmax(0,1fr)}.sheet-sub{text-align:left}.sheet .sh-inc{position:static;justify-self:end;padding:0}}',
    '@media print{',
    '  @page{size:letter;margin:.4in}',
    '  html,body{background:#fff!important}',
    '  .sheet{border:0;border-radius:0;padding:0;max-width:none}',
    '  .sheet .sh-only,.sheet .sh-inc,.sheet .sh-step-tools,.sheet-step.is-off{display:none!important}',
    '  .sheet.editing [data-edit]{outline:none}',
    '  .sheet,.sheet *{-webkit-print-color-adjust:exact;print-color-adjust:exact}',
    '}'
  ].join('\n');

  // On the sheets page, printing (the button or the browser's own menu)
  // prints the sheet alone.
  var PAGE_PRINT_CSS = [
    '@media print{',
    '  body.on-sheets .masthead,body.on-sheets footer.site,body.on-sheets #view-sheets>:not(#sheet){display:none!important}',
    '  body.on-sheets main{padding:0!important}',
    '  body.on-sheets .wrap{max-width:none;padding:0}',
    '}'
  ].join('\n');

  var started = false, pick = null, conf = null;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $all = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function Sv() { return window.Serving; }

  function store(key, value) {
    try {
      if (value === undefined) return JSON.parse(localStorage.getItem('serving.' + key));
      if (value === null) { localStorage.removeItem('serving.' + key); return null; }
      localStorage.setItem('serving.' + key, JSON.stringify(value));
    } catch (e) { return null; }
  }

  // ---------- what you changed, per form and position ----------

  function blank() {
    return { title: '', show: { say: true, full: false, notes: true, cites: false, others: true }, layout: '1', off: {}, text: {}, moved: {} };
  }
  function loadConf() {
    var c = store('sheet.' + pick.form + '.' + pick.role) || {};
    var b = blank();
    Object.keys(b).forEach(function (k) { if (c[k] == null) c[k] = b[k]; });
    Object.keys(b.show).forEach(function (k) { if (c.show[k] == null) c.show[k] = b.show[k]; });
    return c;
  }
  function saveConf() { store('sheet.' + pick.form + '.' + pick.role, conf); }

  // ---------- the tools above the sheet ----------

  function fillSelects() {
    var form = Forms.get(pick.form);
    $('#sh-form').innerHTML = Forms.all.map(function (f) {
      return '<option value="' + f.key + '"' + (f.key === form.key ? ' selected' : '') + '>' + Sv().esc(f.name) + '</option>';
    }).join('');
    $('#sh-role').innerHTML = form.roles.map(function (r) {
      return '<option value="' + r.key + '"' + (r.key === pick.role ? ' selected' : '') + '>' + Sv().esc(r.name) + '</option>';
    }).join('');
    $('#sh-role').disabled = form.roles.length < 2;
    var o = Forms.opts(form);
    $('#sh-opts').innerHTML = (form.options || []).map(function (k) {
      var op = Forms.OPTIONS[k];
      return '<label><input type="checkbox" data-opt="' + k + '"' + (o[k] ? ' checked' : '') + '><span>' + Sv().esc(op.label) +
        (op.note ? '<small>' + Sv().rich(op.note) + '</small>' : '') + '</span></label>';
    }).join('');
    $('#sh-church').value = store('sheet.church') || '';
    $('#sh-title').value = conf.title || '';
    $('#sh-title').placeholder = form.roleByKey[pick.role].name;
    $('#sh-say').checked = !!conf.show.say;
    $('#sh-full').checked = !!conf.show.full;
    $('#sh-notes').checked = !!conf.show.notes;
    $('#sh-cites').checked = !!conf.show.cites;
    $('#sh-others').checked = !!conf.show.others;
    $('#sh-layout').value = conf.layout;
    $('#sh-pdf').href = 'sheets/' + form.key + '-' + pick.role + '.pdf';
  }

  function choose(formKey, roleKey) {
    var form = Forms.get(formKey);
    pick = { form: form.key, role: form.roleByKey[roleKey] ? roleKey : form.roles[0].key };
    store('sheet.pick', pick);
    conf = loadConf();
    fillSelects();
    render();
  }

  function wire() {
    $('#sh-form').addEventListener('change', function (e) { choose(e.target.value, null); });
    $('#sh-role').addEventListener('change', function (e) { choose(pick.form, e.target.value); });
    $('#sh-opts').addEventListener('change', function (e) {
      var k = e.target.getAttribute('data-opt');
      if (!k) return;
      var form = Forms.get(pick.form), o = Forms.opts(form);
      o[k] = e.target.checked;
      Forms.saveOpts(form, o);
      render();
    });
    $('#sh-church').addEventListener('input', function (e) { store('sheet.church', e.target.value); renderHead(); });
    $('#sh-title').addEventListener('input', function (e) { conf.title = e.target.value; saveConf(); renderHead(); });
    [['#sh-say', 'say'], ['#sh-full', 'full'], ['#sh-notes', 'notes'], ['#sh-cites', 'cites'], ['#sh-others', 'others']].forEach(function (p) {
      $(p[0]).addEventListener('change', function (e) { conf.show[p[1]] = e.target.checked; saveConf(); render(); });
    });
    $('#sh-layout').addEventListener('change', function (e) { conf.layout = e.target.value; saveConf(); render(); });
    $('#sh-edit').addEventListener('change', render);
    $('#sh-move').addEventListener('change', render);
    $('#sh-reset').addEventListener('click', function () {
      if (!window.confirm('Put this sheet back the way it was made? Your wording, moved figures and left-out steps for this position will be cleared.')) return;
      store('sheet.' + pick.form + '.' + pick.role, null);
      conf = loadConf();
      fillSelects();
      render();
    });
    $('#sh-print').addEventListener('click', printSheet);
    $('#sh-download').addEventListener('click', download);

    var sheet = $('#sheet');
    sheet.addEventListener('change', function (e) {
      var id = e.target.getAttribute('data-inc');
      if (!id) return;
      if (e.target.checked) delete conf.off[id]; else conf.off[id] = true;
      saveConf();
      render();
    });
    sheet.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]');
      if (!b) return;
      var id = b.getAttribute('data-step');
      var act = b.getAttribute('data-act');
      if (act === 'add') {
        var ol = $('.sheet-step[data-id="' + id + '"] .sheet-do', sheet);
        var li = document.createElement('li');
        li.setAttribute('data-edit', 'do');
        li.setAttribute('data-raw', '');
        li.contentEditable = 'true';
        ol.appendChild(li);
        li.focus();
      } else if (act === 'undo') {
        delete conf.text[id];
        delete conf.moved[id];
        saveConf();
        render();
      }
    });
    // Editing: show the raw words (with their *italic* marks) while you type,
    // keep them when you leave the line, and draw them again.
    sheet.addEventListener('focusin', function (e) {
      var el = e.target.closest('[data-edit]');
      if (el) el.textContent = el.getAttribute('data-raw') || '';
    });
    sheet.addEventListener('focusout', function (e) {
      var el = e.target.closest('[data-edit]');
      if (!el) return;
      el.setAttribute('data-raw', el.textContent.replace(/\s+/g, ' ').trim());
      var step = el.closest('.sheet-step');
      commit(step);
    });
    sheet.addEventListener('keydown', function (e) {
      var el = e.target.closest('[data-edit]');
      if (el && e.key === 'Enter') { e.preventDefault(); el.blur(); }
    });
  }

  function commit(stepEl) {
    var id = stepEl.getAttribute('data-id');
    var t = conf.text[id] || {};
    var title = $('[data-edit="title"]', stepEl);
    if (title) t.title = title.getAttribute('data-raw');
    ['do', 'notes'].forEach(function (k) {
      var els = $all('[data-edit="' + k + '"]', stepEl);
      if (els.length || t[k]) t[k] = els.map(function (x) { return x.getAttribute('data-raw'); }).filter(Boolean);
    });
    conf.text[id] = t;
    saveConf();
    renderStep(id);
  }

  // ---------- drawing the sheet ----------

  var DOING = { kneel: 'You kneel', stand: 'You stand', sit: 'You sit', genuflect: 'You genuflect', move: 'You end up' };
  function whereText(v) {
    var me = v.scene.figures.filter(function (f) { return f.you; })[0];
    if (!me) return '';
    if (typeof me.at !== 'string') return 'Where you placed yourself on the plan.';
    var p = window.PLAN_POINTS[me.at];
    return (DOING[me.posture] || 'You are') + ' ' + p.name + '.';
  }

  var KEY_HTML = [
    '<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#a3121d"/></svg>you</span>',
    '<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#8a6104"/></svg>priest, deacon, subdeacon</span>',
    '<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="#7a746b"/></svg>other servers</span>',
    '<span><svg width="26" height="10" aria-hidden="true"><path d="M1 5 H19" stroke="#a3121d" stroke-width="1.8" stroke-dasharray="4 3" fill="none"/><path d="M18 1 L25 5 L18 9 Z" fill="#a3121d"/></svg>where you walk</span>',
    '<span><svg width="26" height="10" aria-hidden="true"><path d="M1 5 H19" stroke="#a3121d" stroke-width="2.6" fill="none"/><path d="M18 1 L25 5 L18 9 Z" fill="#a3121d"/></svg>carrying the missal</span>',
    '<span><svg width="12" height="12" aria-hidden="true"><rect x="2.5" y="2.5" width="7" height="7" transform="rotate(45 6 6)" fill="#fff" stroke="#1d1b18" stroke-width="1.4"/></svg>genuflect</span>',
    '<span><svg width="18" height="12" aria-hidden="true"><rect x="1" y="2" width="16" height="9" rx="1.5" fill="#a3121d"/><line x1="9" y1="2" x2="9" y2="11" stroke="#fff" stroke-width="1"/></svg>missal</span>',
    '<span><svg width="14" height="12" aria-hidden="true"><path d="M1 10 Q1 1 7 1 Q13 1 13 10 Z" fill="#8a6104"/></svg>bell</span>',
    '<span>triangle: the way a figure faces</span>'
  ].join('');

  function renderHead() {
    var form = Forms.get(pick.form), role = form.roleByKey[pick.role];
    var church = store('sheet.church') || '';
    var head = $('#sheet .sheet-head');
    if (!head) return;
    head.innerHTML = '<div class="sheet-church">' + Sv().esc(church) + '</div>' +
      '<h2 class="sheet-title">' + Sv().esc(conf.title || role.name) + '</h2>' +
      '<div class="sheet-sub">' + Sv().esc(form.name) + '<br>1962 Missal</div>';
  }

  // On a sheet the responses are short unless you ask for them in full: your
  // own lines whole, the priest's as their first words (enough to know when
  // you answer), no English.
  function shortLine(l) {
    if (l.cue) return Sv().lineHtml({ who: l.who, cue: l.cue });
    if (l.who !== 'P') return Sv().lineHtml({ who: l.who, la: l.la, times: l.times });
    var words = String(l.la || '').replace(/\*/g, '').split(/\s+/);
    return Sv().lineHtml({ who: 'P', la: words.length > 6 ? words.slice(0, 4).join(' ') + ' \u2026' : words.join(' ') });
  }

  function stepHtml(form, st, n, editing) {
    var Svs = Sv(), esc = Svs.esc, rich = Svs.rich;
    var off = !!conf.off[st.id];
    var part = Svs.partsByKey[st.part] || { name: st.part };
    var v = Forms.view(form, pick.role, st, Forms.opts(form), conf.moved[st.id], conf.show.others);
    var t = conf.text[st.id] || {};
    var title = t.title != null && t.title !== '' ? t.title : v.title;
    var doLines = t.do || v.do;
    var notes = t.notes || v.notes;
    function ed(kind, raw) {
      return editing ? ' data-edit="' + kind + '" data-raw="' + esc(raw) + '" contenteditable="true"' : '';
    }
    var h = '<li class="sheet-step' + (off ? ' is-off' : '') + '" data-id="' + esc(st.id) + '">';
    h += '<label class="sh-inc" title="Put this step on the sheet"><input type="checkbox" data-inc="' + esc(st.id) + '"' + (off ? '' : ' checked') + '><span class="sh-only">on the sheet</span></label>';
    h += '<div class="sheet-plan" data-plan="' + esc(st.id) + '"></div>';
    h += '<div class="sheet-text">';
    h += '<span class="sheet-part">' + esc(part.name) + '</span>';
    h += '<h3>' + (off ? '' : '<span class="n">' + n + '</span>') + '<span' + ed('title', title) + '>' + rich(title) + '</span></h3>';
    h += '<p class="sheet-where">' + esc(whereText(v)) + '</p>';
    h += '<ol class="sheet-do">' + doLines.map(function (d) { return '<li' + ed('do', d) + '>' + rich(d) + '</li>'; }).join('') + '</ol>';
    if (conf.show.say && v.say && v.say.length) h += '<div class="sheet-say">' + v.say.map(conf.show.full ? Svs.lineHtml : shortLine).join('') + '</div>';
    if (conf.show.notes && notes && notes.length) h += '<div class="sheet-notes">' + notes.map(function (x) { return '<p' + ed('notes', x) + '>' + rich(x) + '</p>'; }).join('') + '</div>';
    if (conf.show.cites && v.cite && v.cite.length) {
      h += '<div class="sheet-cites">Sources: ' + v.cite.map(function (c) {
        var s = Svs.sourcesByKey[c[0]];
        return esc((s ? s.short : c[0]) + (c[1] ? ' ' + c[1] : ''));
      }).join('; ') + '</div>';
    }
    var changed = conf.text[st.id] || conf.moved[st.id];
    if (editing || changed) {
      h += '<div class="sh-step-tools sh-only">' +
        (editing ? '<button type="button" data-act="add" data-step="' + esc(st.id) + '">Add a line</button>' : '') +
        (changed ? '<button type="button" data-act="undo" data-step="' + esc(st.id) + '">Undo my changes to this step</button>' : '') +
        '</div>';
    }
    h += '</div></li>';
    return { html: h, view: v };
  }

  function drawPlan(form, st, v) {
    var box = $('#sheet [data-plan="' + st.id + '"]');
    if (!box || conf.off[st.id]) return;
    var plan = window.Plan(box, { idPrefix: 'sh-' + st.id });
    plan.pose(v.scene);
    if ($('#sh-move').checked) {
      plan.setDraggable(true, function (key, at) {
        conf.moved[st.id] = conf.moved[st.id] || {};
        conf.moved[st.id][key] = at;
        saveConf();
        renderStep(st.id);
      });
    }
  }

  function render() {
    if (!pick) return;
    var form = Forms.get(pick.form), role = form.roleByKey[pick.role];
    var o = Forms.opts(form);
    var steps = Forms.stepsFor(form, pick.role, o);
    var editing = $('#sh-edit').checked;
    var sheet = $('#sheet');
    // a browser can bring the two switches back on a reload without saying so
    sheet.classList.toggle('editing', editing);
    sheet.classList.toggle('moving', $('#sh-move').checked);
    var n = 0, items = [];
    steps.forEach(function (st) {
      if (!conf.off[st.id]) n++;
      items.push({ st: st, r: stepHtml(form, st, n, editing) });
    });
    sheet.innerHTML = '<header class="sheet-head"></header>' +
      '<div class="sheet-key">' + KEY_HTML + '</div>' +
      (form.intro ? '<p class="sheet-intro">' + Sv().rich(form.intro) + '</p>' : '') +
      '<ol class="sheet-steps cols-' + (conf.layout === '2' ? '2' : '1') + '">' + items.map(function (it) { return it.r.html; }).join('') + '</ol>' +
      '<footer class="sheet-foot"><p>Practice differs a little from church to church: where your priest or MC does it differently, do it that way. ' +
      'From <i>Serving the Latin Mass</i>, ' + SITE_URL + ', where every instruction carries its source.</p></footer>';
    renderHead();
    items.forEach(function (it) { drawPlan(form, it.st, it.r.view); });
    $('#sh-count').textContent = n + ' of ' + steps.length + ' steps on the sheet';
    document.title = (conf.title || role.name) + ': ' + form.short + ' | Serving the Latin Mass';
  }

  // Redraw one step in place (after an edit or a move), keeping the numbering.
  function renderStep(id) {
    var form = Forms.get(pick.form);
    var steps = Forms.stepsFor(form, pick.role, Forms.opts(form));
    var n = 0, st = null;
    for (var i = 0; i < steps.length; i++) {
      if (!conf.off[steps[i].id]) n++;
      if (steps[i].id === id) { st = steps[i]; break; }
    }
    var old = $('#sheet .sheet-step[data-id="' + id + '"]');
    if (!st || !old) return render();
    var r = stepHtml(form, st, n, $('#sh-edit').checked);
    var tmp = document.createElement('ol');
    tmp.innerHTML = r.html;
    old.parentNode.replaceChild(tmp.firstChild, old);
    drawPlan(form, st, r.view);
  }

  // ---------- print and download ----------

  function printSheet() { window.print(); }

  // The drawing's look comes from css/site.css; a downloaded sheet carries it
  // inline, so the file needs nothing else. Only what differs from the
  // defaults is written, to keep the file small.
  var SHAPE_PROPS = ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'stroke-opacity', 'opacity'];
  var TEXT_PROPS = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'text-transform', 'text-anchor', 'dominant-baseline'];
  var DEFAULTS = {
    'fill-opacity': '1', 'stroke-opacity': '1', opacity: '1', 'stroke-dasharray': 'none', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter',
    'font-style': 'normal', 'letter-spacing': 'normal', 'word-spacing': '0px', 'text-transform': 'none', 'text-anchor': 'start', 'dominant-baseline': 'auto'
  };
  var SHAPES = { rect: 1, circle: 1, ellipse: 1, path: 1, line: 1, polyline: 1, polygon: 1, text: 2, tspan: 2 };
  function inlineSvg(live, copy) {
    var a = [live].concat($all('*', live)), b = [copy].concat($all('*', copy));
    for (var i = 0; i < a.length && i < b.length; i++) {
      var kind = SHAPES[a[i].tagName.toLowerCase()];
      var cs = window.getComputedStyle(a[i]);
      var props = kind ? SHAPE_PROPS.concat(kind === 2 ? TEXT_PROPS : []) : [];
      var st = props.map(function (p) {
        var v = cs.getPropertyValue(p);
        return v && v !== DEFAULTS[p] ? p + ':' + v : '';
      }).filter(Boolean);
      if (cs.display === 'none') st.push('display:none');
      var m = /translate\(\s*([-\d.]+)px,\s*([-\d.]+)px\s*\)/.exec(a[i].style && a[i].style.transform || '');
      if (m) b[i].setAttribute('transform', 'translate(' + m[1] + ' ' + m[2] + ')');
      if (st.length) b[i].setAttribute('style', st.join(';')); else b[i].removeAttribute('style');
      b[i].removeAttribute('class');
    }
  }

  function download() {
    var form = Forms.get(pick.form), role = form.roleByKey[pick.role];
    var live = $('#sheet');
    var copy = live.cloneNode(true);
    copy.removeAttribute('id');
    copy.classList.remove('editing', 'moving');
    var liveSvgs = $all('.sheet-step:not(.is-off) .sheet-plan svg', live);
    $all('.sheet-step.is-off, .sh-only, .sh-inc, .sh-step-tools', copy).forEach(function (x) { x.parentNode && x.parentNode.removeChild(x); });
    $all('[contenteditable]', copy).forEach(function (x) { x.removeAttribute('contenteditable'); x.removeAttribute('data-edit'); x.removeAttribute('data-raw'); });
    $all('.sheet-plan svg', copy).forEach(function (svg, i) { if (liveSvgs[i]) inlineSvg(liveSvgs[i], svg); });
    var name = (conf.title || role.name) + ': ' + form.short;
    var html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + Sv().esc(name) + '</title>\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Alegreya+Sans:wght@400;500;700&display=swap">\n' +
      '<style>\nhtml,body{margin:0;background:#fff}\nbody{padding:16px}\n@media print{body{padding:0}}\n' + SHEET_CSS + '\n</style>\n</head>\n<body>\n' +
      copy.outerHTML + '\n</body>\n</html>\n';
    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = form.key + '-' + pick.role + '-sheet.html';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  // ---------- going there ----------

  function start() {
    if (started) return;
    started = true;
    var style = document.createElement('style');
    style.id = 'sheet-css';
    style.textContent = SHEET_CSS + '\n' + PAGE_PRINT_CSS;
    document.head.appendChild(style);
    wire();
  }

  // show(formKey, roleKey): open the sheets view's content for that position,
  // or the last one you made when no position is given.
  function show(formKey, roleKey) {
    start();
    var last = store('sheet.pick') || {};
    var f = Forms.get(formKey || (pick && pick.form) || last.form || 'low1').key;
    var r = roleKey || (pick && pick.form === f ? pick.role : null) || (f === last.form ? last.role : null);
    choose(f, r);
  }

  window.Sheets = { show: show, render: function () { if (started && pick) render(); } };
})();
