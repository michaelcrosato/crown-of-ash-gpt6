import assert from "node:assert/strict";
import test from "node:test";
import { ABILITIES, Game, ITEMS, SAVE_KEY } from "../src/engine.js";

function memoryStorage() {
	const data = new Map();
	return {
		getItem: (key) => data.get(key),
		setItem: (key, value) => data.set(key, value),
	};
}

function battle() {
	const game = new Game({ storage: memoryStorage() });
	game.newGame();
	game.startBattle();
	for (const tile of game.state.battle.map) {
		tile.height = 0;
		tile.blocked = false;
		tile.kind = "stone";
		delete tile.treasure;
	}
	return game;
}

test("saving from an unloaded title cannot overwrite an existing campaign", () => {
	const storage = memoryStorage();
	const original = new Game({ storage });
	original.newGame();
	const saved = storage.getItem(SAVE_KEY);
	const title = new Game({ storage });
	assert.equal(title.save(), false);
	assert.equal(storage.getItem(SAVE_KEY), saved);
	assert.equal(title.continueGame(), true);
	assert.equal(new Game({ storage: null }).save(), false);
});

test("failed save loads leave the current campaign intact", () => {
	const game = battle();
	const before = game.serialize();
	const damaged = JSON.parse(before);
	damaged.party = [null];
	assert.equal(game.load(damaged), false);
	assert.equal(game.serialize(), before);
	assert.equal(game.load({ ...JSON.parse(before), inventory: null }), false);
	assert.equal(game.serialize(), before);
});

test("company management after a result reads current roster abilities", () => {
	const game = battle();
	game.finishBattle(true);
	const unit = game.state.party[0];
	const ability = ABILITIES.find(
		(a) => a.name === "Move +1" && a.job === "squire",
	);
	unit.jp.squire = 1000;
	assert.equal(game.learn(unit.id, ability.id), true);
	assert.equal(game.getUnit(unit.id), unit);
	assert.ok(
		game
			.getPassiveChoices(unit.id, "movement")
			.some((a) => a.id === ability.id),
	);
	assert.equal(game.equipAbility(unit.id, null, "movement"), true);
	assert.equal(game.equipAbility(unit.id, ability.id, "movement"), true);
});

test("equipment movement bonuses stack with equipped movement abilities", () => {
	const game = new Game({ storage: null });
	game.newGame();
	const unit = game.state.party[0];
	const boots = ITEMS.find((i) => i.name === "Battle Boots");
	const move = ABILITIES.find((a) => a.name === "Move +1");
	const base = unit.move;
	unit.equipment[boots.slot] = boots.id;
	unit.learned.push(move.id);
	unit.abilitySlots.movement = move.id;
	game.recalculate(unit);
	assert.equal(unit.move, base + 2);
});

test("movement cannot end on a fallen unit awaiting revival", () => {
	const game = battle();
	const unit = game.activeUnit;
	const destination = game.getReachable().find((tile) => tile.cost === 1);
	const fallen = game.state.battle.units.find((other) => other.id !== unit.id);
	Object.assign(fallen, { x: destination.x, z: destination.z, hp: 0 });
	assert.equal(game.moveUnit(unit, destination.x, destination.z), false);
	fallen.removed = true;
	assert.equal(game.moveUnit(unit, destination.x, destination.z), true);
});

test("target previews reject empty targets and unavailable actions", () => {
	const game = battle();
	const unit = game.activeUnit;
	const empty = game.getReachable().find((tile) => tile.cost === 1);
	assert.equal(game.getPreview(empty.x, empty.z, "attack").valid, false);
	unit.acted = true;
	assert.equal(game.getPreview(unit.x, unit.z, "attack").valid, false);
	assert.equal(
		game.getPreview(unit.x, unit.z, "attack").reason,
		"Already acted",
	);
});

test("death cancels charged actions even if the caster revives before resolution", () => {
	const game = battle();
	const caster = game.state.battle.units.find((unit) => unit.id === "laura");
	const fire = game
		.getActions(caster)
		.find((a) => a.ct > 0 && a.kind === "magic");
	assert.ok(fire);
	assert.equal(game.performAction(caster, fire.id, caster), true);
	assert.ok(game.state.battle.casts.some((cast) => cast.unitId === caster.id));
	caster.hp = 0;
	game.onDeath(caster);
	caster.hp = caster.maxHp;
	assert.equal(
		game.state.battle.casts.some((cast) => cast.unitId === caster.id),
		false,
	);
});
