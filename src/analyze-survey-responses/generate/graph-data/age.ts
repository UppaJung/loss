import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys } from "../../decode-questions/scenario-labels.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { decodeMatchingQuestion } from "../../decode-questions/matching-question.ts";
import { AnswersIndicatingParticipantExperiencedScenario } from "../../decode-questions/matching-question.ts";
import { AnswerToMatchingQuestion } from "../../decode-questions/matching-question.ts";
import { decodeCalendarYearsSinceBirthFromBirthYearString } from "../../decode-questions/demographics.ts";

export const getAgeScenariosMatchedScatterPlotData = (path: string, responses: AugmentedSurveyResponses) => {
	const ageScenarioScatterData: {x: number; y: number}[] = responses.map( (response) => {
		const calendarYearsSinceBirth = decodeCalendarYearsSinceBirthFromBirthYearString(new Date(2024,4,2))(response.birthyear);
		if (calendarYearsSinceBirth == null) {
			return;
		}
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
	}).filter( x => x != null) as {x: number; y: number}[];

	const ageMap = responses.reduce( (tally, response) => {
		const age = decodeCalendarYearsSinceBirthFromBirthYearString(new Date(2024,4,2))(response.birthyear);
		if (age != null) {
			tally.set(age, (tally.get(age) ?? 0) + 1);
		}
		return tally;
	}, new Map<number, number>());
	const totalParticipants = [...ageMap.values()].reduce( (sum, count) => sum + count, 0);
	const agePercentPoints: {x: number, y: number}[] = [...ageMap.entries()].map( ([x, count]) => ({x,y: count * 100/totalParticipants})).sort( (a, b) => a.x - b.x);

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
		`${warningHeaderTs
		}export const ageScenarioScatterData = ${JSON.stringify(ageScenarioScatterData, undefined, "\t")} as const;${"\n"
		}export const agePercentPoints = ${JSON.stringify(agePercentPoints, undefined, "\t")} as const;\n`);
};

