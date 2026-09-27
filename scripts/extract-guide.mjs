import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The source is deliberately preserved independently of the compact game's
// balance parameters. A source formula is never overwritten by an adaptation.
const source = readFileSync(
	new URL("../FFT_Unified_Guide.md", import.meta.url),
	"utf8",
);
const slug = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
const plain = (value = "") =>
	value
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/\*\*|[`#>]/g, "")
		.replace(/\s+/g, " ")
		.trim();
const number = (value, fallback = 0) =>
	Number.parseFloat(String(value).replace(/[(),]/g, "")) || fallback;
const records = [
	...source.matchAll(
		/<a id="([^"]+)"><\/a>\s*\n\s*### ([^\n]+)([\s\S]*?)(?=\n<a id="|$)/g,
	),
]
	.map((match) => {
		const meta = match[3].match(
			/\*\*ID:\*\* `[^`]+` · \*\*Type:\*\* ([^·]+) · \*\*Section:\*\* ([^\n]+)/,
		);
		if (!meta) return null;
		return {
			id: match[1],
			name: match[2].trim(),
			type: meta[1].trim(),
			section: meta[2].trim(),
			text: match[3].trim(),
			sourceLine: source.slice(0, match.index).split("\n").length,
			endLine: source.slice(0, match.index + match[0].length).split("\n")
				.length,
			provenance: [...match[3].matchAll(/\[([WMIJST]:[\d–-]+)\]/g)]
				.map((m) => m[1])
				.filter((v, i, a) => a.indexOf(v) === i),
		};
	})
	.filter(Boolean);
const byId = Object.fromEntries(records.map((r) => [r.id, r]));
const fields = (record) =>
	Object.fromEntries(
		[...record.text.matchAll(/^\| ([^|]+) \| ([^|]*) \|$/gm)]
			.filter((m) => !["Field", "---"].includes(m[1]))
			.map((m) => [m[1].trim(), m[2].trim()]),
	);
const sectionText = (record, heading) =>
	record.text
		.match(
			new RegExp(`#### ${heading}\\s*([\\s\\S]*?)(?=\\n#### |\\n\\*Source:|$)`),
		)?.[1]
		?.trim() || "";
const refs = (record, prefix) =>
	[...record.text.matchAll(new RegExp(`\\(#(${prefix}[^)]+)\\)`, "g"))]
		.map((m) => m[1])
		.filter((v, i, a) => a.indexOf(v) === i);

const unlocks = {
	knight: [["squire", 2]],
	archer: [["squire", 2]],
	monk: [["knight", 2]],
	thief: [["archer", 2]],
	geomancer: [["monk", 3]],
	lancer: [["thief", 3]],
	dancer: [
		["geomancer", 4],
		["lancer", 4],
	],
	priest: [["chemist", 2]],
	wizard: [["chemist", 2]],
	oracle: [["priest", 2]],
	"time-mage": [["wizard", 2]],
	mediator: [["oracle", 2]],
	summoner: [["time-mage", 2]],
	bard: [
		["mediator", 4],
		["summoner", 4],
	],
	samurai: [
		["knight", 3],
		["monk", 4],
		["lancer", 2],
	],
	ninja: [
		["archer", 3],
		["thief", 4],
		["geomancer", 2],
	],
	calculator: [
		["priest", 4],
		["wizard", 4],
		["time-mage", 3],
		["oracle", 3],
	],
	mime: [
		["squire", 8],
		["chemist", 8],
		["geomancer", 4],
		["lancer", 4],
		["mediator", 4],
		["summoner", 4],
	],
};
const jobs = records
	.filter((r) => r.section === "Jobs / Generic" || r.type === "special job")
	.map((r) => {
		const f = fields(r);
		const name = r.name.replace(" — special job", "");
		const id = r.id === "special-job-squire" ? "ramza-squire" : slug(name);
		const move = number(f.Move, number(r.text.match(/Move: (\d+)/)?.[1], 4));
		const jump = number(f.Jump, number(r.text.match(/Jump: (\d+)/)?.[1], 3));
		const stats = {
			hp: Math.round(number(f.HPM, 110) * 1.06),
			mp: Math.round(number(f.MPM, 70) * 0.75),
			pa: Math.max(5, Math.round(number(f.PAM, 110) / 9)),
			ma: Math.max(5, Math.round(number(f.MAM, 100) / 9)),
			speed: Math.max(5, Math.round(number(f.SpM, 100) / 13)),
			move,
			jump,
		};
		const requires = (unlocks[id] || []).map(([job, level]) => ({
			job,
			level,
		}));
		const description = plain(
			r.text.match(/\n([^\n]+ EQ:[^\n]+)/)?.[1] ||
				sectionText(r, "Job evaluation and class-specific context \\(J\\)"),
		).slice(0, 420);
		return {
			id,
			name,
			description,
			requires,
			prerequisites: requires,
			abilities: refs(r, "ability-"),
			move,
			jump,
			speed: stats.speed,
			stats,
			sourceId: r.id,
			sourceStats: f,
			special: r.type === "special job",
			adaptation:
				"Base stats scaled for the compact campaign; source job multipliers and exact unlocks preserved separately.",
		};
	});
const commandJobs = {
	"BASIC SKILL": "squire",
	ITEM: "chemist",
	CHARGE: "archer",
	"BATTLE SKILL": "knight",
	"PUNCH ART": "monk",
	STEAL: "thief",
	"WHITE MAGIC": "priest",
	"BLACK MAGIC": "wizard",
	"TIME MAGIC": "time-mage",
	"YIN-YANG MAGIC": "oracle",
	SUMMON: "summoner",
	"SUMMON MAGIC": "summoner",
	"TALK SKILL": "mediator",
	ELEMENTAL: "geomancer",
	JUMP: "lancer",
	"DRAW OUT": "samurai",
	THROW: "ninja",
	SING: "bard",
	DANCE: "dancer",
	GUTS: "ramza-squire",
	"HOLY SWORD": "holy-knight",
	"DARK SWORD": "dark-knight",
	SNIPE: "engineer",
	"MIGHTY SWORD": "divine-knight",
	"MAGIC SWORD": "temple-knight",
	LIMIT: "soldier",
};
const abilityOwner = new Map();
for (const job of jobs)
	for (const id of job.abilities)
		if (!abilityOwner.has(id)) abilityOwner.set(id, job.id);
const goodStatuses = [
	"Haste",
	"Protect",
	"Shell",
	"Regen",
	"Reraise",
	"Reflect",
	"Float",
	"Transparent",
	"Faith",
];
const badStatuses = [
	"Don't Act",
	"Don't Move",
	"Death Sentence",
	"Poison",
	"Slow",
	"Stop",
	"Sleep",
	"Silence",
	"Darkness",
	"Blind",
	"Confusion",
	"Charm",
	"Frog",
	"Petrify",
	"Berserk",
	"Chicken",
	"Innocent",
	"Undead",
	"Dead",
];
const statusSlug = (s) =>
	({
		"Don't Act": "disable",
		"Don't Move": "immobilize",
		Darkness: "blind",
		"Death Sentence": "doom",
		Dead: "death",
	})[s] || slug(s);
const abilities = records
	.filter(
		(r) => r.section.startsWith("Abilities /") && r.id !== "ability-legend",
	)
	.map((r) => {
		const f = fields(r);
		const name = r.name;
		const job =
			commandJobs[r.section.split(" / ")[1]] ||
			abilityOwner.get(r.id) ||
			"monster";
		const formula = plain(
			r.text.match(
				/\*\*Effect and formula:\*\*\s*([\s\S]*?)(?=\n\*Source:|\n####|$)/,
			)?.[1] || "",
		);
		const effect =
			formula || plain(sectionText(r, "Description and source evaluation"));
		const passive =
			["reaction", "support", "movement"].includes(r.type) ||
			/^(Level Jump\d+|Vertical Jump\d+|Exp|Level|Height|CT|Prime Number|3|4|5)$/.test(
				name,
			);
		let type = passive
			? "passive"
			: f.type === "magical"
				? "magic"
				: "physical";
		if (!passive && /^(?:Restore|Heals)|recovers HP|recover HP/i.test(effect))
			type = "heal";
		const status =
			[...goodStatuses, ...badStatuses].find((s) =>
				new RegExp(
					`(?:Add:|Inflict|adds?|inflicts?)\\s*(?:[^.]{0,24} )?${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
					"i",
				).test(effect),
			) ||
			[...goodStatuses, ...badStatuses].find(
				(s) => name.toLowerCase() === s.toLowerCase(),
			);
		if (
			!passive &&
			(status || /Success%|Target's|Steal|Break|Talk/.test(effect)) &&
			!/Damage|damage|Drain|drain|Restore|Heals/.test(effect)
		)
			type =
				goodStatuses.includes(status) ||
				/Target's (?:PA|MA|Speed) \+/.test(effect)
					? "buff"
					: "status";
		if (/^(Accumulate|Yell|Scream|Cheer Up|Praise|Preach)$/.test(name))
			type = "buff";
		if (
			/^(Cure(?: [234])?|Potion|Hi-Potion|X-Potion|Chakra|Wish|Moogle|Fairy|Murasame|White Wind|Life Song|Elixir)$/.test(
				name,
			)
		)
			type = "heal";
		if (/^(Raise(?: 2)?|Revive|Phoenix Down|Resurrection)$/.test(name))
			type = "revive";
		const factor = number(
			formula.match(/MA\s*\*\s*(\d+)/)?.[1],
			number(formula.match(/PA\s*\*\s*(\d+)/)?.[1], 0),
		);
		let power = factor
			? Math.round(
					Math.min(320, Math.max(75, factor * (f.type === "magical" ? 5 : 13))),
				)
			: 100;
		if (/Potion/.test(name))
			power = name === "Potion" ? 30 : name === "Hi-Potion" ? 70 : 150;
		if (type === "heal" && !/Potion/.test(name)) power = Math.max(85, power);
		if (type === "revive") power = 30;
		if (type === "status" || type === "buff" || passive) power = 0;
		const jp = number(
			f.JP,
			number(
				r.text.match(/(?:Learn cost:|-)\s*(\d+) JP/)?.[1],
				r.type === "action" ? 0 : 200,
			),
		);
		const range = /Auto/.test(f.range || "")
			? 0
			: /weapon/.test(f.range || "")
				? 1
				: Math.min(
						12,
						number(
							f.range,
							number(
								r.text.match(/\*\*Range:\*\* (\d+)/)?.[1],
								/Potion|Phoenix Down|Ether|Remedy|Antidote|Eye Drop|Soft|Holy Water/.test(
									name,
								)
									? 4
									: type === "magic" || type === "heal" || type === "status"
										? 4
										: 1,
							),
						),
					);
		const area = Math.max(
			0,
			Math.min(
				4,
				number(
					f.effect_area,
					number(r.text.match(/\*\*Effect:\*\* (\d+)/)?.[1], 1),
				) - 1,
			),
		);
		return {
			id: r.id,
			name,
			job,
			cost: jp,
			jp,
			mp: number(f.MP),
			range,
			power,
			type,
			kind: type,
			area,
			aoe: area,
			ct: number(f.CTR),
			status: status ? statusSlug(status) : undefined,
			category: r.type,
			description:
				effect ||
				plain(sectionText(r, "Mechanics and trigger context")).slice(0, 450) ||
				name,
			sourceId: r.id,
			sourceStats: f,
			formula,
			element: {
				F: "fire",
				I: "ice",
				L: "lightning",
				H: "holy",
				D: "dark",
				W: "water",
				E: "earth",
				A: "wind",
			}[f.ELEM],
			target: /ally/.test(f.effect_area)
				? "ally"
				: /enemy/.test(f.effect_area)
					? "enemy"
					: undefined,
			reflectable: f.REFL === "+",
			calculator: f.CALC === "+",
			adaptation:
				"Magnitude and specialist effects use the browser tactical engine; original formula retained for inspection.",
		};
	});
abilities.unshift({
	id: "attack",
	name: "Attack",
	job: "all",
	cost: 0,
	jp: 0,
	mp: 0,
	range: 1,
	power: 100,
	type: "physical",
	kind: "physical",
	area: 0,
	aoe: 0,
	ct: 0,
	description:
		"Strike with the equipped weapon. Side and rear attacks reduce evasion.",
	sourceId: "mechanics-2-1",
});
const abilityById = Object.fromEntries(abilities.map((a) => [a.id, a]));
// Semantic effect descriptors keep non-damage commands distinct. The engine
// consumes these where supported; originals remain available for comparison.
for (const a of abilities) {
	const n = a.name;
	const formula = a.formula || "";
	if (/^Charge \+/.test(n)) {
		a.effect = "charge";
		a.power = 100 + number(n.match(/\d+/)?.[0]) * 8;
		a.ct = Math.max(2, Math.ceil(number(n.match(/\d+/)?.[0]) / 2));
		a.range = 5;
	}
	if (a.job === "ninja" && a.category === "direct") {
		a.effect = "throw";
		a.range = 5;
		a.power = /Knight Sword|Katana/.test(n) ? 140 : 110;
	}
	if (
		[
			"Antidote",
			"Echo Grass",
			"Eye Drop",
			"Holy Water",
			"Maiden's Kiss",
			"Remedy",
			"Soft",
			"Stigma Magic",
			"Esuna",
			"Heal",
			"Silf",
			"Choco Esuna",
		].includes(n)
	) {
		a.type = "heal";
		a.power = 0;
		a.effect = "cleanse";
		a.target = "ally";
		a.cures =
			n === "Antidote"
				? ["poison"]
				: n === "Echo Grass"
					? ["silence"]
					: n === "Eye Drop"
						? ["blind"]
						: n === "Holy Water"
							? ["undead"]
							: n === "Maiden's Kiss"
								? ["frog"]
								: n === "Soft"
									? ["petrify"]
									: [
											"poison",
											"blind",
											"silence",
											"confusion",
											"sleep",
											"frog",
											"petrify",
											"doom",
											"disable",
											"immobilize",
										];
	}
	if (n === "Ether" || n === "Hi-Ether" || n === "Angel Song") {
		a.type = "heal";
		a.effect = "restore-mp";
		a.power = n === "Hi-Ether" ? 50 : 20;
		a.target = "ally";
	}
	if (n === "Elixir") {
		a.effect = "restore-all";
		a.power = 999;
	}
	if (/Steal (Accessry|Armor|Helmet|Shield|Weapon)/.test(n)) {
		a.effect = "steal";
		a.slot = {
			Accessry: "accessory",
			Armor: "body",
			Helmet: "head",
			Shield: "shield",
			Weapon: "weapon",
		}[n.split(" ")[1]];
	}
	if (/^(Armor|Head|Shield|Weapon) Break$/.test(n)) {
		a.effect = "break";
		a.slot = {
			Armor: "body",
			Head: "head",
			Shield: "shield",
			Weapon: "weapon",
		}[n.split(" ")[0]];
	}
	if (/^(Gil Taking|Negotiate)$/.test(n)) a.effect = "steal-gil";
	if (n === "Steal Exp.") a.effect = "steal-exp";
	if (n === "Invitation") a.effect = "invite";
	if (/^(Life Drain|Night Sword|Drain Touch|Blood Suck)$/.test(n)) {
		a.effect = "drain";
		a.drain = 1;
	}
	if (/^(Life Drain|Demi|Demi 2|Lich)$/.test(n)) {
		a.percent = n === "Demi 2" || n === "Lich" ? 0.5 : 0.25;
	}
	if (n === "Spell Absorb" || n === "Dark Sword") a.effect = "drain-mp";
	if (/^(Magic Break|Witch Hunt|Bizen Boat)$/.test(n)) {
		a.effect = "damage-mp";
		a.power = 15;
	}
	if (n === "Dispel Magic" || /^Despair/.test(n)) a.effect = "dispel";
	if (/^(Quick|Last Song|Persuade|Last Dance|Return(?: 2)?)$/.test(n)) {
		a.effect = "ct";
		a.amount = n === "Quick" || n === "Last Song" ? 100 : -100;
		a.type = a.amount > 0 ? "buff" : "status";
	}
	const stat = formula
		.split("Success%")[0]
		.match(/(?:Target's\s+)?(Brave|Faith|Speed|PA|MA)\s*([+-])\s*(\d+)/);
	if (stat && !/MartialArts|Damage =|Restore/.test(formula)) {
		a.effect = "stat";
		a.stat = {
			Brave: "brave",
			Faith: "faith",
			Speed: "speed",
			PA: "pa",
			MA: "ma",
		}[stat[1]];
		a.amount = Number(stat[3]) * (stat[2] === "-" ? -1 : 1);
		a.type = a.amount > 0 ? "buff" : "status";
	}
	if (n === "Scream") {
		a.effect = "scream";
		a.stat = "pa";
		a.amount = 1;
	}
	if (n === "Level Blast") {
		a.type = "status";
		a.effect = "stat";
		a.stat = "level";
		a.amount = -1;
	}
	if (n === "Foxbird") {
		a.type = "status";
		a.effect = "stat";
		a.stat = "brave";
		a.amount = -30;
	}
	if (n === "Dragon Tame") {
		a.effect = "invite";
		a.targetJobs = [
			"dragon",
			"blue-dragon",
			"red-dragon",
			"hyudra",
			"hydra",
			"tiamat",
			"holy-dragon",
		];
	}
	if (n === "Dragon LevelUp") {
		a.type = "buff";
		a.effect = "ct";
		a.amount = 100;
		a.targetJobs = [
			"dragon",
			"blue-dragon",
			"red-dragon",
			"hyudra",
			"hydra",
			"tiamat",
			"holy-dragon",
		];
	}
	if (n === "Nameless Song") {
		a.type = "buff";
		a.statusOptions = ["reraise", "regen", "protect", "shell", "reflect"];
	}
	if (n === "Nameless Dance") {
		a.type = "status";
		a.statusOptions = [
			"blind",
			"confusion",
			"silence",
			"frog",
			"poison",
			"slow",
			"stop",
			"sleep",
		];
	}
	if (n === "Finish Touch") {
		a.type = "status";
		a.statusOptions = ["death", "petrify", "stop"];
	}
	if (n === "MBarrier")
		a.statuses = ["regen", "reraise", "haste", "protect", "shell"];
	if (n === "Wall" || n === "Kiyomori") a.statuses = ["protect", "shell"];
	if (n === "Masamune") a.statuses = ["haste", "regen"];
	if (
		/^(Battle Song|Cheer Song|Magic Song|Life Song|Angel Song|Nameless Song|Last Song)$/.test(
			n,
		)
	) {
		a.range = 99;
		a.area = a.aoe = 99;
		a.target = "ally";
		a.repeat = true;
	}
	if (a.job === "dancer" && a.type !== "passive") {
		a.range = 99;
		a.area = a.aoe = 99;
		a.target = "enemy";
		a.repeat = true;
	}
	if (n === "Death") {
		a.type = "status";
		a.status = "death";
		a.power = 0;
	}
	if (n === "Golem") {
		a.type = "buff";
		a.status = "protect";
		a.power = 0;
		a.target = "ally";
	}
	if (n === "Zodiac") {
		a.learnOnlyBySurviving = true;
		a.area = a.aoe = 3;
		a.power = 320;
	}
	if (n === "Ultima") a.learnOnlyBySurviving = true;
	if (n === "Level Jump2")
		a.description =
			"Allows Jump to reach 2 panels horizontally. Corrected by the guide errata; the old jobs supplement says 3.";
	if (/^Level Jump/.test(n)) {
		a.effect = "jump-range";
		a.amount = number(n.match(/\d+/)?.[0]);
	}
	if (/^Vertical Jump/.test(n)) {
		a.effect = "jump-height";
		a.amount = number(n.match(/\d+/)?.[0]);
	}
	if (/^Move \+/.test(n)) {
		a.effect = "move";
		a.amount = number(n.match(/\d+/)?.[0]);
	}
	if (/^Jump \+/.test(n)) {
		a.effect = "jump";
		a.amount = number(n.match(/\d+/)?.[0]);
	}
	if (/^Cancel: Dead/.test(formula)) {
		a.type = "revive";
		a.power = n === "Raise 2" ? 100 : n === "Raise" ? 50 : 20;
		a.target = "ally";
	}
	if (
		a.type === "revive" ||
		/^Potion$|^Hi-Potion$|^X-Potion$|^Ether$|^Hi-Ether$|^Elixir$/.test(n)
	)
		a.fixed = true;
	a.kind = a.type;
}
for (const job of jobs)
	job.abilities = job.abilities.filter((id) => abilityById[id]);
// Records link some duplicate names through command sets rather than job prose.
for (const ability of abilities) {
	const job = jobs.find((j) => j.id === ability.job);
	if (job && !job.abilities.includes(ability.id))
		job.abilities.push(ability.id);
}
const monsters = records.filter(
	(r) =>
		r.section.startsWith("Bestiary /") &&
		r.id.startsWith("monster-") &&
		!r.id.startsWith("monster-family-") &&
		r.id !== "monster-legend",
);
for (const r of monsters) {
	const id = slug(r.name);
	const linked = refs(r, "ability-");
	if (jobs.some((j) => j.id === id)) continue;
	const move = number(
		r.text
			.match(/(\d+) Move|Move: (\d+)/)
			?.slice(1)
			.find(Boolean),
		4,
	);
	const jump = number(
		r.text
			.match(/(\d+) Jump|Jump: (\d+)/)
			?.slice(1)
			.find(Boolean),
		3,
	);
	jobs.push({
		id,
		name: r.name,
		description: plain(sectionText(r, "Overview") || r.text).slice(0, 250),
		abilities: linked.filter((a) => abilityById[a]),
		requires: [],
		prerequisites: [],
		special: true,
		monster: true,
		move,
		jump,
		speed: 8,
		stats: { hp: 108, mp: 50, pa: 11, ma: 9, speed: 8, move, jump },
		sourceId: r.id,
		adaptation:
			"Compact encounter monster scaling; full original stat tables are in the codex.",
	});
}

const equipment = records
	.filter((r) => r.type === "item" || r.type === "item note")
	.map((r) => {
		const f = fields(r);
		const family = r.section.split(" / ")[1] || "Equipment";
		let slot = /Armor|Clothes|Robes/.test(family)
			? "body"
			: /Hats|Helmets|Ribbons/.test(family)
				? "head"
				: /Shields/.test(family)
					? "shield"
					: /Armlet|Armwear|Boot|Shoes|Gauntlet|Glove|Mantle|Ring|Perfume|Accessory/.test(
								family,
							)
						? "accessory"
						: /Chemist|Ninja Items|Thrown Items/.test(family)
							? "item"
							: "weapon";
		if (
			/Potion|Ether|Phoenix|Remedy|Antidote|Echo Grass|Eye Drop|Holy Water|Maiden|Soft|Elixir/.test(
				r.name,
			)
		)
			slot = "item";
		const effects = `${f.EFFECTS || ""} ${f["COMMENTS/SPECIAL"] || ""}`;
		const description = plain(
			sectionText(r, "Item description and walkthrough notes") ||
				sectionText(
					r,
					"Description and equipment permissions \\(item-list source\\)",
				) ||
				sectionText(r, "Source item note"),
		).slice(0, 550);
		const wp = number(f.WP);
		const level = number(f["E.LV"], 1);
		const effectStat = (stat) =>
			number(effects.match(new RegExp(`${stat}\\s*\\+\\s*(\\d+)`, "i"))?.[1]);
		let price = number(
			f.PRICE || f.COST,
			number(
				r.text.match(/\*\*Cost:\*\*\s*(\d[\d,]*)/)?.[1],
				slot === "item" ? 150 : 500,
			),
		);
		if (r.name === "Potion") price = 50;
		if (r.name === "Phoenix Down") price = 300;
		const nonShopPoaches = [
			"Blood Sword",
			"Cachusha",
			"Chantage",
			"Cherche",
			"Defender",
			"Dragon Rod",
			"Dragon Whisker",
			"Elixir",
			"Fairy Harp",
			"FS Bag",
			"Healing Staff",
			"Holy Lance",
			"Ivory Rod",
			"Madlemgen",
			"Nagrarock",
			"Ribbon",
			"Rubber Costume",
			"Ryozan Silk",
			"Salty Rage",
			"Scorpion Tail",
			"Setiemson",
			"Stone Gun",
			"Ultimus Bow",
			"Whale Whisker",
			"Zorlin Shape",
		];
		return {
			id: r.id,
			name: r.name,
			slot,
			type: family,
			power: wp,
			price,
			chapter: Math.min(4, Math.max(1, Math.ceil(level / 14))),
			description:
				description ||
				`${r.name}. Inspect the source record for original equipment details.`,
			sourceId: r.id,
			sourceStats: f,
			sourceEffects: effects.trim(),
			pa:
				slot === "weapon" ? Math.max(0, Math.round(wp / 3)) : effectStat("PA"),
			ma: effectStat("MA"),
			hp: number(f["HP+"]),
			mp: number(f["MP+"]),
			speed: effectStat("Sp"),
			move: effectStat("Move"),
			jump: effectStat("Jump"),
			evasion: number(f["P."], number(f.Ev)),
			magicEvasion: number(f["M."]),
			rare:
				price === 10 ||
				nonShopPoaches.includes(r.name) ||
				/\*\*Cost:\*\* NA/.test(r.text) ||
				["Bags", "Perfumes", "Ribbons"].includes(family),
			poachable: /Poach/.test(description),
			randomEnemyEquippable: !/^\(/.test(f["E.LV"] || ""),
			adaptation:
				"Shop chapter and weapon PA bonus are compact-campaign balance values; original WP, price, effects and acquisition text are retained. E.LV parentheses restrict random enemy equipment, not shop availability.",
		};
	});
for (const row of byId["equipment-family-chemist-items"].text.matchAll(
	/^\| ([^|]+) \| ([\dNA]+) \| ([^|]+) \| ([^|]+) \|/gm,
)) {
	const item = equipment.find((item) => item.name === row[1]);
	if (!item) continue;
	item.price = row[2] === "NA" ? 10000 : number(row[2]);
	item.sourceStats = { ...item.sourceStats, PRICE: row[2], EFFECT: row[4] };
	item.description += ` ${row[4]}.`;
	item.rare = row[2] === "NA";
	item.chapter = /Hi-|Remedy|Holy Water/.test(item.name)
		? 2
		: item.name === "X-Potion"
			? 3
			: 1;
}
const itemAliases = {
	"item-notes-escutcheon-shields": "item-80",
	"item-notes-escutcheon-ii-shields": "item-8f",
	"item-notes-javelin-spears": "item-63",
	"item-notes-108-gems-armwear": equipment.find(
		(item) =>
			item.name === "108 Gems" && item.id !== "item-notes-108-gems-armwear",
	)?.id,
	"item-mace-contribution": equipment.find(
		(item) => item.name === "Mace of Zeus",
	)?.id,
};
for (const [aliasId, canonicalId] of Object.entries(itemAliases)) {
	const alias = equipment.find((item) => item.id === aliasId);
	const canonical = equipment.find((item) => item.id === canonicalId);
	if (alias && canonical)
		Object.assign(alias, canonical, {
			id: aliasId,
			name: alias.name,
			sourceId: aliasId,
			aliasOf: canonicalId,
		});
}
for (const a of abilities) {
	if (a.job === "chemist" && a.category === "direct") {
		const item = equipment.find(
			(item) => item.name === a.name && item.slot === "item",
		);
		if (item) a.consumable = item.id;
	}
	if (a.job === "samurai" && a.type !== "passive")
		a.requiresItem = equipment.find((item) => item.name === a.name)?.id;
}

const chapters = [
	{
		id: 1,
		name: "The Meager",
		subtitle: "A noble name. A divided kingdom.",
		description:
			"Ramza and Delita leave the academy to suppress the Death Corps, discovering that noble privilege and the common people demand very different loyalties.",
	},
	{
		id: 2,
		name: "The Manipulator & the Subservient",
		subtitle: "Two lions claim one crown.",
		description:
			"A princess, a mercenary, and an ancient stone draw Ramza into the War of the Lions. The Church offers sanctuary while concealing a darker purpose.",
	},
	{
		id: 3,
		name: "The Valiant",
		subtitle: "Truth makes a heretic.",
		description:
			"Branded a heretic, Ramza follows the Germonik Scriptures and the Zodiac Stones to Riovanes, where Alma and the truth are held captive.",
	},
	{
		id: 4,
		name: "Somebody to Love",
		subtitle: "History remembers the victor.",
		description:
			"The Lucavi prepare their resurrection. Ramza abandons titles and acclaim to rescue Alma and stop the ritual, while Delita reaches for the throne.",
	},
];

// Ordered guide encounters. Roster counts follow their battle records; maps,
// reward economy, level scaling and these short scene paraphrases are adapted.
const battleSpecs = [
	[
		"campaign-prologue",
		"monastery",
		"Knight:3,Archer:2",
		"Ramza serves as a mercenary at Orbonne. Agrias shields Princess Ovelia, but a surprise assault lets Delita carry the princess away.",
		null,
		null,
		[1, 2, 3, 4],
	],
	[
		"battle-2-1a",
		"town",
		"Squire:4,Chemist:1",
		"A year earlier, the academy sends Ramza and Delita into Gariland. Desperate veterans of the Fifty Year War have become the Death Corps.",
		null,
		null,
		[5, 6],
	],
	[
		"battle-2-1b",
		"plains",
		"Squire:4,Thief:1,Red Panther:1",
		"The cadets find Algus surrounded. Ramza places a stranger’s life above the orders of his rank, beginning a journey into the rebellion.",
		null,
		"Algus",
		[7, 8, 9],
	],
	[
		"battle-2-1c",
		"forest",
		"Bomb:2,Goblin:2,Black Goblin:1,Red Panther:1",
		"Between the estates of Igros and the slums of Dorter, monsters stalk Sweegy Woods. The cadets learn to fight as a company.",
		null,
		null,
		[10],
	],
	[
		"battle-2-1d",
		"town",
		"Knight:1,Wizard:2,Archer:3",
		"On Dorter’s rain-slick roofs, Death Corps fighters protect a kidnapping plot. Wiegraf’s rebellion is more organized than the nobles admit.",
		null,
		null,
		[11, 12],
	],
	[
		"battle-2-1e",
		"ruins",
		"Archer:1,Monk:2,Knight:3",
		"The search reaches the Sand Rat Cellar. Marquis Elmdor is rescued, but the connection between the kidnapping and the Beoulve household remains troubling.",
		null,
		null,
		[13, 14, 15],
	],
	[
		"battle-2-1f",
		"fort",
		"Miluda@Knight!,Priest:2,Thief:3",
		"Miluda rejects the claim that birth makes one life worth more than another. Ramza begins to question the justice he was sent to defend.",
		"Miluda",
		null,
		[16, 17, 18, 19, 20],
	],
	[
		"battle-2-1g",
		"highlands",
		"Miluda@Knight!,Wizard:2,Time Mage:1,Knight:2",
		"The cadets corner Miluda at Lenalia. Their victory deepens the blood feud and forces Ramza to face the cost of obedience.",
		"Miluda",
		null,
		[21],
	],
	[
		"battle-2-1h",
		"windmill",
		"Wiegraf@Holy Knight!,Boco@Yellow Chocobo,Knight:1,Monk:2",
		"Wiegraf confronts the nobles at Fovoham’s windmill. Delita learns that his sister Teta has been taken to Fort Zeakden.",
		"Wiegraf",
		null,
		[22, 23, 24],
	],
	[
		"battle-2-1i",
		"snow",
		"Algus@Archer!,Wizard:2,Knight:3",
		"Algus shoots Teta to break the hostage standoff. Delita’s grief becomes fury, and the explosion at Zeakden shatters both men’s old lives.",
		"Algus",
		null,
		[25],
	],
	[
		"battle-2-2a",
		"town",
		"Thief:2,Archer:2,Wizard:2",
		"Back in the present, Ramza, Agrias and Gafgarion pursue Ovelia. Dorter’s ambush proves that someone is paying to stop them.",
		null,
		null,
		[26, 27, 28],
	],
	[
		"battle-2-2b",
		"forest",
		"Goblin:5,Black Goblin:1",
		"The company finds Wiegraf’s former chocobo Boco beset by goblins. Protecting him gives the party an unexpected companion.",
		null,
		"Boco",
		[29],
	],
	[
		"battle-2-2c",
		"falls",
		"Knight:5,Gafgarion@Dark Knight",
		"At Zirekile Falls, Gafgarion’s orders turn against Ovelia. Delita helps the princess escape the men who would make her a pawn.",
		null,
		"Ovelia",
		[30],
	],
	[
		"battle-2-2d",
		"town",
		"Knight:2,Archer:2,Wizard:2",
		"Mustadio flees men seeking a strange stone found in Goug. Ramza intervenes, joining the princess’s plight to an older mystery.",
		null,
		"Mustadio",
		[31, 32],
	],
	[
		"battle-2-2e",
		"highlands",
		"Knight:2,Archer:2,Summoner:2",
		"Pursuers catch the company on Bariaus Hill. The party presses toward Cardinal Draclau’s promised protection at Lionel.",
		null,
		null,
		[33, 34, 35],
	],
	[
		"battle-2-2f",
		"swamp",
		"Skeleton:2,Ghoul:2,Bone Snatch:2",
		"The marsh road to Goug is haunted by the unquiet dead. Mustadio’s stone has stirred powerful interests beyond the battlefield.",
		null,
		null,
		[],
	],
	[
		"battle-2-2g",
		"town",
		"Thief:2,Archer:2,Summoner:2",
		"Ludovich captures Mustadio and his father Besrodio. Ramza breaks the trap and learns the stone is part of the legendary Zodiac Brave story.",
		null,
		null,
		[36, 37, 38, 39, 40],
	],
	[
		"battle-2-2h",
		"valley",
		"Knight:2,Archer:2,Wizard:2",
		"Agrias escapes Lionel with news of betrayal. Ramza meets her in Bariaus Valley and learns that Ovelia faces an execution.",
		null,
		"Agrias",
		[41],
	],
	[
		"battle-2-2i",
		"execution",
		"Gafgarion@Dark Knight!,Knight:3,Archer:2,Time Mage:2",
		"The execution is a lure. Gafgarion demands the stone and forces Ramza to choose between mercenary orders and the people he protects.",
		null,
		null,
		[42, 43],
	],
	[
		"battle-2-2j",
		"castle",
		"Gafgarion@Dark Knight!,Knight:3,Archer:2,Summoner:1",
		"Lionel’s gate separates Ramza from his companions. He must overcome Gafgarion while his company fights to reach the courtyard.",
		null,
		null,
		[44],
	],
	[
		"battle-2-2k",
		"cathedral",
		"Queklain@Lucavi!",
		"Cardinal Draclau reveals the stone’s true power and becomes Queklain. The Zodiac Braves legend conceals the return of the Lucavi.",
		"Queklain",
		null,
		[45, 46, 47, 48],
	],
	[
		"battle-2-3a",
		"town",
		"Thief:3,Chemist:2,Mediator:1",
		"At Goland, the company saves the scholar Olan. His unusual knowledge and Orlandu’s trust will matter when history is written.",
		null,
		"Olan",
		[49],
	],
	[
		"battle-2-3b",
		"castle",
		"Zalmo@Priest!,Knight:3,Monk:2",
		"Zalmo arrives to arrest Ramza as a heretic. Alma refuses to abandon her brother and accompanies him to Orbonne’s archives.",
		"Zalmo",
		null,
		[50],
	],
	[
		"battle-2-3c",
		"library",
		"Lancer:3,Chemist:1,Time Mage:2",
		"The monastery’s library comes under attack. Simon entrusts Ramza with the Germonik Scriptures, a text the Church wants buried.",
		null,
		null,
		[51],
	],
	[
		"battle-2-3d",
		"library",
		"Izlude@Lancer!,Knight:2,Archer:2,Summoner:1",
		"Izlude fights for his father Vormav and the Temple Knights. Alma and a Zodiac Stone are seized amid the struggle in the book vaults.",
		"Izlude",
		null,
		[52, 53],
	],
	[
		"battle-2-3e",
		"library",
		"Wiegraf@Holy Knight!,Knight:2,Archer:2,Wizard:1",
		"Wiegraf returns in service to the Temple Knights. Mortally wounded, he accepts the stone’s offer and gives himself to Velius.",
		"Wiegraf",
		null,
		[54, 55, 56],
	],
	[
		"battle-2-3f",
		"highlands",
		"Chemist:2,Thief:1,Archer:1,Squire:2",
		"Fleeing soldiers block the road over Grog Hill. The war devours common people while Ramza follows the trail to his sister.",
		null,
		null,
		[57],
	],
	[
		"battle-2-3g",
		"fort",
		"Malak@Heaven and Hell Knights!,Ninja:3,Summoner:2",
		"Rafa escapes Duke Barinten’s control. Her brother Malak still serves him, torn between loyalty and the truth of Rafa’s suffering.",
		null,
		"Rafa",
		[58, 59],
	],
	[
		"battle-2-3h",
		"forest",
		"Time Mage:2,Wizard:2,Ghoul:1,Revnant:1,Gust:1",
		"Yugou Woods guards the approach to Riovanes. The dead and their sorcery test the company before the castle’s greater horror.",
		null,
		null,
		[60, 61],
	],
	[
		"battle-2-3i",
		"castle",
		"Malak@Heaven and Hell Knights,Archer:3,Knight:3",
		"At the Riovanes gate, Rafa confronts Malak. Inside, Barinten attempts to control the stones and discovers that Vormav serves something inhuman.",
		null,
		null,
		[62, 63, 64],
	],
	[
		"battle-2-3j",
		"duel",
		"Wiegraf@Holy Knight!",
		"Ramza faces Wiegraf alone. Revenge has consumed the former revolutionary, and a Lucavi waits behind his remaining human face.",
		"Wiegraf",
		null,
		[65],
	],
	[
		"battle-2-3k",
		"rooftop",
		"Elmdor@Samurai!,Celia@Assassin!,Lede@Assassin!",
		"On Riovanes’s roof, Rafa stands against Elmdor and his assassins. Malak falls protecting her; a Zodiac Stone answers grief with restoration rather than corruption.",
		null,
		"Rafa",
		[66, 67, 68, 69],
	],
	[
		"battle-2-4a",
		"highlands",
		"Wizard:2,Knight:1,Archer:1,Lancer:2",
		"The War of the Lions draws toward its crisis. Ramza crosses Doguola Pass in search of Delita and the truth behind the Church’s designs.",
		null,
		null,
		[70, 71],
	],
	[
		"battle-2-4b",
		"town",
		"Meliadoul@Divine Knight!,Ninja:1,Archer:2,Summoner:2",
		"Meliadoul blames Ramza for Izlude’s death. Her relentless sword techniques conceal a daughter’s faith in a father who has betrayed her.",
		"Meliadoul",
		null,
		[72],
	],
	[
		"battle-2-4c",
		"river",
		"Red Chocobo:3,Yellow Chocobo:2,Black Chocobo:1",
		"A flock of chocobos controls the Finath crossing. Their mobility and meteors punish a company that scatters carelessly.",
		null,
		null,
		[73],
	],
	[
		"battle-2-4d",
		"cathedral",
		"Zalmo@Priest!,Oracle:2,Knight:3",
		"At Zeltennia, Delita reveals the manipulation of both armies. Zalmo interrupts their meeting; for a moment the childhood friends fight together again.",
		"Zalmo",
		null,
		[74, 75],
	],
	[
		"battle-2-4e",
		"desert",
		"Balk@Engineer!,Knight:2,Archer:2,Wizard:1",
		"Balk poisons the company in Bed Desert. The Temple Knights will murder any witness to the plan unfolding at Bethla.",
		"Balk",
		null,
		[76],
	],
	[
		"battle-2-4f",
		"fort",
		"Thief:1,Ninja:1,Archer:2,Knight:3",
		"Bethla’s walls hold the rival armies apart. Ramza chooses an approach to the garrison while Delita turns the war to his advantage.",
		null,
		null,
		[77, 78],
	],
	[
		"battle-2-4g",
		"sluice",
		"Wizard:2,Archer:2,Knight:4",
		"Ramza opens the sluice gates, flooding the battlefield and stopping the clash of the two armies. Orlandu joins the company under cover of his own supposed execution.",
		null,
		null,
		[79, 80],
	],
	[
		"battle-2-4h",
		"mountain",
		"Ninja:1,Thief:2,Archer:3",
		"The path east rises over Germinas Peak. Ramza’s company pursues the Lucavi while the political war passes into Delita’s hands.",
		null,
		null,
		[81],
	],
	[
		"battle-2-4i",
		"lake",
		"Summoner:1,Revnant:2,Archer:2,Oracle:1",
		"Ghosts haunt Poeskas Lake on the road to Limberry. The boundary between old war and the present has become thin.",
		null,
		null,
		[82, 83],
	],
	[
		"battle-2-4j",
		"castle",
		"Celia@Assassin!,Lede@Assassin!,Apanda:4",
		"Celia and Lede lure Ramza through Limberry’s gates. The castle is a stage set by the Lucavi, and the assassins reveal their demonic nature.",
		"Celia",
		null,
		[84],
	],
	[
		"battle-2-4k",
		"castle",
		"Elmdor@Samurai!,Celia@Assassin,Lede@Assassin",
		"The marquis fights with Masamune and the Genji equipment. He wears Elmdor’s face, but Zalera now commands the body.",
		"Elmdor",
		null,
		[85, 86],
	],
	[
		"battle-2-4l",
		"crypt",
		"Zalera@Lucavi!,Knight:2,Skeleton:3",
		"In Limberry’s cemetery, Zalera casts off the marquis’s form. Meliadoul sees a stone transform its bearer and joins Ramza against her father’s masters.",
		"Zalera",
		null,
		[87, 88, 89],
	],
	[
		"battle-2-4m",
		"castle",
		"Dycedarg@Holy Swordsman!,Knight:5",
		"At Igros, Zalbag confronts Dycedarg over the murder of their father. Ramza arrives as his family’s struggle becomes another Lucavi awakening.",
		"Dycedarg",
		null,
		[90, 91],
	],
	[
		"battle-2-4n",
		"cathedral",
		"Mediator:2,Summoner:1,Geomancer:2,Priest:1",
		"Ramza reaches Murond as the Temple Knights turn against the Church that sheltered them. Alma is being prepared as the vessel for their resurrection.",
		null,
		null,
		[92, 93],
	],
	[
		"battle-2-4o",
		"cathedral",
		"Vormav@Divine Knight!,Kletian@Wizard!,Rofel@Divine Knight!",
		"Vormav, Kletian and Rofel demand the Scriptures. A brief clash becomes a retreat deeper into the temple and another trap for Ramza.",
		"Vormav",
		null,
		[94],
	],
	[
		"battle-2-4p",
		"cathedral",
		"Zalbag@Holy Swordsman!,Archaic Demon:2,Ultima Demon:1",
		"Vormav has raised Zalbag as an undead servant. Ramza must release his brother from a torment that neither title nor blood can undo.",
		"Zalbag",
		null,
		[95, 96],
	],
	[
		"battle-2-4q",
		"library",
		"Knight:3,Archer:1,Monk:2",
		"The final pursuit returns to Orbonne. Below the familiar monastery lies the route to the dead city, and the company crosses the last threshold together.",
		null,
		null,
		[97, 98],
	],
	[
		"battle-2-4r",
		"library",
		"Rofel@Divine Knight!,Wizard:2,Time Mage:1,Summoner:2",
		"Rofel guards the final vault and opens the passage with his last strength. Ramza follows into a place outside the war’s ordinary geography.",
		"Rofel",
		null,
		[99],
	],
	[
		"battle-2-4s",
		"ruins",
		"Kletian@Wizard!,Ninja:2,Time Mage:2,Samurai:2",
		"In Murond Death City, Kletian stands between the company and Alma. Ancient ruins echo with the magic of a civilization the stones destroyed.",
		"Kletian",
		null,
		[100],
	],
	[
		"battle-2-4t",
		"ruins",
		"Balk@Engineer!,Chemist:1,Dark Behemoth:1,Hyudra:1,Hydra:1",
		"Balk waits in the Lost Sacred Precincts with monstrous allies. The last human servants of the Lucavi defend the path to the airship graveyard.",
		"Balk",
		null,
		[101],
	],
	[
		"battle-2-4u",
		"airship",
		"Hashmalum@Lucavi!",
		"Vormav becomes Hashmalum and offers his own blood to awaken the High Seraph. Ramza reaches Alma as the final seal breaks.",
		"Hashmalum",
		null,
		[102],
	],
	[
		"battle-2-4v",
		"airship",
		"Altima@Lucavi!,Ultima Demon:4",
		"Altima awakens through Alma, but Alma resists. The company fights beside her to break the resurrection and save the sister Ramza refused to abandon.",
		"Altima",
		"Alma",
		[102],
	],
];

const worldCoordinates = {
	town: [30, 45],
	plains: [22, 55],
	forest: [42, 65],
	ruins: [57, 50],
	fort: [20, 30],
	highlands: [38, 25],
	windmill: [22, 20],
	snow: [12, 15],
	falls: [50, 65],
	swamp: [35, 78],
	valley: [47, 65],
	execution: [49, 82],
	castle: [62, 30],
	cathedral: [65, 65],
	library: [43, 50],
	duel: [66, 28],
	rooftop: [66, 28],
	river: [73, 43],
	desert: [73, 63],
	sluice: [78, 56],
	mountain: [85, 31],
	lake: [86, 45],
	crypt: [89, 52],
	airship: [91, 81],
	monastery: [43, 50],
};
function roster(spec) {
	return spec.split(",").flatMap((entry) => {
		const boss = entry.endsWith("!");
		entry = entry.replace(/!$/, "");
		const [label, count = "1"] = entry.split(":");
		const [name, className] = label.split("@");
		return Array.from({ length: Number(count) }, (_, i) => ({
			name: className || count === "1" ? name : `${name} ${i + 1}`,
			job: slug(className || name),
			boss,
		}));
	});
}
const campaign = battleSpecs.map(
	([id, terrain, enemies, summary, boss, guest, scenes], index) => {
		const r = byId[id];
		const chapter = number(id.match(/battle-2-(\d)/)?.[1], 1);
		const [x, y] = worldCoordinates[terrain];
		const objectiveType =
			id === "battle-2-4g"
				? "switches"
				: boss
					? "boss"
					: guest
						? "rescue"
						: "kill";
		const objective =
			objectiveType === "switches"
				? "Open both sluice switches"
				: boss
					? `Defeat ${boss}`
					: guest
						? `Protect ${guest} and defeat all enemies`
						: "Defeat all enemies";
		const sourceObjectives = [
			...r.text.matchAll(/##### Objective\s*([^\n]+)/g),
		].map((m) => m[1]);
		return {
			id,
			name: id === "campaign-prologue" ? "Orbonne Monastery" : r.name,
			chapter,
			terrain,
			mapId: terrain,
			objective,
			objectiveType,
			summary,
			story: summary,
			dialogue: [{ speaker: "The Durai Papers", text: summary }],
			enemies: roster(enemies),
			boss: boss || undefined,
			guest: guest
				? {
						name: guest,
						job: {
							Boco: "yellow-chocobo",
							Ovelia: "priest",
							Mustadio: "engineer",
							Agrias: "holy-knight",
							Olan: "astrologist",
							Rafa: "heaven-and-hell-knights",
							Alma: "priest",
							Algus: "squire",
						}[guest],
					}
				: undefined,
			reward: 500 + index * 175,
			sourceId: id,
			sceneIds: scenes.map((n) => `scene-${String(n).padStart(3, "0")}`),
			sourceObjectives,
			x: x + ((index % 3) - 1) * 3,
			y: y + ((index % 4) - 2) * 2,
			level: 1 + Math.floor(index * 0.8),
			adaptation:
				"Paraphrased scenes; compact original map layout and reward/level curve. Enemy archetypes and encounter order follow the guide.",
		};
	},
);
function insertPhase(after, data) {
	const at = campaign.findIndex((b) => b.id === after);
	const old = campaign[at];
	campaign.splice(at + 1, 0, {
		...old,
		...data,
		sourceId: old.sourceId,
		dialogue: [{ speaker: "The Durai Papers", text: data.summary }],
		story: data.summary,
	});
}
insertPhase("battle-2-3j", {
	id: "battle-2-3j-velius",
	name: "Riovanes — Velius",
	terrain: "crypt",
	mapId: "crypt",
	enemies: roster("Velius@Lucavi!,Archaic Demon:3"),
	boss: "Velius",
	objective: "Defeat Velius",
	summary:
		"Wiegraf surrenders his humanity. Velius calls demons into the chamber, and Ramza’s companions rush to his side before the Lucavi can finish him.",
});
insertPhase("battle-2-4m", {
	id: "battle-2-4m-adramelk",
	name: "Igros — Adramelk",
	enemies: roster("Adramelk@Lucavi!"),
	boss: "Adramelk",
	objective: "Defeat Adramelk",
	summary:
		"Dycedarg becomes Adramelk. Ramza confronts the corruption that destroyed the Beoulve family and carries its unanswered grief onward.",
});
insertPhase("battle-2-4v", {
	id: "battle-2-4v-ajora",
	name: "Airship Graveyard — St. Ajora",
	enemies: roster("St. Ajora@Lucavi!"),
	boss: "St. Ajora",
	objective: "Defeat St. Ajora",
	final: true,
	summary:
		"The High Seraph casts off its first form. With Alma beside them, the company faces St. Ajora’s last incarnation and ends the Lucavi resurrection.",
});
campaign.find((b) => b.id === "battle-2-3j").deploymentLimit = 1;
campaign.find((b) => b.id === "battle-2-4f").alternatives = [
	{
		name: "North Wall",
		enemies: roster("Lancer:2,Monk:1,Archer:2,Summoner:1"),
		sourceId: "battle-2-4f",
	},
];

const optionalSpecs = [
	[
		"optional-colliery-1",
		"Blue Dragon:2,Chemist:2,Uribo:1",
		"Follow the Ghost of Colliery rumor with Beowulf. Search the mine for Reis, a holy dragon hunted for her stone.",
		null,
	],
	[
		"optional-colliery-2",
		"Thief:2,Behemoth:1,King Behemoth:1,Chemist:1",
		"The second floor hides powerful beasts and rare firearms. Beowulf presses deeper into the mine.",
		null,
	],
	[
		"optional-colliery-3",
		"Chemist:5",
		"Armed Chemists defend the final descent. Focus attacks before their healing can undo the company’s progress.",
		null,
	],
	[
		"optional-colliery-passage",
		"Sinogue@Archaic Demon!,Plague:3,Ochu:2",
		"Reis is cornered below the colliery. Save her from Sinogue and reunite her with Beowulf.",
		"Reis",
	],
	[
		"optional-nelveska",
		"Worker 7 New@Worker!,Hyudra:2,Cocatoris:3",
		"An ancient guardian protects Nelveska. Its stone can restore Reis’s human form; rare treasures wait on the pillars.",
		null,
	],
	[
		"optional-zarghidas",
		"Thief:3,Squire:2,Monk:1",
		"Cloud, displaced into Ivalice by Goug’s machine, protects the flower seller. Save him and recover the Materia Blade for his Limit skills.",
		"Cloud",
	],
];
const optionalBattles = optionalSpecs.map(
	([id, enemies, story, guest], index) => ({
		id,
		name: byId[id].name,
		chapter: 4,
		terrain: index < 4 ? "mine" : index === 4 ? "temple" : "town",
		mapId: index < 4 ? "mine" : index === 4 ? "temple" : "town",
		objective: guest
			? `Protect ${guest} and defeat all enemies`
			: "Defeat all enemies",
		objectiveType: guest ? "rescue" : "kill",
		summary: story,
		story,
		dialogue: [{ speaker: "Tavern Rumor", text: story }],
		enemies: roster(enemies),
		guest: guest
			? { name: guest, job: guest === "Cloud" ? "soldier" : "dragoner" }
			: undefined,
		reward: 3500 + index * 500,
		sourceId: id,
		requiresBattle:
			index === 0 ? "battle-2-4m-adramelk" : optionalSpecs[index - 1][0],
		questId: "recruitment-chain",
		level: 38 + index,
		x: 15 + index * 12,
		y: 85,
		adaptation:
			"Source rosters; compact mine/temple maps and deterministic rewards.",
	}),
);
const dungeonFloors = [
	"Nogias",
	"Terminate",
	"Delta",
	"Valkyries",
	"Mlapan",
	"Tiger",
	"Bridge",
	"Voyage",
	"Horror",
	"End",
];
for (const [index, name] of dungeonFloors.entries()) {
	const id = `map-deep-dungeon-${slug(name)}`;
	const r = byId[id];
	const treasures = [
		...r.text.matchAll(/^([A-Z])\s*(\d+):\s*([^,\n]+),\s*([^\n]+)/gm),
	].map((m) => ({
		coordinate: `${m[1]} ${m[2]}`,
		common: m[3].trim(),
		rare: m[4].trim(),
	}));
	const summary =
		index === 9
			? "Elidibs waits at the bottom of the Deep Dungeon. A Summoner who survives Zodiac may learn it, and Byblos may join the company."
			: `Descend through ${name}, floor ${index + 1} of the Deep Dungeon. Search for the hidden exit and recover its rare treasures before ending the battle.`;
	optionalBattles.push({
		id: `deep-${slug(name)}`,
		name: `Deep Dungeon — ${name}`,
		chapter: 4,
		terrain: "dungeon",
		mapId: "dungeon",
		objective:
			index === 9
				? "Defeat Elidibs"
				: "Discover the exit and defeat all enemies",
		objectiveType: index === 9 ? "boss" : "explore",
		summary,
		story: summary,
		dialogue: [{ speaker: "The Durai Papers", text: summary }],
		enemies: roster(
			index === 9
				? "Elidibs@Lucavi!,Apanda:3"
				: index % 3 === 0
					? "Archaic Demon:2,Dark Behemoth:2,Red Dragon:1"
					: index % 3 === 1
						? "Ninja:2,Samurai:2,King Behemoth:1"
						: "Mind Flare:2,Hydra:1,Wizard:2",
		),
		boss: index === 9 ? "Elidibs" : undefined,
		reward: 5000 + index * 600,
		treasures,
		sourceId: id,
		questId: "deep-dungeon",
		requiresBattle: index
			? `deep-${slug(dungeonFloors[index - 1])}`
			: "battle-2-4p",
		level: 45 + index,
		x: 88,
		y: 14 + index * 7,
		adaptation:
			"Floor names, treasure identities and source coordinates preserved; enemy draws, exit positions and compact floor layouts are original remaster choices.",
	});
}
optionalBattles.push({
	id: "rare-eleven-monks",
	name: "Grog Hill — Eleven Monks",
	chapter: 4,
	terrain: "highlands",
	mapId: "highlands",
	objective: "Defeat all enemies",
	objectiveType: "kill",
	summary:
		"The rare south-entry encounter pits the company against eleven Monks.",
	story:
		"The rare south-entry encounter pits the company against eleven Monks.",
	dialogue: [],
	enemies: roster("Monk:11"),
	reward: 7000,
	sourceId: "rare-battles",
	requiresBattle: "battle-2-4a",
	level: 40,
	x: 30,
	y: 15,
});
optionalBattles.push({
	id: "rare-super-monsters",
	name: "Bariaus Hill — Monster Gathering",
	chapter: 4,
	terrain: "highlands",
	mapId: "highlands",
	objective: "Defeat all enemies",
	objectiveType: "kill",
	summary: "A rare gathering of powerful monsters occupies Bariaus Hill.",
	story: "A rare gathering of powerful monsters occupies Bariaus Hill.",
	dialogue: [],
	enemies: roster("Hydra:2,King Behemoth:2,Red Dragon:2"),
	reward: 7000,
	sourceId: "rare-battles",
	requiresBattle: "battle-2-4a",
	level: 43,
	x: 48,
	y: 60,
	adaptation:
		"The guide names a super-monster encounter but does not supply its roster; this roster is an explicit adaptation.",
});
const patrolSpecs = [
	[
		"sweegy",
		"Sweegy Woods",
		"forest",
		"battle-2-1c",
		1,
		"Gobbledeguck:1,Grenade:1,Explosive:1",
		"monster-family-bombs",
	],
	[
		"mandalia",
		"Mandalia Plains",
		"plains",
		"battle-2-1b",
		1,
		"Cuar:1,Vampire:1,Dragon:1",
		"monster-family-red-panthers",
	],
	[
		"zigolis",
		"Zigolis Swamp",
		"swamp",
		"battle-2-2f",
		2,
		"Pisco Demon:1,Squidlarkin:1,Living Bone:1",
		"monster-family-pisco-demons",
	],
	[
		"araguay",
		"Araguay Woods",
		"forest",
		"battle-2-2b",
		2,
		"Flotiball:1,Ahriman:1,Juravis:1,Steel Hawk:1",
		"monster-family-ahrimans",
	],
	[
		"bariaus",
		"Bariaus Hill",
		"highlands",
		"battle-2-2e",
		2,
		"Bull Demon:1,Minitaurus:1,Sacred:1",
		"monster-family-bull-demons",
	],
	[
		"yugou",
		"Yugou Woods",
		"forest",
		"battle-2-3h",
		3,
		"Woodman:1,Trent:1,Taiju:1",
		"monster-family-woodmen",
	],
	[
		"finath",
		"Finath River",
		"river",
		"battle-2-4c",
		4,
		"Porky:1,Wildbow:1,Morbol:1,Great Morbol:1",
		"monster-family-uribo",
	],
	[
		"germinas",
		"Germinas Peak",
		"mountain",
		"battle-2-4h",
		4,
		"Tiamat:1,Red Dragon:1,Black Chocobo:1",
		"monster-family-hyudras",
	],
];
for (const [
	id,
	location,
	terrain,
	requiresBattle,
	chapter,
	enemies,
	sourceId,
] of patrolSpecs) {
	const summary = `Return to ${location} to train, invite monsters, and use Secret Hunt for Fur Shop goods. This repeatable patrol contains source monster species in an adapted encounter.`;
	optionalBattles.push({
		id: `patrol-${id}`,
		name: `${location} — Wilderness Patrol`,
		chapter,
		terrain,
		mapId: terrain,
		objective: "Defeat all enemies",
		objectiveType: "kill",
		summary,
		story: summary,
		dialogue: [],
		enemies: roster(enemies),
		reward: 600 * chapter,
		sourceId,
		requiresBattle,
		level: 5 + chapter * 6,
		repeatable: true,
		group: "patrol",
		questId: "poaching",
		adaptation:
			"Repeatable patrols make the source’s random-battle training, monster invitation and poaching loop accessible. Species and named areas are source content; fixed encounter compositions and menu-based access are added.",
	});
}

// Preserve monster and unique enemy identities even when their source has no
// generic job menu entry. These remain recruit-only or encounter-only classes.
const namedClasses = {
	queklain: ["class-43", ["ability-0c2", "ability-0bc", "ability-0c3"]],
	velius: [
		"class-3c",
		["ability-04a", "ability-0bf", "ability-0bb", "ability-0c0"],
	],
	zalera: [
		"class-3e",
		["ability-0df", "ability-0c2", "ability-0c1", "ability-0dd"],
	],
	adramelk: [
		"class-45",
		["ability-00f", "ability-043", "ability-0bb", "ability-0c0"],
	],
	hashmalum: [
		"class-40",
		["ability-0da", "ability-0c1", "ability-0c3", "ability-0d8", "ability-0d9"],
	],
	altima: ["class-41", ["ability-0e5", "ability-15e"]],
	"st-ajora": ["class-49", ["ability-0e6", "ability-15e"]],
	elidibs: ["class-97", ["ability-04b"]],
	"archaic-demon": ["class-99", []],
	apanda: ["class-96", []],
	"ultima-demon": ["class-9a", ["ability-0e5"]],
	worker: ["class-91", []],
	astrologist: ["class-15", ["ability-0a8"]],
	assassin: ["class-2e", []],
};
for (const [id, [sourceId, extra]] of Object.entries(namedClasses)) {
	const r = byId[sourceId];
	const f = fields(r);
	const command = byId[`command-${f["COMMAND SET"].slice(0, 2).toLowerCase()}`];
	const skillIds = [
		...new Set([...extra, ...(command ? refs(command, "ability-") : [])]),
	].filter((id) => abilityById[id]);
	const move = Math.min(6, number(f.Move, 4));
	const jump = number(f.Jump, 4);
	const stats = {
		hp: Math.max(115, number(f.HPM, 120)),
		mp: Math.max(110, number(f.MPM, 100)),
		pa: Math.round(number(f.PAM, 120) / 9),
		ma: Math.round(number(f.MAM, 120) / 9),
		speed: Math.round(number(f.SpM, 120) / 15),
		move,
		jump,
	};
	jobs.push({
		id,
		name: r.name.split(" — ")[0],
		description: plain(sectionText(r, "Class definition")).slice(-400),
		sourceId,
		sourceStats: f,
		abilities: skillIds,
		requires: [],
		prerequisites: [],
		special: true,
		monster: r.section !== "Classes / Special",
		move,
		jump,
		speed: stats.speed,
		stats,
		immunities: (r.text.match(/IMMUNE: (.*?)(?= INNATE:|\n)/)?.[1] || "")
			.split(", ")
			.map(statusSlug),
		innate: (r.text.match(/INNATE: (.*?)(?=\n)/)?.[1] || "").split(", "),
		adaptation:
			"Original identity, command set and immunities with scaled compact-campaign stats.",
	});
}
for (const b of [...campaign, ...optionalBattles])
	for (const e of b.enemies)
		if (e.job === "lucavi" && namedClasses[slug(e.name)]) e.job = slug(e.name);
const extraJobs = {
	lucavi: ["Lucavi", ["ability-010", "ability-01c", "ability-024"]],
};
for (const [id, [name, skills]] of Object.entries(extraJobs))
	if (!jobs.some((j) => j.id === id))
		jobs.push({
			id,
			name,
			description: "A unique story or monster class.",
			abilities: skills,
			requires: [],
			prerequisites: [],
			special: true,
			monster: id === "lucavi" || id === "worker",
			move: 4,
			jump: 4,
			speed: 7,
			stats: { hp: 120, mp: 80, pa: 8, ma: 8, speed: 7, move: 4, jump: 4 },
			sourceId: id === "lucavi" ? "boss-compendium" : "recruitment-chain",
			adaptation: "Encounter class stats and compact skill selection.",
		});
for (const encounter of [...campaign, ...optionalBattles])
	for (const enemy of encounter.enemies) {
		enemy.level = encounter.level;
		if (!jobs.some((j) => j.id === enemy.job)) {
			const sourceMonster =
				enemy.job === "yellow-chocobo"
					? byId["monster-chocobo"]
					: monsters.find(
							(r) =>
								slug(r.name).includes(enemy.job) ||
								enemy.job.includes(slug(r.name)),
						);
			const match =
				sourceMonster && jobs.find((j) => j.sourceId === sourceMonster.id);
			jobs.push({
				id: enemy.job,
				name: enemy.job
					.split("-")
					.map((s) => s[0].toUpperCase() + s.slice(1))
					.join(" "),
				description: "Encounter archetype adapted from the guide bestiary.",
				abilities: match?.abilities || ["attack"],
				requires: [],
				prerequisites: [],
				special: true,
				monster: true,
				move: match?.move || 4,
				jump: match?.jump || 3,
				speed: 8,
				stats: match?.stats || {
					hp: 115,
					mp: 70,
					pa: 12,
					ma: 10,
					speed: 8,
					move: 4,
					jump: 3,
				},
				sourceId: sourceMonster?.id || "boss-compendium",
				adaptation:
					"Compact encounter archetype; original profile available in source codex.",
			});
		}
	}
const quests = records
	.filter((r) => r.section.startsWith("Quests /"))
	.map((r) => ({
		id: r.id,
		name: r.name,
		type: "rumor",
		chapter: r.id === "propositions" ? 2 : r.id === "poaching" ? 3 : 4,
		description: plain(
			sectionText(r, "Externally sourced battle brief") ||
				sectionText(r, "Unlock, exits and treasure") ||
				sectionText(r, "Source discussion"),
		).slice(0, 1100),
		requirements:
			r.id === "deep-dungeon"
				? ["Complete Murond Holy Place III", "Visit Warjilis"]
				: r.id === "recruitment-chain"
					? [
							"Keep Mustadio",
							"Defeat Adramelk",
							"Buy the Zarghidas flower",
							"Read the Ghost of Colliery and Cursed Island rumors",
						]
					: ["See source record and the available optional routes"],
		rewards:
			r.id === "deep-dungeon"
				? ["Zodiac", "Byblos", "Rare equipment"]
				: r.id === "recruitment-chain"
					? ["Beowulf", "Reis", "Worker 8", "Cloud"]
					: ["Gil", "JP", "Equipment"],
		sourceId: r.id,
		battleIds: optionalBattles
			.filter((b) => b.sourceId === r.id || b.questId === r.id)
			.map((b) => b.id),
	}));
const propositionSpecs = [
	[
		"Secret Society",
		"thief",
		"Trace a secret society through Ivalice’s taverns.",
	],
	[
		"Master Math!",
		"calculator",
		"Solve an academy’s difficult arithmetic commission.",
	],
	[
		"Within the Darkness",
		"priest",
		"Bring a healer’s knowledge to a task beyond the city walls.",
	],
	[
		"Miners Wanted!",
		"archer",
		"Help a mining expedition complete its dangerous work.",
	],
	["One Activity", "geomancer", "Study the land for a local commission."],
	["Defeat Behemoth!", "monk", "Protect travelers from a formidable monster."],
	["Shy Katedona", "mediator", "Use diplomacy to resolve a delicate request."],
	["Machinist Contest", "chemist", "Enter a contest of mechanical ingenuity."],
];
const propositions = propositionSpecs.map(
	([name, preferredJob, description], index) => ({
		id: `proposition-${slug(name)}`,
		name,
		type: "dispatch",
		chapter: index < 4 ? 2 : 3,
		description,
		preferredJob,
		duration: 2 + (index % 3),
		cost: 200 + index * 75,
		reward: { gil: 900 + index * 300, jp: 90 + index * 15 },
		rewards: [`${900 + index * 300} gil`, `${90 + index * 15} JP`],
		requirements: ["Chapter II or later", "Dispatch a generic recruit"],
		sourceId: "propositions",
		adaptation:
			"Names and recommended jobs follow the source E03 additions. Descriptions, availability, cost, reward and battle-count duration fill the guide’s explicitly incomplete calendar.",
	}),
);
quests.push(...propositions);
const equipmentNamed = (name) => {
	const canonical =
		{
			Madlemgem: "Madlemgen",
			Maximillion: "Maximillian",
			"Hi Potion": "Hi-Potion",
		}[name] || name;
	return (
		equipment.find((item) => item.name === canonical && !item.aliasOf) ||
		equipment.find((item) => item.name === canonical) ||
		equipment.find((item) => item.name.startsWith(`${canonical} —`))
	);
};
const poaches = [
	...byId.poaching.text.matchAll(/^\| ([^|]+) \| ([^|]+) \| ([^|]+) \|/gm),
]
	.filter((m) => !["Monster", "---"].includes(m[1]))
	.map((m) => {
		const names = [m[2], m[3]]
			.map((s) => s.replace(/ \([^)]*\)$/, "").trim())
			.map(
				(s) =>
					({ "Bloody Sword": "Blood Sword", "Eye Drops": "Eye Drop" })[s] || s,
			);
		return {
			monster: m[1],
			job: slug(m[1]),
			common: equipmentNamed(names[0])?.id,
			rare: equipmentNamed(names[1])?.id,
			commonName: names[0],
			rareName: names[1],
			sourceId: "poaching",
		};
	});
poaches.push({
	monster: "Tiamat",
	job: "tiamat",
	common: "item-79",
	rare: "item-72",
	commonName: "Ryozan Silk",
	rareName: "Whale Whisker",
	sourceId: "item-79",
	sourceIds: ["item-79", "item-72"],
	note: "The consolidated main poach table stops at Hydra; these results are explicitly stated in both item records.",
});
const familyNames = [
	"chocobos",
	"goblins",
	"bombs",
	"red-panthers",
	"pisco-demons",
	"skeletons",
	"ghouls",
	"ahrimans",
	"juravis",
	"uribo",
	"woodmen",
	"bull-demons",
	"morbols",
	"behemoths",
	"dragons",
	"hyudras",
];
const breedingFamilies = familyNames.map((family, index) => ({
	id: family,
	name: byId[`monster-family-${family}`].name.replace(" — family notes", ""),
	jobs: poaches.slice(index * 3, index * 3 + 3).map((entry) => entry.job),
	sourceId: `monster-family-${family}`,
	sourceIds: [`monster-family-${family}`, "monster-legend", "poaching"],
	aliases:
		family === "chocobos"
			? { chocobo: "yellow-chocobo" }
			: family === "pisco-demons"
				? { mindflare: "mind-flare" }
				: {},
}));
const reproductionRules = {
	braveRange: [40, 70],
	faithRange: [40, 70],
	sourceIds: ["monster-legend", "mechanics-6-10", "mechanics-7-1"],
	sourceRule:
		"A retained monster lays eggs as days pass; offspring belong to its family. Yellow Chocobo can produce Yellow or Black, and Black Chocobo can produce Red.",
	knownOffspring: { "yellow-chocobo": ["yellow-chocobo", "black-chocobo"] },
	unknownSourceValues: [
		"Exact laying probability",
		"Exact hatch duration",
		"Full tier transition probability table",
	],
	adaptationRequired:
		"The source omits numeric breeding timing and probabilities. Any battle-count duration, nursery price, cap, or distribution is a browser-game design choice.",
};
const soldierOfficeRules = {
	job: "squire",
	level: 1,
	braveRange: [40, 70],
	faithRange: [40, 70],
	equipment: {
		body: equipmentNamed("Clothes").id,
		head: equipmentNamed("Leather Hat").id,
	},
	sourceHirePrice: null,
	sourceIds: ["battle-2-1a", "mechanics-7-1", "mechanics-6-10"],
	adaptationRequired:
		"The supplied guide does not state hiring prices. Displayed recruitment fees are an explicit economy choice, not an asserted source value.",
};
const sourceCoordinate = (text) => {
	const m = text.match(/([A-Z])\s*(\d+)/);
	return m
		? {
				x: m[1].charCodeAt(0) - 65,
				z: Number(m[2]) - 1,
				coordinate: `${m[1]} ${m[2]}`,
			}
		: null;
};
const sourceCoordinates = (text) =>
	[...text.matchAll(/\b([A-R])\s*(\d+)\b/g)].map((m) => sourceCoordinate(m[0]));
const sourceMaps = records
	.filter((r) => r.type === "map")
	.map((r) => {
		const heightSection = sectionText(r, "Height(?: Map)?");
		const heightCode = heightSection.match(/```text\n([\s\S]*?)```/)?.[1] || "";
		const header =
			heightCode.split("\n").find((line) => /^\s+A\s+B\s+C/.test(line)) || "";
		const columns = header.match(/\b[A-Z]\b/g) || [];
		const rows = [...heightCode.matchAll(/^\s*(\d+)\s*\]\s*([^\n]+)/gm)];
		const width = columns.length;
		const height = rows.length;
		// t180 and 30t180 are intentional fixed-column guide notation. Splitting on
		// whitespace loses cells, so tokenize prefixed heights and untargetable xXx.
		const rawRows = rows.map(
			(m) => m[2].match(/xXx|[t<>^v]?\d+(?:\.\d+)?(?:[<>^v](?!\d))?/gi) || [],
		);
		const heightRows = rawRows.map((row) =>
			row.map((token) =>
				/^xXx$/i.test(token) ? null : Number(token.replace(/[t<>^v]/gi, "")),
			),
		);
		const terrainSection = sectionText(r, "Terrain(?: Map)?");
		const terrainRows = [
			...terrainSection.matchAll(/^\s*\d+\s*\]\s*([^\n]+)/gm),
		].map((m) => m[1].match(/xXx|[A-Z]/g) || []);
		const kindByTerrain = {
			P: "grass",
			W: "water",
			H: "grass",
			C: "stone",
			L: "rock",
			K: "bridge",
			D: "wood",
			Q: "swamp",
			S: "sand",
			B: "snow",
			G: "roof",
			A: "lava",
			O: "obstacle",
		};
		const tiles = rawRows.flatMap((row, z) =>
			row.map((token, x) => ({
				x,
				z,
				coordinate: `${String.fromCharCode(65 + x)} ${z + 1}`,
				sourceToken: token,
				height: heightRows[z][x] === null ? 0 : heightRows[z][x] / 10,
				sourceHeight: heightRows[z][x],
				blocked: /^t|^xXx$/i.test(token),
				targetable: !/^xXx$/i.test(token),
				present: !/^xXx$/i.test(token),
				slope: token.match(/[<>^v]/)?.[0] || null,
				terrainCode: terrainRows[z]?.[x] || null,
				kind:
					kindByTerrain[terrainRows[z]?.[x]] ||
					(r.section.endsWith("Deep Dungeon") ? "dark" : "grass"),
			})),
		);
		let rowIndex = -1;
		for (const line of heightCode.split("\n")) {
			const row = line.match(/^\s*(\d+)\s*\]/);
			if (row) {
				rowIndex = Number(row[1]) - 1;
				continue;
			}
			if (rowIndex < 0 || /[a-zA-Z]{3}/.test(line)) continue;
			for (const mark of line.matchAll(/d1|1d|d2|2d|u\d+|[<>^v]/g)) {
				const x = Math.round((mark.index - 5) / 4);
				const tile = tiles.find((t) => t.x === x && t.z === rowIndex);
				if (!tile) continue;
				if (/d/.test(mark[0])) {
					tile.depth = number(mark[0].match(/\d/)?.[0]);
					tile.kind = "water";
				} else if (mark[0].startsWith("u")) {
					tile.upperHeight = tile.height;
					tile.lowerHeight = Number(mark[0].slice(1)) / 10;
					tile.layers = [
						{ height: tile.upperHeight, blocked: tile.blocked },
						{ height: tile.lowerHeight, blocked: false },
					];
					tile.height = tile.lowerHeight;
					tile.blocked = false;
				} else tile.slope = mark[0];
			}
		}
		const deployment = sourceCoordinates(sectionText(r, "Starting Grid"));
		const enemyStarts = [
			...sectionText(r, "Enemy Starting Positions").matchAll(
				/(?:^|\n)-?\s*([A-Z]\s*\d+)\s*:\s*([^\n]+)/g,
			),
		].map((m) => ({ ...sourceCoordinate(m[1]), name: m[2].trim() }));
		const guestStarts = [
			...sectionText(r, "Guest Starting Position(?:s)?").matchAll(
				/([^\n]+?) (?:starts on|starts at|on) ([A-Z]\s*\d+)/g,
			),
		].map((m) => ({ ...sourceCoordinate(m[2]), name: m[1].trim() }));
		const exits = sourceCoordinates(sectionText(r, "Exit"));
		const traps = [
			...sectionText(r, "Traps").matchAll(
				/\b([A-Z]\s*\d+):\s*(.*?)(?=\s+-?\s*[A-Z]\s*\d+:|\n|$)/g,
			),
		].map((m) => ({ ...sourceCoordinate(m[1]), name: m[2].trim() }));
		const treasures = [
			...sectionText(r, "Move[ -]Find Item").matchAll(
				/\b([A-Z]\s*\d+):\s*([^,\n]+),\s*(.*?)(?=\s+[A-Z]\s*\d+:|\n|$)/g,
			),
		].map((m) => ({
			...sourceCoordinate(m[1]),
			common: m[2].trim(),
			rare: m[3].trim(),
			commonId: equipmentNamed(m[2].trim())?.id,
			rareId: equipmentNamed(m[3].trim())?.id,
		}));
		const complete =
			width > 0 && height > 0 && rawRows.every((row) => row.length === width);
		return {
			id: r.id,
			name: r.name,
			width,
			height,
			tiles,
			heights: heightRows,
			rawRows,
			terrainRows,
			deployment,
			playerSpawns: deployment,
			enemyStarts,
			enemySpawns: enemyStarts,
			guestStarts,
			exits,
			treasures,
			traps,
			sourceId: r.id,
			complete,
			orientation:
				"x=source letter minus A; z=source row minus 1. No rotation or reflection.",
			note: "Original 10 source units = 1 height. t=standing blocked but targetable; xXx=neither standable nor targetable. Slopes, depth annotations and underpasses retained separately. END lacks a source height grid.",
		};
	});
const campaignMaps = {
	"battle-2-1a": "map-gariland",
	"battle-2-1b": "map-mandalia-plains",
	"battle-2-1c": "map-sweegy-woods",
	"battle-2-1d": "map-dorter-trade-city",
	"battle-2-1e": "map-sand-rat-cellar",
	"battle-2-1f": "map-thieves-fort",
	"battle-2-1g": "map-lenalia-plateau",
	"battle-2-1h": "map-fovoham-plains",
};
for (const b of [...campaign, ...optionalBattles]) {
	b.sourceMapId =
		campaignMaps[b.id] ||
		(b.id.startsWith("deep-")
			? `map-deep-dungeon-${b.id.slice(5)}`
			: undefined);
	const map = sourceMaps.find((m) => m.id === b.sourceMapId);
	if (map?.complete) {
		b.treasures = map.treasures;
		b.mapFidelity =
			"Source height grid, passability, deployment and coordinates available.";
		if (map.enemyStarts.length === b.enemies.length) {
			const remaining = [...b.enemies];
			b.enemies = map.enemyStarts.map((spawn) => {
				const name = spawn.name
					.toLowerCase()
					.replace(/male|female/g, "")
					.trim();
				const match = remaining.findIndex(
					(enemy) =>
						name.includes(enemy.name.toLowerCase()) ||
						name.includes(enemy.job.replace(/-/g, " ")) ||
						(enemy.job === "yellow-chocobo" && name.includes("chocobo")),
				);
				const enemy = remaining.splice(Math.max(0, match), 1)[0];
				return {
					...enemy,
					sourcePosition: { x: spawn.x, z: spawn.z },
					sourcePositionName: spawn.name,
				};
			});
		}
	}
}
const recruitments = [
	{
		id: "boco",
		name: "Boco",
		job: "yellow-chocobo",
		after: "battle-2-2b",
		sourceId: "battle-2-2b",
	},
	{
		id: "mustadio",
		name: "Mustadio",
		job: "engineer",
		after: "battle-2-2g",
		sourceId: "recruitment-chain",
	},
	{
		id: "agrias",
		name: "Agrias",
		job: "holy-knight",
		after: "battle-2-2h",
		sourceId: "special-job-holy-knight",
	},
	{
		id: "rafa",
		name: "Rafa",
		job: "heaven-and-hell-knights",
		after: "battle-2-3k",
		sourceId: "special-job-heaven-and-hell-knights",
	},
	{
		id: "malak",
		name: "Malak",
		job: "heaven-and-hell-knights",
		after: "battle-2-3k",
		sourceId: "special-job-heaven-and-hell-knights",
	},
	{
		id: "orlandu",
		name: "Orlandu",
		job: "holy-swordsman",
		after: "battle-2-4g",
		sourceId: "special-job-holy-swordsman",
	},
	{
		id: "meliadoul",
		name: "Meliadoul",
		job: "divine-knight",
		after: "battle-2-4l",
		sourceId: "special-job-divine-knight",
	},
	{
		id: "beowulf",
		name: "Beowulf",
		job: "temple-knight",
		after: "optional-colliery-passage",
		sourceId: "recruitment-chain",
	},
	{
		id: "reis",
		name: "Reis",
		job: "holy-dragon",
		after: "optional-colliery-passage",
		sourceId: "recruitment-chain",
	},
	{
		id: "worker-8",
		name: "Worker 8",
		job: "worker",
		afterEvent: "goug-worker8",
		sourceId: "recruitment-chain",
	},
	{
		id: "cloud",
		name: "Cloud",
		job: "soldier",
		after: "optional-zarghidas",
		sourceId: "recruitment-chain",
	},
	{
		id: "byblos",
		name: "Byblos",
		job: "byblos",
		after: "deep-end",
		sourceId: "recruitment-chain",
	},
];
const ending = {
	title: "The truth outlives the crown",
	sourceIds: ["scene-103", "scene-105", "scene-106"],
	paragraphs: [
		"The Lucavi resurrection ends at the airship graveyard. Ivalice records Ramza Beoulve as a heretic. Delita marries Ovelia and becomes the king credited with bringing peace.",
		"At the Beoulve graves, Olan and Balmafula mourn. Then Olan sees Ramza and Alma riding away on chocobos. The siblings travel through the forest and leave at dawn; no later sighting is recorded.",
		"Years later, Olan gathers his account into the Durai Papers. The Church, fearing the truth, condemns him as a heretic and burns him at the stake. His papers remain suppressed for centuries.",
		"On Ovelia’s birthday, Delita brings her flowers. Believing he uses everyone and killed Ramza, she stabs him. Delita strikes back; wounded beside her, he wonders what Ramza gained and what he himself has won.",
		"Alazlam Durai finally uncovers the suppressed account. The king has his crown. Ramza and his company have their truth returned to history.",
	],
};

const narrativeAdditions = [
	[
		"battle-2-1b",
		"A name and a station",
		"At Igros, Dycedarg orders the cadets to guard the castle while his knights pursue Elmdor. Algus admits that his family lost its standing through his grandfather’s betrayal. In the courtyard, Alma and Teta greet their brothers, and Zalbag quietly points the cadets toward Dorter.",
		["scene-008", "scene-009"],
	],
	[
		"battle-2-1e",
		"The price of a revolution",
		"Wiegraf kills Gustav for turning the rebellion into a kidnapping scheme, then releases Elmdor in exchange for his own escape. Back at Igros, Dycedarg rebukes Ramza for disobeying orders. Larg pardons the cadets; after they leave, the two nobles reveal that Gustav’s plot served their own plans.",
		["scene-012", "scene-014", "scene-015"],
	],
	[
		"battle-2-1f",
		"The reed flute",
		"The Death Corps raid Igros. Zalbag rescues Alma, but Teta is taken. Dycedarg promises to recover her; Algus insists a noble would never spend soldiers on a common girl. Ramza drives him away. At sunset on Mandalia, Delita asks whether effort can ever overcome birth. The two friends play the reed flutes Balbanes taught them.",
		["scene-017", "scene-018", "scene-019", "scene-020"],
	],
	[
		"battle-2-1h",
		"A sister for a sister",
		"Wiegraf learns that Ramza’s company killed Miluda. He had opposed Golagros’s hostage-taking, but now bars the way in grief and anger. Inside the windmill, Teta is already gone. The last survivors of the Death Corps have carried her to Fort Zeakden.",
		["scene-022", "scene-023", "scene-024"],
	],
	[
		"battle-2-1i",
		"What the family name could not protect",
		"Zalbag ordered the shot that struck Teta. After Algus falls, Delita remains beside his sister as Golagros ignites the fort’s powder stores. Ramza escapes the explosion and abandons his place in House Beoulve. A year passes before he sees Delita again at Orbonne.",
		["scene-025", "scene-026", "scene-027"],
	],
	[
		"battle-2-2g",
		"A counterfeit stone",
		"Mustadio reveals that Bart Company took a fake stone. Ramza realizes that Draclau’s offer of protection was a trap, and the company sails to Warjilis to reach Lionel from another route. Delita meets him there and warns that good intentions will not rescue Ovelia from every power using her. At Lionel, Draclau and Gafgarion prepare their execution-site lure.",
		["scene-038", "scene-039", "scene-040"],
	],
	[
		"battle-2-2i",
		"The princess in the cell",
		"While Ramza survives the trap, Vormav visits Ovelia’s cell. He claims the real princess died and that she was raised as a substitute for a succession plot. Ovelia rejects his account, but he makes clear that her usefulness as a royal symbol matters more to him than her identity. Delita offers escape through the very conspiracy imprisoning her.",
		["scene-043"],
	],
	[
		"battle-2-2k",
		"The war acquires its queen",
		"Delita delivers Ovelia to Goltana and exposes Minister Gelwan as the kidnap plot’s accomplice. Goltana marches on the capital and proclaims Ovelia queen; Larg rallies around Orinas. The Lion War begins. When losses, hunger and refugees mount, Orlandu urges peace. Goltana instead raises taxes and threatens anyone who questions the war.",
		["scene-046", "scene-047", "scene-048"],
	],
	[
		"battle-2-3a",
		"Blood is not proof",
		"In Lesalia, Ramza asks Zalbag to stop the war and accuses Dycedarg of arranging Ovelia’s kidnapping. Zalbag refuses to believe his brother could be involved and sends Ramza away. Alma listens where the household’s commanders will not.",
		["scene-049", "scene-050"],
	],
	[
		"battle-2-3e",
		"Two promises",
		"A messenger at Dorter demands the Germonik Scriptures in exchange for Alma at Riovanes. The book threatens the Church’s account of Ajora. Meanwhile, at Zeltennia, Ovelia despairs of the identity imposed on her. Delita promises to build a country worthy of her and swears by Teta that he will not betray her.",
		["scene-055", "scene-056"],
	],
	[
		"battle-2-3g",
		"Children made into weapons",
		"Rafa explains that Barinten trained war orphans as assassins. He burned her family’s village when its elders refused to surrender their secret skills, then presented himself as her rescuer. Malak still believes they owe him loyalty. Rafa returns to Riovanes to free her brother, knowing Ramza must do the same for Alma.",
		["scene-059"],
	],
	[
		"battle-2-3j-velius",
		"The vessel",
		"Elsewhere in the castle, the dying Izlude tells Alma that the man wearing his father’s face has become Lucavi. Vormav finds her with the Virgo Stone and recognizes the vessel his master requires. Izlude dies knowing Ramza had told the truth; Alma is carried away again.",
		["scene-065"],
	],
	[
		"battle-2-3k",
		"A miracle without a bargain",
		"Malak takes Barinten’s bullet to save Rafa. After the assassins retreat, Rafa’s prayer and the stone restore him without a Lucavi bargain. Searching the ruined castle, the company finds no Alma. Ramza concludes that even the High Priest may be a tool of Vormav’s plan, and resolves to seek Delita in Zeltennia.",
		["scene-066", "scene-067", "scene-068"],
	],
	[
		"battle-2-4d",
		"The third hand in the war",
		"Delita explains the High Priest’s design: provoke revolts, draw both exhausted armies to Bethla, kill their leaders, and let the Church mediate the ruin. His assigned targets include Goltana and Orlandu. Ramza offers the Scriptures as proof and leaves to save the count. Balmafula watches Delita for the Temple Knights, but cannot read all of his intentions.",
		["scene-074", "scene-075"],
	],
	[
		"battle-2-4e",
		"The elder brother’s ambition",
		"Balk’s poison has also reached the Hokuten. In the army’s collapse, Dycedarg kills the stricken Larg. Larg’s dying accusation links Dycedarg to Balbanes’s death, planting the suspicion Zalbag will later carry to his father’s grave.",
		["scene-076"],
	],
	[
		"battle-2-4g",
		"The empty throne",
		"Opening the sluice prevents the armies’ all-out clash. Ramza frees Orlandu, who recognizes Balbanes’s principles in his son and joins the company. Delita kills Goltana and then an impostor dressed as Orlandu, allowing the real count to disappear with Ramza. The Church offers mediation to armies whose leaders are now dead.",
		["scene-079"],
	],
	[
		"battle-2-4i",
		"Poison beneath the earth",
		"Rofel pressures Dycedarg with knowledge of Mosfungus poison and leaves him a Zodiac Stone. Zalbag overhears. At Balbanes’s grave, a chemist identifies the mushrooms growing from the corpse: the general’s fatal illness was murder.",
		["scene-083", "scene-089"],
	],
	[
		"battle-2-4l",
		"The witness at the palace",
		"Meliadoul sees Elmdor transform and understands that her father’s body serves the same power. At Zeltennia, wounded Olan tries to tell Ovelia that Orlandu did not kill Goltana. Delita stops the disclosure. The political victory is leaving fewer people free to tell its story.",
		["scene-087", "scene-088"],
	],
	[
		"battle-2-4m-adramelk",
		"The end of House Beoulve",
		"Zalbag accuses Dycedarg of poisoning their father. Defeat releases Adramelk from the eldest brother’s stone, and Zalbag is taken by the Lucavi. Ramza leaves Igros with neither rank nor family authority left to protect him; rescuing Alma remains his purpose.",
		["scene-090", "scene-091"],
	],
	[
		"battle-2-4p",
		"A brother’s last request",
		"The Lucavi use Zalbag’s dead body against Ramza. Briefly aware of his torment, Zalbag asks to be released. Beyond the chapel, the dying High Priest reveals that Vormav has returned to Orbonne. The same conspiracy that used the Church has now discarded its leader.",
		["scene-092", "scene-095", "scene-096"],
	],
];
for (const [id, title, text, sourceIds] of narrativeAdditions) {
	const b = campaign.find((b) => b.id === id);
	b.storyBeats = [{ title, text, sourceIds, timing: "after" }];
	b.aftermath = text;
}
for (const b of campaign) {
	// The former narrator "dialogue" duplicated the summary and was not a quote.
	b.dialogue = [];
	if (!b.aftermath) b.aftermath = b.summary;
}

const worldEvents = [
	{
		id: "goug-machine",
		name: "The steel sphere",
		location: "Goug Machine City",
		chapter: 4,
		requiresBattle: "battle-2-4m-adramelk",
		requiresParty: ["mustadio"],
		description:
			"Besrodio shows Mustadio and Ramza a steel sphere excavated below Goug. A Zodiac Stone makes its sealed surface respond.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "goland-rumor",
		name: "Ghost of Colliery",
		location: "Goland Coal City",
		chapter: 4,
		requiresEvents: ["goug-machine"],
		description:
			"The tavern reports a monster in the coal mine. Wartime authorities cannot spare knights, and an unusual Holy Dragon has been sighted underground.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "lesalia-beowulf",
		name: "Let us go together",
		location: "Lesalia Imperial Capital",
		chapter: 4,
		requiresEvents: ["goland-rumor"],
		description:
			"A hunter named Beowulf asks to accompany the company to Goland. He is searching for the Holy Dragon for reasons he has not yet explained.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "goug-worker8",
		name: "A command from the past",
		location: "Goug Machine City",
		chapter: 4,
		requiresBattle: "optional-colliery-passage",
		requiresEvents: ["goug-machine"],
		requiresParty: ["mustadio"],
		description:
			"The Aquarius Stone powers the sphere. Worker 8 unfolds, asks for orders, and proves disconcertingly willing to obey Ramza.",
		recruit: { id: "worker-8", name: "Worker 8", job: "worker" },
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "goug-device",
		name: "The celestial machine",
		location: "Goug Machine City",
		chapter: 4,
		requiresEvents: ["goug-worker8"],
		requiresParty: ["mustadio"],
		description:
			"Besrodio has restored a second machine from Goug’s buried civilization. Its markings point to another stone, the Cancer Stone.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "zeltennia-cursed",
		name: "Cursed Island, Nelveska",
		location: "Zeltennia Castle",
		chapter: 4,
		requiresEvents: ["goug-device"],
		description:
			"Fishermen speak of an iron sentinel guarding the ruined island temple. The company sets out to find the machine and the stone it protects.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "nelveska-reis",
		name: "Reis restored",
		location: "Nelveska Temple",
		chapter: 4,
		requiresBattle: "optional-nelveska",
		requiresParty: ["beowulf", "reis"],
		description:
			"Beowulf asks Reis to trust the Cancer Stone. The Holy Dragon enters the temple; a woman emerges from the mist. The curse is broken, and the lovers are reunited.",
		transform: { unitId: "reis", job: "dragoner" },
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "zarghidas-flower",
		name: "A flower for one gil",
		location: "Zarghidas Trade City",
		chapter: 4,
		cost: 1,
		description:
			"A young flower seller offers a bloom in the streets of Zarghidas. Ramza buys it. Later, a stranger from another world will recognize her face.",
		setsFlag: "flowerBought",
		sourceIds: ["scene-080", "recruitment-chain"],
	},
	{
		id: "goug-cloud",
		name: "The man from another world",
		location: "Goug Machine City",
		chapter: 4,
		requiresEvents: ["nelveska-reis", "goug-device"],
		requiresParty: ["mustadio"],
		description:
			"Cancer activates the device. A confused man named Cloud appears, speaks of SOLDIER, and flees with his memories in turmoil. Follow him to Zarghidas.",
		sourceIds: ["recruitment-chain", "scene-105"],
	},
	{
		id: "warjilis-deep",
		name: "A lightless treasure",
		location: "Warjilis Trade City",
		chapter: 4,
		requiresBattle: "battle-2-4p",
		description:
			"Patrons at the Warjilis tavern argue over an island cavern filled with riches, traps and powerful magicians. The Deep Dungeon opens to the company.",
		sourceIds: ["deep-dungeon", "scene-105"],
	},
	{
		id: "bervenia-materia",
		name: "The sword at the summit",
		location: "Bervenia Volcano",
		chapter: 4,
		requiresBattle: "optional-zarghidas",
		requiresParty: ["cloud"],
		description:
			"Climb Bervenia Volcano and search its summit with Move-Find Item to recover Materia Blade. Cloud can now prepare his Limit techniques.",
		items: ["item-20"],
		requiresAbility: "ability-movement-move-find-item",
		sourceIds: ["recruitment-chain", "item-20"],
		adaptation:
			"A guided exploration visit replaces the source random-battle summit search; the job ability and unique sword still gate Limit.",
	},
];
for (const event of worldEvents) {
	event.requiresEvents ||= [];
	event.requiresParty ||= [];
	event.dialogue = [];
}
optionalBattles.find((b) => b.id === "optional-colliery-1").requiresEvents = [
	"lesalia-beowulf",
];
optionalBattles.find((b) => b.id === "optional-nelveska").requiresEvents = [
	"zeltennia-cursed",
];
optionalBattles.find((b) => b.id === "optional-zarghidas").requiresEvents = [
	"goug-cloud",
	"zarghidas-flower",
];
optionalBattles.find((b) => b.id === "deep-nogias").requiresEvents = [
	"warjilis-deep",
];
for (const b of optionalBattles.filter((b) =>
	b.id.startsWith("optional-colliery"),
))
	b.guests = [{ id: "beowulf-guest", name: "Beowulf", job: "temple-knight" }];
optionalBattles.find((b) => b.id === "optional-colliery-passage").guest.job =
	"holy-dragon";
const nelveska = optionalBattles.find((b) => b.id === "optional-nelveska");
nelveska.boss = "Worker 7 New";
nelveska.objectiveType = "boss";
nelveska.objective = "Defeat Worker 7 New and its reserve circuit";
nelveska.enemies[0].reviveOnce = 1;
nelveska.treasures = [
	{
		rare: "Javelin — WP 30",
		rareId: "item-6a",
		common: "Javelin — WP 8",
		commonId: "item-63",
		pillar: "west",
		requiresJump: 5,
		requiresSteppingStone: true,
	},
	{
		rare: "Escutcheon — physical evade 75%",
		rareId: "item-8f",
		common: "Escutcheon — physical evade 10%",
		commonId: "item-80",
		pillar: "east",
		requiresJump: 5,
		requiresSteppingStone: true,
	},
];
nelveska.adaptation +=
	" Exact Nelveska matrix is absent from the guide; source pillar treasure identities and jump/stepping-stone requirements are carried into the designed map.";

const itemLoadouts = [
	["battle-2-2i", "Gafgarion", { weapon: "Blood Sword" }],
	["battle-2-4b", "Meliadoul", { weapon: "Defender", accessory: "Chantage" }],
	["battle-2-4e", "Balk", { weapon: "Blaze Gun" }],
	[
		"battle-2-4k",
		"Elmdor",
		{
			weapon: "Masamune",
			shield: "Genji Shield",
			head: "Genji Helmet",
			body: "Genji Armor",
			accessory: "Genji Gauntlet",
		},
	],
	[
		"battle-2-4m",
		"Dycedarg",
		{
			weapon: "Defender",
			shield: "Aegis Shield",
			head: "Circlet",
			body: "Carabini Mail",
			accessory: "Power Wrist",
		},
	],
	[
		"battle-2-4p",
		"Zalbag",
		{
			weapon: "Rune Blade",
			shield: "Crystal Shield",
			head: "Crystal Helmet",
			body: "Crystal Mail",
			accessory: "Germinas Boots",
		},
	],
	[
		"battle-2-4r",
		"Rofel",
		{
			weapon: "Save the Queen",
			shield: "Crystal Shield",
			head: "Crystal Helmet",
			body: "Crystal Mail",
			accessory: "Germinas Boots",
		},
	],
	[
		"battle-2-4t",
		"Balk",
		{
			weapon: "Blast Gun",
			head: "Thief Hat",
			body: "Light Robe",
			accessory: "Feather Mantle",
		},
	],
	["battle-2-4t", "Chemist", { weapon: "Glacier Gun" }],
	["optional-colliery-2", "Chemist", { weapon: "Blaze Gun" }],
];
for (const [battleId, name, loadout] of itemLoadouts) {
	const b = [...campaign, ...optionalBattles].find((b) => b.id === battleId);
	const enemy = b.enemies.find((e) => e.name === name);
	if (enemy) {
		enemy.equipment = Object.fromEntries(
			Object.entries(loadout)
				.map(([slot, name]) => [slot, equipmentNamed(name)?.id])
				.filter(([, id]) => id),
		);
		enemy.sourceLoadout = b.sourceId;
	}
}
recruitments.find((r) => r.id === "orlandu").equipment = { weapon: "item-23" };
recruitments.find((r) => r.id === "cloud").requiresItem = "item-20";
// These are verified guide acquisition identities. Extra deterministic battle
// awards are marked as adaptations instead of mislabelled source rewards.
for (const [id, names] of [
	["battle-2-4u", ["Ragnarok"]],
	["battle-2-4r", ["Save the Queen"]],
]) {
	const b = campaign.find((b) => b.id === id);
	b.reward = {
		gil: b.reward,
		items: names.map((name) => equipmentNamed(name).id),
	};
	b.rewardNote =
		"Named late-game equipment. Deterministic victory award placement is a remaster adaptation; original source records retain acquisition notes.";
}
campaign.find((b) => b.id === "battle-2-4h").treasures = [
	{
		common: "Potion",
		commonId: "item-notes-potion-chemist-items",
		rare: "Vanish Mantle",
		rareId: "item-eb",
		sourceId: "item-eb",
		adaptation:
			"Germinas Peak acquisition follows the item record; the guide gives no exact coordinate here, so the runtime places a summit cache.",
	},
];
const endFloor = optionalBattles.find((b) => b.id === "deep-end");
endFloor.reward = {
	gil: endFloor.reward,
	items: ["item-25", "item-2f", "item-10"],
};
endFloor.rewardNote =
	"Chaos Blade, Chirijiraden and Sasuke Knife are source equipment. This guaranteed END completion cache is an explicit addition covering the guide’s missing END grid; it is not a claim about original reward placement.";

for (const item of equipment) {
	const routes = [];
	if (!item.rare && !item.aliasOf)
		routes.push({ kind: "shop", chapter: item.chapter, price: item.price });
	for (const p of poaches)
		if (p.common === item.id || p.rare === item.id)
			routes.push({
				kind: "poach",
				monster: p.monster,
				result: p.common === item.id ? "common" : "rare",
				encounters: [...campaign, ...optionalBattles]
					.filter((b) => b.enemies.some((e) => e.job === p.job))
					.map((b) => b.id),
			});
	for (const b of [...campaign, ...optionalBattles]) {
		for (const t of b.treasures || [])
			if (t.commonId === item.id || t.rareId === item.id)
				routes.push({
					kind: "treasure",
					encounter: b.id,
					coordinate: t.coordinate || t.pillar || "designed cache",
					result: t.rareId === item.id ? "rare" : "common",
				});
		for (const e of b.enemies)
			if (Object.values(e.equipment || {}).includes(item.id))
				routes.push({ kind: "steal", encounter: b.id, enemy: e.name });
		if (b.reward?.items?.includes(item.id))
			routes.push({
				kind: "reward",
				encounter: b.id,
				adaptation: b.rewardNote,
			});
	}
	for (const r of recruitments)
		if (Object.values(r.equipment || {}).includes(item.id))
			routes.push({ kind: "recruit", recruit: r.id, after: r.after });
	for (const e of worldEvents)
		if (e.items?.includes(item.id))
			routes.push({ kind: "world-event", event: e.id });
	if (item.aliasOf) routes.push({ kind: "alias", item: item.aliasOf });
	item.acquisitionRoutes = routes;
	if (item.slot === "weapon")
		item.range = /Guns/.test(item.type)
			? 8
			: /Longbows/.test(item.type)
				? 5
				: /Crossbows/.test(item.type)
					? 4
					: /Dictionaries|Instruments/.test(item.type)
						? 3
						: /Spears|Sticks|Cloths/.test(item.type)
							? 2
							: 1;
	item.autoStatuses = [
		...(item.sourceEffects || "").matchAll(
			/Auto-([A-Za-z]+(?: [A-Za-z]+)?)(?=,|;|$)/g,
		),
	].map((m) => statusSlug(m[1]));
	item.initialStatuses = [
		...(item.sourceEffects || "").matchAll(
			/Initial-([A-Za-z]+(?: [A-Za-z]+)?)(?=,|;|$)/g,
		),
	].map((m) => statusSlug(m[1]));
	item.blockStatuses = (item.sourceEffects.match(/Block:\s*([^;]+)/)?.[1] || "")
		.split(",")
		.filter(Boolean)
		.map((s) => statusSlug(s.trim()));
	const onHit = item.sourceEffects.match(/Add:\s*([^;(]+)(?:\s*\((\d+)%\))?/);
	if (onHit)
		item.onHitStatus = {
			status: statusSlug(onHit[1].trim()),
			chance: number(onHit[2], 25),
		};
}

const guestSpec = (name) => ({
	id: slug(name),
	name,
	job: {
		Delita: "squire",
		Algus: "squire",
		Agrias: "holy-knight",
		Gafgarion: "dark-knight",
		Mustadio: "engineer",
		Alma: "priest",
		Rafa: "heaven-and-hell-knights",
		Meliadoul: "divine-knight",
		Zalbag: "holy-swordsman",
	}[name],
	rescueTarget: false,
});
const guestAssignments = {
	"campaign-prologue": ["Agrias", "Gafgarion"],
	"battle-2-1a": ["Delita"],
	"battle-2-1b": ["Delita"],
	"battle-2-1c": ["Delita", "Algus"],
	"battle-2-1d": ["Delita", "Algus"],
	"battle-2-1e": ["Delita", "Algus"],
	"battle-2-1f": ["Delita", "Algus"],
	"battle-2-1g": ["Delita"],
	"battle-2-1h": ["Delita"],
	"battle-2-1i": ["Delita"],
	"battle-2-2a": ["Agrias", "Gafgarion"],
	"battle-2-2b": ["Agrias", "Gafgarion"],
	"battle-2-2c": ["Agrias", "Delita"],
	"battle-2-2d": ["Agrias"],
	"battle-2-2e": ["Agrias", "Mustadio"],
	"battle-2-2f": ["Mustadio"],
	"battle-2-3b": ["Alma"],
	"battle-2-3i": ["Rafa"],
	"battle-2-4d": ["Delita"],
	"battle-2-4l": ["Meliadoul"],
	"battle-2-4m": ["Zalbag"],
};
for (const [id, names] of Object.entries(guestAssignments)) {
	const b = campaign.find((b) => b.id === id);
	b.guests = names.map(guestSpec);
	if (id === "battle-2-2c" || id === "battle-2-4d")
		b.guests.find((g) => g.name === "Delita").job = "holy-knight";
	if (id === "battle-2-3b")
		b.guests.find((g) => g.name === "Alma").learned = [
			"ability-001",
			"ability-005",
			"ability-0d4",
		];
}
for (const b of campaign.filter((b) => b.guest?.name === "Alma"))
	b.guest.learned = [
		"ability-001",
		"ability-005",
		"ability-0d4",
		"ability-00e",
	];
campaign.find((b) => b.id === "battle-2-1i").departures = ["delita"];

const characterProfiles = {
	ramza: {
		zodiac: "capricorn",
		sex: "male",
		sourceIds: ["quick-start"],
		note: "January 1 birthday follows the source guided party route.",
	},
	delita: {
		zodiac: "sagittarius",
		sex: "male",
		sourceIds: ["zodiac-practice"],
	},
	agrias: { zodiac: "cancer", sex: "female", sourceIds: ["zodiac-practice"] },
	gafgarion: { zodiac: "virgo", sex: "male", sourceIds: ["zodiac-practice"] },
	miluda: {
		zodiac: "virgo",
		sex: "female",
		sourceIds: ["battle-2-1f", "battle-2-1g"],
	},
	wiegraf: {
		zodiac: "virgo",
		sex: "male",
		sourceIds: ["battle-2-1h", "battle-2-3j"],
	},
	queklain: { zodiac: "scorpio", sex: "male", sourceIds: ["boss-compendium"] },
	velius: { zodiac: "virgo", sex: "monster", sourceIds: ["boss-compendium"] },
	zalera: { zodiac: "gemini", sex: "male", sourceIds: ["boss-compendium"] },
	adramelk: {
		zodiac: "scorpio",
		sex: "monster",
		sourceIds: ["boss-compendium"],
	},
	hashmalum: { zodiac: "leo", sex: "male", sourceIds: ["boss-compendium"] },
	altima: { zodiac: "virgo", sex: "monster", sourceIds: ["boss-compendium"] },
	"st-ajora": {
		zodiac: "virgo",
		sex: "monster",
		sourceIds: ["boss-compendium"],
	},
	elidibs: {
		zodiac: "serpentarius",
		sex: "monster",
		sourceIds: ["class-97", "mechanics-1-3"],
	},
	elmdor: { zodiac: "gemini", sex: "male", sourceIds: ["battle-2-4k"] },
	celia: { zodiac: "virgo", sex: "female", sourceIds: ["battle-2-4j"] },
	lede: { zodiac: "sagittarius", sex: "female", sourceIds: ["battle-2-4j"] },
	dycedarg: { zodiac: "scorpio", sex: "male", sourceIds: ["battle-2-4m"] },
	zalbag: { zodiac: "cancer", sex: "male", sourceIds: ["battle-2-4p"] },
	rofel: {
		zodiac: "capricorn",
		sex: "male",
		sourceIds: ["battle-2-4o", "battle-2-4r"],
	},
	kletian: {
		zodiac: "gemini",
		sex: "male",
		sourceIds: ["battle-2-4o", "battle-2-4s"],
	},
	vormav: { zodiac: "leo", sex: "male", sourceIds: ["battle-2-4o"] },
	balk: { zodiac: "sagittarius", sex: "male", sourceIds: ["battle-2-4t"] },
};
for (const b of [...campaign, ...optionalBattles]) {
	const enemyText =
		byId[b.sourceId]?.text.match(
			/##### Enemy Party\s*([\s\S]*?)(?=\n##### |$)/,
		)?.[1] || "";
	for (const unit of [
		...b.enemies,
		...(b.guests || []),
		...(b.guest ? [b.guest] : []),
	]) {
		const profile = characterProfiles[slug(unit.name)];
		if (profile)
			Object.assign(unit, profile, { zodiacSourceIds: profile.sourceIds });
		else if (jobs.find((job) => job.id === unit.job)?.monster)
			unit.sex = "monster";
		else if (/Female/.test(unit.sourcePositionName || "")) unit.sex = "female";
		else if (/Male/.test(unit.sourcePositionName || "")) unit.sex = "male";
		else {
			const jobName = jobs.find((job) => job.id === unit.job)?.name || unit.job;
			const sex = enemyText.match(
				new RegExp(`(Male|Female) ${jobName}`, "i"),
			)?.[1];
			if (sex && b.enemies.includes(unit)) unit.sex = sex.toLowerCase();
		}
	}
}
for (const recruit of recruitments)
	if (characterProfiles[recruit.id])
		Object.assign(recruit, characterProfiles[recruit.id]);
for (const job of jobs)
	if (characterProfiles[job.id])
		Object.assign(job, {
			zodiac: characterProfiles[job.id].zodiac,
			sex: characterProfiles[job.id].sex,
		});

const guideRecords = records.map((r) => {
	const targets = [];
	for (const b of [...campaign, ...optionalBattles])
		if (b.sourceId === r.id || b.sceneIds?.includes(r.id))
			targets.push(`encounter:${b.id}`);
	for (const j of jobs) if (j.sourceId === r.id) targets.push(`job:${j.id}`);
	for (const a of abilities)
		if (a.sourceId === r.id) targets.push(`ability:${a.id}`);
	for (const item of equipment)
		if (item.sourceId === r.id) targets.push(`equipment:${item.id}`);
	for (const q of quests)
		if (q.sourceId === r.id) targets.push(`quest:${q.id}`);
	for (const e of worldEvents)
		if (e.sourceIds.includes(r.id)) targets.push(`world-event:${e.id}`);
	for (const b of campaign)
		if (b.storyBeats?.some((beat) => beat.sourceIds.includes(r.id)))
			targets.push(`aftermath:${b.id}`);
	for (const family of breedingFamilies)
		if (family.sourceIds.includes(r.id))
			targets.push(`breeding-family:${family.id}`);
	if (soldierOfficeRules.sourceIds.includes(r.id))
		targets.push("soldier-office");
	if (sourceMaps.some((map) => map.id === r.id && map.complete))
		targets.push(`source-map:${r.id}`);
	if (ending.sourceIds.includes(r.id)) targets.push("ending");
	return {
		...r,
		implementation: [...targets, `codex:${r.id}`],
		coverage: targets.length
			? "adapted gameplay + full source record"
			: "full source reference; exact simulation not claimed",
	};
});
const metadata = {
	guideSha256: createHash("sha256").update(source).digest("hex"),
	sourceRecords: records.length,
	campaignStages: campaign.length,
	optionalStages: optionalBattles.length,
	abilities: abilities.length,
	equipment: equipment.length,
	genericJobs: jobs.filter((j) => !j.special).length,
	nativeSourceMaps: sourceMaps.filter((m) => m.complete).length,
	worldEvents: worldEvents.length,
	storyAftermaths: narrativeAdditions.length,
	generated: "2026-09-26",
	source: "Original English PlayStation Final Fantasy Tactics",
	notes: [
		"Source metadata and original formulas are preserved. Seventeen available source map grids retain their heights, passability and coordinates. Other layouts, base stats, reward economy, shop pacing and summarized story presentation are adaptations.",
		"The guide itself has unresolved proposition schedules, later map matrices, incomplete END geometry and unknown item descriptions.",
		"The searchable source ledger is preservation evidence, not proof every original formula or lore entry is simulated.",
	],
};
mkdirSync(new URL("../src/", import.meta.url), { recursive: true });
writeFileSync(
	new URL("../src/guide-data.json", import.meta.url),
	JSON.stringify({
		campaign,
		optionalBattles,
		jobs,
		abilities,
		equipment,
		quests,
		propositions,
		poaches,
		sourceMaps,
		worldEvents,
		characterProfiles,
		breedingFamilies,
		reproductionRules,
		soldierOfficeRules,
		guideRecords: guideRecords.map(({ text, ...record }) => record),
		chapters,
		recruitments,
		ending,
		metadata,
	}),
);
writeFileSync(
	new URL("../src/guide-archive.json", import.meta.url),
	JSON.stringify(
		Object.fromEntries(guideRecords.map((record) => [record.id, record.text])),
	),
);
const rows = guideRecords
	.map(
		(r) =>
			`| ${r.id} | ${r.name.replace(/\|/g, "/")} | ${r.section} | ${r.implementation.join(", ")} | ${r.coverage} |`,
	)
	.join("\n");
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(
	new URL("../docs/SOURCE_CHECKLIST.md", import.meta.url),
	`# Source content checklist\n\nGenerated from all ${records.length} records in \`FFT_Unified_Guide.md\`; source SHA-256 \`${metadata.guideSha256}\`.\n\nThis is a content mapping, not a claim of exact PlayStation emulation. “Adapted gameplay” means a runtime data entry exists and must still be verified through the game engine. “Full source reference” means the record is preserved in the searchable codex. The separate native-map audit verifies 17 original map grids. Formula-by-formula PlayStation emulation, full voiced dialogue and legacy bugs are not implied by archival coverage.\n\n## Concrete data coverage\n\n- ${campaign.length} ordered campaign stages: prologue, all 53 battle records, and three separately playable transformation phases.\n- ${optionalBattles.length} optional stages: six recruitment fights, ten Deep Dungeon floors, two rare encounters, and eight repeatable wilderness patrols. Bethla additionally offers its source North/South approach choice within the campaign stage.\n- 20 generic jobs with original unlock prerequisites; special and monster classes indexed separately.\n- 506 source ability records plus Attack: original source fields/formulas plus explicit compact-runtime parameters.\n- ${equipment.length} item/item-note entries retain original equipment fields and acquisition descriptions. Every entry has an explicit acquisition route or canonical alias, and all 48 poachable species occur in an encounter.\n- The campaign presents its main story through encounter briefs and 20 source-backed aftermaths; 11 ordered world visits present the recruitment and dungeon chains. The ending includes the siblings, Delita/Ovelia and the suppression of the Durai Papers. All 106 script records, including credits and the combined sidequest script, remain available in the lazy-loaded full archive.\n- All 11 quest records, all 20 map records, and every story/lore/mechanics/statistics record remain inspectable.\n\n## Adaptations and limits\n\nSeventeen complete source grids (eight chapter-one areas and nine Deep Dungeon floors) use original heights, passability, orientation, deployment coordinates, 60 treasure pairs, and 36 trap records. The game engine loads those native grids. The guide provides no END height grid and omits many later matrices, so those maps use designed layouts. Fixed encounter draws, eight repeatable patrol compositions, a deterministic reward curve, scaled job stats, and ability magnitude scaling are adaptations. A guaranteed END equipment cache and guided Materia Blade summit visit fill documented source gaps and are labelled additions. The source explicitly lacks a complete proposition calendar and later map matrices. Run node scripts/check-content.mjs for source hash, reference integrity, actual native-map integration, item routes and ordered world-event gates. Run the engine suite separately for combat and campaign progression. This generated file alone does not prove that every specialist effect works. See docs/CONTENT_AUDIT.md for the scope of the evidence.\n\n## Record-by-record map\n\n| Source ID | Record | Section | Runtime/data destination | Coverage |\n| --- | --- | --- | --- | --- |\n${rows}\n`,
);
console.log(JSON.stringify(metadata, null, 2));
