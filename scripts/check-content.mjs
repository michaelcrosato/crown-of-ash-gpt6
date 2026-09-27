import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
	abilities,
	campaign,
	equipment,
	guideRecords,
	isGuideArchiveLoaded,
	jobs,
	loadGuideRecords,
	metadata,
	optionalBattles,
	poaches,
	sourceMaps,
	worldEvents,
} from "../src/content.js";
import { Game } from "../src/engine.js";

const index = (items) => new Map(items.map((item) => [item.id, item]));
const records = index(guideRecords);
const allJobs = index(jobs);
const allAbilities = index(abilities);
const allItems = index(equipment);
const encounters = index([...campaign, ...optionalBattles]);
const source = readFileSync(
	new URL("../FFT_Unified_Guide.md", import.meta.url),
);
assert.equal(
	createHash("sha256").update(source).digest("hex"),
	metadata.guideSha256,
);
assert.equal(guideRecords.length, 2198);
assert.equal(isGuideArchiveLoaded(), false);
await loadGuideRecords();
assert.equal(isGuideArchiveLoaded(), true);
assert(
	guideRecords.every((record) =>
		record.text?.includes(`**ID:** \`${record.id}\``),
	),
);
assert.equal(campaign.length, 57);
assert.equal(optionalBattles.length, 26);
assert.equal(jobs.filter((job) => !job.special).length, 20);
for (const [name, list] of Object.entries({
	campaign,
	optionalBattles,
	jobs,
	abilities,
	equipment,
	guideRecords,
	worldEvents,
}))
	assert.equal(index(list).size, list.length, `Duplicate ${name} IDs`);
for (const encounter of encounters.values()) {
	assert(records.has(encounter.sourceId), `${encounter.id} lacks a source`);
	assert(encounter.enemies.length > 0);
	for (const enemy of encounter.enemies)
		assert(allJobs.has(enemy.job), `${encounter.id}: ${enemy.job}`);
	if (encounter.requiresBattle)
		assert(encounters.has(encounter.requiresBattle));
}
for (const job of jobs) {
	for (const id of job.abilities) assert(allAbilities.has(id));
	for (const requirement of job.requires) assert(allJobs.has(requirement.job));
}
for (const ability of abilities) {
	assert(records.has(ability.sourceId));
	if (ability.consumable) assert(allItems.has(ability.consumable));
}
assert.equal(allItems.get("item-49").power, 16, "Stone Gun erratum");
assert.equal(
	allAbilities.get("ability-direct-level-jump2").amount,
	2,
	"Level Jump2 erratum",
);
assert.equal(
	allAbilities.get("ability-078").amount,
	4,
	"Preach increases Faith",
);
assert.equal(
	allAbilities.get("ability-079").amount,
	-20,
	"Solution decreases Faith",
);
assert.equal(allAbilities.get("ability-005").kind, "revive");
assert.equal(allAbilities.get("ability-007").kind, "buff");
assert.equal(
	allAbilities.get("ability-121").effect,
	"stat",
	"Level Blast is not a passive",
);
assert.match(
	allAbilities.get("ability-010").formula,
	/MA \* 14/,
	"Multiplication operators preserved",
);
assert.equal(
	allItems.get("item-d5").rare,
	false,
	"E.LV parentheses do not remove Sprint Shoes from shops",
);
assert.equal(
	allItems.get("item-7a").price,
	50,
	"Shuriken uses source cost, not enemy equipment level",
);
assert(equipment.every((item) => item.acquisitionRoutes.length > 0));
const encounteredJobs = new Set(
	[...encounters.values()].flatMap((encounter) =>
		encounter.enemies.map((enemy) => enemy.job),
	),
);
for (const poach of poaches) {
	assert(encounteredJobs.has(poach.job));
	assert(allItems.has(poach.common));
	assert(allItems.has(poach.rare));
}

const game = new Game({ storage: null });
game.newGame();
let mapChecks = 0;
let tileChecks = 0;
for (const encounter of encounters.values()) {
	const map = sourceMaps.find(
		(entry) => entry.id === encounter.sourceMapId && entry.complete,
	);
	if (!map) continue;
	const actual = game.buildMap(encounter);
	assert.equal(actual.width, map.width);
	assert.equal(actual.height, map.height);
	for (const sourceTile of map.tiles.filter((tile) => tile.present)) {
		const tile = actual.tiles.find(
			(tile) => tile.x === sourceTile.x && tile.z === sourceTile.z,
		);
		assert(tile);
		assert.equal(tile.height, sourceTile.height);
		assert.equal(tile.blocked, sourceTile.blocked);
		assert.equal(tile.targetable, sourceTile.targetable);
		tileChecks++;
	}
	mapChecks++;
}
assert.equal(mapChecks, 17);
const tile = (id, x, z) =>
	sourceMaps
		.find((map) => map.id === id)
		.tiles.find((tile) => tile.x === x && tile.z === z);
assert.equal(tile("map-sweegy-woods", 1, 1).height, 18);
assert.equal(tile("map-sweegy-woods", 1, 1).blocked, true);
assert.equal(tile("map-mandalia-plains", 0, 1).height, 4);
assert.equal(tile("map-dorter-trade-city", 7, 2).slope, "<");
assert.equal(tile("map-sand-rat-cellar", 5, 8).lowerHeight, 0);
assert.equal(tile("map-sand-rat-cellar", 5, 8).upperHeight, 9);
assert.equal(
	sourceMaps.find((map) => map.id === "map-deep-dungeon-end").complete,
	false,
);

// Deliberately staged checkpoint fixtures test event prerequisites/rewards;
// they do not represent a played campaign or prove encounter balance.
assert.equal(game.visitWorldEvent("goug-machine"), false);
game.state.chapter = 4;
game.state.completed.push("battle-2-4m-adramelk");
game.recruit({ id: "mustadio", name: "Mustadio", job: "engineer" });
assert(game.visitWorldEvent("goug-machine"));
assert.equal(game.visitWorldEvent("lesalia-beowulf"), false);
assert(game.visitWorldEvent("goland-rumor"));
assert(game.visitWorldEvent("lesalia-beowulf"));
assert(game.encounterUnlocked(encounters.get("optional-colliery-1")));
assert.equal(game.visitWorldEvent("goug-worker8"), false);
game.state.completed.push("optional-colliery-passage");
game.recruit({ id: "beowulf", name: "Beowulf", job: "temple-knight" });
game.recruit({ id: "reis", name: "Reis", job: "holy-dragon" });
assert(game.visitWorldEvent("goug-worker8"));
assert(game.state.party.some((unit) => unit.id === "worker-8"));
assert(game.visitWorldEvent("goug-device"));
assert(game.visitWorldEvent("zeltennia-cursed"));
game.state.completed.push("optional-nelveska");
assert(game.visitWorldEvent("nelveska-reis"));
assert.equal(
	game.state.party.find((unit) => unit.id === "reis").job,
	"dragoner",
);
assert(game.visitWorldEvent("goug-cloud"));
assert(!game.encounterUnlocked(encounters.get("optional-zarghidas")));
const gil = game.state.gil;
assert(game.visitWorldEvent("zarghidas-flower"));
assert.equal(game.state.gil, gil - 1);
assert(game.encounterUnlocked(encounters.get("optional-zarghidas")));
assert(!game.visitWorldEvent("warjilis-deep"));
game.state.completed.push("battle-2-4p");
assert(game.visitWorldEvent("warjilis-deep"));
assert(game.encounterUnlocked(encounters.get("deep-nogias")));
assert(!game.visitWorldEvent("bervenia-materia"));
game.state.completed.push("optional-zarghidas");
game.recruit({ id: "cloud", name: "Cloud", job: "soldier" });
game.state.party[0].abilitySlots.movement = "ability-movement-move-find-item";
assert(game.visitWorldEvent("bervenia-materia"));
assert.equal(game.state.inventory["item-20"], 1);
assert(allJobs.get("elidibs").abilities.includes("ability-04b"));

const equipmentGame = new Game({ storage: null });
equipmentGame.newGame();
equipmentGame.state.campaignIndex = campaign.findIndex(
	(encounter) => encounter.id === "battle-2-4k",
);
equipmentGame.state.chapter = 4;
assert(equipmentGame.startBattle("battle-2-4k"));
const elmdor = equipmentGame.state.battle.units.find(
	(unit) => unit.name === "Elmdor",
);
const thief = equipmentGame.state.battle.units.find(
	(unit) => unit.id === "ramza",
);
assert.equal(elmdor.equipment.weapon, "item-2e");
assert.equal(elmdor.equipment.body, "item-b7");
equipmentGame.steal(thief, elmdor, "steal shield");
equipmentGame.steal(thief, elmdor, "steal accessry");
assert.equal(
	equipmentGame.state.inventory["item-8c"],
	1,
	"Genji Shield is an actual steal target",
);
assert.equal(
	equipmentGame.state.inventory["item-d8"],
	1,
	"Original Accessry spelling resolves accessory slot",
);
equipmentGame.returnToWorld();
equipmentGame.state.campaignIndex = campaign.findIndex(
	(encounter) => encounter.id === "battle-2-4b",
);
assert(equipmentGame.startBattle("battle-2-4b"));
const meliadoul = equipmentGame.state.battle.units.find(
	(unit) => unit.name === "Meliadoul",
);
assert(
	meliadoul.statuses.regen && meliadoul.statuses.reraise,
	"Chantage applies its source automatic statuses",
);
equipmentGame.returnToWorld();
equipmentGame.state.completed.push("optional-colliery-passage");
equipmentGame.state.worldEvents.push("zeltennia-cursed");
assert(equipmentGame.startBattle("optional-nelveska"));
const worker = equipmentGame.state.battle.units.find(
	(unit) => unit.name === "Worker 7 New",
);
worker.hp = 0;
equipmentGame.onDeath(worker);
assert.equal(worker.hp, 1, "Worker 7 activates its reserve circuit once");
assert.equal(worker.reviveOnce, 0);
console.log(
	JSON.stringify(
		{
			result: "PASS",
			sourceRecords: guideRecords.length,
			nativeMaps: mapChecks,
			exactVisibleTileComparisons: tileChecks,
			itemsWithRoutes: equipment.length,
			poachSpeciesInEncounters: poaches.length,
			worldEventTransitions: worldEvents.length,
			scope:
				"Source data, map integration and isolated quest gates; campaign combat and rendered UI need separate checks.",
		},
		null,
		2,
	),
);
