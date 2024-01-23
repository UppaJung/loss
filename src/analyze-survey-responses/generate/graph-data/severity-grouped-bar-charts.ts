import { AugmentedSurveyResponses, SurveyKeys } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";
import { AnswerToHackedDeviceHowList, decodeHackedDeviceHow } from "../../decode-questions/hacked-device-how.ts";
import { AnswerToLockedDeviceHowList, AnswerToLockedDeviceRecoveredDataList, AnswerToLockedDeviceRecoveryDurationList, decodeLockedDeviceHow, decodeLockedDeviceRecoveredData, decodeLockedDeviceRecoveryDuration } from "../../decode-questions/locked-device.ts";

// const RANGE = {count: 3, min: -30, max: 30};
/*
  "hacked-device-how": "hacked-device-how",
*/



export const graphSeverityGroupedBarChartsData = (path: string, responses: AugmentedSurveyResponses) => {

	const graphData = <KEY extends keyof ((typeof responses)[number]), LABEL extends string>(
		xTitle: string,
		matchKey: Exclude<keyof ((typeof responses)[number]), "startDate">,
		key: Exclude<KEY, "startDate">,
		decode: (answer: string) => LABEL | LABEL[] | undefined,
		labels: LABEL[]
	) => { //: {KEY: {xTitle: string, labels: LABEL[], data: ReturnType<typeof filterAndDecodeExperiencedScenarioResponses<LABEL>>}} => {
		const data = filterAndDecodeExperiencedScenarioResponses(responses, labels, matchKey, r => decode(r[key]));
		return {[key]: {xTitle, labels, data}};
	}

	const inputToAllGraphs = {
		...graphData("How the device was compromised.", SurveyKeys["hacked-device"], SurveyKeys["hacked-device-how"], decodeHackedDeviceHow, AnswerToHackedDeviceHowList),
		...graphData("How did the user get locked out of the device", SurveyKeys["locked-device"], SurveyKeys["locked-device-how"], decodeLockedDeviceHow, AnswerToLockedDeviceHowList),
		...graphData("Did you recover data from the locked device?", SurveyKeys["locked-device"], SurveyKeys["locked-device-recdat"], decodeLockedDeviceRecoveredData, AnswerToLockedDeviceRecoveredDataList),
		...graphData("How long did it take to recover?", SurveyKeys["locked-device"], SurveyKeys["locked-device-rec"], decodeLockedDeviceRecoveryDuration, AnswerToLockedDeviceRecoveryDurationList),
	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const BarGraphs = ${JSON.stringify(inputToAllGraphs, undefined, "\t")};`);
};
