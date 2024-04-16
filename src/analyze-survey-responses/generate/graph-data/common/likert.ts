import { TotalAnswered, TotalResponses, tallyResponses } from "../../../common/tallyResponses.ts";
import { AugmentedSurveyResponses, AugmentedSurveyResponse } from "../../../survey-keys/index.ts";
import { numeric, percentage } from "../../../common/numeric.ts";
import type { SurveyKey } from "../../../survey-keys/index.ts";

export const NoLossLabel = 'No loss' as const;
export const LikertLabels = ['1', '2', '3', '4', '5', '6', '7'] as const;
export const LikertAndNoLossLabels = [NoLossLabel, ...LikertLabels] as const;
export const LikertAndNoLossLabelsReversed = LikertAndNoLossLabels.toReversed();
export type LikertLabel = (typeof LikertLabels)[number];
export type LikertOrNoLossLabel = (typeof LikertAndNoLossLabels)[number];
export const SeverityColorsGreatestToLeast= [0, 1, 2, 3, 4, 5, 6].map((inverseSeverity) => {
  const green = Math.floor(40 * inverseSeverity);
  const red = Math.floor(219 + 6 * inverseSeverity);
  const blue = Math.floor(25 * inverseSeverity);
  const opacity = 1 - 0.06666 * inverseSeverity;
  return `rgba(${red},${green},${blue},${opacity})` as const;
});
export const SeverityColorsLeastToGreatest = SeverityColorsGreatestToLeast.toReversed();
export const LikertSeverityColors = LikertLabels.reduce((r, label) => {
  r[label] = SeverityColorsLeastToGreatest[parseInt(label) - 1];
  return r;
}, {} as Record<LikertLabel, typeof SeverityColorsLeastToGreatest[number]>);
export const LikertSeverityWithNoLossColors: Record<LikertOrNoLossLabel, string> = {
  ...LikertSeverityColors,
  [NoLossLabel]: `rgb(240, 240, 240)`
};

export const tallyLikert = (
  responses: AugmentedSurveyResponses<SurveyKey>,
  keys: SurveyKey[],
  filter?: (response: AugmentedSurveyResponse<SurveyKey>, key: SurveyKey) => boolean
) => {
  const tallies = keys.map((key) => tallyResponses(responses.filter( r => filter == null ? true : filter(r, key)).map(response => response[key]))
  );
  const counts = Object.fromEntries(
    LikertAndNoLossLabels.map(likertLabel => ([likertLabel, tallies.map(tally => numeric(tally[likertLabel]))]) as const)
  );
  const percentsOfResponses = Object.fromEntries(
    LikertAndNoLossLabels.map(likertLabel => ([likertLabel, tallies.map(tally => percentage(tally[likertLabel], tally[TotalResponses]))]) as const)
  );
  const percentsOfAnswered = Object.fromEntries(
    LikertAndNoLossLabels.map(likertLabel => ([likertLabel, tallies.map(tally => percentage(tally[likertLabel], tally[TotalAnswered]))]) as const)
  );
  return { counts, percentsOfResponses, percentsOfAnswered };
};
