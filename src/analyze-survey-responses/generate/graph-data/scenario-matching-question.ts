import { decodeMatchingQuestion, AnswerToMatchingQuestionList, AnswerToMatchingQuestion, PairedScenarios, scenarioMatchingQuestionId } from "../../decode-questions/matching-question.ts";
import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { percentage } from "../../common/numeric.ts";

export const graphScenarioBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	
	const labels = PairedScenarios;
	const tally = (failureMode: 'hacked' | 'locked') => {
		const tallies = labels.map( pairedScenario => 
			tallyResponses(responses.map( response => response[scenarioMatchingQuestionId(failureMode, pairedScenario)]).map( decodeMatchingQuestion )));
			return Object.fromEntries( AnswerToMatchingQuestionList.map( (answer) => (
				[answer, tallies.map( tally => percentage(tally[answer],tally[TotalAnswered]) ?? 0 )]
			))) as Record<AnswerToMatchingQuestion, number[]>;
	}
	
	const data = {
		'Compromised': tally('hacked') satisfies Record<AnswerToMatchingQuestion, number[]>,
		'Locked Out': tally('locked') satisfies Record<AnswerToMatchingQuestion, number[]>
	};

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
	`${warningHeaderTs
			}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
			}export const data = ${JSON.stringify(data, undefined, "\t")};`);
};

/*
{
		'Compromised': Record<ANSWER, number[]>,
		'Locked Out': Record<ANSWER, number[]>
	}
*/