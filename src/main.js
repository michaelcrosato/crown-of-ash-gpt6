import "./style.css";
import { GameAudio } from "./audio.js";
import { Game } from "./engine.js";
import { BattlefieldRenderer } from "./renderer.js";
import { setupUI } from "./ui.js";

const uiRoot = document.getElementById("ui");
uiRoot.innerHTML =
	'<div style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;color:#334044;font:16px Georgia"><img src="/crest.svg" width="48" height="48" alt="" style="margin:0 auto 24px"><span>Opening the Durai Papers…</span></div>';

async function start() {
	const renderer = await new BattlefieldRenderer(
		document.getElementById("scene"),
	).init();
	const audio = new GameAudio();
	let audioUnavailable = false;
	try {
		await audio.init();
	} catch (error) {
		audioUnavailable = true;
		console.warn("Audio is unavailable:", error);
	}
	const game = new Game();
	let previousScreen = "";
	let aiTimer = null;
	let ui;
	const scheduleAI = () => {
		if (aiTimer) return;
		aiTimer = setTimeout(() => {
			aiTimer = null;
			if (
				game.state.screen !== "battle" ||
				game.state.battle?.phase !== "enemy"
			)
				return;
			if (ui?.isPaused()) scheduleAI();
			else game.advanceAI();
		}, 780);
	};
	game.subscribe((state, event) => {
		if (previousScreen !== state.screen) {
			previousScreen = state.screen;
			renderer.setMode(state.screen);
			audio.setMusic(
				state.screen === "battle"
					? "battle"
					: state.screen === "result" && state.result?.victory
						? "victory"
						: "world",
			);
		}
		if (state.battle) {
			renderer.setBattle(state.battle);
			renderer.setHighlights(
				state.screen === "battle" &&
					state.battle.phase === "player" &&
					state.battle.action === "move"
					? game.getReachable()
					: [],
				"move",
			);
			renderer.focusUnit(state.battle.activeId);
		}
		renderer.effect(event);
		if (event.type !== "victory") audio.play(event.type);
		if (
			state.screen === "battle" &&
			state.battle.phase === "enemy" &&
			!aiTimer
		) {
			scheduleAI();
		}
	});
	ui = setupUI(game, renderer, audio);
	if (audioUnavailable)
		ui.notify(
			"Audio could not be loaded. You can still play; reload to retry sound.",
		);
	renderer.onTile = (x, z) => ui.selectTile(x, z);
	renderer.onHover = (x, z) => ui.previewTile(x, z);
	renderer.setMode("title");
	const diagnostics = (now) => {
		ui.update(now);
		requestAnimationFrame(diagnostics);
	};
	requestAnimationFrame(diagnostics);
	window.addEventListener("pagehide", () => {
		if (game.state.party.length) game.save();
	});
	// Inspection hook for reproducible browser QA. No automatic victory or unlocks.
	window.crown = { game, renderer, audio, ui };
}

start().catch((error) => {
	console.error(error);
	uiRoot.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-content:center;padding:32px;font:18px Georgia;color:#29373c;text-align:center"><h1>The chronicle could not open</h1><p>A browser with WebGPU or WebGL2 is required.</p><pre style="white-space:pre-wrap;font:13px monospace;max-width:600px" id="startup-error"></pre><button style="padding:14px" onclick="location.reload()">Try again</button></div>`;
	document.getElementById("startup-error").textContent = error.message;
});
