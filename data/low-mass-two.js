/* Low Mass with two servers, step by step: the first server (Acolyte 1) and
   the second server (Acolyte 2). Built from FSSP Omaha's sheet "Low Mass, Two
   Servers" (cited by its numbered sections) and Fortescue (1920) pp. 82-83.
   Research: research/positions.md, "Low Mass with two servers".

   place:   where everyone is at the end of the step ('p' priest, 'a1', 'a2'),
            as a place name or [place, posture, facing, tag]
   sayFrom: the responses are the same words as at Low Mass with one server,
            so they are taken from those steps rather than written twice
   a1 / a2: what each server does */
SERVING.forms = SERVING.forms || [];
SERVING.forms.push({
  key: 'low2', name: 'Low Mass with two servers', short: 'Low Mass, two servers', kind: 'low',
  roles: [
    { key: 'a1', name: 'First server (Acolyte 1)', figures: ['a1'] },
    { key: 'a2', name: 'Second server (Acolyte 2)', figures: ['a2'] }
  ],
  options: ['confiteor', 'bells131', 'sermon', 'creed', 'leonine'],
  intro: 'Two servers share the work of one. Each keeps a corner of the lowest step: the first server the Epistle corner, the second the Gospel corner. You answer every response together.',
  steps: [

    // ------------------------------------------------------------ before Mass
    {
      id: 'prepare', part: 'before', short: 'Prepare', title: 'Get ready in the sacristy',
      place: { a1: ['s-credence', 'stand'], a2: ['ac2-cred', 'stand'] },
      missal: 'm-epistle',
      a1: {
        do: [
          'Vest in cassock and surplice, and wash your hands.',
          'Set out the cruets, the dish and towel, the bell and the Communion paten on the credence.',
          'Help the priest vest.',
          'At the sacristy door offer holy water to the priest, then to the second server, and ring the sacristy bell as you go out.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers: Preparation; Procession'], ['FORT', 'pp. 76–77, 82']]
      },
      a2: {
        do: [
          'Vest in cassock and surplice, and wash your hands.',
          'Help get the credence and the altar ready; the two candles are lit, the Epistle side first.',
          'Take holy water from the first server at the sacristy door.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers: Preparation; Procession'], ['FORT', 'pp. 77, 82']]
      }
    },
    {
      id: 'arrive', part: 'before', short: 'Arrival', title: 'Lead the priest in and take your places',
      place: { p: 'p-foot', a1: ['s-beside-right', 'stand'], a2: ['s-beside-left', 'stand'] },
      missal: 'm-epistle',
      routes: [
        { who: 'a1', via: ['s-sacristy', { x: 330, y: 160 }, 's-beside-right'] },
        { who: 'a2', via: ['s-sacristy', { x: 300, y: 172 }, { x: 214, y: 150 }, 's-beside-left'] }
      ],
      a1: {
        do: [
          'Walk in ahead of the priest, shoulder to shoulder with the second server: you on the right.',
          'At the foot of the altar take the biretta, kissing first the priest\'s hand, then the biretta.',
          'Genuflect with him, and hold up his alb as he goes up the steps to set down the chalice.',
          'Take the biretta to the sedilia (not the credence) and come back beside him.',
          'When he comes back down and genuflects, kneel.'
        ],
        notes: ['The kisses are left out at Requiems and when the Blessed Sacrament is exposed.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §1'], ['FORT', 'pp. 76–77']]
      },
      a2: {
        do: [
          'Walk in ahead of the priest, shoulder to shoulder with the first server: you on the left.',
          'Genuflect with the priest at the foot of the altar, and hold up his alb as he goes up the steps.',
          'Wait while the first server takes the biretta away. When the priest comes back down and genuflects, kneel.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §1']]
      }
    },

    // ------------------------------------------------------------ prayers at the foot
    {
      id: 'foot', part: 'foot', short: 'Psalm 42', title: 'Kneel behind the priest and answer',
      latin: 'Introibo ad altare Dei. Psalmus 42',
      place: { p: 'p-foot', a1: ['s-foot-epistle', 'kneel'], a2: ['s-foot-gospel', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['introibo', 'psalm'],
      a1: {
        do: ['Kneel on the floor behind the priest, at his right.', 'Sign yourself with him at *In nómine Patris*.', 'Answer every other verse of the psalm together with the second server. Bow your head at *Glória Patri*.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §2'], ['FORT', 'pp. 77, 82'], ['MR62', 'Rit. serv. III.6']]
      },
      a2: {
        do: ['Kneel on the floor behind the priest, at his left.', 'Sign yourself with him at *In nómine Patris*.', 'Answer every other verse of the psalm together with the first server. Bow your head at *Glória Patri*.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §2'], ['FORT', 'pp. 77, 82'], ['MR62', 'Rit. serv. III.6']]
      },
      notes: ['The psalm is left out at Requiems and in Passiontide Masses of the season.']
    },
    {
      id: 'confiteor', part: 'foot', short: 'Confiteor', title: 'The Confiteor',
      latin: 'Confiteor. Misereatur',
      place: { p: 'p-foot', a1: ['s-foot-epistle', 'kneel'], a2: ['s-foot-gospel', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['misereatur', 'confiteor'],
      a1: {
        do: [
          'Sign yourself at *Adiutórium nostrum*.',
          'Right after the priest\'s Confiteor, bow low. Turn toward him for the *Misereátur*.',
          'Say the Confiteor, turning to him at *tibi, pater* and *te, pater*, and strike your breast three times at *mea culpa*.',
          'At the *Amen* before *Indulgéntiam* kneel upright again, and sign yourself at *Indulgéntiam*.'
        ],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §2A'], ['MR62', 'Rit. serv. III.9']]
      },
      a2: {
        do: [
          'Sign yourself at *Adiutórium nostrum*.',
          'Right after the priest\'s Confiteor, bow low. Turn toward him for the *Misereátur*.',
          'Say the Confiteor, turning to him at *tibi, pater* and *te, pater*, and strike your breast three times at *mea culpa*.',
          'At the *Amen* before *Indulgéntiam* kneel upright again, and sign yourself at *Indulgéntiam*.'
        ],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §2A'], ['MR62', 'Rit. serv. III.9']]
      }
    },
    {
      id: 'corners', part: 'foot', short: 'To your corners', title: 'Go to your corners of the lowest step',
      latin: 'Deus, tu conversus',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      routes: [
        { who: 'a1', via: ['s-foot-epistle', { x: 330, y: 126 }, 'a1-corner'] },
        { who: 'a2', via: ['s-foot-gospel', { x: 130, y: 126 }, 'a2-corner'] }
      ],
      sayFrom: ['versicles'],
      a1: {
        do: ['Bow your head from *Deus, tu convérsus* until the priest goes up.', 'Rise as he goes up, then go to the Epistle corner of the lowest step and kneel, together with the second server.'],
        notes: ['From here your place is the Epistle corner of the lowest step.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §2A–B']]
      },
      a2: {
        do: ['Bow your head from *Deus, tu convérsus* until the priest goes up.', 'Rise as he goes up, then go to the Gospel corner of the lowest step and kneel, together with the first server.'],
        notes: ['From here your place is the Gospel corner of the lowest step.', 'Fortescue (1920) instead has the second server always on the side opposite the first, so the two change sides as the first moves.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §2B'], ['FORT', 'p. 82']]
      }
    },

    // ------------------------------------------------------------ Mass of the Catechumens
    {
      id: 'kyrie', part: 'catechumens', short: 'Introit, Kyrie', title: 'Introit and Kyrie',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['kyrie'],
      a1: { do: ['Sign yourself when the priest begins the Introit.', 'Alternate the Kyrie with him, together with the second server.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §3–4'], ['MR62', 'Rit. serv. IV.2']] },
      a2: { do: ['Sign yourself when the priest begins the Introit.', 'Alternate the Kyrie with him, together with the first server.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §3–4'], ['MR62', 'Rit. serv. IV.2']] }
    },
    {
      id: 'collects', part: 'catechumens', short: 'Gloria, collects', title: 'Gloria and the collects',
      place: { p: ['p-center', null, 'people'], a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['collects'],
      a1: { do: ['Do not say the Gloria with the priest. Sign yourself when he signs himself at the end.', 'Answer *Amen* at the end of the collect. With more than one, answer after the first and the last.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §5–6'], ['CR60', 'nn. 435–437']] },
      a2: { do: ['Do not say the Gloria with the priest. Sign yourself when he signs himself at the end.', 'Answer *Amen* at the end of the collect. With more than one, answer after the first and the last.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §5–6'], ['CR60', 'nn. 435–437']] }
    },
    {
      id: 'epistle', part: 'catechumens', short: 'Epistle', title: 'The Epistle',
      place: { p: 'p-epistle', a1: ['s-epistle-floor', 'stand'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      routes: [{ who: 'a1', via: ['a1-corner', { x: 372, y: 124 }, 's-epistle-floor'] }],
      sayFrom: ['epistle'],
      a1: {
        do: ['When the priest lays his left hand on the altar, answer *Deo grátias* with the second server.', 'Rise and go, round the lowest step, to the Epistle side, and stand near the priest while he reads the Gradual.'],
        notes: ['Check before Mass how long the Gradual is, so you can time getting up.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §7–8']]
      },
      a2: {
        do: ['Watch for the priest\'s left hand on the altar: from your side you see it best, so lead the *Deo grátias*.', 'Stay kneeling at your corner.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §7A']]
      }
    },
    {
      id: 'missal', part: 'catechumens', short: 'Missal across', title: 'The missal goes to the Gospel side',
      latin: 'Translatio Missalis',
      place: { p: 'p-center', a1: ['s-gospel-book', 'stand', null, 'stands by the book'], a2: ['a2-corner', 'stand'] },
      missal: 'm-gospel',
      routes: [{ who: 'a1', via: ['s-epistle-floor', 's-missal-epistle', 's-center-floor', 's-missal-gospel', 's-gospel-book'], genuflect: ['s-center-floor'], carrying: 'missal', shorten: 12 }],
      a1: {
        do: [
          'When the priest finishes the Gradual and goes to the middle, take the missal.',
          'Go straight down to the middle on the floor and genuflect, holding the book.',
          'Set it at the Gospel corner at an angle, its pages facing the middle.',
          'Wait at the Gospel side, standing on the first step down from the footpace.'
        ],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §8–9A'], ['MR62', 'Rit. serv. VI.1']]
      },
      a2: {
        do: ['Stand up when the first server genuflects with the missal in the middle.', 'Stay standing at your corner.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §8A']]
      }
    },
    {
      id: 'gospel', part: 'catechumens', short: 'Gospel', title: 'The Gospel',
      place: { p: 'p-gospel', a1: ['a1-corner', 'stand', null, 'stands, facing the missal'], a2: ['a2-corner', 'stand'] },
      missal: 'm-gospel',
      routes: [{ who: 'a1', via: ['s-gospel-book', { x: 116, y: 128 }, 's-center-floor', 'a1-corner'], genuflect: ['s-center-floor'] }],
      sayFrom: ['gospel-begin', 'gospel'],
      a1: {
        do: [
          'Make the three small crosses with the priest at *Sequéntia sancti Evangélii*.',
          'Wait for the Holy Name in the opening lines and bow. If it is not in the first two sentences, leave after a short pause.',
          'Turn to your left, go down, cross in front of the second server (genuflecting at the middle) and stand at your Epistle corner, facing the missal.',
          'Answer *Laus tibi, Christe* when the priest lifts the book to kiss it, and kneel at once.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §9'], ['MR62', 'Rit. serv. VI.2']]
      },
      a2: {
        do: [
          'Make the three small crosses with the priest.',
          'Stay standing at your corner. Do not step back to let the first server pass in front of you.',
          'Answer *Laus tibi, Christe*, and kneel at once.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §9']]
      }
    },
    {
      id: 'sermon', opt: 'sermon', part: 'catechumens', short: 'Sermon (if any)', title: 'If there is a sermon',
      place: { a1: ['a1-stool', 'sit'], a2: ['a2-stool', 'sit'] },
      missal: 'm-gospel',
      a1: { do: ['Stand as the priest comes down, and genuflect with him in the middle.', 'Let him pass, then sit on the stools at the Epistle side, you to the right of the second server.', 'After the sermon rise, genuflect with him in the middle, and go back to kneel at your corner.'], auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §9B']] },
      a2: { do: ['Stand as the priest comes down, and genuflect with him in the middle.', 'Let him pass, then sit on the stools at the Epistle side, at the first server\'s left.', 'After the sermon rise, genuflect with him in the middle, and go back to kneel at your corner.'], auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §9B']] }
    },
    {
      id: 'creed', opt: 'creed', part: 'catechumens', short: 'Creed (if said)', title: 'The Creed',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      a1: { do: ['Kneel at your corner.', 'Bow low while the priest genuflects at *Et incarnátus est*.', 'Sign yourself with him at *Et vitam ventúri sǽculi*.'], auth: 'manual', cite: [['FSSPOM', 'Low Mass, two servers §10'], ['FORT', 'p. 78']] },
      a2: { do: ['Kneel at your corner.', 'Bow low while the priest genuflects at *Et incarnátus est*.', 'Sign yourself with him at *Et vitam ventúri sǽculi*.'], auth: 'manual', cite: [['FSSPOM', 'Low Mass, two servers §10'], ['FORT', 'p. 78']] }
    },

    // ------------------------------------------------------------ Offertory
    {
      id: 'offertory', part: 'offertory', short: 'Offertory', title: 'Cruets and the chalice veil',
      latin: 'Offertorium',
      place: { p: 'p-center', a1: ['a1-wait', 'stand'], a2: ['a2-veil', 'stand', null, 'folds the veil'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['a1-corner', { x: 300, y: 128 }, 's-center-floor', { x: 330, y: 140 }, 's-credence', 'a1-wait'], genuflect: ['s-center-floor'] },
        { who: 'a2', via: ['a2-corner', { x: 160, y: 128 }, 's-center-floor', 'a2-veil'], genuflect: ['s-center-floor'] }
      ],
      sayFrom: ['cruets'],
      a1: {
        do: [
          'After *Dóminus vobíscum* and *Orémus*, rise with the second server, go to the middle and genuflect together.',
          'Go to the credence, take both cruets, and go to the side steps at the Epistle side.',
          'Hand the water cruet to the second server when you are joined.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §11A']]
      },
      a2: {
        do: [
          'After *Dóminus vobíscum* and *Orémus*, rise with the first server, go to the middle and genuflect together.',
          'Go straight up the middle and take the chalice veil from the priest, leaving room so you can lay it at least halfway to the Epistle corner.',
          'Fold it in three, lay it down, and come down the side steps to the first server\'s left. Take the water cruet from the first server.'
        ],
        notes: ['If the Offertory verse is long, you can go round and up the Epistle side steps instead.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §11A']]
      }
    },
    {
      id: 'cruets', part: 'offertory', short: 'Cruets', title: 'Present the cruets',
      place: { p: ['p-epistle', null, 'epistle'], a1: ['a1-cruets', 'stand'], a2: ['a2-cruets', 'stand'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['a1-wait', 'a1-cruets'] },
        { who: 'a2', via: ['a2-veil', { x: 330, y: 92 }, 'a2-wait', 'a2-cruets'] }
      ],
      a1: {
        do: [
          'Wait with the second server at the Epistle side.',
          'When the priest turns toward you, bow your head, go up to the top step, kiss the wine cruet and hand it to him in your right hand.',
          'Kiss it again when it comes back, bow, and go back to the credence.'
        ],
        notes: ['The rubric names the wine cruet: the server "kisses the cruet itself, not the hand of the celebrant" (Rit. serv. VII.4).'],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §11B'], ['MR62', 'Rit. serv. VII.4']]
      },
      a2: {
        do: [
          'Wait at the first server\'s left at the Epistle side.',
          'When the priest turns toward you, bow your head, go up, kiss the water cruet and hand it to him in your right hand. He pours only a little.',
          'Kiss it again when it comes back, bow, and go back to the credence.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §11B'], ['FORT', 'p. 82']]
      }
    },
    {
      id: 'lavabo', part: 'offertory', short: 'Lavabo', title: 'Wash the priest\'s fingers',
      latin: 'Lavabo',
      place: { p: ['p-epistle', null, 'epistle'], a1: ['a1-cruets', 'stand', null, 'towel'], a2: ['a2-cruets', 'stand', null, 'water and dish'] },
      missal: 'm-gospel',
      a1: {
        do: [
          'Take the towel from the credence and unfold it. If it has a cross, hold it so the priest sees the cross at the lower left.',
          'Go to the priest with the second server, bow, hand him the towel, take it back, and bow.',
          'Put it back, take the bell, and go back to your corner with the second server, genuflecting together in the middle.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §11C'], ['FORT', 'p. 82']]
      },
      a2: {
        do: [
          'Take the water cruet in your right hand and the dish in your left.',
          'Go to the priest with the first server, standing outside the front edge of the altar. Bow, and pour a little water over his fingertips into the dish.',
          'Bow, put them back, and go back to your corner with the first server, genuflecting together in the middle.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §11C'], ['FORT', 'p. 82']]
      }
    },
    {
      id: 'suscipiat', part: 'offertory', short: 'Suscipiat, Preface', title: 'Orate, fratres and the Preface',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['s-credence', { x: 330, y: 140 }, 's-center-floor', 'a1-corner'], genuflect: ['s-center-floor'] },
        { who: 'a2', via: ['s-credence', { x: 330, y: 140 }, 's-center-floor', 'a2-corner'], genuflect: ['s-center-floor'] }
      ],
      sayFrom: ['suscipiat', 'preface'],
      a1: { do: ['Kneel at your corner.', 'When the priest has turned back to the altar, bow and answer the *Suscípiat* with the second server.', 'Answer the Preface dialogue.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §12'], ['MR62', 'Rit. serv. VII.7–8']] },
      a2: { do: ['Kneel at your corner.', 'When the priest has turned back to the altar, bow and answer the *Suscípiat* with the first server.', 'Answer the Preface dialogue.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §12'], ['MR62', 'Rit. serv. VII.7–8']] }
    },

    // ------------------------------------------------------------ Sanctus and Canon
    {
      id: 'sanctus', part: 'canon', short: 'Sanctus', title: 'The Sanctus',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      a1: {
        do: ['Ring the bell three times at the *Sanctus*.', 'Sign yourself with the priest at *Benedíctus qui venit*.'],
        bell: { rings: '3', auth: 'rubric', note: 'Required by the rubric (Rit. serv. VII.8); three is the usual count.', cite: [['MR62', 'Rit. serv. VII.8'], ['FSSPOM', 'Low Mass, two servers §13']] },
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §13'], ['MR62', 'Rit. serv. VII.8']]
      },
      a2: { do: ['Sign yourself with the priest at *Benedíctus qui venit*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §13']] }
    },
    {
      id: 'hanc-igitur', part: 'canon', short: 'Go up', title: 'The warning bell, and up to the footpace',
      latin: 'Hanc igitur',
      place: { p: 'p-center', a1: ['s-consecration', 'kneel'], a2: ['s-consecration-left', 'kneel'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['a1-corner', { x: 300, y: 128 }, 's-center-floor', 's-consecration'] },
        { who: 'a2', via: ['a2-corner', { x: 160, y: 128 }, 's-center-floor', 's-consecration-left'] }
      ],
      a1: {
        do: [
          'Ring once at the *Hanc ígitur*, when the priest spreads his hands over the chalice.',
          'When he takes his hands away, rise with the bell, meet the second server in the middle, and go up together without genuflecting.',
          'Kneel on the footpace at the priest\'s right.'
        ],
        bell: { rings: '1', auth: 'rubric', dy: -24, note: 'Since 1962 the rubric asks for a warning bell shortly before the Consecration (Rit. serv. VIII.6); the *Hanc ígitur* is the usual moment.', cite: [['MR62', 'Rit. serv. VIII.6'], ['FSSPOM', 'Low Mass, two servers §14A']] },
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §14A'], ['MR62', 'Rit. serv. VIII.6']]
      },
      a2: {
        do: ['When the priest takes his hands away from over the chalice, rise, meet the first server in the middle, and go up together without genuflecting.', 'Kneel on the footpace at the priest\'s left.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §14A'], ['FORT', 'p. 82']]
      }
    },
    {
      id: 'consecration', part: 'canon', short: 'Consecration', title: 'The Consecration',
      latin: 'Consecratio',
      place: { p: 'p-center', a1: ['s-consecration', 'kneel'], a2: ['s-consecration-left', 'kneel'] },
      missal: 'm-gospel',
      a1: {
        do: [
          'At each elevation lift the back of the chasuble a little with your left hand. Not too high: his cincture should not show.',
          { t: 'Ring once as he genuflects, three times as he raises the Host, once as he genuflects again. The same for the chalice.', if: 'bells131' },
          { t: 'Ring three times as he raises the Host, and three times as he raises the chalice.', unless: 'bells131' },
          'Bow low while he genuflects.'
        ],
        bell: { rings: '3 each, or 1-3-1', auth: 'rubric', dy: -24, note: 'The rubric: "three times at each elevation, or continuously" (Rit. serv. VIII.6). 1-3-1 is the usual pattern today.', cite: [['MR62', 'Rit. serv. VIII.6'], ['FSSPOM', 'Low Mass, two servers §14B']] },
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §14B'], ['MR62', 'Rit. serv. VIII.6']]
      },
      a2: {
        do: ['At each elevation lift the back of the chasuble a little. Not too high: his cincture should not show.', 'Bow low while he genuflects.'],
        auth: 'manual', cite: [['FSSPOM', 'Low Mass, two servers §14B'], ['FORT', 'p. 82']]
      }
    },
    {
      id: 'after-elevation', part: 'canon', short: 'Back to your corner', title: 'Back to your corners',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['s-consecration', { x: 244, y: 110 }, 's-center-floor', 'a1-corner'], genuflect: ['s-center-floor'] },
        { who: 'a2', via: ['s-consecration-left', { x: 216, y: 110 }, 's-center-floor', 'a2-corner'], genuflect: ['s-center-floor'] }
      ],
      a1: { do: ['After the chalice is put down and the priest has genuflected, rise together with the second server.', 'Come down to the middle, genuflect, and go back to your corner and kneel.'], auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §14C']] },
      a2: { do: ['After the chalice is put down and the priest has genuflected, rise together with the first server.', 'Come down to the middle, genuflect, and go back to your corner and kneel.'], auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §14C']] }
    },

    // ------------------------------------------------------------ Communion
    {
      id: 'pater', part: 'communion', short: 'Pater, Agnus Dei', title: 'Pater noster and Agnus Dei',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      sayFrom: ['pater'],
      a1: { do: ['Answer *Sed líbera nos a malo* and the rest.', 'Strike your breast when the priest strikes his at the *Agnus Dei*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §15–16'], ['MR62', 'Rit. serv. X.1–2']] },
      a2: { do: ['Answer *Sed líbera nos a malo* and the rest.', 'Strike your breast when the priest strikes his at the *Agnus Dei*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §15–16'], ['MR62', 'Rit. serv. X.1–2']] }
    },
    {
      id: 'priest-communion', part: 'communion', short: 'Priest\'s Communion', title: 'The priest\'s Communion',
      place: { p: 'p-center', a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-gospel',
      a1: {
        do: ['Ring once at each of the priest\'s three *Dómine, non sum dignus*, on the word *dignus*.', 'Bow low while he receives.'],
        bell: { rings: '3', auth: 'custom', note: 'Not in the Missal; a tolerated custom (Fortescue p. 80).', cite: [['FSSPOM', 'Low Mass, two servers §17A'], ['FORT', 'p. 80']] },
        auth: 'custom', cite: [['FSSPOM', 'Low Mass, two servers §17A'], ['FORT', 'p. 80']]
      },
      a2: { do: ['Bow low while the priest receives Communion.'], auth: 'manual', cite: [['FORT', 'p. 80']] }
    },
    {
      id: 'communion', part: 'communion', short: 'Your Communion', title: 'Your Communion',
      latin: 'Ecce Agnus Dei',
      place: { p: ['p-center', null, 'people'], a1: ['a1-communion', 'kneel'], a2: ['a2-communion', 'kneel'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['a1-corner', 's-credence', { x: 330, y: 140 }, 'a1-line', 'a1-communion'], genuflect: ['a1-line'] },
        { who: 'a2', via: ['a2-corner', { x: 160, y: 132 }, 'a2-line', 'a2-communion'], genuflect: ['a2-line'] }
      ],
      sayFrom: ['server-communion'],
      a1: {
        do: [
          'When the priest has drunk the Precious Blood, rise and take the paten from the credence.',
          'Meet the second server (and any other servers) at the foot of the altar, genuflect together, go up and kneel on the top step.',
          { t: 'Bow low and say the Confiteor with the others.', if: 'confiteor' },
          'Receive Communion, then pass the paten to the second server and wait until the second server has received.',
          'Rise, step down to your right, genuflect, and kneel at your Epistle corner.'
        ],
        notes: [{ t: 'The 1962 rubric has no Confiteor here (Code n. 503); FSSP Omaha says it.', unless: 'confiteor' }],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §17B–C'], ['CR60', 'n. 503']]
      },
      a2: {
        do: [
          'When the priest has drunk the Precious Blood, rise and meet the first server at the foot of the altar. Take the Gospel end of the line.',
          'Genuflect together, go up and kneel on the top step.',
          { t: 'Bow low and say the Confiteor with the others.', if: 'confiteor' },
          'Take the paten from the first server and receive Communion.'
        ],
        notes: [{ t: 'The 1962 rubric has no Confiteor here (Code n. 503); FSSP Omaha says it.', unless: 'confiteor' }],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §17B–C'], ['CR60', 'n. 503']]
      }
    },
    {
      id: 'paten', part: 'communion', short: 'Paten at the rail', title: 'Communion of the people',
      place: { p: ['p-rail', null, 'people'], a1: ['a1-corner', 'kneel'], a2: ['s-rail', 'stand', null, 'holds the paten'] },
      missal: 'm-gospel',
      routes: [{ who: 'a2', via: [{ x: 314, y: 219 }, { x: 140, y: 219 }], shorten: 0 }],
      a1: { do: ['Kneel at your Epistle corner while Communion is given.'], auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §17C']] },
      a2: {
        do: [
          'Rise after your Communion, stand at the priest\'s right, and hold the paten flat under each communicant\'s chin.',
          'He starts at the Epistle end of the rail.',
          'When he goes back to the altar, hold up his alb as he climbs the steps, genuflect, and kneel at your Gospel corner.'
        ],
        auth: 'custom', cite: [['FSSPOM', 'Low Mass, two servers §17C'], ['MR62', 'Rit. serv. X.6–7']]
      }
    },
    {
      id: 'ablutions', part: 'communion', short: 'Ablutions', title: 'The ablutions',
      place: { p: ['p-epistle', null, 'epistle'], a1: ['a1-cruets', 'stand', null, 'wine'], a2: ['a2-cruets', 'stand', null, 'water'] },
      missal: 'm-gospel',
      routes: [
        { who: 'a1', via: ['a1-corner', { x: 300, y: 128 }, 's-center-floor', { x: 330, y: 140 }, 's-credence', 'a1-cruets'], genuflect: ['s-center-floor'] },
        { who: 'a2', via: ['a2-corner', { x: 160, y: 128 }, 's-center-floor', { x: 330, y: 140 }, 's-credence', 'a2-cruets'], genuflect: ['s-center-floor'] }
      ],
      a1: {
        do: [
          'When the priest locks the tabernacle, stand, meet the second server in the middle, genuflect, and go to the credence. Take the wine.',
          'Wait at the Epistle side steps. Go up alone and pour wine into the chalice when he tips it toward you, until he signals.',
          'Stand on the top step at the Epistle side; the second server joins you. Bow when the priest turns.',
          'Pour wine over his fingers, then let the second server pour the water.',
          'Bow, leave, put the cruets back, and pick up the paten.'
        ],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18A'], ['MR62', 'Rit. serv. X.5']]
      },
      a2: {
        do: [
          'When the priest locks the tabernacle, stand, meet the first server in the middle, genuflect, and go to the credence. Take the water.',
          'Wait at the Epistle side steps while the first server pours the first ablution.',
          'Join the first server on the top step. Bow when the priest turns.',
          'After the first server pours the wine over his fingers, pour the water.',
          'Bow, leave, and put the cruet back.'
        ],
        notes: ['Fortescue (1920) has the first server do both ablutions alone; this is FSSP Omaha\'s way.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §18A'], ['FORT', 'p. 83']]
      }
    },

    // ------------------------------------------------------------ after Communion
    {
      id: 'missal-veil', part: 'end', short: 'Missal and veil', title: 'The missal and the chalice veil',
      place: { p: 'p-center', a1: ['s-missal-epistle', 'stand', null, 'places the missal'], a2: ['a2-build', 'stand', null, 'helps with the chalice'] },
      missal: 'm-epistle',
      routes: [
        { who: 'a1', via: ['s-missal-gospel', 's-center-floor', 's-missal-epistle'], genuflect: ['s-center-floor'], carrying: 'missal', shorten: 10 },
        { who: 'a2', via: [{ x: 296, y: 80 }, { x: 290, y: 126 }, 's-center-floor', 'a2-build'], genuflect: ['s-center-floor'] }
      ],
      a1: {
        do: [
          'Go to the middle with the second server and genuflect, then round the lowest step to the Gospel side and take the missal.',
          'Meet the second server in the middle and genuflect together.',
          'Take the missal to the Epistle side and set it square, as at the beginning.',
          'Wait there until the second server has finished at the chalice.'
        ],
        auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18B'], ['MR62', 'Rit. serv. XI.1']]
      },
      a2: {
        do: [
          'Go to the middle with the first server and genuflect, then round to the Epistle side for the chalice veil, passing behind the first server.',
          'Meet the first server in the middle and genuflect together.',
          'Take the veil to the Gospel side and help the priest build the chalice: hold the burse while he puts the corporal in, hand him the veil, then the burse.'
        ],
        notes: ['Fortescue: "At Low Mass there is no serious authority for" carrying the chalice veil across (p. 81). This is FSSP Omaha\'s practice.'],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §18B'], ['FORT', 'pp. 81, 83']]
      }
    },
    {
      id: 'dismissal', part: 'end', short: 'Ite, missa est', title: 'Postcommunion and dismissal',
      place: { p: ['p-center', null, 'people'], a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['dismissal'],
      a1: { do: ['Go back to your corner and kneel.', 'Answer the *Dóminus vobíscum*, the *Amen* of the Postcommunion and the *Ite, missa est*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18C'], ['CR60', 'n. 507']] },
      a2: { do: ['Go back to your corner and kneel.', 'Answer the *Dóminus vobíscum*, the *Amen* of the Postcommunion and the *Ite, missa est*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18C'], ['CR60', 'n. 507']] }
    },
    {
      id: 'blessing', part: 'end', short: 'Blessing', title: 'The blessing',
      place: { p: ['p-center', null, 'people'], a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['blessing'],
      a1: { do: ['Sign yourself as the priest blesses, and answer *Amen*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18C'], ['MR62', 'Rit. serv. XII.1']] },
      a2: { do: ['Sign yourself as the priest blesses, and answer *Amen*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §18C'], ['MR62', 'Rit. serv. XII.1']] }
    },
    {
      id: 'last-gospel', part: 'end', short: 'Last Gospel', title: 'The Last Gospel',
      place: { p: 'p-gospel', a1: ['a1-corner', 'stand', 'gospel', 'faces the Gospel card'], a2: ['a2-corner', 'stand'] },
      missal: 'm-epistle',
      sayFrom: ['last-gospel'],
      a1: { do: ['Stand after the blessing, and make the three small crosses with the priest.', 'Face the Gospel altar card.', 'Genuflect with him at *Et Verbum caro factum est*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §19A–B'], ['MR62', 'Rit. serv. XII.1']] },
      a2: { do: ['Stand after the blessing, and make the three small crosses with the priest.', 'Genuflect with him at *Et Verbum caro factum est*.'], auth: 'rubric', cite: [['FSSPOM', 'Low Mass, two servers §19A–B'], ['MR62', 'Rit. serv. XII.1']] }
    },
    {
      id: 'leonine', opt: 'leonine', part: 'end', short: 'Leonine prayers', title: 'Prayers after Low Mass',
      place: { p: ['p-step', null, null, 'kneels'], a1: ['a1-corner', 'kneel'], a2: ['a2-corner', 'kneel'] },
      missal: 'm-epistle',
      sayFrom: ['leonine'],
      a1: { do: ['As soon as the Last Gospel ends, fetch the prayer card if the priest needs it.', 'Kneel at your corner and answer the prayers.'], auth: 'custom', cite: [['FSSPOM', 'Low Mass, two servers §19C'], ['FIUV24', 'paras. 5–12']] },
      a2: { do: ['Kneel at your corner and answer the prayers.'], auth: 'custom', cite: [['FSSPOM', 'Low Mass, two servers §19C'], ['FIUV24', 'paras. 5–12']] }
    },
    {
      id: 'recess', part: 'end', short: 'Back to the sacristy', title: 'Lead the priest back to the sacristy',
      place: { p: 'p-foot', a1: ['s-beside-right', 'stand'], a2: ['s-beside-left', 'stand'] },
      missal: 'm-epistle',
      routes: [
        { who: 'a1', via: ['s-beside-right', { x: 330, y: 160 }, 's-sacristy'], shorten: 0 },
        { who: 'a2', via: ['s-beside-left', { x: 214, y: 156 }, { x: 300, y: 176 }, 's-sacristy'], shorten: 0 }
      ],
      a1: {
        do: [
          'When the priest goes up for the chalice, put the prayer card back and fetch the biretta.',
          'Genuflect with him at the foot, and hand him the biretta: kiss the biretta first, then his hand.',
          'Walk out ahead of him, beside the second server.',
          'In the sacristy bow to the cross. When the priest says *Prosit*, answer *Pro omnibus et singulis*; say *Iube, domne, benedicere* and kneel for his blessing.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §19D–20'], ['MR62', 'Rit. serv. XII.6']]
      },
      a2: {
        do: [
          'Genuflect with the priest at the foot of the altar, and walk out ahead of him beside the first server.',
          'In the sacristy bow to the cross, answer *Pro omnibus et singulis* to his *Prosit*, and kneel for his blessing.',
          'Afterwards make your thanksgiving, then help clear the sanctuary.'
        ],
        auth: 'local', cite: [['FSSPOM', 'Low Mass, two servers §19D–20']]
      }
    }
  ]
});
