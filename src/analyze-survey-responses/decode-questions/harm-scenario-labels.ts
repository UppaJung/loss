import { SurveyKey } from "../survey-keys/index.ts";

export const HarmScenarioLabel = {
	LostPhotos: 'Lost Photos',
	LostEmails: 'Lost Emails',
	MentalHealth: 'Mental Health'
} as const;

export type HarmScenarioLabel = typeof HarmScenarioLabel[keyof typeof HarmScenarioLabel];

export const HarmScenarioLabels = [
	HarmScenarioLabel.LostPhotos,
	HarmScenarioLabel.LostEmails,
	HarmScenarioLabel.MentalHealth
] as const;

export const HarmScenarioWithQuantityLabelSurveyKeyBasePairs = [
	[HarmScenarioLabel.LostPhotos, 'photos'],
	[HarmScenarioLabel.LostEmails, 'emails'],
] as const satisfies [HarmScenarioLabel, unknown][];

export const HarmScenarioLabelSurveyKeyBasePairs = [
	...HarmScenarioWithQuantityLabelSurveyKeyBasePairs,
	[HarmScenarioLabel.MentalHealth, 'mental'],
 ] as const satisfies [HarmScenarioLabel, unknown][];

export const HarmScenarioLabelSurveyKeyPairs = HarmScenarioLabelSurveyKeyBasePairs.map(
	([label, key]) => [label, `${key}?`] as const satisfies [HarmScenarioLabel, SurveyKey]);

export const HarmScenarioLabelHarmQuantityPairs = HarmScenarioWithQuantityLabelSurveyKeyBasePairs.map(
	([label, key]) => [label, `${key}-quantity`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelHarmValuePairs = HarmScenarioLabelSurveyKeyBasePairs.map( ([label, key]) =>
	[label, `${key}-lik`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelHarmEventsPairs = HarmScenarioLabelSurveyKeyBasePairs.map( ([label, key]) =>
	[label, `${key}-lik`] as const satisfies [HarmScenarioLabel, SurveyKey]);

export const HarmScenarioLabelToHarmQuantitySurveyKey = Object.fromEntries(HarmScenarioLabelHarmQuantityPairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmQuantityPairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;
export const HarmScenarioLabelToHarmValueSurveyKey = Object.fromEntries(HarmScenarioLabelHarmValuePairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmValuePairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;
export const HarmScenarioLabelToHarmEventsSurveyKey = Object.fromEntries(HarmScenarioLabelHarmEventsPairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmEventsPairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;
