import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import type { SurveyKey } from "../../survey-keys/index.ts";
import { MatchingScenariosLabelToId } from "../../decode-questions/matching-question.ts";
import { tallyLikert } from "./common/likert.ts";
import { exportVars } from "./common/exportVars.ts";

const labels = MatchingScenariosLabelToId.map( ([label]) => label );
export const MatchingScenarioKeys = MatchingScenariosLabelToId.map(
  ([_,k])=> `${k}-lik_1` satisfies SurveyKey
);

export const graphEventScenarioLikertBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	const toExport = {labels, ...tallyLikert(responses, MatchingScenarioKeys)};
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs}${exportVars(toExport)}`);
};
