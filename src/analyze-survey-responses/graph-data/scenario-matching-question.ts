import { decodeMatchingQuestion, MatchingScenariosLabelToId, AnswerToMatchingQuestionList, AnswerToMatchingQuestion } from "../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../utilities/tallyResponses.ts";
import { filterNull } from "../utilities/filterNull.ts";
import { AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { getReflectedCodeFileInfo } from "../utilities/getReflectedCodeFileInfo.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const labels = MatchingScenariosLabelToId.map( ([label, ]) => label );
	const scenarioTallies = MatchingScenariosLabelToId.map( ([_, scenarioId]) => 
		tallyResponses(filterNull(responses.map(
			response => decodeMatchingQuestion(response[scenarioId])
	))));
	const answerData = AnswerToMatchingQuestionList.reduce( (result, answer) => {
			result[answer] = scenarioTallies.map( tally => 100 * (tally[answer] ?? 0) / tally[TotalAnswered] );
			return result;
	 	}, {} as Record<AnswerToMatchingQuestion, number[]>
	);

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs
			}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
			}export const data = ${JSON.stringify(answerData, undefined, "\t")} as const;`);
};
