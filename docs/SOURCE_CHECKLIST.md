# Source content checklist

Generated from all 2198 records in `FFT_Unified_Guide.md`; source SHA-256 `f094db4b76d327db38db03fc0bfe3e199c8a8cd32b9ca7e26b3b9e536577eb5b`.

This is a content mapping, not a claim of exact PlayStation emulation. “Adapted gameplay” means a runtime data entry exists and must still be verified through the game engine. “Full source reference” means the record is preserved in the searchable codex. The separate native-map audit verifies 17 original map grids. Formula-by-formula PlayStation emulation, full voiced dialogue and legacy bugs are not implied by archival coverage.

## Concrete data coverage

- 57 ordered campaign stages: prologue, all 53 battle records, and three separately playable transformation phases.
- 26 optional stages: six recruitment fights, ten Deep Dungeon floors, two rare encounters, and eight repeatable wilderness patrols. Bethla additionally offers its source North/South approach choice within the campaign stage.
- 20 generic jobs with original unlock prerequisites; special and monster classes indexed separately.
- 506 source ability records plus Attack: original source fields/formulas plus explicit compact-runtime parameters.
- 257 item/item-note entries retain original equipment fields and acquisition descriptions. Every entry has an explicit acquisition route or canonical alias, and all 48 poachable species occur in an encounter.
- The campaign presents its main story through encounter briefs and 20 source-backed aftermaths; 11 ordered world visits present the recruitment and dungeon chains. The ending includes the siblings, Delita/Ovelia and the suppression of the Durai Papers. All 106 script records, including credits and the combined sidequest script, remain available in the lazy-loaded full archive.
- All 11 quest records, all 20 map records, and every story/lore/mechanics/statistics record remain inspectable.

## Adaptations and limits

Seventeen complete source grids (eight chapter-one areas and nine Deep Dungeon floors) use original heights, passability, orientation, deployment coordinates, 60 treasure pairs, and 36 trap records. The game engine loads those native grids. The guide provides no END height grid and omits many later matrices, so those maps use designed layouts. Fixed encounter draws, eight repeatable patrol compositions, a deterministic reward curve, scaled job stats, and ability magnitude scaling are adaptations. A guaranteed END equipment cache and guided Materia Blade summit visit fill documented source gaps and are labelled additions. The source explicitly lacks a complete proposition calendar and later map matrices. Run node scripts/check-content.mjs for source hash, reference integrity, actual native-map integration, item routes and ordered world-event gates. Run the engine suite separately for combat and campaign progression. This generated file alone does not prove that every specialist effect works. See docs/CONTENT_AUDIT.md for the scope of the evidence.

## Record-by-record map

| Source ID | Record | Section | Runtime/data destination | Coverage |
| --- | --- | --- | --- | --- |
| guide-usage | Start here — edition, navigation and reliability | Getting started / Start here | codex:guide-usage | full source reference; exact simulation not claimed |
| quick-start | A practical route into the reference | Getting started / Start here | codex:quick-start | full source reference; exact simulation not claimed |
| completion-checklist | Completion planning — irreversible-risk checklist | Getting started / Planning | codex:completion-checklist | full source reference; exact simulation not claimed |
| faq-how-do-males-and-females-differ | How do Males and Females Differ? | Getting started / Original FAQ | codex:faq-how-do-males-and-females-differ | full source reference; exact simulation not claimed |
| faq-how-does-the-battle-flow-and-what-are-ct-clockticks-and-ctr | How does the battle flow and what are CT, Clockticks and CTR? | Getting started / Original FAQ | codex:faq-how-does-the-battle-flow-and-what-are-ct-clockticks-and-ctr | full source reference; exact simulation not claimed |
| faq-how-many-saves-should-i-have | How many saves should I have? | Getting started / Original FAQ | codex:faq-how-many-saves-should-i-have | full source reference; exact simulation not claimed |
| faq-what-do-brave-and-faith-do | What do Brave and Faith do? | Getting started / Original FAQ | codex:faq-what-do-brave-and-faith-do | full source reference; exact simulation not claimed |
| faq-what-is-area-of-effect | What is Area of Effect? | Getting started / Original FAQ | codex:faq-what-is-area-of-effect | full source reference; exact simulation not claimed |
| faq-what-is-pa-ma-and-speed-and-what-do-they-do | What is PA, MA, and Speed and what do they do? | Getting started / Original FAQ | codex:faq-what-is-pa-ma-and-speed-and-what-do-they-do | full source reference; exact simulation not claimed |
| faq-what-is-the-at-menu-how-can-i-tell-who-gets-to-go-when | What is the AT Menu? How can I tell who gets to go when? | Getting started / Original FAQ | codex:faq-what-is-the-at-menu-how-can-i-tell-who-gets-to-go-when | full source reference; exact simulation not claimed |
| faq-what-s-the-deal-with-abilities | What's the deal with abilities? | Getting started / Original FAQ | codex:faq-what-s-the-deal-with-abilities | full source reference; exact simulation not claimed |
| faq-what-s-the-deal-with-evasion | What's the deal with evasion? | Getting started / Original FAQ | codex:faq-what-s-the-deal-with-evasion | full source reference; exact simulation not claimed |
| campaign-chapter-1 | Chapter 1 — preparation and battle index | Campaign / Chapter 1 | codex:campaign-chapter-1 | full source reference; exact simulation not claimed |
| campaign-chapter-2 | Chapter 2 — preparation and battle index | Campaign / Chapter 2 | codex:campaign-chapter-2 | full source reference; exact simulation not claimed |
| campaign-chapter-3 | Chapter 3 — preparation and battle index | Campaign / Chapter 3 | codex:campaign-chapter-3 | full source reference; exact simulation not claimed |
| campaign-chapter-4 | Chapter 4 — preparation and battle index | Campaign / Chapter 4 | codex:campaign-chapter-4 | full source reference; exact simulation not claimed |
| campaign-prologue | Orbonne Monastery — prologue and controls | Campaign / Prologue | encounter:campaign-prologue, codex:campaign-prologue | adapted gameplay + full source record |
| battle-2-1a | Gariland | Campaign / Chapter 1 | encounter:battle-2-1a, soldier-office, codex:battle-2-1a | adapted gameplay + full source record |
| battle-2-1b | Mandalia Plains | Campaign / Chapter 1 | encounter:battle-2-1b, codex:battle-2-1b | adapted gameplay + full source record |
| battle-2-1c | Sweegy Woods | Campaign / Chapter 1 | encounter:battle-2-1c, codex:battle-2-1c | adapted gameplay + full source record |
| battle-2-1d | Dorter Trade City | Campaign / Chapter 1 | encounter:battle-2-1d, codex:battle-2-1d | adapted gameplay + full source record |
| battle-2-1e | Sand Rat Cellar | Campaign / Chapter 1 | encounter:battle-2-1e, codex:battle-2-1e | adapted gameplay + full source record |
| battle-2-1f | Thieves Fort | Campaign / Chapter 1 | encounter:battle-2-1f, codex:battle-2-1f | adapted gameplay + full source record |
| battle-2-1g | Lenalia Plateau | Campaign / Chapter 1 | encounter:battle-2-1g, codex:battle-2-1g | adapted gameplay + full source record |
| battle-2-1h | Fovoham Plains | Campaign / Chapter 1 | encounter:battle-2-1h, codex:battle-2-1h | adapted gameplay + full source record |
| battle-2-1i | Fort Zeakden | Campaign / Chapter 1 | encounter:battle-2-1i, codex:battle-2-1i | adapted gameplay + full source record |
| battle-2-2a | Dorter Trade City II | Campaign / Chapter 2 | encounter:battle-2-2a, codex:battle-2-2a | adapted gameplay + full source record |
| battle-2-2b | Araguay Woods | Campaign / Chapter 2 | encounter:battle-2-2b, codex:battle-2-2b | adapted gameplay + full source record |
| battle-2-2c | Zirekile Falls | Campaign / Chapter 2 | encounter:battle-2-2c, codex:battle-2-2c | adapted gameplay + full source record |
| battle-2-2d | Zaland Fort City | Campaign / Chapter 2 | encounter:battle-2-2d, codex:battle-2-2d | adapted gameplay + full source record |
| battle-2-2e | Bariaus Hill | Campaign / Chapter 2 | encounter:battle-2-2e, codex:battle-2-2e | adapted gameplay + full source record |
| battle-2-2f | Zigolis Swamp | Campaign / Chapter 2 | encounter:battle-2-2f, codex:battle-2-2f | adapted gameplay + full source record |
| battle-2-2g | Goug Machine City | Campaign / Chapter 2 | encounter:battle-2-2g, codex:battle-2-2g | adapted gameplay + full source record |
| battle-2-2h | Bariaus Valley | Campaign / Chapter 2 | encounter:battle-2-2h, codex:battle-2-2h | adapted gameplay + full source record |
| battle-2-2i | Golgorand Execution Site | Campaign / Chapter 2 | encounter:battle-2-2i, codex:battle-2-2i | adapted gameplay + full source record |
| battle-2-2j | Lionel Castle | Campaign / Chapter 2 | encounter:battle-2-2j, codex:battle-2-2j | adapted gameplay + full source record |
| battle-2-2k | Queklain | Campaign / Chapter 2 | encounter:battle-2-2k, codex:battle-2-2k | adapted gameplay + full source record |
| battle-2-3a | Goland Coal City | Campaign / Chapter 3 | encounter:battle-2-3a, codex:battle-2-3a | adapted gameplay + full source record |
| battle-2-3b | Lesalia Imperial Capital | Campaign / Chapter 3 | encounter:battle-2-3b, codex:battle-2-3b | adapted gameplay + full source record |
| battle-2-3c | Orbonne I | Campaign / Chapter 3 | encounter:battle-2-3c, codex:battle-2-3c | adapted gameplay + full source record |
| battle-2-3d | Orbonne II | Campaign / Chapter 3 | encounter:battle-2-3d, codex:battle-2-3d | adapted gameplay + full source record |
| battle-2-3e | Orbonne III | Campaign / Chapter 3 | encounter:battle-2-3e, codex:battle-2-3e | adapted gameplay + full source record |
| battle-2-3f | Grog Hill | Campaign / Chapter 3 | encounter:battle-2-3f, codex:battle-2-3f | adapted gameplay + full source record |
| battle-2-3g | Yardow Fort City | Campaign / Chapter 3 | encounter:battle-2-3g, codex:battle-2-3g | adapted gameplay + full source record |
| battle-2-3h | Yugou Woods | Campaign / Chapter 3 | encounter:battle-2-3h, codex:battle-2-3h | adapted gameplay + full source record |
| battle-2-3i | Riovanes Castle I | Campaign / Chapter 3 | encounter:battle-2-3i, codex:battle-2-3i | adapted gameplay + full source record |
| battle-2-3j | Riovanes Castle II | Campaign / Chapter 3 | encounter:battle-2-3j, encounter:battle-2-3j-velius, codex:battle-2-3j | adapted gameplay + full source record |
| battle-2-3k | Riovanes Castle III | Campaign / Chapter 3 | encounter:battle-2-3k, codex:battle-2-3k | adapted gameplay + full source record |
| battle-2-4a | Doguola Pass | Campaign / Chapter 4 | encounter:battle-2-4a, codex:battle-2-4a | adapted gameplay + full source record |
| battle-2-4b | Bervenia Free City | Campaign / Chapter 4 | encounter:battle-2-4b, codex:battle-2-4b | adapted gameplay + full source record |
| battle-2-4c | Finath River | Campaign / Chapter 4 | encounter:battle-2-4c, codex:battle-2-4c | adapted gameplay + full source record |
| battle-2-4d | Zeltennia Castle | Campaign / Chapter 4 | encounter:battle-2-4d, codex:battle-2-4d | adapted gameplay + full source record |
| battle-2-4e | Bed Desert | Campaign / Chapter 4 | encounter:battle-2-4e, codex:battle-2-4e | adapted gameplay + full source record |
| battle-2-4f | Bethla Garrison | Campaign / Chapter 4 | encounter:battle-2-4f, codex:battle-2-4f | adapted gameplay + full source record |
| battle-2-4g | Bethla Sluice Gate | Campaign / Chapter 4 | encounter:battle-2-4g, codex:battle-2-4g | adapted gameplay + full source record |
| battle-2-4h | Germinas Peak | Campaign / Chapter 4 | encounter:battle-2-4h, codex:battle-2-4h | adapted gameplay + full source record |
| battle-2-4i | Poeskas Lake | Campaign / Chapter 4 | encounter:battle-2-4i, codex:battle-2-4i | adapted gameplay + full source record |
| battle-2-4j | Limberry Castle I | Campaign / Chapter 4 | encounter:battle-2-4j, codex:battle-2-4j | adapted gameplay + full source record |
| battle-2-4k | Limberry Castle II | Campaign / Chapter 4 | encounter:battle-2-4k, codex:battle-2-4k | adapted gameplay + full source record |
| battle-2-4l | Limberry Castle III | Campaign / Chapter 4 | encounter:battle-2-4l, codex:battle-2-4l | adapted gameplay + full source record |
| battle-2-4m | Igros Castle | Campaign / Chapter 4 | encounter:battle-2-4m, encounter:battle-2-4m-adramelk, codex:battle-2-4m | adapted gameplay + full source record |
| battle-2-4n | Murond Holy Place I | Campaign / Chapter 4 | encounter:battle-2-4n, codex:battle-2-4n | adapted gameplay + full source record |
| battle-2-4o | Murond Holy Place II | Campaign / Chapter 4 | encounter:battle-2-4o, codex:battle-2-4o | adapted gameplay + full source record |
| battle-2-4p | Murond Holy Place III | Campaign / Chapter 4 | encounter:battle-2-4p, codex:battle-2-4p | adapted gameplay + full source record |
| battle-2-4q | Orbonne I | Campaign / Chapter 4 | encounter:battle-2-4q, codex:battle-2-4q | adapted gameplay + full source record |
| battle-2-4r | Orbonne II | Campaign / Chapter 4 | encounter:battle-2-4r, codex:battle-2-4r | adapted gameplay + full source record |
| battle-2-4s | Murond Death City | Campaign / Chapter 4 | encounter:battle-2-4s, codex:battle-2-4s | adapted gameplay + full source record |
| battle-2-4t | Lost Sacred Precincts | Campaign / Chapter 4 | encounter:battle-2-4t, codex:battle-2-4t | adapted gameplay + full source record |
| battle-2-4u | Airship Graveyard | Campaign / Chapter 4 | encounter:battle-2-4u, codex:battle-2-4u | adapted gameplay + full source record |
| battle-2-4v | Airship Graveyard II | Campaign / Chapter 4 | encounter:battle-2-4v, encounter:battle-2-4v-ajora, codex:battle-2-4v | adapted gameplay + full source record |
| deep-dungeon | Deep Dungeon — exploration rules | Quests / Deep Dungeon | quest:deep-dungeon, world-event:warjilis-deep, codex:deep-dungeon | adapted gameplay + full source record |
| optional-colliery-1 | Goland — Colliery Underground First Floor | Quests / Optional battle plans | encounter:optional-colliery-1, quest:optional-colliery-1, codex:optional-colliery-1 | adapted gameplay + full source record |
| optional-colliery-2 | Goland — Colliery Underground Second Floor | Quests / Optional battle plans | encounter:optional-colliery-2, quest:optional-colliery-2, codex:optional-colliery-2 | adapted gameplay + full source record |
| optional-colliery-3 | Goland — Colliery Underground Third Floor | Quests / Optional battle plans | encounter:optional-colliery-3, quest:optional-colliery-3, codex:optional-colliery-3 | adapted gameplay + full source record |
| optional-colliery-passage | Goland — Underground Passage / Save Reis | Quests / Optional battle plans | encounter:optional-colliery-passage, quest:optional-colliery-passage, codex:optional-colliery-passage | adapted gameplay + full source record |
| optional-nelveska | Nelveska Temple — Worker 7 New | Quests / Optional battle plans | encounter:optional-nelveska, quest:optional-nelveska, codex:optional-nelveska | adapted gameplay + full source record |
| optional-zarghidas | Zarghidas Trade City — Save Cloud | Quests / Optional battle plans | encounter:optional-zarghidas, quest:optional-zarghidas, codex:optional-zarghidas | adapted gameplay + full source record |
| rare-battles | Rare random battles | Quests / Optional battles | encounter:rare-eleven-monks, encounter:rare-super-monsters, quest:rare-battles, codex:rare-battles | adapted gameplay + full source record |
| poaching | Poaching — monster-to-item reference | Quests / Poaching | quest:poaching, breeding-family:chocobos, breeding-family:goblins, breeding-family:bombs, breeding-family:red-panthers, breeding-family:pisco-demons, breeding-family:skeletons, breeding-family:ghouls, breeding-family:ahrimans, breeding-family:juravis, breeding-family:uribo, breeding-family:woodmen, breeding-family:bull-demons, breeding-family:morbols, breeding-family:behemoths, breeding-family:dragons, breeding-family:hyudras, codex:poaching | adapted gameplay + full source record |
| propositions | Propositions — dispatch missions | Quests / Propositions | quest:propositions, quest:proposition-secret-society, quest:proposition-master-math, quest:proposition-within-the-darkness, quest:proposition-miners-wanted, quest:proposition-one-activity, quest:proposition-defeat-behemoth, quest:proposition-shy-katedona, quest:proposition-machinist-contest, codex:propositions | adapted gameplay + full source record |
| recruitment-chain | Secret characters — original recruitment route | Quests / Recruitment | quest:recruitment-chain, world-event:goug-machine, world-event:goland-rumor, world-event:lesalia-beowulf, world-event:goug-worker8, world-event:goug-device, world-event:zeltennia-cursed, world-event:nelveska-reis, world-event:zarghidas-flower, world-event:goug-cloud, world-event:bervenia-materia, codex:recruitment-chain | adapted gameplay + full source record |
| jobs-3-jc | Job unlock chart and job progression | Jobs / Comparisons | codex:jobs-3-jc | full source reference; exact simulation not claimed |
| jobs-3-ma | Movement-ability comparison and ratings | Jobs / Comparisons | codex:jobs-3-ma | full source reference; exact simulation not claimed |
| jobs-3-ra | Reaction-ability comparison and ratings | Jobs / Comparisons | codex:jobs-3-ra | full source reference; exact simulation not claimed |
| jobs-3-sua | Support-ability comparison and ratings | Jobs / Comparisons | codex:jobs-3-sua | full source reference; exact simulation not claimed |
| class-4d | Archer | Jobs / Generic | job:archer, codex:class-4d | adapted gameplay + full source record |
| class-5b | Bard | Jobs / Generic | job:bard, codex:class-5b | adapted gameplay + full source record |
| class-5a | Calculator | Jobs / Generic | job:calculator, codex:class-5a | adapted gameplay + full source record |
| class-4b | Chemist | Jobs / Generic | job:chemist, codex:class-4b | adapted gameplay + full source record |
| class-5c | Dancer | Jobs / Generic | job:dancer, codex:class-5c | adapted gameplay + full source record |
| class-56 | Geomancer | Jobs / Generic | job:geomancer, codex:class-56 | adapted gameplay + full source record |
| class-4c | Knight | Jobs / Generic | job:knight, codex:class-4c | adapted gameplay + full source record |
| class-57 | Lancer | Jobs / Generic | job:lancer, codex:class-57 | adapted gameplay + full source record |
| class-54 | Mediator | Jobs / Generic | job:mediator, codex:class-54 | adapted gameplay + full source record |
| class-5d | Mime | Jobs / Generic | job:mime, codex:class-5d | adapted gameplay + full source record |
| class-4e | Monk | Jobs / Generic | job:monk, codex:class-4e | adapted gameplay + full source record |
| class-59 | Ninja | Jobs / Generic | job:ninja, codex:class-59 | adapted gameplay + full source record |
| class-55 | Oracle | Jobs / Generic | job:oracle, codex:class-55 | adapted gameplay + full source record |
| class-4f | Priest | Jobs / Generic | job:priest, codex:class-4f | adapted gameplay + full source record |
| class-58 | Samurai | Jobs / Generic | job:samurai, codex:class-58 | adapted gameplay + full source record |
| class-4a | Squire | Jobs / Generic | job:squire, codex:class-4a | adapted gameplay + full source record |
| class-52 | Summoner | Jobs / Generic | job:summoner, codex:class-52 | adapted gameplay + full source record |
| class-53 | Thief | Jobs / Generic | job:thief, codex:class-53 | adapted gameplay + full source record |
| class-51 | Time Mage | Jobs / Generic | job:time-mage, codex:class-51 | adapted gameplay + full source record |
| class-50 | Wizard | Jobs / Generic | job:wizard, codex:class-50 | adapted gameplay + full source record |
| job-unlocks | Generic job unlock requirements — original PlayStation | Jobs / Reference | codex:job-unlocks | full source reference; exact simulation not claimed |
| jobs-rating-legend | How the two guides rate jobs and abilities | Jobs / Reference | codex:jobs-rating-legend | full source reference; exact simulation not claimed |
| jobs-chart-legend | Jobs-chart range, speed and ability notation | Jobs / Reference | codex:jobs-chart-legend | full source reference; exact simulation not claimed |
| special-job-dark-knight | Dark Knight — special job | Jobs / Special jobs | job:dark-knight, codex:special-job-dark-knight | adapted gameplay + full source record |
| special-job-divine-knight | Divine Knight — special job | Jobs / Special jobs | job:divine-knight, codex:special-job-divine-knight | adapted gameplay + full source record |
| special-job-dragoner | Dragoner — special job | Jobs / Special jobs | job:dragoner, codex:special-job-dragoner | adapted gameplay + full source record |
| special-job-engineer | Engineer — special job | Jobs / Special jobs | job:engineer, codex:special-job-engineer | adapted gameplay + full source record |
| special-job-heaven-and-hell-knights | Heaven and Hell Knights — special job | Jobs / Special jobs | job:heaven-and-hell-knights, codex:special-job-heaven-and-hell-knights | adapted gameplay + full source record |
| special-job-holy-knight | Holy Knight — special job | Jobs / Special jobs | job:holy-knight, codex:special-job-holy-knight | adapted gameplay + full source record |
| special-job-holy-swordsman | Holy Swordsman — special job | Jobs / Special jobs | job:holy-swordsman, codex:special-job-holy-swordsman | adapted gameplay + full source record |
| special-job-soldier | Soldier — special job | Jobs / Special jobs | job:soldier, codex:special-job-soldier | adapted gameplay + full source record |
| special-job-squire | Squire — special job | Jobs / Special jobs | job:ramza-squire, codex:special-job-squire | adapted gameplay + full source record |
| special-job-temple-knight | Temple Knight — special job | Jobs / Special jobs | job:temple-knight, codex:special-job-temple-knight | adapted gameplay + full source record |
| ability-12f | Circle | Abilities / (AHRIMAN) | ability:ability-12f, codex:ability-12f | adapted gameplay + full source record |
| ability-130 | Death Sentence | Abilities / (AHRIMAN) | ability:ability-130, codex:ability-130 | adapted gameplay + full source record |
| ability-12d | Look of Devil | Abilities / (AHRIMAN) | ability:ability-12d, codex:ability-12d | adapted gameplay + full source record |
| ability-12e | Look of Fright | Abilities / (AHRIMAN) | ability:ability-12e, codex:ability-12e | adapted gameplay + full source record |
| ability-12c | Wing Attack | Abilities / (AHRIMAN) | ability:ability-12c, codex:ability-12c | adapted gameplay + full source record |
| ability-14e | Giga Flare | Abilities / (BEHEMOTH) | ability:ability-14e, codex:ability-14e | adapted gameplay + full source record |
| ability-14c | Hurricane | Abilities / (BEHEMOTH) | ability:ability-14c, codex:ability-14c | adapted gameplay + full source record |
| ability-14a | Stab Up | Abilities / (BEHEMOTH) | ability:ability-14a, codex:ability-14a | adapted gameplay + full source record |
| ability-14a-sudden-cry | Sudden Cry | Abilities / (BEHEMOTH) | ability:ability-14a-sudden-cry, codex:ability-14a-sudden-cry | adapted gameplay + full source record |
| ability-14d | Ulmaguest | Abilities / (BEHEMOTH) | ability:ability-14d, codex:ability-14d | adapted gameplay + full source record |
| ability-113 | Bite | Abilities / (BOMB) | ability:ability-113, codex:ability-113 | adapted gameplay + full source record |
| ability-116 | Flame Attack | Abilities / (BOMB) | ability:ability-116, codex:ability-116 | adapted gameplay + full source record |
| ability-115 | Self-Destruct | Abilities / (BOMB) | ability:ability-115, codex:ability-115 | adapted gameplay + full source record |
| ability-114 | Small Bomb | Abilities / (BOMB) | ability:ability-114, codex:ability-114 | adapted gameplay + full source record |
| ability-117 | Spark | Abilities / (BOMB) | ability:ability-117, codex:ability-117 | adapted gameplay + full source record |
| ability-109 | Choco Attack | Abilities / (CHOCOBO) | ability:ability-109, codex:ability-109 | adapted gameplay + full source record |
| ability-10a | Choco Ball | Abilities / (CHOCOBO) | ability:ability-10a, codex:ability-10a | adapted gameplay + full source record |
| ability-10d | Choco Cure | Abilities / (CHOCOBO) | ability:ability-10d, codex:ability-10d | adapted gameplay + full source record |
| ability-10c | Choco Esuna | Abilities / (CHOCOBO) | ability:ability-10c, codex:ability-10c | adapted gameplay + full source record |
| ability-10a-choco-meteor | Choco Meteor | Abilities / (CHOCOBO) | ability:ability-10a-choco-meteor, codex:ability-10a-choco-meteor | adapted gameplay + full source record |
| ability-132 | Beak | Abilities / (COCKATRICE) | ability:ability-132, codex:ability-132 | adapted gameplay + full source record |
| ability-135 | Beaking | Abilities / (COCKATRICE) | ability:ability-135, codex:ability-135 | adapted gameplay + full source record |
| ability-134 | Feather Bomb | Abilities / (COCKATRICE) | ability:ability-134, codex:ability-134 | adapted gameplay + full source record |
| ability-131 | Scratch Up | Abilities / (COCKATRICE) | ability:ability-131, codex:ability-131 | adapted gameplay + full source record |
| ability-133 | Shine Lover | Abilities / (COCKATRICE) | ability:ability-133, codex:ability-133 | adapted gameplay + full source record |
| ability-11a | Blaster | Abilities / (COEURL) | ability:ability-11a, codex:ability-11a | adapted gameplay + full source record |
| ability-11c | Blood Suck | Abilities / (COEURL) | ability:ability-11c, codex:ability-11c | adapted gameplay + full source record |
| ability-119 | Cat Kick | Abilities / (COEURL) | ability:ability-119, codex:ability-119 | adapted gameplay + full source record |
| ability-11b | Poison Nail | Abilities / (COEURL) | ability:ability-11b, codex:ability-11b | adapted gameplay + full source record |
| ability-118 | Scratch | Abilities / (COEURL) | ability:ability-118, codex:ability-118 | adapted gameplay + full source record |
| ability-14f | Dash | Abilities / (DRAGON) | ability:ability-14f, codex:ability-14f | adapted gameplay + full source record |
| ability-152 | Fire Bracelet | Abilities / (DRAGON) | ability:ability-152, codex:ability-152 | adapted gameplay + full source record |
| ability-151 | Ice Bracelet | Abilities / (DRAGON) | ability:ability-151, codex:ability-151 | adapted gameplay + full source record |
| ability-150 | Tail Swing | Abilities / (DRAGON) | ability:ability-150, codex:ability-150 | adapted gameplay + full source record |
| ability-153 | Thnder Brcelet | Abilities / (DRAGON) | ability:ability-153, codex:ability-153 | adapted gameplay + full source record |
| ability-13d | Clam Spirit | Abilities / (DRYAD) | ability:ability-13d, codex:ability-13d | adapted gameplay + full source record |
| ability-13b | Leaf Dance | Abilities / (DRYAD) | ability:ability-13b, codex:ability-13b | adapted gameplay + full source record |
| ability-13f | Magic Spirit | Abilities / (DRYAD) | ability:ability-13f, codex:ability-13f | adapted gameplay + full source record |
| ability-13c | Protect Spirit | Abilities / (DRYAD) | ability:ability-13c, codex:ability-13c | adapted gameplay + full source record |
| ability-13e | Spirit of Life | Abilities / (DRYAD) | ability:ability-13e, codex:ability-13e | adapted gameplay + full source record |
| ability-12a | Drain Touch | Abilities / (GHOST) | ability:ability-12a, codex:ability-12a | adapted gameplay + full source record |
| ability-12b | Grease Touch | Abilities / (GHOST) | ability:ability-12b, codex:ability-12b | adapted gameplay + full source record |
| ability-129 | Sleep Touch | Abilities / (GHOST) | ability:ability-129, codex:ability-129 | adapted gameplay + full source record |
| ability-127 | Throw Spirit | Abilities / (GHOST) | ability:ability-127, codex:ability-127 | adapted gameplay + full source record |
| ability-128 | Zombie Touch | Abilities / (GHOST) | ability:ability-128, codex:ability-128 | adapted gameplay + full source record |
| ability-111 | Eye Gouge | Abilities / (GOBLIN) | ability:ability-111, codex:ability-111 | adapted gameplay + full source record |
| ability-10f | Goblin Punch | Abilities / (GOBLIN) | ability:ability-10f, codex:ability-10f | adapted gameplay + full source record |
| ability-112 | Mutilate | Abilities / (GOBLIN) | ability:ability-112, codex:ability-112 | adapted gameplay + full source record |
| ability-10e | Tackle | Abilities / (GOBLIN) | ability:ability-10e, codex:ability-10e | adapted gameplay + full source record |
| ability-110 | Turn Punch | Abilities / (GOBLIN) | ability:ability-110, codex:ability-110 | adapted gameplay + full source record |
| ability-158 | Dark Whisper | Abilities / (HYDRA) | ability:ability-158, codex:ability-158 | adapted gameplay + full source record |
| ability-154 | Triple Attack | Abilities / (HYDRA) | ability:ability-154, codex:ability-154 | adapted gameplay + full source record |
| ability-155 | Triple Bracelet | Abilities / (HYDRA) | ability:ability-155, codex:ability-155 | adapted gameplay + full source record |
| ability-157 | Triple Flame | Abilities / (HYDRA) | ability:ability-157, codex:ability-157 | adapted gameplay + full source record |
| ability-156 | Triple Thunder | Abilities / (HYDRA) | ability:ability-156, codex:ability-156 | adapted gameplay + full source record |
| ability-11e | Black Ink | Abilities / (MINDFLAYER) | ability:ability-11e, codex:ability-11e | adapted gameplay + full source record |
| ability-121 | Level Blast | Abilities / (MINDFLAYER) | ability:ability-121, codex:ability-121 | adapted gameplay + full source record |
| ability-120 | Mind Blast | Abilities / (MINDFLAYER) | ability:ability-120, codex:ability-120 | adapted gameplay + full source record |
| ability-11f | Odd Soundwave | Abilities / (MINDFLAYER) | ability:ability-11f, codex:ability-11f | adapted gameplay + full source record |
| ability-11d | Tentacle | Abilities / (MINDFLAYER) | ability:ability-11d, codex:ability-11d | adapted gameplay + full source record |
| ability-144 | Blow Fire | Abilities / (MINOTAUR) | ability:ability-144, codex:ability-144 | adapted gameplay + full source record |
| ability-143 | Gather Power | Abilities / (MINOTAUR) | ability:ability-143, codex:ability-143 | adapted gameplay + full source record |
| ability-142 | Mimic Titan | Abilities / (MINOTAUR) | ability:ability-142, codex:ability-142 | adapted gameplay + full source record |
| ability-140 | Shake Off | Abilities / (MINOTAUR) | ability:ability-140, codex:ability-140 | adapted gameplay + full source record |
| ability-141 | Wave Around | Abilities / (MINOTAUR) | ability:ability-141, codex:ability-141 | adapted gameplay + full source record |
| ability-148 | Bad Bracelet | Abilities / (MORBOL) | ability:ability-148, codex:ability-148 | adapted gameplay + full source record |
| ability-147 | Goo | Abilities / (MORBOL) | ability:ability-147, codex:ability-147 | adapted gameplay + full source record |
| ability-146 | Lick | Abilities / (MORBOL) | ability:ability-146, codex:ability-146 | adapted gameplay + full source record |
| ability-149 | Moldball Virus | Abilities / (MORBOL) | ability:ability-149, codex:ability-149 | adapted gameplay + full source record |
| ability-145 | Tentacle | Abilities / (MORBOL) | ability:ability-145, codex:ability-145 | adapted gameplay + full source record |
| ability-124 | Aqua Soul | Abilities / (SKELETON) | ability:ability-124, codex:ability-124 | adapted gameplay + full source record |
| ability-125 | Ice Soul | Abilities / (SKELETON) | ability:ability-125, codex:ability-125 | adapted gameplay + full source record |
| ability-122 | Knife Hand | Abilities / (SKELETON) | ability:ability-122, codex:ability-122 | adapted gameplay + full source record |
| ability-123 | Thunder Soul | Abilities / (SKELETON) | ability:ability-123, codex:ability-123 | adapted gameplay + full source record |
| ability-126 | Wind Soul | Abilities / (SKELETON) | ability:ability-126, codex:ability-126 | adapted gameplay + full source record |
| ability-137 | Nose Bracelet | Abilities / (URIBO) | ability:ability-137, codex:ability-137 | adapted gameplay + full source record |
| ability-138 | Oink | Abilities / (URIBO) | ability:ability-138, codex:ability-138 | adapted gameplay + full source record |
| ability-13a | Please Eat | Abilities / (URIBO) | ability:ability-13a, codex:ability-13a | adapted gameplay + full source record |
| ability-139 | Pooh- | Abilities / (URIBO) | ability:ability-139, codex:ability-139 | adapted gameplay + full source record |
| ability-136 | Straight Dash | Abilities / (URIBO) | ability:ability-136, codex:ability-136 | adapted gameplay + full source record |
| ability-092 | Accumulate | Abilities / BASIC SKILL | ability:ability-092, codex:ability-092 | adapted gameplay + full source record |
| ability-093 | Dash | Abilities / BASIC SKILL | ability:ability-093, codex:ability-093 | adapted gameplay + full source record |
| ability-095 | Heal | Abilities / BASIC SKILL | ability:ability-095, codex:ability-095 | adapted gameplay + full source record |
| ability-094 | Throw Stone | Abilities / BASIC SKILL | ability:ability-094, codex:ability-094 | adapted gameplay + full source record |
| ability-08b | Armor Break | Abilities / BATTLE SKILL | ability:ability-08b, codex:ability-08b | adapted gameplay + full source record |
| ability-08a | Head Break | Abilities / BATTLE SKILL | ability:ability-08a, codex:ability-08a | adapted gameplay + full source record |
| ability-08e | Magic Break | Abilities / BATTLE SKILL | ability:ability-08e, codex:ability-08e | adapted gameplay + full source record |
| ability-091 | Mind Break | Abilities / BATTLE SKILL | ability:ability-091, codex:ability-091 | adapted gameplay + full source record |
| ability-090 | Power Break | Abilities / BATTLE SKILL | ability:ability-090, codex:ability-090 | adapted gameplay + full source record |
| ability-08c | Shield Break | Abilities / BATTLE SKILL | ability:ability-08c, codex:ability-08c | adapted gameplay + full source record |
| ability-08f | Speed Break | Abilities / BATTLE SKILL | ability:ability-08f, codex:ability-08f | adapted gameplay + full source record |
| ability-08d | Weapon Break | Abilities / BATTLE SKILL | ability:ability-08d, codex:ability-08d | adapted gameplay + full source record |
| ability-0ca | Bio | Abilities / BIO | ability:ability-0ca, codex:ability-0ca | adapted gameplay + full source record |
| ability-0cb | Bio | Abilities / BIO | ability:ability-0cb, codex:ability-0cb | adapted gameplay + full source record |
| ability-0cc | Bio | Abilities / BIO | ability:ability-0cc, codex:ability-0cc | adapted gameplay + full source record |
| ability-0cd | Bio 2 | Abilities / BIO | ability:ability-0cd, codex:ability-0cd | adapted gameplay + full source record |
| ability-0ce | Bio 2 | Abilities / BIO | ability:ability-0ce, codex:ability-0ce | adapted gameplay + full source record |
| ability-0cf | Bio 2 | Abilities / BIO | ability:ability-0cf, codex:ability-0cf | adapted gameplay + full source record |
| ability-0d0 | Bio 2 | Abilities / BIO | ability:ability-0d0, codex:ability-0d0 | adapted gameplay + full source record |
| ability-0d1 | Bio 3 | Abilities / BIO | ability:ability-0d1, codex:ability-0d1 | adapted gameplay + full source record |
| ability-0d2 | Bio 3 | Abilities / BIO | ability:ability-0d2, codex:ability-0d2 | adapted gameplay + full source record |
| ability-0d3 | Bio 3 | Abilities / BIO | ability:ability-0d3, codex:ability-0d3 | adapted gameplay + full source record |
| ability-014 | Bolt | Abilities / BLACK MAGIC | ability:ability-014, codex:ability-014 | adapted gameplay + full source record |
| ability-015 | Bolt 2 | Abilities / BLACK MAGIC | ability:ability-015, codex:ability-015 | adapted gameplay + full source record |
| ability-016 | Bolt 3 | Abilities / BLACK MAGIC | ability:ability-016, codex:ability-016 | adapted gameplay + full source record |
| ability-017 | Bolt 4 | Abilities / BLACK MAGIC | ability:ability-017, codex:ability-017 | adapted gameplay + full source record |
| ability-01e | Death | Abilities / BLACK MAGIC | ability:ability-01e, codex:ability-01e | adapted gameplay + full source record |
| ability-010 | Fire | Abilities / BLACK MAGIC | ability:ability-010, codex:ability-010 | adapted gameplay + full source record |
| ability-011 | Fire 2 | Abilities / BLACK MAGIC | ability:ability-011, codex:ability-011 | adapted gameplay + full source record |
| ability-012 | Fire 3 | Abilities / BLACK MAGIC | ability:ability-012, codex:ability-012 | adapted gameplay + full source record |
| ability-013 | Fire 4 | Abilities / BLACK MAGIC | ability:ability-013, codex:ability-013 | adapted gameplay + full source record |
| ability-01f | Flare | Abilities / BLACK MAGIC | ability:ability-01f, codex:ability-01f | adapted gameplay + full source record |
| ability-01d | Frog | Abilities / BLACK MAGIC | ability:ability-01d, codex:ability-01d | adapted gameplay + full source record |
| ability-018 | Ice | Abilities / BLACK MAGIC | ability:ability-018, codex:ability-018 | adapted gameplay + full source record |
| ability-019 | Ice 2 | Abilities / BLACK MAGIC | ability:ability-019, codex:ability-019 | adapted gameplay + full source record |
| ability-01a | Ice 3 | Abilities / BLACK MAGIC | ability:ability-01a, codex:ability-01a | adapted gameplay + full source record |
| ability-01b | Ice 4 | Abilities / BLACK MAGIC | ability:ability-01b, codex:ability-01b | adapted gameplay + full source record |
| ability-01c | Poison | Abilities / BLACK MAGIC | ability:ability-01c, codex:ability-01c | adapted gameplay + full source record |
| ability-0c8 | Blood Suck | Abilities / BLOOD SUCK | ability:ability-0c8, codex:ability-0c8 | adapted gameplay + full source record |
| ability-0e1 | Small Bomb | Abilities / BOMB | ability:ability-0e1, codex:ability-0e1 | adapted gameplay + full source record |
| ability-0e2 | Small Bomb | Abilities / BOMB | ability:ability-0e2, codex:ability-0e2 | adapted gameplay + full source record |
| ability-0ba | Difference | Abilities / BYBLOS | ability:ability-0ba, codex:ability-0ba | adapted gameplay + full source record |
| ability-163 | Energy | Abilities / BYBLOS | ability:ability-163, codex:ability-163 | adapted gameplay + full source record |
| ability-164 | Parasite | Abilities / BYBLOS | ability:ability-164, codex:ability-164 | adapted gameplay + full source record |
| ability-0b9 | Shock | Abilities / BYBLOS | ability:ability-0b9, codex:ability-0b9 | adapted gameplay + full source record |
| ability-0e6 | All-ultima | Abilities / COMPLETE MAGIC | ability:ability-0e6, codex:ability-0e6 | adapted gameplay + full source record |
| ability-15e | Grand Cross | Abilities / COMPLETE MAGIC | ability:ability-15e, codex:ability-15e | adapted gameplay + full source record |
| ability-061 | Disillusion | Abilities / DANCE | ability:ability-061, codex:ability-061 | adapted gameplay + full source record |
| ability-063 | Last Dance | Abilities / DANCE | ability:ability-063, codex:ability-063 | adapted gameplay + full source record |
| ability-062 | Nameless Dance | Abilities / DANCE | ability:ability-062, codex:ability-062 | adapted gameplay + full source record |
| ability-060 | Polka Polka | Abilities / DANCE | ability:ability-060, codex:ability-060 | adapted gameplay + full source record |
| ability-05f | Slow Dance | Abilities / DANCE | ability:ability-05f, codex:ability-05f | adapted gameplay + full source record |
| ability-05d | Witch Hunt | Abilities / DANCE | ability:ability-05d, codex:ability-05d | adapted gameplay + full source record |
| ability-05e | Wiznaibus | Abilities / DANCE | ability:ability-05e, codex:ability-05e | adapted gameplay + full source record |
| ability-15b | Midgar Swarm | Abilities / DARK CLOUD | ability:ability-15b, codex:ability-15b | adapted gameplay + full source record |
| ability-15a | Poison Frog | Abilities / DARK CLOUD | ability:ability-15a, codex:ability-15a | adapted gameplay + full source record |
| ability-159 | Snake Carrier | Abilities / DARK CLOUD | ability:ability-159, codex:ability-159 | adapted gameplay + full source record |
| ability-0a6 | Dark Holy | Abilities / DARK MAGIC | ability:ability-0a6, codex:ability-0a6 | adapted gameplay + full source record |
| ability-15c | Lifebreak | Abilities / DARK MAGIC | ability:ability-15c, codex:ability-15c | adapted gameplay + full source record |
| ability-0a4 | Dark Sword | Abilities / DARK SWORD | ability:ability-0a4, codex:ability-0a4 | adapted gameplay + full source record |
| ability-0a5 | Night Sword | Abilities / DARK SWORD | ability:ability-0a5, codex:ability-0a5 | adapted gameplay + full source record |
| ability-0c4 | Magic Ruin | Abilities / DESTROY SWORD | ability:ability-0c4, codex:ability-0c4 | adapted gameplay + full source record |
| ability-0c7 | Mind Ruin | Abilities / DESTROY SWORD | ability:ability-0c7, codex:ability-0c7 | adapted gameplay + full source record |
| ability-0c6 | Power Ruin | Abilities / DESTROY SWORD | ability:ability-0c6, codex:ability-0c6 | adapted gameplay + full source record |
| ability-0c5 | Speed Ruin | Abilities / DESTROY SWORD | ability:ability-0c5, codex:ability-0c5 | adapted gameplay + full source record |
| ability-0d8 | Melt | Abilities / DIMENSION MAGIC | ability:ability-0d8, codex:ability-0d8 | adapted gameplay + full source record |
| ability-0da | Quake | Abilities / DIMENSION MAGIC | ability:ability-0da, codex:ability-0da | adapted gameplay + full source record |
| ability-0d9 | Tornado | Abilities / DIMENSION MAGIC | ability:ability-0d9, codex:ability-0d9 | adapted gameplay + full source record |
| ability-0fc | Dragon Care | Abilities / DRAGON | ability:ability-0fc, codex:ability-0fc | adapted gameplay + full source record |
| ability-0fe | Dragon LevelUp | Abilities / DRAGON | ability:ability-0fe, codex:ability-0fe | adapted gameplay + full source record |
| ability-0fd | Dragon PowerUp | Abilities / DRAGON | ability:ability-0fd, codex:ability-0fd | adapted gameplay + full source record |
| ability-0fb | Dragon Tame | Abilities / DRAGON | ability:ability-0fb, codex:ability-0fb | adapted gameplay + full source record |
| ability-0f9 | Fire Bracelet | Abilities / DRAGON | ability:ability-0f9, codex:ability-0f9 | adapted gameplay + full source record |
| ability-0ff | Holy Bracelet | Abilities / DRAGON | ability:ability-0ff, codex:ability-0ff | adapted gameplay + full source record |
| ability-0f8 | Ice Bracelet | Abilities / DRAGON | ability:ability-0f8, codex:ability-0f8 | adapted gameplay + full source record |
| ability-0fa | Thnder Brcelet | Abilities / DRAGON | ability:ability-0fa, codex:ability-0fa | adapted gameplay + full source record |
| ability-04c | Asura | Abilities / DRAW OUT | ability:ability-04c, codex:ability-04c | adapted gameplay + full source record |
| ability-04e | Bizen Boat | Abilities / DRAW OUT | ability:ability-04e, codex:ability-04e | adapted gameplay + full source record |
| ability-055 | Chirijiraden | Abilities / DRAW OUT | ability:ability-055, codex:ability-055 | adapted gameplay + full source record |
| ability-050 | Heaven's Cloud | Abilities / DRAW OUT | ability:ability-050, codex:ability-050 | adapted gameplay + full source record |
| ability-053 | Kikuichimoji | Abilities / DRAW OUT | ability:ability-053, codex:ability-053 | adapted gameplay + full source record |
| ability-051 | Kiyomori | Abilities / DRAW OUT | ability:ability-051, codex:ability-051 | adapted gameplay + full source record |
| ability-04d | Koutetsu | Abilities / DRAW OUT | ability:ability-04d, codex:ability-04d | adapted gameplay + full source record |
| ability-054 | Masamune | Abilities / DRAW OUT | ability:ability-054, codex:ability-054 | adapted gameplay + full source record |
| ability-052 | Muramasa | Abilities / DRAW OUT | ability:ability-052, codex:ability-052 | adapted gameplay + full source record |
| ability-04f | Murasame | Abilities / DRAW OUT | ability:ability-04f, codex:ability-04f | adapted gameplay + full source record |
| ability-direct-3 | 3 | Abilities / Direct / command-set ability | ability:ability-direct-3, codex:ability-direct-3 | adapted gameplay + full source record |
| ability-direct-4 | 4 | Abilities / Direct / command-set ability | ability:ability-direct-4, codex:ability-direct-4 | adapted gameplay + full source record |
| ability-direct-5 | 5 | Abilities / Direct / command-set ability | ability:ability-direct-5, codex:ability-direct-5 | adapted gameplay + full source record |
| ability-direct-antidote | Antidote | Abilities / Direct / command-set ability | ability:ability-direct-antidote, codex:ability-direct-antidote | adapted gameplay + full source record |
| ability-direct-axe | Axe | Abilities / Direct / command-set ability | ability:ability-direct-axe, codex:ability-direct-axe | adapted gameplay + full source record |
| ability-direct-ball | Ball | Abilities / Direct / command-set ability | ability:ability-direct-ball, codex:ability-direct-ball | adapted gameplay + full source record |
| ability-direct-bio-darkness | Bio (Darkness) | Abilities / Direct / command-set ability | ability:ability-direct-bio-darkness, codex:ability-direct-bio-darkness | adapted gameplay + full source record |
| ability-direct-bio-oil | Bio (Oil) | Abilities / Direct / command-set ability | ability:ability-direct-bio-oil, codex:ability-direct-bio-oil | adapted gameplay + full source record |
| ability-direct-bio-poison | Bio (Poison) | Abilities / Direct / command-set ability | ability:ability-direct-bio-poison, codex:ability-direct-bio-poison | adapted gameplay + full source record |
| ability-direct-bio-2-frog | Bio 2 (Frog) | Abilities / Direct / command-set ability | ability:ability-direct-bio-2-frog, codex:ability-direct-bio-2-frog | adapted gameplay + full source record |
| ability-direct-bio-2-petrify | Bio 2 (Petrify) | Abilities / Direct / command-set ability | ability:ability-direct-bio-2-petrify, codex:ability-direct-bio-2-petrify | adapted gameplay + full source record |
| ability-direct-bio-2-silence | Bio 2 (Silence) | Abilities / Direct / command-set ability | ability:ability-direct-bio-2-silence, codex:ability-direct-bio-2-silence | adapted gameplay + full source record |
| ability-direct-bio-2-slow | Bio 2 (Slow) | Abilities / Direct / command-set ability | ability:ability-direct-bio-2-slow, codex:ability-direct-bio-2-slow | adapted gameplay + full source record |
| ability-direct-bio-3-dead | Bio 3 (Dead) | Abilities / Direct / command-set ability | ability:ability-direct-bio-3-dead, codex:ability-direct-bio-3-dead | adapted gameplay + full source record |
| ability-direct-bio-3-petrify | Bio 3 (Petrify) | Abilities / Direct / command-set ability | ability:ability-direct-bio-3-petrify, codex:ability-direct-bio-3-petrify | adapted gameplay + full source record |
| ability-direct-bio-3-undead | Bio 3 (Undead) | Abilities / Direct / command-set ability | ability:ability-direct-bio-3-undead, codex:ability-direct-bio-3-undead | adapted gameplay + full source record |
| ability-direct-blood-suck-0c8 | Blood Suck 0C8 | Abilities / Direct / command-set ability | ability:ability-direct-blood-suck-0c8, codex:ability-direct-blood-suck-0c8 | adapted gameplay + full source record |
| ability-direct-ct | CT | Abilities / Direct / command-set ability | ability:ability-direct-ct, codex:ability-direct-ct | adapted gameplay + full source record |
| ability-direct-charge-1 | Charge +1 | Abilities / Direct / command-set ability | ability:ability-direct-charge-1, codex:ability-direct-charge-1 | adapted gameplay + full source record |
| ability-direct-charge-10 | Charge +10 | Abilities / Direct / command-set ability | ability:ability-direct-charge-10, codex:ability-direct-charge-10 | adapted gameplay + full source record |
| ability-direct-charge-2 | Charge +2 | Abilities / Direct / command-set ability | ability:ability-direct-charge-2, codex:ability-direct-charge-2 | adapted gameplay + full source record |
| ability-direct-charge-20 | Charge +20 | Abilities / Direct / command-set ability | ability:ability-direct-charge-20, codex:ability-direct-charge-20 | adapted gameplay + full source record |
| ability-direct-charge-3 | Charge +3 | Abilities / Direct / command-set ability | ability:ability-direct-charge-3, codex:ability-direct-charge-3 | adapted gameplay + full source record |
| ability-direct-charge-4 | Charge +4 | Abilities / Direct / command-set ability | ability:ability-direct-charge-4, codex:ability-direct-charge-4 | adapted gameplay + full source record |
| ability-direct-charge-5 | Charge +5 | Abilities / Direct / command-set ability | ability:ability-direct-charge-5, codex:ability-direct-charge-5 | adapted gameplay + full source record |
| ability-direct-charge-7 | Charge +7 | Abilities / Direct / command-set ability | ability:ability-direct-charge-7, codex:ability-direct-charge-7 | adapted gameplay + full source record |
| ability-direct-dia-swrd-back | Dia Swrd Back | Abilities / Direct / command-set ability | ability:ability-direct-dia-swrd-back, codex:ability-direct-dia-swrd-back | adapted gameplay + full source record |
| ability-direct-dictionary | Dictionary | Abilities / Direct / command-set ability | ability:ability-direct-dictionary, codex:ability-direct-dictionary | adapted gameplay + full source record |
| ability-direct-dragn-pit-back | Dragn Pit Back | Abilities / Direct / command-set ability | ability:ability-direct-dragn-pit-back, codex:ability-direct-dragn-pit-back | adapted gameplay + full source record |
| ability-direct-echo-grass | Echo Grass | Abilities / Direct / command-set ability | ability:ability-direct-echo-grass, codex:ability-direct-echo-grass | adapted gameplay + full source record |
| ability-direct-elixir | Elixir | Abilities / Direct / command-set ability | ability:ability-direct-elixir, codex:ability-direct-elixir | adapted gameplay + full source record |
| ability-direct-equip-katana | Equip Katana | Abilities / Direct / command-set ability | ability:ability-direct-equip-katana, codex:ability-direct-equip-katana | adapted gameplay + full source record |
| ability-direct-ether | Ether | Abilities / Direct / command-set ability | ability:ability-direct-ether, codex:ability-direct-ether | adapted gameplay + full source record |
| ability-direct-exp | Exp | Abilities / Direct / command-set ability | ability:ability-direct-exp, codex:ability-direct-exp | adapted gameplay + full source record |
| ability-direct-eye-drop | Eye Drop | Abilities / Direct / command-set ability | ability:ability-direct-eye-drop, codex:ability-direct-eye-drop | adapted gameplay + full source record |
| ability-direct-hammer | Hammer | Abilities / Direct / command-set ability | ability:ability-direct-hammer, codex:ability-direct-hammer | adapted gameplay + full source record |
| ability-direct-height | Height | Abilities / Direct / command-set ability | ability:ability-direct-height, codex:ability-direct-height | adapted gameplay + full source record |
| ability-direct-hi-ether | Hi-Ether | Abilities / Direct / command-set ability | ability:ability-direct-hi-ether, codex:ability-direct-hi-ether | adapted gameplay + full source record |
| ability-direct-hi-potion | Hi-Potion | Abilities / Direct / command-set ability | ability:ability-direct-hi-potion, codex:ability-direct-hi-potion | adapted gameplay + full source record |
| ability-direct-holy-water | Holy Water | Abilities / Direct / command-set ability | ability:ability-direct-holy-water, codex:ability-direct-holy-water | adapted gameplay + full source record |
| ability-direct-ice-bracelet-0f8 | Ice Bracelet (0F8) | Abilities / Direct / command-set ability | ability:ability-direct-ice-bracelet-0f8, codex:ability-direct-ice-bracelet-0f8 | adapted gameplay + full source record |
| ability-direct-ice-bracelet-151 | Ice Bracelet (151) | Abilities / Direct / command-set ability | ability:ability-direct-ice-bracelet-151, codex:ability-direct-ice-bracelet-151 | adapted gameplay + full source record |
| ability-direct-katana | Katana | Abilities / Direct / command-set ability | ability:ability-direct-katana, codex:ability-direct-katana | adapted gameplay + full source record |
| ability-direct-knife | Knife | Abilities / Direct / command-set ability | ability:ability-direct-knife, codex:ability-direct-knife | adapted gameplay + full source record |
| ability-direct-knight-sword | Knight Sword | Abilities / Direct / command-set ability | ability:ability-direct-knight-sword, codex:ability-direct-knight-sword | adapted gameplay + full source record |
| ability-direct-level | Level | Abilities / Direct / command-set ability | ability:ability-direct-level, codex:ability-direct-level | adapted gameplay + full source record |
| ability-direct-level-jump2 | Level Jump2 | Abilities / Direct / command-set ability | ability:ability-direct-level-jump2, codex:ability-direct-level-jump2 | adapted gameplay + full source record |
| ability-direct-level-jump3 | Level Jump3 | Abilities / Direct / command-set ability | ability:ability-direct-level-jump3, codex:ability-direct-level-jump3 | adapted gameplay + full source record |
| ability-direct-level-jump4 | Level Jump4 | Abilities / Direct / command-set ability | ability:ability-direct-level-jump4, codex:ability-direct-level-jump4 | adapted gameplay + full source record |
| ability-direct-level-jump5 | Level Jump5 | Abilities / Direct / command-set ability | ability:ability-direct-level-jump5, codex:ability-direct-level-jump5 | adapted gameplay + full source record |
| ability-direct-level-jump8 | Level Jump8 | Abilities / Direct / command-set ability | ability:ability-direct-level-jump8, codex:ability-direct-level-jump8 | adapted gameplay + full source record |
| ability-direct-maiden-s-kiss | Maiden's Kiss | Abilities / Direct / command-set ability | ability:ability-direct-maiden-s-kiss, codex:ability-direct-maiden-s-kiss | adapted gameplay + full source record |
| ability-direct-ninja-sword | Ninja Sword | Abilities / Direct / command-set ability | ability:ability-direct-ninja-sword, codex:ability-direct-ninja-sword | adapted gameplay + full source record |
| ability-direct-phoenix-down | Phoenix Down | Abilities / Direct / command-set ability | ability:ability-direct-phoenix-down, codex:ability-direct-phoenix-down | adapted gameplay + full source record |
| ability-direct-potion | Potion | Abilities / Direct / command-set ability | ability:ability-direct-potion, codex:ability-direct-potion | adapted gameplay + full source record |
| ability-direct-prime-number | Prime Number | Abilities / Direct / command-set ability | ability:ability-direct-prime-number, codex:ability-direct-prime-number | adapted gameplay + full source record |
| ability-direct-remedy | Remedy | Abilities / Direct / command-set ability | ability:ability-direct-remedy, codex:ability-direct-remedy | adapted gameplay + full source record |
| ability-direct-shuriken | Shuriken | Abilities / Direct / command-set ability | ability:ability-direct-shuriken, codex:ability-direct-shuriken | adapted gameplay + full source record |
| ability-direct-soft | Soft | Abilities / Direct / command-set ability | ability:ability-direct-soft, codex:ability-direct-soft | adapted gameplay + full source record |
| ability-direct-spear | Spear | Abilities / Direct / command-set ability | ability:ability-direct-spear, codex:ability-direct-spear | adapted gameplay + full source record |
| ability-direct-stick | Stick | Abilities / Direct / command-set ability | ability:ability-direct-stick, codex:ability-direct-stick | adapted gameplay + full source record |
| ability-direct-sword | Sword | Abilities / Direct / command-set ability | ability:ability-direct-sword, codex:ability-direct-sword | adapted gameplay + full source record |
| ability-direct-ultima-0e5 | Ultima (0E5) | Abilities / Direct / command-set ability | ability:ability-direct-ultima-0e5, codex:ability-direct-ultima-0e5 | adapted gameplay + full source record |
| ability-direct-vertical-jump2 | Vertical Jump2 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump2, codex:ability-direct-vertical-jump2 | adapted gameplay + full source record |
| ability-direct-vertical-jump3 | Vertical Jump3 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump3, codex:ability-direct-vertical-jump3 | adapted gameplay + full source record |
| ability-direct-vertical-jump4 | Vertical Jump4 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump4, codex:ability-direct-vertical-jump4 | adapted gameplay + full source record |
| ability-direct-vertical-jump5 | Vertical Jump5 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump5, codex:ability-direct-vertical-jump5 | adapted gameplay + full source record |
| ability-direct-vertical-jump6 | Vertical Jump6 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump6, codex:ability-direct-vertical-jump6 | adapted gameplay + full source record |
| ability-direct-vertical-jump7 | Vertical Jump7 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump7, codex:ability-direct-vertical-jump7 | adapted gameplay + full source record |
| ability-direct-vertical-jump8 | Vertical Jump8 | Abilities / Direct / command-set ability | ability:ability-direct-vertical-jump8, codex:ability-direct-vertical-jump8 | adapted gameplay + full source record |
| ability-direct-x-potion | X-Potion | Abilities / Direct / command-set ability | ability:ability-direct-x-potion, codex:ability-direct-x-potion | adapted gameplay + full source record |
| ability-086 | Blizzard | Abilities / ELEMENTAL | ability:ability-086, codex:ability-086 | adapted gameplay + full source record |
| ability-081 | Carve Model | Abilities / ELEMENTAL | ability:ability-081, codex:ability-081 | adapted gameplay + full source record |
| ability-084 | Demon Fire | Abilities / ELEMENTAL | ability:ability-084, codex:ability-084 | adapted gameplay + full source record |
| ability-087 | Gusty Wind | Abilities / ELEMENTAL | ability:ability-087, codex:ability-087 | adapted gameplay + full source record |
| ability-080 | Hell Ivy | Abilities / ELEMENTAL | ability:ability-080, codex:ability-080 | adapted gameplay + full source record |
| ability-083 | Kamaitachi | Abilities / ELEMENTAL | ability:ability-083, codex:ability-083 | adapted gameplay + full source record |
| ability-088 | Lava Ball | Abilities / ELEMENTAL | ability:ability-088, codex:ability-088 | adapted gameplay + full source record |
| ability-082 | Local Quake | Abilities / ELEMENTAL | ability:ability-082, codex:ability-082 | adapted gameplay + full source record |
| ability-07e | Pitfall | Abilities / ELEMENTAL | ability:ability-07e, codex:ability-07e | adapted gameplay + full source record |
| ability-085 | Quicksand | Abilities / ELEMENTAL | ability:ability-085, codex:ability-085 | adapted gameplay + full source record |
| ability-07f | Water Ball | Abilities / ELEMENTAL | ability:ability-07f, codex:ability-07f | adapted gameplay + full source record |
| ability-0bc | Chicken Race | Abilities / FEAR | ability:ability-0bc, codex:ability-0bc | adapted gameplay + full source record |
| ability-0be | Darkness | Abilities / FEAR | ability:ability-0be, codex:ability-0be | adapted gameplay + full source record |
| ability-0c3 | Death Cold | Abilities / FEAR | ability:ability-0c3, codex:ability-0c3 | adapted gameplay + full source record |
| ability-0bd | Hold Tight | Abilities / FEAR | ability:ability-0bd, codex:ability-0bd | adapted gameplay + full source record |
| ability-0bf | Lose Voice | Abilities / FEAR | ability:ability-0bf, codex:ability-0bf | adapted gameplay + full source record |
| ability-0c0 | Loss | Abilities / FEAR | ability:ability-0c0, codex:ability-0c0 | adapted gameplay + full source record |
| ability-0c2 | Nightmare | Abilities / FEAR | ability:ability-0c2, codex:ability-0c2 | adapted gameplay + full source record |
| ability-0bb | Seal | Abilities / FEAR | ability:ability-0bb, codex:ability-0bb | adapted gameplay + full source record |
| ability-0c1 | Spell | Abilities / FEAR | ability:ability-0c1, codex:ability-0c1 | adapted gameplay + full source record |
| ability-097 | Cheer Up | Abilities / GUTS | ability:ability-097, codex:ability-097 | adapted gameplay + full source record |
| ability-099 | Scream | Abilities / GUTS | ability:ability-099, codex:ability-099 | adapted gameplay + full source record |
| ability-09a | Ultima | Abilities / GUTS | ability:ability-09a, codex:ability-09a | adapted gameplay + full source record |
| ability-098 | Wish | Abilities / GUTS | ability:ability-098, codex:ability-098 | adapted gameplay + full source record |
| ability-096 | Yell | Abilities / GUTS | ability:ability-096, codex:ability-096 | adapted gameplay + full source record |
| ability-0a7 | Deathspell 2 | Abilities / HOLY MAGIC | ability:ability-0a7, codex:ability-0a7 | adapted gameplay + full source record |
| ability-0d4 | MBarrier | Abilities / HOLY MAGIC | ability:ability-0d4, codex:ability-0d4 | adapted gameplay + full source record |
| ability-09d | Crush Punch | Abilities / HOLY SWORD | ability:ability-09d, codex:ability-09d | adapted gameplay + full source record |
| ability-09f | Holy Explosion | Abilities / HOLY SWORD | ability:ability-09f, codex:ability-09f | adapted gameplay + full source record |
| ability-09c-lightning-stab | Lightning Stab | Abilities / HOLY SWORD | ability:ability-09c-lightning-stab, codex:ability-09c-lightning-stab | adapted gameplay + full source record |
| ability-09c | Split Punch | Abilities / HOLY SWORD | ability:ability-09c, codex:ability-09c | adapted gameplay + full source record |
| ability-09b | Stasis Sword | Abilities / HOLY SWORD | ability:ability-09b, codex:ability-09b | adapted gameplay + full source record |
| ability-0e0 | Blind 2 | Abilities / JA MAGIC | ability:ability-0e0, codex:ability-0e0 | adapted gameplay + full source record |
| ability-0e3 | Confuse 2 | Abilities / JA MAGIC | ability:ability-0e3, codex:ability-0e3 | adapted gameplay + full source record |
| ability-0df | Flare 2 | Abilities / JA MAGIC | ability:ability-0df, codex:ability-0df | adapted gameplay + full source record |
| ability-0de | Gravi 2 | Abilities / JA MAGIC | ability:ability-0de, codex:ability-0de | adapted gameplay + full source record |
| ability-0e4 | Sleep 2 | Abilities / JA MAGIC | ability:ability-0e4, codex:ability-0e4 | adapted gameplay + full source record |
| ability-0dd | Toad 2 | Abilities / JA MAGIC | ability:ability-0dd, codex:ability-0dd | adapted gameplay + full source record |
| ability-103 | Blade Beam | Abilities / LIMIT | ability:ability-103, codex:ability-103 | adapted gameplay + full source record |
| ability-101 | Braver | Abilities / LIMIT | ability:ability-101, codex:ability-101 | adapted gameplay + full source record |
| ability-108 | Cherry Blossom | Abilities / LIMIT | ability:ability-108, codex:ability-108 | adapted gameplay + full source record |
| ability-104 | Climhazzard | Abilities / LIMIT | ability:ability-104, codex:ability-104 | adapted gameplay + full source record |
| ability-102 | Cross-slash | Abilities / LIMIT | ability:ability-102, codex:ability-102 | adapted gameplay + full source record |
| ability-106 | Finish Touch | Abilities / LIMIT | ability:ability-106, codex:ability-106 | adapted gameplay + full source record |
| ability-105 | Meteorain | Abilities / LIMIT | ability:ability-105, codex:ability-105 | adapted gameplay + full source record |
| ability-107 | Omnislash | Abilities / LIMIT | ability:ability-107, codex:ability-107 | adapted gameplay + full source record |
| ability-0eb | Aspel | Abilities / MAGIC SWORD | ability:ability-0eb, codex:ability-0eb | adapted gameplay + full source record |
| ability-0f1 | Berserk | Abilities / MAGIC SWORD | ability:ability-0f1, codex:ability-0f1 | adapted gameplay + full source record |
| ability-0ea | Blind | Abilities / MAGIC SWORD | ability:ability-0ea, codex:ability-0ea | adapted gameplay + full source record |
| ability-0f7 | Break | Abilities / MAGIC SWORD | ability:ability-0f7, codex:ability-0f7 | adapted gameplay + full source record |
| ability-0f2 | Chicken | Abilities / MAGIC SWORD | ability:ability-0f2, codex:ability-0f2 | adapted gameplay + full source record |
| ability-0f3 | Confuse | Abilities / MAGIC SWORD | ability:ability-0f3, codex:ability-0f3 | adapted gameplay + full source record |
| ability-0f4 | Despair | Abilities / MAGIC SWORD | ability:ability-0f4, codex:ability-0f4 | adapted gameplay + full source record |
| ability-0f5 | Don't Act | Abilities / MAGIC SWORD | ability:ability-0f5, codex:ability-0f5 | adapted gameplay + full source record |
| ability-0ec | Drain | Abilities / MAGIC SWORD | ability:ability-0ec, codex:ability-0ec | adapted gameplay + full source record |
| ability-0ed | Faith | Abilities / MAGIC SWORD | ability:ability-0ed, codex:ability-0ed | adapted gameplay + full source record |
| ability-0ee | Innocent | Abilities / MAGIC SWORD | ability:ability-0ee, codex:ability-0ee | adapted gameplay + full source record |
| ability-100 | Shock! | Abilities / MAGIC SWORD | ability:ability-100, codex:ability-100 | adapted gameplay + full source record |
| ability-0f0 | Silence | Abilities / MAGIC SWORD | ability:ability-0f0, codex:ability-0f0 | adapted gameplay + full source record |
| ability-0f6 | Sleep | Abilities / MAGIC SWORD | ability:ability-0f6, codex:ability-0f6 | adapted gameplay + full source record |
| ability-0ef | Zombie | Abilities / MAGIC SWORD | ability:ability-0ef, codex:ability-0ef | adapted gameplay + full source record |
| ability-0a1 | Blastar Punch | Abilities / MIGHTY SWORD | ability:ability-0a1, codex:ability-0a1 | adapted gameplay + full source record |
| ability-0a2 | Hellcry Punch | Abilities / MIGHTY SWORD | ability:ability-0a2, codex:ability-0a2 | adapted gameplay + full source record |
| ability-0a3 | Icewolf Bite | Abilities / MIGHTY SWORD | ability:ability-0a3, codex:ability-0a3 | adapted gameplay + full source record |
| ability-0a0 | Shellbust Stab | Abilities / MIGHTY SWORD | ability:ability-0a0, codex:ability-0a0 | adapted gameplay + full source record |
| ability-movement-any-ground | Any Ground | Abilities / Movement | ability:ability-movement-any-ground, codex:ability-movement-any-ground | adapted gameplay + full source record |
| ability-movement-any-weather | Any Weather | Abilities / Movement | ability:ability-movement-any-weather, codex:ability-movement-any-weather | adapted gameplay + full source record |
| ability-movement-cannot-enter-water | Cannot enter water | Abilities / Movement | ability:ability-movement-cannot-enter-water, codex:ability-movement-cannot-enter-water | adapted gameplay + full source record |
| ability-movement-float | Float | Abilities / Movement | ability:ability-movement-float, codex:ability-movement-float | adapted gameplay + full source record |
| ability-movement-fly | Fly | Abilities / Movement | ability:ability-movement-fly, codex:ability-movement-fly | adapted gameplay + full source record |
| ability-movement-ignore-height | Ignore Height | Abilities / Movement | ability:ability-movement-ignore-height, codex:ability-movement-ignore-height | adapted gameplay + full source record |
| ability-movement-jump-1 | Jump +1 | Abilities / Movement | ability:ability-movement-jump-1, codex:ability-movement-jump-1 | adapted gameplay + full source record |
| ability-movement-jump-2 | Jump +2 | Abilities / Movement | ability:ability-movement-jump-2, codex:ability-movement-jump-2 | adapted gameplay + full source record |
| ability-movement-jump-3 | Jump +3 | Abilities / Movement | ability:ability-movement-jump-3, codex:ability-movement-jump-3 | adapted gameplay + full source record |
| ability-movement-move-1 | Move +1 | Abilities / Movement | ability:ability-movement-move-1, codex:ability-movement-move-1 | adapted gameplay + full source record |
| ability-movement-move-2 | Move +2 | Abilities / Movement | ability:ability-movement-move-2, codex:ability-movement-move-2 | adapted gameplay + full source record |
| ability-movement-move-3 | Move +3 | Abilities / Movement | ability:ability-movement-move-3, codex:ability-movement-move-3 | adapted gameplay + full source record |
| ability-movement-move-undrwater | Move Undrwater | Abilities / Movement | ability:ability-movement-move-undrwater, codex:ability-movement-move-undrwater | adapted gameplay + full source record |
| ability-movement-move-in-water | Move in Water | Abilities / Movement | ability:ability-movement-move-in-water, codex:ability-movement-move-in-water | adapted gameplay + full source record |
| ability-movement-move-on-lava | Move on Lava | Abilities / Movement | ability:ability-movement-move-on-lava, codex:ability-movement-move-on-lava | adapted gameplay + full source record |
| ability-movement-move-find-item | Move-Find Item | Abilities / Movement | ability:ability-movement-move-find-item, codex:ability-movement-move-find-item | adapted gameplay + full source record |
| ability-movement-move-get-exp | Move-Get Exp | Abilities / Movement | ability:ability-movement-move-get-exp, codex:ability-movement-move-get-exp | adapted gameplay + full source record |
| ability-movement-move-get-jp | Move-Get JP | Abilities / Movement | ability:ability-movement-move-get-jp, codex:ability-movement-move-get-jp | adapted gameplay + full source record |
| ability-movement-move-hp-up | Move-HP Up | Abilities / Movement | ability:ability-movement-move-hp-up, codex:ability-movement-move-hp-up | adapted gameplay + full source record |
| ability-movement-move-mp-up | Move-MP Up | Abilities / Movement | ability:ability-movement-move-mp-up, codex:ability-movement-move-mp-up | adapted gameplay + full source record |
| ability-movement-silent-walk | Silent Walk | Abilities / Movement | ability:ability-movement-silent-walk, codex:ability-movement-silent-walk | adapted gameplay + full source record |
| ability-movement-teleport | Teleport | Abilities / Movement | ability:ability-movement-teleport, codex:ability-movement-teleport | adapted gameplay + full source record |
| ability-movement-teleport-2 | Teleport 2 | Abilities / Movement | ability:ability-movement-teleport-2, codex:ability-movement-teleport-2 | adapted gameplay + full source record |
| ability-movement-walk-on-water | Walk on Water | Abilities / Movement | ability:ability-movement-walk-on-water, codex:ability-movement-walk-on-water | adapted gameplay + full source record |
| ability-15d | Nanoflare | Abilities / NIGHT MAGIC | ability:ability-15d, codex:ability-15d | adapted gameplay + full source record |
| ability-06a | Chakra | Abilities / PUNCH ART | ability:ability-06a, codex:ability-06a | adapted gameplay + full source record |
| ability-067 | Earth Slash | Abilities / PUNCH ART | ability:ability-067, codex:ability-067 | adapted gameplay + full source record |
| ability-065 | Repeating Fist | Abilities / PUNCH ART | ability:ability-065, codex:ability-065 | adapted gameplay + full source record |
| ability-06b | Revive | Abilities / PUNCH ART | ability:ability-06b, codex:ability-06b | adapted gameplay + full source record |
| ability-068 | Secret Fist | Abilities / PUNCH ART | ability:ability-068, codex:ability-068 | adapted gameplay + full source record |
| ability-064 | Spin Fist | Abilities / PUNCH ART | ability:ability-064, codex:ability-064 | adapted gameplay + full source record |
| ability-069 | Stigma Magic | Abilities / PUNCH ART | ability:ability-069, codex:ability-069 | adapted gameplay + full source record |
| ability-066 | Wave Fist | Abilities / PUNCH ART | ability:ability-066, codex:ability-066 | adapted gameplay + full source record |
| ability-reaction-a-save | A Save | Abilities / Reaction | ability:ability-reaction-a-save, codex:ability-reaction-a-save | adapted gameplay + full source record |
| ability-reaction-abandon | Abandon | Abilities / Reaction | ability:ability-reaction-abandon, codex:ability-reaction-abandon | adapted gameplay + full source record |
| ability-reaction-absorb-used-mp | Absorb Used MP | Abilities / Reaction | ability:ability-reaction-absorb-used-mp, codex:ability-reaction-absorb-used-mp | adapted gameplay + full source record |
| ability-reaction-arrow-guard | Arrow Guard | Abilities / Reaction | ability:ability-reaction-arrow-guard, codex:ability-reaction-arrow-guard | adapted gameplay + full source record |
| ability-reaction-auto-potion | Auto Potion | Abilities / Reaction | ability:ability-reaction-auto-potion, codex:ability-reaction-auto-potion | adapted gameplay + full source record |
| ability-reaction-blade-grasp | Blade Grasp | Abilities / Reaction | ability:ability-reaction-blade-grasp, codex:ability-reaction-blade-grasp | adapted gameplay + full source record |
| ability-reaction-brave-up | Brave Up | Abilities / Reaction | ability:ability-reaction-brave-up, codex:ability-reaction-brave-up | adapted gameplay + full source record |
| ability-reaction-catch | Catch | Abilities / Reaction | ability:ability-reaction-catch, codex:ability-reaction-catch | adapted gameplay + full source record |
| ability-reaction-caution | Caution | Abilities / Reaction | ability:ability-reaction-caution, codex:ability-reaction-caution | adapted gameplay + full source record |
| ability-reaction-counter | Counter | Abilities / Reaction | ability:ability-reaction-counter, codex:ability-reaction-counter | adapted gameplay + full source record |
| ability-reaction-counter-flood | Counter Flood | Abilities / Reaction | ability:ability-reaction-counter-flood, codex:ability-reaction-counter-flood | adapted gameplay + full source record |
| ability-reaction-counter-magic | Counter Magic | Abilities / Reaction | ability:ability-reaction-counter-magic, codex:ability-reaction-counter-magic | adapted gameplay + full source record |
| ability-reaction-counter-tackle | Counter Tackle | Abilities / Reaction | ability:ability-reaction-counter-tackle, codex:ability-reaction-counter-tackle | adapted gameplay + full source record |
| ability-reaction-critical-quick | Critical Quick | Abilities / Reaction | ability:ability-reaction-critical-quick, codex:ability-reaction-critical-quick | adapted gameplay + full source record |
| ability-reaction-damage-split | Damage Split | Abilities / Reaction | ability:ability-reaction-damage-split, codex:ability-reaction-damage-split | adapted gameplay + full source record |
| ability-reaction-distribute | Distribute | Abilities / Reaction | ability:ability-reaction-distribute, codex:ability-reaction-distribute | adapted gameplay + full source record |
| ability-reaction-dragon-spirit | Dragon Spirit | Abilities / Reaction | ability:ability-reaction-dragon-spirit, codex:ability-reaction-dragon-spirit | adapted gameplay + full source record |
| ability-reaction-face-up | Face Up | Abilities / Reaction | ability:ability-reaction-face-up, codex:ability-reaction-face-up | adapted gameplay + full source record |
| ability-reaction-finger-guard | Finger Guard | Abilities / Reaction | ability:ability-reaction-finger-guard, codex:ability-reaction-finger-guard | adapted gameplay + full source record |
| ability-reaction-gilgame-heart | Gilgame Heart | Abilities / Reaction | ability:ability-reaction-gilgame-heart, codex:ability-reaction-gilgame-heart | adapted gameplay + full source record |
| ability-reaction-hp-restore | HP Restore | Abilities / Reaction | ability:ability-reaction-hp-restore, codex:ability-reaction-hp-restore | adapted gameplay + full source record |
| ability-reaction-hamedo | Hamedo | Abilities / Reaction | ability:ability-reaction-hamedo, codex:ability-reaction-hamedo | adapted gameplay + full source record |
| ability-reaction-ma-save | MA Save | Abilities / Reaction | ability:ability-reaction-ma-save, codex:ability-reaction-ma-save | adapted gameplay + full source record |
| ability-reaction-mp-restore | MP Restore | Abilities / Reaction | ability:ability-reaction-mp-restore, codex:ability-reaction-mp-restore | adapted gameplay + full source record |
| ability-reaction-mp-switch | MP Switch | Abilities / Reaction | ability:ability-reaction-mp-switch, codex:ability-reaction-mp-switch | adapted gameplay + full source record |
| ability-reaction-meatbone-slash | Meatbone Slash | Abilities / Reaction | ability:ability-reaction-meatbone-slash, codex:ability-reaction-meatbone-slash | adapted gameplay + full source record |
| ability-reaction-reflect | Reflect | Abilities / Reaction | ability:ability-reaction-reflect, codex:ability-reaction-reflect | adapted gameplay + full source record |
| ability-reaction-regenerator | Regenerator | Abilities / Reaction | ability:ability-reaction-regenerator, codex:ability-reaction-regenerator | adapted gameplay + full source record |
| ability-reaction-speed-save | Speed Save | Abilities / Reaction | ability:ability-reaction-speed-save, codex:ability-reaction-speed-save | adapted gameplay + full source record |
| ability-reaction-sunken-state | Sunken State | Abilities / Reaction | ability:ability-reaction-sunken-state, codex:ability-reaction-sunken-state | adapted gameplay + full source record |
| ability-reaction-weapon-guard | Weapon Guard | Abilities / Reaction | ability:ability-reaction-weapon-guard, codex:ability-reaction-weapon-guard | adapted gameplay + full source record |
| ability-legend | Action-ability record legend | Abilities / Reference | codex:ability-legend | full source reference; exact simulation not claimed |
| ability-0e8 | Despair 2 | Abilities / SATURATION | ability:ability-0e8, codex:ability-0e8 | adapted gameplay + full source record |
| ability-0e7 | Mute | Abilities / SATURATION | ability:ability-0e7, codex:ability-0e7 | adapted gameplay + full source record |
| ability-0e9 | Return 2 | Abilities / SATURATION | ability:ability-0e9, codex:ability-0e9 | adapted gameplay + full source record |
| ability-056 | Angel Song | Abilities / SING | ability:ability-056, codex:ability-056 | adapted gameplay + full source record |
| ability-059 | Battle Song | Abilities / SING | ability:ability-059, codex:ability-059 | adapted gameplay + full source record |
| ability-058 | Cheer Song | Abilities / SING | ability:ability-058, codex:ability-058 | adapted gameplay + full source record |
| ability-05c | Last Song | Abilities / SING | ability:ability-05c, codex:ability-05c | adapted gameplay + full source record |
| ability-057 | Life Song | Abilities / SING | ability:ability-057, codex:ability-057 | adapted gameplay + full source record |
| ability-05a | Magic Song | Abilities / SING | ability:ability-05a, codex:ability-05a | adapted gameplay + full source record |
| ability-05b | Nameless Song | Abilities / SING | ability:ability-05b, codex:ability-05b | adapted gameplay + full source record |
| ability-0d6 | Arm Aim | Abilities / SNIPE | ability:ability-0d6, codex:ability-0d6 | adapted gameplay + full source record |
| ability-0d5 | Leg Aim | Abilities / SNIPE | ability:ability-0d5, codex:ability-0d5 | adapted gameplay + full source record |
| ability-0d7 | Seal Evil | Abilities / SNIPE | ability:ability-0d7, codex:ability-0d7 | adapted gameplay + full source record |
| ability-0a8 | Galaxy Stop | Abilities / STARRY HEAVEN | ability:ability-0a8, codex:ability-0a8 | adapted gameplay + full source record |
| ability-06c | Gil Taking | Abilities / STEAL | ability:ability-06c, codex:ability-06c | adapted gameplay + full source record |
| ability-072 | Steal Accessry | Abilities / STEAL | ability:ability-072, codex:ability-072 | adapted gameplay + full source record |
| ability-06f | Steal Armor | Abilities / STEAL | ability:ability-06f, codex:ability-06f | adapted gameplay + full source record |
| ability-073 | Steal Exp. | Abilities / STEAL | ability:ability-073, codex:ability-073 | adapted gameplay + full source record |
| ability-06d | Steal Heart | Abilities / STEAL | ability:ability-06d, codex:ability-06d | adapted gameplay + full source record |
| ability-06e | Steal Helmet | Abilities / STEAL | ability:ability-06e, codex:ability-06e | adapted gameplay + full source record |
| ability-070 | Steal Shield | Abilities / STEAL | ability:ability-070, codex:ability-070 | adapted gameplay + full source record |
| ability-071 | Steal Weapon | Abilities / STEAL | ability:ability-071, codex:ability-071 | adapted gameplay + full source record |
| ability-043 | Bahamut | Abilities / SUMMON MAGIC | ability:ability-043, codex:ability-043 | adapted gameplay + full source record |
| ability-042 | Carbunkle | Abilities / SUMMON MAGIC | ability:ability-042, codex:ability-042 | adapted gameplay + full source record |
| ability-04a | Cyclops | Abilities / SUMMON MAGIC | ability:ability-04a, codex:ability-04a | adapted gameplay + full source record |
| ability-048 | Fairy | Abilities / SUMMON MAGIC | ability:ability-048, codex:ability-048 | adapted gameplay + full source record |
| ability-041 | Golem | Abilities / SUMMON MAGIC | ability:ability-041, codex:ability-041 | adapted gameplay + full source record |
| ability-03f | Ifrit | Abilities / SUMMON MAGIC | ability:ability-03f, codex:ability-03f | adapted gameplay + full source record |
| ability-045 | Leviathan | Abilities / SUMMON MAGIC | ability:ability-045, codex:ability-045 | adapted gameplay + full source record |
| ability-049 | Lich | Abilities / SUMMON MAGIC | ability:ability-049, codex:ability-049 | adapted gameplay + full source record |
| ability-03c | Moogle | Abilities / SUMMON MAGIC | ability:ability-03c, codex:ability-03c | adapted gameplay + full source record |
| ability-044 | Odin | Abilities / SUMMON MAGIC | ability:ability-044, codex:ability-044 | adapted gameplay + full source record |
| ability-03e | Ramuh | Abilities / SUMMON MAGIC | ability:ability-03e, codex:ability-03e | adapted gameplay + full source record |
| ability-046 | Salamander | Abilities / SUMMON MAGIC | ability:ability-046, codex:ability-046 | adapted gameplay + full source record |
| ability-03d | Shiva | Abilities / SUMMON MAGIC | ability:ability-03d, codex:ability-03d | adapted gameplay + full source record |
| ability-047 | Silf | Abilities / SUMMON MAGIC | ability:ability-047, codex:ability-047 | adapted gameplay + full source record |
| ability-040 | Titan | Abilities / SUMMON MAGIC | ability:ability-040, codex:ability-040 | adapted gameplay + full source record |
| ability-04b | Zodiac | Abilities / SUMMON MAGIC | ability:ability-04b, codex:ability-04b | adapted gameplay + full source record |
| ability-support-pa-ma-2 | (PA + MA) / 2 | Abilities / Support | ability:ability-support-pa-ma-2, codex:ability-support-pa-ma-2 | adapted gameplay + full source record |
| ability-support-attack-up | Attack UP | Abilities / Support | ability:ability-support-attack-up, codex:ability-support-attack-up | adapted gameplay + full source record |
| ability-support-concentrate | Concentrate | Abilities / Support | ability:ability-support-concentrate, codex:ability-support-concentrate | adapted gameplay + full source record |
| ability-support-defend | Defend | Abilities / Support | ability:ability-support-defend, codex:ability-support-defend | adapted gameplay + full source record |
| ability-support-defense-up | Defense UP | Abilities / Support | ability:ability-support-defense-up, codex:ability-support-defense-up | adapted gameplay + full source record |
| ability-support-equip-armor | Equip Armor | Abilities / Support | ability:ability-support-equip-armor, codex:ability-support-equip-armor | adapted gameplay + full source record |
| ability-support-equip-axe | Equip Axe | Abilities / Support | ability:ability-support-equip-axe, codex:ability-support-equip-axe | adapted gameplay + full source record |
| ability-support-equip-change | Equip Change | Abilities / Support | ability:ability-support-equip-change, codex:ability-support-equip-change | adapted gameplay + full source record |
| ability-support-equip-crossbow | Equip Crossbow | Abilities / Support | ability:ability-support-equip-crossbow, codex:ability-support-equip-crossbow | adapted gameplay + full source record |
| ability-support-equip-gun | Equip Gun | Abilities / Support | ability:ability-support-equip-gun, codex:ability-support-equip-gun | adapted gameplay + full source record |
| ability-support-equip-knife | Equip Knife | Abilities / Support | ability:ability-support-equip-knife, codex:ability-support-equip-knife | adapted gameplay + full source record |
| ability-support-equip-shield | Equip Shield | Abilities / Support | ability:ability-support-equip-shield, codex:ability-support-equip-shield | adapted gameplay + full source record |
| ability-support-equip-spear | Equip Spear | Abilities / Support | ability:ability-support-equip-spear, codex:ability-support-equip-spear | adapted gameplay + full source record |
| ability-support-equip-sword | Equip Sword | Abilities / Support | ability:ability-support-equip-sword, codex:ability-support-equip-sword | adapted gameplay + full source record |
| ability-support-gained-exp-up | Gained Exp-UP | Abilities / Support | ability:ability-support-gained-exp-up, codex:ability-support-gained-exp-up | adapted gameplay + full source record |
| ability-support-gained-jp-up | Gained JP-UP | Abilities / Support | ability:ability-support-gained-jp-up, codex:ability-support-gained-jp-up | adapted gameplay + full source record |
| ability-support-half-of-mp | Half of MP | Abilities / Support | ability:ability-support-half-of-mp, codex:ability-support-half-of-mp | adapted gameplay + full source record |
| ability-support-magic-attackup | Magic AttackUP | Abilities / Support | ability:ability-support-magic-attackup, codex:ability-support-magic-attackup | adapted gameplay + full source record |
| ability-support-magic-defendup | Magic DefendUP | Abilities / Support | ability:ability-support-magic-defendup, codex:ability-support-magic-defendup | adapted gameplay + full source record |
| ability-support-maintenance | Maintenance | Abilities / Support | ability:ability-support-maintenance, codex:ability-support-maintenance | adapted gameplay + full source record |
| ability-support-martial-arts | Martial Arts | Abilities / Support | ability:ability-support-martial-arts, codex:ability-support-martial-arts | adapted gameplay + full source record |
| ability-support-monster-skill | Monster Skill | Abilities / Support | ability:ability-support-monster-skill, codex:ability-support-monster-skill | adapted gameplay + full source record |
| ability-support-monster-talk | Monster Talk | Abilities / Support | ability:ability-support-monster-talk, codex:ability-support-monster-talk | adapted gameplay + full source record |
| ability-support-non-charge | Non-charge | Abilities / Support | ability:ability-support-non-charge, codex:ability-support-non-charge | adapted gameplay + full source record |
| ability-support-secret-hunt | Secret Hunt | Abilities / Support | ability:ability-support-secret-hunt, codex:ability-support-secret-hunt | adapted gameplay + full source record |
| ability-support-short-charge | Short Charge | Abilities / Support | ability:ability-support-short-charge, codex:ability-support-short-charge | adapted gameplay + full source record |
| ability-support-throw-item | Throw Item | Abilities / Support | ability:ability-support-throw-item, codex:ability-support-throw-item | adapted gameplay + full source record |
| ability-support-train | Train | Abilities / Support | ability:ability-support-train, codex:ability-support-train | adapted gameplay + full source record |
| ability-support-two-hands | Two Hands | Abilities / Support | ability:ability-support-two-hands, codex:ability-support-two-hands | adapted gameplay + full source record |
| ability-support-two-swords | Two Swords | Abilities / Support | ability:ability-support-two-swords, codex:ability-support-two-swords | adapted gameplay + full source record |
| ability-07a | Death Sentence | Abilities / TALK SKILL | ability:ability-07a, codex:ability-07a | adapted gameplay + full source record |
| ability-07c | Insult | Abilities / TALK SKILL | ability:ability-07c, codex:ability-07c | adapted gameplay + full source record |
| ability-074 | Invitation | Abilities / TALK SKILL | ability:ability-074, codex:ability-074 | adapted gameplay + full source record |
| ability-07d | Mimic Daravon | Abilities / TALK SKILL | ability:ability-07d, codex:ability-07d | adapted gameplay + full source record |
| ability-07b | Negotiate | Abilities / TALK SKILL | ability:ability-07b, codex:ability-07b | adapted gameplay + full source record |
| ability-075 | Persuade | Abilities / TALK SKILL | ability:ability-075, codex:ability-075 | adapted gameplay + full source record |
| ability-076 | Praise | Abilities / TALK SKILL | ability:ability-076, codex:ability-076 | adapted gameplay + full source record |
| ability-078 | Preach | Abilities / TALK SKILL | ability:ability-078, codex:ability-078 | adapted gameplay + full source record |
| ability-079 | Solution | Abilities / TALK SKILL | ability:ability-079, codex:ability-079 | adapted gameplay + full source record |
| ability-077 | Threaten | Abilities / TALK SKILL | ability:ability-077, codex:ability-077 | adapted gameplay + full source record |
| ability-02a | Demi | Abilities / TIME MAGIC | ability:ability-02a, codex:ability-02a | adapted gameplay + full source record |
| ability-02b | Demi 2 | Abilities / TIME MAGIC | ability:ability-02b, codex:ability-02b | adapted gameplay + full source record |
| ability-025 | Don't Move | Abilities / TIME MAGIC | ability:ability-025, codex:ability-025 | adapted gameplay + full source record |
| ability-026 | Float | Abilities / TIME MAGIC | ability:ability-026, codex:ability-026 | adapted gameplay + full source record |
| ability-020 | Haste | Abilities / TIME MAGIC | ability:ability-020, codex:ability-020 | adapted gameplay + full source record |
| ability-021 | Haste 2 | Abilities / TIME MAGIC | ability:ability-021, codex:ability-021 | adapted gameplay + full source record |
| ability-02c | Meteor | Abilities / TIME MAGIC | ability:ability-02c, codex:ability-02c | adapted gameplay + full source record |
| ability-029 | Quick | Abilities / TIME MAGIC | ability:ability-029, codex:ability-029 | adapted gameplay + full source record |
| ability-027 | Reflect | Abilities / TIME MAGIC | ability:ability-027, codex:ability-027 | adapted gameplay + full source record |
| ability-022 | Slow | Abilities / TIME MAGIC | ability:ability-022, codex:ability-022 | adapted gameplay + full source record |
| ability-023 | Slow 2 | Abilities / TIME MAGIC | ability:ability-023, codex:ability-023 | adapted gameplay + full source record |
| ability-024 | Stop | Abilities / TIME MAGIC | ability:ability-024, codex:ability-024 | adapted gameplay + full source record |
| ability-0aa | Asura | Abilities / TRUTH | ability:ability-0aa, codex:ability-0aa | adapted gameplay + full source record |
| ability-0ab | Diamond Sword | Abilities / TRUTH | ability:ability-0ab, codex:ability-0ab | adapted gameplay + full source record |
| ability-0a9 | Heaven Thunder | Abilities / TRUTH | ability:ability-0a9, codex:ability-0a9 | adapted gameplay + full source record |
| ability-0ac | Hydragon Pit | Abilities / TRUTH | ability:ability-0ac, codex:ability-0ac | adapted gameplay + full source record |
| ability-0ae | Sky Demon | Abilities / TRUTH | ability:ability-0ae, codex:ability-0ae | adapted gameplay + full source record |
| ability-0ad | Space Storage | Abilities / TRUTH | ability:ability-0ad, codex:ability-0ad | adapted gameplay + full source record |
| ability-0b3 | Space Str Back | Abilities / TRUTH | ability:ability-0b3, codex:ability-0b3 | adapted gameplay + full source record |
| ability-0e5 | Ultima | Abilities / ULTIMATE MAGIC | ability:ability-0e5, codex:ability-0e5 | adapted gameplay + full source record |
| ability-0b0 | Asura Back | Abilities / UN-TRUTH | ability:ability-0b0, codex:ability-0b0 | adapted gameplay + full source record |
| ability-0b1 | Dia Swd Back | Abilities / UN-TRUTH | ability:ability-0b1, codex:ability-0b1 | adapted gameplay + full source record |
| ability-0b2 | Dragon Pit Back | Abilities / UN-TRUTH | ability:ability-0b2, codex:ability-0b2 | adapted gameplay + full source record |
| ability-0af | Heaven Bltback | Abilities / UN-TRUTH | ability:ability-0af, codex:ability-0af | adapted gameplay + full source record |
| ability-0b4 | Sky Demon Back | Abilities / UN-TRUTH | ability:ability-0b4, codex:ability-0b4 | adapted gameplay + full source record |
| ability-0c9 | Allure | Abilities / USE HAND | ability:ability-0c9, codex:ability-0c9 | adapted gameplay + full source record |
| ability-0b5 | Seal | Abilities / USE HAND | ability:ability-0b5, codex:ability-0b5 | adapted gameplay + full source record |
| ability-0b6 | Shadow Stitch | Abilities / USE HAND | ability:ability-0b6, codex:ability-0b6 | adapted gameplay + full source record |
| ability-0b7 | Stop Bracelet | Abilities / USE HAND | ability:ability-0b7, codex:ability-0b7 | adapted gameplay + full source record |
| ability-001 | Cure | Abilities / WHITE MAGIC | ability:ability-001, codex:ability-001 | adapted gameplay + full source record |
| ability-002 | Cure 2 | Abilities / WHITE MAGIC | ability:ability-002, codex:ability-002 | adapted gameplay + full source record |
| ability-003 | Cure 3 | Abilities / WHITE MAGIC | ability:ability-003, codex:ability-003 | adapted gameplay + full source record |
| ability-004 | Cure 4 | Abilities / WHITE MAGIC | ability:ability-004, codex:ability-004 | adapted gameplay + full source record |
| ability-00e | Esuna | Abilities / WHITE MAGIC | ability:ability-00e, codex:ability-00e | adapted gameplay + full source record |
| ability-00f | Holy | Abilities / WHITE MAGIC | ability:ability-00f, codex:ability-00f | adapted gameplay + full source record |
| ability-009 | Protect | Abilities / WHITE MAGIC | ability:ability-009, codex:ability-009 | adapted gameplay + full source record |
| ability-00a | Protect 2 | Abilities / WHITE MAGIC | ability:ability-00a, codex:ability-00a | adapted gameplay + full source record |
| ability-005 | Raise | Abilities / WHITE MAGIC | ability:ability-005, codex:ability-005 | adapted gameplay + full source record |
| ability-006 | Raise 2 | Abilities / WHITE MAGIC | ability:ability-006, codex:ability-006 | adapted gameplay + full source record |
| ability-008 | Regen | Abilities / WHITE MAGIC | ability:ability-008, codex:ability-008 | adapted gameplay + full source record |
| ability-007 | Reraise | Abilities / WHITE MAGIC | ability:ability-007, codex:ability-007 | adapted gameplay + full source record |
| ability-00b | Shell | Abilities / WHITE MAGIC | ability:ability-00b, codex:ability-00b | adapted gameplay + full source record |
| ability-00c | Shell 2 | Abilities / WHITE MAGIC | ability:ability-00c, codex:ability-00c | adapted gameplay + full source record |
| ability-00d | Wall | Abilities / WHITE MAGIC | ability:ability-00d, codex:ability-00d | adapted gameplay + full source record |
| ability-160 | Compress | Abilities / WORK | ability:ability-160, codex:ability-160 | adapted gameplay + full source record |
| ability-162 | Crush | Abilities / WORK | ability:ability-162, codex:ability-162 | adapted gameplay + full source record |
| ability-15f | Destroy | Abilities / WORK | ability:ability-15f, codex:ability-15f | adapted gameplay + full source record |
| ability-161 | Dispose | Abilities / WORK | ability:ability-161, codex:ability-161 | adapted gameplay + full source record |
| ability-02e | Blind | Abilities / YIN-YANG MAGIC | ability:ability-02e, codex:ability-02e | adapted gameplay + full source record |
| ability-035 | Blind Rage | Abilities / YIN-YANG MAGIC | ability:ability-035, codex:ability-035 | adapted gameplay + full source record |
| ability-037 | Confusion Song | Abilities / YIN-YANG MAGIC | ability:ability-037, codex:ability-037 | adapted gameplay + full source record |
| ability-038 | Dispel Magic | Abilities / YIN-YANG MAGIC | ability:ability-038, codex:ability-038 | adapted gameplay + full source record |
| ability-032 | Doubt Faith | Abilities / YIN-YANG MAGIC | ability:ability-032, codex:ability-032 | adapted gameplay + full source record |
| ability-036 | Foxbird | Abilities / YIN-YANG MAGIC | ability:ability-036, codex:ability-036 | adapted gameplay + full source record |
| ability-030 | Life Drain | Abilities / YIN-YANG MAGIC | ability:ability-030, codex:ability-030 | adapted gameplay + full source record |
| ability-039 | Paralyze | Abilities / YIN-YANG MAGIC | ability:ability-039, codex:ability-039 | adapted gameplay + full source record |
| ability-03b | Petrify | Abilities / YIN-YANG MAGIC | ability:ability-03b, codex:ability-03b | adapted gameplay + full source record |
| ability-031 | Pray Faith | Abilities / YIN-YANG MAGIC | ability:ability-031, codex:ability-031 | adapted gameplay + full source record |
| ability-034 | Silence Song | Abilities / YIN-YANG MAGIC | ability:ability-034, codex:ability-034 | adapted gameplay + full source record |
| ability-03a | Sleep | Abilities / YIN-YANG MAGIC | ability:ability-03a, codex:ability-03a | adapted gameplay + full source record |
| ability-02f | Spell Absorb | Abilities / YIN-YANG MAGIC | ability:ability-02f, codex:ability-02f | adapted gameplay + full source record |
| ability-033 | Zombie | Abilities / YIN-YANG MAGIC | ability:ability-033, codex:ability-033 | adapted gameplay + full source record |
| command-3d | ALL MAGIC — command set 3D | Command sets / Index | codex:command-3d | full source reference; exact simulation not claimed |
| command-41 | ALL MAGIC — command set 41 | Command sets / Index | codex:command-41 | full source reference; exact simulation not claimed |
| command-47 | ALL MAGIC — command set 47 | Command sets / Index | codex:command-47 | full source reference; exact simulation not claimed |
| command-48 | ALL MAGIC — command set 48 | Command sets / Index | codex:command-48 | full source reference; exact simulation not claimed |
| command-78 | ALL MAGIC — command set 78 | Command sets / Index | codex:command-78 | full source reference; exact simulation not claimed |
| command-4a | ALL SWORDSKILL — command set 4A | Command sets / Index | codex:command-4a | full source reference; exact simulation not claimed |
| command-01 | ATTACK — command set 01 | Command sets / Index | codex:command-01 | full source reference; exact simulation not claimed |
| command-05 | BASIC SKILL — command set 05 | Command sets / Index | codex:command-05 | full source reference; exact simulation not claimed |
| command-1f | BASIC SKILL — command set 1F | Command sets / Index | codex:command-1f | full source reference; exact simulation not claimed |
| command-07 | BATTLE SKILL — command set 07 | Command sets / Index | codex:command-07 | full source reference; exact simulation not claimed |
| command-33 | BATTLE SKILL — command set 33 | Command sets / Index | codex:command-33 | full source reference; exact simulation not claimed |
| command-ac | BIO — command set AC | Command sets / Index | codex:command-ac | full source reference; exact simulation not claimed |
| command-0b | BLACK MAGIC — command set 0B | Command sets / Index | codex:command-0b | full source reference; exact simulation not claimed |
| command-9d | BLACK MAGIC — command set 9D | Command sets / Index | codex:command-9d | full source reference; exact simulation not claimed |
| command-a3 | BLACK MAGIC — command set A3 | Command sets / Index | codex:command-a3 | full source reference; exact simulation not claimed |
| command-3f | BLOOD SUCK — command set 3F | Command sets / Index | codex:command-3f | full source reference; exact simulation not claimed |
| command-2c | BREATH — command set 2C | Command sets / Index | codex:command-2c | full source reference; exact simulation not claimed |
| command-aa | BYBLOS — command set AA | Command sets / Index | codex:command-aa | full source reference; exact simulation not claimed |
| command-7c | CHAOS — command set 7C | Command sets / Index | codex:command-7c | full source reference; exact simulation not claimed |
| command-08 | CHARGE — command set 08 | Command sets / Index | codex:command-08 | full source reference; exact simulation not claimed |
| command-9c | CHARGE — command set 9C | Command sets / Index | codex:command-9c | full source reference; exact simulation not claimed |
| command-7d | COMPLETE MAGIC — command set 7D | Command sets / Index | codex:command-7d | full source reference; exact simulation not claimed |
| command-17 | DANCE — command set 17 | Command sets / Index | codex:command-17 | full source reference; exact simulation not claimed |
| command-ad | DARK CLOUD — command set AD | Command sets / Index | codex:command-ad | full source reference; exact simulation not claimed |
| command-ae | DARK MAGIC — command set AE | Command sets / Index | codex:command-ae | full source reference; exact simulation not claimed |
| command-20 | DARK SWORD — command set 20 | Command sets / Index | codex:command-20 | full source reference; exact simulation not claimed |
| command-27 | DARK SWORD — command set 27 | Command sets / Index | codex:command-27 | full source reference; exact simulation not claimed |
| command-02 | DEFEND — command set 02 | Command sets / Index | codex:command-02 | full source reference; exact simulation not claimed |
| command-4b | DESTROY SWORD — command set 4B | Command sets / Index | codex:command-4b | full source reference; exact simulation not claimed |
| command-70 | DIMENSION MAGC — command set 70 | Command sets / Index | codex:command-70 | full source reference; exact simulation not claimed |
| command-2b | DRAGON — command set 2B | Command sets / Index | codex:command-2b | full source reference; exact simulation not claimed |
| command-13 | DRAW OUT — command set 13 | Command sets / Index | codex:command-13 | full source reference; exact simulation not claimed |
| command-11 | ELEMENTAL — command set 11 | Command sets / Index | codex:command-11 | full source reference; exact simulation not claimed |
| command-03 | EQUIP CHANGE — command set 03 | Command sets / Index | codex:command-03 | full source reference; exact simulation not claimed |
| command-67 | FEAR — command set 67 | Command sets / Index | codex:command-67 | full source reference; exact simulation not claimed |
| command-6b | FEAR — command set 6B | Command sets / Index | codex:command-6b | full source reference; exact simulation not claimed |
| command-6f | FEAR — command set 6F | Command sets / Index | codex:command-6f | full source reference; exact simulation not claimed |
| command-73 | FEAR — command set 73 | Command sets / Index | codex:command-73 | full source reference; exact simulation not claimed |
| command-77 | FEAR — command set 77 | Command sets / Index | codex:command-77 | full source reference; exact simulation not claimed |
| command-19 | GUTS — command set 19 | Command sets / Index | codex:command-19 | full source reference; exact simulation not claimed |
| command-1a | GUTS — command set 1A | Command sets / Index | codex:command-1a | full source reference; exact simulation not claimed |
| command-1b | GUTS — command set 1B | Command sets / Index | codex:command-1b | full source reference; exact simulation not claimed |
| command-1c | GUTS — command set 1C | Command sets / Index | codex:command-1c | full source reference; exact simulation not claimed |
| command-24 | HOLY MAGIC — command set 24 | Command sets / Index | codex:command-24 | full source reference; exact simulation not claimed |
| command-31 | HOLY MAGIC — command set 31 | Command sets / Index | codex:command-31 | full source reference; exact simulation not claimed |
| command-4c | HOLY MAGIC — command set 4C | Command sets / Index | codex:command-4c | full source reference; exact simulation not claimed |
| command-1d | HOLY SWORD — command set 1D | Command sets / Index | codex:command-1d | full source reference; exact simulation not claimed |
| command-21 | HOLY SWORD — command set 21 | Command sets / Index | codex:command-21 | full source reference; exact simulation not claimed |
| command-22 | HOLY SWORD — command set 22 | Command sets / Index | codex:command-22 | full source reference; exact simulation not claimed |
| command-28 | HOLY SWORD — command set 28 | Command sets / Index | codex:command-28 | full source reference; exact simulation not claimed |
| command-30 | HOLY SWORD — command set 30 | Command sets / Index | codex:command-30 | full source reference; exact simulation not claimed |
| command-3a | HOLY SWORD — command set 3A | Command sets / Index | codex:command-3a | full source reference; exact simulation not claimed |
| command-74 | IMPURE — command set 74 | Command sets / Index | codex:command-74 | full source reference; exact simulation not claimed |
| command-06 | ITEM — command set 06 | Command sets / Index | codex:command-06 | full source reference; exact simulation not claimed |
| command-a1 | ITEM — command set A1 | Command sets / Index | codex:command-a1 | full source reference; exact simulation not claimed |
| command-6c | JA MAGIC — command set 6C | Command sets / Index | codex:command-6c | full source reference; exact simulation not claimed |
| command-12 | JUMP — command set 12 | Command sets / Index | codex:command-12 | full source reference; exact simulation not claimed |
| command-34 | JUMP — command set 34 | Command sets / Index | codex:command-34 | full source reference; exact simulation not claimed |
| command-29 | LIMIT — command set 29 | Command sets / Index | codex:command-29 | full source reference; exact simulation not claimed |
| command-45 | MAGIC SWORD — command set 45 | Command sets / Index | codex:command-45 | full source reference; exact simulation not claimed |
| command-23 | MAGIC — command set 23 | Command sets / Index | codex:command-23 | full source reference; exact simulation not claimed |
| command-15 | MATH SKILL — command set 15 | Command sets / Index | codex:command-15 | full source reference; exact simulation not claimed |
| command-1e | MIGHTY SWORD — command set 1E | Command sets / Index | codex:command-1e | full source reference; exact simulation not claimed |
| command-3c | MIGHTY SWORD — command set 3C | Command sets / Index | codex:command-3c | full source reference; exact simulation not claimed |
| command-40 | MIGHTY SWORD — command set 40 | Command sets / Index | codex:command-40 | full source reference; exact simulation not claimed |
| command-42 | MIGHTY SWORD — command set 42 | Command sets / Index | codex:command-42 | full source reference; exact simulation not claimed |
| command-43 | MIGHTY SWORD — command set 43 | Command sets / Index | codex:command-43 | full source reference; exact simulation not claimed |
| command-18 | MIMIC — command set 18 | Command sets / Index | codex:command-18 | full source reference; exact simulation not claimed |
| command-af | NIGHT MAGIC — command set AF | Command sets / Index | codex:command-af | full source reference; exact simulation not claimed |
| command-49 | PHANTOM — command set 49 | Command sets / Index | codex:command-49 | full source reference; exact simulation not claimed |
| command-09 | PUNCH ART — command set 09 | Command sets / Index | codex:command-09 | full source reference; exact simulation not claimed |
| command-35 | PUNCH SKILL — command set 35 | Command sets / Index | codex:command-35 | full source reference; exact simulation not claimed |
| command-7e | SATURATION — command set 7E | Command sets / Index | codex:command-7e | full source reference; exact simulation not claimed |
| command-16 | SING — command set 16 | Command sets / Index | codex:command-16 | full source reference; exact simulation not claimed |
| command-25 | SNIPE — command set 25 | Command sets / Index | codex:command-25 | full source reference; exact simulation not claimed |
| command-26 | SNIPE — command set 26 | Command sets / Index | codex:command-26 | full source reference; exact simulation not claimed |
| command-44 | SNIPE — command set 44 | Command sets / Index | codex:command-44 | full source reference; exact simulation not claimed |
| command-2f | STARRY HEAVEN — command set 2F | Command sets / Index | codex:command-2f | full source reference; exact simulation not claimed |
| command-0e | STEAL — command set 0E | Command sets / Index | codex:command-0e | full source reference; exact simulation not claimed |
| command-0d | SUMMON MAGIC — command set 0D | Command sets / Index | codex:command-0d | full source reference; exact simulation not claimed |
| command-a0 | SUMMON MAGIC — command set A0 | Command sets / Index | codex:command-a0 | full source reference; exact simulation not claimed |
| command-46 | SWORD SKILL — command set 46 | Command sets / Index | codex:command-46 | full source reference; exact simulation not claimed |
| command-9b | SWORD SKILL — command set 9B | Command sets / Index | codex:command-9b | full source reference; exact simulation not claimed |
| command-3b | SWORD SPIRIT — command set 3B | Command sets / Index | codex:command-3b | full source reference; exact simulation not claimed |
| command-3e | SWORD SPIRIT — command set 3E | Command sets / Index | codex:command-3e | full source reference; exact simulation not claimed |
| command-0f | TALK SKILL — command set 0F | Command sets / Index | codex:command-0f | full source reference; exact simulation not claimed |
| command-14 | THROW — command set 14 | Command sets / Index | codex:command-14 | full source reference; exact simulation not claimed |
| command-38 | THROW — command set 38 | Command sets / Index | codex:command-38 | full source reference; exact simulation not claimed |
| command-39 | THROW — command set 39 | Command sets / Index | codex:command-39 | full source reference; exact simulation not claimed |
| command-0c | TIME MAGIC — command set 0C | Command sets / Index | codex:command-0c | full source reference; exact simulation not claimed |
| command-9e | TIME MAGIC — command set 9E | Command sets / Index | codex:command-9e | full source reference; exact simulation not claimed |
| command-2d | TRUTH — command set 2D | Command sets / Index | codex:command-2d | full source reference; exact simulation not claimed |
| command-32 | TRUTH — command set 32 | Command sets / Index | codex:command-32 | full source reference; exact simulation not claimed |
| command-7b | ULTIMATE MAGIC — command set 7B | Command sets / Index | codex:command-7b | full source reference; exact simulation not claimed |
| command-2e | UN-TRUTH — command set 2E | Command sets / Index | codex:command-2e | full source reference; exact simulation not claimed |
| command-36 | USE HAND — command set 36 | Command sets / Index | codex:command-36 | full source reference; exact simulation not claimed |
| command-37 | USE HAND — command set 37 | Command sets / Index | codex:command-37 | full source reference; exact simulation not claimed |
| command-68 | WARLOCK SUMMON — command set 68 | Command sets / Index | codex:command-68 | full source reference; exact simulation not claimed |
| command-0a | WHITE MAGIC — command set 0A | Command sets / Index | codex:command-0a | full source reference; exact simulation not claimed |
| command-a2 | WHITE MAGIC — command set A2 | Command sets / Index | codex:command-a2 | full source reference; exact simulation not claimed |
| command-2a | WHITE-AID — command set 2A | Command sets / Index | codex:command-2a | full source reference; exact simulation not claimed |
| command-ab | WORK — command set AB | Command sets / Index | codex:command-ab | full source reference; exact simulation not claimed |
| command-10 | YIN-YANG MAGIC — command set 10 | Command sets / Index | codex:command-10 | full source reference; exact simulation not claimed |
| command-9f | YIN-YANG MAGIC — command set 9F | Command sets / Index | codex:command-9f | full source reference; exact simulation not claimed |
| command-a4 | YIN-YANG MAGIC — command set A4 | Command sets / Index | codex:command-a4 | full source reference; exact simulation not claimed |
| command-86 | no name — command set 86 | Command sets / Index | codex:command-86 | full source reference; exact simulation not claimed |
| command-87 | no name — command set 87 | Command sets / Index | codex:command-87 | full source reference; exact simulation not claimed |
| command-88 | no name — command set 88 | Command sets / Index | codex:command-88 | full source reference; exact simulation not claimed |
| command-89 | no name — command set 89 | Command sets / Index | codex:command-89 | full source reference; exact simulation not claimed |
| command-8a | no name — command set 8A | Command sets / Index | codex:command-8a | full source reference; exact simulation not claimed |
| command-8b | no name — command set 8B | Command sets / Index | codex:command-8b | full source reference; exact simulation not claimed |
| command-8c | no name — command set 8C | Command sets / Index | codex:command-8c | full source reference; exact simulation not claimed |
| command-8d | no name — command set 8D | Command sets / Index | codex:command-8d | full source reference; exact simulation not claimed |
| command-a7 | no name — command set A7 | Command sets / Index | codex:command-a7 | full source reference; exact simulation not claimed |
| command-a8 | no name — command set A8 | Command sets / Index | codex:command-a8 | full source reference; exact simulation not claimed |
| command-00 | null command set — command set 00 | Command sets / Index | codex:command-00 | full source reference; exact simulation not claimed |
| item-e4 | Defense Armlet | Equipment / Armlets | equipment:item-e4, codex:item-e4 | adapted gameplay + full source record |
| item-e0 | Diamond Armlet | Equipment / Armlets | equipment:item-e0, codex:item-e0 | adapted gameplay + full source record |
| item-e1 | Jade Armlet | Equipment / Armlets | equipment:item-e1, codex:item-e1 | adapted gameplay + full source record |
| item-e3 | N-Kai Armlet | Equipment / Armlets | equipment:item-e3, codex:item-e3 | adapted gameplay + full source record |
| item-ae | Bronze Armor | Equipment / Armor | equipment:item-ae, codex:item-ae | adapted gameplay + full source record |
| item-b5 | Carabini Mail | Equipment / Armor | equipment:item-b5, codex:item-b5 | adapted gameplay + full source record |
| item-af | Chain Mail | Equipment / Armor | equipment:item-af, codex:item-af | adapted gameplay + full source record |
| item-b6 | Crystal Mail | Equipment / Armor | equipment:item-b6, codex:item-b6 | adapted gameplay + full source record |
| item-b3 | Diamond Armor | Equipment / Armor | equipment:item-b3, codex:item-b3 | adapted gameplay + full source record |
| item-b7 | Genji Armor | Equipment / Armor | equipment:item-b7, codex:item-b7 | adapted gameplay + full source record |
| item-b2 | Gold Armor | Equipment / Armor | equipment:item-b2, codex:item-b2 | adapted gameplay + full source record |
| item-ac | Leather Armor | Equipment / Armor | equipment:item-ac, codex:item-ac | adapted gameplay + full source record |
| item-ad | Linen Cuirass | Equipment / Armor | equipment:item-ad, codex:item-ad | adapted gameplay + full source record |
| item-b9 | Maximillian | Equipment / Armor | equipment:item-b9, codex:item-b9 | adapted gameplay + full source record |
| item-b0 | Mythril Armor | Equipment / Armor | equipment:item-b0, codex:item-b0 | adapted gameplay + full source record |
| item-b1 | Plate Mail | Equipment / Armor | equipment:item-b1, codex:item-b1 | adapted gameplay + full source record |
| item-b4 | Platina Armor | Equipment / Armor | equipment:item-b4, codex:item-b4 | adapted gameplay + full source record |
| item-b8 | Reflect Mail | Equipment / Armor | equipment:item-b8, codex:item-b8 | adapted gameplay + full source record |
| item-notes-108-gems-armwear | 108 Gems | Equipment / Armwear | equipment:item-notes-108-gems-armwear, codex:item-notes-108-gems-armwear | adapted gameplay + full source record |
| item-30 | Battle Axe | Equipment / Axes | equipment:item-30, codex:item-30 | adapted gameplay + full source record |
| item-31 | Giant Axe | Equipment / Axes | equipment:item-31, codex:item-31 | adapted gameplay + full source record |
| item-32 | Slasher | Equipment / Axes | equipment:item-32, codex:item-32 | adapted gameplay + full source record |
| item-73 | C Bag | Equipment / Bags | equipment:item-73, codex:item-73 | adapted gameplay + full source record |
| item-74 | FS Bag | Equipment / Bags | equipment:item-74, codex:item-74 | adapted gameplay + full source record |
| item-76 | H Bag | Equipment / Bags | equipment:item-76, codex:item-76 | adapted gameplay + full source record |
| item-75 | P Bag | Equipment / Bags | equipment:item-75, codex:item-75 | adapted gameplay + full source record |
| item-notes-antidote-chemist-items | Antidote | Equipment / Chemist Items | equipment:item-notes-antidote-chemist-items, codex:item-notes-antidote-chemist-items | adapted gameplay + full source record |
| item-notes-echo-grass-chemist-items | Echo Grass | Equipment / Chemist Items | equipment:item-notes-echo-grass-chemist-items, codex:item-notes-echo-grass-chemist-items | adapted gameplay + full source record |
| item-notes-elixir-chemist-items | Elixir | Equipment / Chemist Items | equipment:item-notes-elixir-chemist-items, codex:item-notes-elixir-chemist-items | adapted gameplay + full source record |
| item-notes-ether-chemist-items | Ether | Equipment / Chemist Items | equipment:item-notes-ether-chemist-items, codex:item-notes-ether-chemist-items | adapted gameplay + full source record |
| item-notes-eye-drop-chemist-items | Eye Drop | Equipment / Chemist Items | equipment:item-notes-eye-drop-chemist-items, codex:item-notes-eye-drop-chemist-items | adapted gameplay + full source record |
| item-notes-hi-ether-chemist-items | Hi-Ether | Equipment / Chemist Items | equipment:item-notes-hi-ether-chemist-items, codex:item-notes-hi-ether-chemist-items | adapted gameplay + full source record |
| item-notes-hi-potion-chemist-items | Hi-Potion | Equipment / Chemist Items | equipment:item-notes-hi-potion-chemist-items, codex:item-notes-hi-potion-chemist-items | adapted gameplay + full source record |
| item-notes-holy-water-chemist-items | Holy Water | Equipment / Chemist Items | equipment:item-notes-holy-water-chemist-items, codex:item-notes-holy-water-chemist-items | adapted gameplay + full source record |
| item-notes-maiden-s-kiss-chemist-items | Maiden's Kiss | Equipment / Chemist Items | equipment:item-notes-maiden-s-kiss-chemist-items, codex:item-notes-maiden-s-kiss-chemist-items | adapted gameplay + full source record |
| item-notes-phoenix-down-chemist-items | Phoenix Down | Equipment / Chemist Items | equipment:item-notes-phoenix-down-chemist-items, codex:item-notes-phoenix-down-chemist-items | adapted gameplay + full source record |
| item-notes-potion-chemist-items | Potion | Equipment / Chemist Items | equipment:item-notes-potion-chemist-items, codex:item-notes-potion-chemist-items | adapted gameplay + full source record |
| item-notes-remedy-chemist-items | Remedy | Equipment / Chemist Items | equipment:item-notes-remedy-chemist-items, codex:item-notes-remedy-chemist-items | adapted gameplay + full source record |
| item-notes-soft-chemist-items | Soft | Equipment / Chemist Items | equipment:item-notes-soft-chemist-items, codex:item-notes-soft-chemist-items | adapted gameplay + full source record |
| item-notes-x-potion-chemist-items | X-Potion | Equipment / Chemist Items | equipment:item-notes-x-potion-chemist-items, codex:item-notes-x-potion-chemist-items | adapted gameplay + full source record |
| item-bf | Adaman Vest | Equipment / Clothes | equipment:item-bf, codex:item-bf | adapted gameplay + full source record |
| item-c6 | Black Costume | Equipment / Clothes | equipment:item-c6, codex:item-c6 | adapted gameplay + full source record |
| item-c1 | Brigandine | Equipment / Clothes | equipment:item-c1, codex:item-c1 | adapted gameplay + full source record |
| item-bd | Chain Vest | Equipment / Clothes | equipment:item-bd, codex:item-bd | adapted gameplay + full source record |
| item-ba | Clothes | Equipment / Clothes | equipment:item-ba, codex:item-ba | adapted gameplay + full source record |
| item-c4 | Earth Clothes | Equipment / Clothes | equipment:item-c4, codex:item-c4 | adapted gameplay + full source record |
| item-c2 | Judo Outfit | Equipment / Clothes | equipment:item-c2, codex:item-c2 | adapted gameplay + full source record |
| item-bb | Leather Outfit | Equipment / Clothes | equipment:item-bb, codex:item-bb | adapted gameplay + full source record |
| item-bc | Leather Vest | Equipment / Clothes | equipment:item-bc, codex:item-bc | adapted gameplay + full source record |
| item-be | Mythril Vest | Equipment / Clothes | equipment:item-be, codex:item-be | adapted gameplay + full source record |
| item-c3 | Power Sleeve | Equipment / Clothes | equipment:item-c3, codex:item-c3 | adapted gameplay + full source record |
| item-c7 | Rubber Costume | Equipment / Clothes | equipment:item-c7, codex:item-c7 | adapted gameplay + full source record |
| item-c5 | Secret Clothes | Equipment / Clothes | equipment:item-c5, codex:item-c5 | adapted gameplay + full source record |
| item-c0 | Wizard Outfit | Equipment / Clothes | equipment:item-c0, codex:item-c0 | adapted gameplay + full source record |
| item-78 | Cashmere | Equipment / Cloths | equipment:item-78, codex:item-78 | adapted gameplay + full source record |
| item-77 | Persia | Equipment / Cloths | equipment:item-77, codex:item-77 | adapted gameplay + full source record |
| item-79 | Ryozan Silk | Equipment / Cloths | equipment:item-79, codex:item-79 | adapted gameplay + full source record |
| item-4d | Bow Gun | Equipment / Crossbows | equipment:item-4d, codex:item-4d | adapted gameplay + full source record |
| item-4f | Cross Bow | Equipment / Crossbows | equipment:item-4f, codex:item-4f | adapted gameplay + full source record |
| item-52 | Gastrafitis | Equipment / Crossbows | equipment:item-52, codex:item-52 | adapted gameplay + full source record |
| item-51 | Hunting Bow | Equipment / Crossbows | equipment:item-51, codex:item-51 | adapted gameplay + full source record |
| item-4e | Night Killer | Equipment / Crossbows | equipment:item-4e, codex:item-4e | adapted gameplay + full source record |
| item-50 | Poison Bow | Equipment / Crossbows | equipment:item-50, codex:item-50 | adapted gameplay + full source record |
| item-09 | Air Knife | Equipment / Daggers | equipment:item-09, codex:item-09 | adapted gameplay + full source record |
| item-08 | Assassin Dagger | Equipment / Daggers | equipment:item-08, codex:item-08 | adapted gameplay + full source record |
| item-03 | Blind Knife | Equipment / Daggers | equipment:item-03, codex:item-03 | adapted gameplay + full source record |
| item-01 | Dagger | Equipment / Daggers | equipment:item-01, codex:item-01 | adapted gameplay + full source record |
| item-04 | Mage Masher | Equipment / Daggers | equipment:item-04, codex:item-04 | adapted gameplay + full source record |
| item-06 | Main Gauche | Equipment / Daggers | equipment:item-06, codex:item-06 | adapted gameplay + full source record |
| item-02 | Mythril Knife | Equipment / Daggers | equipment:item-02, codex:item-02 | adapted gameplay + full source record |
| item-07 | Orichalcum | Equipment / Daggers | equipment:item-07, codex:item-07 | adapted gameplay + full source record |
| item-05 | Platina Dagger | Equipment / Daggers | equipment:item-05, codex:item-05 | adapted gameplay + full source record |
| item-0a | Zorlin Shape | Equipment / Daggers | equipment:item-0a, codex:item-0a | adapted gameplay + full source record |
| item-5f | Battle Dict | Equipment / Dictionaries | equipment:item-5f, codex:item-5f | adapted gameplay + full source record |
| item-62 | Madlemgen | Equipment / Dictionaries | equipment:item-62, codex:item-62 | adapted gameplay + full source record |
| item-60 | Monster Dict | Equipment / Dictionaries | equipment:item-60, codex:item-60 | adapted gameplay + full source record |
| item-61 | Papyrus Plate | Equipment / Dictionaries | equipment:item-61, codex:item-61 | adapted gameplay + full source record |
| equipment-family-armor | Armor — usage and acquisition | Equipment / Family guides | codex:equipment-family-armor | full source reference; exact simulation not claimed |
| equipment-family-armwear | Armwear — usage and acquisition | Equipment / Family guides | codex:equipment-family-armwear | full source reference; exact simulation not claimed |
| equipment-family-axes | Axes — usage and acquisition | Equipment / Family guides | codex:equipment-family-axes | full source reference; exact simulation not claimed |
| equipment-family-bags | Bags — usage and acquisition | Equipment / Family guides | codex:equipment-family-bags | full source reference; exact simulation not claimed |
| equipment-family-bows | Bows — usage and acquisition | Equipment / Family guides | codex:equipment-family-bows | full source reference; exact simulation not claimed |
| equipment-family-chemist-items | Chemist Items — usage and acquisition | Equipment / Family guides | codex:equipment-family-chemist-items | full source reference; exact simulation not claimed |
| equipment-family-cloth | Cloth — usage and acquisition | Equipment / Family guides | codex:equipment-family-cloth | full source reference; exact simulation not claimed |
| equipment-family-clothes | Clothes — usage and acquisition | Equipment / Family guides | codex:equipment-family-clothes | full source reference; exact simulation not claimed |
| equipment-family-crossbows | Crossbows — usage and acquisition | Equipment / Family guides | codex:equipment-family-crossbows | full source reference; exact simulation not claimed |
| equipment-family-dictionaries | Dictionaries — usage and acquisition | Equipment / Family guides | codex:equipment-family-dictionaries | full source reference; exact simulation not claimed |
| equipment-family-female-hats | Female Hats — usage and acquisition | Equipment / Family guides | codex:equipment-family-female-hats | full source reference; exact simulation not claimed |
| equipment-family-flails | Flails — usage and acquisition | Equipment / Family guides | codex:equipment-family-flails | full source reference; exact simulation not claimed |
| equipment-family-footwear | Footwear — usage and acquisition | Equipment / Family guides | codex:equipment-family-footwear | full source reference; exact simulation not claimed |
| equipment-family-guns | Guns — usage and acquisition | Equipment / Family guides | codex:equipment-family-guns | full source reference; exact simulation not claimed |
| equipment-family-harps | Harps — usage and acquisition | Equipment / Family guides | codex:equipment-family-harps | full source reference; exact simulation not claimed |
| equipment-family-hats | Hats — usage and acquisition | Equipment / Family guides | codex:equipment-family-hats | full source reference; exact simulation not claimed |
| equipment-family-helmets | Helmets — usage and acquisition | Equipment / Family guides | codex:equipment-family-helmets | full source reference; exact simulation not claimed |
| equipment-family-katana | Katana — usage and acquisition | Equipment / Family guides | codex:equipment-family-katana | full source reference; exact simulation not claimed |
| equipment-family-knight-swords | Knight Swords — usage and acquisition | Equipment / Family guides | codex:equipment-family-knight-swords | full source reference; exact simulation not claimed |
| equipment-family-knives | Knives — usage and acquisition | Equipment / Family guides | codex:equipment-family-knives | full source reference; exact simulation not claimed |
| equipment-family-mantles | Mantles — usage and acquisition | Equipment / Family guides | codex:equipment-family-mantles | full source reference; exact simulation not claimed |
| equipment-family-ninja-items | Ninja Items — usage and acquisition | Equipment / Family guides | codex:equipment-family-ninja-items | full source reference; exact simulation not claimed |
| equipment-family-ninja-swords | Ninja Swords — usage and acquisition | Equipment / Family guides | codex:equipment-family-ninja-swords | full source reference; exact simulation not claimed |
| equipment-family-perfumes | Perfumes — usage and acquisition | Equipment / Family guides | codex:equipment-family-perfumes | full source reference; exact simulation not claimed |
| equipment-family-robes | Robes — usage and acquisition | Equipment / Family guides | codex:equipment-family-robes | full source reference; exact simulation not claimed |
| equipment-family-rods | Rods — usage and acquisition | Equipment / Family guides | codex:equipment-family-rods | full source reference; exact simulation not claimed |
| equipment-family-shields | Shields — usage and acquisition | Equipment / Family guides | codex:equipment-family-shields | full source reference; exact simulation not claimed |
| equipment-family-spears | Spears — usage and acquisition | Equipment / Family guides | codex:equipment-family-spears | full source reference; exact simulation not claimed |
| equipment-family-spell-guns | Spell Guns — usage and acquisition | Equipment / Family guides | codex:equipment-family-spell-guns | full source reference; exact simulation not claimed |
| equipment-family-staffs | Staffs — usage and acquisition | Equipment / Family guides | codex:equipment-family-staffs | full source reference; exact simulation not claimed |
| equipment-family-sticks | Sticks — usage and acquisition | Equipment / Family guides | codex:equipment-family-sticks | full source reference; exact simulation not claimed |
| equipment-family-swords | Swords — usage and acquisition | Equipment / Family guides | codex:equipment-family-swords | full source reference; exact simulation not claimed |
| item-da | Bracer | Equipment / Gauntlets | equipment:item-da, codex:item-da | adapted gameplay + full source record |
| item-d8 | Genji Gauntlet | Equipment / Gauntlets | equipment:item-d8, codex:item-d8 | adapted gameplay + full source record |
| item-d9 | Magic Gauntlet | Equipment / Gauntlets | equipment:item-d9, codex:item-d9 | adapted gameplay + full source record |
| item-d7 | Power Wrist | Equipment / Gauntlets | equipment:item-d7, codex:item-d7 | adapted gameplay + full source record |
| item-4c | Blast Gun | Equipment / Guns, Magical | equipment:item-4c, codex:item-4c | adapted gameplay + full source record |
| item-4a | Blaze Gun | Equipment / Guns, Magical | equipment:item-4a, codex:item-4a | adapted gameplay + full source record |
| item-4b | Glacier Gun | Equipment / Guns, Magical | equipment:item-4b, codex:item-4b | adapted gameplay + full source record |
| item-48 | Mythril Gun | Equipment / Guns, Physical | equipment:item-48, codex:item-48 | adapted gameplay + full source record |
| item-47 | Romanda Gun | Equipment / Guns, Physical | equipment:item-47, codex:item-47 | adapted gameplay + full source record |
| item-49 | Stone Gun | Equipment / Guns, Physical | equipment:item-49, codex:item-49 | adapted gameplay + full source record |
| item-43 | Flail | Equipment / Hammers | equipment:item-43, codex:item-43 | adapted gameplay + full source record |
| item-44 | Flame Whip | Equipment / Hammers | equipment:item-44, codex:item-44 | adapted gameplay + full source record |
| item-45 | Morning Star | Equipment / Hammers | equipment:item-45, codex:item-45 | adapted gameplay + full source record |
| item-46 | Scorpion Tail | Equipment / Hammers | equipment:item-46, codex:item-46 | adapted gameplay + full source record |
| item-a5 | Black Hood | Equipment / Hats | equipment:item-a5, codex:item-a5 | adapted gameplay + full source record |
| item-9e | Feather Hat | Equipment / Hats | equipment:item-9e, codex:item-9e | adapted gameplay + full source record |
| item-a7 | Flash Hat | Equipment / Hats | equipment:item-a7, codex:item-a7 | adapted gameplay + full source record |
| item-a6 | Golden Hairpin | Equipment / Hats | equipment:item-a6, codex:item-a6 | adapted gameplay + full source record |
| item-a2 | Green Beret | Equipment / Hats | equipment:item-a2, codex:item-a2 | adapted gameplay + full source record |
| item-a0 | Headgear | Equipment / Hats | equipment:item-a0, codex:item-a0 | adapted gameplay + full source record |
| item-a4 | Holy Miter | Equipment / Hats | equipment:item-a4, codex:item-a4 | adapted gameplay + full source record |
| item-9d | Leather Hat | Equipment / Hats | equipment:item-9d, codex:item-9d | adapted gameplay + full source record |
| item-9f | Red Hood | Equipment / Hats | equipment:item-9f, codex:item-9f | adapted gameplay + full source record |
| item-a8 | Thief Hat | Equipment / Hats | equipment:item-a8, codex:item-a8 | adapted gameplay + full source record |
| item-a1 | Triangle Hat | Equipment / Hats | equipment:item-a1, codex:item-a1 | adapted gameplay + full source record |
| item-a3 | Twist Headband | Equipment / Hats | equipment:item-a3, codex:item-a3 | adapted gameplay + full source record |
| item-93 | Barbuta | Equipment / Helmets | equipment:item-93, codex:item-93 | adapted gameplay + full source record |
| item-91 | Bronze Helmet | Equipment / Helmets | equipment:item-91, codex:item-91 | adapted gameplay + full source record |
| item-99 | Circlet | Equipment / Helmets | equipment:item-99, codex:item-99 | adapted gameplay + full source record |
| item-96 | Cross Helmet | Equipment / Helmets | equipment:item-96, codex:item-96 | adapted gameplay + full source record |
| item-9a | Crystal Helmet | Equipment / Helmets | equipment:item-9a, codex:item-9a | adapted gameplay + full source record |
| item-97 | Diamond Helmet | Equipment / Helmets | equipment:item-97, codex:item-97 | adapted gameplay + full source record |
| item-9b | Genji Helmet | Equipment / Helmets | equipment:item-9b, codex:item-9b | adapted gameplay + full source record |
| item-95 | Gold Helmet | Equipment / Helmets | equipment:item-95, codex:item-95 | adapted gameplay + full source record |
| item-9c | Grand Helmet | Equipment / Helmets | equipment:item-9c, codex:item-9c | adapted gameplay + full source record |
| item-92 | Iron Helmet | Equipment / Helmets | equipment:item-92, codex:item-92 | adapted gameplay + full source record |
| item-90 | Leather Helmet | Equipment / Helmets | equipment:item-90, codex:item-90 | adapted gameplay + full source record |
| item-94 | Mythril Helmet | Equipment / Helmets | equipment:item-94, codex:item-94 | adapted gameplay + full source record |
| item-98 | Platina Helmet | Equipment / Helmets | equipment:item-98, codex:item-98 | adapted gameplay + full source record |
| item-5d | Bloody Strings | Equipment / Instruments | equipment:item-5d, codex:item-5d | adapted gameplay + full source record |
| item-5e | Fairy Harp | Equipment / Instruments | equipment:item-5e, codex:item-5e | adapted gameplay + full source record |
| item-5c | Ramia Harp | Equipment / Instruments | equipment:item-5c, codex:item-5c | adapted gameplay + full source record |
| item-26 | Asura Knife | Equipment / Katana | equipment:item-26, codex:item-26 | adapted gameplay + full source record |
| item-28 | Bizen Boat | Equipment / Katana | equipment:item-28, codex:item-28 | adapted gameplay + full source record |
| item-2f | Chirijiraden | Equipment / Katana | equipment:item-2f, codex:item-2f | adapted gameplay + full source record |
| item-2a | Heaven's Cloud | Equipment / Katana | equipment:item-2a, codex:item-2a | adapted gameplay + full source record |
| item-2d | Kikuichimoji | Equipment / Katana | equipment:item-2d, codex:item-2d | adapted gameplay + full source record |
| item-2b | Kiyomori | Equipment / Katana | equipment:item-2b, codex:item-2b | adapted gameplay + full source record |
| item-27 | Koutetsu Knife | Equipment / Katana | equipment:item-27, codex:item-27 | adapted gameplay + full source record |
| item-2e | Masamune | Equipment / Katana | equipment:item-2e, codex:item-2e | adapted gameplay + full source record |
| item-2c | Muramasa | Equipment / Katana | equipment:item-2c, codex:item-2c | adapted gameplay + full source record |
| item-29 | Murasame | Equipment / Katana | equipment:item-29, codex:item-29 | adapted gameplay + full source record |
| item-25 | Chaos Blade | Equipment / Knight Swords | equipment:item-25, codex:item-25 | adapted gameplay + full source record |
| item-21 | Defender | Equipment / Knight Swords | equipment:item-21, codex:item-21 | adapted gameplay + full source record |
| item-23 | Excalibur | Equipment / Knight Swords | equipment:item-23, codex:item-23 | adapted gameplay + full source record |
| item-24 | Ragnarok | Equipment / Knight Swords | equipment:item-24, codex:item-24 | adapted gameplay + full source record |
| item-22 | Save the Queen | Equipment / Knight Swords | equipment:item-22, codex:item-22 | adapted gameplay + full source record |
| item-55 | Ice Bow | Equipment / Longbows | equipment:item-55, codex:item-55 | adapted gameplay + full source record |
| item-56 | Lightning Bow | Equipment / Longbows | equipment:item-56, codex:item-56 | adapted gameplay + full source record |
| item-53 | Long Bow | Equipment / Longbows | equipment:item-53, codex:item-53 | adapted gameplay + full source record |
| item-58 | Mythril Bow | Equipment / Longbows | equipment:item-58, codex:item-58 | adapted gameplay + full source record |
| item-5b | Perseus Bow | Equipment / Longbows | equipment:item-5b, codex:item-5b | adapted gameplay + full source record |
| item-54 | Silver Bow | Equipment / Longbows | equipment:item-54, codex:item-54 | adapted gameplay + full source record |
| item-59 | Ultimus Bow | Equipment / Longbows | equipment:item-59, codex:item-59 | adapted gameplay + full source record |
| item-57 | Windslash Bow | Equipment / Longbows | equipment:item-57, codex:item-57 | adapted gameplay + full source record |
| item-5a | Yoichi Bow | Equipment / Longbows | equipment:item-5a, codex:item-5a | adapted gameplay + full source record |
| item-e9 | Dracula Mantle | Equipment / Mantles | equipment:item-e9, codex:item-e9 | adapted gameplay + full source record |
| item-e8 | Elf Mantle | Equipment / Mantles | equipment:item-e8, codex:item-e8 | adapted gameplay + full source record |
| item-ea | Feather Mantle | Equipment / Mantles | equipment:item-ea, codex:item-ea | adapted gameplay + full source record |
| item-e6 | Leather Mantle | Equipment / Mantles | equipment:item-e6, codex:item-e6 | adapted gameplay + full source record |
| item-e5 | Small Mantle | Equipment / Mantles | equipment:item-e5, codex:item-e5 | adapted gameplay + full source record |
| item-eb | Vanish Mantle | Equipment / Mantles | equipment:item-eb, codex:item-eb | adapted gameplay + full source record |
| item-e7 | Wizard Mantle | Equipment / Mantles | equipment:item-e7, codex:item-e7 | adapted gameplay + full source record |
| item-0b | Hidden Knife | Equipment / Ninja Swords | equipment:item-0b, codex:item-0b | adapted gameplay + full source record |
| item-11 | Iga Knife | Equipment / Ninja Swords | equipment:item-11, codex:item-11 | adapted gameplay + full source record |
| item-12 | Koga Knife | Equipment / Ninja Swords | equipment:item-12, codex:item-12 | adapted gameplay + full source record |
| item-0e | Ninja Edge | Equipment / Ninja Swords | equipment:item-0e, codex:item-0e | adapted gameplay + full source record |
| item-0c | Ninja Knife | Equipment / Ninja Swords | equipment:item-0c, codex:item-0c | adapted gameplay + full source record |
| item-10 | Sasuke Knife | Equipment / Ninja Swords | equipment:item-10, codex:item-10 | adapted gameplay + full source record |
| item-0d | Short Edge | Equipment / Ninja Swords | equipment:item-0d, codex:item-0d | adapted gameplay + full source record |
| item-0f | Spell Edge | Equipment / Ninja Swords | equipment:item-0f, codex:item-0f | adapted gameplay + full source record |
| item-ec | Chantage | Equipment / Perfumes | equipment:item-ec, codex:item-ec | adapted gameplay + full source record |
| item-ed | Cherche | Equipment / Perfumes | equipment:item-ed, codex:item-ed | adapted gameplay + full source record |
| item-ee | Salty Rage | Equipment / Perfumes | equipment:item-ee, codex:item-ee | adapted gameplay + full source record |
| item-ef | Setiemson | Equipment / Perfumes | equipment:item-ef, codex:item-ef | adapted gameplay + full source record |
| equipment-rules-b-5 | Accessories — equipment rules | Equipment / Reference | codex:equipment-rules-b-5 | full source reference; exact simulation not claimed |
| equipment-rules-b-4 | Armor — equipment rules | Equipment / Reference | codex:equipment-rules-b-4 | full source reference; exact simulation not claimed |
| equipment-main-legend | Equipment lookup conventions and availability | Equipment / Reference | codex:equipment-main-legend | full source reference; exact simulation not claimed |
| equipment-rules-b-3 | Headgear — equipment rules | Equipment / Reference | codex:equipment-rules-b-3 | full source reference; exact simulation not claimed |
| equipment-rules-b-2 | Shields — equipment rules | Equipment / Reference | codex:equipment-rules-b-2 | full source reference; exact simulation not claimed |
| equipment-rules-b-1 | Weapons — equipment rules | Equipment / Reference | codex:equipment-rules-b-1 | full source reference; exact simulation not claimed |
| item-aa | Barette | Equipment / Ribbons | equipment:item-aa, codex:item-aa | adapted gameplay + full source record |
| item-a9 | Cachusha | Equipment / Ribbons | equipment:item-a9, codex:item-a9 | adapted gameplay + full source record |
| item-ab | Ribbon | Equipment / Ribbons | equipment:item-ab, codex:item-ab | adapted gameplay + full source record |
| item-df | Angel Ring | Equipment / Rings | equipment:item-df, codex:item-df | adapted gameplay + full source record |
| item-de | Cursed Ring | Equipment / Rings | equipment:item-de, codex:item-de | adapted gameplay + full source record |
| item-dc | Defense Ring | Equipment / Rings | equipment:item-dc, codex:item-dc | adapted gameplay + full source record |
| item-dd | Magic Ring | Equipment / Rings | equipment:item-dd, codex:item-dd | adapted gameplay + full source record |
| item-db | Reflect Ring | Equipment / Rings | equipment:item-db, codex:item-db | adapted gameplay + full source record |
| item-cd | Black Robe | Equipment / Robes | equipment:item-cd, codex:item-cd | adapted gameplay + full source record |
| item-cb | Chameleon Robe | Equipment / Robes | equipment:item-cb, codex:item-cb | adapted gameplay + full source record |
| item-ce | Light Robe | Equipment / Robes | equipment:item-ce, codex:item-ce | adapted gameplay + full source record |
| item-c8 | Linen Robe | Equipment / Robes | equipment:item-c8, codex:item-c8 | adapted gameplay + full source record |
| item-cf | Robe of Lords | Equipment / Robes | equipment:item-cf, codex:item-cf | adapted gameplay + full source record |
| item-c9 | Silk Robe | Equipment / Robes | equipment:item-c9, codex:item-c9 | adapted gameplay + full source record |
| item-cc | White Robe | Equipment / Robes | equipment:item-cc, codex:item-cc | adapted gameplay + full source record |
| item-ca | Wizard Robe | Equipment / Robes | equipment:item-ca, codex:item-ca | adapted gameplay + full source record |
| item-39 | Dragon Rod | Equipment / Rods | equipment:item-39, codex:item-39 | adapted gameplay + full source record |
| item-3a | Faith Rod | Equipment / Rods | equipment:item-3a, codex:item-3a | adapted gameplay + full source record |
| item-35 | Flame Rod | Equipment / Rods | equipment:item-35, codex:item-35 | adapted gameplay + full source record |
| item-36 | Ice Rod | Equipment / Rods | equipment:item-36, codex:item-36 | adapted gameplay + full source record |
| item-37 | Poison Rod | Equipment / Rods | equipment:item-37, codex:item-37 | adapted gameplay + full source record |
| item-33 | Rod | Equipment / Rods | equipment:item-33, codex:item-33 | adapted gameplay + full source record |
| item-34 | Thunder Rod | Equipment / Rods | equipment:item-34, codex:item-34 | adapted gameplay + full source record |
| item-38 | Wizard Rod | Equipment / Rods | equipment:item-38, codex:item-38 | adapted gameplay + full source record |
| item-88 | Aegis Shield | Equipment / Shields | equipment:item-88, codex:item-88 | adapted gameplay + full source record |
| item-82 | Bronze Shield | Equipment / Shields | equipment:item-82, codex:item-82 | adapted gameplay + full source record |
| item-81 | Buckler | Equipment / Shields | equipment:item-81, codex:item-81 | adapted gameplay + full source record |
| item-8b | Crystal Shield | Equipment / Shields | equipment:item-8b, codex:item-8b | adapted gameplay + full source record |
| item-89 | Diamond Shield | Equipment / Shields | equipment:item-89, codex:item-89 | adapted gameplay + full source record |
| item-notes-escutcheon-shields | Escutcheon | Equipment / Shields | equipment:item-notes-escutcheon-shields, codex:item-notes-escutcheon-shields | adapted gameplay + full source record |
| item-notes-escutcheon-ii-shields | Escutcheon II | Equipment / Shields | equipment:item-notes-escutcheon-ii-shields, codex:item-notes-escutcheon-ii-shields | adapted gameplay + full source record |
| item-80 | Escutcheon — physical evade 10% | Equipment / Shields | equipment:item-80, codex:item-80 | adapted gameplay + full source record |
| item-8f | Escutcheon — physical evade 75% | Equipment / Shields | equipment:item-8f, codex:item-8f | adapted gameplay + full source record |
| item-87 | Flame Shield | Equipment / Shields | equipment:item-87, codex:item-87 | adapted gameplay + full source record |
| item-8c | Genji Shield | Equipment / Shields | equipment:item-8c, codex:item-8c | adapted gameplay + full source record |
| item-85 | Gold Shield | Equipment / Shields | equipment:item-85, codex:item-85 | adapted gameplay + full source record |
| item-86 | Ice Shield | Equipment / Shields | equipment:item-86, codex:item-86 | adapted gameplay + full source record |
| item-8d | Kaiser Plate | Equipment / Shields | equipment:item-8d, codex:item-8d | adapted gameplay + full source record |
| item-84 | Mythril Shield | Equipment / Shields | equipment:item-84, codex:item-84 | adapted gameplay + full source record |
| item-8a | Platina Shield | Equipment / Shields | equipment:item-8a, codex:item-8a | adapted gameplay + full source record |
| item-83 | Round Shield | Equipment / Shields | equipment:item-83, codex:item-83 | adapted gameplay + full source record |
| item-8e | Venetian Shield | Equipment / Shields | equipment:item-8e, codex:item-8e | adapted gameplay + full source record |
| item-d0 | Battle Boots | Equipment / Shoes | equipment:item-d0, codex:item-d0 | adapted gameplay + full source record |
| item-d4 | Feather Boots | Equipment / Shoes | equipment:item-d4, codex:item-d4 | adapted gameplay + full source record |
| item-d2 | Germinas Boots | Equipment / Shoes | equipment:item-d2, codex:item-d2 | adapted gameplay + full source record |
| item-d6 | Red Shoes | Equipment / Shoes | equipment:item-d6, codex:item-d6 | adapted gameplay + full source record |
| item-d3 | Rubber Shoes | Equipment / Shoes | equipment:item-d3, codex:item-d3 | adapted gameplay + full source record |
| item-d1 | Spike Boots | Equipment / Shoes | equipment:item-d1, codex:item-d1 | adapted gameplay + full source record |
| item-d5 | Sprint Shoes | Equipment / Shoes | equipment:item-d5, codex:item-d5 | adapted gameplay + full source record |
| item-69 | Dragon Whisker | Equipment / Spears | equipment:item-69, codex:item-69 | adapted gameplay + full source record |
| item-68 | Holy Lance | Equipment / Spears | equipment:item-68, codex:item-68 | adapted gameplay + full source record |
| item-notes-javelin-spears | Javelin | Equipment / Spears | equipment:item-notes-javelin-spears, codex:item-notes-javelin-spears | adapted gameplay + full source record |
| item-6a | Javelin — WP 30 | Equipment / Spears | equipment:item-6a, codex:item-6a | adapted gameplay + full source record |
| item-63 | Javelin — WP 8 | Equipment / Spears | equipment:item-63, codex:item-63 | adapted gameplay + full source record |
| item-65 | Mythril Spear | Equipment / Spears | equipment:item-65, codex:item-65 | adapted gameplay + full source record |
| item-67 | Oberisk | Equipment / Spears | equipment:item-67, codex:item-67 | adapted gameplay + full source record |
| item-66 | Partisan | Equipment / Spears | equipment:item-66, codex:item-66 | adapted gameplay + full source record |
| item-64 | Spear | Equipment / Spears | equipment:item-64, codex:item-64 | adapted gameplay + full source record |
| item-40 | Gold Staff | Equipment / Staves | equipment:item-40, codex:item-40 | adapted gameplay + full source record |
| item-3d | Healing Staff | Equipment / Staves | equipment:item-3d, codex:item-3d | adapted gameplay + full source record |
| item-41 | Mace of Zeus | Equipment / Staves | equipment:item-41, codex:item-41 | adapted gameplay + full source record |
| item-3b | Oak Staff | Equipment / Staves | equipment:item-3b, codex:item-3b | adapted gameplay + full source record |
| item-3e | Rainbow Staff | Equipment / Staves | equipment:item-3e, codex:item-3e | adapted gameplay + full source record |
| item-42 | Sage Staff | Equipment / Staves | equipment:item-42, codex:item-42 | adapted gameplay + full source record |
| item-3c | White Staff | Equipment / Staves | equipment:item-3c, codex:item-3c | adapted gameplay + full source record |
| item-3f | Wizard Staff | Equipment / Staves | equipment:item-3f, codex:item-3f | adapted gameplay + full source record |
| item-6c | Battle Bamboo | Equipment / Sticks | equipment:item-6c, codex:item-6c | adapted gameplay + full source record |
| item-6b | Cypress Rod | Equipment / Sticks | equipment:item-6b, codex:item-6b | adapted gameplay + full source record |
| item-6f | Gokuu Rod | Equipment / Sticks | equipment:item-6f, codex:item-6f | adapted gameplay + full source record |
| item-6e | Iron Fan | Equipment / Sticks | equipment:item-6e, codex:item-6e | adapted gameplay + full source record |
| item-70 | Ivory Rod | Equipment / Sticks | equipment:item-70, codex:item-70 | adapted gameplay + full source record |
| item-6d | Musk Rod | Equipment / Sticks | equipment:item-6d, codex:item-6d | adapted gameplay + full source record |
| item-71 | Octagon Rod | Equipment / Sticks | equipment:item-71, codex:item-71 | adapted gameplay + full source record |
| item-72 | Whale Whisker | Equipment / Sticks | equipment:item-72, codex:item-72 | adapted gameplay + full source record |
| item-mace-contribution | Mace of Zeus — late item-list contribution | Equipment / Supplemental descriptions | equipment:item-mace-contribution, codex:item-mace-contribution | adapted gameplay + full source record |
| item-19 | Ancient Sword | Equipment / Swords | equipment:item-19, codex:item-19 | adapted gameplay + full source record |
| item-17 | Blood Sword | Equipment / Swords | equipment:item-17, codex:item-17 | adapted gameplay + full source record |
| item-13 | Broad Sword | Equipment / Swords | equipment:item-13, codex:item-13 | adapted gameplay + full source record |
| item-18 | Coral Sword | Equipment / Swords | equipment:item-18, codex:item-18 | adapted gameplay + full source record |
| item-1c | Diamond Sword | Equipment / Swords | equipment:item-1c, codex:item-1c | adapted gameplay + full source record |
| item-1d | Ice Brand | Equipment / Swords | equipment:item-1d, codex:item-1d | adapted gameplay + full source record |
| item-15 | Iron Sword | Equipment / Swords | equipment:item-15, codex:item-15 | adapted gameplay + full source record |
| item-14 | Long Sword | Equipment / Swords | equipment:item-14, codex:item-14 | adapted gameplay + full source record |
| item-20 | Materia Blade | Equipment / Swords | equipment:item-20, world-event:bervenia-materia, codex:item-20 | adapted gameplay + full source record |
| item-16 | Mythril Sword | Equipment / Swords | equipment:item-16, codex:item-16 | adapted gameplay + full source record |
| item-1f | Nagrarock | Equipment / Swords | equipment:item-1f, codex:item-1f | adapted gameplay + full source record |
| item-1b | Platinum Sword | Equipment / Swords | equipment:item-1b, codex:item-1b | adapted gameplay + full source record |
| item-1e | Rune Blade | Equipment / Swords | equipment:item-1e, codex:item-1e | adapted gameplay + full source record |
| item-1a | Sleep Sword | Equipment / Swords | equipment:item-1a, codex:item-1a | adapted gameplay + full source record |
| item-7d | Fire Ball | Equipment / Thrown Items | equipment:item-7d, codex:item-7d | adapted gameplay + full source record |
| item-7f | Lightning Ball | Equipment / Thrown Items | equipment:item-7f, codex:item-7f | adapted gameplay + full source record |
| item-7b | Magic Shuriken | Equipment / Thrown Items | equipment:item-7b, codex:item-7b | adapted gameplay + full source record |
| item-7a | Shuriken | Equipment / Thrown Items | equipment:item-7a, codex:item-7a | adapted gameplay + full source record |
| item-7e | Water Ball | Equipment / Thrown Items | equipment:item-7e, codex:item-7e | adapted gameplay + full source record |
| item-7c | Yagyu Darkness | Equipment / Thrown Items | equipment:item-7c, codex:item-7c | adapted gameplay + full source record |
| brave-faith-practice | Brave and Faith — practical management and story choices | Mechanics / Brave & Faith | codex:brave-faith-practice | full source reference; exact simulation not claimed |
| mechanics-1-2 | Abbreviations & Symbols | Mechanics / Core systems | codex:mechanics-1-2 | full source reference; exact simulation not claimed |
| mechanics-2-1 | Attack | Mechanics / Core systems | ability:attack, codex:mechanics-2-1 | adapted gameplay + full source record |
| mechanics-3-6 | Battle Skill | Mechanics / Core systems | codex:mechanics-3-6 | full source reference; exact simulation not claimed |
| mechanics-6-6 | Blade Grasp | Mechanics / Core systems | codex:mechanics-6-6 | full source reference; exact simulation not claimed |
| mechanics-2-2 | Charge | Mechanics / Core systems | codex:mechanics-2-2 | full source reference; exact simulation not claimed |
| mechanics-6-2 | Counter Magic | Mechanics / Core systems | codex:mechanics-6-2 | full source reference; exact simulation not claimed |
| mechanics-6-1 | Crystals | Mechanics / Core systems | codex:mechanics-6-1 | full source reference; exact simulation not claimed |
| mechanics-3-2 | Damage And Success Rate Modifiers | Mechanics / Core systems | codex:mechanics-3-2 | full source reference; exact simulation not claimed |
| mechanics-1-1 | Definitions | Mechanics / Core systems | codex:mechanics-1-1 | full source reference; exact simulation not claimed |
| mechanics-3-9 | Draw Out | Mechanics / Core systems | codex:mechanics-3-9 | full source reference; exact simulation not claimed |
| mechanics-2-6 | Elemental | Mechanics / Core systems | codex:mechanics-2-6 | full source reference; exact simulation not claimed |
| mechanics-6-11 | Enemy Levels | Mechanics / Core systems | codex:mechanics-6-11 | full source reference; exact simulation not claimed |
| mechanics-1-4 | Evasion | Mechanics / Core systems | codex:mechanics-1-4 | full source reference; exact simulation not claimed |
| mechanics-6-3 | Experience, Job Points, And Job Levels | Mechanics / Core systems | codex:mechanics-6-3 | full source reference; exact simulation not claimed |
| mechanics-1-7 | Handling Multiple Instances Of The Same Variable | Mechanics / Core systems | codex:mechanics-1-7 | full source reference; exact simulation not claimed |
| mechanics-7-1 | How Stats Work In Fft | Mechanics / Core systems | soldier-office, codex:mechanics-7-1 | adapted gameplay + full source record |
| mechanics-2-5 | Item | Mechanics / Core systems | codex:mechanics-2-5 | full source reference; exact simulation not claimed |
| mechanics-2-3 | Jump | Mechanics / Core systems | codex:mechanics-2-3 | full source reference; exact simulation not claimed |
| mechanics-6-4 | Learning Magic Without Jp | Mechanics / Core systems | codex:mechanics-6-4 | full source reference; exact simulation not claimed |
| mechanics-3-1 | Legend | Mechanics / Core systems | codex:mechanics-3-1 | full source reference; exact simulation not claimed |
| mechanics-c-1 | Legend | Mechanics / Core systems | codex:mechanics-c-1 | full source reference; exact simulation not claimed |
| mechanics-7-3 | Leveling Down | Mechanics / Core systems | codex:mechanics-7-3 | full source reference; exact simulation not claimed |
| mechanics-7-2 | Leveling Up | Mechanics / Core systems | codex:mechanics-7-2 | full source reference; exact simulation not claimed |
| mechanics-3-13 | Limit | Mechanics / Core systems | codex:mechanics-3-13 | full source reference; exact simulation not claimed |
| mechanics-6-9 | Longbow Range Modifications | Mechanics / Core systems | codex:mechanics-6-9 | full source reference; exact simulation not claimed |
| mechanics-3-4 | Magic Constants: Damage | Mechanics / Core systems | codex:mechanics-3-4 | full source reference; exact simulation not claimed |
| mechanics-3-5 | Magic Constants: Effects | Mechanics / Core systems | codex:mechanics-3-5 | full source reference; exact simulation not claimed |
| mechanics-2-7 | Math Skill | Mechanics / Core systems | codex:mechanics-2-7 | full source reference; exact simulation not claimed |
| mechanics-2-8 | Mimic | Mechanics / Core systems | codex:mechanics-2-8 | full source reference; exact simulation not claimed |
| mechanics-6-12 | Missing And Guarding | Mechanics / Core systems | codex:mechanics-6-12 | full source reference; exact simulation not claimed |
| mechanics-6-10 | On Brave And Faith | Mechanics / Core systems | soldier-office, codex:mechanics-6-10 | adapted gameplay + full source record |
| mechanics-1-5 | Protect And Shell | Mechanics / Core systems | codex:mechanics-1-5 | full source reference; exact simulation not claimed |
| mechanics-3-8 | Punch Art | Mechanics / Core systems | codex:mechanics-3-8 | full source reference; exact simulation not claimed |
| mechanics-6-8 | Random Events | Mechanics / Core systems | codex:mechanics-6-8 | full source reference; exact simulation not claimed |
| mechanics-1-3 | Signs Of The Zodiac | Mechanics / Core systems | codex:mechanics-1-3 | full source reference; exact simulation not claimed |
| mechanics-3-7 | Steal | Mechanics / Core systems | codex:mechanics-3-7 | full source reference; exact simulation not claimed |
| mechanics-3-11 | Sword Skills | Mechanics / Core systems | codex:mechanics-3-11 | full source reference; exact simulation not claimed |
| mechanics-3-10 | Talk Skill | Mechanics / Core systems | codex:mechanics-3-10 | full source reference; exact simulation not claimed |
| mechanics-6-7 | Teleport | Mechanics / Core systems | codex:mechanics-6-7 | full source reference; exact simulation not claimed |
| mechanics-1-6 | The Elements | Mechanics / Core systems | codex:mechanics-1-6 | full source reference; exact simulation not claimed |
| mechanics-2-4 | Throw | Mechanics / Core systems | codex:mechanics-2-4 | full source reference; exact simulation not claimed |
| mechanics-3-12 | Truth And Un-Truth | Mechanics / Core systems | codex:mechanics-3-12 | full source reference; exact simulation not claimed |
| mechanics-6-5 | Weather And Terrain | Mechanics / Core systems | codex:mechanics-6-5 | full source reference; exact simulation not claimed |
| evasion-practice | Evasion — tactical explanation and worked examples | Mechanics / Evasion | codex:evasion-practice | full source reference; exact simulation not claimed |
| mechanics-a-1 | Action And Reaction | Mechanics / Gameflow | codex:mechanics-a-1 | full source reference; exact simulation not claimed |
| mechanics-a-2 | Basic Gameflow | Mechanics / Gameflow | codex:mechanics-a-2 | full source reference; exact simulation not claimed |
| mechanics-a-3 | The Mime Cycle | Mechanics / Gameflow | codex:mechanics-a-3 | full source reference; exact simulation not claimed |
| mechanics-a-4 | The Quick And The Dead | Mechanics / Gameflow | codex:mechanics-a-4 | full source reference; exact simulation not claimed |
| jump-planning | Jump timing chart and tactical planning | Mechanics / Jump | codex:jump-planning | full source reference; exact simulation not claimed |
| mechanics-5-4 | Damage-Derived Status Changes | Mechanics / Status & reactions | codex:mechanics-5-4 | full source reference; exact simulation not claimed |
| mechanics-4-3 | Movement Abilities | Mechanics / Status & reactions | codex:mechanics-4-3 | full source reference; exact simulation not claimed |
| mechanics-5-3 | Negative Status Changes | Mechanics / Status & reactions | codex:mechanics-5-3 | full source reference; exact simulation not claimed |
| mechanics-5-5 | Other Status Changes | Mechanics / Status & reactions | codex:mechanics-5-5 | full source reference; exact simulation not claimed |
| mechanics-5-1 | Preparative Status Changes | Mechanics / Status & reactions | codex:mechanics-5-1 | full source reference; exact simulation not claimed |
| mechanics-4-1 | Reaction Abilities | Mechanics / Status & reactions | codex:mechanics-4-1 | full source reference; exact simulation not claimed |
| mechanics-4-2 | Support Abilities | Mechanics / Status & reactions | codex:mechanics-4-2 | full source reference; exact simulation not claimed |
| mechanics-5-2 | Supportive Status Changes | Mechanics / Status & reactions | codex:mechanics-5-2 | full source reference; exact simulation not claimed |
| zodiac-practice | Zodiac compatibility — player and boss planning | Mechanics / Zodiac | codex:zodiac-practice | full source reference; exact simulation not claimed |
| status-berserk | Berserk | Statuses / Status | codex:status-berserk | full source reference; exact simulation not claimed |
| status-blood-suck | Blood Suck | Statuses / Status | codex:status-blood-suck | full source reference; exact simulation not claimed |
| status-charging | Charging | Statuses / Status | codex:status-charging | full source reference; exact simulation not claimed |
| status-charm | Charm | Statuses / Status | codex:status-charm | full source reference; exact simulation not claimed |
| status-chicken | Chicken | Statuses / Status | codex:status-chicken | full source reference; exact simulation not claimed |
| status-confusion | Confusion | Statuses / Status | codex:status-confusion | full source reference; exact simulation not claimed |
| status-critical | Critical | Statuses / Status | codex:status-critical | full source reference; exact simulation not claimed |
| status-darkness | Darkness | Statuses / Status | codex:status-darkness | full source reference; exact simulation not claimed |
| status-dead | Dead | Statuses / Status | codex:status-dead | full source reference; exact simulation not claimed |
| status-death-sentence | Death Sentence | Statuses / Status | codex:status-death-sentence | full source reference; exact simulation not claimed |
| status-defending | Defending | Statuses / Status | codex:status-defending | full source reference; exact simulation not claimed |
| status-don-t-act | Don't Act | Statuses / Status | codex:status-don-t-act | full source reference; exact simulation not claimed |
| status-don-t-move | Don't Move | Statuses / Status | codex:status-don-t-move | full source reference; exact simulation not claimed |
| status-faith | Faith | Statuses / Status | codex:status-faith | full source reference; exact simulation not claimed |
| status-float | Float | Statuses / Status | codex:status-float | full source reference; exact simulation not claimed |
| status-frog | Frog | Statuses / Status | codex:status-frog | full source reference; exact simulation not claimed |
| status-haste | Haste | Statuses / Status | codex:status-haste | full source reference; exact simulation not claimed |
| status-innocent | Innocent | Statuses / Status | codex:status-innocent | full source reference; exact simulation not claimed |
| status-invite | Invite | Statuses / Status | codex:status-invite | full source reference; exact simulation not claimed |
| status-morbol | Morbol | Statuses / Status | codex:status-morbol | full source reference; exact simulation not claimed |
| status-oil | Oil | Statuses / Status | codex:status-oil | full source reference; exact simulation not claimed |
| status-performing | Performing | Statuses / Status | codex:status-performing | full source reference; exact simulation not claimed |
| status-petrify | Petrify | Statuses / Status | codex:status-petrify | full source reference; exact simulation not claimed |
| status-poison | Poison | Statuses / Status | codex:status-poison | full source reference; exact simulation not claimed |
| status-protect | Protect | Statuses / Status | codex:status-protect | full source reference; exact simulation not claimed |
| status-quick | Quick | Statuses / Status | codex:status-quick | full source reference; exact simulation not claimed |
| status-reflect | Reflect | Statuses / Status | codex:status-reflect | full source reference; exact simulation not claimed |
| status-regen | Regen | Statuses / Status | codex:status-regen | full source reference; exact simulation not claimed |
| status-reraise | Reraise | Statuses / Status | codex:status-reraise | full source reference; exact simulation not claimed |
| status-shell | Shell | Statuses / Status | codex:status-shell | full source reference; exact simulation not claimed |
| status-silence | Silence | Statuses / Status | codex:status-silence | full source reference; exact simulation not claimed |
| status-sleep | Sleep | Statuses / Status | codex:status-sleep | full source reference; exact simulation not claimed |
| status-slow | Slow | Statuses / Status | codex:status-slow | full source reference; exact simulation not claimed |
| status-stop | Stop | Statuses / Status | codex:status-stop | full source reference; exact simulation not claimed |
| status-transparent | Transparent | Statuses / Status | codex:status-transparent | full source reference; exact simulation not claimed |
| status-undead | Undead | Statuses / Status | codex:status-undead | full source reference; exact simulation not claimed |
| map-deep-dungeon-bridge | Deep Dungeon — Bridge | Maps / Deep Dungeon | encounter:deep-bridge, source-map:map-deep-dungeon-bridge, codex:map-deep-dungeon-bridge | adapted gameplay + full source record |
| map-deep-dungeon-delta | Deep Dungeon — Delta | Maps / Deep Dungeon | encounter:deep-delta, source-map:map-deep-dungeon-delta, codex:map-deep-dungeon-delta | adapted gameplay + full source record |
| map-deep-dungeon-end | Deep Dungeon — End | Maps / Deep Dungeon | encounter:deep-end, codex:map-deep-dungeon-end | adapted gameplay + full source record |
| map-deep-dungeon-horror | Deep Dungeon — Horror | Maps / Deep Dungeon | encounter:deep-horror, source-map:map-deep-dungeon-horror, codex:map-deep-dungeon-horror | adapted gameplay + full source record |
| map-deep-dungeon-mlapan | Deep Dungeon — Mlapan | Maps / Deep Dungeon | encounter:deep-mlapan, source-map:map-deep-dungeon-mlapan, codex:map-deep-dungeon-mlapan | adapted gameplay + full source record |
| map-deep-dungeon-nogias | Deep Dungeon — Nogias | Maps / Deep Dungeon | encounter:deep-nogias, source-map:map-deep-dungeon-nogias, codex:map-deep-dungeon-nogias | adapted gameplay + full source record |
| map-deep-dungeon-terminate | Deep Dungeon — Terminate | Maps / Deep Dungeon | encounter:deep-terminate, source-map:map-deep-dungeon-terminate, codex:map-deep-dungeon-terminate | adapted gameplay + full source record |
| map-deep-dungeon-tiger | Deep Dungeon — Tiger | Maps / Deep Dungeon | encounter:deep-tiger, source-map:map-deep-dungeon-tiger, codex:map-deep-dungeon-tiger | adapted gameplay + full source record |
| map-deep-dungeon-valkyries | Deep Dungeon — Valkyries | Maps / Deep Dungeon | encounter:deep-valkyries, source-map:map-deep-dungeon-valkyries, codex:map-deep-dungeon-valkyries | adapted gameplay + full source record |
| map-deep-dungeon-voyage | Deep Dungeon — Voyage | Maps / Deep Dungeon | encounter:deep-voyage, source-map:map-deep-dungeon-voyage, codex:map-deep-dungeon-voyage | adapted gameplay + full source record |
| map-legend | Move-Find Item, coordinate and terrain conventions | Maps / Reference | codex:map-legend | full source reference; exact simulation not claimed |
| map-dorter-trade-city | Dorter Trade City | Maps / Story battle | source-map:map-dorter-trade-city, codex:map-dorter-trade-city | adapted gameplay + full source record |
| map-fovoham-plains | Fovoham Plains | Maps / Story battle | source-map:map-fovoham-plains, codex:map-fovoham-plains | adapted gameplay + full source record |
| map-gariland | Gariland | Maps / Story battle | source-map:map-gariland, codex:map-gariland | adapted gameplay + full source record |
| map-lenalia-plateau | Lenalia Plateau | Maps / Story battle | source-map:map-lenalia-plateau, codex:map-lenalia-plateau | adapted gameplay + full source record |
| map-mandalia-plains | Mandalia Plains | Maps / Story battle | source-map:map-mandalia-plains, codex:map-mandalia-plains | adapted gameplay + full source record |
| map-sand-rat-cellar | Sand Rat Cellar | Maps / Story battle | source-map:map-sand-rat-cellar, codex:map-sand-rat-cellar | adapted gameplay + full source record |
| map-sweegy-woods | Sweegy Woods | Maps / Story battle | source-map:map-sweegy-woods, codex:map-sweegy-woods | adapted gameplay + full source record |
| map-thieves-fort | Thieves Fort | Maps / Story battle | source-map:map-thieves-fort, codex:map-thieves-fort | adapted gameplay + full source record |
| treasure-index | Move-Find Item — source collection index | Maps / Treasure index | codex:treasure-index | full source reference; exact simulation not claimed |
| party-builds | Strong units and party builds | Party building / Builds | codex:party-builds | full source reference; exact simulation not claimed |
| special-builds | Special characters — builds and recruitment notes | Party building / Special characters | codex:special-builds | full source reference; exact simulation not claimed |
| boss-compendium | Zodiac monsters — battle-specific profiles | Bestiary / Bosses | job:lucavi, codex:boss-compendium | adapted gameplay + full source record |
| monster-family-ahrimans | Ahrimans — family notes | Bestiary / Families | encounter:patrol-araguay, breeding-family:ahrimans, codex:monster-family-ahrimans | adapted gameplay + full source record |
| monster-family-behemoths | Behemoths — family notes | Bestiary / Families | breeding-family:behemoths, codex:monster-family-behemoths | adapted gameplay + full source record |
| monster-family-bombs | Bombs — family notes | Bestiary / Families | encounter:patrol-sweegy, breeding-family:bombs, codex:monster-family-bombs | adapted gameplay + full source record |
| monster-family-bull-demons | Bull Demons — family notes | Bestiary / Families | encounter:patrol-bariaus, breeding-family:bull-demons, codex:monster-family-bull-demons | adapted gameplay + full source record |
| monster-family-chocobos | Chocobos — family notes | Bestiary / Families | breeding-family:chocobos, codex:monster-family-chocobos | adapted gameplay + full source record |
| monster-family-dragons | Dragons — family notes | Bestiary / Families | breeding-family:dragons, codex:monster-family-dragons | adapted gameplay + full source record |
| monster-family-ghouls | Ghouls — family notes | Bestiary / Families | breeding-family:ghouls, codex:monster-family-ghouls | adapted gameplay + full source record |
| monster-family-goblins | Goblins — family notes | Bestiary / Families | breeding-family:goblins, codex:monster-family-goblins | adapted gameplay + full source record |
| monster-family-hyudras | Hyudras — family notes | Bestiary / Families | encounter:patrol-germinas, breeding-family:hyudras, codex:monster-family-hyudras | adapted gameplay + full source record |
| monster-family-juravis | Juravis — family notes | Bestiary / Families | breeding-family:juravis, codex:monster-family-juravis | adapted gameplay + full source record |
| monster-family-morbols | Morbols — family notes | Bestiary / Families | breeding-family:morbols, codex:monster-family-morbols | adapted gameplay + full source record |
| monster-family-pisco-demons | Pisco Demons — family notes | Bestiary / Families | encounter:patrol-zigolis, breeding-family:pisco-demons, codex:monster-family-pisco-demons | adapted gameplay + full source record |
| monster-family-red-panthers | Red Panthers — family notes | Bestiary / Families | encounter:patrol-mandalia, breeding-family:red-panthers, codex:monster-family-red-panthers | adapted gameplay + full source record |
| monster-family-skeletons | Skeletons — family notes | Bestiary / Families | breeding-family:skeletons, codex:monster-family-skeletons | adapted gameplay + full source record |
| monster-family-unique-monsters | Unique monsters — family notes | Bestiary / Families | codex:monster-family-unique-monsters | full source reference; exact simulation not claimed |
| monster-family-uribo | Uribo — family notes | Bestiary / Families | encounter:patrol-finath, breeding-family:uribo, codex:monster-family-uribo | adapted gameplay + full source record |
| monster-family-woodmen | Woodmen — family notes | Bestiary / Families | encounter:patrol-yugou, breeding-family:woodmen, codex:monster-family-woodmen | adapted gameplay + full source record |
| monster-ahriman | Ahriman | Bestiary / Monsters | job:ahriman, codex:monster-ahriman | adapted gameplay + full source record |
| monster-behemoth | Behemoth | Bestiary / Monsters | job:behemoth, codex:monster-behemoth | adapted gameplay + full source record |
| monster-black-chocobo | Black Chocobo | Bestiary / Monsters | job:black-chocobo, codex:monster-black-chocobo | adapted gameplay + full source record |
| monster-black-goblin | Black Goblin | Bestiary / Monsters | job:black-goblin, codex:monster-black-goblin | adapted gameplay + full source record |
| monster-blue-dragon | Blue Dragon | Bestiary / Monsters | job:blue-dragon, codex:monster-blue-dragon | adapted gameplay + full source record |
| monster-bomb | Bomb | Bestiary / Monsters | job:bomb, codex:monster-bomb | adapted gameplay + full source record |
| monster-bone-snatch | Bone Snatch | Bestiary / Monsters | job:bone-snatch, codex:monster-bone-snatch | adapted gameplay + full source record |
| monster-bull-demon | Bull Demon | Bestiary / Monsters | job:bull-demon, codex:monster-bull-demon | adapted gameplay + full source record |
| monster-byblos | Byblos | Bestiary / Monsters | job:byblos, codex:monster-byblos | adapted gameplay + full source record |
| monster-chocobo | Chocobo | Bestiary / Monsters | job:chocobo, job:yellow-chocobo, codex:monster-chocobo | adapted gameplay + full source record |
| monster-cocatoris | Cocatoris | Bestiary / Monsters | job:cocatoris, codex:monster-cocatoris | adapted gameplay + full source record |
| monster-cuar | Cuar | Bestiary / Monsters | job:cuar, codex:monster-cuar | adapted gameplay + full source record |
| monster-dark-behemoth | Dark Behemoth | Bestiary / Monsters | job:dark-behemoth, codex:monster-dark-behemoth | adapted gameplay + full source record |
| monster-dragon | Dragon | Bestiary / Monsters | job:dragon, codex:monster-dragon | adapted gameplay + full source record |
| monster-explosive | Explosive | Bestiary / Monsters | job:explosive, codex:monster-explosive | adapted gameplay + full source record |
| monster-flotiball | Flotiball | Bestiary / Monsters | job:flotiball, codex:monster-flotiball | adapted gameplay + full source record |
| monster-ghoul | Ghoul | Bestiary / Monsters | job:ghoul, codex:monster-ghoul | adapted gameplay + full source record |
| monster-gobbledeguck | Gobbledeguck | Bestiary / Monsters | job:gobbledeguck, codex:monster-gobbledeguck | adapted gameplay + full source record |
| monster-goblin | Goblin | Bestiary / Monsters | job:goblin, codex:monster-goblin | adapted gameplay + full source record |
| monster-great-morbol | Great Morbol | Bestiary / Monsters | job:great-morbol, codex:monster-great-morbol | adapted gameplay + full source record |
| monster-grenade | Grenade | Bestiary / Monsters | job:grenade, codex:monster-grenade | adapted gameplay + full source record |
| monster-gust | Gust | Bestiary / Monsters | job:gust, codex:monster-gust | adapted gameplay + full source record |
| monster-holy-dragon | Holy Dragon | Bestiary / Monsters | job:holy-dragon, codex:monster-holy-dragon | adapted gameplay + full source record |
| monster-hydra | Hydra | Bestiary / Monsters | job:hydra, codex:monster-hydra | adapted gameplay + full source record |
| monster-hyudra | Hyudra | Bestiary / Monsters | job:hyudra, codex:monster-hyudra | adapted gameplay + full source record |
| monster-juravis | Juravis | Bestiary / Monsters | job:juravis, codex:monster-juravis | adapted gameplay + full source record |
| monster-king-behemoth | King Behemoth | Bestiary / Monsters | job:king-behemoth, codex:monster-king-behemoth | adapted gameplay + full source record |
| monster-living-bone | Living Bone | Bestiary / Monsters | job:living-bone, codex:monster-living-bone | adapted gameplay + full source record |
| monster-mind-flare | Mind Flare | Bestiary / Monsters | job:mind-flare, codex:monster-mind-flare | adapted gameplay + full source record |
| monster-mindflare | Mindflare | Bestiary / Monsters | job:mindflare, codex:monster-mindflare | adapted gameplay + full source record |
| monster-minitaurus | Minitaurus | Bestiary / Monsters | job:minitaurus, codex:monster-minitaurus | adapted gameplay + full source record |
| monster-morbol | Morbol | Bestiary / Monsters | job:morbol, codex:monster-morbol | adapted gameplay + full source record |
| monster-ochu | Ochu | Bestiary / Monsters | job:ochu, codex:monster-ochu | adapted gameplay + full source record |
| monster-pisco-demon | Pisco Demon | Bestiary / Monsters | job:pisco-demon, codex:monster-pisco-demon | adapted gameplay + full source record |
| monster-plague | Plague | Bestiary / Monsters | job:plague, codex:monster-plague | adapted gameplay + full source record |
| monster-porky | Porky | Bestiary / Monsters | job:porky, codex:monster-porky | adapted gameplay + full source record |
| monster-red-chocobo | Red Chocobo | Bestiary / Monsters | job:red-chocobo, codex:monster-red-chocobo | adapted gameplay + full source record |
| monster-red-dragon | Red Dragon | Bestiary / Monsters | job:red-dragon, codex:monster-red-dragon | adapted gameplay + full source record |
| monster-red-panther | Red Panther | Bestiary / Monsters | job:red-panther, codex:monster-red-panther | adapted gameplay + full source record |
| monster-revnant | Revnant | Bestiary / Monsters | job:revnant, codex:monster-revnant | adapted gameplay + full source record |
| monster-sacred | Sacred | Bestiary / Monsters | job:sacred, codex:monster-sacred | adapted gameplay + full source record |
| monster-skeleton | Skeleton | Bestiary / Monsters | job:skeleton, codex:monster-skeleton | adapted gameplay + full source record |
| monster-squidlarkin | Squidlarkin | Bestiary / Monsters | job:squidlarkin, codex:monster-squidlarkin | adapted gameplay + full source record |
| monster-steel-giant | Steel Giant | Bestiary / Monsters | job:steel-giant, codex:monster-steel-giant | adapted gameplay + full source record |
| monster-steel-hawk | Steel Hawk | Bestiary / Monsters | job:steel-hawk, codex:monster-steel-hawk | adapted gameplay + full source record |
| monster-taiju | Taiju | Bestiary / Monsters | job:taiju, codex:monster-taiju | adapted gameplay + full source record |
| monster-tiamat | Tiamat | Bestiary / Monsters | job:tiamat, codex:monster-tiamat | adapted gameplay + full source record |
| monster-trent | Trent | Bestiary / Monsters | job:trent, codex:monster-trent | adapted gameplay + full source record |
| monster-uribo | Uribo | Bestiary / Monsters | job:uribo, codex:monster-uribo | adapted gameplay + full source record |
| monster-vampire | Vampire | Bestiary / Monsters | job:vampire, codex:monster-vampire | adapted gameplay + full source record |
| monster-wildbow | Wildbow | Bestiary / Monsters | job:wildbow, codex:monster-wildbow | adapted gameplay + full source record |
| monster-woodman | Woodman | Bestiary / Monsters | job:woodman, codex:monster-woodman | adapted gameplay + full source record |
| monster-legend | Monster growth and ability-table notation | Bestiary / Reference | breeding-family:chocobos, breeding-family:goblins, breeding-family:bombs, breeding-family:red-panthers, breeding-family:pisco-demons, breeding-family:skeletons, breeding-family:ghouls, breeding-family:ahrimans, breeding-family:juravis, breeding-family:uribo, breeding-family:woodmen, breeding-family:bull-demons, breeding-family:morbols, breeding-family:behemoths, breeding-family:dragons, breeding-family:hyudras, codex:monster-legend | adapted gameplay + full source record |
| class-96 | Apanda — Apanda (+) | Classes / Demon | job:apanda, codex:class-96 | adapted gameplay + full source record |
| class-99 | Archaic Demon — Archaic Demon (+) | Classes / Demon | job:archaic-demon, codex:class-99 | adapted gameplay + full source record |
| class-90 | Byblos — Byblos (+) | Classes / Demon | codex:class-90 | full source reference; exact simulation not claimed |
| class-97 | Serpentarius — Elidibs (+) | Classes / Demon | job:elidibs, codex:class-97 | adapted gameplay + full source record |
| class-91 | Steel Giant — Worker 8 (+) | Classes / Demon | job:worker, codex:class-91 | adapted gameplay + full source record |
| class-9a | Ultima Demon — Ultima Demon (+) | Classes / Demon | job:ultima-demon, codex:class-9a | adapted gameplay + full source record |
| class-3e | Angel of Death — Zalera | Classes / Lucavi | job:zalera, codex:class-3e | adapted gameplay + full source record |
| class-49 | Arch Angel — Altima, second form | Classes / Lucavi | job:st-ajora, codex:class-49 | adapted gameplay + full source record |
| class-45 | Ghost of Fury — Adramelk | Classes / Lucavi | job:adramelk, codex:class-45 | adapted gameplay + full source record |
| class-41 | Holy Angel — Altima, first form | Classes / Lucavi | job:altima, codex:class-41 | adapted gameplay + full source record |
| class-48 | Holy Dragon — Reis, dragon form | Classes / Lucavi | codex:class-48 | full source reference; exact simulation not claimed |
| class-43 | Impure King — Queklain | Classes / Lucavi | job:queklain, codex:class-43 | adapted gameplay + full source record |
| class-40 | Regulator — Hashmalum | Classes / Lucavi | job:hashmalum, codex:class-40 | adapted gameplay + full source record |
| class-3c | Warlock — Velius | Classes / Lucavi | job:velius, codex:class-3c | adapted gameplay + full source record |
| class-74 | Ahriman — class 74 | Classes / Monster | codex:class-74 | full source reference; exact simulation not claimed |
| class-85 | Behemoth — class 85 | Classes / Monster | codex:class-85 | full source reference; exact simulation not claimed |
| class-5f | Black Chocobo — class 5F | Classes / Monster | codex:class-5f | full source reference; exact simulation not claimed |
| class-62 | Black Goblin — class 62 | Classes / Monster | codex:class-62 | full source reference; exact simulation not claimed |
| class-89 | Blue Dragon — class 89 | Classes / Monster | codex:class-89 | full source reference; exact simulation not claimed |
| class-64 | Bomb — class 64 | Classes / Monster | codex:class-64 | full source reference; exact simulation not claimed |
| class-6e | Bone Snatch — class 6E | Classes / Monster | codex:class-6e | full source reference; exact simulation not claimed |
| class-7f | Bull Demon — class 7F | Classes / Monster | codex:class-7f | full source reference; exact simulation not claimed |
| class-5e | Chocobo — class 5E | Classes / Monster | codex:class-5e | full source reference; exact simulation not claimed |
| class-78 | Cocatoris — class 78 | Classes / Monster | codex:class-78 | full source reference; exact simulation not claimed |
| class-68 | Cuar — class 68 | Classes / Monster | codex:class-68 | full source reference; exact simulation not claimed |
| class-87 | Dark Behemoth — class 87 | Classes / Monster | codex:class-87 | full source reference; exact simulation not claimed |
| class-88 | Dragon — class 88 | Classes / Monster | codex:class-88 | full source reference; exact simulation not claimed |
| class-66 | Explosive — class 66 | Classes / Monster | codex:class-66 | full source reference; exact simulation not claimed |
| class-73 | Flotiball — class 73 | Classes / Monster | codex:class-73 | full source reference; exact simulation not claimed |
| class-70 | Ghoul — class 70 | Classes / Monster | codex:class-70 | full source reference; exact simulation not claimed |
| class-63 | Gobbledeguck — class 63 | Classes / Monster | codex:class-63 | full source reference; exact simulation not claimed |
| class-61 | Goblin — class 61 | Classes / Monster | codex:class-61 | full source reference; exact simulation not claimed |
| class-84 | Great Morbol — class 84 | Classes / Monster | codex:class-84 | full source reference; exact simulation not claimed |
| class-65 | Grenade — class 65 | Classes / Monster | codex:class-65 | full source reference; exact simulation not claimed |
| class-71 | Gust — class 71 | Classes / Monster | codex:class-71 | full source reference; exact simulation not claimed |
| class-8c | Hydra — class 8C | Classes / Monster | codex:class-8c | full source reference; exact simulation not claimed |
| class-8b | Hyudra — class 8B | Classes / Monster | codex:class-8b | full source reference; exact simulation not claimed |
| class-76 | Juravis — class 76 | Classes / Monster | codex:class-76 | full source reference; exact simulation not claimed |
| class-86 | King Behemoth — class 86 | Classes / Monster | codex:class-86 | full source reference; exact simulation not claimed |
| class-6f | Living Bone — class 6F | Classes / Monster | codex:class-6f | full source reference; exact simulation not claimed |
| class-6c | Mindflare — class 6C | Classes / Monster | codex:class-6c | full source reference; exact simulation not claimed |
| class-80 | Minitaurus — class 80 | Classes / Monster | codex:class-80 | full source reference; exact simulation not claimed |
| class-82 | Morbol — class 82 | Classes / Monster | codex:class-82 | full source reference; exact simulation not claimed |
| class-83 | Ochu — class 83 | Classes / Monster | codex:class-83 | full source reference; exact simulation not claimed |
| class-6a | Pisco Demon — class 6A | Classes / Monster | codex:class-6a | full source reference; exact simulation not claimed |
| class-75 | Plague — class 75 | Classes / Monster | codex:class-75 | full source reference; exact simulation not claimed |
| class-7a | Porky — class 7A | Classes / Monster | codex:class-7a | full source reference; exact simulation not claimed |
| class-60 | Red Chocobo — class 60 | Classes / Monster | codex:class-60 | full source reference; exact simulation not claimed |
| class-8a | Red Dragon — class 8A | Classes / Monster | codex:class-8a | full source reference; exact simulation not claimed |
| class-67 | Red Panther — class 67 | Classes / Monster | codex:class-67 | full source reference; exact simulation not claimed |
| class-72 | Revnant — class 72 | Classes / Monster | codex:class-72 | full source reference; exact simulation not claimed |
| class-81 | Sacred — class 81 | Classes / Monster | codex:class-81 | full source reference; exact simulation not claimed |
| class-6d | Skeleton — class 6D | Classes / Monster | codex:class-6d | full source reference; exact simulation not claimed |
| class-6b | Squidlarkin — class 6B | Classes / Monster | codex:class-6b | full source reference; exact simulation not claimed |
| class-77 | Steel Hawk — class 77 | Classes / Monster | codex:class-77 | full source reference; exact simulation not claimed |
| class-7e | Taiju — class 7E | Classes / Monster | codex:class-7e | full source reference; exact simulation not claimed |
| class-8d | Tiamat — class 8D | Classes / Monster | codex:class-8d | full source reference; exact simulation not claimed |
| class-7d | Trent — class 7D | Classes / Monster | codex:class-7d | full source reference; exact simulation not claimed |
| class-79 | Uribo — class 79 | Classes / Monster | codex:class-79 | full source reference; exact simulation not claimed |
| class-69 | Vampire — class 69 | Classes / Monster | codex:class-69 | full source reference; exact simulation not claimed |
| class-7b | Wildbow — class 7B | Classes / Monster | codex:class-7b | full source reference; exact simulation not claimed |
| class-7c | Woodman — class 7C | Classes / Monster | codex:class-7c | full source reference; exact simulation not claimed |
| class-legend | Class growth, equipment, immunity and GameShark legend | Classes / Reference | codex:class-legend | full source reference; exact simulation not claimed |
| class-1d | Arc Duke — Barinten | Classes / Special | codex:class-1d | full source reference; exact simulation not claimed |
| class-06 | Arc Knight — Delita, chapter 1 | Classes / Special | codex:class-06 | full source reference; exact simulation not claimed |
| class-1b | Arc Knight — Elmdor | Classes / Special | codex:class-1b | full source reference; exact simulation not claimed |
| class-08 | Arc Knight — Zalbag | Classes / Special | codex:class-08 | full source reference; exact simulation not claimed |
| class-33 | Arc Knight — Zalbag, possessed | Classes / Special | codex:class-33 | full source reference; exact simulation not claimed |
| class-21 | Arc Witch — Balmafula (+) | Classes / Special | codex:class-21 | full source reference; exact simulation not claimed |
| class-3f | Archer — Male Archer, undead | Classes / Special | codex:class-3f | full source reference; exact simulation not claimed |
| class-2d | Assassin — Celia (-) (crashes game on PSX) | Classes / Special | codex:class-2d | full source reference; exact simulation not claimed |
| class-2e | Assassin — Lede (-) | Classes / Special | job:assassin, codex:class-2e | adapted gameplay + full source record |
| class-15 | Astrologist — Olan (+) | Classes / Special | job:astrologist, codex:class-15 | adapted gameplay + full source record |
| class-23 | Bi-count — Rudvich (-) | Classes / Special | codex:class-23 | full source reference; exact simulation not claimed |
| class-13 | Bishop — Simon (+) | Classes / Special | codex:class-13 | full source reference; exact simulation not claimed |
| class-18 | Cardinal — Draclau | Classes / Special | codex:class-18 | full source reference; exact simulation not claimed |
| class-35 | Chemist — Female Chemist | Classes / Special | codex:class-35 | full source reference; exact simulation not claimed |
| class-14 | Cleric — Alma (+) | Classes / Special | codex:class-14 | full source reference; exact simulation not claimed |
| class-2c | Cleric — Alma (+) | Classes / Special | codex:class-2c | full source reference; exact simulation not claimed |
| class-30 | Cleric — Alma (+) | Classes / Special | codex:class-30 | full source reference; exact simulation not claimed |
| class-11 | Dark Knight — Gafgarion (+) | Classes / Special | codex:class-11 | full source reference; exact simulation not claimed |
| class-17 | Dark Knight — Gafgarion (+) | Classes / Special | codex:class-17 | full source reference; exact simulation not claimed |
| class-1c | Delita's Sis — Teta | Classes / Special | codex:class-1c | full source reference; exact simulation not claimed |
| class-2a | Divine Knight — Meliadoul (+) | Classes / Special | codex:class-2a | full source reference; exact simulation not claimed |
| class-2f | Divine Knight — Meliadoul (+) | Classes / Special | codex:class-2f | full source reference; exact simulation not claimed |
| class-25 | Divine Knight — Rofel | Classes / Special | codex:class-25 | full source reference; exact simulation not claimed |
| class-24 | Divine Knight — Vormav | Classes / Special | codex:class-24 | full source reference; exact simulation not claimed |
| class-0f | Dragoner — Reis (human) (+) | Classes / Special | codex:class-0f | full source reference; exact simulation not claimed |
| class-0b | Duke — Goltana | Classes / Special | codex:class-0b | full source reference; exact simulation not claimed |
| class-0a | Duke — Larg | Classes / Special | codex:class-0a | full source reference; exact simulation not claimed |
| class-2b | Engineer — Balk | Classes / Special | codex:class-2b | full source reference; exact simulation not claimed |
| class-16 | Engineer — Mustadio (+) | Classes / Special | codex:class-16 | full source reference; exact simulation not claimed |
| class-22 | Engineer — Mustadio (+) | Classes / Special | codex:class-22 | full source reference; exact simulation not claimed |
| class-19 | Heaven Knight — Rafa (+) | Classes / Special | codex:class-19 | full source reference; exact simulation not claimed |
| class-29 | Heaven Knight — Rafa (+) | Classes / Special | codex:class-29 | full source reference; exact simulation not claimed |
| class-12 | Hell Knight — Malak | Classes / Special | codex:class-12 | full source reference; exact simulation not claimed |
| class-1a | Hell Knight — Malak (+) | Classes / Special | codex:class-1a | full source reference; exact simulation not claimed |
| class-0e | High Priest — Funeral | Classes / Special | codex:class-0e | full source reference; exact simulation not claimed |
| class-1e | Holy Knight — Agrias (+) | Classes / Special | codex:class-1e | full source reference; exact simulation not claimed |
| class-34 | Holy Knight — Agrias (+) | Classes / Special | codex:class-34 | full source reference; exact simulation not claimed |
| class-05 | Holy Knight — Delita, chapter 2 & 3 | Classes / Special | codex:class-05 | full source reference; exact simulation not claimed |
| class-10 | Holy Priest — Zalmo | Classes / Special | codex:class-10 | full source reference; exact simulation not claimed |
| class-0d | Holy Swordsman — Orlandu (+) | Classes / Special | codex:class-0d | full source reference; exact simulation not claimed |
| class-26 | Knight Blade — Izlude | Classes / Special | codex:class-26 | full source reference; exact simulation not claimed |
| class-3d | Knight — Male Knight, undead | Classes / Special | codex:class-3d | full source reference; exact simulation not claimed |
| class-09 | Lune Knight — Dycedarg | Classes / Special | codex:class-09 | full source reference; exact simulation not claimed |
| class-38 | Oracle — Male Oracle | Classes / Special | codex:class-38 | full source reference; exact simulation not claimed |
| class-46 | Oracle — Male Oracle, undead | Classes / Special | codex:class-46 | full source reference; exact simulation not claimed |
| class-31 | Phony Saint — Ajora (-) | Classes / Special | codex:class-31 | full source reference; exact simulation not claimed |
| class-36 | Priest — Female Priest | Classes / Special | codex:class-36 | full source reference; exact simulation not claimed |
| class-0c | Princess — Ovelia (+) | Classes / Special | codex:class-0c | full source reference; exact simulation not claimed |
| class-32 | Soldier — Cloud (+) | Classes / Special | codex:class-32 | full source reference; exact simulation not claimed |
| class-27 | Sorceror — Kletian | Classes / Special | codex:class-27 | full source reference; exact simulation not claimed |
| class-07 | Squire — Algus (+) | Classes / Special | codex:class-07 | full source reference; exact simulation not claimed |
| class-04 | Squire — Delita, chapter 1 (+) | Classes / Special | codex:class-04 | full source reference; exact simulation not claimed |
| class-01 | Squire — Ramza, chapter 1 (+) | Classes / Special | codex:class-01 | full source reference; exact simulation not claimed |
| class-02 | Squire — Ramza, chapter 2 & 3 (+) | Classes / Special | codex:class-02 | full source reference; exact simulation not claimed |
| class-03 | Squire — Ramza, chapter 4 (+) | Classes / Special | codex:class-03 | full source reference; exact simulation not claimed |
| class-47 | Summoner — Female Summoner, undead | Classes / Special | codex:class-47 | full source reference; exact simulation not claimed |
| class-1f | Temple Knight — Beowulf (+) | Classes / Special | codex:class-1f | full source reference; exact simulation not claimed |
| class-44 | Time Mage — Female Time Mage, undead | Classes / Special | codex:class-44 | full source reference; exact simulation not claimed |
| class-20 | White Knight — Wiegraf, chapter 1 | Classes / Special | codex:class-20 | full source reference; exact simulation not claimed |
| class-28 | White Knight — Wiegraf, chapter 3 | Classes / Special | codex:class-28 | full source reference; exact simulation not claimed |
| class-37 | Wizard — Male Wizard | Classes / Special | codex:class-37 | full source reference; exact simulation not claimed |
| class-42 | Wizard — Male Wizard, undead | Classes / Special | codex:class-42 | full source reference; exact simulation not claimed |
| stats-adramelech | Adramelech — level statistics | Statistics / Character | codex:stats-adramelech | full source reference; exact simulation not claimed |
| stats-agrius | Agrius — level statistics | Statistics / Character | codex:stats-agrius | full source reference; exact simulation not claimed |
| stats-ajora | Ajora — level statistics | Statistics / Character | codex:stats-ajora | full source reference; exact simulation not claimed |
| stats-algas | Algas — level statistics | Statistics / Character | codex:stats-algas | full source reference; exact simulation not claimed |
| stats-alicia | Alicia — level statistics | Statistics / Character | codex:stats-alicia | full source reference; exact simulation not claimed |
| stats-alma-a | Alma (A) — level statistics | Statistics / Character | codex:stats-alma-a | full source reference; exact simulation not claimed |
| stats-alma-b | Alma (B) — level statistics | Statistics / Character | codex:stats-alma-b | full source reference; exact simulation not claimed |
| stats-alma-dead | Alma (Dead) — level statistics | Statistics / Character | codex:stats-alma-dead | full source reference; exact simulation not claimed |
| stats-balk | Balk — level statistics | Statistics / Character | codex:stats-balk | full source reference; exact simulation not claimed |
| stats-balmaufula | Balmaufula — level statistics | Statistics / Character | codex:stats-balmaufula | full source reference; exact simulation not claimed |
| stats-bandit-boss | Bandit Boss — level statistics | Statistics / Character | codex:stats-bandit-boss | full source reference; exact simulation not claimed |
| stats-barinten | Barinten — level statistics | Statistics / Character | codex:stats-barinten | full source reference; exact simulation not claimed |
| stats-belias | Belias — level statistics | Statistics / Character | codex:stats-belias | full source reference; exact simulation not claimed |
| stats-beowulf | Beowulf — level statistics | Statistics / Character | codex:stats-beowulf | full source reference; exact simulation not claimed |
| stats-biggs | Biggs — level statistics | Statistics / Character | codex:stats-biggs | full source reference; exact simulation not claimed |
| stats-boko | Boko — level statistics | Statistics / Character | codex:stats-boko | full source reference; exact simulation not claimed |
| stats-celia | Celia — level statistics | Statistics / Character | codex:stats-celia | full source reference; exact simulation not claimed |
| stats-cloud | Cloud — level statistics | Statistics / Character | codex:stats-cloud | full source reference; exact simulation not claimed |
| stats-cuchulainn | Cuchulainn — level statistics | Statistics / Character | codex:stats-cuchulainn | full source reference; exact simulation not claimed |
| stats-delita-1 | Delita (1) — level statistics | Statistics / Character | codex:stats-delita-1 | full source reference; exact simulation not claimed |
| stats-delita-2 | Delita (2) — level statistics | Statistics / Character | codex:stats-delita-2 | full source reference; exact simulation not claimed |
| stats-delita-3 | Delita (3) — level statistics | Statistics / Character | codex:stats-delita-3 | full source reference; exact simulation not claimed |
| stats-dicedarg | Dicedarg — level statistics | Statistics / Character | codex:stats-dicedarg | full source reference; exact simulation not claimed |
| stats-dish | Dish — level statistics | Statistics / Character | codex:stats-dish | full source reference; exact simulation not claimed |
| stats-draclau | Draclau — level statistics | Statistics / Character | codex:stats-draclau | full source reference; exact simulation not claimed |
| stats-elidpius | Elidpius — level statistics | Statistics / Character | codex:stats-elidpius | full source reference; exact simulation not claimed |
| stats-elmdor | Elmdor — level statistics | Statistics / Character | codex:stats-elmdor | full source reference; exact simulation not claimed |
| stats-fukes | Fukes — level statistics | Statistics / Character | codex:stats-fukes | full source reference; exact simulation not claimed |
| stats-funeral | Funeral — level statistics | Statistics / Character | codex:stats-funeral | full source reference; exact simulation not claimed |
| stats-gafgarion | Gafgarion — level statistics | Statistics / Character | codex:stats-gafgarion | full source reference; exact simulation not claimed |
| stats-golagros | Golagros — level statistics | Statistics / Character | codex:stats-golagros | full source reference; exact simulation not claimed |
| stats-goltana | Goltana — level statistics | Statistics / Character | codex:stats-goltana | full source reference; exact simulation not claimed |
| stats-gustav | Gustav — level statistics | Statistics / Character | codex:stats-gustav | full source reference; exact simulation not claimed |
| stats-hasmalium | Hasmalium — level statistics | Statistics / Character | codex:stats-hasmalium | full source reference; exact simulation not claimed |
| stats-izlude | Izlude — level statistics | Statistics / Character | codex:stats-izlude | full source reference; exact simulation not claimed |
| stats-kletian | Kletian — level statistics | Statistics / Character | codex:stats-kletian | full source reference; exact simulation not claimed |
| stats-knave | Knave — level statistics | Statistics / Character | codex:stats-knave | full source reference; exact simulation not claimed |
| stats-larg | Larg — level statistics | Statistics / Character | codex:stats-larg | full source reference; exact simulation not claimed |
| stats-lavian | Lavian — level statistics | Statistics / Character | codex:stats-lavian | full source reference; exact simulation not claimed |
| stats-ledy | Ledy — level statistics | Statistics / Character | codex:stats-ledy | full source reference; exact simulation not claimed |
| stats-lezales | Lezales — level statistics | Statistics / Character | codex:stats-lezales | full source reference; exact simulation not claimed |
| stats-malek-dead | Malek (Dead) — level statistics | Statistics / Character | codex:stats-malek-dead | full source reference; exact simulation not claimed |
| stats-malek | Malek — level statistics | Statistics / Character | codex:stats-malek | full source reference; exact simulation not claimed |
| stats-meliadoul | Meliadoul — level statistics | Statistics / Character | codex:stats-meliadoul | full source reference; exact simulation not claimed |
| stats-mercenary | Mercenary — level statistics | Statistics / Character | codex:stats-mercenary | full source reference; exact simulation not claimed |
| stats-miluda | Miluda — level statistics | Statistics / Character | codex:stats-miluda | full source reference; exact simulation not claimed |
| stats-mustadio | Mustadio — level statistics | Statistics / Character | codex:stats-mustadio | full source reference; exact simulation not claimed |
| stats-orlan | Orlan — level statistics | Statistics / Character | codex:stats-orlan | full source reference; exact simulation not claimed |
| stats-orlandu | Orlandu — level statistics | Statistics / Character | codex:stats-orlandu | full source reference; exact simulation not claimed |
| stats-ovelia | Ovelia — level statistics | Statistics / Character | codex:stats-ovelia | full source reference; exact simulation not claimed |
| stats-rad | Rad — level statistics | Statistics / Character | codex:stats-rad | full source reference; exact simulation not claimed |
| stats-rafa-a | Rafa (A) — level statistics | Statistics / Character | codex:stats-rafa-a | full source reference; exact simulation not claimed |
| stats-rafa-b | Rafa (B) — level statistics | Statistics / Character | codex:stats-rafa-b | full source reference; exact simulation not claimed |
| stats-ramza-1 | Ramza (1) — level statistics | Statistics / Character | codex:stats-ramza-1 | full source reference; exact simulation not claimed |
| stats-ramza-2 | Ramza (2) — level statistics | Statistics / Character | codex:stats-ramza-2 | full source reference; exact simulation not claimed |
| stats-ramza-3 | Ramza (3) — level statistics | Statistics / Character | codex:stats-ramza-3 | full source reference; exact simulation not claimed |
| stats-reze-1 | Reze (1) — level statistics | Statistics / Character | codex:stats-reze-1 | full source reference; exact simulation not claimed |
| stats-reze-2 | Reze (2) — level statistics | Statistics / Character | codex:stats-reze-2 | full source reference; exact simulation not claimed |
| stats-rofel | Rofel — level statistics | Statistics / Character | codex:stats-rofel | full source reference; exact simulation not claimed |
| stats-rudvich | Rudvich — level statistics | Statistics / Character | codex:stats-rudvich | full source reference; exact simulation not claimed |
| stats-simon | Simon — level statistics | Statistics / Character | codex:stats-simon | full source reference; exact simulation not claimed |
| stats-sinogue-schinoeg | Sinogue/Schinoeg — level statistics | Statistics / Character | codex:stats-sinogue-schinoeg | full source reference; exact simulation not claimed |
| stats-teta | Teta — level statistics | Statistics / Character | codex:stats-teta | full source reference; exact simulation not claimed |
| stats-thief-leader | Thief Leader — level statistics | Statistics / Character | codex:stats-thief-leader | full source reference; exact simulation not claimed |
| stats-thief-mediator | Thief Mediator — level statistics | Statistics / Character | codex:stats-thief-mediator | full source reference; exact simulation not claimed |
| stats-ultima-1 | Ultima (1) — level statistics | Statistics / Character | codex:stats-ultima-1 | full source reference; exact simulation not claimed |
| stats-ultima-2 | Ultima (2) — level statistics | Statistics / Character | codex:stats-ultima-2 | full source reference; exact simulation not claimed |
| stats-vormarv | Vormarv — level statistics | Statistics / Character | codex:stats-vormarv | full source reference; exact simulation not claimed |
| stats-wezaleff | Wezaleff — level statistics | Statistics / Character | codex:stats-wezaleff | full source reference; exact simulation not claimed |
| stats-wiegraf-1 | Wiegraf (1) — level statistics | Statistics / Character | codex:stats-wiegraf-1 | full source reference; exact simulation not claimed |
| stats-wiegraf-2 | Wiegraf (2) — level statistics | Statistics / Character | codex:stats-wiegraf-2 | full source reference; exact simulation not claimed |
| stats-worker-7 | Worker 7 — level statistics | Statistics / Character | codex:stats-worker-7 | full source reference; exact simulation not claimed |
| stats-worker-8 | Worker 8 — level statistics | Statistics / Character | codex:stats-worker-8 | full source reference; exact simulation not claimed |
| stats-zalbag-vampiric | Zalbag (Vampiric) — level statistics | Statistics / Character | codex:stats-zalbag-vampiric | full source reference; exact simulation not claimed |
| stats-zalbag | Zalbag — level statistics | Statistics / Character | codex:stats-zalbag | full source reference; exact simulation not claimed |
| stats-zalhera | Zalhera — level statistics | Statistics / Character | codex:stats-zalhera | full source reference; exact simulation not claimed |
| stats-zalmo | Zalmo — level statistics | Statistics / Character | codex:stats-zalmo | full source reference; exact simulation not claimed |
| stats-archer-female | Archer (Female) — level statistics | Statistics / Generic class | codex:stats-archer-female | full source reference; exact simulation not claimed |
| stats-archer-male | Archer (Male) — level statistics | Statistics / Generic class | codex:stats-archer-male | full source reference; exact simulation not claimed |
| stats-archer-undead | Archer (Undead) — level statistics | Statistics / Generic class | codex:stats-archer-undead | full source reference; exact simulation not claimed |
| stats-bard-male | Bard (Male) — level statistics | Statistics / Generic class | codex:stats-bard-male | full source reference; exact simulation not claimed |
| stats-calculator-female | Calculator (Female) — level statistics | Statistics / Generic class | codex:stats-calculator-female | full source reference; exact simulation not claimed |
| stats-calculator-male | Calculator (Male) — level statistics | Statistics / Generic class | codex:stats-calculator-male | full source reference; exact simulation not claimed |
| stats-chemist-female | Chemist (Female) — level statistics | Statistics / Generic class | codex:stats-chemist-female | full source reference; exact simulation not claimed |
| stats-chemist-male | Chemist (Male) — level statistics | Statistics / Generic class | codex:stats-chemist-male | full source reference; exact simulation not claimed |
| stats-dancer-female | Dancer (Female) — level statistics | Statistics / Generic class | codex:stats-dancer-female | full source reference; exact simulation not claimed |
| stats-generic-10-year-old-female | Generic 10 Year Old Female — level statistics | Statistics / Generic class | codex:stats-generic-10-year-old-female | full source reference; exact simulation not claimed |
| stats-generic-10-year-old-male | Generic 10 Year Old Male — level statistics | Statistics / Generic class | codex:stats-generic-10-year-old-male | full source reference; exact simulation not claimed |
| stats-generic-20-year-old-female | Generic 20 Year Old Female — level statistics | Statistics / Generic class | codex:stats-generic-20-year-old-female | full source reference; exact simulation not claimed |
| stats-generic-20-year-old-male | Generic 20 Year Old Male — level statistics | Statistics / Generic class | codex:stats-generic-20-year-old-male | full source reference; exact simulation not claimed |
| stats-generic-40-year-old-female | Generic 40 Year Old Female — level statistics | Statistics / Generic class | codex:stats-generic-40-year-old-female | full source reference; exact simulation not claimed |
| stats-generic-40-year-old-male | Generic 40 Year Old Male — level statistics | Statistics / Generic class | codex:stats-generic-40-year-old-male | full source reference; exact simulation not claimed |
| stats-generic-60-year-old-female | Generic 60 Year Old Female — level statistics | Statistics / Generic class | codex:stats-generic-60-year-old-female | full source reference; exact simulation not claimed |
| stats-generic-60-year-old-male | Generic 60 Year Old Male — level statistics | Statistics / Generic class | codex:stats-generic-60-year-old-male | full source reference; exact simulation not claimed |
| stats-geomancer-female | Geomancer (Female) — level statistics | Statistics / Generic class | codex:stats-geomancer-female | full source reference; exact simulation not claimed |
| stats-geomancer-male | Geomancer (Male) — level statistics | Statistics / Generic class | codex:stats-geomancer-male | full source reference; exact simulation not claimed |
| stats-knight-female | Knight (Female) — level statistics | Statistics / Generic class | codex:stats-knight-female | full source reference; exact simulation not claimed |
| stats-knight-male | Knight (Male) — level statistics | Statistics / Generic class | codex:stats-knight-male | full source reference; exact simulation not claimed |
| stats-knight-undead | Knight (Undead) — level statistics | Statistics / Generic class | codex:stats-knight-undead | full source reference; exact simulation not claimed |
| stats-lancer-female | Lancer (Female) — level statistics | Statistics / Generic class | codex:stats-lancer-female | full source reference; exact simulation not claimed |
| stats-lancer-male | Lancer (Male) — level statistics | Statistics / Generic class | codex:stats-lancer-male | full source reference; exact simulation not claimed |
| stats-mediator-female | Mediator (Female) — level statistics | Statistics / Generic class | codex:stats-mediator-female | full source reference; exact simulation not claimed |
| stats-mediator-male | Mediator (Male) — level statistics | Statistics / Generic class | codex:stats-mediator-male | full source reference; exact simulation not claimed |
| stats-mime-female | Mime (Female) — level statistics | Statistics / Generic class | codex:stats-mime-female | full source reference; exact simulation not claimed |
| stats-mime-male | Mime (Male) — level statistics | Statistics / Generic class | codex:stats-mime-male | full source reference; exact simulation not claimed |
| stats-monk-female | Monk (Female) — level statistics | Statistics / Generic class | codex:stats-monk-female | full source reference; exact simulation not claimed |
| stats-monk-male | Monk (Male) — level statistics | Statistics / Generic class | codex:stats-monk-male | full source reference; exact simulation not claimed |
| stats-mourner-old-female | Mourner (Old Female) — level statistics | Statistics / Generic class | codex:stats-mourner-old-female | full source reference; exact simulation not claimed |
| stats-mourner-old-male | Mourner (Old Male) — level statistics | Statistics / Generic class | codex:stats-mourner-old-male | full source reference; exact simulation not claimed |
| stats-mourner-young-female | Mourner (Young Female) — level statistics | Statistics / Generic class | codex:stats-mourner-young-female | full source reference; exact simulation not claimed |
| stats-mourner-young-male | Mourner (Young Male) — level statistics | Statistics / Generic class | codex:stats-mourner-young-male | full source reference; exact simulation not claimed |
| stats-ninja-female | Ninja (Female) — level statistics | Statistics / Generic class | codex:stats-ninja-female | full source reference; exact simulation not claimed |
| stats-ninja-male | Ninja (Male) — level statistics | Statistics / Generic class | codex:stats-ninja-male | full source reference; exact simulation not claimed |
| stats-oracle-female | Oracle (Female) — level statistics | Statistics / Generic class | codex:stats-oracle-female | full source reference; exact simulation not claimed |
| stats-oracle-male | Oracle (Male) — level statistics | Statistics / Generic class | codex:stats-oracle-male | full source reference; exact simulation not claimed |
| stats-oracle-undead | Oracle (Undead) — level statistics | Statistics / Generic class | codex:stats-oracle-undead | full source reference; exact simulation not claimed |
| stats-priest-female | Priest (Female) — level statistics | Statistics / Generic class | codex:stats-priest-female | full source reference; exact simulation not claimed |
| stats-priest-male | Priest (Male) — level statistics | Statistics / Generic class | codex:stats-priest-male | full source reference; exact simulation not claimed |
| stats-priest | Priest — level statistics | Statistics / Generic class | codex:stats-priest | full source reference; exact simulation not claimed |
| stats-samurai-female | Samurai (Female) — level statistics | Statistics / Generic class | codex:stats-samurai-female | full source reference; exact simulation not claimed |
| stats-samurai-male | Samurai (Male) — level statistics | Statistics / Generic class | codex:stats-samurai-male | full source reference; exact simulation not claimed |
| stats-squire-female | Squire (Female) — level statistics | Statistics / Generic class | codex:stats-squire-female | full source reference; exact simulation not claimed |
| stats-squire-male | Squire (Male) — level statistics | Statistics / Generic class | codex:stats-squire-male | full source reference; exact simulation not claimed |
| stats-summoner-female | Summoner (Female) — level statistics | Statistics / Generic class | codex:stats-summoner-female | full source reference; exact simulation not claimed |
| stats-summoner-male | Summoner (Male) — level statistics | Statistics / Generic class | codex:stats-summoner-male | full source reference; exact simulation not claimed |
| stats-summoner-undead | Summoner (Undead) — level statistics | Statistics / Generic class | codex:stats-summoner-undead | full source reference; exact simulation not claimed |
| stats-thief-female | Thief (Female) — level statistics | Statistics / Generic class | codex:stats-thief-female | full source reference; exact simulation not claimed |
| stats-thief-male | Thief (Male) — level statistics | Statistics / Generic class | codex:stats-thief-male | full source reference; exact simulation not claimed |
| stats-time-mage-female | Time Mage (Female) — level statistics | Statistics / Generic class | codex:stats-time-mage-female | full source reference; exact simulation not claimed |
| stats-time-mage-male | Time Mage (Male) — level statistics | Statistics / Generic class | codex:stats-time-mage-male | full source reference; exact simulation not claimed |
| stats-time-mage-undead | Time Mage (Undead) — level statistics | Statistics / Generic class | codex:stats-time-mage-undead | full source reference; exact simulation not claimed |
| stats-wizard-female | Wizard (Female) — level statistics | Statistics / Generic class | codex:stats-wizard-female | full source reference; exact simulation not claimed |
| stats-wizard-male | Wizard (Male) — level statistics | Statistics / Generic class | codex:stats-wizard-male | full source reference; exact simulation not claimed |
| stats-wizard-undead | Wizard (Undead) — level statistics | Statistics / Generic class | codex:stats-wizard-undead | full source reference; exact simulation not claimed |
| stats-ahriman | Ahriman — level statistics | Statistics / Monster | codex:stats-ahriman | full source reference; exact simulation not claimed |
| stats-apanda | Apanda — level statistics | Statistics / Monster | codex:stats-apanda | full source reference; exact simulation not claimed |
| stats-archaic-demon | Archaic Demon — level statistics | Statistics / Monster | codex:stats-archaic-demon | full source reference; exact simulation not claimed |
| stats-archaic-demon-variant-138 | Archaic Demon — level statistics | Statistics / Monster | codex:stats-archaic-demon-variant-138 | full source reference; exact simulation not claimed |
| stats-behemoth | Behemoth — level statistics | Statistics / Monster | codex:stats-behemoth | full source reference; exact simulation not claimed |
| stats-black-chocobo | Black Chocobo — level statistics | Statistics / Monster | codex:stats-black-chocobo | full source reference; exact simulation not claimed |
| stats-black-goblin | Black Goblin — level statistics | Statistics / Monster | codex:stats-black-goblin | full source reference; exact simulation not claimed |
| stats-blue-dragon | Blue Dragon — level statistics | Statistics / Monster | codex:stats-blue-dragon | full source reference; exact simulation not claimed |
| stats-bomb | Bomb — level statistics | Statistics / Monster | codex:stats-bomb | full source reference; exact simulation not claimed |
| stats-bone-snatch | Bone Snatch — level statistics | Statistics / Monster | codex:stats-bone-snatch | full source reference; exact simulation not claimed |
| stats-bull-demon | Bull Demon — level statistics | Statistics / Monster | codex:stats-bull-demon | full source reference; exact simulation not claimed |
| stats-byblos | Byblos — level statistics | Statistics / Monster | codex:stats-byblos | full source reference; exact simulation not claimed |
| stats-chocobo | Chocobo — level statistics | Statistics / Monster | codex:stats-chocobo | full source reference; exact simulation not claimed |
| stats-cocatoris | Cocatoris — level statistics | Statistics / Monster | codex:stats-cocatoris | full source reference; exact simulation not claimed |
| stats-cuar | Cuar — level statistics | Statistics / Monster | codex:stats-cuar | full source reference; exact simulation not claimed |
| stats-dark-behemoth | Dark Behemoth — level statistics | Statistics / Monster | codex:stats-dark-behemoth | full source reference; exact simulation not claimed |
| stats-dragon | Dragon — level statistics | Statistics / Monster | codex:stats-dragon | full source reference; exact simulation not claimed |
| stats-explosive | Explosive — level statistics | Statistics / Monster | codex:stats-explosive | full source reference; exact simulation not claimed |
| stats-flotiball | Flotiball — level statistics | Statistics / Monster | codex:stats-flotiball | full source reference; exact simulation not claimed |
| stats-ghoul | Ghoul — level statistics | Statistics / Monster | codex:stats-ghoul | full source reference; exact simulation not claimed |
| stats-gobbledeguck | Gobbledeguck — level statistics | Statistics / Monster | codex:stats-gobbledeguck | full source reference; exact simulation not claimed |
| stats-goblin | Goblin — level statistics | Statistics / Monster | codex:stats-goblin | full source reference; exact simulation not claimed |
| stats-great-morbol | Great Morbol — level statistics | Statistics / Monster | codex:stats-great-morbol | full source reference; exact simulation not claimed |
| stats-grenade | Grenade — level statistics | Statistics / Monster | codex:stats-grenade | full source reference; exact simulation not claimed |
| stats-gust | Gust — level statistics | Statistics / Monster | codex:stats-gust | full source reference; exact simulation not claimed |
| stats-holy-dragon | Holy Dragon — level statistics | Statistics / Monster | codex:stats-holy-dragon | full source reference; exact simulation not claimed |
| stats-hydra | Hydra — level statistics | Statistics / Monster | codex:stats-hydra | full source reference; exact simulation not claimed |
| stats-hyudra | Hyudra — level statistics | Statistics / Monster | codex:stats-hyudra | full source reference; exact simulation not claimed |
| stats-juravis | Juravis — level statistics | Statistics / Monster | codex:stats-juravis | full source reference; exact simulation not claimed |
| stats-king-behemoth | King Behemoth — level statistics | Statistics / Monster | codex:stats-king-behemoth | full source reference; exact simulation not claimed |
| stats-living-bone | Living Bone — level statistics | Statistics / Monster | codex:stats-living-bone | full source reference; exact simulation not claimed |
| stats-mindflare | Mindflare — level statistics | Statistics / Monster | codex:stats-mindflare | full source reference; exact simulation not claimed |
| stats-minitaurus | Minitaurus — level statistics | Statistics / Monster | codex:stats-minitaurus | full source reference; exact simulation not claimed |
| stats-morbol | Morbol — level statistics | Statistics / Monster | codex:stats-morbol | full source reference; exact simulation not claimed |
| stats-ochu | Ochu — level statistics | Statistics / Monster | codex:stats-ochu | full source reference; exact simulation not claimed |
| stats-pisco-demon | Pisco Demon — level statistics | Statistics / Monster | codex:stats-pisco-demon | full source reference; exact simulation not claimed |
| stats-plague | Plague — level statistics | Statistics / Monster | codex:stats-plague | full source reference; exact simulation not claimed |
| stats-porky | Porky — level statistics | Statistics / Monster | codex:stats-porky | full source reference; exact simulation not claimed |
| stats-red-chocobo | Red Chocobo — level statistics | Statistics / Monster | codex:stats-red-chocobo | full source reference; exact simulation not claimed |
| stats-red-dragon | Red Dragon — level statistics | Statistics / Monster | codex:stats-red-dragon | full source reference; exact simulation not claimed |
| stats-red-panther | Red Panther — level statistics | Statistics / Monster | codex:stats-red-panther | full source reference; exact simulation not claimed |
| stats-revenant | Revenant — level statistics | Statistics / Monster | codex:stats-revenant | full source reference; exact simulation not claimed |
| stats-sacred | Sacred — level statistics | Statistics / Monster | codex:stats-sacred | full source reference; exact simulation not claimed |
| stats-skeleton | Skeleton — level statistics | Statistics / Monster | codex:stats-skeleton | full source reference; exact simulation not claimed |
| stats-squidlarkin | Squidlarkin — level statistics | Statistics / Monster | codex:stats-squidlarkin | full source reference; exact simulation not claimed |
| stats-steel-giant | Steel Giant — level statistics | Statistics / Monster | codex:stats-steel-giant | full source reference; exact simulation not claimed |
| stats-steel-hawk | Steel Hawk — level statistics | Statistics / Monster | codex:stats-steel-hawk | full source reference; exact simulation not claimed |
| stats-taiju | Taiju — level statistics | Statistics / Monster | codex:stats-taiju | full source reference; exact simulation not claimed |
| stats-tiamat | Tiamat — level statistics | Statistics / Monster | codex:stats-tiamat | full source reference; exact simulation not claimed |
| stats-trent | Trent — level statistics | Statistics / Monster | codex:stats-trent | full source reference; exact simulation not claimed |
| stats-ultima-demon | Ultima Demon — level statistics | Statistics / Monster | codex:stats-ultima-demon | full source reference; exact simulation not claimed |
| stats-uribo | Uribo — level statistics | Statistics / Monster | codex:stats-uribo | full source reference; exact simulation not claimed |
| stats-vampire | Vampire — level statistics | Statistics / Monster | codex:stats-vampire | full source reference; exact simulation not claimed |
| stats-wildbow | Wildbow — level statistics | Statistics / Monster | codex:stats-wildbow | full source reference; exact simulation not claimed |
| stats-woodman | Woodman — level statistics | Statistics / Monster | codex:stats-woodman | full source reference; exact simulation not claimed |
| monster-levels-ahriman | Ahriman — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-ahriman | full source reference; exact simulation not claimed |
| monster-levels-behemoth | Behemoth — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-behemoth | full source reference; exact simulation not claimed |
| monster-levels-black-chocobo | Black Chocobo — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-black-chocobo | full source reference; exact simulation not claimed |
| monster-levels-black-goblin | Black Goblin — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-black-goblin | full source reference; exact simulation not claimed |
| monster-levels-blue-dragon | Blue Dragon — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-blue-dragon | full source reference; exact simulation not claimed |
| monster-levels-bomb | Bomb — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-bomb | full source reference; exact simulation not claimed |
| monster-levels-bone-snatch | Bone Snatch — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-bone-snatch | full source reference; exact simulation not claimed |
| monster-levels-bull-demon | Bull Demon — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-bull-demon | full source reference; exact simulation not claimed |
| monster-levels-chocobo | Chocobo — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-chocobo | full source reference; exact simulation not claimed |
| monster-levels-cocatoris | Cocatoris — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-cocatoris | full source reference; exact simulation not claimed |
| monster-levels-cuar | Cuar — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-cuar | full source reference; exact simulation not claimed |
| monster-levels-dark-behemoth | Dark Behemoth — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-dark-behemoth | full source reference; exact simulation not claimed |
| monster-levels-dragon | Dragon — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-dragon | full source reference; exact simulation not claimed |
| monster-levels-explosive | Explosive — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-explosive | full source reference; exact simulation not claimed |
| monster-levels-flotiball | Flotiball — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-flotiball | full source reference; exact simulation not claimed |
| monster-levels-ghoul | Ghoul — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-ghoul | full source reference; exact simulation not claimed |
| monster-levels-gobbledeguck | Gobbledeguck — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-gobbledeguck | full source reference; exact simulation not claimed |
| monster-levels-goblin | Goblin — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-goblin | full source reference; exact simulation not claimed |
| monster-levels-great-morbol | Great Morbol — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-great-morbol | full source reference; exact simulation not claimed |
| monster-levels-grenade | Grenade — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-grenade | full source reference; exact simulation not claimed |
| monster-levels-gust | Gust — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-gust | full source reference; exact simulation not claimed |
| monster-levels-hydra | Hydra — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-hydra | full source reference; exact simulation not claimed |
| monster-levels-hyudra | Hyudra — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-hyudra | full source reference; exact simulation not claimed |
| monster-levels-juravis | Juravis — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-juravis | full source reference; exact simulation not claimed |
| monster-levels-king-behemoth | King Behemoth — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-king-behemoth | full source reference; exact simulation not claimed |
| monster-levels-living-bone | Living Bone — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-living-bone | full source reference; exact simulation not claimed |
| monster-levels-mind-flare | Mind Flare — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-mind-flare | full source reference; exact simulation not claimed |
| monster-levels-minitaurus | Minitaurus — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-minitaurus | full source reference; exact simulation not claimed |
| monster-levels-morbol | Morbol — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-morbol | full source reference; exact simulation not claimed |
| monster-levels-ochu | Ochu — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-ochu | full source reference; exact simulation not claimed |
| monster-levels-pisco-demon | Pisco Demon — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-pisco-demon | full source reference; exact simulation not claimed |
| monster-levels-plague | Plague — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-plague | full source reference; exact simulation not claimed |
| monster-levels-porky | Porky — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-porky | full source reference; exact simulation not claimed |
| monster-levels-red-chocobo | Red Chocobo — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-red-chocobo | full source reference; exact simulation not claimed |
| monster-levels-red-dragon | Red Dragon — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-red-dragon | full source reference; exact simulation not claimed |
| monster-levels-red-panther | Red Panther — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-red-panther | full source reference; exact simulation not claimed |
| monster-levels-revnant | Revnant — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-revnant | full source reference; exact simulation not claimed |
| monster-levels-sacred | Sacred — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-sacred | full source reference; exact simulation not claimed |
| monster-levels-skeleton | Skeleton — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-skeleton | full source reference; exact simulation not claimed |
| monster-levels-squidlarkin | Squidlarkin — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-squidlarkin | full source reference; exact simulation not claimed |
| monster-levels-steel-hawk | Steel Hawk — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-steel-hawk | full source reference; exact simulation not claimed |
| monster-levels-taiju | Taiju — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-taiju | full source reference; exact simulation not claimed |
| monster-levels-tiamat | Tiamat — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-tiamat | full source reference; exact simulation not claimed |
| monster-levels-trent | Trent — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-trent | full source reference; exact simulation not claimed |
| monster-levels-uribo | Uribo — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-uribo | full source reference; exact simulation not claimed |
| monster-levels-vampire | Vampire — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-vampire | full source reference; exact simulation not claimed |
| monster-levels-wildbow | Wildbow — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-wildbow | full source reference; exact simulation not claimed |
| monster-levels-woodman | Woodman — full monster stat ranges | Statistics / Monster full-stat profiles | codex:monster-levels-woodman | full source reference; exact simulation not claimed |
| statistics-scope | How to read the two level-stat datasets | Statistics / Reference | codex:statistics-scope | full source reference; exact simulation not claimed |
| hpmp-profile-001 | Adramelech — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-001 | full source reference; exact simulation not claimed |
| hpmp-profile-002 | Agrius — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-002 | full source reference; exact simulation not claimed |
| hpmp-profile-092 | Ahriman — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-092 | full source reference; exact simulation not claimed |
| hpmp-profile-003 | Ajora — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-003 | full source reference; exact simulation not claimed |
| hpmp-profile-004 | Algas — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-004 | full source reference; exact simulation not claimed |
| hpmp-profile-005 | Alicia — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-005 | full source reference; exact simulation not claimed |
| hpmp-profile-006 | Alma (A) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-006 | full source reference; exact simulation not claimed |
| hpmp-profile-007 | Alma (B) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-007 | full source reference; exact simulation not claimed |
| hpmp-profile-008 | Alma (Dead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-008 | full source reference; exact simulation not claimed |
| hpmp-profile-093 | Apanda — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-093 | full source reference; exact simulation not claimed |
| hpmp-profile-057 | Archer (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-057 | full source reference; exact simulation not claimed |
| hpmp-profile-058 | Archer (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-058 | full source reference; exact simulation not claimed |
| hpmp-profile-009 | Balk — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-009 | full source reference; exact simulation not claimed |
| hpmp-profile-010 | Bandit Boss — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-010 | full source reference; exact simulation not claimed |
| hpmp-profile-059 | Bard (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-059 | full source reference; exact simulation not claimed |
| hpmp-profile-011 | Barinten — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-011 | full source reference; exact simulation not claimed |
| hpmp-profile-094 | Behemoth — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-094 | full source reference; exact simulation not claimed |
| hpmp-profile-012 | Belias — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-012 | full source reference; exact simulation not claimed |
| hpmp-profile-013 | Beowulf — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-013 | full source reference; exact simulation not claimed |
| hpmp-profile-014 | Biggs — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-014 | full source reference; exact simulation not claimed |
| hpmp-profile-095 | Black Chocobo — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-095 | full source reference; exact simulation not claimed |
| hpmp-profile-096 | Black Goblin — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-096 | full source reference; exact simulation not claimed |
| hpmp-profile-097 | Blue Dragon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-097 | full source reference; exact simulation not claimed |
| hpmp-profile-015 | Boko — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-015 | full source reference; exact simulation not claimed |
| hpmp-profile-098 | Bomb — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-098 | full source reference; exact simulation not claimed |
| hpmp-profile-099 | Bone Snatch — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-099 | full source reference; exact simulation not claimed |
| hpmp-profile-100 | Bull Demon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-100 | full source reference; exact simulation not claimed |
| hpmp-profile-101 | Byblos — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-101 | full source reference; exact simulation not claimed |
| hpmp-profile-060 | Calculator (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-060 | full source reference; exact simulation not claimed |
| hpmp-profile-061 | Calculator (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-061 | full source reference; exact simulation not claimed |
| hpmp-profile-016 | Celia — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-016 | full source reference; exact simulation not claimed |
| hpmp-profile-062 | Chemist (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-062 | full source reference; exact simulation not claimed |
| hpmp-profile-017 | Cloud — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-017 | full source reference; exact simulation not claimed |
| hpmp-profile-102 | Cocatoris — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-102 | full source reference; exact simulation not claimed |
| hpmp-profile-103 | Cuar — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-103 | full source reference; exact simulation not claimed |
| hpmp-profile-018 | Cuchulainn — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-018 | full source reference; exact simulation not claimed |
| hpmp-profile-063 | Dancer (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-063 | full source reference; exact simulation not claimed |
| hpmp-profile-104 | Dark Behemoth — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-104 | full source reference; exact simulation not claimed |
| hpmp-profile-019 | Delita (1) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-019 | full source reference; exact simulation not claimed |
| hpmp-profile-020 | Delita (2) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-020 | full source reference; exact simulation not claimed |
| hpmp-profile-021 | Delita (3) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-021 | full source reference; exact simulation not claimed |
| hpmp-profile-022 | Dicedarg — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-022 | full source reference; exact simulation not claimed |
| hpmp-profile-105 | Dragon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-105 | full source reference; exact simulation not claimed |
| hpmp-profile-023 | Elidpius — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-023 | full source reference; exact simulation not claimed |
| hpmp-profile-024 | Elmdor — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-024 | full source reference; exact simulation not claimed |
| hpmp-profile-106 | Explosive — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-106 | full source reference; exact simulation not claimed |
| hpmp-profile-107 | Flotiball — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-107 | full source reference; exact simulation not claimed |
| hpmp-profile-025 | Fukes — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-025 | full source reference; exact simulation not claimed |
| hpmp-profile-026 | Gafgarion — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-026 | full source reference; exact simulation not claimed |
| hpmp-profile-064 | Geomancer (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-064 | full source reference; exact simulation not claimed |
| hpmp-profile-065 | Geomancer (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-065 | full source reference; exact simulation not claimed |
| hpmp-profile-108 | Ghoul — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-108 | full source reference; exact simulation not claimed |
| hpmp-profile-109 | Gobbledeguck — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-109 | full source reference; exact simulation not claimed |
| hpmp-profile-110 | Goblin — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-110 | full source reference; exact simulation not claimed |
| hpmp-profile-027 | Golagros — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-027 | full source reference; exact simulation not claimed |
| hpmp-profile-111 | Great Morbol — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-111 | full source reference; exact simulation not claimed |
| hpmp-profile-112 | Grenade — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-112 | full source reference; exact simulation not claimed |
| hpmp-profile-113 | Gust — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-113 | full source reference; exact simulation not claimed |
| hpmp-profile-028 | Hasmalium — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-028 | full source reference; exact simulation not claimed |
| hpmp-profile-114 | Hydra — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-114 | full source reference; exact simulation not claimed |
| hpmp-profile-115 | Hyudra — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-115 | full source reference; exact simulation not claimed |
| hpmp-profile-029 | Izlude — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-029 | full source reference; exact simulation not claimed |
| hpmp-profile-116 | Juravis — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-116 | full source reference; exact simulation not claimed |
| hpmp-profile-117 | King Behemoth — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-117 | full source reference; exact simulation not claimed |
| hpmp-profile-030 | Kletian — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-030 | full source reference; exact simulation not claimed |
| hpmp-profile-031 | Knave — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-031 | full source reference; exact simulation not claimed |
| hpmp-profile-066 | Knight (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-066 | full source reference; exact simulation not claimed |
| hpmp-profile-067 | Lancer (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-067 | full source reference; exact simulation not claimed |
| hpmp-profile-068 | Lancer (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-068 | full source reference; exact simulation not claimed |
| hpmp-profile-032 | Ledy — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-032 | full source reference; exact simulation not claimed |
| hpmp-profile-118 | Living Bone — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-118 | full source reference; exact simulation not claimed |
| hpmp-profile-033 | Malek — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-033 | full source reference; exact simulation not claimed |
| hpmp-profile-069 | Mediator (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-069 | full source reference; exact simulation not claimed |
| hpmp-profile-034 | Mercenary — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-034 | full source reference; exact simulation not claimed |
| hpmp-profile-070 | Mime (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-070 | full source reference; exact simulation not claimed |
| hpmp-profile-071 | Mime (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-071 | full source reference; exact simulation not claimed |
| hpmp-profile-119 | Mindflare — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-119 | full source reference; exact simulation not claimed |
| hpmp-profile-120 | Minitaurus — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-120 | full source reference; exact simulation not claimed |
| hpmp-profile-072 | Monk (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-072 | full source reference; exact simulation not claimed |
| hpmp-profile-121 | Morbol — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-121 | full source reference; exact simulation not claimed |
| hpmp-profile-035 | Mustadio — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-035 | full source reference; exact simulation not claimed |
| hpmp-profile-073 | Ninja (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-073 | full source reference; exact simulation not claimed |
| hpmp-profile-122 | Ochu — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-122 | full source reference; exact simulation not claimed |
| hpmp-profile-074 | Oracle (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-074 | full source reference; exact simulation not claimed |
| hpmp-profile-075 | Oracle (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-075 | full source reference; exact simulation not claimed |
| hpmp-profile-076 | Oracle (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-076 | full source reference; exact simulation not claimed |
| hpmp-profile-036 | Orlan — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-036 | full source reference; exact simulation not claimed |
| hpmp-profile-037 | Orlandu — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-037 | full source reference; exact simulation not claimed |
| hpmp-profile-123 | Pisco Demon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-123 | full source reference; exact simulation not claimed |
| hpmp-profile-124 | Plague — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-124 | full source reference; exact simulation not claimed |
| hpmp-profile-125 | Porky — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-125 | full source reference; exact simulation not claimed |
| hpmp-profile-077 | Priest (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-077 | full source reference; exact simulation not claimed |
| hpmp-profile-078 | Priest (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-078 | full source reference; exact simulation not claimed |
| hpmp-profile-038 | Rad — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-038 | full source reference; exact simulation not claimed |
| hpmp-profile-039 | Rafa (A) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-039 | full source reference; exact simulation not claimed |
| hpmp-profile-040 | Ramza (1) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-040 | full source reference; exact simulation not claimed |
| hpmp-profile-126 | Red Chocobo — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-126 | full source reference; exact simulation not claimed |
| hpmp-profile-127 | Red Dragon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-127 | full source reference; exact simulation not claimed |
| hpmp-profile-128 | Red Panther — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-128 | full source reference; exact simulation not claimed |
| hpmp-profile-129 | Revenant — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-129 | full source reference; exact simulation not claimed |
| hpmp-profile-041 | Reze (1) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-041 | full source reference; exact simulation not claimed |
| hpmp-profile-042 | Reze (2) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-042 | full source reference; exact simulation not claimed |
| hpmp-profile-043 | Rofel — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-043 | full source reference; exact simulation not claimed |
| hpmp-profile-130 | Sacred — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-130 | full source reference; exact simulation not claimed |
| hpmp-profile-079 | Samurai (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-079 | full source reference; exact simulation not claimed |
| hpmp-profile-080 | Samurai (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-080 | full source reference; exact simulation not claimed |
| hpmp-profile-044 | Simon — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-044 | full source reference; exact simulation not claimed |
| hpmp-profile-045 | Sinogue/Schinoeg — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-045 | full source reference; exact simulation not claimed |
| hpmp-profile-131 | Skeleton — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-131 | full source reference; exact simulation not claimed |
| hpmp-profile-132 | Squidlarkin — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-132 | full source reference; exact simulation not claimed |
| hpmp-profile-081 | Squire (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-081 | full source reference; exact simulation not claimed |
| hpmp-profile-133 | Steel Hawk — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-133 | full source reference; exact simulation not claimed |
| hpmp-profile-082 | Summoner (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-082 | full source reference; exact simulation not claimed |
| hpmp-profile-083 | Summoner (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-083 | full source reference; exact simulation not claimed |
| hpmp-profile-084 | Summoner (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-084 | full source reference; exact simulation not claimed |
| hpmp-profile-134 | Taiju — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-134 | full source reference; exact simulation not claimed |
| hpmp-profile-085 | Thief (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-085 | full source reference; exact simulation not claimed |
| hpmp-profile-046 | Thief Mediator — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-046 | full source reference; exact simulation not claimed |
| hpmp-profile-135 | Tiamat — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-135 | full source reference; exact simulation not claimed |
| hpmp-profile-086 | Time Mage (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-086 | full source reference; exact simulation not claimed |
| hpmp-profile-087 | Time Mage (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-087 | full source reference; exact simulation not claimed |
| hpmp-profile-088 | Time Mage (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-088 | full source reference; exact simulation not claimed |
| hpmp-profile-136 | Trent — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-136 | full source reference; exact simulation not claimed |
| hpmp-profile-047 | Ultima (1) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-047 | full source reference; exact simulation not claimed |
| hpmp-profile-048 | Ultima (2) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-048 | full source reference; exact simulation not claimed |
| hpmp-profile-137 | Uribo — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-137 | full source reference; exact simulation not claimed |
| hpmp-profile-138 | Vampire — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-138 | full source reference; exact simulation not claimed |
| hpmp-profile-049 | Vormarv — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-049 | full source reference; exact simulation not claimed |
| hpmp-profile-050 | Wiegraf (1) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-050 | full source reference; exact simulation not claimed |
| hpmp-profile-051 | Wiegraf (2) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-051 | full source reference; exact simulation not claimed |
| hpmp-profile-139 | Wildbow — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-139 | full source reference; exact simulation not claimed |
| hpmp-profile-089 | Wizard (Female) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-089 | full source reference; exact simulation not claimed |
| hpmp-profile-090 | Wizard (Male) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-090 | full source reference; exact simulation not claimed |
| hpmp-profile-091 | Wizard (Undead) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-091 | full source reference; exact simulation not claimed |
| hpmp-profile-140 | Woodman — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-140 | full source reference; exact simulation not claimed |
| hpmp-profile-052 | Worker 7 — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-052 | full source reference; exact simulation not claimed |
| hpmp-profile-054 | Zalbag (Vampiric) — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-054 | full source reference; exact simulation not claimed |
| hpmp-profile-053 | Zalbag — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-053 | full source reference; exact simulation not claimed |
| hpmp-profile-055 | Zalhera — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-055 | full source reference; exact simulation not claimed |
| hpmp-profile-056 | Zalmo — HP/MP table | Statistics / Shared numeric profiles | codex:hpmp-profile-056 | full source reference; exact simulation not claimed |
| story-analysis | Story analysis and comic retelling — author interpretation | Story / Interpretation | codex:story-analysis | full source reference; exact simulation not claimed |
| scene-001 | Opening / transition | Story / Prologue | encounter:campaign-prologue, codex:scene-001 | adapted gameplay + full source record |
| scene-002 | Orbonne Monastery | Story / Prologue | encounter:campaign-prologue, codex:scene-002 | adapted gameplay + full source record |
| scene-003 | Outside the monastery | Story / Prologue | encounter:campaign-prologue, codex:scene-003 | adapted gameplay + full source record |
| scene-004 | Opening / transition | Story / Chapter 1 | encounter:campaign-prologue, codex:scene-004 | adapted gameplay + full source record |
| scene-005 | Military Academy's Auditorium | Story / Chapter 1 | encounter:battle-2-1a, codex:scene-005 | adapted gameplay + full source record |
| scene-006 | Magic City Gariland | Story / Chapter 1 | encounter:battle-2-1a, codex:scene-006 | adapted gameplay + full source record |
| scene-007 | Mandalia Plains | Story / Chapter 1 | encounter:battle-2-1b, codex:scene-007 | adapted gameplay + full source record |
| scene-008 | Inside Igros Castle | Story / Chapter 1 | encounter:battle-2-1b, aftermath:battle-2-1b, codex:scene-008 | adapted gameplay + full source record |
| scene-009 | Igros Castle's Courtyard | Story / Chapter 1 | encounter:battle-2-1b, aftermath:battle-2-1b, codex:scene-009 | adapted gameplay + full source record |
| scene-010 | Sweegy Woods | Story / Chapter 1 | encounter:battle-2-1c, codex:scene-010 | adapted gameplay + full source record |
| scene-011 | Slums in Dorter | Story / Chapter 1 | encounter:battle-2-1d, codex:scene-011 | adapted gameplay + full source record |
| scene-012 | In a room | Story / Chapter 1 | encounter:battle-2-1d, aftermath:battle-2-1e, codex:scene-012 | adapted gameplay + full source record |
| scene-013 | Desert of the Sand Mouse | Story / Chapter 1 | encounter:battle-2-1e, codex:scene-013 | adapted gameplay + full source record |
| scene-014 | Shack | Story / Chapter 1 | encounter:battle-2-1e, aftermath:battle-2-1e, codex:scene-014 | adapted gameplay + full source record |
| scene-015 | Inside Igros Castle | Story / Chapter 1 | encounter:battle-2-1e, aftermath:battle-2-1e, codex:scene-015 | adapted gameplay + full source record |
| scene-016 | Thieves Fort | Story / Chapter 1 | encounter:battle-2-1f, codex:scene-016 | adapted gameplay + full source record |
| scene-017 | Beoulve castle | Story / Chapter 1 | encounter:battle-2-1f, aftermath:battle-2-1f, codex:scene-017 | adapted gameplay + full source record |
| scene-018 | Inside Beoulve castle | Story / Chapter 1 | encounter:battle-2-1f, aftermath:battle-2-1f, codex:scene-018 | adapted gameplay + full source record |
| scene-019 | Outside of Beoulve castle | Story / Chapter 1 | encounter:battle-2-1f, aftermath:battle-2-1f, codex:scene-019 | adapted gameplay + full source record |
| scene-020 | Mandalia Plains | Story / Chapter 1 | encounter:battle-2-1f, aftermath:battle-2-1f, codex:scene-020 | adapted gameplay + full source record |
| scene-021 | Lenalia Plateau | Story / Chapter 1 | encounter:battle-2-1g, codex:scene-021 | adapted gameplay + full source record |
| scene-022 | In a Small Windmill | Story / Chapter 1 | encounter:battle-2-1h, aftermath:battle-2-1h, codex:scene-022 | adapted gameplay + full source record |
| scene-023 | Windmill Shed | Story / Chapter 1 | encounter:battle-2-1h, aftermath:battle-2-1h, codex:scene-023 | adapted gameplay + full source record |
| scene-024 | In a Small Windmill | Story / Chapter 1 | encounter:battle-2-1h, aftermath:battle-2-1h, codex:scene-024 | adapted gameplay + full source record |
| scene-025 | Fort Zeakden | Story / Chapter 1 | encounter:battle-2-1i, aftermath:battle-2-1i, codex:scene-025 | adapted gameplay + full source record |
| scene-026 | Outside of Orbonne Monastery | Story / Chapter 1 | encounter:battle-2-2a, aftermath:battle-2-1i, codex:scene-026 | adapted gameplay + full source record |
| scene-027 | Opening / transition | Story / Chapter 2 | encounter:battle-2-2a, aftermath:battle-2-1i, codex:scene-027 | adapted gameplay + full source record |
| scene-028 | Dorter Trade City | Story / Chapter 2 | encounter:battle-2-2a, codex:scene-028 | adapted gameplay + full source record |
| scene-029 | Araguay Woods | Story / Chapter 2 | encounter:battle-2-2b, codex:scene-029 | adapted gameplay + full source record |
| scene-030 | Zirekile Falls | Story / Chapter 2 | encounter:battle-2-2c, codex:scene-030 | adapted gameplay + full source record |
| scene-031 | Zaland Fort City | Story / Chapter 2 | encounter:battle-2-2d, codex:scene-031 | adapted gameplay + full source record |
| scene-032 | In a room | Story / Chapter 2 | encounter:battle-2-2d, codex:scene-032 | adapted gameplay + full source record |
| scene-033 | Bariaus Hill | Story / Chapter 2 | encounter:battle-2-2e, codex:scene-033 | adapted gameplay + full source record |
| scene-034 | Office of Igros Castle | Story / Chapter 2 | encounter:battle-2-2e, codex:scene-034 | adapted gameplay + full source record |
| scene-035 | The Gate of Lionel Castle | Story / Chapter 2 | encounter:battle-2-2e, codex:scene-035 | adapted gameplay + full source record |
| scene-036 | Goug Machine City | Story / Chapter 2 | encounter:battle-2-2g, codex:scene-036 | adapted gameplay + full source record |
| scene-037 | Slums | Story / Chapter 2 | encounter:battle-2-2g, codex:scene-037 | adapted gameplay + full source record |
| scene-038 | Mustadio's house | Story / Chapter 2 | encounter:battle-2-2g, aftermath:battle-2-2g, codex:scene-038 | adapted gameplay + full source record |
| scene-039 | Warjilis Trade City | Story / Chapter 2 | encounter:battle-2-2g, aftermath:battle-2-2g, codex:scene-039 | adapted gameplay + full source record |
| scene-040 | Lionel Castle | Story / Chapter 2 | encounter:battle-2-2g, aftermath:battle-2-2g, codex:scene-040 | adapted gameplay + full source record |
| scene-041 | Bariaus Valley | Story / Chapter 2 | encounter:battle-2-2h, codex:scene-041 | adapted gameplay + full source record |
| scene-042 | Gologrand Execution Site | Story / Chapter 2 | encounter:battle-2-2i, codex:scene-042 | adapted gameplay + full source record |
| scene-043 | In a cell in Lionel Castle | Story / Chapter 2 | encounter:battle-2-2i, aftermath:battle-2-2i, codex:scene-043 | adapted gameplay + full source record |
| scene-044 | At the gate of Lionel Castle | Story / Chapter 2 | encounter:battle-2-2j, codex:scene-044 | adapted gameplay + full source record |
| scene-045 | Inside Lionel Castle | Story / Chapter 2 | encounter:battle-2-2k, codex:scene-045 | adapted gameplay + full source record |
| scene-046 | Inside of Zeltennia Castle | Story / Chapter 2 | encounter:battle-2-2k, aftermath:battle-2-2k, codex:scene-046 | adapted gameplay + full source record |
| scene-047 | Bethla Garrison | Story / Chapter 2 | encounter:battle-2-2k, aftermath:battle-2-2k, codex:scene-047 | adapted gameplay + full source record |
| scene-048 | Opening / transition | Story / Chapter 3 | encounter:battle-2-2k, aftermath:battle-2-2k, codex:scene-048 | adapted gameplay + full source record |
| scene-049 | Lesalia Imperial Capital | Story / Chapter 3 | encounter:battle-2-3a, aftermath:battle-2-3a, codex:scene-049 | adapted gameplay + full source record |
| scene-050 | Back gate of Lesalia Castle | Story / Chapter 3 | encounter:battle-2-3b, aftermath:battle-2-3a, codex:scene-050 | adapted gameplay + full source record |
| scene-051 | Underground Book Storage First Floor | Story / Chapter 3 | encounter:battle-2-3c, codex:scene-051 | adapted gameplay + full source record |
| scene-052 | Underground Book Storage Second Floor | Story / Chapter 3 | encounter:battle-2-3d, codex:scene-052 | adapted gameplay + full source record |
| scene-053 | Underground Book Storage Third Floor | Story / Chapter 3 | encounter:battle-2-3d, codex:scene-053 | adapted gameplay + full source record |
| scene-054 | Underground Book Storage First Floor | Story / Chapter 3 | encounter:battle-2-3e, codex:scene-054 | adapted gameplay + full source record |
| scene-055 | Dorter Trade City | Story / Chapter 3 | encounter:battle-2-3e, aftermath:battle-2-3e, codex:scene-055 | adapted gameplay + full source record |
| scene-056 | Ruins of Zeltennia Castle's Church | Story / Chapter 3 | encounter:battle-2-3e, aftermath:battle-2-3e, codex:scene-056 | adapted gameplay + full source record |
| scene-057 | Grog Hill | Story / Chapter 3 | encounter:battle-2-3f, codex:scene-057 | adapted gameplay + full source record |
| scene-058 | Yardow Fort City | Story / Chapter 3 | encounter:battle-2-3g, codex:scene-058 | adapted gameplay + full source record |
| scene-059 | Basement | Story / Chapter 3 | encounter:battle-2-3g, aftermath:battle-2-3g, codex:scene-059 | adapted gameplay + full source record |
| scene-060 | Yuguo Woods | Story / Chapter 3 | encounter:battle-2-3h, codex:scene-060 | adapted gameplay + full source record |
| scene-061 | Inside of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3h, codex:scene-061 | adapted gameplay + full source record |
| scene-062 | At the gate of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3i, codex:scene-062 | adapted gameplay + full source record |
| scene-063 | In a cell | Story / Chapter 3 | encounter:battle-2-3i, codex:scene-063 | adapted gameplay + full source record |
| scene-064 | Inside of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3i, codex:scene-064 | adapted gameplay + full source record |
| scene-065 | Inside of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3j, encounter:battle-2-3j-velius, aftermath:battle-2-3j-velius, codex:scene-065 | adapted gameplay + full source record |
| scene-066 | Roof of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3k, aftermath:battle-2-3k, codex:scene-066 | adapted gameplay + full source record |
| scene-067 | Inside of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3k, aftermath:battle-2-3k, codex:scene-067 | adapted gameplay + full source record |
| scene-068 | Inside of Riovanes Castle | Story / Chapter 3 | encounter:battle-2-3k, aftermath:battle-2-3k, codex:scene-068 | adapted gameplay + full source record |
| scene-069 | Opening / transition | Story / Chapter 4 | encounter:battle-2-3k, codex:scene-069 | adapted gameplay + full source record |
| scene-070 | Zeltennia Castle | Story / Chapter 4 | encounter:battle-2-4a, codex:scene-070 | adapted gameplay + full source record |
| scene-071 | Doguola Pass | Story / Chapter 4 | encounter:battle-2-4a, codex:scene-071 | adapted gameplay + full source record |
| scene-072 | Bervenia Free City | Story / Chapter 4 | encounter:battle-2-4b, codex:scene-072 | adapted gameplay + full source record |
| scene-073 | Finath River | Story / Chapter 4 | encounter:battle-2-4c, codex:scene-073 | adapted gameplay + full source record |
| scene-074 | Church in Zeltennia | Story / Chapter 4 | encounter:battle-2-4d, aftermath:battle-2-4d, codex:scene-074 | adapted gameplay + full source record |
| scene-075 | Church outside the town | Story / Chapter 4 | encounter:battle-2-4d, aftermath:battle-2-4d, codex:scene-075 | adapted gameplay + full source record |
| scene-076 | Bed Desert | Story / Chapter 4 | encounter:battle-2-4e, aftermath:battle-2-4e, codex:scene-076 | adapted gameplay + full source record |
| scene-077 | South Wall of Bethla Garrison | Story / Chapter 4 | encounter:battle-2-4f, codex:scene-077 | adapted gameplay + full source record |
| scene-078 | North Wall of Bethla Garrison | Story / Chapter 4 | encounter:battle-2-4f, codex:scene-078 | adapted gameplay + full source record |
| scene-079 | In front of Bethla Garrison's Sluice | Story / Chapter 4 | encounter:battle-2-4g, aftermath:battle-2-4g, codex:scene-079 | adapted gameplay + full source record |
| scene-080 | Zarghidas Trade City | Story / Chapter 4 | encounter:battle-2-4g, world-event:zarghidas-flower, codex:scene-080 | adapted gameplay + full source record |
| scene-081 | Germinas Peak | Story / Chapter 4 | encounter:battle-2-4h, codex:scene-081 | adapted gameplay + full source record |
| scene-082 | Poeskas Lake | Story / Chapter 4 | encounter:battle-2-4i, codex:scene-082 | adapted gameplay + full source record |
| scene-083 | Inside of Igros Castle | Story / Chapter 4 | encounter:battle-2-4i, aftermath:battle-2-4i, codex:scene-083 | adapted gameplay + full source record |
| scene-084 | At the gate of Limberry Castle | Story / Chapter 4 | encounter:battle-2-4j, codex:scene-084 | adapted gameplay + full source record |
| scene-085 | Inside of Limberry Castle | Story / Chapter 4 | encounter:battle-2-4k, codex:scene-085 | adapted gameplay + full source record |
| scene-086 | Inside of Limberry Castle | Story / Chapter 4 | encounter:battle-2-4k, codex:scene-086 | adapted gameplay + full source record |
| scene-087 | Underground cemetery of Limberry Castle | Story / Chapter 4 | encounter:battle-2-4l, aftermath:battle-2-4l, codex:scene-087 | adapted gameplay + full source record |
| scene-088 | Inside of Zeltennia Castle | Story / Chapter 4 | encounter:battle-2-4l, aftermath:battle-2-4l, codex:scene-088 | adapted gameplay + full source record |
| scene-089 | Graveyard | Story / Chapter 4 | encounter:battle-2-4l, aftermath:battle-2-4i, codex:scene-089 | adapted gameplay + full source record |
| scene-090 | At the gate of Igros Castle | Story / Chapter 4 | encounter:battle-2-4m, encounter:battle-2-4m-adramelk, aftermath:battle-2-4m-adramelk, codex:scene-090 | adapted gameplay + full source record |
| scene-091 | Inside of Igros Castle | Story / Chapter 4 | encounter:battle-2-4m, encounter:battle-2-4m-adramelk, aftermath:battle-2-4m-adramelk, codex:scene-091 | adapted gameplay + full source record |
| scene-092 | Inside of St. Murond Temple | Story / Chapter 4 | encounter:battle-2-4n, aftermath:battle-2-4p, codex:scene-092 | adapted gameplay + full source record |
| scene-093 | St. Murond Temple | Story / Chapter 4 | encounter:battle-2-4n, codex:scene-093 | adapted gameplay + full source record |
| scene-094 | Hall of St. Murond Temple | Story / Chapter 4 | encounter:battle-2-4o, codex:scene-094 | adapted gameplay + full source record |
| scene-095 | Chapel of St. Murond Temple | Story / Chapter 4 | encounter:battle-2-4p, aftermath:battle-2-4p, codex:scene-095 | adapted gameplay + full source record |
| scene-096 | Inside of St. Murond Temple | Story / Chapter 4 | encounter:battle-2-4p, aftermath:battle-2-4p, codex:scene-096 | adapted gameplay + full source record |
| scene-097 | Orbonne Monastery | Story / Chapter 4 | encounter:battle-2-4q, codex:scene-097 | adapted gameplay + full source record |
| scene-098 | Underground Book Storage Fourth Floor | Story / Chapter 4 | encounter:battle-2-4q, codex:scene-098 | adapted gameplay + full source record |
| scene-099 | Underground Book Storage Fifth Floor | Story / Chapter 4 | encounter:battle-2-4r, codex:scene-099 | adapted gameplay + full source record |
| scene-100 | Murond Death City | Story / Chapter 4 | encounter:battle-2-4s, codex:scene-100 | adapted gameplay + full source record |
| scene-101 | Lost Sacred Precincts | Story / Chapter 4 | encounter:battle-2-4t, codex:scene-101 | adapted gameplay + full source record |
| scene-102 | Graveyard of Airships | Story / Chapter 4 | encounter:battle-2-4u, encounter:battle-2-4v, encounter:battle-2-4v-ajora, codex:scene-102 | adapted gameplay + full source record |
| scene-103 | Graveyard | Story / Chapter 4 | ending, codex:scene-103 | adapted gameplay + full source record |
| scene-104 | Opening / transition | Story / Side quests | codex:scene-104 | full source reference; exact simulation not claimed |
| scene-105 | Ruins of Zeltennia Castle's church | Story / Side quests | world-event:goug-machine, world-event:goland-rumor, world-event:lesalia-beowulf, world-event:goug-worker8, world-event:goug-device, world-event:zeltennia-cursed, world-event:nelveska-reis, world-event:goug-cloud, world-event:warjilis-deep, ending, codex:scene-105 | adapted gameplay + full source record |
| scene-106 | {The End} | Story / Side quests | ending, codex:scene-106 | adapted gameplay + full source record |
| lore-001 | Germonik Scriptures | Lore / Scriptures | codex:lore-001 | full source reference; exact simulation not claimed |
| lore-002 | 'Germonik Scriptures' | Lore / Scriptures | codex:lore-002 | full source reference; exact simulation not claimed |
| lore-003 | Chapter 1 | Lore / Scriptures | codex:lore-003 | full source reference; exact simulation not claimed |
| lore-004 | Ramza Beoulve (Age: 16) | Lore / Scriptures | codex:lore-004 | full source reference; exact simulation not claimed |
| lore-005 | Ramza Beoulve (Age: 16) | Lore / Scriptures | codex:lore-005 | full source reference; exact simulation not claimed |
| lore-006 | Delita Hyral (Age: 16) | Lore / Scriptures | codex:lore-006 | full source reference; exact simulation not claimed |
| lore-007 | Delita Hyral (Age: 16) | Lore / Scriptures | codex:lore-007 | full source reference; exact simulation not claimed |
| lore-008 | Alma Beoulve (Age: 15) | Lore / Scriptures | codex:lore-008 | full source reference; exact simulation not claimed |
| lore-009 | Zalbag Beoulve (Age: 28) | Lore / Scriptures | codex:lore-009 | full source reference; exact simulation not claimed |
| lore-010 | Dycedarg Beoulve (Age: 37) | Lore / Scriptures | codex:lore-010 | full source reference; exact simulation not claimed |
| lore-011 | Dycedarg Beoulve (Age: 37) | Lore / Scriptures | codex:lore-011 | full source reference; exact simulation not claimed |
| lore-012 | Bestrada Larg (Age: 37) | Lore / Scriptures | codex:lore-012 | full source reference; exact simulation not claimed |
| lore-013 | Druksmald Goltana (Age: 56) | Lore / Scriptures | codex:lore-013 | full source reference; exact simulation not claimed |
| lore-014 | Omdolia Atkascha (Age: 35) | Lore / Scriptures | codex:lore-014 | full source reference; exact simulation not claimed |
| lore-015 | Omdolia Atkascha (Age:35) | Lore / Scriptures | codex:lore-015 | full source reference; exact simulation not claimed |
| lore-016 | Ruvelia Atkascha (Age: 27) | Lore / Scriptures | codex:lore-016 | full source reference; exact simulation not claimed |
| lore-017 | Orinas Atkascha (Age: 1) | Lore / Scriptures | codex:lore-017 | full source reference; exact simulation not claimed |
| lore-018 | Algus Sadalfas (Age: 16) | Lore / Brave Story records | codex:lore-018 | full source reference; exact simulation not claimed |
| lore-019 | Algus Sadalfas (Age: 16) | Lore / Brave Story records | codex:lore-019 | full source reference; exact simulation not claimed |
| lore-020 | Wiegraf Folles (Age: 30) | Lore / Brave Story records | codex:lore-020 | full source reference; exact simulation not claimed |
| lore-021 | Mesdoram Elmdor (Age: 35) | Lore / Brave Story records | codex:lore-021 | full source reference; exact simulation not claimed |
| lore-022 | Teta Hyral (Age: 15) | Lore / Brave Story records | codex:lore-022 | full source reference; exact simulation not claimed |
| lore-023 | Teta Hyral (Age: 15) | Lore / Brave Story records | codex:lore-023 | full source reference; exact simulation not claimed |
| lore-024 | Balbanes Beoulve | Lore / Brave Story records | codex:lore-024 | full source reference; exact simulation not claimed |
| lore-025 | Gustav Margueriff (Age: 35) | Lore / Brave Story records | codex:lore-025 | full source reference; exact simulation not claimed |
| lore-026 | Gustav Margueriff | Lore / Brave Story records | codex:lore-026 | full source reference; exact simulation not claimed |
| lore-027 | Miluda Folles (Age: 24) | Lore / Brave Story records | codex:lore-027 | full source reference; exact simulation not claimed |
| lore-028 | Miluda Folles | Lore / Brave Story records | codex:lore-028 | full source reference; exact simulation not claimed |
| lore-029 | Golagros Levine (Age: 28) | Lore / Brave Story records | codex:lore-029 | full source reference; exact simulation not claimed |
| lore-030 | Golagros Levine (Age: 28) | Lore / Brave Story records | codex:lore-030 | full source reference; exact simulation not claimed |
| lore-031 | Ajora Glabados | Lore / Brave Story records | codex:lore-031 | full source reference; exact simulation not claimed |
| lore-032 | Bordam Daravon (Age: 52) | Lore / Brave Story records | codex:lore-032 | full source reference; exact simulation not claimed |
| lore-033 | Alazlam J.D. (Age: 53) | Lore / Brave Story records | codex:lore-033 | full source reference; exact simulation not claimed |
| lore-034 | Chapter 2 | Lore / Brave Story records | codex:lore-034 | full source reference; exact simulation not claimed |
| lore-035 | Ramza Ruglia (Age: 17) | Lore / Brave Story records | codex:lore-035 | full source reference; exact simulation not claimed |
| lore-036 | Ramza Beoulve (Age: 17) | Lore / Brave Story records | codex:lore-036 | full source reference; exact simulation not claimed |
| lore-037 | Delita Hyral (Age: 17) | Lore / Brave Story records | codex:lore-037 | full source reference; exact simulation not claimed |
| lore-038 | Delita Hyral (Age: 17) | Lore / Brave Story records | codex:lore-038 | full source reference; exact simulation not claimed |
| lore-039 | Ovelia Atkascha (Age: 16) | Lore / Brave Story records | codex:lore-039 | full source reference; exact simulation not claimed |
| lore-040 | Alma Beoulve (Age: 16) | Lore / Brave Story records | codex:lore-040 | full source reference; exact simulation not claimed |
| lore-041 | Zalbag Beoulve (Age: 29) | Lore / Brave Story records | codex:lore-041 | full source reference; exact simulation not claimed |
| lore-042 | Dycedarg Beoulve (Age: 38) | Lore / Brave Story records | codex:lore-042 | full source reference; exact simulation not claimed |
| lore-043 | Bestrada Larg (Age: 38) | Lore / Brave Story records | codex:lore-043 | full source reference; exact simulation not claimed |
| lore-044 | Druksmald Goltana (Age: 57) | Lore / Brave Story records | codex:lore-044 | full source reference; exact simulation not claimed |
| lore-045 | Orinas Atkascha (Age: 2) | Lore / Brave Story records | codex:lore-045 | full source reference; exact simulation not claimed |
| lore-046 | Ruvelia Atkascha (Age: 29) | Lore / Brave Story records | codex:lore-046 | full source reference; exact simulation not claimed |
| lore-047 | Omdolia Atkascha | Lore / Brave Story records | codex:lore-047 | full source reference; exact simulation not claimed |
| lore-048 | Marge Funeral (Age: 79) | Lore / Brave Story records | codex:lore-048 | full source reference; exact simulation not claimed |
| lore-049 | Algus Sadalfas | Lore / Brave Story records | codex:lore-049 | full source reference; exact simulation not claimed |
| lore-050 | Gaff Gafgarion (Age: 53) | Lore / Brave Story records | codex:lore-050 | full source reference; exact simulation not claimed |
| lore-051 | Agrias Oaks (Age: 21) | Lore / Brave Story records | codex:lore-051 | full source reference; exact simulation not claimed |
| lore-052 | Simon Pen Rakshu (Age: 78) | Lore / Brave Story records | codex:lore-052 | full source reference; exact simulation not claimed |
| lore-053 | Wiegraf Folles (Age: 31) | Lore / Brave Story records | codex:lore-053 | full source reference; exact simulation not claimed |
| lore-054 | Alphons Draclau (Age: 53) | Lore / Brave Story records | codex:lore-054 | full source reference; exact simulation not claimed |
| lore-055 | Alphons Draclau (Age: 53) | Lore / Brave Story records | codex:lore-055 | full source reference; exact simulation not claimed |
| lore-056 | Mesdoram Elmdor (Age: 36) | Lore / Brave Story records | codex:lore-056 | full source reference; exact simulation not claimed |
| lore-057 | Mustadio Bunanza (Age: 18) | Lore / Brave Story records | codex:lore-057 | full source reference; exact simulation not claimed |
| lore-058 | Besrodio Bunanza (Age: 43) | Lore / Brave Story records | codex:lore-058 | full source reference; exact simulation not claimed |
| lore-059 | Besrodio Bunanza (Age: 43) | Lore / Brave Story records | codex:lore-059 | full source reference; exact simulation not claimed |
| lore-060 | Bart Rudvich (Age: 57) | Lore / Brave Story records | codex:lore-060 | full source reference; exact simulation not claimed |
| lore-061 | Bart Rudvich (Age: 57) | Lore / Brave Story records | codex:lore-061 | full source reference; exact simulation not claimed |
| lore-062 | Bart Rudvich | Lore / Brave Story records | codex:lore-062 | full source reference; exact simulation not claimed |
| lore-063 | Ajora Glabados | Lore / Brave Story records | codex:lore-063 | full source reference; exact simulation not claimed |
| lore-064 | Vormav (Age: 48) | Lore / Brave Story records | codex:lore-064 | full source reference; exact simulation not claimed |
| lore-065 | Teta Hyral | Lore / Brave Story records | codex:lore-065 | full source reference; exact simulation not claimed |
| lore-066 | Balbanes Beoulve | Lore / Brave Story records | codex:lore-066 | full source reference; exact simulation not claimed |
| lore-067 | Gustav Margueriff | Lore / Brave Story records | codex:lore-067 | full source reference; exact simulation not claimed |
| lore-068 | Miluda Folles | Lore / Brave Story records | codex:lore-068 | full source reference; exact simulation not claimed |
| lore-069 | Golagros Levine | Lore / Brave Story records | codex:lore-069 | full source reference; exact simulation not claimed |
| lore-070 | Alazlam J.D. (Age: 53) | Lore / Brave Story records | codex:lore-070 | full source reference; exact simulation not claimed |
| lore-071 | Chapter 3 | Lore / Brave Story records | codex:lore-071 | full source reference; exact simulation not claimed |
| lore-072 | Ramza Beoulve (Age: 18) | Lore / Brave Story records | codex:lore-072 | full source reference; exact simulation not claimed |
| lore-073 | Ramza Beoulve (Age: 18) | Lore / Brave Story records | codex:lore-073 | full source reference; exact simulation not claimed |
| lore-074 | Delita Hyral (Age: 18) | Lore / Brave Story records | codex:lore-074 | full source reference; exact simulation not claimed |
| lore-075 | Ovelia Atkascha (Age: 17) | Lore / Brave Story records | codex:lore-075 | full source reference; exact simulation not claimed |
| lore-076 | Alma Beoulve (Age: 17) | Lore / Brave Story records | codex:lore-076 | full source reference; exact simulation not claimed |
| lore-077 | Zalbag Beoulve (Age: 30) | Lore / Brave Story records | codex:lore-077 | full source reference; exact simulation not claimed |
| lore-078 | Dycedarg Beoulve (Age: 39) | Lore / Brave Story records | codex:lore-078 | full source reference; exact simulation not claimed |
| lore-079 | Bestrada Larg (Age: 39) | Lore / Brave Story records | codex:lore-079 | full source reference; exact simulation not claimed |
| lore-080 | Druksmald Goltana (Age: 58) | Lore / Brave Story records | codex:lore-080 | full source reference; exact simulation not claimed |
| lore-081 | Orinas Atkascha (Age: 3) | Lore / Brave Story records | codex:lore-081 | full source reference; exact simulation not claimed |
| lore-082 | Ruvelia Atkascha (Age: 30) | Lore / Brave Story records | codex:lore-082 | full source reference; exact simulation not claimed |
| lore-083 | Omdolia Atkascha | Lore / Brave Story records | codex:lore-083 | full source reference; exact simulation not claimed |
| lore-084 | Marge Funeral (Age: 80) | Lore / Brave Story records | codex:lore-084 | full source reference; exact simulation not claimed |
| lore-085 | Marge Funeral (Age: 80) | Lore / Brave Story records | codex:lore-085 | full source reference; exact simulation not claimed |
| lore-086 | Algus Sadalfas | Lore / Brave Story records | codex:lore-086 | full source reference; exact simulation not claimed |
| lore-087 | Gaff Gafgarion | Lore / Brave Story records | codex:lore-087 | full source reference; exact simulation not claimed |
| lore-088 | Agrias Oaks (Age: 22) | Lore / Brave Story records | codex:lore-088 | full source reference; exact simulation not claimed |
| lore-089 | Cidolfas Orlandu (Age: 58) | Lore / Brave Story records | codex:lore-089 | full source reference; exact simulation not claimed |
| lore-090 | Olan Durai (Age: 26) | Lore / Brave Story records | codex:lore-090 | full source reference; exact simulation not claimed |
| lore-091 | Olan Durai (Age: 26) | Lore / Brave Story records | codex:lore-091 | full source reference; exact simulation not claimed |
| lore-092 | Zalmo Rushnada (Age: 55) | Lore / Brave Story records | codex:lore-092 | full source reference; exact simulation not claimed |
| lore-093 | Simon Pen Rakshu (Age: 79) | Lore / Brave Story records | codex:lore-093 | full source reference; exact simulation not claimed |
| lore-094 | Simon Pen Rakshu | Lore / Brave Story records | codex:lore-094 | full source reference; exact simulation not claimed |
| lore-095 | Wiegraf Folles (Age: 32) | Lore / Brave Story records | codex:lore-095 | full source reference; exact simulation not claimed |
| lore-096 | Wiegraf Folles (Age: 32) | Lore / Brave Story records | codex:lore-096 | full source reference; exact simulation not claimed |
| lore-097 | Alphons Draclau | Lore / Brave Story records | codex:lore-097 | full source reference; exact simulation not claimed |
| lore-098 | Malak Galthana (Age: 18) | Lore / Brave Story records | codex:lore-098 | full source reference; exact simulation not claimed |
| lore-099 | Rafa Galthana (Age: 18) | Lore / Brave Story records | codex:lore-099 | full source reference; exact simulation not claimed |
| lore-100 | Mesdoram Elmdor (Age: 37) | Lore / Brave Story records | codex:lore-100 | full source reference; exact simulation not claimed |
| lore-101 | Mesdoram Elmdor (Age: 37) | Lore / Brave Story records | codex:lore-101 | full source reference; exact simulation not claimed |
| lore-102 | Gelkanis Barinten (Age: 52) | Lore / Brave Story records | codex:lore-102 | full source reference; exact simulation not claimed |
| lore-103 | Mustadio Bunanza (Age: 19) | Lore / Brave Story records | codex:lore-103 | full source reference; exact simulation not claimed |
| lore-104 | Besrodio Bunanza (Age: 44) | Lore / Brave Story records | codex:lore-104 | full source reference; exact simulation not claimed |
| lore-105 | Bart Rudvich | Lore / Brave Story records | codex:lore-105 | full source reference; exact simulation not claimed |
| lore-106 | Ajora Glabados | Lore / Brave Story records | codex:lore-106 | full source reference; exact simulation not claimed |
| lore-107 | Vormav (Age: 48) | Lore / Brave Story records | codex:lore-107 | full source reference; exact simulation not claimed |
| lore-108 | Vormav Tingel (Age: 48) | Lore / Brave Story records | codex:lore-108 | full source reference; exact simulation not claimed |
| lore-109 | Izlude Tingel (Age: 18) | Lore / Brave Story records | codex:lore-109 | full source reference; exact simulation not claimed |
| lore-110 | Teta Hyral | Lore / Brave Story records | codex:lore-110 | full source reference; exact simulation not claimed |
| lore-111 | Balbanes Beoulve | Lore / Brave Story records | codex:lore-111 | full source reference; exact simulation not claimed |
| lore-112 | Gustav Margueriff | Lore / Brave Story records | codex:lore-112 | full source reference; exact simulation not claimed |
| lore-113 | Miluda Folles | Lore / Brave Story records | codex:lore-113 | full source reference; exact simulation not claimed |
| lore-114 | Golagros Levine | Lore / Brave Story records | codex:lore-114 | full source reference; exact simulation not claimed |
| lore-115 | Bordam Daravon (Age: 54) | Lore / Brave Story records | codex:lore-115 | full source reference; exact simulation not claimed |
| lore-116 | Alazlam J.D. (Age: 53) | Lore / Brave Story records | codex:lore-116 | full source reference; exact simulation not claimed |
| lore-117 | Chapter 4 | Lore / Brave Story records | codex:lore-117 | full source reference; exact simulation not claimed |
| lore-118 | Ramza Beoulve (Age: 18) | Lore / Brave Story records | codex:lore-118 | full source reference; exact simulation not claimed |
| lore-119 | Delita Hyral (Age: 18) | Lore / Brave Story records | codex:lore-119 | full source reference; exact simulation not claimed |
| lore-120 | Delita Hyral (Age: 18) | Lore / Brave Story records | codex:lore-120 | full source reference; exact simulation not claimed |
| lore-121 | Delita Hyral (Age: 18) | Lore / Brave Story records | codex:lore-121 | full source reference; exact simulation not claimed |
| lore-122 | Ovelia Atkascha (Age: 17) | Lore / Brave Story records | codex:lore-122 | full source reference; exact simulation not claimed |
| lore-123 | Alma Beoulve (Age: 17) | Lore / Brave Story records | codex:lore-123 | full source reference; exact simulation not claimed |
| lore-124 | Zalbag Beoulve (Age: 30) | Lore / Brave Story records | codex:lore-124 | full source reference; exact simulation not claimed |
| lore-125 | Zalbag Beoulve | Lore / Brave Story records | codex:lore-125 | full source reference; exact simulation not claimed |
| lore-126 | Dycedarg Beoulve (Age: 39) | Lore / Brave Story records | codex:lore-126 | full source reference; exact simulation not claimed |
| lore-127 | Dycedarg Beoulve | Lore / Brave Story records | codex:lore-127 | full source reference; exact simulation not claimed |
| lore-128 | Bestrada Larg (Age: 39) | Lore / Brave Story records | codex:lore-128 | full source reference; exact simulation not claimed |
| lore-129 | Bestrada Larg | Lore / Brave Story records | codex:lore-129 | full source reference; exact simulation not claimed |
| lore-130 | Druksmald Goltana (Age: 58) | Lore / Brave Story records | codex:lore-130 | full source reference; exact simulation not claimed |
| lore-131 | Druksmald Goltana | Lore / Brave Story records | codex:lore-131 | full source reference; exact simulation not claimed |
| lore-132 | Orinas Atkascha (Age: 3) | Lore / Brave Story records | codex:lore-132 | full source reference; exact simulation not claimed |
| lore-133 | Ruvelia Atkascha (Age: 30) | Lore / Brave Story records | codex:lore-133 | full source reference; exact simulation not claimed |
| lore-134 | Omdolia Atkascha | Lore / Brave Story records | codex:lore-134 | full source reference; exact simulation not claimed |
| lore-135 | Marge Funeral (Age: 80) | Lore / Brave Story records | codex:lore-135 | full source reference; exact simulation not claimed |
| lore-136 | Marge Funeral | Lore / Brave Story records | codex:lore-136 | full source reference; exact simulation not claimed |
| lore-137 | Algus Sadalfas | Lore / Brave Story records | codex:lore-137 | full source reference; exact simulation not claimed |
| lore-138 | Gaff Gafgarion | Lore / Brave Story records | codex:lore-138 | full source reference; exact simulation not claimed |
| lore-139 | Agrias Oaks (Age: 22) | Lore / Brave Story records | codex:lore-139 | full source reference; exact simulation not claimed |
| lore-140 | Cidolfas Orlandu (Age: 58) | Lore / Brave Story records | codex:lore-140 | full source reference; exact simulation not claimed |
| lore-141 | Cidolfas Orlandu (Age: 58) | Lore / Brave Story records | codex:lore-141 | full source reference; exact simulation not claimed |
| lore-142 | Olan Durai (Age: 26) | Lore / Brave Story records | codex:lore-142 | full source reference; exact simulation not claimed |
| lore-143 | Olan Durai (Age: 26) | Lore / Brave Story records | codex:lore-143 | full source reference; exact simulation not claimed |
| lore-144 | Zalmo Rushnada (Age: 55) | Lore / Brave Story records | codex:lore-144 | full source reference; exact simulation not claimed |
| lore-145 | Zalmo Rushnada | Lore / Brave Story records | codex:lore-145 | full source reference; exact simulation not claimed |
| lore-146 | Simon Pen Rakshu | Lore / Brave Story records | codex:lore-146 | full source reference; exact simulation not claimed |
| lore-147 | Beowulf Kadmus (Age: 35) | Lore / Brave Story records | codex:lore-147 | full source reference; exact simulation not claimed |
| lore-148 | Beowulf Kadmus (Age: 35) | Lore / Brave Story records | codex:lore-148 | full source reference; exact simulation not claimed |
| lore-149 | Wiegraf Folles | Lore / Brave Story records | codex:lore-149 | full source reference; exact simulation not claimed |
| lore-150 | Reis (Age: ?) | Lore / Brave Story records | codex:lore-150 | full source reference; exact simulation not claimed |
| lore-151 | Reis Dular (Age: 29) | Lore / Brave Story records | codex:lore-151 | full source reference; exact simulation not claimed |
| lore-152 | Balmafula Lanando (Age: 22) | Lore / Brave Story records | codex:lore-152 | full source reference; exact simulation not claimed |
| lore-153 | Balmafula Lanando (Age: 22) | Lore / Brave Story records | codex:lore-153 | full source reference; exact simulation not claimed |
| lore-154 | Alphons Draclau | Lore / Brave Story records | codex:lore-154 | full source reference; exact simulation not claimed |
| lore-155 | Rafa Galthana (Age: 18) | Lore / Brave Story records | codex:lore-155 | full source reference; exact simulation not claimed |
| lore-156 | Malak Galthana (Age: 18) | Lore / Brave Story records | codex:lore-156 | full source reference; exact simulation not claimed |
| lore-157 | Mesdoram Elmdor (Age: 37) | Lore / Brave Story records | codex:lore-157 | full source reference; exact simulation not claimed |
| lore-158 | Mesdoram Elmdor (Age: 37) | Lore / Brave Story records | codex:lore-158 | full source reference; exact simulation not claimed |
| lore-159 | Gelkanis Barinten | Lore / Brave Story records | codex:lore-159 | full source reference; exact simulation not claimed |
| lore-160 | Mustadio Bunanza (Age: 19) | Lore / Brave Story records | codex:lore-160 | full source reference; exact simulation not claimed |
| lore-161 | Besrodio Bunanza (Age: 44) | Lore / Brave Story records | codex:lore-161 | full source reference; exact simulation not claimed |
| lore-162 | Bart Rudvich | Lore / Brave Story records | codex:lore-162 | full source reference; exact simulation not claimed |
| lore-163 | Celia (Age: 31?) | Lore / Brave Story records | codex:lore-163 | full source reference; exact simulation not claimed |
| lore-164 | Celia | Lore / Brave Story records | codex:lore-164 | full source reference; exact simulation not claimed |
| lore-165 | Lede (Age: 23?) | Lore / Brave Story records | codex:lore-165 | full source reference; exact simulation not claimed |
| lore-166 | Lede | Lore / Brave Story records | codex:lore-166 | full source reference; exact simulation not claimed |
| lore-167 | Ajora Glabados | Lore / Brave Story records | codex:lore-167 | full source reference; exact simulation not claimed |
| lore-168 | Vormav Tingel (Age: 48) | Lore / Brave Story records | codex:lore-168 | full source reference; exact simulation not claimed |
| lore-169 | Rofel Wodring (Age: 40) | Lore / Brave Story records | codex:lore-169 | full source reference; exact simulation not claimed |
| lore-170 | Izlude Tingel | Lore / Brave Story records | codex:lore-170 | full source reference; exact simulation not claimed |
| lore-171 | Kletian Drowa (Age: 29) | Lore / Brave Story records | codex:lore-171 | full source reference; exact simulation not claimed |
| lore-172 | Balk Fezol | Lore / Brave Story records | codex:lore-172 | full source reference; exact simulation not claimed |
| lore-173 | Meliadoul Tingel (Age: 23) | Lore / Brave Story records | codex:lore-173 | full source reference; exact simulation not claimed |
| lore-174 | Meliadoul Tingel (Age: 23) | Lore / Brave Story records | codex:lore-174 | full source reference; exact simulation not claimed |
| lore-175 | Cloud (Age: ?) | Lore / Brave Story records | codex:lore-175 | full source reference; exact simulation not claimed |
| lore-176 | Teta Hyral | Lore / Brave Story records | codex:lore-176 | full source reference; exact simulation not claimed |
| lore-177 | Balbanes Beoulve | Lore / Brave Story records | codex:lore-177 | full source reference; exact simulation not claimed |
| lore-178 | Gustav Margueriff | Lore / Brave Story records | codex:lore-178 | full source reference; exact simulation not claimed |
| lore-179 | Miluda Folles | Lore / Brave Story records | codex:lore-179 | full source reference; exact simulation not claimed |
| lore-180 | Golagros Levine | Lore / Brave Story records | codex:lore-180 | full source reference; exact simulation not claimed |
| lore-181 | Bordam Daravon (Age: 54) | Lore / Brave Story records | codex:lore-181 | full source reference; exact simulation not claimed |
| lore-182 | Elidibs | Lore / Brave Story records | codex:lore-182 | full source reference; exact simulation not claimed |
| lore-183 | Alazlam J.D. (Age: 53) | Lore / Brave Story records | codex:lore-183 | full source reference; exact simulation not claimed |
| lore-184 | <<< Work History >>> | Lore / Brave Story records | codex:lore-184 | full source reference; exact simulation not claimed |
| lore-185 | Highwind Salvage | Lore / Brave Story records | codex:lore-185 | full source reference; exact simulation not claimed |
| lore-186 | Salvage Tour Thoughts | Lore / Brave Story records | codex:lore-186 | full source reference; exact simulation not claimed |
| lore-187 | Sailor Tour Thoughts | Lore / Brave Story records | codex:lore-187 | full source reference; exact simulation not claimed |
| lore-188 | Enterprise Salvage | Lore / Brave Story records | codex:lore-188 | full source reference; exact simulation not claimed |
| lore-189 | Attractive Workplace? | Lore / Brave Story records | codex:lore-189 | full source reference; exact simulation not claimed |
| lore-190 | Hindenburg Salvage | Lore / Brave Story records | codex:lore-190 | full source reference; exact simulation not claimed |
| lore-191 | Falcon Salvage | Lore / Brave Story records | codex:lore-191 | full source reference; exact simulation not claimed |
| lore-192 | Legend of Heroic King | Lore / Brave Story records | codex:lore-192 | full source reference; exact simulation not claimed |
| lore-193 | Doga Salvage | Lore / Brave Story records | codex:lore-193 | full source reference; exact simulation not claimed |
| lore-194 | Envoy Ship of Lionel Castle | Lore / Brave Story records | codex:lore-194 | full source reference; exact simulation not claimed |
| lore-195 | Luxurious ship salvage | Lore / Brave Story records | codex:lore-195 | full source reference; exact simulation not claimed |
| lore-196 | Lost Ancient Writings | Lore / Brave Story records | codex:lore-196 | full source reference; exact simulation not claimed |
| lore-197 | Good Workplace and Job? | Lore / Brave Story records | codex:lore-197 | full source reference; exact simulation not claimed |
| lore-198 | Salvage in Riovanes! | Lore / Brave Story records | codex:lore-198 | full source reference; exact simulation not claimed |
| lore-199 | Vessel of Istanbul | Lore / Brave Story records | codex:lore-199 | full source reference; exact simulation not claimed |
| lore-200 | Douing Salvage | Lore / Brave Story records | codex:lore-200 | full source reference; exact simulation not claimed |
| lore-201 | Mining Tour Thoughts | Lore / Brave Story records | codex:lore-201 | full source reference; exact simulation not claimed |
| lore-202 | Miner's Tour Thoughts | Lore / Brave Story records | codex:lore-202 | full source reference; exact simulation not claimed |
| lore-203 | Letter to the Family | Lore / Brave Story records | codex:lore-203 | full source reference; exact simulation not claimed |
| lore-204 | Miner's Tour Repeated! | Lore / Brave Story records | codex:lore-204 | full source reference; exact simulation not claimed |
| lore-205 | Anything's possible! | Lore / Brave Story records | codex:lore-205 | full source reference; exact simulation not claimed |
| lore-206 | Guide to Miners | Lore / Brave Story records | codex:lore-206 | full source reference; exact simulation not claimed |
| lore-207 | Miner's Day Off | Lore / Brave Story records | codex:lore-207 | full source reference; exact simulation not claimed |
| lore-208 | Girl of Flame!? | Lore / Brave Story records | codex:lore-208 | full source reference; exact simulation not claimed |
| lore-209 | The First One Back | Lore / Brave Story records | codex:lore-209 | full source reference; exact simulation not claimed |
| lore-210 | Behind the Cliff | Lore / Brave Story records | codex:lore-210 | full source reference; exact simulation not claimed |
| lore-211 | Meet with the Unknown | Lore / Brave Story records | codex:lore-211 | full source reference; exact simulation not claimed |
| lore-212 | One Activity | Lore / Brave Story records | codex:lore-212 | full source reference; exact simulation not claimed |
| lore-213 | Fight of the Miners | Lore / Brave Story records | codex:lore-213 | full source reference; exact simulation not claimed |
| lore-214 | Ghost Staffs | Lore / Brave Story records | codex:lore-214 | full source reference; exact simulation not claimed |
| lore-215 | Tears of an Ex-miner | Lore / Brave Story records | codex:lore-215 | full source reference; exact simulation not claimed |
| lore-216 | 15 Black Knights | Lore / Brave Story records | codex:lore-216 | full source reference; exact simulation not claimed |
| lore-217 | After the Discovery Race | Lore / Brave Story records | codex:lore-217 | full source reference; exact simulation not claimed |
| lore-218 | Things at Lake bottom | Lore / Brave Story records | codex:lore-218 | full source reference; exact simulation not claimed |
| lore-219 | After 2nd Discovery Race | Lore / Brave Story records | codex:lore-219 | full source reference; exact simulation not claimed |
| lore-220 | Thing at Myst. Frontier | Lore / Brave Story records | codex:lore-220 | full source reference; exact simulation not claimed |
| lore-221 | After 3rd Discovery Race | Lore / Brave Story records | codex:lore-221 | full source reference; exact simulation not claimed |
| lore-222 | Thing in Deep Forest | Lore / Brave Story records | codex:lore-222 | full source reference; exact simulation not claimed |
| lore-223 | Thing at Bed Desert | Lore / Brave Story records | codex:lore-223 | full source reference; exact simulation not claimed |
| lore-224 | Thing at Zeklaus Desert | Lore / Brave Story records | codex:lore-224 | full source reference; exact simulation not claimed |
| lore-225 | Over Mountain Pass | Lore / Brave Story records | codex:lore-225 | full source reference; exact simulation not claimed |
| lore-226 | Discovery Tour Thoughts | Lore / Brave Story records | codex:lore-226 | full source reference; exact simulation not claimed |
| lore-227 | Thing in the Swamps | Lore / Brave Story records | codex:lore-227 | full source reference; exact simulation not claimed |
| lore-228 | Maze of Ancient People | Lore / Brave Story records | codex:lore-228 | full source reference; exact simulation not claimed |
| lore-229 | Join the Adventurer Team | Lore / Brave Story records | codex:lore-229 | full source reference; exact simulation not claimed |
| lore-230 | Report! It is true! | Lore / Brave Story records | codex:lore-230 | full source reference; exact simulation not claimed |
| lore-231 | Merchants' Worries! | Lore / Brave Story records | codex:lore-231 | full source reference; exact simulation not claimed |
| lore-232 | In the Mist... | Lore / Brave Story records | codex:lore-232 | full source reference; exact simulation not claimed |
| lore-233 | Wyberns Annihilated! | Lore / Brave Story records | codex:lore-233 | full source reference; exact simulation not claimed |
| lore-234 | Wild Kingdom | Lore / Brave Story records | codex:lore-234 | full source reference; exact simulation not claimed |
| lore-235 | Battle! Demon Lylis | Lore / Brave Story records | codex:lore-235 | full source reference; exact simulation not claimed |
| lore-236 | Father and Child | Lore / Brave Story records | codex:lore-236 | full source reference; exact simulation not claimed |
| lore-237 | Whisper Grass in Dark | Lore / Brave Story records | codex:lore-237 | full source reference; exact simulation not claimed |
| lore-238 | Battle! Whirlwind Karz! | Lore / Brave Story records | codex:lore-238 | full source reference; exact simulation not claimed |
| lore-239 | Crime of Ct. Minimum! | Lore / Brave Story records | codex:lore-239 | full source reference; exact simulation not claimed |
| lore-240 | Battle! Assault Cave! | Lore / Brave Story records | codex:lore-240 | full source reference; exact simulation not claimed |
| lore-241 | That is not the Aim! | Lore / Brave Story records | codex:lore-241 | full source reference; exact simulation not claimed |
| lore-242 | Too Naive! | Lore / Brave Story records | codex:lore-242 | full source reference; exact simulation not claimed |
| lore-243 | Pleasure of Goddess | Lore / Brave Story records | codex:lore-243 | full source reference; exact simulation not claimed |
| lore-244 | Women held in arms... | Lore / Brave Story records | codex:lore-244 | full source reference; exact simulation not claimed |
| lore-245 | Bye, Noble of Darkness! | Lore / Brave Story records | codex:lore-245 | full source reference; exact simulation not claimed |
| lore-246 | At the Hilltop Mansion? | Lore / Brave Story records | codex:lore-246 | full source reference; exact simulation not claimed |
| lore-247 | Unfortunate Monsters | Lore / Brave Story records | codex:lore-247 | full source reference; exact simulation not claimed |
| lore-248 | Fiar's Intentions! | Lore / Brave Story records | codex:lore-248 | full source reference; exact simulation not claimed |
| lore-249 | Back then... | Lore / Brave Story records | codex:lore-249 | full source reference; exact simulation not claimed |
| lore-250 | Rescue of Cornelia! | Lore / Brave Story records | codex:lore-250 | full source reference; exact simulation not claimed |
| lore-251 | Return of Pappal! | Lore / Brave Story records | codex:lore-251 | full source reference; exact simulation not claimed |
| lore-252 | Ultimate Atavism | Lore / Brave Story records | codex:lore-252 | full source reference; exact simulation not claimed |
| lore-253 | Thoughts of a Doll | Lore / Brave Story records | codex:lore-253 | full source reference; exact simulation not claimed |
| lore-254 | Letter from distant | Lore / Brave Story records | codex:lore-254 | full source reference; exact simulation not claimed |
| lore-255 | Battle! Mud Man! | Lore / Brave Story records | codex:lore-255 | full source reference; exact simulation not claimed |
| lore-256 | Darkness of Eternal Way | Lore / Brave Story records | codex:lore-256 | full source reference; exact simulation not claimed |
| lore-257 | Demon Golem | Lore / Brave Story records | codex:lore-257 | full source reference; exact simulation not claimed |
| lore-258 | Final Resistance | Lore / Brave Story records | codex:lore-258 | full source reference; exact simulation not claimed |
| lore-259 | Informant | Lore / Brave Story records | codex:lore-259 | full source reference; exact simulation not claimed |
| lore-260 | Most Precious Thing | Lore / Brave Story records | codex:lore-260 | full source reference; exact simulation not claimed |
| lore-261 | Poet Gilbert's Thoughts | Lore / Brave Story records | codex:lore-261 | full source reference; exact simulation not claimed |
| lore-262 | Delighted Ct. Minimum! | Lore / Brave Story records | codex:lore-262 | full source reference; exact simulation not claimed |
| lore-263 | Cannibalistic Plant | Lore / Brave Story records | codex:lore-263 | full source reference; exact simulation not claimed |
| lore-264 | Joyous Song for You | Lore / Brave Story records | codex:lore-264 | full source reference; exact simulation not claimed |
| lore-265 | The Talkative, Katedona | Lore / Brave Story records | codex:lore-265 | full source reference; exact simulation not claimed |
| lore-266 | Courage of Durman! | Lore / Brave Story records | codex:lore-266 | full source reference; exact simulation not claimed |
| lore-267 | Regain Ability! | Lore / Brave Story records | codex:lore-267 | full source reference; exact simulation not claimed |
| lore-268 | Delighted Ct. Minimum! | Lore / Brave Story records | codex:lore-268 | full source reference; exact simulation not claimed |
| lore-269 | Won Machinist Contest! | Lore / Brave Story records | codex:lore-269 | full source reference; exact simulation not claimed |
| lore-270 | Artist Mameko Leaves! | Lore / Brave Story records | codex:lore-270 | full source reference; exact simulation not claimed |
| lore-271 | Chocobo Restaurant | Lore / Brave Story records | codex:lore-271 | full source reference; exact simulation not claimed |
| lore-272 | Ship Casino, Black Jack | Lore / Brave Story records | codex:lore-272 | full source reference; exact simulation not claimed |
| lore-273 | Storm of 777! | Lore / Brave Story records | codex:lore-273 | full source reference; exact simulation not claimed |
| lore-274 | Inside Lakam Trade Co. | Lore / Brave Story records | codex:lore-274 | full source reference; exact simulation not claimed |
| lore-275 | Cherish Memories | Lore / Brave Story records | codex:lore-275 | full source reference; exact simulation not claimed |
| lore-276 | A Perfect Smile! | Lore / Brave Story records | codex:lore-276 | full source reference; exact simulation not claimed |
| lore-277 | Won the Yardow Fight! | Lore / Brave Story records | codex:lore-277 | full source reference; exact simulation not claimed |
| lore-278 | Won the Zaland Fight! | Lore / Brave Story records | codex:lore-278 | full source reference; exact simulation not claimed |
| lore-279 | Won the Magic Contest! | Lore / Brave Story records | codex:lore-279 | full source reference; exact simulation not claimed |
| lore-280 | Won the Meister Contest! | Lore / Brave Story records | codex:lore-280 | full source reference; exact simulation not claimed |
| lore-281 | Shrine of Chaos: | Lore / Brave Story records | codex:lore-281 | full source reference; exact simulation not claimed |
| lore-282 | Forbidden Land Eureka: | Lore / Brave Story records | codex:lore-282 | full source reference; exact simulation not claimed |
| lore-283 | Pandemonium: | Lore / Brave Story records | codex:lore-283 | full source reference; exact simulation not claimed |
| lore-284 | Mirage Tower: | Lore / Brave Story records | codex:lore-284 | full source reference; exact simulation not claimed |
| lore-285 | Floating Castle: | Lore / Brave Story records | codex:lore-285 | full source reference; exact simulation not claimed |
| lore-286 | Matoya Cave: | Lore / Brave Story records | codex:lore-286 | full source reference; exact simulation not claimed |
| lore-287 | Crystal Tower: | Lore / Brave Story records | codex:lore-287 | full source reference; exact simulation not claimed |
| lore-288 | Magic Continent: | Lore / Brave Story records | codex:lore-288 | full source reference; exact simulation not claimed |
| lore-289 | Castle of Trials: | Lore / Brave Story records | codex:lore-289 | full source reference; exact simulation not claimed |
| lore-290 | Tower of Babel: | Lore / Brave Story records | codex:lore-290 | full source reference; exact simulation not claimed |
| lore-291 | Ronkan Ruins: | Lore / Brave Story records | codex:lore-291 | full source reference; exact simulation not claimed |
| lore-292 | Falgabird: | Lore / Brave Story records | codex:lore-292 | full source reference; exact simulation not claimed |
| lore-293 | Magic Train: | Lore / Brave Story records | codex:lore-293 | full source reference; exact simulation not claimed |
| lore-294 | Touzas Village: | Lore / Brave Story records | codex:lore-294 | full source reference; exact simulation not claimed |
| lore-295 | Chocobo Forest: | Lore / Brave Story records | codex:lore-295 | full source reference; exact simulation not claimed |
| lore-296 | Semite Falls: | Lore / Brave Story records | codex:lore-296 | full source reference; exact simulation not claimed |
| lore-297 | Four Gods Set | Lore / Brave Story records | codex:lore-297 | full source reference; exact simulation not claimed |
| lore-298 | Statue of Lylis | Lore / Brave Story records | codex:lore-298 | full source reference; exact simulation not claimed |
| lore-299 | Beetle Charm | Lore / Brave Story records | codex:lore-299 | full source reference; exact simulation not claimed |
| lore-300 | Tobacco Pipe | Lore / Brave Story records | codex:lore-300 | full source reference; exact simulation not claimed |
| lore-301 | Zeni-Sword | Lore / Brave Story records | codex:lore-301 | full source reference; exact simulation not claimed |
| lore-302 | Black Cat | Lore / Brave Story records | codex:lore-302 | full source reference; exact simulation not claimed |
| lore-303 | Malice Mask | Lore / Brave Story records | codex:lore-303 | full source reference; exact simulation not claimed |
| lore-304 | Parade Helmet | Lore / Brave Story records | codex:lore-304 | full source reference; exact simulation not claimed |
| lore-305 | Kid's Bread | Lore / Brave Story records | codex:lore-305 | full source reference; exact simulation not claimed |
| lore-306 | Adult's Bread | Lore / Brave Story records | codex:lore-306 | full source reference; exact simulation not claimed |
| lore-307 | Calcobrina | Lore / Brave Story records | codex:lore-307 | full source reference; exact simulation not claimed |
| lore-308 | Yurgeivogue | Lore / Brave Story records | codex:lore-308 | full source reference; exact simulation not claimed |
| lore-309 | Red Materia | Lore / Brave Story records | codex:lore-309 | full source reference; exact simulation not claimed |
| lore-310 | Blue Materia | Lore / Brave Story records | codex:lore-310 | full source reference; exact simulation not claimed |
| lore-311 | Black Materia | Lore / Brave Story records | codex:lore-311 | full source reference; exact simulation not claimed |
| lore-312 | White Materia | Lore / Brave Story records | codex:lore-312 | full source reference; exact simulation not claimed |
| lore-313 | Rat Tail | Lore / Brave Story records | codex:lore-313 | full source reference; exact simulation not claimed |
| lore-314 | M-Fiction Novel | Lore / Brave Story records | codex:lore-314 | full source reference; exact simulation not claimed |
| lore-315 | Diary of Nanai | Lore / Brave Story records | codex:lore-315 | full source reference; exact simulation not claimed |
| lore-316 | Wyuvle | Lore / Brave Story records | codex:lore-316 | full source reference; exact simulation not claimed |
| lore-317 | Book of Enavia | Lore / Brave Story records | codex:lore-317 | full source reference; exact simulation not claimed |
| lore-318 | Magical Gun | Lore / Brave Story records | codex:lore-318 | full source reference; exact simulation not claimed |
| lore-319 | M Machinegun | Lore / Brave Story records | codex:lore-319 | full source reference; exact simulation not claimed |
| lore-320 | Magi-Sword | Lore / Brave Story records | codex:lore-320 | full source reference; exact simulation not claimed |
| lore-321 | Minu-Orb | Lore / Brave Story records | codex:lore-321 | full source reference; exact simulation not claimed |
| lore-322 | Tarot of Ben | Lore / Brave Story records | codex:lore-322 | full source reference; exact simulation not claimed |
| lore-323 | Excalipar | Lore / Brave Story records | codex:lore-323 | full source reference; exact simulation not claimed |
| lore-324 | Parasite Tree | Lore / Brave Story records | codex:lore-324 | full source reference; exact simulation not claimed |
| lore-325 | Longibunne Spear | Lore / Brave Story records | codex:lore-325 | full source reference; exact simulation not claimed |
| lore-326 | Chocobo Cannon | Lore / Brave Story records | codex:lore-326 | full source reference; exact simulation not claimed |
| lore-327 | St. Elmo's Fire | Lore / Brave Story records | codex:lore-327 | full source reference; exact simulation not claimed |
| lore-328 | Germonik Scriptures | Lore / Brave Story records | codex:lore-328 | full source reference; exact simulation not claimed |
| lore-329 | Aries | Lore / Brave Story records | codex:lore-329 | full source reference; exact simulation not claimed |
| lore-330 | Taurus | Lore / Brave Story records | codex:lore-330 | full source reference; exact simulation not claimed |
| lore-331 | Gemini | Lore / Brave Story records | codex:lore-331 | full source reference; exact simulation not claimed |
| lore-332 | Cancer | Lore / Brave Story records | codex:lore-332 | full source reference; exact simulation not claimed |
| lore-333 | Libra | Lore / Brave Story records | codex:lore-333 | full source reference; exact simulation not claimed |
| lore-334 | Scorpio | Lore / Brave Story records | codex:lore-334 | full source reference; exact simulation not claimed |
| lore-335 | Sagittarius | Lore / Brave Story records | codex:lore-335 | full source reference; exact simulation not claimed |
| lore-336 | Capricorn | Lore / Brave Story records | codex:lore-336 | full source reference; exact simulation not claimed |
| lore-337 | Aquarius | Lore / Brave Story records | codex:lore-337 | full source reference; exact simulation not claimed |
| lore-338 | Pisces | Lore / Brave Story records | codex:lore-338 | full source reference; exact simulation not claimed |
| fft-online | FFT Online — historical fan project, not a current game feature | Challenges / Historical fan content | codex:fft-online | full source reference; exact simulation not claimed |
| scavenger-hunt | Scavenger Hunt — optional challenge rules | Challenges / Scavenger Hunt | codex:scavenger-hunt | full source reference; exact simulation not claimed |
| verification-coverage | Coverage audit and remaining knowledge gaps | Verification / Audit | codex:verification-coverage | full source reference; exact simulation not claimed |
| verification-field-conflicts | Numeric source discrepancies | Verification / Conflicts | codex:verification-field-conflicts | full source reference; exact simulation not claimed |
| verification-errata | Corrections, disagreements and reliability rules | Verification / Read first | codex:verification-errata | full source reference; exact simulation not claimed |
| unverified-excalipar | Excalipar — unsupported source report | Verification / Unverified | codex:unverified-excalipar | full source reference; exact simulation not claimed |
| source-credits | Contributors and compilation provenance | Sources / Attribution | codex:source-credits | full source reference; exact simulation not claimed |
| legacy-links | Original guide links — historical references | Sources / Historical links | codex:legacy-links | full source reference; exact simulation not claimed |
| source-i | I — Item List | Sources / Uploaded source registry | codex:source-i | full source reference; exact simulation not claimed |
| source-j | J — Jobs/Abilities Chart | Sources / Uploaded source registry | codex:source-j | full source reference; exact simulation not claimed |
| source-m | M — Battle Mechanics Guide | Sources / Uploaded source registry | codex:source-m | full source reference; exact simulation not claimed |
| source-s | S — Character/Class/Monster Level Stats FAQ | Sources / Uploaded source registry | codex:source-s | full source reference; exact simulation not claimed |
| source-t | T — Complete Game Script | Sources / Uploaded source registry | codex:source-t | full source reference; exact simulation not claimed |
| source-w | W — Guide and Walkthrough | Sources / Uploaded source registry | codex:source-w | full source reference; exact simulation not claimed |
| web-e01 | E01 — Square Enix — Ivalice Chronicles edition descriptions | Sources / Web verification | codex:web-e01 | full source reference; exact simulation not claimed |
| web-e02 | E02 — RPGClassics — Cloud recruitment route | Sources / Web verification | codex:web-e02 | full source reference; exact simulation not claimed |
| web-e03 | E03 — RPGClassics — Propositions | Sources / Web verification | codex:web-e03 | full source reference; exact simulation not claimed |
| web-e04 | E04 — RPGClassics — Weapons | Sources / Web verification | codex:web-e04 | full source reference; exact simulation not claimed |
| web-e05 | E05 — Caves of Narshe — PSX weapons | Sources / Web verification | codex:web-e05 | full source reference; exact simulation not claimed |
| web-e06 | E06 — RPGClassics — Deep Dungeon | Sources / Web verification | codex:web-e06 | full source reference; exact simulation not claimed |
| web-e07 | E07 — RPGClassics — Colliery third floor | Sources / Web verification | codex:web-e07 | full source reference; exact simulation not claimed |
| web-e08 | E08 — RPGClassics — Colliery second floor | Sources / Web verification | codex:web-e08 | full source reference; exact simulation not claimed |
| web-e09 | E09 — RPGClassics — Colliery first floor | Sources / Web verification | codex:web-e09 | full source reference; exact simulation not claimed |
| web-e10 | E10 — RPGClassics — Underground Passage | Sources / Web verification | codex:web-e10 | full source reference; exact simulation not claimed |
| web-e11 | E11 — RPGClassics — Nelveska Temple | Sources / Web verification | codex:web-e11 | full source reference; exact simulation not claimed |
| web-e12 | E12 — RPGClassics — Zarghidas rescue | Sources / Web verification | codex:web-e12 | full source reference; exact simulation not claimed |
