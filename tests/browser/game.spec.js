import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

async function openGame(page, backend = "webgl") {
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	await page.goto(`/?backend=${backend}`);
	await page.waitForFunction(() => window.crown?.renderer.ready);
	await page.evaluate(() => window.crown.renderer.setQuality("Balanced"));
	await page.waitForFunction(
		() => window.crown.renderer.renderer.info.frame > 5,
	);
	return errors;
}

test("WebGL2: title, controls, options, real tile input, jobs and local save restoration", async ({
	page,
}) => {
	const errors = await openGame(page);
	await expect(
		page.getByRole("heading", { name: "Crown of Ash", exact: true }),
	).toBeVisible();
	await expect
		.poll(() => page.evaluate(() => crown.renderer.info.backend))
		.toBe("WebGL2");
	await page.locator('[data-action="controls"]').first().click();
	await expect(page.getByRole("dialog")).toContainText("Move with purpose");
	await page.locator('[data-action="close-modal"]').first().click();
	await page.locator('[data-action="options"]').click();
	for (const quality of ["High", "Balanced", "Auto"]) {
		await page.getByLabel("Rendering quality").selectOption(quality);
		await expect
			.poll(() => page.evaluate(() => crown.renderer.quality))
			.toBe(quality);
	}
	await page.getByLabel("Rendering quality").selectOption("Balanced");
	await page.getByLabel("Master volume").press("Home");
	for (let step = 0; step < 5; step++)
		await page.getByLabel("Master volume").press("ArrowRight");
	await expect.poll(() => page.evaluate(() => crown.audio.volume)).toBe(0.25);
	await page.getByRole("button", { name: "Toggle fullscreen" }).click();
	await expect
		.poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
		.toBe(true);
	await page.getByRole("button", { name: "Toggle fullscreen" }).click();
	await expect
		.poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
		.toBe(false);
	await page.getByRole("switch", { name: "Mute audio", exact: true }).click();
	await expect.poll(() => page.evaluate(() => crown.audio.muted)).toBe(true);
	await page.locator('[data-action="close-modal"]').first().click();
	await page.screenshot({ path: "artifacts/title-webgl.png" });
	await page.locator('[data-action="new-game"]').click();
	await page
		.locator('[data-action="begin-difficulty"][data-id="story"]')
		.click();
	await page.locator('[data-action="close-modal"]').first().click();
	await expect(
		page.getByRole("region", { name: "Campaign map" }),
	).toBeVisible();
	await page.locator('[data-action="company"]').first().click();
	await expect(
		page.getByRole("region", { name: "Company management" }),
	).toContainText("Ramza");
	await page
		.locator('[data-action="company-tab"][data-id="abilities"]')
		.click();
	await expect(page.getByLabel("Reaction ability")).toBeVisible();
	await page.locator('[data-action="close-panel"]').click();
	await page.locator('[data-action="chronicle"]').first().click();
	await page.locator('[data-action="codex-tab"][data-id="ledger"]').click();
	await expect(page.locator(".codex-body")).not.toContainText(
		"Loading the source archive",
	);
	await page.waitForFunction(() =>
		document.querySelector(".codex-body details"),
	);
	await page.locator(".codex-body details").first().locator("summary").click();
	await expect(page.locator(".codex-body details").first()).toHaveAttribute(
		"open",
		"",
	);
	await expect(page.locator(".codex-body details").first()).toContainText(
		"ID:",
	);
	await page.locator('[data-action="close-panel"]').click();
	await page.locator('[data-action="start-battle"]').first().click();
	await expect(page.getByRole("dialog")).toContainText("Orbonne");
	await page.locator('[data-action="confirm-battle"]').click();
	await page.waitForFunction(() => crown.game.state.battle?.phase === "player");
	const movement = await page.evaluate(() => {
		const { game, renderer } = crown;
		for (const tile of game.getReachable().filter((cell) => cell.cost > 0)) {
			const mesh = renderer.tiles.get(`${tile.x},${tile.z}`);
			const p = mesh.position.clone();
			p.y += 0.11;
			p.project(renderer.camera);
			const x = (p.x * 0.5 + 0.5) * innerWidth,
				y = (-p.y * 0.5 + 0.5) * innerHeight;
			if (document.elementFromPoint(x, y)?.id === "scene")
				return {
					x,
					y,
					tileX: tile.x,
					tileZ: tile.z,
					unitId: game.activeUnit.id,
				};
		}
		return null;
	});
	expect(movement).not.toBeNull();
	await page.mouse.click(movement.x, movement.y);
	await expect
		.poll(() =>
			page.evaluate((id) => crown.game.getUnit(id).moved, movement.unitId),
		)
		.toBe(true);
	await page.screenshot({ path: "artifacts/battle-webgl.png" });
	await page.locator('[data-action="battle-action"][data-id="wait"]').click();
	await page.locator('[data-action="face"][data-id="north"]').click();
	await page.locator('[data-action="options"]').click();
	await page.locator('[data-action="save"]').click();
	const before = await page.evaluate(() => ({
		index: crown.game.state.campaignIndex,
		battle: crown.game.state.battle.id,
		totalActions: crown.game.state.totalActions,
	}));
	await page.reload();
	await page.waitForFunction(() => window.crown);
	await page.locator('[data-action="continue"]').click();
	const after = await page.evaluate(() => ({
		index: crown.game.state.campaignIndex,
		battle: crown.game.state.battle?.id,
		totalActions: crown.game.state.totalActions,
	}));
	expect(after).toEqual(before);
	expect(errors).toEqual([]);
});

test("WebGPU: scene, node effects, quality changes, physics limits and loss fallback", async ({
	page,
}) => {
	const errors = await openGame(page, "webgpu");
	expect(await page.evaluate(() => crown.renderer.info.backend)).toBe("WebGPU");
	const highTextureCounts = [];
	for (const preset of ["High", "Balanced", "High", "Balanced", "High"]) {
		const before = await page.evaluate((value) => {
			crown.renderer.setQuality(value);
			return crown.renderer.renderer.info.frame;
		}, preset);
		await page.waitForFunction(
			(frame) => crown.renderer.renderer.info.frame > frame + 3,
			before,
		);
		if (preset === "High")
			highTextureCounts.push(
				await page.evaluate(() => crown.renderer.renderer.info.memory.textures),
			);
	}
	expect(highTextureCounts.at(-1)).toBeLessThanOrEqual(
		highTextureCounts[0] + 4,
	);
	const stats = await page.evaluate(() => ({
		units: crown.renderer.units.size,
		tiles: crown.renderer.tiles.size,
		materials: [...crown.renderer.materials.values()].every(
			(m) => m.isNodeMaterial,
		),
		lost: crown.renderer.renderer._isDeviceLost,
		bodies: crown.renderer.world.bodies.len(),
	}));
	expect(stats.units).toBe(6);
	expect(stats.tiles).toBe(81);
	expect(stats.materials).toBe(true);
	expect(stats.lost).toBe(false);
	expect(stats.bodies).toBe(81);
	await page.screenshot({ path: "artifacts/title-webgpu.png" });
	const visualChanges = await page.evaluate(() => {
		const r = crown.renderer;
		const unit = r.battle.units.find((entry) => entry.id === "foe1");
		unit.team = "player";
		unit.airborne = true;
		r.syncUnits(r.battle.units);
		const allied = r.units.get(unit.id);
		const values = {
			team: allied.team,
			aboveGround:
				allied.target.y -
				r.tileY(r.tiles.get(`${unit.x},${unit.z}`).userData.tile),
		};
		const creature = r.makeUnit({
			id: "test-uribo",
			name: "Uribo",
			job: "uribo",
			team: "enemy",
		});
		values.isCreature = creature.userData.creature;
		r.disposeGroup(creature);
		unit.team = "enemy";
		unit.airborne = false;
		r.syncUnits(r.battle.units);
		return values;
	});
	expect(visualChanges.team).toBe("player");
	expect(visualChanges.aboveGround).toBeGreaterThan(1);
	expect(visualChanges.isCreature).toBe(true);
	await page.evaluate(() => {
		for (let i = 0; i < 12; i++)
			crown.renderer.effect({ type: "hit", targetId: "ramza", amount: 5 });
	});
	expect(
		await page.evaluate(() => crown.renderer.bodies.length),
	).toBeLessThanOrEqual(40);
	await page.evaluate(() => crown.renderer.setQuality("Balanced"));
	expect(
		await page.evaluate(() => crown.renderer.bodies.length),
	).toBeLessThanOrEqual(16);
	await page.waitForFunction(() => crown.renderer.bodies.length === 0, {
		timeout: 15000,
	});
	await page.evaluate(() =>
		crown.renderer.renderer.onDeviceLost({
			api: "WebGPU",
			message: "Test device loss",
		}),
	);
	await page.waitForFunction(
		() =>
			crown.renderer.info.backend === "WebGL2" && !crown.renderer.recovering,
	);
	expect(await page.evaluate(() => crown.renderer.units.size)).toBe(6);
	expect(errors).toEqual([]);
});

test("touch viewport: usable title, campaign and controls without horizontal overflow", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	const errors = await openGame(page);
	await page.screenshot({ path: "artifacts/title-mobile.png" });
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
	await page.locator('[data-action="new-game"]').click();
	await page
		.locator('[data-action="begin-difficulty"][data-id="story"]')
		.click();
	await page.locator('[data-action="close-modal"]').first().click();
	await page.screenshot({ path: "artifacts/world-mobile.png" });
	await page.locator('[data-action="start-battle"]').first().click();
	await page.locator('[data-action="confirm-battle"]').click();
	await expect(
		page.getByRole("region", { name: "Tactical battlefield" }),
	).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Move (1)", exact: true }),
	).toBeVisible();
	await page.screenshot({ path: "artifacts/battle-mobile.png" });
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
	expect(errors).toEqual([]);
});

test("company hiring and dispatch crew selection use real resources", async ({
	page,
}) => {
	test.skip(
		!process.env.VERIFY_ENDING,
		"Requires the save exported by the legal complete-campaign test.",
	);
	const errors = await openGame(page);
	const save = readFileSync("artifacts/completed-save.json", "utf8");
	expect(
		await page.evaluate((serialized) => crown.game.load(serialized), save),
	).toBe(true);
	await page.locator('[data-action="postgame"]').click();
	const initialGil = await page.evaluate(() => crown.game.state.gil);
	await page.locator('[data-action="company"]').first().click();
	await page.locator('[data-action="recruit-soldier"]').click();
	await page.getByLabel("Recruit name").fill("Aster");
	await page.getByLabel("Recruit job").selectOption("chemist");
	await page.getByLabel("Recruit sex").selectOption("female");
	await page.getByLabel("Recruit zodiac sign").selectOption("leo");
	await page.locator('[data-action="confirm-recruit"]').click();
	const hired = await page.evaluate(() => ({
		unit: crown.game.state.party.find((u) => u.name === "Aster"),
		gil: crown.game.state.gil,
	}));
	expect(hired.unit).toMatchObject({
		name: "Aster",
		job: "chemist",
		sex: "female",
		zodiac: "leo",
		level: 1,
	});
	expect(hired.gil).toBe(initialGil - 600);
	await page.locator('[data-action="close-panel"]').click();
	await page.locator('[data-action="quests"]').first().click();
	await page.getByRole("tab", { name: "Propositions", exact: true }).click();
	await page
		.locator('[data-action="start-quest"]:not([disabled])')
		.first()
		.click();
	const checkboxes = page.locator("[data-dispatch-unit]");
	for (let i = 0; i < (await checkboxes.count()); i++) {
		const label = await checkboxes.nth(i).getAttribute("aria-label");
		if (label !== "Assign Aster" && (await page.getByLabel(label).isChecked()))
			await page.getByLabel(label).uncheck();
	}
	await page.getByLabel("Assign Aster").check();
	await page.locator('[data-action="confirm-dispatch"]').click();
	expect(
		await page.evaluate(() =>
			Boolean(crown.game.state.party.find((u) => u.name === "Aster").onQuest),
		),
	).toBe(true);
	expect(await page.evaluate(() => crown.game.state.gil)).toBeLessThan(
		hired.gil,
	);
	expect(errors).toEqual([]);
});

test("legally completed campaign save renders the ending and returns to postgame", async ({
	page,
}) => {
	test.skip(
		!process.env.VERIFY_ENDING,
		"Run EXPORT_COMPLETED_SAVE=1 npm test, then VERIFY_ENDING=1 npm run test:e2e.",
	);
	const save = readFileSync("artifacts/completed-save.json", "utf8");
	const state = JSON.parse(save);
	expect(state.screen).toBe("ending");
	expect(state.campaignIndex).toBe(57);
	const errors = await openGame(page);
	expect(
		await page.evaluate((serialized) => crown.game.load(serialized), save),
	).toBe(true);
	await expect(
		page.getByRole("region", { name: "Ending", exact: true }),
	).toBeVisible();
	for (const name of ["Ramza", "Ovelia", "Olan"])
		await expect(
			page.getByRole("region", { name: "Ending", exact: true }),
		).toContainText(name);
	await page.screenshot({ path: "artifacts/ending.png" });
	await page.locator('[data-action="postgame"]').click();
	await expect(
		page.getByRole("region", { name: "Campaign map" }),
	).toBeVisible();
	expect(await page.evaluate(() => crown.game.state.campaignIndex)).toBe(57);
	expect(errors).toEqual([]);
});
