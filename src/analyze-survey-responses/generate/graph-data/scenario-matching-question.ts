import { decodeMatchingQuestion, AnswerToMatchingQuestionList, AnswerToMatchingQuestion, PairedScenarios, scenarioMatchingQuestionId, UnpairedScenariosLabelToId } from "../../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { percentage } from "../../common/numeric.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { UnpairedScenarioLabels } from "../../decode-questions/matching-question.ts";
import { hackedDeviceHow } from "../../../../generated-by-analysis/Pilot6/lume/free-text-data.ts";

const pairedScenarioLabels = PairedScenarios;

const getTallies = (failureMode: 'hacked' | 'locked', responses: AugmentedSurveyResponses<SurveyKey>) => {
	return pairedScenarioLabels.map( pairedScenario => scenarioMatchingQuestionId(failureMode, pairedScenario))
		.map( key => tallyResponses(responses.map( response => decodeMatchingQuestion(response[key])) )
	);
}

const aggregateTalliesAnswerToMatchingQuestionAsPercent = (
	tallies: Record<AnswerToMatchingQuestion | '_totalAnswered', number>[]
): Record<AnswerToMatchingQuestion, number[]> =>
	Object.fromEntries( AnswerToMatchingQuestionList.map( (answer) => (
		[answer, tallies.map( tally => percentage(tally[answer],tally[TotalAnswered]) ?? 0 )]
	))) as Record<AnswerToMatchingQuestion, number[]>;


export const graphScenarioBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {

	const tally = (failureMode: 'hacked' | 'locked') => {
		const tallies = pairedScenarioLabels.map( pairedScenario => scenarioMatchingQuestionId(failureMode, pairedScenario))
			.map( key => tallyResponses(responses.map( response => decodeMatchingQuestion(response[key])) )
		);
		return aggregateTalliesAnswerToMatchingQuestionAsPercent(tallies);
	}

	const compromisedTallies = getTallies('hacked', responses);
	const lockedOutTallies = getTallies('locked', responses);

	const compromisedScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent(compromisedTallies);
	const lockedOutScenarioData = aggregateTalliesAnswerToMatchingQuestionAsPercent(lockedOutTallies);
	
	const unpairedScenarioLabels = UnpairedScenarioLabels;
	const unpairedTallies = UnpairedScenariosLabelToId.map( ([_, id]) =>
		tallyResponses(responses.map( response => response[id] ).map( decodeMatchingQuestion ))
	);
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
