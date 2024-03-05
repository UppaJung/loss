import { decodeMatchingQuestion, AnswerToMatchingQuestionList, AnswerToMatchingQuestion, PairedScenarios, scenarioMatchingQuestionId, UnpairedScenariosLabelToId } from "../../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { percentage } from "../../common/numeric.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { UnpairedScenarioLabels } from "../../decode-questions/matching-question.ts";
import { HarmScenarioLabelSurveyKeyPairs } from "../../decode-questions/scenario-labels.ts";
import { HarmScenarioLabels } from "../../decode-questions/scenario-labels.ts";

const pairedScenarioLabels = PairedScenarios;

const aggregateTalliesAnswerToMatchingQuestionAsPercent = (
	tallies: Record<AnswerToMatchingQuestion | '_totalAnswered', number>[]
): Record<AnswerToMatchingQuestion, number[]> =>
	Object.fromEntries( AnswerToMatchingQuestionList.map( (answer) => (
		[answer, tallies.map( tally => percentage(tally[answer],tally[TotalAnswered]) ?? 0 )]
	))) as Record<AnswerToMatchingQuestion, number[]>;


export const graphScenarioBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {

	const [compromisedTallies, lockedOutTallies] =
		(['hacked', 'locked'] as const).map( failureMode => pairedScenarioLabels
			.map( pairedScenario => scenarioMatchingQuestionId(failureMode, pairedScenario) )
			.map( key => responses.map( response => decodeMatchingQuestion(response[key]) ) )
			.map( tallyResponses )
	);

	const compromisedScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent(compromisedTallies);
	const lockedOutScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent(lockedOutTallies);
	
	const unpairedScenarioLabels = [...UnpairedScenarioLabels, ...HarmScenarioLabels] as const;
	const unpairedTallies = [...UnpairedScenariosLabelToId, ...HarmScenarioLabelSurveyKeyPairs].map( ([_, id]) =>
			responses.map( response => response[id] ).map( decodeMatchingQuestion )
		).map( tallyResponses );
	const unpairedScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent(unpairedTallies);
	const compromisedAndUnpairedScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent([
		...compromisedTallies, ...unpairedTallies
	])

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs
			}export const pairedScenarioLabels = ${JSON.stringify(pairedScenarioLabels, undefined, "\t")};${"\n"
			}export const compromisedScenarioData = ${JSON.stringify(compromisedScenarioData, undefined, "\t")};${"\n"
			}export const lockedOutScenarioData = ${JSON.stringify(lockedOutScenarioData, undefined, "\t")};${"\n"
			}export const unpairedScenarioLabels = ${JSON.stringify(unpairedScenarioLabels, undefined, "\t")};${"\n"
			}export const unpairedScenarioData = ${JSON.stringify(unpairedScenarioData, undefined, "\t")};${"\n"
			}export const compromisedAndUnpairedScenarioData = ${JSON.stringify(compromisedAndUnpairedScenarioData, undefined, "\t")};`);
};
