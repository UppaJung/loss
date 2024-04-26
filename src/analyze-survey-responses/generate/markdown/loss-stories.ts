import { SurveyKeys, AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { makeSafeForMarkdown } from "../../common/makeSafeForMarkdown.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys } from "../../decode-questions/scenario-labels.ts";
import { HarmScenarioLabelSurveyKeyPairs } from "../../decode-questions/scenario-labels.ts";
import { decodeCalendarYearsSinceBirthFromBirthYearString } from "../../decode-questions/demographics.ts";
import { decodeExperienceMatchingQuestion } from "../../decode-questions/index.ts";
import { ExperienceMatchingAnswer } from "../../decode-questions/matching-question.ts";

const {warningHeaderHtml, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const generateLossStoryMarkdown = (
	outPath: string,
	responses: AugmentedSurveyResponses<SurveyKey>,
	{
		includeProlificIds
	} : {
		includeProlificIds?: boolean
	} = {}) => {
	const responseMd = responses.map( response => {
		const lossesSafe = [SurveyKeys.Loss1, SurveyKeys.Loss2, SurveyKeys.Loss3].map( (key) => 
			makeSafeForMarkdown(response[key])
		);
		const lossBullets = lossesSafe.map( (lossSafe, lossIndex) => {
			const bulletNumberString = `${lossIndex + 1}`;
			const originalThree = [ExperienceMatchingAnswer.OriginallyMostHarmful, ExperienceMatchingAnswer.OriginallySecondMostHarmful, ExperienceMatchingAnswer.OriginallyThirdMostHarmful] as const
			const matchLossIndex = originalThree[lossIndex];
			const matchingScenarios = [...EventScenarioLabelsPairedWithMatchingQuestionSurveyKeys, ...HarmScenarioLabelSurveyKeyPairs].reduce( (r, [label, surveyKey]) => {
				if (decodeExperienceMatchingQuestion(response[surveyKey]).includes(matchLossIndex)) {
					r.push(label);
				}
				return r;
			}, [] as string[]);
			const matchingScenarioDescriptor = matchingScenarios.length === 0 ? '' :
				`*Participant matched this with* **${matchingScenarios.join(", ")}**\n`;
			return `${bulletNumberString}. ${matchingScenarioDescriptor}${lossSafe}${"\n"}`;
		}).join("");
		const id = includeProlificIds ? ` (${response.PROLIFIC_PID})` : '';
		const responseDurationSeconds = parseInt(response["Duration (in seconds)"]);
		const responseTime = isNaN(responseDurationSeconds) ? '' : ` (${Math.floor(responseDurationSeconds/60)}:${(responseDurationSeconds % 60).toString().padStart(2, '0')})`;
		const demographics = `${response.gender}, Age ${decodeCalendarYearsSinceBirthFromBirthYearString()(response.birthyear)}, ${response.education} ${responseTime}`;
		return `### Participant ${response.participantId}: ${demographics}${id}${"\n"}${lossBullets}${"\n"}`
	}).join("\n");

	Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}.md`, warningHeaderHtml + responseMd);
};
