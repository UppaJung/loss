import { decodePhoneTypeQuestion, decodeTabletTypeQuestion, decodeComputerTypeQuestion, PhoneTypeList, TabletTypeList, ComputerTypeList } from "../../decode-questions/device.ts";
import { AugmentedSurveyResponse, AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphDeviceBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const decodeResponse = (failureMode: "hacked" | "locked") => (response: AugmentedSurveyResponse) =>
		decodePhoneTypeQuestion(response[`${failureMode}-phone-type`]) ??
		decodeTabletTypeQuestion(response[`${failureMode}-tablet-type`]) ??
		decodeComputerTypeQuestion(response[`${failureMode}-pc-type`]);

		const labels = [...PhoneTypeList, ...TabletTypeList, ...ComputerTypeList];
	const data = {
		"Compromised":
			filterAndDecodeExperiencedScenarioResponses(responses, labels, "hacked-device", decodeResponse("hacked")),
		"Locked Out":
			filterAndDecodeExperiencedScenarioResponses(responses, labels, "locked-device", decodeResponse("locked")),
	} as const;

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
	}export const data = ${JSON.stringify(data, undefined, "\t")};`);
};
