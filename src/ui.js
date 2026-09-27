import {
	abilities,
	campaign,
	chapters,
	ending,
	equipment,
	guideRecords,
	isGuideArchiveLoaded,
	jobs,
	loadGuideRecords,
	optionalBattles,
	quests,
	worldEvents,
} from "./content.js";
import { ALTERNATE_BATTLES, ZODIAC_SIGNS } from "./engine.js";

const icons = {
	arrow: "M4 12h16m-6-6 6 6-6 6",
	plus: "M12 5v14M5 12h14",
	minus: "M5 12h14",
	egg: "M20 14c0 4.5-3.5 8-8 8s-8-3.5-8-8S8 2 12 2s8 7.5 8 12ZM8 13l3 3 3-4 3 2",
	back: "M20 12H4m6-6-6 6 6 6",
	close: "m6 6 12 12M18 6 6 18",
	sword: "m14 4 6-2-2 6-9 9-4-4 9-9Zm-9 9-2 2 6 6 2-2M3 21l3-3",
	shield: "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm0 4v10m-4-7h8",
	move: "M12 3v18M3 12h18m-12-6 3-3 3 3m-6 12 3 3 3-3m-9-9-3 3 3 3m12-6 3 3-3 3",
	magic:
		"m12 2 2.8 6.2L22 9l-5.2 4.8 1.4 7.2L12 17.5 5.8 21l1.4-7.2L2 9l7.2-.8L12 2Zm-8 0v4M2 4h4",
	hourglass: "M6 3h12M6 21h12M7 3v4c0 3 10 7 10 10v4M17 3v4c0 3-10 7-10 10v4",
	bag: "M5 8h14l2 13H3L5 8Zm3 0V6a4 4 0 0 1 8 0v2",
	book: "M12 5C8 2 4 3 2 4v16c3-2 7-1 10 1 3-2 7-3 10-1V4c-2-1-6-2-10 1Zm0 0v16M5 8h3m-3 4h3m8-4h3m-3 4h3",
	group:
		"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7a4 4 0 0 1 0 7m5 10v-2a4 4 0 0 0-3-3.8",
	map: "m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Zm6-3v17m8-14v17",
	settings:
		"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2-6h4l.7 3 2 .9 2.7-1.2 2 3.5-2 2.2v3.2l2 2.2-2 3.5-2.7-1.2-2 .9-.7 3h-4l-.7-3-2-.9-2.7 1.2-2-3.5 2-2.2v-3.2l-2-2.2 2-3.5L7.3 6l2-.9.7-3Z",
	volume: "M3 9v6h4l5 4V5L7 9H3Zm13-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16",
	mute: "M3 9v6h4l5 4V5L7 9H3Zm13 0 6 6m0-6-6 6",
	fullscreen: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
	rotateLeft: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
	rotateRight: "M20 10a8 8 0 1 0-1 8m-1-14v6h-6",
	flag: "M5 22V3m0 0c5-5 9 5 14 0v11c-5 5-9-5-14 0",
	diamond: "m12 2 9 10-9 10L3 12l9-10Zm0 0v20M3 12h18",
	check: "m5 12 4 4L19 6",
	sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19",
	heart: "M12 21 3 12a5.5 5.5 0 0 1 9-7 5.5 5.5 0 0 1 9 7l-9 9Z",
	trophy:
		"M7 3h10v7a5 5 0 0 1-10 0V3Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-4 0h8",
	crown: "m3 6 5 5 4-8 4 8 5-5-2 14H5L3 6Zm2 10h14",
	menu: "M4 6h16M4 12h16M4 18h16",
	info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-11v6m0-10h.01",
	eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
	save: "M3 3h15l3 3v15H3V3Zm4 0v7h10V3M7 21v-7h10v7",
	potion: "M9 2h6M10 2v6L5 18a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4L14 8V2M8 14h8",
	chevron: "m9 5 7 7-7 7",
	download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
};
const icon = (name, extra = "") =>
	`<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.diamond}"/></svg>`;
const crest = `<svg class="crest" viewBox="0 0 42 50" aria-hidden="true"><path d="M21 2 37 8v20c0 9-16 19-16 19S5 37 5 28V8L21 2Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="m11 16 5 4 5-9 5 9 5-4-3 17H14l-3-17Zm3 13h14" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M18 36h6M21 33v8" stroke="currentColor"/></svg>`;
const esc = (value) =>
	String(value ?? "").replace(
		/[&<>"']/g,
		(char) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				char
			],
	);
const number = (value) => Number(value || 0).toLocaleString();
const asArray = (value) =>
	Array.isArray(value) ? value : Object.values(value || {});
const findById = (list, id) => asArray(list).find((item) => item.id === id);
const titleCase = (value) =>
	String(value || "")
		.replace(/[-_]/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
const percent = (value, max) =>
	Math.min(100, Math.max(0, Math.round((value / Math.max(1, max)) * 100)));
const chapterRoman = ["", "I", "II", "III", "IV"];
const allEncounters = () => [
	...asArray(campaign),
	...asArray(optionalBattles),
	...asArray(ALTERNATE_BATTLES),
];

export function setupUI(game, renderer, audio) {
	const root = document.getElementById("ui");
	let panel = null;
	let modal = null;
	let companyTab = "overview";
	let abilityCategory = "all";
	let storyPage = 0;
	let aftermathRead = null;
	let codexTab = "chronicle";
	let shopTab = "all";
	let questTab = "errands";
	let selectedWorldEventId = null;
	let dispatchQuestId = null;
	let dispatchCrew = new Set();
	let recruitDraft = {
		name: "",
		sex: "male",
		job: "squire",
		zodiac: "capricorn",
	};
	let selectedUnitId = null;
	let selectedEncounterId = null;
	let actionMenu = null;
	let codexSearch = "";
	let archiveLoading = false;
	let archiveError = null;
	let shopSearch = "";
	let toastTimer;
	let mobileNav = false;
	let diagnostics = true;
	let quality = "Auto";
	let muted = false;
	let volume = 0.55;
	let lastScreen = "";
	let lastInfo = 0;
	let keyboardTile = { x: 3, z: 3 };
	let difficulty = "tactical";
	let hoverSelection = null;
	let pendingTarget = null;

	try {
		const preferences = JSON.parse(
			localStorage.getItem("crown-of-ash-options") || "{}",
		);
		muted = preferences.muted ?? false;
		volume = preferences.volume ?? 0.55;
		quality = preferences.quality || "Auto";
		diagnostics = preferences.diagnostics ?? true;
	} catch {}
	audio?.setVolume?.(volume);
	audio?.setMuted?.(muted);
	renderer?.setQuality?.(titleCase(quality));

	const saveOptions = () => {
		try {
			localStorage.setItem(
				"crown-of-ash-options",
				JSON.stringify({ muted, volume, quality, diagnostics }),
			);
		} catch {}
	};
	const getState = () => game.state || {};
	const party = () => asArray(getState().party);
	const selectedUnit = () =>
		party().find((unit) => unit.id === selectedUnitId) || party()[0];
	const activeUnit = () =>
		getState().battle?.units?.find(
			(unit) => unit.id === getState().battle?.activeId,
		);
	const jobName = (id) => findById(jobs, id)?.name || titleCase(id);
	const getChapter = (index) =>
		asArray(chapters).find(
			(chapter) => Number(chapter.id ?? chapter.number) === Number(index),
		) || asArray(chapters)[Math.max(0, (index || 1) - 1)];
	const getNext = () =>
		game.getNextEncounter?.() ||
		asArray(campaign)[getState().campaignIndex || 0];
	const avatar = (unit, extra = "") =>
		`<div class="unit-avatar ${unit?.team === "enemy" ? "red" : ["white-mage", "white_mage", "priest", "chemist"].includes(unit?.job) ? "gold" : ["archer", "thief", "monk"].includes(unit?.job) ? "green" : ""} ${extra}" aria-hidden="true"></div>`;
	const button = (label, action, options = {}) =>
		`<button class="button ${options.class || ""}" data-action="${action}" ${options.id ? `data-id="${esc(options.id)}"` : ""} ${options.disabled ? "disabled" : ""}>${esc(label)}${options.icon ? icon(options.icon) : ""}</button>`;

	function notify(message, error = false) {
		if (!message) return;
		const existing = root.querySelector(".toast");
		existing?.remove();
		const element = document.createElement("div");
		element.className = `toast${error ? " error" : ""}`;
		element.setAttribute("role", "status");
		element.innerHTML = `${icon(error ? "info" : "check")}${esc(message)}`;
		root.append(element);
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => element.remove(), 4200);
	}

	function invoke(method, ...args) {
		try {
			const result = game[method]?.(...args);
			if (result?.error) notify(result.error, true);
			else if (typeof result === "string") notify(result);
			return result;
		} catch (error) {
			notify(error.message || "That action is not available.", true);
			return false;
		}
	}

	function header(state) {
		return `<header class="topbar"><button class="brand" data-action="home" aria-label="Crown of Ash home">${crest}<span><span class="brand-name">Crown of Ash</span><span class="brand-subtitle">An Ivalice Chronicle</span></span></button><nav class="topnav" aria-label="Main navigation"><button class="nav-link ${!panel && state.screen === "world" ? "active" : ""}" data-action="campaign">Campaign</button><button class="nav-link ${panel === "company" ? "active" : ""}" data-action="company">Company</button><button class="nav-link ${panel === "chronicle" ? "active" : ""}" data-action="chronicle">Chronicle</button><span class="nav-divider"></span><button class="icon-button" data-action="mute" aria-label="${muted ? "Unmute audio" : "Mute audio"}">${icon(muted ? "mute" : "volume", "small")}</button><button class="icon-button" data-action="options" aria-label="Open options">${icon("settings", "small")}</button><button class="icon-button mobile-menu-button" data-action="mobile-menu" aria-label="Open navigation" aria-expanded="${mobileNav}">${icon("menu", "small")}</button></nav></header>${mobileNav ? `<nav class="mobile-nav" aria-label="Mobile navigation"><button data-action="campaign">Campaign map</button><button data-action="company">Your company</button><button data-action="chronicle">Chronicle & guide</button><button data-action="controls">How to play</button><button data-action="options">Options</button></nav>` : ""}`;
	}

	function titleScreen() {
		let hasSave = Boolean(game.hasSave?.());
		if (!hasSave) {
			try {
				hasSave = Object.keys(localStorage).some(
					(key) =>
						/crown.*(save|v1)|fft.*save/i.test(key) &&
						localStorage.getItem(key)?.includes("party"),
				);
			} catch {}
		}
		return `<section class="title-screen" aria-label="Crown of Ash title screen"><div class="title-copy"><div class="eyebrow">A tale of loyalty, ambition & betrayal</div><h1 aria-label="Crown of Ash">Crown<br> <em>of</em> Ash</h1><p class="title-sub">An Ivalice Chronicle</p><p class="title-description">History remembers the crown.<br>It forgets the hands that forged it.<br>Lead your company. Write the untold story.</p><div class="title-actions">${button("Begin your chronicle", "new-game", { icon: "arrow" })}${hasSave ? `<button class="text-button" data-action="continue">Continue journey ${icon("arrow", "small")}</button>` : `<button class="text-button" data-action="controls">${icon("book", "small")} How to play</button>`}</div></div><div class="scene-caption"><span class="number">01</span><span>The kingdom of Ivalice<br>On the eve of the Lion War</span></div><div class="camera-controls"><span class="camera-label">Explore the battlefield</span><button class="icon-button" data-action="zoom-in" aria-label="Zoom camera in">${icon("plus", "small")}</button><button class="icon-button" data-action="zoom-out" aria-label="Zoom camera out">${icon("minus", "small")}</button><button class="icon-button" data-action="rotate-left" aria-label="Rotate camera left">${icon("rotateLeft", "small")}</button><button class="icon-button" data-action="rotate-right" aria-label="Rotate camera right">${icon("rotateRight", "small")}</button></div><div class="bottom-rule"></div><footer class="title-footer"><div class="footer-left"><span>A tactical role-playing chronicle</span><i class="footer-dot"></i><span>26 Sep 2026 · GPT-6</span></div><div class="footer-right"><button class="footer-link" data-action="about">About this edition</button><span class="small-status"><i class="status-light"></i> Your story is saved locally</span></div></footer></section>`;
	}

	function worldScreen(state) {
		const next = getNext();
		const selected =
			allEncounters().find(
				(encounter) => encounter.id === selectedEncounterId,
			) ||
			next ||
			asArray(campaign)[0];
		if (!selected)
			return `<section class="screen-paper"><div class="empty-state">Your chronicle is being prepared.</div></section>`;
		const chapter = getChapter(next?.chapter || state.chapter || 1);
		const completed = state.completed || [];
		const isComplete = completed.includes(selected.id);
		const isAvailable =
			game.encounterUnlocked?.(selected) ??
			(isComplete || selected.id === next?.id);
		const alternateRoutes = asArray(ALTERNATE_BATTLES).filter(
			(route) => route.parentId === (selected.parentId || selected.id),
		);
		const reward =
			typeof selected.reward === "number"
				? { gil: selected.reward }
				: selected.reward || {};
		return `<section class="screen-paper world-screen" aria-label="Campaign map" data-scroll><div class="screen-heading"><div><div class="eyebrow">Chapter ${chapterRoman[next?.chapter || state.chapter || 1] || "I"} · ${esc(chapter?.title || chapter?.name || "The Meager")}</div><h1>The roads of Ivalice</h1><p>Every road has a history. Yours is still being written.</p></div><div class="stat-group"><div class="stat">War chest<strong>${number(state.gil)} <small style="font:10px 'DM Sans',sans-serif;color:#a17b42">G</small></strong></div><div class="stat">Company<strong>${party().length} <small style="font:9px 'DM Sans',sans-serif;color:#7c8675">allies</small></strong></div><div class="stat">Chronicle<strong>${completed.filter((id) => asArray(campaign).some((item) => item.id === id)).length}<small style="font:10px 'DM Sans',sans-serif;color:#849078"> / ${asArray(campaign).length}</small></strong></div></div></div><div class="world-layout">${worldMap(state, selected)}<aside class="mission-panel"><div class="chapter-tag">${isComplete ? "A battle remembered" : selected.id === next?.id ? "Your next chapter" : asArray(optionalBattles).some((item) => item.id === selected.id) ? "An optional expedition" : "Further along the road"}</div><h2>${esc(selected.name)}</h2><p class="mission-description">${esc(selected.summary || selected.story || "Your company marches into the heart of Ivalice. A new challenge awaits.")}</p><div class="mission-meta"><div class="stat">Terrain<strong>${esc(titleCase(selected.terrain || selected.mapId || "Highlands"))}</strong></div><div class="stat">Reward<strong>${number(reward.gil || 500)} <small style="font-size:10px">G</small></strong></div></div><div class="mission-objective">${icon("flag")}<p><strong>Battle objective</strong>${esc(typeof selected.objective === "string" ? selected.objective : "Defeat the enemy company.")}</p></div>${button(isComplete ? "Revisit battlefield" : isAvailable ? (alternateRoutes.length && !selected.parentId ? "Enter via South Wall" : "Enter the battlefield") : "Continue your chronicle first", "start-battle", { id: selected.id, icon: "sword", disabled: !isAvailable })}${
			alternateRoutes.length
				? `<div class="mission-choices">${alternateRoutes
						.filter((route) => route.id !== selected.id)
						.map(
							(route) =>
								`<button data-action="start-battle" data-id="${esc(route.id)}" ${!game.encounterUnlocked?.(route) ? "disabled" : ""}>${icon("flag", "small")} Take the ${esc(route.name.split("—").at(-1).trim())} approach</button>`,
						)
						.join("")}</div>`
				: ""
		}<button class="text-button" data-action="company">${icon("group", "small")} Prepare your company ${icon("arrow", "small")}</button><div class="story-callout">“No one is born a hero. It is the path we walk that makes us.”<span>The Durai Papers</span></div></aside></div><div class="world-toolbar"><button data-action="company">${icon("group")} Company & jobs</button><button data-action="shop">${icon("bag")} Outfitter</button><button data-action="quests">${icon("flag")} Errands & expeditions</button><button data-action="chronicle">${icon("book")} The chronicle</button><span class="save-indicator">${icon("check", "small")} Progress saved on this device</span></div></section>`;
	}

	function worldMap(state, selected) {
		const next = getNext();
		const availableChapter = Number(next?.chapter || state.chapter || 1);
		let visible = asArray(campaign).filter(
			(encounter) => Number(encounter.chapter || 1) === availableChapter,
		);
		visible = [
			...visible,
			...asArray(optionalBattles)
				.filter(
					(encounter) => Number(encounter.chapter || 1) <= availableChapter,
				)
				.slice(0, 5),
		];
		const coordinate = (encounter, index) => {
			const positions = {
				orbonne: [69, 70],
				gariland: [49, 47],
				mandalia: [27, 56],
				sweegy: [66, 44],
				dorter: [77, 28],
				"sand rat": [60, 17],
				"thieves fort": [18, 72],
				lenalia: [39, 28],
				fovoham: [22, 17],
				zeakden: [13, 39],
				araguay: [62, 34],
				zirekile: [77, 54],
				zaland: [52, 54],
				"bariaus hill": [47, 29],
				zigolis: [33, 73],
				goug: [19, 57],
				"bariaus valley": [58, 76],
				golgorand: [75, 77],
				"lionel gate": [71, 23],
				"lionel castle": [79, 40],
			};
			const named = Object.entries(positions).find(([name]) =>
				encounter.name.toLowerCase().includes(name),
			);
			if (named) return { x: named[1][0], y: named[1][1] };
			const x = Number(encounter.x),
				y = Number(encounter.y);
			return {
				x: Number.isFinite(x)
					? x <= 1
						? x * 100
						: x
					: 14 + ((index * 17) % 70),
				y: Number.isFinite(y)
					? y <= 1
						? y * 100
						: y
					: 20 + ((index * 23) % 57),
			};
		};
		const locations = [];
		for (const [index, encounter] of visible.entries()) {
			const point = coordinate(encounter, index);
			const existing = locations.find(
				(item) =>
					Math.abs(item.point.x - point.x) < 3 &&
					Math.abs(item.point.y - point.y) < 3,
			);
			if (!existing) locations.push({ encounter, point });
			else if (encounter.id === selected.id || encounter.id === next?.id)
				existing.encounter = encounter;
		}
		const parentLocation = locations.find(
			(item) => item.encounter.id === selected.parentId,
		);
		if (parentLocation) parentLocation.encounter = selected;
		const selectedPoint = coordinate(selected, 0);
		if (!locations.some((item) => item.encounter.id === selected.id))
			locations.push({ encounter: selected, point: selectedPoint });
		const routes = locations
			.slice(1)
			.map(
				(item, index) =>
					`<path class="map-route ${(state.completed || []).includes(item.encounter.id) ? "complete" : ""}" d="M${locations[index].point.x * 8},${locations[index].point.y * 5} L${item.point.x * 8},${item.point.y * 5}"/>`,
			)
			.join("");
		const nodes = locations
			.map(
				({ encounter, point }) =>
					`<button class="map-location ${(state.completed || []).includes(encounter.id) ? "completed" : ""} ${encounter.id === next?.id ? "current" : ""} ${encounter.id === selected.id ? "selected" : ""}" style="left:${Math.max(8, Math.min(92, point.x))}%;top:${Math.max(13, Math.min(85, point.y))}%" data-action="select-encounter" data-id="${esc(encounter.id)}" aria-label="Select ${esc(encounter.name)}${encounter.id === next?.id ? ", next campaign battle" : ""}"><span class="map-node"></span><span class="map-label">${esc(encounter.name.replace(/\s*\(.+\)$/, "").replace(/ — .+$/, ""))}</span></button>`,
			)
			.join("");
		return `<div class="world-map" aria-label="Map of Ivalice"><svg class="map-art" viewBox="0 0 800 500" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#bdc6aa" stroke-width=".5" opacity=".23"/></pattern><pattern id="map-trees" width="22" height="25" patternUnits="userSpaceOnUse"><path d="m11 3-4 9h8l-4-9Zm0 6-5 10h10L11 9Z" fill="#a6b696" opacity=".55"/></pattern></defs><rect width="800" height="500" fill="#dee2d1"/><path class="map-water" d="M0 0h160l-15 42 28 35-18 57 16 43-42 19-11 40-51 19-9 33-58 12ZM800 265l-62-12-50 18-42 35-12 32-50 11-25 59-69 4-30 45-73 12-12 31h425Z"/><path class="map-land" d="m175-15 10 49-19 45 27 36-12 39-30 30-4 44-40 24-32 31-5 31-50 24-40 5v161h417l24-32 58-18 25-37 76-13 19-48 45-15 28-37 34-35 51-8 48 11V-15Z"/><path class="map-river" d="M389-10q-42 70-10 100t-35 85 15 65-16 80-25 87 31 96"/><path class="map-river" style="stroke-width:5" d="M635-10q-50 36-86 78t-50 89-137 77M333 321q-78-32-114 8T63 344"/><path class="map-contour" d="M185 73q70-45 132-17t19 89-79 60-65 58M416 49q98-35 142 6t35 86-23 107 110 41M488 194q65-68 113-10t100 47M79 418q51-64 116-24t99 63M394 343q81-47 103-7t-15 90M211 5q90 11 85 56t-31 48-45 52M165 495q7-65 80-62M657 72q-50 5-30 67t94 50M410 116q68 5 63 51"/><path fill="url(#map-trees)" d="m188 72 102-20 27 64-38 53-82 23-31-35ZM421 93l57-42 65 17 17 56-52 71-87-23ZM128 365l87-16 42 39-41 44-91-11ZM571 231l77-10 45 52-51 57-61-12Z"/><g fill="#a7b695" stroke="#99a987" stroke-width=".6" opacity=".8"><path d="m244 224 18-34 18 34-9-5-9 4-9-6-9 7Zm23-10 20-40 21 40-11-5-10 5-10-9-10 9Zm27 8 18-33 18 33-8-6-10 7-9-8-9 7ZM452 258l19-37 20 37-10-6-10 6-9-7-10 7Zm28 6 20-45 23 45-13-6-10 7-11-9-9 8Zm26 3 20-33 20 33-10-6-10 6-9-6-11 6ZM608 112l17-35 17 35-8-7-9 8-8-7-9 6Zm28 11 22-46 24 46-12-8-12 8-10-8-12 8Z"/></g><rect width="800" height="500" fill="url(#map-grid)"/>${routes}<text class="map-region" x="181" y="37">GALLIONE</text><text class="map-region" x="472" y="40">LESALIA</text><text class="map-region" x="601" y="409">LIONEL</text><text class="map-region" x="106" y="475">FOVOHAM</text><text x="655" y="470" font-family="Georgia,serif" font-style="italic" font-size="14" fill="#9cac9d" letter-spacing="3">The Rhana Strait</text></svg>${nodes}<div class="map-compass">N<svg viewBox="0 0 40 40"><path d="m20 1 5 14 14 5-14 5-5 14-5-14-14-5 14-5 5-14Z" fill="none" stroke="currentColor" stroke-width=".7"/><path d="m20 1 0 19-5-5 5-14Z" fill="currentColor"/><circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width=".5"/></svg></div><div class="map-legend"><span><i class="legend-node red"></i> Next battle</span><span><i class="legend-node green"></i> Completed</span><span><i class="legend-node"></i> Location</span></div><div class="map-scale">IVALICE</div></div>`;
	}

	function panelHeading(eyebrow, title, description, extra = "") {
		return `<button class="screen-back" data-action="close-panel">${icon("back")} Return to ${getState().screen === "battle" ? "battlefield" : getState().screen === "title" ? "title" : "campaign"}</button><div class="screen-heading"><div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${description ? `<p>${esc(description)}</p>` : ""}</div>${extra}</div>`;
	}

	function preparedEncounter() {
		return getState().screen === "battle"
			? getState().battle?.encounter
			: findById(allEncounters(), selectedEncounterId) || getNext();
	}
	function preparedUnits() {
		return (
			game.getDeployment?.(preparedEncounter()?.id) ||
			party()
				.filter((unit) => !unit.onQuest)
				.slice(0, 5)
		);
	}

	function companyScreen() {
		const unit = selectedUnit();
		if (!unit)
			return `<section class="screen-paper" data-scroll>${panelHeading("The fellowship", "Your company", "Your chronicle begins with the first step.")}<div class="empty-state">Begin your chronicle to recruit your company.<br><br>${button("Begin your chronicle", "new-game", { icon: "arrow" })}</div></section>`;
		selectedUnitId = unit.id;
		const currentJob = findById(jobs, unit.job);
		const capacity = game.getRosterCapacity?.() || {
			used: party().length,
			max: 32,
		};
		const eggs = game.getEggs?.() || [];
		const jp =
			typeof unit.jp === "object" ? unit.jp?.[unit.job] || 0 : unit.jp || 0;
		const tabs = [
			["overview", "Overview"],
			["jobs", "Jobs"],
			["abilities", "Abilities"],
			["equipment", "Equipment"],
			["deployment", "Deployment"],
		];
		let details = "";
		if (companyTab === "overview") {
			details = `<div class="attributes">${[
				["HP", unit.maxHp || unit.hp],
				["MP", unit.maxMp || unit.mp],
				["Attack", unit.pa],
				["Magic", unit.ma],
				["Speed", unit.speed],
				["Move", unit.move],
			]
				.map(
					([label, value]) =>
						`<div class="attribute">${label}<strong>${value ?? "—"}</strong></div>`,
				)
				.join(
					"",
				)}</div><h3 class="section-title">Equipped for the road</h3><div class="equipment-list">${["weapon", "shield", "head", "body", "accessory"].map((slot) => `<div class="equipment-row"><span class="muted">${titleCase(slot)}</span><span>${esc(findById(equipment, unit.equipment?.[slot])?.name || "—")}</span></div>`).join("")}<div class="equipment-row"><span class="muted">Secondary action</span><span>${esc(jobName(unit.secondaryJob || "squire"))}</span></div></div><div class="guide-banner">${icon("info")} Learn abilities with JP, then change jobs to build your own tactical role. Learned skills stay with your character.</div><h3 class="section-title">Character</h3><div class="stat-group"><div class="stat">Brave<strong>${unit.brave ?? 70}</strong></div><div class="stat">Faith<strong>${unit.faith ?? 65}</strong></div><div class="stat">Experience<strong>${unit.exp || 0}<small style="font-size:10px"> / 100</small></strong></div><div class="stat">Jump<strong>${unit.jump || 2}</strong></div></div>${unit.zodiac ? `<div class="character-zodiac">${icon("magic")}<div><span>Zodiac sign</span><strong>${esc(titleCase(unit.zodiac))}</strong></div><p>Compatibility influences attacks, magic, and their effects. Check your target’s prediction before acting.</p></div>` : ""}${game.canDismiss?.(unit.id) ? `<div class="release-action"><button class="text-button" data-action="release-soldier" data-id="${esc(unit.id)}">Release from the company ${icon("arrow", "small")}</button></div>` : ""}`;
		} else if (companyTab === "jobs") {
			details = `<div class="notice">Job levels unlock new disciplines. Equip a second job’s action set to combine learned abilities.</div><div class="job-grid">${asArray(
				game.getAvailableJobs?.(unit.id) || jobs,
			)
				.filter(
					(job) =>
						!job.special || job.id === unit.homeJob || job.id === unit.job,
				)
				.map((job) => {
					const requirements = asArray(job.requires || job.requirements);
					const unlocked =
						job.unlocked ??
						(requirements.every(
							(req) =>
								(game.jobLevel?.(unit, req.job) || 1) >= (req.level || 1),
						) ||
							job.id === unit.job ||
							!requirements.length);
					return `<button class="job-card ${unit.job === job.id ? "active" : ""}" data-action="set-job" data-id="${esc(job.id)}" ${!unlocked ? "disabled" : ""}>${icon(job.id.includes("mage") ? "magic" : job.id === "chemist" ? "potion" : job.id === "knight" ? "shield" : "sword")}<span class="job-level">${unit.job === job.id ? "ACTIVE" : `LV ${job.level || game.jobLevel?.(unit, job.id) || 1}`}</span><h3>${esc(job.name)}</h3><p>${esc(requirements.length ? requirements.map((req) => `${jobName(req.job)} Lv. ${req.level}`).join(" · ") : "Available from the beginning")}</p></button>`;
				})
				.join(
					"",
				)}</div><div class="settings-row"><div class="settings-copy"><strong>Secondary action set</strong><span>Bring a second discipline into battle.</span></div><select id="secondary-job" aria-label="Secondary job">${asArray(
				game.getAvailableJobs?.(unit.id) || jobs,
			)
				.filter((job) => job.unlocked)
				.map(
					(job) =>
						`<option value="${esc(job.id)}" ${unit.secondaryJob === job.id ? "selected" : ""}>${esc(job.name)}</option>`,
				)
				.join("")}</select></div>`;
		} else if (companyTab === "abilities") {
			const jobAbilities = asArray(abilities).filter(
				(ability) =>
					(ability.job === unit.job ||
						ability.jobId === unit.job ||
						(currentJob?.abilities || []).includes(ability.id)) &&
					(abilityCategory === "all" ||
						(abilityCategory === "action" &&
							!["reaction", "support", "movement"].includes(
								ability.category,
							)) ||
						ability.category === abilityCategory),
			);
			const passiveSlots = ["reaction", "support", "movement"];
			const cleanDescription = (value) =>
				String(value || "")
					.replace(/Original author rating:.*$/, "")
					.replace(/\[|\]/g, "")
					.trim();
			const unlockedJobs = asArray(
				game.getAvailableJobs?.(unit.id) || [],
			).filter((job) => job.unlocked);
			details = `<h3 class="section-title">Your battle abilities</h3><div class="ability-loadout"><label class="ability-slot"><span class="ability-slot-title">Secondary action</span><select id="secondary-job" aria-label="Secondary action set" ${getState().screen === "battle" ? "disabled" : ""}>${unlockedJobs.map((job) => `<option value="${esc(job.id)}" ${unit.secondaryJob === job.id ? "selected" : ""}>${esc(job.name)}</option>`).join("")}</select><span class="ability-slot-help">Use learned actions from this job.</span></label>${passiveSlots
				.map((slot) => {
					const choices =
						game.getPassiveChoices?.(unit.id, slot) ||
						asArray(abilities).filter(
							(ability) =>
								(unit.learned || []).includes(ability.id) &&
								ability.category === slot,
						);
					const equipped = findById(abilities, unit.abilitySlots?.[slot]);
					return `<label class="ability-slot"><span class="ability-slot-title">${titleCase(slot)}</span><select data-ability-slot="${slot}" aria-label="${titleCase(slot)} ability" ${getState().screen === "battle" ? "disabled" : ""}><option value="">${choices.length ? "None equipped" : "Learn an ability to equip"}</option>${choices.map((ability) => `<option value="${esc(ability.id)}" ${equipped?.id === ability.id ? "selected" : ""}>${esc(ability.name)}</option>`).join("")}</select><span class="ability-slot-help">${esc(equipped ? cleanDescription(equipped.description).slice(0, 110) : slot === "reaction" ? "Respond automatically when the condition is met." : slot === "support" ? "One passive combat advantage." : "One movement or terrain technique.")}</span></label>`;
				})
				.join(
					"",
				)}</div><div class="notice">Equip one reaction, one support, and one movement ability from any job you have learned. Jump and Math capacities remain active once learned.</div><div class="ability-learn-heading"><div><h3 class="section-title">Learn ${esc(jobName(unit.job))} abilities</h3><p>${number(jp)} JP available</p></div><select id="ability-category" aria-label="Filter learnable abilities">${[
				["all", "All abilities"],
				["action", "Actions"],
				["reaction", "Reactions"],
				["support", "Support"],
				["movement", "Movement"],
			]
				.map(
					([id, label]) =>
						`<option value="${id}" ${abilityCategory === id ? "selected" : ""}>${label}</option>`,
				)
				.join("")}</select></div><div class="item-list">${
				jobAbilities
					.map((ability) => {
						const learned = (unit.learned || []).includes(ability.id);
						const equipped = Object.values(unit.abilitySlots || {}).includes(
							ability.id,
						);
						const cost = ability.jpCost ?? ability.jp ?? ability.cost ?? 100;
						const category = passiveSlots.includes(ability.category)
							? ability.category
							: "action";
						return `<div class="item-row"><div class="item-symbol">${icon(category === "reaction" ? "shield" : category === "movement" ? "move" : ability.type === "heal" ? "heart" : ability.type === "physical" ? "sword" : "magic")}</div><div class="item-copy"><span class="ability-type-label">${titleCase(category)}</span><h3>${esc(ability.name)}</h3><p>${esc(cleanDescription(ability.description) || `${ability.mp || 0} MP · Range ${ability.range || 1} · ${ability.ct || 0} CT`)}</p></div>${learned ? `<span class="tag ${equipped ? "complete" : ""}">${equipped ? "Equipped" : "Learned"}</span>` : button(`${cost} JP`, "learn", { class: "small secondary", id: ability.id, disabled: jp < cost || getState().screen === "battle" })}</div>`;
					})
					.join("") ||
				'<div class="empty-state">This job has no abilities in this category.</div>'
			}</div>`;
		} else if (companyTab === "deployment") {
			const encounter = preparedEncounter();
			const deployed = new Set(preparedUnits().map((unit) => unit.id));
			const guests = [
				...(encounter?.guests || []).map((guest) => guest.name || guest),
				...(encounter?.guest ? [encounter.guest.name || encounter.guest] : []),
			];
			const limit = encounter?.deploymentLimit || 5;
			const eligible = party().filter(
				(unit) => !unit.onQuest && !guests.includes(unit.name),
			);
			details = `<div class="notice"><strong>${esc(encounter?.name || "The next encounter")}</strong> · ${limit === 1 ? "Ramza must face this encounter alone." : `${deployed.size} controllable allies, with named guests joining separately. Promote a companion to bring them into the encounter.`} Recruits on an assignment return when their job is ready.</div><div class="deployment-list">${party()
				.map((member) => {
					const status = member.onQuest
						? "On assignment"
						: guests.includes(member.name)
							? "Guest"
							: deployed.has(member.id)
								? "Deployed"
								: "Reserve";
					return `<div class="item-row">${avatar(member)}<div class="item-copy"><h3>${esc(member.name)}</h3><p>${esc(jobName(member.job))} · Level ${member.level || 1} · ${status}</p></div>${member.id === "ramza" ? '<span class="tag complete">Leader</span>' : member.onQuest ? '<span class="tag">On assignment</span>' : guests.includes(member.name) ? '<span class="tag current">Guest</span>' : button(deployed.has(member.id) ? "Move to reserve" : "Deploy", "toggle-deployment", { class: "small secondary", id: member.id, disabled: limit === 1 || eligible.length <= limit || getState().screen === "battle" })}</div>`;
				})
				.join("")}</div>`;
		} else {
			const inventory = getState().inventory || {};
			const availableItems = asArray(equipment).filter(
				(item) =>
					item.slot !== "item" &&
					((inventory[item.id] || 0) > 0 ||
						Object.values(unit.equipment || {}).includes(item.id)),
			);
			details = `<div class="notice">Select equipment to outfit ${esc(unit.name)}. Job weapon restrictions apply; the previous item returns to your inventory.</div><div class="item-list">${availableItems.map((item) => `<div class="item-row"><div class="item-symbol">${icon(item.slot === "weapon" ? "sword" : item.slot === "accessory" ? "diamond" : "shield")}</div><div class="item-copy"><h3>${esc(item.name)}</h3><p>${esc(titleCase(item.slot))} · ${esc(itemStats(item))}</p></div>${Object.values(unit.equipment || {}).includes(item.id) ? '<span class="tag complete">Equipped</span>' : button("Equip", "equip", { class: "small secondary", id: item.id, disabled: !game.canEquipItem?.(unit, item) })}</div>`).join("") || '<div class="empty-state">Visit the outfitter for weapons, armor, and accessories.</div>'}</div>`;
		}
		return `<section class="screen-paper" data-scroll aria-label="Company management">${panelHeading("Companions in arms", "Your company", "Different paths. A shared purpose.", `<div class="stat-group"><div class="stat">War chest<strong>${number(getState().gil)} G</strong></div></div>`)}<div class="company-services"><span class="company-capacity">${icon("group", "small")} <strong>${capacity.used} / ${capacity.max}</strong> company places</span><div class="company-service-actions">${button("Recruit soldier", "recruit-soldier", { class: "small secondary", icon: "group", disabled: getState().screen === "battle" })}${button(`Incubator${eggs.length ? ` · ${eggs.length}` : ""}`, "incubator", { class: "small secondary", icon: "egg" })}</div></div>${
			party().length > 8
				? `<label class="party-quick-select"><span>Find a companion</span><select id="party-picker" aria-label="Select companion">${party()
						.map(
							(member) =>
								`<option value="${esc(member.id)}" ${member.id === unit.id ? "selected" : ""}>${esc(member.name)} · ${esc(jobName(member.job))}${member.onQuest ? " · On assignment" : ""}</option>`,
						)
						.join("")}</select></label>`
				: ""
		}<div class="party-layout"><aside class="roster" aria-label="Party members">${party()
			.map(
				(member) =>
					`<button class="roster-button ${unit.id === member.id ? "active" : ""}" data-action="select-party" data-id="${esc(member.id)}">${avatar(member)}<span><span class="roster-name">${esc(member.name)}</span><span class="roster-job">${member.onQuest ? "On assignment · " : ""}${esc(jobName(member.job))}</span></span><span class="roster-level">${member.level || 1}</span></button>`,
			)
			.join(
				"",
			)}</aside><div><div class="unit-detail-header">${avatar(unit)}<div><h2>${esc(unit.name)}</h2><p>${esc(jobName(unit.job))} · Level ${unit.level || 1}</p></div><div class="stat-group"><div class="stat">Job points<strong>${number(jp)}</strong></div><div class="stat">Brave / Faith<strong>${unit.brave ?? 70} / ${unit.faith ?? 65}</strong></div></div></div><div class="tabs" role="tablist" aria-label="Company details">${tabs.map(([id, label]) => `<button class="tab ${companyTab === id ? "active" : ""}" role="tab" aria-selected="${companyTab === id}" data-action="company-tab" data-id="${id}">${label}</button>`).join("")}</div>${details}</div></div></section>`;
	}

	function itemStats(item) {
		const values = [
			["PA", item.pa || item.attack || item.wp],
			["MA", item.ma],
			["HP", item.hp],
			["MP", item.mp],
			["Move", item.move],
			["Speed", item.speed],
			["Evade", item.evade],
		];
		return (
			values
				.filter(([, value]) => value)
				.map(([label, value]) => `${label} +${value}`)
				.join(" · ") ||
			item.description ||
			"A piece of Ivalice’s history."
		);
	}

	function shopScreen() {
		const items = asArray(game.getShopItems?.() || equipment)
			.sort((a, b) => a.price - b.price)
			.filter(
				(item) =>
					(shopTab === "all" ||
						(shopTab === "supplies" &&
							(item.slot === "item" ||
								item.slot === "consumable" ||
								item.type === "consumable")) ||
						(shopTab === "weapons" && item.slot === "weapon") ||
						(shopTab === "armor" &&
							["head", "body", "shield"].includes(item.slot)) ||
						(shopTab === "accessories" && item.slot === "accessory")) &&
					(!shopSearch ||
						`${item.name} ${item.description || ""}`
							.toLowerCase()
							.includes(shopSearch.toLowerCase())),
			);
		return `<section class="screen-paper" data-scroll aria-label="Equipment shop">${panelHeading("The royal outfitter", "Tools of the trade", "A good blade is only as strong as the hand that wields it.", `<div class="stat-group"><div class="stat">War chest<strong>${number(getState().gil)} G</strong></div></div>`)}<div class="tabs shop-tabs" role="tablist" aria-label="Shop categories">${[
			["all", "All goods"],
			["weapons", "Weapons"],
			["armor", "Armor"],
			["accessories", "Accessories"],
			["supplies", "Supplies"],
		]
			.map(
				([id, label]) =>
					`<button class="tab ${shopTab === id ? "active" : ""}" role="tab" aria-selected="${shopTab === id}" data-action="shop-tab" data-id="${id}">${label}</button>`,
			)
			.join(
				"",
			)}</div><input class="search-input" id="shop-search" type="search" placeholder="Search the outfitter…" aria-label="Search shop items" value="${esc(shopSearch)}"><div class="item-list">${items.map((item) => `<div class="item-row"><div class="item-symbol">${icon(item.slot === "weapon" ? "sword" : item.slot === "accessory" ? "diamond" : ["item", "consumable"].includes(item.slot) ? "potion" : "shield")}</div><div class="item-copy"><h3>${esc(item.name)}${getState().inventory?.[item.id] ? `<span class="inventory-count">×${getState().inventory[item.id]}</span>` : ""}</h3><p>${esc(itemStats(item))}</p></div>${button(`${number(item.price)} G`, "buy", { class: "small secondary", id: item.id, disabled: Number(getState().gil || 0) < Number(item.price || 0) })}</div>`).join("") || '<div class="empty-state">No goods match this search.</div>'}</div></section>`;
	}

	function questsScreen() {
		const state = getState();
		const renderQuest = (quest, index) => {
			const progress = state.quests?.[quest.id],
				complete = progress?.status === "complete",
				ready = progress?.status === "ready",
				active = progress?.status === "active";
			const rumor = quest.type === "rumor",
				locked = Number(quest.chapter || 1) > Number(state.chapter || 1);
			const reward = quest.reward?.gil ? `${number(quest.reward.gil)} G` : "";
			const copy =
				quest.description ||
				quest.summary ||
				"An opportunity for a capable company.";
			return `<article class="quest-row"><span class="quest-number">${String(index + 1).padStart(2, "0")}</span><div><h3>${esc(quest.name)}</h3><p>${esc(copy.slice(0, 280))}${copy.length > 280 ? "…" : ""}</p>${copy.length > 280 ? `<details class="quest-route-details"><summary>Read the complete rumor</summary><p>${esc(copy)}</p></details>` : ""}<p style="font-size:9px;color:var(--gold)">${locked ? `Available in Chapter ${chapterRoman[quest.chapter]}. ` : ""}${quest.cost ? `Commission: ${number(quest.cost)} G. ` : ""}${reward ? `Reward: ${reward}. ` : ""}${active ? `${progress.progress} / ${progress.goal} ${rumor ? "encounters" : "battles"} completed.${progress.crew?.length ? ` Crew: ${progress.crew.map((id) => party().find((unit) => unit.id === id)?.name || id).join(", ")}.` : ""}` : ""}</p></div>${complete ? '<span class="tag complete">Completed</span>' : ready ? button("Claim reward", "claim-quest", { class: "small", id: quest.id }) : active ? '<span class="tag current">Under way</span>' : button(rumor ? "Follow rumor" : "Accept errand", "start-quest", { class: "small secondary", id: quest.id, disabled: locked })}</article>`;
		};
		let body = "";
		if (questTab === "errands")
			body = `<div class="notice">Accept a tavern proposition and complete battles to advance it. Return here when the job is finished to claim your reward.</div>${asArray(
				quests,
			)
				.filter((quest) => quest.type === "dispatch")
				.map(renderQuest)
				.join("")}`;
		else if (questTab === "rumors")
			body = `<div class="notice">Record a rumor and follow its route. Town visits and expeditions uncover the rest of the tale.</div>${asArray(
				quests,
			)
				.filter((quest) => quest.type !== "dispatch")
				.map(renderQuest)
				.join("")}`;
		else if (questTab === "visits") {
			const visits =
				game.getAvailableWorldEvents?.() ||
				asArray(worldEvents).map((event) => ({
					...event,
					unlocked: false,
					completed: (state.worldEvents || []).includes(event.id),
					reason: "These journeys open in Chapter IV.",
				}));
			body = `<div class="notice">Travel between cities to follow rumors, restore lost companions, and awaken the relics of old Ivalice. Each visit opens the next step of its story.</div>${visits.map((event) => `<article class="quest-row"><span class="quest-number">${icon("map")}</span><div><div class="ability-type-label">${esc(event.location)}</div><h3>${esc(event.name)}</h3><p>${esc(event.description)}</p>${!event.completed ? `<p style="font-size:9px;color:var(--gold)">${esc(event.unlocked ? (event.cost ? `Cost: ${event.cost} G` : "Your company is ready to travel.") : event.reason || "Continue the chronicle to open this route.")}</p>` : ""}</div>${event.completed ? button("Read again", "world-event-scene", { id: event.id, class: "small secondary" }) : button(event.cost ? `Visit · ${number(event.cost)} G` : "Visit", "visit-world-event", { id: event.id, class: "small secondary", disabled: !event.unlocked })}</article>`).join("")}`;
		} else
			body = `<div class="notice">Optional battlefields lead to unusual allies and rare rewards. Some routes open after a town visit; the Deep Dungeon descends one floor at a time.</div>${asArray(
				optionalBattles,
			)
				.map(
					(encounter) =>
						`<article class="quest-row"><span class="quest-number">${icon("flag")}</span><div><h3>${esc(encounter.name)}</h3><p>${esc(encounter.summary || encounter.story || "A challenge beyond the main chronicle.")}</p></div>${button((state.completed || []).includes(encounter.id) ? "Revisit" : game.encounterUnlocked?.(encounter) ? "Travel" : "Locked", "start-battle", { class: "small secondary", id: encounter.id, disabled: !game.encounterUnlocked?.(encounter) })}</article>`,
				)
				.join("")}`;
		return `<section class="screen-paper" data-scroll aria-label="Quests and errands">${panelHeading("Beyond the Lion War", "Errands & expeditions", "The kingdom has more than one story to tell.")}<div class="tabs" role="tablist" aria-label="Optional adventures">${[
			["errands", "Propositions"],
			["visits", "Town visits"],
			["rumors", "Rumors"],
			["expeditions", "Expeditions"],
		]
			.map(
				([id, label]) =>
					`<button class="tab ${questTab === id ? "active" : ""}" role="tab" aria-selected="${questTab === id}" data-action="quest-tab" data-id="${id}">${label}</button>`,
			)
			.join("")}</div>${body}</section>`;
	}

	async function ensureArchive() {
		if (archiveLoading || isGuideArchiveLoaded()) return;
		archiveLoading = true;
		archiveError = null;
		render();
		try {
			await loadGuideRecords();
		} catch (error) {
			archiveError =
				error?.message || "The source archive could not be opened.";
		} finally {
			archiveLoading = false;
			render();
		}
	}

	function chronicleScreen() {
		let body = "";
		if (codexTab === "chronicle")
			body = `<h2>The untold history</h2><p>A kingdom emerges from the Fifty Years’ War with empty coffers and a broken people. Two lions circle the throne. Between them, Ramza Beoulve discovers that the stories people die for are not always the truth.</p>${asArray(
				chapters,
			)
				.map(
					(chapter, index) =>
						`<div class="codex-entry"><div class="eyebrow" style="font-size:7px">Chapter ${chapterRoman[index + 1] || index + 1}</div><h3>${esc(chapter.title || chapter.name)}</h3><p>${esc(chapter.summary || chapter.description || "")}</p></div>`,
				)
				.join(
					"",
				)}<h3>Your campaign record</h3><p>${(getState().completed || []).length} encounters completed. Your company’s progress is saved automatically on this device.</p>`;
		else if (codexTab === "battles")
			body = `<h2>Battlefields of Ivalice</h2><p>The complete campaign, in the order recorded by the chronicle. Return to any completed battlefield to earn experience and job points.</p>${asArray(
				campaign,
			)
				.map(
					(encounter, index) =>
						`<div class="codex-entry"><h3><span style="color:#a4a88f;font-size:16px;margin-right:9px">${String(index + 1).padStart(2, "0")}</span>${esc(encounter.name)} ${(getState().completed || []).includes(encounter.id) ? '<span class="tag complete">Complete</span>' : ""}</h3><p>Chapter ${chapterRoman[encounter.chapter] || encounter.chapter} · ${esc(encounter.summary || encounter.story || "")}</p>${(getState().completed || []).includes(encounter.id) ? button("Revisit battlefield", "start-battle", { id: encounter.id, class: "small secondary" }) : ""}</div>`,
				)
				.join("")}`;
		else if (codexTab === "systems")
			body = `<h2>The art of the encounter</h2>${[
				[
					"Time is a resource",
					"Each unit gains charge time (CT) according to its Speed. At 100 CT it receives a turn. Move and act in either order, or wait to keep more CT for the next turn. The turn order is visible above the battlefield.",
				],
				[
					"Position decides the battle",
					"Height changes movement and attack reach. Move highlights show every reachable tile. Attack from a side or the rear to reduce an opponent’s chance to evade. Choose a facing when you wait; protect your back.",
				],
				[
					"A life beyond one job",
					"Earn experience and job points through action. Spend JP on abilities in Company. Job levels unlock new disciplines. Choose a secondary job to combine its learned skills with your current action set.",
				],
				[
					"Magic takes time",
					"Many spells begin a charge instead of resolving immediately. Watch the turn order and plan for units moving before the spell lands. Faith influences magic. MP and items are limited within each encounter.",
				],
				[
					"Bravery, faith, and consequence",
					"Physical prowess and magical faith shape a unit’s strengths. Status effects alter movement, accuracy, actions, and health over time. Inspect targets and read the prediction before committing.",
				],
				[
					"Fallen allies",
					"A fallen unit has a limited countdown before leaving the battlefield. Raise and Phoenix Down bring allies back. Finish the fight before your company is lost. Survivors recover between encounters.",
				],
				[
					"Battle preparations",
					"Visit the outfitter for weapons, armor, accessories, and supplies. Equipment and job changes are available between encounters. Your war chest, learned abilities, party, and victories are saved locally.",
				],
				[
					"Hidden paths",
					"Errands earn gil and discoveries as your company fights. Optional battles bring legendary allies, the Deep Dungeon, and other stories beyond the Lion War into your chronicle.",
				],
			]
				.map(
					([name, text]) =>
						`<div class="codex-entry"><h3>${name}</h3><p>${text}</p></div>`,
				)
				.join("")}`;
		else if (codexTab === "jobs")
			body = `<h2>Disciplines of Ivalice</h2>${asArray(jobs)
				.map(
					(job) =>
						`<div class="codex-entry"><h3>${esc(job.name)}</h3><p>${esc(job.description || "")}</p><p style="font-size:9px;color:var(--gold)">${
							asArray(job.requires || job.requirements)
								.map((req) => `${esc(jobName(req.job))} level ${req.level}`)
								.join(" · ") || "Available from the beginning"
						}</p></div>`,
				)
				.join("")}`;
		else if (codexTab === "ledger" && !isGuideArchiveLoaded()) {
			body = `<h2>The source archive</h2><p>The complete source guide is kept here, including every character, item, quest, and system record.</p>${archiveError ? `<div class="notice" role="alert">The archive could not be opened. Check your connection and try again.</div>${button("Open the archive", "load-archive", { class: "secondary", icon: "book" })}` : `<div class="notice" role="status">${archiveLoading ? "Opening the full archive…" : "The source archive is ready to open."}</div>${!archiveLoading ? button("Open the archive", "load-archive", { class: "secondary", icon: "book" }) : ""}`}`;
		} else if (codexTab === "ledger") {
			const records = asArray(guideRecords).filter(
				(record) =>
					!codexSearch ||
					`${record.name} ${record.type} ${record.section} ${record.text}`
						.toLowerCase()
						.includes(codexSearch.toLowerCase()),
			);
			body = `<h2>The source archive</h2><p>Every indexed record from <em>FFT_Unified_Guide.md</em>, with its source section and integration note. Search characters, equipment, quests, places, or systems.</p><input id="codex-search" class="search-input" type="search" placeholder="Search ${asArray(guideRecords).length} source records…" value="${esc(codexSearch)}" aria-label="Search source guide archive" style="width:100%;margin-bottom:15px"><p style="font-size:9px;color:var(--gold)">${number(records.length)} records ${records.length > 60 ? "· showing the first 60; refine your search" : ""}</p>${records
				.slice(0, 60)
				.map(
					(record) =>
						`<div class="codex-entry"><div style="font-size:7px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold)">${esc(record.type)} · ${esc(record.section || "")}</div><h3>${esc(record.name)}</h3><p>${esc(String(record.text || "").slice(0, 650))}${String(record.text || "").length > 650 ? "…" : ""}</p><details class="archive-full"><summary>Read full source record</summary><pre>${esc(record.text || "")}</pre></details><p style="font-size:8px;margin-top:7px;color:#8b947f">Source line ${record.sourceLine || "—"} · ${esc(record.implementation || record.coverage || "Preserved in the chronicle archive")}</p></div>`,
				)
				.join("")}`;
		}
		return `<section class="screen-paper" data-scroll aria-label="Chronicle and source archive">${panelHeading("From the Durai Papers", "The chronicle", "What history remembers. What it leaves behind.")}<div class="codex-layout"><nav class="codex-nav" aria-label="Chronicle sections">${[
			["chronicle", "The Lion War"],
			["battles", "Campaign record"],
			["systems", "Battle & progression"],
			["jobs", "The job compendium"],
			["ledger", "Source archive"],
		]
			.map(
				([id, label]) =>
					`<button class="${codexTab === id ? "active" : ""}" data-action="codex-tab" data-id="${id}">${label}</button>`,
			)
			.join("")}</nav><div class="codex-body">${body}</div></div></section>`;
	}

	function battleScreen(state) {
		const battle = state.battle;
		if (!battle) return "";
		const unit = activeUnit();
		const encounter =
			battle.encounter || findById(allEncounters(), battle.id) || {};
		const isPlayer = battle.phase === "player" && unit?.team !== "enemy";
		const actions = asArray(game.getActions?.(unit));
		const skills = actions.filter(
			(action) =>
				!["move", "attack", "wait", "item"].includes(
					typeof action === "string" ? action : action.id,
				) && !action.consumable,
		);
		const supplies = actions.filter((action) => action.consumable);
		const action =
			typeof battle.action === "string"
				? battle.action
				: battle.action?.id || "move";
		const selection = pendingTarget || hoverSelection || battle.selection;
		const target = selection
			? battle.units.find(
					(member) =>
						member.x === selection.x &&
						member.z === selection.z &&
						!member.removed,
				)
			: null;
		let preview;
		if (selection) {
			try {
				preview = game.getPreview?.(selection.x, selection.z);
			} catch {}
		}
		const namedAction = findById(abilities, action)?.name || titleCase(action);
		let hint = !isPlayer
			? "The enemy company is taking its turn."
			: battle.needsFacing
				? "Choose a facing to finish this turn."
				: action === "move"
					? "Select a blue tile to move."
					: action === "attack"
						? "Select an enemy in range to strike."
						: `Select a target for ${namedAction}.`;
		if (unit?.moved && unit?.acted)
			hint = "Your actions are complete. Choose Wait to end the turn.";
		if (pendingTarget && !unit?.acted)
			hint = "Review the prediction. Select the target again to confirm.";
		if (actionMenu) hint = "";
		const status = Object.entries(unit?.statuses || {})
			.filter(([, turns]) => Number(turns) > 0)
			.map(([name]) => titleCase(name));
		const log = (battle.log || []).slice(-4);
		const objective =
			game.objectiveText?.() ||
			(typeof encounter.objective === "string"
				? encounter.objective
				: "Defeat the enemy company.");
		const actionButton = (label, id, key, iconName, disabled = false) =>
			`<button class="command ${action === id && !actionMenu ? "active" : ""}" data-action="battle-action" data-id="${id}" ${disabled ? "disabled" : ""} aria-label="${esc(label)}${key ? ` (${key})` : ""}">${icon(iconName)}<span>${label}</span>${key ? `<kbd>${key}</kbd>` : ""}</button>`;
		return `<section class="battle-screen" aria-label="Tactical battlefield"><div class="battle-top"><div class="battle-title"><div class="eyebrow">Chapter ${chapterRoman[encounter.chapter || state.chapter || 1]} · Encounter ${String(Math.max(1, asArray(campaign).findIndex((item) => item.id === battle.id) + 1)).padStart(2, "0")}</div><h1>${esc(encounter.name || "The battlefield")}</h1><p>${esc(objective)}</p><div class="battle-weather">${icon("sun")} ${esc(titleCase(encounter.terrain || "Highlands"))} <span>·</span> Round ${battle.round || 1}</div></div><div class="turn-order" aria-label="Upcoming turn order"><span class="turn-order-label">Turn order</span>${(
			battle.turnOrder || []
		)
			.slice(0, 8)
			.map((entry, index) => {
				const member =
					typeof entry === "string"
						? battle.units.find((candidate) => candidate.id === entry)
						: entry;
				return member
					? `<button class="turn-token ${index === 0 ? "current" : ""} ${member.team === "enemy" ? "enemy" : "ally"}" data-action="focus-unit" data-id="${esc(member.id)}" aria-label="Focus ${esc(member.name)}, ${member.team === "enemy" ? "enemy" : "ally"}, ${member.hp} HP">${avatar(member)}<span>${esc(member.name.split(" ")[0].slice(0, 7))}</span><span class="ct">${Math.floor(member.ct || 0)}</span></button>`
					: "";
			})
			.join(
				"",
			)}</div></div>${status.length ? `<div class="battle-status-ribbon">${esc(unit.name)} · ${esc(status.join(" · "))}</div>` : ""}<div class="battle-log" role="log" aria-label="Battle events">${log.map((entry) => `<div class="log-entry">${esc(typeof entry === "string" ? entry : entry.text || entry.message || "")}</div>`).join("")}</div>${preview && action !== "move" ? previewPanel(preview, target, namedAction) : target && target.id !== unit?.id ? targetPanel(target) : ""}${!isPlayer ? '<div class="enemy-turn"><i></i> Enemy turn</div>' : ""}<div class="battle-bottom">${unit ? `<div class="unit-card"><div class="unit-card-top">${avatar(unit)}<div><h2>${esc(unit.name)}</h2><span class="unit-job">${esc(jobName(unit.job))} · ${unit.team === "enemy" ? "Enemy" : "Your company"}</span></div><span class="unit-level">Lv.${unit.level || 1}</span></div><div class="resource-row"><span class="resource-label">HP</span><div class="resource-bar"><i style="width:${percent(unit.hp, unit.maxHp)}%"></i></div><span class="resource-value">${unit.hp} / ${unit.maxHp}</span></div><div class="resource-row"><span class="resource-label">MP</span><div class="resource-bar mp"><i style="width:${percent(unit.mp, unit.maxMp)}%"></i></div><span class="resource-value">${unit.mp} / ${unit.maxMp}</span></div><div class="unit-card-footer"><span>Move<strong>${unit.move || 3}</strong></span><span>Jump<strong>${unit.jump || 2}</strong></span><span>CT<strong>${Math.floor(unit.ct || 0)}</strong></span></div></div>` : ""}<div class="battle-action-area">${hint ? `<div class="command-hint">${esc(hint)}</div>` : ""}<div class="commands" aria-label="Battle commands">${actionButton("Move", "move", "1", "move", !isPlayer || unit?.moved)}${actionButton("Attack", "attack", "2", "sword", !isPlayer || unit?.acted)}${actionButton("Abilities", "abilities", "3", "magic", !isPlayer || unit?.acted)}${actionButton("Items", "items", "4", "potion", !isPlayer || unit?.acted)}${actionButton("Wait", "wait", "5", "hourglass", !isPlayer)}</div>${
			actionMenu === "abilities"
				? `<div class="ability-menu" aria-label="Choose an ability">${
						skills
							.map((entry) => {
								const ability =
									typeof entry === "string"
										? findById(abilities, entry) || {
												id: entry,
												name: titleCase(entry),
											}
										: entry;
								return `<button class="ability-option" data-action="use-ability" data-id="${esc(ability.id)}" ${ability.disabled ? "disabled" : ""}><strong>${esc(ability.name || titleCase(ability.id))}</strong><span>${ability.mp || ability.mpCost || 0} MP · ${ability.ct || ability.charge || ability.chargeTime || 0} CT</span></button>`;
							})
							.join("") ||
						'<div class="empty-state">Learn abilities in Company to expand this action set.</div>'
					}</div>`
				: actionMenu === "items"
					? `<div class="ability-menu" aria-label="Choose an item">${supplies.map((ability) => `<button class="ability-option" data-action="use-ability" data-id="${esc(ability.id)}" ${ability.disabled ? "disabled" : ""}><strong>${esc(ability.name)}</strong><span>${ability.count ?? 0} available</span></button>`).join("") || '<div class="empty-state">No supplies available.</div>'}</div>`
					: actionMenu === "facing"
						? `<div class="facing-menu"><p>Choose your final facing</p><div class="facing-grid">${[
								["north", "↑"],
								["west", "←"],
								["east", "→"],
								["south", "↓"],
							]
								.map(
									([id, label]) =>
										`<button data-action="face" data-id="${id}" aria-label="Face ${id}">${label}</button>`,
								)
								.join(
									"",
								)}</div><p style="font-size:8px">Enemies strike harder from behind.</p></div>`
						: ""
		}<div class="battle-right-tools"><button class="icon-button" data-action="zoom-in" aria-label="Zoom camera in">${icon("plus", "small")}</button><button class="icon-button" data-action="zoom-out" aria-label="Zoom camera out">${icon("minus", "small")}</button><button class="icon-button" data-action="rotate-left" aria-label="Rotate camera left (Q)">${icon("rotateLeft", "small")}</button><button class="icon-button" data-action="rotate-right" aria-label="Rotate camera right (E)">${icon("rotateRight", "small")}</button><button class="icon-button" data-action="controls" aria-label="Battle controls">${icon("info", "small")}</button></div></div></div><div class="battle-help"><span><kbd>Click</kbd> Select tile or target</span><span><kbd>Q</kbd><kbd>E</kbd> Rotate camera</span><span><kbd>1–5</kbd> Commands</span><span><kbd>Esc</kbd> Cancel</span></div></section>`;
	}

	function previewPanel(preview, target, action) {
		const prediction =
			preview.targets?.find((entry) => entry.targetId === target?.id) ||
			preview.targets?.[0];
		const damage =
			prediction?.damage ??
			prediction?.amount ??
			preview.damage ??
			preview.amount;
		const healing =
			prediction?.healing ??
			preview.healing ??
			["heal", "revive"].includes(preview.ability?.kind);
		const hit =
			prediction?.chance ?? prediction?.hit ?? preview.chance ?? preview.hit;
		const compatibility =
			prediction?.compatibilityLabel ?? preview.compatibilityLabel;
		const multiplier =
			prediction?.compatibilityMultiplier ?? preview.compatibilityMultiplier;
		const kind = preview.ability?.kind;
		const showDamage =
			prediction && damage != null && !["buff", "status"].includes(kind);
		const effect = prediction?.status || preview.ability?.status;
		const title =
			target?.name || prediction?.name || preview.targetName || action;
		const warning =
			preview.valid === false
				? "This tile is outside the action’s range."
				: preview.friendlyFire
					? "Warning: this action also affects your allies."
					: !prediction
						? "Choose a unit or a tile with a valid target."
						: preview.reason ||
							preview.message ||
							"Select the target again to commit this action.";
		return `<aside class="battle-inspector" aria-label="Action preview"><h3 class="section-title">Action prediction</h3><h3>${esc(title)}</h3><div class="preview-line"><span>Action</span><strong>${esc(preview.ability?.name || action)}</strong></div>${showDamage ? `<div class="preview-damage" style="${healing ? "color:var(--green)" : ""}">${healing ? "+" : "−"}${Math.abs(damage)} <span>HP predicted</span></div>` : ""}${prediction && hit != null && kind !== "buff" ? `<div class="preview-line"><span>Hit chance</span><strong>${Math.round(hit)}%</strong></div>` : ""}${effect ? `<div class="preview-line"><span>Effect</span><strong>${esc(titleCase(effect))}</strong></div>` : ""}${compatibility ? `<div class="preview-line compatibility-line ${esc(compatibility.toLowerCase())}"><span>Zodiac</span><strong>${esc(compatibility)}${Number.isFinite(multiplier) ? ` ×${multiplier}` : ""}</strong></div>` : ""}${preview.targets?.length > 1 ? `<div class="preview-line"><span>Area of effect</span><strong>${preview.targets.length} units</strong></div>` : ""}${preview.ct || preview.charge ? `<div class="preview-line"><span>Charge time</span><strong>${preview.ct || preview.charge} CT</strong></div>` : ""}<p>${esc(warning)}</p>${pendingTarget && preview.valid ? `<button class="confirm-action" data-action="confirm-action">Confirm ${esc(action)}</button>` : ""}</aside>`;
	}

	function targetPanel(unit) {
		return `<aside class="battle-inspector" aria-label="Selected unit"><h3 class="section-title">${unit.team === "enemy" ? "Enemy unit" : "Ally unit"}</h3><h3>${esc(unit.name)}</h3><div class="preview-line"><span>${esc(jobName(unit.job))}</span><strong>Lv. ${unit.level || 1}</strong></div><div class="resource-row"><span class="resource-label">HP</span><div class="resource-bar"><i style="width:${percent(unit.hp, unit.maxHp)}%"></i></div><span class="resource-value">${unit.hp}/${unit.maxHp}</span></div><div class="preview-line"><span>Facing</span><strong>${titleCase(unit.facing)}</strong></div>${unit.zodiac ? `<div class="preview-line"><span>Zodiac</span><strong>${esc(titleCase(unit.zodiac))}</strong></div>` : ""}${Object.keys(unit.statuses || {}).length ? `<p>${esc(Object.keys(unit.statuses).map(titleCase).join(" · "))}</p>` : ""}</aside>`;
	}

	function encounterStoryBeats(encounter, timing = "after") {
		return asArray(encounter?.storyBeats)
			.map((beat) =>
				typeof beat === "string" ? { text: beat, timing: "after" } : beat,
			)
			.filter((beat) => (beat.timing || "after") === timing && beat.text);
	}

	function resultsScreen(state) {
		const result = state.result || {};
		const victory = result.victory !== false;
		const encounter = findById(allEncounters(), result.encounterId);
		const aftermath = encounterStoryBeats(encounter);
		const summary =
			aftermath.length && result.victory
				? `The fighting ends at ${encounter?.name || "the battlefield"}. Your company regroups as events beyond the field unfold.`
				: result.summary;
		return `<section class="results-screen" aria-label="Battle results"><div class="result-sheet"><div class="result-emblem">${icon(victory ? "trophy" : "shield")}</div><div class="eyebrow">${victory ? "A page in your chronicle" : "A battle lost, not the war"}</div><h1>${victory ? "Victory" : "Defeat"}</h1><p class="result-subtitle">${esc(result.title === "Victory" ? encounter?.name || "The battlefield falls silent." : result.title || (victory ? "The battlefield falls silent." : "Even the bravest must begin again."))}</p><p class="result-text">${esc(summary || (victory ? "Your company stands together. The road ahead is open." : "Regroup, rethink your strategy, and return to the field."))}</p>${
			victory
				? `<div class="reward-strip"><div class="stat">War spoils<strong>+${number(result.gil)} G</strong></div><div class="stat">Experience<strong>+${number(result.exp)}</strong></div><div class="stat">Job points<strong>+${number(result.jp)}</strong></div></div>${
						asArray(result.items).length
							? `<p class="result-text">Recovered: ${asArray(result.items)
									.map((item) =>
										esc(
											typeof item === "string"
												? findById(equipment, item)?.name || titleCase(item)
												: item.name ||
														findById(equipment, item.id)?.name ||
														item.id,
										),
									)
									.join(", ")}</p>`
							: ""
					}`
				: ""
		}<div class="button-row">${button(victory ? (aftermath.length && result.firstVictory !== false ? "Read the aftermath" : "Continue the chronicle") : "Regroup & try again", victory ? "advance" : "retry", { icon: "arrow" })}${!victory ? button("Campaign map", "return-world", { class: "secondary" }) : ""}</div>${!victory && game.hasCheckpoint?.() ? `<button class="text-button result-aftermath-button" data-action="restore-checkpoint">${icon("back", "small")} Restore camp checkpoint</button>` : ""}${victory && aftermath.length && result.firstVictory === false ? `<button class="text-button result-aftermath-button" data-action="read-aftermath">${icon("book", "small")} Read the aftermath</button>` : ""}<p class="result-quote">“The measure of a person is not their station,<br>but what they choose to stand for.”</p></div></section>`;
	}

	function endingScreen() {
		const headings = [
			"The war’s victor",
			"The road beyond history",
			"The fate of the witness",
			"The price of a crown",
			"The truth survives",
		];
		return `<section class="results-screen ending" aria-label="Ending"><div class="result-sheet"><div class="result-emblem">${icon("crown")}</div><div class="eyebrow">The Durai Papers · Epilogue</div><h1>${esc(ending.title || "The truth outlives the crown")}</h1><div class="ending-passages">${asArray(
			ending.paragraphs,
		)
			.map(
				(paragraph, index) =>
					`<article><span class="ending-passage-label">${headings[index] || "The chronicle continues"}</span><p>${esc(paragraph)}</p></article>`,
			)
			.join(
				"",
			)}</div><p class="result-quote">History remembers the crown.<br>You remembered the people.</p><div class="reward-strip"><div class="stat">Battles won<strong>${(getState().completed || []).length}</strong></div><div class="stat">Companions<strong>${party().length}</strong></div><div class="stat">Chronicle<strong>Complete</strong></div></div><div class="button-row">${button("Return to Ivalice", "postgame", { icon: "map" })}${button("Read the chronicle", "chronicle", { class: "secondary" })}</div><p class="ending-date">CROWN OF ASH · 26 SEPTEMBER 2026 · GPT-6<br><br>A tribute to Final Fantasy Tactics</p></div></section>`;
	}

	function modalContent() {
		if (!modal) return "";
		let body = "",
			classes = "";
		const close = `<button class="modal-close" data-action="close-modal" aria-label="Close dialog">${icon("close")}</button>`;
		if (modal === "options")
			body = `${close}<div class="modal-heading"><div class="eyebrow">Make yourself at home</div><h2>Options</h2><p>Shape the experience to suit your journey.</p></div><div class="settings-row"><div class="settings-copy"><strong>Master volume</strong><span>Music and battlefield sound</span></div><input id="volume" type="range" min="0" max="1" step="0.05" value="${volume}" aria-label="Master volume"></div><div class="settings-row"><div class="settings-copy"><strong>Mute audio</strong><span>Quiet on the battlefield</span></div><button class="toggle ${muted ? "on" : ""}" data-action="mute" role="switch" aria-checked="${muted}" aria-label="Mute audio"></button></div><div class="settings-row"><div class="settings-copy"><strong>Battle difficulty</strong><span>Story eases combat; Tactical rewards preparation</span></div><select id="difficulty" aria-label="Battle difficulty" ${getState().screen === "battle" ? "disabled" : ""}><option value="tactical" ${(getState().difficulty || difficulty) === "tactical" ? "selected" : ""}>Tactical</option><option value="story" ${(getState().difficulty || difficulty) === "story" ? "selected" : ""}>Story</option></select></div><div class="settings-row"><div class="settings-copy"><strong>Rendering quality</strong><span>Auto adapts to measured frame time</span></div><select id="quality" aria-label="Rendering quality">${["Auto", "High", "Balanced"].map((preset) => `<option ${quality.toLowerCase() === preset.toLowerCase() ? "selected" : ""}>${preset}</option>`).join("")}</select></div><div class="settings-row"><div class="settings-copy"><strong>Performance display</strong><span>Graphics backend, preset, and frame time</span></div><button class="toggle ${diagnostics ? "on" : ""}" data-action="diagnostics" role="switch" aria-checked="${diagnostics}" aria-label="Show performance diagnostics"></button></div><div class="settings-row"><div class="settings-copy"><strong>Fullscreen</strong><span>Let Ivalice fill the screen</span></div><button class="icon-button" data-action="fullscreen" aria-label="Toggle fullscreen">${icon("fullscreen")}</button></div><div class="settings-row"><div class="settings-copy"><strong>Save your chronicle</strong><span>Your progress also saves automatically</span></div>${button("Save now", "save", { class: "small secondary", icon: "save" })}</div><div class="settings-row"><div class="settings-copy"><strong>Restore camp checkpoint</strong><span>Recover the company and supplies from before an encounter</span></div>${button("Restore", "restore-checkpoint", { class: "small secondary", disabled: !game.hasCheckpoint?.() })}</div><div class="settings-row"><div class="settings-copy"><strong>How to play</strong><span>Controls and tactical fundamentals</span></div><button class="icon-button" data-action="controls" aria-label="Open controls reference">${icon("book")}</button></div><p class="settings-note">High: richer shadows and post effects. Balanced: lower rendering cost and fewer physical fragments. Your progress is stored locally in this browser.</p><div class="button-row">${button("Resume", "close-modal", { icon: "arrow" })}</div>`;
		else if (modal === "controls") {
			classes = "large";
			body = `${close}<div class="modal-heading"><div class="eyebrow">A tactician’s field guide</div><h2>Every choice leaves a mark.</h2><p>Move with purpose. Act with conviction. Keep your company together.</p></div><div class="controls-grid">${[
				["Select tile or target", "Click / Tap"],
				["Move command", "1"],
				["Attack command", "2"],
				["Abilities / Items", "3 / 4"],
				["Wait & choose facing", "5"],
				["Rotate battlefield", "Q / E"],
				["Move tile cursor", "Arrow keys"],
				["Confirm cursor", "Enter"],
				["Cancel / Close", "Escape"],
				["Camera on touch", "↶ / ↷ buttons"],
			]
				.map(
					([label, key]) =>
						`<div class="control-row"><span>${label}</span><kbd>${key}</kbd></div>`,
				)
				.join(
					"",
				)}</div><div class="help-steps"><div class="help-step"><span class="step-number">01</span><h3>Read the field</h3><p>The turn order shows who acts next. Height, range, and facing decide which plans will work.</p></div><div class="help-step"><span class="step-number">02</span><h3>Move & act</h3><p>Choose either order. Blue tiles show movement. Select an action, then a target; the prediction explains the result.</p></div><div class="help-step"><span class="step-number">03</span><h3>Choose your facing</h3><p>Use Wait to end your turn. Face the enemy to protect your back. Saving actions lets your next turn arrive sooner.</p></div></div><div class="button-row">${button("Ready for the road", "close-modal", { icon: "arrow" })}</div>`;
		} else if (modal === "about")
			body = `${close}<div class="modal-heading"><div class="eyebrow">An Ivalice Chronicle</div><h2>Crown of Ash</h2><p>A playable tactical tribute to Final Fantasy Tactics, built in a low-poly toy world.</p></div><div class="codex-body"><p>Follow Ramza Beoulve through the Lion War, learn Ivalice’s jobs, develop your company, and discover the truth beneath its histories.</p><p>The full source guide is preserved in the Chronicle’s searchable source archive. The campaign, encounters, items, jobs, and side journeys draw from <em>FFT_Unified_Guide.md</em>.</p><p>Created 26 September 2026 with GPT-6. Source-game audio is placeholder material for internal, non-commercial testing. This is an unofficial fan work.</p><p style="font-size:10px">Rendering: Three.js WebGPU / WebGL2<br>Physics: Rapier · Progress: local browser storage</p></div><div class="button-row">${button("Explore the chronicle", "chronicle", { icon: "book" })}</div>`;
		else if (modal === "prologue") {
			classes = "story-modal";
			body = `<div class="eyebrow">Prologue · The kingdom of Ivalice</div><h2>At the end of one war,<br>another begins.</h2><p class="story-text">The Fifty Years’ War has left a kingdom divided. Noble houses circle the throne while its forgotten soldiers starve. A young cadet of House Beoulve is about to learn what a family name is worth.</p><div class="speaker">Your chronicle begins at Orbonne Monastery</div><p style="font-size:10px;line-height:1.9;color:#7d8870">Prepare your company from the campaign map. Select your next battlefield to begin. Your progress saves automatically.</p><div class="button-row">${button("Take the first step", "close-modal", { icon: "arrow" })}</div>`;
		} else if (modal === "story") {
			const encounter =
				allEncounters().find((item) => item.id === selectedEncounterId) ||
				getNext();
			classes = "story-modal";
			body = `${close}<div class="eyebrow">Chapter ${chapterRoman[encounter?.chapter || 1]} · The chronicle continues</div><h2>${esc(encounter?.name)}</h2><p class="story-text">${esc(encounter?.story || encounter?.summary || "")}</p>${asArray(
				encounter?.dialogue,
			)
				.map(
					(line) =>
						`<div class="speaker">${esc(line.speaker)}</div><p style="font:italic 19px/1.6 var(--serif);color:#758166">“${esc(line.text)}”</p>`,
				)
				.join(
					"",
				)}<div class="button-row">${button("To the battlefield", "confirm-battle", { icon: "sword", id: encounter?.id })}</div>`;
		} else if (modal === "difficulty")
			body = `${close}<div class="modal-heading"><div class="eyebrow">Your chronicle, your pace</div><h2>Choose your challenge.</h2><p>Both journeys follow the complete Lion War. Change difficulty between encounters in Options.</p></div><div class="difficulty-options"><button class="difficulty-option" data-action="begin-difficulty" data-id="story">${icon("book")}<span><strong>Story</strong><small>Follow the chronicle with forgiving battles. A good first journey through Ivalice.</small></span>${icon("arrow")}</button><button class="difficulty-option" data-action="begin-difficulty" data-id="tactical">${icon("sword")}<span><strong>Tactical</strong><small>Job preparation, positioning, and carefully timed actions matter. The classic challenge.</small></span>${icon("arrow")}</button></div>`;
		else if (modal === "after-story") {
			const result = getState().result || {};
			const encounter = findById(allEncounters(), result.encounterId);
			const beats = encounterStoryBeats(encounter);
			const beat = beats[Math.min(storyPage, beats.length - 1)] || {
				title: "The road ahead",
				text: result.summary,
			};
			classes = "story-modal";
			body = `${close}<div class="eyebrow">After the battle · Chapter ${chapterRoman[encounter?.chapter || 1]}</div><h2>${esc(beat.title || "Between the lines of history")}</h2><p class="story-text short">${esc(beat.text)}</p>${beat.speaker ? `<div class="speaker">${esc(beat.speaker)}</div>` : ""}<div class="story-pages" aria-label="Story passage ${storyPage + 1} of ${beats.length}">${beats.map((_, index) => `<span class="${index === storyPage ? "active" : ""}"></span>`).join("")}</div><div class="story-navigation">${storyPage ? `<button class="text-button" data-action="story-back">${icon("back", "small")} Previous</button>` : `<button class="text-button" data-action="finish-aftermath">Continue the journey</button>`}${button(storyPage < beats.length - 1 ? "Read on" : "Continue the chronicle", storyPage < beats.length - 1 ? "story-next" : "finish-aftermath", { icon: "arrow" })}</div>`;
		} else if (modal === "world-event") {
			const event = findById(worldEvents, selectedWorldEventId);
			classes = "story-modal";
			body = `${close}<div class="eyebrow">${esc(event?.location || "A journey through Ivalice")}</div><h2>${esc(event?.name || "A tale on the road")}</h2><p class="story-text short">${esc(event?.description || "")}</p>${asArray(
				event?.dialogue,
			)
				.filter((line) => line.text !== event?.description)
				.map(
					(line) =>
						`<div class="speaker">${esc(line.speaker)}</div><p class="story-text short">${esc(line.text)}</p>`,
				)
				.join(
					"",
				)}${event?.recruit ? `<div class="notice">${esc(event.recruit.name)} joins your company.</div>` : event?.transform ? `<div class="notice">${esc(party().find((unit) => unit.id === event.transform.unitId)?.name || titleCase(event.transform.unitId))} is restored. Find their new abilities in Company.</div>` : event?.items?.length ? `<div class="notice">Recovered: ${event.items.map((id) => esc(findById(equipment, id)?.name || titleCase(id))).join(", ")}.</div>` : ""}<div class="button-row">${button("Return to the road", "close-modal", { icon: "arrow" })}</div>`;
		} else if (modal === "dispatch") {
			const quest = findById(quests, dispatchQuestId);
			const candidates =
				game.getDispatchCandidates?.(dispatchQuestId) ||
				party().filter(
					(unit) =>
						unit.id !== "ramza" &&
						!unit.onQuest &&
						!findById(jobs, unit.homeJob)?.special,
				);
			const enough =
				dispatchCrew.size >= 1 &&
				dispatchCrew.size <= 3 &&
				getState().gil >= (quest?.cost || 0);
			body = `${close}<div class="modal-heading"><div class="eyebrow">Tavern proposition</div><h2>${esc(quest?.name || "Choose your crew")}</h2><p>${esc(quest?.description || "Choose one to three recruits for this assignment.")}</p></div><div class="dispatch-meta"><span>Commission <strong>${number(quest?.cost)} G</strong></span><span>Duration <strong>${quest?.duration || 2} battles</strong></span><span>Preferred <strong>${esc(jobName(quest?.preferredJob))}</strong></span></div><p class="dispatch-explanation">Send one to three recruits. They will be unavailable for battle until the assignment is ready. A matching job improves the reward.</p><div class="dispatch-crew">${candidates.map((unit) => `<label class="dispatch-member ${dispatchCrew.has(unit.id) ? "selected" : ""}"><input type="checkbox" data-dispatch-unit value="${esc(unit.id)}" aria-label="Assign ${esc(unit.name)}" ${dispatchCrew.has(unit.id) ? "checked" : ""} ${dispatchCrew.size >= 3 && !dispatchCrew.has(unit.id) ? "disabled" : ""}>${avatar(unit)}<span class="dispatch-member-name"><strong>${esc(unit.name)}</strong><small>${esc(jobName(unit.job))} · Level ${unit.level || 1}</small></span>${unit.job === quest?.preferredJob ? '<span class="tag complete">Preferred</span>' : ""}</label>`).join("") || '<div class="empty-state">No eligible recruits are currently available.</div>'}</div><div class="dispatch-footer"><span aria-live="polite">${dispatchCrew.size} / 3 recruits selected</span><strong>Reward: ${number(quest?.reward?.gil)} G + ${number(quest?.reward?.jp)} JP</strong></div><div class="button-row">${button("Cancel", "close-modal", { class: "secondary" })}${button("Dispatch the crew", "confirm-dispatch", { icon: "arrow", disabled: !enough })}</div>`;
		} else if (modal === "recruit") {
			const capacity = game.getRosterCapacity?.() || {
				used: party().length,
				max: 32,
			};
			const cost = game.getRecruitmentCost?.(recruitDraft) ?? 600;
			const canHire =
				recruitDraft.name.trim().length > 0 &&
				capacity.used < capacity.max &&
				getState().gil >= cost;
			body = `${close}<div class="modal-heading"><div class="eyebrow">The soldier office</div><h2>A place in your company.</h2><p>Choose a new recruit’s name and discipline. Recruits begin at level 1, with their own Brave and Faith.</p></div><div class="recruit-form"><label class="recruit-field full"><span>Name</span><input id="recruit-name" type="text" maxlength="18" autocomplete="off" placeholder="Your recruit’s name" value="${esc(recruitDraft.name)}" aria-label="Recruit name"></label><label class="recruit-field"><span>Discipline</span><select id="recruit-job" aria-label="Recruit job"><option value="squire" ${recruitDraft.job === "squire" ? "selected" : ""}>Squire</option><option value="chemist" ${recruitDraft.job === "chemist" ? "selected" : ""}>Chemist</option></select></label><label class="recruit-field"><span>Sex</span><select id="recruit-sex" aria-label="Recruit sex"><option value="male" ${recruitDraft.sex === "male" ? "selected" : ""}>Male</option><option value="female" ${recruitDraft.sex === "female" ? "selected" : ""}>Female</option></select></label><label class="recruit-field full"><span>Zodiac sign</span><select id="recruit-zodiac" aria-label="Recruit zodiac sign">${ZODIAC_SIGNS.map((sign) => `<option value="${sign}" ${recruitDraft.zodiac === sign ? "selected" : ""}>${titleCase(sign)}</option>`).join("")}</select><small>Sign and sex determine zodiac compatibility with other units.</small></label></div><div class="recruit-total"><span>${number(getState().gil)} G available · ${capacity.used} / ${capacity.max} places filled</span><strong>${number(cost)} G</strong></div><div class="button-row">${button("Cancel", "close-modal", { class: "secondary" })}${button("Welcome to the company", "confirm-recruit", { icon: "arrow", disabled: !canHire })}</div>`;
		} else if (modal === "incubator") {
			const eggs = game.getEggs?.() || [];
			const capacity = game.getRosterCapacity?.() || {
				used: party().length,
				max: 32,
			};
			body = `${close}<div class="modal-heading"><div class="eyebrow">New companions, old bloodlines</div><h2>The incubator</h2><p>Monsters in your company may lay eggs after a victory. Keep a free company place for each new arrival.</p></div>${eggs.length ? `<div class="egg-list">${eggs.map((egg) => `<article class="egg-row"><span class="egg-symbol">${icon("egg")}</span><div><h3>${esc(egg.name || `${titleCase(egg.family)} egg`)}</h3><p>${esc(jobName(egg.job))} · ${esc(party().find((unit) => unit.id === egg.parentId)?.name || titleCase(egg.family))} lineage</p><div class="egg-progress"><i style="width:${percent(egg.progress, egg.required)}%"></i></div><small>${egg.ready ? "Ready to hatch" : `${Math.max(0, egg.required - egg.progress)} more victories until hatching`}</small></div>${button(capacity.used >= capacity.max ? "Company full" : "Hatch", "hatch-egg", { class: "small secondary", id: egg.id, disabled: !egg.ready || capacity.used >= capacity.max || getState().screen === "battle" })}</article>`).join("")}</div>` : `<div class="empty-state egg-empty">${icon("egg")}<p>No eggs are resting here yet.</p><span>Bring a monster into your company and continue the journey. Eggs from different families may appear after victories.</span></div>`}<div class="recruit-total"><span>${capacity.used} / ${capacity.max} company places filled</span><span>${eggs.length} ${eggs.length === 1 ? "egg" : "eggs"}</span></div><div class="button-row">${button("Return to your company", "close-modal", { icon: "arrow" })}</div>`;
		} else if (modal === "release") {
			const unit = selectedUnit();
			body = `${close}<div class="modal-heading"><div class="eyebrow">Parting ways</div><h2>Release ${esc(unit?.name)}?</h2><p>This companion will leave your company. This choice is saved immediately.</p></div><div class="button-row">${button("Stay together", "close-modal", { class: "secondary" })}${button("Release companion", "confirm-release", { class: "danger", id: unit?.id })}</div>`;
		} else if (modal === "checkpoint") {
			body = `${close}<div class="modal-heading"><div class="eyebrow">A chance to prepare again</div><h2>Return to the last camp?</h2><p>Restore your party, equipment, gil, supplies, and campaign progress from the checkpoint before that encounter. Any progress since then will be replaced.</p></div><div class="button-row">${button("Keep current progress", "close-modal", { class: "secondary" })}${button("Restore camp", "confirm-checkpoint", { icon: "back" })}</div>`;
		} else if (modal === "new-confirm")
			body = `${close}<div class="modal-heading"><div class="eyebrow">A new beginning</div><h2>Begin a new chronicle?</h2><p>This will replace your current local campaign. Your display and audio preferences will remain.</p></div><div class="button-row">${button("Keep my journey", "close-modal", { class: "secondary" })}${button("Begin anew", "confirm-new", { icon: "arrow" })}</div>`;
		else if (modal === "leave-battle")
			body = `${close}<div class="modal-heading"><div class="eyebrow">Regroup your company</div><h2>Withdraw from this battle?</h2><p>Return to the campaign map to change jobs and equipment. This encounter will need to be fought again.</p></div><div class="button-row">${button("Stay & fight", "close-modal", { class: "secondary" })}${button("Withdraw", "withdraw", { icon: "back" })}</div>`;
		return `<div class="modal-backdrop" data-action="backdrop"><section class="modal ${classes}" role="dialog" aria-modal="true" aria-label="${esc(modal === "options" ? "Options" : modal === "controls" ? "Controls reference" : modal === "about" ? "About Crown of Ash" : modal === "story" ? "Encounter story" : modal === "after-story" ? "The aftermath" : modal === "world-event" ? "A journey through Ivalice" : modal === "dispatch" ? "Select assignment crew" : modal === "recruit" ? "Recruit a soldier" : modal === "incubator" ? "Monster incubator" : modal === "release" ? "Release companion" : modal === "checkpoint" ? "Restore camp checkpoint" : modal === "prologue" ? "Prologue" : "Confirm action")}">${body}</section></div>`;
	}

	function render() {
		const state = getState();
		if (lastScreen !== state.screen) {
			actionMenu = null;
			pendingTarget = null;
			hoverSelection = null;
			if (state.screen === "result" || state.screen === "ending") {
				panel = null;
				modal = null;
			}
			if (state.screen === "battle") {
				panel = null;
				selectedEncounterId = state.battle?.id;
			}
			lastScreen = state.screen;
		}
		const previousModal = root
			.querySelector('[role="dialog"]')
			?.getAttribute("aria-label");
		const focusAction = document.activeElement?.dataset?.action;
		const focusId = document.activeElement?.dataset?.id;
		const existingToast = root.querySelector(".toast");
		const rosterScroll = root.querySelector(".roster");
		const rosterPosition = {
			top: rosterScroll?.scrollTop || 0,
			left: rosterScroll?.scrollLeft || 0,
		};
		const scrollPanel = root.querySelector("[data-scroll]");
		const scrollTop = scrollPanel?.scrollTop || 0;
		const isScenic =
			!panel &&
			["title", "battle", "result", "ending"].includes(state.screen || "title");
		renderer?.setVisible?.(isScenic);
		const content =
			panel === "company"
				? companyScreen()
				: panel === "shop"
					? shopScreen()
					: panel === "quests"
						? questsScreen()
						: panel === "chronicle"
							? chronicleScreen()
							: state.screen === "world"
								? worldScreen(state)
								: state.screen === "battle"
									? battleScreen(state)
									: state.screen === "result"
										? resultsScreen(state)
										: state.screen === "ending"
											? endingScreen()
											: titleScreen();
		root.innerHTML = `<div class="app screen-${esc(panel || state.screen || "title")}">${content}${header(state)}${modalContent()}<div class="diagnostics ${!diagnostics ? "hidden" : ""}" aria-label="Rendering diagnostics"><i class="status-light"></i><span data-diagnostics>Preparing renderer</span></div><div class="sr-only" aria-live="polite" id="game-announcement"></div></div>`;
		if (existingToast) root.append(existingToast);
		root.querySelector(".roster")?.scrollTo(rosterPosition);
		const dialog = root.querySelector('[role="dialog"]');
		if (
			dialog &&
			(!previousModal || dialog.getAttribute("aria-label") !== previousModal)
		) {
			dialog
				.querySelector("button:not(:disabled),input,select")
				?.focus({ preventScroll: true });
		} else if (focusAction && (!modal || previousModal)) {
			const candidates = [
				...root.querySelectorAll(`[data-action="${focusAction}"]`),
			];
			candidates
				.find((element) => element.dataset.id === focusId)
				?.focus({ preventScroll: true });
		}
		if (scrollTop) root.querySelector("[data-scroll]")?.scrollTo(0, scrollTop);
		update(performance.now(), true);
		if (state.battle) {
			const active = activeUnit();
			if (active && !state.battle.selection)
				keyboardTile = { x: active.x, z: active.z };
			if (state.battle.needsFacing && actionMenu !== "facing") {
				actionMenu = "facing";
				queueMicrotask(render);
			}
		}
	}

	function selectTile(x, z) {
		const battle = getState().battle;
		if (!battle || panel || modal) return false;
		if (battle.action === "move" || battle.phase !== "player") {
			pendingTarget = null;
			return invoke("selectTile", x, z);
		}
		const preview = game.getPreview?.(x, z);
		if (!preview?.valid) {
			pendingTarget = null;
			hoverSelection = { x, z };
			render();
			notify("This tile is outside the action’s range.", true);
			return false;
		}
		if (pendingTarget?.x === x && pendingTarget?.z === z) {
			pendingTarget = null;
			hoverSelection = null;
			return invoke("selectTile", x, z);
		}
		pendingTarget = { x, z };
		hoverSelection = null;
		render();
		return true;
	}

	function previewTile(x, z) {
		if (
			getState().screen !== "battle" ||
			modal ||
			panel ||
			pendingTarget ||
			getState().battle?.action === "move"
		)
			return;
		if (hoverSelection?.x === x && hoverSelection?.z === z) return;
		hoverSelection = x == null ? null : { x, z };
		const battlefield = root.querySelector(".battle-screen");
		if (!battlefield) return;
		const existing = battlefield.querySelector(".battle-inspector");
		if (!hoverSelection) {
			existing?.remove();
			return;
		}
		const battle = getState().battle;
		const target = battle.units.find(
			(unit) => unit.x === x && unit.z === z && !unit.removed,
		);
		const preview = game.getPreview?.(x, z);
		if (!preview) {
			existing?.remove();
			return;
		}
		const action =
			findById(abilities, battle.action)?.name || titleCase(battle.action);
		const markup = previewPanel(preview, target, action);
		if (existing) existing.outerHTML = markup;
		else battlefield.insertAdjacentHTML("beforeend", markup);
	}

	function update(time = performance.now(), force = false) {
		if (!force && time - lastInfo < 650) return;
		lastInfo = time;
		const info = renderer?.info || renderer?.getInfo?.() || {};
		const element = root.querySelector("[data-diagnostics]");
		if (element)
			element.textContent = `${String(info.backend || "WebGPU / WebGL2")} · ${titleCase(info.preset || quality)} · ${Number(info.frameMs || info.frameTime || 0).toFixed(1)} ms`;
	}

	function beginNew() {
		panel = null;
		mobileNav = false;
		selectedEncounterId = null;
		invoke("newGame", { difficulty });
		modal = "prologue";
		audio?.play?.("confirm");
		render();
	}
	function openPanel(name) {
		panel = name;
		modal = null;
		mobileNav = false;
		actionMenu = null;
		render();
		root.querySelector("[data-scroll]")?.scrollTo(0, 0);
	}
	function handleBattleAction(id) {
		pendingTarget = null;
		hoverSelection = null;
		if (id === "abilities" || id === "items") {
			actionMenu = actionMenu === id ? null : id;
			render();
		} else if (id === "wait") {
			actionMenu = "facing";
			render();
		} else {
			actionMenu = null;
			invoke("setAction", id);
			render();
		}
	}

	root.addEventListener("click", (event) => {
		const element = event.target.closest("[data-action]");
		if (!element || element.disabled) return;
		const { action, id } = element.dataset;
		if (action === "backdrop" && event.target !== element) return;
		if (!["backdrop", "volume", "rotate-left", "rotate-right"].includes(action))
			audio?.play?.("select");
		switch (action) {
			case "home":
				panel = null;
				mobileNav = false;
				if (getState().screen === "battle") modal = "leave-battle";
				else if (getState().screen !== "title") {
					modal = "about";
				}
				render();
				break;
			case "new-game":
				modal = game.hasSave?.() ? "new-confirm" : "difficulty";
				render();
				break;
			case "confirm-new":
				modal = "difficulty";
				render();
				break;
			case "begin-difficulty":
				difficulty = id;
				beginNew();
				break;
			case "continue":
				panel = null;
				modal = null;
				invoke("continueGame");
				render();
				break;
			case "campaign":
				panel = null;
				mobileNav = false;
				if (getState().screen === "title") {
					if (party().length) invoke("continueGame");
					else if (game.hasSave?.()) invoke("continueGame");
					else modal = "difficulty";
				} else if (getState().screen === "battle") modal = "leave-battle";
				else if (getState().screen === "result") invoke("advanceCampaign");
				else if (getState().screen === "ending") invoke("returnToWorld");
				render();
				break;
			case "company":
				openPanel("company");
				break;
			case "chronicle":
				openPanel("chronicle");
				break;
			case "shop":
				openPanel("shop");
				break;
			case "quests":
				openPanel("quests");
				break;
			case "close-panel":
				panel = null;
				render();
				break;
			case "mobile-menu":
				mobileNav = !mobileNav;
				render();
				break;
			case "options":
				modal = "options";
				mobileNav = false;
				render();
				break;
			case "controls":
				modal = "controls";
				mobileNav = false;
				render();
				break;
			case "about":
				modal = "about";
				render();
				break;
			case "close-modal":
			case "backdrop":
				modal = null;
				render();
				break;
			case "mute":
				muted = !muted;
				audio?.setMuted?.(muted);
				saveOptions();
				render();
				break;
			case "diagnostics":
				diagnostics = !diagnostics;
				saveOptions();
				render();
				break;
			case "fullscreen":
				if (document.fullscreenElement)
					document.exitFullscreen?.().catch(() => {});
				else
					document.documentElement
						.requestFullscreen?.()
						.catch(() =>
							notify("Fullscreen is not available in this browser.", true),
						);
				break;
			case "restore-checkpoint":
				modal = "checkpoint";
				render();
				break;
			case "confirm-checkpoint": {
				const result = invoke("restoreCheckpoint");
				if (result !== false) {
					panel = null;
					modal = null;
					selectedEncounterId = null;
					actionMenu = null;
					pendingTarget = null;
					hoverSelection = null;
					render();
					notify("Your company is back at the last camp checkpoint.");
				} else notify("The camp checkpoint could not be loaded.", true);
				break;
			}
			case "save":
				invoke("save");
				notify("Your chronicle has been saved.");
				break;
			case "zoom-in":
				renderer?.zoomBy?.(-1);
				break;
			case "zoom-out":
				renderer?.zoomBy?.(1);
				break;
			case "rotate-left":
				renderer?.rotate?.(-1);
				break;
			case "rotate-right":
				renderer?.rotate?.(1);
				break;
			case "select-encounter":
				selectedEncounterId = id;
				render();
				break;
			case "start-battle":
				selectedEncounterId = id;
				storyPage = 0;
				aftermathRead = null;
				panel = null;
				modal = "story";
				render();
				break;
			case "confirm-battle":
				panel = null;
				modal = null;
				actionMenu = null;
				invoke("startBattle", id);
				audio?.play?.("battle");
				render();
				break;
			case "recruit-soldier":
				recruitDraft = {
					name: "",
					sex: "male",
					job: "squire",
					zodiac: "capricorn",
				};
				modal = "recruit";
				render();
				break;
			case "incubator":
				modal = "incubator";
				render();
				break;
			case "confirm-recruit": {
				const name = recruitDraft.name.trim();
				const result = invoke("hireRecruit", { ...recruitDraft, name });
				if (result !== false) {
					modal = null;
					selectedUnitId = party().at(-1)?.id;
					render();
					notify(`${name} joins your company.`);
				}
				break;
			}
			case "hatch-egg": {
				const result = invoke("hatchEgg", id);
				render();
				if (result !== false) notify("A new monster joins your company.");
				break;
			}
			case "release-soldier":
				selectedUnitId = id;
				modal = "release";
				render();
				break;
			case "confirm-release": {
				const name = selectedUnit()?.name;
				const result = invoke("dismissUnit", id);
				if (result !== false) {
					modal = null;
					selectedUnitId = party()[0]?.id;
					render();
					notify(`${name} leaves the company.`);
				}
				break;
			}
			case "select-party":
				selectedUnitId = id;
				abilityCategory = "all";
				render();
				break;
			case "company-tab":
				companyTab = id;
				render();
				break;
			case "toggle-deployment": {
				const ids = party().map((member) => member.id);
				const index = ids.indexOf(id);
				const isDeployed = preparedUnits().some((unit) => unit.id === id);
				ids.splice(index, 1);
				if (isDeployed) ids.push(id);
				else ids.splice(1, 0, id);
				invoke("setDeployment", ids);
				render();
				break;
			}
			case "set-job": {
				const result = invoke("setJob", selectedUnitId, id);
				if (result !== false)
					notify(
						`${selectedUnit()?.name || "Unit"} · ${jobName(selectedUnit()?.job)}`,
					);
				render();
				break;
			}
			case "learn": {
				const result = invoke("learn", selectedUnitId, id);
				render();
				if (result !== false) {
					const ability = findById(abilities, id);
					const slot = ability?.category;
					const equipped = selectedUnit()?.abilitySlots?.[slot] === id;
					notify(
						`${ability?.name || titleCase(id)} learned.${["reaction", "support", "movement"].includes(slot) ? (equipped ? ` Equipped in ${slot}.` : ` Choose it in the ${slot} slot.`) : ""}`,
					);
				}
				break;
			}
			case "equip": {
				const result = invoke("equip", selectedUnitId, id);
				render();
				if (result !== false)
					notify(`${findById(equipment, id)?.name || titleCase(id)} equipped.`);
				break;
			}
			case "shop-tab":
				shopTab = id;
				render();
				break;
			case "buy": {
				const result = invoke("buy", id);
				render();
				if (result !== false)
					notify(
						`Purchased ${findById(equipment, id)?.name || titleCase(id)}.`,
					);
				break;
			}
			case "quest-tab":
				questTab = id;
				render();
				break;
			case "visit-world-event": {
				const result = invoke("visitWorldEvent", id);
				if (result !== false) {
					selectedWorldEventId = id;
					modal = "world-event";
				}
				render();
				break;
			}
			case "world-event-scene":
				selectedWorldEventId = id;
				modal = "world-event";
				render();
				break;
			case "start-quest": {
				const quest = findById(quests, id);
				if (quest?.type === "dispatch") {
					dispatchQuestId = id;
					const candidates =
						game.getDispatchCandidates?.(id) ||
						party().filter(
							(unit) =>
								unit.id !== "ramza" &&
								!unit.onQuest &&
								!findById(jobs, unit.homeJob)?.special,
						);
					const recommended =
						candidates.find((unit) => unit.job === quest.preferredJob) ||
						candidates.find((unit) => party().indexOf(unit) >= 5) ||
						candidates.at(-1);
					dispatchCrew = new Set(recommended ? [recommended.id] : []);
					modal = "dispatch";
					render();
					break;
				}
				const result = invoke("startQuest", id);
				render();
				if (result !== false)
					notify(
						findById(quests, id)?.type === "rumor"
							? "Rumor recorded. Follow the journal’s route."
							: "Errand accepted. Continue fighting to make progress.",
					);
				break;
			}
			case "confirm-dispatch": {
				const crew = [...dispatchCrew];
				const result = invoke("startQuest", dispatchQuestId, crew);
				if (result !== false) {
					modal = null;
					render();
					notify(
						`${crew.map((id) => party().find((unit) => unit.id === id)?.name || id).join(", ")} departed on assignment.`,
					);
				}
				break;
			}
			case "explore-area": {
				const result = invoke("exploreArea", id);
				render();
				if (result !== false)
					notify(
						"Materia Blade discovered. Equip it to awaken Cloud’s Limit skills.",
					);
				break;
			}
			case "claim-quest": {
				const result = invoke("claimQuest", id);
				render();
				if (result !== false)
					notify("The reward has been added to your war chest.");
				break;
			}
			case "load-archive":
				void ensureArchive();
				break;
			case "codex-tab":
				codexTab = id;
				codexSearch = "";
				if (id === "ledger") void ensureArchive();
				render();
				root.querySelector("[data-scroll]")?.scrollTo(0, 0);
				break;
			case "battle-action":
				handleBattleAction(id);
				break;
			case "confirm-action":
				if (pendingTarget) selectTile(pendingTarget.x, pendingTarget.z);
				break;
			case "use-ability":
				actionMenu = null;
				pendingTarget = null;
				hoverSelection = null;
				invoke("setAction", id);
				render();
				break;
			case "face":
				actionMenu = null;
				pendingTarget = null;
				hoverSelection = null;
				invoke("wait", id);
				render();
				break;
			case "focus-unit":
				invoke("selectUnit", id);
				renderer?.focusUnit?.(id);
				render();
				break;
			case "advance": {
				const result = getState().result || {};
				const beats = encounterStoryBeats(
					findById(allEncounters(), result.encounterId),
				);
				if (
					result.victory &&
					result.firstVictory !== false &&
					beats.length &&
					aftermathRead !== result.encounterId
				) {
					storyPage = 0;
					modal = "after-story";
				} else {
					selectedEncounterId = null;
					invoke("advanceCampaign");
				}
				render();
				break;
			}
			case "read-aftermath":
				storyPage = 0;
				modal = "after-story";
				render();
				break;
			case "story-next":
				storyPage++;
				render();
				break;
			case "story-back":
				storyPage = Math.max(0, storyPage - 1);
				render();
				break;
			case "finish-aftermath":
				aftermathRead = getState().result?.encounterId;
				modal = null;
				selectedEncounterId = null;
				invoke("advanceCampaign");
				render();
				break;
			case "retry":
				modal = null;
				invoke(
					"startBattle",
					getState().battle?.id || getState().result?.encounterId,
				);
				render();
				break;
			case "return-world":
			case "withdraw":
				modal = null;
				panel = null;
				if (game.returnToWorld) invoke("returnToWorld");
				else if (game.withdraw) invoke("withdraw");
				else invoke("advanceCampaign");
				render();
				break;
			case "postgame":
				panel = null;
				if (game.returnToWorld) invoke("returnToWorld");
				else invoke("advanceCampaign");
				render();
				break;
		}
	});

	root.addEventListener("input", (event) => {
		const element = event.target;
		if (element.id === "recruit-name") {
			recruitDraft.name = element.value;
			const capacity = game.getRosterCapacity?.() || {
				used: party().length,
				max: 32,
			};
			const control = root.querySelector('[data-action="confirm-recruit"]');
			if (control)
				control.disabled =
					!recruitDraft.name.trim() ||
					capacity.used >= capacity.max ||
					getState().gil < (game.getRecruitmentCost?.(recruitDraft) ?? 600);
		}
		if (element.id === "volume") {
			volume = Number(element.value);
			audio?.setVolume?.(volume);
			saveOptions();
		}
		if (element.id === "codex-search" || element.id === "shop-search") {
			const position = element.selectionStart,
				id = element.id;
			if (id === "codex-search") codexSearch = element.value;
			else shopSearch = element.value;
			render();
			const replacement = root.querySelector(`#${id}`);
			replacement?.focus();
			try {
				replacement?.setSelectionRange(position, position);
			} catch {}
		}
	});
	root.addEventListener("change", (event) => {
		if (event.target.id === "party-picker") {
			selectedUnitId = event.target.value;
			abilityCategory = "all";
			render();
			return;
		}
		if (
			["recruit-sex", "recruit-job", "recruit-zodiac"].includes(event.target.id)
		) {
			const id = event.target.id;
			recruitDraft[id.replace("recruit-", "")] = event.target.value;
			render();
			root.querySelector(`#${id}`)?.focus({ preventScroll: true });
			return;
		}
		if (event.target.hasAttribute?.("data-dispatch-unit")) {
			const id = event.target.value;
			if (event.target.checked && dispatchCrew.size < 3) dispatchCrew.add(id);
			else dispatchCrew.delete(id);
			render();
			root
				.querySelector(`[data-dispatch-unit][value="${id}"]`)
				?.focus({ preventScroll: true });
			return;
		}
		if (event.target.id === "quality") {
			quality = event.target.value;
			renderer?.setQuality?.(titleCase(quality));
			saveOptions();
			notify(`${quality} rendering enabled.`);
		}
		if (event.target.id === "difficulty") {
			difficulty = event.target.value;
			if (party().length) invoke("setDifficulty", difficulty);
			render();
		}
		if (event.target.id === "ability-category") {
			abilityCategory = event.target.value;
			render();
		}
		if (event.target.dataset.abilitySlot) {
			const slot = event.target.dataset.abilitySlot;
			const id = event.target.value || null;
			const result = invoke("equipAbility", selectedUnitId, id, slot);
			render();
			if (result !== false)
				notify(
					id
						? `${findById(abilities, id)?.name || titleCase(id)} equipped as ${slot}.`
						: `${titleCase(slot)} ability removed.`,
				);
		}
		if (event.target.id === "secondary-job") {
			invoke("setSecondaryJob", selectedUnitId, event.target.value);
			render();
		}
	});
	document.addEventListener("keydown", (event) => {
		if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
		if (event.key === "Escape") {
			event.preventDefault();
			if (modal) modal = null;
			else if (pendingTarget) pendingTarget = null;
			else if (actionMenu) actionMenu = null;
			else if (panel) panel = null;
			else if (getState().screen === "battle") invoke("setAction", "move");
			mobileNav = false;
			render();
			return;
		}
		if (modal) {
			if (event.key === "Tab") {
				const focusable = [
					...root.querySelectorAll(
						".modal button:not(:disabled),.modal input,.modal select",
					),
				];
				const first = focusable[0],
					last = focusable.at(-1);
				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last?.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first?.focus();
				}
			}
			return;
		}
		if (panel) return;
		const key = event.key.toLowerCase();
		if (key === "q") {
			renderer?.rotate?.(-1);
			return;
		}
		if (key === "e") {
			renderer?.rotate?.(1);
			return;
		}
		const battle = getState().battle;
		if (getState().screen !== "battle" || !battle || battle.phase !== "player")
			return;
		if (["1", "2", "3", "4", "5"].includes(key)) {
			event.preventDefault();
			handleBattleAction(
				["move", "attack", "abilities", "items", "wait"][Number(key) - 1],
			);
			return;
		}
		if (event.key.startsWith("Arrow")) {
			event.preventDefault();
			if (actionMenu === "facing") {
				invoke(
					"wait",
					{
						ArrowUp: "north",
						ArrowDown: "south",
						ArrowLeft: "west",
						ArrowRight: "east",
					}[event.key],
				);
				actionMenu = null;
				render();
				return;
			}
			keyboardTile.x = Math.max(
				0,
				Math.min(
					battle.width - 1,
					keyboardTile.x +
						(event.key === "ArrowRight"
							? 1
							: event.key === "ArrowLeft"
								? -1
								: 0),
				),
			);
			keyboardTile.z = Math.max(
				0,
				Math.min(
					battle.height - 1,
					keyboardTile.z +
						(event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0),
				),
			);
			renderer?.setCursor?.(keyboardTile);
			notify(
				`Tile ${keyboardTile.x + 1}, ${keyboardTile.z + 1}. Enter to select.`,
			);
		}
		if (event.key === "Enter") {
			event.preventDefault();
			selectTile(keyboardTile.x, keyboardTile.z);
		}
	});
	game.subscribe?.((_state, event) => {
		if (["turn", "turn-start", "wait", "battle-start"].includes(event?.type)) {
			const current = activeUnit();
			if (current) keyboardTile = { x: current.x, z: current.z };
			pendingTarget = null;
			hoverSelection = null;
		}
		render();
		if (event?.type === "notice") notify(event.message, true);
	});
	render();
	return {
		isPaused: () => Boolean(modal || panel),
		render,
		update,
		notify,
		selectTile,
		previewTile,
		showControls: () => {
			modal = "controls";
			render();
		},
	};
}
