import { SurveyKey } from "../survey-keys/index.ts";

export const HarmScenarioLabel = {
	LostPhotos: 'Lost Photos',
	LostEmails: 'Lost Emails',
} as const;

export type HarmScenarioLabel = typeof HarmScenarioLabel[keyof typeof HarmScenarioLabel];

export const HarmScenarioLabels = [
	HarmScenarioLabel.LostPhotos,
	HarmScenarioLabel.LostEmails,
] as const;

export const HarmScenarioLabelSurveyKeyPairs = [
	[HarmScenarioLabel.LostPhotos, 'photos'],
	[HarmScenarioLabel.LostEmails, 'emails'],
//	[HarmScenarioLabel.BrokenPromise, SurveyKeys['disconnect']],
 ] as const satisfies [HarmScenarioLabel, string][];

export const HarmScenarioLabelHarmQuantityPairs = HarmScenarioLabelSurveyKeyPairs.map(
	([label, key]) => [label, `${key}-quantity`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelHarmValuePairs = HarmScenarioLabelSurveyKeyPairs.map( ([label, key]) =>
	[label, `${key}-value`] as const satisfies [HarmScenarioLabel, SurveyKey]);
export const HarmScenarioLabelHarmEventsPairs = HarmScenarioLabelSurveyKeyPairs.map( ([label, key]) =>
	[label, `${key}-events`] as const satisfies [HarmScenarioLabel, SurveyKey]);

export const HarmScenarioLabelToHarmQuantitySurveyKey = Object.fromEntries(HarmScenarioLabelHarmQuantityPairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmQuantityPairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;
export const HarmScenarioLabelToHarmValueSurveyKey = Object.fromEntries(HarmScenarioLabelHarmValuePairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmValuePairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;
export const HarmScenarioLabelToHarmEventsSurveyKey = Object.fromEntries(HarmScenarioLabelHarmEventsPairs) as Record<HarmScenarioLabel, typeof HarmScenarioLabelHarmEventsPairs[number][1]> satisfies Record<HarmScenarioLabel, SurveyKey>;