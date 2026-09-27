/** Every audio URL and cue mapping comes from the single public manifest. */
export class GameAudio {
	constructor() {
		this.volume = 0.55;
		this.muted = false;
		this.unlocked = false;
		this.active = new Set();
		this.music = null;
		this.desiredMusic = "world";
	}
	async init() {
		const response = await fetch("/audio/manifest.json");
		if (!response.ok) throw new Error("Audio manifest could not be loaded.");
		this.manifest = await response.json();
		const unlock = () => {
			this.unlocked = true;
			this.setMusic(this.desiredMusic);
		};
		document.addEventListener("pointerdown", unlock, { once: true });
		document.addEventListener("keydown", unlock, { once: true });
		return this;
	}
	setVolume(value) {
		this.volume = Math.max(0, Math.min(1, Number(value)));
		this.updateVolume();
	}
	setMuted(value) {
		this.muted = !!value;
		this.updateVolume();
	}
	updateVolume() {
		for (const audio of this.active)
			audio.volume = this.muted
				? 0
				: Math.min(1, this.volume * (audio.cueGain ?? 1));
	}
	setMusic(id) {
		this.desiredMusic = id;
		if (!this.unlocked || !this.manifest) return;
		if (this.music?.assetId === id) return;
		if (this.music) {
			this.music.pause();
			this.active.delete(this.music);
			this.music = null;
		}
		const asset = this.manifest.assets[id];
		if (!asset) return;
		const audio = new Audio(asset.url);
		audio.assetId = id;
		audio.cueGain = asset.gain ?? 1;
		audio.loop = asset.loop ?? false;
		audio.preload = "auto";
		this.music = audio;
		this.active.add(audio);
		this.updateVolume();
		audio.play().catch(() => {});
	}
	play(id) {
		if (!this.unlocked || !this.manifest || this.muted) return;
		if (id === "battle" || id === "world") return this.setMusic(id);
		const cue = this.manifest.cues[id] || { asset: id };
		const asset = this.manifest.assets[cue.asset];
		if (!asset) return;
		if (this.active.size > 12) return;
		const audio = new Audio(asset.url);
		audio.cueGain = (asset.gain ?? 1) * (cue.gain ?? 1);
		const cleanup = () => {
			audio.pause();
			this.active.delete(audio);
		};
		audio.addEventListener("ended", cleanup, { once: true });
		audio.addEventListener("error", cleanup, { once: true });
		this.active.add(audio);
		this.updateVolume();
		if (cue.start) audio.currentTime = cue.start;
		audio
			.play()
			.then(() => {
				if (cue.duration) setTimeout(cleanup, cue.duration * 1000);
			})
			.catch(cleanup);
	}
}
