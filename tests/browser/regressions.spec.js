import { expect, test } from "@playwright/test";

async function openGame(page) {
	await page.goto("/?backend=webgl");
	await page.waitForFunction(() => window.crown?.renderer.ready);
	await page.evaluate(() => crown.renderer.setQuality("Balanced"));
}

async function startBattle(page) {
	await openGame(page);
	await page.locator('[data-action="new-game"]').click();
	await page
		.locator('[data-action="begin-difficulty"][data-id="story"]')
		.click();
	await page.locator('[data-action="close-modal"]').click();
	await page.locator('[data-action="start-battle"]').first().click();
	await page.locator('[data-action="confirm-battle"]').click();
	await page.waitForFunction(() => crown.game.state.battle?.phase === "player");
}

test("character bodies select their own tile instead of the ground behind them", async ({
	page,
}) => {
	await startBattle(page);
	const battleFrame = await page.evaluate(
		() => crown.renderer.renderer.info.frame,
	);
	await page.waitForFunction(
		(frame) => crown.renderer.renderer.info.frame > frame + 2,
		battleFrame,
	);
	const selections = await page.evaluate(() => {
		const r = crown.renderer;
		const rect = r.canvas.getBoundingClientRect();
		return [...r.units.values()].map((visual) => {
			const p = visual.group.localToWorld(
				visual.group.position.clone().set(0, 0.9, 0),
			);
			p.project(r.camera);
			const x = rect.left + ((p.x + 1) * rect.width) / 2;
			const y = rect.top + ((1 - p.y) * rect.height) / 2;
			const picked = r.pick({ clientX: x, clientY: y });
			return {
				name: visual.unit.name,
				expected: [visual.unit.x, visual.unit.z],
				actual: picked && [picked.x, picked.z],
				x,
				y,
			};
		});
	});
	for (const selection of selections)
		expect(selection.actual, selection.name).toEqual(selection.expected);
	const enemy = selections.find((selection) => selection.name === "Knight 1");
	await page.mouse.click(enemy.x, enemy.y);
	await expect(
		page.getByRole("complementary", { name: "Selected unit" }),
	).toContainText("Knight 1");
});

test("keyboard buttons, tile navigation and Escape work during battle", async ({
	page,
}) => {
	await startBattle(page);
	await page.locator('[data-action="options"]').focus();
	await page.keyboard.press("Enter");
	await expect(page.getByRole("dialog", { name: "Options" })).toBeVisible();
	await page.getByLabel("Master volume").focus();
	await page.keyboard.press("Escape");
	await expect(page.getByRole("dialog")).toHaveCount(0);
	await page.locator('[data-action="battle-action"][data-id="move"]').focus();
	const start = await page.evaluate(() => ({
		x: crown.game.activeUnit.x,
		z: crown.game.activeUnit.z,
	}));
	await page.keyboard.press("ArrowLeft");
	await page.keyboard.press("Enter");
	await expect
		.poll(() =>
			page.evaluate(() => ({
				x: crown.game.activeUnit.x,
				z: crown.game.activeUnit.z,
			})),
		)
		.toEqual({ x: start.x - 1, z: start.z });
});

test("a finished turn does not leave facing controls on the next unit", async ({
	page,
}) => {
	await startBattle(page);
	const turns = await page.evaluate(() => {
		const results = [];
		for (let i = 0; i < 10 && crown.game.state.screen === "battle"; i++) {
			crown.game.autoTurn();
			results.push({
				unit: crown.game.activeUnit?.name,
				moved: crown.game.activeUnit?.moved,
				acted: crown.game.activeUnit?.acted,
				facing: !!document.querySelector(".facing-menu"),
			});
		}
		return results;
	});
	expect(turns).toHaveLength(10);
	for (const turn of turns) expect(turn.facing, turn.unit).toBe(false);
});

test("title saving cannot erase progress and failed storage writes are reported", async ({
	page,
}) => {
	await startBattle(page);
	const saved = await page.evaluate(() => {
		crown.game.save();
		return crown.game.serialize();
	});
	await page.reload();
	await page.waitForFunction(() => window.crown);
	await page.locator('[data-action="options"]').click();
	await expect(page.locator('[data-action="save"]')).toBeDisabled();
	await page.getByRole("button", { name: "Close dialog", exact: true }).click();
	await page.locator('[data-action="continue"]').click();
	expect(await page.evaluate(() => crown.game.state.battle.id)).toBe(
		JSON.parse(saved).battle.id,
	);
	await page.locator('[data-action="options"]').click();
	await page.evaluate(() => {
		crown.game.storage = {
			setItem() {
				throw new Error("Quota exceeded");
			},
		};
	});
	await page.locator('[data-action="save"]').click();
	await expect(page.getByRole("status")).toContainText("could not be saved");
});

test("an unavailable audio manifest does not prevent starting the game", async ({
	page,
}) => {
	await page.route("**/audio/manifest.json", (route) =>
		route.fulfill({ status: 503, body: "Unavailable" }),
	);
	await openGame(page);
	await expect(
		page.getByRole("heading", { name: "Crown of Ash", exact: true }),
	).toBeVisible();
	await page.locator('[data-action="new-game"]').click();
	await page
		.locator('[data-action="begin-difficulty"][data-id="story"]')
		.click();
	await page.locator('[data-action="close-modal"]').click();
	await expect(
		page.getByRole("region", { name: "Campaign map" }),
	).toBeVisible();
});
