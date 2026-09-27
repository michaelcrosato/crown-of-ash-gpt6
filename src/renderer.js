import RAPIER from "@dimforge/rapier3d-compat";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { fxaa } from "three/addons/tsl/display/FXAANode.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import {
	color,
	mix,
	pass,
	positionWorld,
	renderOutput,
	sin,
	time,
} from "three/tsl";
import * as THREE from "three/webgpu";
import { breedingFamilies, jobs } from "./content.js";

const sourceJobs = new Map(jobs.map((job) => [job.id, job]));
const monsterFamilies = new Map(
	breedingFamilies.flatMap((family) =>
		[...family.jobs, ...Object.keys(family.aliases || {})].map((id) => [
			id,
			family.id,
		]),
	),
);

const PALETTE = {
	grass: 0x8c9b73,
	forest: 0x658271,
	stone: 0xc3baa3,
	road: 0xd7c8ac,
	water: 0x77aaa8,
	snow: 0xdeddd3,
	sand: 0xd5b47e,
	swamp: 0x7a9381,
	lava: 0xb86340,
	dark: 0x706c7a,
};
const PRESETS = {
	High: { ratio: 1.65, shadow: 2048, bloom: true, bodies: 40, steps: 5 },
	Balanced: { ratio: 1, shadow: 1024, bloom: false, bodies: 16, steps: 3 },
};
const STEP = 1 / 60;
const scratch = new THREE.Vector3();

/** One scene and node-material pipeline on both the WebGPU and WebGL2 backends. */
export class BattlefieldRenderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.info = { backend: "Starting", preset: "Auto", frameMs: 0 };
		this.angle = Math.PI / 4;
		this.targetAngle = this.angle;
		this.zoom = 1;
		this.titleMode = true;
		this.quality = "Auto";
		this.effectiveQuality = "High";
		this.units = new Map();
		this.tiles = new Map();
		this.bodies = [];
		this.floats = [];
		this.ownedGeometry = new Set();
		this.accumulator = 0;
		this.samples = [];
		this.elapsed = 0;
		this.boxGeo = new THREE.BoxGeometry(1, 1, 1);
		this.materials = new Map();
		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();
		this.labelRoot = document.createElement("div");
		this.labelRoot.className = "unit-labels";
		this.labelRoot.style.cssText =
			"position:fixed;inset:0;pointer-events:none;z-index:2;overflow:hidden";
		document.body.append(this.labelRoot);
	}

	async init() {
		await RAPIER.init();
		this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
		this.world.timestep = STEP;
		let forceWebGL =
			new URLSearchParams(location.search).get("backend") === "webgl";
		if (!forceWebGL && navigator.gpu) {
			try {
				// Keep an explicit adapter/device pair for capability inspection and
				// deterministic fallback when device initialization fails.
				this.gpuAdapter = await navigator.gpu.requestAdapter({
					powerPreference: "high-performance",
				});
				if (this.gpuAdapter) {
					const features = [
						"float32-filterable",
						"float32-blendable",
						"clip-distances",
						"depth-clip-control",
						"texture-compression-bc",
						"texture-compression-etc2",
						"texture-compression-astc",
					];
					this.gpuDevice = await this.gpuAdapter.requestDevice({
						requiredFeatures: features.filter((feature) =>
							this.gpuAdapter.features.has(feature),
						),
					});
				} else forceWebGL = true;
			} catch {
				forceWebGL = true;
			}
		}
		this.renderer = new THREE.WebGPURenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: false,
			forceWebGL,
			...(this.gpuDevice ? { device: this.gpuDevice } : {}),
		});
		this.renderer.onDeviceLost = () => {
			this.gpuLost = true;
			if (this.ready) void this.fallbackToWebGL();
		};
		await this.renderer.init();
		this.info.backend = this.renderer.backend.isWebGPUBackend
			? "WebGPU"
			: "WebGL2";
		this.renderer.setClearColor(0xede8db);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 0.98;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xede8db);
		this.scene.fog = new THREE.Fog(0xede8db, 34, 80);
		this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 150);
		this.buildEnvironment();
		this.scene.add(new THREE.HemisphereLight(0xf8eed5, 0x647271, 0.85));
		this.sun = new THREE.DirectionalLight(0xffefd0, 2.2);
		this.sun.position.set(-9, 17, 9);
		this.sun.castShadow = true;
		Object.assign(this.sun.shadow.camera, {
			left: -12,
			right: 12,
			top: 12,
			bottom: -12,
			near: 1,
			far: 50,
		});
		this.sun.shadow.bias = -0.0005;
		this.sun.shadow.normalBias = 0.04;
		this.sun.shadow.radius = 3;
		this.scene.add(this.sun);
		const fill = new THREE.DirectionalLight(0xb7d3df, 1.1);
		fill.position.set(9, 5, -8);
		this.scene.add(fill);
		const ground = new THREE.Mesh(
			new THREE.PlaneGeometry(200, 200),
			this.material(0xede8db),
		);
		ground.rotation.x = -Math.PI / 2;
		ground.position.y = -1.15;
		ground.receiveShadow = true;
		this.scene.add(ground);
		this.board = new THREE.Group();
		this.unitGroup = new THREE.Group();
		this.highlights = new THREE.Group();
		this.scene.add(this.board, this.unitGroup, this.highlights);
		this.hover = new THREE.Mesh(
			new THREE.BoxGeometry(0.98, 0.025, 0.98),
			new THREE.MeshBasicNodeMaterial({
				color: 0xf5e2ac,
				transparent: true,
				opacity: 0.38,
				depthWrite: false,
			}),
		);
		this.hover.visible = false;
		this.scene.add(this.hover);
		this.applyQuality("High");
		this.setDiorama();
		this.resize();
		window.addEventListener("resize", () => this.resize());
		this.bindInput();
		let last = performance.now();
		this.animate = () => {
			const now = performance.now();
			const rawMs = now - last;
			const delta = Math.min(rawMs / 1000, 0.1);
			last = now;
			if (!this.recovering) this.tick(delta, rawMs);
		};
		this.ready = true;
		if (this.gpuLost) await this.fallbackToWebGL();
		else this.renderer.setAnimationLoop(this.animate);
		return this;
	}

	bindInput() {
		const touches = new Map();
		this.canvas.style.touchAction = "none";
		this.canvas.addEventListener("pointermove", (event) => {
			if (touches.has(event.pointerId))
				touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
			if (touches.size === 2) {
				const [a, b] = [...touches.values()];
				const distance = Math.hypot(a.x - b.x, a.y - b.y);
				if (this.pinchDistance)
					this.zoom = THREE.MathUtils.clamp(
						(this.zoom * this.pinchDistance) / Math.max(1, distance),
						0.5,
						1.7,
					);
				this.pinchDistance = distance;
				this.pointerStart = null;
				this.resize();
				return;
			}
			this.pointerMove(event);
		});
		this.canvas.addEventListener("pointerdown", (event) => {
			this.pointerStart = { x: event.clientX, y: event.clientY };
			if (event.pointerType === "touch") {
				touches.set(event.pointerId, this.pointerStart);
				this.canvas.setPointerCapture(event.pointerId);
			}
		});
		this.canvas.addEventListener("pointerup", (event) => {
			if (
				this.pointerStart &&
				Math.hypot(
					event.clientX - this.pointerStart.x,
					event.clientY - this.pointerStart.y,
				) < 12
			) {
				const tile = this.pick(event);
				if (tile && !this.titleMode) this.onTile?.(tile.x, tile.z);
			}
			touches.delete(event.pointerId);
			this.pinchDistance = null;
			this.pointerStart = null;
		});
		this.canvas.addEventListener("pointerleave", () => {
			this.hover.visible = false;
			this.onHover?.(null, null);
		});
		this.canvas.addEventListener("pointercancel", (event) => {
			touches.delete(event.pointerId);
			this.pinchDistance = null;
			this.pointerStart = null;
		});
		this.canvas.addEventListener(
			"wheel",
			(event) => {
				event.preventDefault();
				this.zoom = THREE.MathUtils.clamp(
					this.zoom + event.deltaY * 0.0006,
					0.65,
					1.45,
				);
				this.resize();
			},
			{ passive: false },
		);
	}

	async fallbackToWebGL() {
		if (this.recovering || !this.renderer.backend.isWebGPUBackend) return;
		this.recovering = true;
		const previous = this.renderer;
		await previous.setAnimationLoop(null);
		// A canvas cannot switch context types. Replace only the canvas and retain
		// the scene, camera, physics world, UI and complete in-progress battle.
		const replacement = this.canvas.cloneNode(false);
		this.canvas.replaceWith(replacement);
		this.canvas = replacement;
		this.disposePipeline();
		this.renderer = new THREE.WebGPURenderer({
			canvas: this.canvas,
			antialias: true,
			forceWebGL: true,
		});
		await this.renderer.init();
		this.info.backend = "WebGL2";
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 0.98;
		this.applyQuality(this.effectiveQuality);
		this.bindInput();
		this.resize();
		this.gpuLost = false;
		this.recovering = false;
		previous.dispose();
		this.renderer.setAnimationLoop(this.animate);
	}

	buildEnvironment() {
		// Linear, floating-point HDR sky, generated locally: no external texture dependency.
		const w = 64,
			h = 32,
			data = new Float32Array(w * h * 4);
		for (let y = 0; y < h; y++)
			for (let x = 0; x < w; x++) {
				const sky = 0.3 + Math.max(0, 1 - y / h) * 1.35;
				const hot = Math.exp(-((x - 15) ** 2 + (y - 8) ** 2) / 9) * 10;
				const i = (y * w + x) * 4;
				data[i] = sky + hot;
				data[i + 1] = sky * 0.92 + hot * 0.83;
				data[i + 2] = sky * 0.8 + hot * 0.6;
				data[i + 3] = 1;
			}
		this.hdr = new THREE.DataTexture(
			data,
			w,
			h,
			THREE.RGBAFormat,
			THREE.FloatType,
		);
		this.hdr.mapping = THREE.EquirectangularReflectionMapping;
		this.hdr.needsUpdate = true;
		this.scene.environment = this.hdr;
		this.scene.environmentIntensity = 0.42;
	}

	material(hex, extra = {}) {
		const key = `${hex}:${JSON.stringify(extra)}`;
		if (!this.materials.has(key))
			this.materials.set(
				key,
				new THREE.MeshStandardNodeMaterial({
					color: hex,
					roughness: 0.82,
					metalness: 0.03,
					flatShading: true,
					...extra,
				}),
			);
		return this.materials.get(key);
	}

	box(group, x, y, z, sx, sy, sz, hex, extra) {
		const mesh = new THREE.Mesh(this.boxGeo, this.material(hex, extra));
		mesh.position.set(x, y, z);
		mesh.scale.set(sx, sy, sz);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		group.add(mesh);
		return mesh;
	}

	stud(group, x, y, z, hex, radius = 0.1) {
		this.studGeo ??= new THREE.CylinderGeometry(1, 1, 1, 10);
		const mesh = new THREE.Mesh(this.studGeo, this.material(hex));
		mesh.position.set(x, y, z);
		mesh.scale.set(radius, 0.07, radius);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		group.add(mesh);
		return mesh;
	}

	setDiorama() {
		const map = [];
		for (let z = 0; z < 9; z++)
			for (let x = 0; x < 9; x++) {
				const height = x > 5 && z < 6 ? 2 : z < 3 ? 1 : 0;
				map.push({
					x,
					z,
					height,
					kind: x < 2 ? "water" : x === 4 || z === 5 ? "road" : "grass",
				});
			}
		const units = [
			{
				id: "ramza",
				name: "Ramza",
				job: "Squire",
				team: "ally",
				x: 4,
				z: 6,
				hp: 100,
				maxHp: 100,
				facing: "north",
			},
			{
				id: "agrias",
				name: "Agrias",
				job: "Knight",
				team: "ally",
				x: 5,
				z: 5,
				hp: 100,
				maxHp: 100,
			},
			{
				id: "mage",
				name: "Alicia",
				job: "Wizard",
				team: "ally",
				x: 3,
				z: 7,
				hp: 100,
				maxHp: 100,
			},
			{
				id: "archer",
				name: "Lavian",
				job: "Archer",
				team: "ally",
				x: 6,
				z: 6,
				hp: 100,
				maxHp: 100,
			},
			{
				id: "foe1",
				name: "Knight",
				job: "Knight",
				team: "enemy",
				x: 6,
				z: 2,
				hp: 100,
				maxHp: 100,
				facing: "south",
			},
			{
				id: "foe2",
				name: "Archer",
				job: "Archer",
				team: "enemy",
				x: 7,
				z: 4,
				hp: 100,
				maxHp: 100,
				facing: "south",
			},
		];
		this.setBattle({ id: "__diorama", map, units, width: 9, height: 9 });
		this.titleMode = true;
		this.buildChapel(2.7, -2.1);
		this.tree(-2.2, -2.9, 1.0);
		this.tree(-1.7, 2.7, 0.8);
		this.tree(3.8, 2.8, 0.9);
		this.banner(1.1, -1.3, 1.1, 0x953f37);
		this.banner(2.9, 0.8, 1.1, 0x953f37);
		this.mergeStatic(this.board);
		this.resize();
	}

	tileY(tile) {
		return 0.32 + (Number(tile?.height) || 0) * 0.32;
	}

	setBattle(battle) {
		if (!battle || !this.board) return;
		const map = battle.map || battle.tiles;
		if (!map) return;
		this.battle = battle;
		const signature = `${battle.id || battle.encounter?.id || ""}:${map.map((t) => `${t.x},${t.z},${t.height},${t.kind}`).join(";")}`;
		if (this.signature !== signature) {
			this.signature = signature;
			this.clearBoard();
			this.width = battle.width || Math.max(...map.map((t) => t.x)) + 1;
			this.depth = battle.height || Math.max(...map.map((t) => t.z)) + 1;
			this.offsetX = (this.width - 1) / 2;
			this.offsetZ = (this.depth - 1) / 2;
			this.box(
				this.board,
				0,
				-0.46,
				0,
				this.width + 0.28,
				0.58,
				this.depth + 0.28,
				0x716e61,
			);
			this.box(
				this.board,
				0,
				-0.8,
				0,
				this.width + 0.48,
				0.15,
				this.depth + 0.48,
				0xaaa088,
			);
			for (const tile of map) {
				const x = tile.x - this.offsetX,
					z = tile.z - this.offsetZ;
				const y = this.tileY(tile);
				const kind = tile.kind || "grass";
				const base = PALETTE[kind] || PALETTE.grass;
				const col = new THREE.Color(base).multiplyScalar(
					0.94 + ((tile.x * 7 + tile.z * 3) % 7) * 0.016,
				);
				this.box(
					this.board,
					x,
					(y - 0.24) / 2 - 0.04,
					z,
					0.985,
					y + 0.24,
					0.985,
					0xa39880,
				);
				const top = this.box(
					this.board,
					x,
					y - 0.08,
					z,
					0.985,
					0.16,
					0.985,
					col.getHex(),
				);
				top.userData.tile = tile;
				this.tiles.set(`${tile.x},${tile.z}`, top);
				if (kind === "water" || kind === "lava") {
					if (!this.waterMaterial) {
						this.waterMaterial = new THREE.MeshStandardNodeMaterial({
							roughness: 0.3,
							metalness: 0.2,
						});
						this.waterMaterial.colorNode = mix(
							color(0x588e96),
							color(0x96c3bc),
							sin(
								positionWorld.x
									.mul(3)
									.add(positionWorld.z.mul(2))
									.add(time.mul(0.7)),
							)
								.mul(0.15)
								.add(0.7),
						);
					}
					top.material = this.waterMaterial;
				} else if ((tile.x * 3 + tile.z) % 4 === 0 && kind !== "road") {
					this.stud(
						this.board,
						x - 0.22,
						y + 0.025,
						z - 0.22,
						col.getHex(),
						0.1,
					);
					this.stud(
						this.board,
						x + 0.22,
						y + 0.025,
						z + 0.22,
						col.getHex(),
						0.1,
					);
				}
				const body = this.world.createRigidBody(
					RAPIER.RigidBodyDesc.fixed().setTranslation(x, y - 0.2, z),
				);
				this.world.createCollider(
					RAPIER.ColliderDesc.cuboid(0.5, 0.2, 0.5).setFriction(0.8),
					body,
				);
				this.fixedBodies ??= [];
				this.fixedBodies.push(body);
				if (tile.blocked || kind === "wall") {
					if (/forest|woods/.test(battle.encounter?.terrain || ""))
						this.tree(x, z, 0.8);
					else {
						this.box(this.board, x, y + 0.43, z, 0.65, 0.86, 0.65, 0xb9b5a6);
						this.box(this.board, x, y + 0.9, z, 0.78, 0.13, 0.78, 0xd0c7b1);
					}
				}
			}
			if (battle.id !== "__diorama") {
				this.decorateBattle(battle);
				this.mergeStatic(this.board);
			}
			this.resize();
		}
		this.syncUnits(battle.units || []);
		this.syncMarkers(map);
	}

	mergeStatic(group) {
		group.updateMatrixWorld(true);
		const byMaterial = new Map();
		group.traverse((mesh) => {
			if (!mesh.isMesh || !mesh.material.isMeshStandardNodeMaterial) return;
			const key = mesh.material.uuid;
			if (!byMaterial.has(key))
				byMaterial.set(key, { material: mesh.material, meshes: [] });
			byMaterial.get(key).meshes.push(mesh);
		});
		const inverse = group.matrixWorld.clone().invert();
		for (const { material, meshes } of byMaterial.values()) {
			if (meshes.length < 2) continue;
			const copies = meshes.map((mesh) =>
				mesh.geometry
					.clone()
					.applyMatrix4(inverse.clone().multiply(mesh.matrixWorld)),
			);
			const geometry = mergeGeometries(copies, false);
			for (const geometry of copies) geometry.dispose();
			if (!geometry) continue;
			this.ownedGeometry.add(geometry);
			const merged = new THREE.Mesh(geometry, material);
			merged.castShadow = true;
			merged.receiveShadow = true;
			// Detached tile meshes keep their world matrices as raycast targets.
			for (const mesh of meshes) mesh.removeFromParent();
			group.add(merged);
		}
	}

	decorateBattle(battle) {
		const terrain = battle.encounter?.terrain || battle.theme || "";
		const edge = -this.offsetZ - 0.75;
		if (/monastery|cathedral|temple/.test(terrain))
			this.buildChapel(this.offsetX - 0.7, edge - 0.25);
		else if (
			/town|city|execution|castle|fort|library|ruins|crypt|rooftop/.test(
				terrain,
			)
		) {
			for (let i = 0; i < this.width; i++) {
				this.box(
					this.board,
					i - this.offsetX,
					0.53,
					edge,
					0.96,
					1.7,
					0.4,
					0xbbb39c,
				);
				if (i % 2 === 0)
					this.box(
						this.board,
						i - this.offsetX,
						1.54,
						edge,
						0.56,
						0.45,
						0.48,
						0xc9c1ad,
					);
			}
			for (const x of [-this.offsetX, this.offsetX]) {
				this.box(this.board, x, 1.06, edge, 1.15, 2.72, 0.95, 0xbeb69e);
				this.box(this.board, x, 2.47, edge, 1.3, 0.17, 1.08, 0xd4cab1);
				this.banner(x + 0.15, edge + 0.62, 1.1, 0x954738);
			}
		} else if (/forest|woods|plains|highlands|mountain|valley/.test(terrain)) {
			for (const x of [-this.offsetX - 0.55, this.offsetX + 0.55]) {
				this.tree(x, -2.8, 0.85);
				this.tree(x, 1.2, 0.7);
			}
		} else if (/dungeon|airship/.test(terrain)) {
			for (const x of [-this.offsetX - 0.4, this.offsetX + 0.4])
				for (const z of [-3, 0, 3]) {
					this.box(this.board, x, 0.7, z, 0.44, 1.4, 0.44, 0x6f6e74);
					const crystal = new THREE.Mesh(
						new THREE.OctahedronGeometry(0.23),
						this.material(0x83bbc1, {
							emissive: 0x538fa1,
							emissiveIntensity: 0.6,
						}),
					);
					crystal.position.set(x, 1.62, z);
					this.board.add(crystal);
				}
		}
	}

	syncMarkers(map) {
		this.markerGroup ??= new THREE.Group();
		if (!this.markerGroup.parent) this.scene.add(this.markerGroup);
		this.markerGroup.clear();
		for (const tile of map) {
			if (
				!tile.treasure &&
				!tile.crystal &&
				tile.kind !== "switch" &&
				!tile.exit
			)
				continue;
			const x = tile.x - this.offsetX,
				z = tile.z - this.offsetZ,
				y = this.tileY(tile);
			if (tile.crystal) {
				this.crystalGeometry ??= new THREE.OctahedronGeometry(0.2);
				const crystal = new THREE.Mesh(
					this.crystalGeometry,
					this.material(0x80b8bd, {
						emissive: 0x579ba6,
						emissiveIntensity: 0.4,
					}),
				);
				crystal.position.set(x, y + 0.32, z);
				this.markerGroup.add(crystal);
			} else if (tile.treasure) {
				this.box(this.markerGroup, x, y + 0.16, z, 0.38, 0.29, 0.3, 0x967244);
				this.box(
					this.markerGroup,
					x,
					y + 0.2,
					z + 0.16,
					0.1,
					0.12,
					0.045,
					0xe4c16e,
					{ emissive: 0xb39144, emissiveIntensity: 0.4 },
				);
			} else if (tile.exit) {
				for (let i = 0; i < 3; i++)
					this.box(
						this.markerGroup,
						x,
						y + 0.025 + i * 0.04,
						z - 0.25 + i * 0.22,
						0.75,
						0.05,
						0.2,
						0x66948b,
					);
			} else
				this.box(
					this.markerGroup,
					x,
					y + 0.035,
					z,
					0.58,
					0.07,
					0.58,
					tile.switch ? 0x6caa84 : 0xd8b767,
					{
						emissive: tile.switch ? 0x38734d : 0x947738,
						emissiveIntensity: 0.3,
					},
				);
		}
	}

	clearBoard() {
		this.disposeGroup(this.board);
		this.disposeGroup(this.unitGroup);
		this.board.clear();
		this.unitGroup.clear();
		this.highlights.clear();
		this.tiles.clear();
		this.units.clear();
		this.labelRoot.replaceChildren();
		this.markerGroup?.clear();
		for (const geometry of this.ownedGeometry) geometry.dispose();
		this.ownedGeometry.clear();
		for (const b of this.fixedBodies || []) this.world.removeRigidBody(b);
		this.fixedBodies = [];
		for (const b of [...this.bodies]) this.removeBody(b);
	}

	disposeGroup(group) {
		const geometries = new Set();
		const materials = new Set();
		group.traverse((node) => {
			if (
				node.geometry &&
				node.geometry !== this.boxGeo &&
				node.geometry !== this.studGeo
			)
				geometries.add(node.geometry);
			if (node.material?.isMeshBasicNodeMaterial) materials.add(node.material);
		});
		for (const geometry of geometries) {
			geometry.dispose();
			this.ownedGeometry.delete(geometry);
		}
		for (const material of materials) material.dispose();
	}

	syncUnits(units) {
		const existing = new Set();
		for (const unit of units) {
			existing.add(unit.id);
			let visual = this.units.get(unit.id);
			if (visual && (visual.job !== unit.job || visual.team !== unit.team)) {
				this.disposeGroup(visual.group);
				this.unitGroup.remove(visual.group);
				visual.label.remove();
				this.units.delete(unit.id);
				visual = null;
			}
			if (!visual) {
				const group = this.makeUnit(unit);
				group.userData.unitId = unit.id;
				this.unitGroup.add(group);
				const label = document.createElement("div");
				label.className = "field-unit-label";
				label.style.cssText =
					"position:absolute;transform:translate(-50%,-100%);font:10px system-ui;min-width:38px;text-align:center;color:#283638;white-space:nowrap;transition:opacity .2s";
				const name = document.createElement("span");
				name.textContent = unit.name;
				name.style.cssText =
					"display:block;text-shadow:0 1px 3px #fff;background:#f5f0e0dc;padding:2px 5px;border-radius:2px";
				const bar = document.createElement("div");
				bar.style.cssText = "height:3px;background:#28363840;margin:2px 0";
				const fill = document.createElement("div");
				fill.style.cssText = `height:100%;background:${unit.team === "enemy" ? "#aa4c3c" : "#498779"}`;
				bar.append(fill);
				label.append(name, bar);
				this.labelRoot.append(label);
				visual = {
					group,
					label,
					fill,
					target: new THREE.Vector3(),
					unit,
					job: unit.job,
					team: unit.team,
					originalY: 0,
				};
				this.units.set(unit.id, visual);
				const tile = this.tiles.get(`${unit.x},${unit.z}`)?.userData.tile;
				group.position.set(
					unit.x - this.offsetX,
					this.tileY(tile),
					unit.z - this.offsetZ,
				);
			}
			visual.unit = unit;
			visual.target.set(
				unit.x - this.offsetX,
				this.tileY(this.tiles.get(`${unit.x},${unit.z}`)?.userData.tile) +
					(unit.airborne ? 1.8 : 0),
				unit.z - this.offsetZ,
			);
			visual.fill.style.width = `${Math.max(0, (unit.hp / unit.maxHp) * 100)}%`;
			visual.group.userData.dead = unit.hp <= 0;
			visual.group.visible = !unit.removed;
			visual.group.userData.facing =
				{ north: Math.PI, south: 0, east: Math.PI / 2, west: -Math.PI / 2 }[
					unit.facing
				] ?? 0;
		}
		for (const [id, visual] of this.units)
			if (!existing.has(id)) {
				this.disposeGroup(visual.group);
				this.unitGroup.remove(visual.group);
				visual.label.remove();
				this.units.delete(id);
			}
	}

	makeUnit(unit) {
		const group = new THREE.Group();
		const job = String(unit.job).toLowerCase();
		if (
			sourceJobs.get(job)?.monster ||
			monsterFamilies.has(job) ||
			/chocobo|goblin|bomb|dragon|behemoth|skeleton|ghost|flotiball|morbol|panther|hydra|tiamat|pisco|mindflayer|worker|serpent|squid|queklain|velius|zalera|adramelk|hashmalum|altima|st-ajora|ultima-demon/.test(
				job,
			)
		)
			return this.makeCreature(unit);
		const foe = unit.team === "enemy";
		const coat = foe
			? 0x9a493c
			: job.includes("priest") || job.includes("chemist")
				? 0xe5d9bd
				: job.includes("wizard") || job.includes("mage")
					? 0x40577b
					: 0x406e80;
		const hair = unit.name === "Ramza" ? 0xc4a263 : foe ? 0x51483d : 0x765331;
		this.box(group, -0.14, 0.12, 0, 0.2, 0.24, 0.24, 0x4d4e4b);
		this.box(group, 0.14, 0.12, 0, 0.2, 0.24, 0.24, 0x4d4e4b);
		this.box(group, 0, 0.46, 0, 0.47, 0.48, 0.31, coat);
		this.box(group, 0, 0.27, -0.2, 0.5, 0.55, 0.09, foe ? 0x70372f : 0xd9c9a0);
		this.box(group, 0, 0.34, 0.015, 0.5, 0.085, 0.34, 0x625238);
		this.box(group, 0, 0.345, 0.205, 0.09, 0.065, 0.055, 0xd3b574, {
			metalness: 0.6,
		});
		this.box(group, -0.3, 0.47, 0, 0.15, 0.33, 0.2, coat);
		this.box(group, 0.3, 0.47, 0, 0.15, 0.33, 0.2, coat);
		this.box(group, -0.3, 0.3, 0.025, 0.16, 0.12, 0.18, 0xe4bd8e);
		this.box(group, 0.3, 0.3, 0.025, 0.16, 0.12, 0.18, 0xe4bd8e);
		this.box(group, 0, 0.85, 0, 0.37, 0.35, 0.34, 0xe7c598);
		this.box(group, 0, 1.02, -0.035, 0.4, 0.14, 0.37, hair);
		this.box(group, -0.18, 0.91, -0.04, 0.09, 0.23, 0.27, hair);
		this.box(group, 0.18, 0.91, -0.04, 0.09, 0.23, 0.27, hair);
		this.box(group, -0.087, 0.86, 0.177, 0.035, 0.05, 0.02, 0x333633);
		this.box(group, 0.087, 0.86, 0.177, 0.035, 0.05, 0.02, 0x333633);
		if (/wizard|mage|summoner|oracle|priest|time/.test(job)) {
			const hat = new THREE.Mesh(
				new THREE.ConeGeometry(0.35, 0.48, 4),
				this.material(/priest/.test(job) ? 0xe8dfc6 : 0xb59b60),
			);
			hat.position.y = 1.3;
			hat.rotation.y = Math.PI / 4;
			hat.castShadow = true;
			group.add(hat);
			this.box(group, 0.42, 0.62, 0.1, 0.06, 1.05, 0.06, 0x72523a);
			const gem = new THREE.Mesh(
				new THREE.OctahedronGeometry(0.12),
				this.material(0x78bbb3, { emissive: 0x578f89, emissiveIntensity: 0.3 }),
			);
			gem.position.set(0.42, 1.22, 0.1);
			group.add(gem);
		} else if (/archer|thief/.test(job)) {
			const bow = new THREE.Mesh(
				new THREE.TorusGeometry(0.31, 0.045, 4, 8, Math.PI),
				this.material(0x89643a),
			);
			bow.position.set(0.42, 0.6, 0.1);
			bow.rotation.z = -Math.PI / 2;
			group.add(bow);
			this.box(group, 0.43, 0.55, 0.1, 0.02, 0.6, 0.02, 0xd8cfb5);
		} else {
			this.box(group, 0.43, 0.59, 0.14, 0.09, 0.69, 0.055, 0xd7e1dc, {
				metalness: 0.6,
				roughness: 0.32,
			});
			this.box(group, 0.43, 0.32, 0.14, 0.28, 0.065, 0.08, 0xb59954);
			this.box(
				group,
				-0.4,
				0.5,
				0.12,
				0.1,
				0.42,
				0.37,
				foe ? 0x933e31 : 0x4b6575,
			);
			this.box(group, -0.46, 0.5, 0.13, 0.035, 0.24, 0.055, 0xd2b476);
			if (/knight|agrias|orlandu/.test(job + unit.name)) {
				this.box(group, 0, 1.035, -0.04, 0.43, 0.19, 0.4, 0x929f9b, {
					metalness: 0.45,
				});
				this.box(
					group,
					0,
					1.16,
					-0.03,
					0.07,
					0.17,
					0.25,
					foe ? 0xa34333 : 0x496e83,
				);
			}
		}
		const shadow = new THREE.Mesh(
			new THREE.CircleGeometry(0.38, 16),
			new THREE.MeshBasicNodeMaterial({
				color: 0x393a2e,
				transparent: true,
				opacity: 0.16,
				depthWrite: false,
			}),
		);
		shadow.rotation.x = -Math.PI / 2;
		shadow.position.y = 0.014;
		group.add(shadow);
		const ring = new THREE.Mesh(
			new THREE.TorusGeometry(0.38, 0.028, 4, 24),
			new THREE.MeshBasicNodeMaterial({ color: foe ? 0xb6503d : 0x78b4be }),
		);
		ring.rotation.x = -Math.PI / 2;
		ring.position.y = 0.04;
		group.add(ring);
		group.userData.ring = ring;
		this.mergeStatic(group);
		return group;
	}

	makeCreature(unit) {
		const group = new THREE.Group();
		const job = String(unit.job).toLowerCase();
		const family = monsterFamilies.get(job) || job;
		group.userData.creature = true;
		const demon =
			/queklain|velius|zalera|adramelk|hashmalum|altima|st-ajora|ultima-demon/.test(
				job,
			);
		const bird = family === "chocobos" || family === "juravis",
			bomb = family === "bombs",
			machine = job.includes("worker");
		const hex =
			family === "uribo"
				? 0xcba299
				: family === "skeletons" || family === "ghouls"
					? 0xc4cbb8
					: family === "pisco-demons"
						? 0x94829b
						: bird
							? /red/.test(job)
								? 0xb5553b
								: /black/.test(job)
									? 0x4e5872
									: 0xd9b555
							: bomb
								? 0xc96742
								: machine
									? 0x8d9892
									: /dragon|hydra|tiamat/.test(job)
										? 0x729078
										: 0x8c9474;
		if (family === "uribo" || family === "red-panthers") {
			this.box(group, 0, 0.38, 0, 0.58, 0.48, 0.72, hex);
			this.box(group, 0, 0.57, 0.38, 0.46, 0.4, 0.38, hex);
			this.box(group, 0, 0.49, 0.6, 0.32, 0.17, 0.13, 0x995f64);
			for (const x of [-0.19, 0.19]) {
				for (const z of [-0.22, 0.22])
					this.box(group, x, 0.12, z, 0.14, 0.24, 0.15, 0x695b53);
				this.box(group, x, 0.86, 0.31, 0.14, 0.22, 0.12, hex);
				this.box(group, x * 0.6, 0.62, 0.58, 0.05, 0.06, 0.02, 0x333a36);
			}
		} else if (family === "ahrimans") {
			const body = new THREE.Mesh(
				new THREE.IcosahedronGeometry(0.4),
				this.material(0x9d927c),
			);
			body.position.y = 0.7;
			group.add(body);
			this.box(group, 0, 0.72, 0.37, 0.38, 0.3, 0.08, 0xe6dbc0);
			this.box(group, 0, 0.72, 0.42, 0.11, 0.18, 0.05, 0x543746);
			for (const x of [-0.57, 0.57])
				this.box(group, x, 0.75, 0, 0.5, 0.12, 0.32, 0x877979);
		} else if (family === "woodmen" || family === "morbols") {
			this.box(group, 0, 0.52, 0, 0.6, 1.04, 0.5, 0x806c4e);
			this.box(group, 0, 1.07, 0, 0.93, 0.5, 0.8, 0x647e59);
			for (const x of [-0.45, 0.45])
				this.box(group, x, 0.32, 0, 0.45, 0.19, 0.26, 0x7d744f);
			this.box(group, 0, 0.69, 0.26, 0.32, 0.17, 0.035, 0x3e4135);
		} else if (bomb) {
			const body = new THREE.Mesh(
				new THREE.IcosahedronGeometry(0.4, 0),
				this.material(hex, { emissive: 0x9a3820, emissiveIntensity: 0.2 }),
			);
			body.position.y = 0.7;
			group.add(body);
			this.box(group, 0, 1.1, 0, 0.17, 0.36, 0.15, 0xe2ad57);
		} else {
			this.box(group, 0, 0.51, 0, bird ? 0.58 : 0.7, 0.62, 0.65, hex);
			this.box(group, 0, 0.97, 0.16, bird ? 0.35 : 0.53, 0.4, 0.38, hex);
			for (const x of [-0.2, 0.2])
				this.box(
					group,
					x,
					0.16,
					0.07,
					0.19,
					0.33,
					0.33,
					machine ? 0x6c7677 : 0xa3854f,
				);
			this.box(group, -0.42, 0.52, 0, 0.21, bird ? 0.27 : 0.46, 0.5, hex);
			this.box(group, 0.42, 0.52, 0, 0.21, bird ? 0.27 : 0.46, 0.5, hex);
			this.box(
				group,
				0,
				0.93,
				0.45,
				bird ? 0.22 : 0.4,
				0.16,
				0.25,
				bird ? 0xba793e : hex,
			);
			if (bird) this.box(group, 0, 1.25, 0.04, 0.16, 0.28, 0.24, hex);
			else if (!machine)
				for (const x of [-0.25, 0.25])
					this.box(group, x, 1.24, 0, 0.12, 0.3, 0.1, 0xdbcda8);
		}
		if (!["uribo", "red-panthers", "ahrimans"].includes(family))
			for (const x of [-0.11, 0.11])
				this.box(group, x, 1, 0.36, 0.075, 0.08, 0.02, 0x2e3634);
		if (family === "pisco-demons")
			for (const x of [-0.18, -0.06, 0.06, 0.18])
				this.box(group, x, 0.73, 0.43, 0.065, 0.49, 0.09, 0x807491);
		if (demon) {
			for (const side of [-1, 1]) {
				const wing = this.box(
					group,
					side * 0.65,
					0.88,
					-0.22,
					0.6,
					0.42,
					0.1,
					0x7f7487,
				);
				wing.rotation.z = side * 0.4;
				this.box(group, side * 0.3, 1.35, 0, 0.1, 0.45, 0.1, 0xd4bea0);
			}
			group.userData.baseScale = 1.3;
			group.scale.setScalar(1.3);
		}
		const ring = new THREE.Mesh(
			new THREE.TorusGeometry(0.42, 0.03, 4, 24),
			new THREE.MeshBasicNodeMaterial({
				color: unit.team === "enemy" ? 0xb6503d : 0x78b4be,
			}),
		);
		ring.rotation.x = -Math.PI / 2;
		ring.position.y = 0.04;
		group.add(ring);
		group.userData.ring = ring;
		this.mergeStatic(group);
		return group;
	}

	buildChapel(x, z) {
		const group = this.board;
		this.box(group, x, 1.4, z, 2.2, 2.4, 1.8, 0xc9c2ad);
		for (let row = 0; row < 5; row++)
			for (let j = 0; j < 4; j++)
				this.box(
					group,
					x - 0.87 + j * 0.57,
					0.65 + row * 0.39,
					z + 0.917,
					0.53,
					0.34,
					0.06,
					row % 2 ? 0xbeb8a6 : 0xd3ccba,
				);
		this.box(group, x, 1.25, z + 0.97, 0.67, 1.4, 0.07, 0x65584b);
		this.box(group, x, 1.25, z + 1.03, 0.045, 1.4, 0.055, 0xa49779);
		for (let i = 0; i < 5; i++)
			this.box(
				group,
				x,
				2.61 + i * 0.22,
				z,
				2.5 - i * 0.41,
				0.25,
				2.05,
				i % 2 ? 0x567176 : 0x647d7b,
			);
		this.box(group, x - 1.1, 2.1, z + 0.65, 0.6, 3.3, 0.7, 0xb6ad95);
		this.box(group, x - 1.1, 3.79, z + 0.65, 0.79, 0.2, 0.86, 0xcac2ac);
		for (const dx of [-0.25, 0.25])
			for (const dz of [-0.3, 0.3])
				this.box(
					group,
					x - 1.1 + dx,
					4.02,
					z + 0.65 + dz,
					0.22,
					0.4,
					0.23,
					0xcac2ac,
				);
		this.box(group, x - 1.1, 3.08, z + 1.015, 0.22, 0.47, 0.03, 0x625e50);
		this.box(group, x, 1.95, z + 0.98, 0.12, 0.48, 0.05, 0xb9a06d);
		this.box(group, x, 2.02, z + 0.99, 0.37, 0.11, 0.06, 0xb9a06d);
	}

	tree(x, z, scale = 1) {
		const group = new THREE.Group();
		group.position.set(x, 0.32, z);
		group.scale.setScalar(scale);
		this.box(group, 0, 0.55, 0, 0.24, 1.1, 0.24, 0x746650);
		for (let k = 0; k < 3; k++) {
			const foliage = new THREE.Mesh(
				new THREE.ConeGeometry(0.8 - k * 0.12, 0.95, 4),
				this.material([0x567563, 0x69846a, 0x7d9273][k]),
			);
			foliage.position.y = 1.1 + k * 0.48;
			foliage.rotation.y = Math.PI / 4;
			foliage.castShadow = true;
			group.add(foliage);
		}
		this.board.add(group);
	}

	banner(x, z, y, hex) {
		this.box(this.board, x, y + 1, z, 0.065, 2, 0.065, 0x675b49);
		this.box(this.board, x + 0.27, y + 1.5, z, 0.54, 0.72, 0.055, hex);
		this.box(
			this.board,
			x + 0.27,
			y + 1.5,
			z + 0.035,
			0.065,
			0.38,
			0.02,
			0xdcc496,
		);
	}

	setHighlights(tiles = [], mode = "move") {
		if (!this.highlights) return;
		this.highlights.clear();
		const mat = new THREE.MeshBasicNodeMaterial({
			color: mode === "move" ? 0x61adba : 0xd47d53,
			transparent: true,
			opacity: 0.34,
			depthWrite: false,
		});
		for (const tile of tiles) {
			const t = this.tiles.get(`${tile.x},${tile.z}`)?.userData.tile;
			if (!t) continue;
			const mesh = new THREE.Mesh(this.boxGeo, mat);
			mesh.position.set(
				tile.x - this.offsetX,
				this.tileY(t) + 0.018,
				tile.z - this.offsetZ,
			);
			mesh.scale.set(0.93, 0.025, 0.93);
			this.highlights.add(mesh);
		}
		this.highlightMaterial?.dispose();
		this.highlightMaterial = mat;
	}

	focusUnit(id) {
		this.focusId = id;
	}
	setCursor(tile) {
		const actual = this.tiles.get(`${tile.x},${tile.z}`)?.userData.tile;
		this.hover.visible = !!actual;
		if (actual)
			this.hover.position.set(
				tile.x - this.offsetX,
				this.tileY(actual) + 0.035,
				tile.z - this.offsetZ,
			);
	}
	setVisible(value) {
		this.sceneVisible = value;
		this.canvas.style.opacity = value ? "1" : "0.13";
		this.labelRoot.style.display =
			value && this.mode === "battle" ? "" : "none";
	}
	setMode(mode) {
		this.mode = mode;
		const wasTitle = this.titleMode;
		this.titleMode = mode === "title";
		this.labelRoot.style.display = mode === "battle" ? "" : "none";
		if (this.titleMode && !wasTitle) this.setDiorama();
		this.canvas.style.opacity =
			mode === "world" || mode === "ending" ? "0.12" : "1";
		this.resize();
	}
	rotate(delta) {
		this.targetAngle += (delta * Math.PI) / 2;
	}
	zoomBy(delta) {
		this.zoom = THREE.MathUtils.clamp(this.zoom + delta * 0.12, 0.5, 1.7);
		this.resize();
	}

	resize() {
		if (!this.renderer) return;
		const w = innerWidth,
			h = innerHeight,
			aspect = w / h;
		const size =
			(Math.max(6.4, ((this.width || 9) + (this.depth || 9)) * 0.355) *
				this.zoom) /
			Math.min(1, aspect);
		const horizontalShift =
			this.titleMode && w > 800 ? size * aspect * 0.38 : 0;
		const verticalShift = w < 700 ? (this.titleMode ? -4.5 : -0.3) : -0.1;
		Object.assign(this.camera, {
			left: -size * aspect - horizontalShift,
			right: size * aspect - horizontalShift,
			top: size + verticalShift,
			bottom: -size + verticalShift,
		});
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(w, h);
	}

	setQuality(preset) {
		if (!["Auto", "High", "Balanced"].includes(preset)) return;
		this.quality = preset;
		this.samples = [];
		this.applyQuality(preset === "Auto" ? "High" : preset);
	}

	applyQuality(preset) {
		this.effectiveQuality = preset;
		const p = PRESETS[preset];
		this.info.preset = this.quality === "Auto" ? `Auto · ${preset}` : preset;
		this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, p.ratio));
		if (this.sun.shadow.map && this.sun.shadow.mapSize.x !== p.shadow) {
			// A new light invalidates cached shadow bindings across both backends.
			// Reusing a resized depth texture can leave Dawn bind groups stale.
			const previous = this.sun;
			this.sun = previous.clone();
			this.sun.shadow = previous.shadow.clone();
			this.sun.shadow.map = null;
			this.scene.remove(previous);
			this.scene.add(this.sun);
			previous.dispose();
			for (const material of this.materials.values())
				material.needsUpdate = true;
		}
		this.sun.shadow.mapSize.set(p.shadow, p.shadow);
		// ShadowNode resizes its target from mapSize. Disposing it here would leave
		// compiled WebGPU bind groups pointing at a destroyed depth texture.
		this.sun.shadow.needsUpdate = true;
		this.disposePipeline();
		this.pipeline = new THREE.RenderPipeline(this.renderer);
		// FXAA is shared by both paths. Single-sample GL render targets also avoid
		// a driver-dependent multisampled depth resolve that can hide small meshes.
		this.scenePass = pass(this.scene, this.camera, {
			samples:
				preset === "High" && this.renderer.backend.isWebGPUBackend ? 4 : 1,
		});
		const beauty = this.scenePass.getTextureNode("output");
		this.bloomNode = p.bloom ? bloom(beauty, 0.13, 0.2, 1.2) : null;
		const lit = this.bloomNode ? beauty.add(this.bloomNode) : beauty;
		this.pipeline.outputColorTransform = false;
		this.fxaaNode = fxaa(renderOutput(lit));
		this.pipeline.outputNode = this.fxaaNode;
		while (this.bodies.length > p.bodies) this.removeBody(this.bodies[0]);
		this.resize();
	}

	disposePipeline() {
		this.pipeline?.dispose();
		this.scenePass?.dispose();
		this.bloomNode?.dispose();
		// FXAA materializes renderOutput into its own RTT, which its parent
		// pipeline does not own. Release both the node and that backing target.
		this.fxaaNode?.textureNode?.dispose();
		this.fxaaNode?.dispose();
		this.pipeline = null;
		this.scenePass = null;
		this.bloomNode = null;
		this.fxaaNode = null;
	}

	pick(event) {
		const rect = this.canvas.getBoundingClientRect();
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			(-(event.clientY - rect.top) / rect.height) * 2 + 1,
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);
		const objects = [
			...this.tiles.values(),
			...[...this.units.values()]
				.filter((visual) => visual.group.visible && !visual.unit.removed)
				.map((visual) => visual.group),
		];
		const hit = this.raycaster.intersectObjects(objects, true)[0];
		if (!hit) return null;
		let object = hit.object;
		while (object && !object.userData.unitId && !object.userData.tile)
			object = object.parent;
		if (object?.userData.unitId) {
			const unit = this.units.get(object.userData.unitId)?.unit;
			return this.tiles.get(`${unit.x},${unit.z}`)?.userData.tile;
		}
		return object?.userData.tile;
	}

	pointerMove(event) {
		if (this.titleMode) return;
		const tile = this.pick(event);
		this.hover.visible = !!tile;
		if (tile) {
			this.hover.position.set(
				tile.x - this.offsetX,
				this.tileY(tile) + 0.035,
				tile.z - this.offsetZ,
			);
			this.onHover?.(tile.x, tile.z);
		} else this.onHover?.(null, null);
	}

	effect(event) {
		if (event?.type === "move") {
			const visual = this.units.get(event.unitId);
			if (visual)
				visual.waypoints = (event.path || [event.to])
					.filter(Boolean)
					.map(
						(tile) =>
							new THREE.Vector3(
								tile.x - this.offsetX,
								this.tileY(
									this.tiles.get(`${tile.x},${tile.z}`)?.userData.tile,
								),
								tile.z - this.offsetZ,
							),
					);
			return;
		}
		if (
			!event ||
			!["hit", "heal", "cast", "death", "victory"].includes(event.type)
		)
			return;
		const visual = this.units.get(event.targetId || event.unitId);
		if (!visual) return;
		const p = visual.group.position;
		const healing = event.type === "heal";
		visual.flashUntil = this.elapsed + 0.23;
		const text = document.createElement("div");
		text.textContent = event.miss
			? "MISS"
			: event.amount
				? `${healing ? "+" : "−"}${Math.round(event.amount)}`
				: event.type === "cast"
					? event.ability?.name || event.ability || "CHARGING"
					: event.type.toUpperCase();
		text.style.cssText = `position:fixed;z-index:7;pointer-events:none;font:bold 23px Georgia;color:${healing ? "#3a8070" : "#a2432f"};text-shadow:0 1px #fff,1px 0 #fff;transform:translate(-50%,-50%)`;
		document.body.append(text);
		this.floats.push({
			element: text,
			pos: p.clone().add(new THREE.Vector3(0, 1.4, 0)),
			born: this.elapsed,
		});
		for (let i = 0; i < 7; i++) {
			if (this.bodies.length >= PRESETS[this.effectiveQuality].bodies)
				this.removeBody(this.bodies[0]);
			const rigid = this.world.createRigidBody(
				RAPIER.RigidBodyDesc.dynamic()
					.setTranslation(p.x, p.y + 0.7, p.z)
					.setLinearDamping(0.5)
					.setAngularDamping(0.4),
			);
			this.world.createCollider(
				RAPIER.ColliderDesc.cuboid(0.06, 0.06, 0.06)
					.setDensity(400)
					.setFriction(0.7)
					.setRestitution(0.3),
				rigid,
			);
			rigid.setLinvel(
				{
					x: Math.cos(i * 1.8) * 1.4,
					y: 2 + i * 0.16,
					z: Math.sin(i * 1.8) * 1.4,
				},
				true,
			);
			rigid.setAngvel({ x: 3, y: 4, z: 1 }, true);
			const mesh = new THREE.Mesh(
				this.boxGeo,
				this.material(healing ? 0x82bca0 : 0xd4ae67, { metalness: 0.35 }),
			);
			mesh.scale.setScalar(0.12);
			mesh.castShadow = true;
			mesh.position.copy(p);
			this.scene.add(mesh);
			this.bodies.push({
				rigid,
				mesh,
				born: this.elapsed,
				previous: new THREE.Vector3(p.x, p.y + 0.7, p.z),
				previousRotation: new THREE.Quaternion(),
			});
		}
	}

	removeBody(body) {
		this.world.removeRigidBody(body.rigid);
		this.scene.remove(body.mesh);
		this.bodies.splice(this.bodies.indexOf(body), 1);
	}

	tick(delta, rawMs = delta * 1000) {
		this.elapsed += delta;
		this.info.frameMs += (rawMs - this.info.frameMs) * 0.04;
		if (
			this.quality === "Auto" &&
			this.elapsed > 1.5 &&
			!document.hidden &&
			this.sceneVisible !== false
		) {
			this.samples.push(rawMs);
			if (this.samples.length === 45) {
				const average =
					this.samples.reduce((a, b) => a + b, 0) / this.samples.length;
				if (average > 24 && this.effectiveQuality === "High")
					this.applyQuality("Balanced");
				this.samples = [];
			}
		}
		this.accumulator = Math.min(
			this.accumulator + delta,
			STEP * PRESETS[this.effectiveQuality].steps,
		);
		while (this.accumulator >= STEP) {
			for (const b of this.bodies) {
				const t = b.rigid.translation();
				b.previous.set(t.x, t.y, t.z);
				const q = b.rigid.rotation();
				b.previousRotation.set(q.x, q.y, q.z, q.w);
			}
			this.world.step();
			this.accumulator -= STEP;
		}
		const alpha = this.accumulator / STEP;
		for (const b of [...this.bodies]) {
			const p = b.rigid.translation(),
				q = b.rigid.rotation();
			b.mesh.position.copy(b.previous).lerp(scratch.set(p.x, p.y, p.z), alpha);
			b.mesh.quaternion
				.copy(b.previousRotation)
				.slerp(new THREE.Quaternion(q.x, q.y, q.z, q.w), alpha);
			if (this.elapsed - b.born > 2.8 || p.y < -5) this.removeBody(b);
		}
		this.angle += (this.targetAngle - this.angle) * Math.min(1, delta * 7);
		this.camera.position.set(
			Math.sin(this.angle) * 21,
			18,
			Math.cos(this.angle) * 21,
		);
		this.camera.lookAt(0, 0.6, 0);
		for (const [id, v] of this.units) {
			const destination = v.waypoints?.[0] || v.target;
			const distance = v.group.position.distanceTo(destination);
			v.group.position.lerp(destination, Math.min(1, delta * 12));
			if (v.waypoints?.length && distance < 0.11) v.waypoints.shift();
			if (distance > 0.035)
				v.group.position.y += Math.abs(Math.sin(this.elapsed * 18)) * 0.055;
			v.group.scale.setScalar(
				(v.group.userData.baseScale || 1) *
					(v.flashUntil > this.elapsed ? 1.055 : 1),
			);
			v.group.rotation.y = v.group.userData.facing;
			v.group.rotation.z +=
				((v.group.userData.dead ? Math.PI / 2 : 0) - v.group.rotation.z) *
				Math.min(1, delta * 8);
			v.group.userData.ring.visible =
				id === this.battle?.activeId || this.titleMode;
			v.group.userData.ring.scale.setScalar(
				1 + Math.sin(this.elapsed * 4) * 0.06,
			);
			v.label.style.display = this.titleMode || v.unit.hp <= 0 ? "none" : "";
			scratch
				.copy(v.group.position)
				.add(new THREE.Vector3(0, 1.65, 0))
				.project(this.camera);
			v.label.style.left = `${(scratch.x * 0.5 + 0.5) * innerWidth}px`;
			v.label.style.top = `${(-scratch.y * 0.5 + 0.5) * innerHeight}px`;
		}
		for (const f of [...this.floats]) {
			const age = this.elapsed - f.born;
			scratch.copy(f.pos);
			scratch.y += age * 0.6;
			scratch.project(this.camera);
			f.element.style.left = `${(scratch.x * 0.5 + 0.5) * innerWidth}px`;
			f.element.style.top = `${(-scratch.y * 0.5 + 0.5) * innerHeight}px`;
			f.element.style.opacity = Math.min(1, (1.5 - age) * 2);
			if (age > 1.5) {
				f.element.remove();
				this.floats.splice(this.floats.indexOf(f), 1);
			}
		}
		if (
			this.sceneVisible !== false ||
			this.elapsed - (this.lastDraw || 0) > 0.5
		) {
			this.pipeline.render();
			this.lastDraw = this.elapsed;
		}
	}
}
