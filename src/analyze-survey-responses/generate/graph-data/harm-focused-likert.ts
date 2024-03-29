import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import type { SurveyKey } from "../../survey-keys/index.ts";
import { HarmScenarioLabels } from "../../decode-questions/scenario-labels.ts";
import { HarmScenarioLabelsPairedWithLikertHarmSurveyKey } from "../../decode-questions/scenario-labels.ts";
import { exportVars } from "./common/exportVars.ts";
import { tallyLikert } from "./common/likert.ts";

const labels = HarmScenarioLabels;
export const graphHarmScenarioLikertBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	const toExport = {labels, ...tallyLikert(responses, HarmScenarioLabels.map( label => HarmScenarioLabelsPairedWithLikertHarmSurveyKey[label]))};
	
	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs}${exportVars(toExport)}`
	);
}
