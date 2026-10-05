/* Charts drawn from the same steps as the guide, so a chart can never
   disagree with the step it summarises. */
(function () {
  'use strict';

  var rendered = false;

  function render() {
    if (rendered) return;
    rendered = true;
    crossing();
    wireCrossing();
    bells();
    exceptions();
  }

  // "Where everyone is": time runs down the page, the altar runs across it,
  // Gospel side on the left, Epistle side on the right, as seen from the nave.
  // The server is drawn at the exact place on the plan; the priest and the missal
  // only ever stand at one of three places, so they sit exactly on those columns.
  var COL = { gospel: 138, middle: 230, epistle: 330, side: 410 };
  function snap(px) {
    if (px < 190) return COL.gospel;
    if (px <= 270) return COL.middle;
    if (px <= 370) return COL.epistle;
    return COL.side;
  }

  function crossing() {
    var Sv = window.Serving, P = window.PLAN_POINTS, steps = Sv.steps;
    var box = document.getElementById('chart-crossing');
    if (!box) return;
    var avail = Math.max(320, box.clientWidth);
    var narrow = avail < 560;
    var labelW = narrow ? 120 : 220;
    var plotW = Math.min(520, avail - labelW - 18 - 40);
    var top = 66, rowH = 27, partH = 26;
    var x0 = 110, x1 = 460;
    function X(px) { return labelW + 18 + (Math.max(x0, Math.min(x1, px)) - x0) / (x1 - x0) * plotW; }

    var rows = [], y = top, last = null;
    steps.forEach(function (st, i) {
      if (st.part !== last) { rows.push({ part: st.part, y: y }); y += partH; last = st.part; }
      rows.push({ st: st, i: i, y: y + rowH / 2 });
      y += rowH;
    });
    var W = labelW + 18 + plotW + 40, H = y + 14;

    var out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-labelledby="crossing-title">');
    out.push('<title id="crossing-title">Where the priest, the missal and the server are at each step of Low Mass</title>');

    // the sides of the altar, as columns; the credence and sedilia get a row of their own
    [[COL.gospel, 'Gospel', 34], [COL.middle, 'middle', 34], [COL.epistle, 'Epistle', 34], [COL.side, 'credence, seat', 50]].forEach(function (c) {
      out.push('<line class="ch-grid' + (c[1] === 'middle' ? ' center' : '') + '" x1="' + X(c[0]) + '" x2="' + X(c[0]) + '" y1="' + (c[2] + 6) + '" y2="' + (H - 8) + '"/>');
      out.push('<text class="ch-axis" x="' + X(c[0]) + '" y="' + c[2] + '" text-anchor="' + (c[0] === COL.side ? 'end' : 'middle') + '"' + (c[0] === COL.side ? ' dx="8"' : '') + '>' + c[1] + '</text>');
    });
    out.push('<text class="ch-axis" x="' + (labelW + 18) + '" y="14" text-anchor="start">\u2190 Gospel side</text>');
    out.push('<text class="ch-axis" x="' + (labelW + 18 + plotW) + '" y="14" text-anchor="end">Epistle side \u2192</text>');

    // row backgrounds and labels
    rows.forEach(function (r) {
      if (r.part) {
        out.push('<text class="ch-label part" x="4" y="' + (r.y + 17) + '">' + Sv.esc(Sv.partsByKey[r.part].name) + '</text>');
        return;
      }
      out.push('<g class="ch-row" tabindex="0" role="link" aria-label="Open step: ' + Sv.esc(r.st.title) + '" data-step="' + Sv.esc(r.st.id) + '" style="cursor:pointer">' +
        '<rect class="row-bg" x="0" y="' + (r.y - rowH / 2) + '" width="' + W + '" height="' + rowH + '"/>' +
        '<text class="ch-label" x="' + labelW + '" y="' + (r.y + 4) + '" text-anchor="end">' + Sv.esc(r.st.short || r.st.title) + '</text>' +
        '</g>');
    });

    function series(get, offset, snapTo) {
      var pts = [];
      rows.forEach(function (r) {
        if (!r.st) return;
        var at = get(r.st);
        if (at && P[at]) pts.push([X(snapTo ? snap(P[at].x) : P[at].x) + offset, r.y, r.st]);
      });
      return pts;
    }
    function poly(pts, cls) {
      if (pts.length < 2) return;
      out.push('<polyline class="ch-line ' + cls + '" points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1]; }).join(' ') + '"/>');
    }

    var missal = series(function (st) { return st.missal; }, 3, true);
    var priest = series(function (st) { return st.priest && st.priest.at; }, -3, true);
    var server = series(function (st) { return st.server && st.server.at; }, 0, false);
    poly(missal, 'missal');
    poly(priest, 'priest');
    poly(server, 'server');

    missal.forEach(function (p) { out.push('<rect class="ch-dot missal" x="' + (p[0] - 3.5) + '" y="' + (p[1] - 3.5) + '" width="7" height="7" pointer-events="none"/>'); });
    priest.forEach(function (p) { out.push('<circle class="ch-dot priest" cx="' + p[0] + '" cy="' + p[1] + '" r="3" pointer-events="none"/>'); });
    server.forEach(function (p) {
      var posture = (p[2].server && p[2].server.posture) || 'move';
      var cls = posture === 'kneel' ? 'kneel' : (posture === 'move' ? 'move' : 'stand');
      out.push('<circle class="ch-dot ' + cls + '" cx="' + p[0] + '" cy="' + p[1] + '" r="5" pointer-events="none"/>');
    });

    // bells, in the margin
    rows.forEach(function (r) {
      if (!r.st || !r.st.bell) return;
      var bx = labelW + 18 + plotW + 22, by = r.y;
      out.push('<path class="ch-bell" pointer-events="none" d="M' + (bx - 6) + ' ' + (by + 4) + ' Q' + (bx - 6) + ' ' + (by - 7) + ' ' + bx + ' ' + (by - 7) + ' Q' + (bx + 6) + ' ' + (by - 7) + ' ' + (bx + 6) + ' ' + (by + 4) + ' Z M' + (bx - 2) + ' ' + (by + 5) + ' a2 2 0 0 0 4 0 Z"/>');
    });

    out.push('</svg>');
    box.innerHTML = out.join('');
  }

  function wireCrossing() {
    var box = document.getElementById('chart-crossing');
    if (!box) return;
    function go(e) {
      var g = e.target.closest('[data-step]');
      if (g) window.Serving.goToStep(g.getAttribute('data-step'));
    }
    box.addEventListener('click', go);
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
    // redraw when the width changes (a phone turned sideways)
    var lastW = box.clientWidth, t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (box.offsetParent && Math.abs(box.clientWidth - lastW) > 40) { lastW = box.clientWidth; crossing(); }
      }, 150);
    });
  }

  function bells() {
    var Sv = window.Serving;
    var body = document.getElementById('bells-body');
    if (!body) return;
    body.innerHTML = Sv.steps.filter(function (st) { return st.bell; }).map(function (st) {
      var b = st.bell;
      return '<tr><th scope="row"><a href="#s-' + Sv.esc(st.id) + '">' + Sv.esc(st.short || st.title) + '</a></th>' +
        '<td>' + Sv.esc(b.rings || '') + '</td>' +
        '<td>' + Sv.authChip(b.auth) + '</td>' +
        '<td>' + Sv.rich(b.note || '') + Sv.citeHtml(b.cite) + '</td></tr>';
    }).join('');
  }

  function exceptions() {
    var Sv = window.Serving, ex = window.SERVING.exceptions;
    var table = document.getElementById('exceptions');
    if (!table || !ex) return;
    var head = '<thead><tr><th scope="col">What</th>' + ex.cols.map(function (c) { return '<th scope="col">' + Sv.esc(c.name) + '</th>'; }).join('') + '</tr></thead>';
    var body = '<tbody>' + ex.rows.map(function (r) {
      return '<tr><th scope="row">' + Sv.rich(r.name) + (r.cite ? Sv.citeHtml(r.cite) : '') + '</th>' + ex.cols.map(function (c) {
        var v = r.cells[c.key];
        var cls = v === 'yes' ? 'yes' : v === 'no' ? 'no' : '';
        var label = v === 'yes' ? 'Yes' : v === 'no' ? 'Omitted' : Sv.rich(v || '');
        return '<td class="' + cls + '">' + label + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody>';
    table.innerHTML = head + body;
  }

  window.Charts = { render: render };
})();
