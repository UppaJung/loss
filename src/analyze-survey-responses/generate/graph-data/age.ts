import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys } from "../../decode-questions/scenario-labels.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { decodeMatchingQuestion } from "../../decode-questions/matching-question.ts";
import { AnswersIndicatingParticipantExperiencedScenario } from "../../decode-questions/matching-question.ts";
import { AnswerToMatchingQuestion } from "../../decode-questions/matching-question.ts";


export const getAgeScenariosMatchedScatterPlotData = (path: string, responses: AugmentedSurveyResponses) => {

	const currentYear = new Date().getFullYear();
	const data: {x: number; y: number}[] = responses.map( (response) => {
		const calendarYearsSinceBirth = currentYear - parseInt(response.birthyear);
		const scenariosMatched = EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys.reduce( (result, [_, surveyKey]) => {
			const answer = decodeMatchingQuestion(response[surveyKey]);
			if ((AnswersIndicatingParticipantExperiencedScenario as readonly (AnswerToMatchingQuestion | undefined)[]).includes(answer)) {
				result++;
			}
			return result;
		}, 0);
		return {
			x: calendarYearsSinceBirth,
			y: scenariosMatched
		};
	});

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
		`${warningHeaderTs
		}export const data = ${JSON.stringify(data, undefined, "\t")} as const;\n`);
};

