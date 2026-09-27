import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import test from "node:test";
import { quests, recruitments, sourceMaps } from "../src/content.js";
import {
	ABILITIES,
	ALTERNATE_BATTLES,
	abilityData,
	CAMPAIGN,
	Game,
	ITEMS,
	OPTIONAL_BATTLES,
} from "../src/engine.js";

function newGame(options = {}) {
	const game = new Game({ seed: 7351, storage: null });
	game.newGame(options);
	return game;
}

function battlefield() {
	const game = newGame();
	game.startBattle();
	const battle = game.state.battle;
	for (const tile of battle.map) {
		tile.height = 0;
		tile.blocked = false;
		tile.kind = "stone";
		delete tile.treasure;
	}
	const ramza = battle.units.find((unit) => unit.id === "ramza");
	const enemy = battle.units.find((unit) => unit.team === "enemy");
	ramza.x = 4;
	ramza.z = 5;
	ramza.ct = 100;
	enemy.x = 4;
	enemy.z = 4;
	enemy.facing = "north";
	enemy.evasion = 0;
	for (const [index, unit] of battle.units
		.filter((unit) => unit.id !== ramza.id && unit.id !== enemy.id)
		.entries()) {
		unit.x = index;
		unit.z = 0;
		unit.ct = 0;
	}
	battle.activeId = ramza.id;
	battle.phase = "player";
	battle.action = "move";
	return { game, battle, ramza, enemy };
}

function playEncounter(game, id, limit = 1800) {
	assert.equal(game.startBattle(id), true, `Encounter ${id} must be unlocked`);
	let turns = 0;
	while (game.state.screen === "battle" && turns < limit) {
		game.autoTurn();
		turns++;
	}
	assert.notEqual(
		game.state.screen,
		"battle",
		`${id} did not terminate in ${limit} turns: ${game.state.battle.log.slice(-8).join("\n")}`,
	);
	return { victory: game.state.result.victory, turns };
}

function preparedVictory(game, encounter, maxAttempts = 5) {
	let turns = 0;
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		prepareCompany(game);
		const result = playEncounter(game, encounter.id);
		turns += result.turns;
		if (result.victory) return { victory: true, turns, attempts: attempt + 1 };
		if (process.env.TRACE_CAMPAIGN && encounter.deploymentLimit === 1)
			console.log(
				"Duel inspection",
				game.state.gil,
				game.state.battle.units.map((unit) => ({
					name: unit.name,
					hp: unit.hp,
					maxHp: unit.maxHp,
					pa: unit.pa,
					speed: unit.speed,
					statuses: unit.statuses,
					immunities: unit.immunities,
					equipment: unit.equipment,
				})),
				game.state.battle.log.slice(-14),
			);
		game.advanceCampaign();
		const previous =
			CAMPAIGN[Math.min(3, Math.max(0, game.state.campaignIndex - 1))];
		prepareCompany(game);
		const training = playEncounter(game, previous.id);
		turns += training.turns;
		game.advanceCampaign();
	}
	return { victory: false, turns };
}

function prepareCompany(game) {
	for (let pass = 0; pass < 12; pass++) {
		const visit = game
			.getAvailableWorldEvents()
			.find((event) => event.unlocked);
		if (!visit) break;
		game.visitWorldEvent(visit.id);
	}
	const priority = [
		"ramza",
		"orlandu",
		"agrias",
		"mustadio",
		"annette",
		"laura",
		"zach",
		"delita",
	];
	const delita = game.state.party.find((unit) => unit.id === "delita");
	if (delita?.job === "squire" && game.jobUnlocked(delita, "archer"))
		game.setJob(delita.id, "archer");
	game.setDeployment(
		priority.filter((id) => game.state.party.some((unit) => unit.id === id)),
	);
	const duelSoon = ["battle-2-3i", "battle-2-3j"].includes(
		game.getNextEncounter()?.id,
	);
	if (duelSoon) {
		const jade = ITEMS.find((item) => item.name === "Jade Armlet");
		const ramza = game.state.party.find((unit) => unit.id === "ramza");
		for (const [id, count] of Object.entries(game.state.inventory))
			if (
				count > 0 &&
				ITEMS.find((item) => item.id === id)?.slot !== "item" &&
				id !== jade.id
			)
				game.sell(id, count);
		if (ramza.equipment.accessory !== jade.id && game.buy(jade.id))
			game.equip(ramza.id, jade.id);
	}
	for (const name of ["Potion", "Phoenix Down"]) {
		const item = ITEMS.find((entry) => entry.name === name);
		const needed = Math.max(
			0,
			(name === "Potion" ? 18 : 8) - (game.state.inventory[item.id] || 0),
		);
		if (needed && game.state.gil >= item.price)
			game.buy(
				item.id,
				Math.min(needed, Math.floor(game.state.gil / item.price)),
			);
	}
	const value = (item, unit) =>
		(item?.pa || 0) * 10 +
		(item?.ma || 0) * (/priest|wizard/.test(unit.job) ? 20 : 4) +
		(item?.hp || 0) +
		(item?.mp || 0) / 2;
	for (const unit of game.getDeployment()) {
		for (const name of [
			"Move +1",
			"Counter Tackle",
			"Weapon Guard",
			"Counter Magic",
			"Auto Potion",
			"Gained JP-UP",
			"Yell",
			"Ether",
			"Hi-Potion",
		]) {
			const ability = ABILITIES.find((entry) => entry.name === name);
			if (ability) game.learn(unit.id, ability.id);
		}
		const reaction = game
			.getPassiveChoices(unit.id, "reaction")
			.sort(
				(a, b) =>
					[
						"Auto Potion",
						"Counter Magic",
						"Weapon Guard",
						"Counter Tackle",
					].indexOf(a.name) -
					[
						"Auto Potion",
						"Counter Magic",
						"Weapon Guard",
						"Counter Tackle",
					].indexOf(b.name),
			)[0];
		if (reaction) game.equipAbility(unit.id, reaction.id, "reaction");
		const skills = ABILITIES.filter(
			(ability) =>
				ability.job === unit.job &&
				["magic", "heal", "physical"].includes(ability.kind) &&
				ability.mp <= unit.maxMp,
		)
			.sort((a, b) => b.power - a.power)
			.slice(0, 3);
		for (const ability of skills) game.learn(unit.id, ability.id);
		for (const slot of ["weapon", "body", "head"]) {
			const old = ITEMS.find((item) => item.id === unit.equipment[slot]);
			const upgrade = game
				.getShopItems()
				.filter(
					(item) =>
						item.slot === slot &&
						game.canEquipItem(unit, item) &&
						item.price < game.state.gil * 0.65 &&
						value(item, unit) > value(old, unit),
				)
				.sort((a, b) => value(b, unit) - value(a, unit))[0];
			if (upgrade && game.buy(upgrade.id)) game.equip(unit.id, upgrade.id);
		}
	}
}

test("new game starts with source party roles, finite supplies and an available prologue", () => {
	const game = newGame();
	assert.equal(game.state.party.length, 6);
	assert.equal(game.getNextEncounter().id, "campaign-prologue");
	assert.equal(game.state.party[0].name, "Ramza");
	assert.ok(
		game.state.party.every(
			(unit) => unit.hp > 0 && unit.brave > 0 && unit.faith > 0,
		),
	);
	assert.ok(game.getShopItems().some((item) => item.name === "Potion"));
	assert.ok(!game.getShopItems().some((item) => item.name === "Elixir"));
	assert.equal(game.startBattle(CAMPAIGN.at(-1).id), false);
});

test("seeded simulations reproduce decisions, hits and rewards exactly", () => {
	const games = [
		newGame({ difficulty: "story" }),
		newGame({ difficulty: "story" }),
	];
	for (const game of games) {
		game.startBattle();
		for (let i = 0; i < 35; i++) game.autoTurn();
	}
	assert.equal(games[0].serialize(), games[1].serialize());
	assert.deepEqual(games[0].state.battle, games[1].state.battle);
});

test("movement obeys height, occupancy and one move per turn", () => {
	const { game, ramza, enemy } = battlefield();
	game.getTile(5, 5).height = ramza.jump + 3;
	assert.ok(!game.getReachable().some((tile) => tile.x === 5 && tile.z === 5));
	assert.ok(
		!game
			.getReachable()
			.some((tile) => tile.x === enemy.x && tile.z === enemy.z),
	);
	assert.equal(game.moveUnit(ramza, 3, 5), true);
	assert.equal(game.moveUnit(ramza, 2, 5), false);
	assert.ok(ramza.moved);
});

test("one action and one move are legal in either order, facing affects attacks", () => {
	const { game, ramza, enemy } = battlefield();
	const rear = game.predictEffect(ramza, abilityData("attack"), enemy);
	enemy.facing = "south";
	enemy.evasion = 30;
	const front = game.predictEffect(ramza, abilityData("attack"), enemy);
	assert.ok(rear.damage > front.damage);
	assert.ok(rear.hit > front.hit);
	assert.equal(game.performAction(ramza, "attack", enemy), true);
	assert.equal(game.performAction(ramza, "attack", enemy), false);
	assert.equal(game.moveUnit(ramza, 3, 5), true);
	assert.equal(game.state.battle.needsFacing, false); // refresh occurs at the public input boundary
	game.refreshTacticalState();
	assert.equal(game.state.battle.needsFacing, true);
});

test("CT speed accrues initiative and choosing to wait preserves initiative", () => {
	const { game, battle, ramza } = battlefield();
	const enemy = battle.units.find((unit) => unit.team === "enemy");
	battle.units = [ramza, enemy];
	ramza.ct = 100;
	ramza.speed = 16;
	enemy.ct = 0;
	enemy.speed = 5;
	assert.equal(game.wait("east"), true);
	assert.equal(ramza.facing, "east");
	assert.equal(game.activeUnit.id, ramza.id);
	assert.ok(battle.ticks > 0);
	assert.ok(enemy.ct > 0 && enemy.ct < 100);
});

test("magic previews reveal friendly fire and casts consume MP before delayed resolution", () => {
	const { game, battle, ramza, enemy } = battlefield();
	ramza.learned.push("fire");
	ramza.mp = 40;
	ramza.maxMp = 40;
	ramza.ma = 12;
	ramza.secondaryJob = "wizard";
	const friend = battle.units.find((unit) => unit.id === "delita");
	friend.x = 3;
	friend.z = 4;
	const preview = game.getPreview(enemy.x, enemy.z, "fire");
	assert.equal(preview.valid, true);
	assert.equal(preview.friendlyFire, true);
	assert.ok(preview.targets.some((target) => target.targetId === friend.id));
	const oldHP = enemy.hp;
	assert.equal(game.performAction(ramza, "fire", enemy), true);
	assert.equal(ramza.mp, 32);
	assert.equal(enemy.hp, oldHP);
	assert.equal(battle.casts.length, 1);
	for (const unit of battle.units) unit.ct = 0;
	battle.activeId = null;
	game._advanceClockToTurn();
	assert.equal(battle.casts.length, 0);
	assert.ok(enemy.hp < oldHP);
});

test("inventory constrains healing and Phoenix Down revives before crystalization", () => {
	const { game, battle, ramza } = battlefield();
	const potion = ITEMS.find((item) => item.name === "Potion");
	const phoenix = ITEMS.find((item) => item.name === "Phoenix Down");
	game.state.inventory[potion.id] = 1;
	ramza.hp = 1;
	assert.equal(game.performAction(ramza, "potion", ramza), true);
	assert.ok(ramza.hp > 1);
	assert.equal(game.state.inventory[potion.id], 0);
	ramza.acted = false;
	assert.equal(game.performAction(ramza, "potion", ramza), false);
	const friend = battle.units.find((unit) => unit.id === "delita");
	friend.x = 3;
	friend.z = 5;
	friend.hp = 0;
	friend.deadTicks = 2;
	game.state.inventory[phoenix.id] = 1;
	assert.equal(game.performAction(ramza, "phoenix-down", friend), true);
	assert.ok(friend.hp > 0);
	assert.equal(friend.deadTicks, 0);
	assert.equal(game.state.inventory[phoenix.id], 0);
});

test("enemy heal resources are finite and cannot produce an endless potion duel", () => {
	const { game, enemy } = battlefield();
	enemy.hp = 1;
	for (let i = 0; i < 2; i++) {
		enemy.acted = false;
		assert.equal(
			game.performAction(enemy, "potion", enemy, { ai: true }),
			true,
		);
	}
	enemy.acted = false;
	assert.equal(game.performAction(enemy, "potion", enemy, { ai: true }), false);
});

test("poison, protection, cleansing, stat skills and MP restoration change real combat state", () => {
	const { game, ramza, enemy } = battlefield();
	const plain = game.predictEffect(ramza, abilityData("attack"), enemy).damage;
	enemy.statuses.protect = 3;
	assert.ok(
		game.predictEffect(ramza, abilityData("attack"), enemy).damage < plain,
	);
	const hp = ramza.hp;
	ramza.statuses.poison = 3;
	game.tickStatuses(ramza);
	assert.ok(ramza.hp < hp);
	const esuna = ABILITIES.find((ability) => ability.name === "Esuna");
	game.resolveAbility(ramza, { ...abilityData(esuna.id), hit: 100 }, ramza);
	assert.equal(ramza.statuses.poison, undefined);
	const yell = ABILITIES.find((ability) => ability.name === "Yell");
	const oldSpeed = ramza.speed;
	game.resolveAbility(ramza, { ...abilityData(yell.id), hit: 100 }, ramza);
	assert.ok(ramza.speed > oldSpeed);
	const ether = ABILITIES.find((ability) => ability.name === "Ether");
	ramza.mp = 0;
	game.resolveAbility(ramza, { ...abilityData(ether.id), hit: 100 }, ramza);
	assert.ok(ramza.mp > 0);
});

test("job gates, ability learning and equipment purchases spend the correct resources", () => {
	const game = newGame();
	const ramza = game.state.party[0];
	assert.equal(game.jobUnlocked(ramza, "knight"), true);
	assert.equal(game.jobUnlocked(ramza, "mime"), false);
	assert.equal(game.setJob(ramza.id, "knight"), true);
	const skill = ABILITIES.find(
		(ability) =>
			ability.job === "knight" &&
			!ramza.learned.includes(ability.id) &&
			ability.jp > 0 &&
			ability.jp <= 300,
	);
	ramza.jp.knight = 300;
	const oldJP = ramza.jp.knight;
	assert.equal(game.learn(ramza.id, skill.id), true);
	assert.equal(ramza.jp.knight, oldJP - skill.jp);
	assert.equal(game.learn(ramza.id, skill.id), false);
	const sword = game.getShopItems().find((item) => item.name === "Long Sword");
	const oldGil = game.state.gil;
	assert.equal(game.buy(sword.id), true);
	assert.equal(game.state.gil, oldGil - sword.price);
	assert.equal(game.equip(ramza.id, sword.id), true);
	assert.equal(ramza.equipment.weapon, sword.id);
	assert.equal(game.state.inventory[sword.id], 0);
});

test("local saves suspend the exact battle and preserve a separate camp recovery checkpoint", () => {
	const memory = new Map();
	const storage = {
		setItem: (key, value) => memory.set(key, value),
		getItem: (key) => memory.get(key),
	};
	const game = new Game({ storage });
	game.newGame();
	assert.equal(game.hasSave(), true);
	game.startBattle();
	for (let i = 0; i < 12; i++) game.autoTurn();
	game.save();
	const battle = structuredClone(game.state.battle);
	const restored = new Game({ storage });
	assert.equal(restored.continueGame(), true);
	assert.equal(restored.state.screen, "battle");
	assert.equal(restored.state.battle.id, battle.id);
	assert.equal(restored.state.battle.activeId, battle.activeId);
	assert.equal(restored.state.battle.phase, battle.phase);
	assert.equal(restored.state.battle.ticks, battle.ticks);
	assert.deepEqual(restored.state.battle.units, battle.units);
	assert.deepEqual(restored.state.battle.casts, battle.casts);
	assert.equal(restored.state.totalActions, game.state.totalActions);
	game.autoTurn();
	restored.autoTurn();
	assert.deepEqual(
		restored.state.battle.units,
		game.state.battle.units,
		"Suspended battles continue deterministically",
	);
	assert.equal(restored.restoreCheckpoint(), true);
	assert.equal(restored.state.screen, "world");
	assert.equal(restored.state.totalActions, 0);
	restored.state.gil = 17;
	restored.saveCheckpoint();
	restored.newGame();
	assert.equal(restored.hasCheckpoint(), true);
	assert.equal(restored.restoreCheckpoint(), true);
	assert.equal(
		restored.state.gil,
		1200,
		"A new chronicle replaces the previous recovery checkpoint",
	);
	assert.equal(restored.state.party.length, game.state.party.length);
	assert.equal(restored.load("{broken"), false);
	assert.equal(
		restored.load({ version: 1, party: [], completed: [], campaignIndex: 999 }),
		false,
	);
});

test("rescue loss, boss defeat and sluice objectives use their actual encounter rules", () => {
	const game = newGame();
	const rescue = CAMPAIGN.find((battle) => battle.objectiveType === "rescue");
	game.state.campaignIndex = CAMPAIGN.indexOf(rescue);
	game.startBattle();
	game.state.battle.units.find((unit) => unit.guest && unit.rescueTarget).hp =
		0;
	assert.equal(game.checkOutcome(), true);
	assert.equal(game.state.result.victory, false);
	const boss = CAMPAIGN.find((battle) => battle.objectiveType === "boss");
	game.state.campaignIndex = CAMPAIGN.indexOf(boss);
	game.startBattle();
	for (const unit of game.state.battle.units.filter((unit) => unit.boss))
		unit.hp = 0;
	assert.equal(game.checkOutcome(), true);
	assert.equal(game.state.result.victory, true);
	const sluice = CAMPAIGN.find((battle) => battle.objectiveType === "switches");
	game.state.campaignIndex = CAMPAIGN.indexOf(sluice);
	game.startBattle();
	for (const unit of game.state.battle.units.filter(
		(unit) => unit.team === "enemy",
	))
		unit.hp = 0;
	assert.equal(
		game.checkOutcome(),
		false,
		"Defeating enemies alone does not operate the gates",
	);
	for (let i = 0; i < 120 && game.state.screen === "battle"; i++)
		game.autoTurn();
	assert.equal(game.state.result.victory, true);
	assert.equal(game.state.battle.switches, 2);
});

test("complete campaign and all optional encounters reach the ending by legal tactical play", {
	timeout: 60000,
}, () => {
	const game = newGame({ difficulty: process.env.SIM_DIFFICULTY || "story" });
	let totalTurns = 0;
	let bethlaCheckpoint;
	const dispatch = quests.find(
		(quest) => quest.type === "dispatch" && quest.chapter === 1,
	);
	if (dispatch) game.startQuest(dispatch.id);
	for (const encounter of CAMPAIGN) {
		if (encounter.id === "battle-2-4f") bethlaCheckpoint = game.serialize();
		const result = preparedVictory(game, encounter);
		if (process.env.TRACE_CAMPAIGN)
			console.log(
				encounter.id,
				result.turns,
				result.victory,
				game.state.party.slice(0, 5).map((unit) => unit.level),
			);
		assert.equal(
			result.victory,
			true,
			`${encounter.id} should be winnable with legal preparation: ${game.state.battle?.log.slice(-8).join("\n")}`,
		);
		totalTurns += result.turns;
		game.advanceCampaign();
	}
	assert.equal(game.state.campaignIndex, 57);
	assert.equal(
		game.state.completed.filter((id) =>
			CAMPAIGN.some((encounter) => encounter.id === id),
		).length,
		CAMPAIGN.length,
	);
	assert.equal(game.state.screen, "ending");
	if (process.env.EXPORT_COMPLETED_SAVE) {
		mkdirSync("artifacts", { recursive: true });
		writeFileSync("artifacts/completed-save.json", game.serialize());
	}
	assert.ok(
		totalTurns > 1000,
		"The full campaign was played, rather than directly advancing progress",
	);
	assert.ok(game.state.party.find((unit) => unit.id === "orlandu"));
	assert.ok(game.state.party.find((unit) => unit.id === "meliadoul"));
	game.advanceCampaign();
	assert.equal(
		game.exploreArea("bervenia-volcano"),
		false,
		"Cloud and the summit search ability gate the blade",
	);
	for (const encounter of OPTIONAL_BATTLES) {
		const result = preparedVictory(game, encounter);
		if (process.env.TRACE_CAMPAIGN)
			console.log(encounter.id, result.turns, result.victory);
		assert.equal(
			result.victory,
			true,
			`${encounter.id} should be winnable: ${game.state.battle.log.slice(-8).join("\n")}`,
		);
		if (encounter.objectiveType === "explore")
			assert.equal(game.state.battle.exitDiscovered, true);
		if (encounter.id === "rare-eleven-monks")
			assert.equal(
				game.state.battle.units.filter((unit) => unit.team === "enemy").length,
				11,
			);
		game.advanceCampaign();
	}
	const moveFind = ABILITIES.find(
		(ability) => ability.name === "Move-Find Item",
	);
	const chemist = game.state.party.find((unit) => unit.id === "rad");
	assert.equal(game.learn(chemist.id, moveFind.id), true);
	assert.equal(game.equipAbility(chemist.id, moveFind.id, "movement"), true);
	for (let pass = 0; pass < 12; pass++) {
		const event = game
			.getAvailableWorldEvents()
			.find((entry) => entry.unlocked);
		if (!event) break;
		game.visitWorldEvent(event.id);
	}
	assert.ok(
		game.state.inventory[
			ITEMS.find((item) => item.name === "Materia Blade").id
		],
	);
	for (const recruit of recruitments)
		assert.ok(
			game.state.party.some((unit) => unit.id === recruit.id),
			`${recruit.name} is recruited by their source route`,
		);
	if (dispatch) {
		assert.equal(game.state.quests[dispatch.id].status, "ready");
		assert.equal(game.claimQuest(dispatch.id), true);
	}
	assert.equal(
		game.state.completed.length,
		CAMPAIGN.length + OPTIONAL_BATTLES.length,
	);
	const northRoute = ALTERNATE_BATTLES.find(
		(encounter) => encounter.parentId === "battle-2-4f",
	);
	const northern = new Game({ storage: null });
	assert.equal(northern.load(bethlaCheckpoint), true);
	const north = preparedVictory(northern, northRoute);
	assert.equal(
		north.victory,
		true,
		"The northern Bethla approach is a playable alternative",
	);
	assert.ok(northern.state.completed.includes("battle-2-4f"));
	northern.advanceCampaign();
	const sluice = northern.getNextEncounter();
	assert.equal(sluice.objectiveType, "switches");
	assert.equal(preparedVictory(northern, sluice).victory, true);
	assert.equal(northern.state.battle.switches, 2);
	const reload = new Game({ storage: null });
	assert.equal(reload.load(game.serialize()), true);
	assert.equal(reload.state.completed.length, game.state.completed.length);
});

test("equipped passive slots create exclusive choices and command secondaries gate learned magic", () => {
	const game = newGame();
	const unit = game.state.party[0];
	const move = ABILITIES.find((ability) => ability.name === "Move +1");
	const jump = ABILITIES.find((ability) => ability.name === "Jump +1");
	unit.learned.push(move.id, jump.id, "fire");
	const baseMove = unit.move;
	const baseJump = unit.jump;
	assert.equal(game.equipAbility(unit.id, move.id, "movement"), true);
	assert.equal(unit.move, baseMove + 1);
	assert.equal(unit.jump, baseJump);
	assert.equal(game.equipAbility(unit.id, jump.id, "movement"), true);
	assert.equal(unit.move, baseMove);
	assert.equal(unit.jump, baseJump + 1);
	assert.ok(!game.getActions(unit).some((ability) => ability.id === "fire"));
	assert.equal(game.setSecondaryJob(unit.id, "wizard"), true);
	assert.ok(game.getActions(unit).some((ability) => ability.id === "fire"));
	assert.ok(!game.getActions(unit).some((ability) => ability.id === "potion"));
});

test("Half of MP and Short Charge change resource and resolution costs without stacking", () => {
	const { game, ramza, enemy, battle } = battlefield();
	const half = ABILITIES.find((ability) => ability.name === "Half of MP");
	const short = ABILITIES.find((ability) => ability.name === "Short Charge");
	ramza.learned.push("fire", half.id, short.id);
	ramza.secondaryJob = "wizard";
	ramza.mp = 40;
	ramza.abilitySlots.support = half.id;
	assert.equal(game.getPreview(enemy.x, enemy.z, "fire").cost, 4);
	assert.equal(game.performAction(ramza, "fire", enemy), true);
	assert.equal(ramza.mp, 36);
	assert.equal(battle.casts[0].remaining, 3);
	battle.casts = [];
	ramza.acted = false;
	ramza.casting = null;
	ramza.abilitySlots.support = short.id;
	assert.equal(game.performAction(ramza, "fire", enemy), true);
	assert.equal(ramza.mp, 28, "Replacing Half of MP restores full MP cost");
	assert.equal(battle.casts[0].remaining, 2);
});

test("Brave reactions consume actual stock and counter only when equipped", () => {
	const { game, ramza, enemy } = battlefield();
	const potion = ITEMS.find((item) => item.name === "Potion");
	const auto = ABILITIES.find((ability) => ability.name === "Auto Potion");
	const counter = ABILITIES.find((ability) => ability.name === "Counter");
	ramza.abilitySlots.reaction = auto.id;
	ramza.brave = 100;
	ramza.hp = 20;
	game.state.inventory[potion.id] = 1;
	assert.equal(
		game.triggerReaction(ramza, enemy, abilityData("attack"), 20),
		true,
	);
	assert.equal(game.state.inventory[potion.id], 0);
	assert.equal(ramza.hp, 50);
	ramza.brave = 0;
	ramza.abilitySlots.reaction = counter.id;
	const original = enemy.hp;
	assert.equal(
		game.triggerReaction(ramza, enemy, abilityData("attack"), 10),
		false,
	);
	assert.equal(enemy.hp, original);
	ramza.brave = 100;
	assert.equal(
		game.triggerReaction(ramza, enemy, abilityData("attack"), 10),
		true,
	);
	assert.ok(enemy.hp < original);
	ramza.abilitySlots.reaction = null;
	assert.equal(
		game.triggerReaction(ramza, enemy, abilityData("attack"), 10),
		false,
	);
});

test("horizontal gaps, flight, movement recovery and trap-aware treasure hunting affect navigation", () => {
	const { game, battle, ramza } = battlefield();
	ramza.x = 1;
	ramza.z = 5;
	ramza.jump = 3;
	ramza.move = 4;
	battle.map = battle.map.filter((tile) => tile.x !== 2);
	battle.tiles = battle.map;
	assert.ok(
		game.getReachable().some((tile) => tile.x === 3 && tile.z === 5),
		"Jump 3 can cross a one-panel gap",
	);
	ramza.jump = 1;
	assert.ok(!game.getReachable().some((tile) => tile.x === 3 && tile.z === 5));
	ramza.abilitySlots.movement = ABILITIES.find(
		(ability) => ability.name === "Fly",
	).id;
	assert.ok(game.getReachable().some((tile) => tile.x === 4 && tile.z === 5));
	ramza.abilitySlots.movement = ABILITIES.find(
		(ability) => ability.name === "Move-HP Up",
	).id;
	ramza.hp = 10;
	game.moveUnit(ramza, 1, 6);
	assert.ok(ramza.hp > 10);
	ramza.moved = false;
	ramza.abilitySlots.movement = ABILITIES.find(
		(ability) => ability.name === "Move-Find Item",
	).id;
	const tile = game.getTile(1, 7);
	const item = ITEMS.find((item) => item.name === "Elixir");
	tile.treasure = {
		rare: item.name,
		rareId: item.id,
		common: "Potion",
		commonId: ITEMS.find((item) => item.name === "Potion").id,
	};
	tile.trap = "Steel needle";
	ramza.brave = 0;
	const hp = ramza.hp;
	game.moveUnit(ramza, 1, 7);
	assert.equal(game.state.inventory[item.id], 1);
	assert.equal(
		ramza.hp,
		hp,
		"The treasure occupies the trap panel until the next visit",
	);
	ramza.moved = false;
	game.moveUnit(ramza, 1, 6);
	ramza.moved = false;
	game.moveUnit(ramza, 1, 7);
	assert.ok(ramza.hp < hp);
});

test("summons distinguish allies from enemies while ordinary magic retains friendly fire", () => {
	const { game, battle, ramza, enemy } = battlefield();
	const friend = battle.units.find((unit) => unit.id === "annette");
	friend.x = 3;
	friend.z = 4;
	const shiva = abilityData(
		ABILITIES.find((ability) => ability.name === "Shiva").id,
	);
	const moogle = abilityData(
		ABILITIES.find((ability) => ability.name === "Moogle").id,
	);
	assert.ok(
		game
			.affectedUnits(shiva, enemy, ramza)
			.every((unit) => unit.team === "enemy"),
	);
	assert.ok(
		game
			.affectedUnits(moogle, enemy, ramza)
			.every((unit) => unit.team === "player"),
	);
	assert.ok(
		game
			.affectedUnits(abilityData("fire"), enemy, ramza)
			.some((unit) => unit.id === friend.id),
	);
});

test("theft transfers equipped items, lowers combat stats, and Maintenance prevents theft and breakage", () => {
	const { game, ramza, enemy } = battlefield();
	const sword = ITEMS.find((item) => item.name === "Iron Sword");
	const shield = ITEMS.find((item) => item.slot === "shield");
	enemy.equipment.weapon = sword.id;
	enemy.equipment.shield = shield.id;
	game.recalculate(enemy);
	const pa = enemy.pa;
	game.steal(ramza, enemy, "steal weapon");
	assert.equal(game.state.inventory[sword.id], 1);
	assert.equal(enemy.equipment.weapon, undefined);
	assert.ok(enemy.pa < pa);
	enemy.abilitySlots.support = ABILITIES.find(
		(ability) => ability.name === "Maintenance",
	).id;
	game.steal(ramza, enemy, "steal shield");
	game.breakEquipment(enemy, "shield break");
	assert.equal(enemy.equipment.shield, shield.id);
	enemy.abilitySlots.support = null;
	game.steal(ramza, enemy, "steal shield");
	assert.equal(game.state.inventory[shield.id], 1);
});

test("Throw spends an inventory weapon and Draw Out requires the named katana", () => {
	const { game, ramza, enemy } = battlefield();
	const throwing = ABILITIES.find(
		(ability) => ability.effect === "throw" && ability.name === "Sword",
	);
	const sword = ITEMS.find((item) => item.name === "Iron Sword");
	ramza.job = "ninja";
	ramza.learned.push(throwing.id);
	assert.equal(
		game.abilityRequirementsMet(ramza, abilityData(throwing.id)),
		false,
	);
	game.state.inventory[sword.id] = 1;
	assert.equal(game.performAction(ramza, throwing.id, enemy), true);
	assert.equal(game.state.inventory[sword.id], 0);
	const skill = abilityData(
		ABILITIES.find(
			(ability) => ability.name === "Asura" && ability.job === "samurai",
		).id,
	);
	const katana = game.drawOutItem(skill);
	assert.ok(katana);
	assert.equal(game.abilityRequirementsMet(ramza, skill), false);
	game.state.inventory[katana.id] = 1;
	assert.equal(game.abilityRequirementsMet(ramza, skill), true);
});

test("songs continue on CT intervals and a new action stops the performance", () => {
	const { game, battle, ramza } = battlefield();
	const song = ABILITIES.find((ability) => ability.name === "Life Song");
	ramza.job = "bard";
	ramza.learned.push(song.id);
	ramza.hp = 20;
	assert.equal(game.performAction(ramza, song.id, ramza), true);
	assert.equal(ramza.performing, song.id);
	assert.equal(ramza.casting, null, "A performing bard still receives turns");
	assert.equal(battle.casts[0].repeat, song.ct);
	for (const unit of battle.units) unit.ct = 0;
	battle.activeId = null;
	game._advanceClockToTurn();
	assert.ok(ramza.hp > 20);
	assert.ok(battle.casts.some((cast) => cast.repeat > 0));
	ramza.acted = false;
	assert.equal(game.performAction(ramza, "potion", ramza), true);
	assert.equal(ramza.performing, null);
	assert.ok(
		!battle.casts.some((cast) => cast.unitId === ramza.id && cast.repeat),
	);
});

test("Invitation recruits a surviving monster and Secret Hunt uses the source poach table", () => {
	const { game, ramza, enemy, battle } = battlefield();
	ramza.job = "mediator";
	enemy.job = "yellow-chocobo";
	enemy.name = "Yellow Chocobo";
	assert.equal(game.invite(ramza, enemy), true);
	assert.equal(enemy.team, "player");
	for (const hostile of battle.units.filter((unit) => unit.team === "enemy"))
		hostile.hp = 0;
	game.checkOutcome();
	assert.ok(
		game.state.party.some((unit) =>
			unit.id.startsWith("invited-yellow-chocobo"),
		),
	);
	const game2 = battlefield().game;
	const monster = game2.state.battle.units.find(
		(unit) => unit.team === "enemy",
	);
	monster.job = "yellow-chocobo";
	const before = Object.values(game2.state.inventory).reduce(
		(sum, count) => sum + count,
		0,
	);
	assert.equal(game2.poach(monster), true);
	assert.equal(monster.removed, true);
	assert.equal(
		Object.values(game2.state.inventory).reduce((sum, count) => sum + count, 0),
		before + 1,
	);
});

test("source maps, the Wiegraf duel and timed world visits preserve encounter-specific requirements", () => {
	const game = newGame();
	const sourceEncounter = CAMPAIGN.find((encounter) => encounter.sourceMapId);
	const map = game.buildMap(sourceEncounter);
	const source = sourceMaps.find(
		(entry) => entry.id === sourceEncounter.sourceMapId,
	);
	assert.equal(map.width, source.width);
	assert.equal(map.height, source.height);
	for (const tile of map.tiles)
		assert.equal(
			tile.height,
			source.tiles.find((entry) => entry.x === tile.x && entry.z === tile.z)
				.height,
		);
	const duel = CAMPAIGN.find((encounter) => encounter.deploymentLimit === 1);
	game.state.campaignIndex = CAMPAIGN.indexOf(duel);
	game.startBattle(duel.id);
	assert.deepEqual(
		game.state.battle.units
			.filter((unit) => unit.team === "player")
			.map((unit) => unit.id),
		["ramza"],
	);
	game.returnToWorld();
	assert.equal(game.visitWorldEvent("goug-cloud"), false);
	game.state.chapter = 4;
	const gil = game.state.gil;
	assert.equal(game.visitWorldEvent("zarghidas-flower"), true);
	assert.equal(game.state.gil, gil - 1);
	assert.equal(game.state.flowerBought, true);
	assert.equal(game.visitWorldEvent("zarghidas-flower"), false);
});

test("dispatches remove chosen recruits from deployment, return them, and reward their own job progress", () => {
	const game = newGame({ difficulty: "story" });
	game.state.chapter = 2;
	const quest = quests.find(
		(entry) => entry.type === "dispatch" && entry.chapter === 2,
	);
	const rad = game.state.party.find((unit) => unit.id === "rad");
	const ramza = game.state.party.find((unit) => unit.id === "ramza");
	const radJP = rad.jp[rad.job];
	const ramzaJP = ramza.jp[ramza.job];
	assert.equal(game.startQuest(quest.id, ["ramza"]), false);
	assert.equal(game.startQuest(quest.id, ["rad"]), true);
	assert.equal(rad.onQuest, quest.id);
	assert.ok(!game.getDeployment().some((unit) => unit.id === "rad"));
	for (let i = 0; i < quest.duration; i++) game.updateQuests(CAMPAIGN[0]);
	assert.equal(rad.onQuest, undefined);
	assert.equal(game.state.quests[quest.id].status, "ready");
	assert.equal(game.claimQuest(quest.id), true);
	assert.ok(rad.jp[rad.job] > radJP);
	assert.equal(ramza.jp[ramza.job], ramzaJP);
});

test("equipment grants permanent haste and immunities, while Zodiac cannot be purchased with JP", () => {
	const game = newGame();
	const unit = game.state.party[0];
	const excalibur = ITEMS.find((item) => item.name === "Excalibur");
	const jade = ITEMS.find((item) => item.name === "Jade Armlet");
	unit.equipment.weapon = excalibur.id;
	unit.equipment.accessory = jade.id;
	game.recalculate(unit);
	game.startBattle();
	const ramza = game.getUnit("ramza");
	assert.equal(ramza.statuses.haste, 99);
	assert.ok(ramza.immunities.includes("stop"));
	game.tickStatuses(ramza);
	assert.equal(ramza.statuses.haste, 99);
	game.returnToWorld();
	const zodiac = ABILITIES.find((ability) => ability.name === "Zodiac");
	assert.equal(game.learn(unit.id, zodiac.id), false);
});

test("Tactical difficulty supports a prepared party through the opening and Dorter", {
	timeout: 30000,
}, () => {
	const game = newGame({ difficulty: "tactical" });
	for (const encounter of CAMPAIGN.slice(0, 5)) {
		const result = preparedVictory(game, encounter);
		assert.equal(result.victory, true, encounter.name);
		game.advanceCampaign();
	}
	assert.equal(game.state.campaignIndex, 5);
	assert.equal(game.state.difficulty, "tactical");
});

test("Zodiac compatibility modifies appropriate effects independently of directional evasion", () => {
	const { game, ramza, enemy } = battlefield();
	ramza.zodiac = "capricorn";
	ramza.sex = "male";
	enemy.zodiac = "taurus";
	enemy.sex = "male";
	const attack = abilityData("attack");
	const good = game.predictEffect(ramza, attack, enemy);
	assert.equal(good.compatibilityLabel, "Good");
	assert.equal(good.compatibilityMultiplier, 1.25);
	enemy.zodiac = "aries";
	const bad = game.predictEffect(ramza, attack, enemy);
	assert.equal(bad.compatibilityLabel, "Bad");
	assert.equal(bad.compatibilityMultiplier, 0.75);
	assert.ok(good.damage > bad.damage);
	assert.equal(good.hit, bad.hit, "Zodiac does not modify directional evasion");
	enemy.zodiac = "cancer";
	assert.deepEqual(game.getCompatibility(ramza, enemy), {
		label: "Worst",
		multiplier: 0.5,
	});
	enemy.sex = "female";
	assert.deepEqual(game.getCompatibility(ramza, enemy), {
		label: "Best",
		multiplier: 1.5,
	});
	const bestCure = game.predictEffect(ramza, abilityData("cure"), enemy).damage;
	const bestPotion = game.predictEffect(
		ramza,
		abilityData("potion"),
		enemy,
	).damage;
	enemy.sex = "monster";
	assert.deepEqual(game.getCompatibility(ramza, enemy), {
		label: "Bad",
		multiplier: 0.75,
	});
	assert.ok(
		game.predictEffect(ramza, abilityData("cure"), enemy).damage < bestCure,
	);
	assert.equal(
		game.predictEffect(ramza, abilityData("potion"), enemy).damage,
		bestPotion,
	);
	enemy.zodiac = "serpentarius";
	assert.deepEqual(game.getCompatibility(ramza, enemy), {
		label: "Neutral",
		multiplier: 1,
	});
	const seal = abilityData(
		ABILITIES.find((ability) => ability.name === "Seal Evil").id,
	);
	ramza.learned.push(seal.id);
	ramza.secondaryJob = "engineer";
	assert.equal(
		game.getPreview(enemy.x, enemy.z, seal.id).hit,
		0,
		"A 0% source restriction stays 0% in the preview",
	);
});

test("the Soldier Office hires a paid level-one recruit with source Brave/Faith ranges", () => {
	const game = newGame();
	const count = game.state.party.length;
	const gil = game.state.gil;
	assert.equal(
		game.hireRecruit({
			name: "Aster",
			sex: "female",
			job: "chemist",
			zodiac: "libra",
		}),
		true,
	);
	const recruit = game.state.party.at(-1);
	assert.equal(game.state.party.length, count + 1);
	assert.equal(game.state.gil, gil - game.getRecruitmentCost());
	assert.equal(recruit.name, "Aster");
	assert.equal(recruit.level, 1);
	assert.equal(recruit.sex, "female");
	assert.equal(recruit.job, "chemist");
	assert.equal(recruit.zodiac, "libra");
	assert.ok(
		recruit.brave >= 40 &&
			recruit.brave <= 70 &&
			recruit.faith >= 40 &&
			recruit.faith <= 70,
	);
	assert.equal(game.canDismiss("ramza"), false);
	assert.equal(game.canDismiss(recruit.id), true);
	assert.equal(game.dismissUnit(recruit.id), true);
	assert.equal(game.state.party.length, count);
	game.state.gil = 0;
	assert.equal(game.hireRecruit({ name: "Una", sex: "female" }), false);
});

test("monster breeding progresses eggs through victories and hatches a source-family offspring", () => {
	const game = newGame({ difficulty: "story" });
	game.recruit({ id: "test-chocobo", name: "Amber", job: "yellow-chocobo" });
	for (let i = 0; i < 3; i++) {
		prepareCompany(game);
		assert.equal(playEncounter(game, CAMPAIGN[0].id).victory, true);
		game.advanceCampaign();
	}
	const egg = game.getEggs().find((entry) => entry.parentId === "test-chocobo");
	assert.ok(
		egg,
		"A mature roster monster produces an egg through game progression",
	);
	assert.ok(["yellow-chocobo", "black-chocobo"].includes(egg.job));
	assert.equal(egg.ready, false);
	assert.equal(game.hatchEgg(egg.id), false);
	for (let i = 0; i < 2; i++) {
		prepareCompany(game);
		assert.equal(playEncounter(game, CAMPAIGN[0].id).victory, true);
		game.advanceCampaign();
	}
	assert.equal(game.getEggs().find((entry) => entry.id === egg.id).ready, true);
	assert.equal(game.hatchEgg(egg.id), true);
	const child = game.state.party.find(
		(unit) => unit.id === `hatched-${egg.id}`,
	);
	assert.equal(child.job, egg.job);
	assert.equal(child.sex, "monster");
	assert.ok(
		child.brave >= 40 &&
			child.brave <= 70 &&
			child.faith >= 40 &&
			child.faith <= 70,
	);
	assert.equal(game.canDismiss(child.id), true);
	assert.equal(game.dismissUnit(child.id), true);
	assert.ok(!game.getEggs().some((entry) => entry.id === egg.id));
});

test("Nelveska rare equipment requires Jump 5, a large companion, and Move-Find Item", () => {
	const { game, battle, ramza } = battlefield();
	const temple = OPTIONAL_BATTLES.find(
		(encounter) => encounter.id === "optional-nelveska",
	);
	const map = game.buildMap(temple);
	battle.map = map.tiles;
	battle.tiles = map.tiles;
	battle.width = map.width;
	battle.height = map.height;
	const pillar = map.tiles.find(
		(tile) => tile.pillar && tile.treasure.pillar === "west",
	);
	ramza.x = pillar.x + 1;
	ramza.z = pillar.z;
	ramza.jump = 5;
	ramza.move = 4;
	ramza.abilitySlots.movement = ABILITIES.find(
		(ability) => ability.name === "Move-Find Item",
	).id;
	assert.ok(
		!game
			.getReachable()
			.some((tile) => tile.x === pillar.x && tile.z === pillar.z),
		"Jump alone cannot reach the high pillar",
	);
	const dragon = game.createUnit({
		id: "stepping-stone",
		name: "Reis",
		job: "holy-dragon",
		team: "player",
		x: pillar.x,
		z: pillar.z + 1,
	});
	battle.units.push(dragon);
	assert.ok(
		game
			.getReachable()
			.some((tile) => tile.x === pillar.x && tile.z === pillar.z),
	);
	ramza.jump = 4;
	assert.ok(
		!game
			.getReachable()
			.some((tile) => tile.x === pillar.x && tile.z === pillar.z),
	);
	ramza.jump = 5;
	ramza.brave = 0;
	assert.equal(game.moveUnit(ramza, pillar.x, pillar.z), true);
	assert.equal(
		game.state.inventory["item-6a"],
		1,
		"The rare WP 30 Javelin is a real acquired item",
	);
});
