import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { numeric, percentage } from "../../common/numeric.ts";
import type { SurveyKey } from "../../survey-keys/index.ts";
import type { ScenarioLabel } from "../../decode-questions/scenario-labels.ts";
import { MatchingScenariosLabelToId } from "../../decode-questions/matching-question.ts";

export const LikertLabels = ['1','2','3','4','5','6','7'] as const;
export type LikertLabel = typeof LikertLabels[number];
export const MatchingScenariosLabelToLikertId = MatchingScenariosLabelToId.map(
  ([l,k])=>([l,`${k}-lik_1`] satisfies [ScenarioLabel, SurveyKey])
);
const labels = MatchingScenariosLabelToLikertId.map( ([label]) => label );

export const graphLikertBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	const tallies = MatchingScenariosLabelToLikertId.map( ([_, key]) =>
		tallyResponses(responses.map( response => response[key]))
	);
	const counts = Object.fromEntries(
		 LikertLabels.map( likertLabel => ([likertLabel, tallies.map( tally => numeric(tally[likertLabel]))]) as const)
	);
	const percentData = Object.fromEntries(
		LikertLabels.map( likertLabel => ([likertLabel, tallies.map( tally => percentage(tally[likertLabel],tally[TotalAnswered]) ?? 0 )]) as const)
 );

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs
			}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
		}export const counts = ${JSON.stringify(counts, undefined, "\t")};${"\n"
		}export const percents = ${JSON.stringify(percentData, undefined, "\t")};`);
};
