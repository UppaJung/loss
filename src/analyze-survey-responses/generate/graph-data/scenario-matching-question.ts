import { decodeMatchingQuestion, MatchingScenariosLabelToId, AnswerToMatchingQuestionList, AnswerToMatchingQuestion } from "../../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { percentage } from "../../common/numeric.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const labels = MatchingScenariosLabelToId.map( ([label, ]) => label );
	const scenarioTallies = MatchingScenariosLabelToId.map( ([_, scenarioId]) => 
		tallyResponses(filterNull(responses.map( response => response[scenarioId] ).map( decodeMatchingQuestion ))));
	const answerData = Object.fromEntries( AnswerToMatchingQuestionList.map( (answer) => (
		[answer, scenarioTallies.map( tally => percentage(tally[answer],tally[TotalAnswered]) ?? 0 )]
	))) as Record<AnswerToMatchingQuestion, number[]>;

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs
			}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
			}export const data = ${JSON.stringify(answerData, undefined, "\t")} as const;`);
};
