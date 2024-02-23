import { AugmentedSurveyResponse, AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import type { SurveyKey } from "../../survey-keys/index.ts";
import { HarmScenarioLabels } from "../../decode-questions/harm-scenario-labels.ts";
import { HarmScenarioLabelToHarmValueSurveyKey } from "../../decode-questions/harm-scenario-labels.ts";
import { exportVars } from "./common/exportVars.ts";
import { LikertAndNoLossLabels } from "./common/likert.ts";
import { HarmAsDurationOfTimeLabelListLeastToGreatest } from "../../decode-questions/harm-as-duration-of-time.ts";
import { decodeHarmAsDurationOfTime } from "../../decode-questions/harm-as-duration-of-time.ts";
import { HarmScenarioLabelToHarmQuantitySurveyKey } from "../../decode-questions/harm-scenario-labels.ts";
import { numeric } from "../../common/numeric.ts";
import { percentage } from "../../common/numeric.ts";
import { tallyResponses } from "../../common/tallyResponses.ts";
import { NoLossLabel } from "./common/likert.ts";

export const tallyLikert = (responses: AugmentedSurveyResponses<SurveyKey>, key: SurveyKey, filters: ((response: AugmentedSurveyResponse<SurveyKey>) => boolean)[]) => {
  const tallies = filters.map((filter) => tallyResponses(responses.map(response => filter(response) ? response[key] || NoLossLabel : undefined)));
  const counts = Object.fromEntries(
    LikertAndNoLossLabels.map( likertLabel => ([likertLabel, tallies.map(tally => numeric(tally[likertLabel]))]) as const)
  );
  const percentsOfResponses = Object.fromEntries(
    LikertAndNoLossLabels.map( likertLabel => ([likertLabel, tallies.map(tally => percentage(tally[likertLabel], responses.length))]) as const)
  );
  return { counts, percentsOfResponses };
};


export const graphHarmQuantityWithLikertSeverity = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {

	const data = Object.fromEntries(
		HarmScenarioLabels.map( harmScenarioLabel => {
			const harmValueAsDurationKey = HarmScenarioLabelToHarmQuantitySurveyKey[harmScenarioLabel];
			const harmValueAsLikertKey = HarmScenarioLabelToHarmValueSurveyKey[harmScenarioLabel];			
			const labels = HarmAsDurationOfTimeLabelListLeastToGreatest;
			const filters = HarmAsDurationOfTimeLabelListLeastToGreatest.map( harmAsDurationOfTime =>
				(response: AugmentedSurveyResponse<SurveyKey>) => decodeHarmAsDurationOfTime(response[harmValueAsDurationKey]) === harmAsDurationOfTime
			);
			const tl = tallyLikert(responses, harmValueAsLikertKey, filters);
			const data = {labels, ...tl};
			return [harmScenarioLabel, data];
		})
	);
	
	
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs}${exportVars(data)}`
	);
}

