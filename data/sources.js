/* The bibliography and the parts of the Mass.
   Every instruction on the site cites one of these by key: cite: [['MR62', 'Rit. serv. III.6']].
   Ordered by authority: the 1962 books first, then the manuals, then current practice.
   Full notes on each, and what was checked, are in research/serving-the-tlm.md. */
window.SERVING = window.SERVING || {};

SERVING.sources = [
  {
    key: 'MR62', short: 'Missal (1962)',
    title: 'Missale Romanum, editio typica 1962',
    edition: 'Typis Polyglottis Vaticanis, 1962. Ritus servandus in celebratione Missae and Ordo Missae',
    url: 'https://archive.org/details/missale-romanum-1962-cmaa-musica-sacra.com-missale-62',
    note: 'The rubrics themselves. "Rit. serv. VIII.6" means Ritus servandus, title VIII, paragraph 6. Scan published by the Church Music Association of America.'
  },
  {
    key: 'CR60', short: 'Code of Rubrics',
    title: 'Rubricae generales Missalis Romani (Code of Rubrics of John XXIII)',
    edition: 'July 1960, printed in the 1962 Missal',
    url: 'https://archive.org/details/missale-romanum-1962-cmaa-musica-sacra.com-missale-62',
    note: 'The general rubrics in force with the 1962 Missal. Cited by number, e.g. n. 503.'
  },
  {
    key: 'MR22', short: 'Missal (1922)',
    title: 'Missale Romanum, editio quarta iuxta typicam Vaticanam',
    edition: 'Tours: Mame, 1922',
    url: 'https://archive.org/details/missaleromanum0000unse',
    note: 'The rubrics before 1960. Used only to show what the 1960 Code changed.'
  },
  {
    key: 'SCDS29', short: 'Instruction (1929)',
    title: 'Instruction of the Congregation for the Discipline of the Sacraments on the celebration of Mass and the distribution of Communion',
    edition: '26 March 1929, Acta Apostolicae Sedis 21 (1929) 631–639',
    url: 'https://www.vatican.va/archive/aas/documents/AAS-21-1929-ocr.pdf',
    note: 'Made the Communion paten obligatory (n. 5).'
  },
  {
    key: 'IO64', short: 'Inter Oecumenici',
    title: 'Inter Oecumenici, Instruction on implementing the Constitution on the Sacred Liturgy',
    edition: '26 September 1964, in force 7 March 1965',
    url: 'https://adoremus.org/1964/09/inter-oecumenici/',
    note: 'n. 48 j suppressed the prayers after Low Mass.'
  },
  {
    key: 'FORT', short: 'Fortescue (1920)',
    author: 'Adrian Fortescue',
    title: 'The Ceremonies of the Roman Rite Described',
    edition: '2nd ed., London: Burns Oates & Washbourne, 1920',
    url: 'https://archive.org/details/ceremoniesofrom00fort',
    note: 'The standard English ceremonial manual. Chapter X, "The Manner of Serving Low Mass", pp. 76–83. Written before the 1960 rubrics: where they differ, this site gives the 1962 answer and says so.'
  },
  {
    key: 'WUEST', short: 'Wuest (1915)',
    author: 'Joseph Wuest, C.Ss.R.',
    title: 'Collectio rerum liturgicarum',
    edition: '2nd ed., Boston, 1915 (the Latin original of Matters Liturgical)',
    url: 'https://archive.org/details/matters-liturgical-collectio-rerum-liturgicarium-wuest-1915',
    note: 'Bells (nn. 128–129) and Communion (nn. 196–198).'
  },
  {
    key: 'SCHMITZ', short: 'Schmitz (1960)',
    author: 'Walter J. Schmitz, S.S.',
    title: 'Learning the Mass: A Manual for Seminarians and Priests',
    edition: 'Washington, 1960; follows the 1960 rubrics',
    url: 'https://www.sanctamissa.org/_files/ugd/c6f7dd_459ea477c0c845dc8907fd67d88de2f9.pdf'
  },
  {
    key: 'CRSJC', short: 'Canons Regular handbook',
    author: 'Canons Regular of St. John Cantius',
    title: 'Low Mass with One Server, Extraordinary Form: Handbook for Altar Servers',
    edition: 'sanctamissa.org, n.d.',
    url: 'https://www.sanctamissa.org/low-mass-with-one-server',
    note: 'Current practice.'
  },
  {
    key: 'BIRETTA', short: 'Biretta Books card',
    author: 'Biretta Books (Canons Regular of St. John Cantius)',
    title: 'Altar Server Card: Low Mass with One Server',
    edition: '2007',
    url: 'https://fssp-parra.org/wp-content/uploads/servers-cheat-sheet.pdf',
    note: 'Current practice. The copy distributed by the FSSP chaplaincy in Parramatta.'
  },
  {
    key: 'SMORDO', short: 'Order of Mass (sanctamissa)',
    title: 'Order of Mass, Low Mass, Latin and English',
    edition: 'sanctamissa.org',
    url: 'https://www.sanctamissa.org/_files/ugd/c6f7dd_3cda4ddfebb34955821cee03ccae4ced.pdf',
    note: 'Used to cross-check the Latin of the responses against the 1962 Ordo.'
  },
  {
    key: 'SMPRAY', short: 'Prayers after Low Mass',
    title: 'Prayers After Low Mass',
    edition: 'sanctamissa.org',
    url: 'https://www.sanctamissa.org/_files/ugd/c6f7dd_d30fc56f908246d2879186ba41189c53.pdf'
  },
  {
    key: 'FSSPOM', short: 'FSSP Omaha sheets',
    author: 'Immaculate Conception Church, Omaha (Priestly Fraternity of St. Peter)',
    title: 'Knights of the Altar: server role sheets',
    edition: 'June 2023: Low Mass with one server, with two servers, Sung Mass and Solemn High Mass roles',
    url: 'https://latinmassomaha.org/knights-of-the-altar/',
    note: 'Current practice in one FSSP parish; not a Fraternity-wide manual (none is published).'
  },
  {
    key: 'FIUV24', short: 'FIUV Positio 24',
    author: 'Foederatio Internationalis Una Voce',
    title: 'Positio 24: Prayers for the Persecuted Church and the Leonine Prayers',
    edition: 'February 2015',
    url: 'https://lms.org.uk/sites/default/files/resource_documents/fiuv/pp24_leonine_prayers.pdf',
    note: 'The history and status of the prayers after Low Mass, with the decrees.'
  },
  {
    key: 'SHEEHAN', short: 'How to Serve Mass',
    title: 'How to Serve Mass and Pronounce the Latin',
    edition: 'Boston: Matthew F. Sheehan, n.d.',
    url: 'https://archive.org/details/how_to_serve_mass_and_pronounce',
    note: 'Used to cross-check the Kyrie alternation.'
  },
  {
    key: 'LU61', short: 'Liber Usualis (1961)',
    author: 'Benedictines of Solesmes (ed.)',
    title: 'The Liber Usualis, with Introduction and Rubrics in English',
    edition: 'Tournai: Desclée, 1961',
    url: 'https://archive.org/details/TheLiberUsualis1961',
    note: '"The reading and pronunciation of liturgical Latin", pp. xxxv–xxxix: the Church\'s own guide to Roman pronunciation.'
  },
  {
    key: 'DR', short: 'Douay-Rheims',
    title: 'The Holy Bible, Douay-Rheims version, Challoner revision',
    edition: 'Psalm 42 (Psalm 43 in Hebrew numbering)',
    url: 'https://www.drbo.org/chapter/21042.htm',
    note: 'The English of Psalm 42. The other English on this site is a plain literal translation made for it.'
  }
];

SERVING.parts = [
  { key: 'before', name: 'Before Mass', short: 'Before' },
  { key: 'foot', name: 'Prayers at the foot of the altar', short: 'At the foot' },
  { key: 'catechumens', name: 'Mass of the Catechumens', short: 'Catechumens' },
  { key: 'offertory', name: 'Offertory', short: 'Offertory' },
  { key: 'canon', name: 'Sanctus and Canon', short: 'Canon' },
  { key: 'communion', name: 'Communion', short: 'Communion' },
  { key: 'end', name: 'After Communion to the end', short: 'End' }
];
