/* Everything that is not a step of Low Mass: the rubric-or-custom table, the
   exceptions chart, the basics, the High Mass roles and the general skills.
   Research: research/serving-the-tlm.md, sections A, D, E and F. */

// ---------------------------------------------------------------- rubric or custom?
SERVING.customs = [
  { practice: 'Ringing the bell at the *Sanctus*', auth: 'rubric',
    answer: 'Required: "the server meanwhile ringing the small bell" (Rit. serv. VII.8). The rubric gives no number of rings; three is usual.',
    cite: [['MR62', 'Rit. serv. VII.8'], ['FORT', 'p. 79']] },
  { practice: 'A warning bell just before the Consecration', auth: 'rubric',
    answer: 'Required since 1962 (Rit. serv. VIII.6), without a fixed moment. Before 1960 the Missal had no such bell: Fortescue wrote that there was "no authority in the missal" for it.',
    cite: [['MR62', 'Rit. serv. VIII.6'], ['MR22', 'Rit. serv. VIII.6'], ['FORT', 'p. 80']] },
  { practice: 'Ringing that warning at the *Hanc ígitur*', auth: 'custom',
    answer: 'The usual moment today (Biretta Books card, FSSP Omaha). The Canons Regular say "at the Epiclesis"; Van der Stappen allowed it at *Quam oblatiónem* (in Fortescue).',
    cite: [['BIRETTA'], ['FSSPOM', 'one server'], ['CRSJC'], ['FORT', 'p. 80']] },
  { practice: 'Bells at the elevations', auth: 'rubric',
    answer: '"Three times at each elevation, or continuously" until the Host, then the chalice, is put down (Rit. serv. VIII.6).',
    cite: [['MR62', 'Rit. serv. VIII.6']] },
  { practice: 'Ringing 1, 3, 1 at each elevation', auth: 'custom',
    answer: 'Current guides ring once at each genuflection and three times at the elevation: ten rings in all. Fortescue spread three rings over the same three moments: six in all. Both fit the rubric.',
    cite: [['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server'], ['FORT', 'pp. 79–80']] },
  { practice: 'Lifting the chasuble at the elevations', auth: 'rubric',
    answer: '"With his left hand he raises the back of the chasuble", only while the priest elevates (Rit. serv. VIII.6).',
    cite: [['MR62', 'Rit. serv. VIII.6'], ['FORT', 'p. 79']] },
  { practice: 'Bells at the priest\'s *Dómine, non sum dignus*', auth: 'custom',
    answer: 'Not in the Missal. Tolerated where it was the custom (S.R.C., 14 May 1856, as Fortescue reports). Current guides ring once at each of the three.',
    cite: [['FORT', 'p. 80'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']] },
  { practice: 'A bell before the faithful\'s Communion', auth: 'rubric',
    answer: 'Required since 1962 when anyone is to receive: "shortly before", with no fixed moment (Rit. serv. X.6).',
    cite: [['MR62', 'Rit. serv. X.6']] },
  { practice: 'Bells at the people\'s *Dómine, non sum dignus*', auth: 'local',
    answer: 'The Canons Regular ring there; FSSP Omaha\'s sheet does not mention it.',
    cite: [['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']] },
  { practice: 'A bell when the chalice is unveiled at the Offertory', auth: 'local',
    answer: 'The Canons Regular\'s practice only.',
    cite: [['CRSJC'], ['BIRETTA']] },
  { practice: 'No bells while the Blessed Sacrament is exposed', auth: 'rubric',
    answer: 'Correct: decrees of the S.R.C. (3157, 3448) forbid the bell during exposition.',
    cite: [['WUEST', 'n. 128'], ['FORT', 'p. 76']] },
  { practice: 'The Confiteor before the faithful\'s Communion', auth: 'local',
    answer: 'The 1962 rubric leaves it out: the priest goes straight to *Ecce Agnus Dei*, "omitting the confession and absolution" (Code n. 503). Many churches still say it: FSSP Omaha does, the Canons Regular give both options, and the Biretta Books card calls it "permitted but not required". Replies of the Ecclesia Dei commission (2010, 2018) are reported to allow it where the practice exists, but their original texts could not be checked.',
    cite: [['CR60', 'n. 503'], ['FSSPOM', 'one server'], ['CRSJC'], ['BIRETTA']] },
  { practice: 'Answering *Leváte*', auth: 'rubric',
    answer: 'Not any more. Since 1960 the priest says both *Flectámus génua* and *Leváte* himself (Code n. 440). Older books give *Leváte* to the server.',
    cite: [['CR60', 'n. 440'], ['MR22', 'Rit. serv. V.4'], ['FORT', 'p. 78']] },
  { practice: 'Kissing the wine cruet', auth: 'rubric',
    answer: 'Yes: the server "kisses the cruet itself, not the hand of the celebrant" (Rit. serv. VII.4).',
    cite: [['MR62', 'Rit. serv. VII.4']] },
  { practice: 'Kissing both cruets, before and after', auth: 'manual',
    answer: 'Fortescue and the current guides do; the rubric names only the wine cruet.',
    cite: [['FORT', 'p. 79'], ['CRSJC'], ['FSSPOM', 'one server']] },
  { practice: 'No kisses at a Requiem', auth: 'manual',
    answer: 'The rubric says so for the sacred ministers at a solemn Requiem (Rit. serv. XIII.2); the manuals apply it to the server at Low Mass too.',
    cite: [['MR62', 'Rit. serv. XIII.2'], ['FORT', 'pp. 24, 82'], ['FSSPOM', 'one server']] },
  { practice: 'Who holds the Communion paten', auth: 'custom',
    answer: 'The paten itself is required (Code n. 528; Rit. serv. X.7). The 1929 instruction had each communicant hold it under their own chin; today the server holds it. A 1930 approval of the server holding it is reported but could not be found.',
    cite: [['CR60', 'n. 528'], ['MR62', 'Rit. serv. X.7'], ['SCDS29', 'n. 5'], ['CRSJC'], ['FSSPOM', 'one server']] },
  { practice: 'Kneeling for the Creed', auth: 'manual',
    answer: 'The server\'s "undoubted rule" (S.R.C. 2915, as Fortescue reports), even where the people stand.',
    cite: [['FORT', 'p. 78']] },
  { practice: 'Who moves the missal', auth: 'rubric',
    answer: 'Either the priest himself or the server (Rit. serv. VI.1). At Low Mass the server never opens it or turns its pages (S.R.C. 3448).',
    cite: [['MR62', 'Rit. serv. VI.1'], ['FORT', 'p. 77']] },
  { practice: 'Carrying the chalice veil to the Gospel side', auth: 'local',
    answer: 'Done in current guides. Fortescue: "At Low Mass there is no serious authority for it."',
    cite: [['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server'], ['FORT', 'p. 81']] },
  { practice: 'The Sanctus candle', auth: 'custom',
    answer: 'Required before 1960. The 1962 books keep it only "where it is the custom" (Code n. 530).',
    cite: [['CR60', 'n. 530'], ['MR22', 'Rit. serv. VIII.6']] },
  { practice: 'The prayers after Low Mass', auth: 'custom',
    answer: 'Never part of the Missal: prescribed by decrees from 1884, and suppressed from 7 March 1965 (*Inter Oecumenici* n. 48 j). Communities using the 1962 books still say them.',
    cite: [['FIUV24', 'paras. 5–12'], ['IO64', 'n. 48 j'], ['SMPRAY'], ['FSSPOM', 'one server']] },
  { practice: 'Bowing your head while kneeling', auth: 'local',
    answer: 'Fortescue and the Canons Regular bow straight ahead; some FSSP sheets say not to bow while kneeling.',
    cite: [['FORT', 'p. 23'], ['CRSJC'], ['FSSPOM', 'two servers; choir']] },
  { practice: 'Where you genuflect when you cross during Mass', auth: 'local',
    answer: 'Fortescue: on the lowest step, keeping the floor for the start and end of Mass. Current guides: on the floor in the middle. This site follows the current guides.',
    cite: [['FORT', 'p. 22'], ['CRSJC'], ['BIRETTA'], ['FSSPOM', 'one server']] },
  { practice: 'Genuflecting at the middle when there is no tabernacle', auth: 'rubric',
    answer: 'Yes: the server genuflects at the middle every time, whether or not the Blessed Sacrament is reserved there (S.R.C., 16 November 1906, as Fortescue reports).',
    cite: [['FORT', 'p. 76']] },
  { practice: 'Wearing a surplice', auth: 'rubric',
    answer: 'The rubric supposes it: the server goes before the priest "wearing a surplice" (Rit. serv. II.1).',
    cite: [['MR62', 'Rit. serv. II.1'], ['FORT', 'p. 76']] }
];

// ---------------------------------------------------------------- what changes, and when
SERVING.exceptions = {
  cols: [
    { key: 'low', name: 'Ordinary Low Mass' },
    { key: 'requiem', name: 'Requiem' },
    { key: 'passion', name: 'Passiontide (Masses of the season)' },
    { key: 'violet', name: 'Violet weekday (Advent, Lent)' },
    { key: 'procession', name: 'A procession follows' }
  ],
  rows: [
    { name: 'Psalm 42 at the foot of the altar',
      cells: { low: 'yes', requiem: 'no', passion: 'no', violet: 'yes', procession: 'As the day requires' },
      cite: [['MR62', 'Rit. serv. III.6'], ['CR60', 'n. 425']] },
    { name: 'Gloria',
      cells: { low: 'When the day has it', requiem: 'no', passion: 'no', violet: 'no', procession: 'As the day requires' },
      cite: [['CR60', 'nn. 431–432']] },
    { name: 'Creed',
      cells: { low: 'Sundays and greater feasts', requiem: 'no', passion: 'Sundays only', violet: 'no', procession: 'As the day requires' },
      cite: [['CR60', 'nn. 475–476']] },
    { name: 'Your sign of the cross at the Introit',
      cells: { low: 'yes', requiem: 'no', passion: 'yes', violet: 'yes', procession: 'yes' },
      cite: [['MR62', 'Rit. serv. XIII.1'], ['FORT', 'p. 78']] },
    { name: 'Kissing the cruets and the biretta',
      cells: { low: 'yes', requiem: 'no', passion: 'yes', violet: 'yes', procession: 'yes' },
      cite: [['FORT', 'pp. 24, 82'], ['MR62', 'Rit. serv. XIII.2']] },
    { name: 'Striking your breast at the *Agnus Dei*',
      cells: { low: 'yes', requiem: 'no', passion: 'yes', violet: 'yes', procession: 'yes' },
      cite: [['MR62', 'Rit. serv. XIII.1'], ['FSSPOM', 'one server']] },
    { name: 'Dismissal, and your answer',
      cells: { low: '*Ite, missa est*: *Deo grátias*', requiem: '*Requiéscant in pace*: *Amen*', passion: '*Ite, missa est*: *Deo grátias*', violet: '*Ite, missa est*: *Deo grátias*', procession: '*Benedicámus Dómino*: *Deo grátias*' },
      cite: [['CR60', 'n. 507']] },
    { name: 'Blessing',
      cells: { low: 'yes', requiem: 'no', passion: 'yes', violet: 'yes', procession: 'no' },
      cite: [['CR60', 'n. 508']] },
    { name: 'Last Gospel',
      cells: { low: 'yes', requiem: 'Yes, unless the Absolution follows', passion: 'yes', violet: 'yes', procession: 'no' },
      cite: [['CR60', 'n. 510']] },
    { name: 'Prayers after Low Mass',
      cells: { low: 'yes', requiem: 'May be left out if another rite follows', passion: 'yes', violet: 'yes', procession: 'May be left out (a rite follows)' },
      cite: [['FIUV24', 'note 14']] }
  ]
};

// ---------------------------------------------------------------- basics
SERVING.basics = [
  { title: 'Which side is which',
    paras: [
      'Stand in the nave and face the altar. The **Epistle side** is on your right and the **Gospel side** is on your left. Every plan on this site is drawn that way round.',
      'The rubrics sometimes name the sides from the altar\'s own point of view, which is why the Epistle side can be called the altar\'s left. It is the same place.'
    ],
    cite: [['MR62', 'Rit. serv. IV.2, X.6']] },
  { title: 'Your place: opposite the book',
    paras: ['Your normal place is kneeling on the lowest step of the altar, on the side opposite the missal. Watch the book and you will always know where to be.'],
    list: [
      'Prayers at the foot: on the floor, behind the priest to his left.',
      'Introit to the Gospel: the missal is on the Epistle side, so you kneel on the Gospel side.',
      'Gospel to the ablutions: the missal is on the Gospel side, so you kneel on the Epistle side.',
      'After the ablutions: the missal is back on the Epistle side, so you kneel on the Gospel side again.',
      'The chart *Where everyone is* shows this for the whole Mass.'
    ],
    cite: [['FORT', 'p. 76'], ['MR62', 'Rit. serv. III.6, XI.1'], ['FSSPOM', 'one server']] },
  { title: 'Genuflecting',
    list: [
      'A single genuflection: stand straight, facing the altar, hands joined. Without bending your body, touch the floor with your right knee where your right foot was, and rise at once.',
      'A double genuflection, both knees down with a slight bow, is made before the Blessed Sacrament exposed.',
      'Genuflect at the beginning and end of Mass, and every time you pass the middle of the altar, whether or not the Blessed Sacrament is there.',
      'If you are about to kneel where you stand, do not genuflect first.'
    ],
    cite: [['FORT', 'pp. 21–22, 76']] },
  { title: 'Bowing',
    list: [
      'There are three bows: **profound** (head and body, low enough that your hands could touch your knees), **moderate** (head and shoulders) and **simple** (the head only).',
      'Bow your head at the Holy Name, at *Glória Patri*, at the names of Mary, of the saint of the day and of the Pope, and at *Orémus*.',
      'Bow to the priest before and after you hand him anything.',
      'Never bow while making the sign of the cross.',
      'While kneeling, Fortescue and the Canons Regular bow straight ahead; some churches do not bow at all while kneeling. Follow yours.'
    ],
    cite: [['FORT', 'pp. 22–23, 79, 81'], ['CRSJC'], ['FSSPOM', 'one server; two servers']] },
  { title: 'Your hands',
    list: [
      'When your hands are free, keep them joined before your breast, palm to palm, fingers pointing up.',
      'When one hand holds something, lay the other flat on your breast.'
    ],
    cite: [['FORT', 'pp. 23, 76'], ['BIRETTA']] },
  { title: 'The sign of the cross',
    paras: [
      'Lay your left hand flat on your breast. With your right hand touch your forehead, your breast, your left shoulder and your right shoulder.',
      'Sign yourself whenever the priest signs himself, not when he blesses something else. In the responses on this site, ✠ marks those moments.'
    ],
    list: [
      'At *In nómine Patris*, *Adiutórium nostrum* and *Indulgéntiam*.',
      'At the start of the Introit (not at a Requiem).',
      'At the end of the Gloria and of the Creed, and at *Benedíctus* in the Sanctus.',
      'At the blessing.',
      'The small triple cross, with your thumb on forehead, lips and breast, at the Gospel and the Last Gospel.'
    ],
    cite: [['FORT', 'pp. 24, 76, 78'], ['MR62', 'Rit. serv. III.5'], ['CRSJC']] },
  { title: 'Striking your breast',
    list: [
      'Three times at *mea culpa, mea culpa, mea máxima culpa* in your Confiteor.',
      'Three times with the priest at the *Agnus Dei* (not at a Requiem).'
    ],
    cite: [['FORT', 'pp. 77, 80'], ['MR62', 'Rit. serv. XIII.1']] },
  { title: 'Handing things to the priest',
    list: [
      'The traditional kisses (*solita oscula*): when you hand him something, kiss the thing, then his hand. When you take something from him, kiss his hand, then the thing.',
      'The cruets are the exception: the rubric says you kiss the cruet, not his hand.',
      'No kisses at a Requiem, before the Blessed Sacrament exposed, or at the ablutions.'
    ],
    cite: [['FORT', 'pp. 24, 76, 81'], ['MR62', 'Rit. serv. VII.4']] },
  { title: 'What to wear',
    paras: ['Cassock and surplice. The rubric supposes the surplice.'],
    cite: [['MR62', 'Rit. serv. II.1'], ['FORT', 'p. 76'], ['FSSPOM', 'one server']] },
  { title: 'Two servers at Low Mass',
    paras: ['The first server does nearly everything on this site. The second answers, bows and genuflects together with the first.'],
    list: [
      'Places: FSSP Omaha has both kneel at the foot, then the first server keeps the Epistle end of the lowest step and the second the Gospel end. Fortescue has the second always on the side opposite the first.',
      'The first server moves the missal and rings the bells.',
      'Offertory: the first hands the wine, the second the water. Lavabo: the first holds the towel, the second the water cruet and dish.',
      'Consecration: both kneel on the footpace, one on each side of the priest, and both lift the chasuble.',
      'Communion: at FSSP Omaha the second server holds the paten.',
      'Ablutions: Fortescue has the first server alone; FSSP Omaha has the second pour the water at the second ablution.',
      'After Communion the first carries the missal and the second the chalice veil; they genuflect together at the middle, the first in front.'
    ],
    cite: [['FORT', 'pp. 82–83'], ['FSSPOM', 'two servers']] },
  { title: 'Saying the Latin',
    paras: ['The Church\'s own guide to pronouncing Latin is the Liber Usualis. Its rules, with words you will say:'],
    list: [
      'Every vowel has one pure sound: *a* as in father, *e* as in red (never "ay"), *i* as the *ee* in feet, *o* as in for, *u* as the *oo* in moon.',
      '*æ* and *œ* sound like *e*: *cælum* is "che-loom", *lætíficat* is "le-tee-fee-kaht".',
      '*c* before *e*, *i*, *æ* or *œ* is the *ch* in church: *cælum*. Everywhere else it is *k*: *cum* is "koom".',
      '*sc* before *e* or *i* is *sh*: *descéndit* is "de-shen-deet", so *suscípiat* is "soo-shee-pee-aht". *cc* before them is *tch*: *ecce* is "et-che".',
      '*g* before *e* or *i* is soft, as in generous: *Regína*. Elsewhere it is hard: *ego*.',
      '*gn* is *ny*: *regnum* is "reh-nyoom", so *dignum* is "dee-nyoom".',
      '*h* is silent, except in *mihi* ("mee-kee") and *nihil* ("nee-keel").',
      '*j*, printed as *i* in the 1962 Missal, sounds like *y*: *iuventútem* is "yoo-ven-too-tem".',
      '*ti* before a vowel is "tsee": *grátias* is "grah-tsee-ahs".',
      '*xc* before *e* or *i* is "ksh": *excélsis* is "ek-shel-sees".',
      '*r* is lightly rolled and does not change the vowel before it: *Kýrie* is "kee-ree-eh", not "keer-ee-eh".',
      'Two vowels side by side keep their own sounds (*Deo* is "deh-o"), and every syllable gets its value: *Dómine*, never "Dom-neh".',
      'The accent marks printed in the Missal show which syllable takes the stress: *lætíficat*, *iuventútem*.'
    ],
    cite: [['LU61', 'pp. xxxv–xxxix']] }
];

// ---------------------------------------------------------------- High Mass
SERVING.highMass = {
  intro: 'A **Missa cantata** is sung by the priest without a deacon and subdeacon. It comes in a simple form, served almost like Low Mass by one or two servers, and a fuller one with a master of ceremonies, thurifer, acolytes and torchbearers. A **Solemn High Mass** has a deacon and subdeacon as well. Since 1960 incense is allowed at every sung Mass. This page is an overview: learn these roles from your MC, in your own sanctuary.',
  roles: [
    { abbr: 'MC', name: 'Master of ceremonies',
      summary: 'Knows everyone\'s part and guides them with small signs.',
      duties: [
        'Answers the prayers at the foot: with the deacon and subdeacon at a Solemn Mass, alone at a Missa cantata.',
        'Moves the missal out of the way while the altar is incensed.',
        'At a Missa cantata, takes the deacon\'s place at the incense and incenses the celebrant.',
        'Turns the pages at the missal when there is no deacon.',
        'Never sits, except perhaps during the sermon.'
      ],
      cite: [['FORT', 'pp. 99–103, 138'], ['FSSPOM', 'Sung Mass and Solemn Mass MC']] },
    { abbr: 'Th', name: 'Thurifer',
      summary: 'Carries the thurible and keeps it lit.',
      duties: [
        'Holds the thurible in the left hand until incense has been blessed, then in the right.',
        'At a Solemn Mass, after the Offertory, incenses the deacon, the acolytes and the people.',
        'At the elevations, kneeling at the Epistle side, incenses the Host and the chalice, three swings each. The incense is put in without a blessing.'
      ],
      cite: [['MR62', 'Rit. serv. VII.10, VIII.8'], ['FORT', 'pp. 24, 93'], ['FSSPOM', 'thurifer']] },
    { abbr: 'BB', name: 'Boat-bearer',
      summary: 'Optional: "no rubric supposes the presence of a boat-bearer" (Fortescue).',
      duties: ['Walks at the thurifer\'s left and hands over the boat of incense when it is needed.'],
      cite: [['FORT', 'pp. 25, 90']] },
    { abbr: 'A', name: 'Acolytes (two)',
      summary: 'Two servers with candles who do much of what one server does at Low Mass.',
      duties: [
        'Carry lighted candles in the procession and set them on the credence.',
        'Stand with their candles on either side of the book at the Gospel, and do not genuflect during it while holding them (Code n. 519).',
        'Bring the cruets, serve the Lavabo and serve the ablutions.',
        'Light the torches at the end of the Preface.'
      ],
      cite: [['MR62', 'Rit. serv. II.5, VI.5, VII.9–10, VIII.8'], ['CR60', 'n. 519'], ['FORT', 'p. 97'], ['FSSPOM', 'acolytes and crucifer']] },
    { abbr: 'Cr', name: 'Crucifer',
      summary: 'Carries the processional cross. Not the Roman custom at a priest\'s High Mass, but there is "no rule against" it (Fortescue).',
      duties: [
        'Walks between the acolytes, the figure on the cross facing forward.',
        'Never genuflects while carrying the cross, and the acolytes walking alongside do not either.'
      ],
      cite: [['FORT', 'pp. 22, 86–87'], ['FSSPOM', 'acolytes and crucifer']] },
    { abbr: 'T', name: 'Torchbearers',
      summary: 'At least two (Rit. serv. VIII.8); commonly two, four or six, and up to eight at a bishop\'s Mass.',
      duties: [
        'The torches are lit at the end of the Preface, and the torchbearers kneel in a line across the sanctuary for the Consecration.',
        'They leave after the elevation of the chalice, unless there are communicants: then after Communion. At Requiems and on fast days they stay until Communion.',
        'When there are no others, the acolytes may serve as torchbearers.'
      ],
      cite: [['MR62', 'Rit. serv. VIII.8'], ['FORT', 'pp. 31, 93, 98–99'], ['FSSPOM', 'torchbearers']] }
  ],
  cite: [['FORT', 'pp. 136–137'], ['CR60', 'n. 426']]
};

// ---------------------------------------------------------------- general skills for the checklist
SERVING.extraSkills = [
  { part: 'Basics', text: 'Tell the Epistle side from the Gospel side' },
  { part: 'Basics', text: 'Make a single genuflection, right knee to the floor' },
  { part: 'Basics', text: 'Keep your hands joined when they are free' },
  { part: 'Basics', text: 'Know where you kneel: opposite the book' },
  { part: 'Basics', text: 'Pronounce the Latin the Roman way' }
];
