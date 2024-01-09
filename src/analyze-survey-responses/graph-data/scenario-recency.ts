import { TotalAnswered, tallyResponses } from "../utilities/tallyResponses.ts";
import { filterNull } from "../utilities/filterNull.ts";
import { AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { ScenarioLabels } from "../decode-questions/scenario-labels.ts";
import { AnswerToRecencyQuestion, AnswerToRecencyQuestionList, ScenarioLabelWithRecencyIdTuples, decodeRecencyQuestion } from "../decode-questions/recency-question.ts";
import { getReflectedCodeFileInfo } from "../utilities/getReflectedCodeFileInfo.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioRecencyBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const labels = ScenarioLabels;
	const scenarioTallies = ScenarioLabelWithRecencyIdTuples.map( ([_, scenarioId]) => 
		tallyResponses(filterNull(responses.map(
			response => decodeRecencyQuestion(response[scenarioId])
	))));
	const answerDataAbsolute = AnswerToRecencyQuestionList.reduce( (result, answer) => {
		result[answer] = scenarioTallies.map( tally => tally[answer] ?? 0 );
		return result;
	 }, {} as Record<AnswerToRecencyQuestion, number[]>
	);
	const answerDataPercent = AnswerToRecencyQuestionList.reduce( (result, answer) => {
			result[answer] = scenarioTallies.map( tally => 100 * (tally[answer] ?? 0) / tally[TotalAnswered] );
			return result;
	 	}, {} as Record<AnswerToRecencyQuestion, number[]>
	);

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
		`${warningHeaderTs
		}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
		}export const absoluteData = ${JSON.stringify(answerDataAbsolute, undefined, "\t")} as const;${"\n"
		}export const percentData = ${JSON.stringify(answerDataPercent, undefined, "\t")} as const;`);
};
