/* Low Mass with one server, step by step: the one copy of every instruction.
   The guide, the responses page, the charts and the checklist are all drawn from this.

   Each step:
     priest / server  { at: a place from POINTS in js/plan.js, posture, faces }
     missal           a missal place from POINTS
     routes           [{ via: [places], genuflect: [places], carrying: 'missal' }]
     do               what you do (shown in red)
     say              lines: { who: 'P' priest | 'S' you | 'B' all, la, en, times } or { who, cue }
                      ✠ in a line marks where you sign yourself with the priest
     bell             { rings, auth, note, cite }
     auth             how binding the step's main action is: rubric, custom, manual or local
     cite             [[source key, where]]: every step needs at least one
   The research behind every step is research/serving-the-tlm.md (section B). */
SERVING.lowMass = { steps: [

  // ------------------------------------------------------------------ before Mass
  {
    id: 'prepare', part: 'before', short: 'Prepare',
    title: 'Get the credence and the altar ready',
    server: { at: 's-credence', posture: 'stand' },
    missal: 'm-epistle',
    do: [
      'Vest in cassock and surplice.',
      'Set out on the credence: the wine and water cruets, the dish and towel for washing the priest\'s fingers, the small bell, and the Communion paten.',
      'Light the two candles used at Low Mass, the Epistle side first.',
      'Check that the missal is closed on its stand at the Epistle side, unless you are to carry it in.',
      'Help the priest vest.'
    ],
    notes: [
      'The rubric pictures you carrying the missal in ahead of the priest and back out afterwards. In many churches it waits on the altar instead.',
      'You never open the missal or turn its pages at Low Mass. The priest does that himself (S.R.C. 3448).',
      'Customs at the sacristy door: holy water, and a bell rung as you go out to tell the people Mass is starting.'
    ],
    auth: 'rubric',
    cite: [['CR60', 'n. 528'], ['MR62', 'Rit. serv. II.1'], ['FORT', 'pp. 76–77'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Set the credence: cruets, dish and towel, bell, paten', 'Light the two candles, Epistle side first']
  },
  {
    id: 'enter', part: 'before', short: 'Entrance',
    title: 'Lead the priest to the altar',
    priest: { at: 'p-foot' },
    server: { at: 's-beside-right', posture: 'stand' },
    missal: 'm-epistle',
    routes: [{ via: ['s-sacristy', { x: 300, y: 160 }, 's-beside-right'] }],
    marks: [{ kind: 'text', at: 's-sacristy', dx: -2, dy: -12, label: 'from the sacristy', anchor: 'end' }],
    do: [
      'Bow with the priest to the cross in the sacristy, then walk in front of him to the altar.',
      'At the foot of the altar stand at his right. When he hands you his biretta, take it: kiss first his hand, then the biretta.',
      'Genuflect on the floor when he genuflects. If there is no tabernacle he only bows, but you still genuflect.',
      'Put the biretta on the sedilia (Fortescue: the credence, or another convenient place).'
    ],
    notes: [
      'The kisses (the *solita oscula*) are left out at Requiems and when the Blessed Sacrament is exposed. In 1920 Fortescue noted that lay servers in England usually skipped them; current guides keep them.',
      'You genuflect every time you pass the middle of the altar, whether or not the Blessed Sacrament is there (S.R.C., 16 November 1906).'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. II.1–2'], ['FORT', 'pp. 76–77'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Take the biretta with the kisses and put it away']
  },

  // ------------------------------------------------------------------ prayers at the foot
  {
    id: 'introibo', part: 'foot', short: 'Introibo',
    title: 'Kneel behind the priest and begin',
    latin: 'In nomine Patris. Introibo ad altare Dei',
    priest: { at: 'p-foot' },
    server: { at: 's-foot-gospel', posture: 'kneel' },
    missal: 'm-epistle',
    routes: [{ via: ['s-beside-right', { x: 216, y: 150 }, 's-foot-gospel'], shorten: 14 }],
    do: [
      'Come back to the Gospel side of the middle. When the priest comes down to the floor and makes his reverence, kneel behind him, to his left.',
      'Kneel on the floor itself, not on the step.',
      'Sign yourself with him at *In nómine Patris*.'
    ],
    say: [
      { who: 'P', la: '✠ In nómine Patris, et Fílii, et Spíritus Sancti. Amen.', en: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.' },
      { who: 'P', la: 'Introíbo ad altáre Dei.', en: 'I will go in to the altar of God.' },
      { who: 'S', la: 'Ad Deum qui lætíficat iuventútem meam.', en: 'To God who giveth joy to my youth.' }
    ],
    notes: ['The rubric: "the server, kneeling behind him to his left" (*minister retro post eum ad sinistram genuflexus*, Rit. serv. III.6).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. III.6; Ordo Missae'], ['FORT', 'p. 77'], ['CRSJC']],
    skills: ['Kneel in the right place for the prayers at the foot']
  },
  {
    id: 'psalm', part: 'foot', short: 'Psalm 42',
    title: 'Answer Psalm 42, verse by verse',
    latin: 'Psalmus 42, Iudica me',
    priest: { at: 'p-foot' },
    server: { at: 's-foot-gospel', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Say every other verse: the priest says one, you say the next.',
      'Bow your head at *Glória Patri*.'
    ],
    say: [
      { who: 'P', la: 'Iúdica me, Deus, et discérne causam meam de gente non sancta: ab hómine iníquo et dolóso érue me.', en: 'Judge me, O God, and distinguish my cause from the nation that is not holy: deliver me from the unjust and deceitful man.' },
      { who: 'S', la: 'Quia tu es, Deus, fortitúdo mea: quare me repulísti, et quare tristis incédo, dum afflígit me inimícus?', en: 'For thou art God my strength: why hast thou cast me off? and why do I go sorrowful whilst the enemy afflicteth me?' },
      { who: 'P', la: 'Emítte lucem tuam et veritátem tuam: ipsa me deduxérunt, et adduxérunt in montem sanctum tuum et in tabernácula tua.', en: 'Send forth thy light and thy truth: they have conducted me, and brought me unto thy holy hill, and into thy tabernacles.' },
      { who: 'S', la: 'Et introíbo ad altáre Dei: ad Deum qui lætíficat iuventútem meam.', en: 'And I will go in to the altar of God: to God who giveth joy to my youth.' },
      { who: 'P', la: 'Confitébor tibi in cíthara, Deus, Deus meus: quare tristis es, ánima mea, et quare contúrbas me?', en: 'To thee, O God my God, I will give praise upon the harp: why art thou sad, O my soul? and why dost thou disquiet me?' },
      { who: 'S', la: 'Spera in Deo, quóniam adhuc confitébor illi: salutáre vultus mei, et Deus meus.', en: 'Hope in God, for I will still give praise to him: the salvation of my countenance, and my God.' },
      { who: 'P', la: 'Glória Patri, et Fílio, et Spirítui Sancto.', en: 'Glory be to the Father, and to the Son, and to the Holy Spirit.' },
      { who: 'S', la: 'Sicut erat in princípio, et nunc, et semper: et in sǽcula sæculórum. Amen.', en: 'As it was in the beginning, is now, and ever shall be, world without end. Amen.' },
      { who: 'P', la: 'Introíbo ad altáre Dei.', en: 'I will go in to the altar of God.' },
      { who: 'S', la: 'Ad Deum qui lætíficat iuventútem meam.', en: 'To God who giveth joy to my youth.' }
    ],
    notes: ['Left out at Requiems, and from Passion Sunday to Maundy Thursday in Masses of the season. Then you answer the first *Introíbo* and the priest goes straight on to *Adiutórium nostrum* (Rit. serv. III.6; Code n. 425). A feast that falls in Passiontide keeps the psalm.'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. III.6; Ordo Missae'], ['CR60', 'n. 425'], ['FORT', 'p. 77'], ['DR', 'Ps. 42']],
    skills: ['Say Psalm 42 (*Iúdica me*) from memory']
  },
  {
    id: 'misereatur', part: 'foot', short: 'Priest\'s Confiteor',
    title: 'Answer the priest\'s Confiteor',
    latin: 'Adiutorium nostrum. Confiteor. Misereatur',
    priest: { at: 'p-foot' },
    server: { at: 's-foot-gospel', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Sign yourself with the priest at *Adiutórium nostrum*.',
      'While he bows low and says his Confiteor, kneel upright. Do not bow.',
      'Then, turned a little toward him and bowing slightly, say the *Misereátur*.'
    ],
    say: [
      { who: 'P', la: '✠ Adiutórium nostrum in nómine Dómini.', en: 'Our help is in the name of the Lord.' },
      { who: 'S', la: 'Qui fecit cælum et terram.', en: 'Who made heaven and earth.' },
      { who: 'P', la: 'Confíteor Deo omnipoténti ... oráre pro me ad Dóminum Deum nostrum.', en: 'I confess to almighty God ... to pray for me to the Lord our God.' },
      { who: 'S', la: 'Misereátur tui omnípotens Deus, et, dimíssis peccátis tuis, perdúcat te ad vitam ætérnam.', en: 'May almighty God have mercy on thee, forgive thee thy sins, and bring thee to life everlasting.' },
      { who: 'P', la: 'Amen.', en: 'Amen.' }
    ],
    notes: ['How deep to bow at the *Misereátur* differs: slightly (Fortescue), moderately (Biretta Books card), profoundly (FSSP Omaha). Do what your church does.'],
    auth: 'rubric',
    cite: [['MR62', 'Ordo Missae'], ['FORT', 'p. 77'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Say the *Misereátur* at the right moment']
  },
  {
    id: 'confiteor', part: 'foot', short: 'Your Confiteor',
    title: 'Say the Confiteor',
    latin: 'Confiteor',
    priest: { at: 'p-foot' },
    server: { at: 's-foot-gospel', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Bow low toward the altar and say the Confiteor.',
      'At *tibi, pater* and *te, pater*, turn a little toward the priest.',
      'Strike your breast three times at *mea culpa, mea culpa, mea máxima culpa*.',
      'Stay bowed while the priest says *Misereátur vestri*, and answer *Amen*.',
      'Straighten up and sign yourself at *Indulgéntiam*, and answer *Amen*.'
    ],
    say: [
      { who: 'S', la: 'Confíteor Deo omnipoténti, beátæ Maríæ semper Vírgini, beáto Michaéli Archángelo, beáto Ioánni Baptístæ, sanctis Apóstolis Petro et Paulo, ómnibus Sanctis, et tibi, pater: quia peccávi nimis cogitatióne, verbo et ópere: mea culpa, mea culpa, mea máxima culpa. Ideo precor beátam Maríam semper Vírginem, beátum Michaélem Archángelum, beátum Ioánnem Baptístam, sanctos Apóstolos Petrum et Paulum, omnes Sanctos, et te, pater, oráre pro me ad Dóminum Deum nostrum.', en: 'I confess to almighty God, to blessed Mary ever Virgin, to blessed Michael the Archangel, to blessed John the Baptist, to the holy Apostles Peter and Paul, to all the Saints, and to thee, Father, that I have sinned exceedingly in thought, word and deed: through my fault, through my fault, through my most grievous fault. Therefore I beseech blessed Mary ever Virgin, blessed Michael the Archangel, blessed John the Baptist, the holy Apostles Peter and Paul, all the Saints, and thee, Father, to pray for me to the Lord our God.' },
      { who: 'P', la: 'Misereátur vestri omnípotens Deus, et, dimíssis peccátis vestris, perdúcat vos ad vitam ætérnam.', en: 'May almighty God have mercy on you, forgive you your sins, and bring you to life everlasting.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'P', la: '✠ Indulgéntiam, absolutiónem et remissiónem peccatórum nostrórum tríbuat nobis omnípotens et miséricors Dóminus.', en: 'May the almighty and merciful Lord grant us pardon, absolution and remission of our sins.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' }
    ],
    notes: ['The rubric for the turn: those answering "say *tibi, pater* and *te, pater* turned a little toward the celebrant" (Rit. serv. III.9). The Missal prints only the priest\'s Confiteor, with the rule that the servers say *tibi, pater* and *te, pater* where he says *vobis, fratres* and *vos, fratres*.'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. III.9; Ordo Missae'], ['FORT', 'p. 77'], ['BIRETTA']],
    skills: ['Say the Confiteor from memory, turning at *tibi, pater* and *te, pater*', 'Strike your breast at the three *mea culpa*']
  },
  {
    id: 'versicles', part: 'foot', short: 'Versicles',
    title: 'Answer the versicles, then kneel at the Gospel side',
    latin: 'Deus, tu conversus',
    priest: { at: 'p-center' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    routes: [{ via: ['s-foot-gospel', { x: 120, y: 132 }, 's-gospel-step'] }],
    do: [
      'Bow slightly from *Deus, tu convérsus*, and stay bowed until the priest goes up to the altar.',
      'As he goes up, rise. You may lift the front of his alb as he climbs the steps.',
      'Go to the Gospel end of the lowest step and kneel there.'
    ],
    say: [
      { who: 'P', la: 'Deus, tu convérsus vivificábis nos.', en: 'O God, thou wilt turn and give us life.' },
      { who: 'S', la: 'Et plebs tua lætábitur in te.', en: 'And thy people shall rejoice in thee.' },
      { who: 'P', la: 'Osténde nobis, Dómine, misericórdiam tuam.', en: 'Show us, O Lord, thy mercy.' },
      { who: 'S', la: 'Et salutáre tuum da nobis.', en: 'And grant us thy salvation.' },
      { who: 'P', la: 'Dómine, exáudi oratiónem meam.', en: 'O Lord, hear my prayer.' },
      { who: 'S', la: 'Et clamor meus ad te véniat.', en: 'And let my cry come unto thee.' },
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: 'Orémus.', en: 'Let us pray.' }
    ],
    notes: ['From here on your place is kneeling on the lowest step, on the side opposite the missal. The missal is on the Epistle side, so you kneel at the Gospel side.'],
    auth: 'manual',
    cite: [['MR62', 'Ordo Missae'], ['FORT', 'pp. 76–77'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Answer the versicles after the Confiteor']
  },

  // ------------------------------------------------------------------ Mass of the Catechumens
  {
    id: 'kyrie', part: 'catechumens', short: 'Introit, Kyrie',
    title: 'Introit and Kyrie',
    latin: 'Introitus. Kyrie, eleison',
    priest: { at: 'p-center' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Sign yourself when the priest begins the Introit at the missal (not at a Requiem, where he signs the book instead).',
      'Alternate the Kyrie with him at the middle: he says the first, third, fifth, seventh and ninth; you say the others.'
    ],
    say: [
      { who: 'P', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' },
      { who: 'S', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' },
      { who: 'P', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' },
      { who: 'S', la: 'Christe, eléison.', en: 'Christ, have mercy.' },
      { who: 'P', la: 'Christe, eléison.', en: 'Christ, have mercy.' },
      { who: 'S', la: 'Christe, eléison.', en: 'Christ, have mercy.' },
      { who: 'P', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' },
      { who: 'S', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' },
      { who: 'P', la: 'Kýrie, eléison.', en: 'Lord, have mercy.' }
    ],
    notes: ['If nobody answers, the priest says all nine himself (Rit. serv. IV.2).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. IV.2, XIII.1; Ordo Missae'], ['FORT', 'p. 78'], ['SHEEHAN']],
    skills: ['Alternate the nine-fold Kyrie']
  },
  {
    id: 'collects', part: 'catechumens', short: 'Gloria, collects',
    title: 'Gloria and the collects',
    latin: 'Gloria in excelsis. Oratio',
    priest: { at: 'p-center', faces: 'people' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'The priest says the Gloria alone, when the day has one. Bow your head at the Holy Name, and sign yourself at the last words, *Cum Sancto Spíritu*.',
      'When he turns and says *Dóminus vobíscum*, answer.',
      'Answer *Amen* at the end of the first collect and of the last one: the ones that finish *per ómnia sǽcula sæculórum*.'
    ],
    say: [
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: '... per ómnia sǽcula sæculórum.', en: '... for ever and ever.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' }
    ],
    notes: [
      'No Gloria in violet Masses or at Requiems (Code n. 432). Then *Dóminus vobíscum* follows the Kyrie at once.',
      'On Ember days and other days with *Flectámus génua*, the priest has said both *Flectámus génua* and *Leváte* himself since 1960. Stay kneeling and say nothing (Code n. 440). Older books give *Leváte* to the server.',
      'On days with several lessons, answer *Deo grátias* after each one and stay in your place until the last.'
    ],
    auth: 'rubric',
    cite: [['CR60', 'nn. 431–432, 435–437, 440'], ['MR62', 'Rit. serv. V.4'], ['FORT', 'pp. 23, 78'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Answer *Amen* after the first and the last collect only']
  },
  {
    id: 'epistle', part: 'catechumens', short: 'Epistle',
    title: 'Answer the Epistle, then go to the Epistle corner',
    latin: 'Epistola. Graduale',
    priest: { at: 'p-epistle' },
    server: { at: 's-epistle-floor', posture: 'stand' },
    missal: 'm-epistle',
    routes: [{ via: ['s-gospel-step', { x: 120, y: 130 }, 's-center-floor', 's-epistle-floor'], genuflect: ['s-center-floor'] }],
    do: [
      'At the end of the Epistle answer *Deo grátias*. The priest usually gives a sign: he lays his left hand on the altar, or turns or lifts his hand toward you.',
      'Rise and go along the floor to the Epistle side, genuflecting at the middle. Do not walk across the footpace.',
      'Stand on the floor near the priest, a little behind him to his right, while he reads the Gradual (or Alleluia, Tract or Sequence).'
    ],
    say: [
      { who: 'P', cue: 'at the end of the Epistle' },
      { who: 'S', la: 'Deo grátias.', en: 'Thanks be to God.' }
    ],
    notes: ['With a long Sequence, such as the *Dies iræ* at a Requiem, wait until it is nearly finished before you move.'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VI.1'], ['FORT', 'pp. 78, 82'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Know the priest\'s sign at the end of the Epistle']
  },
  {
    id: 'missal-over', part: 'catechumens', short: 'Missal to Gospel side',
    title: 'Carry the missal to the Gospel side',
    latin: 'Translatio Missalis',
    priest: { at: 'p-center' },
    server: { at: 's-gospel-book', posture: 'move', tag: 'stands by the book' },
    missal: 'm-gospel',
    routes: [{ via: ['s-epistle-floor', 's-missal-epistle', 's-center-floor', 's-missal-gospel', 's-gospel-book'], genuflect: ['s-center-floor'], carrying: 'missal', shorten: 14 }],
    do: [
      'When the priest goes to the middle of the altar (to say *Munda cor meum*), go up the side steps at the Epistle corner and take the missal with its stand.',
      'Come down to the floor in the middle and genuflect, holding the book.',
      'Go up at the Gospel side and set the missal at the Gospel corner, turned at an angle: the back of the book toward the corner, the pages facing the middle of the altar (about 45°).',
      'Step down to the step below the footpace and stand there, facing the book.'
    ],
    notes: [
      'The rubric lets either the priest or the server carry it, and fixes the angle: "so that the back of the book faces that side of the altar, and not the wall" (Rit. serv. VI.1).',
      'Its words about bowing to the cross while passing the middle describe the priest walking along the altar with the book. Crossing on the floor, you genuflect, as at every crossing.',
      'Small differences: the Canons Regular bow to the cross before coming down; the Biretta Books card has you bow to the priest; FSSP Omaha does neither.'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VI.1'], ['FORT', 'p. 78'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Carry the missal across and set it at the right angle']
  },
  {
    id: 'gospel-begin', part: 'catechumens', short: 'Gospel begins',
    title: 'Stand by the book for the start of the Gospel',
    latin: 'Sequentia sancti Evangelii',
    priest: { at: 'p-gospel' },
    server: { at: 's-gospel-book', posture: 'stand' },
    missal: 'm-gospel',
    do: [
      'Answer the greeting.',
      'At *Sequéntia sancti Evangélii*, with the priest, make three small crosses with your right thumb: on your forehead, lips and breast.'
    ],
    say: [
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: '✠ Sequéntia sancti Evangélii secúndum N.', en: 'The continuation of the holy Gospel according to N.' },
      { who: 'S', la: 'Glória tibi, Dómine.', en: 'Glory be to thee, O Lord.' }
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VI.2'], ['FORT', 'p. 78'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Make the three small crosses at the Gospel']
  },
  {
    id: 'gospel', part: 'catechumens', short: 'Gospel',
    title: 'Cross to the Epistle side for the Gospel',
    latin: 'Evangelium',
    priest: { at: 'p-gospel' },
    server: { at: 's-epistle-floor', posture: 'stand', tag: 'stands, facing the priest' },
    missal: 'm-gospel',
    routes: [{ via: ['s-gospel-book', { x: 112, y: 126 }, 's-center-floor', 's-epistle-floor'], genuflect: ['s-center-floor'] }],
    do: [
      'Go down, cross to the Epistle side (genuflecting at the middle) and stand on the floor there, turned toward the priest.',
      'If the priest genuflects during the Gospel, genuflect with him.',
      'At the end answer *Laus tibi, Christe*.',
      'Then kneel at the Epistle end of the lowest step.'
    ],
    say: [
      { who: 'P', cue: 'at the end of the Gospel' },
      { who: 'S', la: 'Laus tibi, Christe.', en: 'Praise be to thee, O Christ.' }
    ],
    notes: [
      'The rubric puts you here: "standing at the Epistle side, below the lowest step of the altar" (Rit. serv. VI.2).',
      'Custom in current guides: before you leave the book, wait for the Holy Name in the opening lines and bow.',
      'At a Requiem the priest does not kiss the book, so answer as soon as he finishes.'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VI.2'], ['FORT', 'p. 78'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Answer *Laus tibi, Christe* from the Epistle side']
  },
  {
    id: 'sermon', part: 'catechumens', short: 'Sermon (if any)',
    title: 'If there is a sermon',
    server: { at: 's-seat', posture: 'sit' },
    missal: 'm-gospel',
    do: [
      'Genuflect with the priest at the middle, then sit at the sedilia or on a stool.',
      'Stand if the Gospel is read again in English.',
      'Afterwards genuflect with him again and go back to kneel at the Epistle end of the lowest step.'
    ],
    notes: ['The rubric only says a short homily may follow the Gospel, especially on Sundays and feasts (Code n. 474). Where you sit and when you stand come from current practice: ask your MC.'],
    auth: 'local',
    cite: [['CR60', 'n. 474'], ['CRSJC'], ['FSSPOM', 'two servers']]
  },
  {
    id: 'creed', part: 'catechumens', short: 'Creed (if said)',
    title: 'Kneel for the Creed, when it is said',
    latin: 'Credo',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    do: [
      'Kneel at the Epistle end of the lowest step.',
      'Bow your head at *Deum*, *Iesum Christum* and *simul adorátur*.',
      'Bow low while the priest genuflects at *Et incarnátus est ... et homo factus est*.',
      'Sign yourself at the last words, *Et vitam ventúri sǽculi*.',
      'No Creed today? Then the Offertory follows at once: be kneeling and ready to fetch the cruets.'
    ],
    notes: [
      'Kneeling for the Creed is the server\'s "undoubted rule" (S.R.C. 2915, as Fortescue reports), even where the people stand.',
      'The Creed is said on Sundays, first-class feasts and some others (Code nn. 475–476).'
    ],
    auth: 'manual',
    cite: [['FORT', 'p. 78'], ['BIRETTA'], ['CRSJC'], ['FSSPOM', 'one server'], ['CR60', 'nn. 475–476']],
    skills: ['Bow low at *Et incarnátus est*']
  },

  // ------------------------------------------------------------------ Offertory
  {
    id: 'cruets', part: 'offertory', short: 'Cruets',
    title: 'Bring the cruets',
    latin: 'Offertorium',
    priest: { at: 'p-epistle', faces: 'epistle' },
    server: { at: 's-cruets', posture: 'stand' },
    missal: 'm-gospel',
    routes: [{ via: ['s-epistle-step', 's-credence', 's-cruets'] }],
    do: [
      'When the priest says *Dóminus vobíscum* and *Orémus*, answer, then go to the credence.',
      'Take the wine cruet in your right hand and the water cruet in your left.',
      'Wait at the Epistle corner, on the step below the footpace.',
      'When the priest comes, bow. Kiss the wine cruet and hand it to him.',
      'Move the water cruet to your right hand and take back the wine cruet with your left. Hand him the water; he pours only a little himself.',
      'Take the water cruet back, bow, and return both to the credence.'
    ],
    say: [
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: 'Orémus.', en: 'Let us pray.' }
    ],
    notes: [
      'The rubric: the server "kisses the cruet itself, not the hand of the celebrant" (Rit. serv. VII.4). It names only the wine cruet. Kissing both cruets, as you give them and as they come back, is Fortescue\'s practice and the current guides\'.',
      'No kisses at a Requiem.',
      'Local customs here: one ring of the bell as the priest unveils the chalice (Canons Regular), or going up to fold the chalice veil (FSSP Omaha). Ask your MC.'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VII.4'], ['FORT', 'pp. 78–79'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Present the cruets: wine in the right hand, water in the left']
  },
  {
    id: 'lavabo', part: 'offertory', short: 'Lavabo',
    title: 'Wash the priest\'s fingers',
    latin: 'Lavabo',
    priest: { at: 'p-epistle', faces: 'epistle' },
    server: { at: 's-cruets', posture: 'stand' },
    missal: 'm-gospel',
    do: [
      'Put the towel over your left forearm, and take the dish in your left hand and the water cruet in your right.',
      'Bow, then pour a little water over the priest\'s fingertips so that it falls into the dish.',
      'Offer him the towel, take it back, and bow.',
      'Put everything back on the credence and kneel at the Epistle end of the lowest step.'
    ],
    notes: ['The rubric: "the server pouring the water, he washes his hands, that is, the tips of the thumb and index finger" (Rit. serv. VII.6).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VII.6'], ['FORT', 'p. 79'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Pour the Lavabo water and hand the towel']
  },
  {
    id: 'suscipiat', part: 'offertory', short: 'Suscipiat',
    title: 'Answer the Orate, fratres',
    latin: 'Orate, fratres. Suscipiat',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    do: [
      'The priest turns to the people and says *Oráte, fratres*. Wait until he has turned back to the altar.',
      'Then, bowing, answer the *Suscípiat*.'
    ],
    say: [
      { who: 'P', la: 'Oráte, fratres: ut meum ac vestrum sacrifícium acceptábile fiat apud Deum Patrem omnipoténtem.', en: 'Pray, brethren, that my sacrifice and yours may be acceptable to God the Father almighty.' },
      { who: 'S', la: 'Suscípiat Dóminus sacrifícium de mánibus tuis ad laudem et glóriam nóminis sui, ad utilitátem quoque nostram, totiúsque Ecclésiæ suæ sanctæ.', en: 'May the Lord receive the sacrifice from thy hands, to the praise and glory of his name, for our good also, and that of all his holy Church.' }
    ],
    notes: ['If there is no server, the priest answers it himself, saying *de mánibus meis* (Rit. serv. VII.7).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VII.7; Ordo Missae'], ['FORT', 'p. 79'], ['CRSJC']],
    skills: ['Say the *Suscípiat* from memory']
  },
  {
    id: 'preface', part: 'offertory', short: 'Preface',
    title: 'Answer the dialogue before the Preface',
    latin: 'Praefatio',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    do: ['Answer each line. The priest then reads the Preface.'],
    say: [
      { who: 'P', la: 'Per ómnia sǽcula sæculórum.', en: 'For ever and ever.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: 'Sursum corda.', en: 'Lift up your hearts.' },
      { who: 'S', la: 'Habémus ad Dóminum.', en: 'We have lifted them up to the Lord.' },
      { who: 'P', la: 'Grátias agámus Dómino Deo nostro.', en: 'Let us give thanks to the Lord our God.' },
      { who: 'S', la: 'Dignum et iustum est.', en: 'It is right and just.' }
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VII.8; Ordo Missae'], ['SMORDO']],
    skills: ['Answer the Preface dialogue']
  },

  // ------------------------------------------------------------------ Sanctus and Canon
  {
    id: 'sanctus', part: 'canon', short: 'Sanctus',
    title: 'Ring the bell at the Sanctus',
    latin: 'Sanctus',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    bell: {
      rings: '3 (usual)', auth: 'rubric',
      note: 'Required: "the server meanwhile ringing the small bell" (Rit. serv. VII.8). The rubric gives no number of rings; three, one at each *Sanctus*, is the usual count.',
      cite: [['MR62', 'Rit. serv. VII.8'], ['FORT', 'p. 79'], ['CRSJC'], ['FSSPOM', 'one server']]
    },
    do: [
      'As the priest says the *Sanctus*, ring the bell. Most churches ring three times, once at each *Sanctus*.',
      'Bow; sign yourself with the priest at *Benedíctus qui venit*.'
    ],
    notes: [
      'Before 1960 a third candle was lit here and kept burning until after Communion. The 1962 books keep it only where it is already the custom (Code n. 530).',
      'No bell when the Blessed Sacrament is exposed, or at a side-altar Low Mass while a sung Mass is going on at the high altar.'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VII.8'], ['CR60', 'n. 530'], ['FORT', 'pp. 76, 79'], ['CRSJC'], ['BIRETTA']],
    skills: ['Ring the Sanctus bell']
  },
  {
    id: 'warning', part: 'canon', short: 'Warning bell',
    title: 'Ring the warning bell and go up',
    latin: 'Hanc igitur',
    priest: { at: 'p-center' },
    server: { at: 's-consecration', posture: 'kneel' },
    missal: 'm-gospel',
    routes: [{ via: ['s-epistle-step', { x: 262, y: 92 }, 's-consecration'] }],
    bell: {
      rings: '1', auth: 'rubric', dy: -24,
      note: 'New in 1962: "shortly before the Consecration the server warns the faithful with a signal of the bell" (Rit. serv. VIII.6). The moment is not fixed; ringing at the *Hanc ígitur* is the current custom. Before 1960 the Missal had no such bell.',
      cite: [['MR62', 'Rit. serv. VIII.6'], ['FORT', 'p. 80'], ['BIRETTA'], ['FSSPOM', 'one server']]
    },
    do: [
      'Shortly before the Consecration, ring the bell once to warn the people. Most churches ring when the priest spreads his hands over the offerings at the *Hanc ígitur*.',
      'Take the bell and go up, without genuflecting. Kneel on the edge of the footpace at the priest\'s right, a little behind him.'
    ],
    notes: ['Fortescue (1920) has you go up when the priest makes the signs of the cross after the *Hanc ígitur*, at *Quam oblatiónem*. The Canons Regular describe the ring as "at the Epiclesis".'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VIII.6'], ['FORT', 'pp. 79–80'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Ring the warning bell and go up at the right moment']
  },
  {
    id: 'consecration', part: 'canon', short: 'Consecration',
    title: 'Lift the chasuble and ring at the elevations',
    latin: 'Consecratio',
    priest: { at: 'p-center' },
    server: { at: 's-consecration', posture: 'kneel' },
    missal: 'm-gospel',
    bell: {
      rings: '3 each, or continuous', auth: 'rubric', dy: -24,
      note: 'The rubric: "three times at each elevation, or continuously" until the Host, and then the chalice, is put down (Rit. serv. VIII.6). Current guides ring once at the first genuflection, three times at the elevation and once at the second genuflection, ten rings in all. Fortescue spread three rings over the same three moments, six in all. Both fit the rubric.',
      cite: [['MR62', 'Rit. serv. VIII.6'], ['FORT', 'pp. 79–80'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']]
    },
    do: [
      'When the priest raises the Host, lift the back hem of his chasuble a little with your left hand: only while he raises it, not while he genuflects, and not too high.',
      'Ring the bell with your right hand.',
      'Bow low while he genuflects.',
      'Do the same when he raises the chalice.'
    ],
    notes: ['The rubric: "with his left hand he raises the back of the chasuble, so that it does not hinder the celebrant in raising his arms" (Rit. serv. VIII.6).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. VIII.6'], ['FORT', 'p. 79'], ['CRSJC'], ['FSSPOM', 'two servers']],
    skills: ['Lift the chasuble and ring at both elevations']
  },
  {
    id: 'after-elevation', part: 'canon', short: 'Back to your place',
    title: 'Go back to the Epistle side',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    routes: [{ via: ['s-consecration', { x: 222, y: 112 }, 's-center-floor', 's-epistle-step'], genuflect: ['s-center-floor'] }],
    do: [
      'When the chalice is put down and the priest has genuflected, rise with the bell.',
      'Come down to the floor in the middle, genuflect, and go back to kneel at the Epistle end of the lowest step.'
    ],
    notes: ['Fortescue says you may put the bell back on the credence first.'],
    auth: 'manual',
    cite: [['FORT', 'p. 80'], ['CRSJC'], ['BIRETTA']]
  },

  // ------------------------------------------------------------------ Communion
  {
    id: 'pater', part: 'communion', short: 'Pater noster',
    title: 'Answer the Pater noster and the Pax',
    latin: 'Pater noster. Pax Domini',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    do: ['Answer at the end of the Canon, at the end of the Pater noster, and at the *Pax*.'],
    say: [
      { who: 'P', la: 'Per ómnia sǽcula sæculórum.', en: 'For ever and ever.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'P', la: '... Et ne nos indúcas in tentatiónem.', en: '... And lead us not into temptation.' },
      { who: 'S', la: 'Sed líbera nos a malo.', en: 'But deliver us from evil.' },
      { who: 'P', la: 'Per ómnia sǽcula sæculórum.', en: 'For ever and ever.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'P', la: 'Pax Dómini sit semper vobíscum.', en: 'The peace of the Lord be always with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' }
    ],
    notes: ['The rubric gives *Sed líbera nos a malo* to the server by name (Rit. serv. X.1).'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. X.1–2; Ordo Missae']],
    skills: ['Answer *Sed líbera nos a malo*']
  },
  {
    id: 'agnus', part: 'communion', short: 'Agnus Dei',
    title: 'Strike your breast at the Agnus Dei',
    latin: 'Agnus Dei',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    do: ['Bow and strike your breast three times with the priest. Not at a Requiem, where he does not strike his breast.'],
    auth: 'manual',
    cite: [['FORT', 'p. 80'], ['CRSJC'], ['FSSPOM', 'one server'], ['MR62', 'Rit. serv. XIII.1']],
    skills: ['Strike your breast with the priest at the *Agnus Dei*']
  },
  {
    id: 'priest-communion', part: 'communion', short: 'Priest\'s Communion',
    title: 'Bow while the priest receives Communion',
    latin: 'Domine, non sum dignus',
    priest: { at: 'p-center' },
    server: { at: 's-epistle-step', posture: 'kneel' },
    missal: 'm-gospel',
    bell: {
      rings: '3 (custom)', auth: 'custom',
      note: 'Not in the Missal. The S.R.C. tolerated it where it was the custom (14 May 1856, as Fortescue reports); current guides ring once at each of the priest\'s three *Dómine, non sum dignus*.',
      cite: [['FORT', 'p. 80'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']]
    },
    do: [
      'In many churches you ring once at each of the priest\'s three *Dómine, non sum dignus*.',
      'Bow low while he receives.'
    ],
    auth: 'manual',
    cite: [['FORT', 'p. 80'], ['CRSJC'], ['FSSPOM', 'one server']]
  },
  {
    id: 'server-communion', part: 'communion', short: 'Your Communion',
    title: 'Ring for Communion, and receive first',
    latin: 'Ecce Agnus Dei',
    priest: { at: 'p-center', faces: 'people' },
    server: { at: 's-consecration', posture: 'kneel' },
    missal: 'm-gospel',
    routes: [{ via: ['s-epistle-step', 's-credence', { x: 300, y: 130 }, 's-center-floor', 's-consecration'], genuflect: ['s-center-floor'] }],
    bell: {
      rings: 'at least 1', auth: 'rubric', dy: -24,
      note: 'New in 1962: "if any are to receive Communion, shortly before, the server warns them with a signal of the bell" (Rit. serv. X.6). The moment is not fixed. Some churches also ring at each of the people\'s *Dómine, non sum dignus*.',
      cite: [['MR62', 'Rit. serv. X.6'], ['CRSJC'], ['BIRETTA']]
    },
    do: [
      'If anyone is to receive Communion, ring the bell shortly before to tell them. The 1962 rubric asks for this without fixing the moment, so follow your church.',
      'Fetch the paten from the credence, genuflect at the middle, and kneel on the edge of the footpace at the priest\'s right.',
      'You receive first. The priest says the whole formula, *Amen* included, so you do not answer.'
    ],
    say: [
      { who: 'P', la: 'Ecce Agnus Dei, ecce qui tollit peccáta mundi.', en: 'Behold the Lamb of God, behold him who taketh away the sins of the world.' },
      { who: 'P', la: 'Dómine, non sum dignus, ut intres sub tectum meum: sed tantum dic verbo, et sanábitur ánima mea.', times: 3, en: 'Lord, I am not worthy that thou shouldst enter under my roof: say but the word, and my soul shall be healed.' },
      { who: 'P', la: 'Corpus Dómini nostri Iesu Christi custódiat ánimam tuam in vitam ætérnam. Amen.', en: 'May the Body of our Lord Jesus Christ keep thy soul unto life everlasting. Amen.' }
    ],
    notes: [
      '**No Confiteor here in the 1962 rubrics.** The priest goes straight to *Ecce Agnus Dei*, "omitting the confession and absolution" (Code n. 503). Many churches still say it. If yours does, say it as at the foot of the altar and answer *Amen* to the priest\'s *Misereátur vestri* and *Indulgéntiam*. See *Rubric or custom?*',
      'The server receives first (S.R.C. 1074, in Wuest), and may receive kneeling at the edge of the footpace.',
      'Some guides have you say the *Dómine, non sum dignus* quietly with the priest (Canons Regular).'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. X.6'], ['CR60', 'n. 503'], ['WUEST', 'nn. 197–198'], ['FORT', 'p. 80'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Know your church\'s practice for the Communion Confiteor', 'Receive Communion at the edge of the footpace']
  },
  {
    id: 'paten', part: 'communion', short: 'Paten at the rail',
    title: 'Hold the paten at the rail',
    latin: 'Communio fidelium',
    priest: { at: 'p-rail', faces: 'people' },
    server: { at: 's-rail', posture: 'stand' },
    missal: 'm-gospel',
    routes: [{ via: [{ x: 284, y: 209 }, { x: 110, y: 209 }], shorten: 0 }],
    marks: [{ kind: 'text', at: { x: 196, y: 200 }, label: 'along the rail' }],
    do: [
      'Go down with the priest to the rail. Stand at his right and hold the paten flat under each communicant\'s chin as he gives Communion.',
      'He starts at the Epistle end of the rail (the communicants\' right) and works along it.',
      'Afterwards give him the paten; he tips any fragments into the chalice. Then take it back to the credence.',
      'While the tabernacle is open, kneel when you are not holding the paten.'
    ],
    notes: ['The paten itself is required (Code n. 528; Rit. serv. X.7). Who holds it is custom: the 1929 instruction had each communicant hold it under their own chin; current guides give it to the server.'],
    auth: 'custom',
    cite: [['MR62', 'Rit. serv. X.6–7'], ['CR60', 'n. 528'], ['SCDS29', 'n. 5'], ['FORT', 'p. 80'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Hold the paten steadily under each chin']
  },
  {
    id: 'ablutions', part: 'communion', short: 'Ablutions',
    title: 'Pour the ablutions',
    latin: 'Ablutiones',
    priest: { at: 'p-epistle', faces: 'epistle' },
    server: { at: 's-cruets', posture: 'stand' },
    missal: 'm-gospel',
    routes: [{ via: ['s-credence', 's-cruets'] }],
    do: [
      'Take the cruets, wine in your right hand and water in your left, and wait at the Epistle corner on the step below the footpace.',
      'First ablution: at the middle of the altar the priest holds the chalice out toward you. Step up and pour wine until he raises the chalice or gives a sign.',
      'Second ablution: he comes to the Epistle corner and holds his thumbs and forefingers over the chalice. Pour a little wine, then water, over his fingers until he signals.',
      'Bow before and after. No kisses at the ablutions.'
    ],
    notes: [
      'If nobody but the priest receives Communion, fetch the cruets as he drinks from the chalice and starts gathering the fragments.',
      'The rubric: he "holds out the chalice over the altar to the server at the Epistle side, who pours wine", then "washes his thumbs and forefingers over the chalice with wine and water" (Rit. serv. X.5).'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. X.5'], ['FORT', 'pp. 80–81'], ['SCHMITZ', 'ch. II'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Pour both ablutions: wine, then wine and water']
  },

  // ------------------------------------------------------------------ after Communion
  {
    id: 'missal-back', part: 'end', short: 'Missal back',
    title: 'Carry the missal back to the Epistle side',
    latin: 'Antiphona ad Communionem',
    priest: { at: 'p-center' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    routes: [{ via: ['s-missal-gospel', 's-center-floor', 's-missal-epistle'], genuflect: ['s-center-floor'], carrying: 'missal', shorten: 10 }],
    do: [
      'Put the cruets back on the credence. Cross to the Gospel side, genuflecting at the middle, and take the missal.',
      'Carry it to the Epistle side, genuflecting again at the middle, and set it square to the front of the altar, as it was at the Introit.',
      'Cross back once more, genuflecting, and kneel at the Gospel end of the lowest step. You are opposite the book again.'
    ],
    notes: [
      'The rubric: "the missal is carried by the server to the Epistle side and placed as at the Introit. The server kneels by the Gospel side, as at the beginning of Mass" (Rit. serv. XI.1).',
      'Some churches then have you carry the chalice veil to the Gospel side. Fortescue: "At Low Mass there is no serious authority for it"; better to go straight to your place. Do what your church does.',
      'If you can, do all this without stepping on the footpace (Fortescue).'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. XI.1'], ['FORT', 'p. 81'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']],
    skills: ['Carry the missal back and set it square']
  },
  {
    id: 'dismissal', part: 'end', short: 'Ite, missa est',
    title: 'Postcommunion and dismissal',
    latin: 'Postcommunio. Ite, missa est',
    priest: { at: 'p-center', faces: 'people' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Answer the greeting, and *Amen* after the first and the last Postcommunion.',
      'Answer the dismissal.'
    ],
    say: [
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: '... per ómnia sǽcula sæculórum.', en: '... for ever and ever.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: 'Ite, missa est.', en: 'Go, the Mass is ended.' },
      { who: 'S', la: 'Deo grátias.', en: 'Thanks be to God.' }
    ],
    notes: [
      'Other dismissals: *Benedicámus Dómino* (answer *Deo grátias*) when a procession follows; *Requiéscant in pace* (answer *Amen*) at a Requiem. From the Easter Vigil to the Saturday after Easter the priest adds *allelúia, allelúia*, and so do you (Code n. 507).',
      'On Lenten weekdays the priest adds *Orémus. Humiliáte cápita vestra Deo* and a prayer over the people: answer *Amen*.'
    ],
    auth: 'rubric',
    cite: [['CR60', 'nn. 506–507'], ['MR62', 'Rit. serv. XI.1–3; Ordo Missae'], ['FORT', 'p. 81']],
    skills: ['Know the three dismissals and their answers']
  },
  {
    id: 'blessing', part: 'end', short: 'Blessing',
    title: 'Kneel for the blessing',
    latin: 'Benedictio',
    priest: { at: 'p-center', faces: 'people' },
    server: { at: 's-gospel-step', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Sign yourself as the priest blesses, and answer *Amen*.',
      'Then stand.'
    ],
    say: [
      { who: 'P', la: 'Benedícat vos omnípotens Deus, Pater, et Fílius, ✠ et Spíritus Sanctus.', en: 'May almighty God bless you, the Father, and the Son, and the Holy Spirit.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' }
    ],
    notes: ['No blessing at a Requiem or after *Benedicámus Dómino* (Code n. 508). At a Requiem you do not kneel for it, since there is none.'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. XII.1; Ordo Missae'], ['CR60', 'n. 508'], ['FORT', 'p. 81']]
  },
  {
    id: 'last-gospel', part: 'end', short: 'Last Gospel',
    title: 'The Last Gospel',
    latin: 'Initium sancti Evangelii secundum Ioannem',
    priest: { at: 'p-gospel' },
    server: { at: 's-epistle-floor', posture: 'stand', tag: 'stands, facing the priest' },
    missal: 'm-epistle',
    routes: [{ via: ['s-gospel-book', { x: 112, y: 126 }, 's-center-floor', 's-epistle-floor'], genuflect: ['s-center-floor'] }],
    do: [
      'Stand at the Gospel side for the opening. Answer, and make the three small crosses with the priest.',
      'Cross to the Epistle side, genuflecting at the middle, and stand turned toward the priest.',
      'Genuflect with him at *Et Verbum caro factum est*.',
      'At the end answer *Deo grátias*.'
    ],
    say: [
      { who: 'P', la: 'Dóminus vobíscum.', en: 'The Lord be with you.' },
      { who: 'S', la: 'Et cum spíritu tuo.', en: 'And with thy spirit.' },
      { who: 'P', la: '✠ Inítium sancti Evangélii secúndum Ioánnem.', en: 'The beginning of the holy Gospel according to John.' },
      { who: 'S', la: 'Glória tibi, Dómine.', en: 'Glory be to thee, O Lord.' },
      { who: 'P', cue: 'at the end of the Last Gospel' },
      { who: 'S', la: 'Deo grátias.', en: 'Thanks be to God.' }
    ],
    notes: [
      'The rubric: "when it is finished, the server, standing at the Epistle side, answers *Deo gratias*" (Rit. serv. XII.1).',
      'Since 1960 the Last Gospel is always the opening of St John, except at Palm Sunday Masses said without the procession, which have their own. It is left out when a procession follows, at the third Mass of Christmas, at the Palm Sunday Mass after the procession, at the Easter Vigil, and when the Absolution follows a Requiem (Code nn. 509–510).',
      'Before 1960 many days had a proper Last Gospel, and you carried the missal back to the Gospel side for it. In the 1962 books that can only happen on Palm Sunday.'
    ],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. XII.1'], ['CR60', 'nn. 509–510'], ['FORT', 'p. 81'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Genuflect at *Et Verbum caro factum est*']
  },
  {
    id: 'leonine', part: 'end', short: 'Leonine prayers',
    title: 'Prayers after Low Mass',
    latin: 'Preces post Missam',
    priest: { at: 'p-step', tag: 'kneels', tagSide: 'left' },
    server: { at: 's-leonine', posture: 'kneel' },
    missal: 'm-epistle',
    do: [
      'Kneel on the lowest step at the priest\'s right. (Fortescue: on the lowest step at the Epistle side.)',
      'Hand him the prayer card if he needs it, and take it back afterwards.',
      'Answer the Hail Marys and say the rest with him. The Hail Mary is said three times, and so is the invocation of the Sacred Heart.'
    ],
    say: [
      { who: 'P', la: 'Ave Maria, gratia plena, Dominus tecum; benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus.', times: 3, en: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus.' },
      { who: 'S', la: 'Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.', times: 3, en: 'Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.' },
      { who: 'B', la: 'Salve Regina, Mater misericordiae; vita, dulcedo et spes nostra, salve. Ad te clamamus, exsules filii Evae. Ad te suspiramus, gementes et flentes in hac lacrimarum valle. Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis, post hoc exsilium, ostende. O clemens, o pia, o dulcis Virgo Maria.', en: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.' },
      { who: 'P', la: 'Ora pro nobis, sancta Dei Genetrix.', en: 'Pray for us, O holy Mother of God.' },
      { who: 'S', la: 'Ut digni efficiamur promissionibus Christi.', en: 'That we may be made worthy of the promises of Christ.' },
      { who: 'P', la: 'Oremus. Deus, refugium nostrum et virtus, populum ad te clamantem propitius respice; et intercedente gloriosa et immaculata Virgine Dei Genetrice Maria, cum beato Ioseph, eius Sponso, ac beatis Apostolis tuis Petro et Paulo, et omnibus Sanctis, quas pro conversione peccatorum, pro libertate et exaltatione sanctae Matris Ecclesiae, preces effundimus, misericors et benignus exaudi. Per eundem Christum Dominum nostrum.', en: 'Let us pray. O God, our refuge and our strength, look down in mercy on thy people who cry to thee; and by the intercession of the glorious and immaculate Virgin Mary, Mother of God, of Saint Joseph her spouse, of thy blessed Apostles Peter and Paul, and of all the Saints, in mercy and goodness hear the prayers we pour forth for the conversion of sinners and for the freedom and exaltation of our holy Mother the Church. Through the same Christ our Lord.' },
      { who: 'S', la: 'Amen.', en: 'Amen.' },
      { who: 'B', la: 'Sancte Michael Archangele, defende nos in proelio; contra nequitiam et insidias diaboli esto praesidium. Imperet illi Deus, supplices deprecamur: tuque, Princeps militiae caelestis, Satanam aliosque spiritus malignos, qui ad perditionem animarum pervagantur in mundo, divina virtute in infernum detrude. Amen.', en: 'Saint Michael the Archangel, defend us in battle; be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God thrust into hell Satan and the other evil spirits who prowl about the world seeking the ruin of souls. Amen.' },
      { who: 'P', la: 'Cor Iesu sacratissimum.', times: 3, en: 'Most Sacred Heart of Jesus.' },
      { who: 'S', la: 'Miserere nobis.', times: 3, en: 'Have mercy on us.' }
    ],
    notes: [
      'These prayers were never part of the Missal. Decrees from 1884 to 1930 attached them to Low Mass; they could be left out in several cases (after a sermon, or when Benediction or another rite follows), and *Inter Oecumenici* suppressed them from 7 March 1965. Communities using the 1962 books still say them, in Latin or in English.',
      'The Latin here is printed without accent marks because the two sources mark them differently.'
    ],
    auth: 'custom',
    cite: [['FIUV24', 'paras. 5–9, 12; App. A'], ['IO64', 'n. 48 j'], ['SMPRAY'], ['FORT', 'p. 82'], ['SCHMITZ', 'ch. II, n. 55']],
    skills: ['Answer the prayers after Low Mass']
  },
  {
    id: 'recess', part: 'end', short: 'Back to the sacristy',
    title: 'Lead the priest back to the sacristy',
    priest: { at: 'p-foot' },
    server: { at: 's-beside-right', posture: 'stand' },
    missal: 'm-epistle',
    routes: [{ via: ['s-beside-right', { x: 300, y: 160 }, 's-sacristy'], shorten: 0 }],
    marks: [{ kind: 'text', at: 's-sacristy', dx: -2, dy: -12, label: 'to the sacristy', anchor: 'end' }],
    do: [
      'Fetch the biretta. When the priest comes down with the chalice, genuflect with him on the floor.',
      'Hand him the biretta: kiss the biretta first, then his hand.',
      'Walk in front of him to the sacristy, carrying the missal if you brought it in.',
      'In the sacristy bow with him to the cross and help him unvest. Then put out the candles, the Gospel side first, and clear the credence.'
    ],
    notes: ['Customs after Mass vary: the priest may bless you; in some places he says *Prosit* and you answer *Pro omnibus et singulis*.'],
    auth: 'rubric',
    cite: [['MR62', 'Rit. serv. XII.6'], ['FORT', 'p. 82'], ['CRSJC'], ['FSSPOM', 'one server']],
    skills: ['Hand back the biretta and lead the priest out']
  }
]};
