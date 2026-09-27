# Content implementation audit

Audit date: 2026-09-26. Model: GPT-6. Authority: the supplied original-English-PlayStation `FFT_Unified_Guide.md`, including `guide-usage`, `verification-errata`, and `verification-coverage`.

This document distinguishes a playable route, a runtime behavior, a preserved reference, and a design adaptation. The record inventory alone does not prove gameplay completion. The full record map is [SOURCE_CHECKLIST.md](SOURCE_CHECKLIST.md).

## Evidence and verification scope

Run:

```sh
npm run extract
node scripts/check-content.mjs
npm test
npm run build
```

`scripts/check-content.mjs` passed after the changes recorded here. It verifies the guide SHA-256, all source IDs and runtime references, lazy loading of all 2,198 full records, job prerequisites, item acquisition references, all 48 poachable species appearing in encounters, exact integration of 17 source map grids, and the 11 world-event transitions. Its map comparisons cover 1,975 present tiles, not merely map names. It also exercises actual Genji shield/accessory theft, Chantage automatic Regen/Reraise, and Worker 7's one-time 1-HP reserve circuit.

The event and named-item checks deliberately stage campaign checkpoints to isolate prerequisites and rewards. They are **not** a full campaign playthrough. The separate engine suite owns legal combat, progression, saves, and ending tests; the rendered browser checks own UI and visual confirmation. A successful extraction or staged event fixture must not be described as a complete played campaign.

Source SHA-256: `f094db4b76d327db38db03fc0bfe3e199c8a8cd32b9ca7e26b3b9e536577eb5b`.

## Campaign and major encounters

The runtime `campaign` array contains the prologue and every one of the guide's 53 battle records, across all four chapters. Three combined source encounters become consecutive playable phases: Wiegraf/Velius (`battle-2-3j`), Dycedarg/Adramelk (`battle-2-4m`), and Altima/St. Ajora (`battle-2-4v`). This produces 57 stages without omitting the transformations.

| Source requirement | Playable destination and evidence |
| --- | --- |
| Cadets, the Death Corps, Miluda, Wiegraf, and Zeakden | Chapter I encounters `battle-2-1a` through `battle-2-1i`; source job rosters and native early-area grids |
| Ovelia, the Cardinal, Bart Company, Mustadio, Gafgarion, and Queklain | Chapter II encounters `battle-2-2a` through `battle-2-2k`; guest and rescue metadata; Gafgarion's betrayal changes his side |
| Olan, heresy, Alma, the Scriptures, Izlude, Rafa/Malak, and Riovanes | Chapter III encounters `battle-2-3a` through `battle-2-3k`, including a one-unit Wiegraf duel and the separate Velius phase |
| Meliadoul, Zeltennia, Balk, Bethla, Limberry, the Beoulve brothers, and Murond | Chapter IV `battle-2-4a` through `battle-2-4p`; Bethla North/South approach metadata; sluice switches; named sword-skill opponents |
| Final Orbonne descent, Death City, Balk, Hashmalum, Altima, and St. Ajora | Chapter IV `battle-2-4q` through `battle-2-4v-ajora`; final-phase ending transition |
| Guest participation | `encounter.guests` includes the source-confirmed Delita/Algus, Agrias/Gafgarion, Mustadio, Alma, Rafa, Meliadoul, and Zalbag appearances; Delita departs after Zeakden |
| Objective variety | Boss defeat, rescue protection, the Wiegraf duel, Bethla switches, and dungeon exit discovery are separate runtime objective paths |

The rescued-character branches at Mandalia, Araguay, and Zaland follow the protective route. Alternate dialogue choices remain in the archive; the game does not claim to reproduce every source dialogue branch as a separate campaign.

## Story that appears during play

Encounter briefs carry the tactical story forward. Twenty source-backed `storyBeats` are shown after victories, with the same content available through `aftermath`; these add the interstitial events that a battle-name list would miss. They are paraphrases, not invented quotations attributed to source characters.

| After encounter | Added source story content | Source records |
| --- | --- | --- |
| Mandalia Plains | Algus's fallen family, Dycedarg's orders, Alma and Teta at Igros | `scene-008`, `scene-009` |
| Sand Rat Cellar | Wiegraf kills Gustav, releases Elmdor, and exposes the gap between rebellion and ransom; Larg and Dycedarg's private arrangement | `scene-012`, `scene-014`, `scene-015` |
| Thieves Fort | Teta's abduction, Algus's contempt for commoners, Ramza defending Delita, and the reed-flute memory | `scene-017`–`scene-020` |
| Fovoham Plains | Miluda's death, Wiegraf's grief, Golagros's hostage, and the move to Zeakden | `scene-022`–`scene-024` |
| Fort Zeakden | Zalbag's order, Teta's death, Delita beside her, the explosion, and Ramza leaving his house | `scene-025`–`scene-027` |
| Goug | Mustadio's counterfeit stone, the passage to Warjilis, Delita's warning, and Draclau's trap | `scene-038`–`scene-040` |
| Golgorand | Vormav **claims** Ovelia is a substitute; the narrative does not independently certify an antagonist's allegation | `scene-043` |
| Queklain | Delita delivers Ovelia to Goltana, the succession struggle becomes war, and Orlandu argues against further taxation and bloodshed | `scene-046`–`scene-048` |
| Goland | Zalbag rejects Ramza's accusations against Dycedarg | `scene-049`, `scene-050` |
| Orbonne III | Alma's ransom demands the Scriptures; Delita promises Ovelia a country worthy of her | `scene-055`, `scene-056` |
| Yardow | Barinten's destruction of Rafa's village and exploitation of war orphans | `scene-059` |
| Velius | Izlude's dying warning and Vormav recognizing Alma as a vessel | `scene-065` |
| Riovanes roof | Malak's sacrifice and restoration, and Ramza realizing that even the High Priest may be manipulated | `scene-066`–`scene-068` |
| Zeltennia | The Church's plan to exhaust the armies and assassinate their leaders | `scene-074`, `scene-075` |
| Bed Desert | The poisoned Hokuten, Dycedarg murdering Larg, and the accusation about Balbanes | `scene-076` |
| Bethla sluice | Orlandu's escape, Delita murdering Goltana, and the false Orlandu execution | `scene-079` |
| Poeskas Lake | Rofel's pressure on Dycedarg and Zalbag finding evidence at Balbanes's grave | `scene-083`, `scene-089` |
| Limberry cemetery | Meliadoul seeing the stone's truth; Olan trying to warn Ovelia | `scene-087`, `scene-088` |
| Adramelk | The collapse of the Beoulve household and Ramza's remaining commitment to Alma | `scene-090`, `scene-091` |
| Murond chapel | Zalbag's torment and the dying High Priest's direction to Orbonne | `scene-092`, `scene-095`, `scene-096` |

The ending uses `ending.paragraphs`: Olan sees Ramza and Alma alive, the siblings ride away, Delita and Ovelia's flower-and-dagger scene follows, and Olan's execution and the centuries-long suppression of the Durai Papers lead to Alazlam's recovery of the truth. `scene-103` contains the travel-film account; `scene-104` is primarily credits, not that film. `scene-105` combines the Delita/Ovelia coda with the optional-quest script, which is also mapped to world events.

The complete script, character biographies, Scriptures, historical reports, treasures, and discoveries remain readable through the archive. Reference preservation is explicitly separate from the shorter narrative presented during play.

## Areas, geometry, exits, and treasure

The guide supplies 17 complete height grids and one empty END grid. The extractor tokenizes glued forms such as `30t180`, prefix slopes such as `90<140`, and untargetable `xXx` cells. Splitting those lines on spaces would silently change geometry.

| Native source map | Width × depth |
| --- | --- |
| Gariland | 10 × 15 |
| Mandalia Plains | 12 × 13 |
| Sweegy Woods | 12 × 11 |
| Dorter Trade City | 10 × 16 |
| Sand Rat Cellar | 10 × 11 |
| Thieves Fort | 10 × 12 |
| Lenalia Plateau | 11 × 11 |
| Fovoham Plains | 8 × 10 |
| Nogias | 10 × 10 |
| Terminate | 9 × 12 |
| Delta | 10 × 16 |
| Valkyries | 16 × 11 |
| Mlapan | 7 × 12 |
| Tiger | 10 × 11 |
| Bridge | 15 × 9 |
| Voyage | 13 × 14 |
| Horror | 12 × 10 |

`sourceMaps` preserves original orientation: source column A becomes x=0 and source row 1 becomes z=0. Ten printed height units become one original height unit. `t` cells cannot be stood on but remain targetable; `xXx` cells are absent and untargetable. Water depth, slopes, the Sand Rat underpass, deployment panels, enemy/guest positions, four candidate exits per dungeon floor, 60 common/rare treasure pairs, and 36 named dungeon traps are structured data. The runtime loads these grids through `encounter.sourceMapId`; the validation compares loaded geometry with the source export.

Some source records disagree. For example, the Bridge map places an Elixir on K5 while the combined treasure index says L5. The playable grid follows its own map record's orientation; the original conflicting records remain inspectable. No missing END geometry is invented and labelled as source geometry. Later areas and END use designed toy battlefields where the guide supplies no complete matrix.

## Recruitment and optional play

The optional routes include four Goland battles, Nelveska, the Cloud rescue, all ten Deep Dungeon floors, the two named rare battle families, and eight repeatable wilderness patrols.

| Ordered route | Runtime steps and gate |
| --- | --- |
| Colliery | Keep Mustadio; after Adramelk, visit Goug's machine, read Ghost of Colliery at Goland, meet Beowulf at Lesalia, then clear the four mine battles |
| Beowulf and Reis | Beowulf appears as a mine guest; rescuing Reis recruits both, with Reis still in Holy Dragon form |
| Worker 8 | Return to Goug after the rescue; `goug-worker8` awakens and recruits the construct |
| Human Reis | Inspect Goug's second device, read Zeltennia's Cursed Island rumor, defeat Worker 7 twice, then use `nelveska-reis` to restore Reis's Dragoner job |
| Cloud | Buy the Zarghidas flower for one gil, activate Goug's device after Nelveska, and rescue Cloud in Zarghidas |
| Materia Blade | After rescuing Cloud, the Bervenia summit visit requires equipped Move-Find Item; the sword gates Limit commands |
| Deep Dungeon | Complete Murond Holy Place III and hear the Warjilis rumor; clear floors in order; Elidibs has Zodiac in his actual command list |
| Byblos | Recruitment follows completion of END |

The Chapter IV post-Adramelk checkpoint follows the guide's conservative corrected route. It is not a claim that every preliminary original-game scene was impossible earlier.

Eight named propositions use the source's job recommendations. Their complete calendar was absent from the supplied source, so costs, rewards, availability, and battle-count durations are explicit adaptations. The engine dispatches generic units away from the fighting party and later returns their results. The source's hundreds of historical reports are available in the archive rather than falsely presented as hundreds of distinct implemented dispatches.

The soldier-office and monster-breeding rules have their own structured exports: `soldierOfficeRules`, `breedingFamilies`, and `reproductionRules`. `mechanics-7-1` describes level-one Squire recruits with Clothes and Leather Hat; `mechanics-6-10` gives both recruited soldiers and hatched monsters Brave/Faith ranges of 40–70. `monster-legend` describes three-species breeding families, time-dependent eggs, Yellow Chocobo producing Yellow/Black, and Black producing Red. The supplied guide states neither hire fees nor exact hatch duration, breeding probability, or nursery capacity. Those values must be labelled as economy/pacing choices. There are 16 ordinary breeding families; unique story monsters are not silently added to them. These data exports require corresponding runtime hiring/incubation checks; their existence alone does not certify the completed loop.

## Items and upgrades with actual routes

Every one of the 257 item/item-note records has `acquisitionRoutes`. Five supplemental descriptions are canonical aliases rather than five newly invented weapons. Route kinds are shops, poaches, map treasure, theft, recruitment equipment, world visits, or explicit victory rewards. Every poach route names at least one reachable encounter containing that species.

| Notable source equipment | Actual route |
| --- | --- |
| Blood Sword | Gafgarion at Golgorand; Hyudra poach |
| Defender and Chantage | Meliadoul at Bervenia; source poaches remain available |
| Masamune and the four Genji pieces | Elmdor's interior Limberry loadout includes Masamune, Genji Shield, Helmet, Armor, and Gauntlet; theft occurs in the correct PSX encounter |
| Blaze, Glacier, and Blast Guns | Named Chemists/Balk loadouts and source dungeon treasure |
| Excalibur | Orlandu joins carrying it; Mlapan also retains its source treasure |
| Rare Javelin and Escutcheon | Nelveska pillar treasure metadata preserves the rare variants, five-Jump requirement, and stepping-stone condition |
| Materia Blade | Ordered Bervenia summit world visit after Cloud's rescue |
| Vanish Mantle | Germinas Peak cache; placement is designed because this record supplies no exact coordinate |
| Chaos Blade, Chirijiraden, Sasuke Knife | Guaranteed END completion cache, clearly marked as an added acquisition route covering the missing END map |

The equipment audit corrected a significant interpretation error: an `E.LV` in parentheses means random enemies cannot equip the item. It does **not** mean an item is unbuyable. Sprint Shoes, Feather Boots, Red Shoes, Reflect Mail, and other ordinary equipment therefore remain in shops. Original prices, WP, bonuses, effects, and acquisition descriptions stay separate from adapted chapter pacing and damage scaling.

Source automatic/initial statuses, status blocks, on-hit effects, and weapon ranges are explicit fields. Named runtime checks verify Chantage and Genji theft; they do not by themselves prove every individual equipment interaction.

## Jobs, skills, and reference-only material

The 20 generic jobs retain the original PSX prerequisite graph. Special characters and monsters have separate source-linked classes. JP learning, secondary commands, and separate reaction/support/movement slots are runtime systems, not just menu listings. The data distinguishes healing, revival, status, buff, damage, stealing, breaking, invitation, draining, CT/stat changes, jump upgrades, consumables, and resource-dependent commands. Zodiac and Ultima carry survival-learning restrictions; Cloud's Limit and Samurai Draw Out retain their equipment requirements.

`characterProfiles` preserves readable fixed Zodiac signs and sex flags from `zodiac-practice`, the battle profiles, and the boss compendium. Queklain, Zalera, and Hashmalum retain the source's **male** flags despite their monstrous appearance; Velius, Adramelk, and Altima use the monster rule. The default Ramza birthday is January 1 from the guide's party route. A character's held Zodiac Stone is not used to guess that character's birth sign. Unspecified values require an explicit generated runtime default, not an invented source fact. Zodiac compatibility is a combat mechanism that needs its own engine checks in addition to this data audit.

The 506 source ability records include ordinary actions, direct-command definitions, reactions, support and movement skills, monster/boss commands, and records explicitly described by the source as unused or cheat-only. They are all retained for inspection; the count must not be presented as 506 ordinary learnable player attacks. Source formulas are preserved, while the browser game uses its own documented damage and progression scale. The original duplicate ability indices remain separate IDs.

The guide also contains comparison opinions, alternate stat datasets, field-conflict registers, biographies, lore, and legacy descriptions. These are reference content. A source record marked `full source reference; exact simulation not claimed` is not evidence that an extra playable encounter, a duplicate statistic profile, or an obsolete bug was implemented.

## Explicit additions and practical limits

- Scaled base stats, damage magnitudes, rewards, and shop chapter pacing tune the browser campaign; they are not claimed to be binary-identical PSX math.
- Eight repeatable patrol compositions make all source poach species reachable without relying on undocumented random encounter tables. The monsters and areas are source content; those exact compositions and menu access are additions.
- The END relic cache and guided Materia Blade visit are deliberate additions where the source's coordinates or complete route detail are missing.
- The hiring fee, expanded 32-unit roster, eight-egg nursery limit, three-victory egg-generation cadence, and two-victory incubation period are browser-game economy/pacing choices. They are not sourced PSX numeric values. New ordinary soldiers still use the source level-one entry point and Brave/Faith range.
- The narrative is concise source-backed prose and aftermath scenes; full source dialogue is readable but is not reenacted line by line or fully voiced.
- Native maps preserve the available source grids. Maps absent from the guide use designed layouts; the incomplete END grid remains marked incomplete in the source export.
- A complete original proposition calendar, every original formula/AI quirk, and every variant legacy stat table are not certified by this audit. The guide itself lists unresolved gaps.

Source completeness must be assessed against these concrete destinations and observed behaviors, not by the size of the archive or by a green build alone.
