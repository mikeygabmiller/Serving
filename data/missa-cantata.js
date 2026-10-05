/* Missa cantata (sung Mass without deacon and subdeacon), in its fuller form:
   master of ceremonies, thurifer, two acolytes, crucifer, torchbearers.
   Built from FSSP Omaha's Sung Mass role sheets and Fortescue (1920) ch. XIII
   §2, corrected by the 1962 rubrics. Research: research/positions.md,
   "Missa cantata". Where the two sources differ, the step's notes say so.

   place:  where everyone is at the end of the step. Anyone not named is at
           their usual place (see HOME below).
   mc, th, ac1, ac2, cr, tb: what each position does. */
(function () {
  var HOME = {
    p: 'p-center',
    mc: ['mc-epistle-floor', 'stand'],
    th: ['th-seat', 'stand'],
    ac1: ['ac1-cred', 'stand'], ac2: ['ac2-cred', 'stand'],
    cr: ['cr-bench', 'stand'],
    tb1: ['tb1-bench', 'stand'], tb2: ['tb2-bench', 'stand'], tb3: ['tb3-bench', 'stand'], tb4: ['tb4-bench', 'stand']
  };
  var TORCHES = { tb1: ['tb1-line', 'kneel'], tb2: ['tb2-line', 'kneel'], tb3: ['tb3-line', 'kneel'], tb4: ['tb4-line', 'kneel'] };

  // Everyone at home with one posture, then the step's own places on top.
  function places(posture, over, torches) {
    var o = {}, k;
    for (k in HOME) o[k] = typeof HOME[k] === 'string' ? HOME[k] : [HOME[k][0], posture || HOME[k][1]];
    if (torches) for (k in TORCHES) o[k] = TORCHES[k].slice();
    for (k in over) o[k] = over[k];
    return o;
  }
  function sm(where) { return ['FSSPOM', 'Sung Mass, ' + where]; }
  var FORT_SUNG = ['FORT', 'pp. 137–143'];

  SERVING.forms = SERVING.forms || [];
  SERVING.forms.push({
    key: 'cantata', name: 'Missa Cantata (sung Mass)', short: 'Missa Cantata', kind: 'high',
    roles: [
      { key: 'mc', name: 'Master of ceremonies', figures: ['mc'] },
      { key: 'th', name: 'Thurifer', figures: ['th'] },
      { key: 'ac1', name: 'First acolyte', figures: ['ac1'] },
      { key: 'ac2', name: 'Second acolyte', figures: ['ac2'] },
      { key: 'cr', name: 'Crucifer', figures: ['cr'] },
      { key: 'tb', name: 'Torchbearer', figures: ['tb1', 'tb2', 'tb3', 'tb4'] }
    ],
    options: ['confiteor', 'bells131', 'sermon', 'creed', 'asperges'],
    intro: 'The fuller form of the sung Mass, with incense: a master of ceremonies, a thurifer, two acolytes, a crucifer and torchbearers. Your church\'s seats and doors will differ from the plan; move your figure on a sheet to match.',
    steps: [

      // ---------------------------------------------------------- arrival
      {
        id: 'arrive', part: 'before', short: 'Arrival', title: 'The procession arrives',
        place: places('stand', { p: 'p-foot', mc: ['mc-foot-left-out', 'stand'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'th', via: [{ x: 230, y: 150 }, { x: 330, y: 160 }, 'th-seat'], genuflect: [{ x: 230, y: 150 }] },
          { who: 'ac1', via: ['ac1-mid', { x: 372, y: 150 }, 'ac1-cred'] },
          { who: 'ac2', via: ['ac2-mid', { x: 300, y: 172 }, { x: 372, y: 150 }, 'ac2-cred'] },
          { who: 'cr', via: ['cr-mid', { x: 60, y: 160 }, 'cr-bench'] },
          { who: 'tb1', via: [{ x: 182, y: 194 }, 'tb1-bench'] }, { who: 'tb2', via: [{ x: 206, y: 194 }, { x: 60, y: 176 }, 'tb2-bench'] },
          { who: 'tb3', via: [{ x: 254, y: 194 }, { x: 70, y: 196 }, 'tb3-bench'] }, { who: 'tb4', via: [{ x: 278, y: 200 }, 'tb4-bench'] }
        ],
        mc: {
          do: [
            'Walk ahead of the priest. The order is: thurifer; second acolyte, crucifer and first acolyte abreast; torchbearers; you; the priest.',
            'At the altar take the biretta from the priest with the kisses and put it on the sedilia, on the seat nearer the altar.',
            'Come back to your place, signal the genuflection, and signal all to kneel.'
          ],
          auth: 'manual', cite: [sm('MC, Procession and §1'), ['FORT', 'p. 137']]
        },
        th: {
          do: [
            'Lead the procession, the thurible in your left hand (or with hands joined if the thurible is brought out later).',
            'Genuflect at the foot of the altar, then put the thurible on its stand and go to your place.'
          ],
          auth: 'manual', cite: [sm('Thurifer, Procession'), ['FORT', 'p. 137']]
        },
        ac1: {
          do: [
            'Walk at the crucifer\'s right, your candle held on your outside (right) shoulder.',
            'Stop where the thurifer genuflected and bow: walking beside the cross, you do not genuflect.',
            'Set your candle by the credence and go to your place there.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 94–95']]
        },
        ac2: {
          do: [
            'Walk at the crucifer\'s left, your candle held on your outside (left) shoulder.',
            'Stop where the thurifer genuflected and bow: walking beside the cross, you do not genuflect.',
            'Set your candle by the credence and go to your place there.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 94–95']]
        },
        cr: {
          do: [
            'Walk between the acolytes with the figure on the cross facing forward. You never genuflect while carrying the cross.',
            'Stop with the acolytes and bow, then put the cross in its stand and go to your place.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 86–87']]
        },
        tb: {
          do: ['Walk in behind the acolytes and crucifer with joined hands; your torches wait in the sacristy.', 'In the sanctuary genuflect two by two and go to your seats.'],
          auth: 'manual', cite: [sm('Torchbearers, Procession'), ['FORT', 'p. 98']]
        }
      },
      {
        id: 'asperges', opt: 'asperges', part: 'before', short: 'Asperges', title: 'The Asperges (Sundays)',
        place: places('kneel', { p: 'p-foot', mc: ['d-foot', 'stand', null, 'holds the holy water'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'When all have knelt, take the holy water, draw out the sprinkler and hand it to the priest with the kisses.',
            'When he has signed himself, signal all to stand, then to genuflect.',
            'Walk with him holding back the cope and carrying the holy water while he sprinkles the servers, then the people.',
            'Listen for *Glória Patri*: stop and bow toward the altar.',
            'Back in the sanctuary signal the genuflection, hand him the card of prayers, and take it back after the prayer.',
            'At the sedilia give the holy water and card to the first acolyte, and take the cope from the priest for the thurifer.'
          ],
          notes: ['Fortescue has the MC walk at the priest\'s right.'],
          auth: 'manual', cite: [sm('MC §2'), ['FORT', 'pp. 137–138']]
        },
        th: { do: ['Take the cope from the MC when the priest has changed into the chasuble, and carry it away.'], auth: 'local', cite: [sm('MC §2A')] },
        ac1: { do: ['Kneel at your place with the MC, and rise with the MC.', 'Afterwards take the holy water and the book of prayers from the MC to the sacristy.'], auth: 'local', cite: [sm('Acolytes and Crucifer §1')] },
        ac2: { do: ['Kneel at your place with the MC, and rise with the MC. You are sprinkled with the other servers.'], auth: 'local', cite: [sm('Acolytes and Crucifer §1')] },
        cr: { do: ['Kneel at your place with the MC, and rise with the MC. You are sprinkled with the other servers.'], auth: 'local', cite: [sm('Acolytes and Crucifer §1')] },
        tb: { do: ['Kneel and rise with the acolytes. You are sprinkled with the other servers.'], auth: 'local', cite: [sm('Torchbearers, General Guidelines')] }
      },

      // ---------------------------------------------------------- prayers at the foot
      {
        id: 'foot', part: 'foot', short: 'Foot of the altar', title: 'The prayers at the foot of the altar',
        place: places('kneel', { p: 'p-foot', mc: ['mc-foot-left', 'kneel'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'When the priest has vested, go to the altar with him, signal the genuflection, and signal all to kneel.',
            'Kneel behind the priest at his left and answer the prayers, as the server does at Low Mass.'
          ],
          sayFrom: ['introibo', 'psalm', 'misereatur', 'confiteor', 'versicles'],
          auth: 'manual', cite: [sm('MC §3A'), ['FORT', 'p. 138']]
        },
        th: { do: ['Kneel at your place.', 'At *Deus, tu convérsus* rise, fetch the thurible and boat, and wait ready.'], auth: 'local', cite: [sm('Thurifer §1A'), ['FORT', 'p. 91']] },
        ac1: { do: ['Kneel at your place by the credence.'], auth: 'manual', cite: [['FORT', 'p. 94'], sm('Acolytes and Crucifer, General Guidelines')] },
        ac2: { do: ['Kneel at your place by the credence.'], auth: 'manual', cite: [['FORT', 'p. 94'], sm('Acolytes and Crucifer, General Guidelines')] },
        cr: { do: ['Kneel at your place.'], auth: 'manual', cite: [['FORT', 'p. 86']] },
        tb: { do: ['Kneel at your place.'], auth: 'manual', cite: [['FORT', 'p. 98'], sm('Torchbearers')] }
      },

      // ---------------------------------------------------------- incensing at the Introit
      {
        id: 'impose-introit', part: 'catechumens', short: 'Incense blessed', title: 'Incense is put in for the altar',
        place: places('stand', { p: ['p-center', null, 'epistle'], mc: ['mc-up-center', 'stand'], th: ['th-up-center', 'stand'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'mc', via: ['mc-foot-left', { x: 300, y: 140 }, { x: 372, y: 120 }, 'mc-corner-s', 'mc-up-center'] },
          { who: 'th', via: ['th-seat', 'th-floor', 'mc-corner-s', 'th-up-center'] }
        ],
        mc: {
          do: [
            'Lift the priest\'s alb as he goes up, and signal the servers to stand.',
            'Go to the Epistle side. Take the boat from the thurifer, who is at your right, and open it.',
            'Bow when the priest turns toward you, and go up with the thurifer. Hand him the spoon with the kisses, saying *Benedícite, Pater reverénde*.',
            'Take the spoon back with the kisses, give the boat to the thurifer, take the thurible, and hand it to the priest: chain in his left hand, censer in his right.'
          ],
          auth: 'manual', cite: [sm('MC §3B–4A'), ['FORT', 'p. 138'], ['CR60', 'n. 426']]
        },
        th: {
          do: [
            'When the priest goes up, come to the Epistle side with the thurible in your left hand and the boat in your right.',
            'Hand the boat to the MC as the MC comes to your left, bow, and go up together.',
            'Open the thurible only on the footpace, and hold it up so the priest\'s forearm is level.',
            'Keep it open until he has blessed the incense. Then close it, pass it to the MC, and take back the boat.'
          ],
          auth: 'manual', cite: [sm('Thurifer §1A and General Guidelines'), ['FORT', 'pp. 24, 138']]
        },
        notes: ['Since 1960 incense may be used at any sung Mass (Code n. 426).']
      },
      {
        id: 'incense-altar', part: 'catechumens', short: 'Altar incensed', title: 'The altar is incensed',
        place: places('stand', { p: 'p-epistle', mc: ['mc-accompany', 'stand'], th: ['th-accompany', 'stand'], ac1: ['ac1-holds-missal', 'stand', null, 'holds the missal'] }),
        missal: null,
        routes: [
          { who: 'th', via: ['th-up-center', 'th-floor', { x: 300, y: 128 }, { x: 196, y: 118 }, 'th-accompany'] },
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 96 }, 'ac1-holds-missal'] }
        ],
        mc: {
          do: ['Help the priest genuflect, and stay at his right as he incenses the cross and the altar, genuflecting with him in the middle.'],
          auth: 'manual', cite: [sm('MC §4B'), ['FORT', 'p. 138']]
        },
        th: {
          do: [
            'Come down turning by your right, put the boat down, go the long way round the altar, and come up to help the priest genuflect.',
            'Move with him while he incenses the altar, the Epistle side first, then the Gospel side.'
          ],
          auth: 'local', cite: [sm('Thurifer §1B'), ['FORT', 'p. 138']]
        },
        ac1: {
          do: [
            'When the thurifer has come down the side steps, take the missal off the altar so the priest can incense that end.',
            'Put it back as soon as the Epistle side has been incensed, then go back to your place.'
          ],
          notes: ['Fortescue: the MC moves the missal, or the first acolyte when the MC and thurifer go round with the priest.'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §2'), ['FORT', 'p. 138']]
        }
      },
      {
        id: 'incense-priest', part: 'catechumens', short: 'Priest incensed', title: 'The priest is incensed',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], mc: ['mc-incense', 'stand', null, 'incenses the priest'], th: ['th-incense', 'stand'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'mc', via: ['mc-accompany', { x: 372, y: 96 }, 'mc-incense'] },
          { who: 'th', via: ['th-accompany', { x: 300, y: 104 }, 'th-incense'] }
        ],
        mc: {
          do: [
            'When the altar has been incensed, go with the priest to the Epistle corner and take the thurible from him with the kisses.',
            'Go down to the floor with the thurifer at your left. Bow low, incense the priest with three double swings, and bow again.',
            'Give the thurible to the thurifer.'
          ],
          auth: 'rubric', cite: [sm('MC §4B–C'), ['MR62', 'Rit. serv. IV.8'], ['FORT', 'p. 138']]
        },
        th: {
          do: [
            'After the Gospel side has been incensed, go down the front steps and meet the MC at the foot of the side steps; stand at the MC\'s left.',
            'Take the thurible from the MC and take it, with the boat, back to its stand. Come straight back to your place.'
          ],
          auth: 'local', cite: [sm('Thurifer §1B–C'), ['FORT', 'p. 138']]
        }
      },
      {
        id: 'introit', part: 'catechumens', short: 'Introit, Kyrie', title: 'Introit and Kyrie',
        place: places('stand', { p: 'p-epistle', mc: ['mc-missal', 'stand'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Go up the side steps and point out the Introit. Sign yourself with the priest at its beginning, and bow with him at *Glória Patri*.',
            'Answer the Kyrie with him, alternating as at Low Mass.'
          ],
          sayFrom: ['kyrie'],
          auth: 'manual', cite: [sm('MC §4C–5'), ['FORT', 'p. 138']]
        }
      },
      {
        id: 'gloria', part: 'catechumens', short: 'Gloria', title: 'The Gloria, at the sedilia',
        place: places('sit', { p: 'p-sedilia-first', mc: ['mc-sedilia', 'stand', 'people'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Bow and sign yourself with the priest while he says the Gloria at the altar.',
            'Signal the genuflection and go with him to the sedilia. Stand in front of it facing the people: you never sit.',
            'Nod to him, then bow toward the altar, at *Dómine Fili unigénite, Iesu Christe*, at *qui tollis peccáta mundi, súscipe deprecatiónem nostram*, and at *tu solus Altíssimus, Iesu Christe*.',
            'Signal him to stand at *Cum Sancto Spíritu*, go back to the altar with him, and signal the genuflection.'
          ],
          auth: 'manual', cite: [sm('MC §6'), ['FORT', 'p. 139']]
        },
        ac1: { do: ['Sit when the priest sits and stand when he stands, hands flat on your thighs while sitting.'], auth: 'local', cite: [sm('Acolytes and Crucifer, General Guidelines'), ['FORT', 'p. 97']] },
        ac2: { do: ['Sit when the priest sits and stand when he stands, hands flat on your thighs while sitting.'], auth: 'local', cite: [sm('Acolytes and Crucifer, General Guidelines'), ['FORT', 'p. 97']] },
        cr: { do: ['Sit when the priest sits and stand when he stands, hands flat on your thighs while sitting.'], auth: 'local', cite: [sm('Acolytes and Crucifer, General Guidelines')] },
        tb: { do: ['Sit and stand with the acolytes and crucifer.'], auth: 'local', cite: [sm('Torchbearers, General Guidelines')] }
      },
      {
        id: 'collect', part: 'catechumens', short: 'Collect, Epistle', title: 'The collect and the Epistle',
        place: places('stand', { p: 'p-epistle', mc: ['mc-missal', 'stand'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Go round to the missal and point out the collect(s). Bow toward the tabernacle with the priest at *Orémus*.',
            'If the priest sings the Epistle, answer *Deo grátias* at the end. If a cantor sings it, go with the priest to the sedilia.',
            'When the schola begins the last four and a half lines of the Alleluia or Tract, signal the priest to stand.'
          ],
          notes: ['The Epistle may be sung by a lector or a server (Code n. 514; Rit. serv. VI.8).'],
          auth: 'manual', cite: [sm('MC §6–7'), ['CR60', 'n. 514']]
        },
        th: { do: ['When the priest rises after the Gradual and Alleluia (or Tract), fetch the thurible and boat and come to the Epistle side.'], auth: 'local', cite: [sm('Thurifer §2A'), ['FORT', 'p. 139']] }
      },

      // ---------------------------------------------------------- the Gospel
      {
        id: 'impose-gospel', part: 'catechumens', short: 'Incense for Gospel', title: 'Incense is put in for the Gospel',
        place: places('stand', { p: ['p-center', null, 'epistle'], mc: ['mc-up-center', 'stand'], th: ['th-up-center', 'stand'], ac1: ['ac1-cred', 'stand', null, 'takes a candle'], ac2: ['ac2-cred', 'stand', null, 'takes a candle'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Go up with the priest, signal the genuflection, and help him with his alb.',
            'Take the boat from the thurifer at the Epistle side and assist as at the Introit while incense is put in.',
            'Give the boat back, pick up the missal on its stand, and come down the short way to the middle, in front of the thurifer and acolytes.'
          ],
          auth: 'local', cite: [sm('MC §8A'), ['FORT', 'p. 139']]
        },
        th: {
          do: [
            'Hand the boat to the MC, go up, and hold the thurible while incense is put in and blessed.',
            'Take back the boat. Holding the thurible in your right hand now, come down with the MC and put the boat on the credence.'
          ],
          auth: 'local', cite: [sm('Thurifer §2A'), ['FORT', 'p. 139']]
        },
        ac1: { do: ['When the priest puts incense in the thurible, take your candle.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 139']] },
        ac2: { do: ['When the priest puts incense in the thurible, take your candle.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 139']] }
      },
      {
        id: 'before-gospel', part: 'catechumens', short: 'Line up', title: 'Line up for the Gospel',
        place: places('stand', { p: 'p-center', mc: ['mc-mid-c', 'stand', null, 'holds the missal'], th: ['th-mid-c', 'stand'], ac1: ['ac1-mid', 'stand'], ac2: ['ac2-mid', 'stand'] }),
        missal: null,
        routes: [
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 150 }, 'ac1-mid'] },
          { who: 'ac2', via: ['ac2-cred', { x: 300, y: 180 }, 'ac2-mid'] },
          { who: 'th', via: ['th-up-center', 'mc-corner-s', { x: 372, y: 170 }, 'th-mid-c'] },
          { who: 'mc', via: ['mc-up-center', 'mc-mid-c'] }
        ],
        mc: { do: ['When all are in line, signal the genuflection by tapping your foot against the step.'], auth: 'local', cite: [sm('MC §8A')] },
        th: { do: ['Stand behind the MC, between the acolytes. Do not swing the thurible.', 'Genuflect with all at the MC\'s signal.'], auth: 'manual', cite: [sm('Thurifer §2C'), ['FORT', 'p. 139']] },
        ac1: { do: ['Line up just right of the middle, leaving room for the thurifer between you and the second acolyte and for the MC in front.', 'Genuflect with all at the MC\'s signal.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 139']] },
        ac2: { do: ['Lead the acolytes to the middle and line up just left of it, leaving room for the thurifer between you and the first acolyte and for the MC in front.', 'Genuflect with all at the MC\'s signal.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 139']] }
      },
      {
        id: 'gospel', part: 'catechumens', short: 'Gospel', title: 'The Gospel',
        place: places('stand', { p: 'p-gospel', mc: ['mc-gospel-c', 'stand'], th: ['th-gospel-c', 'stand', 'epistle'], ac1: ['ac1-gospel-c', 'stand', 'epistle'], ac2: ['ac2-gospel-c', 'stand', 'epistle'] }),
        missal: 'm-gospel',
        routes: [
          { who: 'ac2', via: ['ac2-mid', { x: 120, y: 150 }, { x: 78, y: 130 }, 'ac2-gospel-c'] },
          { who: 'th', via: ['th-mid-c', { x: 110, y: 162 }, { x: 74, y: 130 }, 'th-gospel-c'] },
          { who: 'ac1', via: ['ac1-mid', { x: 100, y: 176 }, { x: 70, y: 140 }, 'ac1-gospel-c'] },
          { who: 'mc', via: ['mc-mid-c', 's-center-floor', 's-missal-gospel', 'mc-gospel-c'], carrying: 'missal' }
        ],
        mc: {
          do: [
            'After the genuflection go up as at Low Mass and set the missal at the Gospel side, angled toward the middle.',
            'Stand at the corner of the footpace by the book.',
            'Sign yourself at *Sequéntia sancti Evangélii*. Take the thurible from the thurifer in your right hand and hand it to the priest with the kisses.',
            'Bow while he incenses the book. Take the thurible back with the kisses, bow at the Holy Name, and return it to the thurifer.',
            'Answer *Laus tibi, Christe* at the end, then move the missal to its Canon place, angled just left of the tabernacle.',
            'Go down, meet the priest in the middle at his left, signal the genuflection, and go back to your place facing the people.'
          ],
          notes: ['Since 1960 the priest is not incensed after the Gospel at a sung Mass (Rit. serv. VI.8). Fortescue (1920) still has the MC incense him here.'],
          auth: 'rubric', cite: [sm('MC §8B–C'), ['MR62', 'Rit. serv. VI.8'], ['FORT', 'pp. 139–140']]
        },
        th: {
          do: [
            'Follow the second acolyte round to the Gospel side and stand between the acolytes, facing across.',
            'When the MC has made the sign of the cross, give the MC the thurible with your right hand.',
            'Take it back after the MC bows for the Holy Name. Do not swing it during the Gospel.',
            'Afterwards follow the first acolyte to the middle, genuflect at the MC\'s signal, and take the thurible out. If there is a sermon, put it away and go to your place.',
            'After the first words of the Creed, light a fresh coal for the rest of Mass.'
          ],
          auth: 'local', cite: [sm('Thurifer §2C–D'), ['FORT', 'pp. 139–140']]
        },
        ac1: {
          do: [
            'Follow the thurifer round to the Gospel side and stand on the floor at the end of the line, facing across, behind the missal.',
            'Hold your candle on your outside shoulder. Do not genuflect during the Gospel while holding it.',
            'Afterwards lead the thurifer and the second acolyte back to where you lined up, genuflect with the MC, put your candle back, and go to your place.'
          ],
          auth: 'rubric', cite: [sm('Acolytes and Crucifer §3A–B'), ['CR60', 'n. 519'], ['FORT', 'p. 139']]
        },
        ac2: {
          do: [
            'Lead the thurifer and the first acolyte round to the Gospel side. Stand on the floor at the bottom side step, in line with the altar, nearest the altar, facing across.',
            'Hold your candle on your outside shoulder. Do not genuflect during the Gospel while holding it.',
            'Afterwards follow the first acolyte back to the middle, genuflect with the MC, put your candle back, and go to your place.'
          ],
          auth: 'rubric', cite: [sm('Acolytes and Crucifer §3A–B'), ['CR60', 'n. 519'], ['FORT', 'p. 139']]
        },
        cr: { do: ['Stand at your place for the Gospel, turned toward it.'], auth: 'manual', cite: [['FORT', 'pp. 84, 86']] },
        tb: { do: ['When the Gospel group has genuflected, turn and face it. At the end of the Gospel turn back.'], auth: 'local', cite: [sm('Torchbearers, Gospel')] }
      },
      {
        id: 'sermon', opt: 'sermon', part: 'catechumens', short: 'Sermon', title: 'The sermon',
        place: places('sit', { p: null, mc: ['mc-sedilia', 'stand', 'people'] }),
        missal: 'm-canon',
        mc: {
          do: [
            'Stand in front of the sedilia facing the people. At the Holy Name bow straight ahead, not toward the tabernacle.',
            'When the sermon ends, meet the priest in the middle and help him with his alb as he goes up.'
          ],
          auth: 'local', cite: [sm('MC §8D–E')]
        },
        ac1: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        ac2: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        cr: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        tb: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 140']] }
      },
      {
        id: 'creed', opt: 'creed', part: 'catechumens', short: 'Creed', title: 'The Creed',
        place: places('kneel', { p: 'p-sedilia-first', mc: ['mc-sedilia', 'kneel', 'people'] }),
        missal: 'm-canon',
        mc: {
          do: [
            'Bow, genuflect and sign yourself with the priest as he says the Creed.',
            'While it is sung, stay by him at the sedilia. At the sung *Et incarnátus est* signal and kneel; signal him to stand at *Et vitam ventúri sǽculi*.',
            'Go back to the altar with him, signal the genuflection, and go to your place.'
          ],
          notes: ['Practice differs at the sung *Et incarnátus est*. FSSP Omaha has the priest come down and kneel. Fortescue has him sit and bow while all the servers kneel. The Code allows both: if he is not seated he genuflects, if seated he bows (n. 518).'],
          auth: 'local', cite: [sm('MC §9'), ['CR60', 'n. 518'], ['FORT', 'p. 140']]
        },
        ac1: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        ac2: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        cr: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        tb: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 140']] },
        th: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 140']] }
      },

      // ---------------------------------------------------------- Offertory
      {
        id: 'cruets', part: 'offertory', short: 'Cruets', title: 'The cruets',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], mc: ['mc-epistle-floor', 'stand'], ac1: ['ac1-up', 'stand', null, 'wine'], ac2: ['ac2-up', 'stand', null, 'water'] }),
        missal: 'm-canon',
        routes: [
          { who: 'ac1', via: ['ac1-cred', 'ac1-floor', 'ac1-up'] },
          { who: 'ac2', via: ['ac2-cred', 'ac2-floor', 'ac2-up'] }
        ],
        mc: { do: ['After the priest sings *Orémus*, go up and fold the chalice veil in three. Lay it next to the Lavabo altar card and go back to your place.'], auth: 'local', cite: [sm('MC §10A')] },
        th: { do: ['When the acolytes bring the cruets to the priest, fetch the thurible and boat and wait ready.'], auth: 'local', cite: [sm('Thurifer §3A')] },
        ac1: {
          do: [
            'When the MC has folded the chalice veil, take the wine cruet and stand on the floor at the Epistle side, at the second acolyte\'s right.',
            'When the priest is ready, bow, go up, and hand him the cruet in your right hand with the kisses.',
            'Take it back in your right hand, bow, kiss the cruet, put it back on the credence, and go to your place.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 140'], ['MR62', 'Rit. serv. VII.4']]
        },
        ac2: {
          do: [
            'When the MC has folded the chalice veil, take the water cruet and stand on the floor at the Epistle side, at the first acolyte\'s left.',
            'When the priest is ready, bow, go up, and hand him the cruet in your right hand with the kisses.',
            'Take it back in your right hand, bow, kiss the cruet, put it back on the credence, and go to your place.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §3A'), ['FORT', 'p. 140']]
        }
      },
      {
        id: 'incense-offertory', part: 'offertory', short: 'Offerings incensed', title: 'The offerings and the altar are incensed',
        place: places('stand', { p: 'p-center', mc: ['mc-up-center', 'stand'], th: ['th-up-left', 'stand'], ac1: ['ac1-holds-missal-g', 'stand', null, 'holds the missal'] }),
        missal: null,
        routes: [{ who: 'ac1', via: ['ac1-cred', { x: 384, y: 120 }, { x: 230, y: 150 }, { x: 96, y: 128 }, 'ac1-holds-missal-g'] }],
        mc: {
          do: [
            'When the acolytes have gone back and the priest has offered the chalice, take the boat from the thurifer at the Epistle side and assist as at the Introit while incense is put in and blessed.',
            'Stay at the priest\'s right while he incenses the offerings and the altar, genuflecting with him.'
          ],
          auth: 'manual', cite: [sm('MC §10B'), ['FORT', 'pp. 140–141']]
        },
        th: {
          do: [
            'When the acolytes have put the cruets back, come to the Epistle side. Hand the boat to the MC, go up, and hold the thurible while incense is put in and blessed.',
            'Close it, pass it to the MC, take back the boat, come down turning by your right, and leave the boat on the credence.',
            'Go round as at the Introit and help with the genuflections while the altar is incensed.'
          ],
          auth: 'local', cite: [sm('Thurifer §3A–B')]
        },
        ac1: {
          do: [
            'Go the long way round to the Gospel side and take the missal off the altar before that end is incensed.',
            'Put it back when the Gospel side has been incensed, then go the long way round to the credence.'
          ],
          notes: ['Fortescue has the thurifer move the missal here, or the first acolyte when the MC and thurifer go round with the priest.'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §3B–C'), ['FORT', 'pp. 140–141']]
        }
      },
      {
        id: 'incense-priest-off', part: 'offertory', short: 'Priest incensed', title: 'The priest is incensed',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], mc: ['mc-incense', 'stand', null, 'incenses the priest'], th: ['th-incense', 'stand'], ac1: ['ac1-wait-h', 'stand', null, 'towel'], ac2: ['ac2-wait-h', 'stand', null, 'water and dish'] }),
        missal: 'm-canon',
        mc: {
          do: [
            'When the altar has been incensed, take the thurible with the kisses, go down to the floor with the thurifer at your left, and incense the priest with three double swings, bowing before and after.',
            'Give the thurible to the thurifer, lead the thurifer to the middle, genuflect, and go the long way round to your Canon place by the missal.',
            'There turn and let the thurifer incense you, bowing before and after.'
          ],
          auth: 'rubric', cite: [sm('MC §10C'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 141']]
        },
        th: {
          do: [
            'After the last genuflection in the middle, come down the front steps on the Epistle side and stand at the MC\'s left. Bow low with the MC while the priest is incensed.',
            'Take the thurible from the MC, follow the MC to the middle, and genuflect.'
          ],
          auth: 'local', cite: [sm('Thurifer §3B')]
        },
        ac1: { do: ['Take the towel and wait on the floor at the Epistle side, leaving room for the MC and thurifer to incense the priest.'], auth: 'local', cite: [sm('Acolytes and Crucifer §3C')] },
        ac2: { do: ['Take the water cruet and the dish and wait on the floor at the Epistle side, leaving room for the MC and thurifer to incense the priest.'], auth: 'local', cite: [sm('Acolytes and Crucifer §3C')] }
      },
      {
        id: 'lavabo', part: 'offertory', short: 'Lavabo', title: 'The Lavabo',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], mc: ['mc-canon', 'stand'], th: ['th-incense-mc', 'stand', null, 'incenses the MC'], ac1: ['ac1-up', 'stand', null, 'towel'], ac2: ['ac2-up', 'stand', null, 'water and dish'] }),
        missal: 'm-canon',
        mc: {
          do: ['Answer the *Suscípiat* when the priest says *Oráte, fratres*, and point out the Secret.', 'Turn the pages to the Preface when the Secret is finished.'],
          sayFrom: ['suscipiat'],
          auth: 'manual', cite: [sm('MC §10C–D'), ['FORT', 'p. 141']]
        },
        th: { do: ['Incense the MC at the MC\'s place by the missal with one double swing, bowing before and after.'], auth: 'manual', cite: [sm('Thurifer §3B'), ['FORT', 'p. 141']] },
        ac1: { do: ['When the MC and thurifer have gone, go to the step with the second acolyte, bow, and go up: hand the priest the towel and take it back.', 'Bow, put it back on the credence, and go to your place.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3C'), ['FORT', 'p. 141']] },
        ac2: { do: ['Go up with the first acolyte, bow, and pour a little water over the priest\'s fingers into the dish.', 'Bow, put them back on the credence, and go to your place.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3C'), ['FORT', 'p. 141']] }
      },
      {
        id: 'incense-people', part: 'offertory', short: 'People incensed', title: 'The servers and people are incensed',
        place: places('stand', { p: 'p-center', mc: ['mc-canon', 'stand'], th: ['th-nave', 'stand', 'people', 'incenses the people'] }),
        missal: 'm-canon',
        th: {
          do: [
            'Incense the acolytes and crucifer together (one double swing to the middle, one to the left, one to the right), then the torchbearers the same way.',
            'Genuflect before leaving the sanctuary, turn by your right, and incense the people: one double swing down the middle, one left, one right.',
            'Genuflect whenever you pass the middle, and bow before and after each incensing.',
            'Then stand in the middle of the sanctuary facing the altar until the priest sings *Per ómnia sǽcula sæculórum* before the Preface.'
          ],
          auth: 'rubric', cite: [sm('Thurifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 141']]
        },
        ac1: { do: ['When the thurifer comes to incense you, bow before and after.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3C'), ['FORT', 'p. 141']] },
        ac2: { do: ['When the thurifer comes to incense you, bow before and after.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §3C'), ['FORT', 'p. 141']] },
        cr: { do: ['When the thurifer comes to incense you, bow before and after.', 'Then go and light the torchbearers\' torches.'], auth: 'local', cite: [sm('Acolytes and Crucifer §3C')] },
        tb: { do: ['The thurifer incenses you as a group: bow before and after.'], auth: 'local', cite: [sm('Torchbearers, Offertory')] }
      },
      {
        id: 'preface', part: 'offertory', short: 'Torches out', title: 'At the Preface, out for the torches',
        place: places('stand', { p: 'p-center', mc: ['mc-canon', 'stand'], th: ['th-mid-lead', 'stand'], tb1: ['tb1-front', 'stand'], tb2: ['tb2-front', 'stand'], tb3: ['tb3-front', 'stand'], tb4: ['tb4-front', 'stand'] }),
        missal: 'm-canon',
        routes: [
          { who: 'th', via: ['th-mid-lead', { x: 330, y: 196 }, 's-sacristy'] },
          { who: 'tb1', via: ['tb1-bench', { x: 120, y: 176 }, 'tb1-front'] }, { who: 'tb2', via: ['tb2-bench', { x: 120, y: 180 }, 'tb2-front'] },
          { who: 'tb3', via: ['tb3-bench', { x: 120, y: 190 }, 'tb3-front'] }, { who: 'tb4', via: ['tb4-bench', { x: 140, y: 196 }, 'tb4-front'] }
        ],
        th: { do: ['When the priest sings *Per ómnia sǽcula sæculórum*, go to the right side of the torchbearers, signal them, and lead them in procession to the sacristy.'], auth: 'manual', cite: [sm('Thurifer §3B'), ['FORT', 'p. 141']] },
        tb: { do: ['When the priest sings *Per ómnia sǽcula sæculórum* before the Preface, line up in the middle and follow the thurifer out to the sacristy for your torches.'], auth: 'manual', cite: [sm('Torchbearers, Offertory'), ['FORT', 'p. 98']] }
      },

      // ---------------------------------------------------------- Sanctus and Canon
      {
        id: 'sanctus', part: 'canon', short: 'Sanctus', title: 'The Sanctus: the torches come in',
        place: places('stand', { p: 'p-center', mc: ['mc-canon', 'stand'], ac1: ['ac1-cred', 'stand', null, 'rings'] }, true),
        missal: 'm-canon',
        routes: [
          { who: 'tb1', via: ['s-sacristy', { x: 330, y: 186 }, { x: 146, y: 186 }, 'tb1-line'] }, { who: 'tb2', via: ['s-sacristy', { x: 330, y: 182 }, { x: 188, y: 182 }, 'tb2-line'] },
          { who: 'tb3', via: ['s-sacristy', { x: 330, y: 178 }, { x: 272, y: 178 }, 'tb3-line'] }, { who: 'tb4', via: ['s-sacristy', { x: 330, y: 174 }, 'tb4-line'] },
          { who: 'th', via: ['s-sacristy', { x: 372, y: 186 }, 'th-seat'] }
        ],
        mc: { do: ['After the *Sanctus*, turn the missal to the Canon.'], auth: 'local', cite: [sm('MC §11A')] },
        th: { do: ['When the *Sanctus* begins, lead the torchbearers back in to their places, then go to your place.'], auth: 'manual', cite: [sm('Thurifer §3B'), ['FORT', 'p. 141']] },
        ac1: {
          do: ['Ring the bell three times at the *Sanctus*, at each *Sanctus* if you can.'],
          bell: { rings: '3', auth: 'local', note: 'Fortescue: at High Mass the bell is not needed and is not rung at Rome; where it is the custom, only at the *Sanctus* and the elevations (pp. 104–105, 142). FSSP Omaha also rings at the *Hanc igitur* and the *Domine, non sum dignus*.', cite: [sm('Acolytes and Crucifer §4A'), ['FORT', 'pp. 104–105, 142']] },
          auth: 'local', cite: [sm('Acolytes and Crucifer §4A'), ['FORT', 'p. 142']]
        },
        tb: {
          do: [
            'At the *Sanctus* come back in pairs by the Epistle side, led by the thurifer. Genuflect, turn in toward each other, walk to the first step and fan out.',
            'Kneel in your place in the line when the thurifer signals. Hold the torch with two hands while standing or walking, one hand while kneeling.'
          ],
          auth: 'rubric', cite: [sm('Torchbearers, Offertory and General Guidelines'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'p. 141']]
        }
      },
      {
        id: 'hanc-igitur', part: 'canon', short: 'Incense for elevation', title: 'Incense for the elevation',
        place: places('stand', { p: 'p-center', mc: ['mc-canon', 'stand'], th: ['th-at-cr', 'stand', null, 'holds the thurible'], cr: ['cr-bench', 'stand', null, 'puts in incense'], ac1: ['ac1-cred', 'stand', null, 'rings once'] }, true),
        missal: 'm-canon',
        routes: [{ who: 'th', via: ['th-seat', { x: 330, y: 186 }, { x: 80, y: 150 }, 'th-at-cr'] }],
        mc: { do: ['At the *Hanc ígitur* make sure the thurifer is bringing the incense.', 'At *Qui prídie* signal all to kneel, and kneel on the footpace at the priest\'s left.'], auth: 'local', cite: [sm('MC §11D–E')] },
        th: {
          do: [
            'After the *Memento* of the living, fetch the thurible and boat.',
            'Hand the boat to the crucifer and hold the thurible open while three spoonfuls of incense are put in (no blessing).',
            'Go to the Epistle side, put the boat on the credence, and stand on the floor at the step, facing the Gospel side.'
          ],
          notes: ['Who puts the incense in varies. FSSP Omaha: the crucifer, at the *Hanc ígitur*. Fortescue: the thurifer or the second acolyte, at *Qui prídie* (p. 142). The rubric only says it goes in without a blessing (Rit. serv. VIII.8).'],
          auth: 'local', cite: [sm('Thurifer §4A'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'p. 142']]
        },
        cr: {
          do: ['At the *Hanc ígitur* the thurifer brings you the boat: put three spoonfuls of incense in the thurible. No blessing is given.'],
          notes: ['This is FSSP Omaha\'s practice. Fortescue gives it to the thurifer or the second acolyte, at *Qui prídie*.'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §4C'), ['FORT', 'p. 142']]
        },
        ac1: {
          do: ['Ring once at the *Hanc ígitur*, when the priest spreads his hands over the chalice.'],
          bell: { rings: '1', auth: 'local', note: 'FSSP Omaha\'s custom at sung Mass. Fortescue: at High Mass the bell, where customary, rings only at the *Sanctus* and the elevations.', cite: [sm('Acolytes and Crucifer §4B'), ['FORT', 'pp. 104–105']] },
          auth: 'local', cite: [sm('Acolytes and Crucifer §4B')]
        }
      },
      {
        id: 'consecration', part: 'canon', short: 'Consecration', title: 'The Consecration',
        place: places('kneel', { p: 'p-center', mc: ['mc-elev-c', 'kneel', null, 'lifts the chasuble'], th: ['th-elev', 'kneel', 'gospel', 'incenses'], ac1: ['ac1-cred', 'kneel', null, 'rings'] }, true),
        missal: 'm-canon',
        mc: {
          do: [
            'Bow your head at each consecration, then lift the back of the chasuble with both hands at each elevation.',
            'After the priest\'s last genuflection after the elevation of the chalice, signal all to stand. Genuflect, and turn the page.'
          ],
          auth: 'manual', cite: [sm('MC §11E–G'), ['FORT', 'p. 142']]
        },
        th: {
          do: [
            'Kneel on the first step when the MC kneels.',
            'Incense the Host with three double swings as it is raised, and the chalice the same way, bowing before and after.',
            'Stand with the MC afterwards, take the thurible and boat back to the sacristy, and go to your place.'
          ],
          auth: 'rubric', cite: [sm('Thurifer §4B–C'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'p. 142']]
        },
        ac1: {
          do: [
            'Kneel when the MC signals.',
            { t: 'Ring once at the priest\'s first genuflection, three times at the elevation, and once at the second genuflection. The same for the chalice.', if: 'bells131' },
            { t: 'Ring three times as the Host is raised, and three times as the chalice is raised.', unless: 'bells131' },
            'Rise with all after the priest\'s genuflection after the chalice.'
          ],
          bell: { rings: '1-3-1 each', auth: 'local', note: 'FSSP Omaha rings 1-3-1. Fortescue: where the bell is the custom at High Mass, three times at each elevation (p. 142).', cite: [sm('Acolytes and Crucifer §4D'), ['FORT', 'p. 142']] },
          auth: 'local', cite: [sm('Acolytes and Crucifer §4D'), ['FORT', 'p. 142']]
        },
        ac2: { do: ['Kneel at your place when the MC signals, and rise with all after the elevation of the chalice.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §4D'), ['FORT', 'p. 97']] },
        cr: { do: ['Kneel at your place when the MC signals, and rise with all after the elevation of the chalice.'], auth: 'manual', cite: [sm('Acolytes and Crucifer §4D')] },
        tb: {
          do: ['Stay kneeling in your place with the torch.', 'Stay through Communion when there are communicants. Otherwise the torches go out after the elevation of the chalice, except on fast days and at Requiems.'],
          auth: 'rubric', cite: [['MR62', 'Rit. serv. VIII.8'], sm('Torchbearers, Communion'), ['FORT', 'p. 142']]
        }
      },

      // ---------------------------------------------------------- Communion
      {
        id: 'servers-communion', part: 'communion', short: 'Servers\' Communion', title: 'The servers\' Communion',
        place: places('kneel', {
          p: ['p-center', null, 'people'],
          mc: ['mc-kneel-up-c', 'kneel'], ac1: ['ac1-kneel-up', 'kneel'], ac2: ['ac2-kneel-up', 'kneel'], cr: ['cr-kneel-up', 'kneel'], th: ['th-kneel-up-c', 'kneel']
        }, true),
        missal: 'm-canon',
        routes: [
          { who: 'mc', via: ['mc-gospel-step', { x: 140, y: 132 }, 'mc-line-c', 'mc-kneel-up-c'], genuflect: ['mc-line-c'] },
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 132 }, 'ac1-line', 'ac1-kneel-up'], genuflect: ['ac1-line'] },
          { who: 'ac2', via: ['ac2-cred', { x: 372, y: 140 }, 'ac2-line', 'ac2-kneel-up'], genuflect: ['ac2-line'] },
          { who: 'cr', via: ['cr-bench', { x: 60, y: 176 }, { x: 254, y: 176 }, 'cr-line', 'cr-kneel-up'], genuflect: ['cr-line'] },
          { who: 'th', via: ['th-seat', { x: 330, y: 160 }, 'th-line-c', 'th-kneel-up-c'], genuflect: ['th-line-c'] }
        ],
        mc: {
          do: [
            'After the *Agnus Dei* genuflect, go down the side steps on the Gospel side, signal all to kneel, and kneel on the first side step.',
            'When the priest has drunk the Precious Blood, signal all to rise, and stand at the Gospel end of the line as the servers form it: you, first acolyte, second acolyte, crucifer, thurifer.',
            'Signal the genuflection, lead them up, and signal them to kneel.',
            { t: 'Say the Confiteor together.', if: 'confiteor' },
            'After your Communion stay on the footpace and signal the others to genuflect and go back to their places.'
          ],
          notes: [{ t: 'FSSP Omaha says the servers\' Confiteor here; the 1962 rubric omits it (Code n. 503).', unless: 'confiteor' }],
          auth: 'local', cite: [sm('MC §13–14'), ['CR60', 'n. 503']]
        },
        ac1: {
          do: [
            'Ring once at each of the priest\'s *Dómine, non sum dignus*.',
            'When the priest has drunk the Precious Blood, rise and lead the servers in single file to the front of the altar.',
            'Genuflect, go up and kneel, at the MC\'s signals.',
            { t: 'Say the Confiteor with the others.', if: 'confiteor' },
            'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'
          ],
          bell: { rings: '3', auth: 'custom', note: 'Not in the Missal; a tolerated custom (Fortescue p. 80). Fortescue would not ring at High Mass at all.', cite: [sm('Acolytes and Crucifer §5'), ['FORT', 'pp. 80, 142']] },
          auth: 'local', cite: [sm('Acolytes and Crucifer §5–6')]
        },
        ac2: {
          do: ['When the priest has drunk the Precious Blood, rise and follow the first acolyte to the front of the altar.', 'Genuflect, go up and kneel, at the MC\'s signals.', { t: 'Say the Confiteor with the others.', if: 'confiteor' }, 'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §6')]
        },
        cr: {
          do: ['When the priest has drunk the Precious Blood, rise and follow the acolytes to the front of the altar.', 'Genuflect, go up and kneel, at the MC\'s signals.', { t: 'Say the Confiteor with the others.', if: 'confiteor' }, 'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §6')]
        },
        th: {
          do: ['At the MC\'s signal, take the Communion paten(s) from the credence and follow the others to the middle, at the end of the line.', 'Genuflect, go up and kneel on the footpace, at the MC\'s signals.', { t: 'Say the Confiteor with the others.', if: 'confiteor' }, 'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'],
          auth: 'local', cite: [sm('Thurifer §5')]
        }
      },
      {
        id: 'people-communion', part: 'communion', short: 'People\'s Communion', title: 'Communion of the people',
        place: places('kneel', { p: ['p-rail', null, 'people'], mc: ['mc-rail-c', 'stand', null, 'holds the paten'], tb1: ['tb1-rail', 'kneel'], tb2: ['tb2-line', 'kneel'], tb3: ['tb3-line', 'kneel'], tb4: ['tb4-rail', 'kneel'] }),
        missal: 'm-canon',
        routes: [{ who: 'tb1', via: ['tb1-line', { x: 100, y: 186 }, 'tb1-rail'] }, { who: 'tb4', via: ['tb4-line', { x: 360, y: 186 }, 'tb4-rail'] }],
        mc: { do: ['Go with the priest to give Communion to the people, holding the paten.', 'When he goes back, kneel at once at your place. When the tabernacle is locked, signal all to rise.'], auth: 'local', cite: [sm('MC §14')] },
        th: { do: ['If a second priest gives Communion, take a paten and go with him.'], auth: 'local', cite: [sm('Thurifer §5, note')] },
        tb: {
          do: [
            'If you receive Communion, hand your torch to someone to hold while you do.',
            'The two outside torchbearers then go down at once to the far ends of the altar rail on their side and kneel there until Communion is over, the torch on the side away from the altar.',
            'When the last person has received, both rise together and go back to their places, kneeling without genuflecting.'
          ],
          auth: 'local', cite: [sm('Torchbearers, Communion and General Guidelines'), ['FORT', 'p. 99']]
        }
      },
      {
        id: 'ablutions', part: 'communion', short: 'Ablutions', title: 'The ablutions',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], mc: ['mc-epistle-floor', 'stand'], ac1: ['ac1-up', 'stand', null, 'wine'], ac2: ['ac2-up', 'stand', null, 'water'] }),
        missal: 'm-canon',
        ac1: {
          do: [
            'When the priest locks the tabernacle, rise, take the cruets with the second acolyte, and wait on the floor.',
            'When he tilts the chalice, go up and pour wine until he signals. Then pick up the other paten.',
            'At the second ablution pour a little wine over his fingers; the second acolyte pours most of the water.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §7A'), ['FORT', 'p. 142']]
        },
        ac2: {
          do: [
            'When the priest locks the tabernacle, rise, take the water cruet, and wait on the floor.',
            'Take one of the patens and wait on the top step for the first acolyte.',
            'At the second ablution, after the first acolyte pours the wine, pour most of the water until the priest signals.'
          ],
          auth: 'local', cite: [sm('Acolytes and Crucifer §7A')]
        },
        th: { do: ['When the tabernacle is closed, signal the torchbearers to rise, lead them out to put the torches away, and back to their places.'], auth: 'local', cite: [sm('Torchbearers, Communion')] },
        tb: { do: ['When the tabernacle door closes, rise at the thurifer\'s signal, come to the middle two by two, genuflect, and take your torches out. Come back to your places led by the thurifer.'], auth: 'local', cite: [sm('Torchbearers, Communion')] }
      },

      // ---------------------------------------------------------- after Communion
      {
        id: 'missal-veil', part: 'end', short: 'Missal and veil', title: 'The missal and the chalice veil',
        place: places('stand', { p: 'p-center', mc: ['mc-up', 'stand'], ac1: ['s-missal-epistle', 'stand', null, 'places the missal'], ac2: ['a2-build', 'stand', null, 'helps with the chalice'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'ac1', via: ['s-missal-gospel', 's-center-floor', 's-missal-epistle'], genuflect: ['s-center-floor'], carrying: 'missal', shorten: 10 },
          { who: 'ac2', via: [{ x: 300, y: 82 }, { x: 290, y: 128 }, 's-center-floor', 'a2-build'], genuflect: ['s-center-floor'] }
        ],
        mc: {
          do: ['When the first acolyte crosses the middle with the missal, follow (after the genuflection) to the Epistle side.', 'Open it at the Communion antiphon and point it out to the priest.'],
          notes: ['FSSP Omaha\'s MC sheet says the second acolyte carries the missal here; its acolytes\' sheet and Fortescue give it to the first acolyte.'],
          auth: 'local', cite: [sm('MC §15A'), sm('Acolytes and Crucifer §7B'), ['FORT', 'p. 142']]
        },
        ac1: {
          do: [
            'Put the paten and cruets back. Follow the second acolyte to the middle and genuflect together.',
            'Cross in front of the second acolyte and go the long way round to the Gospel side for the missal.',
            'Come back the short way, meet the second acolyte in the middle, and genuflect together.',
            'Set the missal at the Epistle side, then go back to your place.'
          ],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §7B'), ['FORT', 'p. 142']]
        },
        ac2: {
          do: [
            'Lead the first acolyte to the middle and genuflect together.',
            'Go behind the first acolyte to the Epistle side for the chalice veil; come back the short way and genuflect together in the middle.',
            'Take the veil to the Gospel side and help the priest with the burse and veil. When the chalice is built, go back to your place.'
          ],
          notes: ['Fortescue calls carrying the veil across "quite unnecessary really" (p. 142 n. 1).'],
          auth: 'local', cite: [sm('Acolytes and Crucifer §7B'), ['FORT', 'p. 142']]
        }
      },
      {
        id: 'blessing', part: 'end', short: 'Blessing', title: 'Postcommunion and blessing',
        place: places('kneel', { p: ['p-center', null, 'people'], mc: ['mc-missal', 'kneel'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'After the *Dóminus vobíscum*, bow toward the tabernacle with the priest at *Orémus*, and point out the Postcommunion.',
            'Close the book when the last Postcommunion, with its conclusion, is finished.',
            'After the priest sings *Ite, missa est*, signal all to kneel for the blessing, then to rise for the Last Gospel.'
          ],
          auth: 'manual', cite: [sm('MC §15'), ['FORT', 'p. 143']]
        },
        th: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [['FORT', 'p. 143']] },
        ac1: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [['FORT', 'p. 143']] },
        ac2: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [['FORT', 'p. 143']] },
        cr: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [['FORT', 'p. 143']] },
        tb: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [['FORT', 'p. 143']] }
      },
      {
        id: 'last-gospel', part: 'end', short: 'Last Gospel', title: 'The Last Gospel: line up to leave',
        place: places('stand', {
          p: 'p-gospel', mc: ['s-gospel-book', 'stand', null, 'faces the priest'],
          tb1: ['tb1-front', 'stand'], tb2: ['tb2-front', 'stand'], tb3: ['tb3-front', 'stand'], tb4: ['tb4-front', 'stand'],
          ac2: ['ac2-recess', 'stand'], cr: ['cr-mid', 'stand', null, 'holds the cross'], ac1: ['ac1-recess', 'stand'], th: ['th-recess', 'stand']
        }),
        missal: 'm-epistle',
        routes: [
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 150 }, 'ac1-recess'] }, { who: 'ac2', via: ['ac2-cred', { x: 372, y: 160 }, { x: 300, y: 196 }, 'ac2-recess'] },
          { who: 'cr', via: ['cr-bench', { x: 60, y: 176 }, 'cr-mid'] }, { who: 'th', via: ['th-seat', { x: 330, y: 204 }, 'th-recess'] },
          { who: 'tb1', via: ['tb1-bench', { x: 100, y: 150 }, 'tb1-front'] }, { who: 'tb2', via: ['tb2-bench', { x: 100, y: 166 }, 'tb2-front'] },
          { who: 'tb3', via: ['tb3-bench', { x: 120, y: 182 }, 'tb3-front'] }, { who: 'tb4', via: ['tb4-bench', { x: 150, y: 196 }, 'tb4-front'] }
        ],
        mc: {
          do: ['Face the priest, and genuflect with him at *Et Verbum caro factum est*. Make sure the servers move into place after signing themselves.', 'When the Last Gospel ends, fetch the biretta from the sedilia.'],
          auth: 'manual', cite: [sm('MC §16'), ['FORT', 'p. 143']]
        },
        th: { do: ['After signing yourself at the start of the Last Gospel, go to your place behind the acolytes, facing the altar.', 'Genuflect at *Et Verbum caro factum est*, and again at the MC\'s signal.'], auth: 'manual', cite: [sm('Thurifer §6A'), ['FORT', 'p. 143']] },
        ac1: {
          do: ['After signing yourself at the start of the Last Gospel, take your candle and go to the middle, at the crucifer\'s right.', 'Walking with the cross, you do not genuflect: at *Et Verbum caro factum est* and at the MC\'s last signal make a simple bow of the head.'],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 143']]
        },
        ac2: {
          do: ['After signing yourself at the start of the Last Gospel, take your candle and go to the middle, at the crucifer\'s left.', 'Walking with the cross, you do not genuflect: at *Et Verbum caro factum est* and at the MC\'s last signal make a simple bow of the head.'],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 143']]
        },
        cr: {
          do: ['After signing yourself at the start of the Last Gospel, take the cross and stand in the middle between the acolytes.', 'You never genuflect while carrying the cross: stand still when the others genuflect.'],
          auth: 'manual', cite: [sm('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 86']]
        },
        tb: { do: ['After signing yourselves, go to the middle and line up in front of the acolytes.', 'Genuflect at *Et Verbum caro factum est*, and again at the MC\'s signal.'], auth: 'local', cite: [sm('Torchbearers, Recession')] }
      },
      {
        id: 'recession', part: 'end', short: 'Recession', title: 'Back to the sacristy',
        place: places('stand', {
          p: 'p-foot', mc: ['mc-foot-left-out', 'stand'],
          tb1: ['tb1-front', 'stand'], tb2: ['tb2-front', 'stand'], tb3: ['tb3-front', 'stand'], tb4: ['tb4-front', 'stand'],
          ac2: ['ac2-recess', 'stand'], cr: ['cr-mid', 'stand'], ac1: ['ac1-recess', 'stand'], th: ['th-recess', 'stand', 'people', 'leads out']
        }),
        missal: 'm-epistle',
        routes: [{ who: 'th', via: ['th-recess', { x: 330, y: 204 }, 's-sacristy'], shorten: 0 }],
        mc: {
          do: ['Signal all to genuflect, and hand the biretta to the priest with the kisses.', 'Lead the priest out. In the sacristy bow to the cross, signal all to bow, and kneel for the blessing.', 'Lead the servers\' thanksgiving, point out any mistakes kindly, and see to the clearing up.'],
          auth: 'manual', cite: [sm('MC §16C–17'), ['FORT', 'p. 143']]
        },
        th: { do: ['Turn round and lead the procession out.', 'In the sacristy bow to the cross and kneel for the blessing. Then put the thurible away, refill the boat, and clear up after the coals.'], auth: 'local', cite: [sm('Thurifer §6')] },
        ac1: { do: ['Turn in toward the crucifer and walk out behind the thurifer.', 'In the sacristy stand beside the crucifer for the blessing.', 'Then clear the altar, put its cover back on, and put out the candles.'], auth: 'local', cite: [sm('Acolytes and Crucifer §8–9')] },
        ac2: { do: ['Turn in toward the crucifer and walk out behind the thurifer.', 'In the sacristy stand beside the crucifer for the blessing.', 'Then clear the credence and wash the cruets and the Lavabo dish.'], auth: 'local', cite: [sm('Acolytes and Crucifer §8–9')] },
        cr: { do: ['Walk out between the acolytes, behind the thurifer.', 'In the sacristy stand for the blessing, then put the cross back in its place.'], auth: 'local', cite: [sm('Acolytes and Crucifer §9')] },
        tb: { do: ['Follow the acolytes out.', 'In the sacristy line up facing the cross, bow, and kneel for the blessing.'], auth: 'local', cite: [sm('Torchbearers, Recession')] }
      }
    ]
  });
})();
