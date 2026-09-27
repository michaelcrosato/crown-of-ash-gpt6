import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/browser",
	timeout: 90000,
	expect: { timeout: 15000 },
	workers: 1,
	reporter: [
		["list"],
		["json", { outputFile: "artifacts/browser-results.json" }],
	],
	outputDir: "artifacts/browser",
	use: {
		baseURL: "http://127.0.0.1:5181",
		viewport: { width: 1280, height: 800 },
		channel: process.env.CHROME_PATH ? undefined : "chrome",
		launchOptions: {
			executablePath: process.env.CHROME_PATH,
			args: [
				"--use-angle=swiftshader",
				"--enable-unsafe-swiftshader",
				"--enable-unsafe-webgpu",
				"--ignore-gpu-blocklist",
				"--enable-gpu",
				"--enable-features=Vulkan",
				"--use-vulkan=swiftshader",
			],
		},
		screenshot: "only-on-failure",
	},
	webServer: {
		command: "npm run preview -- --port 5181",
		url: "http://127.0.0.1:5181",
		reuseExistingServer: !process.env.CI,
	},
});
