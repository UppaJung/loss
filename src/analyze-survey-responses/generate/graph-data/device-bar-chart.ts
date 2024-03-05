import { decodeDetailedDeviceType, DetailedDeviceTypeList } from "../../decode-questions/device.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { filterAndDecodeExperiencedScenarioResponses } from "./common/filterAndDecodeResponses.ts";
import { SurveyKey } from "../../survey-keys/index.ts";

export const graphDeviceBarChartData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {

	const labels = DetailedDeviceTypeList;
	const data = {
		"Compromised":
			filterAndDecodeExperiencedScenarioResponses(responses, labels, "hacked-device?", decodeDetailedDeviceType("hacked")),
		"Locked Out":
			filterAndDecodeExperiencedScenarioResponses(responses, labels, "locked-device?", decodeDetailedDeviceType("locked")),
	} as const;

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
	}export const data = ${JSON.stringify(data, undefined, "\t")};`);
};
