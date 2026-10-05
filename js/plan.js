/* The sanctuary plan: one drawing, re-posed for every step of the Mass.
   Seen from the nave, the way the people see it: the altar at the top,
   the Gospel side on the left, the Epistle side on the right.
   Coordinates are plan units inside a 400 x 236 viewBox. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var W = 400, H = 236;

  // Every place a figure can stand. Steps in data/*.js name these; nothing
  // else in the site holds a coordinate.
  var POINTS = {
    // the priest
    'p-foot':          { x: 200, y: 124, name: 'at the foot of the altar, in the middle' },
    'p-step':          { x: 200, y: 104, name: 'kneeling on the lowest step, in the middle' },
    'p-center':        { x: 200, y: 66,  name: 'at the middle of the altar' },
    'p-epistle':       { x: 262, y: 66,  name: 'at the Epistle corner' },
    'p-gospel':        { x: 138, y: 66,  name: 'at the Gospel corner' },
    'p-rail':          { x: 300, y: 200, name: 'at the Epistle end of the altar rail' },

    // the server (P1 to P10 are the positions in research/serving-the-tlm.md, B24)
    's-sacristy':      { x: 392, y: 178, name: 'coming from the sacristy' },
    's-beside-right':  { x: 234, y: 126, name: 'at the priest\'s right, at the foot of the altar' },
    's-foot-gospel':   { x: 168, y: 140, name: 'on the floor behind the priest, to his left' },            // P1
    's-gospel-step':   { x: 92,  y: 104, name: 'on the lowest step at the Gospel end' },                   // P2
    's-epistle-floor': { x: 300, y: 130, name: 'on the floor at the Epistle corner' },                     // P3
    's-gospel-book':   { x: 98,  y: 90,  name: 'on the step below the footpace, beside the missal' },      // P4
    's-epistle-step':  { x: 308, y: 104, name: 'on the lowest step at the Epistle end' },                  // P5
    's-consecration':  { x: 228, y: 80,  name: 'on the edge of the footpace at the priest\'s right' },     // P6
    's-cruets':        { x: 322, y: 88,  name: 'on the step below the footpace at the Epistle corner' },   // P7
    's-credence':      { x: 368, y: 86,  name: 'at the credence' },                                         // P8
    's-rail':          { x: 328, y: 204, name: 'at the priest\'s right at the altar rail' },                // P9
    's-center-floor':  { x: 200, y: 128, name: 'on the floor in the middle' },                             // P10
    's-missal-epistle':{ x: 276, y: 76,  name: 'on the footpace at the Epistle corner' },
    's-missal-gospel': { x: 124, y: 76,  name: 'on the footpace at the Gospel corner' },
    's-seat':          { x: 372, y: 131, name: 'at the sedilia' },
    's-leonine':       { x: 234, y: 104, name: 'on the lowest step at the priest\'s right' },

    // the missal: r is its turn in degrees
    'm-epistle':       { x: 276, y: 40, r: 0,   name: 'on its stand at the Epistle side, square to the front of the altar' },
    'm-gospel':        { x: 124, y: 40, r: -28, name: 'on its stand at the Gospel side, turned so its pages face the middle' }
  };

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, cls, anchor) {
    var t = el('text', { x: x, y: y, 'class': cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s;
    return t;
  }
  function pt(name) {
    var p = POINTS[name];
    if (!p) throw new Error('Unknown place on the plan: ' + name);
    return p;
  }

  // The fixed architecture: drawn once.
  function drawRoom(g) {
    el('path', { d: 'M6 12 V4 H394 V12', 'class': 'pl-wall' }, g);

    // three steps up to the altar: lowest step, middle step, footpace (predella)
    el('rect', { x: 62, y: 50, width: 276, height: 60, 'class': 'pl-step' }, g);
    el('rect', { x: 74, y: 50, width: 252, height: 47, 'class': 'pl-step' }, g);
    el('rect', { x: 86, y: 50, width: 228, height: 34, 'class': 'pl-predella' }, g);

    // the altar, the tabernacle with its cross, six candlesticks, three altar cards
    el('rect', { x: 110, y: 18, width: 180, height: 32, 'class': 'pl-altar' }, g);
    el('rect', { x: 189, y: 9, width: 22, height: 20, 'class': 'pl-tab' }, g);
    el('path', { d: 'M200 12 V26 M195 16.5 H205', 'class': 'pl-wall', 'stroke-width': 1.3 }, g);
    [126, 146, 166, 234, 254, 274].forEach(function (x) {
      el('circle', { cx: x, cy: 23, r: 3.2, 'class': 'pl-candle' }, g);
    });
    el('rect', { x: 190, y: 32, width: 20, height: 8, 'class': 'pl-card' }, g);
    el('rect', { x: 116, y: 27, width: 12, height: 6, 'class': 'pl-card' }, g);
    el('rect', { x: 272, y: 27, width: 12, height: 6, 'class': 'pl-card' }, g);

    // credence table (Epistle side) and the altar rail with its gate
    el('rect', { x: 344, y: 40, width: 48, height: 32, rx: 2, 'class': 'pl-furn' }, g);
    txt(g, 368, 59, 'credence', 'pl-small', 'middle');
    el('rect', { x: 352, y: 116, width: 40, height: 30, rx: 2, 'class': 'pl-furn' }, g);
    txt(g, 372, 135, 'sedilia', 'pl-small', 'middle');
    el('path', { d: 'M8 216 H176 M224 216 H392', 'class': 'pl-rail' }, g);
    txt(g, 200, 230, 'altar rail \u00b7 the people beyond', 'pl-small', 'middle');

    // the two sides, up in the corners where no one ever stands, and what the levels are called
    txt(g, 8, 28, 'Gospel side', 'pl-label side');
    txt(g, 392, 28, 'Epistle side', 'pl-label side', 'end');
    txt(g, 8, 70, 'footpace', 'pl-small');
    txt(g, 8, 99, 'steps', 'pl-small');
    txt(g, 8, 130, 'floor', 'pl-small');
  }

  function makePerson(layer, kind, letter, r) {
    var g = el('g', { 'class': 'fig fig-' + kind }, layer);
    var facing = null;
    if (kind === 'priest') facing = el('path', { d: 'M-5 -' + (r + 1) + ' L0 -' + (r + 7) + ' L5 -' + (r + 1) + ' Z', 'class': 'facing' }, g);
    el('circle', { r: r }, g);
    var t = el('text', { 'class': 'letter', y: 0.5 }, g);
    t.textContent = letter;
    var tag = el('g', { 'class': 'tag-g' }, g);
    var tagBg = el('rect', { 'class': 'tag-bg', rx: 9, height: 18 }, tag);
    var tagText = el('text', { 'class': 'tag' }, tag);
    return { g: g, facing: facing, tag: tag, tagBg: tagBg, tagText: tagText, r: r };
  }

  function makeMissal(layer) {
    var g = el('g', { 'class': 'fig fig-missal' }, layer);
    var inner = el('g', null, g);
    el('rect', { x: -11, y: -7, width: 22, height: 14, rx: 1.5, 'class': 'cover' }, inner);
    el('line', { x1: 0, y1: -7, x2: 0, y2: 7 }, inner);
    return { g: g, inner: inner };
  }

  var FACING = { altar: 0, people: 180, epistle: 90, gospel: -90 };

  function setTag(fig, label, side, at) {
    if (!label) { fig.tag.setAttribute('display', 'none'); return; }
    fig.tag.removeAttribute('display');
    fig.tagText.textContent = label;
    var w = Math.max(30, label.length * 6.4 + 14);
    var gap = fig.r + 4;
    // the level labels (footpace, steps, floor) sit in the left 56 units, and
    // nothing may run off the right edge; down at the rail there is only room above
    var low = at && at.y > 180;
    var leftFits = !at || at.x - gap - w >= 58;
    var rightFits = !at || at.x + gap + w <= W - 6;
    if (side === 'left' && !leftFits) side = rightFits ? 'right' : (low ? 'above' : 'below');
    else if (side === 'right' && !rightFits) side = leftFits ? 'left' : (low ? 'above' : 'below');
    var x, y;
    if (side === 'left') { x = -gap - w; y = -9; }
    else if (side === 'right') { x = gap; y = -9; }
    else if (side === 'above') { x = -w / 2; y = -gap - 18; }
    else { x = -w / 2; y = gap; }
    fig.tagBg.setAttribute('x', x);
    fig.tagBg.setAttribute('y', y);
    fig.tagBg.setAttribute('width', w);
    fig.tagText.setAttribute('x', x + 7);
    fig.tagText.setAttribute('y', y + 9.5);
  }

  function place(fig, p) {
    fig.g.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
  }

  // The last leg stops short so the arrowhead is not hidden under whoever
  // is standing at the end of the route.
  function routePath(points, shorten) {
    var pts = points.map(function (p) { return { x: p.x, y: p.y }; });
    var n = pts.length;
    if (n > 1 && shorten) {
      var a = pts[n - 2], b = pts[n - 1];
      var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy);
      if (len > shorten * 1.5) { b.x -= dx / len * shorten; b.y -= dy / len * shorten; }
    }
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' ');
  }

  function Plan(container, opts) {
    opts = opts || {};
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    var title = el('title', null, svg);
    var defs = el('defs', null, svg);
    ['ink', 'red'].forEach(function (c) {
      var m = el('marker', { id: (opts.idPrefix || 'pl') + '-arrow-' + c, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
      el('path', { d: 'M0 0 L10 5 L0 10 Z', 'class': 'route-head' + (c === 'red' ? ' missal' : '') }, m);
    });
    var room = el('g', null, svg);
    drawRoom(room);
    var routes = el('g', null, svg);
    var marks = el('g', null, svg);
    var figs = el('g', null, svg);

    var missal = makeMissal(figs);
    var priest = makePerson(figs, 'priest', 'P', 13);
    var server = makePerson(figs, 'server', 'S', 11);
    var server2 = makePerson(figs, 'server', 'S2', 11);
    server2.g.querySelector('text.letter').style.fontSize = '8.5px';

    container.innerHTML = '';
    container.appendChild(svg);

    function pose(scene) {
      scene = scene || {};
      // missal
      var m = pt(scene.missal || 'm-epistle');
      place(missal, m);
      missal.inner.setAttribute('transform', 'rotate(' + (m.r || 0) + ')');

      // priest
      if (scene.priest && scene.priest.at) {
        var pp = pt(scene.priest.at);
        priest.g.style.opacity = 1;
        place(priest, pp);
        priest.facing.setAttribute('transform', 'rotate(' + (FACING[scene.priest.faces || 'altar'] || 0) + ')');
        setTag(priest, scene.priest.tag, scene.priest.tagSide || (pp.x > 200 ? 'right' : 'left'), pp);
      } else {
        priest.g.style.opacity = 0;
      }

      // servers
      [[server, scene.server], [server2, scene.server2]].forEach(function (pair) {
        var fig = pair[0], s = pair[1];
        if (!s || !s.at) { fig.g.style.opacity = 0; return; }
        var sp = pt(s.at);
        fig.g.style.opacity = 1;
        place(fig, sp);
        setTag(fig, s.tag || s.posture, s.tagSide || (sp.x < 200 ? 'left' : 'right'), sp);
      });

      // routes and marks are redrawn each time
      routes.innerHTML = '';
      marks.innerHTML = '';
      (scene.routes || []).forEach(function (r) {
        var pts = r.via.map(function (v) { return typeof v === 'string' ? pt(v) : v; });
        var red = r.carrying === 'missal';
        el('path', {
          d: routePath(pts, r.shorten == null ? 17 : r.shorten),
          'class': 'route' + (red ? ' missal' : ''),
          'marker-end': 'url(#' + (opts.idPrefix || 'pl') + '-arrow-' + (red ? 'red' : 'ink') + ')'
        }, routes);
        (r.genuflect || []).forEach(function (v) {
          var g = typeof v === 'string' ? pt(v) : v;
          el('rect', { x: g.x - 5, y: g.y - 5, width: 10, height: 10, transform: 'rotate(45 ' + g.x + ' ' + g.y + ')', 'class': 'gen-mark' }, marks);
          txt(marks, g.x, g.y + 18, 'genuflect', 'gen-text', 'middle');
        });
      });
      (scene.marks || []).forEach(function (mk) {
        var at = typeof mk.at === 'string' ? pt(mk.at) : mk.at;
        var dx = mk.dx || 0, dy = mk.dy || 0;
        if (mk.kind === 'bell') {
          var bx = at.x + dx, by = at.y + dy;
          el('path', { d: 'M' + (bx - 7) + ' ' + (by + 4) + ' Q' + (bx - 7) + ' ' + (by - 8) + ' ' + bx + ' ' + (by - 8) + ' Q' + (bx + 7) + ' ' + (by - 8) + ' ' + (bx + 7) + ' ' + (by + 4) + ' Z M' + (bx - 2.5) + ' ' + (by + 5) + ' a2.5 2.5 0 0 0 5 0 Z', 'class': 'bell-mark' }, marks);
          if (mk.label) txt(marks, bx + 11, by + 1, mk.label, 'extra-text');
        } else if (mk.kind === 'text') {
          txt(marks, at.x + dx, at.y + dy, mk.label, 'extra-text', mk.anchor || 'middle');
        }
      });

      title.textContent = describe(scene);
    }

    // The drawing in one or two plain sentences, for the caption and screen readers.
    var DOING = { kneel: 'You kneel', stand: 'You stand', sit: 'You sit', genuflect: 'You genuflect', move: 'You end up' };
    function describe(scene) {
      var parts = [];
      if (scene.server && scene.server.at) parts.push((DOING[scene.server.posture] || 'You are') + ' ' + pt(scene.server.at).name + '.');
      if (scene.priest && scene.priest.at) parts.push('The priest is ' + pt(scene.priest.at).name + '.');
      parts.push('The missal is ' + pt(scene.missal || 'm-epistle').name + '.');
      return parts.join(' ');
    }

    return { svg: svg, pose: pose, describe: describe };
  }

  window.Plan = Plan;
  window.PLAN_POINTS = POINTS;
})();
