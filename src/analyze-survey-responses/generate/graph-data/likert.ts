import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import type { SurveyKey } from "../../survey-keys/index.ts";
import { tallyLikert } from "./common/likert.ts";
import { exportVars } from "./common/exportVars.ts";
import { ScenarioLabels, LikertHarmSurveyKeys } from "../../decode-questions/scenario-labels.ts";



export const graphScenarioLikertBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	const toExport = {labels: ScenarioLabels, ...tallyLikert(responses, LikertHarmSurveyKeys)};
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs}${exportVars(toExport)}`);
};
