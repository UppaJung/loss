import { SurveyKeys, AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { makeSafeForMarkdown } from "../../common/makeSafeForMarkdown.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { EventScenarioLabelSurveyKeyPairs } from "../../decode-questions/event-scenario-labels.ts";
import { HarmScenarioLabelSurveyKeyPairs } from "../../decode-questions/harm-scenario-labels.ts";

const {warningHeaderHtml, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

export const generateLossStoryMarkdown = (outPath: string, responses: AugmentedSurveyResponses<SurveyKey>) => {
	const responseMd = responses.map( response => {
		const lossesSafe = [SurveyKeys.Loss1, SurveyKeys.Loss2, SurveyKeys.Loss3].map( (key) => 
			makeSafeForMarkdown(response[key])
		);
		const lossBullets = lossesSafe.map( (lossSafe, index) => {
			const bulletNumberString = `${index + 1}`;
			const matchingScenarios = [...EventScenarioLabelSurveyKeyPairs, ...HarmScenarioLabelSurveyKeyPairs].reduce( (r, [label, surveyKey]) => {
				if (response[surveyKey].indexOf(bulletNumberString) !== -1) {
					r.push(label);
				}
				return r;
			}, [] as string[]);
			const matchingScenarioDescriptor = matchingScenarios.length === 0 ? '' :
				`*Participant matched this with* **${matchingScenarios.join(", ")}**\n`;
			return `${bulletNumberString}. ${matchingScenarioDescriptor}${lossSafe}${"\n"}`;
		}).join("");
		return `### Participant ${response.participantId}${"\n"}${lossBullets}${"\n"}`
	}).join("\n");

	Deno.writeTextFileSync(`${outPath}/${codeFileNameWithoutExtension}.md`, warningHeaderHtml + responseMd);
};
