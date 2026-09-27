import data from "./guide-data.json" with { type: "json" };

export const {
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
	guideRecords,
	chapters,
	recruitments,
	ending,
	metadata,
} = data;
export const CAMPAIGN = campaign;
export const JOBS = jobs;
export const ABILITIES = abilities;
export const ITEMS = equipment;
export const OPTIONAL_BATTLES = optionalBattles;
export const QUESTS = quests;
export const contentById = Object.fromEntries(
	[
		...campaign,
		...optionalBattles,
		...jobs,
		...abilities,
		...equipment,
		...quests,
	].map((entry) => [entry.id, entry]),
);
export const guideById = Object.fromEntries(
	guideRecords.map((entry) => [entry.id, entry]),
);

let archivePromise;
let archiveLoaded = false;
export const isGuideArchiveLoaded = () => archiveLoaded;
export function loadGuideRecords() {
	archivePromise ||= import("./guide-archive.json", { with: { type: "json" } })
		.then(({ default: textById }) => {
			for (const record of guideRecords)
				record.text = textById[record.id] || "";
			archiveLoaded = true;
			return guideRecords;
		})
		.catch((error) => {
			archivePromise = undefined;
			throw error;
		});
	return archivePromise;
}
