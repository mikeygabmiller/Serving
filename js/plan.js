/* The sanctuary plan: one drawing, re-posed for every step of the Mass.
   Seen from the nave, the way the people see it: the altar at the top,
   the Gospel side on the left, the Epistle side on the right. The layout
   follows Fortescue's figures of High Mass (1920, pp. 126-129): credence and
   sedilia on the Epistle side, torchbearers in a line across the sanctuary.
   Coordinates are plan units inside a 460 x 250 viewBox. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var W = 460, H = 250;

  // Every place a figure can stand. Steps in data/*.js name these; nothing
  // else in the site holds a coordinate (except a figure you move yourself
  // on a sheet, which is stored with that sheet).
  var POINTS = {
    // the priest (the celebrant)
    'p-foot':          { x: 230, y: 124, name: 'at the foot of the altar, in the middle' },
    'p-step':          { x: 230, y: 104, name: 'kneeling on the lowest step, in the middle' },
    'p-center':        { x: 230, y: 66,  name: 'at the middle of the altar' },
    'p-epistle':       { x: 292, y: 66,  name: 'at the Epistle corner' },
    'p-gospel':        { x: 168, y: 66,  name: 'at the Gospel corner' },
    'p-rail':          { x: 330, y: 212, name: 'at the altar rail, starting at the Epistle end' },
    'p-sedilia':       { x: 433, y: 124, name: 'at the sedilia, in the middle seat' },
    'p-sedilia-first': { x: 433, y: 100, name: 'at the sedilia' },

    // the deacon and the subdeacon (Solemn High Mass)
    'd-foot':          { x: 262, y: 124, name: 'at the priest\'s right at the foot' },
    'd-right':         { x: 258, y: 66,  name: 'at the priest\'s right' },
    'd-behind':        { x: 230, y: 92,  name: 'behind the priest, on the step' },
    'd-behind-epistle':{ x: 292, y: 92,  name: 'behind the priest at the Epistle side, on the step' },
    'd-incense':       { x: 330, y: 130, name: 'on the floor at the Epistle side' },
    'd-sedilia':       { x: 433, y: 100, name: 'at the sedilia, nearest the altar' },
    'd-front':         { x: 246, y: 146, name: 'in the middle of the sanctuary' },
    'd-gospel':        { x: 92,  y: 158, name: 'at the Gospel place, facing north' },
    'd-elev':          { x: 258, y: 80,  name: 'at the priest\'s right, on the edge of the footpace' },
    'd-rail':          { x: 358, y: 214, name: 'at the priest\'s right at the rail' },
    'sd-foot':         { x: 198, y: 124, name: 'at the priest\'s left at the foot' },
    'sd-left':         { x: 202, y: 66,  name: 'at the priest\'s left' },
    'sd-behind':       { x: 230, y: 124, name: 'on the floor behind the deacon' },
    'sd-behind-epistle':{ x: 292, y: 124, name: 'on the floor behind the deacon, at the Epistle side' },
    'sd-epistle':      { x: 292, y: 148, name: 'on the floor at the Epistle side, singing the Epistle' },
    'sd-sedilia':      { x: 433, y: 148, name: 'at the sedilia, furthest from the altar' },
    'sd-front':        { x: 214, y: 146, name: 'in the middle of the sanctuary' },
    'sd-gospel':       { x: 60,  y: 158, name: 'at the Gospel place, holding the book' },
    'sd-elev':         { x: 230, y: 104, name: 'on the lowest step, in the middle' },

    // one server at Low Mass (P1 to P10 are the positions in research/serving-the-tlm.md, B24)
    's-sacristy':      { x: 452, y: 186, name: 'coming from the sacristy' },
    's-beside-right':  { x: 264, y: 126, name: 'at the priest\'s right, at the foot of the altar' },
    's-beside-left':   { x: 196, y: 126, name: 'at the priest\'s left, at the foot of the altar' },
    's-foot-gospel':   { x: 198, y: 140, name: 'on the floor behind the priest, to his left' },            // P1
    's-foot-epistle':  { x: 262, y: 140, name: 'on the floor behind the priest, to his right' },
    's-gospel-step':   { x: 122, y: 104, name: 'on the lowest step at the Gospel end' },                   // P2
    's-epistle-floor': { x: 330, y: 130, name: 'on the floor at the Epistle corner' },                     // P3
    's-gospel-book':   { x: 128, y: 90,  name: 'on the step below the footpace, beside the missal' },      // P4
    's-epistle-step':  { x: 338, y: 104, name: 'on the lowest step at the Epistle end' },                  // P5
    's-consecration':  { x: 258, y: 80,  name: 'on the edge of the footpace at the priest\'s right' },     // P6
    's-consecration-left': { x: 202, y: 80, name: 'on the edge of the footpace at the priest\'s left' },
    's-cruets':        { x: 352, y: 88,  name: 'on the step below the footpace at the Epistle corner' },   // P7
    's-credence':      { x: 424, y: 78,  name: 'at the credence' },                                         // P8
    's-rail':          { x: 358, y: 214, name: 'at the priest\'s right at the altar rail' },                // P9
    's-center-floor':  { x: 230, y: 128, name: 'on the floor in the middle' },                             // P10
    's-missal-epistle':{ x: 306, y: 76,  name: 'on the footpace at the Epistle corner' },
    's-missal-gospel': { x: 154, y: 76,  name: 'on the footpace at the Gospel corner' },
    's-seat':          { x: 398, y: 170, name: 'on a stool by the sedilia' },
    's-leonine':       { x: 264, y: 104, name: 'on the lowest step at the priest\'s right' },

    // two servers at Low Mass: each keeps one corner of the lowest step
    'a1-corner':       { x: 360, y: 104, name: 'at the Epistle corner of the lowest step' },
    'a2-corner':       { x: 100, y: 104, name: 'at the Gospel corner of the lowest step' },
    'a1-wait':         { x: 346, y: 126, name: 'on the floor at the Epistle side' },
    'a2-wait':         { x: 322, y: 126, name: 'on the floor at the Epistle side, at the first server\'s left' },
    'a1-cruets':       { x: 352, y: 74,  name: 'on the top step at the Epistle corner' },
    'a2-cruets':       { x: 356, y: 98,  name: 'on the step at the Epistle corner, at the first server\'s left' },
    'a2-veil':         { x: 262, y: 76,  name: 'on the footpace at the priest\'s right' },
    'a2-build':        { x: 202, y: 76,  name: 'on the footpace at the priest\'s left' },
    'a1-stool':        { x: 398, y: 162, name: 'on a stool at the Epistle side' },
    'a2-stool':        { x: 398, y: 186, name: 'on a stool at the Epistle side, at the first server\'s left' },
    'a1-line':         { x: 246, y: 140, name: 'on the floor at the foot of the altar' },
    'a2-line':         { x: 214, y: 140, name: 'on the floor at the foot of the altar' },
    'a1-communion':    { x: 246, y: 86,  name: 'on the edge of the footpace' },
    'a2-communion':    { x: 214, y: 86,  name: 'on the edge of the footpace' },

    // High Mass: the acolytes' place is in front of the credence (Fortescue p. 97)
    'ac1-cred':        { x: 384, y: 42,  name: 'at the credence, nearer the altar' },
    'ac2-cred':        { x: 384, y: 66,  name: 'at the credence' },
    'ac1-gospel-c':    { x: 78,  y: 106, name: 'at the Gospel end of the steps, facing across' },
    'ac2-gospel-c':    { x: 78,  y: 62,  name: 'at the Gospel end of the steps, nearest the altar' },
    'ac1-gospel-s':    { x: 60,  y: 182, name: 'at the Gospel place, at the subdeacon\'s right' },
    'ac2-gospel-s':    { x: 60,  y: 134, name: 'at the Gospel place, at the subdeacon\'s left' },
    'ac1-mid':         { x: 254, y: 170, name: 'in the middle of the sanctuary, on the right' },
    'ac2-mid':         { x: 206, y: 170, name: 'in the middle of the sanctuary, on the left' },
    'ac1-mid-s':       { x: 246, y: 190, name: 'in the middle of the sanctuary, on the right' },
    'ac2-mid-s':       { x: 214, y: 190, name: 'in the middle of the sanctuary, on the left' },
    'ac1-floor':       { x: 346, y: 126, name: 'on the floor at the Epistle side' },
    'ac2-floor':       { x: 322, y: 126, name: 'on the floor at the Epistle side' },
    'ac1-up':          { x: 352, y: 74,  name: 'on the top step at the Epistle corner' },
    'ac2-up':          { x: 354, y: 96,  name: 'on the step at the Epistle corner' },
    'ac1-line':        { x: 206, y: 140, name: 'in the servers\' line at the foot' },
    'ac2-line':        { x: 230, y: 140, name: 'in the servers\' line at the foot' },
    'ac1-kneel-up':    { x: 206, y: 92,  name: 'on the edge of the footpace' },
    'ac2-kneel-up':    { x: 230, y: 92,  name: 'on the edge of the footpace' },
    'ac1-missal':      { x: 154, y: 76,  name: 'on the footpace at the Gospel corner' },
    'ac1-recess':      { x: 254, y: 182, name: 'in the middle, at the crucifer\'s right' },
    'ac2-recess':      { x: 206, y: 182, name: 'in the middle, at the crucifer\'s left' },

    // the master of ceremonies
    'mc-foot-left':    { x: 198, y: 140, name: 'behind the priest, to his left' },
    'mc-foot-right':   { x: 294, y: 140, name: 'behind the deacon, to his right' },
    'mc-missal':       { x: 324, y: 72,  name: 'at the missal, at the priest\'s right' },
    'mc-up':           { x: 334, y: 58,  name: 'on the footpace at the Epistle side' },
    'mc-canon':        { x: 202, y: 72,  name: 'at the missal, at the priest\'s left' },
    'mc-epistle-floor':{ x: 352, y: 128, name: 'on the floor at the Epistle side' },
    'mc-incense':      { x: 340, y: 128, name: 'on the floor at the Epistle side, facing the priest' },
    'mc-sedilia':      { x: 433, y: 76,  name: 'by the sedilia, facing down the church' },
    'mc-mid-c':        { x: 230, y: 146, name: 'in the middle of the sanctuary' },
    'mc-mid-s':        { x: 214, y: 168, name: 'in the middle, behind the subdeacon' },
    'mc-gospel-c':     { x: 126, y: 80,  name: 'at the Gospel corner of the footpace, by the book' },
    'mc-gospel-s':     { x: 92,  y: 134, name: 'at the Gospel place, at the deacon\'s right' },
    'mc-epistle-sd':   { x: 318, y: 148, name: 'on the floor at the subdeacon\'s left' },
    'mc-elev-c':       { x: 202, y: 80,  name: 'on the footpace at the priest\'s left' },
    'mc-elev-s':       { x: 384, y: 112, name: 'on the floor at the Epistle side' },
    'mc-gospel-step':  { x: 100, y: 104, name: 'on the lowest step at the Gospel side' },
    'mc-line-c':       { x: 182, y: 140, name: 'at the Gospel end of the servers\' line' },
    'mc-line-s':       { x: 278, y: 140, name: 'at the Epistle end of the servers\' line' },
    'mc-kneel-up-c':   { x: 182, y: 92,  name: 'on the edge of the footpace' },
    'mc-kneel-up-s':   { x: 278, y: 92,  name: 'on the edge of the footpace' },
    'mc-rail-c':       { x: 358, y: 214, name: 'at the priest\'s right at the rail' },
    'mc-rail-s':       { x: 386, y: 214, name: 'at the deacon\'s right at the rail' },
    'mc-foot-left-out':{ x: 200, y: 124, name: 'at the priest\'s left at the foot' },

    // the thurifer
    'th-floor':        { x: 370, y: 132, name: 'on the floor at the Epistle side' },
    'th-up':           { x: 334, y: 82,  name: 'on the footpace at the Epistle side' },
    'th-incense':      { x: 340, y: 150, name: 'on the floor at the MC\'s left' },
    'th-incense-s':    { x: 352, y: 116, name: 'a little behind the deacon, at his right' },
    'th-mid-c':        { x: 230, y: 170, name: 'in the middle, between the acolytes' },
    'th-mid-s':        { x: 246, y: 168, name: 'in the middle, behind the deacon' },
    'th-gospel-c':     { x: 78,  y: 84,  name: 'at the Gospel end of the steps, between the acolytes' },
    'th-gospel-s':     { x: 92,  y: 182, name: 'at the Gospel place, at the deacon\'s left' },
    'th-elev':         { x: 356, y: 104, name: 'on the lowest step at the Epistle side, facing across' },
    'th-nave':         { x: 230, y: 206, name: 'at the entrance of the sanctuary, facing the people' },
    'th-seat':         { x: 440, y: 196, name: 'at the thurifer\'s place, by the way to the sacristy' },
    'th-line-c':       { x: 278, y: 140, name: 'at the Epistle end of the servers\' line' },
    'th-line-s':       { x: 182, y: 140, name: 'at the Gospel end of the servers\' line' },
    'th-kneel-up-c':   { x: 278, y: 92,  name: 'on the edge of the footpace' },
    'th-kneel-up-s':   { x: 182, y: 92,  name: 'on the edge of the footpace' },
    'th-recess':       { x: 230, y: 204, name: 'in the middle, behind the acolytes' },

    // the crucifer and the torchbearers: their bench is on the Gospel side
    'cr-bench':        { x: 18,  y: 126, name: 'at the servers\' bench' },
    'cr-mid':          { x: 230, y: 182, name: 'in the middle, between the acolytes' },
    'cr-line':         { x: 254, y: 140, name: 'in the servers\' line at the foot' },
    'cr-kneel-up':     { x: 254, y: 92,  name: 'on the edge of the footpace' },
    'tb1-bench':       { x: 18,  y: 146, name: 'at the servers\' bench' },
    'tb2-bench':       { x: 18,  y: 166, name: 'at the servers\' bench' },
    'tb3-bench':       { x: 18,  y: 186, name: 'at the servers\' bench' },
    'tb4-bench':       { x: 18,  y: 206, name: 'at the servers\' bench' },
    'tb1-line':        { x: 146, y: 160, name: 'in the line across the sanctuary' },
    'tb2-line':        { x: 188, y: 160, name: 'in the line across the sanctuary' },
    'tb3-line':        { x: 272, y: 160, name: 'in the line across the sanctuary' },
    'tb4-line':        { x: 314, y: 160, name: 'in the line across the sanctuary' },
    'tb1-rail':        { x: 52,  y: 212, name: 'at the Gospel end of the rail' },
    'tb4-rail':        { x: 408, y: 212, name: 'at the Epistle end of the rail' },
    'tb1-front':       { x: 182, y: 160, name: 'in front of the acolytes' },
    'tb2-front':       { x: 206, y: 160, name: 'in front of the acolytes' },
    'tb3-front':       { x: 254, y: 160, name: 'in front of the acolytes' },
    'tb4-front':       { x: 278, y: 160, name: 'in front of the acolytes' },

    // a few more places the High Mass moments need
    'mc-up-center':    { x: 262, y: 58,  name: 'on the footpace at the priest\'s right' },
    'th-up-center':    { x: 262, y: 84,  name: 'on the footpace at the priest\'s right, below the MC' },
    'th-at-cr':        { x: 42,  y: 126, name: 'beside the crucifer at the bench' },
    'mc-corner-s':     { x: 372, y: 96,  name: 'at the Epistle corner of the steps' },
    'sd-credence':     { x: 414, y: 80,  name: 'at the credence' },
    'mc-credence':     { x: 392, y: 98,  name: 'at the credence, beside the subdeacon' },
    'ac1-altar':       { x: 342, y: 76,  name: 'at the Epistle end of the altar' },
    'ac2-build-s':     { x: 178, y: 86,  name: 'at the Gospel side, beside the subdeacon' },
    'd-foot-center':   { x: 230, y: 136, name: 'at the foot of the altar, in the middle' },
    'th-foot-right':   { x: 262, y: 136, name: 'at the foot, at the deacon\'s right' },
    'sd-book':         { x: 318, y: 120, name: 'on the floor at the Epistle side, with the book' },
    'mc-book':         { x: 346, y: 136, name: 'on the floor at the Epistle side, beside the subdeacon' },
    'sd-incense':      { x: 306, y: 132, name: 'on the floor at the deacon\'s left' },
    'th-up-left':      { x: 202, y: 80,  name: 'on the footpace at the priest\'s left' },
    'mc-gospel-floor': { x: 104, y: 130, name: 'on the floor at the Gospel side' },
    'th-gospel-floor': { x: 128, y: 130, name: 'on the floor at the Gospel side, at the MC\'s left' },
    'mc-epistle-sd2':  { x: 266, y: 148, name: 'on the floor at the subdeacon\'s left' },
    'd-missal':        { x: 230, y: 128, name: 'crossing the middle with the missal' },
    'sd-build':        { x: 202, y: 66,  name: 'at the Gospel side of the altar, near the middle' },

    'ac1-holds-missal':{ x: 336, y: 100, name: 'at the Epistle side, holding the missal away from the altar' },
    'ac1-holds-missal-g': { x: 124, y: 100, name: 'at the Gospel side, holding the missal away from the altar' },
    'mc-accompany':    { x: 320, y: 58,  name: 'on the footpace at the priest\'s right' },
    'th-accompany':    { x: 264, y: 80,  name: 'on the footpace at the priest\'s left' },
    'ac1-wait-h':      { x: 388, y: 120, name: 'on the floor at the Epistle side, waiting' },
    'ac2-wait-h':      { x: 388, y: 142, name: 'on the floor at the Epistle side, waiting' },
    'th-incense-mc':   { x: 196, y: 126, name: 'on the floor below the MC' },
    'th-mid-lead':     { x: 230, y: 184, name: 'in the middle, behind the torchbearers' },

    // Solemn High Mass
    'th-impose-s':     { x: 288, y: 70,  name: 'on the footpace at the deacon\'s right, facing the priest' },
    'mc-impose-s':     { x: 302, y: 96,  name: 'on the step at the thurifer\'s left' },
    'd-with-p-e':      { x: 318, y: 72,  name: 'at the priest\'s right, holding the chasuble' },
    'sd-with-p-e':     { x: 266, y: 72,  name: 'at the priest\'s left, holding the chasuble' },
    'd-with-p-g':      { x: 194, y: 72,  name: 'at the priest\'s right, holding the chasuble' },
    'th-with-p-g':     { x: 142, y: 72,  name: 'at the priest\'s left, at his elbow' },
    'mc-holds-missal': { x: 372, y: 118, name: 'on the floor at the Epistle side, holding the missal' },
    'mc-holds-missal-g': { x: 104, y: 120, name: 'on the floor at the Gospel side, holding the missal' },
    'th-wait-s':       { x: 396, y: 150, name: 'on the floor at the Epistle side, out of the way' },
    'mc-sd-right':     { x: 318, y: 124, name: 'on the floor at the subdeacon\'s right' },
    'd-altar':         { x: 230, y: 66,  name: 'at the middle of the altar' },
    'd-left':          { x: 202, y: 66,  name: 'at the priest\'s left, by the missal' },
    'sd-right':        { x: 258, y: 66,  name: 'at the priest\'s right' },
    'mc-foot-d':       { x: 256, y: 128, name: 'at the foot of the altar, waiting for the deacon' },
    'sd-cruets':       { x: 296, y: 72,  name: 'at the Epistle side of the altar, beside the deacon' },
    'th-incense-d':    { x: 308, y: 146, name: 'on the floor at the deacon\'s left, a little behind' },
    'th-by-mc':        { x: 398, y: 116, name: 'beside the MC at the Epistle side' },
    'sd-paten':        { x: 288, y: 72,  name: 'at the deacon\'s right' },
    'veil-taker':      { x: 300, y: 100, name: 'on the step behind the subdeacon' },
    'ac2-veil-wait':   { x: 396, y: 100, name: 'at the MC\'s right, holding the chalice veil' },
    'sd-pours':        { x: 320, y: 70,  name: 'at the priest\'s right, pouring' },

    // the missal: r is its turn in degrees
    'm-epistle':       { x: 306, y: 40, r: 0,   name: 'on its stand at the Epistle side, square to the front of the altar' },
    'm-gospel':        { x: 154, y: 40, r: -28, name: 'on its stand at the Gospel side, turned so its pages face the middle' },
    'm-canon':         { x: 198, y: 40, r: -14, name: 'near the middle on the Gospel side, for the Canon' }
  };

  // Everyone who can appear on a plan. The priest is gold; the deacon and
  // subdeacon too (they are clergy); servers are ink; you are red.
  var CAST = {
    p:   { label: 'P',  clergy: true, r: 12, name: 'the priest' },
    d:   { label: 'D',  clergy: true, r: 11, name: 'the deacon' },
    sd:  { label: 'SD', clergy: true, r: 11, name: 'the subdeacon' },
    s:   { label: 'S',  r: 11, name: 'the server' },
    a1:  { label: 'A1', r: 11, name: 'the first server' },
    a2:  { label: 'A2', r: 11, name: 'the second server' },
    mc:  { label: 'MC', r: 10, name: 'the MC' },
    th:  { label: 'Th', r: 10, name: 'the thurifer' },
    ac1: { label: 'A1', r: 10, name: 'the first acolyte' },
    ac2: { label: 'A2', r: 10, name: 'the second acolyte' },
    cr:  { label: 'Cr', r: 10, name: 'the crucifer' },
    tb1: { label: 'T',  r: 9,  name: 'a torchbearer' },
    tb2: { label: 'T',  r: 9,  name: 'a torchbearer' },
    tb3: { label: 'T',  r: 9,  name: 'a torchbearer' },
    tb4: { label: 'T',  r: 9,  name: 'a torchbearer' }
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
  function pt(where) {
    if (where && typeof where === 'object') return where;
    var p = POINTS[where];
    if (!p) throw new Error('Unknown place on the plan: ' + where);
    return p;
  }

  // The fixed architecture: drawn once per plan.
  function drawRoom(g, levelsG, benchG) {
    el('path', { d: 'M6 12 V4 H454 V12', 'class': 'pl-wall' }, g);

    // three steps up to the altar: lowest step, middle step, footpace (predella)
    el('rect', { x: 92, y: 50, width: 276, height: 60, 'class': 'pl-step' }, g);
    el('rect', { x: 104, y: 50, width: 252, height: 47, 'class': 'pl-step' }, g);
    el('rect', { x: 116, y: 50, width: 228, height: 34, 'class': 'pl-predella' }, g);

    // the altar, the tabernacle with its cross, six candlesticks, three altar cards
    el('rect', { x: 140, y: 18, width: 180, height: 32, 'class': 'pl-altar' }, g);
    el('rect', { x: 219, y: 9, width: 22, height: 20, 'class': 'pl-tab' }, g);
    el('path', { d: 'M230 12 V26 M225 16.5 H235', 'class': 'pl-wall', 'stroke-width': 1.3 }, g);
    [156, 176, 196, 264, 284, 304].forEach(function (x) {
      el('circle', { cx: x, cy: 23, r: 3.2, 'class': 'pl-candle' }, g);
    });
    el('rect', { x: 220, y: 32, width: 20, height: 8, 'class': 'pl-card' }, g);
    el('rect', { x: 146, y: 27, width: 12, height: 6, 'class': 'pl-card' }, g);
    el('rect', { x: 302, y: 27, width: 12, height: 6, 'class': 'pl-card' }, g);

    // the credence and the sedilia (three seats) on the Epistle side
    el('rect', { x: 400, y: 34, width: 48, height: 30, rx: 2, 'class': 'pl-furn' }, g);
    txt(g, 424, 52, 'credence', 'pl-small', 'middle');
    [88, 112, 136].forEach(function (y) { el('rect', { x: 418, y: y, width: 30, height: 24, 'class': 'pl-furn' }, g); });
    txt(g, 433, 172, 'sedilia', 'pl-small', 'middle');

    // the altar rail with its gate
    el('path', { d: 'M8 226 H206 M254 226 H452', 'class': 'pl-rail' }, g);
    txt(g, 230, 242, 'altar rail · the people beyond', 'pl-small', 'middle');

    // the two sides, up in the corners where no one ever stands
    txt(g, 8, 28, 'Gospel side', 'pl-label side');
    txt(g, 452, 24, 'Epistle side', 'pl-label side', 'end');

    // what the levels are called (Low Mass), or the servers' bench (High Mass)
    txt(levelsG, 8, 70, 'footpace', 'pl-small');
    txt(levelsG, 8, 99, 'steps', 'pl-small');
    txt(levelsG, 8, 130, 'floor', 'pl-small');
    el('rect', { x: 8, y: 116, width: 20, height: 100, rx: 2, 'class': 'pl-furn' }, benchG);
    txt(benchG, 34, 120, 'servers\' bench', 'pl-small');
  }

  var FACING = { altar: 0, people: 180, epistle: 90, gospel: -90, north: -90, south: 90 };

  function makeFigure(layer, key) {
    var c = CAST[key] || { label: key.toUpperCase().slice(0, 2), r: 10 };
    var g = el('g', { 'class': 'fig ' + (c.clergy ? 'is-clergy' : 'is-server'), 'data-key': key }, layer);
    var r = c.r;
    var facing = el('path', { d: 'M-4.5 -' + (r + 1) + ' L0 -' + (r + 6.5) + ' L4.5 -' + (r + 1) + ' Z', 'class': 'facing' }, g);
    var ring = el('circle', { r: r + 3.5, 'class': 'you-ring' }, g);
    el('circle', { r: r, 'class': 'body' }, g);
    var t = el('text', { 'class': 'letter', y: 0.5 }, g);
    t.textContent = c.label;
    if (c.label.length > 1) t.style.fontSize = (r <= 10 ? 8.5 : 9.5) + 'px';
    var tag = el('g', { 'class': 'tag-g' }, g);
    var tagBg = el('rect', { 'class': 'tag-bg', rx: 9, height: 18 }, tag);
    var tagText = el('text', { 'class': 'tag' }, tag);
    return { key: key, g: g, facing: facing, ring: ring, tag: tag, tagBg: tagBg, tagText: tagText, r: r };
  }

  function makeMissal(layer) {
    var g = el('g', { 'class': 'fig fig-missal' }, layer);
    var inner = el('g', null, g);
    el('rect', { x: -11, y: -7, width: 22, height: 14, rx: 1.5, 'class': 'cover' }, inner);
    el('line', { x1: 0, y1: -7, x2: 0, y2: 7 }, inner);
    return { g: g, inner: inner };
  }

  // A tag ("kneels", "holds the missal") goes beside its figure, on the first
  // side where it stays on the drawing and covers nobody else.
  function tagBox(side, at, gap, w) {
    var x, y;
    if (side === 'left') { x = -gap - w; y = -9; }
    else if (side === 'right') { x = gap; y = -9; }
    else if (side === 'above') { x = -w / 2; y = -gap - 18; }
    else { x = -w / 2; y = gap; }
    if (side === 'above' || side === 'below') x = Math.max(-at.x + 4, Math.min(W - 4 - at.x - w, x));
    return { x: x, y: y, w: w, h: 18 };
  }
  function covers(b, at, obstacles) {
    var ax = at.x + b.x, ay = at.y + b.y, n = 0;
    obstacles.forEach(function (o) {
      var cx = Math.max(ax, Math.min(o.x, ax + b.w)), cy = Math.max(ay, Math.min(o.y, ay + b.h));
      var dx = o.x - cx, dy = o.y - cy;
      if (dx * dx + dy * dy < (o.r + 1) * (o.r + 1)) n++;
    });
    return n;
  }
  function setTag(fig, label, side, at, levels, obstacles) {
    if (!label) { fig.tag.setAttribute('display', 'none'); return; }
    fig.tag.removeAttribute('display');
    fig.tagText.textContent = label;
    var w = Math.max(30, label.length * 6.4 + 14);
    var gap = fig.r + 4;
    // keep the tag on the drawing, clear of the level labels on the left
    var leftEdge = levels ? 58 : 4;
    var order = side === 'above' || side === 'below'
      ? [side, side === 'above' ? 'below' : 'above', 'left', 'right']
      : [side, side === 'left' ? 'right' : 'left', 'below', 'above'];
    var best = null, fewest = Infinity;
    order.forEach(function (sd) {
      var b = tagBox(sd, at, gap, w);
      var ax = at.x + b.x, ay = at.y + b.y;
      if (ax < leftEdge || ax + b.w > W - 4 || ay < 2 || ay + b.h > H - 2) return;
      var n = covers(b, at, obstacles || []);
      if (n < fewest) { best = b; fewest = n; }
    });
    if (!best) best = tagBox(at.y > H / 2 ? 'above' : 'below', at, gap, w);
    fig.tagBg.setAttribute('x', best.x);
    fig.tagBg.setAttribute('y', best.y);
    fig.tagBg.setAttribute('width', w);
    fig.tagText.setAttribute('x', best.x + 7);
    fig.tagText.setAttribute('y', best.y + 9.5);
  }

  function place(g, p) {
    g.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
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

  // A scene: { figures: [{ key, at, faces, posture, tag, you }], missal, routes, marks, levels, bench }
  function Plan(container, opts) {
    opts = opts || {};
    var id = opts.idPrefix || ('pl' + Math.random().toString(36).slice(2, 8));
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'class': 'plan-svg' });
    var title = el('title', null, svg);
    var defs = el('defs', null, svg);
    ['ink', 'red', 'soft'].forEach(function (c) {
      var m = el('marker', { id: id + '-arrow-' + c, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
      el('path', { d: 'M0 0 L10 5 L0 10 Z', 'class': 'route-head ' + c }, m);
    });
    var room = el('g', null, svg);
    var levelsG = el('g', null, svg);
    var benchG = el('g', null, svg);
    drawRoom(room, levelsG, benchG);
    var routes = el('g', null, svg);
    var marks = el('g', null, svg);
    var figs = el('g', null, svg);
    var missal = makeMissal(figs);
    var pool = {};
    var current = null, drag = null;

    container.innerHTML = '';
    container.appendChild(svg);

    function figure(key) {
      if (!pool[key]) pool[key] = makeFigure(figs, key);
      return pool[key];
    }

    function pose(scene) {
      scene = scene || {};
      current = scene;
      levelsG.style.display = scene.levels === false ? 'none' : '';
      benchG.style.display = scene.bench ? '' : 'none';

      if (scene.missal) {
        var m = pt(scene.missal);
        missal.g.style.display = '';
        place(missal.g, m);
        missal.inner.setAttribute('transform', 'rotate(' + (m.r || 0) + ')');
      } else {
        missal.g.style.display = 'none';
      }

      // where everyone and the missal are, so a tag can keep clear of them
      var spots = [];
      (scene.figures || []).forEach(function (f) {
        if (f && f.at) spots.push({ key: f.key, x: pt(f.at).x, y: pt(f.at).y, r: (CAST[f.key] || { r: 10 }).r + 2 });
      });
      if (scene.missal) spots.push({ key: '', x: pt(scene.missal).x, y: pt(scene.missal).y, r: 12 });

      var shown = {};
      (scene.figures || []).forEach(function (f) {
        if (!f || !f.at) return;
        var fig = figure(f.key);
        var p = pt(f.at);
        shown[f.key] = true;
        fig.g.style.display = '';
        fig.g.classList.toggle('is-you', !!f.you);
        fig.g.classList.toggle('is-other', !f.you && !(CAST[f.key] || {}).clergy);
        place(fig.g, p);
        if (f.faces) {
          fig.facing.style.display = '';
          fig.facing.setAttribute('transform', 'rotate(' + (FACING[f.faces] != null ? FACING[f.faces] : 0) + ')');
        } else if ((CAST[f.key] || {}).clergy) {
          fig.facing.style.display = '';
          fig.facing.setAttribute('transform', 'rotate(0)');
        } else {
          fig.facing.style.display = 'none';
        }
        // an empty tag ('') means none: one label is enough for a group
        setTag(fig, f.you ? (f.tag != null ? f.tag : f.posture) : null, f.tagSide || (p.x < W / 2 ? 'left' : 'right'), p, scene.levels !== false,
          spots.filter(function (s) { return s.key !== f.key; }));
      });
      Object.keys(pool).forEach(function (k) { if (!shown[k]) pool[k].g.style.display = 'none'; });

      routes.innerHTML = '';
      marks.innerHTML = '';
      (scene.routes || []).forEach(function (r) {
        var pts = r.via.map(pt);
        var kind = r.carrying === 'missal' ? 'red' : (r.you === false ? 'soft' : 'ink');
        el('path', {
          d: routePath(pts, r.shorten == null ? 15 : r.shorten),
          'class': 'route ' + kind,
          'marker-end': 'url(#' + id + '-arrow-' + kind + ')'
        }, routes);
        if (r.you !== false) (r.genuflect || []).forEach(function (v) {
          var g = pt(v);
          el('rect', { x: g.x - 5, y: g.y - 5, width: 10, height: 10, transform: 'rotate(45 ' + g.x + ' ' + g.y + ')', 'class': 'gen-mark' }, marks);
          txt(marks, g.x, g.y + 18, 'genuflect', 'gen-text', 'middle');
        });
      });
      (scene.marks || []).forEach(function (mk) {
        var at = pt(mk.at);
        var bx = at.x + (mk.dx || 0), by = at.y + (mk.dy || 0);
        if (mk.kind === 'bell') {
          el('path', { d: 'M' + (bx - 7) + ' ' + (by + 4) + ' Q' + (bx - 7) + ' ' + (by - 8) + ' ' + bx + ' ' + (by - 8) + ' Q' + (bx + 7) + ' ' + (by - 8) + ' ' + (bx + 7) + ' ' + (by + 4) + ' Z M' + (bx - 2.5) + ' ' + (by + 5) + ' a2.5 2.5 0 0 0 5 0 Z', 'class': 'bell-mark' }, marks);
          if (mk.label) txt(marks, bx + 11, by + 1, mk.label, 'extra-text');
        } else if (mk.kind === 'text') {
          txt(marks, bx, by, mk.label, 'extra-text', mk.anchor || 'middle');
        }
      });

      title.textContent = describe(scene);
    }

    // The drawing in one or two plain sentences, for the caption and screen readers.
    var DOING = { kneel: 'You kneel', stand: 'You stand', sit: 'You sit', genuflect: 'You genuflect', move: 'You end up' };
    function describe(scene) {
      var parts = [];
      var figsList = scene.figures || [];
      figsList.forEach(function (f) {
        if (f && f.you && f.at && typeof f.at === 'string') parts.push((DOING[f.posture] || 'You are') + ' ' + POINTS[f.at].name + '.');
        else if (f && f.you && f.at) parts.push((DOING[f.posture] || 'You are') + ' where you placed yourself.');
      });
      var priest = figsList.filter(function (f) { return f && f.key === 'p' && f.at; })[0];
      if (priest && typeof priest.at === 'string') parts.push('The priest is ' + POINTS[priest.at].name + '.');
      if (scene.missal) parts.push('The missal is ' + POINTS[scene.missal].name + '.');
      return parts.join(' ');
    }

    // Moving your own figure on a sheet. onDrop(key, {x, y}) gets plan units.
    function setDraggable(enabled, onDrop) {
      svg.classList.toggle('dragging-on', !!enabled);
      if (!enabled) { drag = null; return; }
      drag = { onDrop: onDrop };
    }
    function toPlan(evt) {
      var p = svg.createSVGPoint();
      p.x = evt.clientX; p.y = evt.clientY;
      var m = svg.getScreenCTM();
      return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
    }
    var moving = null;
    svg.addEventListener('pointerdown', function (e) {
      if (!drag) return;
      var g = e.target.closest && e.target.closest('.fig.is-you');
      if (!g) return;
      e.preventDefault();
      moving = { g: g, key: g.getAttribute('data-key') };
      svg.setPointerCapture(e.pointerId);
      g.classList.add('is-moving');
    });
    svg.addEventListener('pointermove', function (e) {
      if (!moving) return;
      var p = toPlan(e);
      p.x = Math.max(8, Math.min(W - 8, p.x));
      p.y = Math.max(8, Math.min(H - 8, p.y));
      moving.at = { x: Math.round(p.x), y: Math.round(p.y) };
      place(moving.g, moving.at);
    });
    function end(e) {
      if (!moving) return;
      moving.g.classList.remove('is-moving');
      try { svg.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }
      if (moving.at && drag && drag.onDrop) drag.onDrop(moving.key, moving.at);
      moving = null;
    }
    svg.addEventListener('pointerup', end);
    svg.addEventListener('pointercancel', end);

    return { svg: svg, pose: pose, describe: describe, setDraggable: setDraggable };
  }

  window.Plan = Plan;
  window.PLAN_POINTS = POINTS;
  window.PLAN_CAST = CAST;
  window.PLAN_SIZE = { w: W, h: H };
})();
