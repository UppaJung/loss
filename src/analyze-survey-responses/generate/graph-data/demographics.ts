import { AugmentedSurveyResponses, SurveyKeys } from "../../survey-keys/index.ts";
import { getReflectedCodeFileInfo } from "../../common/getReflectedCodeFileInfo.ts";
import { SurveyKey } from "../../survey-keys/index.ts";
import { decodeEducationLabels, decodeGenderLabels, EducationLabelList, GenderLabelList } from "../../decode-questions/demographics.ts";
import { tallyResponses } from "../../common/tallyResponses.ts";
import { filterNull } from "../../common/filterNull.ts";
import { tallyToPercent } from "./common/talliesToPercent.ts";

export const toDataArray = <T extends string>(labels: T[], data: Record<T, number>): number[] =>
	labels.map(label => data[label] ?? 0);

export const generateDemographicGraphData = (path: string, responses: AugmentedSurveyResponses<SurveyKey>) => {

	const genderTallies = tallyResponses(filterNull(responses.map(
		response => decodeGenderLabels(response[SurveyKeys.gender])
	)));
	const genderPercentTallies = tallyToPercent(genderTallies);

	const gender = {
		labels: GenderLabelList,
		tallies: genderTallies,
		data: toDataArray(GenderLabelList, genderTallies),
	} as const;

	const genderPercent = {
		labels: GenderLabelList,
		tallies: genderPercentTallies,
		data: toDataArray(GenderLabelList, genderPercentTallies),
	} as const;
	
	const educationTallies = tallyResponses(filterNull(responses.map(
		response => decodeEducationLabels(response[SurveyKeys.education])
	)));
	const educationPercentTallies = tallyToPercent(educationTallies);
	
	const education = {
		labels: EducationLabelList,
		tallies: educationTallies,
		data: toDataArray(EducationLabelList, educationTallies),
	} as const;

	const educationPercent = {
		labels: EducationLabelList,
		tallies: educationPercentTallies,
		data: toDataArray(EducationLabelList, educationPercentTallies),
	} as const;

const {warningHeaderTs, codeFileNameWithoutExtension} = getReflectedCodeFileInfo({'import.meta.url': import.meta.url});

Deno.writeTextFileSync(`${path}/${codeFileNameWithoutExtension}-data.ts`, `${warningHeaderTs
}export const gender = ${JSON.stringify(gender, undefined, "\t")} as const;${"\n"
}export const genderPercent = ${JSON.stringify(genderPercent, undefined, "\t")} as const;${"\n"
}export const education = ${JSON.stringify(education, undefined, "\t")} as const;${"\n"
}export const educationPercent = ${JSON.stringify(educationPercent, undefined, "\t")} as const;${"\n"
}`);
};
