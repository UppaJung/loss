import { TotalAnswered, tallyResponses } from "../../../common/tallyResponses.ts";
import { AugmentedSurveyResponses, AugmentedSurveyResponse } from "../../../survey-keys/index.ts";
import { numeric, percentage } from "../../../common/numeric.ts";
import type { SurveyKey } from "../../../survey-keys/index.ts";

export const LikertLabels = ['1', '2', '3', '4', '5', '6', '7'] as const;
export type LikertLabel = (typeof LikertLabels)[number];
export const LikertSeverityColors = LikertLabels.reduce((r, label) => {
  const green = 280 - 40 * parseInt(label);
  const red = -40 + 40 * parseInt(label);
  const blue = 0;
  r[label] = `rgb(${red},${green},${blue})`;
  return r;
}, {} as Record<LikertLabel, string>);


export const tallyLikert = (responses: AugmentedSurveyResponses<SurveyKey>, keys: SurveyKey[], filter?: (response: AugmentedSurveyResponse<SurveyKey>) => boolean) => {
  const tallies = keys.map((key) => tallyResponses(responses.map(response => (filter == null || filter(response)) ? response[key] : undefined))
  );
  const counts = Object.fromEntries(
    LikertLabels.map(likertLabel => ([likertLabel, tallies.map(tally => numeric(tally[likertLabel]))]) as const)
  );
  const percentsOfResponses = Object.fromEntries(
    LikertLabels.map(likertLabel => ([likertLabel, tallies.map(tally => percentage(tally[likertLabel], responses.length))]) as const)
  );
  const percentsOfAnswered = Object.fromEntries(
    LikertLabels.map(likertLabel => ([likertLabel, tallies.map(tally => percentage(tally[likertLabel], tally[TotalAnswered]))]) as const)
  );
  return { counts, percentsOfResponses, percentsOfAnswered };
};
