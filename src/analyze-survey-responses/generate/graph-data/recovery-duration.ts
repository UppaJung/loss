import { TotalAnswered, tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { EventScenarioLabels } from "../../decode-questions/scenario-labels.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { decodeHackedRecoveryDuration, decodeLockedAccountRecoveryDuration, decodeRecoveryDuration, RecoveryDurationLabels, RecoveryDurationLabel } from "../../decode-questions/account.ts";
import { EventScenarioLabelToDurationSurveyKey } from "../../decode-questions/scenario-labels.ts";


export const graphRecoveryDurationBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const labels = EventScenarioLabels;
	const scenarioTallies = EventScenarioLabels.map( (scenarioLabel) => {
		const surveyKey = EventScenarioLabelToDurationSurveyKey[scenarioLabel];
		const decode = surveyKey.startsWith('locked-device') ? decodeLockedAccountRecoveryDuration :
			surveyKey.startsWith('locked') ? decodeLockedAccountRecoveryDuration :
			surveyKey.startsWith('hacked') ? decodeHackedRecoveryDuration :
			decodeRecoveryDuration
		return tallyResponses(
			filterNull(responses.map(
				response => response[surveyKey]
			)).map( decode  )
		)
	});
	const answerDataAbsolute = RecoveryDurationLabels.reduce( (result, answer) => {
		result[answer] = scenarioTallies.map( tally => tally[answer] ?? 0 );
		return result;
	 }, {} as Record<RecoveryDurationLabel, number[]>
	);
	const answerDataPercent = RecoveryDurationLabels.reduce( (result, answer) => {
			result[answer] = scenarioTallies.map( tally => 100 * (tally[answer] ?? 0) / tally[TotalAnswered] );
			return result;
	 	}, {} as Record<RecoveryDurationLabel, number[]>
	);

	const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});
	
	Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`,
		`${warningHeaderTs
		}export const labels = ${JSON.stringify(labels, undefined, "\t")} as const;\n${ ''
		}export const absoluteData = ${JSON.stringify(answerDataAbsolute, undefined, "\t")} as const;${"\n"
		}export const percentData = ${JSON.stringify(answerDataPercent, undefined, "\t")} as const;`);
};
