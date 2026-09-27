# Crown of Ash — completion report

Generation date: **26 September 2026**

Model: **GPT-6 (Codex)**

Source: **Final Fantasy Tactics, original English PlayStation edition**

Authoritative content: `FFT_Unified_Guide.md`

This is a playable adaptation, with explicit balance and presentation changes. It is not a PlayStation emulator or a claim of identical source formulas. The full [record checklist](docs/SOURCE_CHECKLIST.md) distinguishes runtime content from reference material. The [content audit](docs/CONTENT_AUDIT.md) records stronger source-to-runtime checks.

## Campaign and content

| Requirement | Implementation and evidence |
| --- | --- |
| Start through ending | Title → difficulty/prologue → campaign map → 57 ordered stages across four chapters → Airship Graveyard transformations → ending → optional postgame. The full-route engine test plays actual turns and spends actual gil/JP rather than assigning completion flags. |
| Story | Encounter briefings and source-backed dialogue summaries, 20 aftermath sequences for political/interstitial events, and the complete ending covering Ramza/Alma, Delita/Ovelia, Olan, and the Durai Papers. All 106 supplied script records are preserved. Major story events map to briefings, aftermaths, the ending, and optional visits; the credits record remains in the archive. |
| Areas and transitions | Named world-map stages, chapter progression, replay routes, Bethla north/south choice, optional expedition chains, and ordered town visits. Seventeen complete source grids are integrated; remaining boards are original compact interpretations where the guide lacks complete grids. |
| Jobs and progression | Twenty generic jobs with prerequisite job levels; named special jobs and recruitable monsters; EXP, JP, learned abilities, equipped secondary commands, and separate reaction/support/movement slots. |
| Company growth | Soldier Office hiring, recruit Brave/Faith values, zodiac signs, dispatch crew selection, monster invitation, sixteen breeding families, eggs that develop through victories, hatching, and managed roster capacity. |
| Abilities | 506 source ability entries plus Attack. Runtime commands cover physical/magical attacks, charge timing, healing/revival, buffs/statuses, Jump, Math Skill, sword skills, Talk Skill, Steal/Break, Draw Out, Throw, repeated songs/dances, and monster commands. Exact source formulas remain inspectable beside the adaptation. |
| Items and equipment | 257 item/item-note records with acquisition routes, including same-name rare variants and alias records. Shops, equipment restrictions, enemy loadouts, theft, treasure, poaching, quest rewards, and consumable stock use the item data. Source-only explanatory equipment records are not counted as extra items. |
| Optional quests | Six recruitment encounters, ten Deep Dungeon floors, two rare encounters, eight added patrols using source areas/monsters, eight named dispatch propositions, and eleven ordered recruitment/tavern/location visits. |
| Secret characters | Source-gated Mustadio/Goug chain, Beowulf/Reis, Worker 8, Nelveska, Cloud, the Zarghidas flower, Materia Blade search, and Byblos. Story recruits join at their corresponding progression points. |
| Deep Dungeon | Sequential floor access, source grid treasure pairs where supplied, Move-Find Item, exploration exits, Elidibs, and learning Zodiac by surviving the summon in the appropriate job. |
| Source checklist | Every one of the guide's 2,198 records has a provenance-preserving entry and a stated runtime/archive destination. The complete source text is loaded on demand in Chronicle → Source archive. |

## Tactical systems

Turns accrue CT from Speed. A unit may move and act in either order, then choose its facing; waiting without both actions preserves initiative. Pathfinding checks elevation, occupancy, water, gaps, and equipped movement abilities. Directional evasion, height, Brave, Faith, zodiac compatibility, elemental interactions, MP, finite inventory, status effects, and action previews affect decisions.

Spells charge on the shared clock, may follow a selected unit, and can affect allies. Jump removes its user from ordinary targeting until landing. Reaction abilities use their trigger conditions; support and movement abilities must be equipped. Job-point purchases are distinct from loadout selection. Enemy AI uses legal commands, finite supplies, healing, objectives, and target positioning.

Defeat, rescue, boss, sluice-switch, and dungeon-exploration objectives are evaluated by the simulation. Crystallization has a revival window. Current-battle saves preserve the complete simulation state; separate pre-encounter camp checkpoints protect recovery from difficult routes.

## Presentation and technology

- Original title, low-poly brick geometry, toy humanoid/monster models, isometric camera rotation and zoom, parchment interface, readable turn order and action previews, floating combat feedback, and physical fragments.
- Pinned Vite, Three.js `WebGPURenderer`, TSL/node materials, and the node `RenderPipeline`. Automatic WebGL2 initialization fallback plus recovery from WebGPU device loss while retaining the active game.
- Generated floating-point HDR environment, physically based materials, soft directional shadows, local contact shading, restrained bloom, and FXAA. High uses multisampling on WebGPU; both backends retain the same art and scene.
- Auto/High/Balanced controls change resolution, shadow resolution, post effects, dynamic body limits, and maximum physics catch-up. Auto uses measured frame times. Backend, effective quality, and frame timing are visible in diagnostics.
- Rapier runs fixed 60 Hz steps with interpolated debris poses, cuboid colliders, mass/friction, bounded active bodies, lifetime cleanup, and old-board collider cleanup.
- Desktop pointer and keyboard controls, touch controls, two-step action confirmation, camera buttons/pinch zoom, volume/mute, fullscreen, and a controls reference.
- Local fonts and all audio assets; source archive loads separately. No application service or API key is required.

## Additions and deliberate adaptations

The design preserves job customization, positional combat, and the orchestral atmosphere praised in contemporary reviews. Clear previews, shorter command paths, forgiving optional difficulty, and safe recovery address the uneven difficulty and save traps described in [RPGFan's original review](https://www.rpgfan.com/review/final-fantasy-tactics/) and [RPGamer's later retrospective assessment](https://rpgamer.com/review/final-fantasy-tactics-the-ivalice-chronicles-review/).

These are **new for this build**, not claims about the original game's content:

1. Crown of Ash branding, toy geometry, lighting, interface, camera controls, diagnostics, quality presets, and physical effects.
2. Short original prose that summarizes source scenes, with readable pre-battle and aftermath panels instead of reproducing the entire script as cutscenes.
3. Story difficulty, adjusted level/JP/reward pacing, clear previews, touch confirmation, suspend saves, and safe camp recovery.
4. Compact maps where the source guide does not provide complete grids; visual architecture and props on all boards. Source height cells are retained on the seventeen complete maps.
5. Eight repeatable wilderness patrols. Their areas and monster species are source material; the encounter compositions and progression gates are additions that make poaching routes available without depending on the original random encounter tables.
6. Explicit treasure caches for rare items where an obtainable source item is documented but the guide omits a complete placement grid. The content audit distinguishes these placements from source coordinates.
7. Reward- and job-jingle excerpts used as temporary UI/combat sound cues. They are not the original individual attack/footstep effects.
8. Recovery of the roster after a won battle instead of permanent deletion of crystallized companions. Crystallization, revival timing, and battle loss still operate within encounters.
9. A 32-place roster, a 600-gil Soldier Office commission, and victory-based egg incubation. Breeding families and recruitment Brave/Faith ranges come from the guide; prices, capacity, and incubation pacing are disclosed adaptations.

## Verification

Final verification on 26 September 2026: **30/30 engine tests passed**, the source/content verifier passed, the Vite production build passed, and **5/5 production browser tests passed with zero skipped tests**. Both WebGPU and WebGL2 were exercised. The browser suite also checks that texture allocation remains bounded across repeated quality changes.

Rendered evidence: [title](docs/screenshots/title.png), [battle](docs/screenshots/battle.png), [mobile battle](docs/screenshots/mobile.png), and [ending loaded from legally simulated progress](docs/screenshots/ending.png). These captures use software rendering and are not performance benchmarks.

The reproducible verification commands are:

```sh
node scripts/check-content.mjs
npm run build
EXPORT_COMPLETED_SAVE=1 npm test
VERIFY_ENDING=1 xvfb-run -a npm run test:e2e
```

The content verifier checks the source hash, every archive record, 1,975 visible cells across seventeen source maps, all item acquisition mappings, all 48 poach species occurring in encounters, and eleven ordered world-event gates. These structural checks do **not** independently prove every item's combat effect.

The full-route simulation exercises every campaign and optional encounter, preparation purchases, ability learning, source recruitment gates, dungeon exits, rewards, ending, and persistence. Focused tests cover tactical and progression invariants. The full automatic route uses Story difficulty; this is not a claim that the automated policy solves every Tactical battle.

Production browser tests exercise actual canvas tile input, options, local battle suspension/restoration, company management, lazy archive access, mobile layout, both rendering backends, quality changes, bounded physics cleanup, and device-loss fallback. Screenshots and JSON test results are generated under `artifacts/`. A virtual display is required for trustworthy WebGPU screenshots in this Linux headless environment.

## Known limitations

- Combat constants, growth curves, enemy balancing, movement representation, and a number of specialist effect details are adaptations. Exact integer truncation, RNG order, every original bug, layered-map behavior, and byte-identical formula emulation are outside this implementation's claim.
- The supplied reference itself omits complete later map grids and a complete proposition calendar. Missing terrain and dispatch timing use disclosed design choices.
- Save data belongs to the current browser/device. There is no account or cloud synchronization.
- Desktop and phone viewport correctness is checked in Chromium. A real flagship-phone or physical-GPU performance benchmark has not been conducted; software rasterizer frame rates must not be presented as hardware performance results.
- Initial loading includes Rapier's embedded compatibility WASM. The full guide text is a separate lazy chunk. Vite reports large physics/archive chunks even though they are intentionally separated and compressed for transport.
- The requested Sounds Resource catalog does not contain a PS1 FFT entry at the checked URL. The included original-game music and jingles come from Zophar; exact asset links and all derived cue uses are listed in the README and single audio manifest.

## Delivery

The GitHub repository is [`michaelcrosato/crown-of-ash-gpt6`](https://github.com/michaelcrosato/crown-of-ash-gpt6). It is private for the requested internal test edition. Vercel can import it with the standard Vite build to `dist`; the included configuration requires no environment variables or manual setup beyond importing the repository. The title/about screen and README show the generation date and model.
