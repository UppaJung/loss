import { tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import { decodePhoneTypeQuestion, decodeTabletTypeQuestion, decodeComputerTypeQuestion, PhoneTypeList, TabletTypeList, ComputerTypeList } from "../../decode-questions/device.ts";
import { AugmentedSurveyResponses } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphDeviceBarChartData = (path: string, responses: AugmentedSurveyResponses) => {

	const tallyScenario = (scenario: "hacked" | "locked") => tallyResponses(filterNull(responses.map( response => 
		decodePhoneTypeQuestion(response[`${scenario}-phone-type`]) ??
		decodeTabletTypeQuestion(response[`${scenario}-tablet-type`]) ??
		decodeComputerTypeQuestion(response[`${scenario}-pc-type`]) )))

	const [hackedTallies, lockedTallies] = (["hacked", "locked"] as const).map( tallyScenario );

	const labels = [...PhoneTypeList, ...TabletTypeList, ...ComputerTypeList];
	const data = {
		"Compromised": labels.map( label => hackedTallies[label] ?? 0 ),
		"Locked Out": labels.map( label => lockedTallies[label] ?? 0 )
	};

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
	}export const labels = ${JSON.stringify(labels, undefined, "\t")};${"\n"
	}export const data = ${JSON.stringify(data, undefined, "\t")};`);
};
