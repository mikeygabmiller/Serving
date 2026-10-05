/* Solemn High Mass: priest, deacon and subdeacon, with master of ceremonies,
   thurifer, two acolytes, crucifer and torchbearers. Built from FSSP Omaha's
   Solemn Mass role sheets and Fortescue (1920) ch. XI, corrected by the 1962
   rubrics (Rit. serv. VI.4: the priest sits and listens to the Epistle).
   Research: research/positions.md, "Solemn High Mass".

   The deacon and subdeacon are clergy: the plan shows them, but no sheet is
   made for them. Where a source does not say where they stand at a moment,
   they are left off that drawing rather than guessed.

   place:  where everyone is at the end of the step. Servers not named are
           at their usual place (see HOME below).
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

  function places(posture, over, torches) {
    var o = {}, k;
    for (k in HOME) o[k] = typeof HOME[k] === 'string' ? HOME[k] : [HOME[k][0], posture || HOME[k][1]];
    if (torches) for (k in TORCHES) o[k] = TORCHES[k].slice();
    for (k in over) o[k] = over[k];
    return o;
  }
  function ss(where) { return ['FSSPOM', 'Solemn Mass, ' + where]; }

  // The MC's part at the Pater noster is the same whoever takes the veil.
  var MC_PATER = {
    do: [
      'At *et dimítte nobis* bow to the subdeacon and deacon as their sign to go up to the Epistle side, and make sure the humeral veil is taken from the subdeacon.',
      'At *Pax Dómini* bow to the subdeacon, genuflect, go down the Gospel side, genuflect as you cross the middle, and go to your place.',
      'When the deacon has come down and given the kiss of peace to the subdeacon, signal all to kneel.'
    ],
    notes: ['Fortescue: when the subdeacon has given the pax to the choir, the MC receives it from him in the middle and gives it to the thurifer, or to the first acolyte (p. 105; Rit. serv. X.8).'],
    auth: 'manual', cite: [ss('MC §12–13'), ['FORT', 'p. 105'], ['MR62', 'Rit. serv. X.8']]
  };
  var VEIL = [
    'At *et dimítte nobis* in the Pater noster, when the subdeacon has gone up, take the humeral veil from the subdeacon\'s shoulders.',
    'Fold it, put it on the credence, and go back to your place.'
  ];
  var VEIL_NOTE = ['Who takes the veil varies. FSSP Omaha\'s MC sheet gives it to the thurifer. Fortescue gives it to the first acolyte, or to the thurifer when the acolytes hold the torches (pp. 93–94, 97). The sheet maker has a switch for it.'];

  SERVING.forms = SERVING.forms || [];
  SERVING.forms.push({
    key: 'solemn', name: 'Solemn High Mass', short: 'Solemn High Mass', kind: 'high',
    roles: [
      { key: 'mc', name: 'Master of ceremonies', figures: ['mc'] },
      { key: 'th', name: 'Thurifer', figures: ['th'] },
      { key: 'ac1', name: 'First acolyte', figures: ['ac1'] },
      { key: 'ac2', name: 'Second acolyte', figures: ['ac2'] },
      { key: 'cr', name: 'Crucifer', figures: ['cr'] },
      { key: 'tb', name: 'Torchbearer', figures: ['tb1', 'tb2', 'tb3', 'tb4'] }
    ],
    options: ['bells131', 'sermon', 'creed', 'asperges', 'veilAc1'],
    intro: 'Mass with a deacon and subdeacon. The servers are the same as at a sung Mass, but much of what the MC and thurifer hand to the priest goes through the deacon. FSSP Omaha\'s Solemn Mass sheets have no servers\' Confiteor before Communion.',
    steps: [

      // ---------------------------------------------------------- arrival
      {
        id: 'arrive', part: 'before', short: 'Arrival', title: 'The procession arrives',
        place: places('stand', { p: 'p-foot', d: 'd-foot', sd: 'sd-foot', mc: ['mc-foot-right', 'stand'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'mc', via: [{ x: 300, y: 170 }, { x: 404, y: 112 }, 'mc-foot-right'] },
          { who: 'th', via: [{ x: 230, y: 150 }, { x: 330, y: 160 }, 'th-seat'], genuflect: [{ x: 230, y: 150 }] },
          { who: 'ac1', via: ['ac1-mid', { x: 372, y: 150 }, 'ac1-cred'] },
          { who: 'ac2', via: ['ac2-mid', { x: 300, y: 172 }, { x: 372, y: 150 }, 'ac2-cred'] },
          { who: 'cr', via: ['cr-mid', { x: 60, y: 160 }, 'cr-bench'] },
          { who: 'tb1', via: [{ x: 182, y: 194 }, 'tb1-bench'] }, { who: 'tb2', via: [{ x: 206, y: 194 }, { x: 60, y: 176 }, 'tb2-bench'] },
          { who: 'tb3', via: [{ x: 254, y: 194 }, { x: 70, y: 196 }, 'tb3-bench'] }, { who: 'tb4', via: [{ x: 278, y: 200 }, 'tb4-bench'] }
        ],
        mc: {
          do: [
            'Walk in front of the subdeacon. The order is: thurifer; second acolyte, crucifer and first acolyte abreast; torchbearers; you; subdeacon; deacon; the priest. When the priest wears a cope, the subdeacon, priest and deacon walk abreast behind you.',
            'At the altar take the birettas from the deacon and subdeacon. Put the two the deacon gives you (his and the priest\'s) on the seat of the sedilia nearer the altar, and the subdeacon\'s further away.',
            'Come back to your place, signal the genuflection, and signal all to kneel.'
          ],
          auth: 'manual', cite: [ss('MC, Procession and §1'), ['FORT', 'pp. 87, 100']]
        },
        th: {
          do: [
            'Lead the procession, the thurible in your left hand.',
            'Genuflect at the foot of the altar, then put the thurible on its stand and go to your place.'
          ],
          notes: ['Fortescue allows the thurifer to lead with joined hands and fetch the thurible during the Confiteor (p. 91).'],
          auth: 'manual', cite: [ss('Thurifer, Procession'), ['FORT', 'p. 91']]
        },
        ac1: {
          do: [
            'Walk at the crucifer\'s right, your candle held on your outside (right) shoulder.',
            'Stop where the thurifer genuflected and bow: walking beside the cross, you do not genuflect.',
            'Set your candle by the credence and go to your place there.'
          ],
          auth: 'manual', cite: [ss('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 87, 94–95']]
        },
        ac2: {
          do: [
            'Walk at the crucifer\'s left, your candle held on your outside (left) shoulder.',
            'Stop where the thurifer genuflected and bow: walking beside the cross, you do not genuflect.',
            'Set your candle by the credence and go to your place there.'
          ],
          auth: 'manual', cite: [ss('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 87, 94–95']]
        },
        cr: {
          do: [
            'Walk between the acolytes with the figure on the cross facing forward. You never genuflect while carrying the cross.',
            'Stop with the acolytes and bow, then put the cross in its stand and go to your place.'
          ],
          auth: 'manual', cite: [ss('Acolytes and Crucifer, Procession'), ['FORT', 'pp. 22, 86–87']]
        },
        tb: {
          do: ['Walk in behind the acolytes and crucifer with joined hands; your torches wait in the sacristy.', 'In the sanctuary genuflect two by two and go to your seats.'],
          auth: 'manual', cite: [ss('Torchbearers, Procession'), ['FORT', 'p. 98']]
        }
      },
      {
        id: 'asperges', opt: 'asperges', part: 'before', short: 'Asperges', title: 'The Asperges (Sundays)',
        place: places('kneel', { p: 'p-foot', d: 'd-foot', sd: 'sd-foot', mc: ['mc-foot-right', 'stand', null, 'holds the holy water'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'When all have knelt, pass the holy water (or the book, if the priest needs it) to the deacon, who hands the sprinkler to the priest.',
            'When the ministers have signed themselves, signal them to stand, then to genuflect.',
            'Walk at the priest\'s right, a little ahead, while he sprinkles the servers, then the Epistle side of the church on the way down and the Gospel side on the way back. At the back signal all to genuflect.',
            'Listen for *Glória Patri*: stop and bow toward the altar.',
            'Back in the sanctuary signal the genuflection, leaving the holy water on the lowest step, and hand the card of prayers to the deacon. Stand while the priest sings the prayer.',
            'Take the card back, signal the genuflection (picking up the holy water), and at the sedilia hand both to the first acolyte. Take the cope from the priest and give it to the thurifer.'
          ],
          notes: ['Fortescue gives the holy water to the thurifer, who walks at the deacon\'s right while the church is sprinkled (pp. 89, 91).'],
          auth: 'manual', cite: [ss('MC §2'), ['FORT', 'pp. 88–91']]
        },
        th: { do: ['Take the cope from the MC when the priest has changed into the chasuble, and carry it away.'], auth: 'local', cite: [ss('MC §2')] },
        ac1: {
          do: ['Kneel at your place with the MC, and rise with the MC.', 'Afterwards take the holy water and the book of prayers from the MC to the sacristy.'],
          notes: ['Fortescue: at the sedilia the first acolyte hands the deacon his maniple, the second the subdeacon (p. 95).'],
          auth: 'local', cite: [ss('Acolytes and Crucifer §1'), ['FORT', 'p. 95']]
        },
        ac2: {
          do: ['Kneel at your place with the MC, and rise with the MC. You are sprinkled with the other servers.'],
          notes: ['Fortescue: at the sedilia the first acolyte hands the deacon his maniple, the second the subdeacon (p. 95).'],
          auth: 'local', cite: [ss('Acolytes and Crucifer §1'), ['FORT', 'p. 95']]
        },
        cr: { do: ['Kneel at your place with the MC, and rise with the MC. You are sprinkled with the other servers.'], auth: 'local', cite: [ss('Acolytes and Crucifer §1')] },
        tb: { do: ['Kneel and rise with the acolytes. You are sprinkled with the other servers.'], auth: 'local', cite: [ss('Torchbearers, General Guidelines')] }
      },

      // ---------------------------------------------------------- prayers at the foot
      {
        id: 'foot', part: 'foot', short: 'Foot of the altar', title: 'The prayers at the foot of the altar',
        place: places('kneel', { p: 'p-foot', d: 'd-foot', sd: 'sd-foot', mc: ['mc-foot-right', 'kneel'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'When the ministers have vested, go to the altar, signal the genuflection, and signal all the servers to kneel.',
            'Kneel behind the deacon at his right and answer the prayers with the deacon and subdeacon, in a low voice.',
            'At the end signal the servers to stand, and go to the thurifer at the Epistle side.'
          ],
          sayFrom: ['introibo', 'psalm', 'misereatur', 'confiteor', 'versicles'],
          auth: 'manual', cite: [ss('MC §3'), ['FORT', 'p. 100']]
        },
        th: { do: ['Kneel at your place.', 'At *Deus, tu convérsus* rise, fetch the thurible and boat, and wait at the door ready.'], auth: 'local', cite: [ss('Thurifer §1A'), ['FORT', 'p. 91']] },
        ac1: { do: ['Kneel at your place by the credence.'], auth: 'manual', cite: [['FORT', 'p. 95']] },
        ac2: { do: ['Kneel at your place by the credence.'], auth: 'manual', cite: [['FORT', 'p. 95']] },
        cr: { do: ['Kneel at your place.'], auth: 'manual', cite: [['FORT', 'p. 86']] },
        tb: { do: ['Kneel at your place.'], auth: 'manual', cite: [ss('Torchbearers, General Guidelines'), ['FORT', 'p. 98']] }
      },

      // ---------------------------------------------------------- incensing at the Introit
      {
        id: 'impose-introit', part: 'catechumens', short: 'Incense blessed', title: 'Incense is put in for the altar',
        place: places('stand', { p: ['p-center', null, 'epistle'], d: 'd-right', sd: 'sd-left', mc: ['mc-impose-s', 'stand'], th: ['th-impose-s', 'stand'] }),
        missal: 'm-epistle',
        routes: [
          { who: 'mc', via: ['mc-foot-right', 'mc-epistle-floor', 'mc-impose-s'] },
          { who: 'th', via: ['th-seat', 'th-floor', 'th-impose-s'] }
        ],
        mc: {
          do: [
            'When the ministers go up to the altar, go to the Epistle side. Take the boat from the thurifer, who is at your right, and open it.',
            'Bow low to the priest when he turns toward you, and go up with the thurifer.',
            'Hand the open boat to the deacon, the spoon handle toward him. The priest puts in incense and blesses it.',
            'When the thurifer has given the thurible to the deacon, take the boat back from the deacon and give it to the thurifer.'
          ],
          auth: 'manual', cite: [ss('MC §4A'), ['MR62', 'Rit. serv. IV.4'], ['FORT', 'p. 100']]
        },
        th: {
          do: [
            'When the priest, deacon and subdeacon go up and the MC comes round, come to the Epistle side with the thurible in your left hand and the boat in your right.',
            'Hand the boat to the MC as the MC comes to your left, bow, and go up together.',
            'Open the thurible only on the footpace, and hold it up for the priest. Keep it open until he has blessed the incense.',
            'Close it, pass it to the deacon, and take the boat from the MC.'
          ],
          auth: 'manual', cite: [ss('Thurifer §1A'), ['FORT', 'pp. 24, 91']]
        }
      },
      {
        id: 'incense-altar', part: 'catechumens', short: 'Altar incensed', title: 'The altar is incensed',
        place: places('stand', { p: 'p-epistle', d: 'd-with-p-e', sd: 'sd-with-p-e', mc: ['mc-holds-missal', 'stand', null, 'holds the missal'], th: ['th-wait-s', 'stand'] }),
        missal: null,
        routes: [
          { who: 'mc', via: [{ x: 318, y: 58 }, 'mc-holds-missal'], carrying: 'missal' },
          { who: 'th', via: ['th-impose-s', { x: 352, y: 100 }, 'th-wait-s'] }
        ],
        mc: {
          do: [
            'Take the missal off the altar and go down the Epistle side with it. Stand on the floor until the priest has incensed that end.',
            'When he has genuflected in the middle after incensing the Epistle side, put the missal back and go back to your place on the floor.'
          ],
          notes: ['Fortescue has the MC put the missal back as soon as that end has been incensed. Some churches give this to the thurifer (p. 100 n. 1).'],
          auth: 'manual', cite: [ss('MC §4B'), ['FORT', 'pp. 100–101']]
        },
        th: {
          do: ['Come down turning by your right, put the boat away, and stand on the floor at the Epistle side, far enough back to leave room for the priest to be incensed.'],
          auth: 'local', cite: [ss('Thurifer §1B'), ['FORT', 'p. 91']]
        }
      },
      {
        id: 'incense-priest', part: 'catechumens', short: 'Priest incensed', title: 'The deacon incenses the priest',
        place: places('stand', { p: ['p-epistle', null, 'epistle'], d: ['d-incense', null, 'altar'], sd: 'sd-incense', mc: ['mc-corner-s', 'stand'], th: ['th-wait-s', 'stand'] }),
        missal: 'm-epistle',
        mc: {
          do: ['Bow with the deacon and subdeacon while the deacon incenses the priest.'],
          auth: 'manual', cite: [ss('MC §4B'), ['FORT', 'p. 101']]
        },
        th: {
          do: [
            'Stay back on the floor: you do not bow while the priest is incensed.',
            'Take the thurible straight from the deacon, take it and the boat back to the sacristy, and come straight back to your place.'
          ],
          notes: ['Fortescue has the thurifer stand a little behind the deacon at his right and bow with him (p. 91).'],
          auth: 'local', cite: [ss('Thurifer §1B–C'), ['MR62', 'Rit. serv. IV.4'], ['FORT', 'p. 91']]
        }
      },
      {
        id: 'introit', part: 'catechumens', short: 'Introit, Kyrie', title: 'Introit and Kyrie',
        place: places('stand', { p: 'p-epistle', d: 'd-behind-epistle', sd: 'sd-behind-epistle', mc: ['mc-missal', 'stand'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Go up and point out the Introit to the priest. The deacon gives the thurible straight to the thurifer: do not take it.',
            'Sign yourself with the priest at the beginning of the Introit, and bow toward the tabernacle with him at *Glória Patri*.',
            'Nod to the ministers when the priest says the first *Kýrie*.'
          ],
          auth: 'manual', cite: [ss('MC §4C–5'), ['FORT', 'p. 101']]
        }
      },
      {
        id: 'gloria', part: 'catechumens', short: 'Gloria', title: 'The Gloria, at the sedilia',
        place: places('sit', { p: 'p-sedilia', d: 'd-sedilia', sd: 'sd-sedilia', mc: ['mc-sedilia', 'stand', 'people'] }),
        missal: 'm-epistle',
        mc: {
          do: [
            'Bow and sign yourself with the ministers while they say the Gloria at the altar.',
            'When they have finished, signal the genuflection and go with them to the sedilia. Stand in front of it at the deacon\'s right, facing the people: you never sit.',
            'Nod to the ministers, then turn and bow toward the altar, at *Dómine Fili unigénite, Iesu Christe*, at *qui tollis peccáta mundi, súscipe deprecatiónem nostram*, and at *tu solus Altíssimus, Iesu Christe*.',
            'Signal them to stand at *Cum Sancto Spíritu*, go back to the altar with them, and signal the genuflection.'
          ],
          auth: 'manual', cite: [ss('MC §6'), ['FORT', 'p. 101']]
        },
        th: { do: ['Sit at your place while the ministers sit.'], auth: 'manual', cite: [['FORT', 'p. 97']] },
        ac1: {
          do: ['Sit when the deacon and subdeacon sit and stand when they stand, hands flat on your thighs while sitting.'],
          notes: ['Fortescue has the acolytes go to the sedilia to help the ministers sit: the first acolyte hands the birettas to the deacon, the second to the subdeacon (p. 95).'],
          auth: 'local', cite: [ss('Acolytes and Crucifer, General Guidelines'), ['FORT', 'p. 95']]
        },
        ac2: {
          do: ['Sit when the deacon and subdeacon sit and stand when they stand, hands flat on your thighs while sitting.'],
          notes: ['Fortescue has the acolytes go to the sedilia to help the ministers sit: the first acolyte hands the birettas to the deacon, the second to the subdeacon (p. 95).'],
          auth: 'local', cite: [ss('Acolytes and Crucifer, General Guidelines'), ['FORT', 'p. 95']]
        },
        cr: { do: ['Sit when the deacon and subdeacon sit and stand when they stand, hands flat on your thighs while sitting.'], auth: 'local', cite: [ss('Acolytes and Crucifer, General Guidelines')] },
        tb: { do: ['Sit and stand with the acolytes and crucifer.'], auth: 'local', cite: [ss('Torchbearers, General Guidelines')] }
      },
      {
        id: 'collect', part: 'catechumens', short: 'Collects', title: 'The collects: the book of the Epistle',
        place: places('stand', { p: 'p-epistle', d: 'd-behind-epistle', sd: 'sd-behind-epistle', mc: ['mc-sd-right', 'stand', null, 'holds the book'] }),
        missal: 'm-epistle',
        routes: [{ who: 'mc', via: ['mc-missal', { x: 396, y: 76 }, { x: 380, y: 118 }, 'mc-sd-right'] }],
        mc: {
          do: [
            'Go round to the missal with the priest and point out the collect(s). Bow toward the tabernacle with him at *Orémus*.',
            'Once he begins the collect (the last one, if there are more), fetch the book of the Epistle from the credence. Hold it with its opening to your right, your right hand higher than your left.',
            'Stand at the subdeacon\'s right, facing the altar. At the Holy Name in the conclusion bow toward the tabernacle, then hand the book to the subdeacon, bowing before and after.'
          ],
          notes: ['Not every conclusion has the Holy Name: check before Mass.'],
          auth: 'manual', cite: [ss('MC §6–7'), ['MR62', 'Rit. serv. VI.4'], ['FORT', 'pp. 101–102']]
        }
      },
      {
        id: 'epistle', part: 'catechumens', short: 'Epistle', title: 'The subdeacon sings the Epistle',
        place: places('stand', { p: 'p-sedilia', sd: ['sd-epistle', null, 'altar'], mc: ['mc-epistle-sd2', 'stand'] }),
        missal: 'm-epistle',
        routes: [{ who: 'mc', via: ['mc-sd-right', { x: 322, y: 140 }, { x: 230, y: 140 }, 'mc-epistle-sd2'], genuflect: [{ x: 230, y: 140 }] }],
        mc: {
          do: [
            'Go round behind the subdeacon to the subdeacon\'s left and go to the middle together. Genuflect, turn in toward the subdeacon, and go to the place where the Epistle is sung.',
            'Stand at the subdeacon\'s left while it is sung, bowing or genuflecting together where the text calls for it.',
            'At the end go with the subdeacon to the lowest step, genuflect, and follow to the Epistle side, where the priest blesses the subdeacon. Stand back, out of the way, and take the book back with bows before and after.',
            'Put the book away and go back to the missal at the priest\'s right.'
          ],
          notes: ['Since 1960 the priest does not read the Epistle himself at a Solemn Mass: he sits and listens, then goes back to the book (Rit. serv. VI.4).'],
          auth: 'rubric', cite: [ss('MC §7A–B'), ['MR62', 'Rit. serv. VI.4'], ['CR60', 'n. 473'], ['FORT', 'p. 102']]
        }
      },

      // ---------------------------------------------------------- the Gospel
      {
        id: 'impose-gospel', part: 'catechumens', short: 'Incense for Gospel', title: 'Incense is put in for the Gospel',
        place: places('stand', { p: ['p-center', null, 'epistle'], d: 'd-right', sd: 'sd-left', mc: ['mc-impose-s', 'stand'], th: ['th-impose-s', 'stand'], ac1: ['ac1-cred', 'stand', null, 'takes a candle'], ac2: ['ac2-cred', 'stand', null, 'takes a candle'] }),
        missal: 'm-gospel',
        routes: [
          { who: 'th', via: ['th-seat', 'th-floor', 'th-impose-s'] }
        ],
        mc: {
          do: [
            'After the Gradual and Alleluia (or Tract), go back to the sedilia the short way and fetch the book of the Gospels before the last four and a half lines are sung. When the choir begins them, signal the ministers to stand.',
            'Go to the altar with the ministers, signal the genuflection, and hand the book of the Gospels to the deacon, bowing before and after.',
            'Take the boat from the thurifer at the Epistle side and assist as at the Introit while incense is put in and blessed.',
            'Give the boat back to the thurifer, go down, and wait on the floor while it goes back to the credence. Then lead the thurifer to the middle.'
          ],
          notes: ['Four and a half lines is a rule of thumb: some Alleluias and Tracts take longer to sing than others.'],
          auth: 'manual', cite: [ss('MC §7C–8A'), ['MR62', 'Rit. serv. VI.5'], ['FORT', 'p. 102']]
        },
        th: {
          do: [
            'When the ministers rise and go to the altar after the Gradual and Alleluia (or Tract), fetch the thurible and boat and come to the Epistle side.',
            'Hand the boat to the MC, bow, go up together, and hold the thurible open while incense is put in and blessed.',
            'Close it and take the boat from the MC. Holding the thurible in your right hand now, come down with the MC (turning by your left) and put the boat on the credence.'
          ],
          auth: 'manual', cite: [ss('Thurifer §2A'), ['FORT', 'pp. 91–92']]
        },
        ac1: { do: ['When the priest puts incense in the thurible, take your candle.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §2A'), ['FORT', 'p. 96']] },
        ac2: { do: ['When the priest puts incense in the thurible, take your candle.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §2A'), ['FORT', 'p. 96']] }
      },
      {
        id: 'before-gospel', part: 'catechumens', short: 'Line up', title: 'Line up for the Gospel',
        place: places('stand', { p: 'p-epistle', d: 'd-front', sd: 'sd-front', mc: ['mc-mid-s', 'stand'], th: ['th-mid-s', 'stand'], ac1: ['ac1-mid-s', 'stand'], ac2: ['ac2-mid-s', 'stand'] }),
        missal: 'm-gospel',
        routes: [
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 176 }, 'ac1-mid-s'] },
          { who: 'ac2', via: ['ac2-cred', { x: 384, y: 200 }, { x: 260, y: 206 }, 'ac2-mid-s'] },
          { who: 'th', via: ['th-impose-s', 'mc-corner-s', { x: 330, y: 168 }, 'th-mid-s'] },
          { who: 'mc', via: ['mc-impose-s', { x: 330, y: 150 }, { x: 260, y: 158 }, 'mc-mid-s'] }
        ],
        mc: {
          do: ['Stand behind the subdeacon, at the thurifer\'s left. When the deacon has lined up beside the subdeacon, signal the genuflection.'],
          notes: ['Fortescue puts the MC at the subdeacon\'s left, or behind the acolytes (p. 102, fig. 11).'],
          auth: 'manual', cite: [ss('MC §8A'), ['FORT', 'p. 102']]
        },
        th: {
          do: ['Stand at the MC\'s right, behind the deacon. Do not swing the thurible.', 'Genuflect with all at the MC\'s signal.'],
          notes: ['Fortescue has the thurifer in front, between the acolytes, with the deacon and subdeacon in front of them (p. 96, fig. 11).'],
          auth: 'manual', cite: [ss('Thurifer §2B–C'), ['FORT', 'p. 92']]
        },
        ac1: {
          do: ['Line up behind the thurifer, at the second acolyte\'s right.', 'Genuflect with all at the MC\'s signal.'],
          notes: ['Fortescue has the acolytes on either side of the thurifer, the deacon and subdeacon in front of them (p. 96, fig. 11).'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §2A'), ['FORT', 'p. 96']]
        },
        ac2: {
          do: ['Line up behind the MC, at the first acolyte\'s left.', 'Genuflect with all at the MC\'s signal.'],
          notes: ['Fortescue has the acolytes on either side of the thurifer, the deacon and subdeacon in front of them (p. 96, fig. 11).'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §2A'), ['FORT', 'p. 96']]
        }
      },
      {
        id: 'gospel', part: 'catechumens', short: 'Gospel', title: 'The deacon sings the Gospel',
        place: places('stand', {
          p: ['p-epistle', null, 'gospel'], d: ['d-gospel', null, 'north'], sd: ['sd-gospel', null, 'epistle'],
          mc: ['mc-gospel-s', 'stand', 'gospel'], th: ['th-gospel-s', 'stand', 'gospel'],
          ac1: ['ac1-gospel-s', 'stand', 'epistle'], ac2: ['ac2-gospel-s', 'stand', 'epistle']
        }),
        missal: 'm-gospel',
        routes: [
          { who: 'ac2', via: ['ac2-mid-s', { x: 150, y: 178 }, { x: 110, y: 124 }, 'ac2-gospel-s'] },
          { who: 'ac1', via: ['ac1-mid-s', { x: 150, y: 208 }, { x: 60, y: 208 }, 'ac1-gospel-s'] },
          { who: 'mc', via: ['mc-mid-s', { x: 150, y: 150 }, 'mc-gospel-s'] },
          { who: 'th', via: ['th-mid-s', { x: 160, y: 196 }, 'th-gospel-s'] }
        ],
        mc: {
          do: [
            'After the genuflection follow the acolytes to the place of the Gospel. Face the thurifer; when the deacon and subdeacon arrive, face the second acolyte.',
            'At the beginning of the Gospel turn to your right toward the priest and sign yourself at *Sequéntia sancti Evangélii*. Keep turning and take the thurible from the thurifer in your right hand.',
            'Hand it to the deacon, bow with him while he incenses the book, and take it back.',
            'Turn to your right and bow to the priest at the Holy Name (if it comes), then give the thurible back to the thurifer. At every Holy Name turn to the priest and bow.',
            'Stand at the deacon\'s right and turn the pages.'
          ],
          notes: ['Time the turn so you bow to the priest before the Holy Name is sung.'],
          auth: 'rubric', cite: [ss('MC §8B–C'), ['MR62', 'Rit. serv. VI.5'], ['FORT', 'p. 102']]
        },
        th: {
          do: [
            'After the genuflection follow the acolytes to the place of the Gospel. Face the MC; when the deacon and subdeacon arrive, face the first acolyte.',
            'When the MC has made the sign of the cross, give the MC the thurible with your right hand. Bow low with the deacon and MC while the book is incensed.',
            'Take the thurible back after the MC bows for the Holy Name, move it to your left hand, away from the deacon, and do not swing it.'
          ],
          notes: ['Fortescue puts the thurifer at the deacon\'s left (p. 92, fig. 12), as here.'],
          auth: 'manual', cite: [ss('Thurifer §2C–D'), ['FORT', 'p. 92']]
        },
        ac1: {
          do: [
            'Lead the way to the place of the Gospel with the second acolyte, and stand facing each other with room between you for the subdeacon. When the deacon and subdeacon arrive, turn and face the thurifer: the subdeacon, holding the book, is then at your left.',
            'Hold your candle on your outside shoulder. Do not genuflect or bow during the Gospel while holding it.'
          ],
          auth: 'rubric', cite: [ss('Acolytes and Crucifer §2A'), ['MR62', 'Rit. serv. VI.5'], ['CR60', 'n. 519'], ['FORT', 'p. 96']]
        },
        ac2: {
          do: [
            'Lead the way to the place of the Gospel with the first acolyte, and stand facing each other with room between you for the subdeacon. When the deacon and subdeacon arrive, turn and face the MC: the subdeacon, holding the book, is then at your right.',
            'Hold your candle on your outside shoulder. Do not genuflect or bow during the Gospel while holding it.'
          ],
          auth: 'rubric', cite: [ss('Acolytes and Crucifer §2A'), ['MR62', 'Rit. serv. VI.5'], ['CR60', 'n. 519'], ['FORT', 'p. 96']]
        },
        cr: { do: ['Stand at your place for the Gospel, turned toward it.'], auth: 'manual', cite: [['FORT', 'pp. 84, 86']] },
        tb: { do: ['When the Gospel group has genuflected, turn and face it. At the end of the Gospel turn back.'], auth: 'local', cite: [ss('Torchbearers, Gospel')] }
      },
      {
        id: 'after-gospel', part: 'catechumens', short: 'After the Gospel', title: 'After the Gospel: the priest is incensed',
        place: places('stand', { p: ['p-center', null, 'people'], d: ['d-foot-center', null, 'altar'], sd: 'sd-book', mc: ['mc-book', 'stand', null, 'takes the book'], th: ['th-foot-right', 'stand'] }),
        missal: 'm-gospel',
        routes: [
          { who: 'mc', via: ['mc-gospel-s', { x: 140, y: 146 }, { x: 230, y: 152 }, 'mc-book'], genuflect: [{ x: 230, y: 152 }] },
          { who: 'th', via: ['th-gospel-s', { x: 160, y: 150 }, 'th-foot-right'] },
          { who: 'ac1', via: ['ac1-gospel-s', { x: 150, y: 168 }, { x: 246, y: 168 }, { x: 372, y: 150 }, 'ac1-cred'], genuflect: [{ x: 246, y: 168 }] },
          { who: 'ac2', via: ['ac2-gospel-s', { x: 140, y: 160 }, { x: 214, y: 168 }, { x: 372, y: 140 }, 'ac2-cred'], genuflect: [{ x: 214, y: 168 }] }
        ],
        mc: {
          do: [
            'At the end of the Gospel lead the acolytes to the middle, going behind the deacon and thurifer, and signal the genuflection.',
            'Then go to the subdeacon at the Epistle side, take the book of the Gospels, and put it away.'
          ],
          auth: 'manual', cite: [ss('MC §8C'), ['FORT', 'p. 103']]
        },
        th: {
          do: [
            'When the subdeacon has gone, turn by your right toward the priest and walk to the middle at the foot, the deacon at your left. Give the deacon the thurible.',
            'When the priest has kissed the book and is ready, bow low with the deacon, who incenses the priest with three double swings. Bow again and take the thurible back.',
            { t: 'At once take the boat from the credence, put the thurible and boat away, and go to your place for the sermon.', if: 'sermon' },
            { t: 'At once take the boat from the credence and go out to make the thurible ready for the Offertory.', unless: 'sermon' }
          ],
          notes: ['Since 1960 this incensing is kept only at a Solemn Mass (Rit. serv. VI.5 and VI.8). Fortescue has the priest incensed where he stood for the Gospel, at the Epistle side, the thurifer at the deacon\'s right (p. 92).'],
          auth: 'rubric', cite: [ss('Thurifer §2E'), ['MR62', 'Rit. serv. VI.5'], ['FORT', 'p. 92']]
        },
        ac1: { do: ['When the subdeacon has gone, follow the MC to the middle, genuflect with the MC, put your candle back, and go to your place.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §2B'), ['FORT', 'p. 96']] },
        ac2: { do: ['When the subdeacon has gone, follow the MC to the middle, genuflect with the MC, put your candle back, and go to your place.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §2B'), ['FORT', 'p. 96']] }
      },
      {
        id: 'sermon', opt: 'sermon', part: 'catechumens', short: 'Sermon', title: 'The sermon',
        place: places('sit', { p: null, d: 'd-sedilia', sd: 'sd-sedilia', mc: ['mc-sedilia', 'stand', 'people'] }),
        missal: 'm-gospel',
        mc: {
          do: [
            'When the ministers have come back to the foot of the altar and the preacher has taken off the maniple, signal the genuflection and lead the preacher to the pulpit.',
            'At the Holy Name during the sermon, bow straight ahead, not toward the tabernacle.',
            'At the end signal the ministers to stand and go to the altar. When the maniple is back on, signal the genuflection.'
          ],
          notes: ['Fortescue lets the MC sit during the sermon, the only time at High Mass (p. 103).'],
          auth: 'local', cite: [ss('MC §8D–F'), ['FORT', 'p. 103']]
        },
        th: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 97']] },
        ac1: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 97']] },
        ac2: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 97']] },
        cr: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [['FORT', 'p. 97']] },
        tb: { do: ['Sit at your place during the sermon.'], auth: 'manual', cite: [ss('Torchbearers, General Guidelines'), ['FORT', 'p. 97']] }
      },
      {
        id: 'creed', opt: 'creed', part: 'catechumens', short: 'Creed', title: 'The Creed: the burse',
        place: places('sit', { p: 'p-sedilia', d: 'd-altar', sd: 'sd-sedilia', mc: ['mc-foot-d', 'stand', null, 'waits for the deacon'] }),
        missal: 'm-gospel',
        routes: [{ who: 'mc', via: ['mc-sedilia', { x: 396, y: 76 }, { x: 404, y: 112 }, { x: 330, y: 140 }, 'mc-foot-d'] }],
        mc: {
          do: [
            'Bow, genuflect and sign yourself with the ministers while they say the Creed at the altar. Then signal the genuflection and go with them to the sedilia.',
            'If the choir reaches *Et incarnátus est* before they have gone to sit, signal them to kneel on the lowest step; then to stand, genuflect, and go to the sedilia.',
            'After *Et incarnátus est* fetch the burse from the credence. Hold it at eye level, its opening away from you, and hand it to the deacon with bows before and after.',
            'Walk at the deacon\'s right to the foot of the altar, lift his alb as he goes up, and wait where you genuflected. When he comes back, genuflect with him and go back to the sedilia.',
            'Signal the ministers to bow at *simul adorátur*, and to stand at *Et vitam ventúri sǽculi*. Go to the altar with them, signal the genuflection, and go to your place.'
          ],
          notes: ['Fortescue: at the sung *Et incarnátus est* the MC bows to the priest as the sign to uncover, and kneels facing across the sanctuary (p. 103).'],
          auth: 'local', cite: [ss('MC §9'), ['CR60', 'n. 518'], ['FORT', 'p. 103']]
        },
        th: {
          do: ['After the priest intones *Credo in unum Deum*, go out and light a fresh coal for the rest of Mass, then come back to your place.'],
          auth: 'local', cite: [ss('Thurifer §2E')]
        },
        ac1: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 96']] },
        ac2: { do: ['Kneel at your place while *Et incarnátus est* is sung.'], auth: 'manual', cite: [['FORT', 'p. 96']] },
        cr: { do: ['Kneel at your place with the acolytes while *Et incarnátus est* is sung.'], auth: 'local', cite: [ss('Acolytes and Crucifer, General Guidelines'), ['FORT', 'p. 96']] },
        tb: { do: ['Kneel at your place with the acolytes while *Et incarnátus est* is sung.'], auth: 'local', cite: [ss('Torchbearers, General Guidelines'), ['FORT', 'p. 96']] }
      },

      // ---------------------------------------------------------- Offertory
      {
        id: 'offertory', part: 'offertory', short: 'Humeral veil', title: 'The Offertory: the humeral veil',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-credence', mc: ['mc-credence', 'stand', null, 'puts on the veil'], ac2: ['ac2-cred', 'stand', null, 'folds the chalice veil'] }),
        missal: 'm-gospel',
        routes: [{ who: 'mc', via: ['mc-epistle-floor', { x: 372, y: 112 }, 'mc-credence'] }],
        mc: {
          do: [
            'When the priest has sung *Orémus*, genuflect with the subdeacon and go together to the credence.',
            'Put the humeral veil over the subdeacon\'s shoulders, hanging a little lower on the right.',
            'If there are ciboria on the credence, take them to the altar. Then go back to your place.'
          ],
          auth: 'manual', cite: [ss('MC §10A'), ['MR62', 'Rit. serv. VII.9'], ['FORT', 'p. 103']]
        },
        ac2: {
          do: ['When the subdeacon takes the chalice at the credence, fold the chalice veil.'],
          notes: ['This is Fortescue\'s. FSSP Omaha\'s sheet gives the second acolyte nothing to do here.'],
          auth: 'manual', cite: [['FORT', 'p. 96']]
        }
      },
      {
        id: 'cruets', part: 'offertory', short: 'Cruets', title: 'The cruets',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-cruets', ac1: ['ac1-altar', 'stand', null, 'sets the cruets'] }),
        missal: 'm-gospel',
        routes: [{ who: 'ac1', via: ['ac1-cred', { x: 372, y: 100 }, 'ac1-altar'] }],
        ac1: {
          do: [
            'When the subdeacon has gone up with the chalice, take both cruets, on their dish and without their stoppers, and set them on the Epistle end of the altar. Then stand on the floor.',
            'Do not kiss the cruets: at a Solemn Mass the subdeacon takes them, not the priest.',
            'When they are back on the dish, take them off the altar and back to the credence.'
          ],
          notes: ['Fortescue has the first acolyte spread the towel at the Epistle end, hand the cruets to the subdeacon, and take them back when the chalice is filled (p. 96).'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §3A'), ['MR62', 'Rit. serv. VII.9'], ['FORT', 'p. 96']]
        },
        th: { do: ['When the first acolyte sets the cruets on the altar, fetch the thurible and boat and wait at the door.'], auth: 'local', cite: [ss('Thurifer §3A')] }
      },
      {
        id: 'incense-offertory', part: 'offertory', short: 'Offerings incensed', title: 'The offerings and the altar are incensed',
        place: places('stand', { p: 'p-gospel', d: 'd-with-p-g', sd: 'sd-behind', mc: ['mc-holds-missal-g', 'stand', null, 'holds the missal'], th: ['th-with-p-g', 'stand', null, 'at his elbow'] }),
        missal: null,
        routes: [
          { who: 'mc', via: ['mc-impose-s', 'mc-epistle-floor', { x: 300, y: 148 }, { x: 230, y: 148 }, { x: 130, y: 140 }, 'mc-holds-missal-g'], genuflect: [{ x: 230, y: 148 }] },
          { who: 'th', via: ['th-impose-s', 'th-floor', { x: 300, y: 154 }, { x: 230, y: 154 }, { x: 150, y: 110 }, 'th-with-p-g'], genuflect: [{ x: 230, y: 154 }] }
        ],
        mc: {
          do: [
            'When the first acolyte has taken the cruets away and the priest has offered the chalice, take the boat from the thurifer at the Epistle side and assist as at the Introit while incense is put in and blessed.',
            'Go down the Epistle side and wait on the floor while the thurifer puts the boat on the credence.',
            'With the thurifer, genuflect in the middle behind the subdeacon, and go to the floor at the Gospel side.',
            'When the priest begins to incense the Epistle side, take the missal off the altar (at once, if there are relics on the altar). When he comes back to incense the Epistle side again, put it back in its Canon place and stay there. Find the Secret.'
          ],
          notes: ['Fortescue: the MC waits at the Epistle side, crosses when the priest comes to incense that side, takes the missal away when he reaches its place, and puts it back when that end has been incensed (p. 104).'],
          auth: 'manual', cite: [ss('MC §10B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'pp. 103–104']]
        },
        th: {
          do: [
            'When the first acolyte has put the cruets back, come to the Epistle side. Hand the boat to the MC, bow, go up together, and hold the thurible open while incense is put in and blessed.',
            'Close it, pass it to the deacon, and take the boat from the MC. Turn by your left, go down, and leave the boat on the credence.',
            'Follow the MC to the middle, behind the subdeacon, and genuflect together. Then go straight up to the priest\'s left and support his elbow while he incenses the altar.'
          ],
          notes: ['Fortescue has the thurifer stand on the floor at the Epistle side while the altar is incensed (p. 92).'],
          auth: 'local', cite: [ss('Thurifer §3B'), ['FORT', 'p. 92']]
        }
      },
      {
        id: 'incense-priest-off', part: 'offertory', short: 'Ministers incensed', title: 'The priest and the subdeacon are incensed',
        place: places('stand', {
          p: ['p-epistle', null, 'epistle'], d: ['d-incense', null, 'altar'], sd: 'sd-behind', mc: ['mc-canon', 'stand'],
          th: ['th-incense-d', 'stand'], ac1: ['ac1-wait-h', 'stand', null, 'towel'], ac2: ['ac2-wait-h', 'stand', null, 'water and dish']
        }),
        missal: 'm-canon',
        routes: [
          { who: 'th', via: ['th-with-p-g', { x: 230, y: 92 }, { x: 300, y: 110 }, 'th-incense-d'] },
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 104 }, 'ac1-wait-h'] },
          { who: 'ac2', via: ['ac2-cred', { x: 368, y: 110 }, 'ac2-wait-h'] }
        ],
        th: {
          do: [
            'After the last genuflection in the middle, go down the front steps on the Epistle side and stand at the deacon\'s left, a little behind. Bow low with the deacon while he incenses the priest.',
            'Lead the deacon to the subdeacon\'s right, where the deacon incenses the subdeacon. Then take the thurible from the deacon.'
          ],
          notes: ['If there are clergy in choir, lead the deacon to them first, staying at his left while he incenses them (FSSP Omaha; Fortescue p. 93).'],
          auth: 'manual', cite: [ss('Thurifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 93']]
        },
        ac1: {
          do: ['When the priest has finished incensing the Gospel side, go to the credence with the second acolyte and take the towel.', 'Wait on the floor at the Epistle side, leaving room for the deacon and thurifer to incense the priest.'],
          auth: 'local', cite: [ss('Acolytes and Crucifer §3B'), ['FORT', 'p. 96']]
        },
        ac2: {
          do: ['When the priest has finished incensing the Gospel side, go to the credence with the first acolyte and take the water cruet in your right hand and the dish in your left.', 'Wait on the floor at the Epistle side, leaving room for the deacon and thurifer to incense the priest.'],
          auth: 'local', cite: [ss('Acolytes and Crucifer §3B'), ['FORT', 'p. 96']]
        }
      },
      {
        id: 'lavabo', part: 'offertory', short: 'Lavabo', title: 'The Lavabo: the deacon and MC are incensed',
        place: places('stand', {
          p: ['p-epistle', null, 'epistle'], d: ['d-behind-epistle', null, 'people'], sd: 'sd-behind', mc: ['mc-canon', 'stand', 'people'],
          th: ['th-incense-mc', 'stand', null, 'incenses the MC'], ac1: ['ac1-up', 'stand', null, 'towel'], ac2: ['ac2-up', 'stand', null, 'water and dish']
        }),
        missal: 'm-canon',
        routes: [
          { who: 'th', via: ['th-incense-d', { x: 270, y: 146 }, { x: 196, y: 146 }, 'th-incense-mc'] },
          { who: 'ac1', via: ['ac1-wait-h', 'ac1-floor', 'ac1-up'] },
          { who: 'ac2', via: ['ac2-wait-h', 'ac2-floor', 'ac2-up'] }
        ],
        mc: {
          do: [
            'At *Oráte, fratres* answer the *Suscípiat* and point out the Secret. Watch for the thurifer coming to incense you: turn, and bow before and after.',
            'At the end of the Secret turn to the Preface. At the words about the Angels and Archangels (*atque* or *cumque*), bow to the deacon and subdeacon as their sign to come up for the *Sanctus*.',
            'Then leave by your left, the long way round, to your place.'
          ],
          sayFrom: ['suscipiat'],
          auth: 'manual', cite: [ss('MC §10C–D'), ['FORT', 'p. 104']]
        },
        th: {
          do: [
            'Incense the deacon with two double swings, bowing before and after.',
            'Go round behind the subdeacon and incense the MC: one swing, or one double swing if the MC is a cleric. If the MC is busy at the missal, wait; clink the chains gently to remind the MC.'
          ],
          notes: ['Fortescue gives the MC and each server one double swing (p. 93).'],
          auth: 'rubric', cite: [ss('Thurifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 93']]
        },
        ac1: {
          do: ['When the deacon and thurifer have gone, go to the step with the second acolyte, bow, and go up. Hand the priest the towel and take it back.', 'Bow, put it back on the credence, and go to your place.'],
          notes: ['Some authors give the towel to the second acolyte instead; Fortescue thinks it hardly matters (p. 96 n. 4).'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 96']]
        },
        ac2: {
          do: ['Go up with the first acolyte, bow, and pour a little water over the priest\'s fingers into the dish.', 'Bow, put them back on the credence, and go to your place.'],
          notes: ['Some authors give the water and dish to the first acolyte instead; Fortescue thinks it hardly matters (p. 96 n. 4).'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 96']]
        }
      },
      {
        id: 'incense-people', part: 'offertory', short: 'People incensed', title: 'The servers and people are incensed',
        place: places('stand', { p: 'p-center', d: 'd-behind', sd: 'sd-behind', mc: ['mc-epistle-floor', 'stand'], th: ['th-nave', 'stand', 'people', 'incenses the people'] }),
        missal: 'm-canon',
        th: {
          do: [
            'Incense the acolytes and crucifer together (one double swing to the middle, one to the left, one to the right), then the torchbearers the same way.',
            'Genuflect before leaving the sanctuary, turn by your right, and incense the people: one double swing down the middle, one left, one right.',
            'Genuflect whenever you cross the middle, and bow before and after each incensing.',
            'Then stand in the middle of the sanctuary facing the altar until the priest sings *Per ómnia sǽcula sæculórum* before the Preface.'
          ],
          auth: 'rubric', cite: [ss('Thurifer §3B'), ['MR62', 'Rit. serv. VII.10'], ['FORT', 'p. 93']]
        },
        ac1: { do: ['When the thurifer comes to incense you, bow before and after.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §3B'), ['FORT', 'p. 97']] },
        ac2: { do: ['When the thurifer comes to incense you, bow before and after.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §3B'), ['FORT', 'p. 97']] },
        cr: { do: ['When the thurifer comes to incense you, bow before and after.', 'Then go and light the torchbearers\' torches.'], auth: 'local', cite: [ss('Acolytes and Crucifer §3B')] },
        tb: { do: ['The thurifer incenses you as a group: bow before and after.'], auth: 'local', cite: [ss('Torchbearers, Offertory')] }
      },
      {
        id: 'preface', part: 'offertory', short: 'Torches out', title: 'At the Preface, out for the torches',
        place: places('stand', { p: 'p-center', d: 'd-behind', sd: 'sd-behind', th: ['th-mid-lead', 'stand'], tb1: ['tb1-front', 'stand'], tb2: ['tb2-front', 'stand'], tb3: ['tb3-front', 'stand'], tb4: ['tb4-front', 'stand'] }),
        missal: 'm-canon',
        routes: [
          { who: 'th', via: ['th-mid-lead', { x: 330, y: 196 }, 's-sacristy'] },
          { who: 'tb1', via: ['tb1-bench', { x: 120, y: 176 }, 'tb1-front'] }, { who: 'tb2', via: ['tb2-bench', { x: 120, y: 180 }, 'tb2-front'] },
          { who: 'tb3', via: ['tb3-bench', { x: 120, y: 190 }, 'tb3-front'] }, { who: 'tb4', via: ['tb4-bench', { x: 140, y: 196 }, 'tb4-front'] }
        ],
        th: { do: ['When the priest sings *Per ómnia sǽcula sæculórum*, go to the right side of the torchbearers, signal them, and lead them in procession to the sacristy.'], auth: 'manual', cite: [ss('Thurifer §3B'), ['FORT', 'pp. 93, 98']] },
        tb: { do: ['When the priest sings *Per ómnia sǽcula sæculórum* before the Preface, line up in the middle and follow the thurifer out to the sacristy for your torches.'], auth: 'manual', cite: [ss('Torchbearers, Offertory'), ['FORT', 'p. 98']] }
      },

      // ---------------------------------------------------------- Sanctus and Canon
      {
        id: 'sanctus', part: 'canon', short: 'Sanctus', title: 'The Sanctus: the torches come in',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-left', ac1: ['ac1-cred', 'stand', null, 'rings'] }, true),
        missal: 'm-canon',
        routes: [
          { who: 'tb1', via: ['s-sacristy', { x: 330, y: 186 }, { x: 146, y: 186 }, 'tb1-line'] }, { who: 'tb2', via: ['s-sacristy', { x: 330, y: 182 }, { x: 188, y: 182 }, 'tb2-line'] },
          { who: 'tb3', via: ['s-sacristy', { x: 330, y: 178 }, { x: 272, y: 178 }, 'tb3-line'] }, { who: 'tb4', via: ['s-sacristy', { x: 330, y: 174 }, 'tb4-line'] },
          { who: 'th', via: ['s-sacristy', { x: 372, y: 186 }, 'th-seat'] }
        ],
        th: { do: ['When the *Sanctus* begins, lead the torchbearers back in to their places, then go to your place.'], auth: 'manual', cite: [ss('Thurifer §3B'), ['FORT', 'p. 93']] },
        ac1: {
          do: ['Ring the bell three times at the *Sanctus*, at each *Sanctus* if you can.'],
          bell: { rings: '3', auth: 'local', note: 'Fortescue: at High Mass the bell is not needed and is not rung at Rome; where it is the custom, the first acolyte rings it at the *Sanctus* (pp. 104–105).', cite: [ss('Acolytes and Crucifer §4A'), ['FORT', 'pp. 104–105']] },
          auth: 'local', cite: [ss('Acolytes and Crucifer §4A'), ['FORT', 'pp. 104–105']]
        },
        tb: {
          do: [
            'At the *Sanctus* come back in pairs by the Epistle side, led by the thurifer. Genuflect, turn in toward each other, walk to the first step and fan out.',
            'Kneel in your place in the line when the thurifer signals. Hold the torch with two hands while standing or walking, one hand while kneeling.'
          ],
          auth: 'rubric', cite: [ss('Torchbearers, Offertory and General Guidelines'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'p. 98']]
        }
      },
      {
        id: 'memento', part: 'canon', short: 'Incense for elevation', title: 'Incense for the elevation',
        place: places('stand', { p: 'p-center', d: 'd-left', sd: 'sd-behind', mc: ['mc-corner-s', 'stand', null, 'puts in incense'], th: ['th-by-mc', 'stand', null, 'holds the thurible'], ac1: ['ac1-cred', 'stand', null, 'rings once'] }, true),
        missal: 'm-canon',
        routes: [{ who: 'th', via: ['th-seat', 'th-by-mc'] }],
        mc: {
          do: [
            'When the deacon steps forward again after the *Meménto* of the living, turn to the thurifer coming toward you and take the boat.',
            'Stir the coals, put incense in (no blessing is given), and give the boat back.'
          ],
          notes: ['Fortescue: the MC or the thurifer puts the incense in, at *Qui prídie* (p. 104).'],
          auth: 'manual', cite: [ss('MC §11A'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'p. 104']]
        },
        th: {
          do: [
            'When the deacon steps forward on the footpace after the *Meménto* of the living, fetch the thurible and boat.',
            'Hand the boat to the MC and hold the thurible open while the MC puts incense in.',
            'Go to the Epistle side, put the boat on the credence, and stand on the floor at the step, facing the Gospel side.'
          ],
          auth: 'manual', cite: [ss('Thurifer §4A'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'pp. 93, 104']]
        },
        ac1: {
          do: ['Ring once at the *Hanc ígitur*, when the priest spreads his hands over the chalice.'],
          bell: { rings: '1', auth: 'local', note: 'FSSP Omaha\'s custom. Fortescue: at High Mass the bell, where customary, rings only at the *Sanctus* and the elevations.', cite: [ss('Acolytes and Crucifer §4B'), ['FORT', 'pp. 104–105']] },
          auth: 'local', cite: [ss('Acolytes and Crucifer §4B')]
        }
      },
      {
        id: 'consecration', part: 'canon', short: 'Consecration', title: 'The Consecration',
        place: places('kneel', { p: 'p-center', d: 'd-elev', sd: 'sd-behind', mc: ['mc-elev-s', 'kneel'], th: ['th-elev', 'kneel', 'gospel', 'incenses'], ac1: ['ac1-cred', 'kneel', null, 'rings'] }, true),
        missal: 'm-canon',
        mc: {
          do: [
            'Kneel on the floor at the Epistle side when the deacon kneels.',
            'After the elevation of the chalice, stand when the priest rises from his last genuflection.'
          ],
          notes: ['Fortescue has the MC kneel beside the thurifer, and in many churches incense at the elevations instead of the thurifer (p. 104 n. 4).'],
          auth: 'manual', cite: [ss('MC §11B'), ['FORT', 'p. 104']]
        },
        th: {
          do: [
            'Kneel on the first step when the deacon kneels.',
            'Incense the Host with three double swings as it is raised, and the chalice the same way, bowing before and after.',
            'Stand with the MC afterwards, take the thurible and boat back to the sacristy, and go to your place.'
          ],
          auth: 'rubric', cite: [ss('Thurifer §4B–C'), ['MR62', 'Rit. serv. VIII.8'], ['FORT', 'pp. 93, 104']]
        },
        ac1: {
          do: [
            'Kneel when the MC signals.',
            { t: 'Ring once at the priest\'s first genuflection, three times at the elevation, and once at the second genuflection. The same for the chalice.', if: 'bells131' },
            { t: 'Ring three times as the Host is raised, and three times as the chalice is raised.', unless: 'bells131' },
            'Rise with all after the priest\'s genuflection after the chalice.'
          ],
          bell: { rings: '1-3-1 each', auth: 'local', note: 'FSSP Omaha rings 1-3-1. Fortescue: where the bell is the custom at High Mass, the MC or the thurifer rings it at the elevations (pp. 104–105).', cite: [ss('Acolytes and Crucifer §4D'), ['FORT', 'pp. 104–105']] },
          auth: 'local', cite: [ss('Acolytes and Crucifer §4C–D'), ['FORT', 'pp. 97, 104–105']]
        },
        ac2: { do: ['Kneel at your place when the MC signals, and rise with all after the elevation of the chalice.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §4C–D'), ['FORT', 'p. 97']] },
        cr: { do: ['Kneel at your place when the MC signals, and rise with all after the elevation of the chalice.'], auth: 'manual', cite: [ss('Acolytes and Crucifer §4C–D')] },
        tb: {
          do: ['Stay kneeling in your place with the torch.', 'Stay through Communion when there are communicants. Otherwise the torches go out after the elevation of the chalice, except on fast days and at Requiems.'],
          auth: 'rubric', cite: [['MR62', 'Rit. serv. VIII.8'], ss('Torchbearers, Communion'), ['FORT', 'pp. 98–99']]
        }
      },
      {
        id: 'nobis-quoque', part: 'canon', short: 'End of the Canon', title: 'The end of the Canon',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-behind', mc: ['mc-canon', 'stand'] }, true),
        missal: 'm-canon',
        routes: [{ who: 'mc', via: ['mc-epistle-floor', { x: 300, y: 146 }, { x: 230, y: 146 }, 'mc-gospel-step', 'mc-canon'], genuflect: [{ x: 230, y: 146 }] }],
        mc: {
          do: [
            'At *Nobis quoque peccatóribus* go to the middle behind the subdeacon, genuflect, and wait at the steps on the Gospel side.',
            'When the deacon genuflects, genuflect with him and go up to the priest\'s left, by the missal.',
            'Turn the page just before each genuflection, and support the priest\'s elbow as he genuflects when the pall is taken off the chalice and put back.'
          ],
          notes: ['Fortescue has the MC come to the missal at *Per quem hæc ómnia* (p. 105).'],
          auth: 'manual', cite: [ss('MC §11C'), ['FORT', 'p. 105']]
        }
      },

      // ---------------------------------------------------------- Pater noster and Communion
      {
        id: 'pater', optNot: 'veilAc1', part: 'communion', short: 'Pater noster', title: 'The Pater noster: the humeral veil',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-paten', mc: ['mc-canon', 'stand'], th: ['veil-taker', 'stand', null, 'takes the veil'] }, true),
        missal: 'm-canon',
        routes: [{ who: 'th', via: ['th-seat', { x: 372, y: 130 }, 'veil-taker'] }],
        mc: MC_PATER,
        th: { do: VEIL, notes: VEIL_NOTE, auth: 'local', cite: [ss('MC §12'), ['FORT', 'pp. 93–94, 97']] }
      },
      {
        id: 'pater-ac1', opt: 'veilAc1', part: 'communion', short: 'Pater noster', title: 'The Pater noster: the humeral veil',
        place: places('stand', { p: 'p-center', d: 'd-right', sd: 'sd-paten', mc: ['mc-canon', 'stand'], ac1: ['veil-taker', 'stand', null, 'takes the veil'] }, true),
        missal: 'm-canon',
        routes: [{ who: 'ac1', via: ['ac1-cred', { x: 352, y: 100 }, 'veil-taker'] }],
        mc: MC_PATER,
        ac1: { do: VEIL, notes: VEIL_NOTE, auth: 'manual', cite: [['FORT', 'p. 97'], ss('MC §12')] }
      },
      {
        id: 'servers-communion', part: 'communion', short: 'Servers\' Communion', title: 'The servers\' Communion',
        place: places('kneel', {
          p: ['p-center', null, 'people'], d: 'd-left', sd: 'sd-right',
          th: ['th-kneel-up-s', 'kneel'], ac1: ['ac1-kneel-up', 'kneel'], ac2: ['ac2-kneel-up', 'kneel'], cr: ['cr-kneel-up', 'kneel'], mc: ['mc-kneel-up-s', 'kneel']
        }, true),
        missal: 'm-canon',
        routes: [
          { who: 'th', via: ['th-seat', { x: 330, y: 158 }, { x: 182, y: 158 }, 'th-line-s', 'th-kneel-up-s'], genuflect: ['th-line-s'] },
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 156 }, { x: 206, y: 156 }, 'ac1-line', 'ac1-kneel-up'], genuflect: ['ac1-line'] },
          { who: 'ac2', via: ['ac2-cred', { x: 372, y: 158 }, { x: 230, y: 158 }, 'ac2-line', 'ac2-kneel-up'], genuflect: ['ac2-line'] },
          { who: 'cr', via: ['cr-bench', { x: 60, y: 176 }, { x: 254, y: 176 }, 'cr-line', 'cr-kneel-up'], genuflect: ['cr-line'] },
          { who: 'mc', via: ['mc-epistle-floor', 'mc-line-s', 'mc-kneel-up-s'], genuflect: ['mc-line-s'] }
        ],
        mc: {
          do: [
            'When the priest has drunk the Precious Blood, signal all to rise. The thurifer leads the servers into a line at the foot of the altar: thurifer, first acolyte, second acolyte, crucifer, and you at the Epistle end.',
            'When they are in line, signal the genuflection, then kneel.',
            'When the subdeacon and deacon have received Communion, signal all to rise, and go up at once and kneel on the footpace.',
            'After your Communion stay on the footpace and signal the others to genuflect and go back to their places.'
          ],
          auth: 'local', cite: [ss('MC §14'), ['FORT', 'p. 98']]
        },
        th: {
          do: [
            'When the MC signals all to rise, take the Communion paten from the credence and lead the first acolyte, second acolyte and crucifer to the middle. Go behind the MC to your place at the Gospel end of the line.',
            'Genuflect, then kneel, at the MC\'s signals.',
            'When the subdeacon and deacon have received, rise at the MC\'s signal and go up at once to kneel on the footpace.',
            'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'
          ],
          auth: 'local', cite: [ss('Thurifer §5'), ['FORT', 'p. 98']]
        },
        ac1: {
          do: [
            'Ring once at each of the priest\'s *Dómine, non sum dignus*.',
            'When the priest has drunk the Precious Blood, rise with the MC and follow the thurifer in single file to the front of the altar, going behind the MC to your place.',
            'Genuflect, then kneel, at the MC\'s signals. When the subdeacon and deacon have received, rise and go up at once to kneel on the footpace.',
            'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'
          ],
          bell: { rings: '3', auth: 'custom', note: 'Not in the Missal; a tolerated custom (Fortescue p. 80). Fortescue would not ring at High Mass at all except at the *Sanctus* and elevations.', cite: [ss('Acolytes and Crucifer §5'), ['FORT', 'pp. 80, 104–105']] },
          auth: 'local', cite: [ss('Acolytes and Crucifer §5–6'), ['FORT', 'p. 98']]
        },
        ac2: {
          do: [
            'When the priest has drunk the Precious Blood, rise with the MC and follow the first acolyte to the front of the altar, going behind the MC to your place.',
            'Genuflect, then kneel, at the MC\'s signals. When the subdeacon and deacon have received, rise and go up at once to kneel on the footpace.',
            'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'
          ],
          auth: 'local', cite: [ss('Acolytes and Crucifer §6'), ['FORT', 'p. 98']]
        },
        cr: {
          do: [
            'When the priest has drunk the Precious Blood, rise with the MC and follow the acolytes to the front of the altar, going behind the MC to your place.',
            'Genuflect, then kneel, at the MC\'s signals. When the subdeacon and deacon have received, rise and go up at once to kneel on the footpace.',
            'After Communion rise, come down turning toward the middle, genuflect, and go back to your place and kneel.'
          ],
          auth: 'local', cite: [ss('Acolytes and Crucifer §6')]
        },
        tb: {
          do: ['If you receive Communion, hand your torch to someone to hold while you do.'],
          auth: 'manual', cite: [['FORT', 'p. 98']]
        }
      },
      {
        id: 'people-communion', part: 'communion', short: 'People\'s Communion', title: 'Communion of the people',
        place: places('kneel', { p: ['p-rail', null, 'people'], d: ['d-rail', null, 'people'], mc: ['mc-rail-s', 'stand'], tb1: ['tb1-rail', 'kneel'], tb2: ['tb2-line', 'kneel'], tb3: ['tb3-line', 'kneel'], tb4: ['tb4-rail', 'kneel'] }),
        missal: 'm-canon',
        routes: [{ who: 'tb1', via: ['tb1-line', { x: 100, y: 186 }, 'tb1-rail'] }, { who: 'tb4', via: ['tb4-line', { x: 360, y: 186 }, 'tb4-rail'] }],
        mc: {
          do: [
            'Lead the priest down to give Communion to the people, and stand at the deacon\'s right while it is given.',
            'When you come back to the sanctuary, kneel at once at your place. When the tabernacle is locked, signal all to rise, and make sure the acolytes do their part from here.'
          ],
          auth: 'local', cite: [ss('MC §14')]
        },
        th: { do: ['If a second priest gives Communion, lead him down the Epistle side to the people with a paten. When he has finished, give him the paten, come back up the middle, genuflect, and kneel at your place.'], auth: 'local', cite: [ss('Thurifer §5, note')] },
        tb: {
          do: [
            'The two outside torchbearers go down at once to the far ends of the altar rail on their side and kneel there until Communion is over, the torch on the side away from the altar.',
            'When the last person has received, both rise together and go back to their places, kneeling without genuflecting.'
          ],
          auth: 'local', cite: [ss('Torchbearers, Communion and General Guidelines')]
        }
      },
      {
        id: 'ablutions', part: 'communion', short: 'Ablutions', title: 'The ablutions',
        place: places('stand', {
          p: ['p-epistle', null, 'epistle'], d: 's-missal-gospel', sd: 'sd-pours', mc: ['mc-corner-s', 'stand'],
          ac1: ['ac1-floor', 'stand', null, 'brings the cruets'], ac2: ['ac2-veil-wait', 'stand', null, 'holds the chalice veil']
        }),
        missal: 'm-canon',
        routes: [
          { who: 'ac1', via: ['ac1-cred', { x: 372, y: 100 }, 'ac1-altar', 'ac1-floor'] },
          { who: 'ac2', via: ['ac2-cred', 'ac2-veil-wait'] }
        ],
        ac1: {
          do: [
            'When the priest locks the tabernacle, rise and take the cruets, on their dish and without their stoppers, to the Epistle end of the altar. Wait on the floor.',
            'The subdeacon pours. When the cruets are back on the dish, take them off the altar, put them on the credence, and go to your place.'
          ],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §7A'), ['MR62', 'Rit. serv. X.8'], ['FORT', 'p. 97']]
        },
        ac2: {
          do: ['When the priest locks the tabernacle, rise, take the chalice veil from the credence, and stand at the MC\'s right.', 'Wait for the deacon to take the missal from the Gospel side.'],
          auth: 'local', cite: [ss('Acolytes and Crucifer §7B'), ['FORT', 'p. 97']]
        },
        th: { do: ['When the tabernacle is closed, signal the torchbearers to rise, lead them out to put the torches away, and lead them back to their places.'], auth: 'local', cite: [ss('Torchbearers, Communion')] },
        tb: { do: ['When the tabernacle door closes, rise at the thurifer\'s signal, come to the middle two by two, genuflect, and take your torches out. Come back to your places led by the thurifer.'], auth: 'local', cite: [ss('Torchbearers, Communion')] }
      },
      {
        id: 'missal-veil', part: 'end', short: 'Missal and veil', title: 'The missal and the chalice veil',
        place: places('stand', {
          p: 'p-epistle', d: 'd-behind-epistle', sd: 'sd-build', mc: ['mc-missal', 'stand'],
          ac2: ['ac2-build-s', 'stand', null, 'helps with the chalice']
        }),
        missal: 'm-epistle',
        routes: [
          { who: 'ac2', via: ['ac2-veil-wait', { x: 372, y: 140 }, { x: 230, y: 150 }, { x: 120, y: 130 }, 'ac2-build-s'], genuflect: [{ x: 230, y: 150 }] },
          { who: 'mc', via: ['mc-corner-s', 'mc-missal'] }
        ],
        mc: {
          do: [
            'When the deacon crosses the middle with the missal, follow (after his genuflection) to the Epistle side.',
            'Open the book if needed and point out the Communion antiphon. After *Dóminus vobíscum* bow toward the tabernacle with the priest at *Orémus*, and point out the Postcommunion.',
            'Close the book after the last Postcommunion and its conclusion.'
          ],
          auth: 'manual', cite: [ss('MC §15A'), ['FORT', 'p. 105']]
        },
        ac2: {
          do: [
            'When the deacon comes down with the missal, go behind the MC and genuflect behind the subdeacon, who is in line with the deacon.',
            'Go round the bottom step to the Gospel side with the veil, and help the subdeacon with the burse and veil while the chalice is covered.',
            'When it is done, go back to the credence with the subdeacon, genuflecting behind the subdeacon as you cross the middle, and go to your place.'
          ],
          auth: 'local', cite: [ss('Acolytes and Crucifer §7B'), ['FORT', 'p. 97']]
        }
      },
      {
        id: 'blessing', part: 'end', short: 'Blessing', title: 'Ite, missa est and the blessing',
        place: places('kneel', { p: ['p-center', null, 'people'], d: 'd-elev', mc: ['mc-epistle-floor', 'kneel'] }),
        missal: 'm-epistle',
        mc: {
          do: ['After the deacon sings *Ite, missa est*, signal all to kneel for the blessing, and kneel at the Epistle side.', 'Signal all to rise for the Last Gospel.'],
          auth: 'manual', cite: [ss('MC §15B'), ['MR62', 'Rit. serv. XI.3'], ['FORT', 'p. 105']]
        },
        th: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [ss('MC §15B'), ['FORT', 'p. 97']] },
        ac1: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [ss('MC §15B'), ['FORT', 'p. 97']] },
        ac2: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [ss('MC §15B'), ['FORT', 'p. 97']] },
        cr: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [ss('MC §15B'), ['FORT', 'p. 97']] },
        tb: { do: ['Kneel for the blessing where you are.'], auth: 'manual', cite: [ss('MC §15B'), ['FORT', 'p. 97']] }
      },
      {
        id: 'last-gospel', part: 'end', short: 'Last Gospel', title: 'The Last Gospel: line up to leave',
        place: places('stand', {
          p: 'p-gospel', d: 'd-elev', mc: ['mc-epistle-floor', 'stand', 'gospel', 'faces the priest'],
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
          do: [
            'Face the priest, and genuflect with him at *Et Verbum caro factum est*. Make sure the servers move into place after signing themselves.',
            'When the Last Gospel ends, fetch the birettas from the sedilia. Give the priest\'s and the deacon\'s to the deacon, and the subdeacon\'s to the subdeacon.'
          ],
          auth: 'manual', cite: [ss('MC §16'), ['FORT', 'p. 105']]
        },
        th: { do: ['After signing yourself at the start of the Last Gospel, go to your place behind the acolytes, facing the altar.', 'Genuflect at *Et Verbum caro factum est*, and again at the MC\'s signal.'], auth: 'manual', cite: [ss('Thurifer §6A'), ['FORT', 'p. 94']] },
        ac1: {
          do: ['After signing yourself at the start of the Last Gospel, take your candle and go to the middle, at the crucifer\'s right.', 'Walking with the cross, you do not genuflect: at *Et Verbum caro factum est* and at the MC\'s last signal make a simple bow of the head.'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 97']]
        },
        ac2: {
          do: ['After signing yourself at the start of the Last Gospel, take your candle and go to the middle, at the crucifer\'s left.', 'Walking with the cross, you do not genuflect: at *Et Verbum caro factum est* and at the MC\'s last signal make a simple bow of the head.'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 97']]
        },
        cr: {
          do: ['After signing yourself at the start of the Last Gospel, take the cross and stand in the middle between the acolytes.', 'You never genuflect while carrying the cross: stand still when the others genuflect.'],
          auth: 'manual', cite: [ss('Acolytes and Crucifer §8'), ['FORT', 'pp. 22, 86']]
        },
        tb: { do: ['After signing yourselves, go to the middle and line up in front of the acolytes.', 'Genuflect at *Et Verbum caro factum est*, and again at the MC\'s signal.'], auth: 'local', cite: [ss('Torchbearers, Recession')] }
      },
      {
        id: 'recession', part: 'end', short: 'Recession', title: 'Back to the sacristy',
        place: places('stand', {
          p: 'p-foot', d: 'd-foot', sd: 'sd-foot', mc: ['mc-foot-right', 'stand'],
          tb1: ['tb1-front', 'stand'], tb2: ['tb2-front', 'stand'], tb3: ['tb3-front', 'stand'], tb4: ['tb4-front', 'stand'],
          ac2: ['ac2-recess', 'stand'], cr: ['cr-mid', 'stand'], ac1: ['ac1-recess', 'stand'], th: ['th-recess', 'stand', 'people', 'leads out']
        }),
        missal: 'm-epistle',
        routes: [{ who: 'th', via: ['th-recess', { x: 330, y: 204 }, 's-sacristy'], shorten: 0 }],
        mc: {
          do: [
            'Signal all to genuflect, then lead the ministers out.',
            'In the sacristy signal all to bow to the cross; when the ministers have bowed to one another, signal all to bow to the priest. Kneel for the blessing.'
          ],
          auth: 'manual', cite: [ss('MC §16C–17'), ['FORT', 'p. 105']]
        },
        th: { do: ['Turn round and lead the procession out.', 'In the sacristy bow to the cross with the ministers and kneel for the blessing. Then put the thurible away, refill the boat, and clear up after the coals.'], auth: 'local', cite: [ss('Thurifer §6')] },
        ac1: { do: ['Turn in toward the crucifer and walk out behind the thurifer.', 'In the sacristy stand beside the crucifer for the blessing.', 'Then clear the altar, put its cover back on, and put out the candles.'], auth: 'local', cite: [ss('Acolytes and Crucifer §8–9')] },
        ac2: { do: ['Turn in toward the crucifer and walk out behind the thurifer.', 'In the sacristy stand beside the crucifer for the blessing.', 'Then clear the credence and wash the cruets and the Lavabo dish.'], auth: 'local', cite: [ss('Acolytes and Crucifer §8–9')] },
        cr: { do: ['Walk out between the acolytes, behind the thurifer.', 'In the sacristy stand for the blessing, then put the cross back in its place.'], auth: 'local', cite: [ss('Acolytes and Crucifer §9')] },
        tb: { do: ['Follow the acolytes out.', 'In the sacristy line up facing the cross, bow, and kneel for the blessing.'], auth: 'local', cite: [ss('Torchbearers, Recession')] }
      }
    ]
  });
})();
