import { SurveyKey } from "../survey-keys/index.ts";

export const EventScenarioLabel = {
	BreachedDevice: 'Breached Device',
	LockedDevice: 'Locked Device',
	BreachedAcct: 'Breached Account',
	LockedAcct: 'Locked Account',
	BreachedSocial: 'Breached Social',
	LockedSocial: 'Locked Social',
	BreachedFinancial: 'Breached Financial',
	LockedFinancial: 'Locked Financial',
	BreachedPwds: 'Breached Passwords',
	LockedPwds: 'Locked Passwords',
	ReplacedOrUpgraded: 'Replaced Device/OS',
	BrokenPromise: 'Broken Promise',
	Abuse: "Abuse",
} as const;

export type EventScenarioLabel = typeof EventScenarioLabel[keyof typeof EventScenarioLabel];

export const EventScenarioLabels = [
	EventScenarioLabel.BreachedDevice,
	EventScenarioLabel.LockedDevice,
	EventScenarioLabel.BreachedAcct,
	EventScenarioLabel.LockedAcct,
	EventScenarioLabel.BreachedSocial,
	EventScenarioLabel.LockedSocial,
	EventScenarioLabel.BreachedFinancial,
	EventScenarioLabel.LockedFinancial,
	EventScenarioLabel.BreachedPwds,
	EventScenarioLabel.LockedPwds,
	EventScenarioLabel.ReplacedOrUpgraded,
	EventScenarioLabel.BrokenPromise,
	EventScenarioLabel.Abuse,
] as const;


export const EventScenariosLabelsPairedWithSurveyKeyPrefix = [
	[EventScenarioLabel.BreachedDevice, 'hacked-device'],
	[EventScenarioLabel.LockedDevice, 'locked-device'],
	[EventScenarioLabel.BreachedAcct, 'hacked-acct'],
	[EventScenarioLabel.LockedAcct, 'locked-acct'],
	[EventScenarioLabel.BreachedSocial, 'hacked-soc'],
	[EventScenarioLabel.LockedSocial, 'locked-soc'],
	[EventScenarioLabel.BreachedFinancial, 'hacked-bank'],
	[EventScenarioLabel.LockedFinancial, 'locked-bank'],
	[EventScenarioLabel.BreachedPwds, 'hacked-pwds'],
	[EventScenarioLabel.LockedPwds, 'locked-pwds'],
	[EventScenarioLabel.ReplacedOrUpgraded, 'swap-device'],
	[EventScenarioLabel.BrokenPromise, 'disconnect'],
	[EventScenarioLabel.Abuse, 'abuse'],
 ] as const satisfies readonly [EventScenarioLabel, string][];

export const EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys = 
	EventScenariosLabelsPairedWithSurveyKeyPrefix.map( ([label, key]) => [label, `${key}?`] as const satisfies [EventScenarioLabel, SurveyKey]);
export const EventScenarioMatchingQuestionSurveyKeys = EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys.map( ([_, key]) => key) satisfies readonly SurveyKey[];
export const EventScenarioLabelToMatchingQuestionSurveyKey = Object.fromEntries(EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys) as Record<EventScenarioLabel, typeof EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
export const EventScenarioLabelPairedWithDurationSurveyKey = EventScenariosLabelsPairedWithSurveyKeyPrefix.map(
	([label, key]) => [label, `${key}-dur`] as const satisfies [EventScenarioLabel, SurveyKey]);
export const EventScenarioLabelToDurationSurveyKey =
	Object.fromEntries(EventScenarioLabelPairedWithDurationSurveyKey) as Record<EventScenarioLabel, typeof EventScenarioLabelPairedWithDurationSurveyKey[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;
export const EventScenarioLabelPairedWithWhenSurveyKey = EventScenariosLabelsPairedWithSurveyKeyPrefix.map(
	([label, key]) => [label, `${key}-when`] as const satisfies [EventScenarioLabel, SurveyKey]);
export const EventScenarioLabelToWhenSurveyKey = Object.fromEntries(EventScenarioLabelPairedWithWhenSurveyKey) as Record<EventScenarioLabel, typeof EventScenarioLabelPairedWithWhenSurveyKey[number][1]> satisfies Record<EventScenarioLabel, SurveyKey>;


export const HarmScenarioLabel = {
	LostPhotos: 'Lost Photos',
	LostEmails: 'Lost Emails',
	MentalHealth: 'Mental Health'
} as const;


export const HarmScenarioLabels = [
	HarmScenarioLabel.LostPhotos,
	HarmScenarioLabel.LostEmails,
	HarmScenarioLabel.MentalHealth
] as const;
export type HarmScenarioLabel = typeof HarmScenarioLabels[number];

export const ScenarioLabels = [...EventScenarioLabels, ...HarmScenarioLabels] as const;

export type ScenarioLabel = typeof ScenarioLabels[number];


export const HarmScenarioWithQuantityLabelSurveyKeyBasePairs = [
	[HarmScenarioLabel.LostPhotos, 'photos'],
	[HarmScenarioLabel.LostEmails, 'emails'],
] as const satisfies [HarmScenarioLabel, unknown][];
export const HarmScenarioLabelHarmQuantityPairs = HarmScenarioWithQuantityLabelSurveyKeyBasePairs.map(
	([label, key]) => [label, `${key}-quantity`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelToHarmQuantitySurveyKey = Object.fromEntries(HarmScenarioLabelHarmQuantityPairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmQuantityPairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;

export const HarmScenarioLabelSurveyKeyBasePairs = [
	...HarmScenarioWithQuantityLabelSurveyKeyBasePairs,
	[HarmScenarioLabel.MentalHealth, 'mental'],
 ] as const satisfies [HarmScenarioLabel, unknown][];

export const ScenarioLabelSurveyKeyBasePairs = [
	...EventScenariosLabelsPairedWithSurveyKeyPrefix,
	...HarmScenarioLabelSurveyKeyBasePairs,
] as const satisfies [ScenarioLabel, unknown][];

export const HarmScenarioLabelSurveyKeyPairs = HarmScenarioLabelSurveyKeyBasePairs.map(
	([label, key]) => [label, `${key}?`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelsPairedWithLikertSurveyHarmKey = HarmScenarioLabelSurveyKeyBasePairs.map( ([label, key]) =>
	[label, `${key}-lik`] as const satisfies [HarmScenarioLabel, SurveyKey]);

export const HarmScenarioLabelsPairedWithLikertHarmSurveyKey = Object.fromEntries(HarmScenarioLabelsPairedWithLikertSurveyHarmKey) as Record<HarmScenarioLabel, typeof HarmScenarioLabelsPairedWithLikertSurveyHarmKey[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;

export const ScenarioLabelsPairedWithMatchingQuestionSurveyKeys = ScenarioLabelSurveyKeyBasePairs.map(
	([label, key]) => [label, `${key}?`] as const satisfies [ScenarioLabel, SurveyKey]);
export const ScenarioLabelsPairedWithLikertHarmSurveyKeys = ScenarioLabelSurveyKeyBasePairs.map( ([label, key]) =>
	[label, `${key}-lik`] as const satisfies [ScenarioLabel, SurveyKey]);
export const LikertHarmSurveyKeys = ScenarioLabelsPairedWithLikertHarmSurveyKeys.map( ([_, key]) => key) satisfies readonly SurveyKey[];
export const ScenarioLabelsTMatchingQuestionSurveyKey = Object.fromEntries(ScenarioLabelsPairedWithLikertHarmSurveyKeys) as Record<ScenarioLabel, typeof ScenarioLabelsPairedWithLikertHarmSurveyKeys[number][1]> satisfies Record<ScenarioLabel, SurveyKey>;
export const ScenarioLabelToLikertHarmSurveyKey = Object.fromEntries(ScenarioLabelsPairedWithLikertHarmSurveyKeys) as Record<ScenarioLabel, typeof ScenarioLabelsPairedWithLikertHarmSurveyKeys[number][1]> satisfies Record<ScenarioLabel, SurveyKey>;
