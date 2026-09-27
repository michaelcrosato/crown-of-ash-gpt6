/**
 * Crown of Ash — deterministic tactical simulation, independent of the DOM.
 * Game.subscribe((state, event) => ...) observes every completed mutation. Events
 * carry type, unitId/targetId, amount and from/to positions where relevant.
 * Renderer coordinates are x,z; map height is measured in half-block levels.
 * A turn allows one move and one action in either order, then wait(facing).
 * advanceAI() plays exactly one enemy turn; autoTurn() is also useful in tests.
 * All save data is plain JSON. Content retains original source record IDs.
 */
import * as content from "./content.js";

const asArray = (value) =>
	Array.isArray(value)
		? value
		: typeof value === "string"
			? [value]
			: Object.values(value || {});
export const JOBS = asArray(content.JOBS || content.jobs);
export const ABILITIES = asArray(content.ABILITIES || content.abilities);
export const ITEMS = asArray(content.ITEMS || content.equipment);
export const CAMPAIGN = asArray(content.CAMPAIGN || content.campaign);
export const OPTIONAL_BATTLES = asArray(
	content.OPTIONAL_BATTLES || content.optionalBattles,
);
export const ALTERNATE_BATTLES = CAMPAIGN.flatMap((battle) =>
	(battle.alternatives || []).map((route, index) => ({
		...battle,
		...route,
		id: `${battle.id}-route-${index + 1}`,
		parentId: battle.id,
		name: `Bethla Garrison — ${route.name}`,
		alternatives: [],
	})),
);
const QUESTS = asArray(content.QUESTS || content.quests);
const WORLD_EVENTS = asArray(content.worldEvents);
const BREEDING_FAMILIES = asArray(content.breedingFamilies);
const ROSTER_LIMIT = 32;
const RECRUITMENT_FEE = 600;
const jobsById = new Map(JOBS.map((item) => [item.id, item]));
const abilitiesById = new Map(ABILITIES.map((item) => [item.id, item]));
const itemsById = new Map(ITEMS.map((item) => [item.id, item]));
const encounterById = new Map(
	[...CAMPAIGN, ...OPTIONAL_BATTLES, ...ALTERNATE_BATTLES].map((item) => [
		item.id,
		item,
	]),
);
const SAVE_KEY = "crown-zodiac-save-v1";
const CHECKPOINT_KEY = "crown-zodiac-recovery-v1";
const clone = (value) => JSON.parse(JSON.stringify(value));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const number = (value, fallback = 0) =>
	Number.isFinite(Number(value)) ? Number(value) : fallback;
const pointKey = (x, z) => `${x},${z}`;
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
const directions = {
	north: [0, -1],
	east: [1, 0],
	south: [0, 1],
	west: [-1, 0],
};
export const ZODIAC_SIGNS = [
	"aries",
	"taurus",
	"gemini",
	"cancer",
	"leo",
	"virgo",
	"libra",
	"scorpio",
	"sagittarius",
	"capricorn",
	"aquarius",
	"pisces",
];
const stableHash = (text) =>
	[...String(text)].reduce(
		(value, char) => (Math.imul(value, 31) + char.charCodeAt(0)) >>> 0,
		17,
	);
const statusId = (value) =>
	({
		darkness: "blind",
		disable: "dontact",
		"don't act": "dontact",
		"don't move": "immobilize",
		confusion: "confuse",
		"death sentence": "doom",
		"re-raise": "reraise",
	})[String(value).toLowerCase()] ||
	String(value)
		.toLowerCase()
		.replace(/[\s'-]/g, "");
const BASE_STATS = {
	squire: [106, 25, 11, 7, 8, 4, 2],
	knight: [130, 24, 14, 5, 7, 3, 2],
	chemist: [92, 35, 9, 8, 8, 4, 2],
	archer: [98, 25, 12, 6, 8, 4, 3],
	wizard: [80, 80, 6, 14, 8, 3, 2],
	priest: [88, 85, 7, 13, 8, 3, 2],
	monk: [124, 30, 16, 7, 9, 4, 3],
	thief: [90, 30, 10, 7, 11, 5, 3],
	ninja: [104, 32, 15, 8, 12, 5, 4],
	samurai: [120, 42, 14, 11, 8, 3, 3],
	summoner: [84, 110, 6, 16, 7, 3, 2],
	lancer: [124, 30, 15, 6, 8, 4, 4],
	"time-mage": [82, 88, 6, 13, 8, 3, 2],
	oracle: [86, 80, 7, 13, 8, 3, 2],
	mediator: [98, 42, 10, 9, 8, 4, 2],
	geomancer: [116, 54, 13, 11, 9, 4, 3],
	bard: [88, 60, 8, 10, 8, 4, 2],
	dancer: [88, 60, 10, 8, 8, 4, 2],
	calculator: [78, 75, 7, 13, 6, 3, 2],
	mime: [125, 35, 15, 13, 9, 4, 3],
};

const BASIC_ABILITIES = [
	{
		id: "attack",
		name: "Attack",
		kind: "physical",
		range: 1,
		power: 100,
		mp: 0,
		ct: 0,
		aoe: 0,
		hit: 96,
	},
	{
		id: "potion",
		name: "Potion",
		job: "chemist",
		kind: "heal",
		range: 3,
		power: 65,
		fixed: true,
		mp: 0,
		ct: 0,
		aoe: 0,
		consumable: "potion",
	},
	{
		id: "phoenix-down",
		name: "Phoenix Down",
		job: "chemist",
		kind: "revive",
		range: 3,
		power: 35,
		mp: 0,
		ct: 0,
		aoe: 0,
		consumable: "phoenix-down",
	},
	{
		id: "focus",
		name: "Accumulate",
		job: "squire",
		kind: "buff",
		range: 0,
		power: 2,
		status: "power",
		mp: 0,
		ct: 0,
		aoe: 0,
	},
	{
		id: "cure",
		name: "Cure",
		job: "priest",
		kind: "heal",
		range: 4,
		power: 90,
		mp: 8,
		ct: 2,
		aoe: 1,
	},
	{
		id: "fire",
		name: "Fire",
		job: "wizard",
		kind: "magic",
		range: 4,
		power: 100,
		mp: 8,
		ct: 3,
		aoe: 1,
		element: "fire",
	},
	{
		id: "raise",
		name: "Raise",
		job: "priest",
		kind: "revive",
		range: 4,
		power: 50,
		mp: 16,
		ct: 3,
		aoe: 0,
	},
	{
		id: "holy-sword",
		name: "Stasis Sword",
		job: "holy-knight",
		kind: "physical",
		range: 3,
		power: 105,
		mp: 0,
		ct: 0,
		aoe: 1,
		status: "stop",
	},
	{
		id: "jump",
		name: "Jump",
		job: "lancer",
		kind: "physical",
		range: 3,
		power: 160,
		mp: 0,
		ct: 4,
		aoe: 0,
		effect: "leap",
	},
	{
		id: "defend",
		name: "Defend",
		kind: "buff",
		range: 0,
		power: 0,
		mp: 0,
		ct: 0,
		aoe: 0,
		status: "defend",
	},
];
for (const ability of BASIC_ABILITIES)
	if (!abilitiesById.has(ability.id)) abilitiesById.set(ability.id, ability);

function canonicalJob(id) {
	const raw = String(id || "squire").toLowerCase();
	if (jobsById.has(raw)) return raw;
	return (
		JOBS.find((job) => job.name?.toLowerCase() === raw)?.id ||
		raw.replaceAll(" ", "-")
	);
}

function abilityData(id) {
	if (id?.startsWith("math:")) {
		const [, field, divisor, spellId] = id.split(":");
		const spell = abilityData(spellId);
		return spell
			? {
					...spell,
					id,
					name: `${field.toUpperCase()} ${divisor} · ${spell.name}`,
					mp: 0,
					ct: 0,
					range: 99,
					aoe: 99,
					global: true,
					math: { field, divisor },
					job: "calculator",
				}
			: null;
	}
	const source = abilitiesById.get(id);
	if (!source) return null;
	const name = source.name || id;
	let kind = source.kind || source.type || "physical";
	const statusName = name.toLowerCase();
	if (
		kind !== "passive" &&
		/potion|cure|curaja|murasame|chakra|stigma magic|healing|restore hp/i.test(
			name,
		)
	)
		kind = "heal";
	if (/^(raise(?: 2)?|revive|phoenix down|resurrection)$/i.test(name))
		kind = "revive";
	const sourcePower = number(source.power, 0);
	// The source's formula constants and multipliers are not the same unit as
	// this game's damage percentage. Keep source values in the codex unchanged.
	const power = source.fixed
		? sourcePower
		: sourcePower > 0 && sourcePower < 40
			? 70 + sourcePower * 2
			: sourcePower || 100;
	let status = source.status || source.effectStatus;
	if (!status) {
		status = [
			"poison",
			"sleep",
			"slow",
			"haste",
			"protect",
			"shell",
			"regen",
			"silence",
			"blind",
			"stop",
			"charm",
			"petrify",
			"berserk",
			"reraise",
			"reflect",
		].find((entry) => statusName.includes(entry));
	}
	return {
		...source,
		id,
		name,
		kind,
		power,
		global: number(source.range) >= 90,
		mp: number(source.mp ?? source.mpCost),
		ct: clamp(number(source.ct ?? source.charge), 0, 24),
		range: clamp(number(source.range, 3), 0, 99),
		aoe: clamp(number(source.aoe ?? source.area), 0, 99),
		status: status ? statusId(status) : undefined,
		hit: number(source.hit, kind === "status" ? 80 : 96),
	};
}

function findItem(fragment) {
	const exact = ITEMS.find((item) => item.name?.toLowerCase() === fragment);
	return (
		exact?.id || ITEMS.find((item) => item.id === fragment)?.id || fragment
	);
}

export class Game {
	constructor({ seed = 7351, storage } = {}) {
		if (storage === undefined) {
			try {
				storage = globalThis.localStorage;
			} catch {
				storage = null;
			}
		}
		this.storage = storage;
		this.listeners = new Set();
		this.seed = seed;
		this.state = this.initialState();
	}

	initialState() {
		return {
			version: 1,
			screen: "title",
			seed: this.seed,
			chapter: 1,
			campaignIndex: 0,
			party: [],
			eggs: [],
			recruitCounter: 0,
			inventory: {},
			gil: 1200,
			completed: [],
			worldEvents: [],
			quests: {},
			notices: [],
			battle: null,
			result: null,
			discoveries: [],
			totalBattles: 0,
			totalActions: 0,
			difficulty: "tactical",
			endingSeen: false,
		};
	}

	subscribe(listener) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}
	emit(type = "change", detail = {}) {
		const event = { type, ...detail };
		for (const listener of this.listeners) listener(this.state, event);
		return event;
	}
	random() {
		this.state.seed = (Math.imul(this.state.seed, 1664525) + 1013904223) >>> 0;
		return this.state.seed / 4294967296;
	}
	notice(message) {
		this.state.notices.push(message);
		this.state.notices = this.state.notices.slice(-12);
		this.emit("notice", { message });
		return false;
	}
	log(message) {
		if (!this.state.battle) return;
		this.state.battle.log.push(message);
		this.state.battle.log = this.state.battle.log.slice(-60);
	}

	newGame(options = {}) {
		this.state = this.initialState();
		this.state.difficulty = options.difficulty || "tactical";
		this.state.screen = "world";
		const starters = [
			["ramza", "Ramza", "ramza-squire", 72, 68],
			["delita", "Delita", "squire", 74, 58],
			["zach", "Zach", "knight", 68, 52],
			["annette", "Annette", "priest", 61, 74],
			["laura", "Laura", "wizard", 59, 76],
			["rad", "Rad", "chemist", 65, 65],
		];
		this.state.party = starters.map(([id, name, job, brave, faith]) =>
			this.createUnit({
				id,
				name,
				job,
				brave,
				faith,
				sex: ["annette", "laura"].includes(id) ? "female" : "male",
				...(id === "ramza"
					? { zodiac: "capricorn" }
					: id === "delita"
						? { zodiac: "sagittarius" }
						: {}),
				level: 1,
				team: "player",
			}),
		);
		this.state.inventory[findItem("potion")] = 20;
		this.state.inventory[findItem("phoenix down")] = 8;
		this.state.inventory[findItem("ether")] = 5;
		this.state.inventory[findItem("antidote")] = 5;
		this.saveCheckpoint();
		this.save();
		this.emit("new-game");
		return true;
	}

	createUnit(spec = {}) {
		const job = canonicalJob(spec.job);
		const unit = {
			id: spec.id || `unit-${Math.floor(this.random() * 1e9)}`,
			name: spec.name || jobsById.get(job)?.name || "Soldier",
			job,
			homeJob: job,
			secondaryJob: "chemist",
			team: spec.team || "enemy",
			level: number(spec.level, 1),
			exp: 0,
			brave: number(spec.brave, 65),
			faith: number(spec.faith, 65),
			jp: { squire: 240, chemist: 240, [job]: 300 },
			jobExp: { squire: 200, chemist: 200, [job]: 200 },
			learned: [],
			equipment: {},
			abilitySlots: { reaction: null, support: null, movement: null },
			statuses: {},
			facing: spec.facing || (spec.team === "player" ? "north" : "south"),
			ct: 0,
			x: spec.x || 0,
			z: spec.z || 0,
			boss: !!spec.boss,
			guest: !!spec.guest,
			deadTicks: 0,
			items: { potion: 2, "phoenix-down": 1 },
			...spec,
		};
		unit.job = job;
		unit.zodiac = String(
			spec.zodiac ||
				jobsById.get(job)?.zodiac ||
				(unit.id === "ramza"
					? "capricorn"
					: ZODIAC_SIGNS[stableHash(unit.name) % 12]),
		).toLowerCase();
		unit.sex =
			spec.sex ||
			jobsById.get(job)?.sex ||
			(jobsById.get(job)?.monster
				? "monster"
				: stableHash(unit.name) % 2
					? "female"
					: "male");
		if (jobsById.get(job)?.monster) unit.secondaryJob = "none";
		unit.learned = spec.learned
			? [...spec.learned]
			: this.startingAbilities(job);
		if (!spec.equipment && !jobsById.get(job)?.monster) {
			for (const slot of ["weapon", "head", "body"]) {
				const options = ITEMS.filter(
					(item) =>
						item.slot === slot &&
						!item.rare &&
						number(item.price) > 0 &&
						number(item.price) < 900 &&
						this.canEquipItem(unit, item),
				).sort((a, b) => number(a.price) - number(b.price));
				if (options.length) unit.equipment[slot] = options[0].id;
			}
		}
		this.recalculate(unit);
		unit.hp = spec.hp ?? unit.maxHp;
		unit.mp = spec.mp ?? unit.maxMp;
		return unit;
	}

	startingAbilities(job) {
		const defined = jobsById.get(job)?.abilities || [];
		const ids = defined.map((entry) =>
			typeof entry === "string" ? entry : entry.id,
		);
		const belonging = ABILITIES.filter(
			(ability) =>
				canonicalJob(ability.job || ability.jobId) === job &&
				!["passive", "reaction", "support", "movement"].includes(
					ability.kind || ability.type,
				),
		).map((ability) => ability.id);
		const available = [...new Set([...ids, ...belonging])].filter(
			(id) => abilityData(id)?.kind !== "passive",
		);
		const basics = jobsById.get(job)?.monster ? [] : ["potion", "phoenix-down"];
		if (/wizard|mage|sorcer|summoner|oracle/i.test(job)) basics.push("fire");
		if (/priest|holy|cleric/i.test(job)) basics.push("cure", "raise");
		if (/holy-knight|agrias/i.test(job)) basics.push("holy-sword");
		if (/squire/.test(job)) basics.push("focus");
		if (/lancer/.test(job)) basics.push("jump");
		return [...new Set([...basics, ...available.slice(0, 2)])];
	}

	recalculate(unit) {
		const job = jobsById.get(unit.job);
		unit.zodiac ||=
			job?.zodiac ||
			(unit.id === "ramza"
				? "capricorn"
				: ZODIAC_SIGNS[stableHash(unit.name) % 12]);
		unit.sex ||=
			job?.sex ||
			(job?.monster
				? "monster"
				: stableHash(unit.name) % 2
					? "female"
					: "male");
		const defaults =
			BASE_STATS[unit.job] ||
			BASE_STATS[Object.keys(BASE_STATS).find((id) => unit.job.includes(id))] ||
			BASE_STATS.knight;
		const source = job?.stats || {};
		const stats = Object.fromEntries(
			["hp", "mp", "pa", "ma", "speed", "move", "jump"].map((key, i) => [
				key,
				number(source[key], defaults[i]),
			]),
		);
		// Content stats are tuned bases. Guard legacy percentage growth values.
		if (stats.pa > 40) stats.pa = defaults[2];
		if (stats.ma > 40) stats.ma = defaults[3];
		if (stats.speed > 20) stats.speed = defaults[4];
		stats.hp = Math.max(stats.hp, 80);
		stats.mp = Math.max(stats.mp, 20);
		const level = Math.max(0, unit.level - 1);
		unit.maxHp = Math.round(stats.hp + level * 8);
		unit.maxMp = Math.round(stats.mp + level * 3);
		unit.pa = stats.pa + Math.floor(level * 0.7);
		unit.ma = stats.ma + Math.floor(level * 0.65);
		unit.speed = clamp(stats.speed + Math.floor(level / 12), 5, 18);
		unit.move = clamp(stats.move, 3, 7);
		unit.jump = clamp(stats.jump, 1, 7);
		unit.weaponRange = 1;
		unit.weaponPower = 0;
		unit.evasion = /thief|ninja/.test(unit.job) ? 18 : 8;
		unit.defense = /knight|lancer|samurai/.test(unit.job) ? 0.16 : 0;
		unit.immunities = (job?.immunities || []).map(statusId);
		unit.autoStatuses = [];
		unit.initialStatuses = [];
		unit.elementEffects = [];
		for (const id of Object.values(unit.equipment || {})) {
			const item = itemsById.get(id);
			if (!item) continue;
			const bonuses = item.stats || item;
			unit.maxHp += number(bonuses.hp);
			unit.maxMp += number(bonuses.mp);
			unit.pa += number(bonuses.pa);
			unit.ma += number(bonuses.ma);
			unit.speed += number(bonuses.speed);
			unit.move += number(bonuses.move);
			unit.jump += number(bonuses.jump);
			unit.evasion += number(item.evasion);
			if (item.sourceEffects) {
				unit.elementEffects.push(item.sourceEffects.toLowerCase());
				const blocked = item.sourceEffects
					.match(/Block:\s*([^;]+)/i)?.[1]
					?.split(
						/\s+(?:Strengthen|Half|Absorb|Cancel|Initial|Always|Weak):/i,
					)[0];
				if (blocked)
					unit.immunities.push(
						...blocked.split(",").map((status) =>
							status
								.trim()
								.toLowerCase()
								.replace(/[^a-z]/g, ""),
						),
					);
			}
			unit.immunities.push(...(item.blockStatuses || []).map(statusId));
			unit.autoStatuses.push(
				...(
					item.autoStatuses ||
					[
						...(item.sourceEffects || "").matchAll(
							/Auto-([A-Za-z ]+?)(?=,|$)/g,
						),
					].map((match) => match[1])
				).map(statusId),
			);
			unit.initialStatuses.push(
				...(
					item.initialStatuses ||
					[
						...(item.sourceEffects || "").matchAll(
							/Initial-([A-Za-z ]+?)(?=,|$)/g,
						),
					].map((match) => match[1])
				).map(statusId),
			);
			if (item.slot === "weapon") {
				unit.weaponPower = number(item.power || item.wp, 5);
				if (item.range) unit.weaponRange = clamp(number(item.range, 1), 1, 8);
				else if (/bow|gun/i.test(item.type || item.name)) unit.weaponRange = 4;
				else if (/spear|stick/i.test(item.type || item.name))
					unit.weaponRange = 2;
			}
		}
		unit.abilitySlots ||= { reaction: null, support: null, movement: null };
		for (const id of Object.values(unit.abilitySlots)) {
			const ability = abilityData(id);
			if (ability?.kind !== "passive") continue;
			if (/move\s*\+\s*(\d)/i.test(ability.name))
				unit.move += Number(ability.name.match(/\d/)[0]);
			if (/jump\s*\+\s*(\d)/i.test(ability.name))
				unit.jump += Number(ability.name.match(/\d/)[0]);
			if (/defense up/i.test(ability.name)) unit.defense += 0.25;
			if (/magic attack\s*up/i.test(ability.name))
				unit.ma = Math.round(unit.ma * 1.33);
			else if (/attack up/i.test(ability.name))
				unit.pa = Math.round(unit.pa * 1.33);
		}
		if (unit.boss) {
			unit.maxHp = Math.round(unit.maxHp * 2.2);
			unit.maxMp += 60;
			unit.pa += 2;
			unit.ma += 2;
		}
		unit.hp = clamp(number(unit.hp, unit.maxHp), 0, unit.maxHp);
		unit.mp = clamp(number(unit.mp, unit.maxMp), 0, unit.maxMp);
	}

	hasPassive(unit, pattern, slot) {
		const slots = slot
			? [unit.abilitySlots?.[slot]]
			: Object.values(unit.abilitySlots || {});
		const equipped = slots.some((id) =>
			pattern.test(abilityData(id)?.name || ""),
		);
		const job = jobsById.get(unit.job);
		const innate = `${asArray(job?.innate).join(" ")} ${job?.description?.split("INNATE:")[1] || ""}`;
		return equipped || pattern.test(innate);
	}
	getPassiveChoices(unitId, slot) {
		const unit = this.getUnit(unitId);
		return (unit?.learned || [])
			.map(abilityData)
			.filter(
				(ability) =>
					ability?.kind === "passive" &&
					ability.category === slot &&
					!/GameShark only|no known effect|has no effect/i.test(
						ability.description || "",
					),
			);
	}
	equipAbility(unitId, abilityId, slot) {
		if (this.state.screen === "battle") return false;
		const unit = this.state.party.find((entry) => entry.id === unitId);
		const ability = abilityId ? abilityData(abilityId) : null;
		slot ||= ability?.category;
		if (
			!unit ||
			!["reaction", "support", "movement"].includes(slot) ||
			(abilityId &&
				!this.getPassiveChoices(unitId, slot).some(
					(choice) => choice.id === abilityId,
				))
		)
			return false;
		unit.abilitySlots ||= { reaction: null, support: null, movement: null };
		unit.abilitySlots[slot] = abilityId;
		this.recalculate(unit);
		this.save();
		this.emit("ability-equipped", { unitId, abilityId, slot });
		return true;
	}
	adjustedAbility(unit, abilityId) {
		const base =
			typeof abilityId === "object" ? abilityId : abilityData(abilityId);
		if (!base) return null;
		const ability = { ...base };
		if (this.hasPassive(unit, /half of mp/i, "support"))
			ability.mp = Math.ceil(ability.mp / 2);
		if (
			this.hasPassive(unit, /short charge/i, "support") &&
			!["lancer", "archer", "bard", "dancer"].includes(ability.job)
		)
			ability.ct = Math.ceil(ability.ct / 2);
		if (ability.consumable)
			ability.range =
				unit.job === "chemist" ||
				this.hasPassive(unit, /throw item/i, "support")
					? 4
					: 1;
		if (ability.job === "engineer") ability.range = unit.weaponRange;
		if (ability.id === "jump") {
			ability.range = Math.max(
				2,
				...(unit.learned || [])
					.map(abilityData)
					.filter((learned) => learned?.effect === "jump-range")
					.map((learned) => learned.amount),
			);
			ability.ct = Math.max(2, Math.ceil(40 / this.effectiveSpeed(unit)));
		}
		return ability;
	}
	drawOutItem(ability) {
		if (ability.job !== "samurai" || ability.kind === "passive") return null;
		const sourceName =
			ability.description?.match(/at least one (.*?) in your/i)?.[1] ||
			ability.name;
		return (
			ITEMS.find(
				(item) => item.name.toLowerCase() === sourceName.toLowerCase(),
			) ||
			ITEMS.find((item) =>
				item.name.toLowerCase().startsWith(sourceName.toLowerCase()),
			)
		);
	}
	throwCandidates(ability) {
		const family = ability.name.toLowerCase().replace("hammer", "flail");
		return ITEMS.filter(
			(item) =>
				number(this.state.inventory[item.id]) > 0 &&
				((item.type || "").toLowerCase().replace(/s$/, "") === family ||
					item.name.toLowerCase().includes(family)),
		).sort((a, b) => number(a.power) - number(b.power));
	}
	abilityRequirementsMet(unit, ability) {
		if (
			ability.job === "soldier" &&
			!Object.values(unit.equipment).some(
				(id) => itemsById.get(id)?.name === "Materia Blade",
			)
		)
			return false;
		const katana = this.drawOutItem(ability);
		if (ability.job === "samurai" && !katana) return false;
		if (
			katana &&
			unit.team === "player" &&
			!number(this.state.inventory[katana.id]) &&
			!Object.values(unit.equipment).includes(katana.id)
		)
			return false;
		if (
			ability.effect === "throw" &&
			unit.team === "player" &&
			!this.throwCandidates(ability).length
		)
			return false;
		if (
			ability.effect === "throw" &&
			unit.team !== "player" &&
			number(unit.throws, 5) <= 0
		)
			return false;
		return true;
	}
	throwItem(unit, ability) {
		if (unit.team !== "player") {
			unit.throws = number(unit.throws, 5) - 1;
			return { power: 5, name: ability.name };
		}
		const item = this.throwCandidates(ability)[0];
		if (item) {
			this.state.inventory[item.id]--;
			this.log(`${unit.name} throws ${item.name}.`);
		}
		return item;
	}
	invite(unit, target) {
		if (
			target.boss ||
			target.invited ||
			(jobsById.get(target.job)?.monster &&
				unit.job !== "mediator" &&
				!this.hasPassive(unit, /monster talk/i, "support"))
		)
			return false;
		target.team = unit.team;
		target.guest = true;
		target.invited = true;
		delete target.statuses.charm;
		this.log(`${target.name} accepts an invitation to the company.`);
		return true;
	}

	getNextEncounter() {
		return CAMPAIGN[this.state.campaignIndex] || null;
	}
	getDeployment(encounterId) {
		const encounter = encounterId
			? encounterById.get(encounterId)
			: this.getNextEncounter();
		const guests = [
			...(encounter?.guests || []).map((guest) => guest.name),
			...(encounter?.guest ? [encounter.guest.name || encounter.guest] : []),
		];
		return this.state.party
			.filter((unit) => !unit.onQuest && !guests.includes(unit.name))
			.slice(0, encounter?.deploymentLimit || 5);
	}
	getAvailableBattles() {
		const next = this.getNextEncounter();
		return [
			next,
			...ALTERNATE_BATTLES.filter((battle) => battle.parentId === next?.id),
			...OPTIONAL_BATTLES.filter((battle) => this.encounterUnlocked(battle)),
		].filter(Boolean);
	}
	getAvailableWorldEvents() {
		return WORLD_EVENTS.map((event) => {
			const completed = this.state.worldEvents.includes(event.id);
			let reason = "";
			if (number(event.chapter, 1) > this.state.chapter)
				reason = `Opens in Chapter ${event.chapter}.`;
			else if (
				event.requiresBattle &&
				!this.state.completed.includes(event.requiresBattle)
			)
				reason = `Complete ${encounterById.get(event.requiresBattle)?.name || event.requiresBattle}.`;
			else if (
				event.requiresEvents?.some((id) => !this.state.worldEvents.includes(id))
			)
				reason = `First visit ${WORLD_EVENTS.find((entry) => entry.id === event.requiresEvents.find((id) => !this.state.worldEvents.includes(id)))?.location || "the preceding town"}.`;
			else if (
				event.requiresParty?.some(
					(id) => !this.state.party.some((unit) => unit.id === id),
				)
			)
				reason = "Bring the required companions.";
			else if (
				event.requiresAbility &&
				!this.state.party.some((unit) =>
					Object.values(unit.abilitySlots || {}).includes(
						event.requiresAbility,
					),
				)
			)
				reason = `Equip ${abilityData(event.requiresAbility)?.name || "the required ability"} in the company.`;
			else if (number(event.cost) > this.state.gil)
				reason = `Requires ${event.cost} gil.`;
			return { ...event, unlocked: !reason && !completed, completed, reason };
		});
	}
	visitWorldEvent(id) {
		if (this.state.screen === "battle") return false;
		const event = this.getAvailableWorldEvents().find(
			(entry) => entry.id === id,
		);
		if (!event?.unlocked)
			return event
				? this.notice(event.reason || "This visit is complete.")
				: false;
		this.state.gil -= number(event.cost);
		this.state.worldEvents.push(id);
		if (event.setsFlag) this.state[event.setsFlag] = true;
		if (event.recruit) this.recruit(event.recruit);
		if (event.transform) {
			const unit = this.state.party.find(
				(entry) => entry.id === event.transform.unitId,
			);
			if (unit) {
				unit.job = event.transform.job;
				unit.homeJob = unit.job;
				unit.secondaryJob = "chemist";
				unit.learned = [
					...new Set([...unit.learned, ...this.startingAbilities(unit.job)]),
				];
				this.recalculate(unit);
				unit.hp = unit.maxHp;
				unit.mp = unit.maxMp;
			}
		}
		for (const item of event.items || [])
			this.state.inventory[item] = number(this.state.inventory[item]) + 1;
		this.state.discoveries.push({
			id,
			name: event.name,
			text: event.description,
		});
		this.save();
		this.emit("world-event", { event });
		return true;
	}
	encounterUnlocked(encounter) {
		if (!encounter) return false;
		if (encounter.parentId)
			return this.encounterUnlocked(encounterById.get(encounter.parentId));
		if (CAMPAIGN.some((item) => item.id === encounter.id))
			return (
				this.state.completed.includes(encounter.id) ||
				encounter.id === this.getNextEncounter()?.id
			);
		if (
			number(encounter.chapter ?? encounter.unlockChapter, 4) >
			this.state.chapter
		)
			return false;
		const prerequisite =
			encounter.requires ||
			encounter.prerequisite ||
			encounter.unlockAfter ||
			encounter.after ||
			encounter.requiresBattle;
		if (
			typeof prerequisite === "string" &&
			!this.state.completed.includes(prerequisite)
		)
			return false;
		if (
			Array.isArray(prerequisite) &&
			!prerequisite.every((id) => this.state.completed.includes(id))
		)
			return false;
		if (
			encounter.requireEvents?.some(
				(id) => !this.state.worldEvents.includes(id),
			) ||
			encounter.requiresEvents?.some(
				(id) => !this.state.worldEvents.includes(id),
			)
		)
			return false;
		const dungeon = OPTIONAL_BATTLES.filter((battle) =>
			/deep|dungeon/i.test(`${battle.group || ""} ${battle.id}`),
		);
		const dungeonIndex = dungeon.findIndex(
			(battle) => battle.id === encounter.id,
		);
		if (
			dungeonIndex > 0 &&
			!this.state.completed.includes(dungeon[dungeonIndex - 1].id)
		)
			return false;
		return true;
	}

	buildMap(encounter) {
		const terrain = String(
			encounter.mapId || encounter.terrain || encounter.name || "",
		).toLowerCase();
		const source = asArray(content.sourceMaps).find(
			(map) => map.id === encounter.sourceMapId && map.complete,
		);
		if (source) {
			const tiles = clone(source.tiles).filter(
				(tile) => tile.present !== false,
			);
			for (const treasure of source.treasures || []) {
				const tile = tiles.find(
					(cell) => cell.x === treasure.x && cell.z === treasure.z,
				);
				if (tile) tile.treasure = { ...treasure };
			}
			for (const trap of source.traps || []) {
				const tile = tiles.find(
					(cell) => cell.x === trap.x && cell.z === trap.z,
				);
				if (tile) tile.trap = trap.name;
			}
			if (encounter.objectiveType === "explore") {
				const locations = (source.exits || [])
					.map((position) =>
						tiles.find(
							(tile) => tile.x === position.x && tile.z === position.z,
						),
					)
					.filter((tile) => tile && !tile.blocked);
				const exit =
					locations[Math.floor(this.random() * locations.length)] ||
					tiles.filter((tile) => !tile.blocked).sort((a, b) => a.z - b.z)[0];
				if (exit) {
					exit.exit = true;
					exit.kind = "exit";
				}
			}
			return {
				width: source.width,
				height: source.height,
				tiles,
				theme: /dungeon/.test(terrain)
					? "dungeon"
					: /town/.test(terrain)
						? "town"
						: "highlands",
				playerSpawns: source.playerSpawns || [],
				enemySpawns: source.enemySpawns || [],
				guestSpawns: source.guestStarts || [],
				sourceMapId: source.id,
			};
		}
		const width = /castle|gate|temple|monastery|cathedral/.test(terrain)
			? 10
			: 9;
		const height = 9;
		const tiles = [];
		const ruins =
			/castle|ruin|temple|monastery|cathedral|fort|church|palace|murond|riovanes|limberry/.test(
				terrain,
			);
		const town = /town|city|street|roof|gou[g]?|dorter|zarghidas/.test(terrain);
		const desert = /desert|zirekile|sand|beddha/.test(terrain);
		const water = /river|falls|lake|sluice|swamp|marsh|finath|zirekile/.test(
			terrain,
		);
		const deep = /deep|dungeon|end|voyage|bridge|murond-death|necropolis/.test(
			terrain,
		);
		for (let z = 0; z < height; z++) {
			for (let x = 0; x < width; x++) {
				let elevation = 0;
				let kind =
					ruins || town ? "stone" : deep ? "dark" : desert ? "sand" : "grass";
				if (ruins)
					elevation = z < 3 ? 2 : (x === 0 || x === width - 1) && z < 6 ? 1 : 0;
				else if (town) elevation = (x < 2 || x > width - 3) && z < 6 ? 2 : 0;
				else
					elevation = Math.max(
						0,
						Math.floor((Math.sin((x + 1) * 0.8) + Math.cos(z * 0.7)) * 1.2),
					);
				if (
					water &&
					z === 4 &&
					x !== Math.floor(width / 2) &&
					x !== Math.floor(width / 2) - 1
				) {
					kind = "water";
					elevation = -0.35;
				}
				if (water && z === 4 && kind !== "water") kind = "bridge";
				if (deep) elevation = x < 2 || x > width - 3 ? 2 : z < 2 ? 1 : 0;
				const obstructed =
					(x === 0 || x === width - 1) &&
					z > 1 &&
					z < 6 &&
					z % 2 === 0 &&
					!town;
				tiles.push({
					x,
					z,
					height: elevation,
					kind,
					blocked: obstructed,
					obstacle: obstructed ? (ruins ? "pillar" : "rock") : null,
				});
			}
		}
		if (encounter.objectiveType === "switches" || /sluice/.test(terrain)) {
			for (const x of [2, width - 3]) {
				const tile = tiles.find((cell) => cell.x === x && cell.z === 1);
				tile.kind = "switch";
				tile.switch = false;
				tile.blocked = false;
			}
		}
		if (encounter.objectiveType === "explore") {
			const exit = tiles.find(
				(tile) => tile.x === Math.floor(width / 2) && tile.z === 0,
			);
			exit.exit = true;
			exit.kind = "exit";
			exit.blocked = false;
		}
		const treasureTiles = tiles.filter(
			(tile) =>
				!tile.blocked && tile.z > 1 && tile.z < 5 && tile.kind !== "water",
		);
		if (treasureTiles.length) {
			const treasure =
				treasureTiles[Math.floor(this.random() * treasureTiles.length)];
			treasure.treasure = true;
		}
		for (const [index, treasure] of asArray(encounter.treasures).entries()) {
			const tile = treasure.pillar
				? tiles.find(
						(entry) =>
							entry.x === (treasure.pillar === "west" ? 1 : width - 2) &&
							entry.z === 2,
					)
				: treasureTiles[(index * 7 + 3) % treasureTiles.length];
			if (tile) {
				tile.treasure = treasure;
				if (treasure.pillar) {
					tile.height += 7;
					tile.kind = "stone";
					tile.blocked = false;
					tile.pillar = true;
					tile.minimumJump = number(treasure.requiresJump, 5);
					tile.requiresSteppingStone = !!treasure.requiresSteppingStone;
				}
			}
		}
		return {
			width,
			height,
			tiles,
			theme: ruins
				? "ruins"
				: deep
					? "dungeon"
					: town
						? "town"
						: desert
							? "desert"
							: water
								? "river"
								: "highlands",
		};
	}

	startEncounter(id) {
		return this.startBattle(id);
	}
	startBattle(id) {
		if (!this.state.party.length) this.newGame();
		const encounter = id ? encounterById.get(id) : this.getNextEncounter();
		if (!encounter) return this.notice("No encounter is available.");
		if (!this.encounterUnlocked(encounter))
			return this.notice("This route has not opened yet.");
		this.saveCheckpoint();
		const terrain = this.buildMap(encounter);
		const average = Math.round(
			this.state.party.reduce((sum, unit) => sum + unit.level, 0) /
				this.state.party.length,
		);
		const campaignPosition = CAMPAIGN.findIndex(
			(item) => item.id === (encounter.parentId || encounter.id),
		);
		const storyLevel = number(
			encounter.level,
			1 + Math.floor(Math.max(0, campaignPosition) * 0.55),
		);
		const level = campaignPosition < 0 ? average : storyLevel;
		const duel =
			encounter.deploymentLimit === 1 ||
			/duel/i.test(
				`${encounter.objectiveType} ${encounter.name} ${encounter.id}`,
			);
		let deployed = this.getDeployment(encounter.id).slice(0, duel ? 1 : 5);
		if (!deployed.length) deployed = this.state.party.slice(0, 1);
		const playerUnits = deployed.map((unit, i) => {
			const fighter = clone(unit);
			this.recalculate(fighter);
			const spawn = terrain.playerSpawns?.[i];
			return {
				...fighter,
				hp: fighter.maxHp,
				mp: fighter.maxMp,
				team: "player",
				x: spawn?.x ?? Math.floor(terrain.width / 2) + (i % 3) - 1,
				z: spawn?.z ?? terrain.height - 2 + Math.floor(i / 3),
				ct: i === 0 ? 24 : 10 - i,
				statuses: {},
				deadTicks: 0,
				facing: "north",
				moved: false,
				acted: false,
				baseBrave: fighter.brave,
				baseFaith: fighter.faith,
			};
		});
		let enemySpecs = asArray(encounter.enemies);
		if (!enemySpecs.length)
			enemySpecs = [
				{ name: "Knight", job: "knight" },
				{ name: "Black Mage", job: "wizard" },
				{ name: "Archer", job: "archer" },
				{ name: "Squire", job: "squire" },
			];
		enemySpecs = enemySpecs.slice(0, duel ? 1 : 12);
		const enemyUnits = enemySpecs.map((spec, index) =>
			this.createUnit({
				...(typeof spec === "string" ? { name: spec, job: spec } : spec),
				id: `enemy-${index}`,
				job: canonicalJob(spec.job || spec.class || "knight"),
				level: clamp(level + (spec.boss ? 1 : 0), 1, 60),
				team: "enemy",
				x:
					terrain.enemySpawns?.[index]?.x ??
					Math.floor(terrain.width / 2) + (index % 3) - 1,
				z: terrain.enemySpawns?.[index]?.z ?? 1 + Math.floor(index / 3),
				ct: index * 2,
				boss: !!spec.boss || (index === 0 && !!encounter.boss),
			}),
		);
		if (duel) {
			enemyUnits[0].maxHp = Math.round(enemyUnits[0].maxHp * 0.7);
			enemyUnits[0].hp = enemyUnits[0].maxHp;
		}
		if (this.state.difficulty === "story")
			for (const enemy of enemyUnits) {
				enemy.maxHp = Math.round(enemy.maxHp * 0.62);
				enemy.hp = enemy.maxHp;
				enemy.pa = Math.round(enemy.pa * 0.68);
				enemy.ma = Math.round(enemy.ma * 0.68);
			}
		const units = [...playerUnits, ...enemyUnits];
		const guests = [
			...(encounter.guests || []),
			...(encounter.guest
				? [
						typeof encounter.guest === "object"
							? encounter.guest
							: { name: encounter.guest, job: "squire" },
					]
				: encounter.objectiveType === "rescue"
					? [{ name: "Ally", job: "squire" }]
					: []),
		].filter(
			(guest, index, array) =>
				array.findIndex((other) => other.name === guest.name) === index,
		);
		for (const [index, guestSpec] of guests.entries()) {
			const spawn =
				terrain.guestSpawns?.find(
					(position) => position.name === guestSpec.name,
				) || terrain.guestSpawns?.[index];
			units.push(
				this.createUnit({
					...guestSpec,
					id: index ? `guest-${index}` : "guest",
					team: "player",
					guest: true,
					rescueTarget:
						!encounter.guest ||
						guestSpec.name === (encounter.guest.name || encounter.guest),
					level: Math.max(1, level),
					x: spawn?.x ?? 1 + index,
					z: spawn?.z ?? 6,
					ct: 20,
				}),
			);
		}
		const occupied = new Set();
		for (const unit of units) {
			let tile = terrain.tiles.find(
				(cell) =>
					cell.x === unit.x &&
					cell.z === unit.z &&
					!cell.blocked &&
					!occupied.has(pointKey(cell.x, cell.z)),
			);
			if (!tile)
				tile = terrain.tiles
					.filter(
						(cell) => !cell.blocked && !occupied.has(pointKey(cell.x, cell.z)),
					)
					.sort((a, b) => distance(a, unit) - distance(b, unit))[0];
			unit.x = tile.x;
			unit.z = tile.z;
			occupied.add(pointKey(tile.x, tile.z));
			if (unit.boss && encounter.reviveOnce)
				unit.reviveOnce = encounter.reviveOnce;
			for (const status of [
				...(unit.autoStatuses || []),
				...(unit.initialStatuses || []),
			])
				unit.statuses[status] = 99;
		}
		this.state.battle = {
			id: encounter.id,
			encounter,
			width: terrain.width,
			height: terrain.height,
			map: terrain.tiles,
			tiles: terrain.tiles,
			theme: terrain.theme,
			units,
			sourceMapId: terrain.sourceMapId,
			activeId: null,
			selectedId: null,
			phase: "clock",
			action: "move",
			selection: null,
			reachable: [],
			log: [`${encounter.name}. ${this.objectiveText(encounter)}`],
			turnOrder: [],
			round: 1,
			ticks: 0,
			casts: [],
			needsFacing: false,
			switches: 0,
			exitDiscovered: false,
			turns: 0,
			rewards: [],
		};
		this.state.screen = "battle";
		this.state.result = null;
		this._advanceClockToTurn();
		this.save();
		this.emit("battle-start", { encounter });
		return true;
	}

	objectiveText(encounter = this.state.battle?.encounter) {
		if (!encounter) return "";
		if (encounter.objectiveType === "switches")
			return "Open the sluice: occupy both gold switches.";
		if (encounter.objectiveType === "explore")
			return "Defeat the enemies, then find the staircase at the far side. Search glowing treasure tiles.";
		if (encounter.objectiveType === "rescue")
			return `Defeat the enemy and protect ${typeof encounter.guest === "string" ? encounter.guest : encounter.guest?.name || "your ally"}.`;
		if (encounter.objectiveType === "boss" || encounter.boss)
			return `Defeat ${encounter.boss || "the enemy leader"}.`;
		return typeof encounter.objective === "string"
			? encounter.objective
			: "Defeat all enemies. Keep Ramza standing.";
	}

	get activeUnit() {
		return this.state.battle?.units.find(
			(unit) => unit.id === this.state.battle.activeId,
		);
	}
	getUnit(id) {
		return (
			(this.state.screen === "battle" &&
				this.state.battle?.units.find((unit) => unit.id === id)) ||
			this.state.party.find((unit) => unit.id === id)
		);
	}
	getTile(x, z) {
		return this.state.battle?.map.find((tile) => tile.x === x && tile.z === z);
	}
	unitAt(x, z, includeDead = false) {
		return this.state.battle?.units.find(
			(unit) =>
				unit.x === x &&
				unit.z === z &&
				(includeDead || unit.hp > 0) &&
				!unit.removed,
		);
	}
	effectiveSpeed(unit) {
		return Math.max(
			1,
			Math.round(
				unit.speed *
					(unit.statuses.haste ? 1.5 : 1) *
					(unit.statuses.slow ? 0.5 : 1),
			),
		);
	}

	_advanceClockToTurn() {
		const battle = this.state.battle;
		if (!battle || this.state.screen !== "battle") return;
		for (let guard = 0; guard < 250; guard++) {
			if (this.checkOutcome()) return;
			const ready = battle.units
				.filter((unit) => !unit.removed && unit.ct >= 100)
				.sort(
					(a, b) =>
						b.ct - a.ct || b.speed - a.speed || a.id.localeCompare(b.id),
				);
			if (ready.length) {
				const unit = ready[0];
				if (unit.hp <= 0) {
					unit.ct -= 100;
					unit.deadTicks++;
					if (unit.deadTicks >= 4) {
						unit.removed = true;
						this.log(`${unit.name}'s soul becomes a crystal.`);
						const tile = this.getTile(unit.x, unit.z);
						if (tile) tile.crystal = unit.team;
					}
					continue;
				}
				if (
					unit.statuses.stop ||
					unit.statuses.sleep ||
					unit.statuses.petrify ||
					unit.casting
				) {
					unit.ct -= 100;
					this.tickStatuses(unit);
					continue;
				}
				this.tickStatuses(unit);
				if (unit.hp <= 0) continue;
				unit.moved = false;
				unit.acted = false;
				battle.activeId = unit.id;
				battle.selectedId = unit.id;
				battle.phase =
					unit.team === "player" &&
					!unit.guest &&
					!unit.statuses.charm &&
					!unit.statuses.berserk &&
					!unit.statuses.confuse
						? "player"
						: "enemy";
				battle.action = "move";
				battle.selection = { x: unit.x, z: unit.z };
				battle.needsFacing = false;
				battle.turns++;
				battle.round =
					Math.floor(
						battle.turns /
							Math.max(1, battle.units.filter((item) => item.hp > 0).length),
					) + 1;
				this.refreshTacticalState();
				this.emit("turn", { unitId: unit.id });
				return;
			}
			battle.ticks++;
			for (const unit of battle.units)
				if (!unit.removed) unit.ct += this.effectiveSpeed(unit);
			for (const cast of battle.casts) cast.remaining--;
			const due = battle.casts.filter((cast) => cast.remaining <= 0);
			battle.casts = battle.casts.filter((cast) => cast.remaining > 0);
			for (const cast of due) {
				const caster = this.getUnit(cast.unitId);
				const castAbility = caster
					? this.adjustedAbility(caster, cast.abilityId)
					: null;
				if (
					!caster ||
					caster.hp <= 0 ||
					(cast.repeat ? caster.performing : caster.casting) !==
						cast.abilityId ||
					(caster.statuses.silence && castAbility?.mp > 0) ||
					caster.statuses.petrify
				) {
					if (caster) {
						caster.casting = null;
						caster.airborne = false;
						caster.performing = null;
					}
					continue;
				}
				const target = cast.targetId ? this.getUnit(cast.targetId) : null;
				const center =
					target && !target.removed
						? { x: target.x, z: target.z }
						: cast.target;
				caster.casting = null;
				this.resolveAbility(caster, castAbility, center);
				if (
					cast.repeat &&
					caster.hp > 0 &&
					caster.performing === cast.abilityId &&
					this.state.screen === "battle"
				)
					battle.casts.push({ ...cast, remaining: cast.repeat });
				if (this.state.screen !== "battle") return;
			}
		}
		this.log("The battlefield is still.");
		this.finishBattle(false, "No unit can act.");
	}

	tickStatuses(unit) {
		if (unit.statuses.poison) {
			const amount = Math.ceil(unit.maxHp / 10);
			unit.hp = Math.max(0, unit.hp - amount);
			this.log(`${unit.name} suffers ${amount} poison damage.`);
		}
		if (unit.statuses.doom === 1) unit.hp = 0;
		if (unit.statuses.regen && unit.hp > 0)
			unit.hp = Math.min(unit.maxHp, unit.hp + Math.ceil(unit.maxHp / 10));
		for (const status of Object.keys(unit.statuses)) {
			if (
				status === "power" ||
				status === "reraise" ||
				unit.autoStatuses?.includes(status)
			)
				continue;
			unit.statuses[status]--;
			if (unit.statuses[status] <= 0) delete unit.statuses[status];
		}
		for (const status of unit.autoStatuses || []) unit.statuses[status] = 99;
		if (unit.hp <= 0) this.onDeath(unit);
	}

	refreshTacticalState() {
		const battle = this.state.battle;
		if (!battle) return;
		battle.reachable = this.getReachable();
		battle.turnOrder = battle.units
			.filter((unit) => unit.hp > 0 && !unit.removed)
			.sort(
				(a, b) =>
					Math.max(0, 100 - a.ct) / this.effectiveSpeed(a) -
					Math.max(0, 100 - b.ct) / this.effectiveSpeed(b),
			)
			.map((unit) => unit.id);
		battle.needsFacing =
			battle.phase === "player" &&
			!!(this.activeUnit?.moved && this.activeUnit?.acted);
	}

	getReachable(unit = this.activeUnit) {
		const battle = this.state.battle;
		if (
			!battle ||
			!unit ||
			unit.moved ||
			unit.hp <= 0 ||
			unit.statuses.dontmove ||
			unit.statuses.immobilize
		)
			return [];
		const best = new Map([
			[pointKey(unit.x, unit.z), { x: unit.x, z: unit.z, cost: 0, path: [] }],
		]);
		const pending = [...best.values()];
		const flight = this.hasPassive(unit, /^(fly|teleport 2)$/i, "movement");
		const ignoreHeight =
			flight || this.hasPassive(unit, /ignore height/i, "movement");
		const freeWater =
			flight ||
			this.hasPassive(
				unit,
				/float|any ground|any weather|water/i,
				"movement",
			) ||
			unit.statuses.float;
		const teleport = this.hasPassive(unit, /teleport/i, "movement");
		if (teleport || flight) {
			return battle.map
				.filter(
					(tile) =>
						!tile.blocked &&
						(!this.unitAt(tile.x, tile.z, true) ||
							this.unitAt(tile.x, tile.z, true)?.id === unit.id),
				)
				.map((tile) => {
					const cost = distance(unit, tile);
					return {
						x: tile.x,
						z: tile.z,
						cost,
						chance: flight
							? 100
							: clamp(100 - Math.max(0, cost - unit.move) * 10, 0, 100),
						path: [{ x: tile.x, z: tile.z }],
						teleport,
					};
				})
				.filter(
					(tile) => tile.chance > 0 && (teleport || tile.cost <= unit.move),
				);
		}
		while (pending.length) {
			pending.sort((a, b) => a.cost - b.cost);
			const current = pending.shift();
			const source = this.getTile(current.x, current.z);
			for (const [dx, dz] of Object.values(directions)) {
				const tile = this.getTile(current.x + dx, current.z + dz);
				if (
					!tile ||
					(tile.blocked && !flight) ||
					(!ignoreHeight && !this.canStepBetween(unit, source, tile))
				)
					continue;
				const occupant = this.unitAt(tile.x, tile.z);
				if (occupant && occupant.team !== unit.team && !flight) continue;
				if (
					tile.kind === "water" &&
					this.hasPassive(unit, /cannot enter water/i, "movement")
				)
					continue;
				const cost =
					current.cost + (tile.kind === "water" && !freeWater ? 2 : 1);
				const key = pointKey(tile.x, tile.z);
				if (cost > unit.move || (best.has(key) && best.get(key).cost <= cost))
					continue;
				const step = {
					x: tile.x,
					z: tile.z,
					cost,
					path: [...current.path, { x: tile.x, z: tile.z }],
				};
				best.set(key, step);
				pending.push(step);
			}
			for (const landing of this.gapJumps(current, unit)) {
				const occupant = this.unitAt(landing.x, landing.z);
				if (occupant?.team !== unit.team && occupant) continue;
				const cost = current.cost + landing.distance;
				const key = pointKey(landing.x, landing.z);
				if (cost > unit.move || (best.has(key) && best.get(key).cost <= cost))
					continue;
				const step = {
					x: landing.x,
					z: landing.z,
					cost,
					path: [...current.path, { x: landing.x, z: landing.z, jump: true }],
				};
				best.set(key, step);
				pending.push(step);
			}
		}
		return [...best.values()].filter(
			(tile) =>
				!this.getTile(tile.x, tile.z).blocked &&
				(!this.unitAt(tile.x, tile.z, true) ||
					(tile.x === unit.x && tile.z === unit.z)),
		);
	}

	canStepBetween(unit, from, to) {
		const pillar = to.pillar ? to : from.pillar ? from : null;
		if (pillar) {
			if (unit.jump < number(pillar.minimumJump, 5)) return false;
			const steppingStone = this.state.battle?.units.some(
				(ally) =>
					ally.team === unit.team &&
					ally.hp > 0 &&
					ally.id !== unit.id &&
					distance(ally, pillar) === 1 &&
					/worker|dragon|behemoth|hydra|tiamat/i.test(ally.job),
			);
			if (pillar.requiresSteppingStone && !steppingStone) return false;
			return (
				Math.abs(to.height - from.height) <= unit.jump + (steppingStone ? 2 : 0)
			);
		}
		return Math.abs(to.height - from.height) <= unit.jump;
	}

	gapJumps(position, unit) {
		const origin = this.getTile(position.x, position.z);
		if (!origin) return [];
		const landings = [];
		for (const [dx, dz] of Object.values(directions)) {
			if (this.getTile(position.x + dx, position.z + dz)) continue;
			for (let length = 2; length <= Math.floor(unit.jump / 2) + 1; length++) {
				const tile = this.getTile(
					position.x + dx * length,
					position.z + dz * length,
				);
				if (!tile) continue;
				if (!tile.blocked && Math.abs(tile.height - origin.height) <= unit.jump)
					landings.push({ x: tile.x, z: tile.z, distance: length });
				break;
			}
		}
		return landings;
	}

	pathDistances(target, unit) {
		const distances = new Map([[pointKey(target.x, target.z), 0]]);
		const pending = [{ x: target.x, z: target.z, cost: 0 }];
		const ignoresHeight = this.hasPassive(
			unit,
			/fly|teleport|ignore height/i,
			"movement",
		);
		while (pending.length) {
			pending.sort((a, b) => a.cost - b.cost);
			const current = pending.shift();
			const from = this.getTile(current.x, current.z);
			if (!from) continue;
			for (const [dx, dz] of Object.values(directions)) {
				const tile = this.getTile(current.x + dx, current.z + dz);
				if (
					!tile ||
					tile.blocked ||
					(!ignoresHeight && !this.canStepBetween(unit, from, tile))
				)
					continue;
				const cost = current.cost + (tile.kind === "water" ? 2 : 1);
				const key = pointKey(tile.x, tile.z);
				if (distances.has(key) && distances.get(key) <= cost) continue;
				distances.set(key, cost);
				pending.push({ x: tile.x, z: tile.z, cost });
			}
			for (const landing of this.gapJumps(current, unit)) {
				const cost = current.cost + landing.distance;
				const key = pointKey(landing.x, landing.z);
				if (distances.has(key) && distances.get(key) <= cost) continue;
				distances.set(key, cost);
				pending.push({ x: landing.x, z: landing.z, cost });
			}
		}
		return distances;
	}

	selectUnit(id) {
		const unit = this.getUnit(id);
		if (!unit || !this.state.battle) return false;
		this.state.battle.selectedId = id;
		this.state.battle.selection = { x: unit.x, z: unit.z };
		this.emit();
		return true;
	}
	setAction(id) {
		const unit = this.activeUnit;
		if (
			!unit ||
			this.state.screen !== "battle" ||
			this.state.battle.phase !== "player"
		)
			return false;
		if (id === "wait") return this.wait();
		if (id === "move" && unit.moved)
			return this.notice("This unit has already moved.");
		if (id !== "move" && unit.acted)
			return this.notice(
				"This unit has already acted. Choose a facing to end the turn.",
			);
		if (
			id !== "move" &&
			!this.getActions(unit).some(
				(action) => action.id === id && !action.disabled,
			)
		)
			return false;
		this.state.battle.action = id;
		this.refreshTacticalState();
		this.emit("action-selected", { abilityId: id });
		return true;
	}
	selectTile(x, z) {
		const battle = this.state.battle;
		const tile = this.getTile(x, z);
		if (this.state.screen !== "battle" || !battle || !tile) return false;
		battle.selection = { x, z };
		const occupant = this.unitAt(x, z, true);
		if (occupant) battle.selectedId = occupant.id;
		if (battle.phase !== "player") {
			this.emit();
			return false;
		}
		const result =
			battle.action === "move"
				? this.moveUnit(this.activeUnit, x, z)
				: this.performAction(this.activeUnit, battle.action, { x, z });
		this.refreshTacticalState();
		this.emit("selection");
		return result;
	}

	moveUnit(unit, x, z) {
		if (!unit || unit.moved || unit.hp <= 0) return false;
		const target = this.getReachable(unit).find(
			(tile) => tile.x === x && tile.z === z,
		);
		if (!target || target.cost === 0) return false;
		if (target.teleport && this.random() * 100 >= target.chance) {
			unit.moved = true;
			this.log(`${unit.name}'s teleport fails (${target.chance}% chance).`);
			this.emit("teleport-failed", { unitId: unit.id });
			return false;
		}
		const from = { x: unit.x, z: unit.z };
		unit.facing = this.facingToward(unit, target);
		unit.x = x;
		unit.z = z;
		unit.moved = true;
		const tile = this.getTile(x, z);
		const concealedTreasure = typeof tile.treasure === "object";
		if (
			tile.treasure &&
			(typeof tile.treasure !== "object" ||
				this.hasPassive(unit, /move.find item/i, "movement"))
		) {
			const treasure = tile.treasure;
			delete tile.treasure;
			if (typeof treasure === "object" && unit.team === "player") {
				const itemName =
					this.random() * 100 >= unit.brave
						? treasure.rare || treasure.name || treasure.item
						: treasure.common ||
							treasure.rare ||
							treasure.name ||
							treasure.item;
				const itemId =
					treasure.itemId ||
					(itemName === treasure.rare ? treasure.rareId : treasure.commonId) ||
					ITEMS.find((item) => item.name === itemName)?.id;
				if (itemId) {
					this.state.inventory[itemId] =
						number(this.state.inventory[itemId]) + 1;
					this.log(
						`${unit.name} discovers ${itemsById.get(itemId)?.name || itemName}.`,
					);
					this.emit("pickup", { unitId: unit.id, itemId });
				}
			} else {
				const amount = 60 + unit.level * 12;
				if (unit.team === "player") this.state.gil += amount;
				this.log(`${unit.name} discovers a chest: ${amount} gil.`);
				this.emit("pickup", { unitId: unit.id, amount });
			}
		}
		if (tile.crystal && unit.hp > 0) {
			unit.hp = unit.maxHp;
			unit.mp = unit.maxMp;
			delete tile.crystal;
			this.log(`${unit.name} gathers a crystal. HP and MP restored.`);
		}
		if (tile.kind === "switch" && !tile.switch && unit.team === "player") {
			tile.switch = true;
			this.state.battle.switches++;
			this.log(
				`${unit.name} opens sluice gate ${this.state.battle.switches}/2.`,
			);
		}
		if (tile.exit && unit.team === "player") {
			this.state.battle.exitDiscovered = true;
			this.log("The staircase to the next depth is open.");
		}
		if (
			tile.trap &&
			!concealedTreasure &&
			!unit.statuses.float &&
			!this.hasPassive(unit, /float|fly/i, "movement")
		) {
			const trap = tile.trap.toLowerCase();
			if (/sleep/.test(trap)) unit.statuses.sleep = 3;
			else if (/poison/.test(trap)) unit.statuses.poison = 3;
			else if (/degenerator/.test(trap)) {
				unit.level = Math.max(1, unit.level - 1);
				this.recalculate(unit);
			} else {
				const damage = Math.ceil(unit.maxHp / (/death/.test(trap) ? 3 : 5));
				unit.hp = Math.max(0, unit.hp - damage);
				this.emit("hit", { targetId: unit.id, amount: damage });
				if (unit.hp <= 0) this.onDeath(unit);
			}
			this.log(`${unit.name} triggers ${tile.trap}.`);
		}
		if (this.hasPassive(unit, /move.hp up/i, "movement"))
			unit.hp = Math.min(unit.maxHp, unit.hp + Math.ceil(unit.maxHp / 10));
		if (this.hasPassive(unit, /move.mp up/i, "movement"))
			unit.mp = Math.min(unit.maxMp, unit.mp + Math.ceil(unit.maxMp / 10));
		if (this.hasPassive(unit, /move.get exp/i, "movement"))
			unit.exp += target.cost;
		if (this.hasPassive(unit, /move.get jp/i, "movement")) {
			unit.jp[unit.job] = number(unit.jp[unit.job]) + target.cost;
			unit.jobExp[unit.job] = number(unit.jobExp[unit.job]) + target.cost;
		}
		this.log(`${unit.name} moves.`);
		this.emit("move", {
			unitId: unit.id,
			from,
			to: { x, z },
			path: target.path,
		});
		this.state.battle.action = unit.acted ? "move" : "attack";
		this.checkOutcome();
		return true;
	}

	getActions(unit = this.activeUnit) {
		if (!unit) return [];
		const ids =
			unit.statuses.berserk || unit.statuses.frog || unit.statuses.chicken
				? ["attack"]
				: ["attack", ...(unit.learned || [])];
		if (this.hasPassive(unit, /^defend$/i, "support")) ids.push("defend");
		if (
			jobsById.get(unit.job)?.monster &&
			this.state.battle?.units.some(
				(ally) =>
					ally.team === unit.team &&
					ally.hp > 0 &&
					distance(ally, unit) <= 3 &&
					this.hasPassive(ally, /monster skill/i, "support"),
			)
		)
			ids.push(...(jobsById.get(unit.job)?.abilities || []));
		if (unit.job === "lancer" || unit.secondaryJob === "lancer")
			ids.push("jump");
		if (unit.job === "calculator" || unit.secondaryJob === "calculator") {
			const fields = (unit.learned || [])
				.map((id) => abilityData(id)?.name?.toLowerCase())
				.filter((name) => ["ct", "level", "exp", "height"].includes(name));
			const divisors = (unit.learned || [])
				.map((id) => abilityData(id)?.name?.toLowerCase())
				.filter((name) => ["3", "4", "5", "prime number"].includes(name));
			const spells = (unit.learned || []).filter(
				(id) =>
					abilityData(id)?.calculator &&
					["magic", "heal", "status", "revive"].includes(abilityData(id)?.kind),
			);
			for (const field of fields)
				for (const divisor of divisors)
					for (const spell of spells)
						ids.push(
							`math:${field}:${divisor === "prime number" ? "prime" : divisor}:${spell}`,
						);
		}
		const commands = [
			...(jobsById.get(unit.job)?.abilities || []),
			...(jobsById.get(unit.secondaryJob)?.abilities || []),
		];
		const seenNames = new Set();
		return [...new Set(ids)]
			.map((id) => this.adjustedAbility(unit, id))
			.filter((ability) => {
				if (
					!ability ||
					ability.kind === "passive" ||
					seenNames.has(ability.name) ||
					!(
						!ability.job ||
						["all", "monster", unit.job, unit.secondaryJob].includes(
							ability.job,
						) ||
						commands.includes(ability.id) ||
						ability.math
					)
				)
					return false;
				seenNames.add(ability.name);
				return true;
			})
			.map((ability) => {
				const item = ability.consumable ? this.consumableId(ability) : null;
				const stock =
					unit.team === "player" && !unit.guest
						? number(this.state.inventory[item])
						: number(unit.items?.[ability.consumable]);
				const unavailable =
					unit.acted ||
					unit.statuses.dontact ||
					unit.mp < ability.mp ||
					!!(
						unit.statuses.silence &&
						["magic", "heal", "revive", "status"].includes(ability.kind) &&
						ability.mp > 0
					) ||
					(item && stock <= 0) ||
					!this.abilityRequirementsMet(unit, ability);
				return {
					...ability,
					range: ability.id === "attack" ? unit.weaponRange : ability.range,
					disabled: !!unavailable,
					reason: unit.acted
						? "Already acted"
						: unit.mp < ability.mp
							? "Not enough MP"
							: item && !this.state.inventory[item]
								? "No items remaining"
								: unavailable
									? "Silenced"
									: "",
					count: item ? stock : undefined,
				};
			});
	}
	consumableId(ability) {
		return findItem(
			ability.consumable === "phoenix-down"
				? "phoenix down"
				: ability.consumable,
		);
	}
	facingToward(unit, target) {
		const dx = target.x - unit.x,
			dz = target.z - unit.z;
		if (Math.abs(dx) > Math.abs(dz)) return dx > 0 ? "east" : "west";
		return dz > 0 ? "south" : dz < 0 ? "north" : unit.facing;
	}
	attackSide(attacker, target) {
		const relative = this.facingToward(target, attacker);
		const opposite = {
			north: "south",
			east: "west",
			south: "north",
			west: "east",
		};
		return relative === target.facing
			? "front"
			: relative === opposite[target.facing]
				? "rear"
				: "side";
	}
	getCompatibility(caster, target) {
		const a = ZODIAC_SIGNS.indexOf(caster.zodiac),
			b = ZODIAC_SIGNS.indexOf(target.zodiac);
		if (a < 0 || b < 0 || caster.id === target.id)
			return { label: "Neutral", multiplier: 1 };
		const difference = (a - b + 12) % 12;
		if ([4, 8].includes(difference)) return { label: "Good", multiplier: 1.25 };
		if ([3, 9].includes(difference)) return { label: "Bad", multiplier: 0.75 };
		if (difference === 6) {
			if (caster.sex === "monster" || target.sex === "monster")
				return { label: "Bad", multiplier: 0.75 };
			return caster.sex === target.sex
				? { label: "Worst", multiplier: 0.5 }
				: { label: "Best", multiplier: 1.5 };
		}
		return { label: "Neutral", multiplier: 1 };
	}
	inRange(unit, ability, target) {
		const tile = this.getTile(target.x, target.z);
		if (!tile) return false;
		const origin = this.getTile(unit.x, unit.z);
		if (ability.global) return true;
		const range =
			ability.id === "attack"
				? unit.weaponRange
				: ability.id === "jump"
					? Math.max(
							3,
							...(unit.learned || [])
								.map((id) => abilityData(id))
								.filter((learned) => learned?.effect === "jump-range")
								.map((learned) => learned.amount),
						)
					: ability.range;
		const elevationBonus =
			ability.id === "attack" && range >= 3
				? Math.max(0, Math.floor((origin.height - tile.height) / 2))
				: 0;
		return (
			distance(unit, target) <= range + elevationBonus &&
			(range > 1 || Math.abs(tile.height - origin.height) <= 2)
		);
	}
	affectedUnits(ability, target, caster = this.activeUnit) {
		return this.state.battle.units.filter((unit) => {
			if (
				unit.removed ||
				unit.airborne ||
				(ability.kind === "revive" ? unit.hp > 0 : unit.hp <= 0)
			)
				return false;
			if (["bard", "dancer"].includes(ability.job) && unit.statuses.sleep)
				return false;
			if (
				(ability.target === "ally" && unit.team !== caster?.team) ||
				(ability.target === "enemy" && unit.team === caster?.team)
			)
				return false;
			if (ability.math) {
				const value =
					ability.math.field === "height"
						? Math.floor(this.getTile(unit.x, unit.z).height)
						: unit[ability.math.field];
				if (ability.math.divisor === "prime")
					return (
						value >= 2 &&
						!Array.from(
							{ length: Math.max(0, Math.floor(Math.sqrt(value)) - 1) },
							(_, i) => i + 2,
						).some((divisor) => value % divisor === 0)
					);
				return value % Number(ability.math.divisor) === 0;
			}
			return (
				ability.global ||
				(distance(unit, target) <= ability.aoe &&
					Math.abs(
						this.getTile(unit.x, unit.z).height -
							this.getTile(target.x, target.z).height,
					) <= 3)
			);
		});
	}
	predictEffect(unit, ability, target) {
		const side = this.attackSide(unit, target);
		const magic =
			["magic", "heal", "revive", "status"].includes(ability.kind) &&
			!ability.fixed &&
			!ability.consumable;
		const faith =
			magic &&
			!["Murasame", "Chakra", "Life Song", "Angel Song"].includes(ability.name)
				? (((unit.faith / 100) * target.faith) / 100) * 2.0
				: 1;
		const height =
			this.getTile(unit.x, unit.z).height -
			this.getTile(target.x, target.z).height;
		const compatibility = this.getCompatibility(unit, target);
		const zodiacApplies =
			!ability.fixed &&
			!ability.consumable &&
			!["Murasame", "Self Destruct"].includes(ability.name) &&
			!/gravity|gravi|demi|quarter|hurricane|self.destruct/i.test(
				ability.name,
			) &&
			!["restore-mp", "restore-all", "cleanse", "ct"].includes(ability.effect);
		let hit = ability.hit;
		let amount = 0;
		if (ability.kind === "physical") {
			hit = clamp(
				hit -
					(side === "front"
						? target.evasion
						: side === "side"
							? target.evasion / 2
							: 0) -
					(unit.statuses.blind ? 40 : 0),
				10,
				100,
			);
			amount = Math.round(
				(((unit.pa * 2.2 +
					number(unit.weaponPower, 4) * 1.2 +
					number(unit.statuses.power) * 3) *
					ability.power) /
					100) *
					(1 - target.defense) *
					(height > 0 ? 1.1 : 1) *
					(side === "rear" ? 1.16 : 1) *
					(target.statuses.protect ? 0.65 : 1),
			);
			if (
				/monk|mime/.test(unit.job) ||
				this.hasPassive(unit, /martial arts/i, "support")
			)
				amount = Math.round(
					((amount * unit.brave) / 65) * (!unit.weaponPower ? 1.35 : 1),
				);
			if (
				ability.id === "attack" &&
				(unit.job === "ninja" ||
					this.hasPassive(unit, /two swords/i, "support"))
			)
				amount = Math.round(amount * 1.7);
			if (
				ability.id === "attack" &&
				this.hasPassive(unit, /two hands/i, "support")
			)
				amount = Math.round(amount * 1.5);
			if (this.hasPassive(unit, /concentrate/i, "support")) hit = 100;
			if (unit.statuses.berserk) amount = Math.round(amount * 1.5);
			if (unit.statuses.frog || unit.statuses.chicken)
				amount = Math.max(1, Math.round(amount * 0.15));
		} else if (ability.kind === "magic") {
			amount = Math.round(
				((unit.ma * 3.7 * ability.power) / 100) *
					faith *
					(target.statuses.shell ? 0.65 : 1),
			);
			if (target.casting) amount = Math.round(amount * 1.25);
			if (this.hasPassive(target, /magic defend/i, "support"))
				amount = Math.round(amount * 0.67);
		} else if (ability.kind === "heal") {
			amount = Math.round(
				ability.fixed || ability.consumable
					? ability.power
					: ((unit.ma * 4 * ability.power) / 100) * faith,
			);
			if (ability.name === "Chakra") amount = unit.pa * 5;
			if (ability.name === "Life Song") amount = unit.ma + 10;
			hit = 100;
		} else if (ability.kind === "revive") {
			amount = Math.round((target.maxHp * clamp(ability.power, 20, 100)) / 100);
			hit = ability.consumable ? 100 : clamp(Math.round(96 * faith), 50, 100);
		} else if (ability.kind === "status")
			hit = clamp(Math.round(hit * faith), 15, 95);
		if (zodiacApplies) {
			if (["physical", "magic", "heal"].includes(ability.kind))
				amount = Math.round(amount * compatibility.multiplier);
			if (["status", "revive"].includes(ability.kind) && !ability.consumable)
				hit = clamp(Math.round(hit * compatibility.multiplier), 0, 100);
		}
		if (target.statuses.defend) {
			hit = Math.max(10, hit - 20);
			amount = Math.round(amount * 0.75);
		}
		if (target.statuses.invisible) hit = Math.max(15, hit - 35);
		if (target.statuses.sleep && ["physical", "magic"].includes(ability.kind))
			hit = 100;
		const bow = /bow/i.test(itemsById.get(unit.equipment.weapon)?.type || "");
		if (
			ability.kind === "physical" &&
			((this.hasPassive(target, /blade grasp/i, "reaction") && !bow) ||
				(this.hasPassive(target, /arrow guard/i, "reaction") && bow))
		)
			hit = Math.round(hit * (1 - target.brave / 100));
		if (
			ability.kind === "physical" &&
			this.hasPassive(target, /weapon guard|abandon/i, "reaction")
		)
			hit = Math.max(5, hit - 20);
		if (
			ability.job === "mediator" &&
			this.hasPassive(target, /finger guard/i, "reaction")
		)
			hit = Math.round(hit * (1 - target.brave / 100));
		if (
			ability.name === "Seal Evil" &&
			!/undead|skeleton|ghost|ghoul|bone|revenant|living-bone/i.test(target.job)
		)
			hit = 0;
		if (
			ability.job === "mediator" &&
			jobsById.get(target.job)?.monster &&
			unit.job !== "mediator" &&
			!this.hasPassive(unit, /monster talk/i, "support")
		)
			hit = 0;
		let absorbed = false;
		if (ability.element && ["magic", "physical"].includes(ability.kind)) {
			const element = String(ability.element).toLowerCase();
			const defense = (target.elementEffects || []).join(";");
			const offense = (unit.elementEffects || []).join(";");
			if (new RegExp(`half:[^;]*${element}`).test(defense))
				amount = Math.round(amount / 2);
			if (new RegExp(`weak:[^;]*${element}`).test(defense))
				amount = Math.round(amount * 1.5);
			if (new RegExp(`strengthen:[^;]*${element}`).test(offense))
				amount = Math.round(amount * 1.25);
			absorbed = new RegExp(`absorb:[^;]*${element}`).test(defense);
		}
		return {
			targetId: target.id,
			name: target.name,
			damage: Math.max(1, amount),
			amount: Math.max(1, amount),
			hit: Math.round(hit),
			chance: Math.round(hit),
			side,
			absorbed,
			compatibilityLabel: compatibility.label,
			compatibilityMultiplier: compatibility.multiplier,
			compatibilityApplied: zodiacApplies,
			healing: ["heal", "revive"].includes(ability.kind) || absorbed,
			status: ability.status,
			friendlyFire:
				unit.team === target.team &&
				["physical", "magic", "status"].includes(ability.kind),
		};
	}
	getPreview(
		x,
		z,
		abilityId = this.state.battle?.action,
		unit = this.activeUnit,
	) {
		if (!unit || !this.state.battle || !this.getTile(x, z)) return null;
		if (abilityId === "move") {
			const move = this.getReachable(unit).find(
				(tile) => tile.x === x && tile.z === z,
			);
			return {
				valid: !!move,
				label: move
					? `Move · ${move.cost}/${unit.move}`
					: "Out of movement range",
				targets: [],
				cost: move?.cost || 0,
			};
		}
		const ability = this.adjustedAbility(unit, abilityId);
		if (!ability) return null;
		const inRange = this.inRange(unit, ability, { x, z });
		const targets = this.affectedUnits(ability, { x, z }, unit).map((target) =>
			this.predictEffect(unit, ability, target),
		);
		const action = this.getActions(unit).find(
			(entry) => entry.id === abilityId,
		);
		const reason =
			!action || action.disabled
				? action?.reason || "This action is unavailable."
				: !inRange
					? "This tile is outside the action’s range."
					: !targets.length
						? "Choose a tile with a valid target."
						: "";
		const valid = !reason;
		return {
			ability,
			valid,
			reason,
			label: valid ? ability.name : reason,
			targets,
			damage: targets[0]?.damage || 0,
			hit: targets[0]?.hit ?? 100,
			chance: targets[0]?.hit ?? 100,
			compatibilityLabel: targets[0]?.compatibilityLabel || "Neutral",
			compatibilityMultiplier: targets[0]?.compatibilityMultiplier ?? 1,
			cost: ability.mp,
			ct: ability.ct,
			aoe: ability.aoe,
			friendlyFire: targets.some((target) => target.friendlyFire),
		};
	}

	performAction(unit, abilityId, target, { ai = false } = {}) {
		if (!unit || unit.acted || unit.hp <= 0 || unit.statuses.dontact)
			return false;
		const ability = this.adjustedAbility(unit, abilityId);
		if (
			!ability ||
			ability.kind === "passive" ||
			unit.mp < ability.mp ||
			!this.inRange(unit, ability, target) ||
			!this.abilityRequirementsMet(unit, ability)
		)
			return false;
		if (unit.statuses.silence && ability.mp > 0) return false;
		if (
			!ai &&
			!this.getActions(unit).some(
				(entry) => entry.id === abilityId && !entry.disabled,
			)
		)
			return false;
		const affected = this.affectedUnits(ability, target, unit);
		if (!affected.length) return false;
		if (ability.consumable) {
			if (unit.team === "player" && !unit.guest) {
				const id = this.consumableId(ability);
				if (!this.state.inventory[id]) return false;
				this.state.inventory[id]--;
			} else {
				if (!unit.items?.[ability.consumable]) return false;
				unit.items[ability.consumable]--;
			}
		}
		if (unit.performing) {
			unit.performing = null;
			this.state.battle.casts = this.state.battle.casts.filter(
				(cast) => cast.unitId !== unit.id || !cast.repeat,
			);
		}
		unit.mp -= ability.mp;
		unit.acted = true;
		delete unit.statuses.invisible;
		if (ability.effect === "throw") {
			const thrown = this.throwItem(unit, ability);
			ability.thrownItem = thrown?.id;
			ability.power += number(thrown?.power) * 3;
		}
		unit.facing = this.facingToward(unit, target);
		this.state.totalActions++;
		if (ability.ct > 0) {
			const performance = ["bard", "dancer"].includes(ability.job);
			unit.casting = performance ? null : abilityId;
			if (performance) unit.performing = abilityId;
			if (ability.effect === "leap") unit.airborne = true;
			this.state.battle.casts.push({
				unitId: unit.id,
				abilityId,
				target: { ...target },
				targetId: this.unitAt(target.x, target.z, true)?.id,
				remaining: ability.ct,
				repeat: performance ? ability.ct : 0,
			});
			this.log(`${unit.name} begins ${ability.name} · ${ability.ct} CT.`);
			this.emit("cast", { unitId: unit.id, ability: ability.name, to: target });
		} else this.resolveAbility(unit, ability, target);
		if (this.state.screen !== "battle") return true;
		this.awardAction(unit);
		this.refreshTacticalState();
		this.emit("action", { unitId: unit.id, abilityId, target });
		return true;
	}

	resolveAbility(
		unit,
		ability,
		center,
		{ reaction = false, mimic = false } = {},
	) {
		if (!ability || !this.state.battle) return;
		unit.airborne = false;
		const targets = this.affectedUnits(ability, center, unit);
		this.log(`${unit.name} uses ${ability.name}.`);
		for (let target of targets) {
			if (
				!reaction &&
				ability.kind === "physical" &&
				distance(unit, target) <= target.weaponRange &&
				this.hasPassive(target, /hamed[o]?/i, "reaction") &&
				this.random() * 100 < target.brave
			) {
				this.log(`${target.name} intercepts the attack with Hamedo.`);
				this.resolveAbility(
					target,
					{ ...this.adjustedAbility(target, "attack"), hit: 100 },
					unit,
					{ reaction: true },
				);
				continue;
			}
			if (
				!reaction &&
				ability.effect === "throw" &&
				this.hasPassive(target, /^catch$/i, "reaction") &&
				this.random() * 100 < target.brave
			) {
				if (ability.thrownItem && target.team === "player")
					this.state.inventory[ability.thrownItem] =
						number(this.state.inventory[ability.thrownItem]) + 1;
				this.log(`${target.name} catches the projectile.`);
				continue;
			}
			if (
				target.statuses.reflect &&
				ability.kind === "magic" &&
				ability.reflectable !== false &&
				target.id !== unit.id
			) {
				this.log(`${target.name} reflects the spell!`);
				target = unit;
			}
			const effect = this.predictEffect(unit, ability, target);
			if (this.random() * 100 >= effect.hit) {
				this.log(`${target.name} evades.`);
				this.emit("hit", {
					unitId: unit.id,
					targetId: target.id,
					amount: 0,
					miss: true,
					ability: ability.name,
				});
				continue;
			}
			const name = ability.name.toLowerCase();
			if (effect.absorbed) {
				target.hp = Math.min(target.maxHp, target.hp + effect.damage);
				this.log(`${target.name} absorbs ${effect.damage} HP.`);
				this.emit("heal", { targetId: target.id, amount: effect.damage });
				continue;
			}
			if (ability.effect === "restore-mp") {
				const amount = Math.min(
					target.maxMp - target.mp,
					ability.fixed ? ability.power : Math.max(12, effect.damage),
				);
				target.mp += amount;
				this.log(`${target.name} recovers ${amount} MP.`);
				this.emit("heal", {
					unitId: unit.id,
					targetId: target.id,
					amount,
					resource: "mp",
				});
				continue;
			}
			if (ability.effect === "restore-all") {
				target.hp = target.maxHp;
				target.mp = target.maxMp;
				this.log(`${target.name} is fully restored.`);
				this.emit("heal", {
					unitId: unit.id,
					targetId: target.id,
					amount: target.maxHp,
				});
				continue;
			}
			if (ability.effect === "cleanse") {
				for (const status of Object.keys(target.statuses))
					if (
						![
							"power",
							"haste",
							"protect",
							"shell",
							"regen",
							"reraise",
						].includes(status)
					)
						delete target.statuses[status];
				this.log(`${target.name}'s afflictions are cured.`);
				this.emit("heal", { targetId: target.id, amount: 0 });
				continue;
			}
			if (ability.effect === "dispel") {
				for (const status of [
					"haste",
					"protect",
					"shell",
					"regen",
					"reraise",
					"reflect",
					"power",
				])
					delete target.statuses[status];
				this.log(`${target.name}'s protections fade.`);
				continue;
			}
			if (ability.effect === "stat") {
				const stat = ability.stat || "pa";
				target[stat] = clamp(
					number(target[stat]) + number(ability.amount, 1),
					1,
					["brave", "faith"].includes(stat) ? 97 : stat === "speed" ? 22 : 99,
				);
				this.log(
					`${target.name}: ${stat.toUpperCase()} ${ability.amount >= 0 ? "+" : ""}${ability.amount}.`,
				);
				continue;
			}
			if (ability.effect === "scream") {
				target.pa += 1;
				target.ma += 1;
				target.speed = Math.min(22, target.speed + 1);
				target.brave = Math.min(97, target.brave + 5);
				this.log(`${target.name}'s strength and resolve rise.`);
				continue;
			}
			if (ability.effect === "ct") {
				target.ct = clamp(target.ct + number(ability.amount, 30), 0, 160);
				this.log(`${target.name}'s CT changes.`);
				continue;
			}
			if (["steal", "steal-gil", "steal-exp"].includes(ability.effect)) {
				this.steal(unit, target, name);
				continue;
			}
			if (ability.effect === "break") {
				this.breakEquipment(target, name);
				continue;
			}
			if (ability.effect === "invite") {
				this.invite(unit, target);
				continue;
			}
			if (ability.kind === "heal") {
				const actual = Math.min(target.maxHp - target.hp, effect.damage);
				target.hp += actual;
				if (/esuna|stigma|remedy|antidote|purify/.test(name))
					target.statuses = {};
				if (/chakra|ether/.test(name))
					target.mp = Math.min(
						target.maxMp,
						target.mp + Math.ceil(effect.damage / 2),
					);
				this.log(`${target.name} recovers ${actual} HP.`);
				this.emit("heal", {
					unitId: unit.id,
					targetId: target.id,
					amount: actual,
					ability: ability.name,
				});
				if (
					this.hasPassive(target, /distribute/i, "reaction") &&
					effect.damage > actual &&
					this.random() * 100 < target.brave
				) {
					const friends = this.state.battle.units.filter(
						(ally) =>
							ally.team === target.team && ally.hp > 0 && ally.id !== target.id,
					);
					const share = Math.floor(
						(effect.damage - actual) / Math.max(1, friends.length),
					);
					for (const ally of friends)
						ally.hp = Math.min(ally.maxHp, ally.hp + share);
					this.log(`${target.name} distributes ${share} HP to each ally.`);
				}
			} else if (ability.kind === "revive") {
				target.hp = effect.damage;
				target.deadTicks = 0;
				target.statuses = {};
				target.ct = Math.min(target.ct, 60);
				this.log(`${target.name} returns to battle.`);
				this.emit("heal", {
					unitId: unit.id,
					targetId: target.id,
					amount: effect.damage,
					ability: ability.name,
				});
			} else if (ability.kind === "buff") {
				if (/yell|scream|speed/.test(name))
					target.speed = Math.min(22, target.speed + 1);
				else if (/cheer|brave/.test(name))
					target.brave = Math.min(97, target.brave + 4);
				else if (/faith|preach/.test(name))
					target.faith = Math.min(97, target.faith + 4);
				else if (ability.status && ability.status !== "power")
					target.statuses[ability.status] = 4;
				else
					target.statuses.power = Math.min(
						8,
						number(target.statuses.power) + 1,
					);
				this.log(`${target.name} gains ${ability.status || "power"}.`);
				this.emit("buff", {
					unitId: unit.id,
					targetId: target.id,
					ability: ability.name,
				});
				if (name === "kiyomori") target.statuses.shell = 4;
				if (name === "masamune") target.statuses.regen = 4;
				if (name === "golem") target.golemShield = unit.maxHp;
				for (const status of ability.statuses || [])
					target.statuses[statusId(status)] = 4;
			} else if (ability.kind === "status") {
				const status =
					ability.status ||
					(ability.statusOptions?.length
						? statusId(
								ability.statusOptions[
									Math.floor(this.random() * ability.statusOptions.length)
								],
							)
						: name === "nameless song"
							? ["reraise", "regen", "protect", "shell", "reflect"][
									Math.floor(this.random() * 5)
								]
							: "slow");
				if (/steal/.test(name)) this.steal(unit, target, name);
				else if (/break|ruin/.test(name)) this.breakEquipment(target, name);
				else if (/invite|entice/.test(name)) this.invite(unit, target);
				else if (/^(death|petrify sword)$/.test(name) && !target.boss) {
					target.hp = 0;
					this.onDeath(target);
				} else if (!target.immunities?.includes(status)) {
					target.statuses[status] =
						target.boss &&
						["petrify", "stop", "sleep", "charm"].includes(status)
							? 1
							: 3;
					this.log(`${target.name}: ${status}.`);
				} else this.log(`${target.name} is immune to ${status}.`);
				this.emit("status", { unitId: unit.id, targetId: target.id, status });
			} else {
				let damage = effect.damage;
				if (/gravity|gravi|demi/.test(name))
					damage = Math.round(target.hp * (name.includes("2") ? 0.5 : 0.25));
				if (
					["damage-mp", "drain-mp"].includes(ability.effect) ||
					/aspir|osmose/.test(name)
				) {
					const drained = Math.min(target.mp, damage);
					target.mp -= drained;
					if (ability.effect !== "damage-mp")
						unit.mp = Math.min(unit.maxMp, unit.mp + drained);
					this.log(`${target.name} loses ${drained} MP.`);
				} else {
					if (ability.kind === "physical" && target.golemShield > 0) {
						const blocked = Math.min(target.golemShield, damage);
						target.golemShield -= blocked;
						damage -= blocked;
						this.log(`Golem absorbs ${blocked} damage for ${target.name}.`);
					}
					if (
						!reaction &&
						damage > 0 &&
						target.mp > 0 &&
						this.hasPassive(target, /mp switch/i, "reaction") &&
						this.random() * 100 < target.brave
					) {
						target.mp = Math.max(0, target.mp - damage);
						this.log(`${target.name} redirects ${damage} damage to MP.`);
						damage = 0;
					}
					target.hp = Math.max(0, target.hp - damage);
					delete target.statuses.sleep;
					if (ability.kind === "physical") {
						delete target.statuses.charm;
						delete target.statuses.confuse;
					}
					if (
						ability.effect === "drain" ||
						/drain|night sword|blood/.test(name)
					)
						unit.hp = Math.min(unit.maxHp, unit.hp + damage);
					this.log(
						`${target.name} takes ${damage} damage${effect.side === "rear" && ability.kind === "physical" ? " from behind" : ""}.`,
					);
					this.emit("hit", {
						unitId: unit.id,
						targetId: target.id,
						amount: damage,
						ability: ability.name,
						element: ability.element,
					});
					if (
						target.hp > 0 &&
						target.team === "player" &&
						((name === "ultima" && target.id === "ramza") ||
							(name === "zodiac" && target.job === "summoner")) &&
						!target.learned.includes(ability.id)
					) {
						target.learned.push(ability.id);
						this.log(
							`${target.name} learns ${ability.name} by surviving its power.`,
						);
					}
					if (
						ability.status &&
						target.hp > 0 &&
						!target.immunities?.includes(ability.status) &&
						this.random() < 0.35
					)
						target.statuses[ability.status] = 3;
					const onHit =
						ability.id === "attack"
							? itemsById.get(unit.equipment.weapon)?.onHitStatus
							: null;
					if (
						onHit &&
						target.hp > 0 &&
						!target.immunities?.includes(statusId(onHit.status)) &&
						this.random() * 100 < number(onHit.chance, 25)
					)
						target.statuses[statusId(onHit.status)] = 3;
					if (target.hp <= 0) {
						this.onDeath(target);
						if (
							unit.team === "player" &&
							this.hasPassive(unit, /secret hunt/i, "support")
						)
							this.poach(target);
					} else {
						if (
							target.hp <= target.maxHp * 0.2 &&
							this.hasPassive(unit, /^train$/i, "support") &&
							jobsById.get(target.job)?.monster
						)
							this.invite(unit, target);
						if (!reaction) this.triggerReaction(target, unit, ability, damage);
					}
				}
			}
		}
		const katana = this.drawOutItem(ability);
		if (
			katana &&
			unit.team === "player" &&
			number(this.state.inventory[katana.id]) > 0 &&
			this.random() < 0.15
		) {
			this.state.inventory[katana.id]--;
			this.log(`${katana.name} breaks after releasing its spirit.`);
		}
		if (
			!mimic &&
			!reaction &&
			!["mime", "calculator", "samurai", "ninja"].includes(ability.job) &&
			!ability.consumable &&
			this.state.screen === "battle"
		) {
			for (const mimeUnit of this.state.battle.units.filter(
				(ally) =>
					ally.job === "mime" &&
					ally.team === unit.team &&
					ally.id !== unit.id &&
					ally.hp > 0 &&
					!ally.statuses.stop,
			)) {
				const relative = {
					x: mimeUnit.x + center.x - unit.x,
					z: mimeUnit.z + center.z - unit.z,
				};
				if (this.getTile(relative.x, relative.z)) {
					this.log(`${mimeUnit.name} mimics ${unit.name}.`);
					this.resolveAbility(
						mimeUnit,
						{ ...ability, mp: 0, ct: 0 },
						relative,
						{ mimic: true },
					);
				}
			}
		}
		this.checkOutcome();
	}

	triggerReaction(target, attacker, ability, damage) {
		const reaction = abilityData(target.abilitySlots?.reaction);
		if (!reaction || target.hp <= 0 || this.random() * 100 >= target.brave)
			return false;
		const name = reaction.name.toLowerCase();
		const physical = ability.kind === "physical";
		const magic = ability.kind === "magic";
		const critical = target.hp <= target.maxHp / 5;
		let triggered = true;
		if (name === "auto potion" && damage > 0) {
			const names = ["Potion", "Hi-Potion", "X-Potion"];
			const item = names
				.map((potion) => ITEMS.find((entry) => entry.name === potion))
				.find(
					(entry) =>
						entry &&
						(target.team === "player"
							? number(this.state.inventory[entry.id])
							: number(target.items?.[entry.name.toLowerCase()])) > 0,
				);
			if (!item) return false;
			if (target.team === "player") this.state.inventory[item.id]--;
			else target.items[item.name.toLowerCase()]--;
			const amount =
				item.name === "Potion" ? 30 : item.name === "Hi-Potion" ? 70 : 150;
			target.hp = Math.min(target.maxHp, target.hp + amount);
			this.emit("heal", { targetId: target.id, amount });
		} else if (name === "counter magic" && magic && target.mp >= ability.mp) {
			target.mp -= ability.mp;
			this.resolveAbility(target, { ...ability, mp: 0, ct: 0 }, attacker, {
				reaction: true,
			});
		} else if (
			["counter", "counter tackle", "counter flood"].includes(name) &&
			physical &&
			distance(target, attacker) <=
				(name === "counter flood" ? 3 : target.weaponRange)
		) {
			this.resolveAbility(
				target,
				{
					...this.adjustedAbility(target, "attack"),
					power: name === "counter tackle" ? 65 : 100,
					range: name === "counter flood" ? 3 : target.weaponRange,
				},
				attacker,
				{ reaction: true },
			);
		} else if (name === "damage split" && damage > 0) {
			const split = Math.ceil(damage / 2);
			target.hp = Math.min(target.maxHp, target.hp + split);
			attacker.hp = Math.max(0, attacker.hp - split);
			this.emit("hit", {
				unitId: target.id,
				targetId: attacker.id,
				amount: split,
			});
			if (attacker.hp <= 0) this.onDeath(attacker);
		} else if (name === "absorb used mp" && ability.mp > 0)
			target.mp = Math.min(target.maxMp, target.mp + ability.mp);
		else if (name === "a save" && damage > 0) target.pa++;
		else if (name === "ma save" && damage > 0) target.ma++;
		else if (name === "speed save" && damage > 0)
			target.speed = Math.min(22, target.speed + 1);
		else if (name === "brave up" && physical)
			target.brave = Math.min(97, target.brave + 3);
		else if (name === "face up" && magic)
			target.faith = Math.min(97, target.faith + 3);
		else if (name === "regenerator" && damage > 0) target.statuses.regen = 4;
		else if (name === "sunken state" && damage > 0)
			target.statuses.invisible = 4;
		else if (name === "caution" && damage > 0) target.statuses.defend = 2;
		else if (name === "dragon spirit" && physical) target.statuses.reraise = 99;
		else if (name === "gilgame heart" && target.team === "player" && damage > 0)
			this.state.gil += damage;
		else if (name === "hp restore" && critical) target.hp = target.maxHp;
		else if (name === "mp restore" && critical) target.mp = target.maxMp;
		else if (name === "critical quick" && critical)
			target.ct = Math.max(100, target.ct);
		else if (
			name === "meatbone slash" &&
			critical &&
			distance(target, attacker) <= target.weaponRange
		) {
			attacker.hp = Math.max(0, attacker.hp - target.maxHp);
			this.emit("hit", {
				unitId: target.id,
				targetId: attacker.id,
				amount: target.maxHp,
			});
			if (attacker.hp <= 0) this.onDeath(attacker);
		} else triggered = false;
		if (triggered) this.log(`${target.name}: ${reaction.name}.`);
		return triggered;
	}

	removeEquipment(target, slot) {
		const id = target.equipment[slot];
		const item = itemsById.get(id);
		if (!item) return null;
		delete target.equipment[slot];
		target.maxHp = Math.max(1, target.maxHp - number(item.hp));
		target.hp = Math.min(target.hp, target.maxHp);
		target.maxMp = Math.max(0, target.maxMp - number(item.mp));
		target.mp = Math.min(target.mp, target.maxMp);
		for (const stat of ["pa", "ma", "speed", "move", "jump", "evasion"])
			target[stat] = Math.max(
				stat === "evasion" ? 0 : 1,
				target[stat] - number(item[stat]),
			);
		if (slot === "weapon") {
			target.weaponPower = 0;
			target.weaponRange = 1;
		}
		return id;
	}

	steal(unit, target, name) {
		if (name.includes("heart")) {
			if (!target.boss && !target.immunities?.includes("charm"))
				target.statuses.charm = 3;
			return;
		}
		if (name.includes("exp")) {
			const amount = Math.min(number(target.exp), 30);
			target.exp -= amount;
			unit.exp += amount;
			this.log(`${unit.name} steals ${amount} EXP.`);
			return;
		}
		const slot =
			["weapon", "head", "body", "accessory", "shield"].find((entry) =>
				name.includes(entry),
			) ||
			(name.includes("helmet")
				? "head"
				: name.includes("armor")
					? "body"
					: name.includes("accessry")
						? "accessory"
						: null);
		if (slot && this.hasPassive(target, /maintenance/i, "support")) {
			this.log(`${target.name}'s Maintenance protects their equipment.`);
			return;
		}
		if (slot && target.equipment[slot]) {
			const id = this.removeEquipment(target, slot);
			if (unit.team === "player")
				this.state.inventory[id] = (this.state.inventory[id] || 0) + 1;
			this.log(`${unit.name} steals ${itemsById.get(id)?.name || slot}.`);
		} else if (!slot) {
			const gil = 50 + target.level * 15;
			if (unit.team === "player") this.state.gil += gil;
			this.log(`${unit.name} steals ${gil} gil.`);
		} else this.log(`${target.name} has no ${slot} to steal.`);
	}
	breakEquipment(target, name) {
		const slot = /weapon/.test(name)
			? "weapon"
			: /helmet|head/.test(name)
				? "head"
				: /armor|body/.test(name)
					? "body"
					: /shield/.test(name)
						? "shield"
						: null;
		if (slot && this.hasPassive(target, /maintenance/i, "support")) {
			this.log(`${target.name}'s Maintenance prevents equipment breakage.`);
			return;
		}
		if (slot) {
			const removed = this.removeEquipment(target, slot);
			if (removed) this.log(`${target.name}'s ${slot} is broken.`);
		} else if (/speed/.test(name)) target.speed = Math.max(3, target.speed - 2);
		else if (/mind|magic/.test(name)) target.ma = Math.max(2, target.ma - 3);
		else target.pa = Math.max(2, target.pa - 3);
	}
	onDeath(unit) {
		// Revival must not resume a charge or performance interrupted by death.
		unit.casting = null;
		unit.performing = null;
		unit.airborne = false;
		if (this.state.battle)
			this.state.battle.casts = this.state.battle.casts.filter(
				(cast) => cast.unitId !== unit.id,
			);
		if (unit.reviveOnce > 0) {
			unit.reviveOnce--;
			unit.hp = 1;
			unit.ct = 100;
			this.log(
				`${unit.name} activates an emergency reserve and rises with 1 HP.`,
			);
			this.emit("heal", { targetId: unit.id, amount: 1 });
			return;
		}
		if (
			unit.boss &&
			(this.state.battle?.encounter.objectiveType === "boss" ||
				this.state.battle?.encounter.boss)
		) {
			unit.hp = 0;
			unit.casting = null;
			unit.performing = null;
			this.log(`${unit.name} is defeated.`);
			this.emit("death", { unitId: unit.id });
			return;
		}
		if (unit.statuses.reraise) {
			unit.hp = Math.ceil(unit.maxHp / 3);
			if (!unit.autoStatuses?.includes("reraise")) delete unit.statuses.reraise;
			this.log(`${unit.name} rises again.`);
			return;
		}
		unit.hp = 0;
		unit.deadTicks = 0;
		unit.casting = null;
		unit.performing = null;
		unit.airborne = false;
		this.log(`${unit.name} falls. Four CT turns remain for revival.`);
		this.emit("death", { unitId: unit.id });
	}
	poach(target) {
		const entry = asArray(content.poaches).find(
			(poach) =>
				poach.job === target.job ||
				poach.monster?.toLowerCase() === target.name.toLowerCase(),
		);
		if (!entry) return false;
		const itemId = this.random() < 0.2 ? entry.rare : entry.common;
		if (!itemsById.has(itemId)) return false;
		this.state.inventory[itemId] = number(this.state.inventory[itemId]) + 1;
		target.removed = true;
		this.log(`${target.name} is poached: ${itemsById.get(itemId).name}.`);
		this.emit("pickup", { itemId });
		return true;
	}
	awardAction(unit) {
		if (unit.team !== "player" || unit.guest) return;
		unit.exp += this.hasPassive(unit, /gained exp/i, "support") ? 10 : 7;
		const bonus = this.hasPassive(unit, /gained jp|jp boost/i, "support")
			? 1.5
			: 1;
		const jp = Math.round(18 * bonus);
		unit.jp[unit.job] = number(unit.jp[unit.job]) + jp;
		unit.jobExp[unit.job] = number(unit.jobExp[unit.job]) + jp;
		for (const ally of this.state.battle?.units || []) {
			if (
				ally.id === unit.id ||
				ally.team !== unit.team ||
				ally.guest ||
				ally.removed
			)
				continue;
			const spillover = Math.floor(jp / 4);
			ally.jp[unit.job] = number(ally.jp[unit.job]) + spillover;
			ally.jobExp[unit.job] = number(ally.jobExp[unit.job]) + spillover;
		}
		if (unit.exp >= 100) {
			unit.exp -= 100;
			unit.level++;
			const hp = unit.hp,
				oldMax = unit.maxHp;
			this.recalculate(unit);
			unit.hp = Math.min(unit.maxHp, hp + unit.maxHp - oldMax);
			this.log(`${unit.name} reaches level ${unit.level}.`);
		}
	}

	wait(facing) {
		const unit = this.activeUnit;
		if (!unit || this.state.screen !== "battle") return false;
		if (facing && directions[facing]) unit.facing = facing;
		// The action CT refund makes waiting or acting without moving meaningful.
		unit.ct = Math.max(
			0,
			unit.ct -
				(unit.moved && unit.acted ? 100 : unit.moved || unit.acted ? 80 : 60),
		);
		this.state.battle.activeId = null;
		this.state.battle.phase = "clock";
		this.state.battle.selection = null;
		this._advanceClockToTurn();
		this.emit("turn-ended", { unitId: unit.id });
		return true;
	}
	advanceAI() {
		if (this.state.battle?.phase !== "enemy") return false;
		return this.autoTurn();
	}
	autoTurn() {
		const unit = this.activeUnit;
		if (!unit || this.state.screen !== "battle") return false;
		const battle = this.state.battle;
		const actualTeam = unit.statuses.charm
			? unit.team === "player"
				? "enemy"
				: "player"
			: unit.team;
		const opponents = battle.units.filter(
			(other) =>
				(unit.statuses.confuse
					? other.id !== unit.id
					: other.team !== actualTeam) &&
				other.hp > 0 &&
				!other.removed,
		);
		const allies = battle.units.filter(
			(other) => other.team === actualTeam && !other.removed,
		);
		if (!opponents.length) {
			if (this.checkOutcome()) return true;
			const destination = battle.map
				.filter(
					(tile) =>
						(tile.kind === "switch" && !tile.switch) ||
						(tile.exit && !battle.exitDiscovered),
				)
				.sort((a, b) => distance(unit, a) - distance(unit, b))[0];
			if (destination) {
				const routes = this.pathDistances(destination, unit);
				const step = this.getReachable(unit).sort(
					(a, b) =>
						number(routes.get(pointKey(a.x, a.z)), 1000) -
							number(routes.get(pointKey(b.x, b.z)), 1000) ||
						distance(a, destination) - distance(b, destination) ||
						a.cost - b.cost,
				)[0];
				if (step?.cost) this.moveUnit(unit, step.x, step.z);
			}
			if (this.state.screen === "battle") this.wait();
			return true;
		}
		if (unit.guest && battle.encounter.objectiveType === "rescue") {
			const safeTiles = this.getReachable(unit);
			const friends = allies.filter((ally) => !ally.guest && ally.hp > 0);
			const safety = (tile) =>
				Math.min(...opponents.map((enemy) => distance(tile, enemy))) * 2 -
				Math.min(...friends.map((friend) => distance(tile, friend))) * 0.4;
			safeTiles.sort((a, b) => safety(b) - safety(a) || a.cost - b.cost);
			if (safeTiles[0]?.cost > 0)
				this.moveUnit(unit, safeTiles[0].x, safeTiles[0].z);
			const heal = this.getActions(unit).find(
				(ability) => ability.kind === "heal" && !ability.disabled,
			);
			if (heal && unit.hp < unit.maxHp * 0.85)
				this.performAction(unit, heal.id, unit, { ai: true });
			this.wait(this.facingToward(unit, opponents[0]));
			return true;
		}
		const nearest = [...opponents].sort(
			(a, b) => distance(unit, a) - distance(unit, b) || a.hp - b.hp,
		)[0];
		const available = this.getActions(unit).filter(
			(ability) => !ability.disabled && ability.kind !== "buff",
		);
		const moves = [
			{ x: unit.x, z: unit.z, cost: 0 },
			...this.getReachable(unit).filter((tile) => tile.cost > 0),
		];
		let best = null;
		for (const position of moves) {
			const origin = { x: unit.x, z: unit.z };
			unit.x = position.x;
			unit.z = position.z;
			for (const ability of available) {
				const targets =
					ability.effect === "cleanse"
						? allies.filter(
								(other) =>
									other.hp > 0 &&
									Object.keys(other.statuses).some((status) =>
										[
											"poison",
											"blind",
											"silence",
											"stop",
											"sleep",
											"doom",
											"immobilize",
											"dontact",
											"confuse",
											"charm",
											"petrify",
										].includes(status),
									),
							)
						: ability.effect === "restore-mp"
							? allies.filter(
									(other) => other.hp > 0 && other.mp < other.maxMp * 0.4,
								)
							: ability.kind === "revive"
								? allies.filter((other) => other.hp <= 0)
								: ability.kind === "heal"
									? allies.filter(
											(other) => other.hp < other.maxHp * 0.72 && other.hp > 0,
										)
									: opponents;
				for (const target of targets) {
					if (!this.inRange(unit, ability, target)) continue;
					let value = 0;
					for (const affected of this.affectedUnits(ability, target, unit)) {
						const effect = this.predictEffect(unit, ability, affected);
						const ally = affected.team === actualTeam;
						if (ability.effect === "cleanse")
							value +=
								ally &&
								Object.keys(affected.statuses).some((status) =>
									[
										"poison",
										"blind",
										"silence",
										"stop",
										"sleep",
										"doom",
										"immobilize",
										"dontact",
										"confuse",
										"charm",
										"petrify",
									].includes(status),
								)
									? 50
									: 0;
						else if (ability.effect === "restore-mp")
							value += ally
								? Math.min(effect.damage, affected.maxMp - affected.mp) * 0.8
								: -effect.damage;
						else if (ability.kind === "heal")
							value += ally
								? Math.min(effect.damage, affected.maxHp - affected.hp) * 1.15
								: -effect.damage * 1.8;
						else if (ability.kind === "revive") value += ally ? 120 : -150;
						else if (ability.kind === "status") {
							const repeated =
								(ability.status && affected.statuses[ability.status]) ||
								(/break/.test(ability.name.toLowerCase()) &&
									!Object.keys(affected.equipment).length);
							value += ally ? -35 : repeated ? 0 : affected.boss ? 8 : 20;
						} else
							value += ally
								? -effect.damage * 2
								: (Math.min(effect.damage, affected.hp) * effect.hit) / 100 +
									(effect.damage >= affected.hp ? 30 : 0);
					}
					value -= ability.mp * 0.22 + ability.ct * 2 + position.cost * 0.4;
					// Finishing a cast amid a clustered formation invites hostile AoE.
					for (const cast of battle.casts) {
						const caster = this.getUnit(cast.unitId);
						if (!caster || caster.team === actualTeam) continue;
						const locked = cast.targetId
							? this.getUnit(cast.targetId)
							: cast.target;
						const area = abilityData(cast.abilityId)?.aoe || 0;
						if (locked && distance(position, locked) <= area) value -= 22;
					}
					if (!best || value > best.value)
						best = {
							value,
							position,
							ability,
							target: { x: target.x, z: target.z },
						};
				}
			}
			unit.x = origin.x;
			unit.z = origin.z;
		}
		if (best && best.value > 0) {
			if (best.position.cost > 0)
				this.moveUnit(unit, best.position.x, best.position.z);
			if (this.state.screen === "battle")
				this.performAction(unit, best.ability.id, best.target, { ai: true });
		} else {
			let destination = nearest;
			if (
				unit.team === "player" &&
				battle.encounter.objectiveType === "switches"
			)
				destination =
					battle.map
						.filter((tile) => tile.kind === "switch" && !tile.switch)
						.sort((a, b) => distance(unit, a) - distance(unit, b))[0] ||
					nearest;
			const routes = this.pathDistances(destination, unit);
			const step = moves.sort(
				(a, b) =>
					number(routes.get(pointKey(a.x, a.z)), 1000) -
						number(routes.get(pointKey(b.x, b.z)), 1000) ||
					distance(a, destination) - distance(b, destination) ||
					a.cost - b.cost,
			)[0];
			if (step?.cost > 0) this.moveUnit(unit, step.x, step.z);
			if (this.state.screen === "battle") {
				const buff = this.getActions(unit).find(
					(ability) =>
						ability.kind === "buff" &&
						!ability.disabled &&
						this.inRange(unit, ability, unit),
				);
				if (buff) this.performAction(unit, buff.id, unit, { ai: true });
			}
		}
		if (this.state.screen === "battle")
			this.wait(this.facingToward(unit, nearest));
		return true;
	}

	checkOutcome() {
		const battle = this.state.battle;
		if (!battle || this.state.screen !== "battle") return false;
		const allies = battle.units.filter((unit) => unit.team === "player");
		const enemies = battle.units.filter(
			(unit) =>
				unit.team === "enemy" &&
				unit.hp > 0 &&
				!unit.removed &&
				!unit.statuses.petrify,
		);
		const ramza = allies.find((unit) => unit.id === "ramza");
		const rescue = battle.encounter.objectiveType === "rescue";
		if (
			allies.every(
				(unit) => unit.hp <= 0 || unit.removed || unit.statuses.petrify,
			) ||
			ramza?.removed ||
			(rescue &&
				allies.some(
					(unit) =>
						unit.guest &&
						unit.rescueTarget !== false &&
						!unit.invited &&
						unit.hp <= 0,
				))
		) {
			this.finishBattle(false);
			return true;
		}
		const bossObjective =
			battle.encounter.objectiveType === "boss" || !!battle.encounter.boss;
		const bossDefeated = bossObjective && !enemies.some((unit) => unit.boss);
		const switches = battle.encounter.objectiveType === "switches";
		const explore = battle.encounter.objectiveType === "explore";
		if (
			switches
				? battle.switches >= 2
				: explore
					? !enemies.length && battle.exitDiscovered
					: !enemies.length || bossDefeated
		) {
			this.finishBattle(true);
			return true;
		}
		return false;
	}

	finishBattle(victory, reason) {
		const battle = this.state.battle;
		if (!battle || this.state.screen !== "battle") return;
		const encounter = battle.encounter;
		const campaignIndex = CAMPAIGN.findIndex(
			(item) => item.id === (encounter.parentId || encounter.id),
		);
		const firstVictory =
			victory && !this.state.completed.includes(encounter.id);
		const reward = typeof encounter.reward === "object" ? encounter.reward : {};
		const gil = victory
			? number(
					reward.gil,
					typeof encounter.reward === "number"
						? encounter.reward
						: 250 + Math.max(0, campaignIndex) * 75,
				)
			: 0;
		const exp = victory ? number(reward.exp, 38) : 0;
		const jp = victory ? number(reward.jp, 70) : 0;
		if (victory) {
			this.state.gil += gil;
			this.state.totalBattles++;
			for (const fighter of battle.units.filter(
				(unit) => unit.team === "player" && !unit.guest,
			)) {
				const rosterIndex = this.state.party.findIndex(
					(unit) => unit.id === fighter.id,
				);
				if (rosterIndex < 0) continue;
				const unit = clone(fighter);
				unit.brave = clamp(
					number(fighter.baseBrave, fighter.brave) +
						Math.trunc(
							(fighter.brave - number(fighter.baseBrave, fighter.brave)) / 4,
						),
					3,
					97,
				);
				unit.faith = clamp(
					number(fighter.baseFaith, fighter.faith) +
						Math.trunc(
							(fighter.faith - number(fighter.baseFaith, fighter.faith)) / 4,
						),
					3,
					97,
				);
				unit.exp += exp;
				while (unit.exp >= 100) {
					unit.exp -= 100;
					unit.level++;
				}
				unit.jp[unit.job] = number(unit.jp[unit.job]) + jp;
				unit.jobExp[unit.job] = number(unit.jobExp[unit.job]) + jp;
				this.recalculate(unit);
				unit.hp = unit.maxHp;
				unit.mp = unit.maxMp;
				unit.statuses = {};
				unit.removed = false;
				unit.casting = null;
				this.state.party[rosterIndex] = unit;
			}
			if (firstVictory) this.state.completed.push(encounter.id);
			if (
				encounter.parentId &&
				!this.state.completed.includes(encounter.parentId)
			)
				this.state.completed.push(encounter.parentId);
			if (campaignIndex === this.state.campaignIndex)
				this.state.campaignIndex++;
			this.state.chapter = number(
				CAMPAIGN[this.state.campaignIndex]?.chapter,
				Math.max(4, this.state.chapter),
			);
			const prizes = asArray(reward.items || encounter.rewards?.items);
			for (const prize of prizes) {
				const id = typeof prize === "string" ? prize : prize.id;
				this.state.inventory[id] =
					number(this.state.inventory[id]) + number(prize.count, 1);
			}
			this.state.inventory[findItem("potion")] =
				number(this.state.inventory[findItem("potion")]) + 2;
			this.updateQuests(encounter);
			if (firstVictory) this.storyRecruits(encounter);
			for (const invited of battle.units.filter(
				(unit) => unit.invited && unit.team === "player" && unit.hp > 0,
			))
				this.recruit({
					name: invited.name,
					id: `invited-${invited.job}-${this.state.totalBattles}-${invited.id}`,
					job: invited.job,
					learned: invited.learned,
					brave: invited.brave,
					faith: invited.faith,
					equipment: invited.equipment,
				});
			if (firstVictory)
				for (const id of encounter.departures || []) {
					const departing = this.state.party.find((unit) => unit.id === id);
					if (!departing) continue;
					for (const item of Object.values(departing.equipment))
						this.state.inventory[item] = number(this.state.inventory[item]) + 1;
					this.state.party = this.state.party.filter((unit) => unit.id !== id);
					this.state.notices.push(
						`${departing.name} leaves the company as their story takes another road.`,
					);
				}
			this.tickBreeding();
		}
		this.state.result = {
			victory,
			encounterId: encounter.id,
			title: victory ? "Victory" : "The company has fallen",
			summary:
				reason ||
				(victory
					? encounter.aftermath ||
						"The road ahead is open. Your company returns to camp."
					: "Your world-map save is safe. Regroup and try another approach."),
			gil,
			exp,
			jp,
			items: asArray(reward.items),
			next: this.getNextEncounter()?.name,
			firstVictory,
			ending: victory && this.state.campaignIndex >= CAMPAIGN.length,
		};
		this.state.screen = "result";
		battle.phase = "finished";
		this.save();
		this.emit(victory ? "victory" : "defeat", this.state.result);
	}

	advanceCampaign() {
		if (this.state.screen !== "result" && this.state.screen !== "ending")
			return false;
		this.state.screen =
			this.state.result?.ending && !this.state.endingSeen ? "ending" : "world";
		if (this.state.screen === "ending") this.state.endingSeen = true;
		this.state.battle = null;
		this.save();
		this.emit("world");
		return true;
	}
	returnToWorld() {
		this.state.screen = "world";
		this.state.battle = null;
		this.save();
		this.emit("world");
	}
	retreat() {
		if (this.state.screen === "battle") {
			this.finishBattle(false, "The company retreats to prepare again.");
			return true;
		}
		return false;
	}

	jobLevel(unit, job = unit.job) {
		const experience = number(unit.jobExp?.[job]);
		const thresholds = [0, 100, 250, 450, 700, 1000, 1450, 2000];
		return Math.max(
			1,
			thresholds.filter((threshold) => experience >= threshold).length,
		);
	}
	jobUnlocked(unit, jobId) {
		if (["squire", "chemist", unit.job, unit.homeJob].includes(jobId))
			return true;
		const job = jobsById.get(jobId);
		if (
			!job ||
			job.special ||
			job.unique ||
			job.playable === false ||
			job.monster
		)
			return false;
		const requirements = job.requires || job.requirements;
		if (!requirements || typeof requirements === "string")
			return unit.level >= Math.min(12, number(job.unlockLevel, 3));
		const list = Array.isArray(requirements)
			? requirements.map((entry) => [entry.job || entry.id, entry.level])
			: Object.entries(requirements);
		return list.every(
			([id, level]) =>
				this.jobLevel(unit, canonicalJob(id)) >= number(level, 2),
		);
	}
	getAvailableJobs(unitId) {
		const unit = this.getUnit(unitId);
		return unit
			? JOBS.map((job) => ({
					...job,
					unlocked: this.jobUnlocked(unit, job.id),
					level: this.jobLevel(unit, job.id),
				}))
			: [];
	}
	setJob(unitId, jobId) {
		if (this.state.screen === "battle")
			return this.notice("Change jobs at camp.");
		const unit = this.state.party.find((entry) => entry.id === unitId);
		if (!unit || !this.jobUnlocked(unit, jobId))
			return this.notice("Earn the prerequisite job levels first.");
		unit.job = jobId;
		unit.jp[jobId] ||= 0;
		unit.jobExp[jobId] ||= 0;
		for (const [slot, id] of Object.entries(unit.equipment))
			if (!this.canEquipItem(unit, itemsById.get(id))) {
				this.state.inventory[id] = number(this.state.inventory[id]) + 1;
				delete unit.equipment[slot];
			}
		this.recalculate(unit);
		unit.hp = unit.maxHp;
		unit.mp = unit.maxMp;
		this.save();
		this.emit("job-changed", { unitId, jobId });
		return true;
	}
	setSecondaryJob(unitId, jobId) {
		const unit = this.state.party.find((entry) => entry.id === unitId);
		if (
			!unit ||
			this.state.screen === "battle" ||
			!this.jobUnlocked(unit, jobId)
		)
			return false;
		unit.secondaryJob = jobId;
		this.save();
		this.emit();
		return true;
	}
	learn(unitId, abilityId) {
		if (this.state.screen === "battle") return false;
		const unit = this.state.party.find((entry) => entry.id === unitId);
		const ability = abilityData(abilityId);
		if (!unit || !ability || unit.learned.includes(abilityId)) return false;
		if (
			ability.learnOnlyBySurviving ||
			(["Ultima", "Zodiac"].includes(ability.name) && number(ability.jp) === 0)
		)
			return this.notice(
				`${ability.name} must be learned by surviving it in the correct job.`,
			);
		const job = canonicalJob(ability.job || ability.jobId || unit.job);
		const price = number(ability.jp ?? ability.cost, 100);
		if (!this.jobUnlocked(unit, job) || number(unit.jp[job]) < price)
			return this.notice("Not enough JP in the required job.");
		if (
			/GameShark only|has no effect|no known effect/i.test(
				ability.description || "",
			)
		)
			return this.notice(
				"This source record is not an obtainable gameplay ability.",
			);
		unit.jp[job] -= price;
		unit.learned.push(abilityId);
		unit.abilitySlots ||= { reaction: null, support: null, movement: null };
		if (
			ability.kind === "passive" &&
			["reaction", "support", "movement"].includes(ability.category) &&
			!unit.abilitySlots[ability.category]
		)
			unit.abilitySlots[ability.category] = abilityId;
		this.recalculate(unit);
		this.save();
		this.emit("learned", { unitId, abilityId });
		return true;
	}
	canEquipItem(unit, item) {
		if (!item || item.slot === "item") return false;
		const job = jobsById.get(unit.job);
		if (job?.monster) return false;
		const allowed = item.jobs || item.allowedJobs;
		if (Array.isArray(allowed) && allowed.length && !allowed.includes(unit.job))
			return false;
		const restrictions = job?.description?.match(
			/EQ:\s*([^\n]+?)(?:INNATE:|$)/i,
		)?.[1];
		if (restrictions && item.type) {
			const category = item.type
				.toLowerCase()
				.replace(/s$/, "")
				.replace("clothe", "clothes");
			const aliases = {
				"knight sword": "knight sword",
				"ninja sword": "ninja sword",
				crossbow: "crossbow",
				longbow: "bow",
				"long bow": "bow",
				helm: "helmet",
				robe: "robe",
				armlet: "accessory",
				bracelet: "accessory",
				boot: "accessory",
				mantle: "accessory",
				ring: "accessory",
				perfume: "accessory",
				glove: "accessory",
			};
			const normalized =
				aliases[category] ||
				(item.slot === "accessory" && category !== "shield"
					? "accessory"
					: category);
			const extraEquipment = abilityData(unit.abilitySlots?.support)
				?.name?.match(/^Equip (.+)$/i)?.[1]
				?.toLowerCase()
				.replace("knife", "katana");
			if (
				!restrictions.toLowerCase().includes(normalized) &&
				extraEquipment !== normalized &&
				!(
					extraEquipment === "armor" && ["armor", "helmet"].includes(normalized)
				)
			)
				return false;
		}
		return true;
	}
	equip(unitId, itemId) {
		if (this.state.screen === "battle") return false;
		const unit = this.state.party.find((entry) => entry.id === unitId);
		const item = itemsById.get(itemId);
		if (
			!unit ||
			!this.canEquipItem(unit, item) ||
			!this.state.inventory[itemId]
		)
			return false;
		const old = unit.equipment[item.slot];
		if (old) this.state.inventory[old] = number(this.state.inventory[old]) + 1;
		unit.equipment[item.slot] = itemId;
		this.state.inventory[itemId]--;
		this.recalculate(unit);
		unit.hp = unit.maxHp;
		unit.mp = unit.maxMp;
		this.save();
		this.emit("equipped", { unitId, itemId });
		return true;
	}
	unequip(unitId, slot) {
		const unit = this.state.party.find((entry) => entry.id === unitId);
		if (!unit?.equipment[slot] || this.state.screen === "battle") return false;
		this.state.inventory[unit.equipment[slot]] =
			number(this.state.inventory[unit.equipment[slot]]) + 1;
		delete unit.equipment[slot];
		this.recalculate(unit);
		this.save();
		this.emit();
		return true;
	}
	getShopItems() {
		return ITEMS.filter(
			(item) =>
				number(item.price) > 0 &&
				number(item.chapter ?? item.unlockChapter, 1) <= this.state.chapter &&
				!item.rare &&
				!item.aliasOf,
		);
	}
	buy(itemId, count = 1) {
		if (this.state.screen === "battle") return false;
		const item = this.getShopItems().find((entry) => entry.id === itemId);
		const amount = clamp(Math.floor(count), 1, 99);
		if (!item || number(item.price) * amount > this.state.gil)
			return this.notice("Not enough gil.");
		this.state.gil -= number(item.price) * amount;
		this.state.inventory[itemId] =
			number(this.state.inventory[itemId]) + amount;
		this.save();
		this.emit("purchase", { itemId, count: amount });
		return true;
	}
	sell(itemId, count = 1) {
		const item = itemsById.get(itemId);
		const amount = clamp(Math.floor(count), 1, 99);
		if (
			!item ||
			number(this.state.inventory[itemId]) < amount ||
			this.state.screen === "battle"
		)
			return false;
		this.state.inventory[itemId] -= amount;
		this.state.gil += Math.floor(number(item.price, 50) / 2) * amount;
		this.save();
		this.emit();
		return true;
	}

	getDispatchCandidates(questId) {
		const quest = QUESTS.find((entry) => entry.id === questId);
		return this.state.party
			.filter(
				(unit) =>
					unit.id !== "ramza" &&
					!unit.onQuest &&
					!jobsById.get(unit.homeJob || unit.job)?.special &&
					!jobsById.get(unit.job)?.monster,
			)
			.sort(
				(a, b) =>
					Number(b.job === quest?.preferredJob) -
					Number(a.job === quest?.preferredJob),
			);
	}
	startQuest(id, unitIds) {
		const quest = QUESTS.find((entry) => entry.id === id);
		if (!quest || this.state.screen === "battle") return false;
		if (["complete", "active", "ready"].includes(this.state.quests[id]?.status))
			return false;
		if (number(quest.chapter ?? quest.unlockChapter, 1) > this.state.chapter)
			return this.notice("This rumor is not yet available.");
		const cost = number(quest.cost);
		if (this.state.gil < cost)
			return this.notice("Not enough gil for this proposition.");
		let crew = [];
		if (quest.type === "dispatch") {
			const available = this.getDispatchCandidates(id);
			crew = unitIds
				? [...new Set(unitIds)]
				: [
						available.find((unit) => unit.job === quest.preferredJob)?.id ||
							available.at(-1)?.id,
					].filter(Boolean);
			if (
				!crew.length ||
				crew.length > 3 ||
				crew.some((unitId) => !available.some((unit) => unit.id === unitId))
			)
				return this.notice("Choose one to three available generic recruits.");
			for (const unit of this.state.party.filter((unit) =>
				crew.includes(unit.id),
			))
				unit.onQuest = id;
		}
		this.state.gil -= cost;
		this.state.quests[id] = {
			status: "active",
			progress: 0,
			goal:
				quest.battleIds?.length || number(quest.duration ?? quest.battles, 2),
			started: this.state.totalBattles,
			crew,
			specialist: crew.some(
				(unitId) =>
					this.state.party.find((unit) => unit.id === unitId)?.job ===
					quest.preferredJob,
			),
		};
		this.save();
		this.emit("quest-started", { questId: id });
		return true;
	}
	updateQuests(encounter) {
		for (const [id, progress] of Object.entries(this.state.quests)) {
			if (progress.status !== "active") continue;
			const quest = QUESTS.find((entry) => entry.id === id);
			progress.progress++;
			const battles = quest?.battleIds || quest?.battles;
			if (Array.isArray(battles))
				progress.progress = battles.filter((battle) =>
					this.state.completed.includes(battle),
				).length;
			if (
				progress.progress >=
				(Array.isArray(battles) ? battles.length : progress.goal)
			) {
				progress.status = "ready";
				for (const unit of this.state.party.filter((unit) =>
					progress.crew?.includes(unit.id),
				))
					delete unit.onQuest;
			}
		}
		for (const quest of QUESTS) {
			if (quest.battleId === encounter.id || quest.encounterId === encounter.id)
				this.state.quests[quest.id] = { status: "ready", progress: 1, goal: 1 };
		}
	}
	claimQuest(id) {
		const progress = this.state.quests[id];
		const quest = QUESTS.find((entry) => entry.id === id);
		if (!quest || progress?.status !== "ready") return false;
		progress.status = "complete";
		this.state.gil += Math.round(
			number(quest.reward?.gil, 700) * (progress.specialist ? 1.25 : 1),
		);
		for (const unit of this.state.party.filter(
			(unit) => !progress.crew?.length || progress.crew.includes(unit.id),
		)) {
			const jp = number(quest.reward?.jp, 80);
			unit.jp[unit.job] = number(unit.jp[unit.job]) + jp;
			unit.jobExp[unit.job] = number(unit.jobExp[unit.job]) + jp;
		}
		const item = quest.reward?.item || quest.item;
		if (item)
			this.state.inventory[item] = number(this.state.inventory[item]) + 1;
		if (quest.recruit) this.recruit(quest.recruit);
		this.state.discoveries.push({
			id,
			name: quest.discovery || quest.name,
			text: quest.summary || quest.description,
		});
		this.save();
		this.emit("quest-complete", { questId: id });
		return true;
	}
	recruit(spec) {
		if (typeof spec === "string") spec = { name: spec, job: "squire" };
		const id = spec.id || spec.name.toLowerCase().replaceAll(" ", "-");
		if (this.state.party.some((unit) => unit.id === id)) return false;
		const level = Math.max(...this.state.party.map((unit) => unit.level), 1);
		this.state.party.push(
			this.createUnit({ ...spec, id, team: "player", level }),
		);
		this.state.notices.push(`${spec.name} joins the company.`);
		return true;
	}
	getRosterCapacity() {
		return { used: this.state.party.length, max: ROSTER_LIMIT };
	}
	getRecruitmentCost() {
		return RECRUITMENT_FEE;
	}
	hireRecruit({ name, sex = "male", job = "squire", zodiac } = {}) {
		if (this.state.screen === "battle") return false;
		const trimmed = String(name || "")
			.trim()
			.slice(0, 24);
		if (!trimmed) return this.notice("Give the new recruit a name.");
		if (
			!["male", "female"].includes(sex) ||
			!["squire", "chemist"].includes(job) ||
			(zodiac && !ZODIAC_SIGNS.includes(zodiac))
		)
			return false;
		if (this.state.party.length >= ROSTER_LIMIT)
			return this.notice(
				"The company is full. Release a generic recruit or monster first.",
			);
		if (this.state.gil < RECRUITMENT_FEE)
			return this.notice(`The Soldier Office charges ${RECRUITMENT_FEE} gil.`);
		this.state.gil -= RECRUITMENT_FEE;
		this.state.recruitCounter++;
		const unit = this.createUnit({
			id: `hired-${this.state.recruitCounter}`,
			name: trimmed,
			sex,
			job,
			zodiac,
			level: 1,
			brave: 40 + Math.floor(this.random() * 31),
			faith: 40 + Math.floor(this.random() * 31),
			team: "player",
			hired: true,
		});
		this.state.party.push(unit);
		this.save();
		this.emit("recruit-hired", { unitId: unit.id, name: unit.name });
		return true;
	}
	canDismiss(unitId) {
		const unit = this.state.party.find((entry) => entry.id === unitId);
		if (
			!unit ||
			["ramza", "delita"].includes(unit.id) ||
			unit.onQuest ||
			this.state.screen === "battle"
		)
			return false;
		const protectedIds = asArray(content.recruitments).map((entry) => entry.id);
		for (const event of WORLD_EVENTS)
			if (event.recruit?.id) protectedIds.push(event.recruit.id);
		return (
			!protectedIds.includes(unitId) &&
			(!jobsById.get(unit.homeJob || unit.job)?.special ||
				jobsById.get(unit.job)?.monster ||
				unit.hired)
		);
	}
	dismissUnit(unitId) {
		if (!this.canDismiss(unitId))
			return this.notice(
				"A story companion or dispatched recruit cannot be released.",
			);
		const unit = this.state.party.find((entry) => entry.id === unitId);
		for (const item of Object.values(unit.equipment))
			this.state.inventory[item] = number(this.state.inventory[item]) + 1;
		this.state.party = this.state.party.filter((entry) => entry.id !== unitId);
		this.save();
		this.emit("unit-released", { unitId, name: unit.name });
		return true;
	}
	getEggs() {
		return this.state.eggs.map((egg) => ({
			...egg,
			ready: egg.progress >= egg.required,
		}));
	}
	tickBreeding() {
		for (const egg of this.state.eggs)
			egg.progress = Math.min(egg.required, egg.progress + 1);
		if (this.state.totalBattles % 3 !== 0 || this.state.eggs.length >= 8)
			return;
		for (const family of BREEDING_FAMILIES) {
			if (
				this.state.eggs.length >= 8 ||
				this.state.eggs.some((egg) => egg.family === family.id)
			)
				continue;
			const jobs = family.jobs || family.members || [];
			const parent = this.state.party.find((unit) => jobs.includes(unit.job));
			if (!parent) continue;
			const tier = jobs.indexOf(parent.job);
			const roll = this.random();
			const childTier =
				tier === 0
					? roll < 0.7
						? 0
						: 1
					: tier === 1
						? roll < 0.2
							? 0
							: roll < 0.7
								? 1
								: 2
						: roll < 0.25
							? 1
							: 2;
			const job = jobs[Math.min(childTier, jobs.length - 1)];
			this.state.recruitCounter++;
			const egg = {
				id: `egg-${this.state.recruitCounter}`,
				family: family.id,
				name: `${family.name || jobsById.get(parent.job)?.name || "Monster"} Egg`,
				parentId: parent.id,
				job,
				level: Math.max(1, parent.level),
				progress: 0,
				required: 2,
				sourceId: family.sourceId,
			};
			this.state.eggs.push(egg);
			this.state.notices.push(
				`${parent.name} has laid a ${egg.name}. It will hatch after two victories.`,
			);
			this.emit("egg-laid", { egg });
		}
	}
	hatchEgg(id) {
		if (this.state.screen === "battle") return false;
		const egg = this.state.eggs.find((entry) => entry.id === id);
		if (!egg || egg.progress < egg.required)
			return this.notice("This egg is still incubating.");
		if (this.state.party.length >= ROSTER_LIMIT)
			return this.notice("Make room in the company before hatching this egg.");
		const unit = this.createUnit({
			id: `hatched-${egg.id}`,
			name: jobsById.get(egg.job)?.name || egg.job,
			job: egg.job,
			level: egg.level,
			team: "player",
			sex: "monster",
			brave: 40 + Math.floor(this.random() * 31),
			faith: 40 + Math.floor(this.random() * 31),
			hatched: true,
		});
		this.state.party.push(unit);
		this.state.eggs = this.state.eggs.filter((entry) => entry.id !== id);
		this.save();
		this.emit("egg-hatched", { unitId: unit.id, eggId: id, name: unit.name });
		return true;
	}
	storyRecruits(encounter) {
		for (const recruit of asArray(encounter.recruits || encounter.recruit))
			this.recruit(recruit);
		for (const recruit of asArray(content.recruitments))
			if (recruit.after === encounter.id) this.recruit(recruit);
	}
	setDeployment(ids) {
		if (this.state.screen === "battle") return false;
		const unique = [...new Set(["ramza", ...ids])];
		this.state.party.sort(
			(a, b) =>
				(unique.indexOf(a.id) < 0 ? 99 : unique.indexOf(a.id)) -
				(unique.indexOf(b.id) < 0 ? 99 : unique.indexOf(b.id)),
		);
		this.save();
		this.emit();
		return true;
	}
	setDifficulty(difficulty) {
		if (
			!["story", "tactical"].includes(difficulty) ||
			this.state.screen === "battle"
		)
			return false;
		this.state.difficulty = difficulty;
		this.save();
		this.emit();
		return true;
	}
	exploreArea(id) {
		if (id === "bervenia-volcano")
			return this.visitWorldEvent("bervenia-materia");
		return false;
	}

	serialize() {
		return JSON.stringify(this.state);
	}
	saveCheckpoint() {
		const snapshot = clone(this.state);
		snapshot.screen = "world";
		snapshot.battle = null;
		snapshot.result = null;
		try {
			this.storage?.setItem(CHECKPOINT_KEY, JSON.stringify(snapshot));
			this.checkpoint = snapshot;
			return true;
		} catch {
			this.checkpoint = snapshot;
			return false;
		}
	}
	hasCheckpoint() {
		try {
			return !!(this.checkpoint || this.storage?.getItem(CHECKPOINT_KEY));
		} catch {
			return !!this.checkpoint;
		}
	}
	restoreCheckpoint() {
		try {
			const snapshot = this.checkpoint || this.storage?.getItem(CHECKPOINT_KEY);
			if (!snapshot || !this.load(snapshot)) return false;
			this.save();
			this.emit("checkpoint-restored");
			return true;
		} catch {
			return false;
		}
	}
	save() {
		if (!this.state.party.length || !this.storage?.setItem) return false;
		try {
			this.storage.setItem(SAVE_KEY, this.serialize());
			return true;
		} catch {
			return false;
		}
	}
	hasSave() {
		try {
			return !!this.storage?.getItem(SAVE_KEY);
		} catch {
			return false;
		}
	}
	load(serialized) {
		try {
			const data =
				typeof serialized === "string"
					? JSON.parse(serialized)
					: clone(serialized);
			if (
				data?.version !== 1 ||
				!Array.isArray(data.party) ||
				!Array.isArray(data.completed) ||
				!Number.isInteger(data.campaignIndex) ||
				data.campaignIndex < 0 ||
				data.campaignIndex > CAMPAIGN.length ||
				!data.party.length ||
				!data.party.every(
					(unit) =>
						unit &&
						typeof unit.id === "string" &&
						jobsById.has(unit.job) &&
						Number.isFinite(unit.level),
				) ||
				!data.inventory ||
				typeof data.inventory !== "object" ||
				Array.isArray(data.inventory)
			)
				return false;
			const suspended = data.screen === "battle" && data.battle;
			if (
				suspended &&
				(!Array.isArray(data.battle.units) ||
					!data.battle.units.length ||
					!Array.isArray(data.battle.map) ||
					!data.battle.map.length ||
					!Array.isArray(data.battle.casts) ||
					!encounterById.has(data.battle.id) ||
					!data.battle.units.every(
						(unit) =>
							unit.id &&
							Number.isFinite(unit.x) &&
							Number.isFinite(unit.z) &&
							Number.isFinite(unit.hp),
					))
			)
				return false;
			// Normalize and advance a separate instance so a rejected load cannot
			// partially replace the current campaign or write over its saved data.
			const restored = new Game({ seed: this.seed, storage: null });
			restored.state = {
				...this.initialState(),
				...data,
				battle: suspended ? data.battle : null,
				screen: suspended
					? "battle"
					: data.screen === "ending" ||
							(data.campaignIndex >= CAMPAIGN.length && !data.endingSeen)
						? "ending"
						: "world",
			};
			if (restored.state.screen === "ending") restored.state.endingSeen = true;
			for (const unit of restored.state.party) {
				unit.jp ||= {};
				unit.jobExp ||= {};
				unit.learned ||= [];
				unit.equipment ||= {};
				unit.statuses = {};
				restored.recalculate(unit);
				unit.hp = unit.maxHp;
				unit.mp = unit.maxMp;
			}
			if (suspended) {
				restored.state.battle.tiles = restored.state.battle.map;
				restored.state.battle.encounter = encounterById.get(
					restored.state.battle.id,
				);
				for (const unit of restored.state.battle.units) {
					unit.abilitySlots ||= {
						reaction: null,
						support: null,
						movement: null,
					};
					unit.statuses ||= {};
				}
				if (!restored.activeUnit || restored.state.battle.phase === "clock")
					restored._advanceClockToTurn();
				else restored.refreshTacticalState();
			}
			this.state = restored.state;
			this.emit("loaded");
			return true;
		} catch {
			return false;
		}
	}
	continueGame() {
		try {
			return this.load(this.storage?.getItem(SAVE_KEY));
		} catch {
			return false;
		}
	}
}

export { abilityData, CHECKPOINT_KEY, SAVE_KEY };
